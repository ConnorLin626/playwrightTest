/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, DateSelect, pageSwitchWindow, waitForUXLoading } from '../../../lib';

@log export class LoansPage extends Page {
  constructor() {
    super();
  }

  @component('//h1[@id="LoansTitle"]') public loansTitle: TextInput;
  @component('//date-picker[@formcontrolname="maDateFrom"]') public dateFromSelect: DateSelect;
  @component('//date-picker[@formcontrolname="maDateTo"]') public dateToSelect: DateSelect;
  @component('//input[@id="Show ALL"]') public showAllCheckBox: Button;
  @component('//input[@id="BLOCK DISCOUNTING"]') public blockDiscountingCheckBox: Button;
  @component('//div[@id="loansItem-0"]') public firstListItem: TextInput;
  @component('//a[@id="ux-tab-SHOWALL"]') public tabShowAll: Button;
  @component('//a[@id="ux-tab-ACTIVE"]') public tabActive: Button;
  @component('//a[@id="ux-tab-OVERDUE"]') public tabOverdue: Button;
  @component('//a[@id="ux-tab-CLOSED"]') public tabClosed: Button;
  @component('//a[@id="loansItem-generateDetailReport-0"]') public generateDetailReportBtn: Button;
  @component('//button[@name="modify-search"]') public modifySearchButton: Button;
  @component('//button[@name="search"]') public searchButton: Button;

  // report
  @component('//img[@class="style_3" and contains(@src,"/I3BirtReports/preview")]') public DBSLogo: TextInput;
  @component('//table[contains(@id,"AUTOGENBOOKMARK_5")]/tbody/tr[2]/td[3]/div') public bulkPaymentAccountValue: TextInput;

  public async loadCondition() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.modifySearchButton.element), this.modifySearchButton.getTimeOut());
  }

  public async loadCondition4Search() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.firstListItem.element), this.firstListItem.getTimeOut());
  }

  public async loadConditionForDBSLogoOnReportPage() {
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(ExpectedConditions.stalenessOf(this.generateDetailReportBtn.element), this.generateDetailReportBtn.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.DBSLogo.element), this.DBSLogo.getTimeOut());
  }
}