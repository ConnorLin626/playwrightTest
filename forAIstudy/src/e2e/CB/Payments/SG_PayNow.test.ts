/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages, ReportsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from "../../../lib";
import * as constVal from '../../../pages/CB/Payments/constantValue';
import * as moment from "moment";
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();

let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let reference: string = null;
let bulkPayNowReference: string = null;
let fileName: string = null;

describe('SG PayNow Payment', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.payNowPayment.SIT.login.loginCompanyId : testData.payNowPayment.UAT.login.loginCompanyId,
      SIT ? testData.payNowPayment.SIT.login.loginUserId : testData.payNowPayment.UAT.login.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Create PayNow FAST with Existing Payee', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
    await _PaymentsPages.SGPayNowPage.loadCondition();
    await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
    await _PaymentsPages.SGPayNowPage.amount.input(testData.payNowPayment.amount);
    await _PaymentsPages.SGPayNowPage.addExistingPayNow4Single(SIT ? testData.payNowPayment.SIT.exsitingPayeeName : testData.payNowPayment.UAT.exsitingPayeeName);
    await _PaymentsPages.SGPayNowPage.purposeCode.select(testData.payNowPayment.purposeCode);
    await _PaymentsPages.SGPayNowPage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.SGPayNowPage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.SGPayNowPage.getInfoReferenceID().then((data) => {
      reference = data;
      console.log('Reference of Create PayNow FAST with Existing Payee:', reference);
    });
    await ensure(_PaymentsPages.SGPayNowPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();

    await Promise.all([
      await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
      await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.payNowPayment.amount),
      await ensure(_PaymentsPages.SGPayNowPage.payNowPayeeNameViewSinglePayment).textContains(testData.payNowPayment.proxyTypeMobNum),
      await ensure(_PaymentsPages.SGPayNowPage.statusLableViewSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
      await ensure(_PaymentsPages.SGPayNowPage.paymentDateViewSinglePayment).isNotEmpty(),
    ]);
  });

  it('Approve PayNow FAST with Existing Payee', async function () {

    await approveSinglePaymentAndCheckApproved(reference);

  });

  it('Create PayNow FAST with New Payee', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
    await _PaymentsPages.SGPayNowPage.loadCondition();
    await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
    await _PaymentsPages.SGPayNowPage.amount.input(testData.payNowPayment.amount);
    await _PaymentsPages.SGPayNowPage.addNewPayNow4Single(constVal.payNowTypeCodeMap.M, testData.payNowPayment.proxyTypeMobNum, testData.payNowPayment.proxyTypeMobNumCountry);
    //    await _PaymentsPages.SGPayNowPage.addNewPayNow4Single(constVal.payNowTypeCodeMap.U, testData.payNowPayment.proxyTypeCmpnyIde);
    //    await _PaymentsPages.SGPayNowPage.addNewPayNow4Single(constVal.payNowTypeCodeMap.N, testData.payNowPayment.proxyTypeNF);
    await _PaymentsPages.SGPayNowPage.purposeCode.select(testData.payNowPayment.purposeCode);
    await _PaymentsPages.SGPayNowPage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.SGPayNowPage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.SGPayNowPage.getInfoReferenceID().then((data) => {
      reference = data;
      console.log('Reference of Create PayNow FAST with New Payee:', reference);
    });
    await ensure(_PaymentsPages.SGPayNowPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();

    await Promise.all([
      await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
      await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.payNowPayment.amount),
      await ensure(_PaymentsPages.SGPayNowPage.newPayNowPayeeNameViewSinglePayment).textContains(testData.payNowPayment.proxyTypeMobNum),
      await ensure(_PaymentsPages.SGPayNowPage.statusLableViewSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
      await ensure(_PaymentsPages.SGPayNowPage.paymentDateViewSinglePayment).isNotEmpty(),
    ]);
  });

  it('Approve PayNow FAST with New Payee', async function () {

    await approveSinglePaymentAndCheckApproved(reference);

  });

  it('Upload PayNow FAST via FS', async function () {

    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.payNowPayment.SIT.fileService.fileName : testData.payNowPayment.UAT.fileService.fileName, "By transaction amount").then(async (data) => {
      fileName = data;
    });
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
    await Promise.all([
      await ensure(_PaymentsPages.SGPayNowPage.fromAccount_ViewUploadSinglePayment).isNotEmpty(),
      await ensure(_PaymentsPages.SGPayNowPage.amount_ViewUploadSinglePayment).isNotEmpty(),
      await ensure(_PaymentsPages.SGPayNowPage.payeeName_ViewUploadSinglePayment).isNotEmpty(),
      await ensure(_PaymentsPages.SGPayNowPage.status_ViewUploadSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
      await ensure(_PaymentsPages.SGPayNowPage.cutoff_ViewUploadSinglePaymentOldUI).isNotEmpty(),
    ]);

  });

  it('Approve PayNow FAST via FS', async function () {

    await _PaymentsPages.crossBoarderACHPage.goToMyApprovalByFileViewFile(fileName);
    await _ApprovalsPages.paymentsTransactionsFilesPage.viewFileApproveAll.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.CrossBorder.responseCode);
    await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4MyApprovalCompleted();
    await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.myApproveFileStatus).textIs(constVal.statusLabelMap.Approved),
    ]);

  });

  it('Create PayNow GIRO with New Payee', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
    await _PaymentsPages.SGPayNowPage.loadCondition();
    await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
    await _PaymentsPages.SGPayNowPage.amount.input(testData.payNowPayment.amount);
    await _PaymentsPages.SGPayNowPage.addNewPayNow4Single(constVal.payNowTypeCodeMap.M, testData.payNowPayment.proxyTypeMobNum, testData.payNowPayment.proxyTypeMobNumCountry);
    await _PaymentsPages.SGPayNowPage.choseDateRadioButton.jsClick();
    await _PaymentsPages.SGPayNowPage.nextDateTypeRadioButton.jsClick();
    await _PaymentsPages.SGPayNowPage.purposeCode.select(testData.payNowPayment.purposeCode);
    await _PaymentsPages.SGPayNowPage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.SGPayNowPage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.SGPayNowPage.getInfoReferenceID().then((data) => {
      reference = data;
      console.log('Reference of Create PayNow GIRO with New Payee:', reference);
    });
    await ensure(_PaymentsPages.SGPayNowPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();

    await Promise.all([
      await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
      await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.payNowPayment.amount),
      await ensure(_PaymentsPages.SGPayNowPage.newPayNowPayeeNameViewSinglePayment).textContains(testData.payNowPayment.proxyTypeMobNum),
      await ensure(_PaymentsPages.SGPayNowPage.statusLableViewSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
      await ensure(_PaymentsPages.SGPayNowPage.paymentDateViewSinglePayment).isNotEmpty(),
    ]);
  });

  it('Approve PayNow GIRO with New Payee', async function () {

    await approveSinglePaymentAndCheckApproved(reference);

  });

  it('Upload PayNow GIRO via FS--By File', async function () {

    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.payNowPayment.SIT.fileService.fileNameGIRO : testData.payNowPayment.UAT.fileService.fileNameGIRO, SIT ? testData.payNowPayment.SIT.fileService.approvalCurrency : testData.payNowPayment.UAT.fileService.approvalCurrency).then(async (data) => {
      fileName = data;
    });
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);

    await Promise.all([
      await ensure(_PaymentsPages.SGPayNowPage.fromAccount_ViewUploadSinglePayment).isNotEmpty(),
      await ensure(_PaymentsPages.SGPayNowPage.amount_ViewUploadSinglePayment).isNotEmpty(),
      await ensure(_PaymentsPages.SGPayNowPage.payeeName_ViewUploadSinglePayment).isNotEmpty(),
      await ensure(_PaymentsPages.SGPayNowPage.status_ViewUploadSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
      await ensure(_PaymentsPages.SGPayNowPage.cutoff_ViewUploadSinglePaymentOldUI).isNotEmpty(),
    ]);
  });

  it('Approve PayNow GIRO via FS--By File', async function () {

    await _PaymentsPages.crossBoarderACHPage.goToMyApprovalByFileViewFile(fileName);
    await _ApprovalsPages.paymentsTransactionsFilesPage.viewFileApproveAll.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.CrossBorder.responseCode);
    await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4MyApprovalCompleted();
    await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.myApproveFileStatus).textIs(constVal.statusLabelMap.Approved),
    ]);
  });

  it('Create PayNow Bulk Payment with Existing Payee', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
    await _PaymentsPages.SGPayNowPage.addExistingPayNow4Bulk(SIT ? testData.payNowPayment.SIT.exsitingPayeeName : testData.payNowPayment.UAT.exsitingPayeeName);
    await _PaymentsPages.SGPayNowPage.loadCondition4PayNowExistingPayee();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.payNowPayment.amount);
    await _PaymentsPages.SGPayNowPage.loadCondition4PayNowExistingPayee();
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage;
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      bulkPayNowReference = text;
      console.log('Reference of Create PayNow Bulk Payment with Existing Payee:', bulkPayNowReference);
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(bulkPayNowReference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewPayNowBulkPayment();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.payNowPayment.amount),
      await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(SIT ? testData.payNowPayment.SIT.exsitingPayeeName : testData.payNowPayment.UAT.exsitingPayeeName),
      await ensure(_PaymentsPages.SGPayNowPage.statusLableViewPayNowBulkPayment).textIs(constVal.statusLabelMap.PendingApproval),
      await ensure(_PaymentsPages.BulkPaymentpage.paymentDateView).isNotEmpty,
    ]);
  });

  it('Approve PayNow Bulk Payment with Existing Payee', async function () {

    await approveBulkPayNowPaymentAndCheckApproved(bulkPayNowReference);

  });

  it('Create PayNow Bulk Payment with New Payee', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
    await _PaymentsPages.SGPayNowPage.addNewPayNow4Bulk(constVal.payNowTypeCodeMap.M, testData.payNowPayment.proxyTypeMobNum, testData.payNowPayment.proxyTypeMobNumCountry);
    //    await _PaymentsPages.SGPayNowPage.addNewPayNow4Bulk(constVal.payNowTypeCodeMap.U, testData.payNowPayment.proxyTypeCmpnyIde);
    //    await _PaymentsPages.SGPayNowPage.addNewPayNow4Bulk(constVal.payNowTypeCodeMap.N, testData.payNowPayment.proxyTypeNF);
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.payNowPayment.amount);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage;
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      reference = text;
      console.log('Reference of Create PayNow Bulk Payment with New Payee:', reference);
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewPayNowBulkPayment();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.payNowPayment.amount),
      await ensure(_PaymentsPages.SGPayNowPage.proxyValueViewPayNowBulkPayment).textContains(testData.payNowPayment.proxyTypeMobNum),
      //      await ensure(_PaymentsPages.SGPayNowPage.proxyValueViewPayNowBulkPayment).textContains(testData.payNowPayment.proxyTypeCmpnyIde),
      //      await ensure(_PaymentsPages.SGPayNowPage.proxyValueViewPayNowBulkPayment).textContains(testData.payNowPayment.proxyTypeNF),
      await ensure(_PaymentsPages.SGPayNowPage.statusLableViewPayNowBulkPayment).textIs(constVal.statusLabelMap.PendingApproval),
      await ensure(_PaymentsPages.BulkPaymentpage.paymentDateView).isNotEmpty,
    ]);
  });

  it('Approve PayNow Bulk Payment with New Payee', async function () {

    await approveBulkPayNowPaymentAndCheckApproved(reference);

  });

  it('Upload PayNow File Enquiry', async function () {

    await _PaymentsPages.SGPayNowPage.uploadPayNowEnq(SIT ? testData.payNowPayment.SIT.payNowEnquiry.uploadFileName : testData.payNowPayment.UAT.payNowEnquiry.uploadFileName).then(
      (data) => {
        fileName = data;
        console.log('fileName of Upload PayNow File Enquiry:', reference);
      }
    );
    await _PaymentsPages.SGPayNowPage.goToNowEnqItem(fileName);
    await Promise.all([
      await ensure(_PaymentsPages.SGPayNowPage.statusLabelPayNowEnqList).textIs(constVal.statusLabelMap.PendingApproval),
    ]);

  });

  it('Approve PayNow File Enquiry', async function () {

    await _PaymentsPages.SGPayNowPage.checkPayNowEnqItem(fileName);
    await _PaymentsPages.SGPayNowPage.approvePayNowEnqItem(testData.CrossBorder.responseCode);
    await _PaymentsPages.SGPayNowPage.goToNowEnqItem(fileName);
    await Promise.all([
      await ensure(_PaymentsPages.SGPayNowPage.statusLabelPayNowEnqList).textContainsLessOne(constVal.statusLabelMap.Approved, constVal.statusLabelMap.PartialApproved),
    ]);

  });

  it('Delete PayNow File Enquiry', async function () {

    await _PaymentsPages.SGPayNowPage.checkPayNowEnqItem(fileName);
    await _PaymentsPages.SGPayNowPage.deleteButton.click();
    await _PaymentsPages.SGPayNowPage.dialogDeleteButton.click();
    await _PaymentsPages.SGPayNowPage.dismissButton.click();
    await Promise.all([
      await ensure(_PaymentsPages.SGPayNowPage.transactionResult).textIs("No information to display"),
    ]);

  });
  //  remove old UI case first
  //PayNow Reports-bulk payment. Make sure case - 'Create PayNow Bulk Payment with New/Existing Payee' is success
  // it("Payment Reports-PayNow Bulk Payment", async function () {
  //   if (SIT) {
  //     let fromDate = moment(new Date()).format('DD-MMM-YYYY');
  //     let toDate = moment().add(10, 'days').format('DD-MMM-YYYY');
  //     let _PaymentReportsPage = new ReportsPages();
  //     await _PaymentReportsPage.openMenu(Menu.Reports.PaymentReports);
  //     await _PaymentReportsPage.paymentReportsPage.loadCondition();
  //     await _PaymentReportsPage.paymentReportsPage.bulkPaymentPersonaliseButton.click();
  //     await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
  //     let PaymentReportsName = 'PayNowBulkPayment' + generatedID();
  //     console.log(PaymentReportsName);
  //     await _PaymentReportsPage.paymentReportsPage.customRptNameText.input(PaymentReportsName);
  //     await _PaymentReportsPage.paymentReportsPage.absoluteDateValue.jsClick();
  //     await _PaymentReportsPage.paymentReportsPage.fromDate.input(fromDate);
  //     await _PaymentReportsPage.paymentReportsPage.toDate.input(toDate);
  //     await _PaymentReportsPage.paymentReportsPage.customerReferenceText.input(bulkPayNowReference);
  //     console.log(bulkPayNowReference);
  //     await _PaymentReportsPage.paymentReportsPage.continueButton.jsClick();
  //     await _PaymentReportsPage.paymentReportsPage.loadConditionOnPreviewPage();
  //     await _PaymentReportsPage.paymentReportsPage.updateButton.jsClick();
  //     await ensure(_PaymentReportsPage.paymentReportsPage).isI3Success();

  //     await _PaymentReportsPage.paymentReportsPage.loadCondition();
  //     await _PaymentReportsPage.paymentReportsPage.firstEditButton.click();
  //     await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
  //     await ensure(_PaymentReportsPage.paymentReportsPage.customRptNameText).textContains(testData.payNowPayment.bulkPaymentPayNowCustomRptName);

  //     await _PaymentReportsPage.paymentReportsPage.cancelButton.jsClick();
  //     await _PaymentReportsPage.paymentReportsPage.loadCondition();
  //     await _PaymentReportsPage.paymentReportsPage.firstViewButton.click();
  //     await _PaymentReportsPage.paymentReportsPage.loadConditionForDBSLogoOnReportPage();
  //     await ensure(_PaymentReportsPage.paymentReportsPage.bulkPaymentAccountValue).textContains(SIT ? testData.payNowPayment.SIT.payNowFromAccountName : testData.payNowPayment.UAT.fromAccount);
  //   }
  // });
});


