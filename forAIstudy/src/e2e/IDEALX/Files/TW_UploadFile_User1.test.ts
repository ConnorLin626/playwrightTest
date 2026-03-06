/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import moment = require('moment');

let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('TW_testData.json');
let uploadTestData = _FilesPages.fetchTestData("uploadTestData/TW_uploadTestData.json");
let fileName = "";
let reference = "";
let reference2 = "";
let reference3 = "";
let uploadSuccessFlag = false;
let remitFileName = '';

describe('TW File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService1.SIT.loginCompanyId : testData.FileService1.UAT.loginCompanyId, SIT ? testData.FileService1.SIT.loginUserId : testData.FileService1.UAT.loginUserId, SIT ? 123123 : testData.FileService1.UAT.Password); });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Upload ACH Bulk Payment with ACH Format', async function () {
        let fileType = "ACH Bulk Payment - ACH Format"
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameBPY : testData.FileService1.UAT.fileNameBPY, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();
        await checkViewBulkPageAllField(false, false);
    });

    it('Upload ACH Bulk Collection with ACH Format', async function () {
        let fileType = "ACH Bulk Collection - ACH Format"
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameCOL : testData.FileService1.UAT.fileNameCOL, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();
        await checkViewBulkCOLPageAllField(false); //Add for IDXP-812
    });

    it('Upload ACH Payroll with ACH Format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ACH Payroll - ACH Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNamePAY : testData.FileService1.UAT.fileNamePAY, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();
        await checkViewBulkPageAllField(false, true);
    });

    it('Upload ACH Payroll 02 with ACH Format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ACH Payroll (Alternate) - ACH Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNamePAY02 : testData.FileService1.UAT.fileNamePAY02, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload ACH Manage Payroll with ACH Format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ACH Management Payroll - ACH Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameManagePAY : testData.FileService1.UAT.fileNameManagePAY, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload ACH ManagePayroll 02 with ACH Format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ACH Management Payroll (Alternate) - ACH Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameManagePAY02 : testData.FileService1.UAT.fileNameManagePAY02, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    it('Upload All ACH Payment with UFF Format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameAllACH : testData.FileService1.UAT.fileNameAllACH, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValue).isNotEmpty(),
        ]);
    });

    //add for IDXP-1954: To enable IDEAL file upload to debit TW, pay FCY
    it('Upload ICT with From account ccy = TWD and Payment ccy is FCY', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameICTTWDToFCY : testData.FileService1.UAT.fileNameICTTWDToFCY, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await checkViewICTPageAllField();

    });

    it('Upload BACH with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameForBACH : testData.FileService1.UAT.fileNameForBACH, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewBulkPageAllField(true, false); //Add for IDXP-812   
    });

    //add for DASB-66563
    it('Upload eACH and Bulk eACH with UFF Format that biller service id is 577 or 615', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameForErrorBillerServiceId : testData.FileService1.UAT.fileNameForErrorBillerServiceId, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService1.errorMsgForBulkeACHAndeACH),
            await ensure(_FilesPages.uploadFilePage.errorMsg1).textContains(testData.FileService1.errorMsgForBulkeACHAndeACH),
        ]);

        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.eACHBulkPayment.SIT.fileNameForErrorBillerServiceId : testData.eACHBulkPayment.UAT.fileNameForErrorBillerServiceId, testData.eACHBulkPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService1.errorMsgForBulkeACHAndeACH),
            // await ensure(_FilesPages.uploadFilePage.errorMsg1).textContains(testData.FileService1.errorMsgForBulkeACHAndeACH),
        ]);
    });

    //add for IEBAA-3412
    it('Upload HQ txn with Show all', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FileService1.SIT.loginCompanyId02 : testData.FileService1.UAT.loginCompanyId02, SIT ? testData.FileService1.SIT.loginUserId02 : testData.FileService1.UAT.loginUserId02, SIT ? 123123 : testData.FileService1.UAT.Password);
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload8(_FilesPages, testData.FileService1.organisationAll, fileType, SIT ? testData.FileService1.SIT.fileNameICTHQ : testData.FileService1.UAT.fileNameICTHQ, testData.FileService1.approvalOptionByFile).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.approveOptionValue).textContains(testData.FileService1.approverOptionByFileValue),
            await ensure(_FilesPages.uploadFilePage.approveGroup).textContains(testData.FileService1.groupA),
        ]);
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentType).textContains(uploadTestData.ICT.paymentType),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.referenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(uploadTestData.ICT.amountValue),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT? uploadTestData.ICT.SIT.fromHQAccount: uploadTestData.ICT.UAT.fromHQAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT? uploadTestData.ICT.SIT.toHQAccount: uploadTestData.ICT.UAT.toHQAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(uploadTestData.ICT.amountValue),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.activityLog).textContains("Create")
        ]);
    });

    it('Upload SC txn with Show all', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FileService1.SIT.loginCompanyId02 : testData.FileService1.UAT.loginCompanyId02, SIT ? testData.FileService1.SIT.loginUserId02 : testData.FileService1.UAT.loginUserId02, SIT ? 123123 : testData.FileService1.UAT.Password);
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload8(_FilesPages, testData.FileService1.organisationAll, fileType, SIT ? testData.FileService1.SIT.fileNameICTSC : testData.FileService1.UAT.fileNameICTSC, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.approveOptionValue).textContains(testData.FileService1.approverOptionByTransactionValue),
            // await ensure(_FilesPages.uploadFilePage.approveGroup).textContains(testData.FileService1.groupA),
        ]);
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentType).textContains(uploadTestData.ICT.paymentType),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.referenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(uploadTestData.ICT.amountValue),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT? uploadTestData.ICT.SIT.fromSCAccount:uploadTestData.ICT.UAT.fromSCAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT? uploadTestData.ICT.SIT.toSCAccount: uploadTestData.ICT.UAT.fromSCAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(uploadTestData.ICT.amountValue),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.activityLog).textContains("Create")
        ]);
    });

    //add for IEBAA-3647
    it('Upload ACH Bulk Collection with ACH Format and Body - Request Type value is invalid', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FileService1.SIT.loginCompanyId : testData.FileService1.UAT.loginCompanyId, SIT ? testData.FileService1.SIT.loginUserId : testData.FileService1.UAT.loginUserId, SIT ? 123123 : testData.FileService1.UAT.Password); 
        let fileType = "ACH Bulk Collection - ACH Format"
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload9(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameCOLInvalidReqType : testData.FileService1.UAT.fileNameCOLInvalidReqType, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService1.errorMessageOfInvalidReqType);
    });

    it('Upload HQ txn with Show all - HQ do not allow amend payment date SC allow', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FileService1.SIT.loginCompanyId03 : testData.FileService1.UAT.loginCompanyId03, SIT ? testData.FileService1.SIT.loginUserId03 : testData.FileService1.UAT.loginUserId03, SIT ? 123123 : testData.FileService1.UAT.Password);
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        //let currentDate = moment(new Date()).add(1, 'days').format('DD MMM YYYY');
        let fileName = "";
        await _FilesPages.uploadFilePage.filesMangementCenter.click();
        await _FilesPages.uploadFilePage.uploadFilesTab.click();
        await _FilesPages.uploadFilePage.loadCondition();
        await _FilesPages.uploadFilePage.browseforfiles.select(SIT ? testData.FileService1.SIT.fileNameICT3647 : testData.FileService1.UAT.fileNameICT3647).then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await _FilesPages.uploadFilePage.scrollTo(0, 300);
        await _FilesPages.uploadFilePage.loadConditionUpload();
        await _FilesPages.uploadFilePage.Organisationselect.click();
        await _FilesPages.uploadFilePage.selectAll.click();
        await _FilesPages.uploadFilePage.PaymentType.select(fileType);
        await _FilesPages.uploadFilePage.approvalOption.input(testData.FileService1.approvalOptionByTransaction);
        await _FilesPages.uploadFilePage.byTxn.jsClickIfExist();
        await _FilesPages.uploadFilePage.scrollTo(0, 300);
        await _FilesPages.uploadFilePage.amendPaymentDate.select(currentDate);
        // await this.ConfidentialFile.jsClick();
        await _FilesPages.uploadFilePage.uploadButton.click();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService1.errorMessageOfAmendDateNotValid);
    });
});


