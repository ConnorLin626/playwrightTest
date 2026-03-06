/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';

@log export class AutoPayPaymentPage extends Page {

    //Create page
    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public paymentMenu: Button;
    @component('//a[contains(@href,"#/transfers/manage-templates")]') public TemplaterTab: Button;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[3]/button') public digiToken: Button;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[2]/input') public enterCode: TextInput;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[3]/button') public authNow: Button;
    @component('//*[@id="icon__make_payment"]') public makePayment: Button;
    @component('//dbs-toolbar/div/div[2]/p-horizontal-navigation/div/ul[2]/li[2]') public MenuRadio: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component("//*[@id='ux-tab-NEW']/span") public newPayeeTab: Button;
    @component("//p-auto-complete[@formcontrolname='selectedCountry']") public Country: OptionSelect;
    @component("//textarea[@name='paymentDetail']") public paymentDetails: TextInput;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component("//input[@id='next_day_Type']") public autoPayPaymentType: Button;
    @component('//p-auto-complete[@formcontrolname="selectedCategory"]') public selectedCategory: OptionSelect;
    @component("//input[@formcontrolname='saveToList']") public saveToList: Button;
    @component("//input[@name='new-payee-nick-name']") public newPayeeNickName: TextInput;
    @component("//*[@id='set_day']") public setDay: Button;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//input[@id='charge-account-default']") public chargeAccount: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//*[@name='adviceContent']") public message: TextInput;
    // @component("//*[@id='ux-tab-fax']") public faxTab: Button;
    @component("//dbs-domestic-step-5/div/dbs-payee-advising/div/div/div[2]/div[2]/tabs-component/ul/li[2]") public faxTab: Button;
    @component("//p-auto-complete[@formcontrolname='ctryCode']") public faxCountryCode0: OptionSelect;
    @component("//input[@name='fax-area-code-0']") public faxAreaCode0: TextInput;
    @component("//input[@name='fax-no-0']") public faxNo0: TextInput;
    @component('//*[@name="payee-reference-payeeReference"]') public payeeReference: TextInput;
    @component('//*[@name="payeeParticulars-payee"]') public payeeParticulars: TextInput;
    @component("//*[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//*[@name='transactionNote']") public transactionNote: TextInput;
    @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//dbs-view/div/div[2]/div/div[3]/div[1]/button[4]") public approveSubmitBtn: Button;
    @component("//button[@name='approve' and @dcapprovebutton='']") public approveSubmitButton:Button;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component("//*[@class='push-option-label']") public pushOpion: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component('//div[@id="m-challenge"]') public mchallengeText: TextInput;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component("//button[@name='reject']") public rejectButton: Button;
    @component('//input[@name="reasonForRejection"]') public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    // View AutoPay Payment Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceAmtValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public toPayeeValue: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public toExistingPayeeValue: TextInput;
    @component('//*[@id="domestic-view-payNow-email1"]') public toPayNowValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public toPayeeNameValue: TextInput;
    @component('//*[@id="domestic-view-newPayNow-proxy"]') public payNowProxyValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public sendAmtValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public payeeBankNameValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd2"]') public payeeBankAdd2Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd3"]') public payeeBankAdd3Value: TextInput;
    @component('//*[@id="domestic-view-payee-bankCity"]') public payeeBankCityValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public payeeBankCountryValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-bankCode"]') public payeeBankCodeValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCodeValue2: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeBankSwiftBic: TextInput;
    @component('//*[@id="domestic-view-newPayee-branchCode"]') public payeeBrchCodeValue: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public msgToPayeeValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailListValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductAmtValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public custRefValue: TextInput;
    @component('//*[@id="domestic-view-batchID"]') public batchIdValue: TextInput;
    @component('//*[@id="domestic-view-payeeRef"]') public refForPayeeValue: TextInput;
    @component('//*[@id="domestic-view-payeeParticulars"]') public particuarsValue: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public msgToApproverValue: TextInput;

    @component('//*[@id="domestic-view-send"]') public exchangeRateValue: TextInput;
    @component('//*[@id="domestic-view-approvalDate"]') public cutoffTimeValue: TextInput;

    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // Copy Page
    @component('//button[@name="copy"]') public copyButton: Button;

    // Edit Page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

    // View AutoPay Tempate Page
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

    public async loadConditionForMenu() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentMenu.element), this.paymentMenu.getTimeOut());
    }

    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionForViewAutoPayPaymentPage() {
        await waitForUXLoading();
        await browser.sleep(3000);
        await browser.wait(ExpectedConditions.visibilityOf(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
        //await browser.sleep(2000);
    }

    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await this.loadConditionForViewAutoPayPaymentPage();
    }
}
