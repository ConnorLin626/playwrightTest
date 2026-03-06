/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { WebComponent } from './components';
import { component, log, findAll, getPageCompleteTimeOut, find, pageSwitchToI3, pageSwitchToUX, pageSwitchIframe,pageSwitchToTrade,scrollToTop, scrollToBottom, scrollTo } from './utils';

export abstract class Page {

  @component('//top-panel/div/div[starts-with(@class, "alert alert-success")]/ul') protected uxSuccessMsg: WebComponent;
  @component('//top-panel/div/div[starts-with(@class, "alert alert-error")]/ul') protected uxErrorMsg: WebComponent;
  @component('//dbs-top-panel/div/div[starts-with(@class, "alert alert-error")]') protected uxixErrorMsg: WebComponent;
  @component('//div[@class="alert__container--error ng-star-inserted"]') protected uxIxErrorMsg: WebComponent;
  @component('//top-panel/div/div[starts-with(@class, "alert alert-info")]/ul') protected uxInfoMsg: WebComponent;
  @component('//dbs-top-panel/div/div[starts-with(@class, "alert alert-info")]/ul') protected idealXInfoMsg: WebComponent;
  @component('//dbs-top-panel/div/div[starts-with(@class, "alert alert-info")]/ul') protected recurringInfoMsg: WebComponent;
  @component('//div[@id="referNoDiv"]/label[2]') protected auditConfirmationInfoMsg: WebComponent;
  @component('//top-panel/div/div[starts-with(@class, "alert alert-warning")]/ul') protected uxWarningMwg: WebComponent;

  @component('//*[@id="my_list"]/li') protected I3InfoMsg: WebComponent; //I3 Page

  @component('//p[@id="dialogMessage"]') protected uxRejectDialogInfoMsg: WebComponent; // Reject/Save Dialog Information Message

  @component('//*[@id="divMessages"]/div[1]/div/div[2]/li') protected tradeInfoMsg: WebComponent; // trade create LC Information Message

  @component('//*[@id="msgBlockError-errorText"]/b') protected SAMInfoMsg: WebComponent; // SAM Information Message

  @component('//*[@id="msgBlockSuccess-successText"]/b') protected SAMSuccessMsg: WebComponent; // SAM Information Message

  @component('//div[@id="filesExchangeInfoDiv"]') protected filesExchangeSuccessMsg: WebComponent; // SAM Information Message

  public constructor() {

  }

  public async loadCondition() {
    await this.loadCondition();
  };

  public async pageSwitchToI3() {
    await pageSwitchToI3()
  };

  public async pageSwitchToUX() {
    await pageSwitchToUX();
  };

   public async pageSwitchToTrade() {
    await pageSwitchToTrade();
  };


  public async pageSwitchIframe(iframe: string) {
    await pageSwitchIframe(iframe);
  }

  public async scrollToTop() {
    await scrollToTop();
  }

  public async scrollToBottom() {
    await scrollToBottom();
  }

  public async scrollTo(x: any, y: any) {
    await scrollTo(x, y);
  }

  private getMsgPath(element: WebComponent) {
    return element.addTail('/*/*');
  }

  private getPageCompleteTimeOut() {
    return getPageCompleteTimeOut();
  }

  public async hasUXSuccessMsg(msg: string): Promise<boolean> {
    return await this.containText(this.uxSuccessMsg, msg);
  }

  public async hasUXErrorMsg(msg: string): Promise<boolean> {
    return await this.containText(this.uxErrorMsg, msg);
  }
  public async hasUXIxErrorMsg(msg: string): Promise<boolean> {
    return await this.containText(this.uxIxErrorMsg, msg);
  }
  public async hasUXIxErrorMsg1(msg: string): Promise<boolean> {
    return await this.containText(this.uxixErrorMsg, msg);
  }


  public async hasUXInfoMsg(msg: string): Promise<boolean> {
    return await this.containText(this.uxInfoMsg, msg);
  }
  public async hasIdealxInfoMsg(msg: string): Promise<boolean> {
    return await this.containText(this.idealXInfoMsg, msg);
  }
  public async getUXInfoMsg(): Promise<string> {
    return await this.uxInfoMsg.getText();
  }

  public async hasUXWarningMsg(msg: string): Promise<boolean> {
    return await this.containText(this.uxWarningMwg, msg);
  }

