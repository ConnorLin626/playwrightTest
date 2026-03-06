
/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages, AccountPages } from "../../../pages/IDEALX";
import { SIT, handlerCase, ensure, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let _AccountPages = new AccountPages();
let testData = _PaymentsPages.fetchTestData('HKB_testData.json');

describe("HKBR fixed Call Deposit Placement MVP2", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FixedDeposit.HKBRAccount.SIT.loginCompanyId : testData.FixedDeposit.HKBRAccount.UAT.loginCompanyId, SIT ? testData.FixedDeposit.HKBRAccount.SIT.loginUserId : testData.FixedDeposit.HKBRAccount.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Copy Fixed Deposit Placement", async function () {
        let ref1 = '';
        let ref2 = '';
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.FixedDepositPlacementPage.pagePoint.click();
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.click();
        await _PaymentsPages.FixedDepositMVP2Page.loadCondition();
        await _PaymentsPages.FixedDepositMVP2Page.fundingAccount.select(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fundingAccount : testData.FixedDeposit.HKBRAccount.UAT.fundingAccount);
        await _PaymentsPages.FixedDepositMVP2Page.loadFixdDepositAccount();
        await _PaymentsPages.FixedDepositMVP2Page.fixdDepositAccount.select(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fixdDepositAccount : testData.FixedDeposit.HKBRAccount.UAT.fixdDepositAccount);
        await _PaymentsPages.FixedDepositMVP2Page.amount.input(SIT ? testData.FixedDeposit.HKBRAccount.SIT.amount : testData.FixedDeposit.HKBRAccount.UAT.amount);
        await _PaymentsPages.FixedDepositMVP2Page.loadGetRatesButton();
        await _PaymentsPages.FixedDepositMVP2Page.getRatesButton.click();
        await _PaymentsPages.FixedDepositMVP2Page.tenorRadio.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.nextButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositMVP2Page.submitButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForSubmittedPage();
        await _PaymentsPages.FixedDepositMVP2Page.getIdealxInfoReferenceID().then(text => {
            ref1 = text;
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(ref1.trim());
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();
        await _PaymentsPages.FixedDepositMVP2Page.copyButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.loadCondition();
        await _PaymentsPages.FixedDepositMVP2Page.amount.clean();
        await _PaymentsPages.FixedDepositMVP2Page.amount.input(SIT ? testData.FixedDeposit.HKBRAccount.SIT.amount : testData.FixedDeposit.HKBRAccount.UAT.amount);
        await _PaymentsPages.FixedDepositMVP2Page.getRatesButton.click();
        await _PaymentsPages.FixedDepositMVP2Page.tenorRadio.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.nextButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositMVP2Page.submitButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForSubmittedPage();
        await _PaymentsPages.FixedDepositMVP2Page.getIdealxInfoReferenceID().then(text => {
            ref2 = text;
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(ref1.trim());
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositMVP2Page.fundingAccountValue).textContains(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fundingAccount : testData.FixedDeposit.HKBRAccount.UAT.fundingAccount),
            await ensure(_PaymentsPages.FixedDepositMVP2Page.fixedDepositAccountValue).textContains(SIT ? testData.FixedDeposit.HKBRAccount.SIT.fixdDepositAccount : testData.FixedDeposit.HKBRAccount.UAT.fixdDepositAccount),
            await ensure(_PaymentsPages.FixedDepositMVP2Page.depositAmountValue).textContains(SIT ? testData.FixedDeposit.HKBRAccount.SIT.amount : testData.FixedDeposit.HKBRAccount.UAT.amount),
            //await ensure(_PaymentsPages.FixedDepositMVP2Page.tenor).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositMVP2Page.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositMVP2Page.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositMVP2Page.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });
});
