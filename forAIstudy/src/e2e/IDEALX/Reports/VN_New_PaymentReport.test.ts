/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import { ReportsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, Button, TextInput, pageSwitchWindow, PROJECT_TYPE } from "../../../lib";
import moment = require("moment");

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("VN_testData.json");
let customsReportName = "";


describe("Customs Payment Summary Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.PaymentReport.SIT.loginCompanyId : testData.PaymentReport.UAT.loginCompanyId, SIT ? testData.PaymentReport.SIT.loginUserId : testData.PaymentReport.UAT.loginUserId, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });


    it("Customs Payment Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue("CustomPay",_AccountReportsListPage.acctReportListPage.customsCreateButton).then(text => {
                customsReportName = text;
            });

        await process4OneOff(
            customsReportName,
            _AccountReportsListPage.acctReportListPage.customsViewDetailsButton,
            _AccountReportsListPage.acctReportListPage.customsViewReportName,
            _AccountReportsListPage.acctReportListPage.customsViewAcct,
            _AccountReportsListPage.acctReportListPage.customsViewDateRange
        );
    });

    it("View Report", async function () {
        await processGenerateNoDataReport(
            customsReportName,
            _AccountReportsListPage.acctReportListPage.CustomsActionButton,
            _AccountReportsListPage.acctReportListPage.customsGenerateButton
        );

        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});



describe("UX Payment Reports Deletion", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.paymentReport.SIT.loginCompanyId : testData.paymentReport.UAT.loginCompanyId, SIT ? testData.paymentReport.SIT.loginUserId : testData.paymentReport.UAT.loginUserId, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });
    

    it("Deletion Customs Payment Summary Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        if ("" !== customsReportName) {
            await deleteReport(
                customsReportName,
                _AccountReportsListPage.acctReportListPage.CustomsActionButton,
                _AccountReportsListPage.acctReportListPage.customsActionDeleteButton
            );
        }
        else {
            await ListDelete(
                _AccountReportsListPage.acctReportListPage.customsRepShowSaTem,
                _AccountReportsListPage.acctReportListPage.customsRepOptions,
                _AccountReportsListPage.acctReportListPage.customsRepDeleteButton
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
        await ensure( _AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess() //has success message.
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
    await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.PaymentReport.usage);
    await _AccountReportsListPage.createAccountReportsPage.remarks.input(testData.PaymentReport.remarks);
    await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadDialog();
    await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
    await viewDetailsButton.jsClick();

    await Promise.all([
        await ensure(reportNameInView).textContains(reportName),
        await ensure(accountInView).textContains(
            SIT
                ? testData.PaymentReport.SIT.account
                : testData.PaymentReport.UAT.account
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
        await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess() //has success message.
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