  public async hasI3InfoMsg(msg: string): Promise<boolean> {
    return await this.containI3Text(this.I3InfoMsg, msg);
  }

  public async hasUxRejectDialogInfoMsg(msg: string): Promise<boolean> {
    return await this.containI3Text(this.uxRejectDialogInfoMsg, msg);
  }

  public async hasTradeInfoMsg(msg: string): Promise<boolean> {
    return await this.containI3Text(this.tradeInfoMsg, msg);
  }

  public async hasSAMInfoMsg(msg: string): Promise<boolean> {
    return await this.containI3Text(this.SAMInfoMsg, msg);
  }

  public async hasSAMSuccess(msg: string): Promise<boolean> {
    return await this.containI3Text(this.SAMSuccessMsg, msg);
  }

  public async hasFilesExchangeDialogInfoMsg(msg: string): Promise<boolean> {
    return await this.containI3Text(this.filesExchangeSuccessMsg, msg);
  }

  public async getInfoReferenceID(): Promise<string> {
    return await this.getReference(this.uxInfoMsg);
  }
  public async getIdealxInfoReferenceID(): Promise<string> {
    return await this.getReference(this.idealXInfoMsg);
  }

  public async getRecurringReferenceID(): Promise<string> {
    return await this.getDialogReference(this.recurringInfoMsg);
  }

  public async getAuditConfirmationReferenceID(): Promise<string> {
    return await this.getDialogReference(this.auditConfirmationInfoMsg);
  }
  public async getDialogReferenceID(): Promise<string> {
    return await this.getDialogReference(this.uxRejectDialogInfoMsg);
  }

  public async getI3ReferenceID(): Promise<string> {
    return await this.getDialogReference(this.I3InfoMsg);
  }

  protected async getReference(_element: WebComponent): Promise<string> {
    let reference = "";
    try {
      await browser.wait(ExpectedConditions.presenceOf(_element.element), this.getPageCompleteTimeOut()).then(async () => {
        await findAll(this.getMsgPath(_element)).each(async (_element) => {
          await _element.getText().then(async (text) => {
            let result = /(\EB(\w+))\ /.exec(text);
            if (null != result && 1 < result.length) {
              reference = result[1];
            }
          });
        });
      });
    } catch (TimeoutError) {
      throw Error(`Message Element not Presence,selector = ${_element.selector}`);
    }
    //console.error(reference);
    return reference;
  }

  protected async getDialogReference(_element: WebComponent): Promise<string> {
    let reference = "";
    try {
      await browser.wait(ExpectedConditions.presenceOf(_element.element), this.getPageCompleteTimeOut()).then(async () => {
        await _element.getText().then(async (text) => {
          let result = /(\EB(\w+))/.exec(text);
          if (null != result && 1 < result.length) {
            reference = result[1];
          }
          if(null == result){
            await console.log("AUHVTRef3:null"+reference)
          }
        });
      });
    } catch (TimeoutError) {
      throw Error(`Message Element not Presence,selector = ${_element.selector}`);
    }
    return reference;
  }

  protected async containText(_element: WebComponent, msg: string): Promise<boolean> {
    let ret = false;
    try {
      await browser.wait(ExpectedConditions.presenceOf(_element.element), this.getPageCompleteTimeOut()).then(async () => {
        await findAll(this.getMsgPath(_element)).each(async (_element) => {
          await _element.getText().then(async (text) => {
            if (-1 != text.toLocaleLowerCase().indexOf(msg.toLocaleLowerCase())) {
              ret = true;
            }
          });
        });
      });
    } catch (TimeoutError) {
      throw Error(`Message Element not Presence,selector = ${_element.selector}`);
    }
    return ret;
  }
  protected async containI3Text(_element: WebComponent, msg: string): Promise<boolean> {
    let ret = false;
    try {
      await browser.wait(ExpectedConditions.presenceOf(_element.element), this.getPageCompleteTimeOut()).then(async () => {
        await _element.getText().then(async (text) => {
          if (-1 != text.toLocaleLowerCase().indexOf(msg.toLocaleLowerCase())) {
            ret = true;
          }
        });
      });
    } catch (TimeoutError) {
      throw Error(`Message Element not Presence,selector = ${_element.selector}`);
    }
    return ret;
  }
}
