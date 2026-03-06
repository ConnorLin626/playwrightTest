/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('VN_testData.json');

describe('VN_Payroll', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId, SIT ? 123123 : testData.Payroll.UAT.Password); });    
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Can not create Payroll with item amount greater than 500000000 VND', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.moreThanMaxAmountIx);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.Payroll.paymentDetails);
        await ensure(_PaymentsPages.PayrollPage.amountErrorTip).textContains(testData.Payroll.amountErrorTip);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.hasUXIxErrorMsg1(testData.Payroll.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create Payroll with item amount enqual to 500000000 VND', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.maxAmountIx);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.Payroll.paymentDetails);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.maxAmount),
        ]);
    });

    it('Create payroll with Total amount greater than 500000000 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.maxAmountIx);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.Payroll.paymentDetails);
        await _PaymentsPages.PayrollPage.existingPayeeTabIx.jsClick();
        await _PaymentsPages.PayrollPage.filterExistingPayee.input(testData.Payroll.bulkExistingPayee);
        await _PaymentsPages.PayrollPage.addpayee.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.maxAmountIx);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.Payroll.paymentDetails);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            // await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.Payroll.maxAmount),

        ]);
    });
});