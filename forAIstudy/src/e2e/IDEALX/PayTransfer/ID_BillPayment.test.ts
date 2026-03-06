import { browser } from 'protractor';
import { NavigatePages, PaymentsPages, ApprovalsPages, FilesPages } from '../../../pages/IDEALX';
import { handlerCase, SIT, PROJECT_TYPE, ensure } from '../../../lib';
import * as utils from '../../../lib/utils';

let reference = "";
let verifyReference = "";
let approvalReference = "";
let referenceForReject = "";
let referenceEdit = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');

describe('ID_Bill Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BillPayment.SIT.loginCompanyId : testData.BillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.loginUserId : testData.BillPayment.UAT.loginUserId, "12312"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Create Bill Payment with all maxlength fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await CreateBillPayment(false).then(data => {
                reference = data.trim();            
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await checkViewOnlinePageAllField(false);//Add for IDXP-812
    })

    it('Edit bill Payment with all fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - Bill Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.editButton.click();
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(testData.BillPayment.editBillOrganisation);
        await _PaymentsPages.NewBillPaymentPage.billReference.clean();
        await _PaymentsPages.NewBillPaymentPage.billReference.input(testData.BillPayment.editBillReference);
        await _PaymentsPages.NewBillPaymentPage.verifyBill.jsClick();
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.BillPayment.SIT.editDebitAccount : testData.BillPayment.UAT.debitAccount);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.NewBillPaymentPage.submitButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text.trim();
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        if (referenceEdit == reference) {
            await checkViewOnlinePageAllField(true);//Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(utils.formatStr2Money(testData.BillPayment.verifyAmount)),
            ])
        }
    })

    it('Create Bill Payment for Reject', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await CreateBillPayment(true).then(data => {
                referenceForReject = data.trim();            
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceForReject);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.PendingApproval),
        ])
    })

});

describe('ID_Bill Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BillPayment.SIT.loginCompanyId : testData.BillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.verifyUserId : testData.BillPayment.UAT.loginUserId, "12312"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Verify a Bill Payment via Transfer Center', async function () {
        verifyReference = reference;
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - Bill Payment", testData.status.PendingVerification);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.viewPageVerifyButton.click();
        await _PaymentsPages.NewBillPaymentPage.verifyDialogButton.click();
        await _PaymentsPages.NewBillPaymentPage.verifyDismissButton.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.PendingApproval)
        ])
    })

    it('Approve a Bill Payment via My Approval', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTxnFilter.click();
        await _ApprovalsPages.ApprovalPage.byTxnFilter.input(reference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            approvalReference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _PaymentsPages.AccountTransferPage.pushBtnButton.jsClick();
        //await _PaymentsPages.AccountTransferPage.loadConditionForApproveNowPopUp();
        //await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.PendingRelease)
        ]);
    })

    it('Release a Bill Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "ID - Bill payment").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    })

    it('Reject a Bill Payment via My Approval', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTxnFilter.click();
        await _ApprovalsPages.ApprovalPage.byTxnFilter.input(referenceForReject);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            approvalReference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.rejectButton.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.BillPayment.rejectReason);
        await ensure(_ApprovalsPages.ApprovalPage.reasonForRejection).textIs(testData.BillPayment.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.Rejected)
        ]);
    })

});



export async function CreateBillPayment(forReject:boolean) {
    let paymentReference = "";
    await _PaymentsPages.NewBillPaymentPage.billMenu.click();
    await _PaymentsPages.NewBillPaymentPage.loadCondition();
    await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(testData.BillPayment.BillOrganisation);
    await _PaymentsPages.NewBillPaymentPage.scrollTo(0,300)
    await _PaymentsPages.NewBillPaymentPage.billReference.input(testData.BillPayment.BillReference);
    await _PaymentsPages.NewBillPaymentPage.verifyBill.jsClick();
    await _PaymentsPages.NewBillPaymentPage.debitAccount.select(forReject ? testData.BillPayment.SIT.debitAccountForReject : testData.BillPayment.SIT.debitAccount);
    await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
    await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
    await _PaymentsPages.NewBillPaymentPage.submitButton.jsClick();
    await _PaymentsPages.NewBillPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
        paymentReference = text;
    });
    return paymentReference;
};

export async function checkViewOnlinePageAllField(isEdit:boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.NewBillPaymentPage.debitAccountValue).textContains(isEdit ? testData.BillPayment.SIT.editDebitAccount : testData.BillPayment.SIT.debitAccount),
        await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(utils.formatStr2Money(testData.BillPayment.verifyAmount)),
        await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textIs(testData.status.PendingVerification),
        // check all field
        await ensure(_PaymentsPages.NewBillPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.BillingOrganisationValue).textContains(testData.BillPayment.viewPageBillOrganisation),
        await ensure(_PaymentsPages.NewBillPaymentPage.BillReferenceValue).textContains(isEdit ? testData.BillPayment.editBillReference : testData.BillPayment.BillReference),
        await ensure(_PaymentsPages.NewBillPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}