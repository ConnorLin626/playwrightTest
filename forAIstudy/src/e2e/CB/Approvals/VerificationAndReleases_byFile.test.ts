/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, ApprovalsPages, FilesPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, SIT, handlerCase } from "../../../lib";
import { browser } from "protractor";

let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData("SG_testData.json");
let _selectFileCount = [1];
let fileName1 = "";
let _selectMuitipleFileCount = [1, 2];
let fileNameList1 = [];
let fileNameList2 = [];
let viewFileList = [];
let viewFileSingleName = "";
let preTxnList1 = [];
let releaseRejectAllName = "";
let releaseRejectSingleName = "";
let paymentType = "ALL - Universal File Format";
describe("upload By File", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.loginUserId : testData.VerificationAndReleases.UAT.loginUserId); });
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
  //upload part start
  it("upload Single File", async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.VerificationAndReleases.approvalOption).then(async data => {
      fileName1 = data;
    });
  });

  it("upload Muitiple File For Verify", async function () {
    for (let i = 0; i < _selectMuitipleFileCount.length; i++) {

      await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.VerificationAndReleases.approvalOption).then(async data => {
        if (data !== "") { fileNameList1.push(data); }
      });
    }
  });

  it("upload Muitiple File For Release", async function () {
    for (let i = 0; i < _selectMuitipleFileCount.length; i++) {

      await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.VerificationAndReleases.approvalOption)
        .then(async data => {
          if (data !== "") {
            fileNameList2.push(data);
          }
        });
    }
  });

  it("upload Muitiple File For View File", async function () {
    for (let i = 0; i < _selectMuitipleFileCount.length; i++) {
      await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.VerificationAndReleases.approvalCurrency)
        .then(async data => {
          if (data !== "") {
            viewFileList.push(data);
          }
        });
    }
  });

  it("upload pre transaction For View File Only Single Action", async function () {

    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.MyApproval.approvalOptionByTxn)
      .then(async data => {
        viewFileSingleName = data;
      });
  });

  it("upload Single File For Reject All In Release", async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.VerificationAndReleases.approvalOption)
      .then(async data => {
        releaseRejectAllName = data;
      });
  });

  it("upload pre transaction For Reject Transaction In Release", async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.MyApproval.approvalOptionByTxn)
      .then(async data => {
        releaseRejectSingleName = data;
      });
  });
  // upload part end
});

