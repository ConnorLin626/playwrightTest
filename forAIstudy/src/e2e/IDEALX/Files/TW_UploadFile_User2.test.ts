/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('TW_testData.json');
let uploadTestData = _FilesPages.fetchTestData("uploadTestData/TW_uploadTestData.json");
let fileName = "";
let reference = "";
let uploadSuccessFlag = false;
let remitFileName = '';

describe('TW File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService2.SIT.loginCompanyId : testData.FileService2.UAT.loginCompanyId, SIT ? testData.FileService2.SIT.loginUserId : testData.FileService2.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });



    it('Upload Bulk COL with UFF format by File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService2.SIT.fileNameForUFFCOL : testData.FileService2.UAT.fileNameForUFFCOL, testData.FileService2.approvalOptionByFile).then(async data => {
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
        await checkViewBulkCOLPageAllField(true); //Add for IDXP-812   
    });

    it('Upload Payroll 02 with UFF format by File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService2.SIT.fileNameForUFFSL2 : testData.FileService2.UAT.fileNameForUFFSL2, testData.FileService2.approvalOptionByFile).then(async data => {
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
        await checkViewUFFSL2PageAllField(); //Add for IDXP-812   
    });

    it('Upload ACH Payroll with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService2.SIT.fileNameForUFFASA : testData.FileService2.UAT.fileNameForUFFASA, testData.FileService2.approvalOptionByTransaction).then(async data => {
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
        await checkViewACHPayrollPageAllField(true); //Add for IDXP-812   
    });

    it('Upload ACH Payroll 02 with UFF format by File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "ALL - Universal File Format"
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService2.SIT.fileNameForUFFAS2 : testData.FileService2.UAT.fileNameForUFFAS2, testData.FileService2.approvalOptionByFile).then(async data => {
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

        await checkViewACHPayrollPageAllField(false); //Add for IDXP-812   
    });

    it('Upload DD with remittance format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let fileType = "Remittance - Regional Remittance";
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService2.SIT.fileNameForDDRemit : testData.FileService2.UAT.fileNameForDDRemit, testData.FileService2.approvalOptionByFile).then(async data => {
            remitFileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag = true;
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();

        await checkViewDDPageAllField(); //Add for IDXP-812   
        // Remittance format file, just only can upload one time, so delete it for last time to upload
        if (uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await _FilesPages.uploadFilePage.filesMenu.click();
            await _FilesPages.ViewFilePage.loadCondition();
            await _FilesPages.ViewFilePage.Filefilter.input(remitFileName);
            await _FilesPages.ViewFilePage.FileNameLink.jsClick();
            await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
            await _FilesPages.ViewFilePage.deleteFileButn.jsClick();
            await _FilesPages.ViewFilePage.deleteButn.click();
            await _FilesPages.ViewFilePage.OKButn.click();
            uploadSuccessFlag = false;
            remitFileName = '';
        }
    });
});
describe('TW File Upload with holding company', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.files.SIT.loginCompanyId : testData.files.UAT.loginCompanyId, SIT ? testData.files.SIT.loginUserId : testData.files.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Upload payroll with FISC file format and ticked Confidential File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        let paymentType = "Payroll - Bulk FISC";
        let approvalOption = "By file amount - in TWD";
        await _FilesPages.uploadFilePage.fsUpload3(_FilesPages, SIT ? testData.files.SIT.organisation : testData.files.UAT.organisation, paymentType, SIT ? testData.files.SIT.fileName : testData.files.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.ShowAdditionalFilters.jsClick();
        await _FilesPages.uploadFilePage.scrollTo(0, 300);
        await _FilesPages.uploadFilePage.organisation.select(SIT ? testData.files.SIT.organisation : testData.files.UAT.organisation);
        await _FilesPages.uploadFilePage.search.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.FromAccount).textContains(SIT ? testData.files.SIT.FromAccount : testData.files.UAT.FromAccount),
            await ensure(_FilesPages.uploadFilePage.Amount).textContains(SIT ? testData.files.SIT.Amount : testData.files.UAT.Amount),
        ]);
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await checkViewFISCPayrollPageAllField(); // Add for IDXP-812
    });
});


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
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isBulkCOLUFF ? uploadTestData.BulkCOL.amountValue : uploadTestData.BulkCOLACH.amountValue),
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

