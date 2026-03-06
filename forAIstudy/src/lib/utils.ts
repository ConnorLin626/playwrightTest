/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import 'reflect-metadata';
import { element, ElementFinder, by, browser, ElementArrayFinder, ExpectedConditions } from 'protractor';
import * as moment from 'moment';
import * as log4js from "log4js";
export function getBasePath() {
  return process.cwd();
}

export function getDataPath() {
  return getBasePath() + '/data';
}

export function copyFile(sourceFile: string, targetFile: string): boolean {
  try {
    let fs = require('fs');
    fs.copyFileSync(sourceFile, targetFile);
  } catch (error) {
    console.log(`error copy source file { ${sourceFile} } to target file { ${targetFile} }`);
    console.log(`error => ${error}`);
    return false;
  }
  return true;
}

export function getFileName(fileName: string) {
  return fileName.split('/').pop();
}

export function getUploadFile(fileName: string) {
  let targetFileName = getFileName(fileName);
  let moment = require('moment');
  let dateTime = moment(new Date()).format('YYMMDDHHmmsss');
  let sourceFile = (getDataPath() + '/' + fileName);
  let targetFile = (getDataPath() + '/tmp/' + targetFileName + '-' + dateTime);
  if (fileName.endsWith(".jpg") || fileName.endsWith(".pdf")) {
    targetFile = (getDataPath() + '/tmp/' + targetFileName);
  }
  //let success = execCommand(`cp ${sourceFile} ${targetFile}`);
  let success = copyFile(sourceFile, targetFile);
  if (success) {
    return targetFile;
  }
  return null;
}
export function getUploadFile2(fileName: string) {
  let targetFileName = getFileName(fileName);
  let moment = require('moment');
  let dateTime = moment(new Date()).format('YYMMDDHHmmsss');
  let sourceFile = (getDataPath() + '/' + fileName);
  let targetFile = (getDataPath() + '/tmp/' + targetFileName);
  if (fileName.endsWith(".jpg") || fileName.endsWith(".pdf")) {
    targetFile = (getDataPath() + '/tmp/' + targetFileName);
  }
  //let success = execCommand(`cp ${sourceFile} ${targetFile}`);
  let success = copyFile(sourceFile, targetFile);
  if (success) {
    return targetFile;
  }
  return null;
}
export function getUploadFile3(fileName: string) {
  let targetFileName = getFileName(fileName);
  let moment = require('moment');
  let dateTime = moment(new Date()).format('YYMMDDHHmmsss');
  let sourceFile = (getDataPath() + '/' + fileName);

  let pos_extension: number = targetFileName.lastIndexOf('.');
  let extensionStr = (targetFileName.substr(pos_extension));
  let fileNameWithoutExtension = (targetFileName.substring(0, pos_extension));
  let targetFile = (getDataPath() + '/tmp/' + fileNameWithoutExtension + '-' + dateTime + extensionStr);
  if (fileName.endsWith(".jpg") || fileName.endsWith(".pdf")) {
    targetFile = (getDataPath() + '/tmp/' + targetFileName);
  }
  //let success = execCommand(`cp ${sourceFile} ${targetFile}`);
  let success = copyFile(sourceFile, targetFile);
  if (success) {
    return targetFile;
  }
  return null;
}

export function getCurrentQs() {
  return browser.params.url.qs;
}

export function getCurrentSubOrgId() {
  return browser.params.url.subOrgId;
}

export function getCurrentIsSingleView() {
  return browser.params.url.isSingleView;
}

export function addTail(string1: string, string2: string) {
  if (string1.endsWith('/') && string2.startsWith('/')) {
    return string1 + string2.substr(1);;
  } else if (!string1.endsWith('/') && !string2.startsWith('/')) {
    return string1 + '/' + string2
  } else {
    return string1 + string2;
  }
}

export function getElementTimeOut() {
  return parseInt(browser.params.timeout.elementLocation) * parseInt(browser.params.multiple);
}

export function getPageCompleteTimeOut() {
  return parseInt(browser.params.timeout.pageComplete) * parseInt(browser.params.multiple);
}

export function getMenuItemTimeOut() {
  return parseInt(browser.params.timeout.menuItem) * parseInt(browser.params.multiple);
}

export function find(selector: string): ElementFinder {
  return element(by.xpath(selector));
}

export function findAll(selector: string): ElementArrayFinder {
  return element.all(by.xpath(selector));
}

export function findByTag(selector: string): ElementFinder {
  return element(by.tagName(selector));
}


