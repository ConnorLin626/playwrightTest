import { browser } from "protractor";
import { NavigatePages } from "../../../pages/Navigate";
import { handlerCase, randomNumbers, PROJECT_TYPE, SIT, ensure } from "../../../lib";
import { PaymentsPages } from "../../../pages/IDEALX";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData("SG_testData.json");
let reference = '';
let corporateChequesReference = '';
let referenceEidt = '';

describe('SG_Stop Cheque', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(
            SIT ? testData.StopChequePayment.SIT.loginCompanyId : testData.StopChequePayment.UAT.loginCompanyId,
            SIT ? testData.StopChequePayment.SIT.loginUserId : testData.StopChequePayment.UAT.loginUserId, "P@ssword123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create for Cheque express', async function () {
        await goToStopChequeList();
        await goToStopCheque();
        await fillupField(testData.StopChequePayment.chequeExpress, SIT? testData.StopChequePayment.SIT.fromAccount:testData.StopChequePayment.UAT.fromAccount, testData.StopChequePayment.ReasonForStopCheque);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.stopChequePage.loadCondition4Preview();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await goToStopChequeList();
        await _PaymentsPages.stopChequePage.searchFilter.input(reference);
        await _PaymentsPages.stopChequePage.firstItem.click();
        await _PaymentsPages.stopChequePage.loadCondition4View();
        await checkViewPageAllField(false,false);//Add for IDXP-812

    });

    it('Create for Corporate cheque', async function () {
        await goToStopChequeList();
        await goToStopCheque();
        await fillupField(testData.StopChequePayment.corporateCheques, SIT? testData.StopChequePayment.SIT.fromAccount:testData.StopChequePayment.UAT.fromAccount, testData.StopChequePayment.ReasonForStopCheque);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.stopChequePage.loadCondition4Preview();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            corporateChequesReference = text;
            console.log(corporateChequesReference);
        });
        await goToStopChequeList();
        await _PaymentsPages.stopChequePage.searchFilter.input(corporateChequesReference);
        await _PaymentsPages.stopChequePage.firstItem.click();
        await _PaymentsPages.stopChequePage.loadCondition4View();
        await checkViewPageAllField(false,false);//Add for IDXP-812

    });

    it('Edit an Cheque express', async function () {
        await goToStopChequeList();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.stopChequePage.searchFilter.input(reference);
            await _PaymentsPages.stopChequePage.firstItem.click();
        } else {
            await goToViewStopPaymentViaSearch(testData.status.PendingApproval, "Cheque Express");
        }
        await _PaymentsPages.stopChequePage.loadCondition4View();
        await _PaymentsPages.stopChequePage.editBtn.jsClick();
        await _PaymentsPages.stopChequePage.loadCondition4Create();
        await fillupField(testData.StopChequePayment.chequeExpress, SIT? testData.StopChequePayment.SIT.fromAccount1: testData.StopChequePayment.UAT.fromAccount1, testData.StopChequePayment.ReasonForStopCheque);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.stopChequePage.loadCondition4Preview();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEidt = text;
            console.log(referenceEidt);
        });
        await goToStopChequeList();
        await _PaymentsPages.stopChequePage.searchFilter.input(reference);
        await _PaymentsPages.stopChequePage.firstItem.click();
        await _PaymentsPages.stopChequePage.loadCondition4View();
        if (reference == referenceEidt) {
            await checkViewPageAllField(true,false);//Add for IDXP-812

        } else {
            await Promise.all([
                await ensure(_PaymentsPages.stopChequePage.fromAccountValue).textContains(testData.StopChequePayment.fromAccount1Num),
            ]);
        }

    });

    it('Approve an Cheque express', async function () {
        await goToStopChequeList();
        await _PaymentsPages.stopChequePage.searchFilter.input(reference);
        await _PaymentsPages.stopChequePage.firstItem.click();
        await _PaymentsPages.stopChequePage.loadCondition4View();
        await _PaymentsPages.stopChequePage.approveBtn.jsClick();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.StopChequePayment.enterResponseI3Text);
        await browser.sleep(3000);
        await _PaymentsPages.stopChequePage.approveBtn.jsClick();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await browser.sleep(5000);
        // await _PaymentsPages.stopChequePage.stopChequeMenu.click();
        // await _PaymentsPages.stopChequePage.loadCondition();
        await _PaymentsPages.stopChequePage.searchFilter.input(reference);
        await _PaymentsPages.stopChequePage.firstItem.click();
        await _PaymentsPages.stopChequePage.loadCondition4ViewApprove();
        await Promise.all([
            await ensure(_PaymentsPages.stopChequePage.chequeTypeValue).textContains(testData.StopChequePayment.chequeExpress),
            await ensure(_PaymentsPages.stopChequePage.fromAccountValue).textContains(SIT? testData.StopChequePayment.SIT.fromAccount1Num : testData.StopChequePayment.UAT.fromAccount1Num),
            await ensure(_PaymentsPages.stopChequePage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected,testData.status.Rejected),
        ]);
    });

    it('Reject an Cheque express', async function () {
        await goToStopChequeList();
        await _PaymentsPages.stopChequePage.searchFilter.input(corporateChequesReference);
        await _PaymentsPages.stopChequePage.firstItem.click();
        await _PaymentsPages.stopChequePage.loadCondition4View();
        await _PaymentsPages.stopChequePage.rejectBtn.jsClick();
        await _PaymentsPages.stopChequePage.loadCondition4RejectDialog();
        await browser.sleep(2000);
        await _PaymentsPages.stopChequePage.rejectDialogBtn.jsClick();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await browser.sleep(5000);
        // await _PaymentsPages.stopChequePage.stopChequeMenu.click();
        // await _PaymentsPages.stopChequePage.loadCondition();
        await _PaymentsPages.stopChequePage.searchFilter.input(corporateChequesReference);
        await _PaymentsPages.stopChequePage.firstItem.click();
        await _PaymentsPages.stopChequePage.loadCondition4ViewApprove();
        await Promise.all([
            await ensure(_PaymentsPages.stopChequePage.chequeTypeValue).textContains(testData.StopChequePayment.corporateCheques),
            await ensure(_PaymentsPages.stopChequePage.fromAccountValue).textContains(SIT ? testData.StopChequePayment.SIT.fromAccount : testData.StopChequePayment.UAT.fromAccount),
            await ensure(_PaymentsPages.stopChequePage.statusValue).textContains(testData.status.Rejected),
        ]);
    });

    //add by DASB-73028
    it('Create for Cheque express - from account with NON SGD CCY', async function () {
        corporateChequesReference = "";
        await goToStopChequeList();
        await goToStopCheque();
        await fillupField(testData.StopChequePayment.chequeExpress, SIT? testData.StopChequePayment.SIT.fromAccountNonSGD:testData.StopChequePayment.UAT.fromAccountNonSGD, testData.StopChequePayment.ReasonForStopCheque);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.stopChequePage.loadCondition4Preview();
        await ensure(_PaymentsPages.stopChequePage.bankChargeValuePriview).textContains('SGD'),
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await goToStopChequeList();
        await _PaymentsPages.stopChequePage.searchFilter.input(reference);
        await _PaymentsPages.stopChequePage.firstItem.click();
        await _PaymentsPages.stopChequePage.loadCondition4View();
        await checkViewPageAllField(false,true);//Add for IDXP-812

    });
});

