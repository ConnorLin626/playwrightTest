/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { CorporationsPages } from '../../../pages/SAM';
import { Menu } from '../../../config/menu'
import { ensure, handlerCase, SIT } from '../../../lib';
import { browser } from 'protractor';

let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

describe('OBO User', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('OBO User - SG', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.DBSCM1);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.enterUser.input(testDataSAM.OboUser.SGuser);
        await _CorporationsPages.corporationsPage.searchUser.click();
        await _CorporationsPages.corporationsPage.userTabOboUserLink.click();
        await _CorporationsPages.corporationsPage.loadConditionForCB();
        await _CorporationsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _CorporationsPages.corporationsPage.loadConditionOnMyApprovals();
        // await _CorporationsPages.corporationsPage.byTransactionAdditionFilter.click();
        // await _CorporationsPages.corporationsPage.byTransactionAdditionFilter_PaymentType.select(testDataSAM.paymentType.SG_ACT);
        // await _CorporationsPages.corporationsPage.byTransactionAdditionFilter_Search.click();
        // await waitForUXLoading();
        // await _CorporationsPages.corporationsPage.firstReferenceLink.click();
        // await _CorporationsPages.corporationsPage.loadConditionForViewPage();
        // await ensure(_CorporationsPages.corporationsPage.paymentTitle).textContains(testDataSAM.oboUserViewPage.Title);
        await _CorporationsPages.corporationsPage.existOBOUserButton.jsClick();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.inputAffiliate).textContains(testDataSAM.searchAffiliateValue.SGAffiliate)
        ]);
    });

    it('OBO User - IN', async function () {
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.selectByValue(testDataSAM.selectAffiliateByValue.DBSIN);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.clean();
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.INAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.enterUser.input(testDataSAM.OboUser.INuser);
        await _CorporationsPages.corporationsPage.searchUser.click();
        await _CorporationsPages.corporationsPage.userTabOboUserLink.click();
        // await _CorporationsPages.corporationsPage.oboUserLinkIN.click();
        await _CorporationsPages.corporationsPage.loadConditionForCB();
        await _CorporationsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _CorporationsPages.corporationsPage.loadConditionOnMyApprovals();
        await _CorporationsPages.corporationsPage.existOBOUserButton.jsClick();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.inputAffiliate).textContains(testDataSAM.searchAffiliateValue.INAffiliate)
        ]);
    });

    it('OBO User - HK', async function () {
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.selectByValue(testDataSAM.selectAffiliateByValue.DBSHK);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.clean();
        await _CorporationsPages.corporationsPage.inputAffiliate.input(SIT ? testDataSAM.searchAffiliateValue.SIT.HKAffiliate : testDataSAM.searchAffiliateValue.UAT.HKAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.enterUser.input(testDataSAM.OboUser.HKuser);
        await _CorporationsPages.corporationsPage.searchUser.click();
        await _CorporationsPages.corporationsPage.userTabOboUserLink.click();
        // await _CorporationsPages.corporationsPage.oboUserLink.click();
        await _CorporationsPages.corporationsPage.loadConditionForCB();
        await _CorporationsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _CorporationsPages.corporationsPage.loadConditionOnMyApprovals();
        await _CorporationsPages.corporationsPage.existOBOUserButton.jsClick();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.inputAffiliate).textContains(SIT ? testDataSAM.searchAffiliateValue.SIT.HKAffiliate : testDataSAM.searchAffiliateValue.UAT.HKAffiliate)
        ]);
    });
});