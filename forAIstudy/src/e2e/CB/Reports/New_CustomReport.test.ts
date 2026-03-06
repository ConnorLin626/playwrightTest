/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages } from "../../../pages/CB/Reports";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, generatedID, waitForUXLoading } from "../../../lib";
import { Menu } from "../../../config/menu";

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData.json");
let reportName = "";

describe("Custom Report", async function () {
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.CustomReport.SIT.loginCompanyId : testData.CustomReport.UAT.loginCompanyId, SIT ? testData.CustomReport.SIT.loginUserId : testData.CustomReport.UAT.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Create a Custom Report", async function () {
        await _AccountReportsListPage.openMenu(Menu.Reports.NewCustomReports);
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.atmCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "ATMCustom" + generatedID()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
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
        await _AccountReportsListPage.acctReportListPage.atmReportViewDetailsBtn.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.atmReportNameValue).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.atmDeliverTimeValue).textContains(testData.CustomReport.daily),
            //await ensure(_AccountReportsListPage.acctReportListPage.atmEmailsValue).isNotEmpty(),

        ]);
    });

    it("Edit a Custom Report", async function () {
        await _AccountReportsListPage.acctReportListPage.atmActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.atmEditButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Weekly on");
        await _AccountReportsListPage.createAccountReportsPage.weeklyOnDay.select(testData.CustomReport.weekly);
        await _AccountReportsListPage.createAccountReportsPage.weeklyOnTime.select(testData.CustomReport.daily);
        // await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
        // await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(testData.CustomReport.password);
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CustomReport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.atmReportViewDetailsBtn.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.atmReportNameValue).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.atmDeliverTimeValue).textContains(testData.CustomReport.daily),
            await ensure(_AccountReportsListPage.acctReportListPage.atmDeliverScheduleValue).textContains(testData.CustomReport.weekly),
        ]);
    });

    it("Delete a Custom Report", async function () {
        await _AccountReportsListPage.acctReportListPage.atmActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.atmActionDeteleButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
        await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess()
        ]);
        await _AccountReportsListPage.acctReportListPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
    });

    it("Multi Delete Custom Report", async function () {
        await _AccountReportsListPage.openMenu(Menu.Reports.NewCustomReports);
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.atmCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "ATMCustom" + generatedID()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
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
        await _AccountReportsListPage.acctReportListPage.selectAllNameButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.atmDeteleButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
        await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess()
        ]);
        await _AccountReportsListPage.acctReportListPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
    });

    it("Add new email in create Custom Report", async function () {
        await _AccountReportsListPage.openMenu(Menu.Reports.NewCustomReports);
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.atmCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "Email ATMCustom" + generatedID();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.CustomReport.daily);
        // add new email
        await _AccountReportsListPage.createAccountReportsPage.addNewEmail.jsClick();
        let nickName = 'autoTestNewEmail' + generatedID();
        await _AccountReportsListPage.createAccountReportsPage.newEmailNickname.input(nickName);
        let address = 'autoTestEmail' + generatedID() + '@qq.com';
        await _AccountReportsListPage.createAccountReportsPage.newEmailAdress.input(address);
        await _AccountReportsListPage.createAccountReportsPage.saveAndCloseEmailButton.jsClick();
        await waitForUXLoading();
        await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(nickName);
        await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
        // add new email
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
        await _AccountReportsListPage.acctReportListPage.atmReportViewDetailsBtn.click();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.atmEmailsValue).textContains(nickName),
            await ensure(_AccountReportsListPage.acctReportListPage.atmEmailsValue).textContains(address),
        ]);
    });
});