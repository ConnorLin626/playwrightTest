/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, randomNumbers, waitForI3Loading, SIT, handlerCase } from '../../../lib';
import { browser } from "protractor";

// this from OnlineCreate, then Approval/Edit/Reject/Delete
let reference = "";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData("SG_testData.json");

describe("Stop Cheque Payments", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.StopChequePayment.SIT.loginCompanyId : testData.StopChequePayment.SIT.loginCompanyId,
      SIT ? testData.StopChequePayment.SIT.loginUserId : testData.StopChequePayment.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Create a Stop Cheque Payment-Cheque Express", async function () {
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGStopCheque);
    await _PaymentsPages.stopChequePage.loadCondition();
    await _PaymentsPages.stopChequePage.stopI3Cheque.click();
    await _PaymentsPages.stopChequePage.accountNumberI3Stop.select(testData.StopChequePayment.fromAccount);
    await _PaymentsPages.stopChequePage.loadConditionForDebitAccountSelectValue();
    await _PaymentsPages.stopChequePage.debitAccountSelect.valueContains(testData.StopChequePayment.fromAccount);
    await _PaymentsPages.stopChequePage.selectChequeType.selectByValue("0");
    let chequeNumber = randomNumbers();
    await _PaymentsPages.stopChequePage.inputChequeNumber.input(chequeNumber);
    await _PaymentsPages.stopChequePage.previewI3Button.click();
    await _PaymentsPages.stopChequePage.loadConditionForSubmit();
    await _PaymentsPages.stopChequePage.submitI3Button.jsClick();
    await _PaymentsPages.stopChequePage.getI3ReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.stopChequePage).isI3Success();
    await _PaymentsPages.stopChequePage.goToViewStopChequeViaRef(reference);
    await _PaymentsPages.stopChequePage.loadConditionOnView();
    await Promise.all([
      await ensure(_PaymentsPages.stopChequePage.fromAccountValue).textContains(testData.StopChequePayment.fromAccount),
      await ensure(_PaymentsPages.stopChequePage.chequeNumberValue).textContains(chequeNumber),
      await ensure(_PaymentsPages.stopChequePage.statusValue).textIs(testData.status.PendingApproval),
    ]);
  });

  it("Edit a Stop Cheque Payment", async function () {
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGStopCheque);
    if (reference) {
      await _PaymentsPages.stopChequePage.goToViewStopChequeViaRef(reference);
      await _PaymentsPages.stopChequePage.loadConditionOnView();
    } else {
      await _PaymentsPages.stopChequePage.loadCondition();
      await _PaymentsPages.stopChequePage.stopChequeRef.click();
    }
    await _PaymentsPages.stopChequePage.editButton.jsClick();
    await _PaymentsPages.stopChequePage.reasonStopChequeOnEditPage.clean();
    await _PaymentsPages.stopChequePage.reasonStopChequeOnEditPage.input(testData.StopChequePayment.reason);
    await _PaymentsPages.stopChequePage.previewEditButton.click();
    await _PaymentsPages.stopChequePage.loadConditionForSubmitEdit();
    await _PaymentsPages.stopChequePage.submitEditButton.jsClick();
    await _PaymentsPages.stopChequePage.getI3ReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.stopChequePage).isI3Success();
    await _PaymentsPages.stopChequePage.goToViewStopChequeViaRef(reference);
    await _PaymentsPages.stopChequePage.loadConditionOnView();
    await ensure(_PaymentsPages.stopChequePage.reasonStopChequeValue).textContains(testData.StopChequePayment.reason);
  });

  it("Approve a Stop Cheque Payment", async function () {
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGStopCheque);
    if (reference) {
      await _PaymentsPages.stopChequePage.goToViewStopChequeViaRef(reference);
      await _PaymentsPages.stopChequePage.loadConditionOnView();
    } else {
      await _PaymentsPages.stopChequePage.loadCondition();
      await _PaymentsPages.stopChequePage.stopChequeRef.click();
    }
    await waitForI3Loading();
    await _PaymentsPages.stopChequePage.referenceValue.getText().then(text => {
      reference = text.trim();
    });
    await _PaymentsPages.stopChequePage.approveButton.click();
    await _PaymentsPages.stopChequePage.loadConditionForApprove();
    await _PaymentsPages.stopChequePage.challengeResponseI3.input(testData.StopChequePayment.enterResponseI3Text);
    await _PaymentsPages.stopChequePage.approveButtonOnChallenge.jsClick();
    await ensure(_PaymentsPages.stopChequePage).isI3Success();
    await _PaymentsPages.stopChequePage.goToViewStopChequeViaRef(reference);
    await _PaymentsPages.stopChequePage.loadConditionOnView();
    await ensure(_PaymentsPages.stopChequePage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.Rejected);
  });

  it("Create a Stop Cheque Payment-Corporate Cheque", async function () {
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGStopCheque);
    await _PaymentsPages.stopChequePage.loadCondition();
    await _PaymentsPages.stopChequePage.stopI3Cheque.click();
    await _PaymentsPages.stopChequePage.loadConditionForCreatePage();
    await _PaymentsPages.stopChequePage.accountNumberI3Stop.select(testData.StopChequePayment.fromAccount);
    await _PaymentsPages.stopChequePage.loadConditionForDebitAccountSelectValue();
    await _PaymentsPages.stopChequePage.debitAccountSelect.valueContains(testData.StopChequePayment.fromAccount);
    await _PaymentsPages.stopChequePage.selectChequeType.selectByValue("1");
    let chequeNumber = randomNumbers();
    await _PaymentsPages.stopChequePage.inputChequeNumber.input(chequeNumber);
    await _PaymentsPages.stopChequePage.previewI3Button.click();
    await _PaymentsPages.stopChequePage.loadConditionForSubmit();
    await _PaymentsPages.stopChequePage.submitI3Button.jsClick();
    await _PaymentsPages.stopChequePage.getI3ReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.stopChequePage).isI3Success();
  });

  it("Delete a Stop Cheque Payment", async function () {
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGStopCheque);
    if (reference) {
      await _PaymentsPages.stopChequePage.goToViewStopChequeViaRef(reference);
      await _PaymentsPages.stopChequePage.loadConditionOnView();
    } else {
      await _PaymentsPages.stopChequePage.loadCondition();
      await _PaymentsPages.stopChequePage.filterButton.jsClick();
      await _PaymentsPages.stopChequePage.chequeType.select("Show All");
      await _PaymentsPages.stopChequePage.chequeStatus.select(testData.status.PendingApproval);
      await _PaymentsPages.stopChequePage.custRefNo.clean();
      await _PaymentsPages.stopChequePage.goButton.jsClick();
      await _PaymentsPages.stopChequePage.loadConditionForReferenceLinkI3();
      await _PaymentsPages.stopChequePage.stopChequeRef.click();
    }
    await _PaymentsPages.stopChequePage.deleteButton.click();
    await _PaymentsPages.stopChequePage.loadConditionForSubmitDelete();
    await _PaymentsPages.stopChequePage.submitDelete.click();
    await _PaymentsPages.stopChequePage.getI3ReferenceID().then(text => {
      reference = text;
    });
    await ensure(_PaymentsPages.stopChequePage).isI3Success();
    await _PaymentsPages.stopChequePage.filter2Button.jsClick();
    await _PaymentsPages.stopChequePage.chequeType.select("Show All");
    await _PaymentsPages.stopChequePage.chequeStatus.select("Show All");
    await _PaymentsPages.stopChequePage.custRefNo.clean();
    await _PaymentsPages.stopChequePage.custRefNo.input(reference);
    await _PaymentsPages.stopChequePage.goButton.click();
    await _PaymentsPages.stopChequePage.loadCondition();
    await ensure(_PaymentsPages.stopChequePage.transactionResult).textContains(testData.StopChequePayment.labelNoInformationDisplay);
  });
});