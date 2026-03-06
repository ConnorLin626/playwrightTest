/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';
import { PaymentLocalOverseasPayeePage } from './PaymentLocalOverseasPayeePage'

@log export class FastPaymentPage extends PaymentLocalOverseasPayeePage {
    // Create Page
    @component('//div[@id="payee-bank-common"]') public payeeBankID: OptionSelect;
    @component("//*[@id='immediate_type']") public fastPaymentType: Button;

    // Edit Page
    @component('//span[@id="domestic-view-edit"]') public editButton: Button;

    // View Fast Payment/Template Page
    @component('//span[@id="domestic-view-accountNum"]') public fastFromAccountValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public fastAmountValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//span[@id="domestic-view-newPayee-acctNum"]') public toAccountNumberValue: TextInput;
    @component('//strong[@id="domestic-view-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;
    @component('//div[@id="domestic-view-send"]') public exchangeRateValue: TextInput;
    @component('//label[@id="domestic-view-approvalDate"]') public cutoffTimeValue: TextInput;

    // View TT Tempate Page
    @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;

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