/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { UsersPages } from '../../../pages/SSM';
import { ensure, handlerCase, SIT,PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { OpenBusinessAccountPages } from '../../../pages/SSM/Company';

let _OpenBusinessAccountPage = new OpenBusinessAccountPages();
let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let _UsersPages = new UsersPages();
let testData = _OpenBusinessAccountPage.fetchTestData('SSM_testData.json');


describe('SSM Company tab', async function () {
    this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });
    before(async function () {await new NavigatePages().loginSSM(testData.OpenBusinessAccount.SIT.loginUserIdA,testData.OpenBusinessAccount.SIT.loginCompanyId)});

    it('Create any bussiness account type', async function () {
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.companyMenu.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.openBusinessAccountMenu.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.loadConditionforApplyPage();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.applyNowBtn.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.accountName.input(testData.OpenBusinessAccount.accountName);
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.purposeOfAccount.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.purposeOfAccountSelected.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.copyAccountSetting.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.copyAccountSettingSelected.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.nextBtn.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.agreeCheckbox.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.confirmBtn.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.menuDashboardTab.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.dashboardFilterText.input(testData.OpenBusinessAccount.SIT.loginUserIdA);
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.requestItem01.click();
        await Promise.all([
            await ensure(_OpenBusinessAccountPage.OpenBusinessAccountPage.statusTxt).textContains(testData.status.PendingApproval),
            await ensure(_OpenBusinessAccountPage.OpenBusinessAccountPage.requestTypeValue).textContains(testData.OpenBusinessAccount.requestType),
            await ensure(_OpenBusinessAccountPage.OpenBusinessAccountPage.accountTypeValue).textContains(testData.OpenBusinessAccount.accountType),
            await ensure(_OpenBusinessAccountPage.OpenBusinessAccountPage.accountNameValue).textContains(testData.OpenBusinessAccount.accountName),
            await ensure(_OpenBusinessAccountPage.OpenBusinessAccountPage.currencyValue).textContains(testData.OpenBusinessAccount.Ccy),
            await ensure(_OpenBusinessAccountPage.OpenBusinessAccountPage.purposeOfAccountValue).textContains(testData.OpenBusinessAccount.purposeOfAccount),
         ]);

    });
    it('Approve the new account request', async function () {
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.agreeCheckbox.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.approveBtn.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.getchallengeBtn.click();
        let responseA= '12345678';
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.responseCodeTxt.input(responseA);
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.approvedialogBtn.click();
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.dismissdialogBtn.click();
        await browser.sleep(15000);
        await new NavigatePages().loginSSM(testData.OpenBusinessAccount.SIT.loginUserIdA,testData.OpenBusinessAccount.SIT.loginCompanyId)
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.dashboardFilterText.input(testData.OpenBusinessAccount.SIT.loginUserIdA)
        await _OpenBusinessAccountPage.OpenBusinessAccountPage.requestItem01.click();
        await Promise.all([
            await ensure(_OpenBusinessAccountPage.OpenBusinessAccountPage.statusTxt).textContains(testData.status.Pendingbankprocessing)
         ]);
         
    })
});
