/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, Button, generatedID, waitForUXLoading, PROJECT_TYPE } from "../../../lib";
import moment = require("moment");
import { browser } from "protractor";


let currentDate = moment(new Date()).format("DD MMM YYYY");
let currentDateFormat = moment(new Date()).format("YYYY-MM-DD");
let currentDateFromFormat = moment(new Date()).add(-2, 'days').format("YYYY-MM-DD");
let modifyDate = moment().add(-1, 'days').format('DD MMM YYYY');
let modifyDate1 = moment().add(1, 'days').format('DD MMM YYYY');
let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData_03.json");

let oneOffPOBOReportName = "";
let LoanDetReportName = "";
let LoanSumReportName = "";
let CheDepReportName = "";
let FdDetReportName = "";
let fdSumReportName = "";
let _accountSummaryName = "";
let _accountDetailsName = "";
let _InOutSumName = "";

describe("Cheque Deposit Advice Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Cheque Deposit Advice report with schedule", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.accountReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.CheDepCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        CheDepReportName = "CheDep" + moment();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(CheDepReportName);
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.accountNotInclude : testData.CreateAccountReport.UAT.accountNotInclude);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.depositSlipNumber.input(testData.CreateAccountReport.depositSlipNumber);
        await _AccountReportsListPage.createAccountReportsPage.instrumentNumber.input(testData.CreateAccountReport.instrumentNumber);
        await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(testData.CreateAccountReport.amountRangeFrom);
        await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(testData.CreateAccountReport.amountRangeTo);
        await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 1500);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
        //await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
        // await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
        await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.CreateAccountReport.daily);
        await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
        await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.sendTo : testData.CreateAccountReport.UAT.sendTo);
        await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(testData.CreateAccountReport.password);
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CreateAccountReport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(CheDepReportName);
        await _AccountReportsListPage.acctReportListPage.CheDepActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.CheDepActionEditButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    });

    it("Add email for send-to when create Cheque Deposit Advice report with one off", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.accountReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.CheDepCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        CheDepReportName = "CheDep" + moment();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(CheDepReportName);
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.accountNotInclude : testData.CreateAccountReport.UAT.accountNotInclude);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.depositSlipNumber.input(testData.CreateAccountReport.depositSlipNumber);
        await _AccountReportsListPage.createAccountReportsPage.instrumentNumber.input(testData.CreateAccountReport.instrumentNumber);
        await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(testData.CreateAccountReport.amountRangeFrom);
        await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(testData.CreateAccountReport.amountRangeTo);
        await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 1200);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
        // await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
        //await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
        await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.CreateAccountReport.daily);
        await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
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
        await _AccountReportsListPage.createAccountReportsPage.password.input(
            testData.CreateAccountReport.password
        );
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CreateAccountReport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(
            CheDepReportName
        );
        await _AccountReportsListPage.acctReportListPage.CheDepActionButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.CheDepActionEditButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        await Promise.all([
            await ensure(_AccountReportsListPage.createAccountReportsPage.sendToSelectedText).textContains(address),
        ]);
    });

    it("Edit Cheque Deposit Advice report with one off", async function () {
        await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(testData.CreateAccountReport.editAmount);
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(testData.CreateAccountReport.password);
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CreateAccountReport.confirmPassword);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(CheDepReportName);
        await _AccountReportsListPage.acctReportListPage.CheDepViewDetailsButton.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.CheDepReportName).textContains(CheDepReportName),
            await ensure(_AccountReportsListPage.acctReportListPage.CheDepAccount).textContains(SIT ? testData.CreateAccountReport.SIT.account : testData.CreateAccountReport.UAT.account3),
            await ensure(_AccountReportsListPage.acctReportListPage.createDate).textContainsLessOne(currentDate, modifyDate, modifyDate1),
            await ensure(_AccountReportsListPage.acctReportListPage.CheDepAmountRange).isNotEmpty(),
            await ensure(_AccountReportsListPage.acctReportListPage.CheDepSchedule).textContains(testData.CreateAccountReport.deliverySchedule),
            await ensure(_AccountReportsListPage.acctReportListPage.sendToValue).isNotEmpty()
        ]);
    });

    it("Delete Cheque Deposit Advice report", async function () {
        await deleteReport(CheDepReportName,
            _AccountReportsListPage.acctReportListPage.CheDepActionButton,
            _AccountReportsListPage.acctReportListPage.CheDepActionDeleteButton
        );
    });
});

