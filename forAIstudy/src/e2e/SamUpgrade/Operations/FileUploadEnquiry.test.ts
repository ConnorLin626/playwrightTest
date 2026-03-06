/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { OperationsPages } from '../../../pages/SamUpgrade';
import { saveScreen, ensure, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import moment = require('moment');

let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let startDate = moment(new Date()).subtract(11, 'months').format('DD-MMM-YYYY');

describe('Operation-File Upload Enquiry', async function () {
    this.retries(browser.params.caseRetryTimes);
    //this.timeout(60 * 1000);
    //before(async function () { await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.SU); });

    it('File Upload Enquiry', async function () {
        await new NavigatePages().loginNewSAM(testDataSAM.loginSAMID.ASADM2);
        await _OperationsPages.fileUploadEnquiryPage.topOperationsLink.click();
        await _OperationsPages.fileUploadEnquiryPage.fileUploadEnquiryLink.click();
        await _OperationsPages.fileUploadEnquiryPage.loadCondition();
        await _OperationsPages.fileUploadEnquiryPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
        await _OperationsPages.fileUploadEnquiryPage.submitAffiliate.click();
        await _OperationsPages.fileUploadEnquiryPage.selectSearchBy.select("Customer ID");
        await _OperationsPages.fileUploadEnquiryPage.inputSearchBy.input(testDataSAM.corporationID.SG);
        await _OperationsPages.fileUploadEnquiryPage.inputStartDate.clean();
        await _OperationsPages.fileUploadEnquiryPage.inputStartDate.input(startDate);
        await _OperationsPages.fileUploadEnquiryPage.searchFileUploadButton.click();

        if (await _OperationsPages.fileUploadEnquiryPage.searchResultLabel.ElementExist()) {
            await _OperationsPages.fileUploadEnquiryPage.firstResultLink.click();
            await ensure(_OperationsPages.fileUploadEnquiryPage.fromAccountValue).isNotEmpty();
            await ensure(_OperationsPages.fileUploadEnquiryPage.amountValue).isNotEmpty();
        }
    });
});