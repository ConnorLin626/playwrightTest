import { NavigatePages } from "../../../pages/Navigate";
import {Menu} from "../../../config/menu";
import {ensure, SIT, handlerCase, generatedID, PROJECT_TYPE} from "../../../lib";
import {browser} from "protractor";
import { GroupOverviewPages,UsersPages,CompanyProfilePages } from "../../../pages/SSM";
import { CorporationsPages } from '../../../pages/SamUpgrade';

let _GroupOverviewPage = new GroupOverviewPages();
let _UsersPages = new UsersPages();
let _CorporationsPages = new CorporationsPages();
let _CompanyProfilePages = new CompanyProfilePages();
let testData = _GroupOverviewPage.fetchTestData('SSM_testData.json');
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let _mockData = SIT ? testData.GroupOverview.SIT : testData.GroupOverview.UAT;
let policyName = "";
let newGroupName = "";
let oldGroupName = "";

describe('SSM Company tab', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {await new NavigatePages().loginSSM( SIT ? testData.GroupOverview.SIT.loginUserId : testData.GroupOverview.UAT.loginUserId, SIT ? testData.GroupOverview.SIT.loginCompanyId : testData.GroupOverview.UAT.loginCompanyId)});	
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this,PROJECT_TYPE.SSM); });

	it('Check Company setting page', async function () {
		await _GroupOverviewPage.GroupOverviewPage.menuCompanyButton.click();
		await _GroupOverviewPage.GroupOverviewPage.menuGroupOverView.click();
		await _GroupOverviewPage.GroupOverviewPage.loadConditionforGroupOverviewpage();
		await _GroupOverviewPage.GroupOverviewPage.ClickSubCompany.jsClick();
		await _GroupOverviewPage.GroupOverviewPage.loadCondition();
		
		await Promise.all([
			await ensure(_GroupOverviewPage.GroupOverviewPage.orgId).textContains(SIT ? testData.GroupOverview.SIT.orgId : testData.GroupOverview.UAT.orgId),
			await ensure(_GroupOverviewPage.GroupOverviewPage.companyName).textContains(SIT ? testData.GroupOverview.SIT.companyName : testData.GroupOverview.UAT.companyName),
		])
	
		await _GroupOverviewPage.GroupOverviewPage.ViewDetailsButton.click();
		await _GroupOverviewPage.GroupOverviewPage.loadConditionforFilterPayee();
		await _GroupOverviewPage.GroupOverviewPage.filterPayee.input(_mockData.accountNumber);
		
		await Promise.all([
			await ensure(_GroupOverviewPage.GroupOverviewPage.accountNumber).textContains(_mockData.accountNumber),
		])
	})

});

