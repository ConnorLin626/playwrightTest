/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, ensure, TextInput, OptionSelect, waitForUXLoading, IXHorizontalMenu, RadioButton} from '../../../lib';

@log export class PayrollPage extends Page {
    // Create Page
    @component('//*[@id="icon__payroll_payment"]') public payroll: Button;
    @component('//*[@id="icon__mgmt_payroll"]') public managePayroll: Button;
    @component('//*[@id="icon__mgmt_payroll_alternate"]') public managePayroll02: Button;
    @component('//*[@id="icon__payroll_payment_alternate"]') public payroll02: Button;
    @component('//*[@class="menu-item__icon icon icon__payroll_payment"]') public vnPayroll02: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//dbs-radio-group[@formcontrolname="transfer_priority_radio"]') public paymentPriorityType: RadioButton;
    @component('//multi-level-dropdown[@name="billerServiceID"]') public billerServiceID: OptionSelect;
    @component('//input[@name="payeeAmount"]') public amount: TextInput;
    @component('//input[@name="payeeParticulars"]') public payeeParticulars: TextInput;
    @component('//input[@name="payeeRef"]') public payeeRef: TextInput;
    @component('//input[@name="payeeNationalID"]') public payeeNationalID: TextInput;
    @component('//input[@name="payeeMandateDetail"]') public payeeMandateDetail: TextInput;
    @component("//*[@name='proxyTypeMobNumInput']") public fpsMobileNumber: TextInput;
    @component('//*[@name="hk-fps-detail" and @type="radio"]') public FPSPayeDetail: Button;
    @component('//input[@name="payeeStockCode"]') public payeeStockCode: TextInput;
    @component('//*[@id="temp-bulk-create-optDetail_0"]') public showoptionaldetails: Button;
    @component('//input[@name="payeePassbook"]') public payeePassbook: TextInput;
    @component('//input[@name="payeeFreeText4Sender"]') public payeeFreeText4Sender: TextInput;
    @component('//textarea[@name="payeeDetails"]') public paymentDetails: TextInput;
    @component('//input[@name="isBeneAdvising0"]') public isBeneAdvising: Button;
    @component("//input[@name='email-0']") public emailIdO: TextInput;
    @component("//input[@name='email-1']") public emailId1: TextInput;
    @component("//input[@name='email-2']") public emailId2: TextInput;
    @component("//input[@name='email-3']") public emailId3: TextInput;
    @component("//input[@name='email-4']") public emailId4: TextInput;
    @component("//*[@name='adviceContent']") public message: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component("//*[@name='approve']") public approveButton: Button;
    @component("//button[@class='btn btn__primary ng-star-inserted']") public acceptAndApproveButton: Button;
    @component("//*[@name='approve']") public approveSubmitBtn: Button;
    @component("//ng-component/div/div/div/div/div[1]/button[4]") public ApproveButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component('//button[@name="copy"]') public copyButton: Button;
    @component("//*[@id='approveNow']") public approveNowCheckBox: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component('//button[@name="get-challenge"]') public mchallengeText: TextInput;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component("//input[@name='saveAsTemplate']") public saveAsTemplateCheckbox: Button;
    @component("//*[@name='templateName']") public templateName: TextInput;
    @component('//button[@name="save-as-draft"]') public saveAsDraft: Button;
    @component('//bp-payee-amount//span[starts-with(@class, "dbs-validation-error")]') public amountErrorTip: TextInput;
    @component('//*[@id="delete_"]') public deletePayee: Button;
    @component('//*[@id="labelNewPayee-panel"]/dbs-radio-group/div/dbs-radio[2]/div/label/div') public NewFPSPayee: Button;
    @component('//*[@id="labelNewPayee-panel"]/div/bulk-new-fps-payee/div/section/div/div[1]/span[2]/dbs-radio-group/div/dbs-radio[3]/div/label') public HKFPSIDradio: Button;
    @component('//*[@name="proxyTypeFasterIDInput"]') public HKFPSIDValue: TextInput;

    // New Payee
    @component('//*[@id="ux-tab-labelNewPayee"]') public newPayee: Button;
    @component('//*[@id="ux-tab-labelExistingPayee"]') public existingPayeeTabIx: Button;
    @component('//*[@id="ux-tab-labelPayNow"]') public newPayeeWitoutPaynow: Button;
    @component('//*[@id="savePayNow"]') public savePayNow: Button;
    @component("//*[@class='dbs-validation-error ng-star-inserted']") public nicknameMsg: TextInput;
    @component("//div/ng-component/div/dbs-top-panel/div/div[2]/ul/li/span") public nicknameMsgTop: TextInput;
    @component('//*[@name="new-payee-payeeName"]') public newPayeeName: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//input[@name="newPayNowNickName"]') public newPayNowNickName: TextInput;
    @component('//*[@name="new-payee-accountNumber"]') public newPayeeAcctNo: TextInput;
    @component('//button[@name="Retrieve"]') public retriveButton: Button;
    @component('//*[@name="add-payee"]') public newPayeeButton: Button;
    @component('//*[@id="bulk-newPayee-bankId"]') public payeeBankID: TextInput;
    @component('//*[@class="search-result-container"]') public payeeBankResult: Button;
    @component('//div[starts-with(@class, "manual clearfix")]') public enterDetailButton: Button;
    @component('//input[@name="bp-swift-select-bsbCode"]') public bsbCodeText: TextInput;

