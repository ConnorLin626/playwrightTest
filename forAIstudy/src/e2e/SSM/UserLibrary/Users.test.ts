import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE, devWatch } from "../../../lib";
import { browser, promise } from "protractor";
import { UsersPages} from "../../../pages/SSM";
import { CorporationsPages } from '../../../pages/SamUpgrade';

let _UsersPages = new UsersPages();
//let _CompanyProfilePages = new CompanyProfilePages();
let testData = _UsersPages.fetchTestData('SSM_testData.json');
let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let fullName = "";
let UserName = "";

let userID = "";

let supplierHubUserName = "";
let supplierHubUserID = "";

describe('Supplier Hub Users', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('Create and Approve own an maker user request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.SupplierHub.SIT.loginUserId : testData.SupplierHub.UAT.loginUserId, SIT ? testData.SupplierHub.SIT.loginCompanyId : testData.SupplierHub.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.supplierUserButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		fullName = "SUPPLIERHUBMAKER" + generatedID();
		supplierHubUserName = fullName;
		await _UsersPages.UsersPage.createPagefullName.input(supplierHubUserName);
		await _UsersPages.UsersPage.contactDetails.input(testData.SupplierHub.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.SupplierHub.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.SupplierHub.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.SupplierHub.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.SupplierHub.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.SupplierHub.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.SupplierHub.dateOfBirth);
		supplierHubUserID = "SUPPLIERHUBUSER" + generatedID();
		supplierHubUserID = supplierHubUserID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(supplierHubUserID);
		await _UsersPages.UsersPage.setUpManually.jsClick();
		await _UsersPages.UsersPage.continueButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForPrevewPage();
		await _UsersPages.UsersPage.ApproveOwnButton.jsClick();
		await _UsersPages.UsersPage.ApproveNowButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForSupplierSubmittedPage();
		await _UsersPages.UsersPage.doneButton.click();
		await _UsersPages.UsersPage.loadConditionForSupplierRequest();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(supplierHubUserID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(supplierHubUserName),
			await ensure(_UsersPages.UsersPage.userID).textContains(supplierHubUserID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed),
			await ensure(_UsersPages.UsersPage.userRole).textContains(testData.SupplierHub.userRoleMaker)
		]);
		await _UsersPages.UsersPage.logoutButton.click();
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SupplierHub.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.SupplierHub.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SupplierHub.SGAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.jsClick();
		await _UsersPages.UsersPage.UserTab.jsClick();
		await _UsersPages.UsersPage.SearchUserId.input(supplierHubUserID);
		await _UsersPages.UsersPage.SearchButn.click();
		await promise.all([
			await ensure(_UsersPages.UsersPage.UserName).textContains(supplierHubUserName),
		]);
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.userIDValue).textContains(supplierHubUserID),
			await ensure(_CorporationsPages.corporationsPage.userNameValue).textContains(supplierHubUserName),
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
		await _UsersPages.UsersPage.supplierFilterUser.input(supplierHubUserID);
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.editBtn.jsClick();
		await _UsersPages.UsersPage.userName.clean();
		supplierHubUserName = 'SUPPLIERHUBAPPROVER' + generatedID();
		await _UsersPages.UsersPage.userName.input(supplierHubUserName);
		await _UsersPages.UsersPage.scrollTo(0,1500);
		await _UsersPages.UsersPage.makerAndApproverAdmin.click();
		await _UsersPages.UsersPage.loadConditionEditSupplierUser();
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
		await _UsersPages.UsersPage.dashboardFilter.input(supplierHubUserName);
		await _UsersPages.UsersPage.RequestLink.jsClick();
		await _UsersPages.UsersPage.loadConditionViewRequest();
		await promise.all([
			await ensure(_UsersPages.UsersPage.ViewStatus).textContains(testData.status.PendingApproval),
			await ensure(_UsersPages.UsersPage.userName).textContains(supplierHubUserName),
			await ensure(_UsersPages.UsersPage.userRole).textContains(testData.SupplierHub.userRoleMakerAndApproverAdmin),
			await ensure(_UsersPages.UsersPage.singleControlView).textContains(testData.SupplierHub.singleControlVaule)

		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});


	it('Approve edit supplier hub user request part1', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.SupplierHub.SIT.approveUserId : testData.SupplierHub.UAT.approveUserId, SIT ? testData.SupplierHub.SIT.loginCompanyId : testData.SupplierHub.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(supplierHubUserName);
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.ApproveNowButton.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.loadConditionForSupplierRequest();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed)
		]);
	});

});

