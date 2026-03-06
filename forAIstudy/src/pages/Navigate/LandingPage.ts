/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { WebComponent, Page, component, log, Button, parseUrl } from '../../lib';
import * as _ from 'lodash';

@log export class LandingPage extends Page {

  @component('//*[@id="page-container"]/my-app/main-page/mast-head/div/div[2]/header/div[2]') public logoutButton: WebComponent;
  @component('//*[@id="navBBTopDashLinkText"]') public homeMenu: WebComponent;
  @component('//*[@id="Close"]') public PayNowContinueButton: Button;
  @component('//*[@id="iframe_top"]') public topIframe: WebComponent;

  constructor() {
    super();
  }

  public async handlerPayNow(): Promise<void> {
    await this.loadCondition();
    await this.PayNowContinueButton.click();
  }

  public async loadCondition() {
    await browser.wait(ExpectedConditions.visibilityOf(this.PayNowContinueButton.element), this.PayNowContinueButton.getTimeOut());
  }

  public async logoutCB(): Promise<void> {
    await this.loadCondition();
    await this.logoutButton.click();
  }

  public async saveLoginParams(): Promise<void> {
    await this.topIframe.getAttribute('src').then(async (text) => {
      let paramsArr = parseUrl(text);
      browser.params.url.qs = paramsArr['qs'];
      browser.params.url.subOrgId = paramsArr['subOrgId'];
      browser.params.url.isSingleView = paramsArr['isSingleView'];
    });

  }

}
