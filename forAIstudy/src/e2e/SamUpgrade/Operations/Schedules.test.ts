/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SamUpgrade';
import { ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
let day = new Date().getDay();

let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');

describe('Operation-Schedule', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Create process Schedule', async function () {

        //create IN Refund schedule
        await _OperationsPages.schedulesPage.createCutOffTime(testDataSAM.selectAffiliateByValue.DBSSG, "589", day, testDataSAM.schedule.CutoffTime01);
        await _OperationsPages.schedulesPage.INRrfundScheduleStatus.textContains("Pending Add Approval");
    });

    it('Approve the new Process Schedule', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _OperationsPages.schedulesPage.approveCutOffTime(testDataSAM.selectAffiliateByValue.DBSSG, _OperationsPages.schedulesPage.INRefundAppscheduleLink);
        await Promise.all([
              await _OperationsPages.schedulesPage.INRrfundScheduleStatus.textContains("Approved"),
        ]);
    });

    it('Delete the Process Schedule', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
        await _OperationsPages.schedulesPage.loadCondition();
        await _OperationsPages.schedulesPage.topOperationsLink.click();
        await _OperationsPages.schedulesPage.scheduleLink.click();
        await _OperationsPages.schedulesPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.schedulesPage.submitAffiliate.click();
        await _OperationsPages.schedulesPage.INRrfundScheduleLink.jsClick();
        await _OperationsPages.schedulesPage.deleteSchedule.click();
        await _OperationsPages.schedulesPage.submitDeleteSchedule.click();
        await ensure(_OperationsPages.schedulesPage).isSAMSuccess();
        await Promise.all([
              await _OperationsPages.schedulesPage.INRrfundScheduleStatus.textContains("Pending Delete Approval"),
        ]);
    });

    it('Approve the delete Process Schedule', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _OperationsPages.schedulesPage.approveCutOffTime(testDataSAM.selectAffiliateByValue.DBSSG, _OperationsPages.schedulesPage.INRefundDelscheduleLink);
        await ensure(_OperationsPages.schedulesPage).isSAMSuccess();
    });

    it('Edit process Schedule-Cut Off Time', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _OperationsPages.schedulesPage.loadCondition();
        await _OperationsPages.schedulesPage.topOperationsLink.click();
        await _OperationsPages.schedulesPage.scheduleLink.click();
        await _OperationsPages.schedulesPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.schedulesPage.submitAffiliate.click();
        await _OperationsPages.schedulesPage.actScheduleLink.click();
        if (await _OperationsPages.schedulesPage.cutOffTimeValue.valueContains(testDataSAM.schedule.CutoffTime)) {
            await _OperationsPages.schedulesPage.cutOffTimeValue.clean();
            await _OperationsPages.schedulesPage.cutOffTimeValue.input(testDataSAM.schedule.CutoffTime01);
            await _OperationsPages.schedulesPage.previewScheduleButton.jsClick();
            await ensure(_OperationsPages.schedulesPage.cutOffTimePreviewValue).textContains(testDataSAM.schedule.PreviewCutoffTime01);
        } else {
            await _OperationsPages.schedulesPage.cutOffTimeValue.clean();
            await _OperationsPages.schedulesPage.cutOffTimeValue.input(testDataSAM.schedule.CutoffTime);
            await _OperationsPages.schedulesPage.previewScheduleButton.jsClick();
            await ensure(_OperationsPages.schedulesPage.cutOffTimePreviewValue).textContains(testDataSAM.schedule.PreviewCutoffTime);
        }
        await _OperationsPages.schedulesPage.submitScheduleButton.jsClick();
        await ensure(_OperationsPages.schedulesPage).isSAMSuccess();
    });
});
