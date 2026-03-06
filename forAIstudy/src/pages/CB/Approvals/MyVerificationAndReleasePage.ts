/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import { Page, component, log, Button, TextInput, OptionSelect, ListSelect, waitForUXLoading, ensure } from "../../../lib";
import { find } from "../../../lib/utils";
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';

@log export class MyVerificationAndReleasePage extends Page {
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
  @component("//*[@id='fileNameButton-0']") public fileNameButton: TextInput;
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
  @component('//*[@id="No information to display"]')
  public labelNoInformationDisplay: TextInput;
  @component("//*[@id='transactionAdditionalFilter']")
  public showAddFilter: Button;
  @component("//p-auto-complete[@formcontrolname='paymentTypeRec']")
  public paymentTypeList: OptionSelect;
  @component('//button[@id="transactionVerify"]') public txnVerifyBtn: Button;
  @component('//button[@id="transactionRelease"]') public txnReleaseBtn: Button;
  @component('//button[@name="txn-preview-verify-release"]') public txnVerifyReleasePreBtn: Button;
  @component('//button[@name="view-verify-release"]') public viewVerifyReleaseBtn: Button;

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
  @component('//*[@id="fileListResult"]') public fileListResult: TextInput;
  @component('//button[@name="transactionReject"]') public rejectButton: Button;
  @component('//input[@name="reasonForRejection"]')
  public reasonForRejection: TextInput;
  @component('//button[@name="reject"]') public rejectDialogButton: Button;
  @component('//button[@name="finish"]') public finishButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;
  @component('//label[@id="file-expand-transaction-0"]')
  public showTxnButton: Button;
  @component('//button[@id="fileReject"]') public fileRejectBtn: Button;
  @component('//span[@id="total-items-0"]') public listTotalItems: TextInput;
  @component('//p[@id="complete-totalItem-0"]')
  public completeTotalItems: TextInput;
  @component('//p-auto-complete[@formcontrolname="organisationObjRec"]')
  public organisationSelect: OptionSelect;
  // for single file get file name
  @component('//div[@id="complete-file-name-0"]')
  public fileNameText: TextInput;
  @component("//datatable-scroller") public fileList: ListSelect;
  @component(
    '//*[@id="file-details-transaction"]/*/div/div/datatable-body/datatable-selection/datatable-scroller'
  )
  public fileDetailsList: ListSelect;
  @component('//button[@id="fileVerify"]') public fileVerifyBtn: Button;
  @component('//button[@id="fileRelease"]') public fileReleaseBtn: Button;
  @component('//button[@name="preview-verify-release"]')
  public previewFileBtn: Button;
  @component('//p[@id="complete-transaction-labelStatus-0"]')
  public completeTxnSatus1: TextInput;
  @component('//p[@id="complete-transaction-labelStatus-1"]')
  public completeTxnSatus2: TextInput;
  @component('//button[@name="view-verify-release-all"]') public viewVerifyReleaseAllBtn: Button;
  @component('//button[@name="view-file-rejectAll"]') public viewRejectAllBtn: Button;
  @component('//button[@name="view-file-reject"]') public viewFileRejectBtn: Button;
  @component('//button[@name="view-verify-release"]') public viewFileVerifyReleasetBtn: Button;
  @component('//input[@id="file-view-filter"]') public ViewFileFilter: TextInput;

  //by group
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
  @component('//button[@name="view-group-verify-release-all"]') public verifyReleaseAllButton: Button;
  @component('//button[@name="verify-release"]') public verifyReleaseConfirmButton: Button;
  @component('//button[@name="preview-verify-release"]') public PreviewVerifyReleaseButton: Button;

  public async loadCondition() {
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

  public async loadConditionForRejectDialog() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.dismissButton.element),
      this.dismissButton.getTimeOut()
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

  public async loadConditionForMyReleasePreView() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.previewFileBtn.element),
      this.previewFileBtn.getTimeOut()
    );
  }

  public async loadConditionForViewFile() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.viewRejectAllBtn.element),
      this.viewRejectAllBtn.getTimeOut()
    );
  }

  public async loadConditionForByGroup() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.groupApproveButton.element), this.groupApproveButton.getTimeOut());
  }

  public async loadConditionForVerifyByTxn() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionVerifyButton.element), this.transactionVerifyButton.getTimeOut());
  }

  public async loadConditionForVerifyByGroup() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.groupVerifyButton.element), this.groupVerifyButton.getTimeOut());
  }

  public async loadConditionForReleaseByTxn() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionReleaseButton.element), this.transactionReleaseButton.getTimeOut());
  }

  public async loadConditionForReleaseByGroup() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.groupReleaseButton.element), this.groupReleaseButton.getTimeOut());
  }

  public async loadConditionForPrivewVerifyGroupPage() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.stalenessOf(this.groupVerifyButton.element), this.groupVerifyButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.PreviewVerifyReleaseButton.element), this.PreviewVerifyReleaseButton.getTimeOut());
  }

  public async loadConditionForPrivewReleaseGroupPage() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.stalenessOf(this.groupReleaseButton.element), this.groupReleaseButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.PreviewVerifyReleaseButton.element), this.PreviewVerifyReleaseButton.getTimeOut());
  }

  // public async loadConditionForViewFile() {
  //   await waitForUXLoading();
  //   await browser.wait(
  //     ExpectedConditions.elementToBeClickable(this.viewFileApproveAll.element),
  //     this.viewFileApproveAll.getTimeOut()
  //   );
  // }


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

  public async verifySingleTxnUnderList(_PaymentsPages: PaymentsPages, reference: string, paymentType: string) {
    let verifyReference = "";
    let verifyFlag = false;
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await this.loadCondition();
    if (0 !== reference.trim().length) {
      await this.byTransactionFilter.input(reference);
    } else {
      await this.showAddFilter.click();
      await this.paymentTypeList.select(paymentType);
      await this.byFileAdditionFilter_Search.click();
      await this.loadCondition();
    }
    await this.transactionList.selectFile(1);
    await this.transactionList_Reference.getText().then(text => {
      verifyReference = text.trim();
    });
    await this.txnVerifyBtn.click();
    await this.txnVerifyReleasePreBtn.click();
    if (await this.hasUXInfoMsg("successful")) {
      await this.finishButton.click();
      verifyFlag = true;
    }
    if (!verifyFlag) {
      verifyReference = "";
    }
    return verifyReference;
  }

  public async releaseSingleTxnUnderList(_PaymentsPages: PaymentsPages, verifyReference: string, approvalReference: string, paymentType: string) {
    let paymentReference = "";
    let releaseFlag = false;
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await this.loadConditionForReleaseByTxn();
    if (0 !== verifyReference.trim().length && 0 !== approvalReference.trim().length) {
      await this.byTransactionFilter.input(approvalReference);
    } else {
      await this.showAddFilter.click();
      await this.paymentTypeList.select(paymentType);
      await this.byFileAdditionFilter_Search.click();
      await this.loadConditionForReleaseByTxn();
    }
    await this.transactionList.selectFile(1);
    await this.transactionList_Reference.getText().then(text => {
      paymentReference = text.trim();
    });
    await this.txnReleaseBtn.click();
    await this.txnVerifyReleasePreBtn.click();
    if (await this.hasUXInfoMsg("successful")) {
      await ensure(this).isUXSuccess();
      await this.finishButton.click();
      releaseFlag = true;
    }
    if (!releaseFlag) {
      paymentReference = "";
    }
    return paymentReference;
  }
}