describe("Fixed Deposit Details Report", async function () {
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    // if (SIT) {
        //Need TDS support Account on UAT
        it("Create Fixed Deposit Details Report with one off", async function () {
            await _AccountReportsListPage.acctReportListPage.reportMenu.click();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
            await _AccountReportsListPage.acctReportListPage.accountReport.click();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
            await _AccountReportsListPage.acctReportListPage.FdDetCreateButton.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadCondition();
            FdDetReportName = "FdDet" + moment()
            await _AccountReportsListPage.createAccountReportsPage.reportName.input(FdDetReportName);
            if(SIT){
                await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
                await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.FDAccount : testData.CreateAccountReport.UAT.FDAccount);
                await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
            }
            await _AccountReportsListPage.createAccountReportsPage.status.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.statusItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
            //  await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(
            //     currentDate
            // );
            // await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(
            //     currentDate
            // );
            await _AccountReportsListPage.createAccountReportsPage.usage.select(
                testData.CreateAccountReport.usage
            );
            await _AccountReportsListPage.createAccountReportsPage.remarks.input(
                testData.CreateAccountReport.remarks
            );
            await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadDialog();
            await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
        });

        it("Delete Fixed Deposit Details Report with one off", async function () {
            await deleteReport(
                FdDetReportName,
                _AccountReportsListPage.acctReportListPage.FdDetActionButton,
                _AccountReportsListPage.acctReportListPage.FdDetActionDeleteButton
            );
        });
    // }
});

describe("Fixed Deposit Summary Report", async function () {
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    // if (SIT) {
        //Need TDS support Account on UAT
        it("Create Fixed Deposit Summary Report", async function () {
            await _AccountReportsListPage.acctReportListPage.reportMenu.click();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
            await _AccountReportsListPage.acctReportListPage.accountReport.click();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
            await _AccountReportsListPage.acctReportListPage.FdSumCreateButton.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadCondition();
            fdSumReportName = "fdSum" + moment()
            await _AccountReportsListPage.createAccountReportsPage.reportName.input(fdSumReportName);
            // await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
            //     fdSumReportName = text;
            // });
            if(SIT){
                await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
                await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.FDAccount : testData.CreateAccountReport.UAT.FDAccount);
                await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
            }
            await _AccountReportsListPage.createAccountReportsPage.status.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.statusItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 1500);
            await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
            // await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(testData.CreateAccountReport.startRelativeDate);
            // await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(testData.CreateAccountReport.endRelativeDate );
            await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.CreateAccountReport.daily);
            await _AccountReportsListPage.createAccountReportsPage.usage.select(
                testData.CreateAccountReport.usage
            );
            await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.password.click();
            await _AccountReportsListPage.createAccountReportsPage.password.input(testData.CreateAccountReport.password);
            await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
            await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CreateAccountReport.confirmPassword);
            await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
            await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadDialog();
            await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
        });

        it("Delete Fixed Deposit Summary Report", async function () {
            await deleteReport(
                fdSumReportName,
                _AccountReportsListPage.acctReportListPage.FdSumActionButton,
                _AccountReportsListPage.acctReportListPage.FdSumActionDeleteButton
            );
        });
    // }
});

