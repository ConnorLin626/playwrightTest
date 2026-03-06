
/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages, AccountPages } from "../../../pages/IDEALX";
import { SIT, handlerCase, ensure, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let _AccountPages = new AccountPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');
let reference = '';
let reference2 = '';

describe("HK fixed Call Deposit Placement MVP2", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FixedDeposit.HKAccount.SIT.loginCompanyId : testData.FixedDeposit.HKAccount.UAT.loginCompanyId, SIT ? testData.FixedDeposit.HKAccount.SIT.loginUserId : testData.FixedDeposit.HKAccount.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create Fixed Deposit Placement", async function () {
        await createFixedDepositPlacement().then(text => {
            reference = text;
            console.log(reference);
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(reference.trim());
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();

        await checkViewPageAllField(testData.FixedDeposit.HKAccount); // IDXP-812
    });

    it("Create with Approve now - PushAuth", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.fixedDepositPlacement.SIT.loginCompanyId : testData.fixedDepositPlacement.UAT.loginCompanyId, SIT ? testData.fixedDepositPlacement.SIT.loginUserId : testData.fixedDepositPlacement.UAT.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.fundingAccount.select(SIT ? testData.fixedDepositPlacement.SIT.fundingAccount : testData.fixedDepositPlacement.UAT.fundingAccount);
        await _PaymentsPages.FixedDepositPlacementPage.loadFixdDepositAccount();
        await _PaymentsPages.FixedDepositPlacementPage.fixdDepositAccount.select(SIT ? testData.fixedDepositPlacement.SIT.fixdDepositAccount : testData.fixedDepositPlacement.UAT.fixdDepositAccount);
        await _PaymentsPages.FixedDepositPlacementPage.amount.input(testData.fixedDepositPlacement.amount);
        await _PaymentsPages.FixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.FixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.tenorRadio.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.nextButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositPlacementPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.FixedDepositPlacementPage.acceptAndApproveNowButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2.trim());
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.Approved),
        ]);
    });

});

export async function createFixedDepositPlacement() {
    let ref = '';
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.click();
    await _PaymentsPages.FixedDepositMVP2Page.loadCondition();
    await _PaymentsPages.FixedDepositMVP2Page.fundingAccount.select(SIT ? testData.FixedDeposit.HKAccount.SIT.fundingAccount : testData.FixedDeposit.HKAccount.UAT.fundingAccount);
    await _PaymentsPages.FixedDepositMVP2Page.loadFixdDepositAccount();
    await _PaymentsPages.FixedDepositMVP2Page.fixdDepositAccount.select(SIT ? testData.FixedDeposit.HKAccount.SIT.fixdDepositAccount : testData.FixedDeposit.HKAccount.UAT.fixdDepositAccount);
    await _PaymentsPages.FixedDepositMVP2Page.amount.input(SIT ? testData.FixedDeposit.HKAccount.SIT.amount : testData.FixedDeposit.HKAccount.UAT.amount);
    await _PaymentsPages.FixedDepositMVP2Page.loadGetRatesButton();
    await _PaymentsPages.FixedDepositMVP2Page.getRatesButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.tenorRadio.jsClick();
    await _PaymentsPages.FixedDepositMVP2Page.nextButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForPrevewPage();
    await _PaymentsPages.FixedDepositMVP2Page.submitButton.click();
    await _PaymentsPages.FixedDepositMVP2Page.loadConditionForSubmittedPage();
    await _PaymentsPages.FixedDepositMVP2Page.getIdealxInfoReferenceID().then(text => {
        ref = text;
    });
    return ref;
}

export async function checkViewPageAllField(data: any) {
    await Promise.all([
        await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? data.SIT.fundingAccount : data.UAT.fundingAccount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains(SIT ? data.SIT.amount : data.UAT.amount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.cdTenor).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.interestRate).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.interestAmount).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.depositDate).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.Maturity).textContains(data.SIT.maturityValue),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.activityLog).isNotEmpty()
    ]);
}