describe('User Library tab', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('Create an Approver user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.NewApprover.SIT.loginUserId : testData.NewApprover.UAT.loginUserId, SIT ? testData.NewApprover.SIT.loginCompanyId : testData.NewApprover.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		fullName = "SSM AUTO Approver" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.NewApprover.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.NewApprover.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.NewApprover.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.NewApprover.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.NewApprover.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.NewApprover.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.NewApprover.dateOfBirth);
		userID = "APPROVER" + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		await _UsersPages.UsersPage.setUpManually.jsClick();
		await _UsersPages.UsersPage.transactionAccessYes.jsClick();
		await _UsersPages.UsersPage.transactionApprover.jsClick();
		await _UsersPages.UsersPage.approveGroup.select(testData.NewApprover.groupName);
		await _UsersPages.UsersPage.showPayment.jsClick();
		await _UsersPages.UsersPage.giroPayment.jsClick();
		await _UsersPages.UsersPage.accoutTransfer.jsClick();
		await _UsersPages.UsersPage.disclaimerSelect.jsClick();
		await _UsersPages.UsersPage.continueButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForPrevewPage();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.loadConditionForSubmittedPage();
		await ensure(_UsersPages.UsersPage.successMsg).textContains(testData.NewApprover.successMsg);
		await _UsersPages.UsersPage.finishedButton.click();;
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval),
			await ensure(_UsersPages.UsersPage.userGroup).textContains(testData.NewApprover.groupName)
		]);
	});

	it('Approve an Approver user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.NewApprover.SIT.approveUserId : testData.NewApprover.UAT.approveUserId, SIT ? testData.NewApprover.SIT.loginCompanyId : testData.NewApprover.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.getChanllengeBtn.click();
		await _UsersPages.UsersPage.responseCode.input("23333");
		await _UsersPages.UsersPage.loadConditionForApproveRequestPage();
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingDocCheck),
			await ensure(_UsersPages.UsersPage.userGroup).textContains(testData.NewApprover.groupName)
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('Provider submit an new Approver user request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.NewApprover.SIT.providerId : testData.NewApprover.UAT.providerId, "");
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerSubmitBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderSubmit();
		await _UsersPages.UsersPage.confirmSubmitBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderSubmitComplete();
		await _UsersPages.UsersPage.confirmDismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApprovalConfirm),
			await ensure(_UsersPages.UsersPage.userGroup).textContains(testData.NewApprover.groupName)
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('Provider confirm an new Approver user request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.NewApprover.SIT.ProviderApproverId : testData.NewApprover.UAT.ProviderApproverId, "");
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerApproveBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderApproveConfirm();
		await _UsersPages.UsersPage.popProviderApproveBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderApproveComplete();
		await _UsersPages.UsersPage.confirmDismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContainsLessOne(testData.status.Pendingbankprocessing, testData.status.Completed,testData.status.Approved),
			await ensure(_UsersPages.UsersPage.userGroup).textContains(testData.NewApprover.groupName)
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('SAM check new Approver user', async function () {
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SGAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.paLink.click();
		await _CorporationsPages.corporationsPage.groupALink.click();
		await ensure(_CorporationsPages.corporationsPage.groupUsersValue).textContains(userID);
		await _CorporationsPages.corporationsPage.userTab.click();
		await _CorporationsPages.corporationsPage.userIdText.input(userID);
		await _CorporationsPages.corporationsPage.submitButton.jsClick();
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.userIDValue).textContains(userID),
			await ensure(_CorporationsPages.corporationsPage.userNameValue).textContains(fullName),
		]);
		await _CorporationsPages.corporationsPage.editFunctionalLink.click();
		await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.giroCheckBox).isSelected(),
		    await ensure(_CorporationsPages.corporationsPage.actCheckBox).isSelected(),
	    ]);
        await _CorporationsPages.corporationsPage.giroShowAll.jsClick();
		await _CorporationsPages.corporationsPage.actShowAll.jsClick();
		await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.actCreateAccess).isNotSelected(),
		    await ensure(_CorporationsPages.corporationsPage.giroCreateAccess).isNotSelected(),
	    ]);
	});

	it('Create an User for Modify and Delete', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.loginUserIdA : testData.UserLibrary.UAT.loginUserId, SIT ? testData.UserLibrary.SIT.loginCompanyIdA : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		fullName = "AASSMAUTO" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.UserLibrary.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.UserLibrary.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.UserLibrary.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.UserLibrary.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.UserLibrary.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.UserLibrary.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.UserLibrary.dateOfBirth);
		userID = "AASSMAUTO" + generatedID();
		userID = userID.toUpperCase();
		console.log("userID1:"+userID);	
		await _UsersPages.UsersPage.userID.input(userID);
		await _UsersPages.UsersPage.setUpManually.jsClick();
		await _UsersPages.UsersPage.enquiryAccessYes.jsClick();
		await _UsersPages.UsersPage.transactionAccessYes.jsClick();
		await _UsersPages.UsersPage.tanxMaker.jsClick();
		await _UsersPages.UsersPage.paymentSelectAll.jsClick();
		await _UsersPages.UsersPage.showPayment.jsClick();
		await _UsersPages.UsersPage.showAccount.click();
		await _UsersPages.UsersPage.unselectAccount1.jsClick();
		//add for IDXP-1483
		await _UsersPages.UsersPage.liquidityManageAccessYes.jsClick();
		await _UsersPages.UsersPage.lmOverview.jsClick();
		await _UsersPages.UsersPage.lmSweepsMaker.jsClick();
		await _UsersPages.UsersPage.lmSweepsApproveOwn.jsClick();
		await _UsersPages.UsersPage.lmNPIO.jsClick();
		/////
		await _UsersPages.UsersPage.selectSubsidiary.click();
		await _UsersPages.UsersPage.subsiValue.click();
		await _UsersPages.UsersPage.enquiryAccessYes0.jsClick();
		await _UsersPages.UsersPage.continueButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForPrevewPage();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.loadConditionForSubmittedPage();
		await ensure(_UsersPages.UsersPage.successMsg).textContains(testData.UserLibrary.successMsg);
		await _UsersPages.UsersPage.finishedButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.approveUserIdA : testData.UserLibrary.UAT.approveUserId, SIT ? testData.UserLibrary.SIT.loginCompanyIdA : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.getChanllengeBtn.jsClick();
		await _UsersPages.UsersPage.responseCode.input("23333");
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
	});

	//add for IDXP-1483
	it('Check User with Liquidity management in SAM', async function () {
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.ModifyUser.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.ModifyUser.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.ModifyUser.SGAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.jsClick();
		await _UsersPages.UsersPage.UserTab.jsClick();
		await _UsersPages.UsersPage.SearchUserId.input(userID);
		await _UsersPages.UsersPage.SearchButn.click();
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await _CorporationsPages.corporationsPage.editFunctionalLink.jsClick();
		await _CorporationsPages.corporationsPage.liquiManaExpand.jsClick();

		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.lmOverView).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.lmApproveOwn).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.lmMaker).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.lmViewNPIO).isSelected(),
		]);
		
	});
	/////

	it('Create a new modify user request with HQ & Subsi access', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.ModifyUser.SIT.loginUserId : testData.ModifyUser.UAT.loginUserId, SIT ? testData.ModifyUser.SIT.loginCompanyId : testData.ModifyUser.UAT.loginCompanyId)
		await _UsersPages.UsersPage.Dasgboardmenu.click();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.loadConditionUser();
		await _UsersPages.UsersPage.viewUpTo.jsClick();
		await _UsersPages.UsersPage.filterUser.input(userID);
		await _UsersPages.UsersPage.searchBtn.click();
		await browser.sleep(2000);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.editBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionEditUser();
		await _UsersPages.UsersPage.userName.clean();
		UserName = 'AAModifyUser' + generatedID();
		console.log("userID2:"+userID);
		await _UsersPages.UsersPage.userName.input(UserName);
		await _UsersPages.UsersPage.showPayment.jsClick();
		await _UsersPages.UsersPage.showAccount.jsClick();
		await promise.all([
			await ensure(_UsersPages.UsersPage.giroPaymentAccount).isNotSelected(),
			await ensure(_UsersPages.UsersPage.giroPaymentAccount2).isSelected(),
		]);
		await _UsersPages.UsersPage.continueButton.jsClick();
		await _UsersPages.UsersPage.loadConditionEditUserCont();
		await _UsersPages.UsersPage.submitBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionEditUserSubm();
		await _UsersPages.UsersPage.finishBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.dashboardFilter.input(UserName);
		await _UsersPages.UsersPage.RequestLink.jsClick();
		await _UsersPages.UsersPage.loadConditionViewRequest();
		await promise.all([
			await ensure(_UsersPages.UsersPage.ViewStatus).textContains(testData.status.PendingApproval),
			await ensure(_UsersPages.UsersPage.userName).textContains(UserName),
		]);
	});

	it('Approve the Modify user request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.ModifyUser.SIT.approveUserId : testData.ModifyUser.UAT.approveUserId, SIT ? testData.ModifyUser.SIT.loginCompanyId : testData.ModifyUser.UAT.loginCompanyId)
		await _UsersPages.UsersPage.Dasgboardmenu.click();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.MyApproveTab.jsClick();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.RequestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.loadConditionForApproveRequestPage();
		await _UsersPages.UsersPage.Challenge.jsClick();
		await _UsersPages.UsersPage.ResponseCode.input(testData.ModifyUser.ResponseCode);
		await _UsersPages.UsersPage.Approvedialog.jsClick();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.Dismiss.jsClick();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.RequestLink.jsClick();
		await _UsersPages.UsersPage.loadConditionViewRequest();
		await promise.all([
			await ensure(_UsersPages.UsersPage.ViewStatus).textContainsLessOne(testData.status.Completed, testData.status.Approved, testData.status.BnakReject),
		    await ensure(_UsersPages.UsersPage.userName).textContains(UserName),
		]);
		await _UsersPages.UsersPage.loadConditionForUser();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(userID);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.editBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionEditUser();
		await promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(UserName),
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('SAM check modify user', async function () {
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.ModifyUser.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.ModifyUser.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.ModifyUser.SGAffiliate);
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
		await _CorporationsPages.corporationsPage.editAccountLink.jsClick();
		await _CorporationsPages.corporationsPage.modifyAccountFirst.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.giroPayment).isNotSelected(),
		]);

	});

	it('Create a Delete User Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.loginUserIdA : testData.UserLibrary.UAT.loginUserId, SIT ? testData.UserLibrary.SIT.loginCompanyIdA : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.loadConditionUser();
		await _UsersPages.UsersPage.viewUpTo.jsClick();
		await _UsersPages.UsersPage.filterUser.input(UserName);
		console.log(UserName);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.click();
		await _UsersPages.UsersPage.actionDeleteBtn.jsClick();
		await _UsersPages.UsersPage.confirmDeleteButton.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval)
		]);
	});

	it('Approve a Delete User request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.approveUserIdA : testData.UserLibrary.UAT.approveUserId, SIT ? testData.UserLibrary.SIT.loginCompanyIdA : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.responseCode.input("23333");
		await _UsersPages.UsersPage.getChanllengeBtn.jsClick();
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContainsLessOne(testData.status.Completed, testData.status.Pendingbankprocessing,testData.status.Approved)
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('SAM check the delete user', async function () {
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.UserLibrary.SGAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.userTab.click();
		await _UsersPages.UsersPage.userIdText.input(userID);
		await _UsersPages.UsersPage.submitSAM.jsClick();
		await ensure(_UsersPages.UsersPage.errorMsg).textContainsLessOne(testData.UserLibrary.errorMsg,testData.UserLibrary.errorMsg1)
	});

	it('Create Unlock security device request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.loginUserId : testData.UserLibrary.UAT.loginUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.UserLibrary.unlockUserName);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.unlockButton.click();
		await _UsersPages.UsersPage.unlockChallenge.input(testData.UserLibrary.unlockChallenge);
		await _UsersPages.UsersPage.confirmButton.click();
		await _UsersPages.UsersPage.dismissButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.UserLibrary.unlockUserName);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.pageTitle).textContains(testData.UserLibrary.requestValue), //add for IEBAA-3595
			await ensure(_UsersPages.UsersPage.userName).textContains(testData.UserLibrary.unlockUserName),
			await ensure(_UsersPages.UsersPage.userID).textContains(testData.UserLibrary.unlockUserID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval)
		]);
	});

	it('Approve Unlock Security Device Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.approveUserId : testData.UserLibrary.UAT.approveUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.responseCode.input("23333");
		await _UsersPages.UsersPage.getChanllengeBtn.jsClick();
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed)
		]);
	});

	it('Create Suspend User Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.loginUserId : testData.UserLibrary.UAT.loginUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.UserLibrary.suspendUserName);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForAction();
		await _UsersPages.UsersPage.suspendButton.click();
		await _UsersPages.UsersPage.confirmButton.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.UserLibrary.suspendUserName);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(testData.UserLibrary.suspendUserName),
			await ensure(_UsersPages.UsersPage.userID).textContains(testData.UserLibrary.suspendUserID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval)
		]);
	});

	it('Approve Suspend User Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.approveUserId : testData.UserLibrary.UAT.approveUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.MyApproveTab.click();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.responseCode.input("23333");
		await _UsersPages.UsersPage.getChanllengeBtn.jsClick();
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed)
		]);
	});

	it('Create Reactive User Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.loginUserId : testData.UserLibrary.UAT.loginUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.UserLibrary.reactiveUserName);
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForAction();
		await _UsersPages.UsersPage.reactiveButton.click();
		await _UsersPages.UsersPage.confirmButton.click();
		await _UsersPages.UsersPage.dismissButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.UserLibrary.reactiveUserName);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(testData.UserLibrary.reactiveUserName),
			await ensure(_UsersPages.UsersPage.userID).textContains(testData.UserLibrary.reactiveUserID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval)
		]);
	});

	it('Approve Reactive User Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.approveUserId : testData.UserLibrary.UAT.approveUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.responseCode.input("23333");
		await _UsersPages.UsersPage.getChanllengeBtn.jsClick();
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed)
		]);
	});

	it('Create Reset Login Details Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.loginUserId : testData.UserLibrary.UAT.loginUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.UserLibrary.resetLoginUserName);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForAction();
		await _UsersPages.UsersPage.resetLoginDetBtn.click();
		await _UsersPages.UsersPage.confirmRestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.UserLibrary.resetLoginUserName);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(testData.UserLibrary.resetLoginUserName),
			await ensure(_UsersPages.UsersPage.userEmail).textContains(testData.UserLibrary.resetUserEmail),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval),
			await ensure(_UsersPages.UsersPage.pageTitle).textContains(testData.UserLibrary.resetLoginDetail),

		]);
	});

	it('Approve Reset Login Details Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.approveUserId : testData.UserLibrary.UAT.approveUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.responseCode.input("23333");
		await _UsersPages.UsersPage.getChanllengeBtn.jsClick();
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed),
			await ensure(_UsersPages.UsersPage.pageTitle).textContains(testData.UserLibrary.resetLoginDetail),
		]);
	});

	it('Create Review User Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.loginUserId : testData.UserLibrary.UAT.loginUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.reviewUserAccessBtn.click();
		await _UsersPages.UsersPage.loadConditionForReviewUserPage();
		await _UsersPages.UsersPage.nextBtn.click();
		await _UsersPages.UsersPage.loadConditionForReviewUserPreviewPage();
		await _UsersPages.UsersPage.submitBtn.click();
		await _UsersPages.UsersPage.loadConditionForReviewUserCompletePage();
		await _UsersPages.UsersPage.finishBtn.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await ensure(_UsersPages.UsersPage.affecteUser).textContains(testData.UserLibrary.affecteUserValue), // add for IEBAA-3595
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.pageTitle).textContains(testData.UserLibrary.reviewUserTitle),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval)
		]);
	});

	it('Approve Review User Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.UserLibrary.SIT.approveUserId : testData.UserLibrary.UAT.approveUserId, SIT ? testData.UserLibrary.SIT.loginCompanyId : testData.UserLibrary.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.MyApproveTab.click();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.responseCode.input("23333");
		await _UsersPages.UsersPage.getChanllengeBtn.jsClick();
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed),
			await ensure(_UsersPages.UsersPage.pageTitle).textContains(testData.UserLibrary.reviewUserTitle)
		]);
	});
});

