/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('IN_testData.json');

describe('IN create new download file ', async function () {
    this.retries(browser.params.caseRetryTimes);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create new download file with NEFT format', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.downloadFile.SIT.loginCompanyId : testData.downloadFile.UAT.loginCompanyId, SIT ? testData.downloadFile.SIT.loginUserId : testData.downloadFile.UAT.loginUserId, "123123");
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.filesMangementCenter.click();
        await _FilesPages.uploadFilePage.downloadTab.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadNEFT' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(SIT ? testData.downloadFile.SIT.PaymentType : testData.downloadFile.UAT.PaymentType);
        await browser.sleep(4000); // wait page refresh
        // await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData2.downloadFile.fromDate);
        // await _FilesPages.downloadFilePage.endAbsoluteDate.select(currentDate);
        await _FilesPages.downloadFilePage.custRef.input(SIT ? testData.downloadFile.SIT.custRef : testData.downloadFile.UAT.custRef)
        await _FilesPages.downloadFilePage.loadConditionForDownloadFile();
        await _FilesPages.downloadFilePage.nextBtn.jsClick();
        await _FilesPages.downloadFilePage.dismissBtn.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.refershButton.jsClick();
        await Promise.all([
            await ensure(_FilesPages.downloadFilePage.fileLink).textContains(fileName),
        ]);
        // await ensure(_FilesPages.downloadFilePage.doneButton).isElementPresent();
    });
});

