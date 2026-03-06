/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser } from 'protractor';
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, generatedID, handlerCase, SIT } from "../../../lib";
import { PaymentsPages } from "../../../pages/CB/Payments";
import { Menu } from "../../../config/menu";
import { ApprovalsPages } from "../../../pages/CB/Approvals";

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let reference: string = null;
let reference2 = "";
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';

describe('TW ACH Bulk Collection', async function () {
  this.retries(browser.params.caseRetryTimes);

  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.TWACHCollection.SIT.login.loginCompanyId : testData.TWACHCollection.UAT.login.loginCompanyId,
      SIT ? testData.TWACHCollection.SIT.login.loginUserId : testData.TWACHCollection.UAT.login.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('create ACH Bulk Collection with New Payee', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWCollection);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
    await addNewPayee();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHCollection.amountA1);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
    await _PaymentsPages.TWACHPaymentPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
    await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.TWACHPaymentPage.payeePassbook.input(testData.TWACHCollection.payeePassbook);
    await _PaymentsPages.TWACHPaymentPage.payeePaymentDetail.input(testData.TWACHCollection.payeePaymentDetail);
    await _PaymentsPages.BulkPaymentpage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.TWACHCollection.emailIdO);
    await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.TWACHCollection.emailId1);
    await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.TWACHCollection.emailId2);
    await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.TWACHCollection.emailId3);
    await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.TWACHCollection.emailId4);
    await _PaymentsPages.BulkPaymentpage.message.input(testData.TWACHCollection.message);
    await _PaymentsPages.bulkCollectionPage.nextButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
    await _PaymentsPages.bulkCollectionPage.submitButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
    await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount),
      await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountA1),
      await ensure(_PaymentsPages.bulkCollectionPage.accountNumberValue).textContains(testData.TWACHCollection.accountNumber),
      await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
    ]);
  });

  it('create ACH Bulk Collection with Approval Now with M-Chanllenge', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWCollection);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
    await addNewPayee();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHCollection.amountA1);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
    await _PaymentsPages.TWACHPaymentPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
    await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.TWACHPaymentPage.payeePassbook.input(testData.TWACHCollection.payeePassbook);
    await _PaymentsPages.TWACHPaymentPage.payeePaymentDetail.input(testData.TWACHCollection.payeePaymentDetail);
    await _PaymentsPages.BulkPaymentpage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.TWACHCollection.emailIdO);
    await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.TWACHCollection.emailId1);
    await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.TWACHCollection.emailId2);
    await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.TWACHCollection.emailId3);
    await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.TWACHCollection.emailId4);
    await _PaymentsPages.BulkPaymentpage.message.input(testData.TWACHCollection.message);
    await _PaymentsPages.bulkCollectionPage.nextButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
    await _PaymentsPages.bulkCollectionPage.approveNowCheckBox.jsClick();
    await ensure(_PaymentsPages.bulkCollectionPage.getChallengeButton).isVisible();
    await _PaymentsPages.bulkCollectionPage.getChallengeButton.click();
    await _PaymentsPages.bulkCollectionPage.challengeResponse.input(testData.TWACHCollection.EnterResponse);
    await _PaymentsPages.bulkCollectionPage.submitButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
    await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

  it('create ACH Bulk Collection with Approval Now without M-Chanllenge', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWCollection);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
    await addNewPayee();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHCollection.amountA2);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
    await _PaymentsPages.TWACHPaymentPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClick();
    await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.TWACHCollection.EnterResponse);
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.TWACHCollection.amountA2),
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PartialApproved),
    ]);
  });

  it('Create ACH Bulk Collection with Save as Tempalte', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWCollection);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
    await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.TWACHCollection.existingPayer);
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHCollection.amountA1);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
    await _PaymentsPages.TWACHPaymentPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
    await _PaymentsPages.bulkCollectionPage.nextButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
    await _PaymentsPages.bulkCollectionPage.saveAsTemplate.jsClick();
    TemplateName = 'COLName' + generatedID();
    await _PaymentsPages.bulkCollectionPage.templateName.input(TemplateName);
    await _PaymentsPages.bulkCollectionPage.submitButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
    await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
      paymentReference = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewTemplatePage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.viewTemplateName).textIs(TemplateName),
      await ensure(_PaymentsPages.bulkCollectionPage.viewTemplateFromAccount).textContains(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount),
      await ensure(_PaymentsPages.bulkCollectionPage.viewTemplateAmount).textContains(testData.TWACHCollection.amountA1),
    ]);
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount),
      await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountA1),
      await ensure(_PaymentsPages.bulkCollectionPage.payeeNameValue).textContains(testData.TWACHCollection.existingPayer),
    ]);
  });

  it('Create a ACH Bulk Collection from Template', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    if (0 !== TemplateName.trim().length) {
      await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
    } else {
      await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHCollection.existingTemplate);
    }
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
    await _PaymentsPages.bulkCollectionPage.loadCondition();
    await _PaymentsPages.bulkCollectionPage.loadConditionForCreateFromTWACHTempaltePage();
    await _PaymentsPages.bulkCollectionPage.amount.clean();
    await _PaymentsPages.bulkCollectionPage.amount.input(testData.TWACHCollection.amountA1);
    await _PaymentsPages.bulkCollectionPage.nextButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
    await _PaymentsPages.bulkCollectionPage.submitButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
    await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
      reference2 = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).isNotEmpty(),
      await ensure(_PaymentsPages.bulkCollectionPage.amountValue).isNotEmpty(),
    ]);
  });

  it('Create a ACH Bulk Collection with Save as Draft', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWCollection);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
    await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.TWACHCollection.existingPayer);
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHCollection.amountA1);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
    await _PaymentsPages.TWACHPaymentPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
    await _PaymentsPages.bulkCollectionPage.saveAsDraft.click();
    await _PaymentsPages.bulkCollectionPage.getDialogReferenceID().then(text => {
      paymentReference = text;
    });
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount),
      await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountA1),
      await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.Saved),
    ]);
  });

  it('Copy a ACH Bulk Collection via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference2.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
    }
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
    await _PaymentsPages.bulkCollectionPage.copyButton.click();
    await _PaymentsPages.bulkCollectionPage.loadCondition();
    await _PaymentsPages.bulkCollectionPage.amount.clean();
    await _PaymentsPages.bulkCollectionPage.amount.input(testData.TWACHCollection.amountV);
    await _PaymentsPages.bulkCollectionPage.nextButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
    await _PaymentsPages.bulkCollectionPage.submitButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
    await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
      reference3 = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).isNotEmpty(),
      await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountV),
      await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingVerification),
    ]);
  });

  it('Reject a ACH Bulk Collection via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference2.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
    }
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
    await _PaymentsPages.bulkCollectionPage.rejectButton.click();
    await _PaymentsPages.bulkCollectionPage.reasonForRejection.input("reasonForRejection");
    await _PaymentsPages.bulkCollectionPage.rejectDialogButton.click();
    await _PaymentsPages.bulkCollectionPage.getDialogReferenceID().then(text => {
      reference2 = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXRejectDialogSuccess();
    await _PaymentsPages.bulkCollectionPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.Rejected),
    ]);
  });

  it('Edit a ACH Bulk Collection via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference3.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
    }
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
    await _PaymentsPages.bulkCollectionPage.editButton.click();
    await _PaymentsPages.bulkCollectionPage.loadCondition();
    await _PaymentsPages.bulkCollectionPage.amount.clean();
    await _PaymentsPages.bulkCollectionPage.amount.input(testData.TWACHCollection.editamount);
    await _PaymentsPages.bulkCollectionPage.nextButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
    await _PaymentsPages.bulkCollectionPage.submitButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
    await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
      reference3 = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.TWACHCollection.editamount),
    ]);
  });

  it('Delete a ACH Bulk Collection via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference3.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
    }
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
    await _PaymentsPages.bulkCollectionPage.deleteButton.click();
    await _PaymentsPages.bulkCollectionPage.deleteDialogButton.click();
    await _PaymentsPages.bulkCollectionPage.getDialogReferenceID().then(text => {
      reference3 = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXRejectDialogSuccess();
    await _PaymentsPages.bulkCollectionPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference3);

    await Promise.all([
      await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
    ]);
  });

  it('Verify a ACH Bulk Collection via My Verify', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWCollection);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.login.fromAccount : testData.TWACHCollection.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
    await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.TWACHCollection.existingPayer);
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHCollection.amountV);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
    await _PaymentsPages.TWACHPaymentPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
    await _PaymentsPages.bulkCollectionPage.nextButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
    await _PaymentsPages.bulkCollectionPage.submitButton.click();
    await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
    await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
      verifyReference = text;
    });
    await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
    await new NavigatePages().loginCB(SIT ? testData.TWACHCollection.SIT.login.loginCompanyId : testData.TWACHCollection.UAT.login.loginCompanyId, SIT ? testData.TWACHCollection.SIT.login.verifyUserId : testData.TWACHCollection.UAT.login.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
    ]);
  });

  it('Approve a ACH Bulk Collection via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== verifyReference.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
    }
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
    await _PaymentsPages.bulkCollectionPage.approveButton.click();
    await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.bulkCollectionPage.challengeResponse.input(testData.TWACHCollection.EnterResponse);
    await _PaymentsPages.bulkCollectionPage.approveButton.jsClick();
    await _PaymentsPages.bulkCollectionPage.getDialogReferenceID().then(text => {
      approvalReference = text;
    });
    await _PaymentsPages.bulkCollectionPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

  it('Release a ACH Bulk Collection via My Release', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

    await Promise.all([
      await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

});

export async function addNewPayee() {
  await _PaymentsPages.bulkCollectionPage.newPayerTab.click();
  await _PaymentsPages.bulkCollectionPage.newPayeeName.input(testData.TWACHCollection.payeeName);
  await _PaymentsPages.bulkCollectionPage.payerBankID.select(SIT ? testData.TWACHCollection.SIT.login.payeeBankID : testData.TWACHCollection.UAT.login.payeeBankID);
  await _PaymentsPages.bulkCollectionPage.newPayerAccountNum.input(testData.TWACHCollection.accountNumber);
  await _PaymentsPages.bulkCollectionPage.DDARef.input(testData.TWACHCollection.DDAreference);
  await _PaymentsPages.bulkCollectionPage.addPayer.click();
}