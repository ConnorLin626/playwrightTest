/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import {ApprovalsPages, NavigatePages, PaymentsPages} from "../../../pages/CB";
import {Menu} from "../../../config/menu";
import {ensure, SIT, handlerCase, generatedID} from "../../../lib";
import {browser} from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
let _FilesPages = new CB_1.FilesPages();
let fileName = "";
let testData = _PaymentsPages.fetchTestData("UK_testData.json");
let verifyReference = "";
let templateRef = "";
let tempNewPayeeName = "";
let approvalReference = "";

describe("UK Account Transfer Payment", async function() {
	this.retries(browser.params.caseRetryTimes);
	before(async function() {
		await new NavigatePages().loginCB(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId);
	});
	const suitObject = this;
	beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function() {
		handlerCase(suitObject, this);
	});

	it('Create a Account Transfer with new Payee', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
		await _PaymentsPages.AccountTransferPage.loadCondition();
		await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
		await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount1);
		await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
		await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
		await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
		await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount1),
			await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).textContains(testData.AccountTransfer.newPayeeName),
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Copy a Account Transfer', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_ACT, testData.status.PendingApproval);
		}
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await _PaymentsPages.AccountTransferPage.copyButton.click();
		await _PaymentsPages.AccountTransferPage.loadCondition();
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
			await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).isNotEmpty(),
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).isNotEmpty()
		]);
	});

	it('Edit a Account Transfer ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_ACT, testData.status.PendingApproval);
		}
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await _PaymentsPages.AccountTransferPage.editButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForEdit();
		await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountEdit);
		await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeNameEdit);
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
			await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).isNotEmpty()
		]);
	});

	it('Reject a Account Transfer ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_ACT, testData.status.PendingApproval);
		}
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await _PaymentsPages.AccountTransferPage.rejectButton.click();
		await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.AccountTransfer.rejectReason);
		await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
		await _PaymentsPages.AccountTransferPage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContains(testData.status.Rejected)
		]);
	});

	it('Delete a Account Transfer', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_ACT, testData.status.PendingApproval);
		}
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await _PaymentsPages.AccountTransferPage.deleteButton.click();
		await _PaymentsPages.AccountTransferPage.deleteDialogButton.click();
		await _PaymentsPages.AccountTransferPage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
		await lib_1.ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.AccountTransfer.labelNoInformationDisplay);
	});

	it("Approve a Account Transfer", async function() {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference2.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_ACT, testData.status.PendingApproval);
		}
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await _PaymentsPages.AccountTransferPage.approveButton.click();
		await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.AccountTransfer.challengeCode);
		await _PaymentsPages.AccountTransferPage.loadConditionforApprovalSection();
		await _PaymentsPages.AccountTransferPage.approveButton.jsClick();
		await _PaymentsPages.AccountTransferPage.loadConditionForDismissDialog();
		await _PaymentsPages.AccountTransferPage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.Approved,testData.status.Received,testData.status.Completed, testData.status.BankRejected,testData.status.PartialApproved)
		]);
	});

	it('Create with Approval Now with mChanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
		await _PaymentsPages.AccountTransferPage.loadCondition();
		await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
		await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount1);
		await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
		await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
		await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
		await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.approveNowCheckBox.jsClickIfExist();
		await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
		await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.AccountTransfer.challengeCode);
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount1),
			await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).textContains(testData.AccountTransfer.newPayeeName),
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)

		]);
	});

	it('Create with Approval Now without mChanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
		await _PaymentsPages.AccountTransferPage.loadCondition();
		await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
		await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount2);
		await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
		await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
		await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
		await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.approveNowCheckBox.jsClickIfExist();
		await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
		await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.AccountTransfer.challengeCode);
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount2),
			await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).textContains(testData.AccountTransfer.newPayeeName),
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});

	it('Create with Save as Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
		await _PaymentsPages.AccountTransferPage.loadCondition();
		await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
		await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount1);
		await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
		tempNewPayeeName = testData.AccountTransfer.newPayeeName+generatedID();
		await _PaymentsPages.AccountTransferPage.newPayeeName.input(tempNewPayeeName);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
		await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
		await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.saveAsTemplateCheckbox.jsClick();
		TemplateName = 'UKACT' + generatedID();
		await _PaymentsPages.AccountTransferPage.templateName.input(TemplateName);
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			templateRef = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

		// Check the Transaction under Transfer Center>View Page
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amount1),
			await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeValue).textContains(tempNewPayeeName)
		]);
	});

	it('Check the Template under Manage Template to View Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
		await _PaymentsPages.PaymentTemplatesPage.loadConditionForACTtempViewPayge();

		await Promise.all([
			await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccountACT).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.PaymentTemplatesPage.amountACT).textContains(testData.AccountTransfer.amount1),
			await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameACT).textContains(tempNewPayeeName)
		]);
	});

	it('Create from Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		if (0 !== TemplateName.trim().length) {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		} else {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.AccountTransfer.SIT.existingTemplate : testData.AccountTransfer.UAT.existingTemplate);
		}
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
			await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeValue).isNotEmpty()
		]);
	});

	it('Save a Account Transfer successfully As Draft', async function () {
		let paymentReference = '';
		await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
		await _PaymentsPages.AccountTransferPage.loadCondition();
		await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
		await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amount1);
		await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
		await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName+generatedID());
		await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
		await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
		await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
		await _PaymentsPages.AccountTransferPage.saveAsDraft.click();
		await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
			paymentReference = text;
		});
		await _PaymentsPages.AccountTransferPage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContains(testData.status.Saved)
		]);
	});

	it('Upload Account Transfer via Files to File Upload to Upload Files', async function () {
		// upload File start
		await _FilesPages.uploadFilePage.fsUpload(_FilesPages, testData.AccountTransfer.fileType, testData.AccountTransfer.fileFormat, lib_1.SIT ? testData.AccountTransfer.SIT.fileName : testData.AccountTransfer.UAT.fileName, testData.AccountTransfer.approvalOptionByTxn).then(async (data) => {
			fileName = data;
		});
		// upload File
		//await console.log('fileName'+fileName);
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
			await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).isNotEmpty(),
		]);
	});

	it('Create a Account Transfer for verify and release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
		await _PaymentsPages.AccountTransferPage.loadCondition();
		await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
		await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountVerify);
		await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
		await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
		await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
		await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
		await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
		await _PaymentsPages.AccountTransferPage.nextButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
		await _PaymentsPages.AccountTransferPage.submitButton.click();
		await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
			verifyReference = text;
		});
		await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountVerify),
			await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).textContains(testData.AccountTransfer.newPayeeName),
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContains(testData.status.PendingVerification)
		]);
	});
});

describe('Verify And Release A Account Transfer', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.AccountTransfer.SIT.loginCompanyId: testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.verifyUserId : testData.AccountTransfer.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify a Account Transfer via My Verify', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages,verifyReference,testData.paymentType.AU_ACT).then(reference => {
			verifyReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Release a Account Transfer via My Release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== verifyReference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_ACT, testData.status.PendingApproval);
		}
		await _PaymentsPages.AccountTransferPage.approveButton.click();
		await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.AccountTransfer.challengeCode);
		await _PaymentsPages.AccountTransferPage.approveButton.click();
		await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
			approvalReference = text;
		});
		await _PaymentsPages.AccountTransferPage.loadConditionForDismissDialog();
		await _PaymentsPages.AccountTransferPage.dismissButton.click();
		await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages,verifyReference,approvalReference,testData.paymentType.UK_ACT).then(reference => {
			approvalReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
		await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});
});

