/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, HtmlSelect, waitForI3Loading, OptionSelect } from "../../../lib";
import { ImportLCIssuancePage } from './ImportLCIssuancePage'

@log export class ExportLCPage extends ImportLCIssuancePage {

  //input data
  @component('//button[@name="jqi_state0_buttonYes" and @value="true"]') public yesButton: Button;
  @component('//input[@name="transactionValue.trdTrnAddrImporter.name"]') public applicantName: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrImporter.addr1"]') public applicantNameAddress: TextInput;
  @component('//select[@id="transactionValue.trdTrnAddrImporter.arcCountryCdKy" and @name="transactionValue.trdTrnAddrImporter.arcCountryCdKy"]') public applicantCountry: HtmlSelect;
  @component('//input[@name="transactionValue.trdTrnAddrImporterBank.name"]') public issuingBankName: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrImporterBank.addr1"]') public issuingBankNameAddress: TextInput;
  @component('//select[@id="transactionValue.trdTrnAddrImporterBank.arcCountryCdKy"]') public issuingBankCountry: HtmlSelect;
  @component('//input[@name="transactionValue.trdTrnAddrImporterBank.swiftCodeBank"]') public issuingBankSWIFTAddress: TextInput;
  @component('//input[@name="transactionValue.trdInstrument.lcNumber"]') public lcNumber: TextInput;
  @component('//input[@name="entryOrAmendObject.datedAsString"]') public dated: TextInput;
  @component('//input[@name="entryOrAmendObject.tenorDateAsString"]') public maturityDate: TextInput;
  @component('//textarea[@id="descOfGood"]') public descOfGood: TextInput;
  @component('//textarea[@name="entryOrAmendObject.mixedPaymentDetails"]') public mixedPaymentDetails: TextInput;
  @component('//input[@id="vesselNameFlightNo"]') public vesselNameFlightNo: TextInput;
  @component('//input[@id="iMONo"]') public imoNo: TextInput;
  @component('//input[@id="departureDate"]') public departureDate: TextInput;
  @component('//input[@id="blAwbOrCargoReceiptNo"]') public blAwbOrCargoReceiptNo: TextInput;
  @component('//input[@id="portofloading"]') public portofloading: TextInput;
  @component('//input[@id="portofdischarge"]') public portofdischarge: TextInput;
  @component('//select[@name="transactionValue.arcIsoCurrencyCdKy"]') public currency: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.originaldcamendment"]') public originalAndAmendment: HtmlSelect;
  @component('//input[@id="toRemitCheckBox"]') public toRemitCheckBox: Button;
  @component('//input[@id="entryOrAmendObject.payeeBnkAcct"]') public payeeAcctNo: TextInput;
  @component('//input[@id="transactionValue.trdTrnAddrPayeeBank.name"]') public payeeBnkName: TextInput;
  @component('//input[@id="transactionValue.trdTrnAddrPayeeBank.addr1"]') public payeeBankAddr1: TextInput;
  @component('//select[@id="transactionValue.trdTrnAddrPayeeBank.arcCountryCdKy"]') public payeeBankCountry: HtmlSelect;
  @component('//input[@id="transactionValue.trdTrnAddrPayeeBank.swiftCodeBank"]') public payeeBankSwift: TextInput;
  @component('//input[@id="inBankCheckBox"]') public inBankCheckBox: Button;
  @component('//input[@id="transactionValue.trdTrnAddrIntermediaryBank.name"]') public intermediaryBankName: TextInput;
  @component('//input[@id="transactionValue.trdTrnAddrIntermediaryBank.addr1"]') public intermediaryBankAddr1: TextInput;
  @component('//select[@id="transactionValue.trdTrnAddrIntermediaryBank.arcCountryCdKy"]') public intermediaryBankCountry: HtmlSelect;
  @component('//input[@id="transactionValue.trdTrnAddrIntermediaryBank.swiftCodeBank"]') public intermediaryBankSWIFT: TextInput;
  @component('//input[@name="entryOrAmendObject.contactPerson"]') public cntPerson: TextInput;
  @component('//select[@name="entryOrAmendObject.telNumber1"]') public telephoneNumber: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.telNumber2"]') public areaCode: TextInput;
  @component('//input[@name="entryOrAmendObject.telNumber3"]') public number: TextInput;
  @component('//select[@name="entryOrAmendObject.faxNumber1"]') public faxNumber: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.faxNumber2"]') public faxAreaCode: TextInput;
  @component('//input[@name="entryOrAmendObject.faxNumber3"]') public faxNum: TextInput;
  @component('//select[@name="transactionValue.trdInstrument.trdRoutingKy"]') public applicantValue: TextInput;
  @component('//input[@name="entryOrAmendObject.fillinAndPrintBill"]') public fillBillExhange: Button;
  @component('//input[@name="transactionValue.trdTrnAddrKyDrweBank.name"]') public drweBankName: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrKyDrweBank.addr1"]') public drweBankAddr1: TextInput;
  @component('//input[@id="submit_approve" and @value="Approve"]') public approve: Button;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }

  public async loadConditionForConfirmPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.yesButton.element), this.yesButton.getTimeOut());
  }

  public async loadConditionForExportLCEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
  }

  public async loadConditionForExportLCViewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
  }
}
