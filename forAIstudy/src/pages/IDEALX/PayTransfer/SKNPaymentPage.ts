/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';

@log export class SKNPaymentPage extends Page {
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
    @component("//*[@id='set_day']") public setDay: Button;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//p-auto-complete[@formcontrolname='residStatus']") public beneficiaryResident: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="category"]') public beneficiaryCategory: OptionSelect;
    @component('//input[@name="bank-charge-O"]') public bankChargesOur: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//*[@name='adviceContent']") public message: TextInput;
    @component("//*[@id='ux-tab-fax']") public faxTab: Button;
    @component("//p-auto-complete[@formcontrolname='ctryCode']") public faxCountryCode0: OptionSelect;
    @component("//input[@name='fax-area-code-0']") public faxAreaCode0: TextInput;
    @component("//input[@name='fax-no-0']") public faxNo0: TextInput;
    @component('//*[@name="payee-reference-payeeReference"]') public payeeReference: TextInput;
    @component("//*[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//*[@name='transactionNote']") public transactionNote: TextInput;
    @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//dbs-view/div/div[2]/div/div[3]/div[1]/button[4]") public approveBtn: Button;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component("//button[@name='reject']") public rejectButton: Button;
    @component('//input[@name="reasonForRejection"]') public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component('//*[@id="normal_type"]') public SKNPaymentCheckBox: Button;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;

    // create TT Page from template
    @component('//p-auto-complete[@formcontrolname="payee"]/div/div[1]/span') public existingPayeevalue: TextInput;

    // View SKN Payment Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceAmtValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public toPayeeValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public toNewPayeeAccNumValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2Value: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3Value: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public toExistingPayeeValue: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-approvalDate"]') public cutoffTimeValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public sendAmtValue: TextInput;
    @component('//*[@id="domestic-view-send"]') public exchangeRateValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public payeeBankNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd2"]') public payeeBankAdd2Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd3"]') public payeeBankAdd3Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankCity"]') public payeeBankCityValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public payeeBankCountryValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeSwiftBicValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCodeValue: TextInput;
    @component('//*[@id="domestic-view-payee-brchCode"]') public payeeBrchCodeValue: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public msgToPayeeValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailList: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductAmt: TextInput;
    @component('//*[@id="domestic-view-bankCharge"]') public bankChargeValue: TextInput;
    @component('//*[@id="domestic-view-chargeAcct"]') public chargeAcctValue: TextInput;
    @component('//*[@id="domestic-view-residStatus"]') public residStatusValue: TextInput;
    @component('//*[@id="domestic-view-category"]') public beneCategoryValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public custRefValue: TextInput;
    @component('//*[@id="domestic-view-batchID"]') public batchIDValue: TextInput;
    @component('//*[@id="domestic-view-residStatus"]') public residStatus: TextInput;
    @component('//*[@id="domestic-view-category"]') public categoryValue: TextInput;
    @component("//*[@id='domestic-view-transactionNote']") public  messageToApproverValue: TextInput; 
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput; 

    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // Copy Page
    @component('//button[@name="copy"]') public copyButton: Button;

    // Edit Page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

    // View SKN Tempate Page
    @component('//*[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccoountValueForTemplate: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public payeeValueForTemplate: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public amountValueForTemplate: TextInput;

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

    public async loadConditionForViewSKNPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
    }

    public async loadConditionCreatePaymentTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.existingPayeevalue.element), this.existingPayeevalue.getTimeOut());
    }
}
