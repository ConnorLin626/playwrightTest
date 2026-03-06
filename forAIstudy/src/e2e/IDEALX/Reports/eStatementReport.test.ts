import { NavigatePages } from "../../../pages/Navigate";
import { ensure, handlerCase, PROJECT_TYPE } from "../../../lib";
import { ReportsPages } from "../../../pages/IDEALX/Reports";

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData.json");

describe("Account eStatements Reports", async function () {
    before(async function () {
        await new NavigatePages().loginIdealx(testData.eStatements.loginCompanyId, testData.eStatements.loginUserId, "123123");
    });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Download for Account eStatement", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.eStatementsReport.click();
        await _AccountReportsListPage.eStatementReportPage.loadCondition();
        await _AccountReportsListPage.eStatementReportPage.DownloadBtn.click();
        await ensure(_AccountReportsListPage.eStatementReportPage.DownloadBtn).isNotDisabled();
    });
});
