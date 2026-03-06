/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, ApprovalsPages, PaymentsPages } from '../../../pages/CB';
import { Menu } from "../../../config/menu";
import { ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('SG_testData.json');
let fileName = "";
let paymentType = "ALL - Universal File Format";
let approvalOption = "transaction";

describe('File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Upload Bulk Payment DBS via FileServices Upload By Transaction', async function () {
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileName : testData.FileService.UAT.fileName, testData.FileService.approvalOptionByTransaction).then(async data => {
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

    it('Approval Bulk Payment DBS created via FS Upload', async function () {
        await _PaymentsPages.BulkPaymentpage.approveButton.click();
        await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.FileService.challengeResponse);
        await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.BulkPaymentpage.approveButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentpage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _FilesPages.transferCentersPage.loadCondition();
        await _FilesPages.transferCentersPage.transferCenterfilter.input(fileName);
        await _FilesPages.transferCentersPage.referenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionforViewPaymentPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received),
        ]);
    });

    it('Upload New UFF GIRO Payment with 5 transaction via By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameForGIRO : testData.FileService.UAT.fileNameForGIRO, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();


        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForGIRO).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForGIRO).isNotEmpty(),
        ]);
    });

    it('Upload New UFF LVT Payment with 5 transaction via By Transaction', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameForGIRO : testData.FileService.UAT.fileNameForGIRO, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForGIRO).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForGIRO).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Bulk Payment with 5 transaction via By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameForBPY : testData.FileService.UAT.fileNameForBPY, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Bulk Collection with 5 transaction via Per Transaction', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameForCOL : testData.FileService.UAT.fileNameForCOL, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Payroll with 5 transaction via By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSAL : testData.FileService.UAT.fileNameForSAL, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Payroll DBS with 5 transaction via Per Transaction', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSPE : testData.FileService.UAT.fileNameForSPE, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();


        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Payroll 02 with 5 transaction via By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSL2 : testData.FileService.UAT.fileNameForSL2, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();


        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Payroll 02 DBS with 5 transaction via Per Transaction', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSE2 : testData.FileService.UAT.fileNameForSE2, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Management Payroll with 5 transaction via By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.FileService.SIT.fileNameForMP : testData.FileService.UAT.fileNameForMP, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Management Payroll DBS with 5 transaction via Per Transaction', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForMPE : testData.FileService.UAT.fileNameForMPE, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Management Payroll 02 with 5 transaction via By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForMP2 : testData.FileService.UAT.fileNameForMP2, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Management Payroll 02 DBS with 5 transaction via Per Transaction', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForME2 : testData.FileService.UAT.fileNameForME2, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Cheque Express(BCH) with 5 transaction via By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForBCH : testData.FileService.UAT.fileNameForBCH, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF Corporate Cheque(CCH) with 5 transaction via Per Transaction', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForCCH : testData.FileService.UAT.fileNameForCCH, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload New UFF MEPS(HVT) with 5 transacitons via By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForMEP : testData.FileService.UAT.fileNameForMEP, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();


        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForGIRO).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForGIRO).isNotEmpty(),
        ]);
    });

    it('Upload New UFF with All Payment Types via By Transaction', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForALL : testData.FileService.UAT.fileNameForALL, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();


        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForGIRO).isNotEmpty(),
        ]);
    });
});