export function log<T extends { new (...args: any[]): {} }>(constructor: T,context:any=null) {
  const originalConstructor = constructor;

  const proto = originalConstructor.prototype;
  const properties = Object.getOwnPropertyNames(proto);

  properties.forEach(prop => {
    if (prop !== 'constructor' && prop !== 'toString' && prop !== 'toLocaleString' && prop !== 'valueOf') {
      const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
      if (descriptor && descriptor.writable && descriptor.configurable) {
        const originalGetter = descriptor.get;
        const originalSetter = descriptor.set;

        Object.defineProperty(proto, prop, {
          get() {
            console.log(`Accessing : ${process.env.currentTestTitle}=>${originalConstructor.name}.${prop}`);
            return originalGetter ? originalGetter.call(this) : descriptor.value;
          },
          set(value: any) {
            console.log(`Setting : ${process.env.currentTestTitle}=>${originalConstructor.name}.${prop} = ${value}`);
            originalSetter ? originalSetter.call(this, value) : (descriptor.value = value);
          },
          enumerable: descriptor.enumerable,
          configurable: true
        });
      }
    }
  });

  // 返回原始构造函数，以保持类型兼容性
  return originalConstructor;
}

export function component(selector: string) {
  return (target: any, propertyKey: string) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function () {
        let obj=new type(find(selector),selector);
        obj.owner=target.constructor.name;
        obj.propertyKeyName=propertyKey;
        //construct proxy of page ,
        //in page have @compoent mark field,when the field is call, print out it 
        //when meet stuck issue like timeout , log not print out which line cause timeout
        //we don't know which line is wong
        return new Proxy(obj,{
          get(target, key:string, receiver) {
            console.info(`Accessing : ${process.env.currentTestTitle}=>${target.owner}.${obj.propertyKeyName}.${key}`);
            return target[key];
          },
          set(target, key:string, value) {
              console.info(`Setting : ${process.env.currentTestTitle}=>${target.owner}.${obj.propertyKeyName}.${key}`);
              return target[key]= value;
          }
        });
      },
    });
  };
}
export const addContext = require('mochawesome/addContext');

export function debug(context: Mocha.Context = this, msg: any) {
  if (browser.params.dev) {
    addContext(context, msg);
  }
}

export const ANGULARVERSION = -1 === browser.baseUrl.indexOf('v=8') ? 'V2' : 'V8';
export async function handlerCase(suite: Mocha.Suite, context: Mocha.Context, project: any = PROJECT_TYPE.CB) {
  const caseDate = moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
  const suiteTitle = suite.title;
  const caseTitle = context.currentTest.title;
  const caseStatus = context.currentTest.state;
  const caseTime = context.currentTest.duration;

  let fs = require('fs');
  if (!fs.existsSync('test.history')) {
    fs.mkdirSync('test.history');
  }
  if (!fs.existsSync(`test.history/history.${project}.${ANGULARVERSION}.csv`)) {
    fs.appendFileSync(`test.history/history.${project}.${ANGULARVERSION}.csv`, 'Date,TestSuite,TestCase,Duration,Status\n');
  }
  const escapedCaseTitle = escapeCsvField(caseTitle);
  //if (context.currentTest.state !== undefined) {
  fs.appendFileSync(`test.history/history.${project}.${ANGULARVERSION}.csv`, `${caseDate},${suiteTitle},${escapedCaseTitle},${caseTime},${caseStatus}` + '\n');
  //}
  //save scteenshot and capture errors
  if (caseStatus === 'failed') {
    // 传递context以启用错误捕获和报告添加
    await saveScreen(`${suiteTitle}-${caseTitle}-${ANGULARVERSION}`);
    await addContext(context, `../test.screens/${suiteTitle}-${caseTitle}-${ANGULARVERSION}.png`);
    await saveLog(`${suiteTitle}-${caseTitle}-${ANGULARVERSION}`);
  }
}
/**
 * if field contains comma, escape it
 * @param field 
 * @returns 
 */
