/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('VN_testData.json');
let fileName = "";
let paymentType = "";
let approvalOption = "";

describe('VN File services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.files.SIT.loginCompanyId : testData.files.UAT.loginCompanyId, SIT ? testData.files.SIT.loginUserId : testData.files.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Upload UFF file format and ticked Test file', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "ALL - Universal File Format";
        approvalOption = "transaction";
        await _FilesPages.uploadFilePage.fsUpload2(_FilesPages, paymentType, SIT ? testData.files.SIT.fileName1 : testData.files.UAT.fileName1, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        // await _FilesPages.uploadFilePage.TestFilestab.click();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fileNameLabel).textContains(fileName),
        ]);
    });
});