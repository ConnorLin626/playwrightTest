/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { ReportsPages } from "../../../pages/CB/Reports";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, Button } from "../../../lib";
import { Menu } from "../../../config/menu";
import moment = require("moment");

let _OATReportsListPage = new ReportsPages();
let testData = _OATReportsListPage.fetchTestData("SG_testData.json");
let ARPDRDReportName = "";

describe("UX OAT_ARP Reports", async function() {
  before(async function() {
    await new NavigatePages().loginCB(
      SIT
        ? testData.CreateOATReport.SIT.loginCompanyId
        : testData.CreateOATReport.UAT.loginCompanyId,
      SIT
        ? testData.CreateOATReport.SIT.loginUserId
        : testData.CreateOATReport.UAT.loginUserId
    );
  });
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function() {
    handlerCase(suitObject, this);
  });

  it("Disbursement Report_Deal Report multi delete", async function() {
    await _OATReportsListPage.openMenu(Menu.Reports.ARPReports);
    await _OATReportsListPage.oatReportsListPage.loadConditionCommon();
    await process4InitCommonValue(
      "ARPDRD",
      _OATReportsListPage.oatReportsListPage.DRDCreateButton
    ).then(text => {
      ARPDRDReportName = text;
    });
    await _OATReportsListPage.createOATARPReportsPage.fileName.input("ARPDRD" + moment());
    await _OATReportsListPage.createOATARPReportsPage.dailyInThe.select(
      testData.CreateAccountReport.daily
    );
    await _OATReportsListPage.createOATARPReportsPage.sendTo.jsClick();
    await _OATReportsListPage.createOATARPReportsPage.sendToItem.jsClick();
    await _OATReportsListPage.createOATARPReportsPage.password.input(
      testData.CreateAccountReport.password
    );
    await _OATReportsListPage.createOATARPReportsPage.confirmPassword.input(
      testData.CreateAccountReport.confirmPassword
    );
    await _OATReportsListPage.createOATARPReportsPage.remarks.input(
      testData.CreateAccountReport.remarks
    );
    await _OATReportsListPage.createOATARPReportsPage.btnSavePublish.jsClick();
    await _OATReportsListPage.createOATARPReportsPage.loadDialog();
    await _OATReportsListPage.createOATARPReportsPage.publish.jsClick();
    await _OATReportsListPage.oatReportsListPage.loadCondition();
    await multiDeleteReport(
      _OATReportsListPage.oatReportsListPage.arpdrdViewDetailsButton,
      _OATReportsListPage.oatReportsListPage.arpdrdSelectAllButton,
      _OATReportsListPage.oatReportsListPage.arpdrdMultiDeleteButton
    );
    await _OATReportsListPage.oatReportsListPage.filterInput.input(
      ARPDRDReportName
    );
    await Promise.all([
      await ensure(
       _OATReportsListPage.oatReportsListPage.OATShowDetailButton
      ).isNotElementPresent()
    ]);
  });
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
  await _OATReportsListPage.createOATARPReportsPage.account.select(
    SIT
    ? testData.CreateOATReport.SIT.account
    : testData.CreateOATReport.UAT.account,
  );
  await _OATReportsListPage.createOATARPReportsPage.supplier.jsClick();
  await _OATReportsListPage.createOATARPReportsPage.supplierItem.jsClick();
  return text;
}
