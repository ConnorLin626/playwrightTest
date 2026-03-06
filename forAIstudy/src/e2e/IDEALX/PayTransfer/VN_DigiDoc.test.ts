/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from '../../../pages/IDEALX';
import { ensure, handlerCase, SIT, PROJECT_TYPE } from '../../../lib';
import { browser, promise } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('VN_testData.json');
let _FilesPages = new FilesPages();
let fileName = "";
let paymentType = "";
let approvalOption = "";

describe('VN_DigiDoc', async function () {

    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.OTT.SIT.loginCompanyId : testData.OTT.UAT.loginCompanyId, SIT ? testData.OTT.SIT.loginUserId : testData.OTT.UAT.loginUserId, SIT ? 123123 : testData.OTT.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a TT Payment with DigiDoc file', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.OTT.amount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.OTT.paymentCCY);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(SIT ? testData.OTT.SIT.existingPayee : testData.OTT.UAT.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.OTT.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.payeeCountry.select(testData.OTT.payeeCountry);
        await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.OTT.uploadDocument);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.OTT.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.OTT.PaymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.OTT.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploaded).textContains(testData.OTT.uploadDocument),
        ])
    });

    it('FS upload a TT Payment with DigiDoc file', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = testData.FSuploadFile.fileType;
        approvalOption = testData.FSuploadFile.approvalOptionByTxn;
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FSuploadFile.SIT.fileName : testData.FSuploadFile.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;

        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await _PaymentsPages.TelegraphicTransferPage.AddAttachmentBtn.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForAddAttachmentPage();
        await _PaymentsPages.TelegraphicTransferPage.UploadfileBtn.select(testData.OTT.uploadDocument);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.OTT.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.ConfirmUploadBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploaded).textContains(testData.OTT.uploadDocument),
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
        await _FilesPages.uploadFilePage.filesMenu.click();
        paymentType = testData.FSuploadFile.fileType;
        approvalOption = testData.FSuploadFile.approvalOptionByTxn;
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.FSuploadFile.SIT.uploadFailFileName : testData.FSuploadFile.UAT.uploadFailFileName, approvalOption).then(async (data) => {
            fileName = data;

        });
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();
        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FSuploadFile.errorMsg)
        ])
    });

    async function displayDataWithSearchandSelectFirstOne(): Promise<void> {
        await _PaymentsPages.ITTPage.ITTApprove.click();
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