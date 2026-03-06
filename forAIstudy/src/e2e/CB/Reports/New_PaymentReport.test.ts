/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import { FilesPages, PaymentsPages } from "../../../pages/CB";
import { ReportsPages } from "../../../pages/CB/Reports";
import { NavigatePages } from "../../../pages/Navigate";

import {
  ensure,
  SIT,
  handlerCase,
  Button,
  TextInput,
  pageSwitchWindow
} from "../../../lib";
import { Menu } from "../../../config/menu";
import moment = require("moment");

let currentDate = moment(new Date()).format("DD MMM YYYY");
let currentDateFormat = moment(new Date()).format("YYYY-MM-DD");
let _AccountReportsListPage = new ReportsPages();
let _PaymentsPages = new PaymentsPages();
const _FilesPages = new FilesPages();
let fileName = "";
let testData = _AccountReportsListPage.fetchTestData("SG_testData.json");
let bulkColReportName = "";
let bulkPaymentReportName = "";
let chequeDraftDetailReportName = "";
let fastColReportName = "";
let fastPaymentReportName = "";
let groupDetReportName = "";
let groupSumReportName = "";
let txnStatusReportName = "";
let payAdvReportName = "";
let payrollReportName = "";
let payrollSumReportName = "";
let stopCheReportName = "";
let payCurReportName = "";
let taxAdvReportName = "";
let taxDetReportName = "";
let taxSumReportName = "";
let transferDetReportName = "";
let transferSumReportName = "";
let tranSumDetReportName = "";
let fileType = 'ALL - Universal File Format';

describe("Upload File", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Upload File for Create Data for Report", async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.CreateAccountReport.SIT.fileNameForALL : testData.CreateAccountReport.UAT.fileNameForALL, testData.FileService.approvalOptionByTransaction).then(async data => {
      fileName = data;
    });
    await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
    await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
    await Promise.all([
      await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty()
    ]);
  });
});

describe("Bulk Collection Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Bulk Collection", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "BulkCol",
      _AccountReportsListPage.acctReportListPage.bulkColCreateButton
    ).then(text => {
      bulkColReportName = text;
    });

    await _AccountReportsListPage.createAccountReportsPage.itemStatus.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.itemStatusItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.customerReference.input(
      testData.CreateAccountReport.customerReference
    );
    await _AccountReportsListPage.createAccountReportsPage.batchReference.input(
      testData.CreateAccountReport.batchReference
    );

    await process4OneOff(
      bulkColReportName,
      _AccountReportsListPage.acctReportListPage.bulkColViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.bulkColViewReportName,
      _AccountReportsListPage.acctReportListPage.bulkColViewAcct,
      _AccountReportsListPage.acctReportListPage.bulkColViewDateRange
    );
  });

  it("View Standard report", async function () {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(
      "Standard Bulk Collection Report"
    );
    await _AccountReportsListPage.acctReportListPage.bulkColGenerateBtn.click();
    await loadCondition4Report(
      _AccountReportsListPage.paymentReportsPage.accountValue4Reports
    );
    await Promise.all([
      await ensure(
        _AccountReportsListPage.paymentReportsPage.accountValue4Reports
      ).textContains(
        SIT
          ? testData.CreateAccountReport.SIT.accountName
          : testData.CreateAccountReport.UAT.accountName
      )
    ]);
    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Bulk Payment Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Bulk Payment", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "BulkPayment",
      _AccountReportsListPage.acctReportListPage.bulkPaymentCreateButton
    ).then(text => {
      bulkPaymentReportName = text;
    });

    //remove below for better generate report
    // await _AccountReportsListPage.createAccountReportsPage.itemStatus.jsClick();
    // await _AccountReportsListPage.createAccountReportsPage.itemStatusItem.jsClick();
    // await _AccountReportsListPage.createAccountReportsPage.customerReference.input(
    //   testData.CreateAccountReport.customerReference
    // );
    // await _AccountReportsListPage.createAccountReportsPage.batchReference.input(
    //   testData.CreateAccountReport.batchReference
    // );

    await process4OneOff(
      bulkPaymentReportName,
      _AccountReportsListPage.acctReportListPage.bulkPaymentViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.bulkPaymentViewReportName,
      _AccountReportsListPage.acctReportListPage.bulkPaymentViewAcct,
      _AccountReportsListPage.acctReportListPage.bulkPaymentViewDateRange
    );
  });

  it("Edit Bulk Payment", async function () {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(
      bulkPaymentReportName
    );
    await _AccountReportsListPage.acctReportListPage.bulkPaymentActionButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.bulkPaymentActionEditButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();

    await process4Schedule(
      bulkPaymentReportName,
      _AccountReportsListPage.acctReportListPage.bulkPaymentViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.bulkPaymentViewReportName,
      _AccountReportsListPage.acctReportListPage.bulkPaymentViewAcct,
      _AccountReportsListPage.acctReportListPage.bulkPaymentSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      bulkPaymentReportName,
      _AccountReportsListPage.acctReportListPage.bulkPaymentActionButton,
      _AccountReportsListPage.acctReportListPage
        .bulkPaymentActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4Reports
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Cheque and Draft Detail Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Cheque and Draft Detail Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "ChequeDraftDet",
      _AccountReportsListPage.acctReportListPage.chequeDraftDetailCreateButton
    ).then(text => {
      chequeDraftDetailReportName = text;
    });

    await process4Schedule(
      chequeDraftDetailReportName,
      _AccountReportsListPage.acctReportListPage
        .chequeDraftDetailViewDetailsButton,
      _AccountReportsListPage.acctReportListPage
        .chequeDraftDetailViewReportName,
      _AccountReportsListPage.acctReportListPage.chequeDraftDetailViewAcct,
      _AccountReportsListPage.acctReportListPage.chequeDraftDetailSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      chequeDraftDetailReportName,
      _AccountReportsListPage.acctReportListPage.chequeDraftDetailActionButton,
      _AccountReportsListPage.acctReportListPage
        .chequeDraftDetailActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4Reports
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Cheque and Draft Summary Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("View Standard report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await _AccountReportsListPage.acctReportListPage.filterInput.input(
      "Standard Cheque and Draft Summary Report"
    );
    await _AccountReportsListPage.acctReportListPage.chequesSummaryGenerateBtn.click();
    await loadCondition4Report(
      _AccountReportsListPage.paymentReportsPage.accountValue4Reports
    );
    await Promise.all([
      await ensure(
        _AccountReportsListPage.paymentReportsPage.accountValue4Reports
      ).textContains(
        SIT
          ? testData.CreateAccountReport.SIT.accountName
          : testData.CreateAccountReport.UAT.accountName
      )
    ]);
  });
});

