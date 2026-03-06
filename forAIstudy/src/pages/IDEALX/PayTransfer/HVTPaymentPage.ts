/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';
import { TelegraphicTransferPage } from './TelegraphicTransferPage'

@log export class HVTPaymentPage extends TelegraphicTransferPage {
    // Create Page
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;

    // View hvt Payment/Template Page

    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//span[@id="domestic-view-newPayee-acctNum"]') public toAccountNumberValue: TextInput;
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;
    @component('//*[@id="normal_type"]') public HVTPaymentCheckBox: Button;
    @component('//*[@id="other-bank"]') public otherBankCheckBox: Button;
    @component('//*[@id="bank-charge-us"]') public chargeUsCheckBox: Button;
    @component('//*[@id="push-btn"]') public ApproveNowBtn: Button;
    @component("//*[@class='push-option-label']") public pushOpion: Button;
    @component("//button[@name='get-challenge']") public getChallengeButton: Button;
    @component('//*[@id="set_date"]') public setDateBtn: Button;
    @component('//*[@class="push-option-label"]') public showSMS: Button;
    @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameValue: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public hvtFromAccountValue: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public hvtAmountValue: TextInput;
    @component('//strong[@id="domestic-view-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;
    @component('//input[@name="responseCode"]') public responseCode: TextInput;
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

    public async loadConditionForViewHVTPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
        await browser.sleep(2000)//wait for status load
    }

    public async loadConditionForEditCopy() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentDate.element), this.paymentDate.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
    }

    public async loadConditionForViewhvtTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValue.element), this.templateNameValue.getTimeOut());
    }

    public async loadConditionForApprovePaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
    }
    public async loadConditionForDismissDialog() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }
}