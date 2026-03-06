/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { CompanyProfilePages, UsersPages} from '../../../pages/SSM';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { ensure, handlerCase, SIT, generatedID ,PROJECT_TYPE} from '../../../lib';
import { browser, promise } from 'protractor';

let _CompanyProfilePages = new CompanyProfilePages();
let _UsersPages = new UsersPages();
let policyName = "";
let TraPolicyName = "";
let modifyPolicyName ="";
let _CorporationsPages = new CorporationsPages();
let testData = _CompanyProfilePages.fetchTestData('SSM_testData.json');
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

describe('SSM Company tab - Approval Policy', async function () {
    this.retries(browser.params.caseRetryTimes);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });
    before(async function () {await new NavigatePages().loginSSM(SIT ? testData.ApprovalPolicies.SIT.loginUserId : testData.ApprovalPolicies.UAT.loginUserId, SIT ? testData.ApprovalPolicies.SIT.loginCompanyId : testData.ApprovalPolicies.UAT.loginCompanyId);});
    
    it('Create a New Approval Policy - Cash Management', async function () {
        await _UsersPages.UsersPage.loadConditionRequest();
        await _CompanyProfilePages.companyProfilePage.companyMenu.click();
        await _CompanyProfilePages.companyProfilePage.companyProfileMenu.click();
        await _CompanyProfilePages.companyProfilePage.loadCondition();
        await _CompanyProfilePages.approvalPoliciesPage.approvalePolicies.click();
        await _CompanyProfilePages.approvalPoliciesPage.createPolicyBtn.click();
        await _CompanyProfilePages.approvalPoliciesPage.cashManBtn.click();
        await _CompanyProfilePages.approvalPoliciesPage.loadCondition();
        policyName = 'policy' + generatedID();
        await _CompanyProfilePages.approvalPoliciesPage.policyName.input(policyName);
        await _CompanyProfilePages.approvalPoliciesPage.policyDescription.input(testData.ApprovalPolicies.policyDescription);
        await _CompanyProfilePages.approvalPoliciesPage.paymentShowOption.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.paymentCheckbox1.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.paymentCheckbox2.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.payrollShowOption.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.payrollCheckbox1.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.toAmount.input(testData.ApprovalPolicies.toAmount)
        await _CompanyProfilePages.approvalPoliciesPage.groupSelect.select(testData.ApprovalPolicies.group);
        await _CompanyProfilePages.approvalPoliciesPage.nextButton.click();
        await _CompanyProfilePages.approvalPoliciesPage.submitButton.click();
        await _UsersPages.UsersPage.dashboardButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.click();
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalPoliciesPage.viewPolicyName).textContains(policyName),
            await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.approvalPolicy).textContains(testData.ApprovalPolicies.approvalPolicy),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.currency).textContains(testData.ApprovalPolicies.currency),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.amountValue).textContains(testData.ApprovalPolicies.amountValue),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.viewPaymentType).textContains(testData.ApprovalPolicies.paymentType),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.paymentCheckbox2).textContains(testData.ApprovalPolicies.paymentType1),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.payrollCheckbox1).textContains(testData.ApprovalPolicies.payrollType),
        ]);
    });

    it('Approve a New Approval Policy - Cash Management', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalPolicies.SIT.approveUser : testData.ApprovalPolicies.UAT.approveUser, SIT ? testData.ApprovalPolicies.SIT.loginCompanyId : testData.ApprovalPolicies.UAT.loginCompanyId);
        await _UsersPages.UsersPage.dashboardButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.approveBtn.click();
        await _CompanyProfilePages.approvalPoliciesPage.getChallengeBtn.click()
        await _CompanyProfilePages.approvalPoliciesPage.responseCode.input(testData.ApprovalPolicies.responseCode)
        await _CompanyProfilePages.approvalPoliciesPage.confirmApproveBtn.click();
        await _UsersPages.UsersPage.dismissButton.click();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.loadConditionForViewRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await Promise.all([
            await ensure(_UsersPages.UsersPage.requestStatus).textContainsLessOne(testData.status.Completed, testData.status.Pendingbankprocessing,testData.status.Approved),
        ]);
        //Check on SAM
        await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.CorporationID);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.paLink.click();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.allGroup).textNotContains(policyName)
        ]);

    });

    it('Modify policy', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalPolicies.SIT.loginUserId : testData.ApprovalPolicies.UAT.loginUserId, SIT ? testData.ApprovalPolicies.SIT.loginCompanyId : testData.ApprovalPolicies.UAT.loginCompanyId);
        await _UsersPages.UsersPage.loadConditionRequest();
        await _CompanyProfilePages.companyProfilePage.companyMenu.click();
        await _CompanyProfilePages.companyProfilePage.companyProfileMenu.click();
        await _CompanyProfilePages.companyProfilePage.loadCondition();
        await _CompanyProfilePages.approvalPoliciesPage.approvalePolicies.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.modifySeardch.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.filterInput.input(policyName);
        await _CompanyProfilePages.approvalPoliciesPage.loadConditiontPolicy();
        await _CompanyProfilePages.approvalPoliciesPage.actionButton.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.modifyPolicyBtn.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.loadConditionEditPolicy();
        let modifyPolicyName= "Modify" + generatedID();
        await _CompanyProfilePages.approvalPoliciesPage.policyName.clean();
        await _CompanyProfilePages.approvalPoliciesPage.policyName.input(modifyPolicyName);
        let PolicyDescr = 'ModPoldDes' + generatedID();
        await _CompanyProfilePages.approvalPoliciesPage.policyDescription.clean();
        await _CompanyProfilePages.approvalPoliciesPage.policyDescription.input(PolicyDescr);
        await _CompanyProfilePages.approvalPoliciesPage.Continue.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.loadConditionPrevPolicy();
        await _CompanyProfilePages.approvalPoliciesPage.Submit.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.loadConditionSubPolicy();
        await _CompanyProfilePages.approvalPoliciesPage.Finish.click();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.dashboardFilter.input(modifyPolicyName);
        await _UsersPages.UsersPage.RequestLink.jsClick();
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalPoliciesPage.requestStatus).textContains(testData.status.PendingApproval),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.viewPolicyName).textContains(modifyPolicyName),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.approvalPolicy).textContains(testData.ApprovalPolicies.approvalPolicy),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.currency).textContains(testData.ApprovalPolicies.currency),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.policyDescriptionView).textContains(PolicyDescr),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.viewPaymentType).isNotEmpty()
        ]);
    });

    it('Filter by policy name', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalPolicies.SIT.loginUserId : testData.ApprovalPolicies.UAT.loginUserId, SIT ? testData.ApprovalPolicies.SIT.loginCompanyId : testData.ApprovalPolicies.UAT.loginCompanyId);
        await _UsersPages.UsersPage.loadConditionRequest();
        await _CompanyProfilePages.companyProfilePage.companyMenu.click();
        await _CompanyProfilePages.companyProfilePage.companyProfileMenu.click();
        await _CompanyProfilePages.companyProfilePage.loadCondition();
        await _CompanyProfilePages.approvalPoliciesPage.approvalePolicies.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.modifySeardch.jsClick();
        await browser.sleep(5000);
        await _CompanyProfilePages.approvalPoliciesPage.filterInput.input(policyName);
        await _CompanyProfilePages.approvalPoliciesPage.loadConditiontPolicy();
    })

    it('Create Delete policy request', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalPolicies.SIT.loginUserId : testData.ApprovalPolicies.UAT.loginUserId, SIT ? testData.ApprovalPolicies.SIT.loginCompanyId : testData.ApprovalPolicies.UAT.loginCompanyId);
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _CompanyProfilePages.companyProfilePage.companyMenu.click();
        await _CompanyProfilePages.companyProfilePage.companyProfileMenu.click();
        await _CompanyProfilePages.companyProfilePage.loadCondition();
        await _CompanyProfilePages.approvalPoliciesPage.approvalePolicies.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.modifySeardch.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.filterInput.input(policyName);
        await _CompanyProfilePages.approvalPoliciesPage.loadConditiontPolicy();
        await _CompanyProfilePages.approvalPoliciesPage.actionButton.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.deletePolcyBtn.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.deleteDialogBtn.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.dismissBtn.jsClick();
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.requestLink.jsClick();
        await _UsersPages.UsersPage.loadConditionViewRequest();
        await promise.all([
            await ensure(_UsersPages.UsersPage.requestStatus).textContains(testData.status.PendingApproval),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.viewPolicyName).textContains(policyName),
        ]);
    });

    it('Approve the Delete policy request', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalPolicies.SIT.approveUser : testData.ApprovalPolicies.UAT.approveUser, SIT ? testData.ApprovalPolicies.SIT.loginCompanyId : testData.ApprovalPolicies.UAT.loginCompanyId);
        await _UsersPages.UsersPage.Dasgboardmenu.click();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.MyApproveTab.jsClick();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await _UsersPages.UsersPage.loadConditionViewRequest();
        await _UsersPages.UsersPage.approveButton.jsClick();
        await _UsersPages.UsersPage.challengeResponse.jsClick();
        await _UsersPages.UsersPage.responseCode.input(testData.ApprovalPolicies.responseCode);
        await _UsersPages.UsersPage.approveRequestBtn.jsClick();
        await _UsersPages.UsersPage.dismissBtn.jsClick();
        await browser.sleep(5000);
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalPolicies.SIT.approveUser : testData.ApprovalPolicies.UAT.approveUser, SIT ? testData.ApprovalPolicies.SIT.loginCompanyId : testData.ApprovalPolicies.UAT.loginCompanyId);
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _UsersPages.UsersPage.dashboardFilter.input(policyName);
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await _UsersPages.UsersPage.loadConditionViewRequest();
        await Promise.all([
            await ensure(_UsersPages.UsersPage.requestStatus).textContainsLessOne(testData.status.Completed, testData.status.Pendingbankprocessing),
        ]);
        await _CompanyProfilePages.companyProfilePage.companyMenu.click();
        await _CompanyProfilePages.companyProfilePage.companyProfileMenu.click();
        await _CompanyProfilePages.companyProfilePage.loadCondition();
        await _CompanyProfilePages.approvalPoliciesPage.approvalePolicies.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.modifySeardch.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.filterInput.input(policyName);
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalPoliciesPage.Result).textIs(testData.ApprovalPolicies.labelNoInformationDisplay)
        ]);
        //Check on SAM
        await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.CorporationID);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.paLink.click();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.allGroup).textNotContains(policyName)
        ]);
    });

    it('Create a New Approval Policy - Trade Finance', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalPolicies.SIT.loginUserId : testData.ApprovalPolicies.UAT.loginUserId, SIT ? testData.ApprovalPolicies.SIT.loginCompanyId : testData.ApprovalPolicies.UAT.loginCompanyId);
        await _UsersPages.UsersPage.loadConditionRequest();
        await _CompanyProfilePages.companyProfilePage.companyMenu.click();
        await _CompanyProfilePages.companyProfilePage.companyProfileMenu.click();
        await _CompanyProfilePages.companyProfilePage.loadCondition();
        await _CompanyProfilePages.approvalPoliciesPage.approvalePolicies.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.createPolicyBtn.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.TradeManBtn.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.loadCondition();
        await _CompanyProfilePages.approvalPoliciesPage.policyName.click();
        TraPolicyName = 'TraPolicy' + generatedID();
        await _CompanyProfilePages.approvalPoliciesPage.policyName.input(TraPolicyName);
        await _CompanyProfilePages.approvalPoliciesPage.policyDescription.input(testData.ApprovalPolicies.policyDescription);
        await _CompanyProfilePages.approvalPoliciesPage.tradeshowOption.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.TradPaymentTypeCheckbox.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.toAmount.input(testData.ApprovalPolicies.toAmount)
        await _CompanyProfilePages.approvalPoliciesPage.groupSelect.select(testData.ApprovalPolicies.group);
        await _CompanyProfilePages.approvalPoliciesPage.Continue.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.loadConditionPrevPolicy();
        await _CompanyProfilePages.approvalPoliciesPage.Submit.jsClick();
        await _CompanyProfilePages.approvalPoliciesPage.loadConditionSubPolicy();
        await _CompanyProfilePages.approvalPoliciesPage.Finish.jsClick();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.dashboardFilter.input(TraPolicyName);
        console.log(TraPolicyName)
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.requestLink.jsClick();
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalPoliciesPage.viewPolicyName).textContains(TraPolicyName),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.requestStatus).textContains(testData.status.PendingApproval),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.approvalPolicy).textContains(testData.ApprovalPolicies.approvalPolicy),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.currency).textContains(testData.ApprovalPolicies.currency),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.amountValue).textContains(testData.ApprovalPolicies.amountValue),
            await ensure(_CompanyProfilePages.approvalPoliciesPage.viewTradPaymentType).textContains(testData.ApprovalPolicies.TradPamementType),
        ]);
    });
});





