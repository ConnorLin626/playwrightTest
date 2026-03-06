123123/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages, NavigatePages,SwitchToSubsiPages,FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, waitForUXLoading, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _AccountReportsListPage = new ReportsPages();
let _switchToSubsiPages = new SwitchToSubsiPages();
let _FilesPages = new FilesPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData_03.json");
let reportName = "";


describe("Custom Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CustomReport.SIT.loginCompanyId : testData.CustomReport.UAT.loginCompanyId, SIT ? testData.CustomReport.SIT.loginUserId : testData.CustomReport.UAT.loginUserId, testData.CustomReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create a Custom Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.customReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.atmCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "ATMCustom" + generatedID()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 700);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
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
        await _AccountReportsListPage.acctReportListPage.atmReportViewDetailsBtn.jsClick();
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
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 700);
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
        await _AccountReportsListPage.acctReportListPage.atmReportViewDetailsBtn.jsClick();
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
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.customReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.atmCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "ATMCustom" + generatedID()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 700);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
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
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.customReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.atmCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "Email ATMCustom" + generatedID();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 700);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
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
        await _AccountReportsListPage.acctReportListPage.atmReportViewDetailsBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.atmEmailsValue).textContains(nickName),
            await ensure(_AccountReportsListPage.acctReportListPage.atmEmailsValue).textContains(address),
        ]);
    });

    it("Create Merchant - Instrument Outstanding Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.customReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.ALTMINSORPCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        reportName = "ALTMINSORP" + generatedID()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 700);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
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
        await _AccountReportsListPage.acctReportListPage.atminsorpReportViewDetailsBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.ALTMINSORPReportNameValue).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.ALTMINSORPDeliverTimeValue).textContains(testData.CustomReport.daily),
            await ensure(_AccountReportsListPage.acctReportListPage.ALTMINSORPEmailsValue).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.ALTMINSORPRemarkValue).textContains(testData.CustomReport.remarks),
        ]);
    });

    it("Edit a Merchant - Instrument Outstanding Report", async function () {
        await _AccountReportsListPage.acctReportListPage.ALTMINSORPActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.ALTMINSORPEditButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(testData.CustomReport.password);
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CustomReport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.remarks.clean();
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CustomReport.remarksEdit);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
        await _AccountReportsListPage.acctReportListPage.atminsorpReportViewDetailsBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.ALTMINSORPReportNameValue).textContains(reportName),
            await ensure(_AccountReportsListPage.acctReportListPage.ALTMINSORPDeliverTimeValue).textContains(testData.CustomReport.daily),
            await ensure(_AccountReportsListPage.acctReportListPage.ALTMINSORPEmailsValue).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.ALTMINSORPRemarkValue).textContains(testData.CustomReport.remarksEdit),

        ]);
    });

    it("Delete a Merchant - Instrument Outstanding Report", async function () {
        await _AccountReportsListPage.acctReportListPage.ALTMINSORPActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.ALTMINSORPActionDeteleButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
        await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess()
        ]);
        await _AccountReportsListPage.acctReportListPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
    });
    //Add for AB-14794
    it("Custom report - check HQ SC Orgid list", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CustomReport.SIT.loginCompanyId2 : testData.CustomReport.UAT.loginCompanyId2, SIT ? testData.CustomReport.SIT.loginUserId2 : testData.CustomReport.UAT.loginUserId2, testData.CustomReport.UAT.password);
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.customReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.organisationList.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.checkOrganisationList).textContains(testData.CustomReport.SCCompanyName1),
            await ensure(_AccountReportsListPage.acctReportListPage.checkOrganisationList).textNotContains(testData.CustomReport.SCCompanyName2),
            await ensure(_AccountReportsListPage.acctReportListPage.checkOrganisationList).textNotContains(testData.CustomReport.SCCompanyName3),
            await ensure(_AccountReportsListPage.acctReportListPage.checkOrganisationList).textContains(testData.CustomReport.SCCompanyName4)
        ]);
    });

    it("Custom report -check HQ SC according report", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CustomReport.SIT.loginCompanyId2 : testData.CustomReport.UAT.loginCompanyId2, SIT ? testData.CustomReport.SIT.loginUserId2 : testData.CustomReport.UAT.loginUserId2, testData.CustomReport.UAT.password);
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.customReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(testData.CustomReport.HQReportName);
        await browser.sleep(3000);
        await ensure(_AccountReportsListPage.acctReportListPage.atmReportViewDetailsBtn).textContains(testData.CustomReport.HQReportName),
        await _AccountReportsListPage.acctReportListPage.filterInput.input(testData.CustomReport.SCReportName1);
        await browser.sleep(3000);
        await ensure(_AccountReportsListPage.acctReportListPage.cvrReportViewDetailsBtn).isNotElementPresent();
        await _AccountReportsListPage.acctReportListPage.organisationList.jsClick();
        await _AccountReportsListPage.acctReportListPage.sbuOrg1.click();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(testData.CustomReport.HQReportName);
        await browser.sleep(3000);
        await ensure(_AccountReportsListPage.acctReportListPage.atmReportViewDetailsBtn).isNotElementPresent();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(testData.CustomReport.SCReportName1);
        await browser.sleep(3000);
        await ensure(_AccountReportsListPage.acctReportListPage.cvrReportViewDetailsBtn).textContains(testData.CustomReport.SCReportName1);
    });

    it("Custom report -switch to sub - check SC according report", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CustomReport.SIT.loginCompanyId2 : testData.CustomReport.UAT.loginCompanyId2, SIT ? testData.CustomReport.SIT.loginUserId2 : testData.CustomReport.UAT.loginUserId2, testData.CustomReport.UAT.password);
        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(testData.CustomReport.SCCompanyName1);
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.customReport.click();

        await _AccountReportsListPage.acctReportListPage.filterInput.input(testData.CustomReport.SCReportName1);
        await browser.sleep(3000);
        await ensure(_AccountReportsListPage.acctReportListPage.cvrReportViewDetailsBtn).textContains(testData.CustomReport.SCReportName1);

        await _AccountReportsListPage.acctReportListPage.filterInput.input(testData.CustomReport.SCReportName4);
        await browser.sleep(3000);
        await ensure(_AccountReportsListPage.acctReportListPage.lmngdcumReportViewDetailsBtn).isNotElementPresent();

        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(testData.CustomReport.SCCompanyName4);
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.customReport.click();

        await _AccountReportsListPage.acctReportListPage.filterInput.input(testData.CustomReport.SCReportName4);
        await browser.sleep(3000);
        await ensure(_AccountReportsListPage.acctReportListPage.lmngdcumReportViewDetailsBtn).textContains(testData.CustomReport.SCReportName4);

        await _AccountReportsListPage.acctReportListPage.filterInput.input(testData.CustomReport.SCReportName1);
        await browser.sleep(3000);
        await ensure(_AccountReportsListPage.acctReportListPage.cvrReportViewDetailsBtn).isNotElementPresent();
    });

});