export async function checkViewUFFSL2PageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT? uploadTestData.SL2UFF.SIT.fromAccount: uploadTestData.SL2UFF.SIT.fromAccount ),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(uploadTestData.SL2UFF.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.SL2UFF.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(uploadTestData.SL2UFF.bankChargeUs),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(SIT? uploadTestData.SL2UFF.SIT.chargeAccount: uploadTestData.SL2UFF.SIT.chargeAccount ),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.SL2UFF.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(uploadTestData.SL2UFF.newPayeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(uploadTestData.SL2UFF.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBrchBankName).textContains(uploadTestData.SL2UFF.payeeBankBrchName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.SL2UFF.payeeBankSwiftBic),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.SL2UFF.newPayeeAcctNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.SL2UFF.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(uploadTestData.SL2UFF.transactionCode),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.SL2UFF.refForPayee),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.SL2UFF.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.SL2UFF.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.SL2UFF.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.SL2UFF.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.SL2UFF.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.SL2UFF.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.SL2UFF.emailId4),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create")
    ]);
}

export async function checkViewACHPayrollPageAllField(isACHPayroll: Boolean) {
    // add for IDXP-812 check ACH Payroll/ACH Payroll 02 all field 
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(isACHPayroll ? uploadTestData.ASAUFF.fromAccount : uploadTestData.AS2UFF.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.paymentType : uploadTestData.AS2UFF.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isACHPayroll ? uploadTestData.ASAUFF.amountValue : uploadTestData.AS2UFF.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(isACHPayroll ? uploadTestData.ASAUFF.bankCharge : uploadTestData.AS2UFF.bankChargeUs),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.billerServiceIDValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.billerServiceId : uploadTestData.AS2UFF.billerServiceId),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.newPayeeName : uploadTestData.AS2UFF.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.newPayeeNickName : uploadTestData.AS2UFF.newPayeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(isACHPayroll ? uploadTestData.ASAUFF.payeeBankName : uploadTestData.AS2UFF.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBrchBankName).textContains(isACHPayroll ? uploadTestData.ASAUFF.payeeBankBrchName : uploadTestData.AS2UFF.payeeBankBrchName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(isACHPayroll ? uploadTestData.ASAUFF.payeeBankSwiftBic : uploadTestData.AS2UFF.payeeBankSwiftBic),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.newPayeeAcctNumber : uploadTestData.AS2UFF.newPayeeAcctNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.nationalIDValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.nationalID : uploadTestData.AS2UFF.nationalID),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isACHPayroll ? uploadTestData.ASAUFF.amountValue : uploadTestData.AS2UFF.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView).textContains(isACHPayroll ? uploadTestData.ASAUFF.mandatedetails : uploadTestData.AS2UFF.mandatedetails),
        await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains(isACHPayroll ? uploadTestData.ASAUFF.stockCode : uploadTestData.AS2UFF.stockCode),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(isACHPayroll ? uploadTestData.ASAUFF.passbookMemo : uploadTestData.AS2UFF.passbookMemo),
        await ensure(_PaymentsPages.BulkPaymentPage.freeTextView).textContains(isACHPayroll ? uploadTestData.ASAUFF.freetextArea : uploadTestData.AS2UFF.freetextArea),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.message : uploadTestData.AS2UFF.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.emailIdO : uploadTestData.AS2UFF.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.emailId1 : uploadTestData.AS2UFF.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.emailId2 : uploadTestData.AS2UFF.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.emailId3 : uploadTestData.AS2UFF.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(isACHPayroll ? uploadTestData.ASAUFF.emailId4 : uploadTestData.AS2UFF.emailId4),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create")
    ]);
    if (isACHPayroll) {
        await ensure(_PaymentsPages.BulkCollectionPage.nextApprover).isNotEmpty()
    } else {
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(uploadTestData.AS2UFF.chargeAccount)
    }
}

