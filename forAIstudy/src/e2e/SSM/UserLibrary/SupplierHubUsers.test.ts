import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE, devWatch } from "../../../lib";
import { browser, promise } from "protractor";
import { UsersPages } from "../../../pages/SSM";
import { CorporationsPages } from '../../../pages/SamUpgrade';

let _UsersPages = new UsersPages();
let testData = _UsersPages.fetchTestData('SSM_testData.json');
let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let fullName = "";
let UserName = "";

let userID = "";

describe('Supplier Hub Users', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('Create and Approve own an maker user request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.SupplierHub.SIT.loginUserId : testData.SupplierHub.UAT.loginUserId, SIT ? testData.SupplierHub.SIT.loginCompanyId : testData.SupplierHub.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.supplierUserButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		fullName = "SUPPLIERHUBMAKER" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.SupplierHub.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.SupplierHub.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.SupplierHub.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.SupplierHub.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.SupplierHub.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.SupplierHub.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.SupplierHub.dateOfBirth);
		userID = "SUPPLIERHUBUSER" + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		await _UsersPages.UsersPage.setUpManually.jsClick();
		await _UsersPages.UsersPage.continueButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForPrevewPage();
		await _UsersPages.UsersPage.ApproveOwnButton.jsClick();
		await _UsersPages.UsersPage.ApproveNowButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForSupplierSubmittedPage();
		await _UsersPages.UsersPage.doneButton.click();
		browser.sleep(10000);//wait for MQ response
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed),
			await ensure(_UsersPages.UsersPage.userRole).textContains(testData.SupplierHub.userRoleMaker)
		]);

		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SupplierHub.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.SupplierHub.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SupplierHub.SGAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.jsClick();
		await _UsersPages.UsersPage.UserTab.jsClick();
		await _UsersPages.UsersPage.SearchUserId.input(userID);
		await _UsersPages.UsersPage.SearchButn.click();
		await promise.all([
			await ensure(_UsersPages.UsersPage.UserName).textContains(UserName),
		]);
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.userIDValue).textContains(userID),
			await ensure(_CorporationsPages.corporationsPage.userNameValue).textContains(UserName),
		]);
		await _CorporationsPages.corporationsPage.editIdealServicelLink.jsClick();
		await _CorporationsPages.corporationsPage.supplierFinanceFunctions.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.SFSupplierView).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SFSupplierCreateModifyDelete).isSelected(),
		]);
		await _CorporationsPages.corporationsPage.supplierHubFunctions.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.SupplierHubView).isSelected(),
		]);
	});

	it('Edit a maker user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.SupplierHub.SIT.loginUserId : testData.SupplierHub.UAT.loginUserId, SIT ? testData.SupplierHub.SIT.loginCompanyId : testData.SupplierHub.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.supplierUserButton.click();
		await _UsersPages.UsersPage.loadConditionUser();
		await _UsersPages.UsersPage.supplierFilterUser.input(userID);
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.editBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionEditSupplierUser();
		await _UsersPages.UsersPage.userName.clean();
		UserName = 'SUPPLIERHUBAPPROVER' + generatedID();
		await _UsersPages.UsersPage.userName.input(UserName);
		await _UsersPages.UsersPage.scrollTo(0, 1000);
		await _UsersPages.UsersPage.makerAndApproverAdmin.jsClick();
		await _UsersPages.UsersPage.dualControl_yes.jsClick();
		await _UsersPages.UsersPage.identityNumber.input(testData.SupplierHub.identityNumberEdit);
		await _UsersPages.UsersPage.selectFileBtn.select(testData.SupplierHub.uploadFileName);
		await _UsersPages.UsersPage.disclaimerSelect.jsClick();
		await _UsersPages.UsersPage.continueButton.jsClick();
		await _UsersPages.UsersPage.loadConditionEditUserCont();
		await _UsersPages.UsersPage.submitBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionForSupplierSubmittedPage();
		await _UsersPages.UsersPage.doneButton.click();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.dashboardFilter.input(UserName);
		await _UsersPages.UsersPage.RequestLink.jsClick();
		await _UsersPages.UsersPage.loadConditionViewRequest();
		await promise.all([
			await ensure(_UsersPages.UsersPage.ViewStatus).textContains(testData.status.PendingApproval),
			await ensure(_UsersPages.UsersPage.userName).textContains(UserName),
			await ensure(_UsersPages.UsersPage.userRole).textContains(testData.SupplierHub.userRoleMakerAndApproverAdmin),
			await ensure(_UsersPages.UsersPage.singleControlView).textContains(testData.SupplierHub.singleControlVaule)

		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});


	it('Approve edit user request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.SupplierHub.SIT.approveUserId : testData.SupplierHub.UAT.approveUserId, SIT ? testData.SupplierHub.SIT.loginCompanyId : testData.SupplierHub.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(UserName);
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.ApproveNowButton.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		browser.sleep(20000);//wait for MQ response
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		browser.sleep(20000);//wait for MQ response
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed)
		]);
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.DBSCM1);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SupplierHub.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.SupplierHub.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SupplierHub.SGAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.jsClick();
		await _UsersPages.UsersPage.UserTab.jsClick();
		await _UsersPages.UsersPage.SearchUserId.input(userID);
		await _UsersPages.UsersPage.SearchButn.click();
		await promise.all([
			await ensure(_UsersPages.UsersPage.UserName).textContains(UserName),
		]);
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.userIDValue).textContains(userID),
			await ensure(_CorporationsPages.corporationsPage.userNameValue).textContains(UserName),
		]);
		await _CorporationsPages.corporationsPage.editIdealServicelLink.jsClick();
		await _CorporationsPages.corporationsPage.supplierFinanceFunctions.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.SFSupplierView).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SFSupplierCreateModifyDelete).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SFSupplierApprove).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SFSupplierApproveOwn).isNotSelected(),
		]);
		await _CorporationsPages.corporationsPage.supplierHubFunctions.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.SupplierHubApproveOwn).isNotSelected(),
			await ensure(_CorporationsPages.corporationsPage.SupplierHubView).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SupplierHubAdmin).isSelected(),

		]);
	});

});
