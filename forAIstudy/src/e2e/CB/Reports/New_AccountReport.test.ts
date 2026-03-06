/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages } from "../../../pages/CB/Reports";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, Button, generatedID, waitForUXLoading } from "../../../lib";
import { Menu } from "../../../config/menu";
import moment = require("moment");

let currentDate = moment(new Date()).format("DD MMM YYYY");
let currentDateFormat = moment(new Date()).format("YYYY-MM-DD");
let modifyDate = moment().add(-1, 'days').format('DD MMM YYYY');
let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("SG_testData.json");

let oneOffPOBOReportName = "";
let LoanDetReportName = "";
let LoanSumReportName = "";
let CheDepReportName = "";
let FdDetReportName = "";
let fdSumReportName = "";
let reportName="";
let _accountSummaryName = "";
let _accountDetailsName = "";
let _InOutSumName = "";

describe("Cheque Deposit Advice Report", async function () {
  before(async function () {
    await new NavigatePages().loginCB(
      SIT
        ? testData.CreateAccountReport.SIT.loginCompanyId
        : testData.CreateAccountReport.UAT.loginCompanyId,
      SIT
        ? testData.CreateAccountReport.SIT.loginUserId
        : testData.CreateAccountReport.UAT.loginUserId
    );
  });
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Create Cheque Deposit Advice report with one off", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    await _AccountReportsListPage.acctReportListPage.CheDepCreateButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    reportName ="CheDep"+generatedID();
    await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
    // await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
    //   CheDepReportName = text;
    // });
    await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
      SIT
        ? testData.CreateAccountReport.SIT.accountNotInclude
        : testData.CreateAccountReport.UAT.accountNotInclude
    );
    await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.depositSlipNumber.input(testData.CreateAccountReport.depositSlipNumber);
    await _AccountReportsListPage.createAccountReportsPage.instrumentNumber.input(testData.CreateAccountReport.instrumentNumber);
    await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(testData.CreateAccountReport.amountRangeFrom);
    await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(testData.CreateAccountReport.amountRangeTo);
    await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
    await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
    await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.CreateAccountReport.daily);
    await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
    await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
      SIT
        ? testData.CreateAccountReport.SIT.sendTo
        : testData.CreateAccountReport.UAT.sendTo
    );
    await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
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
      reportName
    );
    await _AccountReportsListPage.acctReportListPage.CheDepActionButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.CheDepActionEditButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();
  });

  it("Add email for send-to when create Cheque Deposit Advice report with one off", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    await _AccountReportsListPage.acctReportListPage.CheDepCreateButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    reportName ="CheDep"+generatedID();
    await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
    // await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
    //   CheDepReportName = text;
    // });
    await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
      SIT
        ? testData.CreateAccountReport.SIT.accountNotInclude
        : testData.CreateAccountReport.UAT.accountNotInclude
    );
    await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.depositSlipNumber.input(testData.CreateAccountReport.depositSlipNumber);
    await _AccountReportsListPage.createAccountReportsPage.instrumentNumber.input(testData.CreateAccountReport.instrumentNumber);
    await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(testData.CreateAccountReport.amountRangeFrom);
    await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(testData.CreateAccountReport.amountRangeTo);
    await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
    await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
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
      reportName
    );
    await _AccountReportsListPage.acctReportListPage.CheDepActionButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.CheDepActionEditButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    await Promise.all([
      await ensure(_AccountReportsListPage.createAccountReportsPage.sendToSelectedText).textContains(address),
    ]);
  });

  it("Edit Cheque Deposit Advice report with one off", async function () {
    await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(
      testData.CreateAccountReport.editAmount
    );
    await _AccountReportsListPage.createAccountReportsPage.password.click();
    await _AccountReportsListPage.createAccountReportsPage.password.input(
      testData.CreateAccountReport.password
    );
    await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
    await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(
      testData.CreateAccountReport.confirmPassword
    );
    await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadDialog();
    await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
    await _AccountReportsListPage.acctReportListPage.CheDepViewDetailsButton.jsClick();
    await Promise.all([
      await ensure(
        _AccountReportsListPage.acctReportListPage.CheDepReportName
      ).textContains(reportName),
      await ensure(
        _AccountReportsListPage.acctReportListPage.CheDepAccount
      ).textContains(
        SIT
          ? testData.CreateAccountReport.SIT.account
          : testData.CreateAccountReport.UAT.account
      ),
      await ensure(
        _AccountReportsListPage.acctReportListPage.createDate
      ).textContainsLessOne(currentDate, modifyDate),
      await ensure(
        _AccountReportsListPage.acctReportListPage.CheDepPaymentDateRange
      ).textContains(currentDateFormat + " to " + currentDateFormat),
      await ensure(
        _AccountReportsListPage.acctReportListPage.CheDepSchedule
      ).textContains(testData.CreateAccountReport.deliverySchedule),
      await ensure(_AccountReportsListPage.acctReportListPage.sendToValue).isNotEmpty()
    ]);
  });

  it("Delete Cheque Deposit Advice report", async function () {
    await deleteReport(
      reportName,
      _AccountReportsListPage.acctReportListPage.CheDepActionButton,
      _AccountReportsListPage.acctReportListPage.CheDepActionDeleteButton
    );
  });
});

