/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { CorporationsPages } from '../../../pages/SAM';
import { saveScreen, ensure, handlerCase, SIT } from '../../../lib';
import { browser } from 'protractor';

let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

describe('Edit User On Corporations', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
	before(async function () {await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2);});
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Modify Corporations - Set EBBR ERP = Trusple', async function () {

        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        //AB-9366
        //edit CorporationsPages,Set EBBR ERP = Trusple
        await _CorporationsPages.corporationsPage.editCorpButton.click();
        //if(!_CorporationsPages.corporationsPage.ebbrFlag) await _CorporationsPages.corporationsPage.ebbrFlag.jsClickIfExist();//checked EBBR,how to check?
        await _CorporationsPages.corporationsPage.ebbrErp.select(testDataSAM.ebbrErp.Trusple);
        await _CorporationsPages.corporationsPage.previewGroupButton.click();
        await _CorporationsPages.corporationsPage.submitGroupButton.click();
    });
    
    it('Modify User - Edit the function access', async function () {
        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.editUserLink.click();
        await _CorporationsPages.corporationsPage.editFunctionalLink.click();
        await _CorporationsPages.corporationsPage.modifyBeneficiaryAU.click();
        await _CorporationsPages.corporationsPage.previewBeneficiaryButton.click();
        await _CorporationsPages.corporationsPage.submitBeneficiaryButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });

    

    it('Modify User - Edit the account  access', async function () {
        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.clean();
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.editUserLink.click();
        await _CorporationsPages.corporationsPage.editAccountLink.click();
        await _CorporationsPages.corporationsPage.modifyAccountFirst.click();
        await _CorporationsPages.corporationsPage.modifyPaymentsFirst.click();
        await _CorporationsPages.corporationsPage.previewAccountServiceButton.click();
        await _CorporationsPages.corporationsPage.submitAccountServiceButton.click();
        await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
    });

    it('Approve User By Clicking into UserID Hyperlink ', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2);
        let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.showUsersList.click();
        await _CorporationsPages.corporationsPage.approveUserLink.click();
        await _CorporationsPages.corporationsPage.submitApproveUserButton.click();
        if (!SIT) {
            await ensure(_CorporationsPages.corporationsPage).isSAMSuccess();
            // await ensure(_CorporationsPages.corporationsPage.approveUserValue).textIs(testDataSAM.status.Approved);
        }
    });
});