describe('New Maker user', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('Create A Maker user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.NewMaker.SIT.loginUserId : testData.NewMaker.UAT.loginUserId, SIT ? testData.NewMaker.SIT.loginCompanyId : testData.NewMaker.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		await _UsersPages.UsersPage.loadConditionForCreateUserPage();
		fullName = 'NewMarkerUserName' + generatedID();
		await _UsersPages.UsersPage.userName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.NewMaker.EmailAddress);
		await _UsersPages.UsersPage.mobileCountry.select(testData.NewMaker.mobileCtry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.NewMaker.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.NewMaker.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.NewMaker.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.NewMaker.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.NewApprover.dateOfBirth);
		userID = 'NEWMARKERUSERID' + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		await _UsersPages.UsersPage.setUpManually.jsClick();
        await _UsersPages.UsersPage.contactPersonYes.jsClick();
		await _UsersPages.UsersPage.enquiryAccessYes.jsClick();
		await _UsersPages.UsersPage.customReportAccessYes.jsClick();
		await _UsersPages.UsersPage.transactionAccessYes.click();
		await _UsersPages.UsersPage.tanxMaker.jsClick();
		await _UsersPages.UsersPage.allPaymentType.click();
		await _UsersPages.UsersPage.continueButton.click();
		await _UsersPages.UsersPage.loadConditionEditUserCont();
		await _UsersPages.UsersPage.submitBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionEditUserSubm();
		await _UsersPages.UsersPage.finishBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.RequestLink.click();
		await _UsersPages.UsersPage.loadConditionViewRequest();
		await promise.all([
			await ensure(_UsersPages.UsersPage.ViewStatus).textContains(testData.status.PendingApproval),
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.UserId).textContains(userID)
		])
	})

	it('Approve an Maker user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.NewMaker.SIT.approveUserId : testData.NewMaker.UAT.approveUserId, SIT ? testData.NewMaker.SIT.loginCompanyId : testData.NewMaker.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.MyApproveTab.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.requestCheckBox.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.getChanllengeBtn.click();
		await _UsersPages.UsersPage.responseCode.input(testData.NewMaker.responseCode);
		await _UsersPages.UsersPage.loadConditionForApproveRequestPage();
		await _UsersPages.UsersPage.approveRequestBtn.click();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.showAllTab.click();
		await browser.sleep(5000);
		await _UsersPages.UsersPage.dashboardFilter.clean();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await browser.sleep(5000);
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContainsLessOne(testData.status.Completed,testData.status.Approved)
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('SAM check new Maker user', async function () {
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.SAM.slectCompanyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.CorporationID);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.userTab.click();
		await _CorporationsPages.corporationsPage.enterUser.input(userID);
		await _CorporationsPages.corporationsPage.searchUser.click();
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.userIDValue).textContains(userID),
			await ensure(_CorporationsPages.corporationsPage.userNameValue).textContains(fullName),
		]);
		await _CorporationsPages.corporationsPage.editFunctionalLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.checkStatusInquiryAccess).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.lmsDashboardInquiryAccess).isSelected(),
		]);
		await _CorporationsPages.corporationsPage.cancelEdit.click();
		await _CorporationsPages.corporationsPage.editDataServiceLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.poboTxnReport).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.cvrReport).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.dcicassactReport).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.mcanpsmrpReport).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.sfabsprrptReport).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.arpcpadtlReport).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.mcastmtReport).isSelected(),
		])
	})
	//add for IDXP-1562
	it('Create a GC user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.NewGCUser.SIT.loginUserId : testData.NewGCUser.UAT.loginUserId, SIT ? testData.NewGCUser.SIT.loginCompanyId : testData.NewGCUser.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		fullName = "GC SSM AUTO User" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.NewGCUser.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.NewGCUser.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.NewGCUser.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.NewGCUser.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.NewGCUser.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.NewGCUser.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.NewGCUser.dateOfBirth);
		userID = "GCAUTOUser" + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		await _UsersPages.UsersPage.setUpManually.jsClick();

		//set acesss
		await _UsersPages.UsersPage.enquiryAccessYes.jsClick();
		await _UsersPages.UsersPage.transactionAccessYes.jsClick();
		await _UsersPages.UsersPage.tanxMaker.jsClick();
		await _UsersPages.UsersPage.transactionApprover.jsClick();
		await _UsersPages.UsersPage.isApproveOwn.jsClick();
		await _UsersPages.UsersPage.approveGroup.select(testData.NewGCUser.groupName);
		await _UsersPages.UsersPage.allPaymentType.jsClick();
		await _UsersPages.UsersPage.fileExchange.jsClick();
		await _UsersPages.UsersPage.fileExchangeUpload.jsClick();
		await _UsersPages.UsersPage.fileExchangeApprove.jsClick();
		await _UsersPages.UsersPage.proxyAddress.jsClick();
		await _UsersPages.UsersPage.proxyAddressMaker.jsClick();
		await _UsersPages.UsersPage.proxyAddressApprover.jsClick();	
		// await _UsersPages.UsersPage.payeeApproval.jsClick();

		await _UsersPages.UsersPage.disclaimerSelect.jsClick();
		await _UsersPages.UsersPage.continueButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForPrevewPage();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.loadConditionForSubmittedPage();
		await ensure(_UsersPages.UsersPage.successMsg).textContains(testData.NewGCUser.successMsg);
		await _UsersPages.UsersPage.finishedButton.click();;
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();

		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.ApproveNowButton.click();
		await _UsersPages.UsersPage.dismissBtn.click();


		//provider user submit
		await new NavigatePages().loginSSM(SIT ? testData.NewGCUser.SIT.providerId : testData.NewGCUser.UAT.providerId, "");
		await _UsersPages.UsersPage.affiliateSelected.input("DBS Gift City India");
		await _UsersPages.UsersPage.gcAffiliate.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		// await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.additionFilter.click();
		await _UsersPages.UsersPage.Search.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerSubmitBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderSubmit();
		await _UsersPages.UsersPage.confirmSubmitBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderSubmitComplete();
		await _UsersPages.UsersPage.confirmDismissBtn.click();

		//provider user confirm
		await new NavigatePages().loginSSM(SIT ? testData.NewGCUser.SIT.ProviderApproverId : testData.NewGCUser.UAT.ProviderApproverId, "");
		await _UsersPages.UsersPage.affiliateSelected.input("DBS Gift City India");
		await _UsersPages.UsersPage.gcAffiliate.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		// await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.additionFilter.click();
		await _UsersPages.UsersPage.Search.click();
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerApproveBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderApproveConfirm();
		await _UsersPages.UsersPage.popProviderApproveBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderApproveComplete();
		await _UsersPages.UsersPage.confirmDismissBtn.click();

		// check in sam
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.NewGCUser.DBSGC);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.NewGCUser.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.NewGCUser.GCAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.jsClick();
		await _UsersPages.UsersPage.UserTab.jsClick();
		await _UsersPages.UsersPage.SearchUserId.input(userID);
		await _UsersPages.UsersPage.SearchButn.click();
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await _CorporationsPages.corporationsPage.editAccountLink.jsClick();
		await _CorporationsPages.corporationsPage.modifyAccountFirst.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.accountStatement).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.accountICT).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.accountTT).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.accountACT).isSelected()

		]);
		await _CorporationsPages.corporationsPage.cancelFromEditUserAcct.click();
		await _CorporationsPages.corporationsPage.editFunctionalLink.click();
		await _CorporationsPages.corporationsPage.GCICTExpand.click();
		await _CorporationsPages.corporationsPage.GCFDExpand.click();
		await _CorporationsPages.corporationsPage.GCTTExpand.click();
		await _CorporationsPages.corporationsPage.GCACTExpand.click();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.GC_ICT_View).isSelected(),
		    await ensure(_CorporationsPages.corporationsPage.GC_ICT_Group).isNotSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ICT_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ICT_Temp_Maker).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ICT_Temp_Approver).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ICT_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ICT_Maker).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ICT_Approver).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ICT_ApproveOwn).isSelected(),

			await ensure(_CorporationsPages.corporationsPage.GC_FD_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_FD_Maker).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_FD_Approver).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_FD_ApproveOwn).isSelected(),
			
            await ensure(_CorporationsPages.corporationsPage.GC_TT_View).isSelected(),
		    await ensure(_CorporationsPages.corporationsPage.GC_TT_Group).isNotSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_TT_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_TT_Temp_Maker).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_TT_Temp_Approver).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_TT_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_TT_Maker).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_TT_Approver).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_TT_ApproveOwn).isSelected(),

			await ensure(_CorporationsPages.corporationsPage.GC_ACT_View).isSelected(),
		    await ensure(_CorporationsPages.corporationsPage.GC_ACT_Group).isNotSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ACT_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ACT_Temp_Maker).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ACT_Temp_Approver).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ACT_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ACT_Maker).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ACT_Approver).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.GC_ACT_ApproveOwn).isSelected(),
			
			await ensure(_CorporationsPages.corporationsPage.GC_FDSum_View).isSelected(),
	    ]);
	});
});

