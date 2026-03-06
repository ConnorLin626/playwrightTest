/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Page, TextInput, Button, OptionSelect, DateSelect, RadioButton, FileSelect, ListSelect } from '../../../lib';
import * as utils from '../../../lib/utils';

@log export class TWFISCPaymentPage extends Page {

  @component('//div[@id="domestic-view-status"]') public transactionStatusView: TextInput;
  @component('//span[@id="domestic-view-accountNum"]') public fromAccountView: TextInput;
  @component('//label[@id="domestic-view-deductAmount"]') public amountView: TextInput;
  @component('//label[@id="domestic-view-sendAmount"]') public amountTemplateView: TextInput;
  @component('//strong[@id="domestic-view-newPayee-name"]') public newPayeeNameView: TextInput;
  @component('//strong[@id="domestic-view-existingPayee-name"]') public existingPayeeNameView: TextInput;
  @component('//label[@id="domestic-view-approvalDate"]') public cutoffTimeView: TextInput;
  @component('//single-approval/form/div[2]/div[2]/ol/li[1]/div[2]/div[1]')
  public withoutMChallengeText: TextInput;
  @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameView: TextInput;
  @component('//span[@id="domestic-view-edit"]') public editButton: Button;


  public async loadCondition() {
    throw new Error("Method not implemented.");
  }

  public async loadConditionForViewPaymentPage() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusView.element), this.transactionStatusView.getTimeOut());
  }

  public async loadConditionForViewTemplatePaymentPage() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameView.element), this.templateNameView.getTimeOut());
  }

}