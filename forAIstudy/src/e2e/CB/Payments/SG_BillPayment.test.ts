/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
let reference = "";
let reference1 = "";

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Bill Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.BillPayment.SIT.loginCompanyId : testData.BillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.loginUserId : testData.BillPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    // it('Create a Bill Payment', async function () {
    //     await createBillPayment().then(data => {
    //         reference1 = data.trim();
    //     })
    //     await _PaymentsPages.billPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference1);
    //     await _PaymentsPages.billPaymentPage.loadConditionOnViewNewUI();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.billPaymentPage.debitAccountValue).textContains(SIT ? testData.BillPayment.SIT.debitAccount : testData.BillPayment.UAT.debitAccount),
    //         // await ensure(_PaymentsPages.billPaymentPage.viewAmount).textContains(testData.BillPayment.amountA1),
    //         // await ensure(_PaymentsPages.billPaymentPage.transactionStatus).textIs(testData.status.PendingApproval)
    //     ])
    // });

    // it('Create a Bill Payment with Mchallenge with Approve Now', async function () {
    //     await _PaymentsPages.openMenu(Menu.Payments.BillPayment);
    //     await _PaymentsPages.billPaymentPage.loadCondition();
    //     await _PaymentsPages.billPaymentPage.BillOrganisation.select(testData.BillPayment.BillOrganisation);  //UAT from account
    //     await _PaymentsPages.billPaymentPage.debitAccount.select(testData.BillPayment.debitAccount);
    //     await _PaymentsPages.billPaymentPage.amount.input(testData.BillPayment.amountA1);
    //     await _PaymentsPages.billPaymentPage.billReference.input(testData.BillPayment.BillReference);
    //     await _PaymentsPages.billPaymentPage.approveNoWCheckBox.jsClick();
    //     await _PaymentsPages.billPaymentPage.previewButton.click();
    //     await await _PaymentsPages.billPaymentPage.loadConditionForApprovalNowPage();
    //     await _PaymentsPages.billPaymentPage.sendChallenge.clickIfExist();
    //     await _PaymentsPages.billPaymentPage.response.input(testData.BillPayment.response);
    //     await _PaymentsPages.billPaymentPage.approveButton.click();
    //     await _PaymentsPages.billPaymentPage.getI3ReferenceID().then(text => {
    //         reference = text;
    //     });
    //     await _PaymentsPages.billPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
    //     await _PaymentsPages.billPaymentPage.loadConditionOnView();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.billPaymentPage.viewDebitAccount).textContains(testData.BillPayment.debitAccount),
    //         await ensure(_PaymentsPages.billPaymentPage.viewAmount).textContains(testData.BillPayment.amountA1),
    //         await ensure(_PaymentsPages.billPaymentPage.transactionStatus).textContainsLessOne('Approved', 'Received'),
    //         await ensure(_PaymentsPages.billPaymentPage.cutOffTimeValue).isNotEmpty(),
    //     ]);
    // });

    // it('Create a Bill Payment without Mchallenge with Approve Now', async function () {
    //     await _PaymentsPages.openMenu(Menu.Payments.BillPayment);
    //     await _PaymentsPages.billPaymentPage.loadCondition();
    //     await _PaymentsPages.billPaymentPage.BillOrganisation.select(testData.BillPayment.BillOrganisation);  //UAT from account
    //     await _PaymentsPages.billPaymentPage.debitAccount.select(testData.BillPayment.debitAccount);
    //     await _PaymentsPages.billPaymentPage.amount.input(testData.BillPayment.amountA2);
    //     await _PaymentsPages.billPaymentPage.billReference.input(testData.BillPayment.BillReference);
    //     await _PaymentsPages.billPaymentPage.approveNoWCheckBox.jsClick();
    //     await _PaymentsPages.billPaymentPage.previewButton.click();
    //     await _PaymentsPages.billPaymentPage.loadConditionForApprovalNowPage();
    //     await _PaymentsPages.billPaymentPage.response.input(testData.BillPayment.response);
    //     await _PaymentsPages.billPaymentPage.approveButton.click();
    //     await _PaymentsPages.billPaymentPage.getI3ReferenceID().then(text => {
    //         reference = text;
    //     });
    //     await _PaymentsPages.billPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
    //     await _PaymentsPages.billPaymentPage.loadConditionOnView();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.billPaymentPage.viewDebitAccount).textContains(testData.BillPayment.debitAccount),
    //         await ensure(_PaymentsPages.billPaymentPage.viewAmount).isNotEmpty(),
    //         await ensure(_PaymentsPages.billPaymentPage.transactionStatus).textContainsLessOne('Partial Approved'),
    //         await ensure(_PaymentsPages.billPaymentPage.cutOffTimeValue).isNotEmpty(),
    //     ]);
    // });

    // comment first,will update when the new ui finised
    // it('Approve Bill Payment in the view page', async function () {
    //     await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    //     if (0 != reference1.trim().length) {
    //         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference1);
    //     } else {
    //         await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bill Payment", testData.status.PendingApproval);
    //     }
    //     await _PaymentsPages.billPaymentPage.loadConditionOnView();
    //     await _PaymentsPages.billPaymentPage.customerReferenceValue.getText().then((ref) => {
    //         reference1 = ref;
    //     });
    //     await _PaymentsPages.billPaymentPage.approveButton.jsClick();
    //     await _PaymentsPages.billPaymentPage.loadConditionForApprovaPage();
    //     await _PaymentsPages.billPaymentPage.response.input(testData.BillPayment.response);
    //     await _PaymentsPages.billPaymentPage.submitButton.jsClick();
    //     await _PaymentsPages.billPaymentPage.loadConditionForOLDTransferCenterPage();
    //     await _PaymentsPages.billPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference1);
    //     await _PaymentsPages.billPaymentPage.loadConditionOnView();

    //     await Promise.all([
    //         await ensure(_PaymentsPages.billPaymentPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    //     ]);
    // });

    it('Multi approve All Bill Payment in the My Approval list', async function () {
        let referenceArray = [];
        await CreateBillPayment();
        await new NavigatePages().loginCB(SIT ? testData.BillPayment.SIT.loginCompanyId : testData.BillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.loginUserId : testData.BillPayment.UAT.loginUserId);
        await CreateBillPayment();
        await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.showAddFilter.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.paymentTypeList.select("SG - Bill Payment");
        await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1, 2);
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference1.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
        await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
        await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
        await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
        await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _ApprovalsPages.transferCentersPage.loadCondition();
        for (let i = 0; i < referenceArray.length; i++) {
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[i]);
            console.error("multi approval1:" + referenceArray[i])
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(
                testData.status.Approved,
                testData.status.PartialApproved,
                testData.status.PendingRelease,
                testData.status.Received,
                testData.status.BankRejected,
                testData.status.Completed
            );
        }
    });

    it('Multi approve Bill Payment and others payment type in the My Approval list', async function () {
        let referenceArray = [];
        await CreateBillPayment();
        await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.showAddFilter.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.paymentTypeList.select("SG - Bill Payment");
        await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
            referenceArray.push(text.trim());
        });
        // await _ApprovalsPages.paymentsTransactionsFilesPage.paymentTypeList.select("SG - Bulk Collection");
        // await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
        // await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        // await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
        // await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
        //     referenceArray.push(text.trim());
        // });
        await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
        await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
        await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
        await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
        await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _ApprovalsPages.transferCentersPage.loadCondition();
        for (let i = 0; i < referenceArray.length; i++) {
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[i]);
            console.error("multi approval2:" + referenceArray[i])
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(
                testData.status.Approved,
                testData.status.PartialApproved,
                testData.status.PendingRelease,
                testData.status.Received,
                testData.status.BankRejected,
                testData.status.Completed
            );
        }
    });

    it('Multi reject All Bill Payment in the My Approval list', async function () {
        let referenceArray = [];
        await CreateBillPayment();
        await new NavigatePages().loginCB(SIT ? testData.BillPayment.SIT.loginCompanyId : testData.BillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.loginUserId : testData.BillPayment.UAT.loginUserId);
        await CreateBillPayment();
        await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.showAddFilter.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.paymentTypeList.select("SG - Bill Payment");
        await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1, 2);
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference1.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.paymentsTransactionsFilesPage.rejectButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(testData.MyApproval.rejectReason);
        await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
        await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.click();
        // await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXRejectDialogSuccess();//has success message.
        await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _ApprovalsPages.transferCentersPage.loadCondition();
        for (let i = 0; i < referenceArray.length; i++) {
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[i]);
            console.error("multi reject1:" + referenceArray[i])
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected);
        }
    });

    it('Multi reject Bill Payment and other payment type in the My Approval list', async function () {
        let referenceArray = [];
        await CreateBillPayment();
        await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.showAddFilter.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.paymentTypeList.select("SG - Bill Payment");
        await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
            referenceArray.push(text.trim());
        });
        // await _ApprovalsPages.paymentsTransactionsFilesPage.paymentTypeList.select("SG - Bulk Collection");
        // await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Search.click();
        // await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        // await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
        // await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
        //     referenceArray.push(text.trim());
        // });
        await _ApprovalsPages.paymentsTransactionsFilesPage.rejectButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(testData.MyApproval.rejectReason);
        await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
        await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.click();
        // await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXRejectDialogSuccess();//has success message.
        await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _ApprovalsPages.transferCentersPage.loadCondition();
        for (let i = 0; i < referenceArray.length; i++) {
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[i]);
            console.error("multi reject2:" + referenceArray[i])
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected);
        }
    });
})
// Old UI 入口的create billpayment
// export async function createBillPayment() {
//     let paymentReference = "";
//     await _PaymentsPages.openMenu(Menu.Payments.NewBillPayment);
//     await _PaymentsPages.billPaymentPage.loadConditionForNewUI();
//     await _PaymentsPages.billPaymentPage.oldBillPaymentLink.click();
//     await _PaymentsPages.billPaymentPage.loadCondition();
//     await _PaymentsPages.billPaymentPage.BillOrganisation.select(SIT ? testData.BillPayment.SIT.BillOrganisation : testData.BillPayment.UAT.BillOrganisation);
//     await _PaymentsPages.billPaymentPage.debitAccount.select(SIT ? testData.BillPayment.SIT.debitAccount : testData.BillPayment.UAT.debitAccount);
//     await _PaymentsPages.billPaymentPage.amount.input(testData.BillPayment.amountA1);
//     await _PaymentsPages.billPaymentPage.billReference.input(testData.BillPayment.BillReference);
//     await _PaymentsPages.billPaymentPage.previewButton.jsClick();
//     await _PaymentsPages.billPaymentPage.loadConditionForPreviewPage();
//     await _PaymentsPages.billPaymentPage.submitButton.jsClick();
//     // need confirm if old ui link will be removed or not, so not sure will direct to which page after click submit button
//     await browser.sleep(5000);
//     // await _PaymentsPages.billPaymentPage.getI3ReferenceID().then(text => {
//     //     paymentReference = text;
//     // });
//     // await ensure(_PaymentsPages.billPaymentPage).isI3Success();
//     // return paymentReference;
// };


export async function CreateBillPayment() {
    let paymentReference = "";
    await _PaymentsPages.openMenu(Menu.Payments.NewBillPayment);
    await _PaymentsPages.NewBillPaymentPage.loadCondition();
    await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation);
    await _PaymentsPages.NewBillPaymentPage.loadCondition();
    await _PaymentsPages.NewBillPaymentPage.billReference.input(testData.NewBillPayment.BillReference);
    await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountA1);
    await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount);
    await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
    await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
    await _PaymentsPages.NewBillPaymentPage.submitButton.jsClick();
    await _PaymentsPages.NewBillPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.NewBillPaymentPage.getInfoReferenceID().then(text => {
        paymentReference = text;
    });
    await ensure(_PaymentsPages.NewBillPaymentPage).isUXSuccess();
    return paymentReference;
};