describe("Fixed Deposit Details Report", async function () {
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
  if (SIT) {
    //Need TDS support Account on UAT
    it("Create Fixed Deposit Details Report with one off", async function () {
      await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
      await _AccountReportsListPage.acctReportListPage.loadCondition();
      await _AccountReportsListPage.acctReportListPage.FdDetCreateButton.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.loadCondition();
       reportName ="FdDet"+generatedID();
      await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
      // await _AccountReportsListPage.createAccountReportsPage.reportName
      //   .getText()
      //   .then(text => {
      //     FdDetReportName = text;
      //   });
      await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
        SIT
          ? testData.CreateAccountReport.SIT.FDAccount
          : testData.CreateAccountReport.UAT.FDAccount
      );
      await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.status.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.statusItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(
        currentDate
      );
      await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(
        currentDate
      );
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
        reportName,
        _AccountReportsListPage.acctReportListPage.FdDetActionButton,
        _AccountReportsListPage.acctReportListPage.FdDetActionDeleteButton
      );
    });
  }
});

describe("Fixed Deposit Summary Report", async function () {
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
  if (SIT) {
    //Need TDS support Account on UAT
    it("Create Fixed Deposit Summary Report", async function () {
      await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
      await _AccountReportsListPage.acctReportListPage.loadCondition();
      await _AccountReportsListPage.acctReportListPage.FdSumCreateButton.click();
      await _AccountReportsListPage.createAccountReportsPage.loadCondition();
      reportName="fdSum"+generatedID();
      await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
      // await _AccountReportsListPage.createAccountReportsPage.reportName
      //   .getText()
      //   .then(text => {
      //     fdSumReportName = text;
      //   });
      await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
        SIT
          ? testData.CreateAccountReport.SIT.FDAccount
          : testData.CreateAccountReport.UAT.FDAccount
      );
      await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.status.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.statusItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(
        testData.CreateAccountReport.startRelativeDate
      );
      await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(
        testData.CreateAccountReport.endRelativeDate
      );
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
    });

    it("Delete Fixed Deposit Summary Report", async function () {
      await deleteReport(
        reportName,
        _AccountReportsListPage.acctReportListPage.FdSumActionButton,
        _AccountReportsListPage.acctReportListPage.FdSumActionDeleteButton
      );
    });
  }
});

describe("Incoming and Outgoing Remittance Advice Report", async function () {
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
  //only can do in UAT, because of call on TDS
  if (!SIT) {
    it("Publish standard report for Incoming and Outgoing Remittance Advice", async function () {
      await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
      await _AccountReportsListPage.acctReportListPage.loadCondition();
      await _AccountReportsListPage.acctReportListPage.filterInput.input(
        "Standard Incoming and Outgoing Remittance Advice"
      );
      await _AccountReportsListPage.acctReportListPage.standardInOutAdGenerateBtn.click();
      await _AccountReportsListPage.acctReportListPage.loadConditionForPublishTab();
      await Promise.all([
        await ensure(
          _AccountReportsListPage.acctReportListPage.publishType
        ).textContains("Incoming and Outgoing Remittance Advice"),
        await ensure(
          _AccountReportsListPage.acctReportListPage.publishReportName
        ).textContains("Incoming and Outgoing Remittance Advice"),
        await ensure(
          _AccountReportsListPage.acctReportListPage.publishStatus
        ).textContainsLessOne("Pending", "In Progress")
      ]);
    });
  }
});

