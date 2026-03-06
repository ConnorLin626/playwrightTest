import { AlertsPages } from "../../../pages/CB/Alert";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase } from "../../../lib";
import { Menu } from "../../../config/menu";

let _alertPagesListPage = new AlertsPages();
let testData = _alertPagesListPage.fetchTestData("SG_testData.json");

let _mockData = SIT ? testData.Alerts.SIT : testData.Alerts.UAT;
let _alertNotificationsPage = _alertPagesListPage.alertNotificationsPage;

describe("Alert notifications", async function () {
    before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("view notifications page", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.AlertNotifications);
        await _alertNotificationsPage.loadCondition();
        await Promise.all([
            await ensure(_alertNotificationsPage.createAndManageAlertButton).textContains('Create and Manage Alerts'),
        ]);
    });

    it("view create and manage alert page", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.AlertNotifications);
        await _alertNotificationsPage.loadCondition();
        await _alertNotificationsPage.createAndManageAlertButton.jsClick();
        await _alertNotificationsPage.loadConditionCreatePage();
        await Promise.all([
            await ensure(_alertNotificationsPage.alertEditDelivery).textContains('Edit saved contacts'),
        ]);
    });


    it("empty inbox", async function () {
        await _alertPagesListPage.openMenu(Menu.Alert.AlertNotifications);
        await _alertNotificationsPage.loadCondition();
        await _alertNotificationsPage.emptyInbox.jsClick();
        //await _alertNotificationsPage.loadCondition();
        await Promise.all([
            await ensure(_alertNotificationsPage.noInformation).textContains('No information to display'),
        ]);
    });
});