describe("Incoming and Outgoing Remittance Advice Report", async function () {
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    //only can do in UAT, because of call on TDS
    if (!SIT) {
        it("Publish standard report for Incoming and Outgoing Remittance Advice", async function () {
            await _AccountReportsListPage.acctReportListPage.reportMenu.click();
            await _AccountReportsListPage.acctReportListPage.accountReport.click();
            await _AccountReportsListPage.acctReportListPage.filterInput.input("Standard Incoming and Outgoing Remittance Advice");
            await _AccountReportsListPage.acctReportListPage.standardInOutAdGenerateBtn.click();
            //it will only download a pdf file
            // await _AccountReportsListPage.acctReportListPage.loadConditionForPublishTab();
            // await Promise.all([
            //     await ensure(
            //         _AccountReportsListPage.acctReportListPage.publishType).textContains("Incoming and Outgoing Remittance Advice"),
            //     await ensure(
            //         _AccountReportsListPage.acctReportListPage.publishReportName).textContains("Incoming and Outgoing Remittance Advice"),
            //     await ensure(
            //         _AccountReportsListPage.acctReportListPage.publishStatus).textContainsLessOne("Pending", "In Progress")
            // ]);
        });
    }
});

describe("Incoming and Outgoing Remittance Summary Report", async function () {
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    if (!SIT) {
        it("Publish personalised report for Incoming and Outgoing Remittance Summary", async function () {
            await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password);

            await _AccountReportsListPage.acctReportListPage.reportMenu.click();
            await _AccountReportsListPage.acctReportListPage.accountReport.click();
            await _AccountReportsListPage.acctReportListPage.InOutSumCreateButton.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadCondition();
            _InOutSumName = "InOutSum" + moment()
            await _AccountReportsListPage.createAccountReportsPage.reportName.input(_InOutSumName);
            // await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
            //     _InOutSumName = text;
            // });
            await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.accountNotInclude : testData.CreateAccountReport.UAT.accountNotInclude);
            await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.accountType.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.accountTypeItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(testData.CreateAccountReport.amountRangeFrom);
            await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(testData.CreateAccountReport.amountRangeTo);
            await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
            // await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(testData.CreateAccountReport.startRelativeDate);
            // await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(testData.CreateAccountReport.endRelativeDate);
            await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
            await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
            await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadDialog();
            await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
            await _AccountReportsListPage.acctReportListPage.filterInput.input(_InOutSumName);
            await _AccountReportsListPage.acctReportListPage.InOutSumActionButton.jsClick();
            await _AccountReportsListPage.acctReportListPage.InOutSumActionGenerateButton.jsClick();
            //it only download a pdf file comment this out
            // await _AccountReportsListPage.acctReportListPage.loadConditionForPublishTab();
            // await Promise.all([
            //     await ensure(
            //         _AccountReportsListPage.acctReportListPage.publishType).textContains("Incoming and Outgoing Remittance Summary"),
            //     await ensure(
            //         _AccountReportsListPage.acctReportListPage.publishReportName).textContains(_InOutSumName),
            //     await ensure(
            //         _AccountReportsListPage.acctReportListPage.publishStatus).textContainsLessOne("Pending", "In Progress")
            // ]);
            // await await _AccountReportsListPage.acctReportListPage.reportTypesButton.jsClick();
            await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password);
            await _AccountReportsListPage.acctReportListPage.reportMenu.click();
            await _AccountReportsListPage.acctReportListPage.accountReport.click();
            await deleteReport(
                _InOutSumName,
                _AccountReportsListPage.acctReportListPage.InOutSumActionButton,
                _AccountReportsListPage.acctReportListPage.InOutSumActionDeleteButton
            );
        });
    }
});

