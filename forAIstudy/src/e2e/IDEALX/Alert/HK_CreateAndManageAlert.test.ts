import { AlertsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import * as moment from 'moment';
let currentDate = moment(new Date()).format('DD MMM YYYY');

let _alertPagesListPage = new AlertsPages();
let testData = _alertPagesListPage.fetchTestData("HK_testData_01.json");
let _createAlertPage = _alertPagesListPage.createManageAlertPage;

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
        await _createAlertPage.FDAlert.jsClick();
        await _createAlertPage.sendEmailButton.jsClickIfExist();
        await _createAlertPage.sendEmailMultiSelection.jsClick();
        await _createAlertPage.sendEmailOption1.jsClick();
        await _createAlertPage.FDAccountSelect.jsClick();
        await _createAlertPage.FDAccount0.jsClick();
        await _createAlertPage.FDAccount1.jsClick();
        await _createAlertPage.FDAlertAttach.jsClick();
        await _createAlertPage.alertPassword.input("123123");
        await _createAlertPage.alertConfirmPassword.input("123123");
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        await _createAlertPage.showEStateAlert.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.EStateAlrtAcct0).textContains(testData.Alerts.account0),
            await ensure(_createAlertPage.EStateAlrtAcct1).textContains(testData.Alerts.account1),
            await ensure(_createAlertPage.EStateAlrtDetails).textContains(testData.Alerts.FDAlertDetails),
            await ensure(_createAlertPage.EStateAlrtEmail).textContains(testData.Alerts.email)
        ]);
    });

    it("Edit eStatement alert", async function () {
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.showEStateAlert.jsClick();
        await _createAlertPage.EditEStateAlrtBtn.click();
        await _createAlertPage.editAlertPassword.input("123123");
        await _createAlertPage.editAlertConfirmPassword.input("123123");
        await _createAlertPage.FDAccountSelect.jsClick();
        await _createAlertPage.FDAccount0.jsClick();
        await _createAlertPage.FDAccount1.jsClick();
        await _createAlertPage.FDAccount2.jsClick();
        await _createAlertPage.FDAccount3.jsClick();
        await _createAlertPage.submitButton.jsClick();
        await _createAlertPage.loadDialog();
        await _createAlertPage.dismissButton.jsClick();
        await _createAlertPage.loadCondition();
        await _createAlertPage.showEStateAlert.jsClick();
        await Promise.all([
            await ensure(_createAlertPage.EStateAlrtAcct0).textContains(testData.Alerts.editAccount0),
            await ensure(_createAlertPage.EStateAlrtAcct1).textContains(testData.Alerts.editAccount1),
            await ensure(_createAlertPage.EStateAlrtDetails).textContains(testData.Alerts.FDAlertDetails),
            await ensure(_createAlertPage.EStateAlrtEmail).textContains(testData.Alerts.email)
        ]);
    });

    it("Delete eStatement alert", async function () {
        await _createAlertPage.profileMenu.click();
        await _createAlertPage.alertMenu.click();
        await _createAlertPage.loadCondition();
        await _createAlertPage.showEStateAlert.jsClick();
        await _createAlertPage.deleteEStateAlt.click();
        await _createAlertPage.deleteDialogButton.jsClick();
        await _createAlertPage.dismissButton.click();
    });
});