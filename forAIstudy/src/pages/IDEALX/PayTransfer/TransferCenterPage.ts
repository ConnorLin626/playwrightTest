/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect, find, DateSelect, ListSelect, devWatch,SIT } from "../../../lib";

@log export class TransferCentersPage extends Page {
    @component('//*[@id="transferCenter-filter"]') public transferCenterFilter: TextInput;
    @component("//button[@id='transaction-list-reference_0']") public refLink: Button;
    @component("//*[@id='transactionAdditionalFilter']/label") public showAdditionFilter: Button;
    @component("//p-auto-complete[@formcontrolname='paymentType']") public paymentTypeList: OptionSelect;
    @component("//advance-search-transaction/div/form/div/div[2]/div[2]/p-auto-complete/div/div[2]/ul/li[1]/div/span") public organisationListResult: Button;
    @component("//p-auto-complete[@formcontrolname='organisation']") public organisationList: OptionSelect;
    @component("//p-auto-complete[@formcontrolname='status']") public transactionStatusList: OptionSelect;
    @component("//*[@name='transferCenter-fileName']") public fileNameFileter: TextInput;
    @component('//date-picker[@formcontrolname="paymentDateStart"]') public paymentDateFrom: DateSelect;
    @component('//date-picker[@formcontrolname="paymentDateEnd"]') public paymentDateTo: DateSelect;
    @component('//div[@id="transfer-payee-title"]') public payeeSortButton: Button;
    @component("//*[@name='search']") public searchButton: Button;
    @component('//*[@id="groupApprove"]') public groupApproveButton: Button;
    @component('//*[@id="transferCenter-edit-0"]') public actionEditBtn: Button;
    @component('//*[@id="transferCenter-copy-0"]') public actionCopyBtn: Button;
    @component('//*[@id="transferCenter-options-0"]') public actionBtn: Button;
    @component('//p[@id="labelNoInformationDisplay"]') public transactionResult: TextInput;
    @component('//*[@id="transaction-list-status_0"]') public txnStatus: TextInput;
    @component('//*[@id="transaction-list-itemStatus_0"]') public cancleEdpTxnStatus: TextInput;
    @component('//*[@name="transferCenter-select-0"]') public transferCenterSelectButton: Button;
    @component('//*[@id="transactionDelete"]') public transactionDeleteButton: Button;
    @component('//*[@id="dialogDelete"]') public dialogDeleteButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component("//dbs-advance-search-transaction/div/form/div/div[5]/div[2]/p-auto-complete/div/div[2]/ul/li/div/span") public transactionStatus: Button;
    @component('//*[@id="transactionList"]') public transactionList: ListSelect;
    @component('//*[@name="transferCenter-select-0"]') public payment1: Button;
    @component('//*[@id="transaction-code-label"]') public TransactionCodeValue: TextInput;
    @component('//*[@id="bulk-view-debitType-template"]') public DebitTypeValue: TextInput;
    @component("//li[@class='page-point ng-star-inserted']") public page: Button;
    @component('//div[@class="high-risk-payee-tip"]') public HighRiskFlag: Button;

    //Groups / offline approval
    @component('//*[@id="byGroup-filter"]') public transferCenterGroupFilter: TextInput;
    @component('//button[@id="group-list-reference_0"]') public groupReferenceLink: Button;
    @component('//button[@id="groupNameButton-0"]') public groupNameLink: Button;
    @component('//*[@id="createGroup"]') public createGroupButton: Button;
    @component('//*[@id="groupCreate"]') public groupCreateButton: Button;
    @component('//*[@name="create-PDF-close"]') public cancelCreatePDFButton: Button;

    //View Group / Offline Approval
    @component('//*[@id="group-view-status"]') public groupStatusValue: TextInput;
    @component('//*[@name="view-group-approveAll"]') public groupApproveAllButton: Button;
    @component('//*[@name="viewApprovalGroupRejectALL"]') public groupRejectAllButton: Button;
    @component('//*[@name="viewApprovalGroupReject"]') public groupRejectButton: Button;
    @component('//*[@name="view-group-remove"]') public groupRemoveButton: Button;
    @component('//*[@name="remove-txn-group-remove"]') public removeDialogButton: Button;
    @component('//*[@id="view-group-list-reference_0"]') public viewGroupReferenceLink: Button;
    @component('//*[@id="byGroup-view-filter"]') public viewGroupFilter: TextInput;
    @component('//*[@id="view-group-list-status_0"]') public viewGroupListStatus: TextInput;
    @component('//div[@id="No information to display"]') public labelNoInformationDisplay: TextInput;
    @component('//*[@name="view-group-cancel"]') public groupCancelButton: Button;

