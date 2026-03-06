/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('SG_testData_03.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/SG_uploadTestData.json');
let fileName = "";
let uploadSuccessFlag = false;
let remitFileName = '';
let reference ="";

describe('File Services with Remittance1.3 and Remittance1.4 format', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId2 : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId2 : testData.FileService.UAT.loginUserId, testData.FileService.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Upload MEPS with Remittance1.3 format', async function () {
       await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Remittance V1.3", SIT ? testData.FileService.SIT.fileNameForMEPSRemit13 : testData.FileService.UAT.fileNameForMEPSRemit13, testData.FileService.approvalOptionByTransaction).then(async data => {
            remitFileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag = true;
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await checkViewMEPSWithRemit13(); // add for IDXP-812

        if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
    });

    it('Upload DD with Remittance1.3 format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
         await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Remittance V1.3", SIT ? testData.FileService.SIT.fileNameForDDRemit13 : testData.FileService.UAT.fileNameForDDRemit13, testData.FileService.approvalOptionByTransaction).then(async data => {
             remitFileName = data;
         });
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
         await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileNameLink.jsClick();
         await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
         uploadSuccessFlag = true;
         await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
         await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
 
         await checkViewDDPageAllField(false, false, true); // add for IDXP-812
         
         if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
     });

    it('Upload TT with Remittance1.3 format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
         await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Remittance V1.3", SIT ? testData.FileService.SIT.fileNameForTTRemit13 : testData.FileService.UAT.fileNameForTTRemit13, testData.FileService.approvalOptionByTransaction).then(async data => {
             remitFileName = data;
         });
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
         await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileNameLink.jsClick();
         await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
         uploadSuccessFlag = true;
         await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
         await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
 
         await checkViewTTPageAllField(false, false, true, false); // add for IDXP-812

         if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
     });

     it('Upload ACT with Remittance1.3 format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
         await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Remittance V1.3", SIT ? testData.FileService.SIT.fileNameForACTRemit13 : testData.FileService.UAT.fileNameForACTRemit13, testData.FileService.approvalOptionByTransaction).then(async data => {
             remitFileName = data;
         });
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
         await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileNameLink.jsClick();
         await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
         uploadSuccessFlag = true;
         await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
         await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
 
         await checkViewACTPageAllField(false); // add for IDXP-812

         if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
     });

    it('Upload MEPS with Remittance1.4 format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
         await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Remittance V1.4", SIT ? testData.FileService.SIT.fileNameForMEPSRemit14 : testData.FileService.UAT.fileNameForMEPSRemit14, testData.FileService.approvalOptionByTransaction).then(async data => {
             remitFileName = data;
         });
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
         await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
         await _FilesPages.uploadFilePage.fileNameLink.jsClick();
         await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
         uploadSuccessFlag = true;
         await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
         await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
 
         await checkViewMEPSPageAllField(false,false,true); // add for IDXP-812

         if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
     });

    it('Upload DD with Remittance1.4 format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
         await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Remittance V1.4", SIT ? testData.FileService.SIT.fileNameForDDRemit14 : testData.FileService.UAT.fileNameForDDRemit14, testData.FileService.approvalOptionByTransaction).then(async data => {
             remitFileName = data;
         });
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
         await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
         await _FilesPages.uploadFilePage.fileNameLink.jsClick();
         await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
         uploadSuccessFlag = true;
         await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
         await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
 
         await checkViewDDPageAllField(false, true, false); // add for IDXP-812
         
         if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
     });

     it('Upload TT with Remittance1.4 format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
         await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Remittance V1.4", SIT ? testData.FileService.SIT.fileNameForTTRemit14 : testData.FileService.UAT.fileNameForTTRemit14, testData.FileService.approvalOptionByTransaction).then(async data => {
             remitFileName = data;
         });
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
         await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileNameLink.jsClick();
         await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
         uploadSuccessFlag = true;
         await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
         await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
 
         await checkViewTTPageAllField(false, false, false, true); // add for IDXP-812

         if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
     });
  
     it('Upload ACT with Remittance1.4 format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
         await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Remittance - Remittance V1.4", SIT ? testData.FileService.SIT.fileNameForACTRemit14 : testData.FileService.UAT.fileNameForACTRemit14, testData.FileService.approvalOptionByTransaction).then(async data => {
             remitFileName = data;
         });
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileFilter.input(remitFileName);
         await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
         await _FilesPages.uploadFilePage.refresh.jsClick();
         await _FilesPages.uploadFilePage.fileNameLink.jsClick();
         await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
         uploadSuccessFlag = true;
         await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
         await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
 
         await checkViewACTPageAllField(false); // add for IDXP-812

         if(uploadSuccessFlag && 0 !== remitFileName.trim().length) {
            await deleteFile();
        }
     });
});

