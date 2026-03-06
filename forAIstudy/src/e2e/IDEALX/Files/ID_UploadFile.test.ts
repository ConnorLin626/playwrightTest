/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('ID_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/ID_uploadTestData.json');
let fileType = "ALL - Universal File Format";
let uploadSuccessFlag = false;
let remitFileName = '';

describe('ID File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, testData.FileService.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let fileName = '';

    it('Upload SKN payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForSKN : testData.FileService.UAT.fileNameForSKN, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.SKNPaymentPage.loadConditionForViewSKNPaymentPage();

        await checkViewSKNPageAllField(); // IDXP-812
    });

    it('Upload RTOL payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForRTOL : testData.FileService.UAT.fileNameForRTOL, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.SKNPaymentPage.loadConditionForViewSKNPaymentPage();

        await checkViewRTOLPageAllField(); // IDXP-812
    });

    //Add for IDXP-1312
    it('Upload TT payment from account is IDR ccy is IDR payee bank is CN', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForTT01 : testData.FileService.UAT.fileNameForTT01, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.TTPayment.SIT.fromAccountIDR : uploadTestData.TTPayment.UAT.fromAccountIDR),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(uploadTestData.TTPayment.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeAcctNumValue).textContains(uploadTestData.TTPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(uploadTestData.status.PendingApproval),
        ])
    });

    it('Upload TT payment from account is IDR ccy is CNY payee bank is ID', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForTT02 : testData.FileService.UAT.fileNameForTT02, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.TTPayment.SIT.fromAccountIDR : uploadTestData.TTPayment.UAT.fromAccountIDR),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(uploadTestData.TTPayment.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeAcctNumValue).textContains(uploadTestData.TTPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(uploadTestData.status.PendingApproval),
            //Add for IDXP-2116
            await ensure(_PaymentsPages.TelegraphicTransferPage.ReceivingPartyPurposeCodeView).textContains(uploadTestData.TTPayment.RPPC),
            await ensure(_PaymentsPages.TelegraphicTransferPage.RPPCLableView).textContains("Purpose of payment (Receiving party purpose code)"),
        ])
    });

    it('Upload TT payment from account is CNY ccy is CNY payee bank swift bic not ID or CN will show error', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForTT03 : testData.FileService.UAT.fileNameForTT03, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains("SWIFT BIC is invalid"),
        ])
    });

    it('Upload TAX payment with Tax format', async function () {
        fileType = "Tax - Tax Payment File";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForTAX : testData.FileService.UAT.fileNameForTAX, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.IDTAXPaymentPage.loadConditionForViewPaymentPage();

        await checkViewTaxPageAllField(); // IDXP-812
    });

    it('Upload Bulk payment with SKN format', async function () {
        fileType = "Bulk Payment - SKN";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForBPY : testData.FileService.UAT.fileNameForBPY, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await checkViewBulkPaymentPageAllField(); // IDXP-812
    });

    it('Upload Payroll with SKN format', async function () {
        fileType = "Payroll - SKN";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForPAY : testData.FileService.UAT.fileNameForPAY, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await checkViewPayrollPageAllField(); // IDXP-812
    });

    it('Upload RTGS with Remittance format', async function () {
        fileType = "Remittance - Regional Remittance";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForRTGSRemit : testData.FileService.UAT.fileNameForRTGSRemit, testData.FileService.approvalOptionTransaction).then(async data => {
            remitFileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag = true;
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await checkViewRTGSAllField(); // IDXP-812
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

export async function checkViewSKNPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.SKNPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.SKNPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.amountValue).textContains(uploadTestData.SKN.amountValue),
        await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).textContains(SIT ? uploadTestData.SKN.SIT.fromAccount : uploadTestData.SKN.UAT.fromAccount),
        await ensure(_PaymentsPages.SKNPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.toPayeeValue).textContains(uploadTestData.SKN.newPayeeAcct),
        await ensure(_PaymentsPages.SKNPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.SKN.newPayeeName),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentTypeValue).textContains(uploadTestData.SKN.paymentType),
        await ensure(_PaymentsPages.SKNPaymentPage.sendAmtValue).textContains(uploadTestData.SKN.amountValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankNameValue).textContains(SIT ? uploadTestData.SKN.SIT.payeeBankNameValue : uploadTestData.SKN.UAT.payeeBankNameValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankAdd1Value).textContains(SIT ? uploadTestData.SKN.SIT.payeeBankAdd1Value : uploadTestData.SKN.UAT.payeeBankAdd1Value),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankAdd2Value).textContains(SIT ? uploadTestData.SKN.SIT.payeeBankAdd2Value : uploadTestData.SKN.UAT.payeeBankAdd2Value),
        // await ensure(_PaymentsPages.SKNPaymentPage.payeeBankAdd3Value).textContains(uploadTestData.SKN.payeeBankAdd3Value),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCityValue).textContains(SIT ? uploadTestData.SKN.SIT.payeeBankCityValue : uploadTestData.SKN.UAT.payeeBankCityValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCountryValue).textContains(uploadTestData.SKN.payeeBankCountryValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeSwiftBicValue).textContains(SIT ? uploadTestData.SKN.SIT.payeeSwiftBicValue : uploadTestData.SKN.UAT.payeeSwiftBicValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCodeValue).textContains(SIT ? uploadTestData.SKN.SIT.payeeBankCodeValue : uploadTestData.SKN.UAT.payeeBankCodeValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBrchCodeValue).textContains(SIT ? uploadTestData.SKN.SIT.payeeBrchCodeValue : uploadTestData.SKN.UAT.payeeBrchCodeValue),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentDetailValue).textContains(uploadTestData.SKN.paymentDetailValue),
        await ensure(_PaymentsPages.SKNPaymentPage.msgToPayeeValue).textContains(uploadTestData.SKN.msgToPayeeValue),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.SKN.emailValue0),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.SKN.emailValue1),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.SKN.emailValue2),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.SKN.emailValue3),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.SKN.emailValue4),
        await ensure(_PaymentsPages.SKNPaymentPage.totalDeductAmt).textContains(uploadTestData.SKN.amountValue),
        await ensure(_PaymentsPages.SKNPaymentPage.bankChargeValue).textContains(uploadTestData.SKN.bankChargeValue),
        await ensure(_PaymentsPages.SKNPaymentPage.chargeAcctValue).textContains(SIT ? uploadTestData.SKN.SIT.fromAccount : uploadTestData.SKN.UAT.fromAccount),
        await ensure(_PaymentsPages.SKNPaymentPage.residStatusValue).textContains(uploadTestData.SKN.residStatusValue),
        await ensure(_PaymentsPages.SKNPaymentPage.beneCategoryValue).textContains(uploadTestData.SKN.beneCategoryValue),
        await ensure(_PaymentsPages.SKNPaymentPage.custRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.batchIDValue).isNotEmpty(),
        // await ensure(_PaymentsPages.SKNPaymentPage.messageToApproverValue).textContains(uploadTestData.SKN.transactionNote)
    ]);
}

