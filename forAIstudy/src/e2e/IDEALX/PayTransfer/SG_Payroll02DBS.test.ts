/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let referenceEdit = "";


let _PaymentsPages = new PaymentsPages();

let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Payroll Alternate', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Payroll02DBS.SIT.loginCompanyId : testData.Payroll02DBS.UAT.loginCompanyId, SIT ? testData.Payroll02DBS.SIT.loginUserId : testData.Payroll02DBS.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Payroll Alternate with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02DBS.SIT.fromAccount : testData.Payroll02DBS.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.jsClick();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll02DBS.payeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll02DBS.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(testData.Payroll02DBS.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll02DBS.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02DBS.amountA1);
        await _PaymentsPages.PayrollPage.payeeRef.input(testData.Payroll02DBS.payeeRef);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.Payroll02DBS.paymentDetails);
        await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
        await _PaymentsPages.PayrollPage.emailIdO.input(testData.Payroll02DBS.emailIdO);
        await _PaymentsPages.PayrollPage.emailId1.input(testData.Payroll02DBS.emailId1);
        await _PaymentsPages.PayrollPage.emailId2.input(testData.Payroll02DBS.emailId2);
        await _PaymentsPages.PayrollPage.emailId3.input(testData.Payroll02DBS.emailId3);
        await _PaymentsPages.PayrollPage.emailId4.input(testData.Payroll02DBS.emailId4);
        await _PaymentsPages.PayrollPage.message.input(testData.Payroll02DBS.message);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField(false)
        
    });

    it('Edit Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Payroll DBS (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.editButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02DBS.editamount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        if(referenceEdit==reference){
            await checkViewPageAllField(true);//add for IDXP-812
        }else{
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.editamount),
            ]);
        }
    });
});

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll02DBS.SIT.fromAccount : testData.Payroll02DBS.UAT.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(testData.Payroll02DBS.paymentType),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(isEdit? testData.Payroll02DBS.editamount : testData.Payroll02DBS.amountA1),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentSummaryValue).textContains(isEdit ? testData.Payroll02DBS.editamount : testData.Payroll02DBS.amountA1),
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll02DBS.payeeName),
        await ensure(_PaymentsPages.PayrollPage.payeeNickNameValue).textContains(testData.Payroll02DBS.newPayeeNickname),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue).textContains(testData.Payroll02DBS.bankName),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(testData.Payroll02DBS.payeeBankID),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.Payroll02DBS.accountNumber),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(isEdit? testData.Payroll02DBS.editamount : testData.Payroll02DBS.amountA1),
        await ensure(_PaymentsPages.PayrollPage.purposeCodeValue).textContains(testData.Payroll02DBS.purposeCode),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(testData.Payroll02DBS.payeeRef),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue).textContains(testData.Payroll02DBS.paymentDetails),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll02DBS.emailIdO),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll02DBS.emailId1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll02DBS.emailId2),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll02DBS.emailId3),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll02DBS.emailId4),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(testData.Payroll02DBS.message),
        await ensure(_PaymentsPages.PayrollPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.activityLog).isNotEmpty(),
    ]);
    if(SIT){
        await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty()
    }
}