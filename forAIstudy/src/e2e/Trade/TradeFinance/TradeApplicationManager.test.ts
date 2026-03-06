/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { saveScreen, ensure, SIT, handlerCase, addContext } from '../../../lib';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('Trade Application Manage', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginSAM(SIT ? testData.TradeApplicationManager.SIT.ASADM1 : testData.TradeApplicationManager.UAT.ASADM2) });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Trade Application Manage - Add (Model User) entitlement', async function () {
        await _TradeFinancePages.tradeApplicationManagerPage.loadCondition();
        await _TradeFinancePages.tradeApplicationManagerPage.topCorporationsLink.click();
        await _TradeFinancePages.tradeApplicationManagerPage.selectAffiliate.select(testData.TradeApplicationManager.DBSSG);
        await _TradeFinancePages.tradeApplicationManagerPage.submitAffiliateButton.click();
        await _TradeFinancePages.tradeApplicationManagerPage.selectColumn.select(testData.TradeApplicationManager.companyId);
        await _TradeFinancePages.tradeApplicationManagerPage.inputAffiliate.input(testData.TradeApplicationManager.SGAffiliate);
        await _TradeFinancePages.tradeApplicationManagerPage.searchCorpButton.click();
        await _TradeFinancePages.tradeApplicationManagerPage.viewCorpLink.click();
        await _TradeFinancePages.tradeApplicationManagerPage.showUsersList.click();
        await _TradeFinancePages.tradeApplicationManagerPage.editUserLink.click();
        addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.editUserLink.click()');
        await _TradeFinancePages.tradeApplicationManagerPage.editTradeLink.click();
        addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.editTradeLink.click()');
        await _TradeFinancePages.tradeApplicationManagerPage.loadConditionForTradePage();
        addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.loadConditionForTradePage');
        await _TradeFinancePages.tradeApplicationManagerPage.userTimeZone.selectFirst();
        addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.userTimeZone.selectFirst()');
        if (!await _TradeFinancePages.tradeApplicationManagerPage.modelUser.isElementSelected()) {
            addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.modelUser.isElementSelected()');
            await _TradeFinancePages.tradeApplicationManagerPage.modelUser.jsClick();
            addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.modelUser.jsClick()');
        }
        await _TradeFinancePages.tradeApplicationManagerPage.saveButton.jsClick();
        addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.saveButton.jsClick()');
        await _TradeFinancePages.tradeApplicationManagerPage.loadConditionOnEditUserPage();
        addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.loadConditionOnEditUserPage()');
        await _TradeFinancePages.tradeApplicationManagerPage.editTradeLink.click();
        addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.editTradeLink.click()');
        await _TradeFinancePages.tradeApplicationManagerPage.loadConditionForTradePage();
        addContext(this, '_TradeFinancePages.tradeApplicationManagerPage.loadConditionForTradePage()');
        await ensure(_TradeFinancePages.tradeApplicationManagerPage.modelUser).isSelected();
    });

    it('Trade Application Manage - remove (Model User) entitlement', async function () {
        await new NavigatePages().loginSAM(SIT ? testData.TradeApplicationManager.SIT.ASADM1 : testData.TradeApplicationManager.UAT.ASADM2);
        await _TradeFinancePages.tradeApplicationManagerPage.loadCondition();
        await _TradeFinancePages.tradeApplicationManagerPage.topCorporationsLink.click();
        await _TradeFinancePages.tradeApplicationManagerPage.selectAffiliate.select(testData.TradeApplicationManager.DBSSG);
        await _TradeFinancePages.tradeApplicationManagerPage.submitAffiliateButton.click();
        await _TradeFinancePages.tradeApplicationManagerPage.selectColumn.select(testData.TradeApplicationManager.companyId);
        await _TradeFinancePages.tradeApplicationManagerPage.inputAffiliate.input(testData.TradeApplicationManager.SGAffiliate);
        await _TradeFinancePages.tradeApplicationManagerPage.searchCorpButton.click();
        await _TradeFinancePages.tradeApplicationManagerPage.viewCorpLink.click();
        await _TradeFinancePages.tradeApplicationManagerPage.showUsersList.click();
        await _TradeFinancePages.tradeApplicationManagerPage.editUserLink.click();
        await _TradeFinancePages.tradeApplicationManagerPage.editTradeLink.click();
        await _TradeFinancePages.tradeApplicationManagerPage.loadConditionForTradePage();
        await _TradeFinancePages.tradeApplicationManagerPage.userTimeZone.selectFirst();
        if (await _TradeFinancePages.tradeApplicationManagerPage.modelUser.isElementSelected()) {
            await _TradeFinancePages.tradeApplicationManagerPage.modelUser.jsClick();
        }
        await _TradeFinancePages.tradeApplicationManagerPage.saveButton.jsClick();
        await _TradeFinancePages.tradeApplicationManagerPage.loadConditionOnEditUserPage();
        await _TradeFinancePages.tradeApplicationManagerPage.editTradeLink.click();
        await _TradeFinancePages.tradeApplicationManagerPage.loadConditionForTradePage();
        await ensure(_TradeFinancePages.tradeApplicationManagerPage.modelUser).isNotSelected();
    });
});
