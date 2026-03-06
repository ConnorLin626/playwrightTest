/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
import * as moment from "moment";

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

//add for AB-8673:check beneficiary bank detail value
describe('SG_Giro Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.giroPayment.SIT.loginCompanyId : testData.giroPayment.UAT.loginCompanyId, SIT ? testData.giroPayment.SIT.loginUserId : testData.giroPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a SG Giro Payment with new DBS Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.giroPaymentPage.loadCondition();
        await _PaymentsPages.giroPaymentPage.fromAccount.select(SIT ? testData.giroPayment.SIT.fromAccount : testData.giroPayment.UAT.fromAccount);
        await _PaymentsPages.giroPaymentPage.amount.input(testData.giroPayment.amountA1);
        await _PaymentsPages.giroPaymentPage.newPayeeTab.click();
        await _PaymentsPages.giroPaymentPage.newPayeeName.input(testData.giroPayment.newPayeeName);
        await _PaymentsPages.giroPaymentPage.newPayeeBankID.select(testData.giroPayment.newPayeeBankID);
        await _PaymentsPages.giroPaymentPage.newPayeeAcctNumber.input(testData.giroPayment.newPayeeAcctNumber);
        await _PaymentsPages.giroPaymentPage.chooseDate.click();
        await _PaymentsPages.giroPaymentPage.giroType.click();
        await _PaymentsPages.giroPaymentPage.purposeCode.select(testData.giroPayment.purposeCode);
        await _PaymentsPages.giroPaymentPage.nextButton.click();
        await _PaymentsPages.giroPaymentPage.loadConditionOnPreviewPage();

        await _PaymentsPages.giroPaymentPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.giroPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.giroPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.giroPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.giroPaymentPage.submitButton.click();
        await _PaymentsPages.giroPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.giroPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.giroPaymentPage).isUXSuccess();
        await _PaymentsPages.giroPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.giroPaymentPage.fromAccountValue).textContains(SIT ? testData.giroPayment.SIT.fromAccount : testData.giroPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.giroPaymentPage.amountValue).textContains(testData.giroPayment.amountA1),
            await ensure(_PaymentsPages.giroPaymentPage.accountNumberValue).textContains(testData.giroPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.giroPaymentPage.payeeNameValue).textIs(testData.giroPayment.newPayeeName),
            await ensure(_PaymentsPages.giroPaymentPage.payeeBankNameValue).textIs(testData.giroPayment.payeeBankName),
            await ensure(_PaymentsPages.giroPaymentPage.payeeBankIDValue).textIs(testData.giroPayment.newPayeeBankID),
            await ensure(_PaymentsPages.giroPaymentPage.payeeBankCodeValue).textIs(testData.giroPayment.payeeBankCode),
            await ensure(_PaymentsPages.giroPaymentPage.payeeBankBranchCodeValue).textIs(testData.giroPayment.payeeBankBranchCode),
        ]);
    });
});