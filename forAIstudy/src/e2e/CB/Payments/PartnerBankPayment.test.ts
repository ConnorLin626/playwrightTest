/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { saveScreen, ensure, SIT, TextInput, handlerCase, generatedID } from '../../../lib';
import { Menu } from '../../../config/menu';
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import * as utils from '../../../lib/utils';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let reference: string = null;
let reference1: string = null;
let reference2: string = null;
let reference4Save: string = null;
let reference4ApproveNow: string = null;
let reference4VR: string = null;
let txnRef = '';
let nickName = '';
let clientRefNum = '';
let customerRef = '';
let _ApprovalsPages = new ApprovalsPages();

describe('Payments', async function () {

  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.PartnerBank.SIT.login.loginCompanyId : testData.PartnerBank.UAT.login.loginCompanyId,
      SIT ? testData.PartnerBank.SIT.login.loginUserId : testData.PartnerBank.UAT.login.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Create PartnerBank Payment with New Payee', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PartnerBankPayment);
    await _PaymentsPages.PartnerBankPayment.loadCondition();
    await _PaymentsPages.PartnerBankPayment.partnerBankCountry.select(testData.PartnerBank.partnerBankCountry);
    await _PaymentsPages.PartnerBankPayment.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account);
    await _PaymentsPages.PartnerBankPayment.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentType);
    await _PaymentsPages.PartnerBankPayment.addNewPayee(
      testData.PartnerBank.newPayeeName,
      testData.PartnerBank.newPayeePayeeId,
      testData.PartnerBank.newPayeeAcctNum
    );
    await _PaymentsPages.PartnerBankPayment.amount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
    await _PaymentsPages.PartnerBankPayment.nextButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Preview();
    await _PaymentsPages.PartnerBankPayment.submitButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Submitted();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
      reference = data;
      console.log(reference);
    });
    await ensure(_PaymentsPages.PartnerBankPayment).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account),
      await ensure(_PaymentsPages.PartnerBankPayment.amountView).textContains(utils.formatStr2Money(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
      await ensure(_PaymentsPages.PartnerBankPayment.paymentDateView).isNotEmpty(),
      await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
    ]);
  });

  it('Create PartnerBank Payment with Approva Now with M-Chanllenge', async function () {

    await approveNow(testData.PartnerBank.amount, _PaymentsPages.PartnerBankPayment.mChallengeText, testData.PartnerBank.mChllengeText);

  });

  it('Create PartnerBank Payment with Approva Now with P M-Chanllenge', async function () {

    await approveNow(SIT ? testData.PartnerBank.SIT.amountWithoutM : testData.PartnerBank.UAT.amountWithoutM,
      _PaymentsPages.PartnerBankPayment.withoutMChallengeText, testData.PartnerBank.withoutChanllenge);

  });

  it('Save PartnerBank Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.PartnerBankPayment);
    await _PaymentsPages.PartnerBankPayment.loadCondition();
    await _PaymentsPages.PartnerBankPayment.partnerBankCountry.select(testData.PartnerBank.partnerBankCountry);
    await _PaymentsPages.PartnerBankPayment.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account);
    await _PaymentsPages.PartnerBankPayment.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentType);
    await _PaymentsPages.PartnerBankPayment.addExistingPayee(SIT ? testData.PartnerBank.SIT.existingPayeeName : testData.PartnerBank.UAT.existingPayeeName);
    await _PaymentsPages.PartnerBankPayment.amount.input(testData.PartnerBank.amount);
    await _PaymentsPages.PartnerBankPayment.saveAsDraftButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(data => {
      reference4Save = data;
      console.log("partnerBankRef:"+reference4Save);
    });
    await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4Save);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account),
      await ensure(_PaymentsPages.PartnerBankPayment.amountView).textContains(testData.PartnerBank.amount),
      await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(SIT ? testData.PartnerBank.SIT.existingPayeeName : testData.PartnerBank.UAT.existingPayeeName),
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textIs(testData.status.Saved),
    ]);
  });

  it('Copy PartnerBank Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4Save);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await _PaymentsPages.PartnerBankPayment.copyButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition();
    await _PaymentsPages.PartnerBankPayment.nextButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Preview();
    await _PaymentsPages.PartnerBankPayment.submitButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Submitted();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
      reference2 = data;
      console.log(reference2);
    });
    await ensure(_PaymentsPages.PartnerBankPayment).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account),
      await ensure(_PaymentsPages.PartnerBankPayment.amountView).textContains(testData.PartnerBank.amount),
      await ensure(_PaymentsPages.PartnerBankPayment.paymentDateView).isNotEmpty(),
      await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(SIT ? testData.PartnerBank.SIT.existingPayeeName : testData.PartnerBank.UAT.existingPayeeName),
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textIs(testData.status.PendingApproval),
    ]);
  });

  it('Edit PartnerBank Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await _PaymentsPages.PartnerBankPayment.editButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition();
    await _PaymentsPages.PartnerBankPayment.deleteIcon.click();
    await _PaymentsPages.PartnerBankPayment.addNewPayee(
      testData.PartnerBank.newPayeeName,
      testData.PartnerBank.newPayeePayeeId,
      testData.PartnerBank.newPayeeAcctNum
    );
    await _PaymentsPages.PartnerBankPayment.amount.input(testData.PartnerBank.editAmount);
    await _PaymentsPages.PartnerBankPayment.nextButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Preview();
    await _PaymentsPages.PartnerBankPayment.submitButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Submitted();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
      reference2 = data;
      console.log(reference2);
    });
    await ensure(_PaymentsPages.PartnerBankPayment).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account),
      await ensure(_PaymentsPages.PartnerBankPayment.amountView).textContains(testData.PartnerBank.editAmount),
      await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textIs(testData.status.PendingApproval),
    ]);
  });

  //reject the "reference2"
  it('Reject PartnerBank Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await _PaymentsPages.PartnerBankPayment.rejectButton.click();
    await _PaymentsPages.PartnerBankPayment.reason4RejectionButton.input(testData.PartnerBank.rejectResason);
    await _PaymentsPages.PartnerBankPayment.rejectDialogButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
      reference2 = text;
    });
    await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXRejectDialogSuccess();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textIs(testData.status.Rejected),
    ]);
  });

  it('Delete PartnerBank Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await _PaymentsPages.PartnerBankPayment.deleteButton.click();
    await _PaymentsPages.PartnerBankPayment.deleteDialogButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
      reference2 = text;
      console.log(reference2);
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

  //Below for AB-8340
  it('Create PartnerBank Payment with Philipines and Payment Type = Payroll', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PartnerBankPayment);
    await _PaymentsPages.PartnerBankPayment.loadCondition();
    await _PaymentsPages.PartnerBankPayment.partnerBankCountry.select(testData.PartnerBank.partnerBankCountryPHP);
    await _PaymentsPages.PartnerBankPayment.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount);
    await _PaymentsPages.PartnerBankPayment.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentTypePayroll);
    await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
    await _PaymentsPages.PartnerBankPayment.newPayeeAcctNum.input(testData.PartnerBank.newPayeeAcctNum);
    await _PaymentsPages.PartnerBankPayment.savePayeeBtn.jsClick();
    nickName = "nickName" + generatedID();
    await _PaymentsPages.PartnerBankPayment.payeeNickName.input(nickName);
    await _PaymentsPages.PartnerBankPayment.addPayeeBtn.click();
    await _PaymentsPages.PartnerBankPayment.PHPamount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
    txnRef = "txnRef" + generatedID();
    await _PaymentsPages.PartnerBankPayment.txnRef.input(txnRef)
    await _PaymentsPages.PartnerBankPayment.nextButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Preview();
    await _PaymentsPages.PartnerBankPayment.submitButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Submitted();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
      reference1 = data;
    });
    await ensure(_PaymentsPages.PartnerBankPayment).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference1);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount),
      await ensure(_PaymentsPages.PartnerBankPayment.amountView).textContains(utils.formatStr2Money(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
      await ensure(_PaymentsPages.PartnerBankPayment.paymentDateView).isNotEmpty(),
      //await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),

    ]);
  });

  it('Create PartnerBank Payment with Philipines and Payment Type = Auto Credit Arrangement', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PartnerBankPayment);
    await _PaymentsPages.PartnerBankPayment.loadCondition();
    await _PaymentsPages.PartnerBankPayment.partnerBankCountry.select(testData.PartnerBank.partnerBankCountryPHP);
    await _PaymentsPages.PartnerBankPayment.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount);
    await _PaymentsPages.PartnerBankPayment.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentTypeCredit);
    await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
    await _PaymentsPages.PartnerBankPayment.newPayeeAcctNum.input(testData.PartnerBank.newPayeeAcctNum);
    await _PaymentsPages.PartnerBankPayment.payeeAddress.input(testData.PartnerBank.payeeAddress);
    await _PaymentsPages.PartnerBankPayment.payeeZipCode.input(testData.PartnerBank.payeeZipCode);
    await _PaymentsPages.PartnerBankPayment.savePayeeBtn.jsClick();
    nickName = "nickName" + generatedID();
    await _PaymentsPages.PartnerBankPayment.payeeNickName.input(nickName);
    await _PaymentsPages.PartnerBankPayment.addPayeeBtn.click();
    await _PaymentsPages.PartnerBankPayment.PHPamount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
    clientRefNum = "clientRefNum" + generatedID();
    await _PaymentsPages.PartnerBankPayment.clientRefNum.input(clientRefNum)
    txnRef = "txnRef" + generatedID();
    await _PaymentsPages.PartnerBankPayment.txnRef.input(txnRef)
    customerRef = 'customerRef' + generatedID();
    await _PaymentsPages.PartnerBankPayment.customerRef.input(customerRef)
    await _PaymentsPages.PartnerBankPayment.nextButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Preview();
    await _PaymentsPages.PartnerBankPayment.submitButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Submitted();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
      reference1 = data;
    });
    await ensure(_PaymentsPages.PartnerBankPayment).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(customerRef);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount),
      await ensure(_PaymentsPages.PartnerBankPayment.amountView).textContains(utils.formatStr2Money(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
      await ensure(_PaymentsPages.PartnerBankPayment.paymentDateView).isNotEmpty(),
      //await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
    ]);
  });

  it('Create PartnerBank Payment with Philipines and Payment Type = High Value Payment - RTGS', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PartnerBankPayment);
    await _PaymentsPages.PartnerBankPayment.loadCondition();
    await _PaymentsPages.PartnerBankPayment.partnerBankCountry.select(testData.PartnerBank.partnerBankCountryPHP);
    await _PaymentsPages.PartnerBankPayment.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount);
    await _PaymentsPages.PartnerBankPayment.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentTypeHVT);
    await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
    await _PaymentsPages.PartnerBankPayment.newPayeeName.input(testData.PartnerBank.newPayeeName)
    await _PaymentsPages.PartnerBankPayment.payeeBankID.input("ANZB01")
    await _PaymentsPages.PartnerBankPayment.payeeBankResult.jsClick();
    await _PaymentsPages.PartnerBankPayment.newPayeeAcctNum.input(testData.PartnerBank.newPayeeAcctNum);
    await _PaymentsPages.PartnerBankPayment.savePayeeBtn.jsClick();
    nickName = "nickName" + generatedID();
    await _PaymentsPages.PartnerBankPayment.payeeNickName.input(nickName);
    await _PaymentsPages.PartnerBankPayment.addPayeeBtn.click();
    await _PaymentsPages.PartnerBankPayment.PHPamount.input(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR);
    txnRef = "txnRef" + generatedID();
    await _PaymentsPages.PartnerBankPayment.txnRef.input(txnRef)
    await _PaymentsPages.PartnerBankPayment.showOption.jsClick();
    await _PaymentsPages.PartnerBankPayment.beneRef.input("123123");
    await _PaymentsPages.PartnerBankPayment.bankInfo.input("123123");
    await _PaymentsPages.PartnerBankPayment.payeeAddress1.input("address1")
    customerRef = 'customerRef' + generatedID();
    await _PaymentsPages.PartnerBankPayment.customerRef.input(customerRef)
    await _PaymentsPages.PartnerBankPayment.nextButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Preview();
    await _PaymentsPages.PartnerBankPayment.submitButton.click();
    await _PaymentsPages.PartnerBankPayment.loadCondition4Submitted();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
      reference1 = data;
    });
    await ensure(_PaymentsPages.PartnerBankPayment).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(customerRef);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.fromAccountView).textContains(SIT ? testData.PartnerBank.SIT.PHPaccount : testData.PartnerBank.UAT.PHPaccount),
      await ensure(_PaymentsPages.PartnerBankPayment.amountView).textContains(utils.formatStr2Money(SIT ? testData.PartnerBank.SIT.amountVR : testData.PartnerBank.UAT.amountVR)),
      await ensure(_PaymentsPages.PartnerBankPayment.paymentDateView).isNotEmpty(),
      //await ensure(_PaymentsPages.PartnerBankPayment.payeeNameView).textContains(testData.PartnerBank.newPayeeName),
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
    ]);
  });
});



