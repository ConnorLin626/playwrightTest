/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages, AccountPages, ApprovalsPages } from "../../../pages/IDEALX";
import { SIT, handlerCase, ensure, PROJECT_TYPE } from "../../../lib";
const lib_1 = require("../../../lib");
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let _AccountPages = new AccountPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData("SG_testData.json");
let TWtestData = _PaymentsPages.fetchTestData("TW_testData.json");
let reference = '';
let reference2 = '';
let referenceEdit ='';

describe("Fixed Deposit Placement", async function () {

    this.retries(browser.params.caseRetryTimes);

    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.fixedDepositPlacement.SIT.login.loginCompanyId : testData.fixedDepositPlacement.UAT.login.loginCompanyId, SIT ? testData.fixedDepositPlacement.SIT.login.loginUserId : testData.fixedDepositPlacement.UAT.login.loginUserId, "123123"); });

    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create a Fixed Deposit Placement", async function () {
        await createFixedDepositPlacement().then(text => {
            reference = text;
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await checkViewPageAllField(false) ;//add for IDXP-812
    });

    it('Edit Fixed Deposit Placement', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
        } else {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.FixedDepositPlacementPage.editButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.amount.input(testData.fixedDepositPlacement.amountEdit);
        await _PaymentsPages.FixedDepositPlacementPage.loadGetRatesButton();
        await _PaymentsPages.FixedDepositPlacementPage.getRatesButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.tenorRadio.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.nextButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForPrevewPage();
        await _PaymentsPages.FixedDepositPlacementPage.submitButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FixedDepositPlacementPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(referenceEdit.trim());
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        if(referenceEdit == reference){
           await checkViewPageAllField(true);//add for IDXP-812
        }else{
            await Promise.all([
                await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.fixedDepositPlacement.SIT.fundingAccount : testData.fixedDepositPlacement.UAT.fundingAccount),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.fixedDepositAccountValue).textContains(SIT ? testData.fixedDepositPlacement.SIT.fixdDepositAccount : testData.fixedDepositPlacement.UAT.fixdDepositAccount),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains(testData.fixedDepositPlacement.amountEdit),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.tenor).isNotEmpty(),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.interestRate).isNotEmpty(),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.depositDate).isNotEmpty(),
                await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval)
            ]);
        }
    });

    it('Reject Fixed Deposit Placement', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
        } else {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();;
        await _PaymentsPages.FixedDepositPlacementPage.rejectButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.reasonForRejection.input(testData.fixedDepositPlacement.rejectReason);
        await _PaymentsPages.FixedDepositPlacementPage.rejectDialogButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.dismissButton.click();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete Fixed Deposit Placement', async function () {
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference.trim());
        } else {
            await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaSearch(testData.status.PendingApproval);
        }
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await _PaymentsPages.FixedDepositPlacementPage.deleteButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.deleteDialogButton.click();
        await _PaymentsPages.FixedDepositPlacementPage.dismissButton.click();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.fixedDepositTab.click();
        await _PaymentsPages.FixedDepositPlacementPage.transferCenterfilter.input(reference.trim());
        await lib_1.ensure(_PaymentsPages.FixedDepositPlacementPage.transactionResult).textIs(testData.fixedDepositPlacement.labelNoInformationDisplay);
    });

    it('Approve Fixed Deposit Placement', async function () {
        await createFixedDepositPlacement().then(text => {
            reference2 = text;
        });
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositApproveMenu.click();
        await _PaymentsPages.FixedDepositPlacementPage.loadFdApprovalCondition();
        await _PaymentsPages.FixedDepositPlacementPage.transferCenterfilter.input(reference2.trim());
        await _PaymentsPages.FixedDepositPlacementPage.selectedAllButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.fdApproveButton.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.getChallengeSMS.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.challengeResponse.input(testData.fixedDepositPlacement.challengeResponse);
        await _PaymentsPages.FixedDepositPlacementPage.loadApproveButton();
        await _PaymentsPages.FixedDepositPlacementPage.approveButton.click();
        await _AccountPages.FixedDepositsPage.accountMenu.click();
        await _AccountPages.FixedDepositsPage.fixedDepositTab.click();
        await _AccountPages.FixedDepositsPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.goToViewPaymentPageViaRef(reference2.trim());
        await _PaymentsPages.FixedDepositPlacementPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
        ]);
    });

    it("Create with Approve now", async function () {
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
        await _PaymentsPages.FixedDepositPlacementPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.FixedDepositPlacementPage.challengeResponse.input(testData.fixedDepositPlacement.challengeResponse);
        await _PaymentsPages.FixedDepositPlacementPage.submitButton.click();
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

    //add for AB-14716
    it("Create a Fixed Deposit Placement For TW with approve now", async function () {
        await new NavigatePages().loginIdealx(SIT ? TWtestData.fixedDepositPlacement.SIT.login.loginCompanyId : TWtestData.fixedDepositPlacement.UAT.login.loginCompanyId, SIT ? TWtestData.fixedDepositPlacement.SIT.login.loginUserId : TWtestData.fixedDepositPlacement.UAT.login.loginUserId, "123123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.jsClick();
        await _PaymentsPages.FixedDepositPlacementPage.loadCondition();
        await _PaymentsPages.FixedDepositPlacementPage.fundingAccount.select(SIT ? TWtestData.fixedDepositPlacement.SIT.fundingAccount : TWtestData.fixedDepositPlacement.UAT.fundingAccount);
        await _PaymentsPages.FixedDepositPlacementPage.loadFixdDepositAccount();
        await _PaymentsPages.FixedDepositPlacementPage.fixdDepositAccount.select(SIT ? TWtestData.fixedDepositPlacement.SIT.fixdDepositAccount : TWtestData.fixedDepositPlacement.UAT.fixdDepositAccount);
        await _PaymentsPages.FixedDepositPlacementPage.amount.input(TWtestData.fixedDepositPlacement.amount);
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
            await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
      ]);
    });
});


export async function createFixedDepositPlacement() {
    let ref = '';
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.FixedDepositPlacementPage.FixedDepositPlacement.click();
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
    await _PaymentsPages.FixedDepositPlacementPage.submitButton.click();
    await _PaymentsPages.FixedDepositPlacementPage.loadConditionForSubmittedPage();
    await _PaymentsPages.FixedDepositPlacementPage.getIdealxInfoReferenceID().then(text => {
        ref = text;
    });
    return ref;
}

export async function checkViewPageAllField(isEdit : boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.FixedDepositPlacementPage.fundingAccountValue).textContains(SIT ? testData.fixedDepositPlacement.SIT.fundingAccount : testData.fixedDepositPlacement.UAT.fundingAccount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.fixedDepositAccountValue).textContains(SIT ? testData.fixedDepositPlacement.SIT.fixdDepositAccount : testData.fixedDepositPlacement.UAT.fixdDepositAccount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.depositAmountValue).textContains(isEdit ? testData.fixedDepositPlacement.amountEdit : testData.fixedDepositPlacement.amount),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.tenor).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.interestRate).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.depositDate).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.fdTransactionStatusValue).textContains(testData.status.PendingApproval),
        //Add all field
        await ensure(_PaymentsPages.FixedDepositPlacementPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.Maturity).textContains(testData.fixedDepositPlacement.maturityValue),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.FixedDepositPlacementPage.activityLog).isNotEmpty()
    ]);
}
