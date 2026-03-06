/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../../pages/IDEALX";
import {ensure, SIT, handlerCase, generatedID,PROJECT_TYPE} from "../../../../lib";
import { browser } from "protractor";

let newPayeeName="";
let actReference ="";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TWOBU_testData.json');

//Add for R8.19 IDXP-1220
describe('TWOBU_AccountTransfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this,PROJECT_TYPE.IDEALX); });
    it('Create TT with new payee', async function () {
        await createACT();
        await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(actReference);
        await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
        await _PaymentsPages.singlePaymentPage.otherDetail.click();
        await Promise.all([
            await ensure(_PaymentsPages.singlePaymentPage.viewAmountValue).textContains(testData.AccountTransfer.sendAmount),
            await ensure(_PaymentsPages.singlePaymentPage.statusValue).textContainsLessOne(testData.status.PendingVerification,testData.status.PendingApproval),
            await ensure(_PaymentsPages.singlePaymentPage.fromAccountValue).textContains(SIT? testData.AccountTransfer.SIT.fromAccount:testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.singlePaymentPage.beneValue).textContains(newPayeeName),
            await ensure(_PaymentsPages.singlePaymentPage.acctNumberView).textContains(testData.AccountTransfer.accountNumber),
            await ensure(_PaymentsPages.singlePaymentPage.purposeCodeACTValue).textContains(testData.AccountTransfer.purposeCode)
        ]);
    });
})

export async function createACT() {
    await _PaymentsPages.singlePaymentPage.PayTransferMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.makePayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.fromAccount.click();
    await _PaymentsPages.singlePaymentPage.fromAcctInput.input(SIT? testData.AccountTransfer.SIT.fromAccount:testData.AccountTransfer.UAT.fromAccount);
    await _PaymentsPages.singlePaymentPage.fromAcctSelected.click();
    await _PaymentsPages.singlePaymentPage.paymentCcy.select(testData.AccountTransfer.audCcy);
    await _PaymentsPages.singlePaymentPage.existingPayee.click();
    await _PaymentsPages.singlePaymentPage.addNewPayee.click();
    await _PaymentsPages.singlePaymentPage.payeeLocationInput.input(testData.AccountTransfer.payeeLocation);
    await _PaymentsPages.singlePaymentPage.payeeLocationSelected.jsClick();
    await _PaymentsPages.singlePaymentPage.DBSBank.jsClick();
    await _PaymentsPages.singlePaymentPage.accountNumber.input(testData.AccountTransfer.accountNumber);
    newPayeeName="ACTPayee"+generatedID();
    await _PaymentsPages.singlePaymentPage.payeeName.input(newPayeeName);
    await _PaymentsPages.singlePaymentPage.payeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
    await _PaymentsPages.singlePaymentPage.payeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
    await _PaymentsPages.singlePaymentPage.payeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
    await _PaymentsPages.singlePaymentPage.newPayeeReviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPayeePage();
    await _PaymentsPages.singlePaymentPage.usePayee.click();
    await _PaymentsPages.singlePaymentPage.amount.input(testData.AccountTransfer.sendAmount);
    await _PaymentsPages.singlePaymentPage.purposeCode.select(testData.AccountTransfer.purposeCode);
    await _PaymentsPages.singlePaymentPage.isDetailsToPayee.jsClick();
    await _PaymentsPages.singlePaymentPage.paymentDetail.input(testData.AccountTransfer.paymentDetails);
    await _PaymentsPages.singlePaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.singlePaymentPage.adviceContent.input(testData.AccountTransfer.adviceContent);
    await _PaymentsPages.singlePaymentPage.val.input(testData.AccountTransfer.val);
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    await _PaymentsPages.singlePaymentPage.submitBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        actReference = text.trim();
    });
}
