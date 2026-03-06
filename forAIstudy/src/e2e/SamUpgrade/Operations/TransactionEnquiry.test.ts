/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');

describe('Operation-Transaction Enquiry', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('Transaction Enquiry', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        let _OperationsPages = new OperationsPages();
        await _OperationsPages.transactionEnquiryPage.loadCondition();
        await _OperationsPages.transactionEnquiryPage.topOperationsLink.click();
        await _OperationsPages.transactionEnquiryPage.transactionEnquiryLink.click();
        await _OperationsPages.transactionEnquiryPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.transactionEnquiryPage.submitAffiliate.click();
        await _OperationsPages.transactionEnquiryPage.startDate.clean();
        await _OperationsPages.transactionEnquiryPage.startDate.input(testDataSAM.date.startDate);
        await _OperationsPages.transactionEnquiryPage.productType.select(testDataSAM.paymentType.SG_ACT);
        await _OperationsPages.transactionEnquiryPage.searchButton.click();
        await _OperationsPages.transactionEnquiryPage.firstReferenceLink.click();
        await ensure(_OperationsPages.transactionEnquiryPage.fromAccountValue).isNotEmpty();
        await ensure(_OperationsPages.transactionEnquiryPage.amountValue).isNotEmpty();
    });
});