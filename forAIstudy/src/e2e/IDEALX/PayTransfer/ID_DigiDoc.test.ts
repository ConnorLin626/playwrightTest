/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from '../../../pages/IDEALX';
import { ensure, handlerCase, SIT, PROJECT_TYPE } from '../../../lib';
import { browser, promise } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');
let _FilesPages = new FilesPages();
let fileName = "";

describe('ID_DigiDoc', async function () {

    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.digidoc.SIT.loginCompanyId : testData.digidoc.UAT.loginCompanyId, SIT ? testData.digidoc.SIT.loginUserId : testData.digidoc.UAT.loginUserId, testData.digidoc.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a TT Payment with DigiDoc file', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.digidoc.SIT.fromAccount : testData.digidoc.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amountCcy.select(SIT ? testData.digidoc.SIT.amountCcy : testData.digidoc.UAT.amountCcy);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.digidoc.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(SIT ? testData.digidoc.SIT.existingPayee : testData.digidoc.UAT.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.digidoc.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.ComplianceCode.select(testData.digidoc.ComplianceCode);
        await _PaymentsPages.TelegraphicTransferPage.underlyingCode.select(testData.digidoc.underlyingCode);
        await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.digidoc.docType);
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
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOTTPaymentPage();
        await promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.digidoc.SIT.fromAccount : testData.digidoc.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.digidoc.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploaded).textContains(testData.digidoc.uploadFileName),
        ])
    });

    let paymentType = "";
    let approvalOption = "";
    it('FS upload a TT Payment with DigiDoc file', async function () {
        paymentType = "ALL - Universal File Format";
        approvalOption = "transaction";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.digidoc.SIT.fileName : testData.digidoc.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await _PaymentsPages.TelegraphicTransferPage.AddAttachmentBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForAddAttachmentPage();
        await _PaymentsPages.TelegraphicTransferPage.UploadfileBtn.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.ConfirmUploadBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploaded).textContains(testData.digidoc.uploadFileName),
        ]);
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