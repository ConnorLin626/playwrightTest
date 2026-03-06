/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions} from 'protractor';
import {
    Page,
    component, log,
    Button,
    TextInput,
    OptionSelect,
    waitForUXLoading,
    ensure,
    RadioButton,
    IXHorizontalMenu
} from "../../../lib";

@log export class BulkPaymentPage extends Page {
    //  Create Page
    @component('//dbs-toolbar/div/div[2]/p-horizontal-navigation/div/ul[2]/li[2]') public MenuRadio: Button;
    @component('//*[@id="icon__bulk_payment"]') public bulkPayment: Button;
    @component('//p-auto-complete[@id="debitType"]') public debitTypeSelect: Button;
    @component('//span[@id="options-type-bulk.labelConsolidatedDebit"]') public ConsolidatedDebit: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//multi-level-dropdown[@name="billerServiceID"]') public billerServiceID: OptionSelect;
    @component('//dbs-radio-group[@formcontrolname="bankCharge"]') public bankCharge: RadioButton;
    @component('//input[@name="payeeAmount"]') public amount: TextInput;
    @component('//input[@name="payeeRef"]') public payeeRef: TextInput;
    @component('//input[@name="payeeParticulars"]') public payeeParticulars: TextInput;
    @component('//textarea[@name="payeeDetails"]') public paymentDetails: TextInput;
    @component('//*[@name="payeeFreeText4Sender"]') public payeeFreeText4Sender: TextInput;
    @component('//input[@name="isBeneAdvising0"]') public isBeneAdvising: Button;
    @component("//input[@name='email-0']") public emailIdO: TextInput;
    @component("//input[@name='email-1']") public emailId1: TextInput;
    @component("//input[@name='email-2']") public emailId2: TextInput;
    @component("//input[@name='email-3']") public emailId3: TextInput;
    @component("//input[@name='email-4']") public emailId4: TextInput;
    @component("//textarea[@name='adviceContent']") public message: TextInput;
    @component('//*[@id="labelExistingPayee_0"]') public existingPayeeTab: Button;
    @component('//input[@name="payee-selector"]') public filterExistingPayee: TextInput;
    @component('//button[@name="addPayee"]') public addpayee: Button;
    @component('//button[@name="add"]') public addButton: Button;
    //@component('//li[@id="labelPayNow_1"]') public newPayNow: Button;
    @component('//*[@id="ux-tab-labelPayNow"]') public newPayNow: Button;
    @component('//*[@id="ux-tab-labelExistingPayee"]') public existingPayeeTabIx: Button;
    @component('//*[@id="ux-tab-labelNewPayee"]') public newPayee: Button;
    @component('//*[@name="hk-fps-detail"]') public NewFPSPayee: Button;
    @component('//*[@name="proxyTypeMobNumInput"]') public MobileValue: TextInput;
    @component('//*[@id="labelNewPayee-panel"]/div/bulk-new-fps-payee/div/section/div/div[1]/span[2]/dbs-radio-group/div/dbs-radio[3]/div/label') public HKFPSIDradio: Button;
    @component('//*[@name="proxyTypeFasterIDInput"]') public HKFPSIDValue: TextInput;
    @component('/html/body/dbs-root/ng-component/div/div[3]/ng-component/div/ng-component/div/div/div/form/create-step-2/div/tabs-component/ul/li[2]') public newPayeeWitoutPaynow: Button;
    @component('//div[@id="swift-selector-element"]') public payeeBankIDS: OptionSelect;
    @component('//*[@id="bulk-newPayee-bankId"]') public payeeBankID: TextInput;
    @component('//*[@id="new-payee-bank-id-button"]') public findBankID: Button;
    @component('//bulk-bank-finder/div/div/span[2]/table/tr/td/label/div[1]') public payeeBankResultList: Button;
    @component('//*[@class="search-result-container"]') public payeeBankResult: Button;
    @component('//div[starts-with(@class, "manual clearfix")]') public enterDetailButton: Button;
    @component('//input[@name="bp-swift-select-bsbCode"]') public bsbCodeText: TextInput;
    @component('//input[@name="proxyTypeMobNumInput"]') public proxyTypeMobNum: TextInput;
    @component('//dbs-typeahead-window/div/div[1]/span') public payeeBankIDSelected: TextInput;
    @component('//input[@name="new-payee-payeeName"]') public newPayeeName: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//input[@name="newPayNowNickName"]') public newPaynowNickname: TextInput;
    @component('//input[@name="new-payee-add1"]') public payeeAddress1: TextInput;
    @component('//input[@name="new-payee-accountNumber"]') public newPayeeAcctNo: TextInput;
    @component('//button[@name="add-payee"]') public newPayeeButton: Button;
    @component('//div[@id="temp-bulk-create-optDetail_0"]') public showoptionaldetailsPayee1: Button;
    @component("//input[@id='approveNow']") public approveNowCheckBox: Button;
    @component("//*[@class='push-option-label']") public pushOpion: Button;
    @component("//input[@name='batch-id']") public batchId: TextInput;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component("//*[@name='saveAsTemplate']") public saveAsTemplateCheckbox: Button;
    @component("//*[@name='templateName']") public templateName: TextInput;
    @component('//button[@name="save-as-draft"]') public saveAsDraft: Button;
    @component('//*[@id="bulk-view-edit"]') public editButton: Button;
    @component('//button[@name="copy"]') public copyButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//button[@id='push-btn']") public pushButton: Button;
    @component('//bp-payee-amount//span[starts-with(@class, "dbs-validation-error")]') public amountErrorTip: TextInput;
    @component('//*[@id="delete_"]') public deletePayee: Button;
    @component('//span[@class="ui-autocomplete-list-item-label ng-star-inserted"]') public debitType: OptionSelect;//看看是用的什么来做选项,判断debitType是Consolidated Debit(默认)，还是Itemized Debit.
    @component('//dbs-radio-group[@formcontrolname="transfer_priority_radio"]') public paymentPriorityType: RadioButton;
    //@component('//dbs-input[@formcontrolname="payeeNationalID"]') public payeeNationalID: TextInput;
    @component('//input[@name="payeeNationalID"]') public payeeNationalID: TextInput;
    @component('//input[@name="payeeMandateDetail"]') public payeeMandateDetail: TextInput;
    @component('//input[@name="payeeStockCode"]') public payeeStockCode: TextInput;
    @component('//input[@name="payeePassbook"]') public payeePassbook: TextInput;
    @component('//p-auto-complete[@formcontrolname="debitType"]') public DebitType: OptionSelect;
    @component('//*[@id="options-type-bulk.labelItemizedDebit"]') public ItemDebitType: OptionSelect;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public selectFromAccount: Button;
    @component('//span[@class="input form-padding"]') public payCharges: Button;
    @component('//multi-level-dropdown[@formcontrolname="billerServiceID"]') public serviceID: Button;
    @component('//input[@name="payeeMandateDetail"]') public mandateDetail: Button;
    @component('//input[@name="payeeStockCode"]') public stockCode: Button;
    @component('//input[@id="savePayee"]') public savePayee: Button;
    @component("//ng-component/div/ng-component/div/dbs-top-panel/div/div[2]/ul/li/span") public nicknameMsg: TextInput;

