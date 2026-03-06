/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { ensure, SIT, handlerCase, generatedID, randomNumbers } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from copy,then Verify/Approval/Release
let reference2 = "";
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const lib_1 = require("../../../lib");
let testData = _PaymentsPages.fetchTestData("AU_testData.json");
let verifyReference = "";
let paymentReference = "";
let templateRef = "";
let approvalReference = "";

describe("AU Low Value Domestic Payment", async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {
		await new NavigatePages().loginCB(SIT ? testData.LVTPayment.SIT.loginCompanyId : testData.LVTPayment.UAT.loginCompanyId, SIT ? testData.LVTPayment.SIT.loginUserId : testData.LVTPayment.UAT.loginUserId);
	});
	const suitObject = this;
	beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
		handlerCase(suitObject, this);
	});

	it('Create an AU LVT with new Payee', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
		await _PaymentsPages.VNLvtPage.amount.input(testData.LVTPayment.amount);
		await _PaymentsPages.VNLvtPage.newPayeeTab.click();
		await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
		await _PaymentsPages.VNLvtPage.newPayeeAdd1.input(testData.LVTPayment.newPayeeAdd1);
		await _PaymentsPages.VNLvtPage.newPayeeAdd2.input(testData.LVTPayment.newPayeeAdd2);
		await _PaymentsPages.VNLvtPage.newPayeeAdd3.input(testData.LVTPayment.newPayeeAdd3);
		await _PaymentsPages.VNLvtPage.enterDetailButton.click();
		await _PaymentsPages.VNLvtPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
		await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
		await _PaymentsPages.VNLvtPage.LVTCheckBox.jsClick();
		await _PaymentsPages.VNLvtPage.nextButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
		await _PaymentsPages.VNLvtPage.submitButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
		await _PaymentsPages.VNLvtPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.VNLvtPage).isUXSuccess();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.LVTPayment.amount),
			await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeName),
			await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Copy an AU LVT', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
		}
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.VNLvtPage.copyButton.click();
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.nextButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
		await _PaymentsPages.VNLvtPage.submitButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
		await _PaymentsPages.VNLvtPage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.VNLvtPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.VNLvtPage.amountValue).isNotEmpty(),
			await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).isNotEmpty()
		]);
	});

	it('Edit an AU LVT ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
		}
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.VNLvtPage.editButton.click();
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.amount.input(testData.LVTPayment.amountEdit);
		await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVTPayment.newPayeeNameEdit);
		await _PaymentsPages.VNLvtPage.nextButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
		await _PaymentsPages.VNLvtPage.submitButton.click();
		await _PaymentsPages.VNLvtPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.VNLvtPage).isUXSuccess();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.LVTPayment.amountEdit),
			await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeNameEdit)
		]);
	});

	it('Reject an AU LVT  ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
		}
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.VNLvtPage.rejectButton.click();
		await _PaymentsPages.VNLvtPage.reasonForRejection.input(testData.LVTPayment.rejectReason);
		await _PaymentsPages.VNLvtPage.rejectDialogButton.click();
		await _PaymentsPages.VNLvtPage.dismissButton.click();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContains(testData.status.Rejected)
		]);
	});

	it('Delete an AU LVT ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
		}
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.VNLvtPage.deleteButton.click();
		await _PaymentsPages.VNLvtPage.deleteDialogButton.click();
		await _PaymentsPages.VNLvtPage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
		await lib_1.ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.LVTPayment.labelNoInformationDisplay);
	});

	it('Create an AU LVT with Approval Now with M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
		await _PaymentsPages.VNLvtPage.amount.input(testData.LVTPayment.amount);
		await _PaymentsPages.VNLvtPage.newPayeeTab.click();
		await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
		await _PaymentsPages.VNLvtPage.newPayeeAdd1.input(testData.LVTPayment.newPayeeAdd1);
		await _PaymentsPages.VNLvtPage.newPayeeAdd2.input(testData.LVTPayment.newPayeeAdd2);
		await _PaymentsPages.VNLvtPage.newPayeeAdd3.input(testData.LVTPayment.newPayeeAdd3);
		await _PaymentsPages.VNLvtPage.enterDetailButton.click();
		await _PaymentsPages.VNLvtPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
		await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
		await _PaymentsPages.VNLvtPage.LVTCheckBox.jsClick();
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.nextButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
		await _PaymentsPages.VNLvtPage.approveNowBox.jsClickIfExist();
		await _PaymentsPages.VNLvtPage.pushOpion.jsClickIfExist();
		await _PaymentsPages.VNLvtPage.getChallengeButton.clickIfExist();
		await _PaymentsPages.VNLvtPage.responseCode.input("222222");
		await _PaymentsPages.VNLvtPage.submitButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
		await _PaymentsPages.VNLvtPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.VNLvtPage).isUXSuccess();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.LVTPayment.amount),
			await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeName),
			await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
		]);
	});

	it('Create an AU LVT with Approval Now without M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
		await _PaymentsPages.VNLvtPage.amount.input(testData.LVTPayment.amountA2);
		await _PaymentsPages.VNLvtPage.newPayeeTab.click();
		await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
		await _PaymentsPages.VNLvtPage.newPayeeAdd1.input(testData.LVTPayment.newPayeeAdd1);
		await _PaymentsPages.VNLvtPage.newPayeeAdd2.input(testData.LVTPayment.newPayeeAdd2);
		await _PaymentsPages.VNLvtPage.newPayeeAdd3.input(testData.LVTPayment.newPayeeAdd3);
		await _PaymentsPages.VNLvtPage.enterDetailButton.click();
		await _PaymentsPages.VNLvtPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
		await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
		await _PaymentsPages.VNLvtPage.LVTCheckBox.jsClick();
		await _PaymentsPages.VNLvtPage.nextButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
		await _PaymentsPages.VNLvtPage.approveNowBox.jsClickIfExist();
		await _PaymentsPages.VNLvtPage.pushOpion.jsClickIfExist();
		await _PaymentsPages.VNLvtPage.responseCode.input("222222");
		await _PaymentsPages.VNLvtPage.submitButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
		await _PaymentsPages.VNLvtPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.VNLvtPage).isUXSuccess();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.LVTPayment.amountA2),
			await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeName),
			await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
		]);
	});

	it('Create an AU LVT with Save as Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
		await _PaymentsPages.VNLvtPage.amount.input(testData.LVTPayment.amount);
		await _PaymentsPages.VNLvtPage.newPayeeTab.click();
		await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVTPayment.newPayeeName + generatedID());
		await _PaymentsPages.VNLvtPage.newPayeeAdd1.input(testData.LVTPayment.newPayeeAdd1);
		await _PaymentsPages.VNLvtPage.newPayeeAdd2.input(testData.LVTPayment.newPayeeAdd2);
		await _PaymentsPages.VNLvtPage.newPayeeAdd3.input(testData.LVTPayment.newPayeeAdd3);
		await _PaymentsPages.VNLvtPage.enterDetailButton.click();
		await _PaymentsPages.VNLvtPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
		await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
		await _PaymentsPages.VNLvtPage.LVTCheckBox.jsClick();
		await _PaymentsPages.VNLvtPage.nextButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
		await _PaymentsPages.VNLvtPage.saveAsTemplateCheckbox.jsClick();
		TemplateName = 'AULVT' + generatedID() + randomNumbers();
		await _PaymentsPages.VNLvtPage.templateName.input(TemplateName);
		await _PaymentsPages.VNLvtPage.submitButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
		await _PaymentsPages.VNLvtPage.getInfoReferenceID().then(text => {
			templateRef = text;
		});
		await ensure(_PaymentsPages.VNLvtPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.LVTPayment.amount)
		]);
	});

	it('Create an AU LVT from Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		//TemplateName="LVTPayment01Template";
		if (0 !== TemplateName.trim().length) {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		} else {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.LVTPayment.existingTemplate);
		}
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
		await _PaymentsPages.PaymentTemplatesPage.makeAPayment.click();
		await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
		await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			templateRef = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await lib_1.ensure(_PaymentsPages.VNLvtPage.fromAccountValue).isNotEmpty(),
			await lib_1.ensure(_PaymentsPages.VNLvtPage.amountValue).isNotEmpty(),
			await lib_1.ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).isNotEmpty(),
		]);
	});

	it('Save an AU LVT successfully As Draft', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
		await _PaymentsPages.VNLvtPage.amount.input(testData.LVTPayment.amount);
		await _PaymentsPages.VNLvtPage.newPayeeTab.click();
		await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
		await _PaymentsPages.VNLvtPage.newPayeeAdd1.input(testData.LVTPayment.newPayeeAdd1);
		await _PaymentsPages.VNLvtPage.newPayeeAdd2.input(testData.LVTPayment.newPayeeAdd2);
		await _PaymentsPages.VNLvtPage.newPayeeAdd3.input(testData.LVTPayment.newPayeeAdd3);
		await _PaymentsPages.VNLvtPage.enterDetailButton.click();
		await _PaymentsPages.VNLvtPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
		await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
		await _PaymentsPages.VNLvtPage.LVTCheckBox.jsClick();
		await _PaymentsPages.VNLvtPage.saveAsDraft.click();
		await _PaymentsPages.VNLvtPage.getDialogReferenceID().then(text => {
			paymentReference = text;
			//console.error(paymentReference);
		});
		await _PaymentsPages.VNLvtPage.dismissButton.click();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
		await Promise.all([
			await lib_1.ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
			await lib_1.ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.LVTPayment.amount),
			await lib_1.ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textIs(testData.status.Saved),
		]);
	});

	it('Create an AU LVT for Verify and Release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.VNLvtPage.loadCondition();
		await _PaymentsPages.VNLvtPage.fromAccount.select(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount);
		await _PaymentsPages.VNLvtPage.amount.input(testData.LVTPayment.amountVerify);
		await _PaymentsPages.VNLvtPage.newPayeeTab.click();
		await _PaymentsPages.VNLvtPage.newPayeeName.input(testData.LVTPayment.newPayeeName);
		await _PaymentsPages.VNLvtPage.newPayeeAdd1.input(testData.LVTPayment.newPayeeAdd1);
		await _PaymentsPages.VNLvtPage.newPayeeAdd2.input(testData.LVTPayment.newPayeeAdd2);
		await _PaymentsPages.VNLvtPage.newPayeeAdd3.input(testData.LVTPayment.newPayeeAdd3);
		await _PaymentsPages.VNLvtPage.enterDetailButton.click();
		await _PaymentsPages.VNLvtPage.bsbCodeText.input(testData.LVTPayment.bsbCode);
		await _PaymentsPages.VNLvtPage.LVTCheckBox.jsClick();
		await _PaymentsPages.VNLvtPage.newPayeeAcctNumber.input(testData.LVTPayment.newPayeeAcctNumber);
		await _PaymentsPages.VNLvtPage.nextButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForPrevewPage();
		await _PaymentsPages.VNLvtPage.submitButton.click();
		await _PaymentsPages.VNLvtPage.loadConditionForSubmittedPage();
		await _PaymentsPages.VNLvtPage.getInfoReferenceID().then(text => {
			verifyReference = text;
		});
		await ensure(_PaymentsPages.VNLvtPage).isUXSuccess();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.fromAccountValue).textContains(SIT ? testData.LVTPayment.SIT.fromAccount : testData.LVTPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.VNLvtPage.amountValue).textContains(testData.LVTPayment.amountVerify),
			await ensure(_PaymentsPages.VNLvtPage.toNewPayeeValue).textContains(testData.LVTPayment.newPayeeName),
			await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContains(testData.status.PendingVerification)
		]);
	});
});

