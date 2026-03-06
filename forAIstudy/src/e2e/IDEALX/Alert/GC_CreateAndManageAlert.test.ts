import { AlertsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import * as moment from 'moment';
let currentDate = moment(new Date()).format('DD MMM YYYY');

let _alertPagesListPage = new AlertsPages();
let testData = _alertPagesListPage.fetchTestData("GC_testData.json");
let _createAlertPage = _alertPagesListPage.createManageAlertPage;
//Add for GCCI-3853
describe("eStatement Alert", async function () {
    // this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Alerts.SIT.loginCompanyId : testData.Alerts.UAT.loginCompanyId, SIT ? testData.Alerts.SIT.loginUserId : testData.Alerts.UAT.loginUserId, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create eStatement alert", async function () {
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.createEStateAlertBtn.jsClick();
        await _createAlertPage.EStateAlrt.jsClick();
        await _createAlertPage.alertAccountMultiSelection.jsClick();
        await _createAlertPage.selectAllInput.jsClick();
        await _createAlertPage.sendEmailButton.jsClickIfExist();
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.alertPassword.input("123123");
        await _createAlertPage.alertConfirmPassword.input("123123");
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        await _createAlertPage.showEStateAlert.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.EStateAlrtDetails).textContains(testData.Alerts.AlertDetails),
            await ensure(_createAlertPage.EStateAlrtEmail).textContains(testData.Alerts.email)
        ]);
        //delete alert
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.showEStateAlert.jsClick();
        await _createAlertPage.deleteEStateAlt.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
});