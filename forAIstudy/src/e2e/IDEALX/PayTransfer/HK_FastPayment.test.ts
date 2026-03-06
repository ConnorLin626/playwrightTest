/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');
let reference = ""

describe('HK Fast Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FPSPayment.SIT.loginCompanyId : testData.FPSPayment.UAT.loginCompanyId, SIT ? testData.FPSPayment.SIT.loginUserId : testData.FPSPayment.UAT.loginUserId, SIT ? testData.FPSPayment.SIT.pinId : testData.FPSPayment.UAT.pinId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create HKL FPS with New Proxy - Email', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newFPSPayeeTab.jsClick();
        await _PaymentsPages.FPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.FPSPaymentPage.proxyTypeEmail.jsClick();
        await _PaymentsPages.FPSPaymentPage.proxyTypeEmailInput.input(testData.FPSPayment.newFPSPayeeEmail);
        let isnewPayeeNicknameVisible = await _PaymentsPages.FPSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.FPSPaymentPage.newPayeeNickname.input(testData.FPSPayment.newPayeeNickname);
        };
        await _PaymentsPages.FPSPaymentPage.paymentDetail.input(testData.FPSPayment.paymentDetail);
        await _PaymentsPages.FPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.FPSPaymentPage.emailIdO.input(testData.FPSPayment.emailIdO);
        await _PaymentsPages.FPSPaymentPage.emailId1.input(testData.FPSPayment.emailId1);
        await _PaymentsPages.FPSPaymentPage.emailId2.input(testData.FPSPayment.emailId2);
        await _PaymentsPages.FPSPaymentPage.emailId3.input(testData.FPSPayment.emailId3);
        await _PaymentsPages.FPSPaymentPage.emailId4.input(testData.FPSPayment.emailId4);
        await _PaymentsPages.FPSPaymentPage.message.input(testData.FPSPayment.message);
        await _PaymentsPages.FPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.FPSPaymentPage.transactionNote.input(testData.FPSPayment.transactionNote);
        await _PaymentsPages.FPSPaymentPage.retriveButton.jsClick();
        await browser.sleep(2000);
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

        await checkViewPageAllField(false);//IDXP-812
    });

    it('Edit a HK Fast Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK - FPS", testData.status.PendingApproval);
        }
        await _PaymentsPages.FPSPaymentPage.editButton.click();
        await _PaymentsPages.FPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.amount.clean();
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.editAmount);
        await _PaymentsPages.FPSPaymentPage.retriveButton.jsClick();
        await browser.sleep(2000);
        await _PaymentsPages.FPSPaymentPage.newPayeeNickname.input(testData.FPSPayment.newPayeeNickname);
        await _PaymentsPages.FPSPaymentPage.nextButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);

        await checkViewPageAllField(true); //IDXP-812
    });

    it('Approve HKL FPS with New Proxy - Email', async function () {
        await approveHKFPSAndCheckStatus(reference);
    });

    it('Create HKL FPS with Existing Proxy - Mobile', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.FPSPayment.existingFPSMobNumPayee);
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
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.proxyTypeMobNumValue).isNotEmpty,
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('Approve HKL FPS with Existing Proxy - Mobile', async function () {
        await approveHKFPSAndCheckStatus(reference);
    });

    it('Create HKL FPS with Bank Account - CHATS Bank', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.FPSPayment.existingChatsAndFPSBanks);
        await _PaymentsPages.FPSPaymentPage.nextButton.click();
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
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.existingPayeeAccNumValue).textContains(testData.FPSPayment.existingChatsAndFPSBanks),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('Approve HKL FPS with Bank Account', async function () {
        await approveHKFPSAndCheckStatus(reference);
    });

    it('Create HKL FPS with Bank Account - FPS Bank', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newPayeeTab.jsClick();
        await _PaymentsPages.FPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.FPSPaymentPage.Country.select(testData.FPSPayment.Country);
        let newPayeeName = "FPSPayee" + generatedID();
        await _PaymentsPages.FPSPaymentPage.newPayeeName.input(newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.FPSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.FPSPaymentPage.newPayeeNickname.input(testData.FPSPayment.newPayeeNickname);
        };
        //await _PaymentsPages.FPSPaymentPage.otherBankRadio.click();
        await _PaymentsPages.FPSPaymentPage.payeeBankID.select(testData.FPSPayment.newPayeeBankID);
        // await _PaymentsPages.FPSPaymentPage.newPayeeBankIdButton.jsClick();
        // await _PaymentsPages.FPSPaymentPage.loadConditionForNewPayeeBankOnCreatePage();
        // await _PaymentsPages.FPSPaymentPage.newPayeeBankIdRadio.jsClick();
        await _PaymentsPages.FPSPaymentPage.newPayeeAcctNumber.input(generatedID());
        await _PaymentsPages.FPSPaymentPage.loadCondition();
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
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.newPayeeNameValue).textContains(testData.FPSPayment.newPayeeName),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        ]);
    });

    it('Can not create faster payment with iteam amount greater than 5000000 HKD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.greaterThanMaxAmount);
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.FPSPayment.existingChatsAndFPSBanks);
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.nextButton.click();
        await _PaymentsPages.FPSPaymentPage.hasUXIxErrorMsg1(testData.FPSPayment.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Can create faster payment with iteam amount enqual to 5000000 HKD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.maxAmount);
        await _PaymentsPages.FPSPaymentPage.existingPayee.select(testData.FPSPayment.existingChatsAndFPSBanks);
        await _PaymentsPages.FPSPaymentPage.nextButton.click();
        await _PaymentsPages.FPSPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.FPSPaymentPage.submitButton.click();
        await _PaymentsPages.FPSPaymentPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.maxAmount),
        ]);
    });
    
    // Add for R8.10
    it('Create HK FPS Payment with account number payee that Purpose Code select e-Lai See', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.FPSPaymentPage.loadCondition();
        await _PaymentsPages.FPSPaymentPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.FPSPaymentPage.amount.input(testData.FPSPayment.sendAmount);
        await _PaymentsPages.FPSPaymentPage.newPayeeTab.jsClick();
        await _PaymentsPages.FPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.FPSPaymentPage.Country.select(testData.FPSPayment.Country);
        let newPayeeName = "FPSPayee" + generatedID();
        await _PaymentsPages.FPSPaymentPage.newPayeeName.input(newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.FPSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.FPSPaymentPage.newPayeeNickname.input(testData.FPSPayment.newPayeeNickname);
        };
        await _PaymentsPages.FPSPaymentPage.payeeBankID.select(testData.FPSPayment.newPayeeBankID);
        await _PaymentsPages.FPSPaymentPage.newPayeeAcctNumber.input("5487654545");
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.FPSPayment.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.FPSPayment.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.FPSPayment.newPayeeAdd1);
        await _PaymentsPages.singlePaymentPage.purposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.FPSPayment.PurposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.FPSPayment.paymentDetail)
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.FPSPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.FPSPayment.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.FPSPayment.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.FPSPayment.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.FPSPayment.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.FPSPayment.message);
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
            await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(testData.FPSPayment.sendAmount),
            await ensure(_PaymentsPages.FPSPaymentPage.newPayeeNameValue).textContains(testData.FPSPayment.newPayeeName),
            await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
            await ensure(_PaymentsPages.FPSPaymentPage.PurposeCodeValue).textContains(testData.FPSPayment.PurposeCode),
            await ensure(_PaymentsPages.FPSPaymentPage.GreetingtothepayeeTitle).textContains(testData.FPSPayment.Greetingtothepayee),
            await ensure(_PaymentsPages.FPSPaymentPage.GreetingtothepayeeValue).textContains(testData.FPSPayment.message),
        ]);
    });
});