describe('PA enable request', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('Create an trade Finance approver user request,Need multi PA group approver', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserId : testData.PA.UAT.loginUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		fullName = "SSM AUTO Approver" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.PA.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.PA.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.PA.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.PA.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.PA.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.PA.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.PA.dateOfBirth);
		userID = "TradeApprover" + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		await _UsersPages.UsersPage.setUpManually.jsClick();
		await _UsersPages.UsersPage.tradeFinanceAccessYes.jsClick();
		await _UsersPages.UsersPage.transactionApproverCheckbox.jsClick();
		await _UsersPages.UsersPage.tradeGroup.select(testData.PA.groupName);
		// remove some access only retain Documentary Letters of Credit (Import) access
		await _UsersPages.UsersPage.StandbyLettersofCreditApproveDelete.jsClick();
		await _UsersPages.UsersPage.BankerGuaranteeApproveDelete.jsClick();
		await _UsersPages.UsersPage.BankerGuaranteeApproveDelete.jsClick();
		await _UsersPages.UsersPage.TLCinquiry.jsClick();
		await _UsersPages.UsersPage.idcinquiry.jsClick();
		await _UsersPages.UsersPage.ImportBillunderCollectionApproveDelete.jsClick();
		await _UsersPages.UsersPage.ExportBillunderCollectionApproveDelete.jsClick();
		await _UsersPages.UsersPage.DocumentaryLettersofCreditExportApproveDelete.jsClick();
		await _UsersPages.UsersPage.issginquiry.jsClick();
		await _UsersPages.UsersPage.ShippingGuaranteeApproveDelete.jsClick();
		await _UsersPages.UsersPage.TradeFinancingApproveDelete.jsClick();
		await _UsersPages.UsersPage.TradeFinancingApproveDelete.jsClick();
		await _UsersPages.UsersPage.RecentActivitiesinquiry.jsClick();
		await _UsersPages.UsersPage.reviewinquiry.jsClick();
		await _UsersPages.UsersPage.reviewinquiry.jsClick();
		await _UsersPages.UsersPage.admininquiry.jsClick();
		await _UsersPages.UsersPage.admininquiry.jsClick();
		await _UsersPages.UsersPage.disclaimerSelect.jsClick();
		await _UsersPages.UsersPage.continueButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForPrevewPage();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.loadConditionForSubmittedPage();
		await ensure(_UsersPages.UsersPage.successMsg).textContains(testData.PA.successMsg);
		await _UsersPages.UsersPage.finishedButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval)
		]);
	})

	it('First approver approve the user', async function () {
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.approveNowButton.click();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains("Partially approved")
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('2nd approver Approve the user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
		await _UsersPages.UsersPage.approveNowButton.click();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingDocCheck)
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('Provider submit an new Approver user request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.providerId : testData.PA.UAT.providerId, "");
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerSubmitBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderSubmit();
		await _UsersPages.UsersPage.confirmSubmitBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderSubmitComplete();
		await _UsersPages.UsersPage.confirmDismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApprovalConfirm),
			await ensure(_UsersPages.UsersPage.userTradeGroup).textContains(testData.PA.groupName),
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('Provider confirm an new Approver user request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.ProviderApproverId : testData.PA.UAT.ProviderApproverId, "");
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerApproveBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderApproveConfirm();
		await _UsersPages.UsersPage.popProviderApproveBtn.click();
		await _UsersPages.UsersPage.loadConditionforProviderApproveComplete();
		await _UsersPages.UsersPage.confirmDismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
			await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContainsLessOne(testData.status.Pendingbankprocessing, testData.status.Completed,testData.status.Approved),
		]);
		await _UsersPages.UsersPage.logoutButton.click();
	});

	it('SAM check new Trade Approver user', async function () {
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.PAenableAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.paLink.click();
		await _CorporationsPages.corporationsPage.groupALink.click();
		await ensure(_CorporationsPages.corporationsPage.groupUsersValue).textContains(userID);
		await _CorporationsPages.corporationsPage.userTab.click();
		await _CorporationsPages.corporationsPage.userIdText.input(userID);
		await _CorporationsPages.corporationsPage.submitButton.jsClick();
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.userIDValue).textContains(userID),
			await ensure(_CorporationsPages.corporationsPage.userNameValue).textContains(fullName),
			await _CorporationsPages.corporationsPage.scrollTo(0,2000),
			await ensure(_CorporationsPages.corporationsPage.userStatus).textContains(testDataSAM.status.Approved)
		]);
		await _CorporationsPages.corporationsPage.editTradeFinanceAccessLink.click();
        await browser.sleep(3000);
        await _CorporationsPages.corporationsPage.pageSwitchIframe('//iframe[@id="iframeName"]');
        await _CorporationsPages.corporationsPage.scrollTo(0,1200);
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.DLCChekcBox).isSelected(),
        ]);
        await _CorporationsPages.corporationsPage.DLCShowAll.click();
        await _CorporationsPages.corporationsPage.ImportLCIssShowAll.click();
        await _CorporationsPages.corporationsPage.ImportBillsunderLCShowAll.click();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.LCIssInquiryAccess).isSelected(),
            await ensure(_CorporationsPages.corporationsPage.LCIssCreateAccess).isNotSelected(),
               await ensure(_CorporationsPages.corporationsPage.LCIssApproveAccess).isSelected(),
            await ensure(_CorporationsPages.corporationsPage.LCIssOffApproveAccess).isNotSelected(),
            await ensure(_CorporationsPages.corporationsPage.LCIssTemCreateAccess).isNotSelected(),
            await ensure(_CorporationsPages.corporationsPage.LCIssAmdCreateAccess).isNotSelected(),
               await ensure(_CorporationsPages.corporationsPage.LCIssAmdApproveAccess).isSelected(),
            await ensure(_CorporationsPages.corporationsPage.LCIssAmdOffApproveAccess).isNotSelected(),
            await ensure(_CorporationsPages.corporationsPage.LCBillInquirycheckbox).isSelected(),
            await ensure(_CorporationsPages.corporationsPage.LCBillrarcheckbox).isSelected()
        ]); 
		await browser.switchTo().defaultContent();
		await _CorporationsPages.corporationsPage.logOutSAMButton.click();
	});

	it('Create suspend User Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserId : testData.PA.UAT.loginUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.PA.reactiveUserName);
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForAction();
		await _UsersPages.UsersPage.reactiveButton.click();
		await _UsersPages.UsersPage.confirmButton.click();
		await _UsersPages.UsersPage.dismissButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.PA.reactiveUserName);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(testData.PA.reactiveUserName),
			await ensure(_UsersPages.UsersPage.userID).textContains(testData.PA.reactiveUserID),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval)
		]);
	});

	it('Approve suspend User Request', async function () {
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click(); 
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.PA.reactiveUserName);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await browser.sleep(3000);
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.PA.reactiveUserName);
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed)
		]);
	});


	it('Create Reset Login Details Request', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserId : testData.PA.UAT.loginUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.PA.resetLoginDetailUserID);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.loadConditionForAction();
		await _UsersPages.UsersPage.resetLoginDetBtn.click();
		await _UsersPages.UsersPage.confirmRestBtn.click();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.PA.resetLoginDetailUserID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(testData.PA.resetLoginDetailUserName),
			await ensure(_UsersPages.UsersPage.userEmail).textContains(testData.PA.resetLoginDetailUserEmail),
			await ensure(_UsersPages.UsersPage.userPhone).textContains(testData.PA.resetLoginDetailUserPhone),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval),
		]);
	});

	it('Approve Reset Login Details Request', async function () {
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.PA.resetLoginDetailUserID);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await browser.sleep(3000);
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(testData.PA.resetLoginDetailUserID);
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed),
			await ensure(_UsersPages.UsersPage.pageTitle).textContains(testData.UserLibrary.resetLoginDetail),
		]);
	});

	it('Copy an Approver user', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserId : testData.PA.UAT.loginUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.PA.copyUserId);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.copyUserButton.click();
		fullName = "SSMCPUserName" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.NewApprover.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.NewApprover.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.NewApprover.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.NewApprover.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.NewApprover.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.NewApprover.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.NewApprover.dateOfBirth);
		userID = "SSMCPUser" + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		//due to copy user will ticked this flag automatically 2025/4/25
		// await _UsersPages.UsersPage.securityTokenDigital.jsClick();
		//check access in copy user page
		await Promise.all([
			await ensure(_UsersPages.UsersPage.contactPersonYes).isSelected(),
			await ensure(_UsersPages.UsersPage.enquiryAccessYes).isSelected(),
			await _UsersPages.UsersPage.enquiryCollapse.click(),
			await ensure(_UsersPages.UsersPage.LoanEnquiry).isSelected(),
			await ensure(_UsersPages.UsersPage.createManually).isSelected(),
			await ensure(_UsersPages.UsersPage.createViaFs).isSelected(),
			await ensure(_UsersPages.UsersPage.transactionApprover).isSelected(),
			await ensure(_UsersPages.UsersPage.isApproveOwn).isSelected(),
			await ensure(_UsersPages.UsersPage.belongGroup).textContains(testData.PA.belongGroup),
			await ensure(_UsersPages.UsersPage.isFileUploadApprover).isSelected(),
			await ensure(_UsersPages.UsersPage.payments).isSelected(),
			await ensure(_UsersPages.UsersPage.isTransactionMaker).isSelected(),
			await _UsersPages.UsersPage.paymentsCollapse.click(),
			await ensure(_UsersPages.UsersPage.giroPayment).isSelected(),
			await ensure(_UsersPages.UsersPage.giroPaymentMaker).isSelected(),
			await ensure(_UsersPages.UsersPage.accoutTransfer).isSelected(),
			await ensure(_UsersPages.UsersPage.actMaker).isSelected(),
			await ensure(_UsersPages.UsersPage.telegraphicTransfer).isSelected(),
			await ensure(_UsersPages.UsersPage.allPayrollType).isSelected(),
			await _UsersPages.UsersPage.payrollCollapse.click(),
			await ensure(_UsersPages.UsersPage.payrollDBS).isSelected(),
			await ensure(_UsersPages.UsersPage.payrollDBSApprover).isSelected(),
			await ensure(_UsersPages.UsersPage.canEditTransactions).isSelected(),
			await ensure(_UsersPages.UsersPage.canDeleteTransactions).isSelected(),
			await ensure(_UsersPages.UsersPage.merchantPortal).isSelected(),
			await ensure(_UsersPages.UsersPage.localPayee).isSelected(),
			await ensure(_UsersPages.UsersPage.payeeMaker).isSelected(),
			await ensure(_UsersPages.UsersPage.payeeApproval).isSelected(),
			await ensure(_UsersPages.UsersPage.tradeFinanceAccessYes).isSelected(),
			await ensure(_UsersPages.UsersPage.tradetTransactionMaker).isSelected(),
		]);
	});

	it('Submit and approve copy an approver user reqest', async function () {
		await _UsersPages.UsersPage.disclaimerSelect.jsClick();
		await _UsersPages.UsersPage.continueButton.click();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await browser.sleep(3000);
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingDocCheck)
		]);
	});

	it('copy a user which has multi subsi company access', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserIdA : testData.PA.UAT.loginUserIdA, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.PA.copyMultiSubUserId);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.copyUserButton.click();
		fullName = "SSMCPMUserName" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.NewApprover.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.NewApprover.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.NewApprover.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.NewApprover.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.NewApprover.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.NewApprover.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.NewApprover.dateOfBirth);
		userID = "SSMCPMUser" + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		//due to copy user will ticked this flag automatically 2025/4/25
		// await _UsersPages.UsersPage.securityTokenDigital.jsClick();
		await _UsersPages.UsersPage.continueButton.click();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		//check payment type in view request page
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval),
			await ensure(_UsersPages.UsersPage.pageTitle).textContains(testData.UserLibrary.pageTitleValue), //add for IEBAA-3595
			await ensure(_UsersPages.UsersPage.userName).textIs(fullName), //add for IEBAA-3595
			await ensure(_UsersPages.UsersPage.userID).textIs(userID), //add for IEBAA-3595
			await ensure(_UsersPages.UsersPage.AccountTransfer_1).textContains(testData.PA.paymentType1),
			await ensure(_UsersPages.UsersPage.TelegraphicTransfer_1).textContains(testData.PA.paymentType2),
			await ensure(_UsersPages.UsersPage.Payroll_1).textContains(testData.PA.paymentType3),
			await ensure(_UsersPages.UsersPage.BulkGIROCollection_1).textContains(testData.PA.paymentType4),
			await ensure(_UsersPages.UsersPage.ChequeExpress_1).textContains(testData.PA.paymentType5),
			await ensure(_UsersPages.UsersPage.GIROPayment).textContains(testData.PA.paymentType6),
			await ensure(_UsersPages.UsersPage.Payroll_2).textContains(testData.PA.paymentType3),
			await ensure(_UsersPages.UsersPage.BulkGIROCollection_2).textContains(testData.PA.paymentType4),
			await ensure(_UsersPages.UsersPage.ChequeExpress_2).textContains(testData.PA.paymentType5),
		]);
		//approve this user
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserIdB : testData.PA.UAT.loginUserIdB, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await browser.sleep(3000);
	});

	it('Edit a user which has multi subsi company access', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserIdA : testData.PA.UAT.loginUserIdA, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(fullName);
		await _UsersPages.UsersPage.searchBtn.click();
		await browser.sleep(3000);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.editBtn.click();
		await _UsersPages.UsersPage.viewDetails1.click();
		await _UsersPages.UsersPage.subPaymentCollapse.click();
		await _UsersPages.UsersPage.subTT_1.click();
		await _UsersPages.UsersPage.subTTMaker_1.click();
		await _UsersPages.UsersPage.subICT_1.click();
		await _UsersPages.UsersPage.subICTMaker_1.click();
		await _UsersPages.UsersPage.subICTAccount.click();
		await _UsersPages.UsersPage.subICTAccountSelect.click();
		await _UsersPages.UsersPage.disclaimerSelect.jsClickIfExist();
		await _UsersPages.UsersPage.continueButton.click();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await browser.sleep(2000);
		await _UsersPages.UsersPage.fullUserDetails.jsClick();
		//check paymenttype in view request page
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval),
			await ensure(_UsersPages.UsersPage.AccountTransfer_1).textContains(testData.PA.paymentType1),
			await ensure(_UsersPages.UsersPage.IntraCompanyTransfer).textContains(testData.PA.paymentType7),
			await ensure(_UsersPages.UsersPage.Payroll_1).textContains(testData.PA.paymentType3),
			await ensure(_UsersPages.UsersPage.BulkGIROCollection_1).textContains(testData.PA.paymentType4),
			await ensure(_UsersPages.UsersPage.ChequeExpress_1).textContains(testData.PA.paymentType5),
			await ensure(_UsersPages.UsersPage.GIROPayment).textContains(testData.PA.paymentType6),
			await ensure(_UsersPages.UsersPage.Payroll_2).textContains(testData.PA.paymentType3),
			await ensure(_UsersPages.UsersPage.BulkGIROCollection_2).textContains(testData.PA.paymentType4),
			await ensure(_UsersPages.UsersPage.ChequeExpress_2).textContains(testData.PA.paymentType5),
		]);
	});

	it('Approve edit a user which has multi subsi company access request', async function () {
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserIdB : testData.PA.UAT.loginUserIdB, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.ViewStatus.click();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await browser.sleep(10000);
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserIdB : testData.PA.UAT.loginUserIdB, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		//check status in view request page
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed),
		]);
		//check payment type in SAM
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.SSMCorporationID);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(userID);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
		await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
        //check functional access
        await _CorporationsPages.corporationsPage.subFunctionAccessLink1.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.TTPayeeCreate).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SGBeneficiaryCreate).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.paymentReports).isSelected(),
			await _CorporationsPages.corporationsPage.SG_ACTExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_ACT_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ACT_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ACT_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ACT_Create).isSelected(),
			await _CorporationsPages.corporationsPage.SG_ICTExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_ICT_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ICT_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ICT_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ICT_Create).isSelected(),
			await _CorporationsPages.corporationsPage.SG_BulkGIROCollectionExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_BulkGIROCollection_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_BulkGIROCollection_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_BulkGIROCollection_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_BulkGIROCollection_Create).isSelected(),
			await _CorporationsPages.corporationsPage.SG_PayrollExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_Payroll_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_Payroll_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_Payroll_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_Payroll_Create).isSelected(),
			await _CorporationsPages.corporationsPage.SG_ChequeExpressExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_ChequeExpress_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ChequeExpress_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ChequeExpress_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ChequeExpress_Create).isSelected(),
		]);
		await _CorporationsPages.corporationsPage.backFromEditUserBtn.click();
        await _CorporationsPages.corporationsPage.subsiCloapse.jsClick();
		await _CorporationsPages.corporationsPage.subFunctionAccessLink2.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.paymentReports).isSelected(),
			await _CorporationsPages.corporationsPage.SG_GIROExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_GIRO_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_GIRO_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_GIRO_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_GIRO_Create).isSelected(),
			await _CorporationsPages.corporationsPage.SG_BulkGIROCollectionExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_BulkGIROCollection_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_BulkGIROCollection_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_BulkGIROCollection_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_BulkGIROCollection_Create).isSelected(),
			await _CorporationsPages.corporationsPage.SG_PayrollExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_Payroll_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_Payroll_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_Payroll_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_Payroll_Create).isSelected(),
			await _CorporationsPages.corporationsPage.SG_ChequeExpressExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.SG_ChequeExpress_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ChequeExpress_Temp_View).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ChequeExpress_CreateFromTemp).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.SG_ChequeExpress_Create).isSelected(),
		]);
	});
	//add for IDXP-2019
	it('Create new user-copy from existing user with some condition ', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserId : testData.PA.UAT.loginUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		fullName = "SSMCPUserName" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.NewApprover.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.NewApprover.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.NewApprover.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.NewApprover.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.NewApprover.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.NewApprover.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.NewApprover.dateOfBirth);
		userID = "SSMCPUser" + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		await _UsersPages.UsersPage.copyFromExistingUser.input(testData.PA.copyUserId02);
		await _UsersPages.UsersPage.copyUserSelect1.click();
		//due to copy user will ticked this flag automatically 2025/4/25
		// await _UsersPages.UsersPage.securityTokenDigital.jsClick();
		await _UsersPages.UsersPage.disclaimerSelect.jsClickIfExist();
		await _UsersPages.UsersPage.continueButton.click();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await browser.sleep(3000);
		await new NavigatePages().loginSSM("ASADM1","");
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerSubmitBtn.click();
        await _UsersPages.UsersPage.confirmSubmitBtn.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM("ASADM2","");
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerApproveBtn.click();
        await _UsersPages.UsersPage.approveConfirmMsg.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserIdB : testData.PA.UAT.loginUserIdB, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed)
		]);
		//check payment type in SAM
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.SSMCorporationID);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(userID);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        //check functional access
        await _CorporationsPages.corporationsPage.editPageFunctionAccessLink.click();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.SG_TT_CheckBox).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.CardsAdmin).isNotSelected(),
			await ensure(_CorporationsPages.corporationsPage.CardsHolder).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.managePaynow).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.fileEnquiry).isNotSelected()
		]);
	});

	it('Copy user from action with some condition ', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserId : testData.PA.UAT.loginUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.filterUser.input(testData.PA.copyUserId03);
		await _UsersPages.UsersPage.searchBtn.click();
		await _UsersPages.UsersPage.actionButton.jsClick();
		await _UsersPages.UsersPage.copyUserButton.click();
		fullName = "SSMCPUserName" + generatedID();
		await _UsersPages.UsersPage.createPagefullName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.NewApprover.contactDetails);
		await _UsersPages.UsersPage.mobileCountry.select(testData.NewApprover.mobileCountry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.NewApprover.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.NewApprover.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.NewApprover.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.NewApprover.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.NewApprover.dateOfBirth);
		userID = "SSMCPUser" + generatedID();
		userID = userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
		//due to copy user will ticked this flag automatically 2025/4/25
		// await _UsersPages.UsersPage.securityTokenDigital.jsClick();
		await _UsersPages.UsersPage.disclaimerSelect.jsClickIfExist();
		await _UsersPages.UsersPage.continueButton.click();
		await _UsersPages.UsersPage.submitButton.click();
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.approveUserId : testData.PA.UAT.approveUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.approveButton.click();
        await _UsersPages.UsersPage.approveNowButton.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await browser.sleep(3000);
		await new NavigatePages().loginSSM("ASADM1","");
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerSubmitBtn.click();
        await _UsersPages.UsersPage.confirmSubmitBtn.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM("ASADM2","");
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await _UsersPages.UsersPage.providerApproveBtn.click();
        await _UsersPages.UsersPage.approveConfirmMsg.click();
        await _UsersPages.UsersPage.dismissButton.click();
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserIdB : testData.PA.UAT.loginUserIdB, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(fullName);
		await _UsersPages.UsersPage.requestLink.click();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Completed)
		]);
		//check payment type in SAM
		await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.SSMCorporationID);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.userTab.click();
        await _CorporationsPages.corporationsPage.userIdText.input(userID);
        await _CorporationsPages.corporationsPage.submitButton.jsClick();
        await _CorporationsPages.corporationsPage.newUserDetailLink.click();
        //check functional access
        await _CorporationsPages.corporationsPage.editPageFunctionAccessLink.click();
		await Promise.all([
			await _CorporationsPages.corporationsPage.uploadExpand.click(),
			await ensure(_CorporationsPages.corporationsPage.fileUploadRebatch).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.fileExchangeTradeApprove).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.rollingAccountInspection).isSelected(),
			await ensure(_CorporationsPages.corporationsPage.lmsDashboardInquiryAccess).isSelected()
		]);
	});
})