describe('File Services upload IBG and New IBG format file', async function () {
        this.retries(browser.params.caseRetryTimes);
        before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyIdForIBG : testData.FileService.UAT.loginCompanyIdForIBG, SIT ? testData.FileService.SIT.loginUserIdforIBG : testData.FileService.UAT.loginUserIdforIBG, testData.FileService.UAT.password); });
        const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Upload Bulk Payment with New Inter Bank GIRO format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Bulk Payment - New Inter Bank GIRO", SIT ? testData.FileService.SIT.fileNameForBulkNIBG : testData.FileService.UAT.fileNameForBulkNIBG, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag=true
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewBPYIBGPageAllField(true); // add for IDXP-812
        if(uploadSuccessFlag){
            await deleteUploadFile(fileName);
        }
    });

    it('Upload Bulk Collection with New Inter Bank GIRO format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Bulk Collection - New Inter Bank GIRO", SIT ? testData.FileService.SIT.fileNameForBulkCOLNIBG : testData.FileService.UAT.fileNameForBulkCOLNIBG, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag=true
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewBulkCOLPageAllField(true); // add for IDXP-812
        if(uploadSuccessFlag){
            await deleteUploadFile(fileName);
        }
    });

    it('Upload Management Payroll (Alternate) with New Inter Bank GIRO format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Management Payroll (Alternate) - New Inter Bank GIRO", SIT ? testData.FileService.SIT.fileNameForMP2NIBG : testData.FileService.UAT.fileNameForMP2NIBG, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag =true
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await checkViewPayrollNIBGPageAllField(true); // add for IDXP-812
        if(uploadSuccessFlag){
            await deleteUploadFile(fileName);
        }
    });

    it('Upload Bulk Payment with Inter Bank GIRO format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Bulk Payment - Inter Bank GIRO", SIT ? testData.FileService.SIT.fileNameForBulkIBG : testData.FileService.UAT.fileNameForBulkIBG, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag =true
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await checkViewBPYIBGPageAllField(false); // add for IDXP-812
        if(uploadSuccessFlag){
            await deleteUploadFile(fileName);
        }
    });

    it('Upload Bulk Collection DBS with Inter Bank GIRO format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Bulk Collection DBS - Inter Bank GIRO", SIT ? testData.FileService.SIT.fileNameForCOLDBSIBG : testData.FileService.UAT.fileNameForCOLDBSIBG, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag =true
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await checkViewBulkCOLPageAllField (false); // add for IDXP-812
        if(uploadSuccessFlag){
            await deleteUploadFile(fileName);
        }
    });

    it('Upload Management Payroll DBS with Inter Bank GIRO format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "Management Payroll DBS - Inter Bank GIRO", SIT ? testData.FileService.SIT.fileNameForMPDBSIBG : testData.FileService.UAT.fileNameForMPDBSIBG, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        uploadSuccessFlag =true
        await _FilesPages.uploadFilePage.paymentReferenceLink.getText().then(text => {
            reference = text;
        });
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await browser.sleep(5000);
        await checkViewPayrollNIBGPageAllField(false); // add for IDXP-812
        if(uploadSuccessFlag){
            await deleteUploadFile(fileName);
        }
    });
});

