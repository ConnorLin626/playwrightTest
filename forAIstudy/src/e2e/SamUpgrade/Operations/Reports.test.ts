/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE, pageSwitchWindow } from '../../../lib';
import { browser } from 'protractor';
import * as moment from 'moment';
let _OperationsPages = new OperationsPages();
let today = moment(); // 当前日期
let lastDayOfMonth = moment().endOf('month'); // 当前月份的最后一天
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');

describe('Operation-Reports', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginSAM(testDataSAM.loginNewSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('View Approval Policy Setup Report', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _OperationsPages.reportsPage.topOperationsLink.click();
        await _OperationsPages.reportsPage.reportsLink.click();
        await _OperationsPages.reportsPage.loadCondition();
        await _OperationsPages.reportsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.reportsPage.submitAffiliate.click();
        await _OperationsPages.reportsPage.viewApprovalPolicyReportLink.click();
        await _OperationsPages.reportsPage.selectSearchBy.select(testDataSAM.reports.searchByCorpID);
        await _OperationsPages.reportsPage.inputSearchFor.input(testDataSAM.corporationID.SGViewAprvlPlcy);
        await _OperationsPages.reportsPage.searchReportButton.click();
        await _OperationsPages.reportsPage.selectSearchResultCheckbox.select(testDataSAM.corporationID.SGViewAprvlPlcy);
        await _OperationsPages.reportsPage.viewReportButton.click();
        await pageSwitchWindow(testDataSAM.reports.reportWindow);
        await _OperationsPages.reportsPage.loadConditionOnReportPage();
        await ensure(_OperationsPages.reportsPage.reportTitle).textContains(testDataSAM.reports.approvalPolicyReportTitle);
        await ensure(_OperationsPages.reportsPage.reportCorpIDValue).textContains(testDataSAM.corporationID.SGViewAprvlPlcy);
        // await browser.close();
        // await pageSwitchWindow(testDataSAM.reports.viewIdealApprovalReportWindow);
    });

    it('View Inactive Customers ready for purging Report', async function () {
        await browser.close();
         await pageSwitchWindow(testDataSAM.reports.viewIdealApprovalReportWindow);
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _OperationsPages.reportsPage.topOperationsLink.click();
        await _OperationsPages.reportsPage.reportsLink.click();
        await _OperationsPages.reportsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.reportsPage.submitAffiliate.click();
        await _OperationsPages.reportsPage.viewInactiveCustomersPurgingReportLink.click();
        await pageSwitchWindow(testDataSAM.reports.reportWindow);
        await _OperationsPages.reportsPage.loadConditionOnReportPage();
        await ensure(_OperationsPages.reportsPage.reportTitle).textContains(testDataSAM.reports.customerPurgeReportTitle);
        await browser.close();
        await pageSwitchWindow(testDataSAM.reports.operationReportPageWindow);
    });

    it('View Pending Profile Report', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _OperationsPages.reportsPage.topOperationsLink.click();
        await _OperationsPages.reportsPage.reportsLink.click();
        await _OperationsPages.reportsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.reportsPage.submitAffiliate.click();
        await _OperationsPages.reportsPage.viewPendingProfileReportLink.click();
    });

    it('View Dormant User Cleanup Report', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _OperationsPages.reportsPage.topOperationsLink.click();
        await _OperationsPages.reportsPage.reportsLink.click();
        await _OperationsPages.reportsPage.selectAffiliate.selectByValue(testDataSAM.selectAffiliateByValue.DBSCN);
        await _OperationsPages.reportsPage.submitAffiliate.click();
        await _OperationsPages.reportsPage.viewDrmntUserCleanupReportLink.click();
        if (today.isSame(lastDayOfMonth, 'day')) {
            await _OperationsPages.reportsPage.endCalendar.click();
            await _OperationsPages.reportsPage.endDay.click();
        }
        await _OperationsPages.reportsPage.viewReportBtn.click();
        await pageSwitchWindow(testDataSAM.reports.reportWindow);
        await _OperationsPages.reportsPage.loadConditionOnReportPage();
        await ensure(_OperationsPages.reportsPage.reportTitle).textContains(testDataSAM.reports.dormantUserReportTitle);
        await browser.close();
        await pageSwitchWindow(testDataSAM.reports.operationReportPageWindow);
    });
});