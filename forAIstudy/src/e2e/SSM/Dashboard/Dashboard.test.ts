import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";
import { UsersPages } from "../../../pages/SSM";

let _UsersPages = new UsersPages();
let testData = _UsersPages.fetchTestData('SSM_testData.json');
let userID = "";
let fullName = "";


describe('Dashboard tab', async function () {
	this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });

	it('Select Request to Reject', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.Dashboard.SIT.loginUserId : testData.Dashboard.UAT.loginUserId, SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId);
        await createNewUser();
        await new NavigatePages().loginSSM(SIT ? testData.Dashboard.SIT.approveUserId : testData.Dashboard.UAT.approveUserId, SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.MyApproveTab.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.requestCheckBox.jsClick();
		await _UsersPages.UsersPage.rejectBtn.click();
		await _UsersPages.UsersPage.rejectReason.input(testData.Dashboard.rejectReason);
        await _UsersPages.UsersPage.rejectDialogBtn.click();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.showAllTab.click();
		await _UsersPages.UsersPage.dashboardFilter.clean();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
            await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.rejectReasonValue).textContains(testData.Dashboard.rejectReason),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Rejected)
		]);
	});

    it('Reject request on View Page', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.Dashboard.SIT.loginUserId : testData.Dashboard.UAT.loginUserId, SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId);
        await createNewUser();
        await new NavigatePages().loginSSM(SIT ? testData.Dashboard.SIT.approveUserId : testData.Dashboard.UAT.approveUserId, SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.viewRejectBtn.click();
		await _UsersPages.UsersPage.rejectReason.input(testData.Dashboard.rejectReason);
        await _UsersPages.UsersPage.rejectDialogBtn.click();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.loadConditionForViewRequest();
		await _UsersPages.UsersPage.requestLink.jsClick();
		await Promise.all([
			await ensure(_UsersPages.UsersPage.userName).textContains(fullName),
            await ensure(_UsersPages.UsersPage.userID).textContains(userID),
			await ensure(_UsersPages.UsersPage.rejectReasonValue).textContains(testData.Dashboard.rejectReason),
			await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.Rejected)
		]);
	});

    it('Select Request to Delete', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.Dashboard.SIT.loginUserId : testData.Dashboard.UAT.loginUserId, SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId);
        await createNewUser();
        await new NavigatePages().loginSSM(SIT ? testData.Dashboard.SIT.approveUserId : testData.Dashboard.UAT.approveUserId, SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.requestCheckBox.jsClick();
		await _UsersPages.UsersPage.deleteBtn.click();
        await _UsersPages.UsersPage.confirmDeleteButton.click();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await browser.sleep(10000);
		await Promise.all([
			await ensure(_UsersPages.UsersPage.noRecordsFound).textContains(testData.Dashboard.noRecord),
		]);
	});

    it('Delete request on View Page', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.Dashboard.SIT.loginUserId : testData.Dashboard.UAT.loginUserId, SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId);
        await createNewUser();
        await new NavigatePages().loginSSM(SIT ? testData.Dashboard.SIT.approveUserId : testData.Dashboard.UAT.approveUserId, SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId);
		await _UsersPages.UsersPage.dashboardButton.click();
		await _UsersPages.UsersPage.loadConditionRequest();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await _UsersPages.UsersPage.requestLink.jsClick();
		await _UsersPages.UsersPage.deleteBtn.click();
        await _UsersPages.UsersPage.confirmDeleteButton.click();
		await _UsersPages.UsersPage.loadConditionForDismissDialog();
		await _UsersPages.UsersPage.dismissBtn.click();
		await _UsersPages.UsersPage.loadConditionForDashboard();
		await _UsersPages.UsersPage.dashboardFilter.input(userID);
		await Promise.all([
			await ensure(_UsersPages.UsersPage.noRecordsFound).textContains(testData.Dashboard.noRecord),
		]);
	});
});
export async function createNewUser() {
    await _UsersPages.UsersPage.userMenuButton.click();
		await _UsersPages.UsersPage.newUserButton.click();
		await _UsersPages.UsersPage.loadConditionForCreateUserPage();
        fullName = 'newUserName' + generatedID();
		await _UsersPages.UsersPage.userName.input(fullName);
		await _UsersPages.UsersPage.contactDetails.input(testData.Dashboard.EmailAddress);
		await _UsersPages.UsersPage.mobileCountry.select(testData.Dashboard.mobileCtry);
		await _UsersPages.UsersPage.mobileNumber.input(testData.Dashboard.mobileNumber);
		await _UsersPages.UsersPage.nationality.select(testData.Dashboard.nationality);
		await _UsersPages.UsersPage.identityType.select(testData.Dashboard.identityType);
		await _UsersPages.UsersPage.identityNumber.input(testData.Dashboard.identityNumber);
		await _UsersPages.UsersPage.dateOfBirth.select(testData.Dashboard.dateOfBirth);
        userID = 'NEWMUSERID' + generatedID();
        userID =  userID.toUpperCase();
		await _UsersPages.UsersPage.userID.input(userID);
        // await _UsersPages.UsersPage.userID.getText().then(text => {
        //     userID = text.trim();
        // });
        // console.log(userID);
		await _UsersPages.UsersPage.setUpManually.jsClick();
		await _UsersPages.UsersPage.enquiryAccessYes.jsClick();
		await _UsersPages.UsersPage.continueButton.click();
		await _UsersPages.UsersPage.loadConditionEditUserCont();
		await _UsersPages.UsersPage.submitBtn.jsClick();
		await _UsersPages.UsersPage.loadConditionEditUserSubm();
		await _UsersPages.UsersPage.finishBtn.jsClick();
}