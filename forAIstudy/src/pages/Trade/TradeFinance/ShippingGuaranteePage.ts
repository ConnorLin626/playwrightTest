/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, HtmlSelect, waitForI3Loading } from '../../../lib';
import { ImportLCIssuancePage } from './ImportLCIssuancePage'

@log export class ShippingGuaranteePage extends ImportLCIssuancePage {

  @component('//select[@name="routingKy"]') public routeApplication: HtmlSelect;
  //input data
  @component('//select[@name="transactionValue.arcIsoCurrencyCdKy"]') public currency: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.issuedDateAsString"]') public issuedDate: TextInput;
  @component('//input[@name="entryOrAmendObject.shipFrom"]') public departure: TextInput;
  @component('//input[@name="entryOrAmendObject.shipTo"]') public destination: TextInput;
  @component('//input[@name="entryOrAmendObject.shipAirco"]') public shippingAirline: TextInput;
  @component('//input[@name="entryOrAmendObject.vesselFlightno"]') public vesselFlight: TextInput;
  @component('//input[@name="entryOrAmendObject.blReference"]') public blReference: TextInput;
  @component('//textarea[@name="entryOrAmendObject.descOfGood"]') public goodsDescription: TextInput;
  @component('//select[@name="entryOrAmendObject.collectOriginalsat"]') public collectOriginals: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.debitChargesto"]') public debitCharges: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.cntPerson"]') public cntPerson: TextInput;
  @component('//select[@name="entryOrAmendObject.telNumber1"]') public telephoneNumber: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.telNumber2"]') public areaCode: TextInput;
  @component('//input[@name="entryOrAmendObject.telNumber3"]') public number: TextInput;
  @component('//button[@name="jqi_state0_buttonYes" and @value="true"]') public yesButton: Button;
  @component('//select[@name="transactionValue.trdTrnAddrImporter.partyId"]') public applicantValue: TextInput;
  @component('//input[@id="submit_approve" and @value="Approve"]') public approve: Button;
  //Check page
  @component('//*[@id="mainContent"]/table[2]/tbody/tr[5]/td/table[2]/tbody/tr[3]/td[4]') public currentStatus: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }

  public async loadConditionForShippingGuaranteeEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
  }

  public async loadConditionForShippingGuaranteeViewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
  }
}
