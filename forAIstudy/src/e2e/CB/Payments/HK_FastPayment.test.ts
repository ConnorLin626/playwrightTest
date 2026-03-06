/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();

let testData = _PaymentsPages.fetchTestData('HK_testData.json');
let reference: string = null;
let reference2: string = null;

describe('HK Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FPSPayment.SIT.loginCompanyId : testData.FPSPayment.UAT.loginCompanyId, SIT ? testData.FPSPayment.SIT.loginUserId : testData.FPSPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create HKL FPS with New Proxy - Email', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newFPSPayeeTab.jsClick();
        await _PaymentsPages.FPSPaymentPage.proxyTypeEmail.jsClick();
        await _PaymentsPages.FPSPaymentPage.proxyTypeEmailInput.input(testData.FPSPayment.newFPSPayeeEmail);
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.FPSPaymentPage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.FPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.proxyTypeEmailValue).textContains(testData.FPSPayment.newFPSPayeeEmail),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);

    });

    it('Approve HKL FPS with New Proxy - Email', async function () {

        await approveHKFPSAndCheckStatus(reference);

    });

    it('Create HKL FPS with Existing Proxy - Mobile', async function () {

        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.FPSPayment.existingFPSMobNumPayee);
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.FPSPaymentPage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.FPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.proxyTypeMobNumValue).isNotEmpty(),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('Approve HKL FPS with Existing Proxy - Mobile', async function () {
        await approveHKFPSAndCheckStatus(reference);
    });

    it('Create HKL FPS with Bank Account - CHATS Bank', async function () {

        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.FPSPayment.existingChatsAndFPSBanks);
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.FPSPaymentPage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.FPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.newPayeeAccNumValue).textContains(testData.FPSPayment.existingChatsAndFPSBanks),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('Approve HKL FPS with Bank Account', async function () {
        await approveHKFPSAndCheckStatus(reference);
    });

    it('Create HKL FPS with Bank Account - FPS Bank', async function () {

        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newPayeeTab.jsClick();
        let newPayeeName = "FPSPayee" + generatedID();
        await _PaymentsPages.FPSPaymentPage.newPayeeName.input(newPayeeName);
        //await _PaymentsPages.FPSPaymentPage.otherBankRadio.click();
        await _PaymentsPages.FPSPaymentPage.newPayeeBankID.select(testData.FPSPayment.newPayeeBankID);
        // await _PaymentsPages.FPSPaymentPage.newPayeeBankIdButton.jsClick();
        // await _PaymentsPages.FPSPaymentPage.loadConditionForNewPayeeBankOnCreatePage();
        // await _PaymentsPages.FPSPaymentPage.newPayeeBankIdRadio.jsClick();
        await _PaymentsPages.FPSPaymentPage.newPayeeAcctNumber.input(generatedID());
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.FPSPaymentPage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.FPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.newPayeeNameValue).textContains(testData.FPSPayment.newPayeeName),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('Can not create faster payment with iteam amount greater than 5000000 HKD', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.greaterThanMaxAmount);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.FPSPayment.existingChatsAndFPSBanks);
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.hasUXErrorMsg(testData.FPSPayment.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Can create faster payment with iteam amount enqual to 5000000 HKD', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.maxAmount);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.FPSPayment.existingChatsAndFPSBanks);
        await _PaymentsPages.FPSPaymentPage.nextButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.FPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.maxAmount),
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
    await _PaymentsPages.FPSPaymentPage.challengeResponse.input(testData.FPSPayment.responseCode);
    await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
    await _PaymentsPages.FPSPaymentPage.approveButton.jsClick();
    await _PaymentsPages.FPSPaymentPage.dismissButton.click();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
    await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected, testData.status.BankRejected.PartialApproved);
}
