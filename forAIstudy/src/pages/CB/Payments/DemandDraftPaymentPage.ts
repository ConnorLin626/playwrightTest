/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import {
    Page,
    component, log,
    Button,
    TextInput,
    waitForUXLoading,
    HtmlSelect,
    waitForI3Loading,
    OptionSelect
} from '../../../lib';

@log export class DemandDraftPaymentPage extends Page {

    // Create Page
    @component('//select[@name="fromParty" and @id="fromParty"]') public fromAccountI3: HtmlSelect;
    @component('//select[@id="paymentCurrency_currencyCode" and @aria-labelledby="paymentCurrency_currencyCode_form_label"]') public paymentCurrency: HtmlSelect;
    @component('//select[@aria-labelledby="payableCountry_form_label" and @id="payableCountry"]') public payableCountry: HtmlSelect;
    @component('//input[@name="amount.value" and @id="amount_value_control"]') public amount: TextInput;
    @component('//input[@id="adhoc_A"]') public newBeneficiaryRadio: Button;
    @component('//a[@id="addThirPartyButton_Link"]/span[text()="Create Beneficiary"]') public createBeneficiaryButton: Button;
    @component('//a[@id="addThirPartyButton_Link"]/span[text()="Edit Beneficiary"]') public editBeneficiaryButton: Button;
    @component('//select[@id="toParty" and @aria-labelledby="toParty_form_label"]') public existingBeneficiary: HtmlSelect;
    @component('//a[@id="submitButton_Link"]/span[text()="Save as Draft"]') public saveAsDraft: Button;
    @component('//textarea[@id="details" and @aria-labelledby="details_form_label"]') public paymentDetails: TextInput;
    @component('//textarea[@id="transactionNote" and @aria-labelledby="transactionNote_form_label"]') public transactionNotes: TextInput;
    @component('//select[@id="lineItemForm_chequeInfo_pickupLocation" and @aria-labelledby="lineItemForm_chequeInfo_pickupLocation_form_label"]') public pickupLocation: HtmlSelect;
    @component('//a[@id="previewButton_Link"]/span[text()="Preview Payment"]') public previewPayment: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Submit Payment"]') public submitPayment: Button;
    @component('//input[@id="approvalChoice_B" and @aria-labelledby="approvalChoice_B_label"]') public approveNowRadio: Button;
    @component('//*[@id="singleTransfer_form1ContentForm"]/div[2]/span[2]') public mChallengeI3Text: TextInput;
    @component('//input[@id="signature" and @aria-labelledby="signature_form_label"]') public challengeResponse: TextInput;
    @component('//*[@id="singleTransfer_form1ContentForm"]/span[1]/a') public withoutMChallengeI3Text: TextInput;
    @component('//a[@id="approveButton_Link"]/span[text()="Approve Payment"]') public approvePayment: Button;
    @component('//input[@id="saveAsTemplate" and @aria-labelledby="saveAsTemplate_form_label"]') public saveAsTemplateCheckbox: Button;
    @component('//input[@id="templateName" and @aria-labelledby="templateName_form_label"]') public templateName: TextInput;

    //Create Beneficiary
    @component('//input[@originalid="name" and @aria-labelledby="name_form_label"]') public BeneficiaryName: TextInput;
    @component('//input[@id="address1" and @aria-labelledby="address1_form_label"]') public BeneficiaryAddress1: TextInput;
    @component('//input[@id="nickName" and @aria-labelledby="nickName_form_label"]') public BeneficiaryNickName: TextInput;
    @component('//a[@id="submitButton_Link"]/span[text()="Preview"]') public previewButton: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Submit Beneficiary"]') public submitBeneficiaryButton: Button;