//UX Transfer Center -> filter by reference -> click reference -> approve -> go to Transfer Center againt to check
export async function approveSinglePaymentAndCheckApproved(reference: string): Promise<void> {
  await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
  await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
  await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();
  await _PaymentsPages.SGPayNowPage.approveButton.click();
  await _PaymentsPages.SGPayNowPage.getChallengeSMS.clickIfExist();
  await _PaymentsPages.SGPayNowPage.challengeResponse.input(testData.CrossBorder.responseCode);
  await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
  await _PaymentsPages.SGPayNowPage.approveButton.click();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
  await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
  await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
  await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();
  await Promise.all([
    await ensure(_PaymentsPages.SGPayNowPage.statusLableViewSinglePayment).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
  ]);
}

export async function approveBulkPayNowPaymentAndCheckApproved(reference: string): Promise<void> {
  await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
  await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
  await _PaymentsPages.SGPayNowPage.loadCondition4ViewPayNowBulkPayment();
  await _PaymentsPages.SGPayNowPage.approveButton.click();
  await _PaymentsPages.SGPayNowPage.getChallengeSMS.clickIfExist();
  await _PaymentsPages.SGPayNowPage.challengeResponse.input(testData.CrossBorder.responseCode);
  await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
  await _PaymentsPages.SGPayNowPage.approveButton.jsClick();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
  await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
  await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
  await _PaymentsPages.SGPayNowPage.loadCondition4ViewPayNowBulkPayment();
  await Promise.all([
    await ensure(_PaymentsPages.SGPayNowPage.statusLableViewPayNowBulkPayment).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
  ]);
}
