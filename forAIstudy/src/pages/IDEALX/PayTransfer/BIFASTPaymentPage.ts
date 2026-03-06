/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/IDEALX';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';

@log export class BIFASTPaymentPage extends Page {
    //Create page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component("//*[@id='ux-tab-NEWBIFASTPAYEE']/span") public newBIFASTPayeeTab: Button;
    @component('//*[@id="proxyTypeMobNum"]') public proxyTypeMobile: Button
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//input[@id="saveToList" and @type="checkbox"]') public savePayee: Button;
    @component("//*[@class='dbs-validation-error ng-star-inserted']") public nicknameMsg: TextInput;
    @component("//div/ng-component/div/dbs-top-panel/div/div[2]/ul/li/span") public nicknameMsgTop: TextInput;
    @component("//input[@name='proxyTypeMobNumInput']") public mobileNumber: TextInput;
    @component('//*[@id="proxyTypeEmail"]') public proxyTypeEmail: Button
    @component("//input[@name='proxyTypeEmailInput']") public email: TextInput;
    @component('//*[@id="proxyTypeAcctNum"]') public proxyTypeAccount: Button
    @component("//input[@name='proxyTypeAcctNumInput']") public accountNumber: TextInput;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component('//*[@id="fetchPayeeName-button"]') public fetchPayeeName: Button
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;

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
    @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component("//button[@name='approve']") public approveButton: Button;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component('//div[@id="m-challenge"]') public mchallengeText: TextInput;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component("//button[@name='reject']") public rejectButton: Button;
    @component('//input[@name="reasonForRejection"]') public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component("//*[@id='bifast_type']") public BIFASTBtn: TextInput;
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//input[@name="bank-charge-O"]') public bankChargesOur: Button;

    // View BIFAST Payment Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceAmtValue: TextInput;
    @component('//*[@id="domestic-view-newPayNow-proxy"]') public toPayeeValue: TextInput;
    @component('//*[@id="domestic-view-payNow-proxy"]/strong[3]') public toExistingPayeeValue: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public bankNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public bankAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankCity"]') public bankCityValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public bankCountryValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public bankSwiftbicValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public bankCodeValue: TextInput;
    @component('//*[@id="domestic-view-payee-brchCode"]') public branchCodeValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public sendAmtValue: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public msgToPayeeValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailListValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductAmtValue: TextInput;
    @component('//*[@id="domestic-view-bankCharge"]') public bankChargeValue: TextInput;
    @component('//*[@id="domestic-view-chargeAcct"]') public chargeAcctValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public custRefValue: TextInput;
    @component('//*[@id="domestic-view-purposeCode"]') public purposeCodeValue: TextInput;
    @component("//*[@id='domestic-view-transactionNote']") public  messageToApproverValue: TextInput; 
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput; 

    // create BIFAST Page from template
    @component('//p-auto-complete[@formcontrolname="payee"]/div/div[1]/span') public existingPayeevalue: TextInput;

    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // Copy Page
    @component('//button[@name="copy"]') public copyButton: Button;

    // Edit Page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

    // View BIFAST Tempate Page
    @component('//*[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccoountValueForTemplate: TextInput;
    @component('//*[@id="domestic-view-payNow-proxy"]/strong[3]') public payeeValueForTemplate: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public amountValueForTemplate: TextInput;
    @component('//*[@id="domestic-viewTemp-status"]') public templateStatus: TextInput;
    
   // Create BIFAST Tempate Page
   @component('//a[@id="singleTemplate-ID"]') public createSinglePaymentTemplateButton: Button;
   @component('//a[@id="template-list-templateName_0"]') public templateNameLink: Button;
    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.amount.element), this.amount.getTimeOut());
    }

    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }
    public async loadConditionForViewBIFASTPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
        await browser.sleep(1000) //wait for status field load 
    }

    public async loadConditionCreatePaymentTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.existingPayeevalue.element), this.existingPayeevalue.getTimeOut());
    }

    public async loadConditionForViewTemplatePayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValue.element), this.templateNameValue.getTimeOut());
        await browser.sleep(1000) //wait for status field load 
    }
    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await this.loadConditionForViewBIFASTPaymentPage();
    }
}
