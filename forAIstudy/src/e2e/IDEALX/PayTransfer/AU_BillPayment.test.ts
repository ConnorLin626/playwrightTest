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
let testData = _PaymentsPages.fetchTestData('AU_testData.json');

describe('AU_Bill Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BillPayment.SIT.loginCompanyId : testData.BillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.loginUserId : testData.BillPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Create Bill Payment with all maxlength fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await CreateBillPayment(false).then(data => {
                reference = data.trim();            
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await checkViewOnlinePageAllField(false);//Add for IEBAA-1325
    })

    it('Edit bill Payment with all fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("AU - Bill Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.editButton.click();
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.billerCode.input(SIT ? testData.BillPayment.SIT.EditbillCode:testData.BillPayment.UAT.EditbillCode);
        await _PaymentsPages.NewBillPaymentPage.SearchBtn.click();
        await _PaymentsPages.NewBillPaymentPage.billReference.clean();
        await _PaymentsPages.NewBillPaymentPage.billReference.input(SIT ? testData.BillPayment.SIT.editBillReference:testData.BillPayment.UAT.editBillReference);
        await _PaymentsPages.NewBillPaymentPage.amount.clean();
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.BillPayment.amountEdit);
        await _PaymentsPages.NewBillPaymentPage.verifyBill.click();
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.BillPayment.SIT.editDebitAccount : testData.BillPayment.UAT.editDebitAccount);
        await _PaymentsPages.NewBillPaymentPage.NextButton.click();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.NewBillPaymentPage.submitButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text.trim();
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
       // await checkViewOnlinePageAllField(true);//Add for IEBAA-1325
       if (referenceEdit == reference) {
            await checkViewOnlinePageAllField(true);//Add for IEBAA-1325
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(utils.formatStr2Money(testData.BillPayment.amountEdit)),
            ])
       }
    })

    it('Create Bill Payment for Reject', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await CreateBillPayment(true).then(data => {
                referenceForReject = data.trim();            
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceForReject);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.PendingVerification),
        ])
    })

});

describe('AU_Bill Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BillPayment.SIT.loginCompanyId : testData.BillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.verifyUserId : testData.BillPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    
    it('Reject a Bill Payment via view page', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== referenceForReject.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceForReject);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("AU - Bill Payment", testData.status.PendingVerification);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.reasonForRejection.input(testData.BillPayment.rejectReason);
        await _PaymentsPages.NewBillPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.NewBillPaymentPage.getDialogReferenceID().then(text => {
            referenceForReject = text;
        });
        await ensure(_PaymentsPages.NewBillPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NewBillPaymentPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceForReject);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.Rejected),
            await ensure(_PaymentsPages.NewBillPaymentPage.viewRejectReason).textContains(testData.BillPayment.rejectReason),
        ]);
        
    })
    
    it('Verify a Bill Payment via My Verify', async function () {
        verifyReference = reference;
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
       // await _PaymentsPages.TransferCentersPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.AU_Bill).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
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
        if(SIT){
             await _PaymentsPages.AccountTransferPage.pushBtnButton.jsClick();
        }else{
            await _PaymentsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
            await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
            await _PaymentsPages.AccountTransferPage.approveButton.click();
        }
        //await _PaymentsPages.AccountTransferPage.loadConditionForApproveNowPopUp();
        //await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.PendingRelease,testData.status.Approved,testData.status.Completed,testData.status.BankRejected,testData.status.Received),
        ]);
    })

    it('Release a Bill Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_Bill).then(reference => {
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

export async function CreateBillPayment(forReject:boolean) {
    let paymentReference = "";
    await _PaymentsPages.NewBillPaymentPage.billMenu.click();
    await _PaymentsPages.NewBillPaymentPage.loadCondition();
    await _PaymentsPages.NewBillPaymentPage.billerCode.input(SIT? testData.BillPayment.SIT.billCode:testData.BillPayment.UAT.billCode);
    //await _PaymentsPages.NewBillPaymentPage.scrollTo(0,300)
    await _PaymentsPages.NewBillPaymentPage.SearchBtn.click();
    await _PaymentsPages.NewBillPaymentPage.billReference.input(SIT ? testData.BillPayment.SIT.CustomerReference:testData.BillPayment.UAT.CustomerReference);
    await _PaymentsPages.NewBillPaymentPage.amount.input(testData.BillPayment.amount);
    await _PaymentsPages.NewBillPaymentPage.verifyBill.click();
    await Promise.all([
        await ensure(_PaymentsPages.NewBillPaymentPage.VerifySuccessMsg1).textContains(testData.BillPayment.successmsg1),
        await ensure(_PaymentsPages.NewBillPaymentPage.VerifySuccessMsg2).textContains(testData.BillPayment.successmsg2)
    ]);
    if(forReject){
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.BillPayment.SIT.debitAccountForReject : testData.BillPayment.UAT.debitAccountForReject);
    }else{
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.BillPayment.SIT.debitAccount : testData.BillPayment.UAT.debitAccount);
    }
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
        await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textIs(testData.status.PendingVerification),
        // check all field
        await ensure(_PaymentsPages.NewBillPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.NewBillPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(isEdit){
        await ensure(_PaymentsPages.NewBillPaymentPage.debitAccountValue).textContains(SIT? testData.BillPayment.SIT.editDebitAccount : testData.BillPayment.UAT.editDebitAccount)
        await ensure(_PaymentsPages.NewBillPaymentPage.billCodeValue).textIs(SIT ? testData.BillPayment.SIT.EditbillCode : testData.BillPayment.UAT.EditbillCode),
        await ensure(_PaymentsPages.NewBillPaymentPage.CRNValue).textContains(SIT ? testData.BillPayment.SIT.editBillReference : testData.BillPayment.UAT.editBillReference),
        await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(testData.BillPayment.viewamountEdit),
         await ensure(_PaymentsPages.NewBillPaymentPage.billerName).textContains(SIT ?testData.BillPayment.SIT.viewBillerName : testData.BillPayment.UAT.viewBillerNameEdit)
    }else(
        await ensure(_PaymentsPages.NewBillPaymentPage.debitAccountValue).textContains(SIT? testData.BillPayment.SIT.debitAccount : testData.BillPayment.UAT.debitAccount),
        await ensure(_PaymentsPages.NewBillPaymentPage.billCodeValue).textIs(SIT ? testData.BillPayment.SIT.billCode : testData.BillPayment.UAT.billCode),
        await ensure(_PaymentsPages.NewBillPaymentPage.CRNValue).textContains(SIT ? testData.BillPayment.SIT.CustomerReference : testData.BillPayment.UAT.CustomerReference),
        await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains( testData.BillPayment.viewAmountValue),
         await ensure(_PaymentsPages.NewBillPaymentPage.billerName).textContains(SIT ?testData.BillPayment.SIT.viewBillerName : testData.BillPayment.UAT.viewBillerName)
    )
}