describe("FAST Collection Detail Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create FAST Collection Detail Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "FASTCol",
      _AccountReportsListPage.acctReportListPage.FASTCollectionCreateButton
    ).then(text => {
      fastColReportName = text;
    });

    await process4OneOff(
      fastColReportName,
      _AccountReportsListPage.acctReportListPage.fastColViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.fastColViewReportName,
      _AccountReportsListPage.acctReportListPage.fastColViewAcct,
      _AccountReportsListPage.acctReportListPage.fastColViewDateRange
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      fastColReportName,
      _AccountReportsListPage.acctReportListPage.fastColActionButton,
      _AccountReportsListPage.acctReportListPage.fastColActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4Reports1
    );
  });
});

describe("FAST Payment Detail Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create FAST Payment Detail Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "FASTPayment",
      _AccountReportsListPage.acctReportListPage.FASTPaymentCreateButton
    ).then(text => {
      fastPaymentReportName = text;
    });

    await process4Schedule(
      fastPaymentReportName,
      _AccountReportsListPage.acctReportListPage.fastPaymentViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.fastPaymentViewReportName,
      _AccountReportsListPage.acctReportListPage.fastPaymentViewAcct,
      _AccountReportsListPage.acctReportListPage.fastPaymentSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      fastPaymentReportName,
      _AccountReportsListPage.acctReportListPage.fastPaymentActionButton,
      _AccountReportsListPage.acctReportListPage
        .fastPaymentActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4Reports1
    );
  });
});

describe("Group Detail Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Group Detail Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "GroupDet",
      _AccountReportsListPage.acctReportListPage.groupDetCreateButton
    ).then(text => {
      groupDetReportName = text;
    });

    await _AccountReportsListPage.createAccountReportsPage.txnStatus.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.txnStatusItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.groupReference.input(
      testData.CreateAccountReport.groupReference
    );
    await _AccountReportsListPage.createAccountReportsPage.customerReference.input(
      testData.CreateAccountReport.customerReference
    );

    await process4OneOff(
      groupDetReportName,
      _AccountReportsListPage.acctReportListPage.groupDetViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.groupDetViewReportName,
      _AccountReportsListPage.acctReportListPage.groupDetViewAcct,
      _AccountReportsListPage.acctReportListPage.groupDetViewDateRange
    );
  });

  it("View Report", async function () {
    await processGenerateNoDataReport(
      groupDetReportName,
      _AccountReportsListPage.acctReportListPage.groupDetActionButton,
      _AccountReportsListPage.acctReportListPage.groupDetActionGenerateButton
    );
  });
});