    //ExiSting payee
    @component('//*[@id="labelExistingPayee_0"]') public existingPayeeTab: Button;
    @component('//input[@id="payee-selector"]') public filterExistingPayee: TextInput;
    @component('//button[@name="add"]') public addpayee: Button;

    // Reject Page
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component("//*[@id='bulk-view-rejectStatus_0']") public rejectStatus: TextInput;

    // Edit Page
    @component('//*[@id="bulk-view-edit"]') public editButton: Button;
    @component("//input[@name='batch-id']") public batchId: TextInput;

    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // View payroll Template Page
    @component('//*[@id="bulk-viewTemp-name"]') public viewTemplateName: TextInput;
    @component('//*[@id="bulk-viewTemp-status"]') public viewTemplateStatus: TextInput;
    @component('//*[@id="bulk-viewTemp-accountNum"]') public viewTemplateFromAccount: TextInput;
    @component('//*[@id="bulk-view-amount_0"]') public viewTemplateAmount: TextInput;
    @component('//*[@id="bulk-view-name_0"]') public viewTemplatePayeeNameValue: TextInput;

    // View payroll Payment Page
    @component('//*[@id="bulk-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="bulk-view-accountNum"]') public fromAccountView: TextInput;
    @component('//*[@id="bulk-view-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="bulk-view-paymentType"]') public paymentType: TextInput;

    @component('//dbs-bp-view-summary-section/div[5]/span[2]/span[2]') public paymentTypeC3: TextInput;
    @component('//*[@id="bulk-view-paymentAmount"]') public amountView: TextInput;
    @component('//*[@id="bulk-view-bankChargeType"]') public bankChargeView: TextInput;
    @component('//*[@id="bulk-view-charge-account"]') public chargeAccountView: TextInput;
    @component('//*[@id="bulk-view-paymentDate"]') public paymentDate: TextInput;
    @component('//*[@id="viewReference"]') public referenceValue: TextInput;
    @component('//*[@id="bulk-view-batchId"]') public batchIDValue: TextInput;
    @component('//*[@id="bulk-view-billerServiceID"]') public billerServiceIDValue: TextInput;
    @component('//*[@class="summary-panel step2-panel-triangle"]') public paymentSummaryValue: TextInput;

    @component('//div[@id="bulk-view-status_0"]') public transactionStatusValue: TextInput;
    @component('//div[@id="bulk-view-status_1"]') public transactionStatusValue2: TextInput;
    @component('//*[@id="bulk-view-name_0"]') public payeeNameValue: TextInput;
    @component('//*[@id="bulk-view-name_1"]') public payeeNameValue2: TextInput;
    @component('//*[@id="bulk-view-nickName_0"]') public payeeNickNameValue: TextInput;
    @component('//*[@id="bulk-view-payeeBankName_0"]') public bankNameValue: TextInput;
    @component('//*[@id="bulk-view-payeeBankName_1"]') public bankNameValue2: TextInput;
    @component('//*[@id="bulk-view-payeeBranchName_0"]') public branchNameValue: TextInput;
    @component('//*[@id="bulk-view-bankDetailsMsgDisplay_0"]') public bankSwiftBicValue: TextInput;
    @component('//*[@id="bulk-view-bankDetailsMsgDisplay_1"]') public bankSwiftBicValue2: TextInput;
    @component('//dbs-view-transfer-list/div/div[1]/div[1]/div[3]/div[2]/strong[2]') public nationalIDValue: TextInput;
    @component('//*[@id="bulk-view-mandateDetail_0"]') public mandateDetailsView: TextInput;
    @component('//*[@id="bulk-view-stockCode_0"]') public stockCodeView: TextInput;
    @component('//*[@id="bulk-view-payeeBankDetManual_0"]') public payeeBankMaual: TextInput;
    @component('//*[@id="bulk-view-payeeBankDetManual_1"]') public payeeBankMaual2: TextInput;

