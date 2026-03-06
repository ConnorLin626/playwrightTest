/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect, waitForI3Loading } from '../../../lib';
@log export class PaymentTemplatesPage extends Page {

    // Template Center list
    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public paymentMenu: Button;
    @component('//a[contains(@href,"#/transfers/manage-templates")]') public templateMenu: Button;
    @component("//*[@id='templateFilters']/label") public showAdditionFilter: Button;
    @component("//p-auto-complete[@formcontrolname='status']") public transactionStatusList: OptionSelect;

    @component('//input[@name="manageTemplate-organisation"]') public manageTemplateOrganisation: TextInput;
    @component('//input[@name="manage-template-filter"]') public manageTemplateFilter: TextInput;
    @component('//a[@id="template-list-makeAPayment_0"]') public makeAPaymentLink: Button;
    @component('//a[@id="template-list-templateName_0"]') public templateNameLink: Button;
    @component('//ng-component/div/create-templates/div[3]/template-list/div/div/div[2]/table/tbody/tr[1]/td[3]/div[1]') public FromAccountText: TextInput;
    // @component('//template-list/div/div[1]/table/tbody/tr[1]/td[6]/div/a') public makeAPaymentLink: Button;
    // @component('//template-list/div/div[1]/table/tbody/tr[1]/td[2]/div[1]/a') public templateNameLink: Button;
    @component('//span[@id="templateFilters"]') public showAdditonFilter: Button;
    @component("//p-auto-complete[@formcontrolname='paymentTypeRec']") public paymentTypeList: OptionSelect;
    @component("//button[@name='search']") public searchButton: Button;
    @component('//*[@name="create-new-template"]') public createNewTemplateButton: Button;
    @component('//a[@id="singleTemplate-SG"]') public createSinglePaymentTemplateButton: Button;
    @component('//a[@id="singleTemplate-VN"]') public createSingleVNPaymentTemplateBtn: Button;
    @component('//a[@id="singleTemplate-ID"]') public createSingleIDPaymentTemplateBtn: Button;
    @component('//a[@id="singleTemplate-CN"]') public createSingleCNPaymentTemplateBtn: Button;
    @component('//a[@id="singleTemplate-GC"]') public createSingleGCPaymentTemplateBtn: Button;
    @component('//a[@id="singleTemplate-HK"]') public createSingleHKPaymentTemplateBtn: Button;
    @component('//a[@id="singleTemplate-TW"]') public createSinglePaymentTemplateTWButton: Button;
    @component('//a[@id="payrollTemplate-SG"]') public createBulkTemplateButton: Button;
    @component('//a[@id="bulkTemplate-TW"]') public createFISCBulkTemplateButton: Button;
    @component('//a[@id="bulkTemplate-HK"]') public createHKBulkTemplateButton: Button;
    @component('//a[@id="singleTemplate-MO"]') public createMOFPSTemplateButton: Button;
    @component('//a[@id="bulkTemplate-SG"]') public createSgBulkTemplateButton: Button;
    @component('//a[@id="bulkCollTemplate-SG"]') public createSgBulkColTemplateButton: Button;
    @component('//a[@id="corporateChequeTemplate-SG"]') public createSgCorChequeTemplateButton: Button;
    @component('//a[@id="demandDraftTemplate-SG"]') public createSgCDDTemplateButton: Button;
    @component('//a[@id="manageTemplate-550"]') public createMT101TemplateButton: Button;
    @component('//a[@id="manageTemplate-269"]') public createIDICTPaymentTemplateBtn: Button;
    @component('//a[@id="manageTemplate-583"]') public createCrossBorderPaymentTemBtn: Button;
    @component('//input[@name="manege-template-select-0"]') public selectTemCheckBox: Button;
    @component('//*[@name="delete"]') public deleteBtn: Button;
    @component('//ng-component/div/confirm-templates/div[3]/div/button[2]') public preDeleteBtn: Button;
    @component('//*[@type="submit"]') public approveBtn: Button;
    @component('//*[@name="approve"]') public viewApproveBtn: Button;
    @component('//*[@name="Approve"]') public confirmApproveBtn: Button;
    @component('//*[@name="dismiss"]') public dismissBtn: Button;
    @component('//*[@id="ux-tab-NEW"]') public addNewPayeeBtn: Button;
    @component('//*[@formcontrolname="selectedCountry"]') public selectedCountry: OptionSelect;
    @component('//*[@id="enterManual"]') public enterManually: Button;
    @component('//*[@id="new-payee-bank-name-input"]') public payeeBankName: TextInput;
    @component('//input[@id="new-payee-bank-add1-input"]') public payeeBankAdd1: TextInput;
    @component('//input[@id="new-payee-bank-add2-input"]') public payeeBankAdd2: TextInput;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
    @component('//*[@name="new-payee-nick-name"]') public newPayeeNickName: TextInput;
    @component('//p-auto-complete[@formcontrolname="country"]') public payeeLocation: OptionSelect;
    //@component("//*[@id='payee-location']") public payeeLocation: OptionSelect;
    @component('//*[@name="townCity"]') public townCity: TextInput;
    @component('//*[@name="postal-code"]') public postalCode: TextInput;
    @component("//*[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//*[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;

    @component('//*[@id="ux-tab-PENDING APPROVAL"]') public pendingTable: Button;
    @component('//*[@id="ux-tab-TEMPLATE_PENDING"]') public pendingTab: Button;
    @component('//*[@id="dbs-tab-count-PENDING APPROVAL"]') public pendingTableCount: TextInput;
    @component('//div[@id="bulk-viewTemp-edit"]') public EditTemplate: Button;
    @component('//div[@id="ott-viewTemp-edit"]') public EditTTTemplate: Button;
    @component('//div[@id="domestic-viewTemp-edit"]') public EditDometicTemplate: Button;
    @component('//create-templates/div[2]/div/span[2]/p-auto-complete/div/div[2]/span') public templateOrganition: Button;
    @component('//create-templates/div[2]/div/span[2]/p-auto-complete/div/div[2]/ul/li[1]/div/span') public showAll: Button;
    @component('//*[@id="act-viewTemp-edit"]') public editACTTemplate: Button;
    @component('//*[@id="dialogDelete"]') public dialogDelete: Button;
    @component('//organisation-label/div/div/div/div[2]/p-auto-complete/div/div[2]/span') public createTempOrgSelect: Button;
    @component('//organisation-label/div/div/div/div[2]/p-auto-complete/div/div[2]/ul/li[1]/div/span') public SCOrg: Button;
    
    @component('//*[@formcontrolname="gstPurposeCode"]') public PurposePaymentFiled: OptionSelect;
    @component('//dbs-dropdown[@id="additionalInfo-drapdown0"]') public BeneTypeFiled : OptionSelect;
    @component('//*[@title="CO"]') public BeneType : OptionSelect;
    @component('//dbs-dropdown[@id="additionalInfo-drapdown1"]') public SourceFundFiled: OptionSelect;
    @component('//*[@title="1"]') public SourceFund: OptionSelect;
    @component('//dbs-dropdown[@id="additionalInfo-drapdown2"]') public RelationshipBeneFiled: OptionSelect;
    @component('//*[@title="ContracteeContractor"]') public RelationshipBene: OptionSelect;

   
    

    //View Template page
    @component('//div[@id="act-viewTemp-templateName"]') public ViewTemplateName: TextInput;
    @component('//div[@id="domestic-viewTemp-status"]') public templateStatus: TextInput;
    @component('//button[@name="cancel"]') public cancelButton: Button;
    @component('//div[@id="ott-viewTemp-status"]') public templateTTStatus: Button;
    @component('//div[@id="act-viewTemp-status"]') public templateACTStatus: Button;
    @component('//div[@id="ict-viewTemp-status"]') public templateICTStatus: TextInput;
    @component('//div[@id="domestic-viewTemp-status"]') public templateDomesticStatus: TextInput;
    @component('//*[@id="label-purpose-code"]') public PurposeCodeValue: TextInput;
    @component('//*[@id="view-ott-existingPayee-acctNum"]') public tempToAccountNumberValue: TextInput;
      @component('//*[@id="view-ott-sendAmount"]') public sendAmountTTValue: TextInput;

    @component('//*[@id="domestic-view-accountNum"]') public fromAccount: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public amount: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public beneficiary: TextInput;
    @component('//*[@id="domestic-view-existingPayee-cardNum"]') public cardNumValue: TextInput;    
    @component('//*[@id="label-gst-purpose-code"]') public ViewPurposeCode: TextInput;
    @component('//*[@id="view-ott-accountNum"]') public ViewOTTaccount: TextInput;
    @component('//*[@id="view-ott-existingPayee-name"]') public ViewOTTbeneName: TextInput;
    @component('//*[@id="view-ott-sendAmount"]') public ViewAmount: TextInput;
    @component('//*[@id="label-additional-information0"]') public ViewBeneType: TextInput;
    @component('//*[@id="label-additional-information1"]') public ViewSourceFund: TextInput;
    @component('//*[@id="label-additional-information2"]') public ViewRelationshipBene: TextInput;
    @component('//*[@id="ott-view-payee-bankName"]') public ViewOTTPayeeBankName: TextInput;
    @component('//*[@id="ott-view-payee-bankAdd1"]') public ViewOTTPayeeBankAdd1: TextInput;
    @component('//*[@id="ott-view-payee-bankAdd2"]') public ViewOTTPayeeBankAdd2: TextInput;

    
    @component('//strong[@id="view-ott-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;

    //View Bulk Template
    @component('//*[@id="bulk-viewTemp-accountNum"]') public bulkFromAccount: TextInput;
    @component('//*[@id="bulk-viewTemp-maxAmount"]') public bulkAmount: TextInput;
    @component('//input[@id="bulk-view-filter"]') public payeeFilter: TextInput;
    @component('//*[@id="bulk-view-amount_0"]') public bulkPayeeAmount: TextInput;
    @component('//*[@id="bulk-view-name_0"]') public bulkBeneficiary: TextInput;
    @component('//div[@id="bulk-view-nickName_0"]') public bulkBeneficiaryNickName: TextInput;
    @component('//div[@id="paynow-proxy-mobNum-0"]') public bulkPayNowMobNum: TextInput;
    @component('//span[@id="bulk-viewTemp-status"]') public bulkTransactionStatus: TextInput;
    @component('//label[@id="bulk-viewTemp-paymentType"]') public bulkTransactionPaymentType: TextInput;
    @component('//ng-component/div/ng-component/div/div[1]/dbs-bulk-view-section/div/dbs-bp-view-summary-section/div[7]/span[2]') public DebitTypeValue: TextInput;
    @component('//*[@id="transaction-code-label"]') public TransactionCodeValue: TextInput;
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
    @component('//*[@id="act-view-existingPayee-acctName"]') public toExistingPayeeNameACT: TextInput;
    @component('//*[@id="act-view-newPayee-acctName"]') public toNewPayeeNameACT: TextInput;
    @component('//*[@id="act-view-existingPayee-acctNum"]') public toExistingPayeeAcctNumACT: TextInput;

    //View ICT Template
    @component('//span[@id="ict-view-accountNum"]') public fromAccountICT: TextInput;
    @component('//span[@id="ict-view-payeeNum"]') public toAccountICT: TextInput;
    @component('//*[@id="ict-view-temp-sendAmount"]') public sendAmountValue: TextInput;
    @component('//*[@id="ict-viewTemp-edit"]') public editTempButton: TextInput;


    // create template page name="payee-selector"
    @component('//*[@name="payee-selector"]') public existingPayeeFilter: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component('//*[@name="next"]') public nextButton: Button;
    @component('//*[@name="templateName"]') public templateName: TextInput;
    @component('//*[@formcontrolname="fromAccount"]') public accountSelect: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="chargeAccount"]') public chargeAccounts: OptionSelect;
    @component('//*[@formcontrolname="currency"]') public currencySelect: OptionSelect;
    @component('//*[@formcontrolname="payee"]') public payeeSelect: OptionSelect;
    @component('//*[@formcontrolname="purposeCode"]') public purposeCodeSelect: OptionSelect;
     @component('//input[@placeholder="Purpose code number or description"]') public filterRppc: TextInput;
    @component('//*[@class="truncate-searchResult text-sm text-slate-950 flex-1"]') public selectFirstResult: TextInput;
    @component('//input[@name="purposeCode"]') public purposeCodeInput: TextInput;
    @component('//*[@id="select-item-(P0502) constr. works outside India"]/span') public purposeCodeSelected: TextInput;
    @component('//input[@name="new-payee-routing-code"]') public IFSCcode: TextInput;
    @component('//*[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component('//*[@name="ott-regulatory-advising-transRemark1"]') public TxnRemark1: TextInput;
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
    @component('//p-auto-complete[@formcontrolname="debitType"]') public debitTypeSelect: OptionSelect;
    @component('//multi-level-dropdown[@formcontrolname="transactionCode"]') public TransactionValue: OptionSelect;
    @component('//button[@name="Submit"]') public submitBtn: Button;
    @component('//*[@id="normal_type"]') public RTGSType: Button;
    @component('//*[@type="button"]') public closBtn: Button;
    //new NAPAS Payee
    @component('//*[@id="ux-tab-NEWNAPASPAYEE"]') public newNAPAS246Payee: Button;
    @component('//*[@name="payToType-CARD"]') public payToCardType: Button;
    @component('//*[@name="new-payee-card-number"]') public NewCardNum: TextInput;
    @component('//*[@name="Verify"]') public VerifyBtn: Button;
    // make payment page
    @component('//span[@id="previewReference"]') public batchReference: TextInput;

    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.manageTemplateFilter.element), this.manageTemplateFilter.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewTemplateButton.element), this.createNewTemplateButton.getTimeOut());
        //await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameLink.element), this.templateNameLink.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.FromAccountText.element), this.FromAccountText.getTimeOut());
        await waitForUXLoading();
    }

    public async goToViewPTemplatePageViaSearch(paymentType: string) {
        await this.loadCondition();
        await this.showAdditionFilter.click();
        if ("" !== paymentType) {
            await this.paymentTypeList.select(paymentType);
        }
        await this.searchButton.jsClick();
        await this.loadCondition();
        await this.templateNameLink.jsClick();
    }

    public async loadConditionForViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateStatus.element), this.templateStatus.getTimeOut());
    }

    public async loadConditionForViewBulkPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.bulkTransactionStatus.element), this.templateStatus.getTimeOut());
        await browser.sleep(1500)
    }

    public async loadConditionForI3ViewPage() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.editI3Button.element), this.editI3Button.getTimeOut());
    }

    public async loadConditionForCreateInputDetailPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
        //await browser.wait(ExpectedConditions.visibilityOf(this.templateName.element), this.templateName.getTimeOut());
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

    public async loadConditionForDeletePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteBtn.element), this.deleteBtn.getTimeOut());
    }

    public async loadConditionForTTtempViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateTTStatus.element), this.templateTTStatus.getTimeOut());
    }

    public async loadConditionForNAPAStempViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateDomesticStatus.element), this.templateDomesticStatus.getTimeOut());
    }
    public async loadConditionForACTtempViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateACTStatus.element), this.templateACTStatus.getTimeOut());
    }
    public async loadConditionForBulkTempViewPayge() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.bulkTransactionStatus.element), this.bulkTransactionStatus.getTimeOut());
    }
    public async loadConditionForReviewPage(){
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async deleteTemplate(templateName : string){
    await this.paymentMenu.click();
    await this.templateMenu.click();
    await this.loadCondition();
    await this.manageTemplateFilter.input(templateName);
    await this.selectTemCheckBox.jsClick();
    await this.templateNameLink.getText().then(text => {
        templateName = text.trim();
    });
    await this.deleteBtn.jsClick();
    await this.loadConditionForDeletePage();
    await this.preDeleteBtn.jsClick();  //preview delete
    await this.deleteDialogButton.click();
    await this.dismissButton.click();
    await this.loadCondition();
}
}