describe('TW File Services Single Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService1.SIT.loginCompanyId : testData.FileService1.UAT.loginCompanyId01, SIT ? testData.FileService1.SIT.loginUserId : testData.FileService1.UAT.loginUserId01, SIT ? 123123 : testData.FileService1.UAT.Password); });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
   

    //add for AB-9145:check view transaction, purpose code/subpurpose code/description value
    it('Upload TT with UFF Format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameAllTT : testData.FileService1.UAT.fileNameAllTT, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewTTPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForTT).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.purposecodeValue).textContains(testData.FileService1.FSTTValue.purposeCode),
            await ensure(_FilesPages.uploadFilePage.subPurposeCodeValue).textContains(testData.FileService1.FSTTValue.subPurposeCode),
            //await ensure(_FilesPages.uploadFilePage.otherDesValue).textContains(testData.FileService1.FSTTValue.otherDes),
        ]);
    });

    //add for IDXP-389:check view transaction, purpose code/subpurpose code/description value
    it('Upload TT with new Add List 2 purpose code', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameTTList2 : testData.FileService1.UAT.fileNameTTList2, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewTTPage();
        await checkViewTTPageAllField(false); //Add for IDXP-812

    });

    //add for IDXP-389
    it('Upload ACT with deleted list 5 purpose code', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameACTList5 : testData.FileService1.UAT.fileNameACTList5, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await _FilesPages.uploadFilePage.errorMsg.textContains(testData.FileService1.errorMsg),
        ]);
    });

    // Add for IDXP-812
    it('Upload ACT with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameForACT : testData.FileService1.UAT.fileNameForACT, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await checkViewACTPageAllField(false,true); //Add for IDXP-812   
    });

    //Add for R8.22 IDXP-2022
    it('Upload ACT with UFFv2 simple format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameForACTUFFv2 : testData.FileService1.UAT.fileNameForACTUFFv2, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await checkViewACTPageAllField(false,false); //Add for IDXP-812   
    });

    //add for IDXP-1954: To enable IDEAL file upload to debit TW, pay FCY
    it('Upload ACT with From account ccy = TWD and Payment ccy is FCY', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameACTTWDToFCY : testData.FileService1.UAT.fileNameACTTWDToFCY, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await checkViewACTPageAllField(true,true); //Add for IDXP-812   
    });

    //add for IDXP-1954: To enable IDEAL file upload to debit TW, pay FCY
    it('Upload TT with From account ccy = TWD and Payment ccy is FCY', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameTTTWDToFCY : testData.FileService1.UAT.fileNameTTTWDToFCY, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewTTPage();
        await checkViewTTPageAllField(true); //Add for IDXP-812

    });


    it('Upload eACH with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameForeACH : testData.FileService1.UAT.fileNameForeACH, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage();
        await checkViewFISCeACHPageAllField(false); //Add for IDXP-812   
    });

    //add for IDXP-2022
    it('Upload eACH with UFFV2 format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.UFFv2fileNameForeACH : testData.FileService1.UAT.UFFv2fileNameForeACH, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage();
        await Promise.all([
        await ensure(_PaymentsPages.eACHPaymentPage.headerRef).textIs(reference),
        await ensure(_PaymentsPages.eACHPaymentPage.eACHStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.eACHPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.deductAmountValue).textContains(uploadTestData.eACH.amountValue),
        await ensure(_PaymentsPages.eACHPaymentPage.fromAccountValue).textContains( (SIT ? uploadTestData.eACH.SIT.fromAccount : uploadTestData.eACH.UAT.fromAccount)),
        await ensure(_PaymentsPages.eACHPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.toNewPayeeAcctValue).textContains( uploadTestData.eACH.newPayeeAcctNumber),
        await ensure(_PaymentsPages.eACHPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.eACH.newPayeeName),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd1).textContains( uploadTestData.eACH.morePayeeAdd1),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd2).textContains(uploadTestData.eACH.morePayeeAdd2),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd3).textContains(uploadTestData.eACH.morePayeeAdd3),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentType).textContains( uploadTestData.eACH.paymentType),
        await ensure(_PaymentsPages.eACHPaymentPage.sendAmountValue).textContains( uploadTestData.eACH.amountValue),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankName).textContains(uploadTestData.eACH.payeeBankName),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankBrchName).textContains(uploadTestData.eACH.payeeBankBrchName),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankAdress1).textContains((SIT ? uploadTestData.eACH.SIT.payeeBankAdress : uploadTestData.eACH.UAT.payeeBankAdress)),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankCountry).textContains(uploadTestData.eACH.payeeBankCountry),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankSwiftBic).textContains( uploadTestData.eACH.payeeBankSwiftBic),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankCode).textContains(uploadTestData.eACH.payeeBankCode),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankBrchCode).textContains(uploadTestData.eACH.payeeBankBrchCode),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentDetailValue).textContains( uploadTestData.eACH.paymentDetail),
        await ensure(_PaymentsPages.eACHPaymentPage.messageValue).textContains(uploadTestData.eACH.message),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(uploadTestData.eACH.emailIdO),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(uploadTestData.FISC.emailId1),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(uploadTestData.FISC.emailId2),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(uploadTestData.FISC.emailId3),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(uploadTestData.FISC.emailId4),
        await ensure(_PaymentsPages.eACHPaymentPage.totalDeductValue).textContains(uploadTestData.eACH.amountValue),
        await ensure(_PaymentsPages.eACHPaymentPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.eACHPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create")
    ]); 
    });

    it('Upload FISC with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameForFISC : testData.FileService1.UAT.fileNameForFISC, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage();
        await checkViewFISCeACHPageAllField(true); //Add for IDXP-812   
    });

    //Add for R8.19 IDXP-1220
    it('Upload TT and ACT with UFF Format that account number more than max length', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.fileNameForTTandACT : testData.FileService1.UAT.fileNameForTTandACT, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService1.errorMsgForACTAcct),
            await ensure(_FilesPages.uploadFilePage.errorMsg1).textContains(testData.FileService1.errorMsgForTTAcct),
        ]);
    });

    //add for IDXP-2022
    it('Upload File with multi format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService1.SIT.MultiFileUFFv2 : testData.FileService1.UAT.MultiFileUFFv2, testData.FileService1.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.filepaymentReferenceLink2.getText().then(text => {
            reference2 = text;
        });
        await _FilesPages.uploadFilePage.filepaymentReferenceLink3.getText().then(text => {
            reference3 = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
         await Promise.all([
        await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeAcctValue).textContains(uploadTestData.ACTdetail.newPayeeAcct),
        await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(uploadTestData.ACTdetail.newPayeeName),
        await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(uploadTestData.ACTdetail.paymentType),
        await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(uploadTestData.ACTdetail.amountValue),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(uploadTestData.ACTdetail.paymentDetail),               
    ]); 
    
        await _FilesPages.uploadFilePage.cancelBtn.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.filepaymentReferenceLink2.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewTTPage();
         await Promise.all([ 
                await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd1Value).textContains(uploadTestData.TTSimple.payeeAdd1),
    ])
    await _FilesPages.uploadFilePage.cancelBtn.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await _FilesPages.uploadFilePage.filepaymentReferenceLink3.jsClick();
    await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage();
    
    await Promise.all([ 
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd1).textContains(uploadTestData.FISC.newPayeeAdd1),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd2).textContains(uploadTestData.FISC.newPayeeAdd2),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd3).textContains(uploadTestData.FISC.newPayeeAdd3),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankAdress1).textContains((SIT ? uploadTestData.FISC.SIT.payeeBankAdress : uploadTestData.FISC.UAT.payeeBankAdress)),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankCountry).textContains(uploadTestData.FISC.payeeBankCountry),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankSwiftBic).textContains((SIT ? uploadTestData.FISC.SIT.payeeBankSwiftBic : uploadTestData.FISC.UAT.payeeBankSwiftBic) ),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankCode).textContains(uploadTestData.FISC.payeeBankCode ),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankBrchCode).textContains( (SIT ? uploadTestData.FISC.SIT.payeeBankBrchCode : uploadTestData.FISC.UAT.payeeBankBrchCode)),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentDetailValue).textContains(  uploadTestData.FISC.paymentDetail ),
        await ensure(_PaymentsPages.eACHPaymentPage.messageValue).textContains( uploadTestData.FISC.message ),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains( uploadTestData.FISC.emailIdO ),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains( uploadTestData.FISC.emailId1 ),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains( uploadTestData.FISC.emailId2 ),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains( uploadTestData.FISC.emailId3 ),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains( uploadTestData.FISC.emailId4 ),
        ])





   
    

});
});


