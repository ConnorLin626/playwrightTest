/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, } from '../../../lib';

@log export class TradeApplicationManagerPage extends Page {
  constructor() {
    super();
  }

  //Corporation Link
  @component('//input[@name="search" and @value="Search >>"]') public searchHomeButton: Button;
  @component('//input[@name="submit_affiliate"]') public submitAffiliateButton: Button;
  @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[4]/a') public topCorporationsLink: Button;
  @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
  @component('//select[@name="columnName"]') public selectColumn: HtmlSelect;
  @component('//input[@name="columnValue" and @onkeydown="onKey(event)"]') public inputAffiliate: TextInput;
  @component('//input[@name="submit_search"]') public searchCorpButton: Button;
  @component('/html/body/table[3]/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[3]/a') public viewCorpLink: Button;

  //Trade Link-Functional
  @component('//span[@id="exp_4"]') public showUsersList: Button;
  @component('//*[@id="item_4"]/table/tbody/tr[4]/td[2]/a') public editUserLink: Button;
  @component('//*[@id="item_4"]/table/tbody/tr[4]/td[5]/a') public approveUserLink: Button;
  @component('//a[contains(@href,"corp/companyEditUser/UserTradeFinanceAccess")]') public editTradeLink: Button;
  @component('//select[@id="userTimeZone"]') public userTimeZone: HtmlSelect;
  @component('//input[@id="isModelUser1"]') public modelUser: Button;
  @component('//input[@name="submit_saveEdit" and @value="Save"]') public saveButton: Button;

  public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchHomeButton.element), this.searchHomeButton.getTimeOut());
  }

  public async loadConditionForTradePage() {
    await this.pageSwitchIframe('//iframe[@id="iframeName"]');
    await browser.wait(ExpectedConditions.visibilityOf(this.modelUser.element), this.modelUser.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.modelUser.element), this.modelUser.getTimeOut());
  }

  public async loadConditionOnEditUserPage() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.editTradeLink.element), this.editTradeLink.getTimeOut());
  }
}
