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
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.ManagePayroll.SIT.loginCompanyId : testData.ManagePayroll.UAT.loginCompanyId, SIT ? testData.ManagePayroll.SIT.loginUserId : testData.ManagePayroll.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Can not create Manage payroll with item amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDManagePayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll.SIT.fromAccount : testData.ManagePayroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.ManagePayroll.SIT.payeeBankID : testData.ManagePayroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll.moreThanMaxAmount);
        await ensure(_PaymentsPages.PayrollPage.amountErrorTip).textContains(testData.ManagePayroll.amountErrorTip);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.hasUXErrorMsg(testData.ManagePayroll.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create Manage payroll with item amount enqual to 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDManagePayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll.SIT.fromAccount : testData.ManagePayroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.ManagePayroll.SIT.payeeBankID : testData.ManagePayroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll.maxAmount);
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
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll.SIT.fromAccount : testData.ManagePayroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayroll.maxAmount),
        ]);
    });

    it('Create Manage payroll with Total amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDManagePayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll.SIT.fromAccount : testData.ManagePayroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.ManagePayroll.SIT.payeeBankID : testData.ManagePayroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll.maxAmount);
        await _PaymentsPages.PayrollPage.existingPayeeTab.click();
        await _PaymentsPages.PayrollPage.filterExistingPayee.input(testData.ManagePayroll.payrollExistingPayee);
        await _PaymentsPages.PayrollPage.addpayee.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll.amount);
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
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll.SIT.fromAccount : testData.ManagePayroll.UAT.fromAccount),
            // await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.Payroll.maxAmount),

        ]);
    });
});