describe("Group Summary Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Group Summary Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "GroupSum",
      _AccountReportsListPage.acctReportListPage.groupSumCreateButton
    ).then(text => {
      groupSumReportName = text;
    });

    await _AccountReportsListPage.createAccountReportsPage.groupReference.input(
      testData.CreateAccountReport.groupReference
    );

    await process4Schedule(
      groupSumReportName,
      _AccountReportsListPage.acctReportListPage.groupSumViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.groupSumViewReportName,
      _AccountReportsListPage.acctReportListPage.groupSumViewAcct,
      _AccountReportsListPage.acctReportListPage.groupSumSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateNoDataReport(
      groupSumReportName,
      _AccountReportsListPage.acctReportListPage.groupSumActionButton,
      _AccountReportsListPage.acctReportListPage.groupSumActionGenerateButton
    );
  });
});

describe("Transaction Status Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Transaction Status Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "TxnStatus",
      _AccountReportsListPage.acctReportListPage.txnStatusCreateButton
    ).then(text => {
      txnStatusReportName = text;
    });

    await process4Schedule(
      txnStatusReportName,
      _AccountReportsListPage.acctReportListPage.txnStatusViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.txnStatusViewReportName,
      _AccountReportsListPage.acctReportListPage.txnStatusViewAcct,
      _AccountReportsListPage.acctReportListPage.txnStatusSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      txnStatusReportName,
      _AccountReportsListPage.acctReportListPage.txnStatusActionButton,
      _AccountReportsListPage.acctReportListPage.txnStatusActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4StatusReports
    );
  });
});

describe("Payment Advice Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Payment Advice Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "PayAdv",
      _AccountReportsListPage.acctReportListPage.payAdvCreateButton
    ).then(text => {
      payAdvReportName = text;
    });

    await process4OneOff(
      payAdvReportName,
      _AccountReportsListPage.acctReportListPage.payAdvViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.payAdvViewReportName,
      _AccountReportsListPage.acctReportListPage.payAdvViewAcct,
      _AccountReportsListPage.acctReportListPage.payAdvViewDateRange
    );
  });

  it("Edit Payment Advice Report", async function () {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(
      payAdvReportName
    );
    await _AccountReportsListPage.acctReportListPage.payAdvActionButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.payAdvActionEditButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();

    await process4Schedule(
      payAdvReportName,
      _AccountReportsListPage.acctReportListPage.payAdvViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.payAdvViewReportName,
      _AccountReportsListPage.acctReportListPage.payAdvViewAcct,
      _AccountReportsListPage.acctReportListPage.payAdvSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      payAdvReportName,
      _AccountReportsListPage.acctReportListPage.payAdvActionButton,
      _AccountReportsListPage.acctReportListPage.payAdvActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4PayAdvReports
    );
  });
});