describe("Incoming and Outgoing Remittance Summary Report", async function () {
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
  if (!SIT) {
    it("Publish personalised report for Incoming and Outgoing Remittance Summary", async function () {
      await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
      await _AccountReportsListPage.acctReportListPage.loadCondition();
      await _AccountReportsListPage.acctReportListPage.InOutSumCreateButton.click();
      await _AccountReportsListPage.createAccountReportsPage.loadCondition();
      reportName="InOutSum"+generatedID();
      await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
      // await _AccountReportsListPage.createAccountReportsPage.reportName
      //   .getText()
      //   .then(text => {
      //     _InOutSumName = text;
      //   });
      await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
        SIT
          ? testData.CreateAccountReport.SIT.accountNotInclude
          : testData.CreateAccountReport.UAT.accountNotInclude
      );
      await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.accountType.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.accountTypeItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(
        testData.CreateAccountReport.amountRangeFrom
      );
      await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(
        testData.CreateAccountReport.amountRangeTo
      );
      await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(
        testData.CreateAccountReport.startRelativeDate
      );
      await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(
        testData.CreateAccountReport.endRelativeDate
      );
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
      await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
      await _AccountReportsListPage.acctReportListPage.InOutSumActionButton.jsClick();
      await _AccountReportsListPage.acctReportListPage.InOutSumActionGenerateButton.jsClick();
      await _AccountReportsListPage.acctReportListPage.loadConditionForPublishTab();
      await Promise.all([
        await ensure(
          _AccountReportsListPage.acctReportListPage.publishType
        ).textContains("Incoming and Outgoing Remittance Summary"),
        await ensure(
          _AccountReportsListPage.acctReportListPage.publishReportName
        ).textContains(reportName),
        await ensure(
          _AccountReportsListPage.acctReportListPage.publishStatus
        ).textContainsLessOne("Pending", "In Progress")
      ]);
      await await _AccountReportsListPage.acctReportListPage.reportTypesButton.jsClick();
      await deleteReport(
        reportName,
        _AccountReportsListPage.acctReportListPage.InOutSumActionButton,
        _AccountReportsListPage.acctReportListPage.InOutSumActionDeleteButton
      );
    });
  }
});

describe("Account Details Report", async function () {
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Create Account Details Report with One off", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    await _AccountReportsListPage.acctReportListPage.AcctDetCreateButton.click();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    reportName ="AcctDet"+generatedID();
    await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
    // await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
    //   _accountDetailsName = text;
    // });
    await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
      SIT
        ? testData.CreateAccountReport.SIT.accountNotInclude
        : testData.CreateAccountReport.UAT.accountNotInclude
    );
    await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.accountType.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.accountTypeItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.amountRangeFrom.input(testData.CreateAccountReport.amountRangeFrom);
    await _AccountReportsListPage.createAccountReportsPage.amountRangeTo.input(testData.CreateAccountReport.amountRangeTo);
    await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(testData.CreateAccountReport.startRelativeDate);
    await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(testData.CreateAccountReport.endRelativeDate);
    await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
    await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
    await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadDialog();
    await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
    await _AccountReportsListPage.acctReportListPage.AcctDetViewDetailsButton.click();
    await Promise.all([
      await ensure(
        _AccountReportsListPage.acctReportListPage.AcctDetReportName
      ).textContains(reportName),
      await ensure(
        _AccountReportsListPage.acctReportListPage.AcctDetAccount
      ).textContains(
        SIT
          ? testData.CreateAccountReport.SIT.account
          : testData.CreateAccountReport.UAT.account
      ),
      await ensure(
        _AccountReportsListPage.acctReportListPage.AcctDetReportSchedule
      ).textContains(testData.CreateAccountReport.deliveryOneOff),
      await ensure(
        _AccountReportsListPage.acctReportListPage.AcctDetPaymentDateRange
      ).textContains("Start of current week to End of current week"),
      await ensure(
        _AccountReportsListPage.acctReportListPage.sharedIcon
      ).isVisible()
    ]);
  });

  it("Delete Account Details Report", async function () {
    await deleteReport(
      reportName,
      _AccountReportsListPage.acctReportListPage.AcctDetActionButton,
      _AccountReportsListPage.acctReportListPage.AcctDetActionDeleteButton
    );
  });
});

