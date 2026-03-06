/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, ListSelect, TextInput, OptionSelect, DateSelect, waitForUXLoading } from '../../../lib';
import { HtmlSelect } from '../../../lib/components';

@log export class PaymentPage extends Page {

  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;

  @component('//p-auto-complete[@formcontrolname="currency"]') public currency: OptionSelect;

  @component('//input[@name="send-amount"]') public amount: TextInput;

  @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;

  @component('//date-picker[@formcontrolname="paymentDate"]') public paymentDate: DateSelect;

  @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;

  @component('//input[@id="bank-charge-us"]') public bankChargesOur: Button;

  @component("//button[@name='next']") public nextButton: Button;

  @component("//button[@name='submit']") public submitButton: Button;

  @component("//button[@name='finish']") public finishButton: Button;

  @component("//button[@name='approve']") public approveButton: Button;

  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;

  @component("//input[@name='responseCode']") public challengeResponse: TextInput;

  @component('//input[@id="normal_type"]') public MEPSButton: Button;

  @component('//span[@id="domestic-view-accountNum"]') public accountNumber: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
  }

  public async loadConditionForPreviewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
  }


}
