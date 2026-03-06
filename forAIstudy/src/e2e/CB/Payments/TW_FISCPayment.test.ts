/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser } from 'protractor';
import { saveScreen, devWatch, ensure, SIT, TextInput, handlerCase } from '../../../lib';
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import * as utils from '../../../lib/utils';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let reference: string = null;
let reference2: string = null;
let reference4ApproveNow: string = null;
let reference4Template: string = null;
let reference4Save: string = null;
let templateName: string = null;
let reference4VR: string = null;

describe('TW FISC Payment', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.TWFISC.SIT.login.loginCompanyId : testData.TWFISC.UAT.login.loginCompanyId,
      SIT ? testData.TWFISC.SIT.login.loginUserId : testData.TWFISC.UAT.login.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Create FISC Payment with New Payee', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(testData.TWFISC.fromAccount);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(SIT ? testData.TWFISC.SIT.amountVR : testData.TWFISC.UAT.amountVR);
    await addNewPayee();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
      reference = text;
      console.log('Reference of Create FISC Payment with New Payee:', reference);
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(testData.TWFISC.fromAccount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(utils.formatStr2Money(SIT ? testData.TWFISC.SIT.amountVR : testData.TWFISC.UAT.amountVR)),
      await ensure(_PaymentsPages.TWFISCPaymentPage.newPayeeNameView).textContains(testData.TWFISC.newPayeeName),
      await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
      await ensure(_PaymentsPages.TWFISCPaymentPage.cutoffTimeView).isNotEmpty(),
    ]);
  });

  it('Create FISC Payment with Approva Now with M-Chanllenge', async function () {

    await approveNow(testData.TWFISC.amount, _PaymentsPages.PaymentLocalOverseasPayeePage.mchallengeText, testData.TWFISC.mChllengeText);

  });

  it('Create FISC Payment with Approva Now without M-Chanllenge', async function () {

    await approveNow(SIT ? testData.TWFISC.SIT.amountWithoutM : testData.TWFISC.UAT.amountWithoutM, _PaymentsPages.TWFISCPaymentPage.withoutMChallengeText, testData.TWFISC.withoutChanllenge);

  });

  it('Create FISC Payment with Save as Template', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(testData.TWFISC.fromAccount);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TWFISC.amount);
    await _PaymentsPages.SGPayNowPage.addExisting4Single(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.savaAsTemplateCheckBox.jsClick();
    templateName = 'TWFISCTemplateName' + utils.generatedID();
    console.log('TemplateName:', templateName);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.templateName.input(templateName);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
      reference4Template = text;
      console.log('Reference of Create FISC Payment with Save as Template:', reference4Template);
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4Template);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(testData.TWFISC.fromAccount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(testData.TWFISC.amount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.existingPayeeNameView).textContains(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName),
    ]);

    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewTemplatePaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(testData.TWFISC.fromAccount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.amountTemplateView).textContains(testData.TWFISC.amount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.existingPayeeNameView).textContains(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName),
    ]);

  });

  it('Create FISC Payment from Template', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionCreatePaymentTemplate();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
      reference4Template = text;
      console.log('Reference of Create FISC Payment from Template:', reference4Template);
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4Template);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(testData.TWFISC.fromAccount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(testData.TWFISC.amount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.existingPayeeNameView).textContains(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName),
    ]);

  });

  it('Create FISC Payment with Save as Draft', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(testData.TWFISC.fromAccount);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TWFISC.amount);
    await addNewPayee();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.saveAsDraft.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
      reference4Save = text;
      console.log('Reference of Create FISC Payment with Save as Draft:', reference4Save);
    });
    await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4Save);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();

    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(testData.TWFISC.fromAccount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(testData.TWFISC.amount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.newPayeeNameView).textContains(testData.TWFISC.newPayeeName),
      await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textIs(testData.status.Saved),
    ]);

  });

  it('Copy FISC Payment', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4Save);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.copyButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
      reference2 = text;
      console.log('Reference of Copy FISC Payment:', reference2);
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(testData.TWFISC.fromAccount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(testData.TWFISC.amount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.newPayeeNameView).textContains(testData.TWFISC.newPayeeName),
      await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textIs(testData.status.PendingApproval),
    ]);

  });

  it('Edit FISC Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await _PaymentsPages.TWFISCPaymentPage.editButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.clean();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TWFISC.editAmount);
    await _PaymentsPages.SGPayNowPage.addExisting4Single(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
      reference2 = text;
      console.log('Reference of Edit FISC Payment:', reference2);
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(testData.TWFISC.fromAccount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(testData.TWFISC.editAmount),
      await ensure(_PaymentsPages.TWFISCPaymentPage.existingPayeeNameView).textContains(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName),
      await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textIs(testData.status.PendingApproval),
    ]);

  });

  //Reject the "reference2"
  it('Reject FISC Payment', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.rejectButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.reasonForRejection.input(testData.TWFISC.rejectResason);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.rejectDialogButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
      console.log('Reference of Reject FISC Payment:', reference2);
      reference2 = text;
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXRejectDialogSuccess();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textIs(testData.status.Rejected),
    ]);

  });

  //Delete the "reference2"
  it('Delete FISC Payment', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.deleteButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.deleteDialogButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
      console.log('Reference of Delete FISC Payment:', reference2);
      reference2 = text;
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXRejectDialogSuccess();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference2);

    await Promise.all([
      await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
    ]);

  });

});

describe('Verify&Release Payments', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.TWFISC.SIT.login.loginCompanyId : testData.TWFISC.UAT.login.loginCompanyId,
      SIT ? testData.TWFISC.SIT.login.verifyUserId : testData.TWFISC.UAT.login.verifyUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Verify FISC Payment', async function () {

    await _PaymentsPages.PartnerBankPayment.verifyPayment(reference, 'TW - FISC Payment').then(text => {
      reference4VR = text;
    });

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4VR);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textIs(testData.status.PendingApproval),
    ]);

  });

  //approve the "reference"
  it('Approve FISC Payment', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input(testData.TWFISC.responseCode);
    await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
      console.log('Reference of Approve FISC Payment:', reference);
      reference = text;
    });
    await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);

  });

  it('Release FISC Payment', async function () {

    await _PaymentsPages.PartnerBankPayment.releasePayment(reference, 'TW - FISC Payment').then(text => {
      reference4VR = text;
    });

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4VR);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
      await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
    ]);

  });

});

//for ApproveNow M-Challenge and ApproveNow without M-Challenge, they decided by amount
async function approveNow(amount: string, challengeEle: TextInput, challengeText: string): Promise<void> {
  await _PaymentsPages.openMenu(Menu.Payments.TWPaymentLocalOverseasPayee);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(testData.TWFISC.fromAccount);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(amount);
  await _PaymentsPages.SGPayNowPage.addExisting4Single(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.approvalNowCheckBox.jsClick();
  await ensure(challengeEle).textContains(challengeText);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input(testData.TWFISC.responseCode);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
    reference4ApproveNow = data;
    console.log('Reference of ApproveNow:', reference4ApproveNow);
  });
  await ensure(_PaymentsPages.PartnerBankPayment).isUXSuccess();
  await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
  await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4ApproveNow);
  await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
  await Promise.all([
    await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
  ]);

}

async function addNewPayee(): Promise<void> {
  await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TWFISC.newPayeeName);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TWFISC.newPayeeAdd1);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TWFISC.newPayeeAdd2);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TWFISC.newPayeeAdd3);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeBankID.select(SIT ? testData.TWFISC.SIT.payeeBankID : testData.TWFISC.UAT.payeeBankID);
  await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TWFISC.newPayeeAcctNum);
}
