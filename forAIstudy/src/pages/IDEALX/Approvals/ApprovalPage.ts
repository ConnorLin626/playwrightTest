import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, ListSelect, find, waitForUXLoading } from '../../../lib';


@log export class ApprovalPage extends Page {
    constructor() {
        super();
    }

    @component('//*[@id="nav-item-navBBTopMyApprovalsLinkText"]') public approvalMenu: Button;
    @component('//*[@id="transaction-reference_0"]') public refLink: Button;
    @component('//*[@name="responseCode"]') public responseCode: TextInput;
    @component('//*[@name="get-challenge"]') public getChallengeBtn: Button;
    @component('//*[@id="transactionApprove"]') public approveBtn: Button;
    @component('//*[@id="mat-dialog-1"]/dbs-confirm-dialog/div/div[3]/div/button') public dismissBtn: Button;
    @component('//*[@name="approve"]') public viewPageApproveBtn: Button
    @component('//*[@id="file-filter"]') public filter: TextInput;
    @component('//input[contains(@id,"txn-select-")]') public SelectTxn: Button;
    @component('//span[@id="icon-expand"]') public ExpandBtn: Button;
    @component('//div[@class="alert-msg__title"]') public alertMsg: Button;
    @component('//*[@class="tip-tag"]') public HighRiskFlag: Button;
    @component("//p-auto-complete[@formcontrolname='organisationObjRec']") public organisationList: OptionSelect;
    @component("//advance-search-by-txn/div/form/div/div[1]/div[2]/p-auto-complete/div/div[2]/ul/li[1]/div/span") public organisationAll: Button;

    //by transaction
    @component('//input[@type="text"]') public byTransactionButton: Button;
    @component('//input[@id="transaction-labelPendingApp"]') public byTransactionPendingApprovalButton: Button;
    @component('//input[@type="text"]') public byTransactionFilter: TextInput;
    @component("//datatable-scroller") public transactionList: ListSelect;
    @component('//*[@id="transaction-reference_0"]') public transactionList_Reference: Button;
    @component('//*[@id="transaction-reference_1"]') public transactionList_Reference1: Button;
    @component('//input[@id="isSelectAllAdvising"]') public selectAllCheckBox: Button;
    @component('//*[@id="transactionListResult"]') public transactionListResult: TextInput;
    @component('//*[@id="labelMoreResults"]') public transactionMoreResults: TextInput;
    @component('//*[@id="No information to display"]') public labelNoInformationDisplay: TextInput;
    @component("//*[@id='transactionAdditionalFilter']") public showAddFilter: Button;
    @component("//p-auto-complete[@formcontrolname='paymentTypeRec']") public paymentTypeList: OptionSelect;
    @component("//input[@id='byTXN-filter']") public byFileFilter: TextInput;
    @component("//p-auto-complete[@id='approverOption']") public SelectUser: OptionSelect;
    @component('//input[@type="text"]') public byTxnFilter: TextInput;
    @component('//dbs-calendar[2]/div/div/dbs-input/div/div/div/input') public toCalendar: Button;
    @component('//dbs-calendar[2]/div/div/div/div/dbs-day-calendar/div[2]/button') public todayButton: Button;
    @component('//dbs-day-calendar/div[1]/table/tbody/tr[1]/td[7]/button') public seletOneDay: Button;
    @component("//*[@class='current ng-star-inserted']") public currentDay: Button;
    
