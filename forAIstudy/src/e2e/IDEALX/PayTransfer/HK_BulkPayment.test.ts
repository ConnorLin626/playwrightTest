/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { FilesPages, NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

const lib_1 = require("../../../lib");
let reference = "";
let fileName = "";
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK_BulkPayment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId, SIT ? testData.BulkPayment.SIT.pinId : testData.BulkPayment.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it('Create Bulk Payment with new change Account number payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.DebitType.click();
        await _PaymentsPages.BulkPaymentPage.ItemDebitType.jsClick();
        await addNewAcctNumPayee(testData.BulkPayment.payee1);
        await addNewAcctNumPayee(testData.BulkPayment.payee2);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField();
    });

    it('Create Bulk Payment with FPS payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.DebitType.click();
        await _PaymentsPages.BulkPaymentPage.ConsolidatedDebit.jsClick();
        await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.NewFPSPayee.jsClick();
        await _PaymentsPages.BulkPaymentPage.MobileValue.input(SIT ? testData.BulkPayment.SIT.MobileValue:testData.BulkPayment.UAT.MobileValue);
        let isnewPayeeNicknameVisible = await _PaymentsPages.BulkPaymentPage.newPaynowNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.BulkPaymentPage.newPaynowNickname.input(testData.BulkPayment.newPayeeNickname);
        };
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amount);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amount),
            await ensure(_PaymentsPages.BulkPaymentPage.ViewHMobile).textContains(SIT ? testData.BulkPayment.SIT.MobileValue:testData.BulkPayment.UAT.MobileValue),
            // R8.11 When Debit Type = Consolidated Debit, Transaction code will be 28
            await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains("28"),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('File Services upload HK Bulk Payment with FPS payee', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.BulkPayment.SIT.fileName1 : testData.BulkPayment.UAT.fileName1, testData.BulkPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amount),
            await ensure(_PaymentsPages.BulkPaymentPage.ViewHKFPSID).textContains(testData.BulkPayment.HKFPSIDValue),
            // R8.11 When Debit Type = Consolidated Debit, Transaction code will be 28
            await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains("28"),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('File Services upload HK Bulk Payment with Account Number payee', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.BulkPayment.SIT.fileName2 : testData.BulkPayment.UAT.fileName2, testData.BulkPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amount),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.BulkPayment.accountNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });
});

export async function addNewAcctNumPayee(payee: any) {
    await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
    await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(payee.payeeName);
    let isnewPayeeNicknameVisible = await _PaymentsPages.BulkPaymentPage.newPayeeNickname.isElementPresent();
    if (isnewPayeeNicknameVisible === true ){
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
    };
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.BulkPayment.SIT.payeeBankID : testData.BulkPayment.UAT.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.findBankID.jsClick();
    await _PaymentsPages.BulkPaymentPage.payeeBankResultList.jsClick();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(payee.accountNumber);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(payee.amount);
    await _PaymentsPages.BulkPaymentPage.payeeRef.input(payee.payeeRef);
    await _PaymentsPages.BulkPaymentPage.payeeParticulars.input(payee.payeeParticulars);
    await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.BulkPaymentPage.paymentDetails.input(payee.paymentDetails);
    await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentPage.emailIdO.input(payee.emailIdO);
    await _PaymentsPages.BulkPaymentPage.emailId1.input(payee.emailId1);
    await _PaymentsPages.BulkPaymentPage.emailId2.input(payee.emailId2);
    await _PaymentsPages.BulkPaymentPage.emailId3.input(payee.emailId3);
    await _PaymentsPages.BulkPaymentPage.emailId4.input(payee.emailId4);
    await _PaymentsPages.BulkPaymentPage.message.input(payee.message);
}

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.BulkPayment.paymentTypeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(testData.BulkPayment.totalAmount),
        await ensure(_PaymentsPages.BulkPaymentPage.DebitTypeValue).textContains(testData.BulkPayment.itemDebitTypeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        // payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.BulkPayment.payee2.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(testData.BulkPayment.newPayeeNickname),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(SIT ? testData.BulkPayment.SIT.payeeBankID : testData.BulkPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.BulkPayment.payee2.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.payee2.amount),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains("20"),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(testData.BulkPayment.payee2.payeeRef),
        await ensure(_PaymentsPages.BulkPaymentPage.ParticularsValue).textContains(testData.BulkPayment.payee2.payeeParticulars),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(testData.BulkPayment.payee2.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.payee2.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.payee2.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.payee2.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.payee2.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.payee2.emailId4),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.BulkPayment.payee2.message),

        // payee 2
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(testData.BulkPayment.payee1.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue2).textContains(testData.BulkPayment.newPayeeNickname),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textContains(SIT ? testData.BulkPayment.SIT.payeeBankID : testData.BulkPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(testData.BulkPayment.payee1.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(testData.BulkPayment.payee1.amount),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue2).textContains("20"),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(testData.BulkPayment.payee1.payeeRef),
        await ensure(_PaymentsPages.BulkPaymentPage.ParticularsValue2).textContains(testData.BulkPayment.payee1.payeeParticulars),
        await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(testData.BulkPayment.payee1.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.payee1.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.payee1.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.payee1.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.payee1.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.payee1.emailId4),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(testData.BulkPayment.payee1.message),
    ]);
}
