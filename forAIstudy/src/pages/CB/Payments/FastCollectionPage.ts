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
    OptionSelect,
    waitForUXLoading,
    RadioButton,
    HtmlSelect,
    waitForI3Loading
} from '../../../lib';

@log export class FastCollectionPage extends Page {

    // Create Page
    @component('//select[@name="fromParty" and @id="fromParty"]') public toAccountI3: HtmlSelect;
    @component('//input[@name="amount.value" and @id="amount_value_control"]') public collectionAmount: TextInput;
    @component('//div[@id="reasonForPayment_anchor"]') public purposeCode: Button;
    @component('//input[@class="filter_pp"]') public purposeCodeValueInput: TextInput;
    @component('//li[@class="FilterTextChild"]') public purposeCodeValueSelected: Button;
    @component('//input[@id="adhoc_A"]') public newPayerRadio: Button;
    @component('//a[@id="addThirPartyButton_Link"]/span[text()="Create Payer"]') public createPayerButton: Button;
    @component('//a[@id="addThirPartyButton_Link"]/span[text()="Edit Payer"]') public editPayerButton: Button;
    @component('//select[@id="toParty" and @aria-labelledby="toParty_form_label"]') public existingPayer: HtmlSelect;
    @component('//a[@id="submitButton_Link"]/span[text()="Save as Draft"]') public saveAsDraft: Button;
    @component('//textarea[@id="details" and @aria-labelledby="details_form_label"]') public paymentDetails: TextInput;
    @component('//select[@name="recipientAdvice.deliveryMode" and @aria-labelledby="recipientAdvice_deliveryMode_form_label"]') public deliveryMode: HtmlSelect;
    @component('//input[@id="recipientAdvice_delivery_deliveryAddresses_component_2_address"]') public emailText: TextInput;
    @component('//textarea[@id="recipientAdvice_content" and @aria-labelledby="recipientAdvice_content_form_label"]') public invoiceDetails: TextInput;
    @component('//input[@id="recipientAdvice_extraText1" and @aria-labelledby="recipientAdvice_extraText1_form_label"]') public clientReference1: TextInput;
    @component('//textarea[@id="transactionNote" and @aria-labelledby="transactionNote_form_label"]') public transactionNotes: TextInput;
    @component('//a[@id="previewButton_Link"]/span[text()="Preview Collection"]') public previewCollection: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Submit Collection"]') public submitCollection: Button;
    @component('//input[@id="approvalChoice_B" and @aria-labelledby="approvalChoice_B_label"]') public approveNowRadio: Button;
    @component('//*[@id="singleTransfer_form1ContentForm"]/div[2]/span[2]') public mChallengeI3Text: TextInput;
    @component('//input[@id="signature" and @aria-labelledby="signature_form_label"]') public challengeResponse: TextInput;
    @component('//*[@id="singleTransfer_form1ContentForm"]/span[1]/a') public withoutMChallengeI3Text: TextInput;
    @component('//a[@id="approveButton_Link"]/span[text()="Approve Collection"]') public approveCollection: Button;
    @component('//input[@id="saveAsTemplate" and @aria-labelledby="saveAsTemplate_form_label"]') public saveAsTemplateCheckbox: Button;
    @component('//input[@id="templateName" and @aria-labelledby="templateName_form_label"]') public templateName: TextInput;

    //Create Payer
    @component('//input[@originalid="name" and @aria-labelledby="name_form_label"]') public payerName: TextInput;
    @component('//input[@id="accountNumber" and @aria-labelledby="accountNumber_form_label"]') public payerAccountNumber: TextInput;
    @component('//input[@id="debitReference" and @aria-labelledby="debitReference_form_label"]') public debitReference: TextInput;
    @component('//select[@id="extraText2" and @aria-labelledby="extraText2_form_label"]') public bankDetailSelect: HtmlSelect;
    @component('//input[@id="nickName" and @aria-labelledby="nickName_form_label"]') public payerNickName: TextInput;
    @component('//a[@id="submitButton_Link"]/span[text()="Preview"]') public previewButton: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Submit Payer"]') public submitPayerButton: Button;

    //View Fast Collection
    @component('//span[@id="fromParty" and @aria-labelledby="fromParty_form_label"]') public toAccountValue: TextInput;
    @component('//span[@id="amount" and @aria-labelledby="amount_form_label"]') public collectionAmountValue: TextInput;
    @component('//span[@id="status" and @aria-labelledby="status_form_label"]') public statusValue: TextInput;
    @component('//span[@id="beneficiaryName" and @aria-labelledby="beneficiaryName_form_label"]') public beneficiaryNameValue: TextInput;
    @component('//input[@id="authorizeMemo" and @aria-labelledby="authorizeMemo_form_label"]') public reasonForRejection: TextInput;
    @component('//*[@id="submitButton_Link"]/span[text()="Preview Collection"]') public previewCollectionI3Button: Button;
    // @component('//a[@id="submitButton_Link"]/span[text()="Save as Draft"]') public saveAsDraft: Button;
    @component('//a[@id="copyButton_Link"]') public copyButton: Button;
    @component('//a[@id="modifyButton_Link"]') public editButton: Button;
    @component('//a[@id="rejectButton_Link"]') public rejectButton: Button;
    @component('//a[@id="deleteButton_Link"]') public deleteButton: Button;
    @component('//a[@id="approveButton_Link"]') public approveButton: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Reject Collection"]') public rejectCollectionButton: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Delete Collection"]') public deleteCollectionButton: Button;
    @component('//a[@id="submitButton_Link"]/span[text()="Approve Collection"]') public approveCollectionButton: Button;


    //View Fast Template
    @component('//span[@id="templateName" and @aria-labelledby="templateName_form_label"]') public templateNameValue: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.toAccountI3.element), this.toAccountI3.getTimeOut());
    }

    public async loadConditionForNewPayer() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.visibilityOf(this.newPayerRadio.element), this.newPayerRadio.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.existingPayer.element), this.existingPayer.getTimeOut());
    }

    public async loadConditionOnNewPayerPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewButton.element), this.previewButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitPayerButton.element), this.submitPayerButton.getTimeOut());
    }

    public async loadConditionForEditPayerButton() {
        await this.pageSwitchToI3();
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.createPayerButton.element), this.createPayerButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.editPayerButton.element), this.editPayerButton.getTimeOut());
    }

    public async loadConditionForApproveNow() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewCollection.element), this.previewCollection.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveCollection.element), this.approveCollection.getTimeOut());
    }

    public async loadConditionOnPreviewPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewCollection.element), this.previewCollection.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitCollection.element), this.submitCollection.getTimeOut());
    }

    public async loadConditionCreatePaymentTemplate() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.visibilityOf(this.previewCollectionI3Button.element), this.previewCollectionI3Button.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.previewCollectionI3Button.element), this.previewCollectionI3Button.getTimeOut());
    }

    public async loadConditionOnPreviewFromTemplatePage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.previewCollectionI3Button.element), this.previewCollectionI3Button.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitCollection.element), this.submitCollection.getTimeOut());
    }

    public async loadConditionForViewFastPaymentPage() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusValue.element), this.statusValue.getTimeOut());
    }

    public async loadConditionOnDeletePage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.deleteButton.element), this.deleteButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteCollectionButton.element), this.deleteCollectionButton.getTimeOut());
    }

    public async loadConditionOnRejectPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.rejectButton.element), this.rejectButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.rejectCollectionButton.element), this.rejectCollectionButton.getTimeOut());
    }

    public async loadConditionOnApprovePage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.approveButton.element), this.approveButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveCollectionButton.element), this.approveCollectionButton.getTimeOut());
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