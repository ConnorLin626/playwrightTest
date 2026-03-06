/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import {
  Page,
  component, log,
  Button,
  TextInput,
  OptionSelect,
  ListSelect,
  waitForUXLoading
} from "../../../lib";
import { find } from "../../../lib/utils";

@log export class PaymentsTransactionsFilesPage extends Page {
  constructor() {
    super();
  }

  //by transaction
  @component('//a[@id="ux-tab-byTransaction"]') public byTransactionButton: Button;
  @component('//input[@id="transaction-labelPendingApp"]')
  public byTransactionPendingApprovalButton: Button;
  @component('//input[@name="approve-filter"]')
  public byTransactionFilter: TextInput;
  // @component('//div[@id="transactionList"]') public transactionList: ListSelect;
  @component("//datatable-scroller") public transactionList: ListSelect;
  @component('//button[@id="transaction-reference_0"]')
  public transactionList_Reference: Button;
  @component('//button[@id="transaction-reference_1"]')
  public transactionList_Reference1: Button;
  @component('//input[@id="isSelectAllAdvising"]')
  public selectAllCheckBox: Button;
  @component('//*[@id="transactionListResult"]')
  public transactionListResult: TextInput;
  @component('//*[@id="labelMoreResults"]')
  public transactionMoreResults: TextInput;
  @component('//div[starts-with(@class, "empty-row")]')
  public labelNoInformationDisplay: TextInput;
  @component("//*[@id='transactionAdditionalFilter']")
  public showAddFilter: Button;
  @component("//p-auto-complete[@formcontrolname='paymentTypeRec']")
  public paymentTypeList: OptionSelect;

  //by file
  @component('//a[@id="ux-tab-byFile"]') public byFileButton: Button;
  @component('//label[@id="file-list-addition"]')
  public byFileAdditionFilter: Button;
  @component('//input[@name="approve-filter"]')
  public byFileAdditionFilter_Files: TextInput;
  @component('//p-auto-complete[@formcontrolname="approvalOpt"]')
  public byFileAdditionFilter_ApprovalOption: OptionSelect;
  @component('//button[@name="search"]')
  public byFileAdditionFilter_Search: Button;
  @component('//button[@id="fileNameButton-0"]')
  public byFileFileNameRef: Button;
  @component('//button[@name="view-file-approveAll"]')
  public viewFileApproveAll: Button;
  @component('//*[@id="fileListResult"]') public fileListResult: TextInput;

  //by Group
  @component('//a[@id="ux-tab-byGroup"]') public byGroupButton: Button;
  @component('//button[@id="groupApprove"]') public groupApproveButton: Button;
  @component('//button[@id="groupReject"]') public groupRejectButton: Button;
  @component('//button[@id="groupNameButton-0"]') public byGroupNameRef: Button;
  @component('//datatable-scroller') public groupList: ListSelect;
  @component('//a[@id="ux-tab-GROUP"]') public groupButton: Button;
  @component('//*[@id="approverOption"]') public groupApproverOption: OptionSelect;
  @component('//button[@id="groupVerify"]') public groupVerifyButton: Button;
  @component('//button[@id="transactionVerify"]') public transactionVerifyButton: Button;
  @component('//button[@id="groupRelease"]') public groupReleaseButton: Button;
  @component('//button[@id="transactionRelease"]') public transactionReleaseButton: Button;
  @component("//input[@name='transferCenter-group-filter']") public GroupFilter: TextInput;

  // Approval/Reject txn
  @component('//button[@id="transactionApprove"]') public approveButton: Button;
  @component('//button[@name="approve"]') public previewApproveButton: Button;
  @component("//input[@name='responseCode']")
  public challengeResponse: TextInput;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component('//button[@name="transactionReject"]') public rejectButton: Button;
  @component('//input[@name="reasonForRejection"]')
  public reasonForRejection: TextInput;
  @component('//button[@name="reject"]') public rejectDialogButton: Button;
  @component('//button[@name="finish"]') public finishButton: Button;
  @component('//*[@name="dismiss"]') public dismissButton: Button;

  // Approve file
  @component('//label[@id="file-expand-transaction-0"]')
  public showTxnButton: Button;
  @component('//button[@id="fileApprove"]') public fileApproveBtn: Button;
  @component('//button[@id="fileReject"]') public fileRejectBtn: Button;
  @component('//span[@id="total-items-0"]') public listTotalItems: TextInput;
  @component('//p[@id="complete-totalItem-0"]')
  public completeTotalItems: TextInput;
  @component('//input[@id="file-view-filter"]') public ViewFileFilter: TextInput;

