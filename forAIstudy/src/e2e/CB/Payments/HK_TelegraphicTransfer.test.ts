/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { FilesPages, NavigatePages, PaymentsPages } from "../../../pages/CB";
import { Menu } from '../../../config/menu';
import { ensure, SIT, handlerCase, devWatch } from '../../../lib';
import { browser } from 'protractor';
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');
let reference = "";
let paymentType = "ALL - Universal File Format";

describe('HK_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a TT Payment without Purpose Code', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        // await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.select(testData.TelegraphicTransfer.purposeCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
        // await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.hasUXErrorMsg(testData.TelegraphicTransfer.errorMessage).then(value => {
            if (!value) {
                throw new Error('error message is wrong.');
            }
        });
    });

    it('Create a TT Payment with Purpose Code and Payment Details', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.select(testData.TelegraphicTransfer.purposeCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
        // add for AB-8435: HK TT payment details support chinese char
        await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetailValue).textContains(testData.TelegraphicTransfer.paymentDetail)
        ]);
    });

    it('Upload HK TT File', async function () {
        let fileName = "";
        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.TelegraphicTransfer.SIT.fileName : testData.TelegraphicTransfer.UAT.fileName, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });

        if (fileName == "") {
            throw new Error('Upload File Fail.');
        }
    });
});



