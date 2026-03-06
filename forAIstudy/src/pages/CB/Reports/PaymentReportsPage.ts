/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading, HtmlSelect, pageSwitchWindow } from '../../../lib';

@log export class PaymentReportsPage extends Page {
  constructor() {
    super();
  }

  //Standard  Payment Report
  @component('//a[contains(@href,"user/createCustomPmtReport/bulk?selectedReport=22")]') public bulkPaymentPersonaliseButton: Button;
  @component('//a[contains(@href,"user/createCustomPmtReport?selectedReport=20")]') public transferSummaryPersonaliseButton: Button;
  @component('//a[contains(@href,"user/createCustomPmtReport?selectedReport=21")]') public transferDetailPersonaliseButton: Button;
  @component('//a[contains(@href,"user/createCustomPmtReport?selectedReport=49")]') public transferSummaryDetailPersonaliseButton: Button;
  @component('//a[contains(@href,"user/viewPaymentReport?executableName=/s1/TransferSumDetail.rox&selectedReport=49")]') public transferSummaryDetailViewButton: Button;
  @component('//a[contains(@href,"user/createCustomPmtReport?selectedReport=45")]') public transferSummaryDetailPersonaliseUAT: Button;
  @component('//a[contains(@href,"user/viewPaymentReport?executableName=/s1/TransferSumDetail.rox&selectedReport=45")]') public transferSummaryDetailViewUAT: Button;
  @component('//input[@name="customRptName"]') public customRptNameText: TextInput;
  @component('//input[@name="dateRange" and @value="0"]') public absoluteDateValue: Button;
  @component('//input[@name="fromDate"]') public fromDate: TextInput;
  @component('//input[@name="toDate"]') public toDate: TextInput;
  @component('//select[@name="fromRelDate"]') public fromRelDate: HtmlSelect;
  @component('//select[@name="fromRelDate"]') public toRelDate: HtmlSelect;
  @component('//a[@onclick="submit_preview()"]') public continueButton: Button;
  @component('//a[@onclick="submit_save()"]') public updateButton: Button;
  @component('//a[@onclick="submit_cancel()"]') public cancelButton: Button;
  @component('//input[@name="customerReference"]') public customerReferenceText: TextInput;
  @component('//select[@name="accounts"]') public accounts: HtmlSelect;
  @component('//select[@name="pmtTypes"]') public pmtTypes: HtmlSelect;
  @component('//select[@name="achStatus"]') public status: HtmlSelect;
  @component('//select[@name="txnGroup"]') public deliveryMode: HtmlSelect;

  //PersonalisedReport
  @component('//div[@class="jmk-wt-frame-title-container" and text()="Personalised Payment Reports"]') public PersonalisedReport: TextInput;
  //@component('//a[contains(@href,"user/updateCustomPmtReport/bulk") and text()="Edit"]') public firstEditButton: Button;
  @component('//*[@id="FirstPanel"]/tbody/tr[2]/td[2]/div[1]/ul/li/a/span[2]/span[text()="Edit"]') public firstEditButton: Button;
  @component('//*[@id="FirstPanel"]/tbody/tr[2]/td[2]/div[3]/ul/li/a/span[2]/span[text()="View"]') public firstViewButton: Button;
  @component('//*[@id="FirstPanel"]/tbody/tr[2]/td[2]/div[2]/ul/li/a/span[2]/span[text()="Delete"]') public firstDeleteButton: Button;

  //Birt Report Page - Payment Report
  @component('//*[@id="__bookmark_1"]/tbody/tr[2]/td[4]/div') public transferSummaryAccountValue: TextInput;
  @component('//img[contains(@class, "style_") and contains(@src,"/I3BirtReports/preview")]') public DBSLogo: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_4_")]/tbody/tr[2]/td[3]/div') public bulkPaymentAccountValue: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_3_")]/tbody/tr[3]/td[3]/div') public transferDetailAccountValue: TextInput;


  //Remittance Report - HK FPS
  @component('//div[@class="style_4" and contains(@id,"AUTOGENBOOKMARK_3_")]') public reportTitle: TextInput;
  @component('//div[@class="style_16" and contains(text(),"CXBSNS")]') public purposeCodeValue: TextInput;

  //Reports
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_")]/tbody/tr[1]/td[1]/div') public printByMsg: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_4_")]/tbody/tr[2]/td[3]/div') public accountValue4Reports: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_4_")]/tbody/tr[3]/td[3]/div') public accountValue4Reports1: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_3_")]/tbody/tr[3]/td[3]/div') public accountValue4Reports2: TextInput;
  @component('//table[@id="__bookmark_1"]/tbody/tr[3]/td[3]/div') public accountValue4StatusReports: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_6_")]/tbody/tr[4]/td[3]/div') public accountValue4PayAdvReports: TextInput;
  @component('//table[@id="__bookmark_1"]/tbody/tr[3]/td[1]/div') public accountValue4PayrollSumReports: TextInput;
  @component('//table[@id="__bookmark_1"]/tbody/tr[2]/td[4]/div') public accountValue4TranSumReports: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_17_")]/tbody/tr[1]/td[3]/div') public accountValue4PayCur: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_6_")]/tbody/tr[1]/td[3]/div') public fileNameValue4FileReports: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_5_")]/tbody/tr[1]/td[3]/div') public fileNameValue4FileReports1: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_5_")]/tbody/tr[2]/td[3]/div') public accountValue4FileReports: TextInput;

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.visibilityOf(this.PersonalisedReport.element), this.PersonalisedReport.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transferSummaryPersonaliseButton.element), this.transferSummaryPersonaliseButton.getTimeOut());
  }
  public async loadConditionOnEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.bulkPaymentPersonaliseButton.element), this.bulkPaymentPersonaliseButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }

  public async loadConditionOnPreviewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.continueButton.element), this.continueButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.updateButton.element), this.updateButton.getTimeOut());
  }

  public async loadConditionOnReportPage() {
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(ExpectedConditions.stalenessOf(this.firstViewButton.element), this.firstViewButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transferSummaryAccountValue.element), this.transferSummaryAccountValue.getTimeOut());
  }

  public async loadConditionForDBSLogoOnReportPage() {
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(ExpectedConditions.stalenessOf(this.firstViewButton.element), this.firstViewButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.DBSLogo.element), this.DBSLogo.getTimeOut());
  }

  public async loadConditionForRemittanceReportTitlePage() {
    await browser.sleep(5000); //wait for loading Report Page
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(ExpectedConditions.elementToBeClickable(this.reportTitle.element), this.reportTitle.getTimeOut());
  }

  public async loadConditionOnTxnDetailsReportPage() {
    await browser.sleep(5000);
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(ExpectedConditions.stalenessOf(this.firstViewButton.element), this.firstViewButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transferDetailAccountValue.element), this.transferDetailAccountValue.getTimeOut());
  }


}
