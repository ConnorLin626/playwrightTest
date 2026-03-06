/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { SIT, handlerCase, ensure, devWatch, } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData("CN_testData.json");
let reference = '';
let reference1 = '';
let reference2 = '';

describe('CN Call Deposit', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.CallDeposit.SIT.loginCompanyId : testData.CallDeposit.UAT.loginCompanyId, SIT ? testData.CallDeposit.SIT.loginUserId : testData.CallDeposit.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Call Deposit', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositPlacement);
        await _PaymentsPages.fixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.fixedDepositPlacementPage.fundingAccount.select(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount);
        await _PaymentsPages.fixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.amount.input(testData.CallDeposit.amount);
        await _PaymentsPages.fixedDepositPlacementPage.rate.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.fixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.MaturityInstruction.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.nextButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.fixedDepositPlacementPage.submitButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForSubmittedPage();
        await _PaymentsPages.fixedDepositPlacementPage.getInfoReferenceID().then(text => {
            reference = text;
            console.log(reference)
        });
        await ensure(_PaymentsPages.fixedDepositPlacementPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amount),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.cdTenor).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.Maturity).textContains(testData.CallDeposit.maturityValue),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Edit Call Deposit', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.fixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.fixedDepositPlacementPage.editButton.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.fixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.amount.input(testData.CallDeposit.amountEdit);
        await _PaymentsPages.fixedDepositPlacementPage.rate.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.fixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.day7_button.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.nextButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.fixedDepositPlacementPage.submitButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForSubmittedPage();
        await _PaymentsPages.fixedDepositPlacementPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fundingAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amountEdit),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.cdTenor).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.Maturity).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });


    it('Reject Call Deposit', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.fixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.fixedDepositPlacementPage.rejectButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.reasonForRejection.input(testData.CallDeposit.rejectReason);
        await _PaymentsPages.fixedDepositPlacementPage.rejectDialogButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.fixedDepositPlacementPage.dismissButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete Call Deposit', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.fixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.fixedDepositPlacementPage.deleteButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.deleteDialogButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.fixedDepositPlacementPage.dismissButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        await _PaymentsPages.fixedDepositPlacementPage.transferCenterfilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.fixedDepositPlacementPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it("Create Call Deposit with Approve now", async function () {
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositPlacement);
        await _PaymentsPages.fixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.fixedDepositPlacementPage.fundingAccount.select(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount);
        await _PaymentsPages.fixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.amount.input(testData.CallDeposit.amount);
        await _PaymentsPages.fixedDepositPlacementPage.rate.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.fixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.MaturityInstruction.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.nextButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.fixedDepositPlacementPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.fixedDepositPlacementPage.pushOption.jsClickIfExist();
        await _PaymentsPages.fixedDepositPlacementPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.fixedDepositPlacementPage.challengeResponse.input(testData.CallDeposit.challengeResponse);
        await _PaymentsPages.fixedDepositPlacementPage.submitButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.getInfoReferenceID().then(text => {
            reference1 = text;
        });
        await ensure(_PaymentsPages.fixedDepositPlacementPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amount),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.cdTenor).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.Maturity).textContains(testData.CallDeposit.maturityValue),
        ]);
    });

    it("Copy Call Deposit", async function () {
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        if (0 !== reference1.trim().length) {
            await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference1);
        } else {
            await _PaymentsPages.fixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.fixedDepositPlacementPage.copyButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.fixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.amount.clean();
        await _PaymentsPages.fixedDepositPlacementPage.amount.input(testData.CallDeposit.amountEdit);
        await _PaymentsPages.fixedDepositPlacementPage.rate.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.fixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.MaturityInstruction.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.nextButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.fixedDepositPlacementPage.submitButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForSubmittedPage();
        await _PaymentsPages.fixedDepositPlacementPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fundingAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amountEdit),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.cdTenor).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.Maturity).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Approve Call Deposit', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.fixedDepositPlacementPage.goToVieCDPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.fixedDepositPlacementPage.approveButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.pushOption.jsClickIfExist();
        await _PaymentsPages.fixedDepositPlacementPage.getChallengeSMS.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.challengeResponse.input(testData.CallDeposit.challengeResponse);
        await _PaymentsPages.fixedDepositPlacementPage.approveButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.fixedDepositPlacementPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received)
        ]);
    });

    it('Create Call Deposit save as draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositPlacement);
        await _PaymentsPages.fixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.fixedDepositPlacementPage.fundingAccount.select(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount);
        await _PaymentsPages.fixedDepositPlacementPage.depositType.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.amount.input(testData.CallDeposit.amount);
        await _PaymentsPages.fixedDepositPlacementPage.rate.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.fixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.fixedDepositPlacementPage.MaturityInstruction.jsClick();
        await _PaymentsPages.fixedDepositPlacementPage.saveAsDraft.click();
        await _PaymentsPages.fixedDepositPlacementPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.fixedDepositPlacementPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.FixedDepositCenter);
        await _PaymentsPages.fixedDepositPlacementPage.centerTab.click();
        await _PaymentsPages.fixedDepositPlacementPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.fixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.CallDeposit.SIT.fundingAccount : testData.CallDeposit.UAT.fundingAccount),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositAmountValue).textContains(testData.CallDeposit.amount),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.cdTenor).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.interestRate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.depositDate).isNotEmpty(),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.Maturity).textContains(testData.CallDeposit.maturityValue),
            await ensure(_PaymentsPages.fixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.Saved)
        ]);
    });
});