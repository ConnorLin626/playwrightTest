import { AlertsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import * as moment from 'moment';
let currentDate = moment(new Date()).format('DD MMM YYYY');
let today = moment(); // 当前日期
let lastDayOfMonth = moment().endOf('month'); // 当前月份的最后一天
let _alertPagesListPage = new AlertsPages();
let testData = _alertPagesListPage.fetchTestData("IN_testData.json");

let _mockData = SIT ? testData.Alerts.SIT : testData.Alerts.UAT;
let _createAlertPage = _alertPagesListPage.createManageAlertPage;

describe("Credit Debit Confirmation Alert", async function () {
    // this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Alerts.SIT.loginCompanyId : testData.Alerts.UAT.loginCompanyId, SIT ? testData.Alerts.SIT.loginUserId : testData.Alerts.UAT.loginUserId, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("create alert", async function () {
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.cdtDetCfmnAltBtn.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.selectAllInput.jsClick();
        await _createAlertPage.creditTxnBtn.click();
        // await _createAlertPage.startDate.click();
        // await _createAlertPage.date.jsClick();
        if (today.isSame(lastDayOfMonth, 'day')) {
            currentDate = moment(new Date()).add(1,'days').format('DD MMM YYYY');
        }
        await _createAlertPage.startDate.select(currentDate);
        await _createAlertPage.sendEmailButton.jsClickIfExist();
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.search.input(_mockData.email);
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        await _createAlertPage.alertsFilter.input(_mockData.CdtDetCfmnAltType);
        await _createAlertPage.showCDcfmnAltBtn.jsClick();

        await Promise.all([
            await ensure(_createAlertPage.cdtDetCfmnAltAcct1).textContains(_mockData.account),
            await ensure(_createAlertPage.cdtDetCfmnAltEmail1).textContains(_mockData.email),
        ]);
        await _createAlertPage.deleteCdtDetCfmnAlt.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });

    //Add for R8.21 IDXP-2263
    it("create e-Tax Payment status alert check file format not copntain GST and CBDT", async function () {
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.createEtaxAlertBtn.jsClick();
        await _createAlertPage.loadConditionCreatePage();
        await _createAlertPage.fileType.click();
        await Promise.all([
            await ensure(_createAlertPage.fileType).textNotContains(_mockData.TaxTypeGST),
            await ensure(_createAlertPage.fileType).textNotContains(_mockData.TaxTypeCBDT),
        ]);

    });
});