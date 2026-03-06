/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase, generatedID, } from '../../../lib';
import { browser, promise } from 'protractor';

const lib_1 = require("../../../lib");

let reference = "";
let GroupName = "";
let paymentType = "";
let fileName = "";
let approvalOption = "";
let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('VN_testData.json');



describe('File Management_View File', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.CustomPayment.SIT.loginCompanyId : testData.CustomPayment.UAT.loginCompanyId, SIT ? testData.CustomPayment.SIT.loginUserId : testData.CustomPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('View File page create group/offline aproval', async function () {

        paymentType = "ALL - Universal File Format";
        await _FilesPages.ViewFilePage.fsUpload(_FilesPages, paymentType, lib_1.SIT ? testData.ViewFile.SIT.fileName1 : testData.ViewFile.UAT.fileName1, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.ViewFilePage.Filter.input(fileName);
        await _FilesPages.ViewFilePage.ShowAdditionalFilters.jsClick();
        await _FilesPages.ViewFilePage.search.jsClick();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.FileNameLink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewFile();
        await _FilesPages.ViewFilePage.ViewFileTxn1.getText().then(text => {
            reference = text;
        })
        await _FilesPages.ViewFilePage.SelectTxn.click();
        await _FilesPages.ViewFilePage.CreateGrouButn.click();
        GroupName = 'GroupName' + generatedID();
        await _FilesPages.ViewFilePage.GroupName.input(GroupName);
        await _FilesPages.ViewFilePage.CreateGrouButn.click();
        await _FilesPages.ViewFilePage.GroupCancelButn.click();
        await _FilesPages.ViewFilePage.ViewFileCancel.click();
        await _FilesPages.openMenu(Menu.Payments.TransferCenter);
        await _FilesPages.ViewFilePage.GroupTab.click();
        await _FilesPages.ViewFilePage.GroupFilter.input(GroupName);
        await _FilesPages.ViewFilePage.GroupNamelink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewGroup();
        await promise.all([
            await ensure(_FilesPages.ViewFilePage.viewGroupTxn1).textIs(reference)
        ])
    });

    it('View File page Add to existing group ', async function () {
        paymentType = "ALL - Universal File Format";
        await _FilesPages.ViewFilePage.fsUpload(_FilesPages, paymentType, lib_1.SIT ? testData.ViewFile.SIT.fileName1 : testData.ViewFile.UAT.fileName1, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.ViewFilePage.Filter.input(fileName);
        await _FilesPages.ViewFilePage.ShowAdditionalFilters.jsClick();
        await _FilesPages.ViewFilePage.search.jsClick();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.FileNameLink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewFile();
        await _FilesPages.ViewFilePage.ViewFileTxn1.getText().then(text => {
            reference = text;
        })
        await _FilesPages.ViewFilePage.SelectTxn.click();
        await _FilesPages.ViewFilePage.ExistingGroup.click();
        await _FilesPages.ViewFilePage.SeleExisGroup.select(GroupName);
        await _FilesPages.ViewFilePage.ConfirmButn.click();
        await _FilesPages.ViewFilePage.OKButn.click();
        await _FilesPages.ViewFilePage.ViewFileCancel.click();
        await _FilesPages.openMenu(Menu.Payments.TransferCenter);
        await _FilesPages.ViewFilePage.GroupTab.click();
        await _FilesPages.ViewFilePage.GroupFilter.input(GroupName);
        await _FilesPages.ViewFilePage.GroupNamelink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewGroup();
        await promise.all([
            await ensure(_FilesPages.ViewFilePage.viewGroupTxn2).textIs(reference)
        ])
    });

    it('View File page click Delete button ', async function () {
        paymentType = "ALL - Universal File Format";
        await _FilesPages.ViewFilePage.fsUpload(_FilesPages, paymentType, lib_1.SIT ? testData.ViewFile.SIT.fileName2 : testData.ViewFile.UAT.fileName2, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.ViewFilePage.Filter.input(fileName);
        await _FilesPages.ViewFilePage.ShowAdditionalFilters.jsClick();
        await _FilesPages.ViewFilePage.search.jsClick();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.FileNameLink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewFile();
        await _FilesPages.ViewFilePage.ViewFileTxn1.getText().then(text => {
            reference = text;
        })
        await _FilesPages.ViewFilePage.SelectTxn.click();
        await _FilesPages.ViewFilePage.TxnDeleButn.click();
        await _FilesPages.ViewFilePage.deleteButn.click();
        await _FilesPages.ViewFilePage.OKButn.click();
        await _FilesPages.ViewFilePage.ViewFileCancel.click();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewFile();
        await promise.all([
            await ensure(_FilesPages.ViewFilePage.ViewFileTxn1).textNotContains(reference),
        ])
    });

    it('View File page click Rebatch button ', async function () {
        await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewFile();
        await _FilesPages.ViewFilePage.ViewFileTxn1.getText().then(text => {
            reference = text;
        })
        await _FilesPages.ViewFilePage.SelectTxn.click();
        await _FilesPages.ViewFilePage.RebatchButn.click();
        await _FilesPages.ViewFilePage.SeleNewFile.click();
        let FileName = 'FileName' + generatedID();
        await _FilesPages.ViewFilePage.VirtFileName.input(FileName);
        await _FilesPages.ViewFilePage.RebatConfButn.click();
        await _FilesPages.ViewFilePage.OKButn.click();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(FileName);
        await _FilesPages.ViewFilePage.FileNameLink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewFile();
        await promise.all([
            await ensure(_FilesPages.ViewFilePage.ViewFileTxn1).textIs(reference),
        ])
    });

    it('View File page  Detelet file ', async function () {
        await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.click();
        await _FilesPages.ViewFilePage.loadConditionForViewFile();
        await _FilesPages.ViewFilePage.deleteFileButn.click();
        await _FilesPages.ViewFilePage.deleteButn.click();
        await _FilesPages.ViewFilePage.OKButn.click();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(fileName);
        await Promise.all([
            await ensure(_FilesPages.ViewFilePage.FileResult).textIs(testData.ViewFile.labelNoInformationDisplay)
        ]);
    });
    
});


