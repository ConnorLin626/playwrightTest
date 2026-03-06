/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, HtmlSelect, waitForI3Loading } from '../../../lib';
import { ImportLCIssuancePage } from './ImportLCIssuancePage'

@log export class ImportLCAmendmentPage extends ImportLCIssuancePage {

  @component('//input[@id="isAmendment" and @type="checkbox"]') public createAmendmentCheckBox: Button;
  @component('//input[@id="balanceCustRef"]') public balanceCustomerRef: TextInput;
  //input data
  @component('//select[@id="sendViaCd"]') public sendVia: HtmlSelect;
  @component('//select[@id="trnIncreaseDecreaseCd"]') public amountSelect: HtmlSelect;
  @component('//select[@id="entryOrAmendObject.amndIssuancefor"]') public amendmentIssuanceCharges: HtmlSelect;
  @component('//select[@id="telNumber1"]') public telephoneNumber: HtmlSelect;
  @component('//input[@id="entryOrAmendObject.telNumber2"]') public areaCode: TextInput;
  @component('//input[@id="entryOrAmendObject.telNumber3"]') public number: TextInput;

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
}
