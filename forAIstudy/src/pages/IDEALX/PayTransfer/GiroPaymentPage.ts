/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, RadioButton, waitForUXLoading } from '../../../lib';

@log export class GiroPaymentPage extends Page {

    //menu
    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public PayTransferMenu: Button;
    @component('//*[@id="icon__make_payment"]') public giroPaymentMenu: Button;

    //Create page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component('//a[@id="ux-tab-NEW"]') public newPayeeTab: Button;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    @component('//a[@id="ux-tab-NEWPAYNOW"]') public newPayNowTab: Button;
    @component('//*[@name="proxyTypeMobNumInput"]') public mobileNum: TextInput;
    @component("//p-auto-complete[@formcontrolname='selectedCountry']") public Country: OptionSelect;
    @component('//*[@name="new-payee-name"]') public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//input[@name="bankType-NONDBS"]') public otherBankRadio: RadioButton;
    @component('//div[@class="payee-bank-search"]') public newPayeeBankID: OptionSelect;
    @component('//input[@name="new-payee-acct-number"]') public newPayeeAcctNumber: TextInput;
    @component('//input[@name="payment-date-type-CUSTOM"]') public chooseDate: RadioButton;
    @component('//input[@name="paymentPriorityTypesggiro"]') public giroType: RadioButton;
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//*[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//textarea[@name='adviceContent']") public message: TextInput;
    @component("//*[@name='payee-reference-payeeReference']") public refForPayee: TextInput;
    @component("//input[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//textarea[@name='transactionNote']") public transactionNote: TextInput;
    @component('//button[@name="next"]') public nextButton: Button;

    // Edit Page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

    // Preview page
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="submit"]') public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;

    // View page
    @component('//div[@id="domestic-view-status"]') public statusValue: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//label[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//span[@id="domestic-view-newPayee-acctNum"]') public accountNumberValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public payeeNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAddress1: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAddress2: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAddress3: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public messageToPayee: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public payeeBankNameValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeBankIDValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCodeValue: TextInput;
    @component('//*[@id="domestic-view-payee-brchCode"]') public payeeBankBranchCodeValue: TextInput; 
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAddress: TextInput;
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public referenceValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="domestic-view-payNow-mobileNum1"]') public payNowMobileValue: TextInput;
    @component('//*[@id="domestic-view-newPayNow-proxy"]/strong[3]') public payNowNameValue: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentType: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public sendAmountValue: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDeatilValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public messageValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailList: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductValue: TextInput;
    @component('//*[@id="domestic-view-purposeCode"]') public purposeCodeValue: TextInput; 
    @component('//*[@id="domestic-view-batchID"]') public batchIDValue: TextInput; 
    // @component('//dbs-view-section-ott/div/section[6]/div[1]/span[2]/span') public bankChargeValue: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public messageToApproverValue: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;

    //view GIRO Template page
    @component('//*[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountForTemplate: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public amountForTemplate: TextInput;
    @component('//*[@id="domestic-view-existingPayee-acctNum"]') public payeeForTemplate: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public payeeNameForTemplate: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
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

    public async loadConditionForViewGiroPaymentPage() {
        await waitForUXLoading(); 
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusValue.element), this.statusValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.hashValue.element), this.hashValue.getTimeOut());
    }
}