describe('Subsi company profile', async function () {
    this.retries(browser.params.caseRetryTimes);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });
    before(async function () {await new NavigatePages().loginSSM(SIT ? testData.SubsiCompanyProfile.SIT.loginUserId : testData.SubsiCompanyProfile.UAT.loginUserId, SIT ? testData.SubsiCompanyProfile.SIT.loginCompanyId : testData.SubsiCompanyProfile.UAT.loginCompanyId);});

    it('Create new policy - Cash management - File total', async function () {
        await _GroupOverviewPage.GroupOverviewPage.menuCompanyButton.click();
        await _GroupOverviewPage.GroupOverviewPage.menuGroupOverView.click();
        await _GroupOverviewPage.GroupOverviewPage.ClickSubCompany.click();
        await _GroupOverviewPage.GroupOverviewPage.ApproverPolicyBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.CreatePolicyBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.cashManBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.loadConditionforNewCashManagementPolicy();
        policyName = 'Apolicy' + generatedID();
        await _GroupOverviewPage.GroupOverviewPage.policyName.input(policyName);
        await _GroupOverviewPage.GroupOverviewPage.policyDescription.input(testData.SubsiCompanyProfile.policyDescription);
        await _GroupOverviewPage.GroupOverviewPage.FilesBtn.click();
		await _GroupOverviewPage.GroupOverviewPage.maxAmount.input(testData.SubsiCompanyProfile.toAmount);
		await _GroupOverviewPage.GroupOverviewPage.groupSelect.select(testData.SubsiCompanyProfile.group);
        await _GroupOverviewPage.GroupOverviewPage.continueBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.submitButton.click();
        await _UsersPages.UsersPage.dashboardButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.click();
        await Promise.all([
           await ensure(_GroupOverviewPage.GroupOverviewPage.viewPolicyName).textContains(policyName),
           await ensure(_GroupOverviewPage.GroupOverviewPage.requestStatus).textContains(testData.status.PendingApproval),
           await ensure(_GroupOverviewPage.GroupOverviewPage.approvalPolicy).textContains(testData.SubsiCompanyProfile.approvalPolicy),
           await ensure(_GroupOverviewPage.GroupOverviewPage.currency).textContains(testData.SubsiCompanyProfile.currency),
           await ensure(_GroupOverviewPage.GroupOverviewPage.amountValue).textContains(testData.SubsiCompanyProfile.amountValue),
           await ensure(_GroupOverviewPage.GroupOverviewPage.groupName).textContains(testData.SubsiCompanyProfile.group),
       ]);
    })

    it('approve new policy - Cash management - File total', async function () {
        await _GroupOverviewPage.GroupOverviewPage.approveBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.getChallengeBtn.click()
        await _GroupOverviewPage.GroupOverviewPage.responseCode.input(testData.SubsiCompanyProfile.responseCode)
        await _GroupOverviewPage.GroupOverviewPage.confirmApproveBtn.click();
        await _UsersPages.UsersPage.dismissButton.click();
        await browser.sleep(5000);
        await new NavigatePages().loginSSM(SIT ? testData.SubsiCompanyProfile.SIT.approveUser : testData.SubsiCompanyProfile.UAT.approveUser, SIT ? testData.SubsiCompanyProfile.SIT.loginCompanyId : testData.SubsiCompanyProfile.UAT.loginCompanyId);
        await _UsersPages.UsersPage.dashboardButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await Promise.all([
            await ensure(_GroupOverviewPage.GroupOverviewPage.requestStatus).textContainsLessOne(testData.status.Completed, testData.status.Pendingbankprocessing,testData.status.Approved),
        ]);
        //Check on SAM
        await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.CorporationID02);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.paLink.click();
        await _CorporationsPages.corporationsPage.topPolicylink.click();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.profileNameValue).textContains(policyName),
            await ensure(_CorporationsPages.corporationsPage.currency).textContains(testData.SubsiCompanyProfile.currency),
            await ensure(_CorporationsPages.corporationsPage.minAmountValue).textContains(testData.SubsiCompanyProfile.minAmount),
            await ensure(_CorporationsPages.corporationsPage.maxAmountValue).textContains(testData.SubsiCompanyProfile.maxAmount),
            await ensure(_CorporationsPages.corporationsPage.profileAuthorizationLevelsValue).textContains(testData.SubsiCompanyProfile.group),
        ]);
        //delete policy
        await new NavigatePages().loginSSM(SIT ? testData.SubsiCompanyProfile.SIT.loginUserId : testData.SubsiCompanyProfile.UAT.loginUserId, SIT ? testData.SubsiCompanyProfile.SIT.loginCompanyId : testData.SubsiCompanyProfile.UAT.loginCompanyId);
        await _GroupOverviewPage.GroupOverviewPage.menuCompanyButton.click();
        await _GroupOverviewPage.GroupOverviewPage.menuGroupOverView.click();
        await _GroupOverviewPage.GroupOverviewPage.ClickSubCompany.click();
        await _GroupOverviewPage.GroupOverviewPage.ApproverPolicyBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.topPolicyAction.click();
        await _GroupOverviewPage.GroupOverviewPage.deleteAction.click();
        await _GroupOverviewPage.GroupOverviewPage.deleteDialogBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.dismissButton.click();
        await _UsersPages.UsersPage.dashboardButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.click();
        await _GroupOverviewPage.GroupOverviewPage.approveBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.getChallengeBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.responseCode.input(testData.SubsiCompanyProfile.responseCode);
        await _GroupOverviewPage.GroupOverviewPage.confirmApproveBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.dismissButton.click();
    });

    it('Modify verify group', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.SubsiCompanyProfile.SIT.loginUserId : testData.SubsiCompanyProfile.UAT.loginUserId, SIT ? testData.SubsiCompanyProfile.SIT.loginCompanyId : testData.SubsiCompanyProfile.UAT.loginCompanyId);
        await _GroupOverviewPage.GroupOverviewPage.menuCompanyButton.click();
        await _GroupOverviewPage.GroupOverviewPage.menuGroupOverView.click();
        await _GroupOverviewPage.GroupOverviewPage.ClickSubCompany.click();
        await _GroupOverviewPage.GroupOverviewPage.approvalgroupsTab.click();
        await _GroupOverviewPage.GroupOverviewPage.loadapprovalgroupsTab();
        await _GroupOverviewPage.GroupOverviewPage.companygroupfilterTxt.input(testData.SubsiCompanyProfile.verifyGroup);
        await _GroupOverviewPage.GroupOverviewPage.actionBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.editBtn.click();
        await _CompanyProfilePages.approvalGrouppage.groupnameTxt.getText().then(text => {
            oldGroupName = text.trim();
        });
        await _GroupOverviewPage.GroupOverviewPage.groupnameTxt.clean(); 
        newGroupName = 'VerifyG'+generatedID();
        await _GroupOverviewPage.GroupOverviewPage.groupnameTxt.input(newGroupName);
        await _GroupOverviewPage.GroupOverviewPage.userDropdownList.click();
        await _GroupOverviewPage.GroupOverviewPage.groupDropDownLabelBtn01.click();
        await _GroupOverviewPage.GroupOverviewPage.groupDropDownLabelBtn02.click();
        await _GroupOverviewPage.GroupOverviewPage.continueBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.submitBtn.click();
        await _UsersPages.UsersPage.dashboardButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(oldGroupName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await Promise.all([
            await ensure(_GroupOverviewPage.GroupOverviewPage.groupNameTxt).textContains(newGroupName),
            await ensure(_GroupOverviewPage.GroupOverviewPage.groupTypeTxt).textContains(testData.SubsiCompanyProfile.groupType),
            await ensure(_GroupOverviewPage.GroupOverviewPage.groupUsersTxt).textContains(testData.SubsiCompanyProfile.groupUser),
        ]);
    });

    it('approve modify verify group request', async function () {
        await _GroupOverviewPage.GroupOverviewPage.approveBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.getChallengeBtn.click()
        await _GroupOverviewPage.GroupOverviewPage.responseCode.input(testData.SubsiCompanyProfile.responseCode)
        await _GroupOverviewPage.GroupOverviewPage.confirmApproveBtn.click();
        await _UsersPages.UsersPage.dismissButton.click();
        await browser.sleep(3000);
        await new NavigatePages().loginSSM(SIT ? testData.SubsiCompanyProfile.SIT.approveUser : testData.SubsiCompanyProfile.UAT.approveUser, SIT ? testData.SubsiCompanyProfile.SIT.loginCompanyId : testData.SubsiCompanyProfile.UAT.loginCompanyId);
        await _UsersPages.UsersPage.dashboardButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(oldGroupName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await Promise.all([
            await ensure(_GroupOverviewPage.GroupOverviewPage.requestStatus).textContainsLessOne(testData.status.Completed, testData.status.Pendingbankprocessing,testData.status.Approved),
        ]);
        //Check on SAM
        await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.CorporationID02);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.paLink.click();
        await ensure(_CorporationsPages.corporationsPage.verifyGroupType).textContains("Verifier Group"),
        await _CorporationsPages.corporationsPage.verifyGroupLink.click();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.groupName).textContains(newGroupName),
            await ensure(_CorporationsPages.corporationsPage.groupUsersValue).textContains("AUTOSSM1S02")
        ]);
        //reset the verify group user
        await new NavigatePages().loginSSM(SIT ? testData.SubsiCompanyProfile.SIT.loginUserId : testData.SubsiCompanyProfile.UAT.loginUserId, SIT ? testData.SubsiCompanyProfile.SIT.loginCompanyId : testData.SubsiCompanyProfile.UAT.loginCompanyId);
        await _GroupOverviewPage.GroupOverviewPage.menuCompanyButton.click();
        await _GroupOverviewPage.GroupOverviewPage.menuGroupOverView.click();
        await _GroupOverviewPage.GroupOverviewPage.ClickSubCompany.click();
        await _GroupOverviewPage.GroupOverviewPage.approvalgroupsTab.click();
        await _GroupOverviewPage.GroupOverviewPage.loadapprovalgroupsTab();
        await _GroupOverviewPage.GroupOverviewPage.companygroupfilterTxt.input(testData.SubsiCompanyProfile.verifyGroup);
        await _GroupOverviewPage.GroupOverviewPage.actionBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.editBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.userDropdownList.click();
        await _GroupOverviewPage.GroupOverviewPage.groupDropDownLabelBtn01.click();
        await _GroupOverviewPage.GroupOverviewPage.groupDropDownLabelBtn02.click();
        await _GroupOverviewPage.GroupOverviewPage.continueBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.submitBtn.click();
        await _UsersPages.UsersPage.dashboardButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(newGroupName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await _GroupOverviewPage.GroupOverviewPage.approveBtn.click();
        await _GroupOverviewPage.GroupOverviewPage.getChallengeBtn.click()
        await _GroupOverviewPage.GroupOverviewPage.responseCode.input(testData.SubsiCompanyProfile.responseCode)
        await _GroupOverviewPage.GroupOverviewPage.confirmApproveBtn.click();
        await _UsersPages.UsersPage.dismissButton.click();
    });


})