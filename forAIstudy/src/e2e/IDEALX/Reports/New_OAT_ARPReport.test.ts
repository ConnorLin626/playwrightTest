/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, Button, PROJECT_TYPE } from "../../../lib";
import moment = require("moment");

let _OATReportsListPage = new ReportsPages();
let _AccountReportsListPage = new ReportsPages();
let testData = _OATReportsListPage.fetchTestData("SG_testData_03.json");
let ARPDRDReportName = "";

describe("UX OAT_ARP Reports", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateOATReport.SIT.loginCompanyId : testData.CreateOATReport.UAT.loginCompanyId, SIT ? testData.CreateOATReport.SIT.loginUserId : testData.CreateOATReport.UAT.loginUserId, testData.CreateOATReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    if(SIT){
    it("Disbursement Report_Deal Report multi delete", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _OATReportsListPage.oatReportsListPage.ARPMenu.jsClick();
        await _OATReportsListPage.oatReportsListPage.loadConditionCommon();
        await process4InitCommonValue("ARPDRD", _OATReportsListPage.oatReportsListPage.DRDCreateButton).then(text => {
            ARPDRDReportName = text;
        });
        await _OATReportsListPage.createOATARPReportsPage.fileName.input("ARPDRD" + moment());
        // await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
        // // await _OATReportsListPage.createOATARPReportsPage.dailyInThe.select(testData.CreateOATReport.daily);
        // await _OATReportsListPage.createOATARPReportsPage.dailyInTheInput.input(testData.CreateOATReport.daily);
        // await _OATReportsListPage.createOATARPReportsPage.autocompletePupUp.jsClick();
        await _OATReportsListPage.createOATARPReportsPage.sendTo.jsClick();
        await _OATReportsListPage.createOATARPReportsPage.sendToItem.jsClick();
        await _OATReportsListPage.createOATARPReportsPage.password.input(testData.CreateOATReport.password);
        await _OATReportsListPage.createOATARPReportsPage.confirmPassword.input(testData.CreateOATReport.confirmPassword);
        await _OATReportsListPage.createOATARPReportsPage.remarks.input(testData.CreateOATReport.remarks);
        await _OATReportsListPage.createOATARPReportsPage.btnSavePublish.jsClick();
        await _OATReportsListPage.createOATARPReportsPage.loadDialog();
        await _OATReportsListPage.createOATARPReportsPage.publish.jsClick();
        await _OATReportsListPage.oatReportsListPage.loadCondition();
        await multiDeleteReport(
            _OATReportsListPage.oatReportsListPage.arpdrdViewDetailsButton,
            _OATReportsListPage.oatReportsListPage.arpdrdSelectAllButton,
            _OATReportsListPage.oatReportsListPage.arpdrdMultiDeleteButton
        );
        await _OATReportsListPage.oatReportsListPage.filterInput.input(ARPDRDReportName);
        await Promise.all([
            await ensure(
                _OATReportsListPage.oatReportsListPage.OATShowDetailButton
            ).isNotElementPresent()
        ]);
    });
    }
});

async function multiDeleteReport(
    viewDetailsBtn: Button,
    selectAllBtn: Button,
    multiDeleteBtn: Button,
): Promise<void> {
    await viewDetailsBtn.jsClick();
    await selectAllBtn.jsClick();
    await multiDeleteBtn.jsClick();
    await _OATReportsListPage.oatReportsListPage.loadDeleteDialog();
    await _OATReportsListPage.oatReportsListPage.dialogDeleteBtn.jsClick();
    await _OATReportsListPage.oatReportsListPage.dismiss.click();
}

async function process4InitCommonValue(
    prefixReportName: string,
    createBtn: Button
) {
    let text: string = "";
    await createBtn.jsClick();
    await _OATReportsListPage.createOATARPReportsPage.loadCondition();
    await _OATReportsListPage.createOATARPReportsPage.reportName.input(
        prefixReportName + moment()
    );
    text = await _OATReportsListPage.createOATARPReportsPage.reportName.getText();
    // await _OATReportsListPage.createOATARPReportsPage.account.jsClick();
    // await _OATReportsListPage.createOATARPReportsPage.accountItem.jsClick();
    await _OATReportsListPage.createOATARPReportsPage.accountSelect.jsClick();
    await _OATReportsListPage.createOATARPReportsPage.search.input(testData.CreateOATReport.account1);
    await _OATReportsListPage.createOATARPReportsPage.account0Select.jsClick();
    await _OATReportsListPage.createOATARPReportsPage.search.input(testData.CreateOATReport.account2);
    await _OATReportsListPage.createOATARPReportsPage.account0Select.jsClick();
    // await _OATReportsListPage.createOATARPReportsPage.account.select(
    //     SIT
    //         ? testData.CreateOATReport.SIT.account
    //         : testData.CreateOATReport.UAT.account,
    // );
    await _OATReportsListPage.createOATARPReportsPage.supplier.jsClick();
    await _OATReportsListPage.createOATARPReportsPage.supplierItem.jsClick();
    return text;
}
