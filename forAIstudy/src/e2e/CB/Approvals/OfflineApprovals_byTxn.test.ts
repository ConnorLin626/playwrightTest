/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase, devWatch } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let referenceArray = [];
let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('SG_testData.json');
let fileName = '';
let paymentType = "ALL - Universal File Format"

describe('Offline Approvals By Transaction', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  //remove old UI case
  // it('Offline Approve Multiple Payments Select User Is In Group', async function () {
  //   // upload File start
  //   await _FilesPages.uploadFilePage.fsUpload(
  //     _FilesPages,
  //     testData.MyApproval.fileType,
  //     testData.MyApproval.fileFormat,
  //     SIT ? testData.MyApproval.SIT.fileNameByTxn : testData.MyApproval.UAT.fileNameByTxn,
  //     testData.MyApproval.approvalOptionByTxn
  //   ).then(async data => {
  //     fileName = data;
  //   });
  //   // upload File end
  //   await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1, 2);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
  //     referenceArray.push(text.trim());
  //   });
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference1.getText().then(text => {
  //     referenceArray.push(text.trim());
  //   });
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.groupApproverOption.select(testData.MyApproval.approverOption);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
  //   await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
  //   await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
  //   await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
  //   await _ApprovalsPages.transferCentersPage.loadCondition();
  //   await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[0]);
  //   await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(
  //     testData.status.Approved,
  //     testData.status.PartialApproved,
  //     testData.status.PendingRelease,
  //     testData.status.Received,
  //     testData.status.BankRejected,
  //     testData.status.Completed
  //   );
  //   await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
  //   await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[1]);
  //   await Promise.all([
  //     await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(
  //       testData.status.Approved,
  //       testData.status.PartialApproved,
  //       testData.status.PendingRelease,
  //       testData.status.Received,
  //       testData.status.BankRejected,
  //       testData.status.Completed
  //     )
  //   ]);
  // });

  // it('Offline Approve Multiple Payments Select User Is Not In Group', async function () {
  //   await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1, 2);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
  //     referenceArray.push(text.trim());
  //   });
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference1.getText().then(text => {
  //     referenceArray.push(text.trim());
  //   });
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.groupApproverOption.select(testData.MyApproval.approverOption1);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
  //   await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
  //   await _ApprovalsPages.paymentsTransactionsFilesPage.hasUXErrorMsg('The transaction cannot be approved by the selected approver. Please select another approver.').then(value => {
  //     if (!value) {
  //       throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
  //     }
  //   });
  // });

  // below for AB-9338
  it('Upload a confidential file which with Pending Verification status', async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.MyApproval.approvalOptionByTxn).then(async data => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
    ]);
    //use user without confidential access to login AUTOSG01U06
    await new NavigatePages().loginCB(SIT ? testData.OfflineApproval.SIT.loginCompanyId : testData.OfflineApproval.UAT.loginCompanyId, SIT ? testData.OfflineApproval.SIT.loginUserIdwithoutConfidential : testData.OfflineApproval.UAT.loginUserIdwithoutConfidential)
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage.labelNoInformationDisplay).textIs(testData.MyApproval.labelNoInformationDisplay)
    ]);

    //use user with confidential access to login AUTOSG01R04
    await new NavigatePages().loginCB(SIT ? testData.OfflineApproval.SIT.loginCompanyId : testData.OfflineApproval.UAT.loginCompanyId, SIT ? testData.OfflineApproval.SIT.selectedApprover : testData.OfflineApproval.UAT.selectedApprover)
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await Promise.all([
      await ensure(_ApprovalsPages.myVerificationAndReleasePage.transactionList).isNotEmpty(),
    ]);
    await _ApprovalsPages.myVerificationAndReleasePage.selectAllCheckBox.jsClick();;
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
    await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
    await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(fileName);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
    ]);
  });

  it('Offline Approve confidential file select user without confidential access to approve ', async function () {
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.jsClick();
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.OfflineApproval.SIT.loginUserIdwithoutConfidential : testData.OfflineApproval.UAT.loginUserIdwithoutConfidential)
    await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
    await _PaymentsPages.AccountTransferPage.approveButton.click();
    await _PaymentsPages.AccountTransferPage.hasUXErrorMsg(testData.OfflineApproval.errorMsg).then(value => {
      if (!value) {
        throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
      }
    });
  });

  it('Offline Approve normal file select user without confidential access to approve ', async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.OfflineApproval.SIT.fileName : testData.OfflineApproval.UAT.fileName, testData.MyApproval.approvalOptionByTxn).then(async data => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
    ]);
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.jsClick();
    await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.OfflineApproval.SIT.loginUserIdwithoutConfidential : testData.OfflineApproval.UAT.loginUserIdwithoutConfidential)
    await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_PaymentsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

  it('Offline Approve normal file select user with confidential access to approve ', async function () {
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(fileName);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.jsClick();
    await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.MyApproval.approverOption)
    await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_PaymentsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

  // Add for AB-9099: check offline approve payment via user has (not) payment approve access
  it('Offline Approve Payment Select User Has(not) payment approve access ', async function () {
    await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId);
    await CreatNewBulkPayment();
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(reference);
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.jsClick();
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApproval.ModifyUserA);
    await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _ApprovalsPages.AccountTransferPage.hasUXErrorMsg(testData.OfflineApproval.messageToApprove);
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApproval.ModifyUserB);
    await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
      reference = text;
    });
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_PaymentsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

  it('Offline Approve Payment Select User Has(not) payment approve access at subsi company ', async function () {
    await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId);
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.OfflineApproval.SIT.SubsiAccount : testData.OfflineApproval.UAT.SubsiAccount);
    await _PaymentsPages.BulkPaymentpage.newPayee.jsClick();
    await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.payeeName);
    await _PaymentsPages.BulkPaymentpage.payeeBankID.select(testData.BulkPayment.payeeBankID)
    await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.accountNumber);
    await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA1);
    await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.payeeRef);
    await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.BulkPayment.paymentDetails);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      reference = text;
    });
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprove);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(reference);
    await _ApprovalsPages.myVerificationAndReleasePage.showAddFilter.click();
    await _ApprovalsPages.myVerificationAndReleasePage.organisationSelect.select(SIT ? testData.OfflineApproval.SIT.organisation : testData.OfflineApproval.UAT.organisation);
    await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.jsClick();
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApproval.ModifyUserB);
    await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _ApprovalsPages.AccountTransferPage.hasUXErrorMsg(testData.OfflineApproval.messageToApprove);
    await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApproval.ModifyUserA);
    await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
    await _ApprovalsPages.AccountTransferPage.approveButton.click();
    await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
      reference = text;
    });
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
    await _ApprovalsPages.transferCentersPage.transactionFilterButton.click();
    await _ApprovalsPages.transferCentersPage.transactionOrganisation.select(SIT ? testData.OfflineApproval.SIT.organisation : testData.OfflineApproval.UAT.organisation);
    await _ApprovalsPages.transferCentersPage.searchButton.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await Promise.all([
      await ensure(_PaymentsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

});


export async function CreatNewBulkPayment() {
  await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
  await _PaymentsPages.BulkPaymentpage.loadCondition();
  await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
  await addNewPayee();
  await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA1);
  await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.payeeRef);
  await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
  await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.BulkPayment.paymentDetails);
  await _PaymentsPages.BulkPaymentpage.nextButton.click();
  await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
  await _PaymentsPages.BulkPaymentpage.submitButton.click();
  await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
  await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
    reference = text;
  });
}

export async function addNewPayee() {
  await _PaymentsPages.BulkPaymentpage.newPayee.jsClick();
  await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.payeeName);
  await _PaymentsPages.BulkPaymentpage.payeeBankID.select(testData.BulkPayment.payeeBankID)
  await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.accountNumber);
  await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
}