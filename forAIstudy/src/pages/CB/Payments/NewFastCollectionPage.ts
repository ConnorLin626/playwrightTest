/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton, DateSelect, WebComponent } from "../../../lib";

@log export class NewFastCollectionPage extends Page {
    // Create Page

    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component("//a[@id='ux-tab-NEW']") public newPayeeTab: Button;
    @component("//input[@name='new-payee-name']") public newPayerName: TextInput;
    @component("//input[@name='new-payee-add1']") public newPayerAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayerAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayerAdd3: TextInput;
    @component('//div[@id="payee-bank-common"]') public payeeBankID: OptionSelect;
    @component("//input[@name='new-payee-acct-number']") public newPayerAcctNumber: TextInput;
    @component("//input[@name='new-payee-dda']") public ddaReference: TextInput;
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//multi-level-dropdown[@formcontrolname="subPurposeCode"]') public subPurposeCode: OptionSelect;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//textarea[@name='adviceContent']") public message: TextInput;
    @component("//a[@id='ux-tab-fax']") public faxTab: Button;
    @component("//input[@name='fax-area-code-0']") public faxAreaCode0: TextInput;
    @component("//p-auto-complete[@formcontrolname='ctryCode']") public faxCountryCode0: OptionSelect;
    @component("//input[@name='fax-no-0']") public faxNo0: TextInput;
    @component("//input[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//textarea[@name='transactionNote']") public transactionNote: TextInput;
    @component('//date-picker[@formcontrolname="paymentDate"]') public paymentDate: DateSelect;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component('//div[@class="push-option"]') public pushOption: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component("//button[@name='approve']") public approveButton: Button;
    @component('//button[@id="transaction-reference_0"]') public transactionList_Reference: Button;

    @component("//button[@name='push-btn']") public pushBtnButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//auto-complete[@formcontrolname="payeeCode"]') public payeeCode: OptionSelect;
    @component('//auto-complete[@formcontrolname="outwardRemit"]') public outwardRemit: OptionSelect;
    @component('//cutoff-time-tip') public cutoffTimeTip: WebComponent;
    @component("//input[@name='approveNow']") public approveNowCheckBox: Button;

    // Copy Page
    @component('//button[@name="copy"]') public copyButton: Button;

    // Reject Page
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;

    // Edit Page
    @component('//span[@id="domestic-view-edit"]') public editButton: Button;

    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;

    // View Fast Collection Page
    @component('//span[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//strong[@id="domestic-view-existingPayee-name"]') public toExistingPayerValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayerValue: TextInput;
    @component('//label[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public amountValue1: TextInput;


    @component('//input[@id="saveAsTemplate"]') public saveAsTemplateCheckbox: Button;
    @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;




    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }

    public async loadConditionForEdit() {
        await waitForUXLoading();
        // await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentDate.element),this.paymentDate.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
    }

    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionCreatePaymentTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.existingPayee.element), this.existingPayee.getTimeOut());
    }

    public async loadConditionForViewNewFastCollectionPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
    }


    public async loadConditionForViewNewFastCollecctionTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValue.element), this.templateNameValue.getTimeOut());
    }

    public async loadConditionForMessageInCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
    }
    public async  loadConditionForChallenge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.getChallengeSMS.element), this.getChallengeSMS.getTimeOut());

    }
    public async loadConditionForMessageInApprovalPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.approveButton.element), this.approveButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
    }
    public async loadConditionForDismissDialog() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }
}
