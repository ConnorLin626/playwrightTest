/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser } from 'protractor';
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, handlerCase, SIT, PROJECT_TYPE } from "../../../lib";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TWOBU_testData.json');
let reference = "";

//DASB-16490
describe('TWOBU FISC Bulk Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FICSBulkPmt.SIT.loginCompanyId : testData.FICSBulkPmt.UAT.loginCompanyId, SIT ? testData.FICSBulkPmt.SIT.loginUserId : testData.FICSBulkPmt.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create bulk payment via select Debit type =  Consolidated Debit', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.FICSBulkPmt.SIT.fromAccount : testData.TWOBUFICSBulkPmt.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.debitTypeSelect.click();
        await _PaymentsPages.BulkPaymentPage.ConsolidatedDebit.click();
        await addNewPayee();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await checkViewPageAllField(); // IDXP-812
    });
});

export async function addNewPayee() {
    await _PaymentsPages.BulkPaymentPage.newPayee.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.FICSBulkPmt.payeeName);
    await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.FICSBulkPmt.newPayeeNickname);
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.FICSBulkPmt.SIT.payeeBankID : testData.FICSBulkPmt.UAT.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.FICSBulkPmt.accountNumber);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(testData.FICSBulkPmt.amountA1);
    await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.FICSBulkPmt.payeeRef);
    await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.FICSBulkPmt.paymentDetails);
    await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.FICSBulkPmt.emailIdO);
    await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.FICSBulkPmt.emailId1);
    await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.FICSBulkPmt.emailId2);
    await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.FICSBulkPmt.emailId3);
    await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.FICSBulkPmt.emailId4);
    await _PaymentsPages.BulkPaymentPage.message.input(testData.FICSBulkPmt.message);
}

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.FICSBulkPmt.SIT.fromAccount : testData.TWOBUFICSBulkPmt.UAT.fromAccount),
        // await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.FICSBulkPmt.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(testData.FICSBulkPmt.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.DebitTypeValue).textContains(testData.FICSBulkPmt.DebitType),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(testData.FICSBulkPmt.bankChargeView),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(SIT ? testData.FICSBulkPmt.SIT.fromAccount : testData.TWOBUFICSBulkPmt.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.FICSBulkPmt.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(SIT ? testData.FICSBulkPmt.SIT.payeeBankID : testData.FICSBulkPmt.UAT.payeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.FICSBulkPmt.accountNumber),
         await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.FICSBulkPmt.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(testData.FICSBulkPmt.TransactionCode),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(testData.FICSBulkPmt.payeeRef),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(testData.FICSBulkPmt.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.FICSBulkPmt.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FICSBulkPmt.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FICSBulkPmt.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FICSBulkPmt.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FICSBulkPmt.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.FICSBulkPmt.emailId4),
    ]);
}