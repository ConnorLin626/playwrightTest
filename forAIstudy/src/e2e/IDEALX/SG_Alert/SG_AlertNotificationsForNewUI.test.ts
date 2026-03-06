import { AlertsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";

let _alertPagesListPage = new AlertsPages();
let testData = _alertPagesListPage.fetchTestData("SG_testData_04.json");
let _alertNotificationsPage = _alertPagesListPage.alertNotificationsPage;

describe("Alert notifications", async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AlertsNotificationForNewUI.SIT.loginCompanyId : testData.AlertsNotificationForNewUI.UAT.loginCompanyId, SIT ? testData.AlertsNotificationForNewUI.SIT.loginUserId : testData.AlertsNotificationForNewUI.UAT.loginUserId, testData.AlertsNotificationForNewUI.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
   it("view notificationsDetail page and delete", async function () {
        await _alertPagesListPage.createManageAlertPage.dashboard.click();
        await _alertNotificationsPage.notificationButton.jsClick();
        //navigate to notification detail page
        await _alertNotificationsPage.MessageInfo.click();
        await _alertNotificationsPage.RemoveBtn.click();
        //confirm dialog
        await _alertNotificationsPage.ConfirmDialogBtn.click();
        //Check if pop SuccessSnackbar
        await Promise.all([
            await ensure(_alertNotificationsPage.SuccessSnackbar).isElementPresent(),
        ]); 
    }); 

    it("notification Make all as read", async function () {
        await _alertPagesListPage.createManageAlertPage.dashboard.click();
        await _alertNotificationsPage.notificationButton.click();
        await _alertNotificationsPage.MoreBtn.click();
        await _alertNotificationsPage.MakeallReadBtn.click();
        //confirm dialog
        await _alertNotificationsPage.ConfirmDialogBtn.click();
        await _alertNotificationsPage.NoReadBtn.click();
        //change to NoRead tab check if nofitication all read
         await Promise.all([
            await ensure(_alertNotificationsPage.Noinformation).isElementPresent(),
        ]);
    });

    it("notification Delete All", async function () {
        await _alertPagesListPage.createManageAlertPage.dashboard.click();
        await _alertNotificationsPage.notificationButton.jsClick();
        await _alertNotificationsPage.MoreBtn.click();
        await _alertNotificationsPage.DeleteAllBtn.click();
        //confirm dialog
        await _alertNotificationsPage.ConfirmDialogBtn.click();
        //Check if all delete
        await Promise.all([
            await ensure(_alertNotificationsPage.Noinformation).isElementPresent(),
        ]);
    });  
});