describe("Account Summary Report", async function () {
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Create Account Summary report with Scheduled", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    await _AccountReportsListPage.acctReportListPage.AcctSumCreateButton.click();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    reportName ="AcctSumScheduled"+generatedID();
    await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
    // await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
    //   _accountSummaryName = text;
    // });
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
    await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(
      testData.CreateAccountReport.startRelativeDate
    );
    await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(
      testData.CreateAccountReport.endRelativeDate
    );
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
      reportName
    );
    await _AccountReportsListPage.acctReportListPage.AcctSumViewDetailsButton.jsClick();
    await Promise.all([
      await ensure(
        _AccountReportsListPage.acctReportListPage.AcctSumReportName
      ).textContains(reportName),
      await ensure(
        _AccountReportsListPage.acctReportListPage.AcctSumAccount
      ).textContains(
        SIT
          ? testData.CreateAccountReport.SIT.account
          : testData.CreateAccountReport.UAT.account
      ),
      await ensure(
        _AccountReportsListPage.acctReportListPage.AcctSumReportSchedule
      ).textContains(testData.CreateAccountReport.deliverySchedule),
      await ensure(
        _AccountReportsListPage.acctReportListPage.AcctSumPaymentDateRange
      ).textContains("Start of current week to End of current week"),
      await ensure(
        _AccountReportsListPage.acctReportListPage.sharedIcon
      ).isVisible()
    ]);
  });

  it("Delete Account Summary report", async function () {
    await deleteReport(
      reportName,
      _AccountReportsListPage.acctReportListPage.AcctSumActionButton,
      _AccountReportsListPage.acctReportListPage.AcctSumActionDeleteButton
    );
  });
});

// describe("POBO Report", async function () {
//   const suitObject = this;
//   beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

//   it("Create POBO ROBO Report with one off", async function () {
//     await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
//     await _AccountReportsListPage.acctReportListPage.loadCondition();
//     await _AccountReportsListPage.acctReportListPage.PoboRoboCreateButton.jsClick();
//     await _AccountReportsListPage.createAccountReportsPage.loadCondition();
//     await _AccountReportsListPage.createAccountReportsPage.reportName.input("POBO" + moment());
//     await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
//       oneOffPOBOReportName = text;
//     });
//     await _AccountReportsListPage.createAccountReportsPage.batchReference.input(testData.CreateAccountReport.batchReference);
//     await _AccountReportsListPage.createAccountReportsPage.customerReference.input(testData.CreateAccountReport.customerReference);
//     await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(testData.CreateAccountReport.startRelativeDate);
//     await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(testData.CreateAccountReport.endRelativeDate);
//     await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
//     await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
//     await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
//     await _AccountReportsListPage.createAccountReportsPage.loadDialog();
//     await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
//     await _AccountReportsListPage.acctReportListPage.loadCondition();
//     await _AccountReportsListPage.acctReportListPage.filterInput.input(oneOffPOBOReportName);
//     await _AccountReportsListPage.acctReportListPage.PoboRoboViewDetailsButton.jsClick();
//     await Promise.all([
//       await ensure(_AccountReportsListPage.acctReportListPage.PoboRoboReportName).textContains(oneOffPOBOReportName),
//       await ensure(_AccountReportsListPage.acctReportListPage.PoboRoboAccount).textContains(SIT ? testData.CreateAccountReport.SIT.POBOpAccount : testData.CreateAccountReport.UAT.POBOpAccount),
//       await ensure(_AccountReportsListPage.acctReportListPage.PoboRoboReportSchedule).textContains(testData.CreateAccountReport.deliveryOneOff),
//       await ensure(_AccountReportsListPage.acctReportListPage.PoboRoboPaymentDateRange).textContains("Start of current week to End of current week")
//     ]);
//   });
// });

