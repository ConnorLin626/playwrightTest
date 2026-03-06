
/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { SIT, handlerCase, ensure } from "../../../lib";
const lib_1 = require("../../../lib");
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe("Fixed Call Deposit Placement MVP2", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.FixedDeposit.HKAccount.SIT.loginCompanyId : testData.FixedDeposit.HKAccount.UAT.loginCompanyId,
      SIT ? testData.FixedDeposit.HKAccount.SIT.loginUserId : testData.FixedDeposit.HKAccount.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Create Fixed Deposit Placement", async function () {
    let reference = '';
    await createFixedDepositPlacement().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.FixedDepositMVP2Page).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
    await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
    await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(reference.trim());
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();

    await Promise.all([
      await ensure(_PaymentsPages.FixedDepositMVP2Page.fundingAccountValue).textContains(SIT ? testData.FixedDeposit.HKAccount.SIT.fundingAccount : testData.FixedDeposit.HKAccount.UAT.fundingAccount),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.fixedDepositAccountValue).textContains(SIT ? testData.FixedDeposit.HKAccount.SIT.fixdDepositAccount : testData.FixedDeposit.HKAccount.UAT.fixdDepositAccount),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.depositAmountValue).textContains(SIT ? testData.FixedDeposit.HKAccount.SIT.amount : testData.FixedDeposit.HKAccount.UAT.amount),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.tenor).isNotEmpty(),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.interestRate).isNotEmpty(),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.depositDate).isNotEmpty(),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
    ]);
  });
});

describe("Fixed Call Deposit Placement MVP2", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.FixedDeposit.HKBRAccount.SIT.loginCompanyId : testData.FixedDeposit.HKBRAccount.UAT.loginCompanyId,
      SIT ? testData.FixedDeposit.HKBRAccount.SIT.loginUserId : testData.FixedDeposit.HKBRAccount.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Copy Fixed Deposit Placement", async function () {
    let ref1 = '';
    let ref2 = '';
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositPlacement);
    await _PaymentsPages.FixedDepositMVP2Page.loadCondition();
    await _PaymentsPages.FixedDepositMVP2Page.fundingAccount.select(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fundingAccount : testData.FixedDeposit.HKBRAccount.UAT.fundingAccount);
    await _PaymentsPages.FixedDepositMVP2Page.loadFixdDepositAccount();
    await _PaymentsPages.FixedDepositMVP2Page.fixdDepositAccount.select(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fixdDepositAccount : testData.FixedDeposit.HKBRAccount.UAT.fixdDepositAccount);
    await _PaymentsPages.FixedDepositMVP2Page.amount.input(SIT ? testData.FixedDeposit.HKBRAccount.SIT.amount : testData.FixedDeposit.HKBRAccount.UAT.amount);
    await _PaymentsPages.FixedDepositMVP2Page.loadGetRatesButton();
    await _PaymentsPages.FixedDepositMVP2Page.getRatesButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.tenorRadio.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.nextButton.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForPrevewPage();
    await _PaymentsPages.FixedDepositMVP2Page.submitButton.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForSubmittedPage();
    await _PaymentsPages.FixedDepositMVP2Page.getInfoReferenceID().then(text => {
      ref1 = text;
    });
    await ensure(_PaymentsPages.FixedDepositMVP2Page).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
    await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
    await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(ref1.trim());
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();
    await _PaymentsPages.FixedDepositMVP2Page.copyButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.loadCondition();
    await _PaymentsPages.FixedDepositMVP2Page.amount.clean();
    await _PaymentsPages.FixedDepositMVP2Page.amount.input(SIT ? testData.FixedDeposit.HKBRAccount.SIT.amount : testData.FixedDeposit.HKBRAccount.UAT.amount);
    await _PaymentsPages.FixedDepositMVP2Page.getRatesButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.tenorRadio.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.maturityInstruction.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.nextButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForPrevewPage();
    await _PaymentsPages.FixedDepositMVP2Page.submitButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForSubmittedPage();
    await _PaymentsPages.FixedDepositMVP2Page.getInfoReferenceID().then(text => {
      ref2 = text;
    });
    await ensure(_PaymentsPages.FixedDepositMVP2Page).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
    await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
    await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(ref1.trim());
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();
    await Promise.all([
      await ensure(_PaymentsPages.FixedDepositMVP2Page.fundingAccountValue).textContains(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fundingAccount : testData.FixedDeposit.HKBRAccount.UAT.fundingAccount),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.fixedDepositAccountValue).textContains(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fixdDepositAccount : testData.FixedDeposit.HKBRAccount.UAT.fixdDepositAccount),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.depositAmountValue).textContains(SIT ? testData.FixedDeposit.HKBRAccount.SIT.amount : testData.FixedDeposit.HKBRAccount.UAT.amount),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.tenor).isNotEmpty(),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.interestRate).isNotEmpty(),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.depositDate).isNotEmpty(),
      await ensure(_PaymentsPages.FixedDepositMVP2Page.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
    ]);
  });
});

