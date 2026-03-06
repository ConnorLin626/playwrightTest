/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, PaymentsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, SIT, handlerCase } from "../../../lib";
import { browser } from "protractor";

let groupName = '';
let reference = '';
let _selectGroupCount = [1];
let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData.json');

let createNewGroup = async function () {
  await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
  await _PaymentsPages.AccountTransferPage.loadCondition();
  await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
  await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
  await _PaymentsPages.AccountTransferPage.newPayeeTab.jsClick();
  await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank SINGAPORE');
  await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
  await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
  await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
  await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
  await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
  await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
  await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
  await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
  await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
  await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
  await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
  await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
  await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
  await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
  await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
  await _PaymentsPages.AccountTransferPage.nextButton.click();
  await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
  await _PaymentsPages.AccountTransferPage.submitButton.click();
  await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
  await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
    reference = text;
  });
  await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
  await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
  await _ApprovalsPages.transferCentersPage.loadCondition();
  await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
  await _ApprovalsPages.transferCentersPage.transferCenterSelectButton.click();
  await _ApprovalsPages.transferCentersPage.createGroupButton.click();
  await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
  await _ApprovalsPages.transferCentersPage.groupCreateButton.click();
  await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
};

let createNewGroupWithExisting = async function () {
  await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
  await _PaymentsPages.AccountTransferPage.loadCondition();
  await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
  await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
  await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
  await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
  await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
  await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
  await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
  await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
  await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
  await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
  await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
  await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
  await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
  await _PaymentsPages.AccountTransferPage.nextButton.click();
  await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
  await _PaymentsPages.AccountTransferPage.submitButton.click();
  await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
  await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
    reference = text;
  });
  await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
  await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
  await _ApprovalsPages.transferCentersPage.loadCondition();
  await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
  await _ApprovalsPages.transferCentersPage.transferCenterSelectButton.click();
  await _ApprovalsPages.transferCentersPage.createGroupButton.click();
  await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
  await _ApprovalsPages.transferCentersPage.groupCreateButton.click();
  await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
};

export async function verifyGroupInVerifyList() {
  await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
  await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
  await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
  await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByGroup();
  await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
    groupName = text.trim();
  });
  await _ApprovalsPages.myVerificationAndReleasePage.groupList.selectFile(..._selectGroupCount);
  await _ApprovalsPages.myVerificationAndReleasePage.groupVerifyButton.click();
  await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForPrivewVerifyGroupPage();
  await _ApprovalsPages.myVerificationAndReleasePage.PreviewVerifyReleaseButton.click();
  await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
};

export async function approvalGroupInApprovalList() {
  await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
  await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
  await _ApprovalsPages.paymentsTransactionsFilesPage.byGroupButton.click();
  await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByGroup();
  await _ApprovalsPages.paymentsTransactionsFilesPage.GroupFilter.input(groupName);
  await _ApprovalsPages.paymentsTransactionsFilesPage.groupList.selectFile(..._selectGroupCount);
  await _ApprovalsPages.paymentsTransactionsFilesPage.groupApproveButton.click();
  await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForPreviewApproval();
  // await _ApprovalsPages.myVerificationAndReleasePage.getChallengeSMS.clickIfExist();
  await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
  await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
  await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
};

export async function releaseGroupInReleaseList() {
  await _PaymentsPages.openMenu(Menu.Approvals.Releases);
  await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
  await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
  await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByGroup();
  await _ApprovalsPages.myVerificationAndReleasePage.GroupFilter.input(groupName);
  await _ApprovalsPages.myVerificationAndReleasePage.groupList.selectFile(..._selectGroupCount);
  await _ApprovalsPages.myVerificationAndReleasePage.groupReleaseButton.click();
  await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForPrivewReleaseGroupPage();
  await _ApprovalsPages.myVerificationAndReleasePage.PreviewVerifyReleaseButton.click();
  await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForCompletedPage();
};

describe("My Verify-Release By Group", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Verify Group in the My Verification List", async function () {

    await createNewGroup();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await verifyGroupInVerifyList();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.PendingApproval)
    ]);
  });

  it("Release Group in the My Release List", async function () {
    await approvalGroupInApprovalList();
    await releaseGroupInReleaseList();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it("Reject Group in the My Verification List", async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewGroup();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByGroup();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.groupList.selectFile(..._selectGroupCount);
    await _ApprovalsPages.myVerificationAndReleasePage.groupRejectButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXRejectDialogSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Rejected)
    ]);
  });

  it("Reject Group in the My Release List", async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewGroup();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await verifyGroupInVerifyList();
    await approvalGroupInApprovalList();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByGroup();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.groupList.selectFile(..._selectGroupCount);
    await _ApprovalsPages.myVerificationAndReleasePage.groupRejectButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXRejectDialogSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Rejected)
    ]);
  });

  it("Verify all in verifications view group page", async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewGroup();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByGroup();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseAllButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textIs(testData.status.PendingApproval),
    ]);
  });

  it("Release all in releases view group page", async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewGroup();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await verifyGroupInVerifyList();
    await approvalGroupInApprovalList();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByGroup();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseAllButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

  it("Reject all in verification view group page", async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewGroupWithExisting();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByGroup();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.click();
    await _ApprovalsPages.transferCentersPage.groupRejectAllButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textIs(testData.status.Rejected),
    ]);
  });

  it("Reject all in releases view group page", async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewGroupWithExisting();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await verifyGroupInVerifyList();
    await approvalGroupInApprovalList();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByGroup();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.click();
    await _ApprovalsPages.transferCentersPage.groupRejectAllButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textIs(testData.status.Rejected),
    ]);
  });

  it("Reject transaction in verification view group page", async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewGroup();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByGroup();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.groupList.selectFile(..._selectGroupCount);
    await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.transferCentersPage.groupRejectButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await _ApprovalsPages.transferCentersPage.viewGroupFilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.viewGroupListStatus).textIs(testData.status.Rejected),
    ]);
  });

  it("Reject transaction in releases view group page", async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewGroup();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await verifyGroupInVerifyList();
    await approvalGroupInApprovalList();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByGroup();
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
      groupName = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.byGroupNameRef.click();
    await _ApprovalsPages.myVerificationAndReleasePage.groupList.selectFile(..._selectGroupCount);
    await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.transferCentersPage.groupRejectButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.myVerificationAndReleasePage.groupButton.click();
    await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
    await _ApprovalsPages.transferCentersPage.groupNameLink.click();
    await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
    await _ApprovalsPages.transferCentersPage.viewGroupFilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.viewGroupListStatus).textIs(testData.status.Rejected),
    ]);
  });
});