function escapeCsvField(field) {
  if (field.includes(',')) {
      field = field.replace(/"/g, '""');
      field = `"${field}"`;
  }
  return field;
}

/**
 * 捕获控制台和网络错误
 * @param fileName 文件名
 */
export async function saveLog(fileName: string) {
  if (!fileName.endsWith(".json")) {
    fileName += ".json";
  }

  const fs = require('fs');
  const path = require('path');
  
  try {
    // 2. 捕获控制台错误
    const consoleErrors = await captureConsoleErrors();

    // 3. 捕获网络错误
    const apiErrors = '';
    console.log("apiErrors"+apiErrors);

    // 4. 保存错误日志
    if (consoleErrors.length > 0 || apiErrors.length > 0) {
      if (!fs.existsSync('test.logs')) {
        fs.mkdirSync('test.logs', { recursive: true });
      }

      const logData = {
        timestamp: new Date().toISOString(),
        testCase: fileName,
        consoleErrors,
        apiErrors
      };

      fs.writeFileSync(
        path.join('test.logs', fileName),
        JSON.stringify(logData, null, 2)
      );
    }

    // 5. 添加到报告上下文
    // if (context) {
      // await addContext(context, `../test.logs/${fileName.replace('.png', '.json')}`);
      
      // if (consoleErrors.length > 0) {
      //   const summary = `控制台错误 (${consoleErrors.length}个):\n` + 
      //     consoleErrors.map(e => `[${e.level}] ${e.message}`).join('\n');
      //   await addContext(context, summary);
      // }

      // if (apiErrors.length > 0) {
      //   const summary = `API调用失败 (${apiErrors.length}个):\n` + 
      //     apiErrors.map(e => `[${e.status}] ${e.url}`).join('\n');
      //   await addContext(context, summary);
      // }
    // }
    return true;
  } catch (error) {
    console.error('保存日志时发生错误:', error);
    return false;
  }
}

export async function saveScreen(fileName: string) {
  if (!fileName.endsWith(".png")) {
    fileName += ".png";
  }
  /*
 var screenShotUtils = new ProtractorScreenShotUtils({
   browserInstance : browser,
   setAsDefaultScreenshotMethod : true // Make fullpage screenshot as default behaviour browser.takeScreenshot()
 });
 screenShotUtils.takeScreenshot({
   saveTo: fileName
})
*/
  let fs = require('fs');
  if (!fs.existsSync('test.screens')) { fs.mkdirSync('test.screens'); }
  return await browser.takeScreenshot().then((image) => {
    fs.writeFileSync('test.screens/' + fileName, image, 'base64', (err: any) => {
      err && console.log(err);
    });
  });

  // try {
  //   const image = await browser.takeScreenshot();
  //   await fs.writeFile(`test.screens/${fileName}`, image, 'base64');
  // } catch (err) {
  //   console.error(`error in save screen test.screens/${fileName}`,err);
  // }
}
/**
 * 私有函数 - 捕获控制台错误
 */
async function captureConsoleErrors() {
  try {
    const logs = await browser.manage().logs().get('browser');
    return logs
      .filter(log => {
        // 只捕获SEVERE级别错误
        if (!['SEVERE'].includes(log.level.name)) {
          return false;
        }
        
        // 忽略特定错误模式
        const ignorePatterns = [
          /Maximum call stack size exceeded/,  // 调用栈溢出错误
          /ResizeObserver loop limit exceeded/, // 常见UI库无害警告
          /https:\/\/192\.168\.0\.251:10444\/.*\.js/,  // 特定域名的JS文件错误
          /There was an error setting cookie.*Please check domain and path/,  // Matomo cookie设置错误
          /Can't write cookie on domain.*\.dbs\.com/  // Matomo域名cookie写入错误
        ];
        
        return !ignorePatterns.some(pattern => pattern.test(log.message));
      })
      .map(log => ({
        level: log.level.name,
        message: log.message,
        timestamp: new Date(log.timestamp).toISOString()
      }));
  } catch (error) {
    console.warn('控制台日志捕获失败:', error.message);
    return [];
  }
}


export async function devWatch() {
  if (browser.params.dev) {
    await browser.sleep(browser.params.delay.caseFinishDelay);
  }
}

export async function waitForUXLoading() {
  await findAll('//ng-busy/div').each(async (_element) => {
    await browser.wait(ExpectedConditions.stalenessOf(_element), getPageCompleteTimeOut());
  });
}

export async function waitForI3Loading() {
  await findAll('//div[@id="loadingDiv"]/center/span[@id="retrieveData"]').each(async (_element) => {
    await browser.wait(ExpectedConditions.stalenessOf(_element), getPageCompleteTimeOut());
  });
}

export async function pageSwitchIframe(iframe: string) {
  await browser.wait(ExpectedConditions.elementToBeClickable(find(iframe)), getElementTimeOut()).then(async () => {
    await browser.switchTo().frame(find(iframe).getWebElement());
    await browser.sleep(browser.params.delay.default);
  });
};

export async function pageSwitchWindow(windowNameOrTitle: string) {
  try {
    await pageSwitchWindowByTitle(windowNameOrTitle);
  } catch (byTitleError) {
    try {
      await pageSwitchWindowByName(windowNameOrTitle);
    } catch (byNameError) {
      console.log(byNameError);
      throw byNameError;
    }
  }
};

export async function pageSwitchWindowByName(windowName: string) {
  try {
    await browser.switchTo().window(windowName);
  } catch (Error) {
    console.log(`Can not switch window => ${windowName}`);
    throw Error;
  }
};

export async function pageSwitchWindowByTitle(windowTitle: string) {
  let windowHandler: string;
  await browser.getAllWindowHandles().then(async _windows => {
    await _windows.forEach(async (v, i, a) => { //VALUE , INDEX ,ARGS
      await browser.switchTo().window(v).then(async () => {
        await browser.getTitle().then(async (title) => {
          if (title === windowTitle) {
            windowHandler = v;
          }
        });
      });
    });
  });
  if (undefined !== windowHandler) {
    await pageSwitchWindowByName(windowHandler);
  }
};

export async function pageSwitchToI3() {
  await pageSwitchToUX();
  await waitForI3Loading();
  await pageSwitchIframe('//iframe[@id="old-iframe"]');
};

export async function pageSwitchToTrade() {
  await pageSwitchIframe('//iframe[@id="trade-iframe"]');
};

export async function pageSwitchToUX() {
  await pageSwitchToMain();
  await waitForUXLoading();
  await pageSwitchIframe('//iframe[@id="iframe_top"]');
};

export async function pageSwitchToMain() {
  await browser.switchTo().defaultContent();
};

export function generatedID() {
  return ((Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5);
};

export function randomNumbers() {
  let rand = "";
  for (let i = 0; i < 5; i++) {
    rand += Math.floor(Math.random() * 10);
  }
  console.log(rand);
  return rand;
};

export function randomAlphabetAndNumbers(min, max) {
  var returnStr = "",
    range = (max ? Math.round(Math.random() * (max - min)) + min : min),
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (var i = 0; i < range; i++) {
    var index = Math.round(Math.random() * (arr.length - 1));
    returnStr += arr[index];
  }
  return returnStr;
};

export function execCommand(command: string): boolean {
  let exec = require('child_process').exec;
  exec(command, function (error, stdout, stderr) {
    if (error) {
      console.log(`error when exec command => ${command}`);
      return false;
    }
  });
  return true;
}

export function parseUrl(url) {
  let queryObj = {};
  let reg = /[?&]([^=&#]+)=([^&#]*)/g;
  let querys = url.match(reg);
  if (querys) {
    for (let i in querys) {
      let query = querys[i].split('=');
      let key = query[0].substr(1), value = query[1];
      queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value;
    }
  }
  return queryObj;
}

export function getRandomString(length: number) {
  const text = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const rdmIndex = text => Math.random() * text.length | 0;
  let rdmString = '';
  for (; rdmString.length < length; rdmString += text.charAt(rdmIndex(text)));
  return rdmString;
}

export function handleRequestQs(requestData: any) {
  requestData.qs = getCurrentQs();
  requestData.subOrgId = getCurrentSubOrgId();
  return requestData;
}

export const SIT = -1 === browser.baseUrl.indexOf('ideal-uat.dbs.com') && -1 === browser.baseUrl.indexOf('ideal-uat.dbs.com');

const protractorConf = require('../../config/protractor.config.js');
export const SUSIT = -1 === protractorConf.config.newSamUrl.indexOf('116.12.252.152') && -1 === protractorConf.config.newSamUrl.indexOf('10.92.154.117');

export function formatStr2Money(num: string): string {
  let result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}

export function formatDate2String(date: Date, pattern: string = 'DD MMM YYYY'): string {
  let locale: string = 'en-gb';
  return moment(date.getTime()).locale(locale).format(pattern);
}

export async function scrollToTop() {
  await browser.executeScript('window.scrollTo(0,0)');
}

export async function scrollToBottom() {
  await browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
}

export async function scrollTo(x: any, y: any) {
  await browser.executeScript(`window.scrollTo(${x},${y})`);
}

export enum DATALIST_TYPE {
  DEFAULT = 1,
  PAYNOW
};

export enum PROJECT_TYPE {
  CB = 'CB',
  SU = 'SU',
  SSM = 'SSM',
  IDEALX = 'IDEALX'
};

log4js.configure({
  appenders: { autotest: { type: "file", filename: "c:/logs/autotest.log" } },
  categories: { default: { appenders: ["autotest"], level: "info" } },
});

export const logger = log4js.getLogger();