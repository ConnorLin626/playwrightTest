/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, handlerCase, SIT } from '../../../lib';
import { browser, promise } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');
let _FilesPages = new CB_1.FilesPages();
let fileName = "";
let CAAcknowledgementnumber = '';

describe('IN_DigiDoc', async function () {

    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(
            SIT ? testData.OTT.SIT.loginCompanyId : testData.OTT.UAT.loginCompanyId,
            SIT ? testData.OTT.SIT.loginUserId : testData.OTT.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a TT Payment with DigiDoc file', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.OTT.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(SIT ? testData.OTT.SIT.existingPayee : testData.OTT.UAT.existingPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.select(testData.OTT.purposeCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.LocationOfService.select(testData.OTT.LocationOfService);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.CAAcknNumber.input(testData.OTT.CAAcknowledgementnumber);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.DocType.select(testData.OTT.DocumentType);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesShared.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.A2Ack.jsClick();
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
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.OTT.SIT.fromAccount : testData.OTT.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.OTT.amountA1),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.digiDocUploaded).textContains(testData.digidoc.uploadFileName),
        ])
    });

    it('FS upload a TT Payment with DigiDoc file', async function () {
        // await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        // await _PaymentsPages.NEFTPaymentPage.loadCondition();
        CAAcknowledgementnumber = '221001';
        await _FilesPages.uploadFilePage.fsUpload(_FilesPages, testData.digidoc.fileType, testData.digidoc.fileFormat, lib_1.SIT ? testData.digidoc.SIT.fileName : testData.digidoc.UAT.fileName, testData.digidoc.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await _PaymentsPages.PaymentLocalOverseasPayeePage.AddAttachmentBtn.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForAddAttachmentPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.UploadfileBtn.select(testData.digidoc.uploadFileName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.DocType.select(testData.digidoc.DocumentType);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.ConfirmUploadBtn.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.digiDocUploaded).textContains(testData.digidoc.uploadFileName),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.CAAcknownumber).textContains(CAAcknowledgementnumber),
        ]);

        it('Edit ITT with DigiDoc file', async function () {
            await new NavigatePages().loginCB(SIT ? testData.ITT.SIT.loginCompanyId : testData.ITT.UAT.loginCompanyId, SIT ? testData.ITT.SIT.loginUserId : testData.ITT.UAT.loginUserId);
            await displayDataWithSearchandSelectFirstOne();
            await _PaymentsPages.ITTPage.loadCondition4ITTView();
            await _PaymentsPages.ITTPage.editButton.click();
            await _PaymentsPages.ITTPage.loadCondition4ITTEdit();
            await _PaymentsPages.ITTPage.purposeCode.select(
                testData.ITT.purposeCode
            );
            await _PaymentsPages.ITTPage.fxContract.input(
                testData.ITT.fxContract
            );
            await _PaymentsPages.ITTPage.disposalAccountInstruction.input(
                testData.ITT.disposalAccountInstruction
            );
            await _PaymentsPages.ITTPage.billRef.input(
                testData.ITT.billRef
            );
            await _PaymentsPages.ITTPage.digiDocFileUploadButton.select(testData.digidoc.uploadFileName);
            await _PaymentsPages.ITTPage.nextButton.click();
            await _PaymentsPages.ITTPage.loadCondition4ITTSubmit();
            await _PaymentsPages.ITTPage.submitButton.click();
            await ensure(_PaymentsPages.ITTPage).isUXSuccess();

            await displayDataWithSearchandSelectFirstOne();
            await _PaymentsPages.ITTPage.loadCondition4ITTView();
            await Promise.all([
                await ensure(_PaymentsPages.ITTPage.purposeCodeValue).textContains(
                    testData.ITT.purposeCode
                )
            ]);
        });

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