export async function checkViewTTPageAllField(isTWDtoFCY: Boolean) {

    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).textContains(uploadTestData.TT.amountValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(uploadTestData.TT.specPmtPurpose),
        await ensure(_FilesPages.uploadFilePage.subPurposeCodeValue).textContains(uploadTestData.TT.subPmtPurpose),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(uploadTestData.TT.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(SIT ? uploadTestData.TT.SIT.payeeBankName : uploadTestData.TT.UAT.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(SIT ? uploadTestData.TT.SIT.payeeBankLocation : uploadTestData.TT.UAT.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(uploadTestData.TT.payeeBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textIs(uploadTestData.TT.intermediaryBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textIs(uploadTestData.TT.intermediaryBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(uploadTestData.TT.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(uploadTestData.TT.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(uploadTestData.TT.bankChargeUs),
        await ensure(_PaymentsPages.TelegraphicTransferPage.domesticOutwardRemittance).textContains(uploadTestData.TT.domesticOutwardRemittance),
        await ensure(_PaymentsPages.TelegraphicTransferPage.beneficiaryCode).textContains(uploadTestData.TT.beneficiaryCode),
        // await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(uploadTestData.TT.messageToOrderingBank),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(uploadTestData.TT.messageToOrderingBank),
        await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.activityLog).textContains("Create")

    ]);

    if (isTWDtoFCY) {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.TT.SIT.fromAccount1 : uploadTestData.TT.UAT.fromAccount1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? uploadTestData.TT.SIT.fromAccount1 : uploadTestData.TT.UAT.fromAccount1),
        ]);
    } else {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.TT.SIT.fromAccount : uploadTestData.TT.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? uploadTestData.TT.SIT.fromAccount : uploadTestData.TT.UAT.fromAccount),
        ]);
    }
}

