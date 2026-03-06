/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { DashboardPages } from '../../../pages/IDEALX/Dashboard';
import { NavigatePages } from '../../../pages/Navigate';
import { SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

const _DashboardPages = new DashboardPages();
let TWtestData = _DashboardPages.fetchTestData("TW_testData.json");
//Navigate to Help->Resources, click Download to check

/**
 * do not support this time
//OBO to CB, navigate to Help->Resources, click Download to check
describe('TWOBU Dashboard Hero', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {await new NavigatePages().loginIdealXSAM(TWtestData.Resources.asadm2);});
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	//AB-8299
    
	it('OBO to CB,Dashboard Navigate to Help->Resources', async function () {
		let _CorporationsPages = new CorporationsPages();
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        //OBO to CB
		await _CorporationsPages.corporationsPage.selectAffiliate.selectByValue(testDataSAM.selectAffiliateByValue.DBSTWOBU);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.clean();
        await _CorporationsPages.corporationsPage.inputAffiliate.input(SIT?testDataSAM.searchAffiliateValue.SIT.TWOBUAffiliate:testDataSAM.searchAffiliateValue.UAT.TWOBUAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.showUsersList.click();
		await _CorporationsPages.corporationsPage.twOBUAssist.click();//点击assist，url重定向
		await _CorporationsPages.corporationsPage.loadConditionForCB();

		//navigate to Help->Resources, click Download to check
		await _DashboardPages.openMenu(Menu.Dashboard.Home);
		await _DashboardPages.dashboardPage.loadCondition();
		await _DashboardPages.dashboardPage.helptab.click();
		await _DashboardPages.dashboardPage.helpResources.click();
		await _DashboardPages.dashboardPage.loadConditionForDialogResourceCenter();
		SIT? (await _DashboardPages.ResourcesCenter.downLoad.click()) :(await _DashboardPages.ResourcesCenter.UATDownLoad.click());
	});
});
*/
//AB-8299
describe('TWDBU Dashboard Hero', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {
		await new NavigatePages().loginIdealx(
			SIT ? TWtestData.TWDBUResources.SIT.login.loginCompanyId : TWtestData.TWDBUResources.UAT.login.loginCompanyId,
			SIT ? TWtestData.TWDBUResources.SIT.login.loginUserId : TWtestData.TWDBUResources.UAT.login.loginUserId,
            "123123"
		);
	});
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Dashboard Navigate to Help->Resources', async function () {
		await _DashboardPages.dashboardPage.dashboardPageButton.click();
		await _DashboardPages.dashboardPage.loadCondition();
		// await _DashboardPages.dashboardPage.helptab.click();
		await _DashboardPages.dashboardPage.ResourceCenter.click();
		//await _DashboardPages.dashboardPage.sample.click();
		await _DashboardPages.dashboardPage.loadConditionForDialogResourceCenter();
		SIT? (await _DashboardPages.ResourcesCenter.downLoad.click()) :(await _DashboardPages.ResourcesCenter.UATDownLoad.click());

	});
});