    //New UI
    @component("//input[@id='byTXN-filter']") public byTxnfilter: TextInput;
    @component('//button[@id="transactionApprove"]') public ReviewApproveBtn: Button;
    @component('//button[@name="approve"]') public ReviewPageApproveBtn: Button;
    @component('//button[@class="btn btn__primary"]') public challengeApproveBtn: Button;
    @component('//button[@name="finish"]') public DoneBtn: Button;
    //by file
    @component('//a[contains(@href,"#/approvals/approval/by-file")]') public byFileButton: Button;
    @component('//a[contains(@href,"#/approvals/approval-new/by-file")]') public newByFileButton: Button;
    @component('//*[@id="transactionAdditionalFilter"]') public byFileAdditionFilter: Button;
    @component('//*[@class="btn__icon tiny calendar__move left"]') public leftButton: Button;
    @component('//input[@name="approve-filter"]') public byFileAdditionFilter_Files: TextInput;
    @component('//p-auto-complete[@formcontrolname="approvalOpt"]') public byFileAdditionFilter_ApprovalOption: OptionSelect;
    @component('//button[@name="search"]') public byFileAdditionFilter_Search: Button;
    @component('//button[@id="fileNameButton-0"]') public byFileFileNameRef: Button;
    @component('//button[@name="view-file-approveAll"]') public viewFileApproveAll: Button;
    @component('//*[@id="fileListResult"]') public fileListResult: TextInput;
    @component('//*[@id="complete-transaction-reference-0"]') public reviewReferenceLink1: TextInput;
    @component('//input[contains(@id,"approval-file-select-")]') public SelectFile: Button;
    @component('//high-risk-payee-dialog/div/div[3]/div/button[2]') public ProceedBtn: Button;
    @component('//datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[8]/div/div/span[1]/span') public secureFXLabell: TextInput;
    @component('//datatable-row-wrapper[2]/datatable-body-row/div[2]/datatable-body-cell[8]/div/div/span[1]/span') public secureFXLabel2: TextInput;
    @component('//datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[8]/div/div/p[2]/button') public moreRate1: Button;
    @component('//datatable-row-wrapper[2]/datatable-body-row/div[2]/datatable-body-cell[8]/div/div/p[2]/button') public moreRate2: Button;
    @component('//button[@name="process"]') public ProceedSelectionBtn: Button;
    //by Group
    @component('//a[contains(@href,"#/approvals/approval/by-group")]') public byGroupButton: Button;
    @component('//button[@id="groupApprove"]') public groupApproveButton: Button;
    @component('//button[@id="groupReject"]') public groupRejectButton: Button;
    @component('//button[@id="groupNameButton-0"]') public byGroupNameRef: Button;
    @component('//datatable-scroller') public groupList: ListSelect;
    @component('//a[contains(@href,"#/transfers/transfer-center/groups")]') public groupButton: Button;
    @component('//*[@id="approverOption"]') public groupApproverOption: OptionSelect;
    @component('//button[@id="groupVerify"]') public groupVerifyButton: Button;
    @component('//button[@id="transactionVerify"]') public transactionVerifyButton: Button;
    @component('//button[@id="groupRelease"]') public groupReleaseButton: Button;
    @component('//button[@id="transactionRelease"]') public transactionReleaseButton: Button;
    @component("//*[@type='text']") public GroupFilter: TextInput;
    @component('//input[contains(@id,"group-view-list-")]') public groupList1: Button;
    // Approval/Reject txn
    @component('//button[@name="approve"]') public approveButton: Button;
    @component('//button[@id="my-approval-preview-file-approve"]') public previewApproveBtn: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component('//button[@name="transactionReject"]') public rejectButton: Button;
    @component('//input[@name="reasonForRejection"]') public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component('//button[@name="finish"]') public finishButton: Button;
    @component('//button[@id="push-btn"]') public pushApproveBtn: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // Approve file
    @component('//label[@id="file-expand-transaction-0"]') public showTxnButton: Button;
    @component('//button[@id="fileApprove"]') public fileApproveBtn: Button;
    @component('//button[@id="fileReject"]') public fileRejectBtn: Button;
    @component('//span[@id="total-items-0"]') public listTotalItems: TextInput;
    @component('//p[@id="complete-totalItem-0"]') public completeTotalItems: TextInput;
    @component('//input[@id="file-view-filter"]') public ViewFileFilter: TextInput;
    @component('//approvals-navigation/ng-component/div/div[2]/div/div/div[1]/div[2]/button[3]/span[1]') public reviewApproveBtn: Button;
    @component('//button[@class="btn btn__primary"]') public confirmApproveBtn: Button;

    // for single file get file name
    @component('//div[@id="complete-file-name-0"]') public fileNameText: TextInput;
    @component("//datatable-scroller") public fileList: ListSelect;
    @component('//input[contains(@id,"approval-file-select-")]') public fileList1: Button;
    @component('//dbs-file-details/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/div/label') public payment1: Button;
    @component('//dbs-file-details/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[2]/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/div/label') public payment2: Button;
    @component('//dbs-file-details/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller') public fileDetailsList: ListSelect;

