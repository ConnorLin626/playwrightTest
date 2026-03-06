/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';

@log export class MEPSPaymentPage extends Page {
  // Create Page
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//input[@name="send-amount"]') public amount: TextInput;
  @component("//*[@id='ux-tab-NEW']/span") public newPayeeTab: Button;
  @component("//input[@name='new-payee-name']") public newPayeeName: TextInput;
  @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
  @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
  @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
  @component('//dbs-radio-group[@formcontrolname="bankType"]') public payeeBank: RadioButton;
  @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
  @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
  @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
  @component("//input[@name='email-id-0']") public emailIdO: TextInput;
  @component("//input[@name='email-id-1']") public emailId1: TextInput;
  @component("//input[@name='email-id-2']") public emailId2: TextInput;
  @component("//input[@name='email-id-3']") public emailId3: TextInput;
  @component("//input[@name='email-id-4']") public emailId4: TextInput;
  @component("//*[@name='adviceContent']") public message: TextInput;
  @component("//*[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
  @component("//*[@name='transactionNote']") public transactionNote: TextInput;
  @component("//button[@name='next']") public nextButton: Button;
  @component("//button[@name='submit']") public submitButton: Button;
  @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
  @component("//*[@id='ux-tab-fax']") public faxTab: Button;
  @component("//p-auto-complete[@formcontrolname='ctryCode']") public faxCountryCode0: OptionSelect;
  @component("//input[@name='fax-area-code-0']") public faxAreaCode0: TextInput;
  @component("//input[@name='fax-no-0']") public faxNo0: TextInput;
  @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;
  @component('//button[@name="finish"]') public finishedButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;
  @component("//button[@name='approve']") public approveButton: Button;
  @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
  @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
  @component('//button[@name="copy"]') public copyButton: Button;
  @component('//input[@name="templateName"]') public templateName: TextInput;
  @component('//payee-bank//div[@id="payee-bank-common"]') public payeeBankID: OptionSelect;
  @component('//input[@name="bank-charge-P"]') public bankChargesThey: Button;

  // Reject Page
  @component("//button[@name='reject']") public rejectButton: Button;
  @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
  @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;

  // Edit Page
  @component('//*[@id="domestic-view-edit"]') public editButton: Button;

  // Delete Page
  @component('//button[@name="delete"]') public deleteButton: Button;
  @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;

  // View MEPS Template Page
  @component('//*[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;
  @component('//*[@id="domestic-view-accountNum"]') public fromAccountForTemplate: TextInput;
  @component('//*[@id="domestic-view-sendAmount"]') public amountForTemplate: TextInput;
  @component('//*[@id="domestic-view-existingPayee-acctNum"]') public payeeForTemplate: TextInput;
  @component('//*[@id="domestic-view-existingPayee-name"]') public payeeNameForTemplate: TextInput;

  // View MEPS Payment Page
  @component('//*[@id="domestic-view-accountNum"]') public MEPSfromAccountValue: TextInput;
  @component('//*[@id="domestic-view-deductAmount"]') public MEPSamountValue: TextInput;
  @component('//*[@id="domestic-view-newPayee-acctNum"]') public MEPSnewPayeeAccountNumberValue: TextInput;
  @component('//*[@id="domestic-view-existingPayee-name"]') public MEPSpayeeNameValue: TextInput;
  @component('//*[@id="domestic-view-status"]') public MEPStransactionStatusValue: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
  }

  public async loadConditionForPrevewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
  }

  public async loadConditionCreatePayemntTemplate() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.existingPayee.element), this.existingPayee.getTimeOut());
  }

  public async loadConditionForViewMEPSPaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.MEPSfromAccountValue.element), this.MEPSfromAccountValue.getTimeOut());
  }
}