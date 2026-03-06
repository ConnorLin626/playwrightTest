/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import { FilesPages, ReportsPages, NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, Button, TextInput, pageSwitchWindow, PROJECT_TYPE, generatedID } from "../../../lib";
import moment = require("moment");

let _AccountReportsListPage = new ReportsPages();
let _PaymentsPages = new PaymentsPages();
const _FilesPages = new FilesPages();
let fileName = "";
let testData = _AccountReportsListPage.fetchTestData("SG_testData_03.json");
let bulkColReportName = "";
let bulkPaymentReportName = "";
let chequeDraftDetailReportName = "";
let fastColReportName = "";
let fastPaymentReportName = "";
let groupSumReportName = "";
let stopCheReportName = "";
let tranSumDetReportName = "";
let EDPReportName = "";
let fileType = 'ALL - Universal File Format';


describe("Upload File", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it("Upload File for Create Data for Report", async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.CreateAccountReport.SIT.fileNameForALL : testData.CreateAccountReport.UAT.fileNameForALL, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage2();
        await _FilesPages.uploadFilePage.paymentReferenceLink1.jsClick();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty()
        ]);
    });
});

describe("Bulk Collection Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Bulk Collection", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue("BulkCol", _AccountReportsListPage.acctReportListPage.bulkColCreateButton).then(text => { bulkColReportName = text; });

        await _AccountReportsListPage.createAccountReportsPage.itemStatus.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.itemStatusItem.jsClick();
        await _AccountReportsListPage.createAccountReportsPage.customerReference.input(testData.CreateAccountReport.customerReference);
        await _AccountReportsListPage.createAccountReportsPage.batchReference.input(testData.CreateAccountReport.batchReference);

        await process4OneOff(
            bulkColReportName,
            _AccountReportsListPage.acctReportListPage.bulkColViewDetailsButton,
            _AccountReportsListPage.acctReportListPage.bulkColViewReportName,
            _AccountReportsListPage.acctReportListPage.bulkColViewAcct,
            _AccountReportsListPage.acctReportListPage.bulkColViewDateRange
        );
    });

    it("View Standard report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input("Standard Bulk Collection Report");
        await _AccountReportsListPage.acctReportListPage.bulkColGenerateBtn.jsClick();
        await loadCondition4Report(_AccountReportsListPage.paymentReportsPage.accountValue4Reports);

        // comment this first for can nou upload no current date now
        // await Promise.all([
        //     await ensure(_AccountReportsListPage.paymentReportsPage.accountValue4Reports).textContains(SIT ? testData.CreateAccountReport.SIT.accountName : testData.CreateAccountReport.UAT.accountName)]);
        await ensure(_AccountReportsListPage.paymentReportsPage.accountValue4Reports).isNotEmpty();
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("Bulk Payment Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Bulk Payment", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
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
            _AccountReportsListPage.acctReportListPage.bulkPaymentActionGenerateButton,
            _AccountReportsListPage.paymentReportsPage.accountValue4Reports
        );
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("Cheque and Draft Detail Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Cheque and Draft Detail Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue("ChequeDraftDet", _AccountReportsListPage.acctReportListPage.chequeDraftDetailCreateButton).then(text => {
            chequeDraftDetailReportName = text;
        });

        await process4Schedule(
            chequeDraftDetailReportName,
            _AccountReportsListPage.acctReportListPage.chequeDraftDetailViewDetailsButton,
            _AccountReportsListPage.acctReportListPage.chequeDraftDetailViewReportName,
            _AccountReportsListPage.acctReportListPage.chequeDraftDetailViewAcct,
            _AccountReportsListPage.acctReportListPage.chequeDraftDetailSendToValue
        );
    });

    it("View Report", async function () {
        await processGenerateReport(
            chequeDraftDetailReportName,
            _AccountReportsListPage.acctReportListPage.chequeDraftDetailActionButton,
            _AccountReportsListPage.acctReportListPage.chequeDraftDetailActionGenerateButton,
            _AccountReportsListPage.paymentReportsPage.accountValue4Reports
        );

        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("Cheque and Draft Summary Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("View Standard report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input("Standard Cheque and Draft Summary Report");
        await _AccountReportsListPage.acctReportListPage.chequesSummaryGenerateBtn.jsClick();
        await loadCondition4Report(_AccountReportsListPage.paymentReportsPage.accountValue4Reports);

        // comment this first for can nou upload no current date now
        // await Promise.all([
        //     await ensure(_AccountReportsListPage.paymentReportsPage.accountValue4Reports).textContains(SIT ? testData.CreateAccountReport.SIT.accountName : testData.CreateAccountReport.UAT.accountName)
        // ]);

        await ensure(_AccountReportsListPage.paymentReportsPage.accountValue4Reports).isNotEmpty();
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("FAST Collection Detail Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create FAST Collection Detail Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue("FASTCol", _AccountReportsListPage.acctReportListPage.FASTCollectionCreateButton).then(text => {
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
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("FAST Payment Detail Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create FAST Payment Detail Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue("FASTPayment", _AccountReportsListPage.acctReportListPage.FASTPaymentCreateButton).then(text => {
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
            _AccountReportsListPage.acctReportListPage.fastPaymentActionGenerateButton,
            _AccountReportsListPage.paymentReportsPage.accountValue4Reports1
        );
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("Group Summary Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Group Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue("GroupSum", _AccountReportsListPage.acctReportListPage.groupSumCreateButton).then(text => {
            groupSumReportName = text;
        });

        await _AccountReportsListPage.createAccountReportsPage.groupReference.input(
            testData.CreateAccountReport.groupReference);

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
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("Stop Cheque Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Stop Cheque Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue(
            "StopChe", _AccountReportsListPage.acctReportListPage.stopCheCreateButton).then(text => {
                stopCheReportName = text;
            });
        await _AccountReportsListPage.createAccountReportsPage.customerReference.input(testData.CreateAccountReport.customerReference);
        await _AccountReportsListPage.createAccountReportsPage.chequeNumber.input(testData.CreateAccountReport.chequeNumber);

        await process4OneOff(
            stopCheReportName,
            _AccountReportsListPage.acctReportListPage.stopCheViewDetailsButton,
            _AccountReportsListPage.acctReportListPage.stopCheViewReportName,
            _AccountReportsListPage.acctReportListPage.stopCheViewAcct,
            _AccountReportsListPage.acctReportListPage.stopCheViewDateRange
        );
    });

    it("Edit Stop Cheque Report", async function () {
        await _AccountReportsListPage.acctReportListPage.filterInput.input(stopCheReportName);
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
    //in uat will not data
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

describe("Transfer Summary Detail Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Create Transfer Summary Detail Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue("TranSumDetReportName", _AccountReportsListPage.acctReportListPage.tranSumDetCreateButton).then(text => {
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
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Deletion Bulk Collection Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
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
            await deleteReport(chequeDraftDetailReportName,
                _AccountReportsListPage.acctReportListPage.chequeDraftDetailActionButton,
                _AccountReportsListPage.acctReportListPage.chequeDraftDetailActionDeleteButton
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
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
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

describe("EDP Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateAccountReport.SIT.loginCompanyId : testData.CreateAccountReport.UAT.loginCompanyId, SIT ? testData.CreateAccountReport.SIT.loginUserId03 : testData.CreateAccountReport.UAT.loginUserId, testData.CreateAccountReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Create EDP Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        
        await _AccountReportsListPage.acctReportListPage.createEDPReportButton.click();
        await _AccountReportsListPage.createAccountReportsPage.loadCondition();
        EDPReportName = "EDPReportName"+generatedID();
        await _AccountReportsListPage.createAccountReportsPage.reportName.input(EDPReportName);

        await _AccountReportsListPage.acctReportListPage.EDPPaymentType.jsClick();
        await _AccountReportsListPage.acctReportListPage.issuedStatus.jsClick();
        await _AccountReportsListPage.acctReportListPage.customerReference.input('report'+generatedID());
        await _AccountReportsListPage.acctReportListPage.remarks.input(testData.CreateAccountReport.remarksMaxlen);
        await _AccountReportsListPage.createAccountReportsPage.nextToGenerate.click();
        await _AccountReportsListPage.createAccountReportsPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.filterInput.input(EDPReportName);
        await _AccountReportsListPage.acctReportListPage.EDPReportDetailName.jsClick();
        await Promise.all([
            await ensure(_AccountReportsListPage.acctReportListPage.EDPReportDetailName).textContains(EDPReportName),
            await ensure(_AccountReportsListPage.acctReportListPage.EDPReportDetailAccount).textContains(SIT ? testData.CreateAccountReport.SIT.EDPAccount : testData.CreateAccountReport.UAT.EDPAccount),
            await ensure(_AccountReportsListPage.acctReportListPage.EDPReportDetailRemark).textContains(testData.CreateAccountReport.remarksMaxlen)
        ]);
        await deleteReport(EDPReportName,_AccountReportsListPage.acctReportListPage.EDPActionButton,_AccountReportsListPage.acctReportListPage.EDPReportActionDeleteButton);
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
    await _AccountReportsListPage.createAccountReportsPage.relativeDates.jsClick();
    // await _AccountReportsListPage.createAccountReportsPage.startAbsoluteDate.select(currentDate);
    //await _AccountReportsListPage.createAccountReportsPage.endAbsoluteDate.select(currentDate);
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
    let UATAccount = testData.CreateAccountReport.UAT.account;
    if(reportName.includes("StopChe")){
        UATAccount = testData.CreateAccountReport.UAT.account2;
    }
    await Promise.all([
        await ensure(reportNameInView).textContains(reportName),
        await ensure(accountInView).textContains(
            SIT
                ? testData.CreateAccountReport.SIT.account
                : UATAccount
        ),
        await ensure(dataRangeInView).textContains("Start of current month to End of current month")
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
    await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 1500);
    // await _AccountReportsListPage.createAccountReportsPage.startRelativeDate.select(
    //     testData.CreateAccountReport.startRelativeDate
    // );
    // await _AccountReportsListPage.createAccountReportsPage.endRelativeDate.select(
    //     testData.CreateAccountReport.endRelativeDate
    // );
    await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
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
    let UATAccount = testData.CreateAccountReport.UAT.account;
    if(reportName.includes("StopChe")){
        UATAccount = testData.CreateAccountReport.UAT.account2;
    }
    await Promise.all([
        await ensure(reportNameInView).textContains(reportName),
        await ensure(accountInView).textContains(
            SIT
                ? testData.CreateAccountReport.SIT.account
                : UATAccount
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
    await browser.sleep(5000);
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.sleep(5000);
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
    //await _AccountReportsListPage.acctReportListPage.loadCondition();
    await optionBtn.jsClick();
    await generateBtn.jsClick();
    await loadCondition4Report(accountElement);
    await ensure(accountElement).isElementPresent();
    await Promise.all([
        await ensure(accountElement).isNotEmpty(),
    ]);
}