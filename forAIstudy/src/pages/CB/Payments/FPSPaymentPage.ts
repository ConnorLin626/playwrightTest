/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, RadioButton, waitForUXLoading, waitForI3Loading } from '../../../lib';

@log export class FPSPaymentPage extends Page {

  //Create page
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//input[@name="send-amount"]') public amount: TextInput;
  @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
  @component('//a[@id="ux-tab-NEWFASTERPAYEE"]') public newFPSPayeeTab: Button;
  @component('//a[@id="ux-tab-NEW"]') public newPayeeTab: Button;
  @component('//input[@name="new-payee-name"]') public newPayeeName: TextInput;
  @component('//input[@name="bankType-NONDBS"]') public otherBankRadio: RadioButton;
  @component('//div[@id="payee-bank-common"]') public newPayeeBankID: OptionSelect;
  // @component('//input[@name="new-payee-bank-id"]') public newPayeeBankID: OptionSelect;
  @component('//input[@name="new-payee-acct-number"]') public newPayeeAcctNumber: TextInput;
  @component('//input[@name="new-payee-bank-id-button"]') public newPayeeBankIdButton: Button;
  @component('//input[@name="new-payee-bank-id_0" and @type="radio"]') public newPayeeBankIdRadio: RadioButton;
  @component('//div[@class="search-result-container"]') public searchResult: TextInput;
  @component('//button[@name="next"]') public nextButton: Button;

  @component('//input[@id="proxyTypeEmail"]') public proxyTypeEmail: RadioButton;
  @component('//input[@name="proxyTypeEmailInput"]') public proxyTypeEmailInput: TextInput;
  @component('//input[@id="proxyTypeMobNum"]') public proxyTypeMobNum: RadioButton;
  @component('//input[@name="proxyTypeMobNumInput"]') public proxyTypeMobNumInput: TextInput;
  @component('//input[@id="proxyTypeFasterID"]') public proxyTypeFasterID: RadioButton;
  @component('//input[@name="proxyTypeFasterIDInput"]') public proxyTypeFasterIDInput: TextInput;

  // Preview page
  @component('//button[@name="submit" and @class="btn btn-dbs-solid next"]') public submitButton: Button;
  @component('//button[@name="finish" and @class="btn btn-dbs-solid next"]') public finishedButton: Button;

  // View page
  @component('//label[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
  @component('//div[@id="domestic-view-status"]') public statusValue: TextInput;
  @component('//span[@id="domestic-view-accountNum"]') public accountNumberValue: TextInput;
  @component('//span[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
  @component('//strong[@id="domestic-view-payNow-email1"]') public proxyTypeEmailValue: TextInput;
  @component('//strong[@id="domestic-view-payNow-mobileNum"]') public proxyTypeMobNumValue: TextInput;
  @component('//strong[@id="domestic-view-payNow-fpsId1"]') public proxyTypeFasterIDValue: TextInput;
  @component('//button[@name="approve" and starts-with(@class, "btn btn-dbs-solid")]') public approveButton: Button;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;
  @component('//button[@name="dismiss"]') public dismissButton: Button;
  @component('//strong[@id="domestic-view-newPayee-name"]') public newPayeeNameValue: TextInput;
  @component('//span[@id="domestic-view-existingPayee-acctNum"]') public newPayeeAccNumValue: TextInput;

  //Message old I3 page
  @component('//i[@class="read-num"]') public readMessagesLink: Button;
  @component('//*[@id="alertTable"]/tbody/tr[1]/td[4]/b/div/a') public firstMessagesLink: Button;
  @component('//*[@id="alerts"]/tbody/tr[2]/td[3]') public alertReceivedValue: TextInput;
  @component('//*[@id="alerts"]/tbody/tr[4]/td[3]') public alertMessageValue: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    await browser.sleep(2000)
  }

  public async loadConditionForNewPayeeBankOnCreatePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.stalenessOf(this.searchResult.element), this.searchResult.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.newPayeeAcctNumber.element), this.newPayeeAcctNumber.getTimeOut());
  }

  public async loadConditionOnPreviewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.stalenessOf(this.nextButton.element), this.nextButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionOnSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.stalenessOf(this.submitButton.element), this.submitButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
  }

  public async loadConditionOnViewHKFPSPaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.accountNumberValue.element), this.accountNumberValue.getTimeOut());
  }

  public async loadConditionOnAlertLink() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.readMessagesLink.element), this.readMessagesLink.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.readMessagesLink.element), this.readMessagesLink.getTimeOut());
  }

  public async loadConditionOnMessages() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.firstMessagesLink.element), this.firstMessagesLink.getTimeOut());
  }
}
