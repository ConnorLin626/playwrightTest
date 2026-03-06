/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { TradeFinancePages} from '../../../pages/Trade';
import { ensure, SIT, handlerCase,PROJECT_TYPE } from "../../../lib";
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();

const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Finance - Sampling Request', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.samplingRequest.SIT.loginCompanyId : testData.samplingRequest.UAT.loginCompanyId,
            SIT ? testData.samplingRequest.SIT.loginUserId : testData.samplingRequest.UAT.loginUserId,"123123",)
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Filter Sampling Request', async function () {
        await _TradeFinancePages.SamplingRequestPage.tradeFinanceMenu.click();
        await _TradeFinancePages.SamplingRequestPage.samplingRequestTab.click();
        await _TradeFinancePages.SamplingRequestPage.loadCondition();
        await _TradeFinancePages.SamplingRequestPage.filterInput.input(testData.samplingRequest.samplingRequestRef);
        await _TradeFinancePages.SamplingRequestPage.requestRef.jsClick();
        await _TradeFinancePages.SamplingRequestPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(await _TradeFinancePages.SamplingRequestPage.viewStatus).textContains(testData.samplingRequest.Completed),
            await ensure(await _TradeFinancePages.SamplingRequestPage.viewDownload).isNotDisabled(),
        ]);
        await _TradeFinancePages.SamplingRequestPage.backButton.click();
    });

    it('Sampling Request list - click paperclip', async function () {
        await _TradeFinancePages.SamplingRequestPage.tradeFinanceMenu.click();
        await _TradeFinancePages.SamplingRequestPage.samplingRequestTab.click();
        await _TradeFinancePages.SamplingRequestPage.loadCondition();
        await _TradeFinancePages.SamplingRequestPage.filterInput.input(testData.samplingRequest.samplingRequestRef);
        await ensure(await _TradeFinancePages.SamplingRequestPage.docAttachment).isNotDisabled();
        await _TradeFinancePages.SamplingRequestPage.docAttachment.click();
        await Promise.all([
            await ensure(await _TradeFinancePages.SamplingRequestPage.downloadAll).isNotDisabled(),
        ]);
        await _TradeFinancePages.SamplingRequestPage.downloadAll.click();
    });

});    
    
