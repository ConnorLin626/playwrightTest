/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, HtmlSelect, waitForI3Loading } from "../../../lib";
import { ImportLCIssuancePage } from './ImportLCIssuancePage'

@log export class ExportBillUnderCollectionPage extends ImportLCIssuancePage {

  //input data
  @component('//select[@name="transactionValue.trdTrnAddrImporter.partyId"]') public drawer: HtmlSelect;
  @component('//input[@name="transactionValue.trdTrnAddrKyDrweBank.partyId"]') public partyId: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrExporterBank.partyId"]') public collectFromPartyId: TextInput;
  @component('//select[@name="transactionValue.arcIsoCurrencyCdKy"]') public currency: HtmlSelect;
  @component('//select[@id="advb_arcCountryCdKy" and @name="transactionValue.trdTrnAddrExporterBank.arcCountryCdKy"]') public collectFromBankCountry: HtmlSelect;
  @component('//input[@name="transactionValue.trdTrnAddrExporterBank.collectSwift"]') public collFromBnkSWIFTAdrs: TextInput;
  @component('//input[@name="entryOrAmendObject.tenorDaysAsString"]') public tenorDays: TextInput;
  @component('//textarea[@name="entryOrAmendObject.mixedPayDetails"]') public mixedPaymentDetails: TextInput;
  @component('//input[@id="vesselNameFlightNo"]') public vesselNameFlightNo: TextInput;
  @component('//input[@id="iMONo"]') public imoNo: TextInput;
  @component('//input[@id="edcDepartureDate"]') public departureDate: TextInput;
  @component('//input[@id="blAwbOrCargoReceiptNo"]') public blAwbOrCargoReceiptNo: TextInput;
  @component('//input[@id="portofloading"]') public portofloading: TextInput;
  @component('//input[@id="portofdischarge"]') public portofdischarge: TextInput;
  @component('//select[@name="entryOrAmendObject.documentAgainst"]') public documentAgainst: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.protestCd"]') public protestCd: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.ourBankChargeForCd"]') public yourBankCharges: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.osBankChargeForCd"]') public osBankChargeForCd: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.debitAccounts[0].bnkacc"]') public accountNumber: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.debitAccounts[0].amount"]') public amount: TextInput;
  @component('//select[@name="entryOrAmendObject.debitAccounts[0].fxType"]') public fxType: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.contactPerson"]') public cntPerson: TextInput;
  @component('//select[@name="entryOrAmendObject.telNumber1"]') public telephoneNumber: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.telNumber2"]') public areaCode: TextInput;
  @component('//input[@name="entryOrAmendObject.telNumber3"]') public number: TextInput;
  @component('//input[@id="fillinandbill"]') public fillBillExhange: Button;
  @component('//input[@name="transactionValue.trdTrnAddrKyDrwe.name"]') public drawName: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrKyDrwe.addr1"]') public drawNameAddress: TextInput;
  @component('//textarea[@name="entryOrAmendObject.valuereceived"]') public valueReceived: TextInput;
  @component('//input[@id="fillInAndprint"]') public fillInAndPrintInvoiceDet: Button;
  @component('//input[@id="quantityAsString"]') public quanity: TextInput;
  @component('//select[@id="arcIsoAddCurrencyCdKy"]') public fillInCurrency: HtmlSelect;
  @component('//input[@id="amountAsString"]') public fillInAmount: TextInput;
  @component('//textarea[@id="descOfGood"]') public descOfGood: TextInput;
  @component('//button[@id="jqi_state0_buttonYes"]') public yesButton: Button;
  @component('//select[@name="transactionValue.trdInstrument.trdRoutingKy"]') public applicantValue: TextInput;
  @component('//input[@id="submit_approve" and @value="Approve"]') public approve: Button;
  @component('//input[@name="entryOrAmendObject.transactionDateAsString"]') public transactionDate: TextInput;

  // @component('//input[@name="transactionValue.trdInstrument.lcNumber"]') public lcNumber: TextInput;
  // @component('//input[@name="entryOrAmendObject.tenorDateAsString"]') public maturityDate: TextInput;
  // @component('//select[@name="entryOrAmendObject.originaldcamendment"]') public originalAndAmendment: HtmlSelect;
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
