import { NavigatePages, ReportsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { handlerCase, ensure } from "../../../lib"

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData.json");

describe("Account eStatements Reports", async function () {
    before(async function () {
        await new NavigatePages().loginCB(testData.eStatements.loginCompanyId, testData.eStatements.loginUserId);
    });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); 
    });

    it("Download for Account eStatement", async function () {
        await _AccountReportsListPage.openMenu(Menu.Reports.eStatementsReports);
        await _AccountReportsListPage.eStatementReportPage.loadCondition();
        await _AccountReportsListPage.eStatementReportPage.DownloadBtn.click()
        await ensure(_AccountReportsListPage.eStatementReportPage.DownloadBtn).isNotDisabled();
    });
});
