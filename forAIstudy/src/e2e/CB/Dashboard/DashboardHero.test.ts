/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { DashboardPages } from '../../../pages/CB/Dashboard';
import { NavigatePages } from '../../../pages/Navigate';
import { CorporationsPages } from '../../../pages/SAM';
import { saveScreen, SIT, ensure, handlerCase } from '../../../lib';
import { Menu } from '../../../config/menu';
import { browser } from 'protractor';


const _DashboardPages = new DashboardPages();
let TWtestData = _DashboardPages.fetchTestData("TW_testData.json");
let testData = _DashboardPages.fetchTestData("SG_testData.json");
let testDataSAM = _DashboardPages.fetchTestData("SAM_testData.json");
//Navigate to Help->Resources, click Download to check

//OBO to CB, navigate to Help->Resources, click Download to check
describe('TWOBU Dashboard Hero', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {await new NavigatePages().loginSAM(TWtestData.TWOBUResources.asadm2);	});
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
		await _CorporationsPages.corporationsPage.twOBUAssist.click();
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

//AB-8299
describe('TWDBU Dashboard Hero', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {
		await new NavigatePages().loginCB(
			SIT ? TWtestData.TWDBUResources.SIT.login.loginCompanyId : TWtestData.TWDBUResources.UAT.login.loginCompanyId,
			SIT ? TWtestData.TWDBUResources.SIT.login.loginUserId : TWtestData.TWDBUResources.UAT.login.loginUserId
		);
	});
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Dashboard Navigate to Help->Resources', async function () {
		await _DashboardPages.openMenu(Menu.Dashboard.Home);
		await _DashboardPages.dashboardPage.loadCondition();
		await _DashboardPages.dashboardPage.helptab.click();
		await _DashboardPages.dashboardPage.helpResources.click();
		await _DashboardPages.dashboardPage.loadConditionForDialogResourceCenter();
		SIT? (await _DashboardPages.ResourcesCenter.downLoad.click()) :(await _DashboardPages.ResourcesCenter.UATDownLoad.click());

	});
});

describe('Dashboard Hero', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {
		await new NavigatePages().loginCB(
			SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId,
			SIT ? testData.Dashboard.SIT.loginUserId : testData.Dashboard.UAT.loginUserId
		);
	});
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });


	it('Dashboard Hero New Message', async function () {
		await _DashboardPages.openMenu(Menu.Dashboard.Home);
		await _DashboardPages.dashboardPage.loadCondition();
		await _DashboardPages.dashboardPage.newMessageLink.click();
		await _DashboardPages.dashboardPage.loadConditionForNewMessage();
	});

	it('Dashboard Hero View Business Calendar', async function () {
		await _DashboardPages.openMenu(Menu.Dashboard.Home);
		await _DashboardPages.dashboardPage.loadCondition();
		await _DashboardPages.dashboardPage.businessCalendarLink.click();
		await _DashboardPages.dashboardPage.loadConditionForDialogCalendar();
		await Promise.all([
			await ensure(_DashboardPages.dashboardPage.closeButton).isNotEmpty()
		]);
	});
});