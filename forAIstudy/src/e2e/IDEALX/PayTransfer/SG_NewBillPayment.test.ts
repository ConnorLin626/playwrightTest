/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
const lib_1 = require("../../../lib");
import * as utils from '../../../lib/utils';

let reference = "";
let verifyReference = "";
let approvalReference = "";
let reference3 = "";
let referenceEdit = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Bill Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NewBillPayment.SIT.loginCompanyId : testData.NewBillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.loginUserId : testData.BillPayment.UAT.loginUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a Bill Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await CreateBillPayment().then(data => {
            reference = data.trim();
        })
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await checkViewOnlinePageAllField(false);//Add for IDXP-812

    });

    it('Edit Bill Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bill Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.editButton.click();
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.amount.clean();
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountV);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.submitButton.click();
        await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        if (referenceEdit == reference) {
            await checkViewOnlinePageAllField(true);//Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(utils.formatStr2Money(testData.NewBillPayment.amountV)),
            ])
        }
    })

    it('Create Bill Payment with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.billMenu.click();
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation);
        await _PaymentsPages.NewBillPaymentPage.billReference.input(SIT? testData.NewBillPayment.SIT.BillReference : testData.NewBillPayment.UAT.BillReference);
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountA1);
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.NewBillPaymentPage.approvalNowCheckBox.jsClickIfExist();
        //await _PaymentsPages.NewBillPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.NewBillPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NewBillPaymentPage.challengeResponse.input(testData.NewBillPayment.challengeResponse);
        await _PaymentsPages.NewBillPaymentPage.submitButton.click();
        await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.debitAccountValue).textContains(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount),
            await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(testData.NewBillPayment.amountA1),
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Create Bill Payment with Approva Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.billMenu.click();
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation);
        await _PaymentsPages.NewBillPaymentPage.billReference.input(SIT? testData.NewBillPayment.SIT.BillReference:testData.NewBillPayment.UAT.BillReference);
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountA2);
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.NewBillPaymentPage.approvalNowCheckBox.jsClickIfExist();
        //await _PaymentsPages.NewBillPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.NewBillPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NewBillPaymentPage.challengeResponse.input(testData.NewBillPayment.challengeResponse);
        await _PaymentsPages.NewBillPaymentPage.submitButton.click();
        await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Reject Bill Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await CreateBillPayment().then(data => {
            reference = data.trim();
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
        ])
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bill Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.reasonForRejection.input(testData.NewBillPayment.rejectReason);
        await _PaymentsPages.NewBillPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.NewBillPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewBillPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NewBillPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.Rejected),
        ]);
    })

    it('Delete Bill Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bill Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.scrollToBottom();
        await _PaymentsPages.NewBillPaymentPage.deleteButton.click();
        await _PaymentsPages.NewBillPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.NewBillPaymentPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await lib_1.ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.NewBillPayment.labelNoInformationDisplay);
    });

    it('Create Bill Payment for Verify and Release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NewBillPaymentPage.billMenu.click();
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation);
        await _PaymentsPages.NewBillPaymentPage.billReference.input(SIT? testData.NewBillPayment.SIT.BillReference : testData.NewBillPayment.UAT.BillReference);
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountV);
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.NewBillPaymentPage.submitButton.click();
        await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textIs(testData.status.PendingVerification),
        ]);
    });
});

describe('Verify And Release a Bill payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NewBillPayment.SIT.loginCompanyId : testData.NewBillPayment.UAT.loginCompanyId, SIT ? testData.NewBillPayment.SIT.verifyUserId : testData.NewBillPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Bill payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, testData.paymentType.SG_BILL).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Approve a Bill payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('SG - Bill payment', testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.approveButton.jsClick();
        // await _PaymentsPages.NewBillPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.NewBillPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NewBillPaymentPage.challengeResponse.input(testData.NewBillPayment.challengeResponse);
        await _PaymentsPages.NewBillPaymentPage.approveButton.click();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.NewBillPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.NewBillPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    })

    it('Release a Bill payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference3, approvalReference, "SG - Bill payment").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    })
});

export async function CreateBillPayment() {
    let paymentReference = "";
    await _PaymentsPages.NewBillPaymentPage.billMenu.click();
    await _PaymentsPages.NewBillPaymentPage.loadCondition();
    await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation);
    await _PaymentsPages.NewBillPaymentPage.billReference.input(SIT? testData.NewBillPayment.SIT.BillReference:testData.NewBillPayment.UAT.BillReference);
    await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountA1);
    await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount);
    await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
    await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
    await _PaymentsPages.NewBillPaymentPage.submitButton.jsClick();
    await _PaymentsPages.NewBillPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
        paymentReference = text;
    });
    return paymentReference;
};

export async function checkViewOnlinePageAllField(isEdit = false) {
    await Promise.all([
        await ensure(_PaymentsPages.NewBillPaymentPage.debitAccountValue).textContains(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount),
        await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(utils.formatStr2Money(isEdit ? testData.NewBillPayment.amountV : testData.NewBillPayment.amountA1)),
        await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textIs(isEdit ? testData.status.PendingVerification : testData.status.PendingApproval),
        // check all field
        await ensure(_PaymentsPages.NewBillPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.BillingOrganisationValue).textContains(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation),
        await ensure(_PaymentsPages.NewBillPaymentPage.BillReferenceValue).textContains(SIT? testData.NewBillPayment.SIT.BillReference:testData.NewBillPayment.UAT.BillReference),
        await ensure(_PaymentsPages.NewBillPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")

    ]);
}