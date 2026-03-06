/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages,ApprovalsPages } from '../../../pages/IDEALX';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { ensure, handlerCase, SUSIT, PROJECT_TYPE, SIT } from '../../../lib';
import { browser } from 'protractor';

let _CorporationsPages = new CorporationsPages();
let _ApprovalsPages = new ApprovalsPages();

let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

describe('OBO User', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('OBO User - SG', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.enterUser.input(testDataSAM.OboUser.UpgradeSGuser);
        await _CorporationsPages.corporationsPage.searchUser.click();
        await _CorporationsPages.corporationsPage.userTabOboUserLink.click();
        // await _CorporationsPages.corporationsPage.oboUserLink.click();
        await _CorporationsPages.corporationsPage.oboAcceptServiceButton.jsClickIfExist();
        await _CorporationsPages.corporationsPage.loadConditionForCB();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _CorporationsPages.corporationsPage.existOBOUserButton.jsClick();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.inputAffiliate).textContains(testDataSAM.searchAffiliateValue.SAMSGAffiliate)
        ]);
    });

    it('OBO User - IN', async function () {
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
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
        await _CorporationsPages.corporationsPage.oboAcceptServiceButton.jsClickIfExist();
        await _CorporationsPages.corporationsPage.loadConditionForCB();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _CorporationsPages.corporationsPage.existOBOUserButton.jsClick();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.inputAffiliate).textContains(testDataSAM.searchAffiliateValue.INAffiliate)
        ]);
    });

    it('OBO User - HK', async function () {
        if (SIT) {
            await _CorporationsPages.corporationsPage.topCorporationsLink.click();
            await _CorporationsPages.corporationsPage.loadCorporationCondition();
            await _CorporationsPages.corporationsPage.selectAffiliate.selectByValue(testDataSAM.selectAffiliateByValue.DBSHK);
            await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
            await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
            await _CorporationsPages.corporationsPage.inputAffiliate.clean();
            await _CorporationsPages.corporationsPage.inputAffiliate.input(SUSIT ? testDataSAM.searchAffiliateValue.SIT.HKAffiliate : testDataSAM.searchAffiliateValue.UAT.HKAffiliate);
            await _CorporationsPages.corporationsPage.searchCorpButton.click();
            await _CorporationsPages.corporationsPage.viewCorpLink.click();
            await _CorporationsPages.corporationsPage.showUsersList.click();
            await _CorporationsPages.corporationsPage.userTab.click();
            await _CorporationsPages.corporationsPage.enterUser.input(testDataSAM.OboUser.HKuser);
            await _CorporationsPages.corporationsPage.searchUser.click();
            await _CorporationsPages.corporationsPage.userTabOboUserLink.click();
            // await _CorporationsPages.corporationsPage.oboUserLink.click();
            await _CorporationsPages.corporationsPage.oboAcceptServiceButton.jsClickIfExist();
            await _CorporationsPages.corporationsPage.loadConditionForCB();
            await _ApprovalsPages.ApprovalPage.approvalMenu.click();
            await _CorporationsPages.corporationsPage.existOBOUserButton.jsClick();
            await Promise.all([
                await ensure(_CorporationsPages.corporationsPage.inputAffiliate).textContains(SUSIT ? testDataSAM.searchAffiliateValue.SIT.HKAffiliate : testDataSAM.searchAffiliateValue.UAT.HKAffiliate)
            ]);
        }
    });
});