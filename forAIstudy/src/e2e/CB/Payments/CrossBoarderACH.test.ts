/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
let _FilesPages = new FilesPages();

let reference: string = null;
let fileName: string = null;
let fileNameByFile: string = null;
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('Cross Border Payments', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.CrossBorder.SIT.login.loginCompanyId : testData.CrossBorder.UAT.login.loginCompanyId,
      SIT ? testData.CrossBorder.SIT.login.loginUserId : testData.CrossBorder.UAT.login.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Create a Cross Border ACH Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
    await _PaymentsPages.crossBoarderACHPage.loadCondition();
    await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
    await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(testData.CrossBorder.paymentCountry);
    await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
    await _PaymentsPages.crossBoarderACHPage.addExistingPayee(SIT ? testData.CrossBorder.SIT.existingFilterValue : testData.CrossBorder.UAT.existingFilterValue);
    await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amount);
    await _PaymentsPages.crossBoarderACHPage.nextButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
    await _PaymentsPages.crossBoarderACHPage.submitButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
    await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
      reference = text;
      console.log(reference);
    });
    await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
      await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amount),
      await ensure(_PaymentsPages.crossBoarderACHPage.paymentDateView).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).textContains(SIT ? testData.CrossBorder.SIT.existingFilterValue : testData.CrossBorder.UAT.existingFilterValue),
      await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textIs(testData.status.PendingApproval),
    ]);
  });

  it('Upload a Cross Border ACH Payment', async function () {

    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.CrossBorder.SIT.fileService.fileName : testData.CrossBorder.UAT.fileService.fileName, "By transaction amount").then(async (data) => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();

    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.amountView).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.paymentDateView).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).isNotEmpty(),
    ]);
  });

  it('Approve a Cross Border ACH Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
    await _PaymentsPages.crossBoarderACHPage.approveButton.click();
    await _PaymentsPages.crossBoarderACHPage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.crossBoarderACHPage.challengeResponse.input(testData.CrossBorder.responseCode);
    await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
    await _PaymentsPages.crossBoarderACHPage.approveButton.jsClick();
    await _PaymentsPages.crossBoarderACHPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textIs(testData.status.Approved),
    ]);
  });

  it('Create an INTL Cross Border ACH Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
    await _PaymentsPages.crossBoarderACHPage.loadCondition();
    await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
    await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(testData.CrossBorder.paymentCountryINTL);
    await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
    await _PaymentsPages.crossBoarderACHPage.addINTLNewPayee(testData.CrossBorder.payeeNameINTL, testData.CrossBorder.payeeBankIDINTL, testData.CrossBorder.accountNumberINTL);
    // await _PaymentsPages.crossBoarderACHPage.addINTLNewPayee(testData.CrossBorder.payeeNameINTL1, testData.CrossBorder.payeeBankIDINTL1, testData.CrossBorder.accountNumberINTL1);
    await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
    await _PaymentsPages.crossBoarderACHPage.purposePaymentLine.input(testData.CrossBorder.purposePaymentLine1);
    await _PaymentsPages.crossBoarderACHPage.additionalInfoLine.input(testData.CrossBorder.additionalInfoLine1);
    await _PaymentsPages.crossBoarderACHPage.showHideDetail.click();
    await _PaymentsPages.crossBoarderACHPage.paymentDetailLine.input(testData.CrossBorder.paymentDetailLine1);

    await _PaymentsPages.crossBoarderACHPage.nextButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
    await _PaymentsPages.crossBoarderACHPage.submitButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
    await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
      await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
      await ensure(_PaymentsPages.crossBoarderACHPage.paymentDateView).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
      await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textIs(testData.status.PendingApproval),
    ]);
  });

  it('Upload an INTL Cross Border ACH Payment--By File', async function () {

    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.CrossBorder.SIT.fileService.fileNameINTL : testData.CrossBorder.UAT.fileService.fileNameINTL, SIT ? testData.CrossBorder.SIT.fileService.approvalCurrency : testData.CrossBorder.UAT.fileService.approvalCurrency).then(async (data) => {
      fileNameByFile = data;
    });
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileNameByFile);
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();

    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.amountView).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.paymentDateView).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).isNotEmpty(),
      await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).isNotEmpty(),
    ]);
  });

  it('Approve File an INTL Cross Border ACH Payment', async function () {

    let _ApprovalsPages = new ApprovalsPages();
    await _PaymentsPages.crossBoarderACHPage.goToMyApprovalByFileViewFile(fileNameByFile);
    await _ApprovalsPages.paymentsTransactionsFilesPage.viewFileApproveAll.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.CrossBorder.responseCode);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4MyApprovalCompleted();
    await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.myApproveFileStatus).textIs(testData.status.Approved),
    ]);
  });
});
