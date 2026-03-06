/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';
import { PaymentLocalOverseasPayeePage } from './PaymentLocalOverseasPayeePage'

@log export class HKCHATSPaymentPage extends PaymentLocalOverseasPayeePage {
    // Create Page
    @component('//div[@id="payee-bank-common"]') public payeeBankID: OptionSelect;
    @component('//input[@id="set_date"]') public setDate: Button;
    @component('//input[@id="normal_type"]') public normalType: Button;
    @component('//input[@name="bank-charge-O"]') public bankChargesOur: Button;
    @component('//input[@name="bank-charge-P"]') public bankChargesThey: Button;
    @component('//div[@class="challenge-step-title"]') public noChallenge: TextInput;
    @component('//label[@class="label1" and text()="Pay charges from this account"]') public payChargesStep4: TextInput;
    @component('//label[@class="label1" and text()="Bank charges"]') public bankChargesStep4: TextInput;

    // Edit Page
    @component('//span[@id="domestic-view-edit"]') public editButton: Button;

    // View Chats Payment/Template Page
    @component('//span[@id="domestic-view-accountNum"]') public fastFromAccountValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public fastAmountValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//span[@id="domestic-view-newPayee-acctNum"]') public toAccountNumberValue: TextInput;
    @component('//strong[@id="domestic-view-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;
    @component('//span[@id="domestic-view-existingPayee-acctNum"]') public toExistingPayeeAcctNumValue: TextInput;
    @component('//div[@id="domestic-view-send"]') public exchangeRateValue: TextInput;
    @component('//label[@id="domestic-view-approvalDate"]') public cutoffTimeValue: TextInput;

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

    public async loadConditionForViewFastPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
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