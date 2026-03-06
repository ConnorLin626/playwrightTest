/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser } from "protractor";
import { ReportsPages } from "../../../pages/CB/Reports";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, generatedID } from "../../../lib";
import { Menu } from "../../../config/menu";

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData.json");
let reportName = "";
let fileName = "";

describe("Data Export", async function () {
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.DataExport.SIT.loginCompanyId : testData.DataExport.UAT.loginCompanyId, SIT ? testData.DataExport.SIT.loginUserId : testData.DataExport.UAT.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create a Industry Account Summary Report", async function () {
        await _AccountReportsListPage.openMenu(Menu.Reports.NewDataExport);
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.industryAcctSumCreateBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "dataExportSumRepName" + generatedID()
        fileName = "dataExportSumFileName" + generatedID()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.fileNameInput.input(fileName);
        await _AccountReportsListPage.createAccountReportsPage.reportContent.jsClickIfExist();
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.DataExport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.expAccSumDetails0.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.expAccSumDetailsValue).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.expAccSumDeliveryFormatValue).isNotEmpty(),
        ]);
    });

    it("Edit a Industry Account Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.expAccSumActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.expAccSumEditButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClickIfExist();
        await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.CustomReport.daily);
        await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(testData.CustomReport.password);
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CustomReport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CustomReport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.expAccSumDetails0.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.expAccSumDetailsValue).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.expAccSumDeliveryFormatValue).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.expAccSumScheduleValue).isNotEmpty(),
        ]);
    });

    it("Delete a Industry Account Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.expAccSumActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.expAccSumActionDeteleButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
        await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess()
        ]);
        await _AccountReportsListPage.acctReportListPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
    });

    it("Create a Industry Account Details Report", async function () {
        await _AccountReportsListPage.openMenu(Menu.Reports.NewDataExport);
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.industryAcctDetCreateBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "dataExportDetRepName" + generatedID();
        fileName = "dataExportDetFileName" + generatedID();
        await console.log(reportName);
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.fileNameInput.input(fileName);
        await _AccountReportsListPage.createAccountReportsPage.deliveryFormat.select("Enhanced MT940");
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.DataExport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.expAccDetDetails0.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.expAccDetDetailsValue).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.expAccDetDeliveryFormatValue).isNotEmpty(),
        ]);
    });

    //R29 Improve
    it("Edit Industry Account Details Report with Account just selected some value", async function () {
        await _AccountReportsListPage.acctReportListPage.expAccDetActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.expAccDetEditButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();

        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.selectAll.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(testData.cashManagementReports.edit4account);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClickIfExist();
        await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.CustomReport.daily);
        await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(testData.CustomReport.password);
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CustomReport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CustomReport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.expAccDetDetails0.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.expAccDetDetailsValue).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.expAccDetDeliveryFormatValue).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.expAccDetScheduleValue).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.detAccountsDetail).textContains(testData.cashManagementReports.edit4account),
        ]);
    });

    it("Delete a Industry Account Details Report", async function () {
        await _AccountReportsListPage.acctReportListPage.expAccDetActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.expAccDetActionDeteleButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
        await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess()
        ]);
        await _AccountReportsListPage.acctReportListPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
    });

    //R29
    it("Create Industry Account Summary Report with Account do not select all accounts", async function () {
        await _AccountReportsListPage.openMenu(Menu.Reports.NewDataExport);
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.industryAcctSumCreateBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "dataExportSumRepName" + generatedID();
        fileName = "dataExportSumFileName" + generatedID();
        await console.log(reportName);
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.accountNotInclude : testData.CreateAccountReport.UAT.accountNotInclude);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.fileNameInput.input(fileName);
        await _AccountReportsListPage.createAccountReportsPage.reportContent.jsClickIfExist();
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.DataExport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.expAccSumDetails0.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.sumAccountsDetail).textNotContains(SIT ? testData.CreateAccountReport.SIT.accountNotInclude : testData.CreateAccountReport.UAT.accountNotInclude),
        ]);
    });

    it("Delete a Industry Account Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.expAccSumActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.expAccSumActionDeteleButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
        await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess()
        ]);
        await _AccountReportsListPage.acctReportListPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
    });

});
