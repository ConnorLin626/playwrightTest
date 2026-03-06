/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, waitForI3Loading } from '../../../lib';

@log export class TradeFinanceARFPage extends Page {

  @component('//select[@id="product"]') public selectProductType: HtmlSelect;
  @component('//select[@id="subProduct"]') public selectSubProductType: HtmlSelect;
  //Create Transaction page Continue button
  @component('//input[@name="submit_continue"]') public continueButton: Button;
  @component('//select[@id="routingKy"]') public selectRouting: HtmlSelect;
  @component('//input[@id="custRef"]') public custRef: TextInput;
  //Create Transaction Orgination page Continue button
  @component('//input[@name="submit_save"]') public continueSaveButton: Button;

  //Accounts Receivable Financing(BRD/BRS) Application detail
  @component('//select[@id="trdTrnAddrImporter.partyId.finance"]') public applicant: HtmlSelect;
  @component('//select[@id="invoicecur"]') public invoiceCcy: HtmlSelect;
  @component('//input[@id="invoiceAmt"]') public invoiceAmt: TextInput;
  @component('//select[@id="financingcurrency"]') public financeCcy: HtmlSelect;
  @component('//textarea[@id="descOfGood"]') public descriptionOfGoods: TextInput;
  @component('//input[@id="cntPerson"]') public contactPerson: TextInput;
  @component('//select[@id="telNumber1"]') public telCtrycode: HtmlSelect;
  @component('//input[@id="telNumber2"]') public telAreacode: TextInput;
  @component('//input[@id="telNumber3"]') public telNumber: TextInput;
  @component('//select[@id="attachoption"]') public attachmentsOptions: HtmlSelect;
  @component('//select[@id="debitAccountOnMaturity"]') public debitAcctOnMaturity: HtmlSelect;
  @component('//select[@id="debitChargesFromAnotherAccount"]') public debitChargesFromAnotherAcct: HtmlSelect;
  @component('//input[@name="submit_saveEdit"]') public submitButton: Button;
  @component('//button[@id="jqi_state0_buttonYes"]') public yesButton: Button;

  //Accounts Receivable Financing(BRD/BRS) Application View
  @component('//input[@id="txtStatusCd"]') public applicationStatus: TextInput;
  @component('//select[@id="trdTrnAddrImporter.partyId.finance"]') public applicantValue: TextInput;
  @component('//input[@id="invoiceAmt"]') public invoiceAmtView: TextInput;
  @component('//select[@id="debitChargesFromAnotherAccount"]') public debitChargesFromAnotherAcctValue: TextInput;

  //Accounts Receivable Financing(BRD/BRS) Application View
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
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }

  public async loadConditionForARFEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
  }

  public async loadConditionForARFConfirmPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.yesButton.element), this.yesButton.getTimeOut());
  }

  public async loadConditionForARFViewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
  }
}