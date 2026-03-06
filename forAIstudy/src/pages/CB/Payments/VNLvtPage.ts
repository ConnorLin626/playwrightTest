/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import {Menu} from "../../../config/menu";
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';
import {PaymentsPages} from "./index";

@log export class VNLvtPage extends Page {
    // Create Page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component("//*[@id='ux-tab-NEW']") public newPayeeTab: Button;
    @component('//p-auto-complete[@formcontrolname="selectedCountry"]') public newPayeeCountry: OptionSelect;
    @component("//input[@name='new-payee-name']") public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//payee-bank//div[@id="payee-bank-common"]') public payeeBankID: OptionSelect;
    @component('//div[starts-with(@class, "manual clearfix")]') public enterDetailButton: Button;
    @component('//input[@name="new-payee-bsb-code"]') public bsbCodeText: TextInput;
	@component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component('//input[@id="set_date"]') public paymentDateRadio:Button;
	@component('//input[@id="normal_type"]') public hvtTypeRadio:Button;
	@component('//input[@id="bank-charge-shared"]') public sharedRadio:Button;
    @component("//*[@id='next_day_Type']") public LVTCheckBox: Button;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//button[@name='copy']") public copyButton: Button;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='delete']") public deleteButton: Button;
    @component("//button[@name='dismiss']") public dismissButton: Button;
    @component("//button[@name='save-as-draft']") public saveAsDraft: Button;
    @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;
    @component("//span[@id='domestic-view-edit']") public editButton: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//button[@id='push-btn']") public approveNowButton: Button;
    @component("//input[@id='approveNow']") public approveNowBox: Button;
    @component("//button[@name='get-challenge']") public getChallengeButton: Button;
    @component("//div[@class='push-option']") public pushOpion: Button;
    @component('//input[@name="responseCode"]') public responseCode: TextInput;
    @component("//button[@name='submit']") public submitButton: Button;
    @component("//*[@name='saveAsTemplate']") public saveAsTemplateCheckbox: Button;
    @component("//*[@name='templateName']") public templateName: TextInput;
    @component('//button[@name="finish"]') public finishedButton:Button;
    // View MEPS Payment Page
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayeeValue: TextInput;

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

    public async loadConditionForViewPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
    }
    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
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
