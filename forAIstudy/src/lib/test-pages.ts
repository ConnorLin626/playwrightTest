/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions, element, Button } from 'protractor';
import { MOUSE_TYPE } from '../config/menu'
import { getElementTimeOut, saveScreen, waitForUXLoading, pageSwitchToUX, getDataPath, pageSwitchWindow, getMenuItemTimeOut, scrollToTop } from './utils'

export abstract class TestPages {
  constructor() {

  }
  public async waitLoading() {
    await waitForUXLoading();
  }
  public async handlerStep(step: any) {
    if (undefined !== step && undefined !== step.type && undefined !== step.ele) {
      switch (step.type) {
        case MOUSE_TYPE.MOUSEOVER: await browser.wait(ExpectedConditions.visibilityOf(element(step.ele)), getMenuItemTimeOut()).then(async () => {
          await browser.actions().mouseMove(element(step.ele)).perform();
        }); break;
        case MOUSE_TYPE.CLICKLEFT: await browser.wait(ExpectedConditions.visibilityOf(element(step.ele)), getMenuItemTimeOut()).then(async () => {
          await browser.actions().mouseMove(element(step.ele)).click(Button.LEFT).perform();
        }); break;
        default: break;
      }
    }
  }

  public async switchToWindow(windowNameOrTigle: string) {
    await pageSwitchWindow(windowNameOrTigle);
  }
  public async handlerSteps(menuJson: any) {
    if (undefined !== menuJson && undefined !== menuJson.step1) {
      await this.handlerStep(menuJson.step1);
    }
    if (undefined !== menuJson && undefined !== menuJson.step2) {
      await this.handlerStep(menuJson.step2);
    }
    if (undefined !== menuJson && undefined !== menuJson.step3) {
      await this.handlerStep(menuJson.step3);
    }
  }

  public async openMenu(menuJson: any) {
    let retryTime = parseInt(browser.params.retryinteval.times);
    while (retryTime > 0) {
      try {
        await scrollToTop();
        await pageSwitchToUX();
        await this.waitLoading();
        await this.handlerSteps(menuJson);
        retryTime = 0;
      } catch (TimeoutError) {
        //await browser.sleep(browser.params.delay.caseFinishDelay);
        console.log(new Date(), `redu open menu => ${JSON.stringify(menuJson)}, retryTime= ${retryTime}`);
        retryTime = retryTime - 1;
        if (0 == retryTime) {
          throw Error(`can not open menu => ${JSON.stringify(menuJson)}`);
        }
        await scrollToTop();
      }
    }

    if (undefined !== menuJson && undefined !== menuJson.fileName) {
      await browser.wait(ExpectedConditions.visibilityOf(element(menuJson.step1.ele)), getElementTimeOut()).then(async () => {
        await this.saveScreen(menuJson.fileName);
      });
    }
  }

  public async saveScreen(fileName: string) {
    return await saveScreen(fileName);
  }

  public async dispose(): Promise<void> {
    await browser.close();
  }

  public fetchTestData(fileName: string) {
    let file = '';
    try {
      let fs = require('fs');
      file = getDataPath() + `/${fileName}`;
      let data = fs.readFileSync(file, 'utf-8');
      if (data) {
        return JSON.parse(data);
      }
      throw new Error('fetch json file data failed or file is empty.');
    } catch (error) {
      console.log(`error fetch json file,file path: ${file}`);
      throw new Error(`error => ${error}`);
    }
  }
}
