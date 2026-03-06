/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();

let testData = _PaymentsPages.fetchTestData('HKB_testData.json');
let reference: string = null;

describe('HK Branch Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.HKBRFPSPayment.SIT.loginCompanyId : testData.HKBRFPSPayment.UAT.loginCompanyId, SIT ? testData.HKBRFPSPayment.SIT.loginUserId : testData.HKBRFPSPayment.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create HK Branch FPS with New Proxy - FasterID', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.HKBRFPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newFPSPayeeTab.jsClick();
        await _PaymentsPages.FPSPaymentPage.proxyTypeFasterID.jsClick();
        await _PaymentsPages.FPSPaymentPage.proxyTypeFasterIDInput.input(testData.HKBRFPSPayment.newFPSPayeeFasterID);
        await _PaymentsPages.FPSPaymentPage.newPayeeNickname.input(testData.HKBRFPSPayment.newPayeeNickname);
        await _PaymentsPages.FPSPaymentPage.retriveButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.scrollToBottom();
        //await _PaymentsPages.FPSPaymentPage.paymentDetail.input("paymentDetail");
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
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
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.HKBRFPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.HKBRFPSPayment.existingChatsAndFPSBanks);
        await _PaymentsPages.FPSPaymentPage.scrollToBottom();
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.HKBRFPSPayment.sendAmount),
            // await ensure(_PaymentsPages.FPSPaymentPage.newPayeeAccNumValue).textContains(testData.HKBRFPSPayment.existingChatsAndFPSBanks), // do R8.16
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('Approve HK Branch FPS with Bank Account', async function () {

        await approveHKFPSAndCheckStatus(reference);
    });

    it('Create HK Branch FPS with Bank Account - FPS Bank', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.HKBRFPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.FPSPaymentPage.Country.select(testData.HKBRFPSPayment.Country);
        let newPayeeName = "HKBRFPSPayee" + generatedID();
        await _PaymentsPages.FPSPaymentPage.newPayeeName.input(newPayeeName);
        await _PaymentsPages.FPSPaymentPage.newPayeeNickname.input(testData.HKBRFPSPayment.newPayeeNickname);
        //await _PaymentsPages.FPSPaymentPage.otherBankRadio.click();
        await _PaymentsPages.FPSPaymentPage.payeeBankID.select(testData.HKBRFPSPayment.newPayeeBankID);
        // await _PaymentsPages.FPSPaymentPage.newPayeeBankIdButton.jsClick();
        // await _PaymentsPages.FPSPaymentPage.loadConditionForNewPayeeBankOnCreatePage();
        // await _PaymentsPages.FPSPaymentPage.newPayeeBankIdRadio.jsClick();
        await _PaymentsPages.FPSPaymentPage.newPayeeAcctNumber.input(generatedID());
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.nextButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.HKBRFPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.newPayeeNameValue).textContains(testData.HKBRFPSPayment.newPayeeName),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    // Add for R8.10
    it('Create HKBR FPS Payment with account number payee that Purpose Code select e-Gift', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.HKBRFPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newPayeeTab.jsClick();
        await _PaymentsPages.FPSPaymentPage.Country.select(testData.HKBRFPSPayment.Country);
        await _PaymentsPages.FPSPaymentPage.payeeBankID.select(testData.HKBRFPSPayment.newPayeeBankID);
        await _PaymentsPages.FPSPaymentPage.newPayeeAcctNumber.input(generatedID());
        let newPayeeName = "FPSPayee" + generatedID();
        await _PaymentsPages.FPSPaymentPage.newPayeeName.input(newPayeeName);
        await _PaymentsPages.FPSPaymentPage.newPayeeNickname.input(testData.HKBRFPSPayment.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.HKBRFPSPayment.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.HKBRFPSPayment.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.HKBRFPSPayment.newPayeeAdd1);
        await _PaymentsPages.singlePaymentPage.purposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.HKBRFPSPayment.PurposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.HKBRFPSPayment.paymentDetail)
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.HKBRFPSPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.HKBRFPSPayment.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.HKBRFPSPayment.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.HKBRFPSPayment.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.HKBRFPSPayment.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.HKBRFPSPayment.message);
        await _PaymentsPages.FPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.FPSPaymentPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.HKBRFPSPayment.SIT.fromAccount : testData.HKBRFPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.HKBRFPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.newPayeeNameValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.FPSPaymentPage.PurposeCodeValue).textContains(testData.HKBRFPSPayment.PurposeCode),
            await ensure(_PaymentsPages.FPSPaymentPage.GreetingtothepayeeTitle).textContains(testData.HKBRFPSPayment.Greetingtothepayee),
            await ensure(_PaymentsPages.FPSPaymentPage.GreetingtothepayeeValue).textContains(testData.HKBRFPSPayment.message),
        ]);
    });
});

//UX Transfer Center -> filter by reference -> click reference -> approve -> go to Transfer Center again to check
export async function approveHKFPSAndCheckStatus(reference: string): Promise<void> {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
    await _PaymentsPages.FPSPaymentPage.approveButton.jsClick();
    await _PaymentsPages.FPSPaymentPage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.FPSPaymentPage.challengeResponse.input(testData.HKBRFPSPayment.responseCode);
    await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
    await _PaymentsPages.FPSPaymentPage.approveButton.click();
    await _PaymentsPages.FPSPaymentPage.dismissButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
    await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
}