    // My Verification UI
    @component('//button[@id="transactionVerify"]') public txnVerifyBtn: Button;
    @component('//button[@id="transactionRelease"]') public txnReleaseBtn: Button;
    @component('//button[@id="fileVerify"]') public fileVerifyBtn: Button;
    @component('//button[@id="fileRelease"]') public fileReleaseBtn: Button;
    @component('//button[@name="preview-verify-release"]') public previewFileBtn: Button;
    @component('//p[@id="complete-transaction-labelStatus-0"]') public completeTxnSatus1: TextInput;
    @component('//p[@id="complete-transaction-labelStatus-1"]')
    public completeTxnSatus2: TextInput;


    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveBtn.element), this.approveBtn.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionList_Reference.element), this.transactionList_Reference.getTimeOut());

    }
    public async loadConditionForNewByTx() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionList_Reference.element), this.transactionList_Reference.getTimeOut());

    }

    public async loadConditionForReview() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.reviewApproveBtn.element), this.reviewApproveBtn.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.reviewReferenceLink1.element), this.reviewReferenceLink1.getTimeOut());

    }
    public async loadConditionForNewReview() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.ReviewPageApproveBtn.element), this.reviewApproveBtn.getTimeOut());
        //await browser.wait(ExpectedConditions.elementToBeClickable(this.reviewReferenceLink1.element), this.reviewReferenceLink1.getTimeOut());

    }

    public async loadConditionforviewpage() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewPageApproveBtn.element), this.viewPageApproveBtn.getTimeOut());
    }

    public async loadConditionForByFile() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.byFileFileNameRef.element), this.byFileFileNameRef.getTimeOut()
        );
    }

    public async loadConditionForByGroup() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.groupApproveButton.element), this.groupApproveButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.byGroupNameRef.element), this.byGroupNameRef.getTimeOut());
    }

    public async loadConditionForPreviewApproval() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.groupApproveButton.element), this.groupApproveButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.challengeResponse.element), this.challengeResponse.getTimeOut());
    }

    public async loadConditionForViewFile() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewFileApproveAll.element), this.viewFileApproveAll.getTimeOut()
        );
    }

    public async loadConditionForApprovePayment() {
        await waitForUXLoading();
        // await browser.wait(ExpectedConditions.elementToBeSelected(this.previewApproveButton.element), this.getChallengeSMS.getTimeOut());
    }

    public async loadConditionForCompletedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut()
        );
    }
    public async loadConditionForSuccessPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.DoneBtn.element), this.finishButton.getTimeOut()
        );
    }
    public async loadConditionForTransactionListResult() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionListResult.element), this.transactionListResult.getTimeOut()
        );
        await waitForUXLoading();
    }

    public async loadConditionForFileListResult() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fileListResult.element), this.fileListResult.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionForMoreResults() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionMoreResults.element), this.transactionMoreResults.getTimeOut()
        );
        await waitForUXLoading();
    }

    public async goToApprovePaymentPageViaRef(reference: string) {
        await this.loadCondition();
        await this.filter.input(reference);
        await this.loadCondition();
        await this.refLink.jsClick();
    }

    public async goToApprovePaymentPageViaSearch(paymentType: string) {
        await this.loadCondition();
        await this.showAddFilter.click();
        if ("" !== paymentType) {
            await this.paymentTypeList.select(paymentType);
        }
        //await this.scrollTo(0, 1000);
        await this.byFileAdditionFilter_Search.jsClick();
        await this.loadCondition();
        await this.refLink.jsClick();
    }

    public async loadConditionForRejectDismiss() {
        await waitForUXLoading();
        await browser.sleep(12000);
        await browser.wait(ExpectedConditions.visibilityOf(this.dismissButton.element), this.dismissButton.getTimeOut());
    }

    public async loadCondition2() {
        await waitForUXLoading();
        await browser.sleep(2000);
        await browser.wait(ExpectedConditions.visibilityOf(this.fileRejectBtn.element), this.fileRejectBtn.getTimeOut());
    }

    /**
     * this method role that getting transaction reference from approve complete page(new UI).
     * then will return new string array after calling.
     * @param items
     * this parameter is what you selected Number of transactions or file's total items.
     * if you know number of selected items, You can enter this number as a parameter.
     * else you can calling @function completeTotalItems.getText to get total items.
     * e.g.: 1, 2
     * @returns {Array<string>}
     */
    public async getApproveTransactionRef(items: number) {
        let _txnRefList = [];
        for (let index = 0; index < items; index++) {
            await find('//p[@id="complete-transaction-reference-' + index + '"]')
                .getText()
                .then(async text => {
                    _txnRefList.push(text);
                });
        }
        return _txnRefList;
    }

    /**
     * this method role that getting transaction reference from my approval by file tab list page(new UI).
     * then will return new string array after calling.
     * @param items
     * this parameter is what you selected Number of transactions or file's total items.
     * if you know number of selected items, You can enter this number as a parameter.
     * else you can calling @function listTotalItems.getText to get total items.
     * e.g.: 1, 2
     * @returns {Array<string>}
     */

    public async getListTxnRef(items: number) {
        let _txnRefList = [];
        for (let index = 0; index < items; index++) {
            await find('//button[@id="detail-transaction-reference-' + index + '"]')
                .getText()
                .then(async text => {
                    _txnRefList.push(text);
                });
        }
        return _txnRefList;
    }

    /**
     * this method role that getting file name from my approval by file tab list page(new UI).
     * then will return new string array after calling.
     * @param selectFileList
     * this parameter is what you selected file, e.g.: [1,2]
     * @returns {Array<string>}
     */

    public async getListFileName(selectFileList: Array<any>) {
        let _fileNameList = [];
        for (let index = 0; index < selectFileList.length; index++) {
            await find('//button[@id="fileNameButton-' + index + '"]')
                .getText()
                .then(async text => {
                    _fileNameList.push(text);
                });
        }
        return _fileNameList;
    }

    /**
     * this method role that getting transaction reference from my approval by file tab list page(new UI).
     * then will return new string array after calling.
     * this method only for getting the whole file's transaction reference.
     * if you just want get One of the transactions in the file,used @function getListTxnRef
     * @param _fileName
     * this parameter is what you selected file's file name
     * @returns {Array<string>}
     */
    public async getListPaymentReferenceForReject(_fileName: string) {
        let paymentRefList = [];
        let items = 0;
        await this.filter.clean();
        await this.filter.input(_fileName);

        await this.fileList.selectIdealxFile(1);
        await this.listTotalItems.getText().then(async item => {
            items = parseInt(item);
        });
        await this.showTxnButton.jsClick();

        await this.getListTxnRef(items).then(async _txnRef => {
            paymentRefList = _txnRef;
        });
        return paymentRefList;
    }
}



