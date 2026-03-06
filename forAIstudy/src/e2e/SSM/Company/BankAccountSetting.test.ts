/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { CompanyProfilePages,UsersPages } from '../../../pages/SSM';
import { ensure, handlerCase,PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _CompanyProfilePages = new CompanyProfilePages();
let _UsersPages = new UsersPages();
let testData = _CompanyProfilePages.fetchTestData('SSM_testData.json');

describe('SSM Company tab', async function () {
    this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });
    before(async function () {await new NavigatePages().loginSSM(testData.BankAcctSetting.SIT.loginUserId,testData.BankAcctSetting.SIT.loginCompanyId)});

    it('Check Bank Account Setting', async function () {
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _CompanyProfilePages.companyProfilePage.companyMenu.click();
        await _CompanyProfilePages.companyProfilePage.companyProfileMenu.click();
        await _CompanyProfilePages.companyProfilePage.loadCondition();
        await _CompanyProfilePages.bankAccountSettingPage.bankAcctTab.click();
        await _CompanyProfilePages.bankAccountSettingPage.acctFilter.click();
        await _CompanyProfilePages.bankAccountSettingPage.acctFilter.input(testData.BankAcctSetting.bankAcctNO);

        await Promise.all([
            await ensure(_CompanyProfilePages.bankAccountSettingPage.acctNoValue).textContains(testData.BankAcctSetting.bankAcctNO),
        ]);

        await _CompanyProfilePages.bankAccountSettingPage.acctFilter.clean();
        await _CompanyProfilePages.bankAccountSettingPage.additionalFilter.click();
        await _CompanyProfilePages.bankAccountSettingPage.approvalStatus.click();
        await _CompanyProfilePages.bankAccountSettingPage.approvalStatusValue.jsClick();
        await _CompanyProfilePages.bankAccountSettingPage.searchBtn.click();

        await Promise.all([
            await ensure(_CompanyProfilePages.bankAccountSettingPage.statusValue).textContains(testData.BankAcctSetting.approvalStatus),
        ]);

    });
});