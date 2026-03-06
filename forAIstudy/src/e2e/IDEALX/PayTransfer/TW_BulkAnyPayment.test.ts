/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages, FilesPages } from "../../../pages/IDEALX";
import { SIT, handlerCase, PROJECT_TYPE, ensure } from "../../../lib";
import { browser } from 'protractor';

let fileName = '';
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');

describe('TW Bulk AnyPayment ', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkAnyPayment.SIT.loginCompanyId : testData.BulkAnyPayment.UAT.loginCompanyId, SIT ? testData.BulkAnyPayment.SIT.loginUserId : testData.BulkAnyPayment.UAT.loginUserId, SIT ? 123123 : testData.BulkAnyPayment.UAT.Password); });
  const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

  it('File upload TW Bulk anyPayment', async function () {
    await _FilesPages.uploadFilePage.filesMenu.click();
    // upload File start
    await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.BulkAnyPayment.SIT.fileName : testData.BulkAnyPayment.UAT.fileName, testData.BulkAnyPayment.approvalOptionByTransaction).then(async (data) => {
      fileName = data;
    });
    // upload File end
    // go to Transfer Center
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
    await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    await checkViewBulkAnyPageAllField();
  });

  it('Approval txn in the view page', async function () {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
    await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    await _PaymentsPages.BulkPaymentPage.approveButton.jsClick();
    await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
    await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkAnyPayment.challengeResponse);
    await _PaymentsPages.BulkPaymentPage.loadConditionforApprovalSection();
    await _PaymentsPages.BulkPaymentPage.approveButton.click();
    await browser.sleep(1000); //wait for response
    await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
    await _PaymentsPages.BulkPaymentPage.dismissButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(fileName);
    await Promise.all([
      await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
    ]);
  });

  it('Reject txn in the view page', async function () {

    await _FilesPages.uploadFilePage.filesMenu.click();
    // upload File start
    await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.BulkAnyPayment.SIT.fileName : testData.BulkAnyPayment.UAT.fileName, testData.BulkAnyPayment.approvalOptionByTransaction).then(async (data) => {
      fileName = data;
    });
    // upload File end
    // go to Transfer Center
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
    await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
    await _PaymentsPages.BulkPaymentPage.reasonForRejection.input(testData.eACHBulkPayment.rejectReason);
    await _PaymentsPages.BulkPaymentPage.rejectDialogButton.jsClick();
    await _PaymentsPages.BulkPaymentPage.dismissButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
    await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus).textContains(testData.status.Rejected)
    ]);
  });

  it('Offline Approval txn in the offline approval by file list', async function () {

    await _FilesPages.uploadFilePage.filesMenu.click();
    // upload File start
    await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.BulkAnyPayment.SIT.fileName : testData.BulkAnyPayment.UAT.fileName, testData.BulkAnyPayment.approvalOptionByTransaction).then(async (data) => {
      fileName = data;
    });
    // upload File end
    // go to Transfer Center
    await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    await _ApprovalsPages.ApprovalPage.loadCondition();
    await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
    await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineByFile.click();
    await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    await _ApprovalsPages.ApprovalPage.filter.input(fileName);
    await _ApprovalsPages.MyVerificationAndReleasePage.selectAllCheckBox.jsClick();;
    await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
    await _ApprovalsPages.ApprovalPage.loadConditionForApprovePayment();
    await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.BulkAnyPayment.SIT.verifyUserId : testData.BulkAnyPayment.UAT.verifyUserId)
    await _PaymentsPages.HVTPaymentPage.getChallengeButton.clickIfExist();
    await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.BulkAnyPayment.challengeResponse);
    await _ApprovalsPages.ApprovalPage.approveButton.click();
    await _ApprovalsPages.ApprovalPage.finishButton.jsClick();
    await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(fileName);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.Approved)
    ]);

  });

  it('Reject  txn in the my approval by file list', async function () {
    await _FilesPages.uploadFilePage.filesMenu.click();
    // upload File start
    await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.BulkAnyPayment.SIT.fileName : testData.BulkAnyPayment.UAT.fileName, testData.BulkAnyPayment.approvalOptionByTransaction).then(async (data) => {
      fileName = data;
    });
    // upload File end
    // go to Transfer Center
    let _selectFileCount = [1];
    await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    await _ApprovalsPages.ApprovalPage.loadCondition();
    await _ApprovalsPages.ApprovalPage.byFileButton.click();
    await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    await ensure(_ApprovalsPages.ApprovalPage.filter).isVisible();
    await _ApprovalsPages.ApprovalPage.filter.clean();
    await _ApprovalsPages.ApprovalPage.filter.input(fileName);
    await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(..._selectFileCount);
    await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    await _ApprovalsPages.ApprovalPage.fileRejectBtn.jsClick();
    await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.BulkAnyPayment.rejectReason);
    await _ApprovalsPages.ApprovalPage.rejectDialogButton.jsClick();
    await _ApprovalsPages.ApprovalPage.dismissButton.click();
    await _ApprovalsPages.uploadFilePage.filesMenu.click();
    await _ApprovalsPages.uploadFilePage.loadCondition();
    await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
    await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
    await _ApprovalsPages.uploadFilePage.refresh.jsClick();
    await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await ensure(
      _ApprovalsPages.uploadFilePage.viewFileStatus).textIs(testData.status.Rejected);
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
    await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus).textContains(testData.status.Rejected)
    ]);
  });
});


export async function checkViewBulkAnyPageAllField() {
  await Promise.all([
    await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
    await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.BulkAnyPayment.paymentTypeValue),
    await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkAnyPayment.SIT.fromAccount : testData.BulkAnyPayment.UAT.fromAccount),
    await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(testData.BulkAnyPayment.amount),
    await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(testData.BulkAnyPayment.bankChargeThey),
    await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
    await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
    await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
    await ensure(_PaymentsPages.BulkPaymentPage.billerServiceIDValue).textContains(testData.BulkAnyPayment.billerServiceID),
    //Payee
    await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.BulkAnyPayment.ExistingPayee),
    await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(SIT ? testData.BulkAnyPayment.SIT.payeeBankID : testData.BulkAnyPayment.UAT.payeeBankID),
    await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.BulkAnyPayment.accountNumber),
    await ensure(_PaymentsPages.BulkPaymentPage.nationalId_0).textContains(testData.BulkAnyPayment.nationalIDValue),
    await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
    await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkAnyPayment.amount),
    await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
    await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(testData.BulkAnyPayment.MandatedetailsValue),
    await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains(testData.BulkAnyPayment.CompanyStockCodeValue),
    await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.BulkAnyPayment.messageValue),
    await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkAnyPayment.emailIdO),
    await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkAnyPayment.emailId2),
    await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkAnyPayment.emailId3),
    await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkAnyPayment.emailId4),
    await ensure(_PaymentsPages.eACHPaymentPage.nextApprover).isNotEmpty(),
    await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create")
  ]);
}