  // for single file get file name
  @component('//div[@id="complete-file-name-0"]')
  public fileNameText: TextInput;
  @component("//datatable-scroller") public fileList: ListSelect;
  @component(
    '//*[@id="file-details-transaction"]/*/div/div/datatable-body/datatable-selection/datatable-scroller'
  )
  public fileDetailsList: ListSelect;

  // My Verification UI
  @component('//button[@id="transactionVerify"]') public txnVerifyBtn: Button;
  @component('//button[@id="transactionRelease"]') public txnReleaseBtn: Button;
  @component('//button[@id="fileVerify"]') public fileVerifyBtn: Button;
  @component('//button[@id="fileRelease"]') public fileReleaseBtn: Button;
  @component('//button[@name="preview-verify-release"]')
  public previewFileBtn: Button;
  @component('//p[@id="complete-transaction-labelStatus-0"]')
  public completeTxnSatus1: TextInput;
  @component('//p[@id="complete-transaction-labelStatus-1"]')
  public completeTxnSatus2: TextInput;
  // @component("//label[@class='action']") public myApprovalI3: Button;
  // @component('//a[text()="By File Amount"]') public myApprovalI3ByFile: Button;
  // @component('//input[@id="0-FileApprovalList_processed"]') public myApprovalI3Select1stFile: Button;
  // @component('//input[@id="1-FileApprovalList_processed"]') public myApprovalI3Select2ndFile: Button;
  // @component('//a[@id="r11CopyApproveButtonprocessed_Link"]') public approveFileI3Button: Button;
  // @component('//input[@name="signature"]') public challengeResponseI3: TextInput;
  // @component('//a[@id="submitButton_Link"]') public submitFileI3Button: Button;
  // @component('//a[@id="r11CopyRejectButtonprocessed_Link"]') public rejectFileI3Button: Button;
  // @component('//*[@id="contentDiv"]/form/table/tbody/tr[25]/td/p/span/a[1]/span') public I3ViewCancelBtn: Button;

  public async loadCondition() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.sleep(8000)
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.approveButton.element),
      this.approveButton.getTimeOut()
    );
  }

  public async loadConditionForMyVerification() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.txnVerifyBtn.element),
      this.txnVerifyBtn.getTimeOut()
    );
  }

  public async loadConditionForMyRelease() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.txnReleaseBtn.element),
      this.txnReleaseBtn.getTimeOut()
    );
  }

  public async loadConditionForMyVerificationByFile() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.fileVerifyBtn.element),
      this.fileVerifyBtn.getTimeOut()
    );
  }

  public async loadConditionForMyReleaseByFile() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.fileReleaseBtn.element),
      this.fileReleaseBtn.getTimeOut()
    );
  }

  public async loadConditionForByFile() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.fileApproveBtn.element),
      this.approveButton.getTimeOut()
    );
  }

  public async loadConditionForByGroup() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.groupApproveButton.element), this.groupApproveButton.getTimeOut());
  }

  public async loadConditionForPreviewApproval() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.stalenessOf(this.groupApproveButton.element), this.groupApproveButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.challengeResponse.element), this.challengeResponse.getTimeOut());
  }

  public async loadConditionForViewFile() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.viewFileApproveAll.element),
      this.viewFileApproveAll.getTimeOut()
    );
  }

  public async loadConditionForApprovePayment() {
    await waitForUXLoading();
    // await browser.wait(ExpectedConditions.elementToBeSelected(this.previewApproveButton.element), this.getChallengeSMS.getTimeOut());
  }

  public async loadConditionForCompletedPage() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.finishButton.element),
      this.finishButton.getTimeOut()
    );
  }

  public async loadConditionForTransactionListResult() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(
        this.transactionListResult.element
      ),
      this.transactionListResult.getTimeOut()
    );
    await waitForUXLoading();
  }

  public async loadConditionForFileListResult() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.fileListResult.element),
      this.fileListResult.getTimeOut()
    );
    await waitForUXLoading();
  }

  public async loadConditionForMoreResults() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(
        this.transactionMoreResults.element
      ),
      this.transactionMoreResults.getTimeOut()
    );
    await waitForUXLoading();
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
    await this.byFileAdditionFilter_Files.clean();
    await this.byFileAdditionFilter_Files.input(_fileName);

    await this.fileList.selectFile(1);
    await this.listTotalItems.getText().then(async item => {
      items = parseInt(item);
    });
    await this.showTxnButton.click();

    await this.getListTxnRef(items).then(async _txnRef => {
      paymentRefList = _txnRef;
    });
    return paymentRefList;
  }
}
