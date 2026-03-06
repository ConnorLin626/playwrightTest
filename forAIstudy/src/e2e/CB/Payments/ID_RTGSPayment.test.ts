/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');

describe('ID_RTGS', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.RTGSPayment.SIT.loginCompanyId : testData.RTGSPayment.UAT.loginCompanyId, SIT ? testData.RTGSPayment.SIT.loginUserId : testData.RTGSPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Can not create RTGS with amount less than 100000001 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.lessMinamount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await ensure(_PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox).hasClassName("disabled");
    });

    it('Can create RTGS with amount 100000001 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.minAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.minAmount),
        ]);
    });

    it('Can not create RTGS with amount greater than 9999999999999 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.moreThanMaxAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.hasUXErrorMsg(testData.RTGSPayment.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Can create RTGS with amount 9999999999999 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.maxAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.maxAmount),
        ]);
    });
});