// Remit1.3 Format, and upload with different company
export async function checkViewMEPSWithRemit13() {
    await Promise.all([
        await ensure(_PaymentsPages.MEPSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.MEPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(uploadTestData.MEPSPaymentR13.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? uploadTestData.MEPSPaymentR13.fromAccount : uploadTestData.MEPSPaymentR13.UAT.fromAccount),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSnewPayeeAccountNumberValue).textContains(uploadTestData.MEPSPaymentR13.newPayeeAcctNumber),
        await ensure(_PaymentsPages.MEPSPaymentPage.newPayeeNameValue).textContains(uploadTestData.MEPSPaymentR13.newPayeeNameValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress1Value).textContains(uploadTestData.MEPSPaymentR13.newPayeeAdd1),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress2Value).textContains(uploadTestData.MEPSPaymentR13.newPayeeAdd2),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress3Value).textContains(uploadTestData.MEPSPaymentR13.newPayeeAdd3),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentTypeValue).textContains(uploadTestData.MEPSPaymentR13.paymentType),
        await ensure(_PaymentsPages.MEPSPaymentPage.sendAmountValue).textContains(uploadTestData.MEPSPaymentR13.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDetailValue).textContains(uploadTestData.MEPSPaymentR13.paymentDetailValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.totalDeductValue).textContains(uploadTestData.MEPSPaymentR13.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.bankChargeValue).textContains(uploadTestData.MEPSPaymentR13.bankChargeSHA),
        await ensure(_PaymentsPages.MEPSPaymentPage.chargeAcctValue).textContains(SIT ? uploadTestData.MEPSPaymentR13.fromAccount : uploadTestData.MEPSPaymentR13.UAT.fromAccount), 
        await ensure(_PaymentsPages.MEPSPaymentPage.referenceValue).isNotEmpty()
    ]);
    if(SIT){
        await ensure(_PaymentsPages.MEPSPaymentPage.balanceValue).isNotEmpty()
    }
}

export async function checkViewDDPageAllField(isUFF: boolean = false, isRemit14: boolean = false, isRemit13: boolean = false) {
    if(isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.customerReferenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.demandDraftPaymentPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deductAmount).textContains(uploadTestData.DDPayment.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(uploadTestData.DDPayment.fromAccount),
            // await ensure(_PaymentsPages.demandDraftPaymentPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.newPayeeNameValue).textContains(uploadTestData.DDPayment.newPayeeNameValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd1Value).textContains(uploadTestData.DDPayment.payeeAddress1),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd2Value).textContains(uploadTestData.DDPayment.payeeAddress2),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd3Value).textContains(uploadTestData.DDPayment.payeeAddress3),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentCcyValue).textContains(uploadTestData.DDPayment.paymentCcyValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payableCountryValue).textContains(uploadTestData.DDPayment.payableCountryValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.chargeAccountValue).textContains(uploadTestData.DDPayment.fromAccount),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentTypeValue).textContains(uploadTestData.DDPayment.paymentType),
            await ensure(_PaymentsPages.demandDraftPaymentPage.sendAmountValue).textContains(uploadTestData.DDPayment.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.exchangeRate).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payableToValue).textContains(uploadTestData.DDPayment.payableToValue),
            // await ensure(_PaymentsPages.demandDraftPaymentPage.postalCodeValue).textContains(uploadTestData.DDPayment.postalCodeValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deliveryModeValue).textContains(uploadTestData.DDPayment.deliveryModeValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailNameValue).textContains(uploadTestData.DDPayment.mailNameValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd1Value).textContains(uploadTestData.DDPayment.mailAdd1Value),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd2Value).textContains(uploadTestData.DDPayment.mailAdd2Value),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd3Value).textContains(uploadTestData.DDPayment.mailAdd3Value),
            await ensure(_PaymentsPages.demandDraftPaymentPage.pickupLocationValue).textContains(uploadTestData.DDPayment.pickupLocation),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDetailsValue).textContains(uploadTestData.DDPayment.paymentDetailsValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deductTotalAmountValue).textContains(uploadTestData.DDPayment.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.custRefValue).isNotEmpty(),
            // await ensure(_PaymentsPages.demandDraftPaymentPage.msgToApproverValue).textContains(uploadTestData.DDPayment.msgToApproverValue)
        ]);
        if(SIT){
        await ensure(_PaymentsPages.demandDraftPaymentPage.balanceValue).isNotEmpty()
        }
    }

    if(isRemit14 || isRemit13) {
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.customerReferenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.demandDraftPaymentPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deductAmount).textContains(uploadTestData.DDPaymentRemit14.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(SIT ? uploadTestData.DDPaymentRemit14.fromAccount : uploadTestData.DDPaymentRemit14.UAT.fromAccount),
            // await ensure(_PaymentsPages.demandDraftPaymentPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.newPayeeNameValue).textContains(uploadTestData.DDPaymentRemit14.newPayeeNameValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentCcyValue).textContains(uploadTestData.DDPaymentRemit14.paymentCcyValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.chargeAccountValue).textContains(SIT ? uploadTestData.DDPaymentRemit14.fromAccount : uploadTestData.DDPaymentRemit14.UAT.fromAccount),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentTypeValue).textContains(uploadTestData.DDPaymentRemit14.paymentType),
            await ensure(_PaymentsPages.demandDraftPaymentPage.sendAmountValue).textContains(uploadTestData.DDPaymentRemit14.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.exchangeRate).isNotEmpty(),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payableToValue).textContains(uploadTestData.DDPaymentRemit14.payableToValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deliveryModeValue).textContains(uploadTestData.DDPaymentRemit14.deliveryModeValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailNameValue).textContains(uploadTestData.DDPaymentRemit14.mailNameValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd1Value).textContains(uploadTestData.DDPaymentRemit14.mailAdd1Value),
            await ensure(_PaymentsPages.demandDraftPaymentPage.pickupLocationValue).textContains(uploadTestData.DDPaymentRemit14.pickupLocation),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDetailsValue).textContains(uploadTestData.DDPaymentRemit14.paymentDetailsValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.deductTotalAmountValue).textContains(uploadTestData.DDPaymentRemit14.amountValue),
            await ensure(_PaymentsPages.demandDraftPaymentPage.custRefValue).isNotEmpty()
        ]);
        if(SIT){
            await ensure(_PaymentsPages.demandDraftPaymentPage.balanceValue).isNotEmpty()
        }
    }
}

