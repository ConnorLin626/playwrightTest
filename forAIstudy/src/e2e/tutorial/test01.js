const chai = require("chai");
const log4js = require('log4js');
const { element, ElementFinder, by, browser, ElementArrayFinder, ExpectedConditions } = require('protractor');
log4js.configure({
    appenders: { cheese: { type: "file", filename: "d://log/autotest.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } },
  });
var logger = log4js.getLogger('testlog')

describe('test1-2', function() {
    afterEach(function() {
        console.info("afterEach")
    });
    this.timeout(300);
   
    it('test1-2-1', function(done) {
        setTimeout(done, 300);
    });
    
  
    it('test1-2-2', function(done) {
      setTimeout(done, 250);
    });
  });

  describe('test1-1',  () =>{
    after(()=>{
        console.log("after");
    })
    it('test1-1-1',  async () =>{
       
        browser.get("D:/dbs-code/dbs-test/src/e2e/tutorial/test.html");
        await element(by.id('width')).getText().then(val=>{
            chai.expect(val).to.be.equal('1536');
        });

        await element(by.id('height')).getText().then(val=>{
            chai.expect(val).to.be.equal('678');
        });
    })
});