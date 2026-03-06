/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ReportsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { ensure, SIT, generatedID, handlerCase } from '../../../lib';
import { browser } from "protractor";

let _PaymentReportsPage = new ReportsPages();
let testData = _PaymentReportsPage.fetchTestData("SG_testData.json");

describe("Payment Reports", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId,
      SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Payment Reports-Transfer Summary", async function () {
    await _PaymentReportsPage.openMenu(Menu.Reports.PaymentReports);
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await _PaymentReportsPage.paymentReportsPage.transferSummaryPersonaliseButton.click();
    //await devWatch();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
    let PaymentReportsName = 'TransferSummary' + generatedID();
    await _PaymentReportsPage.paymentReportsPage.customRptNameText.input(PaymentReportsName);
    await _PaymentReportsPage.paymentReportsPage.fromRelDate.select(testData.Reports.fromRelDate);
    await _PaymentReportsPage.paymentReportsPage.continueButton.jsClick();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnPreviewPage();
    await _PaymentReportsPage.paymentReportsPage.updateButton.jsClick();
    await ensure(_PaymentReportsPage.paymentReportsPage).isI3Success();
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await _PaymentReportsPage.paymentReportsPage.firstEditButton.click();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
    await ensure(_PaymentReportsPage.paymentReportsPage.customRptNameText).textContains(PaymentReportsName);
    await _PaymentReportsPage.paymentReportsPage.cancelButton.jsClick();
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await _PaymentReportsPage.paymentReportsPage.firstViewButton.click();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnReportPage();
    await ensure(_PaymentReportsPage.paymentReportsPage.transferSummaryAccountValue).isNotEmpty();
  });

  // it("Payment Reports-Transfer Details", async function () {
  //   await new NavigatePages().loginCB(
  //     SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId,
  //     SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId
  //   );
  //   await _PaymentReportsPage.openMenu(Menu.Reports.PaymentReports);
  //   await _PaymentReportsPage.paymentReportsPage.loadCondition();
  //   await _PaymentReportsPage.paymentReportsPage.transferDetailPersonaliseButton.click();
  //   //await devWatch();
  //   await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
  //   let PaymentReportsName = 'TransferDetail' + generatedID();
  //   await _PaymentReportsPage.paymentReportsPage.customRptNameText.input(PaymentReportsName);
  //   await _PaymentReportsPage.paymentReportsPage.fromRelDate.select(testData.Reports.fromRelDate);
  //   await _PaymentReportsPage.paymentReportsPage.continueButton.jsClick();
  //   await _PaymentReportsPage.paymentReportsPage.loadConditionOnPreviewPage();
  //   await _PaymentReportsPage.paymentReportsPage.updateButton.jsClick();
  //   await ensure(_PaymentReportsPage.paymentReportsPage).isI3Success();
  //   await _PaymentReportsPage.paymentReportsPage.loadCondition();
  //   await _PaymentReportsPage.paymentReportsPage.firstEditButton.click();
  //   await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
  //   await ensure(_PaymentReportsPage.paymentReportsPage.customRptNameText).textContains(PaymentReportsName);
  //   await _PaymentReportsPage.paymentReportsPage.cancelButton.jsClick();
  //   await _PaymentReportsPage.paymentReportsPage.loadCondition();
  //   await _PaymentReportsPage.paymentReportsPage.firstViewButton.click();
  //   await _PaymentReportsPage.paymentReportsPage.loadConditionOnTxnDetailsReportPage();
  //   await ensure(_PaymentReportsPage.paymentReportsPage.transferDetailAccountValue).isNotEmpty();
  // });

  it("Payment Reports-Transfer Summary Details Standard view", async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId,
      SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId
    );
    await _PaymentReportsPage.openMenu(Menu.Reports.PaymentReports);
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await (SIT ? _PaymentReportsPage.paymentReportsPage.transferSummaryDetailViewButton.click()
      :_PaymentReportsPage.paymentReportsPage.transferSummaryDetailViewUAT.click());
    await ensure(_PaymentReportsPage.paymentReportsPage.DBSLogo).isNotElementPresent();
  });

  it("Payment Reports-Transfer Summary Details Personalise - Personalise view", async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId,
      SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId
    );
    await _PaymentReportsPage.openMenu(Menu.Reports.PaymentReports);
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await (SIT ? _PaymentReportsPage.paymentReportsPage.transferSummaryDetailPersonaliseButton.click()
    :_PaymentReportsPage.paymentReportsPage.transferSummaryDetailPersonaliseUAT.click());
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
    let PaymentReportsName = 'TransferSummaryDetails' + generatedID();
    await _PaymentReportsPage.paymentReportsPage.customRptNameText.input(PaymentReportsName);
    await _PaymentReportsPage.paymentReportsPage.fromRelDate.select(testData.Reports.fromRelDate);
    await _PaymentReportsPage.paymentReportsPage.continueButton.jsClick();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnPreviewPage();
    await _PaymentReportsPage.paymentReportsPage.updateButton.jsClick();
    await ensure(_PaymentReportsPage.paymentReportsPage).isI3Success();
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await _PaymentReportsPage.paymentReportsPage.firstEditButton.click();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
    await ensure(_PaymentReportsPage.paymentReportsPage.customRptNameText).textContains(PaymentReportsName);
    await ensure(_PaymentReportsPage.paymentReportsPage.accounts).isNotEmpty();
    await ensure(_PaymentReportsPage.paymentReportsPage.fromRelDate).isNotEmpty();
    await ensure(_PaymentReportsPage.paymentReportsPage.pmtTypes).isNotEmpty();
    await ensure(_PaymentReportsPage.paymentReportsPage.status).isNotEmpty();
    await ensure(_PaymentReportsPage.paymentReportsPage.deliveryMode).isNotEmpty();
    await _PaymentReportsPage.paymentReportsPage.cancelButton.jsClick();
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await _PaymentReportsPage.paymentReportsPage.firstViewButton.click();
    await ensure(_PaymentReportsPage.paymentReportsPage.DBSLogo).isNotElementPresent();
  });

  it("Payment Reports-Transfer Summary Details EditDelete", async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId,
      SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId
    );
    await _PaymentReportsPage.openMenu(Menu.Reports.PaymentReports);
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await (SIT ? _PaymentReportsPage.paymentReportsPage.transferSummaryDetailPersonaliseButton.click()
      :_PaymentReportsPage.paymentReportsPage.transferSummaryDetailPersonaliseUAT.click());
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
    let PaymentReportsName = 'TransferSummaryDetails' + generatedID();
    await _PaymentReportsPage.paymentReportsPage.customRptNameText.input(PaymentReportsName);
    await _PaymentReportsPage.paymentReportsPage.fromRelDate.select(testData.Reports.fromRelDate);
    await _PaymentReportsPage.paymentReportsPage.continueButton.jsClick();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnPreviewPage();
    await _PaymentReportsPage.paymentReportsPage.updateButton.jsClick();
    await ensure(_PaymentReportsPage.paymentReportsPage).isI3Success();
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await _PaymentReportsPage.paymentReportsPage.firstEditButton.click();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
    await _PaymentReportsPage.paymentReportsPage.customRptNameText.clean();
    let PaymentReportsName1 = 'TransferSummaryDetails' + generatedID();
    await _PaymentReportsPage.paymentReportsPage.customRptNameText.input(PaymentReportsName1);
    await ensure(_PaymentReportsPage.paymentReportsPage.customRptNameText).textContains(PaymentReportsName1);
    await _PaymentReportsPage.paymentReportsPage.continueButton.jsClick();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnPreviewPage();
    await _PaymentReportsPage.paymentReportsPage.updateButton.jsClick();
    await ensure(_PaymentReportsPage.paymentReportsPage).isI3Success();
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await _PaymentReportsPage.paymentReportsPage.firstEditButton.click();
    await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
    await ensure(_PaymentReportsPage.paymentReportsPage.customRptNameText).textContains(PaymentReportsName1);
    await ensure(_PaymentReportsPage.paymentReportsPage.accounts).isNotEmpty();
    await ensure(_PaymentReportsPage.paymentReportsPage.fromRelDate).isNotEmpty();
    await ensure(_PaymentReportsPage.paymentReportsPage.pmtTypes).isNotEmpty();
    await ensure(_PaymentReportsPage.paymentReportsPage.status).isNotEmpty();
    await ensure(_PaymentReportsPage.paymentReportsPage.deliveryMode).isNotEmpty();
    await _PaymentReportsPage.paymentReportsPage.cancelButton.jsClick();
    await _PaymentReportsPage.paymentReportsPage.loadCondition();
    await _PaymentReportsPage.paymentReportsPage.firstDeleteButton.click();
    await _PaymentReportsPage.paymentReportsPage.updateButton.jsClick();
    await ensure(_PaymentReportsPage.paymentReportsPage).isI3Success();
  });

});