//UFF and Remit format
export async function checkViewTTPageAllField(isUFF: boolean = false, isRemit: boolean = false, isRemit13: boolean = false, isRemit14: boolean = false) {
    if(isUFF || isRemit) {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(uploadTestData.TT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(uploadTestData.TT.amountValue),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TT.newPayeeAdd3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
            // await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(uploadTestData.TT.paymentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(uploadTestData.TT.payeeBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(uploadTestData.TT.payeeBankLocation),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(uploadTestData.TT.myPayeeBankID),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textIs(uploadTestData.TT.intermediaryBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textIs(uploadTestData.TT.intermediaryBankID),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankAdress1).textContains(uploadTestData.TT.intermediaryBankCountry),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(uploadTestData.TT.paymentDetail),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(uploadTestData.TT.bankChargeUs),
            await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(uploadTestData.TT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(uploadTestData.TT.messageToOrderingBank),
            await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
        ]);
        if(SIT){
            await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty()
        }
        if (isUFF) {
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(uploadTestData.TT.message),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailIdO),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(uploadTestData.TT.emailId4),
            await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(uploadTestData.TT.specPmtPurpose),
            ]);
        }
    }

    if(isRemit13 || isRemit14) {
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.TTRemit.fromAccount : uploadTestData.TTRemit.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeAdd1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeAdd2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(uploadTestData.TTRemit.newPayeeAdd3),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
            // await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(uploadTestData.TTRemit.paymentType),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(uploadTestData.TTRemit.payeeBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(uploadTestData.TTRemit.payeeBankLocation),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(uploadTestData.TTRemit.paymentDetail),
            await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(uploadTestData.TTRemit.bankChargeUs),
            await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? uploadTestData.TTRemit.fromAccount : uploadTestData.TTRemit.UAT.fromAccount),
        ]);
        if(SIT){
            await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty()
        }
        if(isRemit13) {
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textContains(SIT ? uploadTestData.TTRemit.intermediaryBankName : uploadTestData.TTRemit.UAT.intermediaryBankName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textContains(SIT ? uploadTestData.TTRemit.intermediaryBankID : uploadTestData.TTRemit.UAT.intermediaryBankID)
            ]);
        }
    }
}

