/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, ensure, RadioButton } from '../../../lib';

@log export class BulkCollectionPage extends Page {
    //Create page
    @component('//*[@id="icon__initiate_bulk_collection"]') public bulkCollection: Button;
    @component('//*[@class="page-point ng-star-inserted"]') public nextTab: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//*[@id="ux-tab-labelNewPayer"]') public newPayerTab: Button;
    @component('//p-auto-complete[@formcontrolname="debitType"]') public DebitType: OptionSelect;
    @component('//*[@id="options-type-bulk.labelItemizedCredit"]') public DebitTypeValue: OptionSelect;
    @component('//*[@id="options-type-bulk.labelConsolidatedCredit"]') public ConsolidateCreditValue: OptionSelect;
  
    @component('//input[@name="new-payee-payeeName"]') public newPayeeName: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//*[@id="bulk-newPayee-bankId"]') public payerBankID: TextInput;
    @component('//*[@class="search-result-container"]') public payerBankResult: Button;
    @component('//input[@name="new-payee-accountNumber"]') public newPayerAccountNum: TextInput;
    @component('//input[@name="new-payee-dda"]') public DDARef: TextInput;
    @component('//button[@name="add-payee"]') public addPayer: Button;
    @component('//input[@name="payeeAmount"]') public amount: TextInput;
    @component('//multi-level-dropdown[@name="billerServiceID"]') public billerServiceID: OptionSelect;
    @component('//input[@name="payeeNationalID"]') public payeeNationalID: TextInput;
    @component('//input[@name="payeeMandateDetail"]') public payeeMandateDetail: TextInput;
    @component('//input[@name="payeePassbook"]') public payeePassbook: TextInput;
    @component('//input[@name="payeeStockCode"]') public payeeStockCode: TextInput;
    @component('//div[@id="temp-bulk-create-optDetail_0"]') public showOptionDetailPayee1: Button;
    @component('//textarea[@name="payeeDetails"]') public collectionDetails: TextInput;
    @component('//input[@name="payeeFreeText4Sender"]') public payeeFreeText4Sender: TextInput;
    @component('//*[@name="payeeRef"]') public payeeRef: TextInput;
    @component('//input[@name="isBeneAdvising0"]') public msgToPayer: Button;
    @component("//email-fax/div/div/div[2]/div/tabs-component/ul/li[2]") public faxTab: Button;
    @component('//*[@formcontrolname="ctryCode"]') public faxCtryCode0: OptionSelect;
    @component("//input[@name='fax-0']") public faxAreaCode0: TextInput;
    @component('//input[@name="faxNo-0"]') public faxNo0: TextInput;
    @component('//textarea[@name="adviceContent"]') public msg: TextInput;
    @component("//input[@name='email-0']") public emailIdO: TextInput;
    @component("//input[@name='email-1']") public emailId1: TextInput;
    @component("//input[@name='email-2']") public emailId2: TextInput;
    @component("//input[@name='email-3']") public emailId3: TextInput;
    @component("//input[@name='email-4']") public emailId4: TextInput;
    @component("//*[@name='add']") public addButton: Button;
    @component('//input[@name="payee-selector"]') public filterExistingPayee: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component("//button[@name='finish']") public finishButton: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component("//*[@name='approveNow']") public approveNowCheckBox: Button;
    @component("//*[@name='get-challenge']") public getChallengeButton: Button;
    @component('//*[@name="batch-id"]') public batchID: TextInput;
    @component("//*[@name='saveAsTemplate']") public saveAsTemplate: Button;
    @component('//*[@name="templateName"]') public templateName: TextInput;
    @component('//*[@name="save-as-draft"]') public saveAsDraft: Button;
    @component('//bp-payee-amount//span[starts-with(@class, "dbs-validation-error")]') public amountErrorTip: TextInput;
    @component("//*[@id='ux-tab-labelExistingPayee']") public existingPayerTab: Button;
    @component('//*[@name="new-payee-mandate-id"]') public mandateID: TextInput;
    @component('//*[@formcontrolname="transactionCode"]') public transactionCode: OptionSelect;
    @component('//*[@formcontrolname="payeePurposeCode"]') public purposeOfPayment: OptionSelect;
    @component('//*[@name="payeeParticulars"]') public particular: TextInput;
    @component("//*[@class='push-option-label']") public pushOpion: Button;
    @component('//button[@name="view-verify-release"]') public viewVerifyReleaseBtn: Button;
    @component('//button[@name="verify-release"]') public verifyReleaseConfirmButton: Button;
    @component("//button[@class='btn btn__primary ng-star-inserted']") public acceptAndApproveButton: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public selectFromAccount: Button;
    @component('//dbs-radio-group[@formcontrolname="bankCharge"]') public bankCharge: RadioButton;
    @component('//multi-level-dropdown[@formcontrolname="billerServiceID"]') public serviceID: Button;
    @component('//input[@name="payeeMandateDetail"]') public mandateDetail: Button;
    @component('//input[@name="payeeStockCode"]') public stockCode: Button;

