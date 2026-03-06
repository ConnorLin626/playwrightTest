/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { PersonnelPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, pageSwitchWindow, generatedID, PROJECT_TYPE, SIT } from '../../../lib';
import { browser } from 'protractor';


let _PersonnelPages = new PersonnelPages();
let testDataSAM = _PersonnelPages.fetchTestData('SAM_testData.json');
let supportName = "";
let supportLoginID = "";

describe('Personnel-Support', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginNewSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Search Support Person', async function () {
        await new NavigatePages().loginNewSAM(SIT ? testDataSAM.loginSAMID.ASADM1 : testDataSAM.loginSAMID.DBSCM2);
        await _PersonnelPages.supportPage.topPersonnelLink.click();
        await _PersonnelPages.supportPage.supportLink.click();
        await _PersonnelPages.supportPage.loadCondition();
        await _PersonnelPages.supportPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _PersonnelPages.supportPage.submitAffiliate.click();
        await _PersonnelPages.supportPage.selectSearchBy.select(testDataSAM.selectSupportSearchBy.LoginID);
        await _PersonnelPages.supportPage.inputSearchFor.input(testDataSAM.searchSupport.loginID);
        await _PersonnelPages.supportPage.searchSupport.click();
        await _PersonnelPages.supportPage.firstSupportPersonLink.click();
        await ensure(_PersonnelPages.supportPage.loginIDValue).textIs(testDataSAM.searchSupport.loginID);
    });
    it('Enroll Support Person', async function () {
        await new NavigatePages().loginNewSAM(SIT ? testDataSAM.loginSAMID.ASADM1 : testDataSAM.loginSAMID.DBSCM2);
        await _PersonnelPages.supportPage.topPersonnelLink.click();
        await _PersonnelPages.supportPage.supportLink.click();
        await _PersonnelPages.supportPage.loadCondition();
        await _PersonnelPages.supportPage.enrollSupportPersonnelLink.click();
        supportName = testDataSAM.enrollSupportPerson.supportName + generatedID();
        await _PersonnelPages.supportPage.inputName.input(supportName);
        supportLoginID = testDataSAM.enrollSupportPerson.supportLoginID + generatedID();
        supportLoginID = supportLoginID.toUpperCase();
        await _PersonnelPages.supportPage.inputLoginID.input(supportLoginID);
        await _PersonnelPages.supportPage.continueSubmit.click();
        //await ensure(_PersonnelPages.supportPage.loginIDValue).textIs(supportLoginID);
        await _PersonnelPages.supportPage.inputPhoneNumber1.input(testDataSAM.enrollSupportPerson.PhoneNumber);
        await _PersonnelPages.supportPage.inputEmailID.input(testDataSAM.enrollSupportPerson.EmailID);
        await _PersonnelPages.supportPage.selectAffiliateAccess.select(testDataSAM.selectAffiliate.DBSSG);
        await _PersonnelPages.supportPage.selectDefaultAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _PersonnelPages.supportPage.selectDefaultReport.select(testDataSAM.enrollSupportPerson.DefaultReport);
        await _PersonnelPages.supportPage.selectSAMGroup1.click();
        //await _PersonnelPages.supportPage.selectSAMGroup2.click();
        //await _PersonnelPages.supportPage.selectSAMGroup3.click();
        //await _PersonnelPages.supportPage.selectSAMGroup4.click();
        //await _PersonnelPages.supportPage.selectTAMGroup1.click();
        //await _PersonnelPages.supportPage.selectTAMSecureMsgGroup1.click();
        await _PersonnelPages.supportPage.previewPersonButton.click();
        await _PersonnelPages.supportPage.submitPersonButton.click();
        await _PersonnelPages.supportPage.supportLink.click();
        await _PersonnelPages.supportPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _PersonnelPages.supportPage.submitAffiliate.click();
        await _PersonnelPages.supportPage.inputSearchFor.input(supportLoginID);
        await _PersonnelPages.supportPage.searchSupport.click();
        await ensure(_PersonnelPages.supportPage.logIDLabel).textIs(supportLoginID);
    });
    it('List all support personnel', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _PersonnelPages.supportPage.topPersonnelLink.click();
        await _PersonnelPages.supportPage.supportLink.click();
        await _PersonnelPages.supportPage.loadCondition();
        await _PersonnelPages.supportPage.listAllSupportPersonnelLink.click();
        await ensure(_PersonnelPages.supportPage.logIDLabel).isNotEmpty();
        await ensure(_PersonnelPages.supportPage.supportSearchResultStatus).isNotEmpty();
    });
    //add for IEBAA-3595
    it('edit Support Person', async function () {
        await new NavigatePages().loginNewSAM(SIT ? testDataSAM.loginSAMID.ASADM1 : testDataSAM.loginSAMID.DBSCM2);
        await _PersonnelPages.supportPage.topPersonnelLink.click();
        await _PersonnelPages.supportPage.supportLink.click();
        await _PersonnelPages.supportPage.loadCondition();
        await _PersonnelPages.supportPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _PersonnelPages.supportPage.submitAffiliate.click();
        //await _PersonnelPages.supportPage.selectSearchBy.select(testDataSAM.searchSupport.editUserID);
        await _PersonnelPages.supportPage.inputSearchFor.input(testDataSAM.searchSupport.editUserID);
        await _PersonnelPages.supportPage.searchSupport.click();
        await _PersonnelPages.supportPage.firstSupportPersonLink.click();
        await _PersonnelPages.supportPage.inputPhoneNumber1.input(testDataSAM.editSupportPerson.PhoneNumber);
        await _PersonnelPages.supportPage.inputEmailID.input(testDataSAM.editSupportPerson.EmailID);
        //await _PersonnelPages.supportPage.selectDefaultReport.select(testDataSAM.editSupportPerson.DefaultReport);
        //await ensure(_PersonnelPages.supportPage.loginIDValue).textIs(testDataSAM.searchSupport.loginID);
        await _PersonnelPages.supportPage.editReviewBtn.click();
        await _PersonnelPages.supportPage.submitPersonButton.click();
        await new NavigatePages().loginNewSAM(SIT ? testDataSAM.loginSAMID.ASADM2 : testDataSAM.loginSAMID.DBSCM1);
        await _PersonnelPages.supportPage.topPersonnelLink.click();
        await _PersonnelPages.supportPage.supportLink.click();
        await _PersonnelPages.supportPage.loadCondition();
        await _PersonnelPages.supportPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _PersonnelPages.supportPage.submitAffiliate.click();
        //await _PersonnelPages.supportPage.selectSearchBy.select(testDataSAM.selectSupportSearchBy.editUserID);
        await _PersonnelPages.supportPage.inputSearchFor.input(testDataSAM.searchSupport.editUserID);
        await _PersonnelPages.supportPage.searchSupport.click();
        await _PersonnelPages.supportPage.approveSupport.click();
        //await _PersonnelPages.supportPage.loadCondition();
        await _PersonnelPages.supportPage.submitApproveBtn.click();
        await _PersonnelPages.supportPage.loadCondition();
        //await _PersonnelPages.supportPage.selectSearchBy.select(testDataSAM.selectSupportSearchBy.editUserID);
        await _PersonnelPages.supportPage.inputSearchFor.input(testDataSAM.searchSupport.editUserID);
        await _PersonnelPages.supportPage.searchSupport.click();

        await Promise.all([
        ensure(_PersonnelPages.supportPage.ViewEmailID).textContains(testDataSAM.editSupportPerson.EmailID),
        ensure(_PersonnelPages.supportPage.supportSearchResultStatus).textContains(testDataSAM.supportResultStatus.Approved),        
        ]);
       
        
        



    });


    // it('Support - User Setup Report', async function () {
    //     await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
    //     await _PersonnelPages.supportPage.topPersonnelLink.click();
    //     await _PersonnelPages.supportPage.supportLink.click();
    //     await _PersonnelPages.supportPage.loadCondition();
    //     await _PersonnelPages.supportPage.userSetupReportLink.click();
    //     await _PersonnelPages.supportPage.reportViewByUser.select(testDataSAM.searchSupport.loginID);
    //     await _PersonnelPages.supportPage.viewUserSetupReportButton.click();
    //     await pageSwitchWindow(testDataSAM.reports.reportWindow);
    //     await _PersonnelPages.supportPage.loadConditionOnReportPage();
    //     await ensure(_PersonnelPages.supportPage.reportTitle).textContains(testDataSAM.reports.userSetupReportTitle);

    // });

    // it('Support-Advanced search', async function () {
    //     await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1);
    //     await _PersonnelPages.supportPage.topPersonnelLink.click();
    //     await _PersonnelPages.supportPage.supportLink.click();
    //     await _PersonnelPages.supportPage.loadCondition();
    //     await _PersonnelPages.supportPage.advancedSearchLink.click();
    //     await ensure(_PersonnelPages.supportPage.advancedSearchLable).textIs("Advanced Support Person Search");
    // });
});
