/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/IDEALX';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';

@log export class RTOLPaymentPage extends Page {
    //Create page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component("//a[@id='ux-tab-NEW']") public newPayeeTab: Button;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component("//*[@id='premium_type']") public rtolTypeButton: Button;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//textarea[@name='adviceContent']") public message: TextInput;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//*[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//*[@name='transactionNote']") public transactionNote: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;

    // View RTOL Payment Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceAmtValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public toNewPayeeValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public toNewPayeeAccNumValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2Value: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3Value: TextInput;
    @component('//*[@id="domestic-view-payNow-proxy"]/strong[3]') public toExistingPayeeValue: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public sendAmtValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public bankNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public bankAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankCity"]') public bankCityValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public bankCountryValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public bankSwiftbicValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public bankCodeValue: TextInput;
    @component('//*[@id="domestic-view-payee-brchCode"]') public branchCodeValue: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public msgToPayeeValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailListValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductAmtValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public custRefValue: TextInput;
    @component("//*[@id='domestic-view-transactionNote']") public  messageToApproverValue: TextInput; 
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput; 
   
   

    // Edit Page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

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
    public async loadConditionForViewRTOLPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
        await browser.sleep(1000) //wait for status field load 
    }

    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await this.loadConditionForViewRTOLPaymentPage();
    }
}