describe("Loan Detail Report", async function () {
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  if (SIT) {
    //Need TDS support Account on UAT
    it("Create Loan Detail Report with schedule", async function () {
      await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
      await _AccountReportsListPage.acctReportListPage.loadCondition();
      await _AccountReportsListPage.acctReportListPage.LoanDetCreateButton.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.loadCondition();
       reportName ="LoanDet"+generatedID();
      await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
      await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
        LoanDetReportName = text;
      });
      await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
        SIT
          ? testData.CreateAccountReport.SIT.LoanAccountNotInclude
          : testData.CreateAccountReport.UAT.LoanAccountNotInclude
      );
      await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.status.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.statusItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.scheduled.jsClick();

      await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
      await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
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
      await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
      await _AccountReportsListPage.acctReportListPage.LoanDetViewDetailsButton.jsClick();
      await Promise.all([
        await ensure(_AccountReportsListPage.acctReportListPage.LoanDetReportName).textContains(reportName),
        await ensure(_AccountReportsListPage.acctReportListPage.LoanDetAccount).textContains(SIT ? testData.CreateAccountReport.SIT.LoanAccount : testData.CreateAccountReport.UAT.LoanAccount),
        await ensure(_AccountReportsListPage.acctReportListPage.LoanDetSchedule).textContains(testData.CreateAccountReport.deliverySchedule),
        await ensure(_AccountReportsListPage.acctReportListPage.LoanDetPaymentDateRange).textContains(currentDateFormat + " to " + currentDateFormat)
      ]);
    });
  }
});

describe("Loan Summary Report", async function () {
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  if (SIT) {
    //Need TDS support Account on UAT
    it("Create Loan Summary Report with one off", async function () {
      await _AccountReportsListPage.openMenu(Menu.Reports.NewAccountReports);
      await _AccountReportsListPage.acctReportListPage.loadCondition();
      await _AccountReportsListPage.acctReportListPage.LoanSumCreateButton.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.loadCondition();
      reportName="LoanSum"+generatedID();
      await _AccountReportsListPage.createAccountReportsPage.reportName.input(reportName);
      await _AccountReportsListPage.createAccountReportsPage.reportName.getText().then(text => {
        LoanSumReportName = text;
      });
      await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
        SIT
          ? testData.CreateAccountReport.SIT.LoanAccountNotInclude
          : testData.CreateAccountReport.UAT.LoanAccountNotInclude
      );
      await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.status.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.statusItem.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.oneOff.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
      await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
      await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.CreateAccountReport.usage);
      await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.CreateAccountReport.remarks);
      await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.loadDialog();
      await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
      await _AccountReportsListPage.acctReportListPage.loadCondition();
      await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
      await _AccountReportsListPage.acctReportListPage.LoanSumActionButton.jsClick();
      await _AccountReportsListPage.acctReportListPage.LoanSumActionEditButton.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    });

    it("Edit Loan Summary Report with one off", async function () {
      await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
      await _AccountReportsListPage.createAccountReportsPage.loadDialog();
      await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
      await _AccountReportsListPage.acctReportListPage.loadCondition();
      await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
      await _AccountReportsListPage.acctReportListPage.LoanSumViewDetailsButton.jsClick();
      await Promise.all([
        await ensure(_AccountReportsListPage.acctReportListPage.LoanSumReportName).textContains(reportName),
        await ensure(_AccountReportsListPage.acctReportListPage.LoanSumAccount).textContainsLessOne(SIT ? testData.CreateAccountReport.SIT.LoanAccount1 : testData.CreateAccountReport.UAT.LoanAccount1,SIT ? testData.CreateAccountReport.SIT.LoanAccount2 : testData.CreateAccountReport.UAT.LoanAccount2),
        await ensure(_AccountReportsListPage.acctReportListPage.LoanSumSchedule).textContains(testData.CreateAccountReport.deliveryOneOff),
        await ensure(_AccountReportsListPage.acctReportListPage.LoanSumPaymentDateRange).textContainsLessOne(currentDateFormat + " to " + currentDateFormat,modifyDate + " to " + currentDateFormat)
      ]);
    });
  }
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