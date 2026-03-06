/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Report', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.TradeReport.SIT.loginCompanyId : testData.TradeReport.UAT.loginCompanyId,
            SIT ? testData.TradeReport.SIT.loginUserId : testData.TradeReport.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Able to View Trade Report ', async function () {

        await _TradeFinancePages.openMenu(Menu.Reports.TradeReports);
        await _TradeFinancePages.tradeReportPage.loadCondition();
        // Trade report page
        await _TradeFinancePages.tradeReportPage.filterBtnTop.click();
        await _TradeFinancePages.tradeReportPage.reportType.selectByValue(testData.TradeReport.reportType);
        // await _TradeFinancePages.tradeReportPage.reportTitle.input(testData.TradeReport.reportTitle);
        await _TradeFinancePages.tradeReportPage.goBtn.click();
        await _TradeFinancePages.tradeReportPage.loadCondition();
        await _TradeFinancePages.tradeReportPage.reportSelect.click();
        await _TradeFinancePages.tradeReportPage.filterBtnBottom.jsClick();
        await _TradeFinancePages.tradeReportPage.loadConditionForFilterReport(testData.TradeReport.reportTitle);
        if (SIT) {
            await _TradeFinancePages.tradeReportPage.organisationSelect.select("DBS Singapore - Test 02 CANDY SUGAR CORPORATION");
        }
        await _TradeFinancePages.tradeReportPage.okBtn.click();
        // await _TradeFinancePages.tradeReportPage.viewBtn.jsClick();
        await _TradeFinancePages.tradeReportPage.loadConditionForViewReport(testData.TradeReport.reportTitle);

        // //check View Report page
        await Promise.all([
            await ensure(_TradeFinancePages.tradeReportPage.reportName).textContains(testData.TradeReport.reportTitle),
            await ensure(_TradeFinancePages.tradeReportPage.companyName).textContains(SIT ? testData.TradeReport.SIT.companyName : testData.TradeReport.UAT.companyName),
        ]);
    });
});