/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';


let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('CN_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/CN_uploadTestData.json');
let fileType = "ALL - Universal File Format";
let uploadSuccessFlag = false;
let remitFileName = '';

describe('CN File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, testData.ACT.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let fileName = '';

    it('Upload CNAPS payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForCNAPS : testData.FileService.UAT.fileNameForCNAPS, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();

        await checkViewCNAPSPageAllField(true); // IDXP-812
    });

    it('Upload IBPS payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForIBPS : testData.FileService.UAT.fileNameForIBPS, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();

        await checkViewIBPSPageAllField(); // IDXP-812
    });

    it('Upload TT payment with UFF format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForTT : testData.FileService.UAT.fileNameForTT, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await checkViewTTPageAllField(); // IDXP-812
    });
    

    //add for IDXP-1000
    it('Upload ICT payment which from account is FCY to account is IDR will show error', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForICT01 : testData.FileService.UAT.fileNameForICT01, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.click();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService.errorMessage),
        ]);
    });

    it('Upload TT payment which from account is FCY to account is IDR will show error', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForTT01 : testData.FileService.UAT.fileNameForTT01, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.click();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService.errorMessage),
        ]);
    });

    it('Upload ICT payment which from account is CNY to account is IDR', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForICT02 : testData.FileService.UAT.fileNameForICT02, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(uploadTestData.ICT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(uploadTestData.ICT.toAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(uploadTestData.ICT.amountValue),
        ]);
    });

    it('Upload ACT payment which from account is CNY to account is IDR', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.ACT.SIT.loginCompanyId : testData.ACT.UAT.loginCompanyId, SIT ? testData.ACT.SIT.loginUserId : testData.ACT.UAT.loginUserId, "P@ssword1A!");
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForACT01 : testData.FileService.UAT.fileNameForACT01, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(testData.ACT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.ACT.amountA),
        ]);
    });

    //Will duplicate,can only upload one time,comment out this case
    it('Upload CNAPS payment with Remittance format', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, "P@ssword1A!");
        fileType = "Remittance - Regional Remittance";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForCNAPSRemit : testData.FileService.UAT.fileNameForCNAPSRemit, testData.FileService.approvalOptionTransaction).then(async data => {
            remitFileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag = true;
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();

        await checkViewCNAPSPageAllField(false); // IDXP-812
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

export async function checkViewCNAPSPageAllField(isUFF: boolean = false) {
    await Promise.all([
        await ensure(_PaymentsPages.CNAPSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.CNAPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.deductAmtValue).textContains(uploadTestData.CNAPS.amountValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(uploadTestData.CNAPS.fromAccount),
        await ensure(_PaymentsPages.CNAPSPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.toPayeeValue).textContains(uploadTestData.CNAPS.newPayeeAcct),
        await ensure(_PaymentsPages.CNAPSPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.CNAPS.newPayeeName),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd1).textContains(uploadTestData.CNAPS.payeeAdd1),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd2).textContains(uploadTestData.CNAPS.payeeAdd2),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd3).textContains(uploadTestData.CNAPS.payeeAdd3),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentTypeValue).textContains(uploadTestData.CNAPS.paymentType),
        await ensure(_PaymentsPages.CNAPSPaymentPage.deliveryMethodValue).textContains(uploadTestData.CNAPS.deliveryMethodValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(uploadTestData.CNAPS.amountValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankNameValue).textContains(uploadTestData.CNAPS.payeeBankNameValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankAdd1Value).textContains(uploadTestData.CNAPS.payeeBankAdd1Value),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentDetailValue).textContains(uploadTestData.CNAPS.paymentDetailsValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.totalDeductAmt).textContains(uploadTestData.CNAPS.amountValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.custRefValue).isNotEmpty()
    ]);

    if (isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.msgToPayeeValue).textContains(uploadTestData.CNAPS.msgToPayeeValue),
            await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.CNAPS.emailValue0),
            await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.CNAPS.emailValue1),
            await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.CNAPS.emailValue2),
            await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.CNAPS.emailValue3),
            await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.CNAPS.emailValue4),
        ]);
    }
}

export async function checkViewIBPSPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.CNAPSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.CNAPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.deductAmtValue).textContains(uploadTestData.IBPS.amountValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(uploadTestData.IBPS.fromAccount),
        await ensure(_PaymentsPages.CNAPSPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.toPayeeValue).textContains(uploadTestData.IBPS.newPayeeAcct),
        await ensure(_PaymentsPages.CNAPSPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.IBPS.newPayeeName),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd1).textContains(uploadTestData.IBPS.payeeAdd1),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd2).textContains(uploadTestData.IBPS.payeeAdd2),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd3).textContains(uploadTestData.IBPS.payeeAdd3),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentTypeValue).textContains(uploadTestData.IBPS.paymentType),
        await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(uploadTestData.IBPS.amountValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankNameValue).textContains(uploadTestData.IBPS.payeeBankNameValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankCountry).textContains(uploadTestData.IBPS.payeeBankCountry),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.IBPS.payeeBankSwiftBic),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankCode).textContains(uploadTestData.IBPS.payeeBankCode),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentDetailValue).textContains(uploadTestData.IBPS.paymentDetailsValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.msgToPayeeValue).textContains(uploadTestData.IBPS.msgToPayeeValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.IBPS.emailValue0),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.IBPS.emailValue1),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.IBPS.emailValue2),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.IBPS.emailValue3),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(uploadTestData.IBPS.emailValue4),
        await ensure(_PaymentsPages.CNAPSPaymentPage.totalDeductAmt).textContains(uploadTestData.IBPS.amountValue),
        await ensure(_PaymentsPages.CNAPSPaymentPage.custRefValue).isNotEmpty()
    ]);
}

export async function checkViewTTPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).textContains(uploadTestData.TT.amountValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(uploadTestData.TT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAcct),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeNameValue).textContains(uploadTestData.TT.newPayeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(uploadTestData.TT.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(uploadTestData.TT.payeeBankNameValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(uploadTestData.TT.payeeBankCountry),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).textContains(uploadTestData.TT.payeeBankAdress1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankRoutingCode).textContains(uploadTestData.TT.payeeBankRoutingCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(uploadTestData.TT.paymentDetailValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(uploadTestData.TT.messageValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailValue0),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailValue1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailValue2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailValue3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailValue4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(uploadTestData.TT.bankChargeValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(uploadTestData.TT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.specPmtPurposeValue).textContains(uploadTestData.TT.specPmtPurposeValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isTaxFreeGoodsValue).textContains(uploadTestData.TT.isTaxFreeGoodsValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.pmtNatureValue).textContains(uploadTestData.TT.pmtNatureValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.approvalRefValue).textContains(uploadTestData.TT.approvalRefValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.pmtCategory1Value).textContains(uploadTestData.TT.pmtCategory1Value),
        await ensure(_PaymentsPages.TelegraphicTransferPage.seriesCode1Value).textContains(uploadTestData.TT.seriesCode1Value),
        await ensure(_PaymentsPages.TelegraphicTransferPage.contractNumValue).textContains(uploadTestData.TT.contractNumValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.invoiceNumValue).textContains(uploadTestData.TT.invoiceNumValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transRemark1Value).textContains(uploadTestData.TT.transRemark1Value),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transRemark2Value).textContains(uploadTestData.TT.transRemark2Value),
    ]);
}