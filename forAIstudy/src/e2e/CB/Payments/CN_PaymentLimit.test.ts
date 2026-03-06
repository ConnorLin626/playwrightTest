/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

const menu_1 = require("../../../config/menu");
const lib_1 = require("../../../lib");
let reference = "";
let currentLimitAmount = '';



let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN_PaymentLimit', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.PaymentLimit.SIT.loginCompanyId : testData.PaymentLimit.UAT.loginCompanyId, SIT ? testData.PaymentLimit.SIT.loginUserId : testData.PaymentLimit.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Edit Limit', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLimit);
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
      await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLimit);
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
    await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLimit);
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
      await ensure(_PaymentsPages.PaymentLimit.currentLimitAmount).textContains('CNY')
    ]);
  });

  it('Approve an Payroll transaction which amount exceed the daily limit', async function () {
    await _PaymentsPages.openMenu(menu_1.Menu.Payments.CNPayrollLimit);
    await _PaymentsPages.PayrollPage.loadCondition();
    await _PaymentsPages.PayrollPage.fromAccount.select(testData.CNAPSPayment.fromAccount);
    await _PaymentsPages.PayrollPage.addExistingPayee(testData.PaymentLimit.existingPayee);
    await _PaymentsPages.PayrollPage.amount.input(testData.PaymentLimit.amountA1);
    await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
    await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
    await _PaymentsPages.PayrollPage.submitButton.click();
    await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
    await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
      reference = text;
    });
    await lib_1.ensure(_PaymentsPages.PayrollPage).isUXSuccess();
    await _PaymentsPages.openMenu(menu_1.Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
    await _PaymentsPages.PayrollPage.approveButton.click();
    await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
    await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.PayrollPage.challengeResponse.input('12345678');
    await _PaymentsPages.PayrollPage.approveButton.click();
    await _PaymentsPages.PayrollPage.hasUXErrorMsg('Transaction exceeds IDEAL transaction daily limit for the company - 1021421 for 18 Aug 2020. Please submit your payment over the counter or update your company limit.').then(value => {
      if (!value) {
        throw new Error('error message is wrong.');
      }
    });
  });


});
