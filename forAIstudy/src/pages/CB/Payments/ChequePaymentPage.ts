/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, waitForI3Loading, generatedID } from '../../../lib';
import { HtmlSelect } from '../../../lib/components';

@log export class ChequePaymentPage extends Page {

  @component('//select[@name="fromParty"]') public fromAccountI3: HtmlSelect;
  @component('//*[@id="chequeTypeContainer_input_field"]/label[3]') public chequeType: Button;
  @component('//a[@id="myButton_Link"]') public nextContinue: Button;
  @component('//*[@id="formLineItems_0__payeeAmount_value"]') public payeeAmount: TextInput;
  @component('//*[@id="previewButton_Link"]') public previewI3Button: Button;
  @component('//*[@id="submitButton_Link"]/span[text()="Submit Payment"]') public submitI3Button: Button;
  @component('//*[@id="submitButton_Link"]/span[text()="Save as Draft"]') public saveAsDraftI3Button: Button;
  @component('//input[@aria-labelledby="saveAsTemplate_form_label"]') public saveAsTemplateCheckbox: Button;
  @component('//button[@name="next"]') public nextButton: Button;
  @component('//input[@id="approvalChoice_B"]') public approveNowRadio: Button;
  @component('//a[@onclick="sendChallenge($(this));"]') public sendChallengeI3Button: Button;
  @component('//input[@id="signature" and @name="signature"]') public EnterResponseI3Text: TextInput;
  @component('//a[@id="approveButton_Link"]') public approvePaymentButton: Button;
  @component('//*[@id="singleTransfer_form1ContentForm"]/div[2]/span[2]') public mChallengeI3Text: TextInput;
  @component('//*[@id="singleTransfer_form1ContentForm"]/span[1]/a') public withoutMChallengeI3Text: TextInput;
  @component('//*[@id="submitButton_Link"]/span[text()="Save as Draft"]') public SaveAsDraftI3Button: Button;

  //Existing Beneficiary
  @component('//*[@id="selectFromList_Link"]') public selectBeneficiary: Button;
  @component('//input[@name="rowSelected[0]"]') public selectTableOne: Button;
  @component('//*[@id="submitButton_Link"]') public submitOverlayButton: Button;

  //Create new Beneficiary
  @component('//*[@id="bulkSubmitButton_Link"]') public createBeneficiary: Button;
  @component('//Input[@id="name" and @name="name"]') public beneficiaryText: TextInput;
  @component('//Input[@id="address1" and @name="address1"]') public beneficiaryAddress1: TextInput;
  @component('//*[@id="buttonsFormContentForm"]/div/p/a[2]') public beneficiaryPreviewButton: Button;
  @component('//*[@id="previewUKPaymentRecipientPage"]/form/div[3]/p/a[3]') public beneficiarySubmitButton: Button;

  //View Page
  @component('//span[@id="fromParty" and @aria-labelledby="fromParty_form_label"]') public fromAccountValue: TextInput;
  @component('//span[@id="amount" and @aria-labelledby="amount_form_label"]') public amountValue: TextInput;
  @component('//*[@id="bulkRecipients_table"]/tbody/tr/td[1]') public beneficiaryValue: TextInput;
  @component('//span[@id="status" and @aria-labelledby="status_form_label"]') public transactionStatusValue: TextInput;
  @component('//div[@id="cutofftime_input_field"]') public cutOffTimeValue: TextInput;
  @component('//a[@id="copyButton_Link"]') public copyButton: Button;
  @component('//a[@id="modifyButton_Link"]') public editButton: Button;
  @component('//a[@id="rejectButton_Link"]') public rejectButton: Button;
  @component('//a[@id="deleteButton_Link"]') public deleteButton: Button;
  @component('//*[@id="submitButton_Link"]/span[text()="Approve Payment"]') public approvePaymentAgainButton: Button;
  @component('//*[@id="submitButton_Link"]/span[text()="Reject Payment"]') public rejectPaymentButton: Button;
  @component('//*[@id="submitButton_Link"]/span[text()="Delete Payment"]') public deletePaymentButton: Button;