    @component('//*[@id="bulk-view-acctNum_0"]') public accountNumberValue: TextInput;
    @component('//*[@id="bulk-view-acctNum_1"]') public accountNumberValue2: TextInput;
    @component('//*[@id="bulk-view-filter"]') public viewPayrollFilter: TextInput;
    @component('//*[@id="bulk-view-amount_0"]') public amountFirst: TextInput;
    @component('//*[@id="bulk-view-amount_1"]') public amount2: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="transaction-code-label"]') public TransactionCodeValue: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="transaction-code-label"]') public TransactionCodeValue2: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="purpose-code-label"]') public purposeCodeValue: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="purpose-code-label"]') public purposeCodeValue2: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="reference-for-payee"]') public referenceForPayeeValue: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="reference-for-payee"]') public referenceForPayeeValue2: TextInput;
    @component('//dbs-view-transfer-list[1]/div/div[1]/div[2]/div[4]/div[2]/strong') public particularsValue: TextInput;
    @component('//dbs-view-transfer-list[2]/div/div[1]/div[2]/div[4]/div[2]/strong') public particularsValue2: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_0"]') public showOptionView: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_1"]') public showOptionView2: TextInput;
    @component('//*[@id="bulk-view-paymentDetails_0"]') public paymentDetailValue: TextInput;
    @component('//*[@id="bulk-view-paymentDetails_1"]') public paymentDetailValue2: TextInput;
    @component('//*[@id="bulk-view-message_0"]') public messageValue: TextInput;
    @component('//*[@id="bulk-view-message_1"]') public messageValue2: TextInput;
    @component('//*[@id="bulk-view-email_0"]') public emailListValue: TextInput;
    @component('//*[@id="bulk-view-email_1"]') public emailListValue2: TextInput;
    @component('//*[@id="bulk-view-passBook_0"]') public passBookValue: TextInput;
    @component('//*[@id="bulk-view-freeText_0"]') public freeTextValue: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;

    @component('//button[@name="view-verify-release"]') public viewVerifyReleaseBtn: Button;
    @component('//button[@name="verify-release"]') public verifyReleaseConfirmButton: Button;
    @component('//span[@id="bulk-view-name_0"]') public toNewPayeeValue: TextInput;

    @component('//*[@id="paynow-proxy-nf-0"]/span[3]') public ViewEmail: TextInput;
    @component('//*[@id="paynow-proxy-nf-0"]/span[3]') public ViewHKFPSID: TextInput;
    @component('//*[@id="paynow-proxy-mobNum-0"]/span[3]') public ViewHMobile: TextInput;

    //old payment date component common by Ethan
    //@component('//ng-component/div/div/bulk-view-section/div/bp-view-summary-section/div[7]/span[2]') public paymentDate: TextInput;
    //@component('//*[@id="domestic-view-paymentDate"]') public paymentDate: TextInput;

    // create from template
    @component('//multi-level-dropdown[@formcontrolname="payeePurposeCode"]') public TemplatePurposeCodeValue: TextInput;
    @component('//multi-level-dropdown[@formcontrolname="transactionCode"]') public TemplatetransactionCodeValue: TextInput;


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

    // SAM>RTGS schedule cut off time link
    @component('//a[contains(@href,"/csr/common/schedule/bom") and text()="Indonesia Payroll"]') public IDPayrollScheduleLink: Button;
    // @component('//datatable-scroller/datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/label') public checkBox: Button;
    // @component('//md-dialog-container/cdk-focus-trap/div[2]/confirm-dialog/div/top-panel/div/div[2]/ul/li/span') public paymentDateMsg: TextInput;
    @component('//*[@name="search"]') public serachButton: Button;
    // @component('//datatable-row-wrapper/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/p[1]') public paymentDateAdjust: TextInput;
    @component('//a[contains(@href,"/csr/common/schedule/bom/procSchdApprove") and text()="Pending Modify Approval"]') public approveScheduleLink: Button;

    
    @component('//*[@class="load-more-button"]') public exportCSV: Button;

    @component('//*[@id="beware"]') public beware: Button;
    @component('//*[@name="confirm"]') public confirm: Button;

    
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
        await browser.wait(ExpectedConditions.elementToBeClickable(this.amountView.element), this.amountView.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.hashValue.element), this.hashValue.getTimeOut());
        await browser.sleep(3000)
    }

    public async loadConditionForViewTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTemplateStatus.element), this.viewTemplateStatus.getTimeOut());
    }

    public async loadConditionForApprovePaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
    }
    public async loadConditionForDismissDialog() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }

    public async loadConditionCreatePaymentTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.TemplatePurposeCodeValue.element), this.TemplatePurposeCodeValue.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionCreateTWPaymentTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.TemplatetransactionCodeValue.element), this.TemplatetransactionCodeValue.getTimeOut());
        await waitForUXLoading();
    }

    public async addExistingPayee(testDate: string): Promise<void> {
        await this.filterExistingPayee.input(testDate);
        await this.addpayee.jsClick();
    }

    public async loadConditionForViewPagination() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showOptionalButton.element), this.showOptionalButton.getTimeOut());
    }

    public async switchBulkViewTab(_element: Button, text: string) {
        await this.loadConditionForViewPagination();
        await _element.clickIfExist();
        await Promise.all([
            await ensure(this.viewLoadedLabel).isVisible(),
            await ensure(this.viewLoadedLabel).textContains(text),
            await ensure(this.viewLoadMoreButton).isVisible(),
        ]);
    }
    public async checkPaginationForShowAllTab() {
        await this.viewShowAllTab.clickIfExist();
        await Promise.all([
            await this.viewLoadedLabel.ElementExist() === false,
            await ensure(this.viewPreTenButton).isVisible(),
            await ensure(this.viewPreHundredButton).isVisible(),
            await ensure(this.viewPaginationButton).isVisible(),
            await this.viewPaginationButton.clickIfExist(),
            await this.viewPreHundredButton.clickIfExist(),
        ]);
    }
    public async checkPaginationForRejectTab() {
        await this.viewRejectedTab.clickIfExist();
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