describe("Account Details Report", async function () {
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Account Details Report with One off", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.accountReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.AcctDetCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        _accountDetailsName = "AcctDet" + moment()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(_accountDetailsName);
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(SIT ? testData.CreateAccountReport.SIT.accountNotInclude : testData.CreateAccountReport.UAT.accountNotInclude);
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.accountType.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.accountTypeItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(testData.CreateAccountReport.amountRangeFrom);
        await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(testData.CreateAccountReport.amountRangeTo);
        await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.relativeDates.jsClick();
        // await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(testData.CreateAccountReport.startRelativeDate);
        // await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(testData.CreateAccountReport.endRelativeDate);
        await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(_accountDetailsName);
        await _AccountReportsListPage.acctReportListPage.AcctDetViewDetailsButton.jsClick();
        await Promise.all([
            await ensure(
                _AccountReportsListPage.acctReportListPage.AcctDetReportName).textContains(_accountDetailsName),
            await ensure(
                _AccountReportsListPage.acctReportListPage.AcctDetAccount).textContains(SIT ? testData.CreateAccountReport.SIT.account : testData.CreateAccountReport.UAT.account3),
            await ensure(
                _AccountReportsListPage.acctReportListPage.AcctDetReportSchedule).textContains(testData.CreateAccountReport.deliveryOneOff),
            await ensure(
                _AccountReportsListPage.acctReportListPage.AcctDetPaymentDateRange).textContains("Start of current month to End of current month"),
            await ensure(
                _AccountReportsListPage.acctReportListPage.sharedIcon).isVisible()
        ]);
    });

    it("Delete Account Details Report", async function () {
        await deleteReport(
            _accountDetailsName,
            _AccountReportsListPage.acctReportListPage.AcctDetActionButton,
            _AccountReportsListPage.acctReportListPage.AcctDetActionDeleteButton
        );
    });
});

describe("Account Summary Report", async function () {
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Account Summary report with Scheduled", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.accountReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.AcctSumCreateButton.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        _accountSummaryName = "AcctSumScheduled" + moment()
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(_accountSummaryName);
        await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
            SIT
                ? testData.CreateAccountReport.SIT.accountNotInclude
                : testData.CreateAccountReport.UAT.accountNotInclude
        );
        await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(
            testData.CreateAccountReport.amountRangeFrom
        );
        await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(
            testData.CreateAccountReport.amountRangeTo
        );
        await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 1500);
        await _AccountReportsListPage.createAccountReportsPage.relativeDates.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
        // await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(testData.CreateAccountReport.startRelativeDate);
        // await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(testData.CreateAccountReport.endRelativeDate);
        await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(
            testData.CreateAccountReport.daily
        );
        await _AccountReportsListPage.createAccountReportsPage.usage.select(
            testData.CreateAccountReport.usage
        );
        await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.password.click();
        await _AccountReportsListPage.createAccountReportsPage.password.input(
            testData.CreateAccountReport.password
        );
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
        await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(
            testData.CreateAccountReport.confirmPassword
        );
        await _AccountReportsListPage.createAccountReportsPage.remarks.input(
            testData.CreateAccountReport.remarks
        );
        await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.loadDialog();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(
            _accountSummaryName
        );
        await _AccountReportsListPage.acctReportListPage.AcctSumViewDetailsButton.jsClick();
        await Promise.all([
            await ensure(
                _AccountReportsListPage.acctReportListPage.AcctSumReportName).textContains(_accountSummaryName),
            await ensure(
                _AccountReportsListPage.acctReportListPage.AcctSumAccount).textContains(SIT ? testData.CreateAccountReport.SIT.account : testData.CreateAccountReport.UAT.account3),
            await ensure(
                _AccountReportsListPage.acctReportListPage.AcctSumReportSchedule).textContains(testData.CreateAccountReport.deliverySchedule),
            await ensure(
                _AccountReportsListPage.acctReportListPage.AcctSumPaymentDateRange).textContains("Start of current month to End of current month"),
            await ensure(
                _AccountReportsListPage.acctReportListPage.sharedIcon).isVisible()
        ]);
    });

    it("Delete Account Summary report", async function () {
        await deleteReport(
            _accountSummaryName,
            _AccountReportsListPage.acctReportListPage.AcctSumActionButton,
            _AccountReportsListPage.acctReportListPage.AcctSumActionDeleteButton
        );
    });
});


// Due to CR IEBAA-688, to hide POBO report
// describe("POBO Report", async function () {
//     const suitObject = this;
//     beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