async function goToStopChequeList() {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.stopChequePage.stopChequeMenu.click();
    await _PaymentsPages.stopChequePage.loadCondition();
}

async function goToStopCheque() {
    await _PaymentsPages.stopChequePage.createStopChequeBtn.click();
    await _PaymentsPages.stopChequePage.loadCondition4Create();
}

async function fillupField(chequeType: string, fromAccount: string, ReasonForStopCheque: string) {
    await _PaymentsPages.stopChequePage.chequeTypeRadio.select(chequeType);
    await _PaymentsPages.stopChequePage.fromAccount.select(fromAccount);
    let chequeNumber = randomNumbers();
    await _PaymentsPages.stopChequePage.chequeNoInput.input(chequeNumber);
    await _PaymentsPages.stopChequePage.stopChequeReason.input(ReasonForStopCheque)
}

async function goToViewStopPaymentViaSearch(transactionStatus: string, paymentType: string) {
    await _PaymentsPages.stopChequePage.showAdditionFilter.click();
    await _PaymentsPages.stopChequePage.transactionStatus.select(transactionStatus);
    await _PaymentsPages.stopChequePage.paymentTypeList.select(paymentType);
    await _PaymentsPages.stopChequePage.searchButton.click();
    await _PaymentsPages.stopChequePage.loadCondition()
    await _PaymentsPages.stopChequePage.firstItem.click();
}



export async function checkViewPageAllField(isEdit = false,isNonSGD=false) {
    await Promise.all([
        await ensure(_PaymentsPages.stopChequePage.chequeTypeValue).textContains(isEdit ? testData.StopChequePayment.chequeExpress : (corporateChequesReference? testData.StopChequePayment.corporateCheques: testData.StopChequePayment.chequeExpress)),
        await ensure(_PaymentsPages.stopChequePage.referenceValue).textContains(isEdit ? referenceEidt: (corporateChequesReference ? corporateChequesReference : reference)),
        await ensure(_PaymentsPages.stopChequePage.statusValue).textContains(testData.status.PendingApproval),
        // Add all field  
        await ensure(_PaymentsPages.stopChequePage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.stopChequePage.fromAccountValue).textContains(isEdit ? (SIT? testData.StopChequePayment.SIT.fromAccount1Num:testData.StopChequePayment.UAT.fromAccount1Num) : (isNonSGD ? (SIT? testData.StopChequePayment.SIT.fromAccountNonSGD:testData.StopChequePayment.UAT.fromAccountNonSGD):(SIT? testData.StopChequePayment.SIT.fromAccount:testData.StopChequePayment.UAT.fromAccount))),
        await ensure(_PaymentsPages.stopChequePage.chequeNumberValue).isNotEmpty(),
        await ensure(_PaymentsPages.stopChequePage.bankChargesValue).textContains('SGD'),
        await ensure(_PaymentsPages.stopChequePage.chargesAccountValue).textContains(isEdit ? (SIT? testData.StopChequePayment.SIT.fromAccount1Num:testData.StopChequePayment.UAT.fromAccount1Num) : (isNonSGD ? (SIT? testData.StopChequePayment.SIT.fromAccountNonSGD:testData.StopChequePayment.UAT.fromAccountNonSGD):(SIT? testData.StopChequePayment.SIT.fromAccount:testData.StopChequePayment.UAT.fromAccount))),
        await ensure(_PaymentsPages.stopChequePage.viewReferenceValue).textContains(isEdit ? referenceEidt: (corporateChequesReference ? corporateChequesReference : reference)),
        await ensure(_PaymentsPages.stopChequePage.stopChequeReasonValue).textContains(testData.StopChequePayment.ReasonForStopCheque),
        await ensure(_PaymentsPages.stopChequePage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}











