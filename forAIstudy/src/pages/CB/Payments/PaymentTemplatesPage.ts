/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect, waitForI3Loading } from '../../../lib';

@log export class PaymentTemplatesPage extends Page {

    // Template Center list
    @component('//input[@name="manageTemplate-organisation"]') public manageTemplateOrganisation: TextInput;
    @component('//input[@name="manage-template-filter"]') public manageTemplateFilter: TextInput;
    @component('//a[@id="template-list-makeAPayment_0"]') public makeAPaymentLink: Button;
    @component('//a[@id="template-list-templateName_0"]') public templateNameLink: Button;
    // @component('//template-list/div/div[1]/table/tbody/tr[1]/td[6]/div/a') public makeAPaymentLink: Button;
    // @component('//template-list/div/div[1]/table/tbody/tr[1]/td[2]/div[1]/a') public templateNameLink: Button;
    @component('//span[@id="templateFilters"]') public showAdditonFilter: Button;
    @component("//p-auto-complete[@formcontrolname='paymentTypeRec']") public paymentTypeList: OptionSelect;
    @component("//button[@name='search']") public searchButton: Button;
    @component('//*[@name="create-new-template"]') public createNewTemplateButton: Button;
    @component('//a[@id="singleTemplate-SG"]') public createSinglePaymentTemplateButton: Button;
    @component('//a[@id="payrollTemplate-SG"]') public createBulkTemplateButton: Button;
    @component('//a[@id="payroll02Template-SG"]') public createPayroll02TemplateButton: Button;
    @component('//a[@id="bulkTemplate-SG"]') public createSgBulkTemplateButton: Button;
    @component('//a[@id="demandDraftTemplate-SG"]') public createSgCDDTemplateButton: Button;
    @component('//input[@name="manege-template-select-0"]') public selectTemCheckBox: Button;
    @component('//*[@id="ux-tab-PENDING APPROVAL"]') public pendingTable: Button;
    @component('//*[@id="dbs-tab-count-PENDING APPROVAL"]') public pendingTableCount: TextInput;

    //View Template page
    @component('//div[@id="domestic-viewTemp-status"]') public templateStatus: Button;
    @component('//button[@name="cancel"]') public cancelButton: Button;
    @component('//div[@id="ott-viewTemp-status"]') public templateTTStatus: Button;
    @component('//div[@id="act-viewTemp-status"]') public templateACTStatus: Button;

    @component('//*[@id="domestic-view-accountNum"]') public fromAccount: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public amount: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public beneficiary: TextInput;

    //View Bulk Template
    @component('//*[@id="bulk-viewTemp-accountNum"]') public bulkFromAccount: TextInput;
    @component('//*[@id="bulk-viewTemp-maxAmount"]') public bulkAmount: TextInput;
    @component('//input[@id="bulk-view-filter"]') public payeeFilter: TextInput;
    @component('//*[@id="bulk-view-amount_0"]') public bulkPayeeAmount: TextInput;
    @component('//*[@id="bulk-view-name_0"]') public bulkBeneficiary: TextInput;
    @component('//div[@id="bulk-view-nickName_0"]') public bulkBeneficiaryNickName: TextInput;
    @component('//div[@id="paynow-proxy-mobNum-0"]') public bulkPayNowMobNum: TextInput;
    @component('//span[@id="bulk-viewTemp-status"]') public bulkTransactionStatus: TextInput;
    @component('//*[@id="reference-for-payee"]') public ViewpayeeRef: TextInput;
    @component('//label[@id="bulk-viewTemp-paymentType"]') public ViewPaymentType: TextInput;

    //View I3 Template page
    @component('//a[@id="editButton_Link"]') public editI3Button: Button;
    @component('//a[@id="cancelButton_Link"]') public cancelI3Button: Button;
    @component('//span[@id="templateName"]') public templateNameValue: TextInput;
    @component('//button[@name="make-payment"]') public makeAPayment: Button;

    //View ACT Template
    @component('//span[@id="act-view-accountNum"]') public fromAccountACT: TextInput;
    @component('//label[@id="act-view-sendAmount"]') public amountACT: TextInput;
    @component('//strong[@id="act-view-existingPayee-acctName"]') public toExistingPayeeNameACT: TextInput;

    // create template page name="payee-selector"
    @component('//*[@name="payee-selector"]') public existingPayeeFilter: TextInput;
    @component('//*[@name="next"]') public nextButton: Button;
    @component('//*[@name="templateName"]') public templateName: TextInput;
    @component('//*[@formcontrolname="fromAccount"]') public accountSelect: OptionSelect;
    @component('//*[@formcontrolname="currency"]') public currencySelect: OptionSelect;
    @component('//*[@formcontrolname="payee"]') public payeeSelect: OptionSelect;
    @component('//*[@formcontrolname="purposeCode"]') public purposeCodeSelect: OptionSelect;
    @component('//*[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component('//*[@name="add"]') public addButton: Button;
    @component('//input[@id="bank-charge-shared"]') public bankCharges: Button;
    @component('//*[@name="added-payees"]') public addPayeeFilter: TextInput;
    @component('//input[@name="payeeAmount"]') public payeeAmount: TextInput;
    @component('//input[@name="payeeRef"]') public payeeRef: TextInput;
    @component('//input[@name="send-amount"]') public defaultAmount: TextInput;
    @component('//input[@name="max-amount"]') public maxAmount: TextInput;
    @component('//button[@name="submit"]') public submitButton: Button;
    @component('//button[@name="finish"]') public finishButton: Button;
    @component('//li[@id="tabId_1"]') public newPayNowButton: Button;
    @component('//input[@name="proxyTypeMobNumInput"]') public newPayNowMobNum: TextInput;
    @component('//input[@name="newPayNowNickName"]') public newPayNowNickName: TextInput;
    @component('//button[@name="add-payee"]') public addPayeeButton: Button;
    @component('/temp-bulk-step-3/div[1]/div/div[1]/div/filter-component/dbs-filter-item-component/section/bp-payee/div/div[1]/sg/div/bp-payee-reference/div/div[2]/span') public payeeRefError: Button;
    @component('//div[@id="bulk-viewTemp-edit"]') public EditTemplate: Button;


    // make payment page
    @component('//span[@id="previewReference"]') public batchReference: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.manageTemplateFilter.element), this.manageTemplateFilter.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewTemplateButton.element), this.createNewTemplateButton.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionForViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateStatus.element), this.templateStatus.getTimeOut());
    }

    public async loadConditionForI3ViewPage() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.editI3Button.element), this.editI3Button.getTimeOut());
    }

    public async loadConditionForCreateInputDetailPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
    }

    public async loadConditionForSingleCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateName.element), this.templateName.getTimeOut());
    }

    public async loadConditionForPayeePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.addButton.element), this.addButton.getTimeOut());
    }

    public async loadConditionForCreateVerifyDetailPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForCreateSubmitPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
    }

    public async loadConditionForTTtempViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateTTStatus.element), this.templateTTStatus.getTimeOut());
    }
    public async loadConditionForACTtempViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateACTStatus.element), this.templateACTStatus.getTimeOut());
    }
    public async loadConditionForBulkTempViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.bulkTransactionStatus.element), this.bulkTransactionStatus.getTimeOut());
    }

    public async loadCondition4DDTempView() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateStatus.element), this.templateStatus.getTimeOut());
    }
}
