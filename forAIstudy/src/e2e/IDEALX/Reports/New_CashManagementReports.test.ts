import { NavigatePages } from "../../../pages/Navigate";
import { ensure,SIT, handlerCase, PROJECT_TYPE, generatedID} from "../../../lib";
import { ReportsPages } from "../../../pages/IDEALX/Reports";
import { promise} from "protractor";
import moment = require("moment");

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData_03.json");
let industryAcctSumReportName = "";
let industryAcctDetReportName = "";

describe("Cash Management Reports", async function () {
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.cashManagementReports.SIT.loginCompanyId:testData.cashManagementReports.UAT.loginCompanyId, SIT ? testData.cashManagementReports.SIT.loginUserId : testData.cashManagementReports.UAT.loginUserId, testData.cashManagementReports.UAT.password);
    });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Edit Industry Account Summary Report with Account do not select all accounts", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.cashManagementReport.click();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition();

        //Create
        await _AccountReportsListPage.cashManagementReportsPage.industryAcctSumReportGenBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input("ExpAccSum" + generatedID());
        await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
            industryAcctSumReportName = text;
            console.log(industryAcctSumReportName);
        });
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.cashManagementReports.accountNotInclude : testData.cashManagementReports.UAT.accountNotInclude);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.fileNameInput.input(testData.cashManagementReports.fileName_Sum + generatedID());
        await _AccountReportsListPage.cashManagementReportsPage.reportContentAcctNo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();

        //Edit
        await _AccountReportsListPage.cashManagementReportsPage.reportsFilterInput.input(industryAcctSumReportName);
        await _AccountReportsListPage.cashManagementReportsPage.optionSumBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.option0EditBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        //click twice to clean select
        await _AccountReportsListPage.cashManagementReportsPage.selectAllBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.selectAllBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.cashManagementReports.edit4account : testData.cashManagementReports.UAT.edit4account);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();

        //Check
        await _AccountReportsListPage.cashManagementReportsPage.reportsFilterInput.input(industryAcctSumReportName);
        await _AccountReportsListPage.cashManagementReportsPage.expandSumReport.jsClick();
        await promise.all([
            await ensure(_AccountReportsListPage.cashManagementReportsPage.sumAccountsDetail).textNotContains(SIT ? testData.cashManagementReports.accountNotInclude : testData.cashManagementReports.UAT.accountNotInclude),
        ])

        //Delete
        await _AccountReportsListPage.cashManagementReportsPage.optionSumBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.optionSumDeleteBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4DeleteDialog();
        await _AccountReportsListPage.cashManagementReportsPage.deleteBtn.click();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();
    });

    it("Create Industry Account Details Report with Account just selected some value", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.cashManagementReport.click();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition();

        //Create
        await _AccountReportsListPage.cashManagementReportsPage.industryAcctDetReportGenBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input("ExpAccDet" + generatedID());
        await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
            industryAcctDetReportName = text;
            console.log(industryAcctDetReportName);
        });
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.selectAllBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.cashManagementReports.edit4account : testData.cashManagementReports.UAT.edit4account);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.fileNameInput.input(testData.cashManagementReports.fileName_Det + generatedID());
        await _AccountReportsListPage.cashManagementReportsPage.reportContentAcctNo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();

        //Check
        await _AccountReportsListPage.cashManagementReportsPage.reportsFilterInput.input(industryAcctDetReportName);
        await _AccountReportsListPage.cashManagementReportsPage.expandDetReport.jsClick();
        await promise.all([
            await ensure(_AccountReportsListPage.cashManagementReportsPage.detAccountsDetail).textContains(SIT ? testData.cashManagementReports.edit4account : testData.cashManagementReports.UAT.edit4account),
        ])

        //Delete
        await _AccountReportsListPage.cashManagementReportsPage.optionDetBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.optionDetDeleteBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4DeleteDialog();
        await _AccountReportsListPage.cashManagementReportsPage.deleteBtn.click();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();
    });
    //add for IDXP-1412
    it("Create Industry Account Details Report with Account type is VA account", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.cashManagementReports.SIT.loginCompanyId:testData.cashManagementReports.UAT.loginCompanyId, SIT ? testData.cashManagementReports.SIT.loginUserId02 : testData.cashManagementReports.UAT.loginUserId, testData.cashManagementReports.UAT.password);
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.cashManagementReport.click();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition();

        //Create
        await _AccountReportsListPage.cashManagementReportsPage.industryAcctDetReportGenBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input("ExpAccDetWithVA" + generatedID());
        await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
            industryAcctDetReportName = text;
            console.log(industryAcctDetReportName);
        });
        await _AccountReportsListPage.createAccountReportsPage.virtualAccounts.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.fileNameInput.input(testData.cashManagementReports.fileName_Det + generatedID());
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();

        //Check
        await _AccountReportsListPage.cashManagementReportsPage.reportsFilterInput.input(industryAcctDetReportName);
        await _AccountReportsListPage.cashManagementReportsPage.expandDetReport.jsClick();
        await promise.all([
            await ensure(_AccountReportsListPage.cashManagementReportsPage.detAccountsDetail).textContains(SIT ? testData.cashManagementReports.virtualAccount :  testData.cashManagementReports.UAT.virtualAccount),
            await ensure(_AccountReportsListPage.cashManagementReportsPage.detDateRange).textContains(testData.cashManagementReports.dateRange01),
            await ensure(_AccountReportsListPage.cashManagementReportsPage.detFileFormate).textContains(testData.cashManagementReports.fileFormate01),
            
        ])

        //Delete
        await _AccountReportsListPage.cashManagementReportsPage.optionDetBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.optionDetDeleteBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4DeleteDialog();
        await _AccountReportsListPage.cashManagementReportsPage.deleteBtn.click();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();
    });

    it("Create Industry Account Summary Report with Account type is VA account and delte", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.cashManagementReports.SIT.loginCompanyId:testData.cashManagementReports.UAT.loginCompanyId, SIT ? testData.cashManagementReports.SIT.loginUserId02 : testData.cashManagementReports.UAT.loginUserId, testData.cashManagementReports.UAT.password);
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.cashManagementReport.click();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition();

        //Create
        await _AccountReportsListPage.cashManagementReportsPage.industryAcctSumReportGenBtn.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input("ExpAccSumWithVA" + generatedID());
        await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
            industryAcctSumReportName = text;
            console.log(industryAcctSumReportName);
        });
        await _AccountReportsListPage.createAccountReportsPage.virtualAccounts.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.fileNameInput.input(testData.cashManagementReports.fileName_Sum + generatedID());
        await _AccountReportsListPage.cashManagementReportsPage.reportContentAcctNo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();

        //Check
        await _AccountReportsListPage.cashManagementReportsPage.reportsFilterInput.input(industryAcctSumReportName);
        await _AccountReportsListPage.cashManagementReportsPage.expandSumReport.jsClick();
        await promise.all([
            await ensure(_AccountReportsListPage.cashManagementReportsPage.sumAccountsDetail).textContains(SIT ? testData.cashManagementReports.virtualAccount :  testData.cashManagementReports.UAT.virtualAccount),
            await ensure(_AccountReportsListPage.cashManagementReportsPage.sumDateRange).textContains(testData.cashManagementReports.dateRange01),
            await ensure(_AccountReportsListPage.cashManagementReportsPage.sumFileFormate).textContains(testData.cashManagementReports.fileFormate02),
            
        ])

        //Delete
        await _AccountReportsListPage.cashManagementReportsPage.optionSumBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.optionSumDeleteBtn.jsClick();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4DeleteDialog();
        await _AccountReportsListPage.cashManagementReportsPage.deleteBtn.click();
        await _AccountReportsListPage.cashManagementReportsPage.loadCondition4OKDialog();
        await _AccountReportsListPage.cashManagementReportsPage.okBtn.jsClick();
    });
});
