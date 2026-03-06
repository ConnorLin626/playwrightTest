/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, RadioButton, waitForUXLoading, waitForI3Loading } from '../../../lib';

@log export class GiroPaymentPage extends Page {

    //Create page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//a[@id="ux-tab-NEW"]') public newPayeeTab: Button;
    @component('//input[@name="new-payee-name"]') public newPayeeName: TextInput;
    @component('//input[@name="bankType-NONDBS"]') public otherBankRadio: RadioButton;
    @component('//div[@id="payee-bank-common"]') public newPayeeBankID: OptionSelect;
    @component('//input[@name="new-payee-acct-number"]') public newPayeeAcctNumber: TextInput;
    @component('//input[@id="set_date"]') public chooseDate: RadioButton;
    @component('//input[@id="next_day_Type"]') public giroType: RadioButton;
    @component('//multi-level-dropdown[@ng-reflect-name="purposeCode"]') public purposeCode: OptionSelect;
    @component('//button[@name="next"]') public nextButton: Button;

    // Preview page
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="submit" and @class="btn btn-dbs-solid next"]') public submitButton: Button;
    @component('//button[@name="finish" and @class="btn btn-dbs-solid next"]') public finishedButton: Button;

    // View page
    @component('//div[@id="domestic-view-status"]') public statusValue: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//label[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//span[@id="domestic-view-newPayee-acctNum"]') public accountNumberValue: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public payeeNameValue: TextInput;
    @component('//view-section-domestic/div/section[3]/div/div/div[1]/span[2]') public payeeBankNameValue: TextInput;
    @component('//span[@id="domestic-view-newPayee-swiftBic"]') public payeeBankIDValue: TextInput;
    @component('//view-section-domestic/div/section[3]/div/div/div[4]/span[2]') public payeeBankCodeValue: TextInput;
    @component('//view-section-domestic/div/section[3]/div/div/div[5]/span[2]') public payeeBankBranchCodeValue: TextInput;



    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
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

    public async loadConditionForViewGiroPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusValue.element), this.statusValue.getTimeOut());
    }


    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await this.loadConditionForViewGiroPaymentPage();
    }


}
