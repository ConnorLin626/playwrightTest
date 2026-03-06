import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, generatedID, devWatch, PROJECT_TYPE } from "../../../lib";
import { browser, } from "protractor";
import { MyProfilePages } from "../../../pages/SSM";

let _MyProfilePage = new MyProfilePages();
let testData = _MyProfilePage.fetchTestData('SSM_testData.json');

describe('My profile', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('View profile', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.MyProfileUser.SIT.loginUserId : testData.MyProfileUser.UAT.loginUserId, SIT ? testData.MyProfileUser.SIT.loginCompanyId : testData.MyProfileUser.UAT.loginCompanyId)
		await _MyProfilePage.MyProfilePage.MyProfilemenu.click();
		await _MyProfilePage.MyProfilePage.loadConditionMyProfileUsePar();
		await Promise.all([
			await ensure(_MyProfilePage.MyProfilePage.MyProFullName).textContains(SIT ? testData.MyProfileUser.SIT.loginUserName : testData.MyProfileUser.UAT.loginUserName)
		]);
		await _MyProfilePage.MyProfilePage.IDEALsettingTab.click();
		await _MyProfilePage.MyProfilePage.loadConditionMyProfileIdeSet();
		await Promise.all([
			await ensure(_MyProfilePage.MyProfilePage.MyProUserId).textContains(SIT ? testData.MyProfileUser.SIT.loginUserId : testData.MyProfileUser.UAT.loginUserId)
		]);
		await _MyProfilePage.MyProfilePage.logoutButton.click();
	})


	// add for IEBAA-3595
	it('View profile edit user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.MyProfileUser.SIT.loginUserIdE : testData.MyProfileUser.UAT.loginUserIdE, SIT ? testData.MyProfileUser.SIT.loginCompanyIdE : testData.MyProfileUser.UAT.loginCompanyIdE)
		await _MyProfilePage.MyProfilePage.MyProfilemenu.click();
		await _MyProfilePage.MyProfilePage.loadConditionMyProfileUsePar();
		await _MyProfilePage.MyProfilePage.IDEALsettingTab.click();
		await _MyProfilePage.MyProfilePage.loadConditionMyProfileIdeSet();
		await Promise.all([
			await ensure(_MyProfilePage.MyProfilePage.MyProUserId).textContains(SIT ? testData.MyProfileUser.SIT.loginUserIdE : testData.MyProfileUser.UAT.loginUserIdE)
		]);
		await _MyProfilePage.MyProfilePage.editBtn.click();
		await _MyProfilePage.MyProfilePage.continueButton.jsClick();
		await _MyProfilePage.MyProfilePage.loadConditionEditUserCont();
		await _MyProfilePage.MyProfilePage.submitBtn.jsClick();
		await _MyProfilePage.MyProfilePage.loadConditionForSubmittedPage();
		await _MyProfilePage.MyProfilePage.finishedButton.click();
		await _MyProfilePage.MyProfilePage.loadConditionRequest();
		await _MyProfilePage.MyProfilePage.dashboardFilter.input(SIT ? testData.MyProfileUser.SIT.loginUserIdE : testData.MyProfileUser.UAT.loginUserIdE);
		await ensure(_MyProfilePage.MyProfilePage.affecteUser).textContains(testData.MyProfileUser.userName),
			await _MyProfilePage.MyProfilePage.RequestLink.jsClick();
		await _MyProfilePage.MyProfilePage.loadConditionViewRequest();
		await Promise.all([
			await ensure(_MyProfilePage.MyProfilePage.pageTitle).textContains(testData.MyProfileUser.pageTitleValue),
			await ensure(_MyProfilePage.MyProfilePage.ViewStatus).textContains(testData.status.PendingApproval),
		]);
	})

})