    // Delete 
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//p[@id="labelNoInformationDisplay"]') public transactionResult: TextInput;
    // Reject
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    //@component("//dbs-reject-dialog/div//div[3]/div/button[@name='reject']") public rejectDialogButton: Button;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component("//strong[@id='bulk-view-rejectStatus_0']") public rejectStatus: TextInput;
    //for file upload payment
    @component("//button[@class='btn btn__secondary medium bg-white text-red-500 border-red-500 ng-star-inserted']") public rejectButton4: Button; 
    @component("//strong[@id='bulk-view-rejectStatus_1']") public rejectStatus2: TextInput;
    @component("//strong[@id='bulk-view-rejectStatus_2']") public rejectStatus3: TextInput;
    // View Page
    @component('//*[@id="bulk-view-hashValue"]') public hashValue: TextInput;
    @component('//span[@id="bulk-view-accountNum"]') public fromAccountView: TextInput;
    @component('//*[@id="bulk-view-acctBalance"]') public balanceValue: TextInput; 
    @component('//span[@id="bulk-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//dbs-bp-view-summary-section/div[5]/span[2]/span[2]') public paymentTypeC3Value: TextInput;
    @component('//*[@id="bulk-view-paymentAmount"]') public deductAmountView: TextInput;
    @component('//*[@id="bulk-view-bankChargeType"]') public bankChargeView: TextInput;
    @component('//*[@id="bulk-view-charge-account"]') public chargeAccountView: TextInput;
    @component('//span[@id="bulk-view-debitType-template"]') public DebitTypeValue: TextInput;
    @component('//*[@id="bulk-view-paymentDate"]') public paymentDateView: TextInput;
    @component('//label[@id="bulk-view-cutOffTime"]') public cutOffTimeView: TextInput;
    @component('//*[@id="viewReference"]') public referenceValue: TextInput;
    @component('//*[@id="bulk-view-batchId"]') public batchIDValue: TextInput;
    @component('//*[@id="bulk-view-billerServiceID"]') public billerServiceIDValue: TextInput;
    @component('//dbs-view-transfer-list[1]/div/div[1]/div[1]/div[2]/div[3]') public transactionBankCode0: TextInput;
    @component('//dbs-view-transfer-list[2]/div/div[1]/div[1]/div[2]/div[3]') public transactionBankCode1: TextInput;
    @component('//dbs-bulk-view-section/div/dbs-bp-view-summary-section') public chargeAccount: TextInput;
    @component('//*[@class="summary-panel step2-panel-triangle"]') public paymentSummaryValue: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    @component('//*[@id="view-bulk-totalAmount"]') public totalAmountValue: TextInput;
    @component("//*[@class='account-detail ng-star-inserted']") public payeeAccountDetail: TextInput;

    
    // payee 1
    @component('//*[@id="bulk-view-name_0"]') public payeeNameValue: TextInput;
    @component('//*[@id="bulk-view-nickName_0"]') public payeeNickNameValue: TextInput;
    @component('//*[@id="bulk-view-payeeBankName_0"]') public payeeBankName: TextInput;
    @component('//*[@id="bulk-view-payeeBranchName_0"]') public payeeBrchBankName: TextInput;
    @component('//*[@id="bulk-view-bankDetailsMsgDisplay_0"]') public payeeBankSwiftBic: TextInput;
    @component('//*[@id="bulk-view-payeeBankDetManual_0"]') public payeeBankMaual: TextInput;
    @component('//*[@id="bulk-view-acctNum_0"]') public accountNumberValue: TextInput;
    @component('//*[@id="bulk-view-ddaRef_0"]') public DDARefValue0: TextInput;
    @component('//dbs-view-transfer-list/div/div[1]/div[1]/div[3]/div[2]/strong[2]') public nationalIDValue: TextInput;
    @component('//dbs-view-transfer-list[1]/div/div[1]/div[1]/div[3]/div[2]/strong[2]') public nationalIDValue0: TextInput;
    @component('//*[@id="bulk-view-status_0"]') public transactionStatusValue: TextInput;
    @component('//*[@id="bulk-view-pendingStatus_0"]') public PayeeStatusValue: TextInput;
    @component('//*[@id="bulk-view-amount_0"]') public amountView: TextInput;
    @component('//*[@id="bulk-view-mandateDetail_0"]') public mandateDetailsView: TextInput;
    @component('//*[@id="bulk-view-stockCode_0"]') public stockCodeView: TextInput;
    @component('//*[@id="bulk-view-nationalId_0"]') public nationalId_0: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="transaction-code-label"]') public TransactionCodeValue: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="purpose-code-label"]') public purposeCodeValue: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="reference-for-payee"]') public referenceForPayeeValue: TextInput;
    @component('//*[@id="extra-reference-for-payee"]') public refForPayeeValueIBG: TextInput;
    @component('//*[@id="bulk-view-particular_0"]') public ParticularsValue: TextInput;
    @component('//*[@id="bulk-view-passBook_0"]') public passBookView: TextInput;
    @component('//*[@id="bulk-view-freeText_0"]') public freeTextView: TextInput;
    @component('//*[@id="bulk-view-paymentDetails_0"]') public paymentDetailValue: TextInput;
    @component('//*[@id="bulk-view-message_0"]') public messageValue: TextInput;
    @component('//*[@id="bulk-view-email_0"]') public emailListValue: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_0"]') public showOptionView: Button;
    @component('//*[@id="paynow-proxy-nf-0"]/span[3]') public ViewHKFPSID: TextInput;
    @component('//*[@id="paynow-proxy-mobNum-0"]/span[3]') public ViewHMobile: TextInput;
    @component('//div[@id="paynow-proxy-mobNum-0"]') public payNowMobNum: TextInput;

    // payee 2
    @component('//*[@id="bulk-view-name_1"]') public payeeNameValueA2: TextInput;
    @component('//*[@id="bulk-view-nickName_1"]') public payeeNickNameValue2: TextInput;
    @component('//*[@id="bulk-view-payeeBankName_1"]')  public payeeBankName2: TextInput;
    @component('//*[@id="bulk-view-bankDetailsMsgDisplay_1"]') public payeeBankSwiftBic2: TextInput;
    @component('//*[@id="bulk-view-payeeBankDetManual_1"]') public payeeBankMaua2: TextInput;
    @component('//*[@id="bulk-view-acctNum_1"]') public accountNumberValue2: TextInput;
    @component('//*[@id="bulk-view-ddaRef_1"]') public DDARefValue2: TextInput;
    @component('//dbs-view-transfer-list[2]/div/div[1]/div[1]/div[3]/div[2]/strong[2]') public nationalIDValue2: TextInput;
    @component('//*[@id="bulk-view-status_1"]') public transactionStatusValue2: TextInput;
    @component('//*[@id="bulk-view-pendingStatus_1"]') public PayeeStatusValue2: TextInput;
    @component('//*[@id="bulk-view-amount_1"]') public amountViewA2: TextInput;
    @component('//*[@id="bulk-view-mandateDetail_1"]') public mandateDetailsView2: TextInput;
    @component('//*[@id="bulk-view-stockCode_1"]') public stockCodeView2: TextInput;
    @component('//*[@id="bulk-view-passBook_1"]') public passBookView2: TextInput;
    @component('//*[@id="bulk-view-freeText_1"]') public freeTextView2: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="transaction-code-label"]') public TransactionCodeValue2: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="purpose-code-label"]') public purposeCodeValue2: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="reference-for-payee"]') public referenceForPayeeValue2: TextInput;
    @component('//*[@id="bulk-view-particular_1"]') public ParticularsValue2: TextInput;
    @component('//*[@id="bulk-view-paymentDetails_1"]') public paymentDetailValue2: TextInput;
    @component('//*[@id="bulk-view-message_1"]') public messageValue2: TextInput;
    @component('//*[@id="bulk-view-email_1"]') public emailListValue2: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_1"]') public showOptionView2: Button;

    // Payee 3
    @component('//*[@id="bulk-view-name_2"]') public payeeNameValueA3: TextInput;
    @component('//*[@id="bulk-view-acctNum_2"]') public accountNumberValue3: TextInput;
    @component('//*[@id="bulk-view-payeeBankDetManual_2"]') public payeeBankMaual3: TextInput;
    @component('//*[@id="bulk-view-ddaRef_2"]') public DDARefValue3: TextInput;
    @component('//dbs-view-transfer-list[3]/div/div[1]/div[1]/div[3]/div[2]/strong[2]') public nationalIDValue3: TextInput;
    @component('//*[@id="bulk-view-status_2"]') public transactionStatusValue3: TextInput;
    @component('//*[@id="bulk-view-pendingStatus_2"]') public PayeeStatusValue3: TextInput;
    @component('//*[@id="bulk-view-amount_2"]') public amountViewA3: TextInput;
    @component('//dbs-view-transfer-list[3]//*[@id="reference-for-payee"]') public referenceForPayeeValue3: TextInput;
    @component('//*[@id="bulk-view-mandateDetail_2"]') public mandateDetailsView3: TextInput;
    @component('//*[@id="bulk-view-stockCode_2"]') public stockCodeView3: TextInput;
    @component('//*[@id="bulk-view-passBook_2"]') public passBookView3: TextInput;
    @component('//*[@id="bulk-view-freeText_2"]') public freeTextView3: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_2"]') public showOptionView3: Button;
  
    // Payee 4
    @component('//*[@id="bulk-view-acctNum_3"]') public accountNumberValue4: TextInput;
    @component('//*[@id="bulk-view-payeeBankDetManual_3"]') public payeeBankMaual4: TextInput;
    @component('//*[@id="bulk-view-ddaRef_3"]') public DDARefValue4: TextInput;
    @component('//dbs-view-transfer-list[4]/div/div[1]/div[1]/div[3]/div[2]/strong[2]') public nationalIDValue4: TextInput;
    @component('//*[@id="bulk-view-status_3"]') public transactionStatusValue4: TextInput;
    @component('//*[@id="bulk-view-amount_3"]') public amountViewA4: TextInput;
    @component('//*[@id="bulk-view-mandateDetail_3"]') public mandateDetailsView4: TextInput;
    @component('//*[@id="bulk-view-stockCode_3"]') public stockCodeView4: TextInput;
    @component('//*[@id="bulk-view-passBook_3"]') public passBookView4: TextInput;
    @component('//*[@id="bulk-view-freeText_3"]') public freeTextView4: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_3"]') public showOptionView4: Button;
    
    // view page for 4333 issue
    //tab
    @component('//a[@id="ux-tab-1"]') public viewShowAllTab: Button;
    @component('//a[@id="ux-tab-2"]') public viewPendingTab: Button;
    @component('//a[@id="ux-tab-3"]') public viewRejectedTab: Button;
    @component('//a[@id="ux-tab-4"]') public viewCompletedTab: Button;

    @component('//label[@id="view-bulk-loaded"]') public viewLoadedLabel: TextInput;
    @component('//label[@id="bulk-loaded-more"]') public viewLoadMoreButton: Button;
    @component('//button[@name="view-up-to-0"] ') public viewPreTenButton: Button;
    @component('//button[@name="view-up-to-1"] ') public viewPreHundredButton: Button;
    @component('//*[@id="pagination-1"]') public viewPaginationButton: Button;
    @component('//span[@id="radio-label-0"]') public viewRejectedTabRadio: TextInput;
    @component('//span[@id="view-bulk-totalItem"]') public viewBulkTotalItem: TextInput;
    @component('//span[@id="show-optional-details-0"]') public showOptionalButton: Button;

    // View Bulk Payment Template Page
    @component('//span[@id="bulk-viewTemp-name"]') public viewTemplateName: TextInput;
    @component('//span[@id="bulk-viewTemp-accountNum"]') public viewTemplateFromAccount: TextInput;
    @component('//strong[@id="bulk-view-amount_0"]') public viewTemplateAmount: TextInput;
    @component('//span[@id="bulk-viewTemp-status"]') public viewTemplateStatus: TextInput;
    @component("//button[@name='Approve']") public confirmApproveButton: Button;
    @component('//filter-component/dbs-view-transfer-list/div/div[1]/div[2]/div[2]/div[2]/strong') public ViewMandatedetails: TextInput;
    @component('//filter-component/dbs-view-transfer-list/div/div[1]/div[2]/div[3]/div[2]/strong') public ViewstockCode: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_0"]') public ViewShowOptionalDetails: Button;
    @component('//filter-component/dbs-view-transfer-list/div/div[2]/div/div/div[1]/div') public ViewPassbook: TextInput;

    // create from template
    @component('//multi-level-dropdown[@formcontrolname="payeePurposeCode"]') public TemplatePurposeCodeValue: TextInput;

    // select type button
    @component('//input[@id="sgb_today_day"]') public todayDayButton: Button;
    @component('//input[@id="sgb_set_date"]') public customDayButton: Button;
    @component('//input[@id="exp_type"]') public expressTypeButton: Button;
    @component('//input[@id="fast_type"]') public fastTypeButton: Button;
    @component('//input[@id="giro_Type"]') public giroTypeButton: Button;

    //CN IBPS Bulk
    @component('//*[@value="cnbibps"]') public IBPSBulkRadioBtn: Button;
    @component('//*[@id="bulk-view-cutOffTime"]') public cutofftime: TextInput;
    @component('//*[@id="bulkTemplate-CN"]') public bulkTemplateBtn: Button;

    // TW eACH Bulk Payment
    @component('//*[@id="bulkTemplate-TW"]') public TWBulkTemplateBtn: Button;

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
        await browser.wait(ExpectedConditions.elementToBeClickable(this.hashValue.element), this.hashValue.getTimeOut());
        await browser.sleep(2000);
    }

    public async loadConditionForApprovePaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
    }

    public async loadConditionForDismissDialog() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }
    public async loadConditionForDismissDeleteDialog(){
        await waitForUXLoading();
        await browser.sleep(10000)
        await browser.wait(ExpectedConditions.visibilityOf(this.dismissButton.element), this.dismissButton.getTimeOut());
    }
    public async loadConditionForDismissRejectDialog(){
        await waitForUXLoading();
        await browser.sleep(10000)
        await browser.wait(ExpectedConditions.visibilityOf(this.dismissButton.element), this.dismissButton.getTimeOut());
    }

    public async loadConditionForViewPagination() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showOptionalButton.element), this.showOptionalButton.getTimeOut());
    }

    public async loadConditionForViewTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTemplateStatus.element), this.viewTemplateStatus.getTimeOut());
    }

    public async loadConditionCreatePayemntTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.TemplatePurposeCodeValue.element), this.TemplatePurposeCodeValue.getTimeOut());
        await waitForUXLoading();
    }


    public async loadConditionforApprovalSection() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.challengeResponse.element), this.challengeResponse.getTimeOut());
        await browser.sleep(5000);// when push approval, before click need to wail the response
    }


    public async addExistingPayee(testDate: string): Promise<void> {
        await this.filterExistingPayee.input(testDate);
        await this.addButton.jsClick();
    }

    public async switchBulkViewTab(_element: Button) {
        await this.loadConditionForViewPagination();
        await _element.clickIfExist();
        await Promise.all([
            await this.viewLoadedLabel.ElementExist() === false,
        ]);
    }

    public async checkPaginationForShowAllTab() {
        await this.viewShowAllTab.clickIfExist();
        await Promise.all([
            await ensure(this.viewPreTenButton).isVisible(),
            await ensure(this.viewPreHundredButton).isVisible(),
            await ensure(this.viewPaginationButton).isVisible(),
            await this.viewPaginationButton.clickIfExist(),
            await this.viewPreHundredButton.clickIfExist(),
        ]);
    }

    public async checkPaginationForRejectTab() {
        await this.viewRejectedTab.jsClickIfExist();
        let num = 0;
        await this.viewRejectedTabRadio.getText().then(text => {
            num = parseInt(text.replace(/[^0-9]/ig, ""));
        });
        if (num > 10) {
            await Promise.all([
                await ensure(this.viewPreTenButton).isVisible(),
                await ensure(this.viewPreHundredButton).isVisible(),
                await ensure(this.viewPaginationButton).isVisible(),
            ]);
        } else {
            await Promise.all([
                await this.viewPreTenButton.ElementExist() === false,
                // await this.viewPreHundredButton.ElementExist() === false,
                // await this.viewPaginationButton.ElementExist() === false,
            ]);
        }
    }
}
