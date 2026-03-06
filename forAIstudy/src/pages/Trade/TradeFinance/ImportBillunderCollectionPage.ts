/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, devWatch, waitForI3Loading } from '../../../lib';

@log export class ImportBillunderCollectionPage extends Page {


  @component('//input[@id="transPendingApprlBtn"]') public transPendingApprlBtn: Button;
  @component('//input[@id="transactionValue.trdTrnCust.status"]') public status: TextInput;
  @component('//*[@id="trdRoutingKy"]') public sendResponseTo: HtmlSelect;
  @component('//*[@id="customerRespCd"]') public responseOptions: HtmlSelect;
  @component('//input[@id="entryOrAmendObject.contactName"]') public contactPerson: TextInput;
  @component('//select[@id="telNumber1"]') public telCtrycode: HtmlSelect;
  @component('//input[@id="entryOrAmendObject.telNumber2"]') public telAreacode: TextInput;
  @component('//input[@id="entryOrAmendObject.telNumber3"]') public telNumber: TextInput;
  @component('//select[@id="faxNumber1"]') public faxCtrycode: HtmlSelect;
  @component('//input[@id="entryOrAmendObject.faxNumber2"]') public faxAreacode: TextInput;
  @component('//input[@id="entryOrAmendObject.faxNumber3"]') public faxNumber: TextInput;
  @component('//input[@id="transactionValue.trdInstrument.issuingBankRef"]') public ref: Button;

  //Approve Details
  @component('//input[@id="submit_saveEdit"]') public submitBtn: Button;
  @component('//input[@id="submit_approve"]') public approveButton: Button;
  @component('//button[@id="jqi_state0_buttonConfirm"]') public confirmButton: Button;
  @component('//input[@id="approvePasswordTmp"]') public approvePassword: TextInput;
  //Transaction Review Detail Page
  @component('//*[@id="mainContent"]/table[2]/tbody/tr[5]/td/table[2]/tbody/tr[4]/td[4]') public currentStatus: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transPendingApprlBtn.element), this.transPendingApprlBtn.getTimeOut());
  }

  public async loadConditionForIBUCEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.status.element), this.status.getTimeOut());
  }

  public async loadConditionForIBUCViewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
  }


}
