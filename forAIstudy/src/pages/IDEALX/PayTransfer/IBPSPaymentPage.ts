/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';

@log export class IBPSPaymentPage extends Page {
    //Create page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component("//*[@id='ux-tab-NEW']/span") public newPayeeTab: Button;
    @component("//p-auto-complete[@formcontrolname='selectedCountry']") public Country: OptionSelect;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component("//input[@name='paymentPriorityTypecnibps']") public paymentType: RadioButton;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//*[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//*[@name='transactionNote']") public transactionNote: TextInput;
    @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;

    // View CNAPS Payment Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public deductAmtValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceAmtValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public toPayeeValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public toExistingPayeeValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-approvalDate"]') public cutoffTimeValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//dbs-view-section-domestic/div/section[1]/div[8]/span[2]/label') public deliveryMethodValue: TextInput;
    @component('//*[@id="domestic-view-send"]') public exchangeRateValue: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public amountValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public payeeBankNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public payeeBankCountry: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeBankSwiftBic: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCode: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public msgToPayeeValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailList: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductAmt: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public custRefValue: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public messageToApproverValue: TextInput;
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
    }
    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionForViewIBPSPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
    }
}