describe('Verify And Release a Low Value Domestic', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.LVTPayment.SIT.loginCompanyId : testData.LVTPayment.UAT.loginCompanyId, SIT ? testData.LVTPayment.SIT.verifyUserId : testData.LVTPayment.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify an AU LVT via My Verify', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, verifyReference, testData.paymentType.AU_LVT).then(reference => {
			verifyReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval)
		]);
	});

	it('Release an AU LVT via My Release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== verifyReference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_LVT, testData.status.PendingApproval);
		}
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.VNLvtPage.approveButton.click();
		await _PaymentsPages.VNLvtPage.pushOpion.jsClickIfExist();
		await _PaymentsPages.VNLvtPage.getChallengeButton.clickIfExist();
		await _PaymentsPages.VNLvtPage.responseCode.input("23333");
		await _PaymentsPages.VNLvtPage.approveButton.click();
		await _PaymentsPages.VNLvtPage.getDialogReferenceID().then(text => {
			approvalReference = text;
		});
		await _PaymentsPages.VNLvtPage.loadConditionForDismissDialog();
		await _PaymentsPages.VNLvtPage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Approvals.Releases);
		await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_LVT).then(reference => {
			approvalReference = reference;
		})
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.VNLvtPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
		await _PaymentsPages.VNLvtPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.VNLvtPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});
});