    //For DDA
    @component('//a[contains(@href,"#/transfers/ddas")]') public DDAMenu: Button;
    @component("//*[@id='dda-filter']") public ddaFilter: TextInput;
    @component("//*[@id='dda-reference-0']") public ddaRefLink: Button;
    //view DDA page
    @component("//*[@id='dda-view-status']") public ddaStatus: TextInput;
    @component("//dda-summary/div/div[2]/div[2]") public ddaBillingOrganisation: TextInput;
    @component("//dda-summary/div/div[3]/div[2]") public ddaBillRef: TextInput;
    @component("//dda-details/div[1]/div[2]/div[1]/span[2]") public debitingAccount: TextInput;
    @component("//dda-details/div[1]/div[2]/div[5]/span") public purposeCode: TextInput;
    @component("//dda-details/div[2]/div[1]/div/span") public purposeofDD: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.refLink.element), this.refLink.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.refLink.element), this.refLink.getTimeOut());
    }

    public async loadCondition2() {
        await waitForUXLoading();
        await browser.sleep(8000);
        await browser.wait(ExpectedConditions.visibilityOf(this.refLink.element), this.refLink.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.refLink.element), this.refLink.getTimeOut());
    }

        public async goToViewPaymentPageViaRef(reference: string) {
        await this.loadCondition();
        await this.transferCenterFilter.input(reference);
        await this.loadCondition();
        await this.refLink.jsClick();
    }

       public async goToViewPaymentPageViaSearch(paymentType: string, transactionStatus: string) {
        await this.loadCondition();
        await this.showAdditionFilter.click();
        if ("" !== paymentType) {
            await this.paymentTypeList.select(paymentType);
        }
        if ("" !== transactionStatus) {
            await this.scrollTo(0, 500);
            await this.transactionStatusList.select(transactionStatus);
            //await this.transactionStatus.jsClickIfExist();
        }
        //await this.scrollTo(0, 1000);
        await this.searchButton.jsClick();
        await this.loadCondition();
        await this.refLink.jsClick();
    }

    public async loadConditionforApprovalSection() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.challengeResponse.element), this.challengeResponse.getTimeOut());
        await browser.sleep(5000);// when push approval, before click need to wail the response
    }
    public async goToViewPaymentPageforPagination(reference: string, paymentType: string) {
        await this.loadCondition();
        await this.transferCenterFilter.input(reference);
        if (this.refLink.isDisplayed()) {
            await this.refLink.click();
        } else {
            await this.showAdditionFilter.click();
            await this.paymentTypeList.select(paymentType);
            await browser.sleep(5000);
            await this.searchButton.click();
            await this.loadCondition();
            await this.payeeSortButton.click();
            await this.refLink.click();
        }
    }
    public async getFirstCheckBox(items: number) {
        for (let index = 0; index < items; index++) {
            if (await find('//input[@id="tc-checkbox-' + index + '"]').isPresent()) {
                console.error('index:', index);
                return index;
            };
        };
    }
    public async loadCreateGroupCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.groupCreateButton.element), this.groupCreateButton.getTimeOut());
    }
    public async loadViewGroupCondition() {
        await waitForUXLoading();
        await browser.sleep(3000);
        await browser.wait(ExpectedConditions.visibilityOf(this.groupCancelButton.element), this.groupCancelButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.groupStatusValue.element), this.groupStatusValue.getTimeOut());
    }
    public async loadViewGroupCondition2() {
        await waitForUXLoading();
        await browser.sleep(7000);
        await browser.wait(ExpectedConditions.visibilityOf(this.groupCancelButton.element), this.groupCancelButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.groupStatusValue.element), this.groupStatusValue.getTimeOut());
    }
    public async loadConditionGroupList() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.groupNameLink.element), this.groupNameLink.getTimeOut());
    }

    public async loadOfflineGroup() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.groupApproveButton.element), this.groupApproveButton.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionForDismiss() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.dismissButton.element),this.dismissButton.getTimeOut());
    }
    public async loadConditionForUATSelectAccount(){
        if(!SIT){
            await browser.sleep(5000);
        }
    }
}