export async function checkViewICTPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentType).textContains(uploadTestData.ICT.paymentType),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(SIT ? uploadTestData.ICT.SIT.sendAmount : uploadTestData.ICT.UAT.sendAmount),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.ICT.SIT.fromAccount : uploadTestData.ICT.UAT.fromAccount),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? uploadTestData.ICT.SIT.toAccountValue : uploadTestData.ICT.UAT.toAccountValue),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(uploadTestData.ICT.amountValue),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.outwardRemitValue).textContains(uploadTestData.ICT.outwardRemitValue),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.beneficiaryCode).textContains(uploadTestData.ICT.beneficiaryCodeValue),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.purposeCodeValue).textContains(uploadTestData.ICT.purposeCodeValue),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.subPurposeCodeValue).textContains(uploadTestData.ICT.subPurposeCodeValue),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.activityLog).textContains("Create")
    ]);
}

export async function checkViewACTPageAllField(isTWDtoFCY: Boolean, isUFF:Boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(uploadTestData.ACT.newPayeeName),
        await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(uploadTestData.status.PendingApproval),
        // Add check all field
        await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(uploadTestData.ACT.amountValue),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.newPayeeAcctNum).textContains(uploadTestData.ACT.newPayeeAcct),
        await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(uploadTestData.ACT.paymentType),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(uploadTestData.ACT.paymentDetail),
        await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(uploadTestData.ACT.amountValue),
        await ensure(_PaymentsPages.AccountTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.activityLog).textContains("Create")
    ]);

    if (isTWDtoFCY) {
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.ACT.SIT.fromAccount1 : uploadTestData.ACT.UAT.fromAccount1),
        ]);
    } else {
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.ACT.SIT.fromAccount : uploadTestData.ACT.UAT.fromAccount),
        ]);
    }
    if(isUFF){
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.newPayeeAdd1Value).textContains(uploadTestData.ACT.newPayeeAdd1),
            await ensure(_PaymentsPages.AccountTransferPage.newPayeeAdd2Value).textContains(uploadTestData.ACT.newPayeeAdd2),
            await ensure(_PaymentsPages.AccountTransferPage.newPayeeAdd3Value).textContains(uploadTestData.ACT.newPayeeAdd3),
            await ensure(_PaymentsPages.AccountTransferPage.messageValue).textContains(uploadTestData.ACT.message),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId0),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId1),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId2),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId3),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId4)
        ]);
    }
}