export async function checkViewDDPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.demandDraftPaymentPage.customerReferenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.demandDraftPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.deductAmount).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(uploadTestData.DDPayment.fromAccount),
        await ensure(_PaymentsPages.demandDraftPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.newPayeeAcctValue).textContains(uploadTestData.DDPayment.newPayeeAcctValue),
        await ensure(_PaymentsPages.demandDraftPaymentPage.newPayeeNameValue).textContains(uploadTestData.DDPayment.newPayeeNameValue),
        await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd1Value).textContains(uploadTestData.DDPayment.payeeAddress1),
        await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd2Value).textContains(uploadTestData.DDPayment.payeeAddress2),
        await ensure(_PaymentsPages.demandDraftPaymentPage.paymentCcyValue).textContains(uploadTestData.DDPayment.paymentCcyValue),
        // await ensure(_PaymentsPages.demandDraftPaymentPage.payableCountryValue).textContains(uploadTestData.DDPayment.payableCountryValue),
        await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.chargeAccountValue).textContains(uploadTestData.DDPayment.fromAccount),
        await ensure(_PaymentsPages.demandDraftPaymentPage.paymentTypeValue).textContains(uploadTestData.DDPayment.paymentType),
        await ensure(_PaymentsPages.demandDraftPaymentPage.sendAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.exchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.payableToValue).textContains(uploadTestData.DDPayment.payableToValue),
        // await ensure(_PaymentsPages.demandDraftPaymentPage.postalCodeValue).textContains(uploadTestData.DDPayment.postalCodeValue),
        await ensure(_PaymentsPages.demandDraftPaymentPage.deliveryModeValue).textContains(uploadTestData.DDPayment.deliveryModeValue),
        await ensure(_PaymentsPages.demandDraftPaymentPage.mailNameValue).textContains(uploadTestData.DDPayment.mailNameValue),
        await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd1Value).textContains(uploadTestData.DDPayment.mailAdd1Value),
        await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd2Value).textContains(uploadTestData.DDPayment.mailAdd2Value),
        // await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd3Value).textContains(uploadTestData.DDPayment.mailAdd3Value),
        // await ensure(_PaymentsPages.demandDraftPaymentPage.pickupLocationValue).textContains(uploadTestData.DDPayment.pickupLocation),
        await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDetailsValue).textContains(uploadTestData.DDPayment.paymentDetailsValue),
        await ensure(_PaymentsPages.demandDraftPaymentPage.deductTotalAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.custRefValue).isNotEmpty(),
        // await ensure(_PaymentsPages.demandDraftPaymentPage.msgToApproverValue).textContains(uploadTestData.DDPayment.msgToApproverValue)
    ]);
}

export async function checkViewFISCPayrollPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.PayrollForFISCFormat.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(uploadTestData.PayrollForFISCFormat.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.PayrollForFISCFormat.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(uploadTestData.PayrollForFISCFormat.bankChargeUs),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(uploadTestData.PayrollForFISCFormat.chargeAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.PayrollForFISCFormat.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(uploadTestData.PayrollForFISCFormat.newPayeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(uploadTestData.PayrollForFISCFormat.payeeBank),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.PayrollForFISCFormat.newPayeeAcctNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(uploadTestData.status.PendingApproval, uploadTestData.status.PendingVerification),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.PayrollForFISCFormat.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(uploadTestData.PayrollForFISCFormat.transactionCode),
        //await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.PayrollForFISCFormat.refForPayee),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.PayrollForFISCFormat.paymentDetail),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.PayrollForFISCFormat.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.PayrollForFISCFormat.emailIdO),
        await ensure(_PaymentsPages.eACHPaymentPage.activityLog).textContains("Create")
    ]);
}