export async function checkViewRTOLPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.SKNPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.SKNPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.amountValue).textContains(uploadTestData.RTOL.amountValue),
        await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).textContains(SIT ? uploadTestData.RTOL.SIT.fromAccount : uploadTestData.RTOL.UAT.fromAccount),
        await ensure(_PaymentsPages.SKNPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.toPayeeValue).textContains(uploadTestData.RTOL.newPayeeAcct),
        await ensure(_PaymentsPages.SKNPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.RTOL.newPayeeName),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentTypeValue).textContains(uploadTestData.RTOL.paymentType),
        await ensure(_PaymentsPages.SKNPaymentPage.sendAmtValue).textContains(uploadTestData.RTOL.amountValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankNameValue).textContains(SIT ? uploadTestData.RTOL.SIT.payeeBankNameValue : uploadTestData.RTOL.UAT.payeeBankNameValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankAdd1Value).textContains(SIT ? uploadTestData.RTOL.SIT.payeeBankAdd1Value : uploadTestData.RTOL.UAT.payeeBankAdd1Value),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankAdd2Value).textContains(SIT ? uploadTestData.RTOL.SIT.payeeBankAdd2Value : uploadTestData.RTOL.UAT.payeeBankAdd2Value),
        // await ensure(_PaymentsPages.SKNPaymentPage.payeeBankAdd3Value).textContains(uploadTestData.SKN.payeeBankAdd3Value),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCityValue).textContains(SIT ? uploadTestData.RTOL.SIT.payeeBankCityValue : uploadTestData.RTOL.UAT.payeeBankCityValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCountryValue).textContains(uploadTestData.RTOL.payeeBankCountryValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeSwiftBicValue).textContains(SIT ? uploadTestData.RTOL.SIT.payeeSwiftBicValue : uploadTestData.RTOL.UAT.payeeSwiftBicValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCodeValue).textContains(SIT ? uploadTestData.RTOL.SIT.payeeBankCodeValue : uploadTestData.RTOL.UAT.payeeBankCodeValue),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBrchCodeValue).textContains(SIT ? uploadTestData.RTOL.SIT.payeeBrchCodeValue : uploadTestData.RTOL.UAT.payeeBrchCodeValue),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentDetailValue).textContains(uploadTestData.RTOL.paymentDetailValue),
        await ensure(_PaymentsPages.SKNPaymentPage.msgToPayeeValue).textContains(uploadTestData.RTOL.msgToPayeeValue),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.RTOL.emailValue0),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.RTOL.emailValue1),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.RTOL.emailValue2),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.RTOL.emailValue3),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(uploadTestData.RTOL.emailValue4),
        await ensure(_PaymentsPages.SKNPaymentPage.totalDeductAmt).textContains(uploadTestData.RTOL.amountValue),
        await ensure(_PaymentsPages.SKNPaymentPage.custRefValue).isNotEmpty(),
        // await ensure(_PaymentsPages.SKNPaymentPage.messageToApproverValue).textContains(uploadTestData.RTOL.transactionNote)
    ]);
}

