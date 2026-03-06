/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading, waitForUXLoading ,OptionSelect} from '../../../lib';

@log export class NewBillPaymentPage extends Page {

  //Create Page
  @component('//p-auto-complete[@formcontrolname="billingOrganisation"]') public BillOrganisation: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="billFromAccount"]') public debitAccount: OptionSelect;
  @component('//input[@name="billReference"]')  public billReference: TextInput;
  @component('//input[@name="billAmount"]') public amount: TextInput;
  @component("//button[@name='next']") public NextButton: Button;
  @component("//button[@name='submit']") public submitButton: Button;
  @component('//button[@name="finish"]') public finishedButton: Button;
  @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
  @component('//div[@class="push-option"]') public pushOption: Button;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;
  @component("//button[@name='approve']") public approveButton: Button;


  // Edit page
  @component('//span[@id="bill-preview-edit"]') public editButton: Button;

  //Reject page
  @component("//button[@name='reject']") public rejectButton: Button;
  @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
  @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;

  // Detele page
  @component('//button[@name="delete"]') public deleteButton: Button;
  @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;

  // view page
  @component('//span[@id="act-view-accountNum"]') public debitAccountValue: TextInput;
  @component('//span[@id="bill-view-amount"]') public viewAmount: TextInput;
  @component('//span[@id="cutofftime"]') public cutOffTimeValue: TextInput;
  @component('//div[@id="ict-view-status"]') public transactionStatus: TextInput;
  @component('//span[@id="customerReference"]') public customerReferenceValue: TextInput;



  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.debitAccount.element), this.debitAccount.getTimeOut());
  }

    public async loadConditionForPreviewPage() {
      await waitForUXLoading();
      await browser.wait(ExpectedConditions.stalenessOf(this.NextButton.element), this.NextButton.getTimeOut());
      await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
      await waitForUXLoading();
      await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionOnViewNewUI() {
      await waitForUXLoading();
      await browser.wait(ExpectedConditions.elementToBeClickable(this.debitAccountValue.element), this.debitAccountValue.getTimeOut());
    }  

    public async loadConditionForViewTTPaymentPage() {
      await waitForUXLoading();
      await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatus.element), this.transactionStatus.getTimeOut());
    }

    public async loadConditionForDismissDialog() {
      await waitForUXLoading();
      await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }

}