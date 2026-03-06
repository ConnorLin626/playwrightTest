/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { ConfigurationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _ConfigurationsPages = new ConfigurationsPages();
let testDataSAM = _ConfigurationsPages.fetchTestData('SAM_testData.json');
let notice = '';
let alertName = '';
let disclaimerName = '';

describe('Configuration-Notices', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Alert ', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _ConfigurationsPages.noticesPage.toConfigurationLink.click();
        await _ConfigurationsPages.noticesPage.noticesLink.click();
        //await _ConfigurationsPages.noticesPage.loadCondition();
        await _ConfigurationsPages.noticesPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _ConfigurationsPages.noticesPage.submitAffiliate.click();
        await _ConfigurationsPages.noticesPage.firstAlertLink.getText().then(text => {
            alertName = text.trim();
        });
        await _ConfigurationsPages.noticesPage.firstAlertLink.click();
        await ensure(_ConfigurationsPages.noticesPage.alertTypeValue).textContains(alertName);
    });

    it('Disclaimer ', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.DBSCM2);
        await _ConfigurationsPages.noticesPage.toConfigurationLink.click();
        await _ConfigurationsPages.noticesPage.noticesLink.click();
        //await _ConfigurationsPages.noticesPage.loadCondition();
        await _ConfigurationsPages.noticesPage.disclaimerLink.getText().then(text => {
            disclaimerName = text.trim();
        });
        await _ConfigurationsPages.noticesPage.disclaimerLink.click();
        await ensure(_ConfigurationsPages.noticesPage.disclaimerValue).textContains(disclaimerName);
    });
});
