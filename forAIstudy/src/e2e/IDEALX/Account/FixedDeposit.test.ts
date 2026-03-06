/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, AccountPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser, } from 'protractor';
import * as moment from 'moment';
let currentDate = moment(new Date()).format('DD MMM YYYY');
let nextDate = moment(new Date()).add(1,'days').format('DD MMM YYYY');

let _AccountPages = new AccountPages();
let testData = _AccountPages.fetchTestData('SG_testData_01.json');

describe('Fixed Deposit', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Accounts.fixedDeposit.SIT.loginCompanyId : testData.Accounts.fixedDeposit.UAT.loginCompanyId, SIT ? testData.Accounts.fixedDeposit.SIT.loginUserId : testData.Accounts.fixedDeposit.UAT.loginUserId, testData.Accounts.fixedDeposit.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Fixed Deposit Display with Search', async function () {
        await displayFixedDepositWithSearch();
    });

    it('Switch Tabs', async function () {

        await _AccountPages.FixedDepositsPage.activeTab.click();
        await _AccountPages.FixedDepositsPage.loadCondition4Search();
        await _AccountPages.FixedDepositsPage.maturedTab.click();
        await _AccountPages.FixedDepositsPage.loadCondition4Search();
        await _AccountPages.FixedDepositsPage.showAllTab.click();
        await _AccountPages.FixedDepositsPage.loadCondition4Search();
    });

    it('Check Show More Detail', async function () {

        await _AccountPages.FixedDepositsPage.showMoreDetailLink.jsClick();
        await _AccountPages.FixedDepositsPage.loadCondition4ShowMoreDetail();
        await Promise.all([
            await ensure(_AccountPages.FixedDepositsPage.moreDetailItemInterestRate).isNotEmpty()
        ]);
    });

    it('Generate Detail Report', async function () {
        if (!SIT) {
            await _AccountPages.FixedDepositsPage.generateDetailReportBtn.click();
            await _AccountPages.FixedDepositsPage.loadConditionForDBSLogoOnReportPage();
            // await ensure(_AccountPages.FixedDepositsPage.bulkPaymentAccountValue).textContains(SIT ? testData.Accounts.fixedDeposit.SIT.fromAccount : testData.Accounts.fixedDeposit.UAT.fromAccount);
            await ensure(_AccountPages.FixedDepositsPage.bulkPaymentAccountValue).isNotEmpty();
        }
    });
});

export async function displayFixedDepositWithSearch() {
    await _AccountPages.FixedDepositsPage.accountMenu.click();
    await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
    if (!SIT) {
        await _AccountPages.FixedDepositsPage.loadConditionForFD();
        await _AccountPages.FixedDepositsPage.viewFDTab.jsClick();
    }
    await _AccountPages.FixedDepositsPage.loadCondition();
    await _AccountPages.FixedDepositsPage.modifySearchButton.jsClick();
    await _AccountPages.FixedDepositsPage.loadConditionForSearchSection();
    await _AccountPages.FixedDepositsPage.scrollTo(0, 200)
    await _AccountPages.FixedDepositsPage.dateFromSelect.select(currentDate)
    //await _AccountPages.FixedDepositsPage.fromCurrencySelect.select(SIT ? testData.Accounts.fixedDeposit.SIT.currency : testData.Accounts.fixedDeposit.UAT.currency);
    await _AccountPages.FixedDepositsPage.dateToSelect.select(nextDate)
    await _AccountPages.FixedDepositsPage.searchButton.click();
    await _AccountPages.FixedDepositsPage.loadCondition4Search();

    await ensure(_AccountPages.FixedDepositsPage.firstListItem).isElementPresent()
}
