/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');

describe('Operation-File Exchange Send', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('File Exchange - Send', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _OperationsPages.fileExchangeSendPage.topOperationsLink.click();
        await _OperationsPages.fileExchangeSendPage.fileExchangeSendLink.click();
        await _OperationsPages.fileExchangeSendPage.loadCondition();
        await _OperationsPages.fileExchangeSendPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.fileExchangeSendPage.submitAffiliate.click();
        await _OperationsPages.fileExchangeSendPage.inputCorpID.input(testDataSAM.corporationID.SG);
        await _OperationsPages.fileExchangeSendPage.searchFileExchange.click();
        if (await _OperationsPages.fileExchangeSendPage.fileDateValue.ElementExist()) {
            await ensure(_OperationsPages.fileExchangeSendPage.fileDateValue).isNotEmpty();
        }
        await _OperationsPages.fileExchangeSendPage.listAllFilesLink.click();
        if (await (_OperationsPages.fileExchangeSendPage.fileDateValue).ElementExist()) {
            await ensure(_OperationsPages.fileExchangeSendPage.fileDateValue).isNotEmpty();
        }
    });
});