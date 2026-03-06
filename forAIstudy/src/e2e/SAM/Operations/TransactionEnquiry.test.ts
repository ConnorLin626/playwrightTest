/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SAM';
import { saveScreen, ensure, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');

describe('Operation-Transaction Enquiry', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    before(async function () { await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Transaction Enquiry', async function () {
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