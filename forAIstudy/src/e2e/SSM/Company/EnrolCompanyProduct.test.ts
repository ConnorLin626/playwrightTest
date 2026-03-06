/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/IDEALX';
import { UsersPages ,EnrolCompanyProductPages } from '../../../pages/SSM';
import { ensure, handlerCase, SIT,PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import { CorporationsPages } from '../../../pages/SamUpgrade';


let _CompanyProductPages = new EnrolCompanyProductPages();
let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');
let _UsersPages = new UsersPages();
let testData = _CompanyProductPages.fetchTestData('SSM_testData.json');
let giroTicked = false
let actTicked = false
let ttTicked = false

describe('SSM Company tab', async function () {
    this.retries(browser.params.caseRetryTimes);
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SSM); });
    before(async function () {await new NavigatePages().loginSSM(testData.EnrolCompanyProduct.SIT.loginUserIdA,testData.EnrolCompanyProduct.SIT.loginCompanyId)});

    it('Create Enrol a new Product', async function () {
        // await _UsersPages.UsersPage.loadConditionForDashboard();
        await _CompanyProductPages.EnrolCompanyProductPage.companyMenu.click();
        await _CompanyProductPages.EnrolCompanyProductPage.companyProductMenu.click();
        while(await _CompanyProductPages.EnrolCompanyProductPage.selectAllTxnBtn.isElementSelected()==true||await _CompanyProductPages.EnrolCompanyProductPage.indeterminateRadio.isElementPresent()==true)
        {
            await _CompanyProductPages.EnrolCompanyProductPage.selectAllTxnBtn.click();
        }
        await _CompanyProductPages.EnrolCompanyProductPage.accountSelectBtn.click();
        if(await _CompanyProductPages.EnrolCompanyProductPage.accountSelectRadio.isElementSelected()==false){
            await _CompanyProductPages.EnrolCompanyProductPage.accountSelectRadio.click(); 
        };

        await _CompanyProductPages.EnrolCompanyProductPage.showAdvPayment.click();
        actTicked = await _CompanyProductPages.EnrolCompanyProductPage.actAccessBtn.isElementSelected()
        await _CompanyProductPages.EnrolCompanyProductPage.actAccessBtn.click(); 
        giroTicked = await _CompanyProductPages.EnrolCompanyProductPage.giroAccessBtn.isElementSelected()
        await _CompanyProductPages.EnrolCompanyProductPage.giroAccessBtn.click(); 
        ttTicked = await _CompanyProductPages.EnrolCompanyProductPage.ttAccessBtn.isElementSelected()
        await _CompanyProductPages.EnrolCompanyProductPage.ttAccessBtn.click();

        await _CompanyProductPages.EnrolCompanyProductPage.continueBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.submitBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.finishBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.dashboardFilterText.input(testData.EnrolCompanyProduct.requestName);
        await _CompanyProductPages.EnrolCompanyProductPage.newRequestBtn.jsClick();
        await Promise.all([
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.statusTxt).textContains(testData.EnrolCompanyProduct.PendingApproval),
        ]);

    });
    it('Approve Enrol a new Product', async function () {
        //User A approve
        await _UsersPages.UsersPage.Dasgboardmenu.click();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.MyApproveTab.jsClick();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _CompanyProductPages.EnrolCompanyProductPage.dashboardFilterText.input(testData.EnrolCompanyProduct.requestName);
        await _CompanyProductPages.EnrolCompanyProductPage.newRequestBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.loadapproveBtn();
        await _CompanyProductPages.EnrolCompanyProductPage.approveBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.loadcanceldialogBtn();
        await _CompanyProductPages.EnrolCompanyProductPage.extendApproveBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.getchallengeBtn.click();
        let responseA= 'Approve';
        await _CompanyProductPages.EnrolCompanyProductPage.responseCodeTxt.input(responseA);
        await _CompanyProductPages.EnrolCompanyProductPage.approvedialogBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.dismissdialogBtn.click();

        //User B approve
        await Promise.all([
            await new NavigatePages().loginSSM(testData.EnrolCompanyProduct.SIT.loginUserIdB,testData.EnrolCompanyProduct.SIT.loginCompanyId)
         ]);
        await _UsersPages.UsersPage.Dasgboardmenu.click();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _UsersPages.UsersPage.MyApproveTab.jsClick();
        await _UsersPages.UsersPage.loadConditionRequest();
        await _CompanyProductPages.EnrolCompanyProductPage.dashboardFilterText.input(testData.EnrolCompanyProduct.requestName);
        await _CompanyProductPages.EnrolCompanyProductPage.newRequestBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.loadapproveBtn();
        await _CompanyProductPages.EnrolCompanyProductPage.approveBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.loadcanceldialogBtn();
        await _CompanyProductPages.EnrolCompanyProductPage.extendApproveBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.getchallengeBtn.click();
        let responseB= 'Approve';
        await _CompanyProductPages.EnrolCompanyProductPage.responseCodeTxt.input(responseB);
        await _CompanyProductPages.EnrolCompanyProductPage.approvedialogBtn.click();
        await _CompanyProductPages.EnrolCompanyProductPage.dismissdialogBtn.click();
       await _CompanyProductPages.EnrolCompanyProductPage.dashboardFilterText.input(testData.EnrolCompanyProduct.requestName);
        await _UsersPages.UsersPage.loadConditionRequest();
        await _CompanyProductPages.EnrolCompanyProductPage.newRequestBtn.jsClick(1000);
        await _UsersPages.UsersPage.loadConditionViewRequest();
        await Promise.all([
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.statusTxt).textContainsLessOne(testData.EnrolCompanyProduct.Completed,testData.EnrolCompanyProduct.Pendingbankprocessing,testData.EnrolCompanyProduct.Approved),
        ]);
        await _CompanyProductPages.EnrolCompanyProductPage.loadcancelBtn();
        //SAM CHECK ACCOUNT ACCESS
        await new NavigatePages().loginSAM(SIT ? testData.SAM.SIT.loginUserId : testData.SAM.UAT.loginUserId);
		await _CorporationsPages.corporationsPage.topCorporationsLink.click();
		await _CorporationsPages.corporationsPage.loadCorporationCondition();
		await _CorporationsPages.corporationsPage.selectAffiliate.select(testData.SAM.SelectAffiliate);
		await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
		await _CorporationsPages.corporationsPage.selectColumn.select(testData.SAM.companyId);
		await _CorporationsPages.corporationsPage.inputAffiliate.input(testData.SAM.SSMCorporationID);
		await _CorporationsPages.corporationsPage.searchCorpButton.click();
		await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.accountTabLink.click();
        await _CompanyProductPages.EnrolCompanyProductPage.acctBtn.click();

        // if(actTicked){
        //     await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgActBtn).isNotSelected();
        // }else{
        //     await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgActBtn).isSelected();
        // }
        // if(giroTicked){
        //     await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgGiroBtn).isNotSelected();
        // }else{
        //     await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgGiroBtn).isSelected();
        // }
        // if(ttTicked){
        //     await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgTTBtn).isNotSelected();
        // }else{
        //     await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgTTBtn).isSelected();
        // }
        await Promise.all([
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgActBtn).isSelected(),
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgGiroBtn).isSelected(),
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgTTBtn).isSelected(),
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgBulkBtn).isNotSelected(),
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgFastBtn).isNotSelected(),
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgDemandBtn).isNotSelected(),
            await ensure(_CompanyProductPages.EnrolCompanyProductPage.sgBpBtn).isNotSelected()
        ]);
    })
    });
