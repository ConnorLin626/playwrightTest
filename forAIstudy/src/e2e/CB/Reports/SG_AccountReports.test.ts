/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ReportsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, SIT, generatedID, handlerCase } from '../../../lib';
import { browser } from "protractor";

let _AccountReportsPage = new ReportsPages();
let testData = _AccountReportsPage.fetchTestData("SG_testData.json");

describe("Account Reports", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId,
      SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Account Reports-Incoming and Outgoing Remittance Summary", async function () {
    await _AccountReportsPage.openMenu(Menu.Reports.AccountReports);
    await _AccountReportsPage.accountReportsPage.loadCondition();
    await _AccountReportsPage.accountReportsPage.IncomingOutgoingPersonaliseButton.click();
    await _AccountReportsPage.accountReportsPage.loadConditionOnEditPage();
    let AccountReportsName = 'IncomingOutgoing' + generatedID();
    await _AccountReportsPage.accountReportsPage.customRptNameText.input(AccountReportsName);
    await _AccountReportsPage.accountReportsPage.selectedTransactionTypes.select(testData.Reports.selectTransactionType);
    await _AccountReportsPage.accountReportsPage.selectedTransactionTypesBtn.jsClick();
    await _AccountReportsPage.accountReportsPage.toRelDate.select(testData.Reports.toRelDate);
    await _AccountReportsPage.accountReportsPage.previewButton.jsClick();
    await _AccountReportsPage.accountReportsPage.loadConditionOnPreviewPage();
    await _AccountReportsPage.accountReportsPage.submitButton.jsClick();
    await ensure(_AccountReportsPage.accountReportsPage).isI3Success();
    await _AccountReportsPage.accountReportsPage.loadCondition();
    await _AccountReportsPage.accountReportsPage.firstEditButton.click();
    await _AccountReportsPage.accountReportsPage.loadConditionOnEditPage();
    await ensure(_AccountReportsPage.accountReportsPage.customRptNameText).textContains(testData.Reports.IncomingOutgoingSummaryCustomRptName);
    await _AccountReportsPage.accountReportsPage.cancelButton.click();
    await _AccountReportsPage.accountReportsPage.loadCondition();
    await _AccountReportsPage.accountReportsPage.firstViewButton.click();
    await _AccountReportsPage.accountReportsPage.loadConditionOnReportPage();
  });
});