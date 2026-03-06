/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
let referenceEdit='';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN_IBPS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IBPSPayment.SIT.loginCompanyId : testData.IBPSPayment.UAT.loginCompanyId, SIT ? testData.IBPSPayment.SIT.loginUserId : testData.IBPSPayment.UAT.loginUserId,  testData.IBPSPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a IBPS Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.IBPSPaymentPage.loadCondition();
        await _PaymentsPages.IBPSPaymentPage.fromAccount.select(SIT?testData.IBPSPayment.fromAccount:testData.IBPSPayment.fromUatAccount);
        await _PaymentsPages.IBPSPaymentPage.amount.input(testData.IBPSPayment.amountA1);
        await _PaymentsPages.IBPSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.IBPSPaymentPage.Country.select(testData.IBPSPayment.Country);
        await _PaymentsPages.IBPSPaymentPage.newPayeeName.input(testData.IBPSPayment.newPayeeName);
        await _PaymentsPages.IBPSPaymentPage.newPayeeNickname.input(testData.IBPSPayment.newPayeeNickname);
        await _PaymentsPages.IBPSPaymentPage.newPayeeAdd1.input(testData.IBPSPayment.newPayeeAdd1);
        await _PaymentsPages.IBPSPaymentPage.newPayeeAdd2.input(testData.IBPSPayment.newPayeeAdd2);
        await _PaymentsPages.IBPSPaymentPage.newPayeeAdd3.input(testData.IBPSPayment.newPayeeAdd3);
        await _PaymentsPages.IBPSPaymentPage.payeeBankID.select(SIT ? testData.IBPSPayment.SIT.payeeBankID : testData.IBPSPayment.UAT.payeeBankID); await _PaymentsPages.IBPSPaymentPage.newPayeeAcctNumber.input(testData.IBPSPayment.newPayeeAcctNumber);
        await browser.sleep(5000);
        await _PaymentsPages.IBPSPaymentPage.newPayeeAcctNumber.input(testData.IBPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.IBPSPaymentPage.paymentDetail.input(testData.IBPSPayment.paymentDetail);
        await _PaymentsPages.IBPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.IBPSPaymentPage.transactionNote.input(testData.IBPSPayment.transactionNote);
        await _PaymentsPages.IBPSPaymentPage.nextButton.click();
        await _PaymentsPages.IBPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.IBPSPaymentPage.submitButton.click();
        await _PaymentsPages.IBPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IBPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IBPSPaymentPage.loadConditionForViewIBPSPaymentPage();
        await checkViewPageAllField(false); //Add for IDXP-812
    });


    it('Edit a IBPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - IBPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.IBPSPaymentPage.loadConditionForViewIBPSPaymentPage();
        await _PaymentsPages.IBPSPaymentPage.editButton.click();
        await _PaymentsPages.IBPSPaymentPage.loadCondition();
        await _PaymentsPages.IBPSPaymentPage.amount.clean();
        await _PaymentsPages.IBPSPaymentPage.amount.input(testData.IBPSPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.IBPSPaymentPage.nextButton.click();
        await _PaymentsPages.IBPSPaymentPage.submitButton.click();
        await _PaymentsPages.IBPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.IBPSPaymentPage.loadConditionForViewIBPSPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); //Add for IDXP-812
        } else {
            await Promise.all([
            await ensure(_PaymentsPages.IBPSPaymentPage.amountValue).textContains(testData.IBPSPayment.editAmount)
        ]);
        }
    });
});


export async function checkViewPageAllField(isEdit : boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.IBPSPaymentPage.fromAccountValue).textContains(SIT?testData.IBPSPayment.fromAccount:testData.IBPSPayment.fromUatAccount),
        await ensure(_PaymentsPages.IBPSPaymentPage.amountValue).textContains(isEdit ? testData.IBPSPayment.editAmount : testData.IBPSPayment.amountA1),
        await ensure(_PaymentsPages.IBPSPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.IBPSPaymentPage.cutoffTimeValue).isNotEmpty(),
        await ensure(_PaymentsPages.IBPSPaymentPage.headerRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.IBPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.IBPSPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.IBPSPaymentPage.deductAmtValue).textContains(isEdit ? testData.IBPSPayment.editAmount : testData.IBPSPayment.amountA1),
        await ensure(_PaymentsPages.IBPSPaymentPage.toPayeeValue).textContains(testData.IBPSPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.IBPSPaymentPage.toNewPayeeNameValue).textContains(testData.IBPSPayment.newPayeeName),
        await ensure(_PaymentsPages.IBPSPaymentPage.payeeAdd1).textContains(testData.IBPSPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.IBPSPaymentPage.payeeAdd2).textContains(testData.IBPSPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.IBPSPaymentPage.payeeAdd3).textContains(testData.IBPSPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.IBPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.IBPSPaymentPage.paymentTypeValue).textContains(testData.IBPSPayment.paymentType),
        await ensure(_PaymentsPages.IBPSPaymentPage.payeeBankNameValue).textContains(SIT?testData.IBPSPayment.payeeBankName:testData.IBPSPayment.uatPayeeBankName),
        await ensure(_PaymentsPages.IBPSPaymentPage.payeeBankCountry).textContains(testData.IBPSPayment.payeeBankCountry),
        await ensure(_PaymentsPages.IBPSPaymentPage.payeeBankSwiftBic).textIs(SIT?testData.IBPSPayment.PayeeBankID:testData.IBPSPayment.uatPayeeBankID),
        await ensure(_PaymentsPages.IBPSPaymentPage.payeeBankCode).textIs(SIT?testData.IBPSPayment.payeeBankCode:testData.IBPSPayment.uatPayeeBankCode),
        await ensure(_PaymentsPages.IBPSPaymentPage.paymentDetailValue).textContains(testData.IBPSPayment.paymentDetail),
        await ensure(_PaymentsPages.IBPSPaymentPage.totalDeductAmt).textContains(isEdit ? testData.IBPSPayment.editAmount : testData.IBPSPayment.amountA1),
        await ensure(_PaymentsPages.IBPSPaymentPage.custRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.IBPSPaymentPage.messageToApproverValue).textContains(testData.IBPSPayment.transactionNote),
        await ensure(_PaymentsPages.IBPSPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.IBPSPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}
