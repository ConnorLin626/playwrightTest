/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID } from "../../../lib";

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData_03.json");
let reportName = "";
let fileName = "";

describe("Data Export", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.DataExport.SIT.loginCompanyId : testData.DataExport.UAT.loginCompanyId, SIT ? testData.DataExport.SIT.loginUserId : testData.DataExport.UAT.loginUserId, testData.DataExport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create a Industry Account Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.dataExport.click();
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
        await _AccountReportsListPage.acctReportListPage.expAccSumDetailsValue.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.expAccSumDetailsValue).textContains(reportName),
            //await ensure(_AccountReportsListPage.acctReportListPage.expAccSumDeliveryFormatValue).isNotEmpty(),
        ]);
    });

    it("Edit a Industry Account Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.expAccSumActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.expAccSumEditButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 1400);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
        await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.DataExport.daily);
        await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(testData.DataExport.password);
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.DataExport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.DataExport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.expAccSumDetailsValue.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.expAccSumDetailsValue).textContains(reportName),
            //await ensure(_AccountReportsListPage.acctReportListPage.expAccSumDeliveryFormatValue).isNotEmpty(),
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
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.dataExport.click();
        await _AccountReportsListPage.acctReportListPage.industryAcctDetCreateBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "dataExportDetRepName" + generatedID()
        fileName = "dataExportDetFileName" + generatedID()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.fileNameInput.input(fileName);
        // await _AccountReportsListPage.createAccountReportsPage.deliveryFormat.select("Swift MT940");
        await _AccountReportsListPage.createAccountReportsPage.deliveryFormat.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.DataExport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.expAccDetDetails0.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.expAccDetDetailsValue).textContains(reportName),
            //await ensure(_AccountReportsListPage.acctReportListPage.expAccDetDeliveryFormatValue).isNotEmpty(),
        ]);
    });

    it("Edit a Industry Account Details Report", async function () {
        await _AccountReportsListPage.acctReportListPage.expAccDetActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.expAccDetEditButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 1200);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
        await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.DataExport.daily);
        await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(testData.DataExport.password);
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.DataExport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.DataExport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.expAccDetDetails0.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.expAccDetDetailsValue).textContains(reportName),
            //await ensure(_AccountReportsListPage.acctReportListPage.expAccDetDeliveryFormatValue).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.expAccDetScheduleValue).isNotEmpty(),
        ]);
    });

    it("Delete a Industry Account Details Report", async function () {
        await _AccountReportsListPage.acctReportListPage.expAccDetActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.expAccDetActionDeteleButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
        await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadConditionForDismiss();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess()
        ]);
        await _AccountReportsListPage.acctReportListPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
    });
});