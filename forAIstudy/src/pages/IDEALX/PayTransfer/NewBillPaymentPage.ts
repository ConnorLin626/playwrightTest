/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading, waitForUXLoading, OptionSelect } from '../../../lib';

@log export class NewBillPaymentPage extends Page {

    //Create Page
    @component('//*[@id="icon__bill_payment"]') public billMenu: Button;
    @component('//p-auto-complete[@formcontrolname="billingOrganisation"]') public BillOrganisation: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="billFromAccount"]') public debitAccount: OptionSelect;
    @component('//input[@name="billReference"]') public billReference: TextInput;
    @component('//input[@name="billAmount"]') public amount: TextInput;
    @component("//button[@name='next']") public NextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component("//button[@name='approve']") public approveButton: Button;
    @component('//input[@name="billerCode"]') public billerCode: TextInput;
    @component('//input[@name="bill-code-button"]') public SearchBtn: Button;
    @component('//span[@class="success-msg"]/span[1]') public VerifySuccessMsg1: TextInput;
    @component('//span[@class="success-msg"]/span[2]') public VerifySuccessMsg2: TextInput;
    //@component('//button[@name="verify-bill"]') public ValidateBtn: Button;

    //ID verify bill button
    @component("//button[@name='verify-bill']") public verifyBill: Button;

    // Edit page
    @component('//*[@id="act-view-edit"]') public editButton: Button;

    //Verify page
    @component("//button[@name='view-verify-release']") public viewPageVerifyButton: Button;
    @component("//button[@name='verify-release']") public verifyDialogButton: Button;
    @component("//button[@name='dismiss']") public verifyDismissButton: Button;

    //Reject page
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@type='text']") public reasonForRejection: TextInput;
    @component('//*[@id="mat-mdc-dialog-0"]/div/div/dbs-reject-dialog/div/div[2]/div[2]/button[2]') public rejectDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // Detele page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;

    // view page
    @component('//*[@id="act-view-accountNum"]') public debitAccountValue: TextInput;
    @component('//span[@id="bill-view-amount"]') public viewAmount: TextInput;
    @component('//span[@id="cutofftime"]') public cutOffTimeValue: TextInput;
    @component('//*[@id="act-view-status"]') public transactionStatus: TextInput;
    @component('//*[@id="view-reject-reason"]') public viewRejectReason: TextInput;
    @component('//span[@id="customerReference"]') public customerReferenceValue: TextInput;
    @component('//ng-component/div/div[2]/div/dbs-view-section-bill/div/section/div[1]/span[2]') public hashValue: TextInput;
    @component('//ng-component/div/div[2]/div/dbs-view-section-bill/div/section/div[2]/span[2]') public BillingOrganisationValue: TextInput;
    @component('//ng-component/div/div[2]/div/dbs-view-section-bill/div/section/div[3]/span[2]') public BillReferenceValue: TextInput;
    @component('//ng-component/div/div[2]/div/dbs-view-section-bill/div/section/div[4]/span[2]') public referenceValue: TextInput;
    @component('//ng-component/div/div[2]/div/dbs-view-section-bill/div/section/div[7]/span[2]') public paymentDateValue: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;

    //view page for AU
    @component("//span[@id='view-company-name']") public billerName: TextInput;
    @component('//section[@class="bg-canvas form-group"]/div[3]/span[2]') public billCodeValue: TextInput;
    @component("//span[@id='view-bill-reference']") public CRNValue: TextInput;
    

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
        await browser.sleep(3000);
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