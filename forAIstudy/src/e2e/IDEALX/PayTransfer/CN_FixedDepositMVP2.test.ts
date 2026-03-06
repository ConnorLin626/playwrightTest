
/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages, AccountPages, ApprovalsPages } from "../../../pages/IDEALX";
import { SIT, handlerCase, ensure, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let _AccountPages = new AccountPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');
let reference = '';

describe("CN fixed Call Deposit Placement MVP2", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FixedDeposit.CNAccount.SIT.loginCompanyId : testData.FixedDeposit.CNAccount.UAT.loginCompanyId, SIT ? testData.FixedDeposit.CNAccount.SIT.loginUserId : testData.FixedDeposit.CNAccount.UAT.loginUserId, testData.ACT.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Approve Fixed Deposit Placement", async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.isElementPresent().then(text => {
            if(text==false)
            {
            _PaymentsPages.TransferCentersPage.loadCondition();
            _PaymentsPages.CrossBoarderACHPage.page.click();
            }
        });
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.click();
        await _PaymentsPages.FixedDepositMVP2Page.loadCondition();
        await _PaymentsPages.FixedDepositMVP2Page.fundingAccount.select(SIT ? testData.FixedDeposit.CNAccount.SIT.fundingAccount : testData.FixedDeposit.CNAccount.UAT.fundingAccount);
        //await _PaymentsPages.FixedDepositMVP2Page.fixdDepositAccount.select(SIT ? testData.FixedDeposit.HKBRAccountSIT.fixdDepositAccount : testData.FixedDeposit.HKBRAccount.UAT.fixdDepositAccount);
        await _PaymentsPages.FixedDepositMVP2Page.amount.input(SIT ? testData.FixedDeposit.CNAccount.SIT.amount : testData.FixedDeposit.CNAccount.UAT.amount);
        await _PaymentsPages.FixedDepositMVP2Page.getRatesButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.tenorRadio.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.nextButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositMVP2Page.submitButton.click();
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForSubmittedPage();
        await _PaymentsPages.FixedDepositMVP2Page.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        // Add for IDXP-812 check view page all field
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(reference.trim());
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();
        await checkViewPageAllField(testData.FixedDeposit.CNAccount);

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositApproveMenu.click();
        await _PaymentsPages.FixedDepositMVP2Page.loadFdApprovalCondition();
        await _PaymentsPages.FixedDepositMVP2Page.transferCenterfilter.input(reference.trim());
        await _PaymentsPages.FixedDepositMVP2Page.selectedAllButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.fdApproveButton.jsClick();
        await _PaymentsPages.FixedDepositMVP2Page.getChallengeSMS.jsClick();
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.FixedDepositMVP2Page.challengeResponse.input(SIT ? testData.FixedDeposit.CNAccount.SIT.challengeResponse : testData.FixedDeposit.CNAccount.UAT.challengeResponse);
        await _PaymentsPages.FixedDepositMVP2Page.approveButton.click();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositMVP2Page.goToViewPaymentPageViaRef(reference.trim());
        await _PaymentsPages.FixedDepositMVP2Page.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositMVP2Page.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received)
        ]);
    });
});


export async function checkViewPageAllField(data: any) {
    await Promise.all([
        await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? data.SIT.fundingAccount : data.UAT.fundingAccount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains( SIT ? data.SIT.amount : data.UAT.amount),
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