export async function checkViewFISCeACHPageAllField(isFISC: Boolean) {
    //check eACH and FISC Payment
    await Promise.all([
        await ensure(_PaymentsPages.eACHPaymentPage.headerRef).textIs(reference),
        await ensure(_PaymentsPages.eACHPaymentPage.eACHStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.eACHPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.deductAmountValue).textContains(isFISC ? uploadTestData.FISC.amountValue : uploadTestData.eACH.amountValue),
        await ensure(_PaymentsPages.eACHPaymentPage.fromAccountValue).textContains(isFISC ? (SIT ? uploadTestData.FISC.SIT.fromAccount : uploadTestData.FISC.UAT.fromAccount) : (SIT ? uploadTestData.eACH.SIT.fromAccount : uploadTestData.eACH.UAT.fromAccount)),
        await ensure(_PaymentsPages.eACHPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.toNewPayeeAcctValue).textContains(isFISC ? uploadTestData.FISC.newPayeeAcctNumber : uploadTestData.eACH.newPayeeAcctNumber),
        await ensure(_PaymentsPages.eACHPaymentPage.toNewPayeeNameValue).textContains(isFISC ? uploadTestData.FISC.newPayeeName : uploadTestData.eACH.newPayeeName),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd1).textContains(isFISC ? uploadTestData.FISC.newPayeeAdd1 : uploadTestData.eACH.newPayeeAdd1),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd2).textContains(isFISC ? uploadTestData.FISC.newPayeeAdd2 : uploadTestData.eACH.newPayeeAdd2),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd3).textContains(isFISC ? uploadTestData.FISC.newPayeeAdd3 : uploadTestData.eACH.newPayeeAdd3),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentType).textContains(isFISC ? uploadTestData.FISC.paymentType : uploadTestData.eACH.paymentType),
        await ensure(_PaymentsPages.eACHPaymentPage.sendAmountValue).textContains(isFISC ? uploadTestData.FISC.amountValue : uploadTestData.eACH.amountValue),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankName).textContains(isFISC ? (SIT ? uploadTestData.FISC.SIT.payeeBankName : uploadTestData.FISC.UAT.payeeBankName) : uploadTestData.eACH.payeeBankName),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankBrchName).textContains(isFISC ? (SIT ? uploadTestData.FISC.SIT.payeeBankBrchName : uploadTestData.FISC.UAT.payeeBankBrchName) : uploadTestData.eACH.payeeBankBrchName),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankAdress1).textContains(isFISC ? (SIT ? uploadTestData.FISC.SIT.payeeBankAdress : uploadTestData.FISC.UAT.payeeBankAdress) : (SIT ? uploadTestData.eACH.SIT.payeeBankAdress : uploadTestData.eACH.UAT.payeeBankAdress)),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankCountry).textContains(isFISC ? uploadTestData.FISC.payeeBankCountry : uploadTestData.eACH.payeeBankCountry),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankSwiftBic).textContains(isFISC ? (SIT ? uploadTestData.FISC.SIT.payeeBankSwiftBic : uploadTestData.FISC.UAT.payeeBankSwiftBic) : uploadTestData.eACH.payeeBankSwiftBic),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankCode).textContains(isFISC ? uploadTestData.FISC.payeeBankCode : uploadTestData.eACH.payeeBankCode),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankBrchCode).textContains(isFISC ? (SIT ? uploadTestData.FISC.SIT.payeeBankBrchCode : uploadTestData.FISC.UAT.payeeBankBrchCode) : uploadTestData.eACH.payeeBankBrchCode),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentDetailValue).textContains(isFISC ? uploadTestData.FISC.paymentDetail : uploadTestData.eACH.paymentDetail),
        await ensure(_PaymentsPages.eACHPaymentPage.messageValue).textContains(isFISC ? uploadTestData.FISC.message : uploadTestData.eACH.message),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(isFISC ? uploadTestData.FISC.emailIdO : uploadTestData.eACH.emailIdO),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(isFISC ? uploadTestData.FISC.emailId1 : uploadTestData.FISC.emailId1),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(isFISC ? uploadTestData.FISC.emailId2 : uploadTestData.FISC.emailId2),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(isFISC ? uploadTestData.FISC.emailId3 : uploadTestData.FISC.emailId3),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(isFISC ? uploadTestData.FISC.emailId4 : uploadTestData.FISC.emailId4),
        await ensure(_PaymentsPages.eACHPaymentPage.totalDeductValue).textContains(isFISC ? uploadTestData.FISC.amountValue : uploadTestData.eACH.amountValue),
        await ensure(_PaymentsPages.eACHPaymentPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.eACHPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create")
    ]);
    if (isFISC) {
        await Promise.all([
            await ensure(_PaymentsPages.eACHPaymentPage.bankCharge).textContains(uploadTestData.FISC.bankChargeUs),
            await ensure(_PaymentsPages.eACHPaymentPage.chargeAccount).textContains(SIT ? uploadTestData.FISC.SIT.chargeAccount : uploadTestData.FISC.UAT.chargeAccount),
        ]);
    } else {
        await Promise.all([
            //Test data changes, no such field
            //await ensure(_PaymentsPages.eACHPaymentPage.payeeBankCity).textContains(SIT ? uploadTestData.eACH.SIT.payeeBankCity : uploadTestData.eACH.UAT.payeeBankCity),
            await ensure(_PaymentsPages.eACHPaymentPage.billerServiceId).textContains(uploadTestData.eACH.billerServiceId),
        ]);
    }
}

