/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, ApprovalsPages, SwitchToSubsiPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
import { Filemanagement_UploadFile } from '../../../pages/CB/Files';

const lib_1 = require("../../../lib");
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let _switchToSubsiPages = new SwitchToSubsiPages();
let _Filemanagement_UploadFile = new Filemanagement_UploadFile();
let testData1 = _FilesPages.fetchTestData('VN_testData.json');
let testData2 = _FilesPages.fetchTestData('TW_testData.json');
let testData3 = _FilesPages.fetchTestData('IN_testData.json');
let testData4 = _FilesPages.fetchTestData('ID_testData.json');
let fileName = "";
let paymentType = "";
let approvalOption = "";
let Organisation = "";
describe('File Management center-upload', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData1.files.SIT.loginCompanyId : testData1.files.UAT.loginCompanyId, SIT ? testData1.files.SIT.loginUserId : testData1.files.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Upload UFF file format and ticked Test file', async function () {
        paymentType = "ALL - Universal File Format";
        approvalOption = "transaction";
        await _FilesPages.filemanagement_UploadFile.fsUpload1(_FilesPages, paymentType, lib_1.SIT ? testData1.files.SIT.fileName1 : testData1.files.UAT.fileName1, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.TestFilestab.click();
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await Promise.all([
            await ensure(_FilesPages.filemanagement_UploadFile.FileName).textContains(fileName),
        ]);
    });
});

describe('File Management center-Upload FISC file format ', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData2.files.SIT.loginCompanyId : testData2.files.UAT.loginCompanyId, SIT ? testData2.files.SIT.loginUserId : testData2.files.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Upload FISC file format and ticked Confidential File', async function () {
        paymentType = "Payroll - Bulk FISC";
        approvalOption = "By file amount - in TWD";
        await _FilesPages.filemanagement_UploadFile.fsUpload3(_FilesPages, lib_1.SIT ? testData2.files.SIT.organisation : testData2.files.UAT.organisation, paymentType, lib_1.SIT ? testData2.files.SIT.fileName : testData2.files.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.ShowAdditionalFilters.click();
        await _FilesPages.filemanagement_UploadFile.organisation.select(lib_1.SIT ? testData2.files.SIT.organisation : testData2.files.UAT.organisation);
        await _FilesPages.filemanagement_UploadFile.search.click();
        await _FilesPages.filemanagement_UploadFile.Showtransactions.click();
        await Promise.all([
            await ensure(_FilesPages.filemanagement_UploadFile.FromAccount).textContains(lib_1.SIT ? testData2.files.SIT.FromAccount : testData2.files.UAT.FromAccount),
            await ensure(_FilesPages.filemanagement_UploadFile.Amount).textContains(lib_1.SIT ? testData2.files.SIT.Amount : testData2.files.UAT.Amount),
        ]);
    });
});
describe('SwitchTo File Management center-upload NEFT file format', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData3.files.SIT.loginCompanyId : testData3.files.UAT.loginCompanyId, SIT ? testData3.files.SIT.loginUserId : testData3.files.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Upload NEFT file format and ticked Confidential File', async function () {

        await _switchToSubsiPages.openMenu(Menu.CompanyInfo.SwitchToSubsi2ID);
        //await _switchToSubsiPages.viewSubsiPage.loadConditionForViewSubsi();
        //await _switchToSubsiPages.viewSubsiPage.switchToButton.click();
        //await _switchToSubsiPages.viewSubsiPage.laterButton.clickIfExist();
        await _switchToSubsiPages.viewSubsiPage.loadCondition();

        paymentType = "Payroll - NEFT";
        approvalOption = "By transaction amount";
        await _FilesPages.filemanagement_UploadFile.fsUpload4(_FilesPages, paymentType, lib_1.SIT ? testData3.files.SIT.fileName : testData3.files.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.click();
        await _FilesPages.filemanagement_UploadFile.Showtransactions.click();
        await Promise.all([
            await ensure(_FilesPages.filemanagement_UploadFile.FromAccount).textContains(lib_1.SIT ? testData3.files.SIT.FromAccount : testData3.files.UAT.FromAccount),
            await ensure(_FilesPages.filemanagement_UploadFile.Amount).textContains(lib_1.SIT ? testData3.files.SIT.Amount : testData3.files.UAT.Amount),
        ]);
    });
});

describe('File Management center-upload', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData4.files.SIT.loginCompanyId : testData4.files.UAT.loginCompanyId, SIT ? testData4.files.SIT.loginUserId : testData4.files.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
    it('Upload Tax Payment File file format)', async function () {
        paymentType = "Tax - Tax Payment File";
        approvalOption = "By transaction";
        await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, lib_1.SIT ? testData4.files.SIT.fileName : testData4.files.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        // await _FilesPages.filemanagement_UploadFile.refresh.click(); 
        await _FilesPages.filemanagement_UploadFile.ShowAdditionalFilters.click();
        await _FilesPages.filemanagement_UploadFile.approvaloption.select('By transaction');
        await _FilesPages.filemanagement_UploadFile.search.click();
        await _FilesPages.filemanagement_UploadFile.Showtransactions.click();
        await Promise.all([
            await ensure(_FilesPages.filemanagement_UploadFile.FromAccount).textContains(lib_1.SIT ? testData4.files.SIT.FromAccount : testData4.files.UAT.FromAccount),
            await ensure(_FilesPages.filemanagement_UploadFile.Amount).textContains(lib_1.SIT ? testData4.files.SIT.Amount : testData4.files.UAT.Amount),
        ]);
    });
});