describe('Allow CSA to view compamy mandate and EBBR', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('Create new administrator-CSA', async function () {
		await new NavigatePages().loginSSM(SIT ? testData.PA.SIT.loginUserId : testData.PA.UAT.loginUserId, SIT ? testData.PA.SIT.loginCompanyId : testData.PA.UAT.loginCompanyId);
		await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.createNewAdministratorBtn.click();
		//check display 'Create a new administrator (CSA)' page
		await ensure(_UsersPages.UsersPage.newAdministratorPage).isVisible();
		await ensure(_UsersPages.UsersPage.pageHeader).textContains(testData.newAdministrator.createNewAdministratorPageHeader);
		await _UsersPages.UsersPage.viewButton.click();
		//check will display 'Singing mandate' page
		await ensure(_UsersPages.UsersPage.signingMandatePage).isVisible();
		await ensure(_UsersPages.UsersPage.ebbrPageHeader).textContains(testData.newAdministrator.signingMandatePageHeader);
		await _UsersPages.UsersPage.editButton.click();
		//check will display 'Update mandate or authorized signatories' page
		await ensure(_UsersPages.UsersPage.updateMandatePage).isVisible();
		await ensure(_UsersPages.UsersPage.pageHeader).textContains(testData.newAdministrator.updateMandatePageHeader);
		await _UsersPages.UsersPage.gotItBtn.click();
		//check will display 'Singing mandate' page
		await ensure(_UsersPages.UsersPage.signingMandatePage).isVisible();
		await ensure(_UsersPages.UsersPage.ebbrPageHeader).textContains(testData.newAdministrator.signingMandatePageHeader);
	})
	it('Add new account', async function () {
		await _UsersPages.UsersPage.accountSettings.click();
		await _UsersPages.UsersPage.addNewAccountBtn.click();
		//check will display 'Add a new account' page
		await ensure(_UsersPages.UsersPage.addNewAccoutPage).isVisible();
		await ensure(_UsersPages.UsersPage.pageHeader).textContains(testData.newAdministrator.addNewAccountPageHeader);
		await _UsersPages.UsersPage.viewButton.click();
		//check will display 'Singing mandate' page
		await ensure(_UsersPages.UsersPage.signingMandatePage).isVisible();
		await ensure(_UsersPages.UsersPage.ebbrPageHeader).textContains(testData.newAdministrator.signingMandatePageHeader);
	})
})

describe('Supplier Hub Users', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('Check edit supplier hub user request in SAM', async function () {
		await new NavigatePages().loginSAM(testDataSAM.loginSAMID.DBSCM1);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SupplierHub.DBSSG);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.SupplierHub.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SupplierHub.SGAffiliate);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.jsClick();
		await _UsersPages.UsersPage.UserTab.jsClick();
		await _UsersPages.UsersPage.SearchUserId.input(supplierHubUserID);
		await _UsersPages.UsersPage.SearchButn.click();
		await promise.all([
			await ensure(_UsersPages.UsersPage.UserName).textContains(supplierHubUserName),
		]);
		await _CorporationsPages.corporationsPage.UserIdLink.jsClick();
		await Promise.all([
			await ensure(_CorporationsPages.corporationsPage.userIDValue).textContains(supplierHubUserID),
			await ensure(_CorporationsPages.corporationsPage.userNameValue).textContains(supplierHubUserName),
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