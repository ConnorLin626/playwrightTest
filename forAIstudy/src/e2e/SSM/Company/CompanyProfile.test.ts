/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { CompanyProfilePages, UsersPages } from '../../../pages/SSM';
import { ensure, handlerCase, SIT,PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _CompanyProfilePages = new CompanyProfilePages();
let _UsersPages = new UsersPages();
let testData = _CompanyProfilePages.fetchTestData('SSM_testData.json');

describe('SSM Company tab', async function () {
    this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });
    before(async function () {await new NavigatePages().loginSSM(testData.CompanyProfile.SIT.loginUserId,testData.CompanyProfile.SIT.loginCompanyId)});

    it('Check Company Profile page', async function () {
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _CompanyProfilePages.companyProfilePage.companyMenu.click();
        await _CompanyProfilePages.companyProfilePage.companyProfileMenu.click();
        await _CompanyProfilePages.companyProfilePage.loadCondition();

        await Promise.all([
            await ensure(_CompanyProfilePages.companyProfilePage.compnayNameValue).textContains(SIT ? testData.CompanyProfile.SIT.loginCompanyName : testData.CompanyProfile.UAT.loginCompanyName),
            await ensure(_CompanyProfilePages.companyProfilePage.compnayIDValue).textContains(SIT ? testData.CompanyProfile.SIT.loginCompanyId : testData.CompanyProfile.UAT.loginCompanyId),
        ]);
        await _CompanyProfilePages.companyProfilePage.viewDetailBtn.jsClick();
        await _CompanyProfilePages.companyProfilePage.loadConditionforPayeDetail();
        await _CompanyProfilePages.companyProfilePage.filterPayee.click();
        await _CompanyProfilePages.companyProfilePage.filterPayee.input(testData.CompanyProfile.payeeName);
        await Promise.all([
            await ensure(_CompanyProfilePages.companyProfilePage.filterPayeeResultValue).textContains(testData.CompanyProfile.payeeName),
        ]);

    });
});