/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, TextInput, waitForUXLoading, OptionSelect, Button } from '../../../lib';

@log export class eACHPaymentPage extends Page {
    // Create page
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
    @component("//input[@name='new-payee-national-id']") public newPayeeNationalId: TextInput;
    @component('//multi-level-dropdown[@formcontrolname="billerServiceID"]') public billerServiceID: OptionSelect;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//textarea[@name='adviceContent']") public message: TextInput;
    @component("//input[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//textarea[@name='transactionNote']") public transactionNote: TextInput;
    @component("//button[@name='save-as-draft']") public saveButton: Button;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    @component('//dbs-account-new') public selectFromAccount: Button;
    @component('//dbs-single-existing-payee-new') public existingPayee: Button;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingforPayee: OptionSelect;
    @component('//multi-level-dropdown[@formcontrolname="billerServiceID"]') public serviceID: Button;

    // View eACH Payment Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRef: TextInput;
    @component('//*[@id="domestic-view-status"]') public eACHStatusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public deductAmountValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public toNewPayeeAcctValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-nationalId"]') public nationalId: TextInput;
    @component('//span[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentType: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public sendAmountValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public payeeBankName: TextInput;
    @component('//*[@id="domestic-view-payee-brchName"]') public payeeBankBrchName: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAdress1: TextInput;
    @component('//*[@id="domestic-view-payee-bankCity"]') public payeeBankCity: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public payeeBankCountry: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeBankSwiftBic: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCode: TextInput;
    @component('//*[@id="domestic-view-payee-brchCode"]') public payeeBankBrchCode: TextInput;
    @component('//dbs-view-section-domestic/div/section[3]/div/div[2]/span[2]') public payeeNationalID: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public messageValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailList: TextInput;
    @component('//dbs-view-section-domestic/div/section[5]/div/span[2]') public billerServiceId: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductValue: TextInput;
    @component("//*[@id='domestic-view-bankCharge']") public bankCharge: TextInput;
    @component("//*[@id='domestic-view-chargeAcct']") public chargeAccount: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public referenceValue: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public msgToApproverView: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
    }
    
    public async loadConditionForVieweACHPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.eACHStatusValue.element), this.eACHStatusValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.sleep(400);
    }
    
    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.nextButton.element), this.nextButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.submitButton.element), this.submitButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }
}