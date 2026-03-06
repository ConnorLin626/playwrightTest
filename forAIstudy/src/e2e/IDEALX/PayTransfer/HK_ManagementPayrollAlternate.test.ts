/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK_ Management Payroll(Alternate)', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ManagePayroll02.SIT.loginCompanyId : testData.ManagePayroll02.UAT.loginCompanyId, SIT ? testData.ManagePayroll02.SIT.loginUserId : testData.ManagePayroll02.UAT.loginUserId, SIT ? testData.ManagePayroll02.SIT.pinId : testData.ManagePayroll02.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it('Create create Management Payroll(Alternate) with FPS payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.managePayroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.jsClick();
        await _PaymentsPages.PayrollPage.NewFPSPayee.jsClick();
        await _PaymentsPages.PayrollPage.HKFPSIDradio.jsClick()
        await _PaymentsPages.PayrollPage.HKFPSIDValue.input(SIT ? testData.ManagePayroll02.SIT.HKFPSIDValue:testData.ManagePayroll02.UAT.HKFPSIDValue);
        let isnewPayeeNicknameVisible = await _PaymentsPages.PayrollPage.newPayNowNickName.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.PayrollPage.newPayNowNickName.input(testData.ManagePayroll02.newPayeeNickname);
        };
        await _PaymentsPages.PayrollPage.retriveButton.jsClick();
        await browser.sleep(2000);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amount);
        
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
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayroll02.amount),
            await ensure(_PaymentsPages.PayrollPage.ViewHKFPSID).textContains(SIT ? testData.ManagePayroll02.SIT.HKFPSIDValue:testData.ManagePayroll02.UAT.HKFPSIDValue),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });
});