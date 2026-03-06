/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import { ReportsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, Button, TextInput, pageSwitchWindow, PROJECT_TYPE } from "../../../lib";
import moment = require("moment");

let _AccountReportsListPage = new ReportsPages();
let testData = _AccountReportsListPage.fetchTestData("MO_testData.json");
let transferDetReportName = "";

describe("Transfer Detail Report", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.PaymentReport.SIT.loginCompanyId : testData.PaymentReport.UAT.loginCompanyId, SIT ? testData.PaymentReport.SIT.loginUserId : testData.PaymentReport.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Create Transfer Detail Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();

        await process4InitCommonValue("TranDetReportName",_AccountReportsListPage.acctReportListPage.transferDetCreateButton
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
            _AccountReportsListPage.acctReportListPage.transferDetActionGenerateButton,
            _AccountReportsListPage.paymentReportsPage.accountValue4Reports2
            ) 
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });
});

describe("UX Payment Reports Deletion", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.PaymentReport.SIT.loginCompanyId : testData.PaymentReport.UAT.loginCompanyId, SIT ? testData.PaymentReport.SIT.loginUserId : testData.PaymentReport.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it("Deletion Transfer Detail Report", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
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
});

async function deleteReport(reportName: string,optionBtn: Button,deleteBtn: Button): Promise<void> {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
    await optionBtn.jsClick();
    await deleteBtn.jsClick();
    await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
    await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
    await Promise.all([
        await ensure(_AccountReportsListPage.acctReportListPage ).isUXRejectDialogSuccess() //has success message.
    ]);
    await _AccountReportsListPage.acctReportListPage.dismiss.click();
    await _AccountReportsListPage.acctReportListPage.loadCondition();
}

async function process4InitCommonValue(prefixReportName: string,createBtn: Button) {
    let text: string = "";
    await createBtn.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    await _AccountReportsListPage.createAccountReportsPage.reportName.input(prefixReportName + moment());
    text = await _AccountReportsListPage.createAccountReportsPage.reportName.getText();
    await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
        SIT
            ? testData.PaymentReport.SIT.accountNotInclude
            : testData.PaymentReport.UAT.accountNotInclude
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
    await _AccountReportsListPage.createAccountReportsPage.relativeDates.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.scrollTo(0, 800);
    await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
    await _AccountReportsListPage.createAccountReportsPage.dailyInThe.select(testData.PaymentReport.daily);
    await _AccountReportsListPage.createAccountReportsPage.usage.select(testData.PaymentReport.usage);
    await _AccountReportsListPage.createAccountReportsPage.sendTo.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.sendToItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.password.click();
    await _AccountReportsListPage.createAccountReportsPage.password.input(testData.PaymentReport.password);
    await _AccountReportsListPage.createAccountReportsPage.confirmPassword.click();
    await _AccountReportsListPage.createAccountReportsPage.confirmPassword.input(testData.PaymentReport.confirmPassword );
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
        await ensure(_AccountReportsListPage.acctReportListPage).isUXRejectDialogSuccess() //has success message.
    ]);
    await _AccountReportsListPage.acctReportListPage.dismiss.click();
    await _AccountReportsListPage.acctReportListPage.loadCondition();
}

async function loadCondition4Report(accountElement: TextInput) {
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.sleep(8000);//wait data loading
    await browser.wait(
        ExpectedConditions.stalenessOf( _AccountReportsListPage.paymentReportsPage.firstViewButton.element),
        _AccountReportsListPage.paymentReportsPage.firstViewButton.getTimeOut()
    );
    await browser.wait(ExpectedConditions.elementToBeClickable(accountElement.element),accountElement.getTimeOut()
    );
}

async function processGenerateReport(
    reportName: string,
    optionBtn: Button,
    generateBtn: Button,
    accountElement: TextInput
) {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
    await optionBtn.jsClick();
    await generateBtn.jsClick();

    await loadCondition4Report(accountElement);
    await Promise.all([
        await ensure(accountElement).isNotEmpty(),
    ]);
}