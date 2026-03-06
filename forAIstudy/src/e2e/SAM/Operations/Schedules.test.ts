/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SAM';
import { saveScreen, ensure, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');

describe('Operation-Schedule', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    before(async function () { await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Edit process Schedule-Cut Off Time', async function () {
        let _OperationsPages = new OperationsPages();
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
