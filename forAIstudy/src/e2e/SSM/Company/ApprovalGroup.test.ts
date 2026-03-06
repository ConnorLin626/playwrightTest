/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { CompanyProfilePages,UsersPages } from '../../../pages/SSM';
import { saveScreen, ensure, handlerCase, SIT,generatedID, PROJECT_TYPE } from '../../../lib';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { browser } from 'protractor';

let _CompanyProfilePages = new CompanyProfilePages();
let _CorporationsPages = new CorporationsPages();
let _UsersPages = new UsersPages();
let testData = _CompanyProfilePages.fetchTestData('SSM_testData.json');
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let _mockData = SIT ? testData.ApprovalGroup.SIT : testData.ApprovalGroup.UAT;
let Groupname = "";
let GroupName1 ="";
let NewGroupname = 'Ng' + generatedID();
describe('SSM Company tab - Approval Group', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginSSM(SIT ? testData.ApprovalGroup.SIT.loginUserId : testData.ApprovalGroup.UAT.loginUserId,SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId)});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this,PROJECT_TYPE.SSM); });

   it('Create a New Approval Group - Approver group', async function () {
        await _CompanyProfilePages.approvalGrouppage.companyMenu.click();
        await _CompanyProfilePages.approvalGrouppage.companyProfileMenu.click();
        await _CompanyProfilePages.approvalGrouppage.loadCondition();
        await _CompanyProfilePages.approvalGrouppage.approvalgroupsTab.click();
        await _CompanyProfilePages.approvalGrouppage.loadapprovalgroupsTab();
        await _CompanyProfilePages.approvalGrouppage.createNewgroupBtn.click();
        await _CompanyProfilePages.approvalGrouppage.loadcontinueBtn();
        Groupname = 'Ng' + generatedID();
        await _CompanyProfilePages.approvalGrouppage.groupnameTxt.input(Groupname);
        await _CompanyProfilePages.approvalGrouppage.groupApprover.jsClick();
        await _CompanyProfilePages.approvalGrouppage.selectDropdownBtn.click();
        await _CompanyProfilePages.approvalGrouppage.groupDropDownLabelBtn.jsClick();
        await _CompanyProfilePages.approvalGrouppage.continueBtn.click();
        await _CompanyProfilePages.approvalGrouppage.loadsubmitBtn();
        await _CompanyProfilePages.approvalGrouppage.submitBtn.click();
        await _CompanyProfilePages.approvalGrouppage.loadfinishBtn();
    
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.groupNameTxt).textContains(Groupname),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupTypeTxt).textContains(_mockData.Grouptype),
        ]);
        await _CompanyProfilePages.approvalGrouppage.finishBtn.click();

        await _CompanyProfilePages.approvalGrouppage.menuDashboardTab.click();
        await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(Groupname);
        await _CompanyProfilePages.approvalGrouppage.newaddgroupBtn.jsClick();
        await _CompanyProfilePages.approvalGrouppage.loadConditionForViewPage();
   
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.groupNameTxt).textContains(Groupname),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupTypeTxt).textContains(_mockData.Grouptype),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupUsersTxt).textContains(_mockData.GroupUsers),
        ]);
    });

  it('Approve the new group request', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalGroup.SIT.approveUser : testData.ApprovalGroup.UAT.approveUser,SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId);
        await _CompanyProfilePages.approvalGrouppage.menuDashboardTab.click();
        await _CompanyProfilePages.approvalGrouppage.myapprovalTab.click();
        await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(Groupname);
        await _CompanyProfilePages.approvalGrouppage.newaddgroupBtn.jsClick();
        await _CompanyProfilePages.approvalGrouppage.loadConditionForViewPage();
        await _CompanyProfilePages.approvalGrouppage.approveBtn.click();
        await _CompanyProfilePages.approvalGrouppage.loadcanceldialogBtn();
        await _CompanyProfilePages.approvalGrouppage.getchallengeBtn.click();
        await _CompanyProfilePages.approvalGrouppage.responseCodeTxt.input("123123");
        await _CompanyProfilePages.approvalGrouppage.approvedialogBtn.click();
        await _CompanyProfilePages.approvalGrouppage.dismissdialogBtn.click();
        await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(Groupname);
        await _CompanyProfilePages.approvalGrouppage.newaddgroupBtn.jsClick();
        await _CompanyProfilePages.approvalGrouppage.loadConditionForViewPage();

        await Promise.all([
             await ensure(_CompanyProfilePages.approvalGrouppage.statusTxt).textContainsLessOne(testData.status.Pendingbankprocessing, testData.status.Completed,testData.status.Approved),
             await ensure(_CompanyProfilePages.approvalGrouppage.groupNameTxt).textContains(Groupname),
             await ensure(_CompanyProfilePages.approvalGrouppage.groupTypeTxt).textContains(_mockData.Grouptype),
             await ensure(_CompanyProfilePages.approvalGrouppage.groupUsersTxt).textContains(_mockData.GroupUsers),
         ]);
        //wait create new group process
        await browser.sleep(10000);
        //Check on SAM
        await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliateVN);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
		await _CorporationsPages.corporationsPage.paLink.click();
        await Promise.all([
            await ensure(_CorporationsPages.corporationsPage.allGroup).textContains(Groupname),
        ]);

    });
   
    it('Modify group', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalGroup.SIT.loginUserId : testData.ApprovalGroup.UAT.loginUserId,SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId)
        await _CompanyProfilePages.approvalGrouppage.companyMenu.click();
        await _CompanyProfilePages.approvalGrouppage.companyProfileMenu.click();
        await _CompanyProfilePages.approvalGrouppage.loadCondition();
        await _CompanyProfilePages.approvalGrouppage.approvalgroupsTab.click();
        await _CompanyProfilePages.approvalGrouppage.loadapprovalgroupsTab();
        if (0 !== Groupname.trim().length) {
            await _CompanyProfilePages.approvalGrouppage.companygroupfilterTxt.input(Groupname);
        }else{
            await _CompanyProfilePages.approvalGrouppage.companygroupfilterTxt.input(_mockData.GroupName);
        }
        await _CompanyProfilePages.approvalGrouppage.companygroupfilterTxt.getText().then(text => {
            GroupName1 = text.trim();
        });
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.filtergroupNameTxt).textContains(GroupName1),
            await ensure(_CompanyProfilePages.approvalGrouppage.filtergroupTypeTxt).textContains(_mockData.Approver),
        ]);
        await _CompanyProfilePages.approvalGrouppage.actionBtn.click();
        await _CompanyProfilePages.approvalGrouppage.editBtn.click();
        await _CompanyProfilePages.approvalGrouppage.groupnameTxt.clean(); 
        await _CompanyProfilePages.approvalGrouppage.groupnameTxt.input(NewGroupname);
        await _CompanyProfilePages.approvalGrouppage.continueBtn.click();
        await _CompanyProfilePages.approvalGrouppage.loadsubmitBtn();
        await _CompanyProfilePages.approvalGrouppage.submitBtn.click();
        await _CompanyProfilePages.approvalGrouppage.loadfinishBtn();

         await Promise.all([
             await ensure(_CompanyProfilePages.approvalGrouppage.groupNameTxt).textContains(NewGroupname),
             await ensure(_CompanyProfilePages.approvalGrouppage.groupTypeTxt).textContains(_mockData.Grouptype),
             await ensure(_CompanyProfilePages.approvalGrouppage.groupUsersTxt).textContains(_mockData.GroupUsers),
         ]);
         await _CompanyProfilePages.approvalGrouppage.finishBtn.click();
         await _UsersPages.UsersPage.dashboardButton.click();
         await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(GroupName1);
         await _CompanyProfilePages.approvalGrouppage.newaddgroupBtn.click();
         await _CompanyProfilePages.approvalGrouppage.loadConditionForViewPage();

         await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.groupNameTxt).textContains(NewGroupname),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupTypeTxt).textContains(_mockData.Grouptype),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupUsersTxt).textContains(_mockData.GroupUsers),
        ]);
    });
    
    it('Approve the modify group', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalGroup.SIT.approveUser : testData.ApprovalGroup.UAT.approveUser,SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId);
        await _CompanyProfilePages.approvalGrouppage.menuDashboardTab.click();
        await _CompanyProfilePages.approvalGrouppage.myapprovalTab.click();
        await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(GroupName1);
        await _CompanyProfilePages.approvalGrouppage.newaddgroupBtn.jsClick();
        await _CompanyProfilePages.approvalGrouppage.loadConditionForViewPage();
        await _CompanyProfilePages.approvalGrouppage.approveBtn.click();
        await _CompanyProfilePages.approvalGrouppage.loadcanceldialogBtn();
        await _CompanyProfilePages.approvalGrouppage.getchallengeBtn.click();
        await _CompanyProfilePages.approvalGrouppage.responseCodeTxt.input("123123");
        await _CompanyProfilePages.approvalGrouppage.approvedialogBtn.click();
        await _CompanyProfilePages.approvalGrouppage.dismissdialogBtn.click();
        await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(GroupName1);
        await _CompanyProfilePages.approvalGrouppage.newaddgroupBtn.jsClick();
        await _CompanyProfilePages.approvalGrouppage.loadConditionForViewPage();

         await Promise.all([
             await ensure(_CompanyProfilePages.approvalGrouppage.statusTxt).textContainsLessOne(testData.status.Pendingbankprocessing, testData.status.Completed,testData.status.Approved),
             await ensure(_CompanyProfilePages.approvalGrouppage.groupNameTxt).textContains(NewGroupname),
         ]);
         //Check on SAM
         await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
         await _CorporationsPages.corporationsPage.topCorporationsLink.click();
         await _CorporationsPages.corporationsPage.loadCorporationCondition();
         await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliateVN);
         await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
         await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
         await _CorporationsPages.corporationsPage.inputAffiliate.input(SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId);
         await _CorporationsPages.corporationsPage.searchCorpButton.click();
         await _CorporationsPages.corporationsPage.viewCorpLink.click();
         await _CorporationsPages.corporationsPage.paLink.click();
         await Promise.all([
             await ensure(_CorporationsPages.corporationsPage.allGroup).textContains(NewGroupname),
         ]);
    })

     it('Delete group', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalGroup.SIT.loginUserId : testData.ApprovalGroup.UAT.loginUserId,SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId)
        await _CompanyProfilePages.approvalGrouppage.companyMenu.click();
        await _CompanyProfilePages.approvalGrouppage.companyProfileMenu.click();
        await _CompanyProfilePages.approvalGrouppage.loadCondition();
        await _CompanyProfilePages.approvalGrouppage.approvalgroupsTab.click();
        await _CompanyProfilePages.approvalGrouppage.loadapprovalgroupsTab();
        await _CompanyProfilePages.approvalGrouppage.companygroupfilterTxt.input(NewGroupname);
        await _CompanyProfilePages.approvalGrouppage.actionBtn.click();
        await _CompanyProfilePages.approvalGrouppage.deleteactionBtn.click();
        await _CompanyProfilePages.approvalGrouppage.deletedialogBtn.click();
        await _CompanyProfilePages.approvalGrouppage.dismissdialogBtn.click();
        await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(NewGroupname);
        console.log(NewGroupname)
        await _CompanyProfilePages.approvalGrouppage.newaddgroupBtn.click();
        await _CompanyProfilePages.approvalGrouppage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.statusTxt).textContains(_mockData.Pendingapproval),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupNameTxt).textContains(NewGroupname),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupTypeTxt).textContains(_mockData.Grouptype),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupUsersTxt).textContains(_mockData.GroupUsers),
        ]);
     })

     it('Approve the Delete group request', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalGroup.SIT.approveUser : testData.ApprovalGroup.UAT.approveUser,SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId);
        await _CompanyProfilePages.approvalGrouppage.menuDashboardTab.click();
        await _CompanyProfilePages.approvalGrouppage.myapprovalTab.click();
        await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(NewGroupname);
        await _UsersPages.UsersPage.requestCheckBox.jsClick();
        await _UsersPages.UsersPage.approveButton.click();
        await _CompanyProfilePages.approvalGrouppage.loadcanceldialogBtn();
        await _CompanyProfilePages.approvalGrouppage.getchallengeBtn.click();
        await _CompanyProfilePages.approvalGrouppage.responseCodeTxt.input("123123");
        await _CompanyProfilePages.approvalGrouppage.approvedialogBtn.click();
        await _CompanyProfilePages.approvalGrouppage.dismissdialogBtn.click();
        await _UsersPages.UsersPage.showAllTab.click();
        await _CompanyProfilePages.approvalGrouppage.dashboardfilterTxt.input(NewGroupname);
        await _CompanyProfilePages.approvalGrouppage.newaddgroupBtn.jsClick();
        await _CompanyProfilePages.approvalGrouppage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.statusTxt).textContainsLessOne(testData.status.Pendingbankprocessing, testData.status.Completed,testData.status.Approved),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupNameTxt).textContains(NewGroupname),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupTypeTxt).textContains(_mockData.Grouptype),
            await ensure(_CompanyProfilePages.approvalGrouppage.groupUsersTxt).textContains(_mockData.GroupUsers),
        ]);
        await _CompanyProfilePages.approvalGrouppage.cancelBtn.click();
        await _UsersPages.UsersPage.loadConditionForDashboard();
        await _CompanyProfilePages.approvalGrouppage.companyMenu.click();
        await _CompanyProfilePages.approvalGrouppage.companyProfileMenu.click();
        await _CompanyProfilePages.approvalGrouppage.loadCondition();
        await _CompanyProfilePages.approvalGrouppage.approvalgroupsTab.click();
        await _CompanyProfilePages.approvalGrouppage.loadapprovalgroupsTab();
        await _CompanyProfilePages.approvalGrouppage.companygroupfilterTxt.input(NewGroupname);
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.filterResult).textContains('No data to display'),
        ])
        //Check on SAM
        await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
         await _CorporationsPages.corporationsPage.topCorporationsLink.click();
         await _CorporationsPages.corporationsPage.loadCorporationCondition();
         await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliateVN);
         await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
         await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
         await _CorporationsPages.corporationsPage.inputAffiliate.input(SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId);
         await _CorporationsPages.corporationsPage.searchCorpButton.click();
         await _CorporationsPages.corporationsPage.viewCorpLink.click();
         await _CorporationsPages.corporationsPage.paLink.click();
         await Promise.all([
             await ensure(_CorporationsPages.corporationsPage.allGroup).textNotContains(NewGroupname),
         ]);
     })

     it('Fliter group', async function () {
        await new NavigatePages().loginSSM(SIT ? testData.ApprovalGroup.SIT.loginUserId : testData.ApprovalGroup.UAT.loginUserId,SIT ? testData.ApprovalGroup.SIT.loginCompanyId: testData.ApprovalGroup.UAT.loginCompanyId)
        await _CompanyProfilePages.approvalGrouppage.companyMenu.click();
        await _CompanyProfilePages.approvalGrouppage.companyProfileMenu.click();
        await _CompanyProfilePages.approvalGrouppage.loadCondition();
        await _CompanyProfilePages.approvalGrouppage.approvalgroupsTab.click();
        await _CompanyProfilePages.approvalGrouppage.loadapprovalgroupsTab();
        await _CompanyProfilePages.approvalGrouppage.companygroupfilterTxt.input(_mockData.GroupA);
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.filtergroupNameTxt).textContains(_mockData.GroupA),
        ]);
        await _CompanyProfilePages.approvalGrouppage.companygroupfilterTxt.clean();
        await _CompanyProfilePages.approvalGrouppage.companygroupfilterTxt.input(_mockData.approveUser);
        await Promise.all([
            await ensure(_CompanyProfilePages.approvalGrouppage.userValue).textContains(_mockData.approveUser),
        ]);
    })
});