export async function checkViewBulkPageAllField(isBulkACHUFF: Boolean, isACHPayroll: Boolean) {
    await Promise.all([
        // add for IDXP-812 chek Bulk ACH UFF and ACH format
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create"),
    ]);
    if (isBulkACHUFF) {
        Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? uploadTestData.BulkACH.SIT.fromAccount : uploadTestData.BulkACH.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.BulkACH.paymentType),
            await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(uploadTestData.BulkACH.bankChargeUs),
            await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(SIT ? uploadTestData.BulkACH.SIT.chargeAccount : uploadTestData.BulkACH.UAT.chargeAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.billerServiceIDValue).textContains(uploadTestData.BulkACH.billerServiceId),
            await ensure(_PaymentsPages.BulkPaymentPage.totalAmountValue).textContains(uploadTestData.BulkACH.amountValue),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.BulkACH.newPayeeName),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(uploadTestData.BulkACH.newPayeeNickName),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.BulkACH.payeeBankName),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBrchBankName).textContains(uploadTestData.BulkACH.payeeBankBrchName),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.BulkACH.payeeBankSwiftBic),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.BulkACH.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue).textContains(uploadTestData.BulkACH.nationalID),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.BulkACH.amountValue),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView).textContains(uploadTestData.BulkACH.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains(uploadTestData.BulkACH.stockCode),
            await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(uploadTestData.BulkACH.passbookMemo),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView).textContains(uploadTestData.BulkACH.freetextArea),
            await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.BulkACH.message),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkACH.emailIdO),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkACH.emailId1),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkACH.emailId2),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkACH.emailId3),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkACH.emailId4)
        ])
    } else {
        //for ACH format mapping do not have payee name field so not check
        // check payee 1
        Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(isACHPayroll ? (SIT ? uploadTestData.ACHPayrollForACHFormat.SIT.fromAccount : uploadTestData.ACHPayrollForACHFormat.UAT.fromAccount) : (SIT ? uploadTestData.BulkACHForACHFormat.SIT.fromAccount : uploadTestData.BulkACHForACHFormat.UAT.fromAccount)),
            await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.paymentType : uploadTestData.BulkACHForACHFormat.paymentType),
            await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.bankChargeUs : uploadTestData.BulkACHForACHFormat.bankChargeUs),
            await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(isACHPayroll ? (SIT ? uploadTestData.ACHPayrollForACHFormat.SIT.chargeAccount : uploadTestData.ACHPayrollForACHFormat.UAT.chargeAccount) : (SIT ? uploadTestData.BulkACHForACHFormat.SIT.chargeAccount : uploadTestData.BulkACHForACHFormat.UAT.chargeAccount)),
            await ensure(_PaymentsPages.BulkPaymentPage.billerServiceIDValue).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.billerServiceId : uploadTestData.BulkACHForACHFormat.billerServiceId),
            await ensure(_PaymentsPages.BulkPaymentPage.totalAmountValue).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.amountValue : uploadTestData.BulkACHForACHFormat.amountValue),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.payeeBank : uploadTestData.BulkACHForACHFormat.payeeBank),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.newPayeeAcctNumber : uploadTestData.BulkACHForACHFormat.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue0).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.nationalID : uploadTestData.BulkACHForACHFormat.nationalID),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.itemAmount : uploadTestData.BulkACHForACHFormat.itemAmount),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.mandatedetails : uploadTestData.BulkACHForACHFormat.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains(isACHPayroll ? "-" : "-"),
            await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.passbookMemo : uploadTestData.BulkACHForACHFormat.passbookMemo),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.freetextArea : uploadTestData.BulkACHForACHFormat.freetextArea),
            // check payee 2
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaua2).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.payeeBank : uploadTestData.BulkACHForACHFormat.payeeBank),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.newPayeeAcctNumber : uploadTestData.BulkACHForACHFormat.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue2).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.nationalID : uploadTestData.BulkACHForACHFormat.nationalID),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.itemAmount : uploadTestData.BulkACHForACHFormat.itemAmount),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView2).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.mandatedetails : uploadTestData.BulkACHForACHFormat.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView2).textContains(isACHPayroll ? "-" : "-"),
            await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.passBookView2).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.passbookMemo1 : uploadTestData.BulkACHForACHFormat.passbookMemo1),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView2).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.freetextArea1 : uploadTestData.BulkACHForACHFormat.freetextArea1),
            // check payee 3
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual3).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.payeeBank : uploadTestData.BulkACHForACHFormat.payeeBank),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue3).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.newPayeeAcctNumber : uploadTestData.BulkACHForACHFormat.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue3).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.nationalID1 : uploadTestData.BulkACHForACHFormat.nationalID1),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue3).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountViewA3).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.itemAmount : uploadTestData.BulkACHForACHFormat.itemAmount),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView3).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.mandatedetails : uploadTestData.BulkACHForACHFormat.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView3).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.stockCode : uploadTestData.BulkACHForACHFormat.stockCode),
            await _PaymentsPages.BulkPaymentPage.showOptionView3.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView3).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.freetextArea2 : uploadTestData.BulkACHForACHFormat.freetextArea2),
            //check payee 4
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual4).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.payeeBank : uploadTestData.BulkACHForACHFormat.payeeBank),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue4).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.newPayeeAcctNumber : uploadTestData.BulkACHForACHFormat.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue4).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.nationalID1 : uploadTestData.BulkACHForACHFormat.nationalID1),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue3).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountViewA4).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.itemAmount : uploadTestData.BulkACHForACHFormat.itemAmount),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView4).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.mandatedetails : uploadTestData.BulkACHForACHFormat.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView4).textContains(isACHPayroll ? "-" : "-"),
            await _PaymentsPages.BulkPaymentPage.showOptionView4.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView4).textContains(isACHPayroll ? uploadTestData.ACHPayrollForACHFormat.freetextArea2 : uploadTestData.BulkACHForACHFormat.freetextArea2)

        ])
    }
}

