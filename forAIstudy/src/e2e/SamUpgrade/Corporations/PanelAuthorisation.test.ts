/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, SUSIT, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

describe('Panel Authorisation', async function () {
    this.retries(browser.params.caseRetryTimes);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Panel Authorisation - Edit Group', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM1);
        let userIfExist = true;
        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.paLink.click();
        await _CorporationsPages.corporationsPage.groupELink.click();
        await ensure(_CorporationsPages.corporationsPage.groupUsersValue).textContains(testDataSAM.groupUsers.AUTOSAM1U03);
        await ensure(_CorporationsPages.corporationsPage.groupName).textContains(testDataSAM.groupName.GroupE);
        if (await _CorporationsPages.corporationsPage.groupUsersValue.textContains(testDataSAM.groupUsers.AUTOSAM1U01)) {
            userIfExist = true;
        } else {
            userIfExist = false;
        }
        await _CorporationsPages.corporationsPage.editGroupButton.isElementPresent();
        await _CorporationsPages.corporationsPage.editGroupButton.click();
        if (userIfExist) {
            await _CorporationsPages.corporationsPage.selectedUsers.select(testDataSAM.groupUsers.AUTOSAM1U01);
            await _CorporationsPages.corporationsPage.removeUsersButton.click();
            await _CorporationsPages.corporationsPage.previewGroupButton.click();
            await ensure(_CorporationsPages.corporationsPage.groupUsersValue).textNotContains(testDataSAM.groupUsers.AUTOSAM1U01);
        } else {
            await _CorporationsPages.corporationsPage.noSelectedUsers.select(testDataSAM.groupUsers.AUTOSAM1U01);
            await _CorporationsPages.corporationsPage.addUsersButton.click();
            await _CorporationsPages.corporationsPage.previewGroupButton.click();
            await ensure(_CorporationsPages.corporationsPage.groupUsersValue).textContains(testDataSAM.groupUsers.AUTOSAM1U01);
        }
        await _CorporationsPages.corporationsPage.submitGroupButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });

    it('Panel Authorisation - Approve Group', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.paLink.click();
        await _CorporationsPages.corporationsPage.statusGroupLink.click();
        await _CorporationsPages.corporationsPage.approveStatusButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await ensure(_CorporationsPages.corporationsPage.groupStatusValue).textIs(testDataSAM.status.Approved);
    });

    it('Panel Authorisation - Edit Profile', async function () {
        let profileAuthorizationExist = true;
        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.clean();
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.paLink.click();
        await _CorporationsPages.corporationsPage.profileLink.click();
        if (await _CorporationsPages.corporationsPage.profileAuthorizationLevelsValue.textContains(testDataSAM.groupName.GroupA)) {
            profileAuthorizationExist = true;
        } else {
            profileAuthorizationExist = false;
        }
        await _CorporationsPages.corporationsPage.editProfileButton.click();
        if (await _CorporationsPages.corporationsPage.minAmount.valueContains(testDataSAM.profile.MinAmount)) {
            await _CorporationsPages.corporationsPage.minAmount.clean();
            await _CorporationsPages.corporationsPage.minAmount.input(testDataSAM.profile.MinAmount1);
        } else {
            await _CorporationsPages.corporationsPage.minAmount.clean();
            await _CorporationsPages.corporationsPage.minAmount.input(testDataSAM.profile.MinAmount);
        }
        if (profileAuthorizationExist) {
            await _CorporationsPages.corporationsPage.selectGroupFirst.select(testDataSAM.groupName.GroupB);
            await _CorporationsPages.corporationsPage.PreviewProfileButton.click();
            if (SUSIT) {
                await ensure(_CorporationsPages.corporationsPage.profileAuthorizationLevelsValue).textContains(testDataSAM.groupName.GroupB);
            } else {
                await ensure(_CorporationsPages.corporationsPage.uatProfileAuthorizationLevelsValue).textContains(testDataSAM.groupName.GroupB);
            }
        } else {
            await _CorporationsPages.corporationsPage.selectGroupFirst.select(testDataSAM.groupName.GroupA);
            await _CorporationsPages.corporationsPage.PreviewProfileButton.click();
            if (SUSIT) {
                await ensure(_CorporationsPages.corporationsPage.profileAuthorizationLevelsValue).textContains(testDataSAM.groupName.GroupA);
            } else {
                await ensure(_CorporationsPages.corporationsPage.uatProfileAuthorizationLevelsValue).textContains(testDataSAM.groupName.GroupA);
            }
        }
        await _CorporationsPages.corporationsPage.updateProfileButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });

    it('Panel Authorisation - Approve Profile', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM1);
        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.clean();
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.paLink.click();
        await _CorporationsPages.corporationsPage.statusProfileLink.click();
        await _CorporationsPages.corporationsPage.approveStatusButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        await ensure(_CorporationsPages.corporationsPage.profileStatusValue).textIs(testDataSAM.status.Approved);
    })
});