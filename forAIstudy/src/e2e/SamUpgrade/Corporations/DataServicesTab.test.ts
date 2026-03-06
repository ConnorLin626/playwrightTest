/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

describe('Data Services Tab', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Edit Special Reports', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.dataServicesTabLink.click();
        await _CorporationsPages.corporationsPage.specialReportLink.click();
        await _CorporationsPages.corporationsPage.isUseBackOfficeNameBox.click();
        await _CorporationsPages.corporationsPage.dataServicesPreButton.jsClick();
        await _CorporationsPages.corporationsPage.dataServicesSubmitButton.jsClick();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });
    
    //Add for DASB-16469
    it('Enable Special Reports for Japan', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSJP);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMJPAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.dataServicesTabLink.click();
        await _CorporationsPages.corporationsPage.dataServicesCreateButton.jsClick();
        await _CorporationsPages.corporationsPage.dataType.click();
        await _CorporationsPages.corporationsPage.PreButton.click();
        await _CorporationsPages.corporationsPage.subButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
        // Delete this data service
        await _CorporationsPages.corporationsPage.specialReportJPLink.jsClick();
        await _CorporationsPages.corporationsPage.deleteDataService.click();
        await _CorporationsPages.corporationsPage.confirmDelete.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });
});