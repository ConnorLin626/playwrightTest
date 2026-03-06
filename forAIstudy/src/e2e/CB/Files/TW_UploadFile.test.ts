/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages } from '../../../pages/CB';
import { ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('TW_testData.json');
let fileName = "";
let fileType = "ALL - Universal File Format";

describe('TW DBU File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Upload ACH Bulk Collection with ACH Format', async function () {
        let fileType = "ACH Bulk Collection - ACH Format"
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameCOL : testData.FileService.UAT.fileNameCOL, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload ACH Bulk Payment with ACH Format', async function () {
        let fileType = "ACH Bulk Payment - ACH Format"
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameBPY : testData.FileService.UAT.fileNameBPY, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload ACH Payroll with ACH Format', async function () {
        let fileType = "ACH Payroll - ACH Format"
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNamePAY : testData.FileService.UAT.fileNamePAY, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload ACH Payroll 02 with ACH Format', async function () {
        let fileType = "ACH Payroll (Alternate) - ACH Format"
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNamePAY02 : testData.FileService.UAT.fileNamePAY02, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });

        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload ACH Manage Payroll with ACH Format', async function () {
        let fileType = "ACH Management Payroll - ACH Format"
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameManagePAY : testData.FileService.UAT.fileNameManagePAY, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });

        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload ACH ManagePayroll 02 with ACH Format', async function () {
        let fileType = "ACH Management Payroll (Alternate) - ACH Format"
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameManagePAY02 : testData.FileService.UAT.fileNameManagePAY02, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });

        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload All ACH Payment with UFF Format', async function () {
        let fileType = "ALL - Universal File Format"
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameAllACH : testData.FileService.UAT.fileNameAllACH, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });

        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    //add for AB-9145:check view transaction, purpose code/subpurpose code/description value
    it('Upload TT with UFF Format', async function () {
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameAllTT : testData.FileService.UAT.fileNameAllTT, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });

        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewTTPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForTT).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.purposecodeValue).textContains(testData.FileService.FSTTValue.purposeCode),
            await ensure(_FilesPages.uploadFilePage.subPurposeCodeValue).textContains(testData.FileService.FSTTValue.subPurposeCode),
            await ensure(_FilesPages.uploadFilePage.otherDesValue).textContains(testData.FileService.FSTTValue.otherDes),
        ]);
    });
});

//add for AB-9145:check view transaction, purpose code/subpurpose code/description value
describe('TW OBU File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.TWOBU.SIT.loginCompanyId : testData.TWOBU.UAT.loginCompanyId, SIT ? testData.TWOBU.SIT.loginUserId : testData.TWOBU.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
    it('Upload TT with UFF Format', async function () {
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.TWOBU.SIT.fileNameAllTT : testData.TWOBU.UAT.fileNameAllTT, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });

        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewTTPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForTT).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.purposecodeValue).textContains(testData.TWOBU.FSTTValue.purposeCode),
            await ensure(_FilesPages.uploadFilePage.subPurposeCodeValue).textContains(testData.TWOBU.FSTTValue.subPurposeCode),
            //await ensure(_FilesPages.uploadFilePage.otherDesValue).textContains(testData.TWOBU.FSTTValue.otherDes),
        ]);
    });
});