describe("Payroll Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Payroll Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "Payroll",
      _AccountReportsListPage.acctReportListPage.payrollCreateButton
    ).then(text => {
      payrollReportName = text;
    });

    // await _AccountReportsListPage.createAccountReportsPage.itemStatus.jsClick();
    // await _AccountReportsListPage.createAccountReportsPage.itemStatusItem.jsClick();
    // await _AccountReportsListPage.createAccountReportsPage.customerReference.input(
    //   testData.CreateAccountReport.customerReference
    // );
    // await _AccountReportsListPage.createAccountReportsPage.batchReference.input(
    //   testData.CreateAccountReport.batchReference
    // );

    await process4OneOff(
      payrollReportName,
      _AccountReportsListPage.acctReportListPage.payrollViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.payrollViewReportName,
      _AccountReportsListPage.acctReportListPage.payrollViewAcct,
      _AccountReportsListPage.acctReportListPage.payrollViewDateRange
    );
  });

  it("Edit Payroll Report", async function () {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(
      payrollReportName
    );
    await _AccountReportsListPage.acctReportListPage.payrollActionButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.payrollActionEditButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();

    await process4Schedule(
      payrollReportName,
      _AccountReportsListPage.acctReportListPage.payrollViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.payrollViewReportName,
      _AccountReportsListPage.acctReportListPage.payrollViewAcct,
      _AccountReportsListPage.acctReportListPage.payrollSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      payrollReportName,
      _AccountReportsListPage.acctReportListPage.payrollActionButton,
      _AccountReportsListPage.acctReportListPage.payrollActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4Reports
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Payroll Summary Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Payroll Summary Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "PayrollSum",
      _AccountReportsListPage.acctReportListPage.payrollSumCreateButton
    ).then(text => {
      payrollSumReportName = text;
    });

    // await _AccountReportsListPage.createAccountReportsPage.itemStatus.jsClick();
    // await _AccountReportsListPage.createAccountReportsPage.itemStatusItem.jsClick();
    // await _AccountReportsListPage.createAccountReportsPage.customerReference.input(
    //   testData.CreateAccountReport.customerReference
    // );
    // await _AccountReportsListPage.createAccountReportsPage.batchReference.input(
    //   testData.CreateAccountReport.batchReference
    // );

    await process4OneOff(
      payrollSumReportName,
      _AccountReportsListPage.acctReportListPage.payrollSumViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.payrollSumViewReportName,
      _AccountReportsListPage.acctReportListPage.payrollSumViewAcct,
      _AccountReportsListPage.acctReportListPage.payrollSumViewDateRange
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      payrollSumReportName,
      _AccountReportsListPage.acctReportListPage.payrollSumActionButton,
      _AccountReportsListPage.acctReportListPage.payrollSumActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4PayrollSumReports
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Stop Cheque Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Stop Cheque Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "StopChe",
      _AccountReportsListPage.acctReportListPage.stopCheCreateButton
    ).then(text => {
      stopCheReportName = text;
    });
    await _AccountReportsListPage.createAccountReportsPage.customerReference.input(
      testData.CreateAccountReport.customerReference
    );
    await _AccountReportsListPage.createAccountReportsPage.chequeNumber.input(
      testData.CreateAccountReport.chequeNumber
    );

    await process4OneOff(
      stopCheReportName,
      _AccountReportsListPage.acctReportListPage.stopCheViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.stopCheViewReportName,
      _AccountReportsListPage.acctReportListPage.stopCheViewAcct,
      _AccountReportsListPage.acctReportListPage.stopCheViewDateRange
    );
  });

  it("Edit Stop Cheque Report", async function () {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(
      stopCheReportName
    );
    await _AccountReportsListPage.acctReportListPage.stopCheActionButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.stopCheActionEditButton.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();

    await process4Schedule(
      stopCheReportName,
      _AccountReportsListPage.acctReportListPage.stopCheViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.stopCheViewReportName,
      _AccountReportsListPage.acctReportListPage.stopCheViewAcct,
      _AccountReportsListPage.acctReportListPage.stopCheSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateNoDataReport(
      stopCheReportName,
      _AccountReportsListPage.acctReportListPage.stopCheActionButton,
      _AccountReportsListPage.acctReportListPage.stopCheActionGenerateButton
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Payment Summation by Currency Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Payment Summation by Currency Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "PayCur",
      _AccountReportsListPage.acctReportListPage.payCurCreateButton
    ).then(text => {
      payCurReportName = text;
    });

    await _AccountReportsListPage.createAccountReportsPage.payCurDropDown.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.payCurSelect1.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.payCurSelect2.jsClick();

    await process4OneOff(
      payCurReportName,
      _AccountReportsListPage.acctReportListPage.payCurViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.payCurViewReportName,
      _AccountReportsListPage.acctReportListPage.payCurViewAcct,
      _AccountReportsListPage.acctReportListPage.payCurViewDateRange
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      payCurReportName,
      _AccountReportsListPage.acctReportListPage.payCurActionButton,
      _AccountReportsListPage.acctReportListPage.payCurActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4PayCur
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Tax Payment Advice Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Tax Payment Advice Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "TaxAdv",
      _AccountReportsListPage.acctReportListPage.taxAdvCreateButton
    ).then(text => {
      taxAdvReportName = text;
    });

    await process4OneOff(
      taxAdvReportName,
      _AccountReportsListPage.acctReportListPage.taxAdvViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.taxAdvViewReportName,
      _AccountReportsListPage.acctReportListPage.taxAdvViewAcct,
      _AccountReportsListPage.acctReportListPage.taxAdvViewDateRange
    );
  });

  it("View Report", async function () {
    await processGenerateNoDataReport(
      taxAdvReportName,
      _AccountReportsListPage.acctReportListPage.taxAdvActionButton,
      _AccountReportsListPage.acctReportListPage.taxAdvActionGenerateButton
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Tax Payment Detail Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Tax Payment Detail Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "TaxDet",
      _AccountReportsListPage.acctReportListPage.taxDetCreateButton
    ).then(text => {
      taxDetReportName = text;
    });

    await process4OneOff(
      taxDetReportName,
      _AccountReportsListPage.acctReportListPage.taxDetViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.taxDetViewReportName,
      _AccountReportsListPage.acctReportListPage.taxDetViewAcct,
      _AccountReportsListPage.acctReportListPage.taxDetViewDateRange
    );
  });

  it("View Report", async function () {
    await processGenerateNoDataReport(
      taxDetReportName,
      _AccountReportsListPage.acctReportListPage.taxDetActionButton,
      _AccountReportsListPage.acctReportListPage.taxDetActionGenerateButton
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Tax Payment Summary Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Tax Payment Summary Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "TaxSum",
      _AccountReportsListPage.acctReportListPage.taxSumCreateButton
    ).then(text => {
      taxSumReportName = text;
    });

    await process4OneOff(
      taxSumReportName,
      _AccountReportsListPage.acctReportListPage.taxSumViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.taxSumViewReportName,
      _AccountReportsListPage.acctReportListPage.taxSumViewAcct,
      _AccountReportsListPage.acctReportListPage.taxSumViewDateRange
    );
  });

  it("View Report", async function () {
    await processGenerateNoDataReport(
      taxSumReportName,
      _AccountReportsListPage.acctReportListPage.taxSumActionButton,
      _AccountReportsListPage.acctReportListPage.taxSumActionGenerateButton
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Transfer Detail Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Transfer Detail Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "TranDetReportName",
      _AccountReportsListPage.acctReportListPage.transferDetCreateButton
    ).then(text => {
      transferDetReportName = text;
    });

    await process4Schedule(
      transferDetReportName,
      _AccountReportsListPage.acctReportListPage.transferDetViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.transferDetViewReportName,
      _AccountReportsListPage.acctReportListPage.transferDetViewAcct,
      _AccountReportsListPage.acctReportListPage.transferDetSendToValue
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      transferDetReportName,
      _AccountReportsListPage.acctReportListPage.transferDetActionButton,
      _AccountReportsListPage.acctReportListPage
        .transferDetActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4Reports2
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Transfer Summary Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Transfer Summary Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "TranSumReportName",
      _AccountReportsListPage.acctReportListPage.transferSumCreateButton
    ).then(text => {
      transferSumReportName = text;
    });

    await process4OneOff(
      transferSumReportName,
      _AccountReportsListPage.acctReportListPage.transferSumViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.transferSumViewReportName,
      _AccountReportsListPage.acctReportListPage.transferSumViewAcct,
      _AccountReportsListPage.acctReportListPage.transferSumViewDateRange
    );
  });

  it("View Report", async function () {
    await processGenerateReport(
      transferSumReportName,
      _AccountReportsListPage.acctReportListPage.transferSumActionButton,
      _AccountReportsListPage.acctReportListPage
        .transferSumActionGenerateButton,
      _AccountReportsListPage.paymentReportsPage.accountValue4TranSumReports
    );

    await browser.close();
    await pageSwitchWindow("DBS IDEAL");
  });
});

