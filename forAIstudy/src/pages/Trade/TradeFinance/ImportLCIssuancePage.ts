/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, waitForI3Loading, pageSwitchWindow } from '../../../lib';

@log export class ImportLCIssuancePage extends Page {

  @component('//input[@name="submit_continue"]') public continueButton: Button;
  @component('//select[@name="instrumentType" and @id="product"]') public selectProductType: HtmlSelect;
  @component('//select[@name="subinstrumentType" and @id="subProduct"]') public selectSubProductType: HtmlSelect;
  @component('//select[@id="routingKy"]') public selectRouting: HtmlSelect;
  @component('//input[@id="custRef"]') public customerRef: TextInput;
  @component('//input[@name="submit_save"]') public continueSaveButton: Button;

  //Import LC Issuance Application Detail Page
  @component('//input[@name="submit_saveEdit"]') public submit: Button;
  @component('//select[@id="applicant"]') public selectApplicant: HtmlSelect;
  @component('//input[@name="transactionValue.trdTrnAddrExporter.partyId"]') public beneficiaryPartyID: TextInput;
  @component('//input[@id="expiryDate" and @name="entryOrAmendObject.expiryDateAsString"]') public expiryDate: TextInput;
  @component('//select[@name="entryOrAmendObject.expiryPlace"]') public expiryPlace: HtmlSelect;
  @component('//input[@name="transactionValue.transAmountAsString"]') public transAmount: TextInput;
  @component('//select[@id="arcIsoCurrencyCdKy" and @name="transactionValue.arcIsoCurrencyCdKy"]') public arcIsoCurrencyCdKy: HtmlSelect;
  @component('//input[@id="tenorDays" and @name="entryOrAmendObject.tenorDays"]') public tenorDays: TextInput;
  @component('//select[@id="tenorPhrase" and @name="entryOrAmendObject.tenorPhrase"]') public tenorPhrase: HtmlSelect;
  @component('//input[@id="tenorDateAsString" and @name="entryOrAmendObject.tenorDateAsString"]') public tenorDate: TextInput;
  @component('//select[@id="transferableCd" and @name="entryOrAmendObject.transferableCd"]') public creditTransferable: HtmlSelect;
  @component('//textarea[@id="descOfGood" and @name="entryOrAmendObject.descOfGood"]') public descOfGoods: TextInput;
  @component('//textarea[@id="shipmentPeriod" and @name="entryOrAmendObject.shipmentPeriod"]') public shipmentPeriod: TextInput;
  @component('//select[@id="incotermCd" and @name="entryOrAmendObject.incotermCd"]') public shippingTerms: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.insuranceByCd"]') public insuranceByCd: HtmlSelect;
  @component('//select[@id="bankCharges" and @name="entryOrAmendObject.bankCharges"]') public bankCharges: HtmlSelect;
  @component('//select[@id="debitAccNo" and @name="entryOrAmendObject.debitAccNo"]') public debitAccNo: HtmlSelect;
  @component('//textarea[@id="bankChgOtherDesc" and @name="entryOrAmendObject.bankChgOtherDesc"]') public bankChgOtherDesc: TextInput;
  @component('//input[@name="entryOrAmendObject.cntPerson"]') public cntPerson: TextInput;
  @component('//select[@name="entryOrAmendObject.telNumber1"]') public telephoneNumber: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.telNumber2"]') public areaCode: TextInput;
  @component('//input[@name="entryOrAmendObject.telNumber3"]') public number: TextInput;
  //Approve Import LC Issuance
  @component('//input[@id="txtStatusCd"]') public applicationStatus: TextInput;
  @component('//select[@id="applicant"]') public applicantValue: TextInput;
  @component('//input[@id="submit_approve" and @type="submit"]') public approve: Button;
  //Confirm Popup dialog
  @component('//button[@value="false"]') public cancelButton: Button;
  @component('//button[@name="jqi_state0_buttonConfirm" and @value="true"]') public confirmButton: Button;
  @component('//input[@id="approvePasswordTmp"]') public approvePassword: TextInput;
  //Txn Detail Page
  @component('//*[@id="mainContent"]/table[2]/tbody/tr[5]/td/table[2]/tbody/tr[4]/td[4]') public currentStatus: TextInput;
  @component('//input[@id="manageDocs"]') public manageDoc: Button;

  @component('//input[@id="text1"]') public description1: TextInput;
  @component('//html/body/table/tbody/tr/td[1]') public dateTime: TextInput;
  @component('//*[@id="attachmentList"]/tbody/tr/td[1]') public tableList: TextInput;
  @component('//*[@id="divAttachDpiWaring"]/table/tbody/tr/td[2]/strong') public errorMessage: TextInput;
  //@component('//html/body/div[1]/table/tbody/tr[9]/td[2]/table/tbody/tr/td[2]/div/table[2]/tbody/tr[185]/td[2]/div[3]/table/tbody/tr/td[2]') public errorMessage: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }

  public async loadConditionForImportLCEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
  }

  public async loadConditionForImportLCViewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
  }
  public async loadConditionForUpload() {
    await pageSwitchWindow("//div[@id='mainContent']");
  }
}
