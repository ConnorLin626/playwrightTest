

/**
 *  this class setup a minimal page to use current testcase flow technology.
 *  remove tc logic.
 *  by run it to troubleshoot framework setup question
 *  
 * */
//import { component,TextInput} from '../../lib';
import { ElementFinder, browser, ExpectedConditions, Locator, by ,element} from "protractor";
import { expect } from 'chai';
import 'reflect-metadata'

class TextInput  {

    constructor(public element: ElementFinder,public selector: string) {
    }
  
    public async input(text:string, timeOut:number=600) {
      //change from visibilityOf to presenceOf due to ux file upload
      await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
  
        try {
          await this.element.clear();
        } catch(e) {
          console.log('this.element.clear() -> ' + e);
        }
  
        return await this.element.sendKeys(text);
      });
    }

    public async valueContains(expected: string, timeOut: any=3000) {
        let retValue = false;
        await browser.wait(ExpectedConditions.presenceOf(this.element), timeOut).then(async () => {
          const textValue = await this.getValue();
          if (-1 !== textValue.trim().indexOf(expected.trim())) {
            retValue = true;
          }
        })
        return retValue;
    }

    public async getValue() {
        return await this.element.getAttribute("value");
    }
    
}

class TestPage{
    @component('//*[@id="test-input"]') public input: TextInput;

    login(){
        browser.get("D:/dbs-code/dbs-test/src/e2e/tutorial/test.html");
    }
}

function component(selector: string) {
    return (target: any, propertyKey: string) => {
      const type = Reflect.getMetadata('design:type', target, propertyKey);
      Object.defineProperty(target, propertyKey, {
        configurable: true,
        enumerable: true,
        get: function () {
          console.info(`${target.constructor.name}.${propertyKey}`)
          let obj=new type(find(selector),selector);
          obj.owner=target.constructor.name;
          return new Proxy(obj,{
            get(target, key:string, receiver) {
              console.info(`get ${target.owner}.${key}`);
              return target[key];
            },
            set(target, key:string, value) {
                console.info(`set ${target.owner}.${key}`);
                return target[key]= value;
            }
          });
        },
      });
    };
}


function find(selector: string): ElementFinder {
    return element(by.xpath(selector));
 }

let page=new TestPage();
function handlerCase(){
     console.log("handlerCase");
}
describe('test2', async function () {
    //this.retries(3);
    this.timeout(500);
    before(async function () {
         page.login()
    });
    afterEach(async function (done) { 
      handlerCase();
      await done();
    });

    it('test2-1', async function () {
        await page.input.input("hello",10);
        let fun = ()=>{return new Promise((resolve,reject)=>{
          setTimeout(() => {
            resolve("response");
          }, 3000);
        })};
        await fun().then((value)=>console.log(value));
        await page.input.getValue().then(val=> expect(val).to.be.equal('hello'));
    });

    it('test2-2', async function (done) {
      setTimeout(() => {
        done()
      }, 200);
    });
});