    //Delete Bulk Collection
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    //Copy Bulk Collection
    @component("//*[@name='copy']") public copyButton: Button;

    //Edit Bulk Collection
    @component('//*[@id="bulk-view-edit"]') public editButton: Button;

    //Reject Bulk Collection
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;

    //View Bulk Collection
    @component('//span[@id="bulk-view-accountNum"]') public fromAccountView: TextInput;
    @component('//span[@id="bulk-view-accountName"]') public fromAccountNameView: TextInput;
    @component('//*[@id="bulk-view-paymentAmount"]') public totalAmountValue: TextInput;
    @component('//strong[@id="bulk-view-acctNum_0"]') public accountNumberValue: TextInput;
    @component('//strong[@id="bulk-view-acctNum_1"]') public accountNumberValue2: TextInput;
    @component('//*[@id="bulk-view-name_0"]') public payeeNameValue: TextInput;
    @component('//*[@id="bulk-view-name_1"]') public payeeNameValue2: TextInput;
    @component('//*[@id="bulk-view-nickName_0"]') public payeeNickNameValue: TextInput;
    @component('//*[@id="bulk-view-nickName_1"]') public payeeNickNameValue2: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="reference-for-payee"]') public refForPayeeValue: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="reference-for-payee"]') public refForPayeeValue2: TextInput;
    @component('//div[@id="bulk-view-status_0"]') public transactionStatusValue: TextInput;
    @component('//div[@id="bulk-view-status_1"]') public transactionStatusValue2: TextInput;
    @component('//*[@id="bulk-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="viewReference"]') public referenceValue: TextInput;
    @component('//*[@id="bulk-view-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="bulk-view-paymentType"]') public paymentType: TextInput;
    @component('//ng-component/div/div/dbs-bulk-view-section/div/dbs-bp-view-summary-section/div[5]/span[2]') public paymentType2: TextInput;
    @component('//*[@id="bulk-view-bankChargeType"]') public bankChargeType: TextInput;
    @component('//*[@id="bulk-view-charge-account"]') public chargeAcctValue: TextInput;
    @component('//*[@id="bulk-view-debitType-template"]') public viewConsolidateCreditValue: TextInput;
    @component('//*[@id="bulk-view-paymentDate"]') public paymentDate: TextInput;
    @component('//*[@id="bulk-view-batchId"]') public batchIDValue: TextInput;
    @component('//*[@id="bulk-view-billerServiceID"]') public billerServiceIDValue: TextInput;
    @component('//*[@class="summary-panel step2-panel-triangle"]') public collectionSummaryValue: TextInput;
    @component('//*[@id="view-bulk-totalItem"]') public colTotalPayee: TextInput;
    @component('//*[@id="view-bulk-totalAmount"]') public colTotalAmount: TextInput;
    @component('//*[@id="bulk-view-payeeBankName_0"]') public payeeBankName: TextInput;
    @component('//*[@id="bulk-view-payeeBankName_1"]') public payeeBankName2: TextInput;
    @component('//*[@id="bulk-view-bankDetailsMsgDisplay_0"]') public payeeBankSwiftBic: TextInput;
    @component('//*[@id="bulk-view-bankDetailsMsgDisplay_1"]') public payeeBankSwiftBic2: TextInput;
    @component('//*[@id="bulk-view-payeeBankDetManual_0"]') public payeeBankDetManual: TextInput;
    @component('//*[@id="bulk-view-payeeBankDetManual_1"]') public payeeBankDetManual2: TextInput;
    @component('//*[@id="bulk-view-mandateId_0"]') public mandateIdValue: TextInput;
    @component('//*[@id="bulk-view-mandateId_1"]') public mandateIdValue2: TextInput;
    @component('//*[@id="bulk-view-ddaRef_0"]') public DDAReferenceValue: TextInput;
    @component('//*[@id="bulk-view-ddaRef_1"]') public DDAReferenceValue2: TextInput;
    @component('//strong[@id="bulk-view-amount_0"]') public amountValue: TextInput;
    @component('//strong[@id="bulk-view-amount_1"]') public amountValue2: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="transaction-code-label"]') public transactionCodeView: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="transaction-code-label"]') public transactionCodeView2: TextInput;
    @component('//*[@id="bulk-view-particular_0"]') public particularsValue: TextInput;
    @component('//*[@id="bulk-view-particular_1"]') public particularsValue2: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="purpose-code-label"]') public purposeCodeValue: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="purpose-code-label"]') public purposeCodeValue2: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="payee-purpose-code-label"]') public payeePurposeCodeValue: TextInput;
    @component('//*[@id="bulk-view-paymentDetails_0"]') public collectionDetailValue: TextInput;
    @component('//*[@id="bulk-view-paymentDetails_1"]') public collectionDetailValue2: TextInput;
    @component('//*[@id="bulk-view-mandateDetail_0"]') public mandateDetailValue: TextInput;
    @component('//*[@id="bulk-view-mandateDetail_1"]') public mandateDetailValue2: TextInput;
    @component('//*[@id="bulk-view-stockCode_0"]') public stockCodeValue: TextInput;
    @component('//*[@id="bulk-view-stockCode_1"]') public stockCodeValue2: TextInput;
    @component('//*[@id="bulk-view-passBook_0"]') public passBookValue: TextInput;
    @component('//*[@id="bulk-view-passBook_1"]') public passBookValue2: TextInput;
    @component('//*[@id="bulk-view-freeText_0"]') public freeTextValue: TextInput;
    @component('//*[@id="bulk-view-freeText_1"]') public freeTextValue2: TextInput;

    @component('//*[@id="bulk-view-message_0"]') public messageValue: TextInput;
    @component('//*[@id="bulk-view-message_1"]') public messageValue2: TextInput;
    @component('//*[@id="bulk-view-email_0"]') public emailList: TextInput;
    @component('//*[@id="bulk-view-email_1"]') public emailList2: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_0"]') public showOptionView: Button;
    @component('//*[@id="bulk-viewTemp-optDetail_1"]') public showOptionView2: Button;

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

    //View Bulk Collection Template
    @component('//span[@id="bulk-viewTemp-name"]') public viewTemplateName: TextInput;
    @component('//span[@id="bulk-viewTemp-accountNum"]') public viewTemplateFromAccount: TextInput;

    //Create TW ACH Bulk Collection from template
    @component('//input[@name="payeeNationalID"]') public TWACHPayerID: TextInput;

    //Express Bulk Collection
    @component('//input[@id="sgbc_set_date"]') public customDayButton: Button;
    @component('//input[@id="exp_coll_type"]') public expressTypeButton: Button;

    // For IN Bulk Collection
    @component('//input[@name="ucicCode"]') public ucicCode: TextInput;
    @component('//*[@id="bulk-view-ucicCode"]') public ucicCodeValue: TextInput;

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
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
    }

    public async loadConditionForViewBulkCollectionPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountView.element), this.fromAccountView.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.totalAmountValue.element), this.totalAmountValue.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.paymentType.element), this.paymentType.getTimeOut());
    }
    public async loadConditionForViewTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTemplateName.element), this.viewTemplateName.getTimeOut());
    }

    public async loadConditionForCreateFromTempaltePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.amount.element), this.amount.getTimeOut());
    }

    public async loadConditionForCreateFromTWACHTempaltePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.TWACHPayerID.element), this.TWACHPayerID.getTimeOut());
    }

    public async loadConditionForViewPagination() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showOptionalButton.element), this.showOptionalButton.getTimeOut());
    }

    public async loadConditionForDismissRejectDialog(){
        await waitForUXLoading();
        await browser.sleep(10000)
        await browser.wait(ExpectedConditions.visibilityOf(this.dismissButton.element), this.dismissButton.getTimeOut());
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
            await this.viewPreHundredButton.clickIfExist()
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
                // await this.viewPreTenButton.ElementExist() === false,
                await this.viewPreHundredButton.ElementExist() === false,
                // await this.viewPaginationButton.ElementExist() === false,
            ]);
        }
    }

    public async addExistingPayee(testDate: string): Promise<void> {
        await this.filterExistingPayee.input(testDate);
        await this.addButton.jsClick();
    }
}