export async function checkViewACTPageAllField(isUFF: boolean = false) {
    if(isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.headerRef).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(uploadTestData.ACT.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(uploadTestData.ACT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeAcctValue).textContains(uploadTestData.ACT.newPayeeAcct),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(uploadTestData.ACT.newPayeeName),
            // await ensure(_PaymentsPages.AccountTransferPage.payeeAdd1).textContains(uploadTestData.ACT.payeeAdd1),
            await ensure(_PaymentsPages.AccountTransferPage.payeeAdd2).textContains(uploadTestData.ACT.payeeAdd2),
            // await ensure(_PaymentsPages.AccountTransferPage.payeeAdd3).textContains(uploadTestData.ACT.payeeAdd3),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(uploadTestData.ACT.paymentType),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(uploadTestData.ACT.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(uploadTestData.ACT.paymentDetail),
            await ensure(_PaymentsPages.AccountTransferPage.messageValue).textContains(uploadTestData.ACT.message),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId0),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId1),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId2),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId3),
            await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(uploadTestData.ACT.emailId4),
            await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(uploadTestData.ACT.amountValue),
            // await ensure(_PaymentsPages.AccountTransferPage.messageToApproverValue).textContains(uploadTestData.ACT.transactionNote)
         ]);
    } else {
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.headerRef).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(uploadTestData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(uploadTestData.ACTRemit.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.ACTRemit.fromAccount : uploadTestData.ACTRemit.UAT.fromAccount),
            // await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeAcctValue).textContains(uploadTestData.ACTRemit.newPayeeAcct),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(uploadTestData.ACTRemit.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.payeeAdd1).textContains(uploadTestData.ACTRemit.payeeAdd1),
            await ensure(_PaymentsPages.AccountTransferPage.payeeAdd2).textContains(uploadTestData.ACTRemit.payeeAdd2),
            await ensure(_PaymentsPages.AccountTransferPage.payeeAdd3).textContains(uploadTestData.ACTRemit.payeeAdd3),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(uploadTestData.ACTRemit.paymentType),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(uploadTestData.ACTRemit.amountValue),
            await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(uploadTestData.ACTRemit.paymentDetail),
            await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(uploadTestData.ACTRemit.amountValue)
         ]);
         if(SIT){
            await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty()
         }
    }
}

