/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('VN_testData.json');

describe('VN_Bulk Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Can not create Bulk Payment with item amount greater than 500000000 VND', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.VNBulkPayment);
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentpage.payeeBankID.select(SIT ? testData.BulkPayment.SIT.payeeBankID : testData.BulkPayment.UAT.payeeBankID);
        await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.moreThanMaxAmount);
        await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.BulkPayment.paymentDetails);
        await ensure(_PaymentsPages.BulkPaymentpage.amountErrorTip).textContains(testData.BulkPayment.amountErrorTip);
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.hasUXErrorMsg(testData.BulkPayment.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create Bulk Payment with item amount enqual to 500000000 VND', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.VNBulkPayment);
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentpage.payeeBankID.select(SIT ? testData.BulkPayment.SIT.payeeBankID : testData.BulkPayment.UAT.payeeBankID);
        await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.maxAmount);
        await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.BulkPayment.paymentDetails);
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.maxAmount),
        ]);
    });

    it('Create Bulk Payment with Total amount greater than 500000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.VNBulkPayment);
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentpage.payeeBankID.select(SIT ? testData.BulkPayment.SIT.payeeBankID : testData.BulkPayment.UAT.payeeBankID);
        await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.maxAmount);
        await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.BulkPayment.paymentDetails);
        await _PaymentsPages.BulkPaymentpage.existingPayeeTab.jsClick();
        await _PaymentsPages.BulkPaymentpage.filterExistingPayee.input(testData.BulkPayment.bulkExistingPayee);
        await _PaymentsPages.BulkPaymentpage.addpayee.jsClick();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.maxAmount);
        await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.BulkPayment.paymentDetails);
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            // await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.Payroll.maxAmount),

        ]);
    });
});