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

describe('ID_Manage Payroll', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.ManagePayroll02.SIT.loginCompanyId : testData.ManagePayroll02.UAT.loginCompanyId, SIT ? testData.ManagePayroll02.SIT.loginUserId : testData.ManagePayroll02.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Can not create Manage payroll with item amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDManagePayroll02);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll02.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.ManagePayroll02.SIT.payeeBankID : testData.ManagePayroll02.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll02.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.moreThanMaxAmount);
        await ensure(_PaymentsPages.PayrollPage.amountErrorTip).textContains(testData.ManagePayroll02.amountErrorTip);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.hasUXErrorMsg(testData.ManagePayroll02.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create Manage payroll with item amount enqual to 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDManagePayroll02);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll02.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.ManagePayroll02.SIT.payeeBankID : testData.ManagePayroll02.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll02.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.maxAmount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayroll02.maxAmount),
        ]);
    });

    it('Create Manage payroll with Total amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDManagePayroll02);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll02.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.ManagePayroll02.SIT.payeeBankID : testData.ManagePayroll02.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll02.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.maxAmount);
        await _PaymentsPages.PayrollPage.existingPayeeTab.click();
        await _PaymentsPages.PayrollPage.filterExistingPayee.input(testData.ManagePayroll02.payrollExistingPayee);
        await _PaymentsPages.PayrollPage.addpayee.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount),
            // await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.Payroll.maxAmount),

        ]);
    });
});