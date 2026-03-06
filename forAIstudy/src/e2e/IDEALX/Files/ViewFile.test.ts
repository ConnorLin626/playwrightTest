/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from '../../../lib';
import { browser, promise } from 'protractor';

let reference = "";
let GroupName = "";
let paymentType = "";
let fileName = "";
let approvalOption = "";
let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('VN_testData.json');

describe('File Management_View File', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ViewFile.SIT.loginCompanyId : testData.ViewFile.UAT.loginCompanyId, SIT ? testData.ViewFile.SIT.loginUserId : testData.ViewFile.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('View File page create group - offline aproval', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "ALL - Universal File Format";
        await _FilesPages.uploadFilePage.fsUpload(_FilesPages, paymentType, SIT ? testData.ViewFile.SIT.fileName1 : testData.ViewFile.UAT.fileName1, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        })
        await _FilesPages.ViewFilePage.SelectTxn.jsClick();
        await _FilesPages.ViewFilePage.scrollToBottom();
        await _FilesPages.ViewFilePage.CreateGrouButn.jsClick();
        GroupName = 'GroupName' + generatedID();
        await _FilesPages.ViewFilePage.GroupName.input(GroupName);
        await _FilesPages.ViewFilePage.CreateGrouButn.jsClick();
        await _FilesPages.ViewFilePage.GroupCancelButn.jsClick();
        //await _FilesPages.ViewFilePage.ViewFileCancel.click();
        await _FilesPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.AccountTransferPage.scrollTo(0,300)
        await _FilesPages.TransferCentersPage.loadCondition();
        await _FilesPages.ViewFilePage.GroupTab.click();
        await _FilesPages.ViewFilePage.GroupFilter.input(GroupName);
        await _FilesPages.ViewFilePage.GroupNamelink.jsClick();
        await _FilesPages.ViewFilePage.loadConditionForViewGroup();
        await promise.all([
            await ensure(_FilesPages.ViewFilePage.viewGroupTxn1).textIs(reference)
        ])
    });

    it('View File page Add to existing group ', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "ALL - Universal File Format";
        await _FilesPages.uploadFilePage.fsUpload(_FilesPages, paymentType, SIT ? testData.ViewFile.SIT.fileName1 : testData.ViewFile.UAT.fileName1, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.Filter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        })
        await _FilesPages.ViewFilePage.SelectTxn.jsClick();
        await _FilesPages.ViewFilePage.scrollToBottom();
        await _FilesPages.ViewFilePage.ExistingGroup.jsClick();
        await _FilesPages.ViewFilePage.SeleExisGroup.select(GroupName);
        await _FilesPages.ViewFilePage.ConfirmButn.click();
        await _FilesPages.ViewFilePage.OKButn.click();
        await _FilesPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.TransferCentersPage.loadCondition();
        await _FilesPages.TransferCentersPage.transferCenterFilter.input(reference)
        await _FilesPages.ViewFilePage.groupNameRef.jsClick();
        // await _FilesPages.ViewFilePage.loadConditionForViewGroup();
        await _FilesPages.ViewFilePage.byGroupFilter.input(reference);
        await promise.all([
            await ensure(_FilesPages.ViewFilePage.viewGroupTxn1).textIs(reference)
        ])
    });

    it('View File page click Delete button ', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = "ALL - Universal File Format";
        await _FilesPages.uploadFilePage.fsUpload(_FilesPages, paymentType, SIT ? testData.ViewFile.SIT.fileName2 : testData.ViewFile.UAT.fileName2, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.Filter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage2();
        await _FilesPages.ViewFilePage.ViewFileTxn1.getText().then(text => {
            reference = text;
        })
        await _FilesPages.ViewFilePage.SelectTxn.jsClick();
        await _FilesPages.ViewFilePage.TxnDeleButn.jsClick();
        await _FilesPages.ViewFilePage.deleteButn.click();
        await _FilesPages.ViewFilePage.OKButn.click();
        await _FilesPages.ViewFilePage.ViewFileCancel.jsClick();
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage2();
        await promise.all([
            await ensure(_FilesPages.ViewFilePage.ViewFileTxn1).textNotContains(reference),
        ])
    });

    it('View File page click Rebatch button ', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage2();
        await _FilesPages.ViewFilePage.ViewFileTxn1.getText().then(text => {
            reference = text;
        })
        await _FilesPages.ViewFilePage.SelectTxn.jsClick();
        await _FilesPages.ViewFilePage.RebatchButn.jsClick();
        await _FilesPages.ViewFilePage.SeleNewFile.jsClick();
        let FileName = 'FileName' + generatedID();
        await _FilesPages.ViewFilePage.VirtFileName.input(FileName);
        await _FilesPages.ViewFilePage.RebatConfButn.jsClick();
        await _FilesPages.ViewFilePage.OKButn.click();
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(FileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await promise.all([
            await ensure(_FilesPages.ViewFilePage.ViewFileTxn1).textIs(reference),
        ])
    });

    it('View File page Delete file ', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.ViewFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.ViewFilePage.deleteFileButn.jsClick();
        await _FilesPages.ViewFilePage.deleteButn.click();
        await _FilesPages.ViewFilePage.OKButn.click();
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.ViewFilePage.Filefilter.input(fileName);
        await Promise.all([
            await ensure(_FilesPages.ViewFilePage.FileResult).textIs(testData.ViewFile.labelNoInformationDisplay)
        ]);
    });
});