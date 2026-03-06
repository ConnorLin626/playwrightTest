/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/


import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';

@log export class LVTPaymentPage extends Page {
    // Create Page
    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public paymentMenu: Button;
    @component('//a[contains(@href,"#/transfers/manage-templates")]') public TemplaterTab: Button;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[3]/button') public digiToken: Button;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[2]/input') public enterCode: TextInput;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[3]/button') public authNow: Button;
    @component('//*[@id="icon__make_payment"]') public makePayment: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component("//*[@id='ux-tab-NEW']") public newPayeeTab: Button;
    @component('//p-auto-complete[@formcontrolname="selectedCountry"]') public newPayeeCountry: OptionSelect;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;


    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//payee-bank//div[@id="payee-bank-common"]') public payeeBankID: OptionSelect;
    @component('//div[starts-with(@class, "manual clearfix")]') public enterDetailButton: Button;
    @component('//input[@name="new-payee-bsb-code"]') public bsbCodeText: TextInput;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component('//input[@id="set_date"]') public paymentDateRadio: Button;
    @component('//input[@id="normal_type"]') public hvtTypeRadio: Button;
    @component('//input[@id="bank-charge-shared"]') public sharedRadio: Button;
    @component("//*[@id='next_day_Type']") public LVTCheckBox: Button;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='save-as-draft']") public saveAsDraft: Button;
    @component("//*[@id='domestic-view-edit']") public editButton: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//button[@id='push-btn']") public approveNowButton: Button;
    @component("//input[@id='approveNow']") public approveNowBox: Button;
    @component("//button[@name='get-challenge']") public getChallengeButton: Button;
    @component("//*[@class='push-option-label']") public pushOpion: Button;
    @component('//input[@name="responseCode"]') public responseCode: TextInput;
    @component("//button[@name='submit']") public submitButton: Button;
    @component("//*[@name='saveAsTemplate']") public saveAsTemplateCheckbox: Button;
    @component("//*[@name='templateName']") public templateName: TextInput;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;

    //reject page

    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;


    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;


    // View Payment Page
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public toNewPayeeValue: TextInput;
    @component("//*[@class='alert-tag ng-star-inserted']") public HighRisk: TextInput;
    @component("//div[@class='alert-msg']") public alertMeaasge: TextInput;

    //view template page
    @component('//*[@id="domestic-viewTemp-templateName"]') public viewTemplateName: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public viewTemplateAmount: TextInput;
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
        await browser.wait(ExpectedConditions.stalenessOf(this.nextButton.element), this.nextButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.submitButton.element), this.submitButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await browser.wait(ExpectedConditions.stalenessOf(this.submitButton.element), this.submitButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionForViewPaymentPage() {
        await waitForUXLoading();
        await browser.sleep(3000); //wait for response
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
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