describe("Verification And Releases by File", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId); });
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Verify and Release Single File", async function () {
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if ("" !== fileName1) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        fileName1
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.fileVerifyBtn.click();

    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContains(testData.status.PendingApproval),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus2
      ).textContains(testData.status.PendingApproval)
    ]);
    //go to approve
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ("" !== fileName1) {
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(
        fileName1
      );
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(
      testData.MyApproval.challengeResponse
    );
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    await Promise.all([
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus1
      ).textContains(testData.status.PendingRelease),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus2
      ).textContains(testData.status.PendingRelease)
    ]);
    //go to release
    await _ApprovalsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyRelease();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    if ("" !== fileName1) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        fileName1
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.fileReleaseBtn.click();

    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus2
      ).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it("Rejct Muitiple File For Verify", async function () {
    let paymentRefList1 = [];
    let paymentRefList2 = [];
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if (fileNameList1.length === 0) {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
      await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
      await _ApprovalsPages.myVerificationAndReleasePage
        .getListFileName(_selectMuitipleFileCount)
        .then(async _fileNme => {
          fileNameList1 = _fileNme;
        });
    }
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(fileNameList1[0])
      .then(async data => {
        paymentRefList1 = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(fileNameList1[1])
      .then(async data => {
        paymentRefList2 = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage.fileRejectBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(
      testData.MyApproval.rejectReason
    );
    //await ensure(_ApprovalsPages.myVerificationAndReleasePage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    //await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    // await Promise.all([
    //   await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXRejectDialogSuccess() //has success message.
    // ]);
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();

    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileNameList1[0]);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage()
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
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileNameList1[1]);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage()
    for (let i = 0; i < paymentRefList2.length; i++) {
      await ensure(_ApprovalsPages.uploadFilePage.viewFileRef).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList2[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
    }

  });

  it("Rejct Muitiple File For Release", async function () {
    let releaseRefList1 = [];
    let releaseRefList2 = [];
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if (fileNameList2.length === 0) {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
      await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
      await _ApprovalsPages.myVerificationAndReleasePage
        .getListFileName(_selectMuitipleFileCount)
        .then(async _fileNme => {
          fileNameList2 = _fileNme;
        });
    }
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(fileNameList2[0])
      .then(async data => {
        releaseRefList1 = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(fileNameList2[1])
      .then(async data => {
        releaseRefList2 = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage.fileVerifyBtn.click();

    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContains(testData.status.PendingApproval),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus2
      ).textContains(testData.status.PendingApproval)
    ]);
    //go to approve
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    for (let i = 0; i < fileNameList2.length; i++) {
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(
        fileNameList2[i]
      );
      await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(
        ..._selectFileCount
      );
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(
      testData.MyApproval.challengeResponse
    );
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus1
      ).textContains(testData.status.PendingRelease),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus2
      ).textContains(testData.status.PendingRelease)
    ]);
    //go to release
    await _ApprovalsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyRelease();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(fileNameList2[0])
      .then(async data => {
        releaseRefList1 = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(fileNameList2[1])
      .then(async data => {
        releaseRefList2 = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage.fileRejectBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(
      testData.MyApproval.rejectReason
    );
    //await ensure(_ApprovalsPages.myVerificationAndReleasePage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    //await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXRejectDialogSuccess() //has success message.
    ]);
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();

    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileNameList2[0]);
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < releaseRefList1.length; i++) {

      await ensure(_ApprovalsPages.uploadFilePage.viewFileRef).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(releaseRefList1[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
    }

    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileNameList2[1]);
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < releaseRefList1.length; i++) {
      await ensure(_ApprovalsPages.uploadFilePage.viewFileRef).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(releaseRefList2[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
    }
  });

  it("Verify and Release All in View File", async function () {
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if ("" !== viewFileList[0]) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        viewFileList[0]
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileFileNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForViewFile();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseAllBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleasePreView();
    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContains(testData.status.PendingApproval),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus2
      ).textContains(testData.status.PendingApproval)
    ]);
    //go to approve
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ("" !== viewFileList[0]) {
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(
        viewFileList[0]
      );
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(
      ..._selectFileCount
    );
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(
      testData.MyApproval.challengeResponse
    );
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus1
      ).textContains(testData.status.PendingRelease),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus2
      ).textContains(testData.status.PendingRelease)
    ]);
    //go to release
    await _ApprovalsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyRelease();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    if ("" !== viewFileList[0]) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        viewFileList[0]
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileFileNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForViewFile();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseAllBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleasePreView();
    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus2
      ).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it("Reject All in View File For Verification", async function () {
    let rejectRefList = [];
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if ("" !== viewFileList[1]) {
      await ensure(_ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        viewFileList[1]
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.getListPaymentReferenceForReject(viewFileList[1])
      .then(async data => {
        rejectRefList = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage.byFileFileNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForViewFile();
    await _ApprovalsPages.myVerificationAndReleasePage.viewRejectAllBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(
      testData.MyApproval.rejectReason
    );
    //await ensure(_ApprovalsPages.myVerificationAndReleasePage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    //await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXRejectDialogSuccess() //has success message.
    ]);
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(viewFileList[1]);
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < rejectRefList.length; i++) {
      await ensure(_ApprovalsPages.uploadFilePage.viewFileRef).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(rejectRefList[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
    }
  });

  it("Verify And Release Single Transaction in View File", async function () {
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if ("" !== viewFileSingleName) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        viewFileSingleName
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(viewFileSingleName)
      .then(async data => {
        preTxnList1 = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage.byFileFileNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForViewFile();
    await _ApprovalsPages.myVerificationAndReleasePage.ViewFileFilter.input(preTxnList1[0]);
    await _ApprovalsPages.myVerificationAndReleasePage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.myVerificationAndReleasePage.viewFileVerifyReleasetBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleasePreView();
    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContains(testData.status.PendingApproval)
    ]);
    //go to approve
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ("" !== viewFileSingleName) {
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(
        viewFileSingleName
      );
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileFileNameRef.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForViewFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.ViewFileFilter.input(preTxnList1[0]);
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(
      testData.MyApproval.challengeResponse
    );
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus1
      ).textContains(testData.status.PendingRelease)
    ]);

    //go to release
    await _ApprovalsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyRelease();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    if ("" !== viewFileSingleName) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        viewFileSingleName
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileFileNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForViewFile();
    await _ApprovalsPages.myVerificationAndReleasePage.ViewFileFilter.input(preTxnList1[0]);
    await _ApprovalsPages.myVerificationAndReleasePage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.myVerificationAndReleasePage.viewFileVerifyReleasetBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleasePreView();
    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it("Reject Single Transaction in View File For Verification", async function () {
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if ("" !== viewFileSingleName) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        viewFileSingleName
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();

    await _ApprovalsPages.myVerificationAndReleasePage.byFileFileNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForViewFile();
    //await _ApprovalsPages.myVerificationAndReleasePage.ViewFileFilter.input(preTxnList1[1]);
    await _ApprovalsPages.myVerificationAndReleasePage.fileList.selectFile(2);
    await _ApprovalsPages.myVerificationAndReleasePage.viewFileRejectBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(
      testData.MyApproval.rejectReason
    );
    //await ensure(_ApprovalsPages.myVerificationAndReleasePage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXRejectDialogSuccess() //has success message.
    ]);
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();

    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(viewFileSingleName);
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).isNotEmpty();

  });

  it("Reject All in View File For Release", async function () {
    let refList = [];
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if ("" !== releaseRejectAllName) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        releaseRejectAllName
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.fileList.selectFile(
      ..._selectFileCount
    );
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.fileVerifyBtn.click();

    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContains(testData.status.PendingApproval),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus2
      ).textContains(testData.status.PendingApproval)
    ]);
    //go to approve
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ("" !== releaseRejectAllName) {
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(
        releaseRejectAllName
      );
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(
      ..._selectFileCount
    );
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(
      testData.MyApproval.challengeResponse
    );
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus1
      ).textContains(testData.status.PendingRelease),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus2
      ).textContains(testData.status.PendingRelease)
    ]);
    //go to release
    await _ApprovalsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyRelease();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    if ("" !== releaseRejectAllName) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        releaseRejectAllName
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(releaseRejectAllName)
      .then(async data => {
        refList = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage.byFileFileNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForViewFile();
    await _ApprovalsPages.myVerificationAndReleasePage.viewRejectAllBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(
      testData.MyApproval.rejectReason
    );
    //await ensure(_ApprovalsPages.myVerificationAndReleasePage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXRejectDialogSuccess() //has success message.
    ]);
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();

    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(releaseRejectAllName);
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < refList.length; i++) {
      await ensure(_ApprovalsPages.uploadFilePage.viewFileRef).isVisible();
      await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
      await _ApprovalsPages.uploadFilePage.viewFileRef.input(refList[i]);
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
    }
  });

  it("Reject Single Transaction in View File For Release", async function () {
    let refList = [];
    //go to verify
    await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    if ("" !== releaseRejectSingleName) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        releaseRejectSingleName
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.fileList.selectFile(
      ..._selectFileCount
    );
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyVerificationByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.fileVerifyBtn.click();

    await _ApprovalsPages.myVerificationAndReleasePage.previewFileBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus1
      ).textContains(testData.status.PendingApproval),
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.completeTxnSatus2
      ).textContains(testData.status.PendingApproval)
    ]);
    //go to approve
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    if ("" !== releaseRejectSingleName) {
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(
        releaseRejectSingleName
      );
    } else {
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(
      ..._selectFileCount
    );
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(
      testData.MyApproval.challengeResponse
    );
    //await ensure( _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    //await devWatch();
    await Promise.all([
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage
      ).isUxSuccessSuccess(),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus1
      ).textContains(testData.status.PendingRelease),
      await ensure(
        _ApprovalsPages.paymentsTransactionsFilesPage.completeTxnSatus2
      ).textContains(testData.status.PendingRelease)
    ]);
    //go to release
    await _ApprovalsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyRelease();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    if ("" !== releaseRejectSingleName) {
      await ensure(
        _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files
      ).isVisible();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.clean();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Files.input(
        releaseRejectSingleName
      );
    } else {
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_ApprovalOption.select(
        testData.MyApproval.approvalOptionByFile
      );
      await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    }
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await _ApprovalsPages.myVerificationAndReleasePage
      .getListPaymentReferenceForReject(releaseRejectSingleName)
      .then(async data => {
        refList = data;
      });
    await _ApprovalsPages.myVerificationAndReleasePage.byFileFileNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForViewFile();
    await _ApprovalsPages.myVerificationAndReleasePage.ViewFileFilter.input(refList[0]);
    await _ApprovalsPages.myVerificationAndReleasePage.fileList.selectFile(..._selectFileCount);
    await _ApprovalsPages.myVerificationAndReleasePage.viewFileRejectBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(
      testData.MyApproval.rejectReason
    );
    //await ensure( _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    //await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForMyReleaseByFile();
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXRejectDialogSuccess() //has success message.
    ]);
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();

    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await _FilesPages.filemanagement_UploadFile.loadCondition();
    await ensure(_FilesPages.filemanagement_UploadFile.Filter).isVisible();
    await _FilesPages.filemanagement_UploadFile.Filter.clean();
    await _FilesPages.filemanagement_UploadFile.Filter.input(releaseRejectSingleName);
    await ensure(_FilesPages.ViewFilePage.FileNameLink).isElementPresent();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
    await _ApprovalsPages.uploadFilePage.viewFileRef.input(refList[0]);
    await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
    await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textIs(testData.status.Rejected);
  });
});
