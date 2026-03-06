/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, PaymentsPages } from "../../../pages/CB";
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let referenceArray = [];
let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData.json');

let createNewTransaction = async function () {
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
  await _PaymentsPages.AccountTransferPage.nextButton.jsClick();
  await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
  await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty();
  await _PaymentsPages.AccountTransferPage.submitButton.jsClick();
  await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
  await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
    reference = text;
  });
  await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
};

describe('My Verify-Release By Transaction', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Verify a Single Payment', async function () {
    await createNewTransaction();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
    ]);
  });

  it('Release a Single Payment', async function () {
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(reference);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    // await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.txnReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it('Verify Multiple Payment', async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewTransaction();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await createNewTransaction();
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1, 2);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
      referenceArray.push(text.trim());
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference1.getText().then(text => {
      referenceArray.push(text.trim());
    });
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[0]);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
    ]);
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[1]);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
    ]);
  });

  it('Release Multiple Payment', async function () {
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(referenceArray[0]);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(referenceArray[1]);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    // await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(referenceArray[0]);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.clean();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(referenceArray[1]);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
    await _ApprovalsPages.myVerificationAndReleasePage.txnReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[0]);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
    ]);
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[1]);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it('Reject a Single Verify Payment', async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewTransaction();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.rejectButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(testData.MyApproval.rejectReason);
    //await ensure(_ApprovalsPages.myVerificationAndReleasePage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
    ]);
  });

  it('Reject a Single Release Payment', async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewTransaction();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(reference);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    // await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess();
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(reference);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.reasonForRejection.input(testData.MyApproval.rejectReason);
    //await ensure(_ApprovalsPages.myVerificationAndReleasePage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.myVerificationAndReleasePage.rejectDialogButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
    ]);
  });

  it('Verify Payment In View page', async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewTransaction();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(reference);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
    ]);
  });

  it('Release Payment In View page', async function () {
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(reference);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    // await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess();
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(reference);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it('Reject Payment In Verify View page', async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewTransaction();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(reference);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
    await _PaymentsPages.AccountTransferPage.rejectButton.click();
    await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.AccountTransfer.rejectReason);
    await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
    await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
    await _PaymentsPages.AccountTransferPage.dismissButton.click();
    //await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
    ]);
  });

  it('Reject Payment In Release View page', async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId);
    await createNewTransaction();
    await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(reference);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(reference);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    // await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
  //await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess();
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _PaymentsPages.openMenu(Menu.Approvals.Releases);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(reference);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
    await _PaymentsPages.AccountTransferPage.rejectButton.click();
    await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.AccountTransfer.rejectReason);
    await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
    await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
    await _PaymentsPages.AccountTransferPage.dismissButton.click();
    //await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
    ]);
  });
});