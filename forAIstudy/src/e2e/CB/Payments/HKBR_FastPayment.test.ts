/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();

let testData = _PaymentsPages.fetchTestData('HKB_testData.json');
let reference: string = null;

describe('HK Branch Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.HKBRFPSPayment.SIT.loginCompanyId : testData.HKBRFPSPayment.UAT.loginCompanyId, SIT ? testData.HKBRFPSPayment.SIT.loginUserId : testData.HKBRFPSPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create HK Branch FPS with New Proxy - FasterID', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.HKBRFPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newFPSPayeeTab.jsClick();
        await _PaymentsPages.FPSPaymentPage.proxyTypeFasterID.jsClick();
        await _PaymentsPages.FPSPaymentPage.proxyTypeFasterIDInput.input(testData.HKBRFPSPayment.newFPSPayeeFasterID);
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.FPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.HKBRFPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.proxyTypeFasterIDValue).textContains(testData.HKBRFPSPayment.newFPSPayeeFasterID),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);

    });

    it('Approve HK Branch FPS with New Proxy - FasterID', async function () {

        await approveHKFPSAndCheckStatus(reference);

    });

    it('Create HK Branch FPS with Bank Account - CHATS Bank', async function () {

        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.HKBRFPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.HKBRFPSPayment.existingChatsAndFPSBanks);
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.FPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.HKBRFPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.newPayeeAccNumValue).textContains(testData.HKBRFPSPayment.existingChatsAndFPSBanks),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('Approve HK Branch FPS with Bank Account', async function () {
        await approveHKFPSAndCheckStatus(reference);
    });

    it('Create HK Branch FPS with Bank Account - FPS Bank', async function () {

        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.HKBRFPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newPayeeTab.click();
        let newPayeeName = "HKBRFPSPayee" + generatedID();
        await _PaymentsPages.FPSPaymentPage.newPayeeName.input(newPayeeName);
        //await _PaymentsPages.FPSPaymentPage.otherBankRadio.click();
        await _PaymentsPages.FPSPaymentPage.newPayeeBankID.select(testData.HKBRFPSPayment.newPayeeBankID);
        // await _PaymentsPages.FPSPaymentPage.newPayeeBankIdButton.jsClick();
        // await _PaymentsPages.FPSPaymentPage.loadConditionForNewPayeeBankOnCreatePage();
        // await _PaymentsPages.FPSPaymentPage.newPayeeBankIdRadio.jsClick();
        await _PaymentsPages.FPSPaymentPage.newPayeeAcctNumber.input(generatedID());
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.FPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.HKBRFPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.newPayeeNameValue).textContains(testData.HKBRFPSPayment.newPayeeName),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });
});

//UX Transfer Center -> filter by reference -> click reference -> approve -> go to Transfer Center again to check
export async function approveHKFPSAndCheckStatus(reference: string): Promise<void> {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
    await _PaymentsPages.FPSPaymentPage.approveButton.click();
    await _PaymentsPages.FPSPaymentPage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.FPSPaymentPage.challengeResponse.input(testData.HKBRFPSPayment.responseCode);
    await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
    await _PaymentsPages.FPSPaymentPage.approveButton.click();
    await _PaymentsPages.FPSPaymentPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
    await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
}