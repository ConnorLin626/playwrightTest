/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ReportsPages } from '../../../pages/CB';
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _PaymentReportsPage = new ReportsPages();
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentReportsPage.fetchTestData("HK_testData.json");

describe("Remittance Advice Report", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId,
      SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Remittance Advice Report - HK FPS", async function () {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.transferCenterfilter.input(testData.Reports.HKCompletedFPSRef);
    await _PaymentsPages.transferCentersPage.showAdditionFilter.click();
    await _PaymentsPages.transferCentersPage.paymentDateFrom.select(testData.Reports.paymentDateFrom);
    await _PaymentsPages.transferCentersPage.paymentDateTo.select(testData.Reports.paymentDateTo);
    await _PaymentsPages.transferCentersPage.searchButton.click();
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.completedReportButton.jsClick();
    await _PaymentReportsPage.paymentReportsPage.loadConditionForRemittanceReportTitlePage();
    await ensure(_PaymentReportsPage.paymentReportsPage.reportTitle).textContains(testData.Reports.HKFPSRemittanceReportTitle);
    await ensure(_PaymentReportsPage.paymentReportsPage.purposeCodeValue).textContains(testData.Reports.HKFPSRemittanceReportPurposeCodeValue);
  });
});
