/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');

describe('ID_Payroll 02', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Payroll02.SIT.loginCompanyId : testData.Payroll02.UAT.loginCompanyId, SIT ? testData.Payroll02.SIT.loginUserId : testData.Payroll02.UAT.loginUserId, testData.Payroll.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Can not create payroll 02 with item amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll02.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll02.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll02.SIT.payeeBankID : testData.Payroll02.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll02.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.moreThanMaxAmountIX);
        await ensure(_PaymentsPages.PayrollPage.amountErrorTip).textContains(testData.Payroll02.amountErrorTip);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.hasUXIxErrorMsg1(testData.Payroll02.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create payroll 02 with item amount enqual to 1000000000 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll02.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll02.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll02.SIT.payeeBankID : testData.Payroll02.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll02.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.maxAmountIX);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll02.maxAmount),
        ]);
    });

    it('Create payroll 02 with Total amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll02.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll02.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll02.SIT.payeeBankID : testData.Payroll02.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll02.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.maxAmountIX);
        await _PaymentsPages.PayrollPage.existingPayeeTabIx.click();
        await _PaymentsPages.PayrollPage.filterExistingPayee.input(testData.Payroll02.payrollExistingPayee);
        await _PaymentsPages.PayrollPage.addpayee.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.amountIX);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),

        ]);
    });
});