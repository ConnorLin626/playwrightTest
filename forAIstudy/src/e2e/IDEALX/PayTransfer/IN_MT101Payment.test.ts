import { browser } from "protractor";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, handlerCase, PROJECT_TYPE, SIT } from "../../../lib";
import { PaymentsPages } from "../../../pages/IDEALX";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');
let reference3 = "";

describe('IN MT101 Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MT101Payment.SIT.loginCompanyId : testData.MT101Payment.UAT.loginCompanyId, SIT ? testData.MT101Payment.SIT.loginUserId : testData.MT101Payment.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create & Reject IN MT101 payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.mt101PaymentMenu.click();
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await fillUpFields(
            testData.MT101Payment.fromAccount,
            testData.MT101Payment.paymentCurrency,
            testData.MT101Payment.amount,
            testData.MT101Payment.fxContractReference,
            testData.MT101Payment.existingPayee);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
            console.log(reference3);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.rejectButton.jsClick();
        await _PaymentsPages.AccountTransferPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.statusValue).textContains(testData.status.Rejected),
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