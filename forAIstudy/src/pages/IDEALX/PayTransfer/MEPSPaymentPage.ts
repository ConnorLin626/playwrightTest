/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';

@log export class MEPSPaymentPage extends Page {
    // Create Page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component("//*[@id='ux-tab-NEW']/span") public newPayeeTab: Button;
    @component("//p-auto-complete[@formcontrolname='selectedCountry']") public Country: OptionSelect;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
     @component('//input[@name="newPayNowNickName"]') public newPayNowNickName: TextInput;
    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//p-auto-complete[@formcontrolname="country"]') public payeeLocation: OptionSelect;
    @component('//*[@name="townCity"]') public townCity: TextInput;
    @component('//*[@name="postal-code"]') public postalCode: TextInput;
    @component('//dbs-radio-group[@formcontrolname="bankType"]') public payeeBank: RadioButton;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    //@component('//input[@formcontrolname="paymentPriorityType"]') public paymentType: RadioButton;
    @component("//input[@name='paymentPriorityTypesgmeps']") public paymentType: Button
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
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    //@component("//*[@id='ux-tab-fax']") public faxTab: Button;
    @component("/html/body/dbs-root/ng-component/div/div[3]/ng-component/div/ng-component/div/div/div/form/ng-component/dbs-domestic-step-5/div/dbs-payee-advising/div/div/div[2]/div[2]/tabs-component/ul/li[2]") public faxTab: Button;
    @component("//p-auto-complete[@formcontrolname='ctryCode']") public faxCountryCode0: OptionSelect;
    @component("//input[@name='fax-area-code-0']") public faxAreaCode0: TextInput;
    @component("//input[@name='fax-no-0']") public faxNo0: TextInput;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
    @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
    @component('//button[@name="copy"]') public copyButton: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component('//input[@name="bank-charge-P"]') public bankChargesThey: Button;
    @component("//input[@name='intermediary-bank-isIntermediary']") public intermediaryBankIsIntermediary: Button;
    @component("//p-auto-complete[@formcontrolname='selectedIntermediaryCountry']") public intermediaryBankCountry: OptionSelect;
    @component('//dbs-intermediary-bank//div[@class="payee-bank-search"]') public intermediaryBankID: OptionSelect;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    // Reject Page
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;

    // Edit Page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;

    // View MEPS Template Page
    @component('//*[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountForTemplate: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public amountForTemplate: TextInput;
    @component('//*[@id="domestic-view-existingPayee-acctNum"]') public payeeForTemplate: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public payeeNameForTemplate: TextInput;

    // View MEPS Payment Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public MEPStransactionStatusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]')  public hashValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public MEPSamountValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public MEPSfromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public MEPSnewPayeeAccountNumberValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public newPayeeNameValue: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public MEPSpayeeNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdress1Value: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdress2Value: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdress3Value: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public sendAmountValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public payeeBankName: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAdress1: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd2"]') public payeeBankAdress2: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd3"]') public payeeBankAdress3: TextInput;
    @component('//*[@id="domestic-view-payee-bankCity"]') public payeeBankCity: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public payeeBankCounty: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeBankSwiftBic: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCode: TextInput;
    @component('//*[@id="domestic-view-payee-brchCode"]') public payeeBranchCode: TextInput;
    @component('//dbs-view-section-domestic/div/section[3]/div[2]/div[1]/span[2]') public IntermediaryBankSWIFTBIC: TextInput;
    @component('//dbs-view-section-domestic/div/section[3]/div[2]/div[2]/span[2]') public IntermediaryBankName: TextInput;
    @component('//dbs-view-section-domestic/div/section[3]/div[2]/div[3]/span[2]') public IntermediaryBankAdress: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput
    @component('//*[@id="domestic-view-adviceContent"]') public messageValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailList: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductValue: TextInput;
    @component('//*[@id="domestic-view-bankCharge"]') public bankChargeValue: TextInput;
    @component('//*[@id="domestic-view-chargeAcct"]') public chargeAcctValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public referenceValue: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public messageToApproverValue: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;

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

    public async loadConditionCreatePayemntTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.existingPayee.element), this.existingPayee.getTimeOut());
    }

    public async loadConditionForViewMEPSPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.MEPSfromAccountValue.element), this.MEPSfromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.referenceValue.element), this.referenceValue.getTimeOut());
        await  browser.sleep(800);
    }
}