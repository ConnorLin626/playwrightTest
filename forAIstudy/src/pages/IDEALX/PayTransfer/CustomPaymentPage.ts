/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Menu } from "../../../config/menu";
import { Page, component, log, Button, ensure, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';
import { PaymentsPages } from "./index";

@log export class CustomPaymentPage extends Page {

    @component('//*[@id="icon__custom_tax"]') public customMenu: Button;
    // Create Page
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="taxCode"]') public taxCode: OptionSelect;
    @component('//*[@id="addTaxBtn-1"]') public AddCustomTax1: Button;
    @component('//*[@id="addTaxBtn-2"]') public AddCustomTax2: Button;
    @component('//*[@id="addTaxBtn-3"]') public AddCustomTax3: Button;
    @component('//*[@id="addTaxBtn-4"]') public AddCustomTax4: Button;
    @component('//*[@id="addTaxBtn-5"]') public AddCustomTax5: Button;
    @component('//*[@id="addTaxBtn-6"]') public AddCustomTax6: Button;
    @component('//input[contains(@id,"fx-contract-0")]') public ContractBtn: Button;
    //@component('//*[@id="md-input-1-input"]') public EnterID: TextInput;
    @component('//ng-component/div/div/form/tax-step-2/div/customs-tax/div/div[2]/div/div[1]/div/ul/li[3]/dbs-input/div/div/div[1]/input') public EnterID: TextInput;
    @component('//*[@id="enterTaxBtn"]') public AddNewTaxButn: Button;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;

    // Approve Customs Payments Page
    @component("//*[@id='approveNow']") public approveNowCheckBox: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component('//button[@name="get-challenge"]') public mchallengeText: TextInput;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;

    // View Customs Payments Page
    @component('//*[@id="tax-view-accountNum"]') public fromAccountView: TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[1]') public ContractRef: TextInput;
    @component('//*[@id="statusDesc"]') public ViewStatus: TextInput;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//*[@name="search"]') public serachButton: Button;

    // Reject Page
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component("//strong[@id='bulk-view-rejectStatus_0']") public rejectStatus: TextInput;

    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;

    // File
    @component('//div[@id="txnFromAccount-0"]') public FromAccount: TextInput;
    @component('//*[@id="fileStatusButton-0"]') public FileViewStatus: TextInput;




    constructor() {
        super();
    }
    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }

    public async loadConditionForPreviewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionForViewPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountView.element), this.fromAccountView.getTimeOut());
    }

    public async loadConditionForApprovePaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
    }
    public async loadConditionForDismissDialog() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }

    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    }

}
