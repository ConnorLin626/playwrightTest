/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, } from "../../../pages/IDEALX";
import { generatedID, ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let singleTemplateName = '';

//Add for R8.19 IDXP-1220
describe('CN Manage Template', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.template.SIT.loginCompanyId : testData.template.UAT.loginCompanyId, SIT ? testData.template.SIT.loginUserId : testData.template.UAT.loginUserId, SIT ? 123123 : testData.template.UAT.Password);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create ACT payment template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateTWButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'ACTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(testData.template.ACTPayment.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.template.ACTPayment.amount);
        await _PaymentsPages.PaymentTemplatesPage.existingPayee.select(testData.template.ACTPayment.existingPayee);
        await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.template.ACTPayment.paymentDetail);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccountACT).textContains(testData.template.ACTPayment.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amountACT).textContains(testData.template.ACTPayment.amount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameACT).textContains(testData.template.ACTPayment.existingPayee),
            await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeAcctNumACT).textContains(testData.template.ACTPayment.payeeAcctNumber),
        ]);
    })
});