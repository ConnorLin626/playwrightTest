/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import {NavigatePages, PaymentsPages, SwitchToSubsiPages, FilesPages} from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import {browser, promise} from 'protractor';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let _switchToSubsiPages = new SwitchToSubsiPages();

//add for IEBAA-3404
describe('TW SwitchRB_SUB', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.SwitchCompany.SIT.loginCompanyId : testData.SwitchCompany.UAT.loginCompanyId, SIT ? testData.SwitchCompany.SIT.loginUserId : testData.SwitchCompany.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('TW switch RB SUB', async function () {
         await _switchToSubsiPages.viewSubsiPage.switchToSub.click();
         await _switchToSubsiPages.viewSubsiPage.selectCompany.click();
         await _switchToSubsiPages.viewSubsiPage.twAffiliate.click();
         await ensure(_switchToSubsiPages.viewSubsiPage.taipeilabel).textContains(testData.SwitchCompany.rbLabel);
         await ensure(_switchToSubsiPages.viewSubsiPage.notTaipeilabel).textNotContains(testData.SwitchCompany.rbLabel);
    });
});
