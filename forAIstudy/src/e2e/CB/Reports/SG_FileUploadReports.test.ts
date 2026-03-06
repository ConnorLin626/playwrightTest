/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ReportsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import * as moment from 'moment';
import { browser } from "protractor";

let _FileUploadReportsPage = new ReportsPages();
let testData = _FileUploadReportsPage.fetchTestData("SG_testData.json");

describe("File Upload Reports", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Reports.SIT.loginCompanyId : testData.Reports.UAT.loginCompanyId,
      SIT ? testData.Reports.SIT.loginUserId : testData.Reports.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("File Upload Reports-Transaction Detail", async function () {
    let fileUploadFromPaymentDate = moment(new Date()).subtract(2, 'days').format('DD-MMM-YYYY');
    await _FileUploadReportsPage.openMenu(Menu.Reports.FileUploadReports);
    await _FileUploadReportsPage.fileUploadReportsPage.loadCondition();
    await _FileUploadReportsPage.fileUploadReportsPage.transactionDetailPersonaliseButton.click();
    await _FileUploadReportsPage.fileUploadReportsPage.loadConditionOnEditPage();
    await ensure(_FileUploadReportsPage.fileUploadReportsPage.transactionDetailTitle).textContains(testData.Reports.transactionDetailReportTitle);
    await _FileUploadReportsPage.fileUploadReportsPage.fromPaymentDate.input(fileUploadFromPaymentDate);
    await _FileUploadReportsPage.fileUploadReportsPage.viewButton.jsClick();
    await _FileUploadReportsPage.fileUploadReportsPage.loadConditionOnReportPage(50000);
    await ensure(_FileUploadReportsPage.fileUploadReportsPage.transactionDetailFromAccountValue).isNotEmpty();
  });
});