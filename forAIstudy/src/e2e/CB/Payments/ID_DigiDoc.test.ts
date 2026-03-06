/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, handlerCase, SIT } from '../../../lib';
import { browser, promise } from 'protractor';
import { Filemanagement_UploadFile } from '../../../pages/CB/Files';

// this from OnlineCreate, then Reject/Edit/Delete
let _Filemanagement_UploadFile = new Filemanagement_UploadFile();
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');
let _FilesPages = new CB_1.FilesPages();
let fileName = "";

describe('ID_DigiDoc', async function () {

    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(
            SIT ? testData.digidoc.SIT.loginCompanyId : testData.digidoc.UAT.loginCompanyId,
            SIT ? testData.digidoc.SIT.loginUserId : testData.digidoc.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a TT Payment with DigiDoc file', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDPaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.digidoc.SIT.fromAccount : testData.digidoc.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amountCcy.select(SIT ? testData.digidoc.SIT.amountCcy : testData.digidoc.UAT.amountCcy);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.digidoc.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(SIT ? testData.digidoc.SIT.existingPayee : testData.digidoc.UAT.existingPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.select(testData.digidoc.purposeCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.ComplianceCode.select(testData.digidoc.ComplianceCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.scrollTo(0,1500)
        await _PaymentsPages.PaymentLocalOverseasPayeePage.underlyingCode.select(testData.digidoc.underlyingCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.DocType.select(testData.digidoc.docType);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesShared.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.digidoc.SIT.fromAccount : testData.digidoc.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.digidoc.amountA1),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.digiDocUploaded).textContains(testData.digidoc.uploadFileName),
        ])
    });

    let paymentType = "";
    let approvalOption = "";
    it('FS upload a TT Payment with DigiDoc file', async function () {
        paymentType = "ALL - Universal File Format";
        approvalOption = "transaction";
        await _FilesPages.filemanagement_UploadFile.IDdigifsUpload(_FilesPages, paymentType, lib_1.SIT ? testData.digidoc.SIT.fileName : testData.digidoc.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await _PaymentsPages.PaymentLocalOverseasPayeePage.AddAttachmentBtn.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForAddAttachmentPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.UploadfileBtn.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.ConfirmUploadBtn.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.digiDocUploaded).textContains(testData.digidoc.uploadFileName),
        ]);
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