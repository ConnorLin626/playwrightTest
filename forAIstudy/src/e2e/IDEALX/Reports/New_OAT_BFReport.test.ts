/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages } from "../../../pages/IDEALX";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, Button, PROJECT_TYPE } from "../../../lib";
import moment = require("moment");

let _AccountReportsListPage = new ReportsPages();
let _OATReportsListPage = new ReportsPages();
let testData = _OATReportsListPage.fetchTestData("SG_testData_03.json");
let BFReportName = "";
let RemarkValue = "";

describe("UX OAT_BF Reports", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CreateOATReport.SIT.loginCompanyId : testData.CreateOATReport.UAT.loginCompanyId, SIT ? testData.CreateOATReport.SIT.loginUserId : testData.CreateOATReport.UAT.loginUserId, testData.CreateOATReport.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    if(SIT){
    it("Anchor Seller - Disbursement Report create", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _OATReportsListPage.oatReportsListPage.BFMenu.jsClick();
        await _OATReportsListPage.oatReportsListPage.loadConditionCommon();
        await process4InitCommonValue("ASDR", _OATReportsListPage.oatReportsListPage.ASDRCreateButton).then(text => {
            BFReportName = text;
        });
        await _OATReportsListPage.createOATBFReportsPage.fileName.input("ASDR" + moment());
        await _OATReportsListPage.createOATBFReportsPage.scrollTo(0, 1600);
        await _AccountReportsListPage.createAccountReportsPage.deliverySchedule.select("Daily in the");
        await _OATReportsListPage.createOATBFReportsPage.dailyInThe.select(testData.CreateOATReport.daily);
        await _OATReportsListPage.createOATBFReportsPage.sendTo.jsClick();
        await _OATReportsListPage.createOATBFReportsPage.sendToSearch.input(SIT ? testData.CreateOATReport.SIT.sendTo : testData.CreateOATReport.UAT.sendTo)
        await _OATReportsListPage.createOATBFReportsPage.sendToItem.jsClick();
        await _OATReportsListPage.createOATBFReportsPage.password.input(testData.CreateOATReport.password);
        await _OATReportsListPage.createOATBFReportsPage.confirmPassword.input(testData.CreateOATReport.confirmPassword);
        await _OATReportsListPage.createOATBFReportsPage.remarks.input(testData.CreateOATReport.remarks);
        await _OATReportsListPage.createOATBFReportsPage.btnSavePublish.jsClick();
        await _OATReportsListPage.createOATBFReportsPage.loadDialog();
        await _OATReportsListPage.createOATBFReportsPage.publish.jsClick();
        await _OATReportsListPage.oatReportsListPage.loadCondition();
        await _OATReportsListPage.oatReportsListPage.filterInput.input(BFReportName);
        await _OATReportsListPage.oatReportsListPage.BFASDRViewDetailsButton.jsClick();
        await Promise.all([
            await ensure(_OATReportsListPage.oatReportsListPage.bfasdrViewReportName).textContains(BFReportName),
            await ensure(_OATReportsListPage.oatReportsListPage.bfasdrViewAcct).textContains(SIT ? testData.CreateOATReport.SIT.account : testData.CreateOATReport.UAT.account),
            await ensure(_OATReportsListPage.oatReportsListPage.bfasdrSendToValue).textContains(SIT ? testData.CreateOATReport.SIT.sendTo : testData.CreateOATReport.UAT.sendTo)
        ]);
    });

    it("Anchor Seller - Limit Utilization Report edit", async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _OATReportsListPage.oatReportsListPage.BFMenu.jsClick();
        await _OATReportsListPage.oatReportsListPage.loadConditionCommon();
        await _OATReportsListPage.oatReportsListPage.filterInput.input("ForAutoTest");
        await _OATReportsListPage.oatReportsListPage.bfaslurActionButton.jsClick();
        await _OATReportsListPage.oatReportsListPage.bfaslurEditButton.jsClick();
        await _OATReportsListPage.createOATBFReportsPage.loadCondition();
        await _OATReportsListPage.createOATBFReportsPage.supplier.jsClick();
        await _OATReportsListPage.createOATBFReportsPage.supplierItem.jsClick();
        await _OATReportsListPage.createOATBFReportsPage.password.input(testData.CreateOATReport.password);
        await _OATReportsListPage.createOATBFReportsPage.confirmPassword.input(testData.CreateOATReport.confirmPassword);
        await _OATReportsListPage.createOATBFReportsPage.remarks.input("BFASDR_Remark" + moment());
        RemarkValue = await _OATReportsListPage.createOATBFReportsPage.remarks.getText();
        await _OATReportsListPage.createOATBFReportsPage.btnSavePublish.jsClick();
        await _OATReportsListPage.createOATBFReportsPage.loadDialog();
        await _OATReportsListPage.createOATBFReportsPage.publish.jsClick();
        await _OATReportsListPage.oatReportsListPage.loadCondition();
        await _OATReportsListPage.oatReportsListPage.filterInput.input("ForAutoTest");
        await _OATReportsListPage.oatReportsListPage.BFASLURViewDetailsButton.jsClick();
        await Promise.all([
            await ensure(_OATReportsListPage.oatReportsListPage.bfaslurRemarkName).textContains(RemarkValue),
        ]);
    });
    }
});

async function process4InitCommonValue(
    prefixReportName: string,
    createBtn: Button
) {
    let text: string = "";
    await createBtn.jsClick();
    await _OATReportsListPage.createOATBFReportsPage.loadCondition();
    await _OATReportsListPage.createOATBFReportsPage.reportName.input(prefixReportName + moment());
    text = await _OATReportsListPage.createOATBFReportsPage.reportName.getText();
    await _OATReportsListPage.createOATBFReportsPage.supplier.jsClick();
    await _OATReportsListPage.createOATBFReportsPage.supplierItem.jsClick();
    return text;
}