    //View Fast Collection
    @component('//span[@id="fromParty" and @aria-labelledby="fromParty_form_label"]') public toAccountValue: TextInput;
    @component('//span[@id="amount" and @aria-labelledby="amount_form_label"]') public collectionAmountValue: TextInput;
    @component('//span[@id="status" and @aria-labelledby="status_form_label"]') public statusValue: TextInput;
    @component('//span[@id="beneficiaryName" and @aria-labelledby="beneficiaryName_form_label"]') public beneficiaryNameValue: TextInput;
    @component('//input[@id="authorizeMemo" and @aria-labelledby="authorizeMemo_form_label"]') public reasonForRejection: TextInput;
    @component('//*[@id="submitButton_Link"]/span[text()="Preview Payment"]') public previewPaymentI3Button: Button;
    // @component('//a[@id="submitButton_Link"]/span[text()="Save as Draft"]') public saveAsDraft: Button;
    @component('//a[@id="copyButton_Link"]') public copyButton: Button;
    @component('//a[@id="modifyButton_Link"]') public editButton: Button;
    @component('//a[@id="rejectButton_Link"]') public rejectButton: Button;
    @component('//a[@id="deleteButton_Link"]') public deleteButton: Button;
    @component('//a[@id="approveButton_Link"]') public approveButton: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Reject Payment"]') public rejectPaymentButton: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Delete Payment"]') public deletePaymentButton: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Approve Payment"]') public approvePaymentButton: Button;

    //View Fast Template
    @component('//span[@id="templateName" and @aria-labelledby="templateName_form_label"]') public templateNameValue: TextInput;

    //New DemandDraft
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccountIX: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingBeneficiaryIX: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="currencySelected"]') public paymentCurrencyIX: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="locationPayable"]') public payableCountryIX: OptionSelect;
    @component('//input[@name="send-amount"]') public amountIX: TextInput;
    @component('//p-auto-complete[@formcontrolname="pickUpLocation"]') public pickupLocationIX: OptionSelect;
    @component('//div[@id="domestic-view-status"]') public statusValueIX: TextInput;
    @component('//span[@id="dd-view-pickupLocation"]') public pickupLocationValueIX: TextInput;
    @component('//span[@id="dd-view-accountNum"]') public fromAccountValueIX: TextInput;
    @component('//span[@id="dd-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//span[@id="add1_required_Msg"]') public addr1ErrMsg: TextInput;
    @component('//div[@id="pickUpLocation_Msg"]') public pickUpLocationErrMsg: TextInput;
    @component('//a[@id="ux-tab-NEW"]') public newPayeeTabIX: Button;
    @component('//input[@name="new-payee-name"]') public payeeNameIX: TextInput;
    @component('//input[@name="new-payee-postal-code"]') public payableToIX: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountI3.element), this.fromAccountI3.getTimeOut());
    }

    public async loadConditionForNewBeneficiary() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.visibilityOf(this.newBeneficiaryRadio.element), this.newBeneficiaryRadio.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.existingBeneficiary.element), this.existingBeneficiary.getTimeOut());
    }

    public async loadConditionOnNewBeneficiaryPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewButton.element), this.previewButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBeneficiaryButton.element), this.submitBeneficiaryButton.getTimeOut());
    }

    public async loadConditionForEditBeneficiaryButton() {
        await this.pageSwitchToI3();
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.createBeneficiaryButton.element), this.createBeneficiaryButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.editBeneficiaryButton.element), this.editBeneficiaryButton.getTimeOut());
    }

    public async loadConditionForApproveNow() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewPayment.element), this.previewPayment.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approvePayment.element), this.approvePayment.getTimeOut());
    }

    public async loadConditionOnPreviewPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewPayment.element), this.previewPayment.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitPayment.element), this.submitPayment.getTimeOut());
    }

    public async loadConditionCreatePaymentTemplate() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.visibilityOf(this.previewPaymentI3Button.element), this.previewPaymentI3Button.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.previewPaymentI3Button.element), this.previewPaymentI3Button.getTimeOut());
    }

    public async loadConditionOnPreviewFromTemplatePage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewPaymentI3Button.element), this.previewPaymentI3Button.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitPayment.element), this.submitPayment.getTimeOut());
    }

    public async loadConditionForViewFastPaymentPage() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusValue.element), this.statusValue.getTimeOut());
    }

    public async loadConditionOnDeletePage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.deleteButton.element), this.deleteButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.deletePaymentButton.element), this.deletePaymentButton.getTimeOut());
    }

    public async loadConditionOnRejectPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.rejectButton.element), this.rejectButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.rejectPaymentButton.element), this.rejectPaymentButton.getTimeOut());
    }

    public async loadConditionOnApprovePage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.approveButton.element), this.approveButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approvePaymentButton.element), this.approvePaymentButton.getTimeOut());
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

    public async newLoadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountIX.element), this.fromAccountIX.getTimeOut());
    }
    public async newLoadCondition4View() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusValueIX.element), this.statusValueIX.getTimeOut());
    }
}