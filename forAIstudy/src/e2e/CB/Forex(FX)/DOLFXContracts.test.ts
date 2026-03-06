/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ForexPage, PaymentsPages, ApprovalsPages } from "../../../pages/CB";
import { browser } from "protractor";
import { ensure, handlerCase, SIT } from "../../../lib";
import { Menu } from "../../../config/menu";

let _ForexPage = new ForexPage();
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let hkTestData = _ForexPage.fetchTestData('HK_testData.json');
let sgTestData = _ForexPage.fetchTestData('SG_testData.json');
let reference = '';

describe('FX contract Create entitlements maker with no existing contracts', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? hkTestData.DOLFxContracts.SIT.loginCompanyId : sgTestData.DOLFxContracts.UAT.loginCompanyId, SIT ? hkTestData.DOLFxContracts.SIT.loginUserId : sgTestData.DOLFxContracts.UAT.loginUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Create TT', async function () {
		if (SIT) {
			await _ForexPage.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
		} else {
			await _ForexPage.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
		}
		await _ForexPage.DOLFXContractsPage.loadCondition();
		await _ForexPage.DOLFXContractsPage.fromAccount.select(SIT ? hkTestData.DOLFxContracts.SIT.fromAccount : sgTestData.DOLFxContracts.UAT.fromAccount);
		await _ForexPage.DOLFXContractsPage.currency.select(SIT ? hkTestData.DOLFxContracts.paymentCurrency : sgTestData.DOLFxContracts.UAT.paymentCurrency);
		await _ForexPage.DOLFXContractsPage.amount.input(SIT ? hkTestData.DOLFxContracts.amount : sgTestData.DOLFxContracts.UAT.amount);
		await _ForexPage.DOLFXContractsPage.existingPayee.select(SIT ? hkTestData.DOLFxContracts.existingPayee : sgTestData.DOLFxContracts.UAT.existingPayee);
		await _ForexPage.DOLFXContractsPage.getFixedRateButton.clickIfExist();
		await _ForexPage.DOLFXContractsPage.bookButton.clickIfExist();
		await _ForexPage.DOLFXContractsPage.confirmButton.clickIfExist();
		await _ForexPage.DOLFXContractsPage.bankChargesOur.jsClick();
		await _ForexPage.DOLFXContractsPage.paymentDetail.input("paymentDetail");
		await _ForexPage.DOLFXContractsPage.nextButton.click();
		await _ForexPage.DOLFXContractsPage.submitButton.click();
		await _ForexPage.DOLFXContractsPage.getInfoReferenceID().then((data) => {
			reference = data;
		});
	});

	it('Approve TT via Transfer Center', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _ForexPage.DOLFXContractsPage.loadConditionForViewTTPaymentPage();
		await _ForexPage.DOLFXContractsPage.approveButton.click();
		await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
		await _ForexPage.DOLFXContractsPage.getChallengeSMS.clickIfExist();
		await _ForexPage.DOLFXContractsPage.challengeResponse.input(hkTestData.FPSPayment.responseCode);
		await _ForexPage.DOLFXContractsPage.approveButton.click();
		await _ForexPage.DOLFXContractsPage.dismissButton.click();
		await _ForexPage.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _ForexPage.DOLFXContractsPage.loadConditionForViewTTPaymentPage();
		await ensure(_ForexPage.DOLFXContractsPage.transactionStatus).textContainsLessOne(hkTestData.status.Received, hkTestData.status.Approved, hkTestData.status.PendingRelease, hkTestData.status.Completed, hkTestData.status.BankRejected, hkTestData.status.BankRejected.PartialApproved);
	});

	it('Transfer Summary section for ACT', async function () {
		if (SIT) {
			await _ForexPage.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
		} else {
			await _ForexPage.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
		}
		await _ForexPage.DOLFXContractsPage.loadCondition();
		await _ForexPage.DOLFXContractsPage.fromAccount.select(SIT ? hkTestData.DOLFxContracts.SIT.fromAccount : sgTestData.DOLFxContracts.UAT.fromAccount);
		await _ForexPage.DOLFXContractsPage.currency.select(SIT ? hkTestData.DOLFxContracts.paymentCurrency : sgTestData.DOLFxContracts.UAT.paymentCurrency);
		await _ForexPage.DOLFXContractsPage.amount.input(SIT ? hkTestData.DOLFxContracts.amount : sgTestData.DOLFxContracts.UAT.amount);
		await _ForexPage.DOLFXContractsPage.existingPayee.select(SIT ? hkTestData.DOLFxContracts.existingPayeeACT : sgTestData.DOLFxContracts.UAT.existingPayeeACT);
		await _ForexPage.DOLFXContractsPage.getFixedRateButton.clickIfExist();
		await _ForexPage.DOLFXContractsPage.bookButton.clickIfExist();
		await _ForexPage.DOLFXContractsPage.confirmButton.clickIfExist();
		if (await _ForexPage.DOLFXContractsPage.bookFxAmount.ElementExist()) {
			await _ForexPage.DOLFXContractsPage.bookFxAmount.input(hkTestData.DOLFxContracts.amountF01);
		}
	});
});

