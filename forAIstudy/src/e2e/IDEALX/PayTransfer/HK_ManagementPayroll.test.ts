/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages,  } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference ="";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK_ Management Payroll', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ManagePayroll.SIT.loginCompanyId : testData.ManagePayroll.UAT.loginCompanyId, SIT ? testData.ManagePayroll.SIT.loginUserId : testData.ManagePayroll.UAT.loginUserId, SIT ? testData.ManagePayroll.SIT.pinId : testData.ManagePayroll.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it('Create Management Payroll with new change Account number payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.managePayroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll.SIT.fromAccount : testData.ManagePayroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.jsClick();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll.payeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.PayrollPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.ManagePayroll.newPayeeNickname);
        };
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.ManagePayroll.SIT.payeeBankID: testData.ManagePayroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll.amount);
        await _PaymentsPages.PayrollPage.payeeRef.input(testData.ManagePayroll.payeeRef);
        await _PaymentsPages.PayrollPage.payeeParticulars.input(testData.ManagePayroll.payeeParticulars);
        await _PaymentsPages.PayrollPage.showoptionaldetails.jsClick();
        await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.ManagePayroll.paymentDetails);
        await _PaymentsPages.PayrollPage.emailIdO.input(testData.ManagePayroll.emailIdO);
        await _PaymentsPages.PayrollPage.emailId1.input(testData.ManagePayroll.emailId1);
        await _PaymentsPages.PayrollPage.emailId2.input(testData.ManagePayroll.emailId2);
        await _PaymentsPages.PayrollPage.emailId3.input(testData.ManagePayroll.emailId3);
        await _PaymentsPages.PayrollPage.emailId4.input(testData.ManagePayroll.emailId4);
        await _PaymentsPages.PayrollPage.message.input(testData.ManagePayroll.message);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField(); //IDXP-812
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll.SIT.fromAccount : testData.ManagePayroll.UAT.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(testData.ManagePayroll.paymentType),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayroll.amountIX),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),

        // payee1
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.ManagePayroll.payeeName),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(SIT ? testData.ManagePayroll.SIT.payeeBankID : testData.ManagePayroll.UAT.payeeBankID),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.ManagePayroll.accountNumber),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(testData.ManagePayroll.amountIX),
        await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue).textContains("22"),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(testData.ManagePayroll.payeeRef),
        await ensure(_PaymentsPages.PayrollPage.particularsValue).textContains(testData.ManagePayroll.payeeParticulars),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue).textContains(testData.ManagePayroll.paymentDetails),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll.emailIdO),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll.emailId1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll.emailId2),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll.emailId3),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll.emailId4),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(testData.ManagePayroll.message),
    ]);
}