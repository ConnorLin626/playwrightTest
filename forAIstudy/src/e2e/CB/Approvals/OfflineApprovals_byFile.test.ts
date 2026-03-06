/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages, PaymentsPages, SwitchToSubsiPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, SIT, handlerCase, devWatch } from "../../../lib";
import { browser } from "protractor";

let _switchToSubsiPages = new SwitchToSubsiPages();
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData.json');
let paymentType = "ALL - Universal File Format"
let fileName = '';
let _PaymentsPages = new PaymentsPages();

describe("Offline Approvals By File", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  // remove the old UI case
  // it("Approve Multiple Payment Select User Is In Group", async function () {
  //   let _selectTxnNum = [1, 2];
  //   let fileName = "";
  //   let paymentRefList = [];
  //   let _totalItems = 0;
  //   await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.MyApproval.SIT.fileNameByFile : testData.MyApproval.UAT.fileNameByFile, testData.MyApproval.approvalOptionByTxn).then(async data => {
  //     fileName = data;
  //   });
  //   // upload end

  //   await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
  //   if ('' !== fileName) {
  //     await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files).isVisible();
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileName);
  //   } else {
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApproval.approvalOptionByTxn);
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
  //   }
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
  //   // await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(1);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.showTxnButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.fileDetailsList.selectFileTxn(..._selectTxnNum);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForApprovePayment();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.groupApproverOption.select(testData.MyApproval.approverOption);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
  //   await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
  //   await Promise.all([
  //     await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUxSuccessSuccess() //has success message.
  //   ]);

  //   await _ApprovalsPages.paymentsTransactionsFilesPage.fileNameText.getText().then(async value => {
  //     fileName = value;
  //   });
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.completeTotalItems.getText().then(async items => {
  //     _totalItems = parseInt(items);
  //   });
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.getApproveTransactionRef(_totalItems).then(async list => {
  //     paymentRefList = list;
  //   });

  //   // await devWatch();
  //   await _ApprovalsPages.openMenu(Menu.Files.ManageFiles);
  //   await _ApprovalsPages.uploadFilePage.loadConditionForManageFilePage();
  //   await _ApprovalsPages.uploadFilePage.filter.click();
  //   await ensure(_ApprovalsPages.uploadFilePage.fileNameFilter).isVisible();
  //   await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
  //   await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
  //   await _ApprovalsPages.uploadFilePage.goButton.click();
  //   await _ApprovalsPages.uploadFilePage.loadConditionForManageFilePage();
  //   await ensure(_ApprovalsPages.uploadFilePage.fileNameLink).isElementPresent();
  //   await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
  //   await _ApprovalsPages.uploadFilePage.loadConditionForManageFilePage();
  //   for (let i = 0; i < paymentRefList.length; i++) {
  //     await _ApprovalsPages.uploadFilePage.filter.jsClick();
  //     await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileRef).isVisible();
  //     await _ApprovalsPages.uploadFilePage.I3ViewFileRef.clean();
  //     await _ApprovalsPages.uploadFilePage.I3ViewFileRef.input(
  //       paymentRefList[i]
  //     );
  //     await _ApprovalsPages.uploadFilePage.goButton.click();
  //     await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
  //     await Promise.all([
  //       await ensure(
  //         _ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus
  //       ).textContainsLessOne(testData.status.Approved,
  //         testData.status.PartialApproved,
  //         testData.status.PendingRelease,
  //         testData.status.Received,
  //         testData.status.BankRejected,
  //         testData.status.Completed)
  //     ]);
  //   }
  // });

  // it("Approve Multiple Payment Select User Is Not In Group", async function () {
  //   let _selectTxnNum = [1, 2];
  //   let fileName = "";
  //   let paymentRefList = [];
  //   let _totalItems = 0;
  //   await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.MyApproval.SIT.fileNameByFile : testData.MyApproval.UAT.fileNameByFile, testData.MyApproval.approvalOptionByTxn).then(async data => {
  //     fileName = data;
  //   });
  //   // upload end

  //   await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
  //   if ('' !== fileName) {
  //     await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files).isVisible();
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileName);
  //   } else {
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter.click();
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApproval.approvalOptionByTxn);
  //     await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
  //   }
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
  //   // await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(1);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.showTxnButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.fileDetailsList.selectFileTxn(..._selectTxnNum);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForApprovePayment();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.groupApproverOption.select(testData.MyApproval.approverOption1);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
  //   await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
  //   // await _ApprovalsPages.paymentsTransactionsFilesPage.hasUXErrorMsg('The transaction cannot be approved by the selected approver. Please select another approver.').then(value => {
  //   //   if (!value) {
  //   //     throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
  //   //   }
  //   // });
  // });

  // below for AB-9338
  it("FS upload confidential file by file then select user which without confidential access to approve ", async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, SIT ? testData.OfflineApproval.SIT.fileName : testData.OfflineApproval.UAT.fileName, testData.MyApproval.approvalOptionByFile).then(async data => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
    ]);
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.selectAllCheckBox.jsClick();;
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForApprovePayment();
    await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.OfflineApproval.SIT.loginUserIdwithoutConfidential : testData.OfflineApproval.UAT.loginUserIdwithoutConfidential)
    await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _PaymentsPages.AccountTransferPage.hasUXErrorMsg(testData.OfflineApproval.errorMsg).then(value => {
      if (!value) {
        throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
      }
    });
  });

  it("FS upload confidential file by file then select user which with confidential access to approve ", async function () {
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.selectAllCheckBox.jsClick();;
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForApprovePayment();
    await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.OfflineApproval.SIT.selectedApprover : testData.OfflineApproval.UAT.selectedApprover)
    await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(fileName);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.Approved)
    ]);
  });

  it("Check Pending Release status for confidential file which upload via FS", async function () {

    await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.MyApproval.approvalOptionByTxn).then(async data => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
    ]);
    // verify the file
    await new NavigatePages().loginCB(SIT ? testData.OfflineApproval.SIT.loginCompanyId : testData.OfflineApproval.UAT.loginCompanyId, SIT ? testData.OfflineApproval.SIT.selectedApprover : testData.OfflineApproval.UAT.selectedApprover)
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.selectAllCheckBox.jsClick();;
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
    //aprrove the file to change the status to pending release
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.selectAllCheckBox.jsClick();
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    // user with confidential access to login 
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.jsClick();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage.fileNameButton).textContains(fileName),
    ]);
    //use user without confidential access to login AUTOSG01U06
    await new NavigatePages().loginCB(SIT ? testData.OfflineApproval.SIT.loginCompanyId : testData.OfflineApproval.UAT.loginCompanyId, SIT ? testData.OfflineApproval.SIT.loginUserIdwithoutConfidential : testData.OfflineApproval.UAT.loginUserIdwithoutConfidential)
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byFileButton.jsClick();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage.labelNoInformationDisplay).textIs(testData.MyApproval.labelNoInformationDisplay)
    ]);
  });


  // Add for AB-9099: check offline approve file via user has (not) file approve access
  it('Offline Approve file via User Has(not) File - approve function', async function () {
    await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId)
    await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, SIT ? testData.OfflineApproval.SIT.fileName : testData.OfflineApproval.UAT.fileName, testData.OfflineApproval.approvalOptionByFile).then(async data => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    //let fileName="SG_OfflineApprovals_NUFF_SIT.txt-21031111275252";
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.selectAllCheckBox.jsClick();;
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForApprovePayment();
    //await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApproval.ModifyUserB);
    await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.jsClick();
    await _ApprovalsPages.paymentsTransactionsFilesPage.hasUXErrorMsg(testData.OfflineApproval.messageToApprove);
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApproval.ModifyUserA);
    await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.jsClick();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(fileName);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
    ]);
  })

  it("Offline Approve file via User Has(not) File - approve function at subsi company ", async function () {
    await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId)
    await _FilesPages.filemanagement_UploadFile.fsUpload3(_FilesPages, SIT ? testData.OfflineApproval.SIT.organisation : testData.OfflineApproval.UAT.organisation, paymentType, SIT ? testData.OfflineApproval.SIT.SubsifileName : testData.OfflineApproval.UAT.SubsifileName, testData.OfflineApproval.approvalOptionByFile).then(async (data) => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter.click();
    await _ApprovalsPages.myVerificationAndReleasePage.organisationSelect.select(SIT ? testData.OfflineApproval.SIT.organisation : testData.OfflineApproval.UAT.organisation);
    await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.myVerificationAndReleasePage.selectAllCheckBox.jsClick();;
    await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForApprovePayment();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApproval.ModifyUserA);
    await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.hasUXErrorMsg(testData.OfflineApproval.messageToApprove);
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApproval.ModifyUserB);
    await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(fileName);
    await _ApprovalsPages.transferCentersPage.transactionFilterButton.click();
    await _ApprovalsPages.transferCentersPage.transactionOrganisation.select(SIT ? testData.OfflineApproval.SIT.organisation : testData.OfflineApproval.UAT.organisation);
    await _ApprovalsPages.transferCentersPage.searchButton.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
    ]);
  })

});