export async function checkViewTaxPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.IDTAXPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Submitted,testData.status.Failed,testData.status.BankRejected),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewAmount).textContains(uploadTestData.TAX.amountValue),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewfromAccount).textContains(SIT ? uploadTestData.TAX.SIT.fromAccount : uploadTestData.TAX.UAT.fromAccount),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewAcctBalance).isNotEmpty(),
        await ensure(_PaymentsPages.IDTAXPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewBillOrg).textContains(uploadTestData.TAX.viewBillOrg),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxAmt).textContains(uploadTestData.TAX.amountValue),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxNpwp).textContains(uploadTestData.TAX.viewTaxNpwp),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxNpwpDep).textContains(uploadTestData.TAX.viewTaxNpwpDep),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxIdNum).textContains(uploadTestData.TAX.viewTaxIdNum),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxPayerName).textContains(uploadTestData.TAX.viewTaxPayerName),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxPayerAdd).textContains(uploadTestData.TAX.viewTaxPayerAdd),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxPayerCity).textContains(uploadTestData.TAX.viewTaxPayerCity),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxAcctCode).textContains(uploadTestData.TAX.viewTaxAcctCode),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxDepTypeCode).textContains(uploadTestData.TAX.viewTaxDepTypeCode),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewTaxSspDesc).textContains(uploadTestData.TAX.viewTaxSspDesc),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewPeriodFromM).textContains(uploadTestData.TAX.viewPeriodFromM),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewCaseNum).textContains(uploadTestData.TAX.viewCaseNum),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewObjNum).textContains(uploadTestData.TAX.viewObjNum),
        await ensure(_PaymentsPages.IDTAXPaymentPage.viewObjAdd).textContains(uploadTestData.TAX.viewObjAdd)
    ]);
}

export async function checkViewBulkPaymentPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? uploadTestData.BulkPayment.SIT.fromAccount : uploadTestData.BulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.BulkPayment.paymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.BulkPayment.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(uploadTestData.BulkPayment.bankChargeView),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(SIT ? uploadTestData.BulkPayment.SIT.fromAccount : uploadTestData.BulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        // Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.BulkPayment.newPayeeName1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(SIT ? uploadTestData.BulkPayment.SIT.bankNameValue1 : uploadTestData.BulkPayment.UAT.bankNameValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.BulkPayment.bankSwiftBicValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.BulkPayment.accountNumberValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.BulkPayment.amount1),
        // await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(uploadTestData.BulkPayment.TransactionCodeValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.BulkPayment.referenceForPayeeValue1),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.BulkPayment.paymentDetailValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.BulkPayment.message1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkPayment.emailId10),

        // payee 2
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(uploadTestData.BulkPayment.newPayeeName2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName2).textContains(SIT ? uploadTestData.BulkPayment.SIT.bankNameValue2 : uploadTestData.BulkPayment.UAT.bankNameValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textContains(uploadTestData.BulkPayment.bankSwiftBicValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.BulkPayment.accountNumberValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.BulkPayment.amount2),
        // await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue2).textContains(uploadTestData.BulkPayment.TransactionCodeValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.BulkPayment.referenceForPayeeValue2),
        await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(uploadTestData.BulkPayment.paymentDetailValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(uploadTestData.BulkPayment.message2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.BulkPayment.emailId20),
    ]);
}

