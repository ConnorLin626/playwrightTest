/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';
import { TelegraphicTransferPage } from './TelegraphicTransferPage'


@log export class FastPaymentPage extends TelegraphicTransferPage {
    // Create Page
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component("//*[@id='immediate_type']") public fastPaymentType: Button;

    // Edit Page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

    // View Fast Payment/Template Page
    @component('//span[@id="domestic-view-accountNum"]') public fastFromAccountValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public fastAmountValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//span[@id="domestic-view-newPayee-acctNum"]') public toAccountNumberValue: TextInput;
    @component('//strong[@id="domestic-view-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;
    @component('//div[@id="domestic-view-send"]') public exchangeRateValue: TextInput;
    @component('//label[@id="domestic-view-approvalDate"]') public cutoffTimeValue: TextInput;
    @component('//dbs-radio-group[@formcontrolname="bankType"]/div/dbs-radio[2]/div/label/div/span') public otherBankWalletLabel: TextInput;
    @component('//dbs-payee-account/div/div/div[1]/label') public walletAccountLabel: TextInput;
    @component('//dbs-payee-bank/div/div/div[2]/p/label[3]') public swiftBICSearchLabel: TextInput;
    @component('//input[@id="new-payee-bank-id-button"]') public swiftBICSearchBtn: TextInput;
    @component('//*[@id="domestic-view-bankRemarks"]') public bankRemarks: TextInput;

    // View TT Tempate Page
    @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;

    //View Page Fields
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public referenceValue: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public deductAmountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="domestic-view-payNow-mobileNum1"]') public payNowMobileNum: TextInput;
    @component('//span[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdress1Value: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdress2Value: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdress3Value: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]')  public payeeBankName: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAdress1: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd2"]') public payeeBankAdress2: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd3"]') public payeeBankAdress3: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeBankSwiftBic: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCode: TextInput;
    @component('//*[@id="domestic-view-payee-brchCode"]') public payeeBranchCode: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput
    @component('//*[@id="domestic-view-adviceContent"]') public messageValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailList: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductValue: TextInput;
    @component('//*[@id="domestic-view-chargeAcct"]') public chargeAcctValue: TextInput;
    @component('//*[@id="domestic-view-purposeCode"]') public purposeCodeValue: TextInput;
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

    public async loadConditionForViewFastPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fastFromAccountValue.element), this.fastFromAccountValue.getTimeOut());
        await browser.sleep(3000);
    }

    public async loadConditionForEditCopy() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentDate.element), this.paymentDate.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
    }

    public async loadConditionForViewFastTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValue.element), this.templateNameValue.getTimeOut());
    }

    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await this.loadConditionForViewFastPaymentPage();
    }

    public async goToViewPaymentPageViaSearch(_PaymentsPages: PaymentsPages, paymentType: string, transactionStatus: string) {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(paymentType, transactionStatus);
        await this.loadConditionForViewFastPaymentPage();
    }
}
