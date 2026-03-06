/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, Button, PROJECT_TYPE } from "../../../lib";
import moment = require("moment");


let _OATReportsListPage = new ReportsPages();
let _AccountReportsListPage = new ReportsPages();
let testData = _OATReportsListPage.fetchTestData("SG_testData_03.json");
let SFReportName = "";

describe("UX OAT_SF Reports", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateOATReport.SIT.loginCompanyId : testData.CreateOATReport.UAT.loginCompanyId, SIT ? testData.CreateOATReport.SIT.loginUserId : testData.CreateOATReport.UAT.loginUserId, testData.CreateOATReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    if(SIT){
    it("Anchor Buyer - Disbursement Report single delete", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.oatReportsListPage.SFMenu.click();
        await _OATReportsListPage.oatReportsListPage.loadConditionCommon();
        await process4InitCommonValue("ABDR", _OATReportsListPage.oatReportsListPage.ABDRCreateButton).then(text => {
            SFReportName = text;
        });
        await _OATReportsListPage.createOATSFReportsPage.fileName.input("ABDR" + moment());
        await _OATReportsListPage.createOATBFReportsPage.scrollTo(0, 1600);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
        await _OATReportsListPage.createOATSFReportsPage.dailyInThe.select(testData.CreateOATReport.daily);
        await _OATReportsListPage.createOATSFReportsPage.sendTo.jsClick();
        await _OATReportsListPage.createOATSFReportsPage.sendToSearch.input(SIT ? testData.CreateOATReport.SIT.sendTo : testData.CreateOATReport.UAT.sendTo)
        await _OATReportsListPage.createOATSFReportsPage.sendToItem.jsClick();
        await _OATReportsListPage.createOATSFReportsPage.password.input(testData.CreateOATReport.password);
        await _OATReportsListPage.createOATSFReportsPage.confirmPassword.input(testData.CreateOATReport.confirmPassword);
        await _OATReportsListPage.createOATSFReportsPage.remarks.input(testData.CreateOATReport.remarks);
        await _OATReportsListPage.createOATSFReportsPage.btnSavePublish.jsClick();
        await _OATReportsListPage.createOATSFReportsPage.loadDialog();
        await _OATReportsListPage.createOATSFReportsPage.publish.jsClick();
        await _OATReportsListPage.oatReportsListPage.loadCondition1();
        await _OATReportsListPage.oatReportsListPage.filterInput.input(SFReportName);
        await _OATReportsListPage.oatReportsListPage.SFABDRViewDetailsButton.jsClick();
        await Promise.all([
            await ensure(_OATReportsListPage.oatReportsListPage.sfabdrViewReportName).textContains(SFReportName),
            await ensure(_OATReportsListPage.oatReportsListPage.sfabdrViewAcct).textContains(SIT ? testData.CreateOATReport.SIT.account : testData.CreateOATReport.UAT.account),
            await ensure(_OATReportsListPage.oatReportsListPage.sfabdrSendToValue).textContains(SIT ? testData.CreateOATReport.SIT.sendTo : testData.CreateOATReport.UAT.sendTo)]);
        await deleteReport(
            SFReportName,
            _OATReportsListPage.oatReportsListPage.sfabdrActionButton,
            _OATReportsListPage.oatReportsListPage.sfabdrDeleteButton
        );
        await _OATReportsListPage.oatReportsListPage.filterInput.input(SFReportName);
        await Promise.all([
            await ensure(
                _OATReportsListPage.oatReportsListPage.OATShowDetailButton
            ).isNotElementPresent()
        ]);
    });
    }
});

async function deleteReport(
    reportName: string,
    optionBtn: Button,
    deleteBtn: Button
): Promise<void> {
    await _OATReportsListPage.oatReportsListPage.filterInput.input(
        reportName
    );
    await optionBtn.jsClick();
    await deleteBtn.jsClick();
    await _OATReportsListPage.oatReportsListPage.loadDeleteDialog();
    await _OATReportsListPage.oatReportsListPage.dialogDeleteBtn.jsClick();
    await Promise.all([
        await ensure(
            _OATReportsListPage.oatReportsListPage
        ).isUXRejectDialogSuccess() //has success message.
    ]);
    await _OATReportsListPage.oatReportsListPage.dismiss.click();
}

async function process4InitCommonValue(
    prefixReportName: string,
    createBtn: Button
) {
    let text: string = "";
    await createBtn.jsClick();
    await _OATReportsListPage.createOATSFReportsPage.loadCondition();
    await _OATReportsListPage.createOATSFReportsPage.reportName.input(
        prefixReportName + moment()
    );
    text = await _OATReportsListPage.createOATSFReportsPage.reportName.getText();
    await _OATReportsListPage.createOATSFReportsPage.supplier.jsClick();
    await _OATReportsListPage.createOATSFReportsPage.supplierItem.jsClick();
    return text;
}