describe('FX contract Create entitlements maker with existing contracts', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? sgTestData.DOLFxContracts.SIT.loginCompanyId : sgTestData.DOLFxContracts.UAT.loginCompanyId, SIT ? sgTestData.DOLFxContracts.SIT.loginUserId : sgTestData.DOLFxContracts.UAT.loginUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Create SG ACT', async function () {
		await _ForexPage.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
		await _ForexPage.DOLFXContractsPage.loadCondition();
		await _ForexPage.DOLFXContractsPage.fromAccount.select(SIT ? sgTestData.DOLFxContracts.SIT.fromAccount : sgTestData.DOLFxContracts.UAT.fromAccount);
		await _ForexPage.DOLFXContractsPage.currency.select(SIT ? sgTestData.DOLFxContracts.SIT.paymentCurrency : sgTestData.DOLFxContracts.UAT.paymentCurrency);
		await _ForexPage.DOLFXContractsPage.amount.input(sgTestData.DOLFxContracts.totalAmt);
		await _ForexPage.DOLFXContractsPage.existingPayee.select(SIT ? sgTestData.DOLFxContracts.SIT.existingPayee : sgTestData.DOLFxContracts.UAT.existingPayeeACT);
		if (await _ForexPage.DOLFXContractsPage.fxEnterCheck.ElementExist()) {
			await _ForexPage.DOLFXContractsPage.fxEnterCheck.jsClick();
		}
		await _ForexPage.DOLFXContractsPage.existingContractButton.jsClick();
		if (await _ForexPage.DOLFXContractsPage.fxRef1.isElementPresent()) {
			await _ForexPage.DOLFXContractsPage.fxRef1.input(sgTestData.DOLFxContracts.fxRef1);
		}
		await _ForexPage.DOLFXContractsPage.fxContractAmt1.input(sgTestData.DOLFxContracts.fxAmt1);
		await _ForexPage.DOLFXContractsPage.fxContract2Button.jsClick();
		if (await _ForexPage.DOLFXContractsPage.fxRef2.isElementPresent()) {
			await _ForexPage.DOLFXContractsPage.fxRef2.input(sgTestData.DOLFxContracts.fxRef2);
		}
		await _ForexPage.DOLFXContractsPage.fxContractAmt2.input(sgTestData.DOLFxContracts.fxAmt2);
		await _ForexPage.DOLFXContractsPage.paymentDetail.input("paymentDetail");
		await _ForexPage.DOLFXContractsPage.nextButton.click();
		await _ForexPage.DOLFXContractsPage.submitButton.click();
	});

	it('Approve multi transaction via My approve - Per transaction', async function () {
		await _ForexPage.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
		await _ForexPage.DOLFXContractsPage.loadCondition();
		await _ForexPage.DOLFXContractsPage.fromAccount.select(SIT ? sgTestData.DOLFxContracts.SIT.fromAccount : sgTestData.DOLFxContracts.UAT.fromAccount);
		await _ForexPage.DOLFXContractsPage.currency.select(SIT ? sgTestData.DOLFxContracts.SIT.paymentCurrency : sgTestData.DOLFxContracts.UAT.paymentCurrency);
		await _ForexPage.DOLFXContractsPage.amount.input(SIT ? sgTestData.DOLFxContracts.SIT.amount : sgTestData.DOLFxContracts.UAT.amount);
		await _ForexPage.DOLFXContractsPage.existingPayee.select(SIT ? sgTestData.DOLFxContracts.SIT.existingPayee : sgTestData.DOLFxContracts.UAT.existingPayeeACT);
		await _ForexPage.DOLFXContractsPage.paymentDetail.input("paymentDetail");
		await _ForexPage.DOLFXContractsPage.nextButton.click();
		await _ForexPage.DOLFXContractsPage.submitButton.click();
		await _ForexPage.DOLFXContractsPage.getInfoReferenceID().then((data) => {
			reference = data;
		});
		await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
		await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
		await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
		await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(reference);
		await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
		await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
		await _ForexPage.DOLFXContractsPage.multiApprovalBookButton.clickIfExist();
		await _ForexPage.DOLFXContractsPage.confirmButton.clickIfExist();
		await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
		await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(sgTestData.MyApproval.challengeResponse);
		await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(sgTestData.MyApproval.challengeResponse);
		await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
		await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
		await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
		await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
		await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(sgTestData.status.Approved, sgTestData.status.PartialApproved, sgTestData.status.PendingRelease, sgTestData.status.Received, sgTestData.status.BankRejected, sgTestData.status.Completed);
	});
});