//     it("Create POBO ROBO Report with one off", async function () {
//         await _AccountReportsListPage.acctReportListPage.reportMenu.click();
//         await _AccountReportsListPage.acctReportListPage.loadCondition();
//         await _AccountReportsListPage.acctReportListPage.accountReport.click();
//         await _AccountReportsListPage.acctReportListPage.loadCondition();
//         await _AccountReportsListPage.acctReportListPage.PoboRoboCreateButton.jsClick();
//         await _AccountReportsListPage.createAccountReportsPage.loadCondition();
//         oneOffPOBOReportName = "POBO" + moment()
//         await _AccountReportsListPage.createAccountReportsPage.reportName.input(oneOffPOBOReportName);
//         // await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
//         //     oneOffPOBOReportName = text;
//         // });
//         await _AccountReportsListPage.createAccountReportsPage.batchReference.input(testData.CreateAccountReport.batchReference);
//         await _AccountReportsListPage.createAccountReportsPage.customerReference.input(testData.CreateAccountReport.customerReference);
//         // await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(testData.CreateAccountReport.startRelativeDate);
//         // await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(testData.CreateAccountReport.endRelativeDate);
//         await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
//         await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
//         await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
//         await _AccountReportsListPage.createAccountReportsPage.loadDialog();
//         await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
//         await _AccountReportsListPage.acctReportListPage.loadCondition();
//         await _AccountReportsListPage.acctReportListPage.filterInput.input(oneOffPOBOReportName);
//         await _AccountReportsListPage.acctReportListPage.PoboRoboViewDetailsButton.jsClick();
//         await Promise.all([
//             await ensure(_AccountReportsListPage.acctReportListPage.PoboRoboReportName).textContains(oneOffPOBOReportName),
//             await ensure(_AccountReportsListPage.acctReportListPage.PoboRoboAccount).textContains(SIT ? testData.CreateAccountReport.SIT.POBOpAccount : testData.CreateAccountReport.UAT.POBOpAccount),
//             await ensure(_AccountReportsListPage.acctReportListPage.PoboRoboReportSchedule).textContains(testData.CreateAccountReport.deliveryOneOff),
//             await ensure(_AccountReportsListPage.acctReportListPage.PoboRoboPaymentDateRange).textContains("Start of current month to End of current month")
//         ]);
//     });
// });

describe("Loan Detail Report", async function () {
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // if (SIT) {
        //Need TDS support Account on UAT
        it("Create Loan Detail Report with schedule", async function () {
            await _AccountReportsListPage.acctReportListPage.reportMenu.click();
            await _AccountReportsListPage.acctReportListPage.accountReport.click();
            await _AccountReportsListPage.acctReportListPage.LoanDetCreateButton.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadCondition();
            LoanDetReportName = "LoanDet" + moment()
            await _AccountReportsListPage.createAccountReportsPage.reportName.input(LoanDetReportName);
            await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
            if(SIT){
                await _AccountReportsListPage.createAccountReportsPage.searchInput.input(testData.CreateAccountReport.SIT.LoanAccountNotInclude);
            }else{
                await _AccountReportsListPage.createAccountReportsPage.selectAllBtn.jsClick();
                await _AccountReportsListPage.createAccountReportsPage.selectAllBtn.jsClick();
                await _AccountReportsListPage.createAccountReportsPage.searchInput.input(testData.CreateAccountReport.UAT.LoanAccountInclude);
            }
            await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.status.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.statusItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 1500);
            await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
            // await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
            // await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
            await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.CreateAccountReport.daily);
            await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
            await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.password.click();
            await _AccountReportsListPage.createAccountReportsPage.password.input(testData.CreateAccountReport.password);
            await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
            await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.CreateAccountReport.confirmPassword);
            await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
            await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadDialog();
            await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
            await _AccountReportsListPage.acctReportListPage.filterInput.input(LoanDetReportName);
            await _AccountReportsListPage.acctReportListPage.LoanDetViewDetailsButton.jsClick();
            await Promise.all([
                await ensure(_AccountReportsListPage.acctReportListPage.LoanDetReportName).textContains(LoanDetReportName),
                await ensure(_AccountReportsListPage.acctReportListPage.LoanDetAccount).textContains(SIT ? testData.CreateAccountReport.SIT.LoanAccount : testData.CreateAccountReport.UAT.LoanAccount),
                await ensure(_AccountReportsListPage.acctReportListPage.LoanDetSchedule).textContains(testData.CreateAccountReport.deliverySchedule),
                await ensure(_AccountReportsListPage.acctReportListPage.LoanDetPaymentDateRangeLast).isNotEmpty(),
            ]);
        });
    // }
});

