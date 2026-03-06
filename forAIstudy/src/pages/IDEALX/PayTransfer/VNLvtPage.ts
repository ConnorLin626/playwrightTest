/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';
import { PaymentsPages } from "./index";

@log export class VNLvtPage extends Page {
    // Create Page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component("//*[@id='ux-tab-NEW']") public newPayeeTab: Button;
    @component("//*[@id='ux-tab-NEWNAPASPAYEE']") public NEWNAPASPAYEETab: Button;
    @component('//p-auto-complete[@formcontrolname="selectedCountry"]') public newPayeeCountry: OptionSelect;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//input[@id="saveToList" and @type="checkbox"]') public savePayee: Button;
    @component("//*[@class='dbs-validation-error ng-star-inserted']") public nicknameMsg: TextInput;
    @component("//div/ng-component/div/dbs-top-panel/div/div[2]/ul/li/span") public nicknameMsgTop: TextInput;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component("//button[@name='Verify']") public VerifyBtn: Button;
    @component("//*[@id='cardNumber']") public cardNumberBtn: Button;
    @component("//*[@name='new-payee-card-number']") public cardNumber: TextInput;
    @component('//div[starts-with(@class, "manual clearfix")]') public enterDetailButton: Button;
    @component('//input[@name="new-payee-bsb-code"]') public bsbCodeText: TextInput;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component('//input[@id="set_date"]') public paymentDateRadio: Button;
    @component('//input[@id="normal_type"]') public hvtTypeRadio: Button;
    @component('//input[@id="bank-charge-shared"]') public sharedRadio: Button;
    @component("//*[@id='next_day_Type']") public LVTCheckBox: Button;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//button[@name='copy']") public copyButton: Button;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='delete']") public deleteButton: Button;
    @component("//button[@name='dismiss']") public dismissButton: Button;
    @component("//button[@name='save-as-draft']") public saveAsDraft: Button;
    @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component("//*[@id='domestic-view-edit']") public editButton: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//*[@id='VNAUTO01']/div[3]/ng-component/div/dbs-view/div/div[2]/div/div[3]/div[1]/button[3]") public confirmapproveButton: Button;
    @component("//button[@id='push-btn']") public approveNowButton: Button;
    @component("//input[@id='approveNow']") public approveNowBox: Button;
    @component("//button[@name='get-challenge']") public getChallengeButton: Button;
    @component("//*[@class='push-option-label']") public pushOpion: Button;
    @component('//input[@name="responseCode"]') public responseCode: TextInput;
    @component("//button[@name='submit']") public submitButton: Button;
    @component("//*[@name='saveAsTemplate']") public saveAsTemplateCheckbox: Button;
    @component("//*[@name='templateName']") public templateName: TextInput;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component('//*[@class="font-medium text-base"]') public RetrievedPayeeName: TextInput;
    // View MEPS Payment Page
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public toNewPayeeValue: TextInput;
    // View NAPAS Payment Page
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public acctNum: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentType: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public bankName: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public bankCountry: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public bankCode: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public existingPayeeName: TextInput;
    @component('//*[@id="domestic-view-existingPayee-cardNum"]') public existingCardNumberValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-cardNum"]') public newCardNumberValue: TextInput;
    @component('//button[@name="view-verify-release"]') public Verifybutton: Button;
    @component('//button[@name="verify-release"]') public VerifyPaymentbutton: Button;
    @component('//button[@name="dismiss"]') public Dismissbutton: Button;
    @component('//*[@id="domestic-view-adviceContent"]') public messageToPayee: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailList: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public sendAmountValue: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public deductAmountValue: TextInput;
    @component('//*[@id="domestic-view-approvalDate"]') public approvalDateValue: TextInput;
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

    public async loadConditionForViewPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
    }
    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    }
    public async loadConditionForApprovePaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
    }
    public async loadConditionForDismissDialog() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }
}
