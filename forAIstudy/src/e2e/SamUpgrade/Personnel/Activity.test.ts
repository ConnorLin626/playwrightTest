/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { PersonnelPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import moment = require('moment');

let _PersonnelPages = new PersonnelPages();
let testDataSAM = _PersonnelPages.fetchTestData('SAM_testData.json');
let startDate = moment(new Date()).subtract(11, 'months').format('DD-MMM-YYYY');

describe('Personnel-Activity', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Search Activity', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _PersonnelPages.activityPage.topPersonnelLink.click();
        await _PersonnelPages.activityPage.activityLink.jsClick();
        await _PersonnelPages.activityPage.loadCondition();
        await _PersonnelPages.activityPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _PersonnelPages.activityPage.submitAffiliate.click();
        await _PersonnelPages.activityPage.selectUserFunction.select(testDataSAM.personnelActivity.UserFunction);
        await _PersonnelPages.activityPage.selectSupportPersonID.select(testDataSAM.loginSAMID.DBSCM1);
        await _PersonnelPages.activityPage.inputStartDate.clean();
        await _PersonnelPages.activityPage.inputStartDate.input(startDate);
        await _PersonnelPages.activityPage.submitActivityButton.click();
        await _PersonnelPages.activityPage.firstActivityLink.click();
        await ensure(_PersonnelPages.activityPage.functionTypeValue).textContains(testDataSAM.personnelActivity.FunctionType);
    });
});
