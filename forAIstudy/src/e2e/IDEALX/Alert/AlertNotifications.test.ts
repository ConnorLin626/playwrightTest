import { AlertsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";

let _alertPagesListPage = new AlertsPages();
let testData = _alertPagesListPage.fetchTestData("SG_testData_03.json");

let _mockData = SIT ? testData.Alerts.SIT : testData.Alerts.UAT;
let _alertNotificationsPage = _alertPagesListPage.alertNotificationsPage;

describe("Alert notifications", async function () {
    before(async function () { await new NavigatePages().loginIdealx(_mockData.loginCompanyId, _mockData.loginUserIdIx, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("view notifications page", async function () {
        await _alertPagesListPage.createManageAlertPage.dashboard.click();
        // await _alertPagesListPage.createManageAlertPage.alertMenu.click();
        // await _alertPagesListPage.createManageAlertPage.loadCondition();
        await _alertNotificationsPage.notificationButton.jsClick();
        await _alertNotificationsPage.bankingBtn.jsClick();
        await _alertNotificationsPage.loadCondition();
        await Promise.all([
            await ensure(_alertNotificationsPage.createAndManageAlertButton).textContains('Create and Manage Alerts'),
        ]);
    });

    it("view create and manage alert page", async function () {
        await _alertPagesListPage.createManageAlertPage.dashboard.click();
        // await _alertPagesListPage.createManageAlertPage.userMenu.click();
        // await _alertPagesListPage.createManageAlertPage.alertMenu.click();
        // await _alertPagesListPage.createManageAlertPage.loadCondition();
        await _alertNotificationsPage.notificationButton.jsClick();
        await _alertNotificationsPage.bankingBtn.jsClick();
        await _alertNotificationsPage.loadCondition();
        await _alertNotificationsPage.createAndManageAlertButton.jsClick();
        await _alertNotificationsPage.loadConditionCreatePage();
        await Promise.all([
            await ensure(_alertNotificationsPage.alertEditDelivery).textContains('Edit saved contacts'),
        ]);
    });


    it("empty inbox", async function () {
        await _alertPagesListPage.createManageAlertPage.dashboard.click();
        // await _alertPagesListPage.createManageAlertPage.userMenu.click();
        // await _alertPagesListPage.createManageAlertPage.alertMenu.click();
        // await _alertPagesListPage.createManageAlertPage.loadCondition();
        await _alertNotificationsPage.notificationButton.jsClick();
        await _alertNotificationsPage.bankingBtn.jsClick();
        await _alertNotificationsPage.loadCondition();
        await _alertNotificationsPage.emptyInbox.jsClick();
        await _alertNotificationsPage.loadCondition();
        await Promise.all([
            await ensure(_alertNotificationsPage.noInformation).textContains('No information to display'),
        ]);
    });
});