//UX Transfer Center -> filter by reference -> click reference -> approve -> go to Transfer Center again to check
export async function approveHKFPSAndCheckStatus(reference: string): Promise<void> {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
    await _PaymentsPages.FPSPaymentPage.approveButton.jsClick();
    let ispushOptionVisible = await _PaymentsPages.FPSPaymentPage.pushOption.isElementPresent();
    let isRespVisible = await _PaymentsPages.FPSPaymentPage.challengeResponse.isElementPresent();
    if (ispushOptionVisible === true && isRespVisible === false){
        await _PaymentsPages.FPSPaymentPage.pushOption.jsClick();
    };
    await _PaymentsPages.FPSPaymentPage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
    await _PaymentsPages.FPSPaymentPage.challengeResponse.input(testData.FPSPayment.responseCode);
    await _PaymentsPages.FPSPaymentPage.approveButton.click();
    await _PaymentsPages.FPSPaymentPage.dismissButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.FPSPaymentPage.loadConditionOnViewHKFPSPaymentPage();
    await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected, testData.status.BankRejected.PartialApproved);
}

export async function checkViewPageAllField(isEdit: boolean=false) {
    await Promise.all([
        await ensure(_PaymentsPages.FPSPaymentPage.headerRef).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.FPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.amountValue).textContains(isEdit ? testData.FPSPayment.editAmount : testData.FPSPayment.sendAmount),
        await ensure(_PaymentsPages.FPSPaymentPage.accountNumberValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.FPSPaymentPage.proxyTypeEmailValue).textContains(testData.FPSPayment.newFPSPayeeEmail),
        await ensure(_PaymentsPages.FPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.paymentTypeValue).textContains(testData.FPSPayment.paymentTypeValue),
        await ensure(_PaymentsPages.FPSPaymentPage.sendAmtValue).textContains(isEdit ? testData.FPSPayment.editAmount : testData.FPSPayment.sendAmount),
        await ensure(_PaymentsPages.FPSPaymentPage.paymentDetailValue).textContains(testData.FPSPayment.paymentDetail),
        await ensure(_PaymentsPages.FPSPaymentPage.GreetingtothepayeeValue).textContains(testData.FPSPayment.message),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(testData.FPSPayment.emailIdO),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(testData.FPSPayment.emailId1),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(testData.FPSPayment.emailId2),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(testData.FPSPayment.emailId3),
        await ensure(_PaymentsPages.FPSPaymentPage.emailList).textContains(testData.FPSPayment.emailId4),
        await ensure(_PaymentsPages.FPSPaymentPage.chargeAcctValue).isNotEmpty(),
        await ensure(_PaymentsPages.FPSPaymentPage.PurposeCodeValue).textContains(testData.FPSPayment.purposeCodeValue),
        await ensure(_PaymentsPages.FPSPaymentPage.messageToApproverValue).textContains(testData.FPSPayment.transactionNote),
    ]);
}
