/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, DateSelect, waitForUXLoading } from '../../../lib';

@log export class PaymentLimit extends Page {

  @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;

  @component("//button[@name='submit']") public submitButton: Button;

  @component("//button[@name='approve']") public approveButton: Button;

  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;

  @component("//*[@id='payment-limit-edit']") public editButton: Button;

  @component("//*[@id='payment-limit-delete']") public deleteButton: Button;

  @component('//button[@name="dismiss"]') public dismissButton: Button;

  @component('//button[@name="delete"]') public dialogDeleteButton: Button;

  @component("//*[@id='approveNow']") public approveNowCheckBox: Button;

  @component("//input[@name='payment-limit']") public limitAmount: TextInput;

  @component('//div[@id="new-payment-limit"]') public newPaymentLimitWrap: TextInput;

  @component("//strong[@id='current-limit-amount']") public currentLimitAmount: TextInput;

  @component("//input[@name='responseCode']") public challengeResponse: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.editButton.element), this.editButton.getTimeOut());
  }

  public async loadConditionForEditPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForDeletePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.dialogDeleteButton.element), this.dialogDeleteButton.getTimeOut());
  }

}
