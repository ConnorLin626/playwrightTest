/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
import { SendPage } from '../../../pages/CB/Files';

const lib_1 = require("../../../lib");
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let _SendPage = new SendPage();
let testData = _FilesPages.fetchTestData('SG_testData.json');

describe('File Exchange-send-upload', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FileExchange.SIT.loginCompanyId1 : testData.FileExchange.UAT.loginCompanyId1, SIT ? testData.FileExchange.SIT.loginUserId1 : testData.FileExchange.UAT.loginUserId1); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
    
    it('Upload file when Request Type does not select value', async function () {
        await _FilesPages.sendPage.fsUpload2(_FilesPages, lib_1.SIT ? testData.FileExchange.SIT.fileName2 : testData.FileExchange.UAT.fileName2,testData.FileExchange.RequestType2).then(async (data) => {
    });

    await _FilesPages.sendPage.fileStatus.select(testData.FileExchange.status);
    await _FilesPages.sendPage.FileName.input(lib_1.SIT ? testData.FileExchange.SIT.FileName2 : testData.FileExchange.UAT.FileName2);
    await _FilesPages.sendPage.SearchButton.click(); 
    await _FilesPages.sendPage.CheckboxButton.click();
    await _FilesPages.sendPage.DeleteButton.click();
    await _FilesPages.sendPage.loadConditionDelete();

    await Promise.all([
        await ensure(_FilesPages.sendPage.filename).textContains(lib_1.SIT ? testData.FileExchange.SIT.FileName2 : testData.FileExchange.UAT.FileName2),
    ]);   
    await _FilesPages.sendPage.DeleteBut.click();
    await _FilesPages.sendPage.loadCondition();
    await _FilesPages.sendPage.fileStatus.select(testData.FileExchange.status);
    await _FilesPages.sendPage.FileName.input(lib_1.SIT ? testData.FileExchange.SIT.FileName2 : testData.FileExchange.UAT.FileName2);
    await _FilesPages.sendPage.SearchButton.click();
    await Promise.all([
        await ensure(_FilesPages.sendPage.Searchresult).textContains('No Data Found'),
    ]); 
    });

   it('Upload file when Request Type select value', async function () {
        await _FilesPages.sendPage.fsUpload1(_FilesPages, lib_1.SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.RequestType1).then(async (data) => {
        });
        
    await _FilesPages.sendPage.requestType.select(testData.FileExchange.RequestType1);    
    await _FilesPages.sendPage.fileStatus.select(testData.FileExchange.status);
    await _FilesPages.sendPage.FileName.input(lib_1.SIT ? testData.FileExchange.SIT.FileName : testData.FileExchange.UAT.FileName);
    await _FilesPages.sendPage.SearchButton.click();
    await Promise.all([
        await ensure(_FilesPages.sendPage.CheckRequestType).textContains(testData.FileExchange.RequestType1),
    ]);   
    });
});
describe('File Exchange-send-approve', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FileExchange.SIT.loginCompanyId2 : testData.FileExchange.UAT.loginCompanyId2, SIT ? testData.FileExchange.SIT.loginUserId2 : testData.FileExchange.UAT.loginUserId2); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Approve the file that Request Type has value', async function () {
        await _FilesPages.openMenu(Menu.Files.Send);
        await _FilesPages.sendPage.loadCondition();
    
        await _FilesPages.sendPage.requestType.select(testData.FileExchange.RequestType1);
        await _FilesPages.sendPage.fileStatus.select(testData.FileExchange.status);
        await _FilesPages.sendPage.FileName.input(lib_1.SIT ? testData.FileExchange.SIT.FileName : testData.FileExchange.UAT.FileName);
        await _FilesPages.sendPage.SearchButton.click();
        await _FilesPages.sendPage.CheckboxButton.click();
        await _FilesPages.sendPage.ApproveButton.click();
        await _FilesPages.sendPage.loadConditionApprove();
    
        await _FilesPages.sendPage.ApproveBut.click();
        await _FilesPages.sendPage.loadCondition();
    
        await _FilesPages.sendPage.FileName.input(lib_1.SIT ? testData.FileExchange.SIT.FileName : testData.FileExchange.UAT.FileName);
        await _FilesPages.sendPage.SearchButton.click();
        await Promise.all([
            await ensure(_FilesPages.sendPage.FileStatus).textContains('Approved'),
        ]);
     });

});

