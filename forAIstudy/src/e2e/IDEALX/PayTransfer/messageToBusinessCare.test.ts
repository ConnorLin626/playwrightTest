/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from "../../../pages/IDEALX";
import { DashboardPages } from '../../../pages/IDEALX/Dashboard';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _DashboardPages = new DashboardPages();
let testData = _DashboardPages.fetchTestData("SG_testData_03.json");

describe("message to businessCare", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.messageToBusinessCare.SIT.loginCompanyId : testData.messageToBusinessCare.UAT.loginCompanyId, SIT ? testData.messageToBusinessCare.SIT.loginUserId : testData.messageToBusinessCare.UAT.loginUserId, "123123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create the new message', async function () {
        await _DashboardPages.messageToBusinessCarePage.notificationIcon.click();
        await _DashboardPages.messageToBusinessCarePage.createMessageBtn.click();
        await _DashboardPages.messageToBusinessCarePage.loadCondition();
        await _DashboardPages.messageToBusinessCarePage.messageSubject.select(testData.messageToBusinessCare.messageSubject);
        await _DashboardPages.messageToBusinessCarePage.msgDetail.input(testData.messageToBusinessCare.msgDetail);
        await _DashboardPages.messageToBusinessCarePage.submit.click();
        await Promise.all([
            await ensure(_DashboardPages.messageToBusinessCarePage.msgInfo1Title).textContains(testData.messageToBusinessCare.messageSubject),
            await ensure(_DashboardPages.messageToBusinessCarePage.msgInfo1Msg).textContains(testData.messageToBusinessCare.msgDetail)
        ]);
    });

    it('Delete the new message', async function () {
        await _DashboardPages.messageToBusinessCarePage.notificationIcon.click();
        await _DashboardPages.messageToBusinessCarePage.msgInfo1.click();
        await _DashboardPages.messageToBusinessCarePage.loadConditionForViewPage();
        await _DashboardPages.messageToBusinessCarePage.deleteBtn.click();
        await _DashboardPages.messageToBusinessCarePage.dialogDeleteBtn.click();
        await Promise.all([
            await ensure(_DashboardPages.messageToBusinessCarePage.snackbarMsg).textContains("Your message has been deleted.")
        ]);
    });
});
