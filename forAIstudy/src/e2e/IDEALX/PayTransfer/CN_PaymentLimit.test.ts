/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { saveScreen, ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

const menu_1 = require("../../../config/menu");
const lib_1 = require("../../../lib");
let reference = "";
let currentLimitAmount = '';



let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN_PaymentLimit', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.PaymentLimit.SIT.loginCompanyId : testData.PaymentLimit.UAT.loginCompanyId, SIT ? testData.PaymentLimit.SIT.loginUserId : testData.PaymentLimit.UAT.loginUserId, testData.PaymentLimit.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Edit Limit', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentLimit.paymentLimitMenu.click();
        await _PaymentsPages.PaymentLimit.loadCondition();
        await _PaymentsPages.PaymentLimit.editButton.click();
        await _PaymentsPages.PaymentLimit.loadConditionForEditPage();
        await _PaymentsPages.PaymentLimit.limitAmount.input(testData.PaymentLimit.limitAmount);
        await _PaymentsPages.PaymentLimit.submitButton.click();
        await _PaymentsPages.PaymentLimit.dismissButton.click();
        await _PaymentsPages.PaymentLimit.loadCondition();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentLimit.newPaymentLimitWrap).isNotEmpty()
        ]);
    });

    it('Delete Limit', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentLimit.paymentLimitMenu.click();;
        await _PaymentsPages.PaymentLimit.loadCondition();
        await _PaymentsPages.PaymentLimit.currentLimitAmount.getText().then(text => {
            currentLimitAmount = text
        });
        await _PaymentsPages.PaymentLimit.deleteButton.click();
        await _PaymentsPages.PaymentLimit.loadConditionForDeletePage();
        await _PaymentsPages.PaymentLimit.dialogDeleteButton.click();
        await _PaymentsPages.PaymentLimit.dismissButton.click();
        await _PaymentsPages.PaymentLimit.loadCondition();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentLimit.currentLimitAmount).textContains(currentLimitAmount)
        ]);
    });

    it('Edit and approve now limit', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentLimit.paymentLimitMenu.click();
        await _PaymentsPages.PaymentLimit.loadCondition();
        await _PaymentsPages.PaymentLimit.editButton.click();
        await _PaymentsPages.PaymentLimit.loadConditionForEditPage();
        await _PaymentsPages.PaymentLimit.limitAmount.input(testData.PaymentLimit.limitAmount);
        await _PaymentsPages.PaymentLimit.approveNowCheckBox.jsClick();
        await _PaymentsPages.PaymentLimit.challengeResponse.input('12345678');
        await _PaymentsPages.PaymentLimit.submitButton.click();
        await _PaymentsPages.PaymentLimit.dismissButton.click();
        await _PaymentsPages.PaymentLimit.loadCondition();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentLimit.currentLimitAmount).isNotEmpty()
        ]);
    });

    it('Approve an Payroll transaction which amount exceed the daily limit', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.PaymentLimit.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.PaymentLimit.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.approveButton.jsClick();
        await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input('12345678');
        await _PaymentsPages.PayrollPage.ApproveButton.jsClick();
        //Update the error message --IEBAA-3570
        await _PaymentsPages.PayrollPage.hasUXIxErrorMsg1('The transfer amount has exceeded the daily RMB limit of 1,000.00 set by your company. Please update the settings.').then(value => {
            if (!value) {
                throw new Error('error message is wrong.');
            }
        });
    });

    it('Edit back payment limit ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentLimit.paymentLimitMenu.click();
        await _PaymentsPages.PaymentLimit.loadCondition();
        await _PaymentsPages.PaymentLimit.editButton.click();
        await _PaymentsPages.PaymentLimit.loadConditionForEditPage();
        await _PaymentsPages.PaymentLimit.limitAmount.input("99999999999");
        await _PaymentsPages.PaymentLimit.approveNowCheckBox.jsClick();
        await _PaymentsPages.PaymentLimit.challengeResponse.input('12345678');
        await _PaymentsPages.PaymentLimit.submitButton.click();
        await _PaymentsPages.PaymentLimit.dismissButton.click();
        await _PaymentsPages.PaymentLimit.loadCondition();
    });
});