describe("Loan Summary Report", async function () {
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // if (SIT) {
        //Need TDS support Account on UAT
        it("Create Loan Summary Report with one off", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password);

            await _AccountReportsListPage.acctReportListPage.reportMenu.click();
            await _AccountReportsListPage.acctReportListPage.accountReport.click();
            await _AccountReportsListPage.acctReportListPage.LoanSumCreateButton.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadCondition();
            LoanSumReportName = "LoanSum" + moment()
            await _AccountReportsListPage.createAccountReportsPage.reportName.input(LoanSumReportName);
            await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
            if(SIT){
                await _AccountReportsListPage.createAccountReportsPage.searchInput.input(testData.CreateAccountReport.SIT.LoanAccountNotInclude);
            }else{
                await _AccountReportsListPage.createAccountReportsPage.selectAllBtn.jsClick();
                await _AccountReportsListPage.createAccountReportsPage.selectAllBtn.jsClick();
                await _AccountReportsListPage.createAccountReportsPage.searchInput.input(testData.CreateAccountReport.UAT.LoanAccountInclude);
            }
            await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.status.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.statusItem.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
            // await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
            // await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
            await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
            await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
            await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadDialog();
            await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
            await _AccountReportsListPage.acctReportListPage.filterInput.input(LoanSumReportName);
            await _AccountReportsListPage.acctReportListPage.LoanSumActionButton.jsClick();
            await _AccountReportsListPage.acctReportListPage.LoanSumActionEditButton.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        });

        it("Edit Loan Summary Report with one off", async function () {
            await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
            await _AccountReportsListPage.createAccountReportsPage.loadDialog();
            await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
            await _AccountReportsListPage.acctReportListPage.loadCondition();
            await _AccountReportsListPage.acctReportListPage.filterInput.input(LoanSumReportName);
            await _AccountReportsListPage.acctReportListPage.LoanSumViewDetailsButton.jsClick();
            await Promise.all([
                await ensure(_AccountReportsListPage.acctReportListPage.LoanSumReportName).textContains(LoanSumReportName),
                await ensure(_AccountReportsListPage.acctReportListPage.LoanSumAccount).textContains(SIT ? testData.CreateAccountReport.SIT.LoanAccount : testData.CreateAccountReport.UAT.LoanAccount),
                await ensure(_AccountReportsListPage.acctReportListPage.LoanSumSchedule).textContains(testData.CreateAccountReport.deliveryOneOff),
                await ensure(_AccountReportsListPage.acctReportListPage.LoanSumPaymentDateRangeLast).textContains("Last 1 month")
            ]);
        });
    // }
});


describe("ERP Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId02 : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    
    it("Select multi Schedule Statement via ERP to delete check confirm delete screen", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.accountReport.click();
        await _AccountReportsListPage.acctReportListPage.ERPShowSaTem.click();
        await _AccountReportsListPage.acctReportListPage.selectAllNameButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.DlyMt940DeteleButton.click();
        await ensure(_AccountReportsListPage.acctReportListPage.ERPRepDelDialog).textContains(testData.CreateAccountReport.ERPRepDelDialog);
    });
});

async function deleteReport(
    reportName: string,
    optionBtn: Button,
    deleteBtn: Button
): Promise<void> {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(
        reportName
    );
    await optionBtn.jsClick();
    await deleteBtn.jsClick();
    await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
    await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
    await Promise.all([
        await ensure(
            _AccountReportsListPage.acctReportListPage
        ).isUXRejectDialogSuccess() //has success message.
    ]);
    await _AccountReportsListPage.acctReportListPage.dismiss.click();
    await _AccountReportsListPage.acctReportListPage.loadCondition();
}
