/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, HtmlSelect, waitForI3Loading } from '../../../lib';
import { ImportLCIssuancePage } from './ImportLCIssuancePage'

@log export class BankerGuaranteeIssuancePage extends ImportLCIssuancePage {

  @component('//select[@name="routingKy"]') public routeApplication: HtmlSelect;
  @component('//select[@id="applicationType"]') public applicationType: HtmlSelect;
  //input data
  @component('//select[@name="transactionValue.trdTrnAddrImporter.partyId"]') public selectApplicant: HtmlSelect;
  @component('//input[@name="transactionValue.trdTrnAddrExporter.partyId"]') public beneficiaryPartyID: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrExporter.name"]') public beneficiaryPartyName: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrExporter.addr1"]') public beneficiaryPartyAddress1: TextInput;
  @component('//div[@id="divbene" and @style="width: 100%; display: none;"]') public beneficiaryIsVisibility: Button;
  @component('//a[@id="abeneBrowse"]') public beneficiaryHideButton: Button;
  @component('//select[@name="transactionValue.trdTrnAddrExporter.arcCountryCdKy"]') public beneficiaryPartyCountry: HtmlSelect;
  @component('//input[@name="transactionValue.trdTrnAddrExporterBank.partyId"]') public advisingBankPartyID: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrExporterBank.name"]') public advisingBankPartyName: TextInput;
  @component('//input[@name="transactionValue.trdTrnAddrExporterBank.addr1"]') public advisingBankPartyAddress1: TextInput;
  @component('//div[@id="divadvb" and @style="width: 100%; display: none;"]') public advisingBankIsVisibility: Button;
  @component('//a[@id="aadvbBrowse"]') public advisingBankHideButton: Button;
  @component('//select[@name="transactionValue.arcIsoCurrencyCdKy"]') public currency: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.transactionDetails"]') public detailsSelect: HtmlSelect;
  @component('//textarea[@name="entryOrAmendObject.transactionDetailsText"]') public detailsText: TextInput;
  @component('//input[@name="entryOrAmendObject.effectiveDateAsString"]') public effectiveDate: TextInput;
  @component('//input[@name="entryOrAmendObject.expiryDateAsString"]') public expiryDate: TextInput;
  @component('//input[@name="entryOrAmendObject.contactPerson"]') public cntPerson: TextInput;
  @component('//select[@name="entryOrAmendObject.telNumber1"]') public telephoneNumber: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.telNumber2"]') public areaCode: TextInput;
  @component('//input[@name="entryOrAmendObject.telNumber3"]') public number: TextInput;
  @component('//select[@name="transactionValue.trdTrnAddrImporter.partyId"]') public applicantValue: TextInput;
  @component('//input[@id="submit_approve" and @value="Approve"]') public approve: Button;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }

  public async loadConditionForBeneficiaryIsVisibility() {
    await waitForI3Loading();
    if (await this.beneficiaryIsVisibility.ElementExist()) {
      await this.beneficiaryHideButton.click();
    }
    await browser.wait(ExpectedConditions.visibilityOf(this.beneficiaryPartyAddress1.element), this.beneficiaryPartyAddress1.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.beneficiaryPartyAddress1.element), this.beneficiaryPartyAddress1.getTimeOut());
  }

  public async loadConditionForAdvisingBankIsVisibility() {
    await waitForI3Loading();
    if (await this.advisingBankIsVisibility.ElementExist()) {
      await this.advisingBankHideButton.click();
    }
    await browser.wait(ExpectedConditions.visibilityOf(this.advisingBankPartyAddress1.element), this.advisingBankPartyAddress1.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.advisingBankPartyAddress1.element), this.advisingBankPartyAddress1.getTimeOut());
  }

  public async loadConditionForImportLCEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
  }

  public async loadConditionForImportLCViewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
  }
}
