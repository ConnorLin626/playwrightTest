/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages, AccountPages } from "../../../pages/IDEALX";
import { SIT, handlerCase, ensure, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let _AccountPages = new AccountPages();
let testData = _PaymentsPages.fetchTestData("CN_testData.json");
let reference = '';
let reference1 = '';
let reference2 = '';
let referenceEdit ='';

describe('CN Call Deposit', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CallDeposit.SIT.loginCompanyId : testData.CallDeposit.UAT.loginCompanyId, SIT ? testData.CallDeposit.SIT.loginUserId : testData.CallDeposit.UAT.loginUserId, testData.CallDeposit.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Call Deposit', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.isElementPresent().then(text => {
            if(text==false)
            {
            _PaymentsPages.CrossBoarderACHPage.page.click();
            _PaymentsPages.TransferCentersPage.loadCondition();
            }
        });
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.fundingAccount.select(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount);
        await _PaymentsPages.FixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.amount.input(testData.CallDeposit.amount);
        await _PaymentsPages.FixedDepositPlacementPage.rate.jsClick();
        // await _PaymentsPages.FixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.FixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.MaturityInstruction.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.nextButton.click();
        // await _PaymentsPages.FixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositPlacementPage.submitButton.click();
        // await _PaymentsPages.FixedDepositPlacementPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FixedDepositPlacementPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await checkViewPageAllField(false); // Add for IDXP-812
    });

    it('Edit Call Deposit', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.FixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.FixedDepositPlacementPage.editButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.amount.input(testData.CallDeposit.amountEdit);
        await _PaymentsPages.FixedDepositPlacementPage.rate.jsClick();
        // await _PaymentsPages.FixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.FixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.day7_button.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.nextButton.click();
        // await _PaymentsPages.FixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositPlacementPage.submitButton.click();
        // await _PaymentsPages.FixedDepositPlacementPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FixedDepositPlacementPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).isNotEmpty(),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amountEdit),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.cdTenor).isNotEmpty(),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.interestRate).isNotEmpty(),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.depositDate).isNotEmpty(),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.Maturity).isNotEmpty(),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
            ]);
        }
    });

    it('Reject Call Deposit', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.FixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.FixedDepositPlacementPage.rejectButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.reasonForRejection.input(testData.CallDeposit.rejectReason);
        await _PaymentsPages.FixedDepositPlacementPage.rejectDialogButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.FixedDepositPlacementPage.dismissButton.click();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete Call Deposit', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.fixedDepositTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.FixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.FixedDepositPlacementPage.deleteButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.deleteDialogButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.FixedDepositPlacementPage.dismissButton.click();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.transferCenterfilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it("Create Call Deposit with Approve now", async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.isElementPresent().then(text => {
            if(text==false)
            {
            _PaymentsPages.CrossBoarderACHPage.page.click();
            _PaymentsPages.TransferCentersPage.loadCondition();
            }
        });
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.fundingAccount.select(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount);
        await _PaymentsPages.FixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.amount.input(testData.CallDeposit.amount);
        await _PaymentsPages.FixedDepositPlacementPage.rate.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.FixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.MaturityInstruction.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.nextButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositPlacementPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.FixedDepositPlacementPage.pushOption.jsClickIfExist();
        await _PaymentsPages.FixedDepositPlacementPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.FixedDepositPlacementPage.challengeResponse.input(testData.CallDeposit.challengeResponse);
        await _PaymentsPages.FixedDepositPlacementPage.submitButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.getIdealxInfoReferenceID().then(text => {
            reference1 = text;
        });

        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amount),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.cdTenor).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.Maturity).textContains(testData.CallDeposit.maturityValue),
        ]);
    });

    it("Copy Call Deposit", async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.fixedDepositTab.click();
        if (0 !== reference1.trim().length) {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference1);
        } else {
            await _PaymentsPages.FixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.FixedDepositPlacementPage.copyButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.amount.clean();
        await _PaymentsPages.FixedDepositPlacementPage.amount.input(testData.CallDeposit.amountEdit);
        await _PaymentsPages.FixedDepositPlacementPage.rate.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.FixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.MaturityInstruction.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.nextButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositPlacementPage.submitButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FixedDepositPlacementPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amountEdit),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.cdTenor).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.Maturity).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Approve Call Deposit', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.fixedDepositTab.click();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.FixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.FixedDepositPlacementPage.approveButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.FixedDepositPlacementPage.challengeResponse.input(testData.CallDeposit.challengeResponse);
        await browser.sleep(3000);
        await _PaymentsPages.FixedDepositPlacementPage.approveButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.FixedDepositPlacementPage.dismissButton.click();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received)
        ]);
    });

    it('Create Call Deposit save as draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.isElementPresent().then(text => {
            if(text==false)
            {
            _PaymentsPages.CrossBoarderACHPage.page.click();
            _PaymentsPages.TransferCentersPage.loadCondition();
            }
        });
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.fundingAccount.select(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount);
        await _PaymentsPages.FixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.amount.input(testData.CallDeposit.amount);
        await _PaymentsPages.FixedDepositPlacementPage.rate.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.FixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.day7_button.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.MaturityInstruction.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.saveAsDraft.click();
        await _PaymentsPages.FixedDepositPlacementPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.FixedDepositPlacementPage.dismissButton.click();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amount),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.cdTenor).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.Maturity).isNotEmpty(),
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.Saved)
        ]);
    });
});

export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
        await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains(isEdit ? testData.CallDeposit.amountEdit : testData.CallDeposit.amount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.cdTenor).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.interestRate).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.interestAmount).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.depositDate).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.Maturity).textContains(testData.CallDeposit.maturityValue),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.depositTypeValue).textContains(testData.CallDeposit.depositType),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.creditAcctValue).textContains(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.activityLog).isNotEmpty()
    ]);
}