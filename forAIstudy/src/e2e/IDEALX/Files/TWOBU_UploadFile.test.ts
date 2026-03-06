/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages,PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase} from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('TWOBU_testData.json');
let uploadTestData = _FilesPages.fetchTestData("uploadTestData/TWOBU_uploadTestData.json");
let fileName = "";
let reference = "";

//add for AB-9145:check view transaction, purpose code/subpurpose code/description value
describe('TW OBU File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.fileServicesForTT.SIT.loginCompanyId : testData.fileServicesForTT.UAT.loginCompanyId, SIT ? testData.fileServicesForTT.SIT.loginUserId : testData.fileServicesForTT.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    let fileType = "ALL - Universal File Format"
    
    it('Upload TT with UFF Format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.fileServicesForTT.SIT.fileNameAllTT : testData.fileServicesForTT.UAT.fileNameAllTT, testData.fileServicesForTT.approvalOptionByTransaction).then(async data => {
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
            await ensure(_FilesPages.uploadFilePage.purposecodeValue).textContains(testData.fileServicesForTT.FSTTValue.purposeCode),
            await ensure(_FilesPages.uploadFilePage.subPurposeCodeValue).textContains(testData.fileServicesForTT.FSTTValue.subPurposeCode),
            //await ensure(_FilesPages.uploadFilePage.otherDesValue).textContains(testData.TWOBU.FSTTValue.otherDes),
        ]);
    });
    
});

describe('TW OBU File Services For GS', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.fileServicesForGS.SIT.loginCompanyId : testData.fileServicesForGS.UAT.loginCompanyId, SIT ? testData.fileServicesForGS.SIT.loginUserId : testData.fileServicesForGS.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    let fileType = "ALL - Universal File Format"
    //ADD for IDXP-2049
    it('Upload GS with UFF Format by file', async function () {
        before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.fileServicesForGS.SIT.loginCompanyId : testData.fileServicesForGS.UAT.loginCompanyId, SIT ? testData.fileServicesForGS.SIT.loginUserId : testData.fileServicesForGS.UAT.loginUserId, "123123"); });
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload6(_FilesPages, fileType, SIT ? testData.fileServicesForGS.SIT.fileNameAllGS : testData.fileServicesForGS.UAT.fileNameAllGS, testData.fileServicesForGS.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetailTitle.click();


        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(testData.fileServicesForGS.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(testData.fileServicesForGS.beneName),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),      
            await ensure(_PaymentsPages.singlePaymentPage.PurposeCodeView).textContains(testData.fileServicesForGS.purposeCodeValue),
            await ensure(_PaymentsPages.singlePaymentPage.ViewBeneType).textContains(testData.fileServicesForGS.addInfor1),
            await ensure(_PaymentsPages.singlePaymentPage.ViewSourceFund).textContains(testData.fileServicesForGS.addInfor2),
            await ensure(_PaymentsPages.singlePaymentPage.ViewRelationshipBene).textContains(testData.fileServicesForGS.addInfor3),
        ]);
    });

});


    //Add for IDXP-812 
describe('TW OBU Bulk Payment with FISC Format', async function () {
        this.retries(browser.params.caseRetryTimes);
        before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.fileServicesForBulkFISC.SIT.loginCompanyId : testData.fileServicesForBulkFISC.UAT.loginCompanyId, SIT ? testData.fileServicesForBulkFISC.SIT.loginUserId : testData.fileServicesForBulkFISC.UAT.loginUserId, "123123"); });
        const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
    
    it('Upload Bulk Payment with FISC Format', async function () {
        //await new NavigatePages().loginIdealx(SIT ? testData.fileServices.SIT.loginCompanyId : testData.fileServices.UAT.loginCompanyId, SIT ? testData.fileServices.SIT.loginUserId : testData.fileServices.UAT.loginUserId, "123123");
        let fileType = "Bulk Payment - Bulk FISC"
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.fileServicesForBulkFISC.SIT.fileNameForBulkFISC : testData.fileServicesForBulkFISC.UAT.fileNameForBulkFISC, testData.fileServicesForBulkFISC.approvalOptionByTransaction).then(async data => {
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
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewFISCBPYPageAllField();
    });
});

export async function checkViewFISCBPYPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(uploadTestData.BulkForFISCFormat.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.BulkForFISCFormat.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.DebitTypeValue).textContains(uploadTestData.BulkForFISCFormat.DebitType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.BulkForFISCFormat.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(uploadTestData.BulkForFISCFormat.bankChargeUs),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(uploadTestData.BulkForFISCFormat.chargeAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textIs(reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(uploadTestData.BulkForFISCFormat.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(uploadTestData.BulkForFISCFormat.newPayeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankMaual).textContains(uploadTestData.BulkForFISCFormat.payeeBank),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.BulkForFISCFormat.newPayeeAcctNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(uploadTestData.status.PendingApproval,uploadTestData.status.PendingVerification),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.BulkForFISCFormat.amountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(uploadTestData.BulkForFISCFormat.transactionCode),
        //await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.PayrollForFISCFormat.refForPayee),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.BulkForFISCFormat.paymentDetail),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.BulkForFISCFormat.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.BulkForFISCFormat.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.activityLog).textContains("Create")
    ]);
}