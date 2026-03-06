/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/IDEALX';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';
import { TelegraphicTransferPage } from './TelegraphicTransferPage'

@log export class HKCHATSPaymentPage extends TelegraphicTransferPage {
    // Create Page
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component('//input[@id="set_date"]') public setDate: Button;
    @component('//input[@id="normal_type"]') public normalType: Button;
    @component('//input[@name="bank-charge-O"]') public bankChargesOur: Button;
    @component('//input[@name="bank-charge-P"]') public bankChargesThey: Button;
    @component('//div[@class="challenge-step-title"]') public noChallenge: TextInput;
    @component('//label[@class="label1" and text()="Pay charges from this account"]') public payChargesStep4: TextInput;
    @component('//label[@class="label1" and text()="Bank charges"]') public bankChargesStep4: TextInput;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    // Edit Page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;

    // View Chats Payment/Template Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public deductAmtValue: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceAmtValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//span[@id="domestic-view-newPayee-acctNum"]') public toAccountNumberValue: TextInput;
    @component('//strong[@id="domestic-view-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;
    @component('//span[@id="domestic-view-existingPayee-acctNum"]') public toExistingPayeeAcctNumValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2Value: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3Value: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public sendAmtValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic1"]') public payeeBankSwiftbicValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeBankSwiftbic2: TextInput;
    @component('//*[@id="domestic-view-existing-swiftBic"]') public existingPayeeBankSwiftbic: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public msgToPayeeValue: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailListValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductAmtValue: TextInput;
    @component('//*[@id="domestic-view-bankCharge"]') public bankChargeValue: TextInput;
    @component('//*[@id="domestic-view-chargeAcct"]') public chargeAcctValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public custRefValue: TextInput;
    @component('//div[@id="domestic-view-send"]') public exchangeRateValue: TextInput;
    @component('//label[@id="domestic-view-approvalDate"]') public cutoffTimeValue: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public messageToApproverValue: TextInput;

    // View Chats Template Page
    @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }

    public async loadConditionForBankChargesOur() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.payChargesStep4.element), this.payChargesStep4.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.bankChargesStep4.element), this.bankChargesStep4.getTimeOut());
    }

    public async loadConditionForPreviewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.nextButton.element), this.nextButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
        await browser.sleep(1000);
    }

    public async loadConditionForViewTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValue.element), this.templateNameValue.getTimeOut());
    }

    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await this.loadConditionForViewPage();
    }

    public async goToViewPaymentPageViaSearch(_PaymentsPages: PaymentsPages, paymentType: string, transactionStatus: string) {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(paymentType, transactionStatus);
        await this.loadConditionForViewPage();
    }
}