describe("Transfer Summary Detail Report", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Create Transfer Summary Detail Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "TranSumDetReportName",
      _AccountReportsListPage.acctReportListPage.tranSumDetCreateButton
    ).then(text => {
      tranSumDetReportName = text;
    });

    await process4OneOff(
      tranSumDetReportName,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewReportName,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewAcct,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewDateRange
    );
  });
});

describe("UX Payment Reports Deletion", async function () {
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
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("Deletion Bulk Collection Report", async function () {
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    if ("" !== bulkColReportName) {
      await deleteReport(
        bulkColReportName,
        _AccountReportsListPage.acctReportListPage.bulkColActionButton,
        _AccountReportsListPage.acctReportListPage.bulkColActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.BulkColRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.BulkColRepOptions,
        _AccountReportsListPage.acctReportListPage.BulkColRepDeleteButton
      )
    }
  });

  it("Deletion Bulk Payment Report", async function () {
    if ("" !== bulkPaymentReportName) {
      await deleteReport(
        bulkPaymentReportName,
        _AccountReportsListPage.acctReportListPage.bulkPaymentActionButton,
        _AccountReportsListPage.acctReportListPage.bulkPaymentActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.BulkPayRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.BulkPayRepOptions,
        _AccountReportsListPage.acctReportListPage.BulkPayRepDeleteButton
      )
    }
  });

  it("Deletion Cheque and Draft Detail Report", async function () {
    if ("" !== chequeDraftDetailReportName) {
      await deleteReport(
        chequeDraftDetailReportName,
        _AccountReportsListPage.acctReportListPage
          .chequeDraftDetailActionButton,
        _AccountReportsListPage.acctReportListPage
          .chequeDraftDetailActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.CheDraDeRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.CheDraDeRepOptions,
        _AccountReportsListPage.acctReportListPage.CheDraDeRepDeleteButton
      )
    }
  });

  //Cheque and Draft Summary Report no need to delete

  it("Deletion FAST Collection Detail Report", async function () {
    if ("" !== fastColReportName) {
      await deleteReport(
        fastColReportName,
        _AccountReportsListPage.acctReportListPage.fastColActionButton,
        _AccountReportsListPage.acctReportListPage.fastColActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.FastCollDetRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.FastCollDetRepOptions,
        _AccountReportsListPage.acctReportListPage.FastCollDetRepDeleteButton
      )
    }
  });

  it("Deletion FAST Payment Detail Report", async function () {
    if ("" !== fastPaymentReportName) {
      await deleteReport(
        fastPaymentReportName,
        _AccountReportsListPage.acctReportListPage.fastPaymentActionButton,
        _AccountReportsListPage.acctReportListPage.fastPaymentActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.FastPayDetRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.FastPayDetRepOptions,
        _AccountReportsListPage.acctReportListPage.FastPayDetRepDeleteButton,
      )
    }
  });

  it("Deletion Group Detail Report", async function () {
    if ("" !== groupDetReportName) {
      await deleteReport(
        groupDetReportName,
        _AccountReportsListPage.acctReportListPage.groupDetActionButton,
        _AccountReportsListPage.acctReportListPage.groupDetActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.GroDetRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.GroDetRepOptions,
        _AccountReportsListPage.acctReportListPage.GroDetRepDeleteButton,
      )
    }
  });

  it("Deletion Group Summary Report", async function () {
    if ("" !== groupSumReportName) {
      await deleteReport(
        groupSumReportName,
        _AccountReportsListPage.acctReportListPage.groupSumActionButton,
        _AccountReportsListPage.acctReportListPage.groupSumActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.GroSumRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.GroSumRepOptions,
        _AccountReportsListPage.acctReportListPage.GroSumRepDeleteButton,
      )
    }
  });

  it("Deletion Transaction Status Report", async function () {
    if ("" !== txnStatusReportName) {
      await deleteReport(
        txnStatusReportName,
        _AccountReportsListPage.acctReportListPage.txnStatusActionButton,
        _AccountReportsListPage.acctReportListPage.txnStatusActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.TraStaRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.TraStaRepOptions,
        _AccountReportsListPage.acctReportListPage.TraStaRepDeleteButton,
      )
    }
  });

  it("Deletion Payment Advice Report", async function () {
    if ("" !== payAdvReportName) {
      await deleteReport(
        payAdvReportName,
        _AccountReportsListPage.acctReportListPage.payAdvActionButton,
        _AccountReportsListPage.acctReportListPage.payAdvActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.PayAdvRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.PayAdvRepOptions,
        _AccountReportsListPage.acctReportListPage.PayAdvRepDeleteButton,
      )
    }
  });

  it("Deletion Payroll Report", async function () {
    if ("" !== payrollReportName) {
      await deleteReport(
        payrollReportName,
        _AccountReportsListPage.acctReportListPage.payrollActionButton,
        _AccountReportsListPage.acctReportListPage.payrollActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.PayrollRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.PayrollOptions,
        _AccountReportsListPage.acctReportListPage.PayrollDeleteButton,
      )
    }
  });

  it("Deletion Payroll Summary Report", async function () {
    if ("" !== payrollSumReportName) {
      await deleteReport(
        payrollSumReportName,
        _AccountReportsListPage.acctReportListPage.payrollSumActionButton,
        _AccountReportsListPage.acctReportListPage.payrollSumActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.PayrollSumRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.PayrollSumOptions,
        _AccountReportsListPage.acctReportListPage.PayrollSumDeleteButton,
      )
    }
  });

  it("Deletion Stop Cheque Report", async function () {
    if ("" !== stopCheReportName) {
      await deleteReport(
        stopCheReportName,
        _AccountReportsListPage.acctReportListPage.stopCheActionButton,
        _AccountReportsListPage.acctReportListPage.stopCheActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.StoCheRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.StoCheRepOptions,
        _AccountReportsListPage.acctReportListPage.StoCheRepDeleteButton
      )
    }
  });

  it("Deletion Payment Summation by Currency Report", async function () {
    if ("" !== payCurReportName) {
      await deleteReport(
        payCurReportName,
        _AccountReportsListPage.acctReportListPage.payCurActionButton,
        _AccountReportsListPage.acctReportListPage.payCurActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.PaySumByCurrRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.PaySumByCurrRepOptions,
        _AccountReportsListPage.acctReportListPage.PaySumByCurrRepoDeleteButton
      );
    }
  });

  it("Deletion Tax Payment Advice Report", async function () {
    if ("" !== taxAdvReportName) {
      await deleteReport(
        taxAdvReportName,
        _AccountReportsListPage.acctReportListPage.taxAdvActionButton,
        _AccountReportsListPage.acctReportListPage.taxAdvActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.TaxPayAdvRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.TaxPayAdvRepOptions,
        _AccountReportsListPage.acctReportListPage.TaxPayAdvRepDeleteButton
      )
    }
  });

  it("Deletion Tax Payment Detail Report", async function () {
    if ("" !== taxDetReportName) {
      await deleteReport(
        taxDetReportName,
        _AccountReportsListPage.acctReportListPage.taxDetActionButton,
        _AccountReportsListPage.acctReportListPage.taxDetActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.TaxPayDetRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.TaxPayDetRepOptions,
        _AccountReportsListPage.acctReportListPage.TaxPayDetRepDeleteButton
      )
    }
  });

  it("Deletion Tax Payment Summary Report", async function () {
    if ("" !== taxSumReportName) {
      await deleteReport(
        taxSumReportName,
        _AccountReportsListPage.acctReportListPage.taxSumActionButton,
        _AccountReportsListPage.acctReportListPage.taxSumActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.TaxPaySumRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.TaxPaySumRepOptions,
        _AccountReportsListPage.acctReportListPage.TaxPaySumRepDeteleButton
      )
    }
  });

  it("Deletion Transfer Detail Report", async function () {
    if ("" !== transferDetReportName) {
      await deleteReport(
        transferDetReportName,
        _AccountReportsListPage.acctReportListPage.transferDetActionButton,
        _AccountReportsListPage.acctReportListPage.transferDetActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.TranDetaRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.TranDetaRepOptions,
        _AccountReportsListPage.acctReportListPage.TranDetaRepDeteleButton
      )
    }
  });

  it("Deletion Transfer Summary Report", async function () {
    if ("" !== transferSumReportName) {
      await deleteReport(
        transferSumReportName,
        _AccountReportsListPage.acctReportListPage.transferSumActionButton,
        _AccountReportsListPage.acctReportListPage.transferSumActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.TranSumRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.TranSumRepOptions,
        _AccountReportsListPage.acctReportListPage.TranSumRepDeteleButton
      )
    }
  });

  it("Deletion Transfer Summary Detail Report", async function () {
    if ("" !== tranSumDetReportName) {
      await deleteReport(
        tranSumDetReportName,
        _AccountReportsListPage.acctReportListPage.tranSumDetActionButton,
        _AccountReportsListPage.acctReportListPage.tranSumDetActionDeleteButton
      );
    }
    else {
      await ListDelete(
        _AccountReportsListPage.acctReportListPage.TranSumDetRepShowSaTem,
        _AccountReportsListPage.acctReportListPage.TranSumDetRepOptions,
        _AccountReportsListPage.acctReportListPage.TranSumDetRepDeteleButton
      )
    }
  });

  it("Multi select to delete", async function () {
    //Create Twice, and then delete then
    await _AccountReportsListPage.openMenu(Menu.Reports.NewPaymentReports);
    await _AccountReportsListPage.acctReportListPage.loadCondition();

    await process4InitCommonValue(
      "TranSumDetReportName",
      _AccountReportsListPage.acctReportListPage.tranSumDetCreateButton
    ).then(text => {
      tranSumDetReportName = text;
    });

    await process4OneOff(
      tranSumDetReportName,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewReportName,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewAcct,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewDateRange
    );

    await process4InitCommonValue(
      "TranSumDetReportName",
      _AccountReportsListPage.acctReportListPage.tranSumDetCreateButton
    ).then(text => {
      tranSumDetReportName = text;
    });

    await process4OneOff(
      tranSumDetReportName,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewDetailsButton,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewReportName,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewAcct,
      _AccountReportsListPage.acctReportListPage.tranSumDetViewDateRange
    );

    await _AccountReportsListPage.acctReportListPage.filterInput.input(
      "TranSumDetReportName"
    );
    // await _AccountReportsListPage.createAccountReportsPage.selectAll4TransferSumDetReport.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.selectMultiToDeleteButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.tranSumDetActionMultiDeleteButton.jsClick();
    await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
    await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
    await _AccountReportsListPage.acctReportListPage.dismiss.click();
    await _AccountReportsListPage.acctReportListPage.loadCondition();
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

async function process4OneOff(
  reportName: string,
  viewDetailsButton: Button,
  reportNameInView: TextInput,
  accountInView: TextInput,
  dataRangeInView: TextInput
) {
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
  await _AccountReportsListPage.acctReportListPage.filterInput.input(
    reportName
  );
  await viewDetailsButton.jsClick();

  await Promise.all([
    await ensure(reportNameInView).textContains(reportName),

    await ensure(accountInView).textContains(
      SIT
        ? testData.CreateAccountReport.SIT.account
        : testData.CreateAccountReport.UAT.account
    ),

    await ensure(dataRangeInView).textContains(
      currentDateFormat + " to " + currentDateFormat
    )
  ]);
}

async function process4InitCommonValue(
  prefixReportName: string,
  createBtn: Button
) {
  let text: string = "";
  await createBtn.jsClick();
  await _AccountReportsListPage.createAccountReportsPage.loadCondition();
  await _AccountReportsListPage.createAccountReportsPage.reportName.input(
    prefixReportName + moment()
  );
  text = await _AccountReportsListPage.createAccountReportsPage.reportName.getText();
  await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
  await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
    SIT
      ? testData.CreateAccountReport.SIT.accountNotInclude
      : testData.CreateAccountReport.UAT.accountNotInclude
  );
  await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
  return text;
}

async function process4Schedule(
  reportName: string,
  viewDetailsButton: Button,
  reportNameInView: TextInput,
  accountInView: TextInput,
  sentToInView: TextInput
) {
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
  await viewDetailsButton.jsClick();
  await Promise.all([
    await ensure(reportNameInView).textContains(reportName),
    await ensure(accountInView).textContains(
      SIT
        ? testData.CreateAccountReport.SIT.account
        : testData.CreateAccountReport.UAT.account
    ),
    await ensure(sentToInView).isNotEmpty()
  ]);
}

async function ListDelete(
  ShowSavTemBtn: Button,
  OptionsBtn: Button,
  DeleteBtn: Button,
) {
  await ShowSavTemBtn.jsClick();
  await OptionsBtn.jsClick();
  await DeleteBtn.jsClick();
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

async function loadCondition4Report(accountElement: TextInput) {
  await pageSwitchWindow("BIRT Report Viewer");
  await browser.wait(
    ExpectedConditions.stalenessOf(
      _AccountReportsListPage.paymentReportsPage.firstViewButton.element
    ),
    _AccountReportsListPage.paymentReportsPage.firstViewButton.getTimeOut()
  );
  await browser.wait(
    ExpectedConditions.elementToBeClickable(accountElement.element),
    accountElement.getTimeOut()
  );
}

async function processGenerateNoDataReport(
  reportName: string,
  optionBtn: Button,
  generateBtn: Button
) {
  await _AccountReportsListPage.acctReportListPage.filterInput.input(
    reportName
  );
  await optionBtn.jsClick();
  await generateBtn.jsClick();

  await _AccountReportsListPage.paymentReportsPage.loadConditionForDBSLogoOnReportPage();
  await ensure(
    _AccountReportsListPage.acctReportListPage.birtElement
  ).isElementPresent();
}



async function processGenerateReport(
  reportName: string,
  optionBtn: Button,
  generateBtn: Button,
  accountElement: TextInput
) {
  await _AccountReportsListPage.acctReportListPage.filterInput.input(
    reportName
  );
  await optionBtn.jsClick();
  await generateBtn.jsClick();
  await loadCondition4Report(accountElement);
  await Promise.all([
    await ensure(accountElement).isNotEmpty(),
  ]);
}