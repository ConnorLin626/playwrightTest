/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');

describe('Operation-File Exchange Receive', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('File Exchange - Receive', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _OperationsPages.fileExchangeReceivePage.topOperationsLink.click();
        await _OperationsPages.fileExchangeReceivePage.fileExchangeReceiveLink.click();
        await _OperationsPages.fileExchangeReceivePage.loadCondition();
        await _OperationsPages.fileExchangeReceivePage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.fileExchangeReceivePage.submitAffiliate.click();
        await _OperationsPages.fileExchangeReceivePage.inputCorpID.input(testDataSAM.corporationID.SG);
        await _OperationsPages.fileExchangeReceivePage.searchFileExchage.click();
        if (await _OperationsPages.fileExchangeReceivePage.searchResultLabel.ElementExist()) {
            await ensure(_OperationsPages.fileExchangeReceivePage.fileDateValue).isNotEmpty();
        }
        await _OperationsPages.fileExchangeReceivePage.listAllFilesLink.click();
        if (await (_OperationsPages.fileExchangeReceivePage.searchResultLabel).ElementExist()) {
            await ensure(_OperationsPages.fileExchangeReceivePage.fileDateValue).isNotEmpty();
        }

    });
});