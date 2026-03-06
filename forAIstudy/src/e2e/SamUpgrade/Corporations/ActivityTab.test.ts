/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import {  ensure, handlerCase, PROJECT_TYPE, SIT } from '../../../lib';
import { browser } from 'protractor';

let _CorporationsPages = new CorporationsPages();
let _PaymentsPages = new PaymentsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

describe('SG_IntraCompanyTransfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(testDataSAM.searchAffiliateValue.SAMSGAffiliate, testDataSAM.activity.beneUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create an ICT Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testDataSAM.activity.CB.SIT.fromAccount : testDataSAM.activity.CB.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testDataSAM.activity.CB.SIT.toAccount : testDataSAM.activity.CB.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testDataSAM.activity.CB.amount);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testDataSAM.activity.CB.transactionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage()
    });
});

describe('Activity Tab', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Search Corporation Activity and View Details', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _CorporationsPages.corporationsPage.topCorporationsLink.click();
        await _CorporationsPages.corporationsPage.loadCorporationCondition();
        await _CorporationsPages.corporationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _CorporationsPages.corporationsPage.submitAffiliateButton.click();
        await _CorporationsPages.corporationsPage.selectColumn.select(testDataSAM.searchAffiliateName.companyId);
        await _CorporationsPages.corporationsPage.inputAffiliate.input(testDataSAM.searchAffiliateValue.SAMSGAffiliate);
        await _CorporationsPages.corporationsPage.searchCorpButton.click();
        await _CorporationsPages.corporationsPage.viewCorpLink.click();
        await _CorporationsPages.corporationsPage.activityTabLink.click();
        await _CorporationsPages.corporationsPage.userFunctionSearch.click();
        await _CorporationsPages.corporationsPage.userFunctionSearchInput.input(testDataSAM.activity.functionSelect);
        await _CorporationsPages.corporationsPage.userFunctionSearchSelect.click();
        
        //await _CorporationsPages.corporationsPage.userFunctionSelect.select(testDataSAM.activity.functionSelect);
        await _CorporationsPages.corporationsPage.beneUserIdText.input(testDataSAM.activity.beneUserId);
        await _CorporationsPages.corporationsPage.beneSearchButton.jsClick();
        await _CorporationsPages.corporationsPage.testActivityButton.click();
        await ensure(_CorporationsPages.corporationsPage.loginIdText).textIs(testDataSAM.activity.beneUserId);
        await ensure(_CorporationsPages.corporationsPage.componentTypeText).textIs(testDataSAM.activity.componentType);
        await ensure(_CorporationsPages.corporationsPage.functionTypeText).textIs(testDataSAM.activity.functionType);
    });
});