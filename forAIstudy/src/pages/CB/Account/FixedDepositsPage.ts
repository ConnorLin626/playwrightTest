/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect, DateSelect, pageSwitchWindow } from '../../../lib';

@log export class FixedDepositsPage extends Page {

  // fixed deposits page
  @component('//a[@id="ux-tab-TRANSACTION"]') public viewFDTab: Button;
  @component('//button[@name="modify-search"]') public modifySearchButton: Button;
  @component('h1[@id="fixedDepositTitle"]') public fixedDepositTitle: TextInput;
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public accountSelect: OptionSelect;
  @component('//date-picker[@formcontrolname="fromMaturityDate"]') public dateFromSelect: DateSelect;
  @component('//date-picker[@formcontrolname="fromToMaturityDate"]') public dateToSelect: DateSelect;
  @component('//p-auto-complete[@formcontrolname="fromCurrency"]') public fromCurrencySelect: OptionSelect;
  @component('//a[@id="ux-tab-FD_ACTIVE"]') public activeTab: Button;
  @component('//a[@id="ux-tab-MATURED"]') public maturedTab: Button;
  @component('//a[@id="ux-tab-SHOWALL"]') public showAllTab: Button;
  @component('//div[@id="fixedDepositItem-0"]') public firstListItem: TextInput;
  @component('//span[@id="labelShowDetails-0"]') public showMoreDetailLink: Button;
  @component('//p[@id="fixedDepositItem-SumDet-interestRate-0"]') public moreDetailItemInterestRate: TextInput;
  @component('//button[@id="generateDetailReport-0"]') public generateDetailReportBtn: Button;
  @component('//button[@name="search"]') public searchButton: Button;
  // report
  @component('//img[@class="style_3" and contains(@src,"/I3BirtReports/preview")]') public DBSLogo: TextInput;
  @component('//table[contains(@id,"AUTOGENBOOKMARK_6")]/tbody/tr[1]/td[3]/div') public bulkPaymentAccountValue: TextInput;

  constructor() {
    super();
  }

  public async loadConditionForFD() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.viewFDTab.element), this.viewFDTab.getTimeOut());
  }

  public async loadCondition() {
    await waitForUXLoading();
    browser.sleep(6000);
    await browser.wait(ExpectedConditions.elementToBeClickable(this.modifySearchButton.element), this.modifySearchButton.getTimeOut());
  }

  public async loadConditionForSearchSection() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.stalenessOf(this.modifySearchButton.element), this.modifySearchButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.accountSelect.element), this.accountSelect.getTimeOut());
  }

  public async loadCondition4Search() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchButton.element), this.searchButton.getTimeOut());
  }

  public async loadCondition4ShowMoreDetail() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.moreDetailItemInterestRate.element), this.moreDetailItemInterestRate.getTimeOut());
  }

  public async loadConditionForDBSLogoOnReportPage() {
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(ExpectedConditions.stalenessOf(this.generateDetailReportBtn.element), this.generateDetailReportBtn.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.DBSLogo.element), this.DBSLogo.getTimeOut());
  }
}