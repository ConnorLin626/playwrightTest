/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import {
  Page,
  component, log,
  Button,
  TextInput,
  waitForUXLoading,
  OptionSelect,
  find,
  DateSelect,
  ListSelect
} from "../../../lib";

@log export class TransferCentersPage extends Page {

  @component("//input[@name='transferCenter-filter']") public transferCenterfilter: TextInput;
  @component('//*[@id="transactionAdditionalFilter"]') public transactionFilterButton: Button;
  @component("//label[starts-with(@class,'is-open')]") public showAdditionFilter: Button;
  @component("//p-auto-complete[@formcontrolname='paymentType']") public paymentTypeList: OptionSelect;
  @component("//p-auto-complete[@formcontrolname='status']") public transactionStatusList: OptionSelect;
  @component("//p-auto-complete[@formcontrolname='organisation']") public transactionOrganisation: OptionSelect;
  @component("//input[@name='transferCenter-fileName']") public fileNameFileter: TextInput;
  @component('//date-picker[@formcontrolname="paymentDateStart"]') public paymentDateFrom: DateSelect;
  @component('//date-picker[@formcontrolname="paymentDateEnd"]') public paymentDateTo: DateSelect;
  @component("//button[@name='search']") public searchButton: Button;
  @component('//button[@id="transaction-list-reference_0"]') public referenceLink: Button;
  @component('//p[@id="labelNoInformationDisplay"]') public transactionResult: TextInput;
  // @component("//button[@name='cancel']") public cancelButton: Button;
  @component('//*[@id="transaction-list-status_0"]') public txnStatus: TextInput;
  @component('//button[@class="fontStyle-14"]') public completedReportButton: Button;
  @component('//div[@id="transfer-payee-title"]') public payeeSortButton: Button;
  @component('//*[@id="groupApprove"]') public groupApproveButton: Button;
  @component('//*[@id="ux-tab-2"]') public groupPendingTable: Button;
  @component('//*[@id="dbs-tab-count-2"]') public groupPendingTableCount: TextInput;
  @component('//*[@name="transferCenter-select-0"]') public transferCenterSelectButton: Button;
  @component('//*[@id="transactionDelete"]') public transactionDeleteButton: Button;
  @component('//*[@id="dialogDelete"]') public dialogDeleteButton: Button;
  @component('//div[@id="transactionList"]') public transactionList: ListSelect;

  //Groups / offline approval
  @component("//input[@name='transferCenter-group-filter']") public transferCenterGroupFilter: TextInput;
  @component('//button[@id="group-list-reference_0"]') public groupReferenceLink: Button;
  @component('//button[@id="groupNameButton-0"]') public groupNameLink: Button;
  @component('//button[@id="createGroup"]') public createGroupButton: Button;
  @component('//button[@id="groupCreate"]') public groupCreateButton: Button;
  @component('//button[@name="create-PDF-close"]') public cancelCreatePDFButton: Button;

  //View Group / Offline Approval
  @component('//p[@id="group-view-status"]') public groupStatusValue: TextInput;
  @component('//*[@name="view-group-approveAll"]') public groupApproveAllButton: Button;
  @component('//*[@name="viewApprovalGroupRejectALL"]') public groupRejectAllButton: Button;
  @component('//button[@name="viewApprovalGroupReject"]') public groupRejectButton: Button;
  @component('//button[@name="view-group-remove"]') public groupRemoveButton: Button;
  @component('//button[@name="remove-txn-group-remove"]') public removeDialogButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;
  @component('//button[@id="view-group-list-reference_0"]') public viewGroupReferenceLink: Button;
  @component('//input[@id="byGroup-view-flter"]') public viewGroupFilter: TextInput;
  @component('//p[@id="view-group-list-status_0"]') public viewGroupListStatus: TextInput;
  @component('//div[@id="No information to display"]') public labelNoInformationDisplay: TextInput;
  @component('//*[@name="view-group-cancel"]') public groupCancelButton: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToUX();
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.referenceLink.element), this.referenceLink.getTimeOut());
  }

  public async loadViewGroupCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.groupCancelButton.element), this.groupCancelButton.getTimeOut());
  }

  public async loadCreateGroupCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.groupCreateButton.element), this.groupCreateButton.getTimeOut());
  }

  public async goToViewPaymentPageViaRef(reference: string) {
    await this.loadCondition();
    await this.transferCenterfilter.input(reference);
    await this.referenceLink.click();
  }

  public async goToViewPaymentPageViaSearch(paymentType: string, transactionStatus: string) {
    await this.loadCondition();
    await this.showAdditionFilter.click();
    if ("" !== paymentType) {
      await this.paymentTypeList.select(paymentType);
    }
    if ("" !== transactionStatus) {
      await this.transactionStatusList.select(transactionStatus);
    }
    await this.searchButton.click();
    await this.loadCondition();
    await this.referenceLink.click();
  }

  public async getApprovalTransactionReference(items: number) {
    let _transactionReferenceList = [];
    for (let index = 0; index < items; index++) {
      await (find('//button[@id="transaction-list-reference_' + index + '"]')).getText().then(async text => {
        _transactionReferenceList.push(text.trim());
      });
    }
    console.log('transactionReferenceList:', _transactionReferenceList);
    return _transactionReferenceList;
  }

  public async loadOfflineGroup() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.groupApproveButton.element), this.groupApproveButton.getTimeOut());
    await waitForUXLoading();
  }

  public async goToViewPaymentPageforPagination(reference: string, paymentType: string) {
    await this.loadCondition();
    await this.transferCenterfilter.input(reference);
    if (this.referenceLink.isDisplayed()) {
      await this.referenceLink.click();
    } else {
      await this.transactionFilterButton.click();
      await this.paymentTypeList.select(paymentType);
      await this.searchButton.click();
      await this.loadCondition();
      await this.payeeSortButton.click();
      await this.referenceLink.click();
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

  public async loadConditionforApprovalSection() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.challengeResponse.element), this.challengeResponse.getTimeOut());
    await browser.sleep(5000);// when push approval, before click need to wail the response
  }
}