// UFF and Remit Format
export async function   checkViewMEPSPageAllField(isUFF: boolean = false, isRemit: boolean = false, isRemit14: boolean = false) {
    await Promise.all([
        await ensure(_PaymentsPages.MEPSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.MEPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(uploadTestData.MEPSPayment.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? uploadTestData.MEPSPaymentR13.fromAccount : uploadTestData.MEPSPaymentR13.UAT.fromAccount),
        // await ensure(_PaymentsPages.MEPSPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.MEPSnewPayeeAccountNumberValue).textContains(uploadTestData.MEPSPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.MEPSPaymentPage.newPayeeNameValue).textContains(uploadTestData.MEPSPayment.newPayeeNameValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress1Value).textContains(uploadTestData.MEPSPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress2Value).textContains(uploadTestData.MEPSPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeAdress3Value).textContains(uploadTestData.MEPSPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentTypeValue).textContains(uploadTestData.MEPSPayment.paymentType),
        await ensure(_PaymentsPages.MEPSPaymentPage.sendAmountValue).textContains(uploadTestData.MEPSPayment.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankName).textContains(uploadTestData.MEPSPayment.payeeBankName),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCounty).textContains(uploadTestData.MEPSPayment.payeeBankCountry),
        await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCode).textIs(uploadTestData.MEPSPayment.payeeBankCode),
        await ensure(_PaymentsPages.MEPSPaymentPage.paymentDetailValue).textContains(uploadTestData.MEPSPayment.paymentDetailValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.totalDeductValue).textContains(uploadTestData.MEPSPayment.amountValue),
        await ensure(_PaymentsPages.MEPSPaymentPage.bankChargeValue).textContains(uploadTestData.MEPSPayment.bankChargeSHA),
        await ensure(_PaymentsPages.MEPSPaymentPage.chargeAcctValue).textContains(SIT ? uploadTestData.MEPSPaymentR13.fromAccount : uploadTestData.MEPSPaymentR13.UAT.fromAccount), 
        await ensure(_PaymentsPages.MEPSPaymentPage.referenceValue).isNotEmpty(),
        // await ensure(_PaymentsPages.MEPSPaymentPage.messageToApproverValue).textContains(uploadTestData.MEPSPayment.transactionNote)
    ]);
     if(SIT){
        await ensure(_PaymentsPages.MEPSPaymentPage.balanceValue).isNotEmpty()
    }

    if(isRemit || isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankAdress1).textContains(uploadTestData.MEPSPayment.payeeBankAdress1),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankAdress2).textContains(uploadTestData.MEPSPayment.payeeBankAdress2),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankCity).textContains(uploadTestData.MEPSPayment.payeeBankCity),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBankSwiftBic).textIs(uploadTestData.MEPSPayment.PayeebankID),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeBranchCode).textIs(uploadTestData.MEPSPayment.payeeBranchCode),
        ]);
    }

    if(isUFF) {
        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.messageValue).textContains(uploadTestData.MEPSPayment.message),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId0),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId1),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId2),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId3),
            await ensure(_PaymentsPages.MEPSPaymentPage.emailList).textContains(uploadTestData.MEPSPayment.emailId4),
        ]);
    }
}

export async function deleteFile() {
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

export async function checkViewBPYIBGPageAllField(isNIBG :Boolean) {
    await Promise.all([
        // check Bulu Payment NIBG and IBG format
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(isNIBG ? SIT ? uploadTestData.bulkPaymentNIBG.fromAccount : uploadTestData.bulkPaymentNIBG.UAT.fromAccount : SIT ? uploadTestData.bulkPaymentIBG.fromAccount : uploadTestData.bulkPaymentIBG.UAT.fromAccount),
        // await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.paymentTypeView : uploadTestData.bulkPaymentIBG.paymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.totalAmount : uploadTestData.bulkPaymentIBG.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.totalAmount : uploadTestData.bulkPaymentIBG.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.totalPayee : uploadTestData.bulkPaymentIBG.totalPayee),
        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.payeeName : uploadTestData.bulkPaymentIBG.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.payeeNickName : uploadTestData.bulkPaymentIBG.payeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.payeeBankName : uploadTestData.bulkPaymentIBG.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.accountNumber : uploadTestData.bulkPaymentIBG.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.amount : uploadTestData.bulkPaymentIBG.amount),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(isNIBG ? uploadTestData.bulkPaymentNIBG.purposeCode : uploadTestData.bulkPaymentIBG.purposeCode),
        await ensure(_PaymentsPages.BulkPaymentPage.activityLog).textContains("Create"),
    ]);
    if(SIT){
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty()
    }

    if(isNIBG){
        await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.bulkPaymentNIBG.payeeBankId),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.bulkPaymentNIBG.refForPayee),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.bulkPaymentNIBG.paymentDetails)
    ]);
    }else{
        await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(uploadTestData.bulkPaymentIBG.payeeBankId),
        await ensure(_PaymentsPages.BulkPaymentPage.refForPayeeValueIBG).textContains( uploadTestData.bulkPaymentIBG.refForPayee),
    ]);
    }
}

