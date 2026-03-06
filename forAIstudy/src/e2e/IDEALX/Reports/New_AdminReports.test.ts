import { NavigatePages } from "../../../pages/Navigate";
import { ensure, handlerCase, pageSwitchWindow, PROJECT_TYPE, TextInput, SIT } from "../../../lib";
import { ReportsPages } from "../../../pages/IDEALX/Reports";
import { browser, ExpectedConditions } from "protractor";

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData_03.json");

describe("Admin Reports", async function () {
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.AdminReports.SIT.loginCompanyId : testData.AdminReports.UAT.loginCompanyId, SIT ? testData.AdminReports.SIT.loginUserId : testData.AdminReports.UAT.loginUserId, testData.AdminReports.UAT.password);
    });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("User setup report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.adminReport.click();
        await _AccountReportsListPage.adminReportsPage.loadCondition();
        await _AccountReportsListPage.adminReportsPage.userSetupReportGenBtn.click();
        await _AccountReportsListPage.adminReportsPage.loadCondition4ClickSecondLevelBtn(
            _AccountReportsListPage.adminReportsPage.userSetupPersonalised);
        await _AccountReportsListPage.adminReportsPage.userSetupPersonalised.click();
        //await _AccountReportsListPage.adminReportsPage.loadCondition4PersonalizedPage();
        await _AccountReportsListPage.adminReportsPage.fileFormatRadio.select(testData.AdminReports.fileFormat_PDF);
        await _AccountReportsListPage.adminReportsPage.accountDorp.click();
        await _AccountReportsListPage.adminReportsPage.accountDorpValue.jsClick();
        await _AccountReportsListPage.adminReportsPage.viewBtn.jsClick();
        await processGenerateReport(_AccountReportsListPage.adminReportsPage.userIdEleBirt);
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });

    it("Company Setup report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.adminReport.click();
        await _AccountReportsListPage.adminReportsPage.loadCondition();
        await _AccountReportsListPage.adminReportsPage.companySetupReportGenBtn.click();
        await _AccountReportsListPage.adminReportsPage.loadCondition4ClickSecondLevelBtn(
            _AccountReportsListPage.adminReportsPage.companySetupStandard);
        await _AccountReportsListPage.adminReportsPage.companySetupStandard.click();
        await processGenerateReport(_AccountReportsListPage.adminReportsPage.corpIdEleBirt);
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });

    // it("User Login Report", async function () {
    //     await _AccountReportsListPage.acctReportListPage.reportMenu.click();
    //     await _AccountReportsListPage.acctReportListPage.loadCondition();
    //     await _AccountReportsListPage.acctReportListPage.adminReport.click();
    //     await _AccountReportsListPage.adminReportsPage.loadCondition();
    //     await _AccountReportsListPage.adminReportsPage.userLoginReportGenBtn.jsClick();
    //     await _AccountReportsListPage.adminReportsPage.userLoginPersonalised.jsClick();
    //     await _AccountReportsListPage.adminReportsPage.loadCondition4PersonalizedPage();
    //     await _AccountReportsListPage.adminReportsPage.viewBtn.jsClick();
    //     await processGenerateReport(_AccountReportsListPage.adminReportsPage.userIdEleBirt);
    //     await browser.close();
    //     await pageSwitchWindow("DBS IDEAL");
    // });

});

async function processGenerateReport(element: TextInput) {
    await loadConditionBIRT(element);
    await Promise.all([
        await ensure(element).isNotEmpty(),
    ]);
}

async function loadConditionBIRT(element: TextInput) {
    await browser.sleep(10000);
    await browser.wait(ExpectedConditions.stalenessOf(_AccountReportsListPage.paymentReportsPage.firstViewButton.element), _AccountReportsListPage.paymentReportsPage.firstViewButton.getTimeOut());
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(ExpectedConditions.elementToBeClickable(element.element), element.getTimeOut());
}
