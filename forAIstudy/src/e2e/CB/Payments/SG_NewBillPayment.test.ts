/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
const lib_1 = require("../../../lib");
let reference = "";
let verifyReference="";
let approvalReference=""
let paymentReference=""
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Bill Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.NewBillPayment.SIT.loginCompanyId : testData.NewBillPayment.UAT.loginCompanyId, SIT ? testData.BillPayment.SIT.loginUserId : testData.BillPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a Bill Payment', async function () {
        await CreateBillPayment().then(data => {
            reference = data.trim();
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.debitAccountValue).textContains(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount),
            await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(testData.NewBillPayment.amountA1),
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textIs(testData.status.PendingApproval)
        ])
    });

    it('Edit Bill Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bill Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.editButton.click();
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.amount.clean();
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountV);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.submitButton.click();
        await _PaymentsPages.NewBillPaymentPage.getInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await ensure(_PaymentsPages.NewBillPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.PendingVerification),
        ]);
    })

    it('Create Bill Payment with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.NewBillPayment);
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation);
        await _PaymentsPages.NewBillPaymentPage.billReference.input(testData.NewBillPayment.BillReference);
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountA1);
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.NewBillPaymentPage.approvalNowCheckBox.jsClickIfExist();
        //await _PaymentsPages.NewBillPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.NewBillPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NewBillPaymentPage.challengeResponse.input(testData.NewBillPayment.challengeResponse);
        await _PaymentsPages.NewBillPaymentPage.submitButton.click();
        await _PaymentsPages.NewBillPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewBillPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.debitAccountValue).textContains(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount),
            await ensure(_PaymentsPages.NewBillPaymentPage.viewAmount).textContains(testData.NewBillPayment.amountA1),
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Create Bill Payment with Approva Now without M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.NewBillPayment);
        await _PaymentsPages.NewBillPaymentPage.loadCondition();
        await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation);
        await _PaymentsPages.NewBillPaymentPage.billReference.input(testData.NewBillPayment.BillReference);
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.NewBillPayment.amountA2);
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(SIT ? testData.NewBillPayment.SIT.debitAccount : testData.NewBillPayment.UAT.debitAccount);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.NewBillPaymentPage.approvalNowCheckBox.jsClickIfExist();
        //await _PaymentsPages.NewBillPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.NewBillPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NewBillPaymentPage.challengeResponse.input(testData.NewBillPayment.challengeResponse);
        await _PaymentsPages.NewBillPaymentPage.submitButton.click();
        await _PaymentsPages.NewBillPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewBillPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Reject Bill Payment via Transfer Center', async function () {
        await CreateBillPayment().then(data => {
            reference = data.trim();
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
		await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
        ])
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bill Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.rejectButton.click();
        await _PaymentsPages.NewBillPaymentPage.reasonForRejection.input(testData.NewBillPayment.rejectReason);
        await _PaymentsPages.NewBillPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.NewBillPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewBillPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NewBillPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.Rejected),
        ]);
    })

    it('Delete Bill Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bill Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.deleteButton.click();
        await _PaymentsPages.NewBillPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.NewBillPaymentPage.dismissButton.click();
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
        await lib_1.ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.NewBillPayment.labelNoInformationDisplay);
    });
});


describe('Verify And Release a Bill payment', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.NewBillPayment.SIT.loginCompanyId : testData.NewBillPayment.UAT.loginCompanyId, SIT ? testData.NewBillPayment.SIT.verifyUserId : testData.NewBillPayment.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify a Bill payment via My Verify', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages,verifyReference,testData.paymentType.SG_BILL).then(reference => {
            verifyReference = reference;
        })
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
		await Promise.all([
			await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Approve a Bill payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('SG - Bill payment', testData.status.PendingApproval);
        }
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await _PaymentsPages.NewBillPaymentPage.approveButton.click();
		// await _PaymentsPages.NewBillPaymentPage.pushOption.jsClickIfExist();
		await _PaymentsPages.NewBillPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NewBillPaymentPage.challengeResponse.input(testData.NewBillPayment.challengeResponse);
		await _PaymentsPages.NewBillPaymentPage.approveButton.click();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.NewBillPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.NewBillPaymentPage.dismissButton.click();
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    })   

    it('Release a Bill payment via My Release', async function () {
        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'SG - Bill payment').then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    })
});

export async function CreateBillPayment() {
    let paymentReference = "";
    await _PaymentsPages.openMenu(Menu.Payments.NewBillPayment);
    await _PaymentsPages.NewBillPaymentPage.loadCondition();
    await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(SIT ? testData.NewBillPayment.SIT.BillOrganisation : testData.NewBillPayment.UAT.BillOrganisation);
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
