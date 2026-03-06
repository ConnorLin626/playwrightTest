/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import { ReportsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, TextInput, pageSwitchWindow, PROJECT_TYPE } from "../../../lib";

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData_03.json");
let pathFileName: string = SIT ? testData.CreateAccountReport.SIT.fileNameForALL : testData.CreateAccountReport.UAT.fileNameForALL;
let fileName: string = _AccountReportsListPage.createAccountReportsPage.getFileName(pathFileName);

describe("File Detail Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Generate File Detail Personalized Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.fileUploadReport.click();
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

    it('Generate File Detail Standard Report', async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.fileUploadReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition4NewFileUpload();
        await _AccountReportsListPage.acctReportListPage.fileDetailCreateButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.fileDetailStandardBtn.jsClick();
        await processGenerateReport2(_AccountReportsListPage.paymentReportsPage.fileNameValue4FileReports);
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
   });
});
describe('View File Detail Report', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Generate File Detail Standard Report', async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.fileUploadReport.click();
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

describe("File Summary Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Generate File Summary Standard Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.fileUploadReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition4NewFileUpload();
        await _AccountReportsListPage.acctReportListPage.fileSumCreateButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.fileDetailStandardButton.jsClick();
        await processGenerateReport2(_AccountReportsListPage.paymentReportsPage.fileNameValue4FileReports);
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("Transaction Detail Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Generate Transaction Detail Personalized Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.fileUploadReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition4NewFileUpload();
        await _AccountReportsListPage.acctReportListPage.transactionDetailCreateButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.transactionDetailPersonButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition4FileUpload();
        await _AccountReportsListPage.createAccountReportsPage.fileNameInput.input(fileName);
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.accountNotInclude : testData.CreateAccountReport.UAT.accountNotInclude);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        //await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
        // await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
        await _AccountReportsListPage.createAccountReportsPage.nextToGenerate.jsClick();
        await processGenerateReport(_AccountReportsListPage.paymentReportsPage.accountValue4FileReports);

        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("Transaction Summary Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Generate Transaction Summary Personalized Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.fileUploadReport.click();
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
        await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password);
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.fileUploadReport.click();
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
