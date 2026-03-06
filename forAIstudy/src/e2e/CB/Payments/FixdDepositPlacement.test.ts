/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { SIT, handlerCase, ensure } from "../../../lib";
const lib_1 = require("../../../lib");
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData("SG_testData.json");
let reference ='';
let reference2 ='';

describe("Fixed Deposit Placement", async function() {

  this.retries(browser.params.caseRetryTimes);

  before(async function() {
    await new NavigatePages().loginCB(
      SIT ? testData.fixedDepositPlacement.SIT.login.loginCompanyId : testData.fixedDepositPlacement.UAT.login.loginCompanyId,
      SIT ? testData.fixedDepositPlacement.SIT.login.loginUserId : testData.fixedDepositPlacement.UAT.login.loginUserId
    );
  });

  const suitObject = this;beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Create a Fixed Deposit Placement", async function() {
    await createFixedDepositPlacement().then(text=>{
        reference = text;
    });
    await ensure(_PaymentsPages.fixedDepositPlacementPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
    await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
    await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();

    await Promise.all([
    	await ensure(_PaymentsPages.fixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.fixedDepositPlacement.SIT.fundingAccount : testData.fixedDepositPlacement.UAT.fundingAccount),
		await ensure(_PaymentsPages.fixedDepositPlacementPage.fixedDepositAccountValue).textContains(SIT ? testData.fixedDepositPlacement.SIT.fixdDepositAccount : testData.fixedDepositPlacement.UAT.fixdDepositAccount),
		await ensure(_PaymentsPages.fixedDepositPlacementPage.depositAmountValue).textContains(testData.fixedDepositPlacement.amount),
        await ensure(_PaymentsPages.fixedDepositPlacementPage.tenor).isNotEmpty(),
        await ensure(_PaymentsPages.fixedDepositPlacementPage.interestRate).isNotEmpty(),
        await ensure(_PaymentsPages.fixedDepositPlacementPage.depositDate).isNotEmpty(),
        await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
	]);
  });

  it('Edit Fixed Deposit Placement', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
    if (0 !== reference.trim().length) {
    	await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
    } else {
    	await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaSearch(testData.status.PendingApproval);
    }
    await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
    await _PaymentsPages.fixedDepositPlacementPage.editButton.jsClick();
    await _PaymentsPages.fixedDepositPlacementPage.loadCondition();
    await _PaymentsPages.fixedDepositPlacementPage.amount.input(testData.fixedDepositPlacement.amountEdit);
    await _PaymentsPages.fixedDepositPlacementPage.loadGetRatesButton();
    await _PaymentsPages.fixedDepositPlacementPage.getRatesButton.click();
    await _PaymentsPages.fixedDepositPlacementPage.tenorRadio.jsClick();
    await _PaymentsPages.fixedDepositPlacementPage.nextButton.click();
    await _PaymentsPages.fixedDepositPlacementPage.loadConditionForPrevewPage();
    await _PaymentsPages.fixedDepositPlacementPage.submitButton.click();
    await _PaymentsPages.fixedDepositPlacementPage.loadConditionForSubmittedPage();
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
    await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
    await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();

    await Promise.all([
      await ensure(_PaymentsPages.fixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.fixedDepositPlacement.SIT.fundingAccount : testData.fixedDepositPlacement.UAT.fundingAccount),
      await ensure(_PaymentsPages.fixedDepositPlacementPage.fixedDepositAccountValue).textContains(SIT ? testData.fixedDepositPlacement.SIT.fixdDepositAccount : testData.fixedDepositPlacement.UAT.fixdDepositAccount),
      await ensure(_PaymentsPages.fixedDepositPlacementPage.depositAmountValue).textContains(testData.fixedDepositPlacement.amountEdit),
      await ensure(_PaymentsPages.fixedDepositPlacementPage.tenor).isNotEmpty(),
      await ensure(_PaymentsPages.fixedDepositPlacementPage.interestRate).isNotEmpty(),
      await ensure(_PaymentsPages.fixedDepositPlacementPage.depositDate).isNotEmpty(),
      await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
    ]);
  });

  it('Reject Fixed Deposit Placement', async function () {
      await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
	  if (0 !== reference.trim().length) {
		  await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
	  } else {
		  await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaSearch(testData.status.PendingApproval);
	  }
      await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
      await _PaymentsPages.fixedDepositPlacementPage.rejectButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.reasonForRejection.input(testData.fixedDepositPlacement.rejectReason);
      await _PaymentsPages.fixedDepositPlacementPage.rejectDialogButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.dismissButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
      await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
      await Promise.all([
        await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.Rejected)
      ]);
  });

  it('Delete Fixed Deposit Placement', async function () {
      await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
      if (0 !== reference.trim().length) {
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
      } else {
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaSearch(testData.status.PendingApproval);
      }
      await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
      await _PaymentsPages.fixedDepositPlacementPage.deleteButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.deleteDialogButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.dismissButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.transferCenterfilter.input(reference.trim());
      await lib_1.ensure(_PaymentsPages.fixedDepositPlacementPage.transactionResult).textIs(testData.fixedDepositPlacement.labelNoInformationDisplay);
  });

  it('Approve Fixed Deposit Placement', async function () {
      await createFixedDepositPlacement().then(text=>{
          reference2 = text;
      });
      await ensure(_PaymentsPages.fixedDepositPlacementPage).isUXSuccess();
      await _PaymentsPages.openMenu(Menu.Payments.FixedDepositApproval);
      await _PaymentsPages.fixedDepositPlacementPage.loadFdApprovalCondition();
      await _PaymentsPages.fixedDepositPlacementPage.transferCenterfilter.input(reference2.trim());
      await _PaymentsPages.fixedDepositPlacementPage.selectedAllButton.jsClick();
      await _PaymentsPages.fixedDepositPlacementPage.fdApproveButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.getChallengeSMS.jsClick();
      await _PaymentsPages.fixedDepositPlacementPage.challengeResponse.input(testData.fixedDepositPlacement.challengeResponse);
      await _PaymentsPages.fixedDepositPlacementPage.loadApproveButton();
      await _PaymentsPages.fixedDepositPlacementPage.approveButton.click();
      await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
      await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2.trim());
      await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
      await Promise.all([
      	await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved,testData.status.PartialApproved)
      ]);
  });

  it("Create with Approve now", async function() {
      await _PaymentsPages.openMenu(Menu.Payments.FixedDepositPlacement);
      await _PaymentsPages.fixedDepositPlacementPage.loadCondition();
      await _PaymentsPages.fixedDepositPlacementPage.fundingAccount.select(SIT ? testData.fixedDepositPlacement.SIT.fundingAccount : testData.fixedDepositPlacement.UAT.fundingAccount);
      await _PaymentsPages.fixedDepositPlacementPage.loadFixdDepositAccount();
      await _PaymentsPages.fixedDepositPlacementPage.fixdDepositAccount.select(SIT ? testData.fixedDepositPlacement.SIT.fixdDepositAccount : testData.fixedDepositPlacement.UAT.fixdDepositAccount);
      await _PaymentsPages.fixedDepositPlacementPage.amount.input(testData.fixedDepositPlacement.amount);
      await _PaymentsPages.fixedDepositPlacementPage.loadGetRatesButton();
      await _PaymentsPages.fixedDepositPlacementPage.getRatesButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.tenorRadio.jsClick();
      await _PaymentsPages.fixedDepositPlacementPage.nextButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.loadConditionForPrevewPage();
      await _PaymentsPages.fixedDepositPlacementPage.approveNowCheckBox.jsClickIfExist();
      await _PaymentsPages.fixedDepositPlacementPage.getChallengeSMS.jsClickIfExist();
      await _PaymentsPages.fixedDepositPlacementPage.challengeResponse.input(testData.fixedDepositPlacement.challengeResponse);
      await _PaymentsPages.fixedDepositPlacementPage.submitButton.click();
      await _PaymentsPages.fixedDepositPlacementPage.getInfoReferenceID().then(text => {
          reference2 = text;
      });
      await ensure(_PaymentsPages.fixedDepositPlacementPage).isUXSuccess();
      await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
      await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2.trim());
      await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();

      await Promise.all([
        await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.Approved),
      ]);
  });
});
export async function createFixedDepositPlacement() {
    let ref = '';
    await _PaymentsPages.openMenu(Menu.Payments.FixedDepositPlacement);
    await _PaymentsPages.fixedDepositPlacementPage.loadCondition();
    await _PaymentsPages.fixedDepositPlacementPage.fundingAccount.select(SIT ? testData.fixedDepositPlacement.SIT.fundingAccount : testData.fixedDepositPlacement.UAT.fundingAccount);
    await _PaymentsPages.fixedDepositPlacementPage.loadFixdDepositAccount();
    await _PaymentsPages.fixedDepositPlacementPage.fixdDepositAccount.select(SIT ? testData.fixedDepositPlacement.SIT.fixdDepositAccount : testData.fixedDepositPlacement.UAT.fixdDepositAccount);
    await _PaymentsPages.fixedDepositPlacementPage.amount.input(testData.fixedDepositPlacement.amount);
    await _PaymentsPages.fixedDepositPlacementPage.loadGetRatesButton();
    await _PaymentsPages.fixedDepositPlacementPage.getRatesButton.click();
    await _PaymentsPages.fixedDepositPlacementPage.tenorRadio.jsClick();
    await _PaymentsPages.fixedDepositPlacementPage.nextButton.click();
    await _PaymentsPages.fixedDepositPlacementPage.loadConditionForPrevewPage();
    await _PaymentsPages.fixedDepositPlacementPage.submitButton.click();
    await _PaymentsPages.fixedDepositPlacementPage.loadConditionForSubmittedPage();
    await _PaymentsPages.fixedDepositPlacementPage.getInfoReferenceID().then(text => {
        ref = text;
    });
    return  ref;
}
