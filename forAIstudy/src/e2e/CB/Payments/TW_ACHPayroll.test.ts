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

describe('TW ACH Payroll', async function () {
  this.retries(browser.params.caseRetryTimes);

  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.TWACHPayroll.SIT.login.loginCompanyId : testData.TWACHPayroll.UAT.login.loginCompanyId,
      SIT ? testData.TWACHPayroll.SIT.login.loginUserId : testData.TWACHPayroll.UAT.login.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('create ACH Payroll with New Payee', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
    await addNewPayee();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.amountA1);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
    await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.TWACHPaymentPage.payeePassbook.input(testData.TWACHPayroll.payeePassbook);
    await _PaymentsPages.TWACHPaymentPage.payeePaymentDetail.input(testData.TWACHPayroll.payeePaymentDetail);
    await _PaymentsPages.BulkPaymentpage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.TWACHPayroll.emailIdO);
    await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.TWACHPayroll.emailId1);
    await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.TWACHPayroll.emailId2);
    await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.TWACHPayroll.emailId3);
    await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.TWACHPayroll.emailId4);
    await _PaymentsPages.BulkPaymentpage.message.input(testData.TWACHPayroll.message);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
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
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.TWACHPayroll.amountA1),
      await ensure(_PaymentsPages.BulkPaymentpage.accountNumberValue).textContains(testData.TWACHPayroll.accountNumber),
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
    ]);
  });

  it('create ACH Payroll with Approval Now with M-Chanllenge', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
    await addNewPayee();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.amountA1);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
    await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.TWACHPaymentPage.payeePassbook.input(testData.TWACHPayroll.payeePassbook);
    await _PaymentsPages.TWACHPaymentPage.payeePaymentDetail.input(testData.TWACHPayroll.payeePaymentDetail);
    await _PaymentsPages.BulkPaymentpage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.TWACHPayroll.emailIdO);
    await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.TWACHPayroll.emailId1);
    await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.TWACHPayroll.emailId2);
    await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.TWACHPayroll.emailId3);
    await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.TWACHPayroll.emailId4);
    await _PaymentsPages.BulkPaymentpage.message.input(testData.TWACHPayroll.message);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClick();
    await ensure(_PaymentsPages.BulkPaymentpage.getChallengeSMS).isVisible();
    await _PaymentsPages.BulkPaymentpage.getChallengeSMS.click();
    await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.TWACHPayroll.EnterResponse);
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
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

  it('create ACH Payroll with Approval Now without M-Chanllenge', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
    await addNewPayee();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.amountA2);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClick();
    await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.TWACHPayroll.EnterResponse);
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
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.TWACHPayroll.amountA2),
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PartialApproved),
    ]);
  });

  it('Create ACH Bulk Payroll with Save as Tempalte', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
    await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.TWACHPayroll.existingPayee);
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.amountA1);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.saveAsTemplateCheckbox.jsClick();
    TemplateName = 'BPTName' + generatedID();
    await _PaymentsPages.BulkPaymentpage.templateName.input(TemplateName);
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      paymentReference = text;
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewTemplatePage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.viewTemplateName).textIs(TemplateName),
      await ensure(_PaymentsPages.BulkPaymentpage.viewTemplateFromAccount).textContains(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount),
      await ensure(_PaymentsPages.BulkPaymentpage.viewTemplateAmount).textContains(testData.TWACHPayroll.amountA1),
      await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(testData.TWACHPayroll.existingPayee),
    ]);
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.TWACHPayroll.amountA1),
      await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(testData.TWACHPayroll.existingPayee),
    ]);
  });

  it('Create a ACH Bulk Payroll from Template', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    if (0 !== TemplateName.trim().length) {
      await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
    } else {
      await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHPayroll.existingTemplate);
    }
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.amount.clean();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.amountA1);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      reference2 = text;
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).isNotEmpty(),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).isNotEmpty(),
      await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).isNotEmpty(),
    ]);
  });

  it('Create a ACH Payroll with Save as Draft', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
    await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.TWACHPayroll.existingPayee);
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.amountA1);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
    await _PaymentsPages.BulkPaymentpage.saveAsDraft.click();
    await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
      paymentReference = text;
    });
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.TWACHPayroll.amountA1),
      await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(testData.TWACHPayroll.existingPayee),
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Saved),
    ]);
  });

  it('Copy a ACH Payroll via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference2.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
    }
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
    await _PaymentsPages.BulkPaymentpage.copyButton.click();
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.amount.clean();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.amountV);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      reference3 = text;
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).isNotEmpty(),
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.TWACHPayroll.amountV),
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingVerification),
    ]);
  });

  it('Reject a Bulk Payroll via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference2.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
    }
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
    await _PaymentsPages.BulkPaymentpage.rejectButton.click();
    await _PaymentsPages.BulkPaymentpage.reasonForRejection.input("reasonForRejection");
    await _PaymentsPages.BulkPaymentpage.rejectDialogButton.click();
    await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
      reference2 = text;
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXRejectDialogSuccess();
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Rejected),
    ]);
  });

  it('Edit a Bulk Payroll via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference3.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
    }
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
    await _PaymentsPages.BulkPaymentpage.editButton.click();
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.amount.clean();
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.editamount);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      reference3 = text;
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.TWACHPayroll.editamount),
    ]);
  });

  it('Delete a Bulk Payroll via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== reference3.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
    }
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
    await _PaymentsPages.BulkPaymentpage.deleteButton.click();
    await _PaymentsPages.BulkPaymentpage.deleteDialogButton.click();
    await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
      reference3 = text;
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXRejectDialogSuccess();
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference3);

    await Promise.all([
      await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
    ]);
  });

  it('Verify a Bulk Payroll via My Verify', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
    await _PaymentsPages.BulkPaymentpage.loadCondition();
    await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.login.fromAccount : testData.TWACHPayroll.UAT.login.fromAccount);
    await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
    await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
    await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.TWACHPayroll.existingPayee);
    await _PaymentsPages.BulkPaymentpage.amount.input(testData.TWACHPayroll.amountV);
    await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
    await _PaymentsPages.BulkPaymentpage.nextButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentpage.submitButton.click();
    await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
      verifyReference = text;
    });
    await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
    await new NavigatePages().loginCB(SIT ? testData.TWACHPayroll.SIT.login.loginCompanyId : testData.TWACHPayroll.UAT.login.loginCompanyId, SIT ? testData.TWACHPayroll.SIT.login.verifyUserId : testData.TWACHPayroll.UAT.login.verifyUserId);
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
    ]);
  });

  it('Approve a Bulk Payroll via Transfer Center', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    if (0 !== verifyReference.trim().length) {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    } else {
      await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
    }
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
    await _PaymentsPages.BulkPaymentpage.approveButton.click();
    await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.TWACHPayroll.EnterResponse);
    await _PaymentsPages.BulkPaymentpage.approveButton.click();
    await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
      approvalReference = text;
    });
    await _PaymentsPages.BulkPaymentpage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

  it('Release a ACH Payroll via My Release', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
    await _ApprovalsPages.myVerificationAndReleasePage.viewVerifyReleaseBtn.click();
    await _ApprovalsPages.myVerificationAndReleasePage.verifyReleaseConfirmButton.click();
    await _ApprovalsPages.myVerificationAndReleasePage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
    await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

});

export async function addNewPayee() {
  await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.jsClick();
  await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.TWACHPayroll.payeeName);
  await _PaymentsPages.BulkPaymentpage.payeeBankID.select(SIT ? testData.TWACHPayroll.SIT.login.payeeBankID : testData.TWACHPayroll.UAT.login.payeeBankID);
  await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.TWACHPayroll.accountNumber);
  await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
}