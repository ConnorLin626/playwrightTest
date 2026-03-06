import { browser } from "protractor";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, generatedID, handlerCase, PROJECT_TYPE, SIT } from "../../../lib";
import { PaymentsPages } from "../../../pages/IDEALX";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');
let templateName = "";

describe('HK MT101 Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MT101Payment.SIT.loginCompanyId : testData.MT101Payment.UAT.loginCompanyId, SIT ? testData.MT101Payment.SIT.loginUserId : testData.MT101Payment.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create HK MT101 Payment template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createMT101TemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'MT101' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await fillUpFields(
            testData.MT101Payment.fromAccount,
            testData.MT101Payment.paymentCurrency,
            testData.MT101Payment.amount,
            testData.MT101Payment.fxContractReference,
            testData.MT101Payment.existingPayee);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.MT101Payment.amount);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.fromAccountValue).textContains(testData.MT101Payment.fromAccount),
            await ensure(_PaymentsPages.mt101PaymentPage.statusTemplateValue).textContains(testData.status.Approved),
            await ensure(_PaymentsPages.mt101PaymentPage.pmtTypeValue).textContains(testData.MT101Payment.paymentTypeName),
        ]);
    });
});

async function fillUpFields(fromAccount: string, paymentCurrency: string, amount: string, fxContractRef: string, existingPayee: string) {
    await _PaymentsPages.mt101PaymentPage.fromAccount.select(fromAccount);
    await _PaymentsPages.mt101PaymentPage.paymentCurrency.select(paymentCurrency);
    await _PaymentsPages.mt101PaymentPage.amount.input(amount);
    await _PaymentsPages.mt101PaymentPage.fxContractReference.input(fxContractRef);
    await _PaymentsPages.mt101PaymentPage.existingTab.jsClick();
    await _PaymentsPages.demandDraftPaymentPage.existingBeneficiary.select(existingPayee);
}