/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, SIT, handlerCase } from "../../../lib";
import { browser } from "protractor";

let groupName = '';
let reference = '';
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData.json');
let fileName = "";

let createNewGroup = async function () {
  let index = 10;
  await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
  await _ApprovalsPages.transferCentersPage.loadCondition();
  await _ApprovalsPages.transferCentersPage.showAdditionFilter.click();
  await _ApprovalsPages.transferCentersPage.transactionStatusList.select(testData.status.PendingApproval);
  // FS Part already upload many txn via By Transaction,search these txn to group
  if (SIT) {
    fileName = testData.FileService.SIT.fileNameForALL.split('/').pop();
  } else {
    fileName = testData.FileService.UAT.fileNameForALL.split('/').pop();
  }
  console.error("FileNameToMyApprovalGroup:" + fileName);
  await _ApprovalsPages.transferCentersPage.fileNameFileter.clean();
  await _ApprovalsPages.transferCentersPage.fileNameFileter.input(fileName);
  await _ApprovalsPages.transferCentersPage.searchButton.click();
  await _ApprovalsPages.transferCentersPage.loadCondition();
  await _ApprovalsPages.transferCentersPage.getFirstCheckBox(10).then(data => {
    index = data + 1;
  });
  await _ApprovalsPages.transferCentersPage.transactionList.select(index);
  // await _ApprovalsPages.transferCentersPage.transferCenterSelectButton.click();
  await _ApprovalsPages.transferCentersPage.createGroupButton.click();
  await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
  await _ApprovalsPages.transferCentersPage.groupCreateButton.click();
  await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
};

describe("My Approvals By Group", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Approve Group in the My Approval List", async function () {
    let _selectGroupCount = [1];

    await createNewGroup();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByGroup();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupList.selectFile(..._selectGroupCount);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForPreviewApproval();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it("Reject Group in the My Approval List", async function () {
    let _selectFileCount = [1];

    await createNewGroup();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByGroup();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupList.selectFile(..._selectFileCount);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupRejectButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXRejectDialogSuccess();
    await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textIs(testData.status.Rejected),
    ]);
  });

  it("Approve All in the View Group Page", async function () {

    await createNewGroup();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByGroup();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.click();
    await _ApprovalsPages.transferCentersPage.groupApproveAllButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
    await _ApprovalsPages.transferCentersPage.groupApproveAllButton.jsClick();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it("Offline Approve in the View Group Page", async function () {

    await createNewGroup();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByGroup();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.click();
    await _ApprovalsPages.transferCentersPage.groupApproveAllButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupApproverOption.select(testData.MyApproval.approverOption);
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
    await _ApprovalsPages.transferCentersPage.groupApproveAllButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it("Reject All in the View Group Page", async function () {

    await createNewGroup();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByGroup();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.click();
    await _ApprovalsPages.transferCentersPage.groupRejectAllButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
    await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textIs(testData.status.Rejected),
    ]);
  });

  it("Reject transaction in the View Group Page", async function () {
    let _selectGroupCount = [1];

    await createNewGroup();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByGroup();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupList.selectFile(..._selectGroupCount);
    await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.transferCentersPage.groupRejectButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
    await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await _ApprovalsPages.transferCentersPage.viewGroupFilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.viewGroupListStatus).textIs(testData.status.Rejected),
    ]);
  });

  it("Remove transaction in the View Group Page", async function () {
    let _selectGroupCount = [1];

    await createNewGroup();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByGroup();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupNameRef.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupList.selectFile(..._selectGroupCount);
    await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.transferCentersPage.groupRemoveButton.click();
    await _ApprovalsPages.transferCentersPage.removeDialogButton.click();
    await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
    await _ApprovalsPages.transferCentersPage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.paymentsTransactionsFilesPage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.loadOfflineGroup();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.labelNoInformationDisplay).textIs(testData.MyApproval.labelNoInformationDisplay),
    ]);
  });
});