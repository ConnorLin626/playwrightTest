/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { PersonnelPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, SIT } from '../../../lib';
import { browser } from 'protractor';

let _PersonnelPages = new PersonnelPages();
let testDataSAM = _PersonnelPages.fetchTestData('SAM_testData.json');

describe('Personnel-Search', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    before(async function () { await new NavigatePages().loginSAM(SIT ? testDataSAM.loginSAMID.ASADM1 : testDataSAM.loginSAMID.ASADM2); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Search ', async function () {
        await _PersonnelPages.searchPage.topPersonnelLink.click();
        await _PersonnelPages.searchPage.searchLink.click();
        await _PersonnelPages.searchPage.loadCondition();
        await _PersonnelPages.searchPage.inputEmailID.input(testDataSAM.personnelSearch.EmailAddress);
        await _PersonnelPages.searchPage.selectAffiliate.select(testDataSAM.personnelSearchAffiliate.DBSSG)
        await _PersonnelPages.searchPage.searchButton.click();
        await _PersonnelPages.searchPage.firstResultLink.click();
    });
});
