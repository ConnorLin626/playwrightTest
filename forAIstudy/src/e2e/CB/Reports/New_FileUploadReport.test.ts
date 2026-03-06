/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import { ReportsPages } from "../../../pages/CB/Reports";
import { NavigatePages } from "../../../pages/Navigate";
import { FilesPages } from "../../../pages/CB";
import { ensure, SIT, handlerCase, TextInput, pageSwitchWindow } from "../../../lib";
import { Menu } from "../../../config/menu";
import moment = require("moment");
const _FilesPages = new FilesPages();
let fileType = "ALL - Universal File Format";

let currentDate = moment(new Date()).format("DD MMM YYYY");
let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData.json");
let pathFileName: string = SIT ? testData.CreateAccountReport.SIT.fileNameForALL : testData.CreateAccountReport.UAT.fileNameForALL;
let fileName: string = _AccountReportsListPage.createAccountReportsPage.getFileName(pathFileName);
let verifyFileName = "";

describe("File Detail Report", async function () {
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Generate File Detail Personalized Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewFileUploadReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition4NewFileUpload();
    await _AccountReportsListPage.acctReportListPage.fileDetailCreateButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.fileDetailPersonButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition4FileUpload();
    await _AccountReportsListPage.createAccountReportsPage.fileStatus.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.fileStatusItem0.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.nextToGenerate.jsClick();
    await processGenerateReport2(_AccountReportsListPage.paymentReportsPage.fileNameValue4FileReports);
    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe('View File Detail Report', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.FastBulkPayment.SIT.loginCompanyId : testData.FastBulkPayment.UAT.loginCompanyId, SIT ? testData.FastBulkPayment.SIT.loginUserId : testData.FastBulkPayment.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('File Upload Payment->Manage File->View File->View Report', async function () {

    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForBPF : testData.FileService.UAT.fileNameForBPF, testData.FileService.approvalOptionByTransaction).then(async data => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.uploadFilePage.DownloadPDF.jsClick();
    // await Promise.all([
    //   await ensure(_FilesPages.uploadFilePage.PaymentDate).isNotEmpty
    // ]);
    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("File Summary Report", async function () {
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Generate File Summary Standard Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewFileUploadReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition4NewFileUpload();
    await _AccountReportsListPage.acctReportListPage.fileSumCreateButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.fileDetailStandardButton.jsClick();
    await processGenerateReport2(_AccountReportsListPage.paymentReportsPage.fileNameValue4FileReports);
    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Transaction Detail Report", async function () {
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Generate Transaction Detail Personalized Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewFileUploadReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition4NewFileUpload();
    await _AccountReportsListPage.acctReportListPage.transactionDetailCreateButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.transactionDetailPersonButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition4FileUpload();
    await _AccountReportsListPage.createAccountReportsPage.fileNameInput.input(fileName);
    await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.accountNotInclude : testData.CreateAccountReport.UAT.accountNotInclude);
    await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
    await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
    await _AccountReportsListPage.createAccountReportsPage.nextToGenerate.jsClick();
    //await processGenerateReport(_AccountReportsListPage.paymentReportsPage.accountValue4FileReports);

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Transaction Summary Report", async function () {
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Generate Transaction Summary Personalized Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewFileUploadReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition4NewFileUpload();
    await _AccountReportsListPage.acctReportListPage.transactionSumCreateButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.transactionSumPersonButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition4FileUpload();
    await _AccountReportsListPage.createAccountReportsPage.fileStatus.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.fileStatusItem0.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.nextToGenerate.jsClick();

    await processGenerateReport2(_AccountReportsListPage.paymentReportsPage.fileNameValue4FileReports1);
    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });

  it("Generate Transaction Summary Standard Report", async function () {
    await new NavigatePages().loginCB(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId);
    await _AccountReportsListPage.openMenu(Menu.Reports.NewFileUploadReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition4NewFileUpload();
    await _AccountReportsListPage.acctReportListPage.transactionSumCreateButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.transactionSumStandardButton.jsClick();

    await processGenerateReport3(_AccountReportsListPage.paymentReportsPage.fileNameValue4FileReports1);
  });
});

async function processGenerateReport(accountElement: TextInput) {
  await loadCondition4FileReport(accountElement);
  await Promise.all([
    await ensure(accountElement).isNotEmpty(),
  ]);
}
async function processGenerateReport2(accountElement: TextInput) {
  await loadCondition4FileReport(accountElement);
  await Promise.all([
    await ensure(accountElement).isNotEmpty(),
  ]);
}

//The "Generate Transaction Summary Standard Report" cannot locate, still no idea, so use sleep in loadCondition4FileReport1
async function processGenerateReport3(accountElement: TextInput) {
  await loadCondition4FileReport1();
}

async function loadCondition4FileReport(accountElement: TextInput) {
  await browser.wait(ExpectedConditions.stalenessOf(_AccountReportsListPage.paymentReportsPage.firstViewButton.element), _AccountReportsListPage.paymentReportsPage.firstViewButton.getTimeOut());
  await browser.sleep(10000);
  await pageSwitchWindow("BIRT Report Viewer");
  await browser.wait(ExpectedConditions.elementToBeClickable(accountElement.element), accountElement.getTimeOut());
}
async function loadCondition4FileReport1() {
  await browser.sleep(10000);
  await pageSwitchWindow("BIRT Report Viewer");
  await browser.wait(ExpectedConditions.stalenessOf(_AccountReportsListPage.paymentReportsPage.firstViewButton.element), _AccountReportsListPage.paymentReportsPage.firstViewButton.getTimeOut());
}
