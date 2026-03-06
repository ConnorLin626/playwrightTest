/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import { ReportsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, Button, TextInput, pageSwitchWindow, PROJECT_TYPE } from "../../../lib";
import moment = require("moment");

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("ID_testData.json");
let taxAdvReportName = "";
let taxDetReportName = "";
let taxSumReportName = "";


describe("Tax Payment Advice Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.paymentReport.SIT.loginCompanyId : testData.paymentReport.UAT.loginCompanyId, SIT ? testData.paymentReport.SIT.loginUserId : testData.paymentReport.UAT.loginUserId,testData.paymentReport.UAT.pinID); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });


    it("Create Tax Payment Advice Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue(
            "TaxAdv",
            _AccountReportsListPage.acctReportListPage.taxAdvCreateButton).then(text => {
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
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.paymentReport.SIT.loginCompanyId : testData.paymentReport.UAT.loginCompanyId, SIT ? testData.paymentReport.SIT.loginUserId : testData.paymentReport.UAT.loginUserId, testData.paymentReport.UAT.pinID); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Create Tax Payment Detail Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue(
            "TaxDet",
            _AccountReportsListPage.acctReportListPage.taxDetCreateButton).then(text => {
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
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.paymentReport.SIT.loginCompanyId : testData.paymentReport.UAT.loginCompanyId, SIT ? testData.paymentReport.SIT.loginUserId : testData.paymentReport.UAT.loginUserId, testData.paymentReport.UAT.pinID); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Create Tax Payment Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
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


describe("UX Payment Reports Deletion", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.paymentReport.SIT.loginCompanyId : testData.paymentReport.UAT.loginCompanyId, SIT ? testData.paymentReport.SIT.loginUserId : testData.paymentReport.UAT.loginUserId, testData.paymentReport.UAT.pinID); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });
    

    it("Deletion Tax Payment Advice Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
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
    await _AccountReportsListPage.createAccountReportsPage.usage.select(
        testData.paymentReport.usage
    );
    await _AccountReportsListPage.createAccountReportsPage.remarks.input(
        testData.paymentReport.remarks
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
                ? testData.paymentReport.SIT.account
                : testData.paymentReport.UAT.account
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
    return text;
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