export async function checkViewBulkCOLPageAllField(isBulkCOLUFF = true) {
    await Promise.all([
        // add for IDXP-812 chek Bulk Coll UFF and ACH format
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(isBulkCOLUFF ? (SIT ? uploadTestData.BulkCOL.SIT.fromAccount : uploadTestData.BulkCOL.UAT.fromAccount) : (SIT ? uploadTestData.BulkCOLACH.SIT.fromAccount : uploadTestData.BulkCOLACH.UAT.fromAccount)),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.BulkCOL.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isBulkCOLUFF ? uploadTestData.BulkCOL.amountValue : uploadTestData.BulkCOLACH.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(isBulkCOLUFF ? uploadTestData.BulkCOL.bankChargeUs : uploadTestData.BulkCOLACH.bankChargeUs),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(isBulkCOLUFF ? (SIT ? uploadTestData.BulkCOL.SIT.chargeAccount : uploadTestData.BulkCOL.UAT.chargeAccount) : (SIT ? uploadTestData.BulkCOLACH.SIT.chargeAccount : uploadTestData.BulkCOLACH.UAT.chargeAccount)),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.billerServiceIDValue).textContains(isBulkCOLUFF ? uploadTestData.BulkCOL.billerServiceId : uploadTestData.BulkCOLACH.billerServiceId),
        await ensure(_PaymentsPages.BulkPaymentPage.totalAmountValue).textContains(isBulkCOLUFF ? uploadTestData.BulkCOL.amountValue : uploadTestData.BulkCOLACH.amountValue),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create"),
    ]);
    if (isBulkCOLUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.BulkCOL.newPayeeName),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(uploadTestData.BulkCOL.newPayeeNickName),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.BulkCOL.payeeBankName),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBrchBankName).textContains(uploadTestData.BulkCOL.payeeBankBrchName),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.BulkCOL.payeeBankSwiftBic),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.BulkCOL.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue).textContains(uploadTestData.BulkCOL.nationalID),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.BulkCOL.amountValue),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView).textContains(uploadTestData.BulkCOL.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains(uploadTestData.BulkCOL.stockCode),
            await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(uploadTestData.BulkCOL.passbookMemo),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView).textContains(uploadTestData.BulkCOL.freetextArea),
            await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.BulkCOL.message),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkCOL.emailIdO),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkCOL.emailId1),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkCOL.emailId2),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkCOL.emailId3),
            await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkCOL.emailId4)
        ]);
    } else {
        //for ACH format mapping do not have payee name field so not check
        // check payee 1
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(uploadTestData.BulkCOLACH.payeeBank),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.BulkCOLACH.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue0).textContains(uploadTestData.BulkCOLACH.nationalID),
            await ensure(_PaymentsPages.BulkPaymentPage.DDARefValue0).textContains(uploadTestData.BulkCOLACH.ddaRef),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.BulkCOLACH.itemAmount),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView).textContains(uploadTestData.BulkCOLACH.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains("-"),
            await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(uploadTestData.BulkCOLACH.passbookMemo),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView).textContains(uploadTestData.BulkCOLACH.freetextArea),
            // check payee 2
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaua2).textContains(uploadTestData.BulkCOLACH.payeeBank),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.BulkCOLACH.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue2).textContains(uploadTestData.BulkCOLACH.nationalID),
            await ensure(_PaymentsPages.BulkPaymentPage.DDARefValue2).textContains(uploadTestData.BulkCOLACH.ddaRef),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.BulkCOLACH.itemAmount),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView2).textContains(uploadTestData.BulkCOLACH.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView2).textContains("-"),
            await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.passBookView2).textContains(uploadTestData.BulkACHForACHFormat.passbookMemo1),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView2).textContains(uploadTestData.BulkACHForACHFormat.freetextArea1),
            // check payee 3
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual3).textContains(uploadTestData.BulkCOLACH.payeeBank),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue3).textContains(uploadTestData.BulkCOLACH.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue3).textContains(uploadTestData.BulkCOLACH.nationalID1),
            await ensure(_PaymentsPages.BulkPaymentPage.DDARefValue3).textContains(uploadTestData.BulkCOLACH.ddaRef),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue3).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountViewA3).textContains(uploadTestData.BulkCOLACH.itemAmount),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView3).textContains(uploadTestData.BulkCOLACH.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView3).textContains(uploadTestData.BulkCOLACH.stockCode),
            await _PaymentsPages.BulkPaymentPage.showOptionView3.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView3).textContains(uploadTestData.BulkCOLACH.freetextArea2),
            //check payee 4
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual4).textContains(uploadTestData.BulkCOLACH.payeeBank),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue4).textContains(uploadTestData.BulkCOLACH.newPayeeAcctNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue4).textContains(uploadTestData.BulkCOLACH.nationalID1),
            await ensure(_PaymentsPages.BulkPaymentPage.DDARefValue4).textContains(uploadTestData.BulkCOLACH.ddaRef),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue4).textContains(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.amountViewA4).textContains(uploadTestData.BulkCOLACH.itemAmount),
            await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView4).textContains(uploadTestData.BulkCOLACH.mandatedetails),
            await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView4).textContains("-"),
            await _PaymentsPages.BulkPaymentPage.showOptionView4.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.freeTextView4).textContains(uploadTestData.BulkCOLACH.freetextArea2),
            await ensure(_PaymentsPages.eACHPaymentPage.nextApprover).isNotEmpty()
        ]);
    }
}