export async function checkViewPayrollPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? uploadTestData.Payroll.SIT.fromAccount : uploadTestData.Payroll.UAT.fromAccount),
        //Many accounts in UAT don't have balance,comment out first
        //await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(uploadTestData.Payroll.paymentTypeView),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(uploadTestData.Payroll.totalAmount),
        await ensure(_PaymentsPages.PayrollPage.bankChargeView).textContains(uploadTestData.Payroll.bankChargeView),
        await ensure(_PaymentsPages.PayrollPage.chargeAccountView).textContains(SIT ? uploadTestData.Payroll.SIT.fromAccount : uploadTestData.Payroll.UAT.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),

        // Payee 1
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(uploadTestData.Payroll.newPayeeName1),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue).textContains(SIT ? uploadTestData.Payroll.SIT.bankNameValue1 : uploadTestData.Payroll.UAT.bankNameValue1),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(uploadTestData.Payroll.bankSwiftBicValue1),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(uploadTestData.Payroll.accountNumberValue1),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(uploadTestData.Payroll.amount1),
        // await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue).textContains(uploadTestData.Payroll.TransactionCodeValue1),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(uploadTestData.Payroll.referenceForPayeeValue1),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue).textContains(uploadTestData.Payroll.paymentDetailValue1),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(uploadTestData.Payroll.message1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(uploadTestData.Payroll.emailId10),

        // payee 2
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue2).textContains(uploadTestData.Payroll.newPayeeName2),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue2).textContains(SIT ? uploadTestData.Payroll.SIT.bankNameValue2 : uploadTestData.Payroll.UAT.bankNameValue2),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue2).textContains(uploadTestData.Payroll.bankSwiftBicValue2),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue2).textContains(uploadTestData.Payroll.accountNumberValue2),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.amount2).textContains(uploadTestData.Payroll.amount2),
        // await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue2).textContains(uploadTestData.Payroll.TransactionCodeValue2),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue2).textContains(uploadTestData.Payroll.referenceForPayeeValue2),
        await _PaymentsPages.PayrollPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue2).textContains(uploadTestData.Payroll.paymentDetailValue2),
        await ensure(_PaymentsPages.PayrollPage.messageValue2).textContains(uploadTestData.Payroll.message2),
        await ensure(_PaymentsPages.PayrollPage.emailListValue2).textContains(uploadTestData.Payroll.emailId20),
    ]);
}

export async function checkViewRTGSAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.RTGSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.RTGSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.deductAmtValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? uploadTestData.RTGS.SIT.fromAccount : uploadTestData.RTGS.UAT.fromAccount),
        await ensure(_PaymentsPages.RTGSPaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeAcctNumValue).textContains(uploadTestData.RTGS.newPayeeAcct),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.RTGS.newPayeeName),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentTypeValue).textContains(uploadTestData.RTGS.paymentType),
        await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankNameValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankNameValue : uploadTestData.RTGS.UAT.payeeBankNameValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd1Value).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankAdd1Value : uploadTestData.RTGS.UAT.payeeBankAdd1Value),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd2Value).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankAdd2Value : uploadTestData.RTGS.UAT.payeeBankAdd2Value),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCityValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankCityValue : uploadTestData.RTGS.UAT.payeeBankCityValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCountryValue).textContains(uploadTestData.RTGS.payeeBankCountryValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeSwiftBicValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeSwiftBicValue : uploadTestData.RTGS.UAT.payeeSwiftBicValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCodeValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankCodeValue : uploadTestData.RTGS.UAT.payeeBankCodeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBrchCodeValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBrchCodeValue : uploadTestData.RTGS.UAT.payeeBrchCodeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentDetailsValue).textContains(uploadTestData.RTGS.paymentDetailsValue),
        // await ensure(_PaymentsPages.RTGSPaymentPage.msgValue).textContains(uploadTestData.RTGS.msgValue),
        // await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue0),
        // await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue1),
        // await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue2),
        // await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue3),
        // await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue4),
        await ensure(_PaymentsPages.RTGSPaymentPage.totalDeductAmtValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.bankChargeValue).textContains(uploadTestData.RTGS.bankChargeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.chargeAcctValue).textContains(SIT ? uploadTestData.RTGS.SIT.fromAccount : uploadTestData.RTGS.UAT.fromAccount),
        // await ensure(_PaymentsPages.RTGSPaymentPage.purposeCodeValue).textContains(uploadTestData.RTGS.purposeCodeValue),
        // await ensure(_PaymentsPages.RTGSPaymentPage.residStatusValue).textContains(uploadTestData.RTGS.residStatusValue),
        // await ensure(_PaymentsPages.RTGSPaymentPage.relationshipValue).textContains(uploadTestData.RTGS.relationshipValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.custRefValue).isNotEmpty()
    ]);
}