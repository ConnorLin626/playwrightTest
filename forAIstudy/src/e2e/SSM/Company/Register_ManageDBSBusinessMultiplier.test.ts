/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { UsersPages } from '../../../pages/SSM';
import { ensure, handlerCase, SIT,PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { DBSBusinessMultiplierPages } from '../../../pages/SSM/Company';

let _DBSBusinessMultiplierPages = new DBSBusinessMultiplierPages();
let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let _UsersPages = new UsersPages();
let testData = _DBSBusinessMultiplierPages.fetchTestData('SSM_testData.json');


describe('SSM Company tab', async function () {
    this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });
    before(async function () {await new NavigatePages().loginSSM(testData.DBSBusinessMultiplier.SIT.loginUserIdA,testData.DBSBusinessMultiplier.SIT.loginCompanyId)});

    it('Create Register-Manage Company for DBS Business Multiplier request', async function () {
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.companyMenu.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.multiplierAccountMenu.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.loadCondition2();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.select.click();
        // await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.multiplierUser.jsClick();
        // await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.multiplierUserInput.input(testData.DBSBusinessMultiplier.loginUserIdA);
        // await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.multiplierUserSelected.jsClick();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.termConditionNote.jsClick();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.nextBtn.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.submiBtn.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.menuDashboardTab.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.dashboardFilterText.input(testData.DBSBusinessMultiplier.requestType);
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.requestItem01.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.loadConditionViewRequest();
        await Promise.all([
            await ensure(_DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.statusTxt).textContains(testData.status.PendingApproval),
         ]);
    });

    it('Approve Register-Manage Company for DBS Business Multiplier request', async function () {
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.approveBtn.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.pushApproveBtn.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.dismissdialogBtn.click();
        await new NavigatePages().loginSSM(testData.DBSBusinessMultiplier.SIT.loginUserIdB,testData.DBSBusinessMultiplier.SIT.loginCompanyId)
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.menuDashboardTab.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.dashboardFilterText.input(testData.DBSBusinessMultiplier.requestType);
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.requestItem01.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.loadConditionViewRequest();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.approveBtn.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.pushApproveBtn.click();
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.dismissdialogBtn.click();
        await browser.sleep(15000);
        await new NavigatePages().loginSSM(testData.DBSBusinessMultiplier.SIT.loginUserIdB,testData.DBSBusinessMultiplier.SIT.loginCompanyId)
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.dashboardFilterText.input(testData.DBSBusinessMultiplier.requestType);
        await _DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.requestItem01.click();
        await Promise.all([
            await ensure(_DBSBusinessMultiplierPages.DBSBusinessMultiplierPage.statusTxt).textContainsLessOne(testData.status.Completed,testData.status.Pendingbankprocessing),
         ]);
    })
});
