/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, handlerCase, SIT } from '../../../lib';
import { browser, promise } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
const lib_1 = require("../../../lib");
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('VN_testData.json');
let _FilesPages = new FilesPages();
let fileName = "";
let paymentType = "";
let approvalOption = "";

describe('VN_DigiDoc', async function () {

    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(
            SIT ? testData.OTT.SIT.loginCompanyId : testData.OTT.UAT.loginCompanyId,
            SIT ? testData.OTT.SIT.loginUserId : testData.OTT.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    // it('Create a TT Payment with DigiDoc file', async function () {
    //     await _PaymentsPages.openMenu(Menu.Payments.VNPaymentLocalOverseasPayee);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.OTT.amount);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testData.OTT.paymentCCY);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPayee();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(SIT ? testData.OTT.SIT.existingPayee : testData.OTT.UAT.existingPayee);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.scrollTo(0,1300)
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.click();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.select(testData.OTT.purposeCode);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeCountry.click();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeCountry.select(testData.OTT.payeeCountry);
    //     // await _PaymentsPages.PaymentLocalOverseasPayeePage.digiDocFileUploadButton.select(testData.OTT.uploadDocument);
    //     // await _PaymentsPages.PaymentLocalOverseasPayeePage.DocType.select(testData.OTT.DocumentType);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesShared.jsClick();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.OTT.PaymentDetail);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.jsClick();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
    //         reference = text;
    //     });
    //     await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
    //     await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    //     await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    //     await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
    //     await promise.all([
    //         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount),
    //         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.OTT.amount),
    //         await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
    //         //await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.digiDocUploaded).textContains(testData.OTT.uploadDocument),
    //     ])
    // });

    it('FS upload a TT Payment with DigiDoc file', async function () {

        paymentType = testData.FSuploadFile.fileType;
        approvalOption = testData.FSuploadFile.approvalOptionByTxn;
        await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, lib_1.SIT ? testData.FSuploadFile.SIT.fileName : testData.FSuploadFile.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;

        });

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await _PaymentsPages.PaymentLocalOverseasPayeePage.AddAttachmentBtn.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForAddAttachmentPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.UploadfileBtn.select(testData.OTT.uploadDocument);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.DocType.select(testData.OTT.DocumentType);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.ConfirmUploadBtn.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.digiDocUploaded).textContains(testData.OTT.uploadDocument),
        ])
    });

    // UAT hasn't data to test, working fine at 245
    //  it('Edit ITT with DigiDoc file', async function () {
    //     await new NavigatePages().loginCB(SIT ? testData.ITT.SIT.loginCompanyId : testData.ITT.UAT.loginCompanyId, SIT ? testData.ITT.SIT.loginUserId : testData.ITT.UAT.loginUserId);
    //     await displayDataWithSearchandSelectFirstOne();
    //     await _PaymentsPages.ITTPage.loadCondition4ITTView();
    //     await _PaymentsPages.ITTPage.editButton.click();
    //     await _PaymentsPages.ITTPage.loadCondition4ITTEdit();
    //     await _PaymentsPages.ITTPage.digiDocFileUploadButton.select(testData.ITT.uploadDocument);
    //     await _PaymentsPages.ITTPage.digiDocFileType.select(testData.ITT.DocumentType);
    //     await _PaymentsPages.ITTPage.nextButton.click();
    //     await _PaymentsPages.ITTPage.loadCondition4ITTSubmit();
    //     await _PaymentsPages.ITTPage.submitButton.click();
    //     await ensure(_PaymentsPages.ITTPage).isUXSuccess();

    //     await displayDataWithSearchandSelectFirstOne();
    //     await _PaymentsPages.ITTPage.loadCondition4ITTView();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.ITTPage.purposeCodeValue).textContains(
    //                 testData.ITT.purposeCode
    //             )
    //         ])
    //     });

    it('FS upload a TT Payment without Payee address1', async function () {

        paymentType = testData.FSuploadFile.fileType;
        approvalOption = testData.FSuploadFile.approvalOptionByTxn;
        await _FilesPages.filemanagement_UploadFile.fsUpload2(_FilesPages, paymentType, lib_1.SIT ? testData.FSuploadFile.SIT.uploadFailFileName : testData.FSuploadFile.UAT.uploadFailFileName, approvalOption).then(async (data) => {
            fileName = data;

        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.click();
        await _FilesPages.filemanagement_UploadFile.Showtransactions.click();
        await Promise.all([
            await ensure(_FilesPages.filemanagement_UploadFile.errorMsg).textContains(
                testData.FSuploadFile.errorMsg
            )
        ])
    });

    async function displayDataWithSearchandSelectFirstOne(): Promise<void> {
        await _PaymentsPages.openMenu(Menu.Approvals.PaymentsITT);
        await _PaymentsPages.ITTPage.loadCondition();
        await _PaymentsPages.ITTPage.showAddFilterLabel.jsClick();
        await _PaymentsPages.ITTPage.dateFromSelect.select(
            testData.ITT.dateFrom
        );
        await _PaymentsPages.ITTPage.dateToSelect.select(
            testData.ITT.dateTo
        );
        await _PaymentsPages.ITTPage.searchButton.click();
        await _PaymentsPages.ITTPage.loadCondition4Search();
        await _PaymentsPages.ITTPage.firstDataItem.click();
    }

});