  //View Template Page
  @component('//input[@id="templateName"]') public templateNameI3Text: TextInput;
  @component('//span[@id="templateName"]') public templateNameValue: TextInput;
  @component('//span[@id="fromParty"]') public fromPartyTemplateValue: TextInput;
  @component('//span[@id="amount"]') public amountTemplateValue: TextInput;
  @component('//*[@id="bulkRecipients_table"]/tbody/tr/td[1]') public beneficiaryTemplateValue: TextInput;

  //Create a Cheque Payment from Template
  @component('//span[@id="recipientName0"]') public beneficiaryTemplatePaymentValue: TextInput;
  @component('//*[@id="submitButton_Link"]/span[text()="Preview Payment"]') public previewTemplateI3Button: Button;
  @component('//*[@id="submitButton_Link"]/span[text()="Submit Payment"]') public submitTemplateI3Button: Button;

  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountI3.element), this.fromAccountI3.getTimeOut());
  }

  public async loadConditionApproveNow() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewI3Button.element), this.previewI3Button.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.approvePaymentButton.element), this.approvePaymentButton.getTimeOut());
  }

  public async loadConditionApproveNowSuccessPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.approvePaymentButton.element), this.approvePaymentButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.I3InfoMsg.element), this.I3InfoMsg.getTimeOut());
  }

  public async loadConditionPreview() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewI3Button.element), this.previewI3Button.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitI3Button.element), this.submitI3Button.getTimeOut());
  }

  public async loadConditionOnView() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
  }

  public async loadConditionCreatePaymentTemplate() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.visibilityOf(this.previewTemplateI3Button.element), this.previewTemplateI3Button.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.previewTemplateI3Button.element), this.previewTemplateI3Button.getTimeOut());
  }

  public async loadConditionOnPreviewTemplate() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewTemplateI3Button.element), this.previewTemplateI3Button.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitTemplateI3Button.element), this.submitTemplateI3Button.getTimeOut());
  }

  public async loadConditionOnReject() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.rejectButton.element), this.rejectButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.rejectPaymentButton.element), this.rejectPaymentButton.getTimeOut());
  }

  public async loadConditionOnEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewTemplateI3Button.element), this.previewTemplateI3Button.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitI3Button.element), this.submitI3Button.getTimeOut());
  }

  public async loadConditionOnDelete() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.deleteButton.element), this.deleteButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.deletePaymentButton.element), this.deletePaymentButton.getTimeOut());
  }

  public async loadConditionOnAddExistingBeneficiary() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.nextContinue.element), this.nextContinue.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.selectBeneficiary.element), this.selectBeneficiary.getTimeOut());
  }

  public async addNewBeneficiary(): Promise<void> {
    let payeeName = 'BCHNewPayeeName' + generatedID();
    await this.createBeneficiary.jsClick();
    await this.pageSwitchIframe('//iframe[@id="overlayContainerFrame"]');
    await browser.wait(ExpectedConditions.elementToBeClickable(this.beneficiaryText.element), this.beneficiaryText.getTimeOut());
    await this.beneficiaryText.input(payeeName);
    await this.beneficiaryAddress1.input('newPayeeAdd1' + generatedID());
    await this.beneficiaryPreviewButton.jsClick();
    await this.beneficiarySubmitButton.jsClick();
    await this.pageSwitchToI3();
  }

  public async addExistingBeneficiary(time: any = this.selectTableOne.getTimeOut()): Promise<void> {
    await this.selectBeneficiary.jsClick();
    await this.pageSwitchIframe('//iframe[@id="overlayContainerFrame"]');
    await browser.wait(ExpectedConditions.elementToBeClickable(this.selectTableOne.element), time);
    await this.selectTableOne.jsClick();
    await this.submitOverlayButton.jsClick();
    await this.pageSwitchToI3();
  }
}