/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, RadioButton, waitForUXLoading, waitForI3Loading } from '../../../lib';

@log export class FPSPaymentPage extends Page {

    //Create page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component('//a[@id="ux-tab-NEWFASTERPAYEE"]') public newFPSPayeeTab: Button;
    @component('//a[@id="ux-tab-NEW"]') public newPayeeTab: Button;
    @component("//p-auto-complete[@formcontrolname='selectedCountry']") public Country: OptionSelect;
    @component('//*[@name="new-payee-name"]') public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//input[@name="newPayNowNickName"]') public newPayNowNickName: TextInput;


    @component('//input[@name="bankType-NONDBS"]') public otherBankRadio: RadioButton;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    // @component('//input[@name="new-payee-bank-id"]') public newPayeeBankID: OptionSelect;
    @component('//input[@name="new-payee-acct-number"]') public newPayeeAcctNumber: TextInput;
    @component('//input[@name="new-payee-bank-id-button"]') public newPayeeBankIdButton: Button;
    @component('//input[@name="new-payee-bank-id_0" and @type="radio"]') public newPayeeBankIdRadio: RadioButton;
    @component('//div[@class="search-result-container"]') public searchResult: TextInput;
    @component('//button[@name="next"]') public nextButton: Button;
    @component('//button[@name="Retrieve"]') public retriveButton: Button;

    @component('//input[@id="proxyTypeEmail"]') public proxyTypeEmail: RadioButton;
    @component('//input[@name="proxyTypeEmailInput"]') public proxyTypeEmailInput: TextInput;
    @component('//input[@id="proxyTypeMobNum"]') public proxyTypeMobNum: RadioButton;
    @component('//input[@name="proxyTypeMobNumInput"]') public proxyTypeMobNumInput: TextInput;
    @component('//input[@id="proxyTypeFasterID"]') public proxyTypeFasterID: RadioButton;
    @component('//input[@name="proxyTypeFasterIDInput"]') public proxyTypeFasterIDInput: TextInput;
    @component('//*[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//textarea[@name='adviceContent']") public message: TextInput;
    @component("//input[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//textarea[@name='transactionNote']") public transactionNote: TextInput;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;

    // Preview page
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;

    // View page
    @component('//*[@id="domestic-view-customerReference"]') public headerRef: TextInput;
    @component('//div[@id="domestic-view-status"]') public statusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//label[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public accountNumberValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public newPayeeAcctNumbValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public newPayeeNameValue: TextInput;
    @component('//span[@id="domestic-view-existingPayee-acctNum"]') public existingPayeeAccNumValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3: TextInput;
    @component('//strong[@id="domestic-view-payNow-email1"]') public proxyTypeEmailValue: TextInput;
    @component('//strong[@id="domestic-view-payNow-mobileNum"]') public proxyTypeMobNumValue: TextInput;
    @component('//strong[@id="domestic-view-payNow-fpsId1"]') public proxyTypeFasterIDValue: TextInput;
    @component('//span[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public sendAmtValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public payeeBankNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd2"]') public payeeBankAdd2Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd3"]') public payeeBankAdd3Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankCity"]') public payeeBankCityValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public payeeBankCountryValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeSwiftBicValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCodeValue: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public GreetingtothepayeeValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailList: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductAmt: TextInput;
    @component('//*[@id="domestic-view-chargeAcct"]') public chargeAcctValue: TextInput;
    @component('//*[@id="domestic-view-purposeCode"]') public PurposeCodeValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public custRefValue: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public messageToApproverValue: TextInput;
    @component('//dbs-view/div/div[2]/div/dbs-view-section-domestic/div/section[4]/div[2]/span[1]/label') public GreetingtothepayeeTitle : TextInput;

    @component("//button[@name='approve']") public approveButton: Button;
    @component("//dbs-view/div/div[2]/div/div[2]/div[1]/button[4]") public approveBtn: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

    //Message old I3 page
    @component('//i[@class="read-num"]') public readMessagesLink: Button;
    @component('//*[@id="alertTable"]/tbody/tr[1]/td[4]/b/div/a') public firstMessagesLink: Button;
    @component('//*[@id="alerts"]/tbody/tr[2]/td[3]') public alertReceivedValue: TextInput;
    @component('//*[@id="alerts"]/tbody/tr[4]/td[3]') public alertMessageValue: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionForNewPayeeBankOnCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.searchResult.element), this.searchResult.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.newPayeeAcctNumber.element), this.newPayeeAcctNumber.getTimeOut());
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

    public async loadConditionOnViewHKFPSPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.accountNumberValue.element), this.accountNumberValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.headerRef.element), this.headerRef.getTimeOut());
        await browser.sleep(400);
    }

    public async loadConditionOnAlertLink() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.readMessagesLink.element), this.readMessagesLink.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.readMessagesLink.element), this.readMessagesLink.getTimeOut());
    }

    public async loadConditionOnMessages() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.firstMessagesLink.element), this.firstMessagesLink.getTimeOut());
    }
}
