/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading, HtmlSelect, pageSwitchWindow } from '../../../lib';

@log export class AccountReportsPage extends Page {
  constructor() {
    super();
  }

  //Standard  Account Report
  @component('//a[contains(@href,"app/smallbiz/user/createCustomReport?selectedReport=3")]') public IncomingOutgoingPersonaliseButton: Button;
  @component('//input[@name="customRptName"]') public customRptNameText: TextInput;
  @component('//select[@name="selectedTransactionTypes"]') public selectedTransactionTypes: HtmlSelect;
  @component('//*[@id="transactionSelect"]/option[2]') public selectedTransactionTypesBtn: Button;
  @component('//select[@name="fromRelDate"]') public fromRelDate: HtmlSelect;
  @component('//select[@name="toRelDate"]') public toRelDate: HtmlSelect;
  @component('//a[contains(@href,"/sbb/app/smallbiz/user/createCustomReport/preview")]') public previewButton: Button;
  @component('//a[contains(@href,"/sbb/app/smallbiz/user/createCustomReport/preview/save")]') public submitButton: Button;
  @component('//div[@id="cancelButton"]//a[contains(@href,"/s1gcb/sbb/app/smallbiz/user/updateCustomReport/cancel")]') public cancelButton: Button;
  @component('//a[contains(@href,"/sbb/app/smallbiz/user/updateCustomReport/preview")]/span[2]/span[text()="Continue"]') public continueOnEditPageButton: Button;

  //Personalised Report
  @component('//div[@class="jmk-wt-frame-title-container" and text()="Personalised Report"]') public PersonalisedReport: TextInput;
  //@component('//a[contains(@href,"user/updateCustomPmtReport/bulk") and text()="Edit"]') public firstEditButton: Button;
  @component('//*[@id="reportStd"]/tbody/tr[2]/td[2]/div[1]/ul/li/a/span[2]/span[text()="Edit"]') public firstEditButton: Button;
  @component('//*[@id="reportStd"]/tbody/tr[2]/td[2]/div[3]/ul/li/a[1]/span[2]/span[text()="View"]') public firstViewButton: Button;

  //Birt Report Page
  @component('//*[@id="__bookmark_1"]/tbody/tr[2]/td[4]/div') public transferSummaryAccountValue: TextInput;

  public async loadCondition() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.visibilityOf(this.PersonalisedReport.element), this.PersonalisedReport.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.IncomingOutgoingPersonaliseButton.element), this.IncomingOutgoingPersonaliseButton.getTimeOut());
  }

  public async loadConditionOnEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.IncomingOutgoingPersonaliseButton.element), this.IncomingOutgoingPersonaliseButton.getTimeOut());
    //await browser.wait(ExpectedConditions.elementToBeClickable(this.continueOnEditPageButton.element), this.continueOnEditPageButton.getTimeOut())
  }

  public async loadConditionOnPreviewPage() {
    await waitForI3Loading();
    //await browser.wait(ExpectedConditions.stalenessOf(this.previewButton.element), this.previewButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionOnReportPage() {
    await browser.sleep(5000); //wait for loading Report Page
    await pageSwitchWindow("plugin");
    await browser.wait(ExpectedConditions.stalenessOf(this.firstViewButton.element), this.firstViewButton.getTimeOut());
  }
}