describe('Verify&Release Payments', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.PartnerBank.SIT.login.loginCompanyId : testData.PartnerBank.UAT.login.loginCompanyId,
      SIT ? testData.PartnerBank.SIT.login.verifyUserId : testData.PartnerBank.UAT.login.verifyUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Verify PartnerBank Payment', async function () {
    await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference, 'Partner Bank Payment').then(reference => {
      reference4VR = reference;
    })
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4VR);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textIs(testData.status.PendingApproval),
    ]);
  });

  //approve the "reference"
  it('Approve PartnerBank Payment', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await _PaymentsPages.PartnerBankPayment.approveButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input(testData.CrossBorder.responseCode);
    await _PaymentsPages.PartnerBankPayment.approveButton.click();
    await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
  });


  it('Release PartnerBank Payment', async function () {

    await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference, reference4VR, 'Partner Bank Payment').then(reference => {
      reference4VR = reference;
    })
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4VR);
    await _PaymentsPages.PartnerBankPayment.loadCondition4View();
    await Promise.all([
      await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
    ]);
  });

});


//for ApproveNow M-Challenge and ApproveNow without M-Challenge, they decided by amount
async function approveNow(amount: string, challengeEle: TextInput, challengeText: string): Promise<void> {
  await _PaymentsPages.openMenu(Menu.Payments.PartnerBankPayment);
  await _PaymentsPages.PartnerBankPayment.loadCondition();
  await _PaymentsPages.PartnerBankPayment.partnerBankCountry.select(testData.PartnerBank.partnerBankCountry);
  await _PaymentsPages.PartnerBankPayment.fromAccountOLD.select(SIT ? testData.PartnerBank.SIT.account : testData.PartnerBank.UAT.account);
  await _PaymentsPages.PartnerBankPayment.ptnBnkPaymentType.select(testData.PartnerBank.ptnBnkPaymentType);
  await _PaymentsPages.PartnerBankPayment.addExistingPayee(SIT ? testData.PartnerBank.SIT.existingPayeeName : testData.PartnerBank.UAT.existingPayeeName);
  await _PaymentsPages.PartnerBankPayment.amount.input(amount);
  await _PaymentsPages.PartnerBankPayment.nextButton.click();
  await _PaymentsPages.PartnerBankPayment.loadCondition4Preview();
  await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClick();
  await ensure(challengeEle).textContains(challengeText);
  await _PaymentsPages.BulkPaymentpage.getChallengeSMS.jsClickIfExist();
  await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.CrossBorder.responseCode);
  await _PaymentsPages.PartnerBankPayment.submitButton.click();
  await _PaymentsPages.PartnerBankPayment.loadCondition4Submitted();
  await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
    reference4ApproveNow = data;
    console.log(reference4ApproveNow);
  });
  await ensure(_PaymentsPages.PartnerBankPayment).isUXSuccess();
  await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
  await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4ApproveNow);
  await _PaymentsPages.PartnerBankPayment.loadCondition4View();
  await Promise.all([
    await ensure(_PaymentsPages.PartnerBankPayment.statusLableView).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
  ]);
}