describe("Fixed Call Deposit Placement MVP2", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.FixedDeposit.CNAccount.SIT.loginCompanyId : testData.FixedDeposit.HKBRAccount.UAT.loginCompanyId,
      SIT ? testData.FixedDeposit.CNAccount.SIT.loginUserId : testData.FixedDeposit.HKBRAccount.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Approve Fixed Deposit Placement", async function () {
    let ref = '';
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositPlacement);
    await _PaymentsPages.FixedDepositMVP2Page.loadCondition();
    await _PaymentsPages.FixedDepositMVP2Page.fundingAccount.select(SIT ? testData.FixedDeposit.CNAccount.SIT.fundingAccount : testData.FixedDeposit.HKBRAccount.UAT.fundingAccount);
    //await _PaymentsPages.FixedDepositMVP2Page.fixdDepositAccount.select(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fixdDepositAccount : testData.FixedDeposit.HKBRAccount.UAT.fixdDepositAccount);
    await _PaymentsPages.FixedDepositMVP2Page.amount.input(SIT ? testData.FixedDeposit.CNAccount.SIT.amount : testData.FixedDeposit.HKBRAccount.UAT.amount);
    await _PaymentsPages.FixedDepositMVP2Page.loadGetRatesButton();
    await _PaymentsPages.FixedDepositMVP2Page.getRatesButton.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.tenorRadio.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.nextButton.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForPrevewPage();
    await _PaymentsPages.FixedDepositMVP2Page.submitButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForSubmittedPage();
    await _PaymentsPages.FixedDepositMVP2Page.getInfoReferenceID().then(text => {
      ref = text;
    });
    await ensure(_PaymentsPages.FixedDepositMVP2Page).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositApproval);
    await _PaymentsPages.FixedDepositMVP2Page.loadFdApprovalCondition();
    await _PaymentsPages.FixedDepositMVP2Page.transferCenterfilter.input(ref.trim());
    await _PaymentsPages.FixedDepositMVP2Page.selectedAllButton.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.fdApproveButton.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.getChallengeSMS.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.challengeResponse.input(SIT ? testData.FixedDeposit.CNAccount.SIT.challengeResponse : testData.FixedDeposit.CNAccount.UAT.challengeResponse);
    await _PaymentsPages.FixedDepositMVP2Page.loadApproveButton();
    await _PaymentsPages.FixedDepositMVP2Page.approveButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
    await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
    await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(ref.trim());
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();
    await Promise.all([
      await ensure(_PaymentsPages.FixedDepositMVP2Page.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received)
    ]);
  });
});

export async function createFixedDepositPlacement() {
  let ref = '';
  await _PaymentsPages.openMenu(Menu.Payments.FixedDepositPlacement);
  await _PaymentsPages.FixedDepositMVP2Page.loadCondition();
  await _PaymentsPages.FixedDepositMVP2Page.fundingAccount.select(SIT ? testData.FixedDeposit.HKAccount.SIT.fundingAccount : testData.FixedDeposit.HKAccount.UAT.fundingAccount);
  await _PaymentsPages.FixedDepositMVP2Page.loadFixdDepositAccount();
  if (!SIT) {
    await _PaymentsPages.FixedDepositMVP2Page.fixdDepositAccount.select(testData.FixedDeposit.HKAccount.UAT.fixdDepositAccount);
  }
  //await _PaymentsPages.FixedDepositMVP2Page.fixdDepositAccount.select(SIT ? testData.FixedDeposit.SIT.fixdDepositAccount : testData.FixedDeposit.UAT.fixdDepositAccount);
  await _PaymentsPages.FixedDepositMVP2Page.fixdDepositAccount.select(testData.FixedDeposit.HKAccount.SIT.fixdDepositAccount);
  await _PaymentsPages.FixedDepositMVP2Page.amount.input(SIT ? testData.FixedDeposit.HKAccount.SIT.amount : testData.FixedDeposit.HKAccount.UAT.amount);
  await _PaymentsPages.FixedDepositMVP2Page.loadGetRatesButton();
  await _PaymentsPages.FixedDepositMVP2Page.getRatesButton.click();
  await _PaymentsPages.FixedDepositMVP2Page.tenorRadio.jsClick();
  await _PaymentsPages.FixedDepositMVP2Page.nextButton.click();
  await _PaymentsPages.FixedDepositMVP2Page.loadConditionForPrevewPage();
  await _PaymentsPages.FixedDepositMVP2Page.submitButton.click();
  await _PaymentsPages.FixedDepositMVP2Page.loadConditionForSubmittedPage();
  await _PaymentsPages.FixedDepositMVP2Page.getInfoReferenceID().then(text => {
    ref = text;
  });
  return ref;
}
