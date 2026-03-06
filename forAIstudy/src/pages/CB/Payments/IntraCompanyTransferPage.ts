/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, DateSelect, waitForUXLoading, WebComponent } from '../../../lib';

@log export class IntraCompanyTransferPage extends Page {

  // create page
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="toAccount"]') public toAccount: OptionSelect;
  @component('//input[@name="send-amount"]') public amount: TextInput;
  @component('//date-picker[@formcontrolname="paymentDate"]') public paymentDate: DateSelect;
  @component('//input[@id="isTransactionNote"]') public transactionNoteButton: Button;
  @component('//textarea[@name="transactionNote"]') public transactionNoteInput: TextInput;
  @component('//button[@name="ict-next"]') public nextButton: Button;
  @component('//button[@name="ict-preview-Submit"]') public submitButton: Button;
  @component('//button[@name="finish"]') public finishButton: Button;
  @component('//button[@name="ict-Save"]') public saveAsDraft: Button;
  @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
  @component('//div[@class="push-option"]') public pushOption: Button;
  @component('//button[@name="approve"]') public approveButton: Button;
  @component('//button[@name="get-challenge"]') public getChallenge: Button;
  @component('//input[@name="responseCode"]') public challengeResponse: TextInput;
  @component('//input[@name="saveAsTemplate"]') public saveAsTemplateCheckbox: Button;
  @component('//input[@name="templateName"]') public templateName: TextInput;
  @component('//input[@id="useFX" and @type="checkbox"]') public useFxCheckBox: Button;
  @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
  @component('//multi-level-dropdown[@formcontrolname="subPurposeCode"]') public subPurposeCode: OptionSelect;
  @component('//cutoff-time-tip') public cutoffTimeTip: WebComponent;
  @component('//input[@id="enterCheck"]') public enterCheckFX: Button;
  @component('//input[@id="fx-contract-0"]') public fxContract0: Button;
  @component('//input[@id="fx-contract-1"]') public fxContract1: Button;
  @component('//input[@name="fx-ref-0"]') public fRef0: TextInput;
  @component('//input[@name="fx-ref-1"]') public fRef1: TextInput;
  @component('//div[@class="fx-dol-message"]') public dolMessage: TextInput;
  @component('//div[@id="fxDolViewSection"]') public exchangeRateTable: TextInput;

  @component('//input[@name="fx-amount-0"]') public fxContractAmt1: TextInput;
  @component('//input[@name="fx-amount-1"]') public fxContractAmt2: TextInput;

  //Copy ICT Payment
  @component('//button[@name="copy"]') public copyButton: Button;

  //Edit ICT Payment
  @component('//span[@id="ict-view-edit"]') public editButton: Button;
  @component('//button[@name="ict-modify-Next"]') public modifyNextButton: Button;

  //Reject ICT Payment
  @component('//button[@name="reject"]') public rejectButton: Button;
  @component('//input[@name="reasonForRejection"]') public reasonForRejection: TextInput;
  @component('//reject-dialog/div/button[@name="reject"]') public rejectDialogButton: Button;

  //Delete ICT Payment
  @component('//button[@name="delete"]') public deleteButton: Button;
  @component('//delete-dialog/div/button[@name="delete"]') public deleteDialogButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;

  // view ICT Payment/Template Page
  @component('//span[@id="ict-view-accountNum"]') public fromAccountValue: TextInput;
  @component('//span[@id="ict-view-payeeNum"]') public toAccountValue: TextInput;
  @component('//label[@id="ict-view-sendAmount"]') public amountValue: TextInput;
  @component('//div[@id="ict-view-status"]') public transactionStatusValue: TextInput;
  @component('//span[@id="ict-view-paymentDate"]') public paymentDateValue: TextInput;
  @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[1]') public contractRefValue: TextInput;

  // View ICT Template Payment 
  @component('//div[@id="ict-viewTemp-templateName"]') public viewTemplateName: TextInput;
  @component('//label[@id="ict-view-temp-sendAmount"]') public viewTemplateAmount: TextInput;

  // SAM>ICT schedule cut off time link
  @component('//a[contains(@href,"/csr/common/schedule/bom") and text()="Intra Company Transfer"]') public ictScheduleLink: Button;

  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
  }


  public async loadConditionForCopy() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentDate.element), this.paymentDate.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
  }

  public async loadConditionForEdit() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentDate.element), this.paymentDate.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.modifyNextButton.element), this.modifyNextButton.getTimeOut());
  }

  public async loadConditionForPreviewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
  }

  public async loadConditionForViewICTPaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
  }

  public async loadConditionForViewICTTemplatePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTemplateName.element), this.viewTemplateName.getTimeOut());
  }

  public async loadConditionForCreateICTFromTemplatePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.amount.element), this.amount.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
  }

  public async loadConditionForMessageInCreatePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
  }

  public async loadConditionForMessageInApprovalPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.approveButton.element), this.approveButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
  }
}
