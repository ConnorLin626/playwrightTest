/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, AccountPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { CorporationsPages } from '../../../pages/SamUpgrade';
import { browser } from 'protractor';
import * as moment from 'moment';

 let currentDate = moment(new Date()).format('DD-MMM-YYYY');

let _AccountPages = new AccountPages();
let testData = _AccountPages.fetchTestData('IN_testData.json');

let _CorporationsPages = new CorporationsPages();
let testDataSAM = _CorporationsPages.fetchTestData('SAM_testData.json');

//Add for R8.20 IEBAA-3301
describe('IN Balances', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testData.Balance.SIT.login.loginCompanyId : testData.Balance.UAT.login.loginCompanyId,SIT ? testData.Balance.SIT.login.loginUserId : testData.Balance.UAT.login.loginUserId, "123123");});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Check click Report as fraud to create message', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.balancesPage.accountBalanceTab.click();
        await _AccountPages.balancesPage.loadConditionForViewTxnPage();
        await _AccountPages.balancesPage.createMessage.jsClick();
        await _AccountPages.balancesPage.loadConditionForCreateMessagePage();
        await Promise.all([
            await ensure(_AccountPages.balancesPage.messageTo).textIs(testData.Balance.messageTo),
            await ensure(_AccountPages.balancesPage.messageSubject).textIs(testData.Balance.messageSubject),
        ]);
        await _AccountPages.balancesPage.submitBtn.click();
        await _AccountPages.balancesPage.loadConditionForViewTxnPage();
        await Promise.all([
            await ensure(_AccountPages.balancesPage.successMsg).textContains(testData.Balance.sendSuccessMsg),
        ]);
        //Check on SAM
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1),
        await _AccountPages.balancesPage.secureMessage.click();
        await _AccountPages.balancesPage.loadConditionForSecureMessage();
        await _AccountPages.balancesPage.subjectLink.jsClick();
        await _AccountPages.balancesPage.loadConditionForViewSecureMessage();
        await Promise.all([
            await ensure(_AccountPages.balancesPage.FromValue).textContains(SIT ? testData.Balance.SIT.login.loginUserId : testData.Balance.UAT.login.loginUserId),
            await ensure(_AccountPages.balancesPage.subjectValue).textContains(testData.Balance.messageSubject),
            await ensure(_AccountPages.balancesPage.receiceDateValue).textContains(currentDate),
        ]);

    });
});

