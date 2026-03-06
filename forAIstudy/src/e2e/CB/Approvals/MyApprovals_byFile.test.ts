/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages, PaymentsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, SIT, handlerCase, devWatch } from "../../../lib";
import { browser } from "protractor";

let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData.json');
let paymentType = "ALL - Universal File Format";
let fileName = "";
let _PaymentsPages = new PaymentsPages();
let _selectFileCount = [1];

describe("My Approvals By File", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Approve Single File", async function () {
    let _selectFileCount = [1];
    let fileName = '';
    let _totalItems = 0;
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApproval.SIT.fileNameByFile : testData.MyApproval.UAT.fileNameByFile, testData.MyApproval.approvalOptionByFile).then(async data => {
      fileName = data;
    });

    // upload end 
    let paymentRefList = [];
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ('' !== fileName) {
      await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileName);
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApproval.approvalOptionByFile);
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUxSuccessSuccess() //has success message.
    ]);

    await _ApprovalsPages.paymentsTransactionsFilesPage.fileNameText.getText().then(async value => {
      fileName = value;
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.completeTotalItems.getText().then(async items => {
      _totalItems = parseInt(items);
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.getApproveTransactionRef(_totalItems).then(async list => {
      paymentRefList = list;
    });
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < paymentRefList.length; i++) {
      await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await Promise.all([
        await ensure(
          _ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus
        ).textContainsLessOne(testData.status.Approved,
          testData.status.PartialApproved,
          testData.status.PendingRelease,
          testData.status.Received,
          testData.status.BankRejected,
          testData.status.Completed)
      ]);
    }
  });

  it("Approve Multiple Payment", async function () {
    let _selectTxnNum = [1, 2];
    let fileName = "";
    let paymentRefList = [];
    let _totalItems = 0;
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApproval.SIT.fileNameByFile : testData.MyApproval.UAT.fileNameByFile, testData.MyApproval.approvalOptionByTxn).then(async data => {
      fileName = data;
    });
    // upload end 

    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ('' !== fileName) {
      await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileName);
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApproval.approvalOptionByTxn);
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    // await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.showTxnButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileDetailsList.selectFileTxn(..._selectTxnNum);
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForApprovePayment();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    await Promise.all([
      await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUxSuccessSuccess() //has success message.
    ]);

    await _ApprovalsPages.paymentsTransactionsFilesPage.fileNameText.getText().then(async value => {
      fileName = value;
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.completeTotalItems.getText().then(async items => {
      _totalItems = parseInt(items);
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.getApproveTransactionRef(_totalItems).then(async list => {
      paymentRefList = list;
    });

    // await devWatch();
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < paymentRefList.length; i++) {
      await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await Promise.all([
        await ensure(
          _ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus
        ).textContainsLessOne(testData.status.Approved,
          testData.status.PartialApproved,
          testData.status.PendingRelease,
          testData.status.Received,
          testData.status.BankRejected,
          testData.status.Completed)
      ]);
    }
  });

  it("Reject Single Payment", async function () {
    let _selectFileCount = [1];
    let _selectTxnCount = 1;
    let fileNameList = [];
    let fileName = '';
    let paymentRefList = [];
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApproval.SIT.fileNameByFile : testData.MyApproval.UAT.fileNameByFile, testData.MyApproval.approvalOptionByTxn).then(async data => {
      fileName = data;
    });
    // upload end 

    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ('' !== fileName) {
      await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileName);
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApproval.approvalOptionByTxn);
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.showTxnButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileDetailsList.selectFileTxn(_selectTxnCount);
    await _ApprovalsPages.paymentsTransactionsFilesPage.getListFileName(_selectFileCount).then(async _fileNme => {
      fileNameList = _fileNme;
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.getListTxnRef(_selectTxnCount).then(async _txnRef => {
      paymentRefList = _txnRef;
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileRejectBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(
      testData.MyApproval.rejectReason
    );
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.jsClick();
    await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();
    //await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    // await Promise.all([
    //   await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXRejectDialogSuccess() //has success message.
    // ]);

    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await ensure(
      _ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
  });

  it("Reject Multiple File", async function () {
    let _selectFileCount = [1, 2];
    let fileNameList = [];
    let paymentRefList1 = [];
    let paymentRefList2 = [];
    //upload part start
    for (let i = 0; i < _selectFileCount.length; i++) {

      await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApproval.SIT.fileNameByFile : testData.MyApproval.UAT.fileNameByFile, testData.MyApproval.approvalOptionByFile).then(async data => {
        fileNameList.push(data);
      });
    }
    // upload part end
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if (fileNameList.length === 0) {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApproval.approvalOptionByFile);
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
      await _ApprovalsPages.paymentsTransactionsFilesPage.getListFileName(_selectFileCount).then(async _fileNme => {
        fileNameList = _fileNme;
      });
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.getListPaymentReferenceForReject(fileNameList[0]).then(async data => {
      paymentRefList1 = data;
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.getListPaymentReferenceForReject(fileNameList[1]).then(async data => {
      paymentRefList2 = data;
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileRejectBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(
      testData.MyApproval.rejectReason
    );
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.jsClick();
    //await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    // await Promise.all([
    //   await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXRejectDialogSuccess() //has success message.
    // ]);
    await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();


    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileNameList[0]);
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < paymentRefList1.length; i++) {
      await ensure(_ApprovalsPages.uploadFilePage.viewFileRef).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList1[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
    }

    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileNameList[1]);
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < paymentRefList2.length; i++) {
      await ensure(_ApprovalsPages.uploadFilePage.viewFileRef).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList2[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
    }
  });

  // add AB-8607

  it('Upload New UFF Payroll with 5 transaction via By File', async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSAL : testData.FileService.SIT.fileNameForSAL, testData.FileService.approvalOptionByFile).then(async data => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
    ]);
    // upload end 
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ('' !== fileName) {
      await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileName);
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input("SG_SAL_FSUpload_NUFF");
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUxSuccessSuccess() //has success message.
    ]);
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileNameText.getText().then(async value => {
      fileName = value;
    });
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(fileName);
    await _PaymentsPages.transferCentersPage.referenceLink.jsClick();
    await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
      await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount),
      await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll.existingPayee),
      await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.Approved),
    ]);
  });

});