export async function checkViewBulkCOLPageAllField(isNIBG :Boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(isNIBG ? SIT ? uploadTestData.bulkCollectionNIBG.fromAccount : uploadTestData.bulkCollectionNIBG.UAT.fromAccount : SIT ? uploadTestData.COLDBSIBG.fromAccount : uploadTestData.COLDBSIBG.UAT.fromAccount),
        // await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.paymentTypeView : uploadTestData.COLDBSIBG.paymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.totalAmount : uploadTestData.COLDBSIBG.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.totalAmount : uploadTestData.COLDBSIBG.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.totalPayee : uploadTestData.COLDBSIBG.totalPayee),
        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.payeeName : uploadTestData.COLDBSIBG.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.payeeNickName : uploadTestData.COLDBSIBG.payeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.payeeBankName : uploadTestData.COLDBSIBG.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.accountNumber : uploadTestData.COLDBSIBG.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.DDARefValue0).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.ddaReference : uploadTestData.COLDBSIBG.DDARef),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.amount : uploadTestData.COLDBSIBG.amount),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(isNIBG ? uploadTestData.bulkCollectionNIBG.purposeCode : uploadTestData.COLDBSIBG.purposeCode),
        await ensure(_PaymentsPages.BulkPaymentPage.activityLog).textContains("Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty()
    }
    if(isNIBG){
        await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.bulkCollectionNIBG.payeeBankId),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.bulkCollectionNIBG.refForPayee),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.bulkCollectionNIBG.paymentDetails)
    ]);
    }else{
        await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(uploadTestData.COLDBSIBG.payeeBankId),
        await ensure(_PaymentsPages.BulkPaymentPage.refForPayeeValueIBG).textContains(uploadTestData.COLDBSIBG.refForPayee)
    ]);
    }
}

export async function checkViewPayrollNIBGPageAllField(isNIBG :Boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(isNIBG ? SIT ? uploadTestData.MP2NIBG.fromAccount : uploadTestData.MP2NIBG.UAT.fromAccount : SIT ? uploadTestData.MPDBSIBG.fromAccount : uploadTestData.MPDBSIBG.UAT.fromAccount),
        // await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(isNIBG ? uploadTestData.MP2NIBG.paymentTypeView : uploadTestData.MPDBSIBG.paymentTypeView),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isNIBG ? uploadTestData.MP2NIBG.totalAmount : uploadTestData.MPDBSIBG.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isNIBG ? uploadTestData.MP2NIBG.totalAmount : uploadTestData.MPDBSIBG.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isNIBG ? uploadTestData.MP2NIBG.totalPayee : uploadTestData.MPDBSIBG.totalPayee),
        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(isNIBG ? uploadTestData.MP2NIBG.payeeName : uploadTestData.MPDBSIBG.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(isNIBG ? uploadTestData.MP2NIBG.payeeNickName : uploadTestData.MPDBSIBG.payeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(isNIBG ? uploadTestData.MP2NIBG.payeeBankName : uploadTestData.MPDBSIBG.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isNIBG ? uploadTestData.MP2NIBG.accountNumber : uploadTestData.MPDBSIBG.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isNIBG ? uploadTestData.MP2NIBG.amount : uploadTestData.MPDBSIBG.amount),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(isNIBG ? uploadTestData.MP2NIBG.purposeCode : uploadTestData.MPDBSIBG.purposeCode),
        await ensure(_PaymentsPages.BulkPaymentPage.activityLog).textContains("Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty()
    }
    if(isNIBG){
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(uploadTestData.MP2NIBG.payeeBankId),
            await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.MP2NIBG.refForPayee),
            await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
            await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.MP2NIBG.paymentDetails),
        ]);
    }else{
        await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(uploadTestData.MPDBSIBG.payeeBankId),
        await ensure(_PaymentsPages.BulkPaymentPage.refForPayeeValueIBG).textContains(uploadTestData.MPDBSIBG.refForPayee)
    ]);
    }
}

export async function deleteUploadFile(fileName:string) {
    await _FilesPages.uploadFilePage.filesMenu.click();
    await _FilesPages.ViewFilePage.loadCondition();
    await _FilesPages.ViewFilePage.Filefilter.input(fileName);
    await _FilesPages.ViewFilePage.FileNameLink.jsClick();
    await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    await _FilesPages.ViewFilePage.deleteFileButn.jsClick();
    await _FilesPages.ViewFilePage.deleteButn.click();
    await _FilesPages.ViewFilePage.OKButn.click();
    uploadSuccessFlag = false;
    remitFileName = '';
}