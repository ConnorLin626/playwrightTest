/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { CorporationsPages } from '../../../pages/SAM';
import { saveScreen, ensure, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

describe('View Corporations', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    before(async function () { await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('View Corporations-SG', async function () {
        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.loadCondition();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.editCorpButton.ElementExist();
        await ensure(_CorporationsPages.corporationsPage.companyIdValue).textIs(testDataSAM.searchAffiliateValue.SGAffiliate);
    });

    it('View Corporations-IN', async function () {
        let _CorporationsPages = new CorporationsPages();
        //await _CorporationsPages.corporationsPage.loadCondition();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.selectByValue(testDataSAM.selectAffiliateByValue.DBSIN);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.clean();
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.INAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.editCorpButton.ElementExist();
        await ensure(_CorporationsPages.corporationsPage.companyIdValue).textIs(testDataSAM.searchAffiliateValue.INAffiliate);
    });
});