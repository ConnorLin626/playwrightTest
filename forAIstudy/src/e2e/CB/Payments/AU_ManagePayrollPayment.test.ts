/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages, FilesPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { ensure, SIT, handlerCase, generatedID, randomNumbers } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData("AU_testData.json");
let verifyReference = "";
let templateRef = "";
let fileName = "";
let tempNewPayeeName = "";
let approvalReference = "";

describe("AU_MPayroll Payment", async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {
		await new NavigatePages().loginCB(SIT ? testData.MPayrollPayment.SIT.loginCompanyId : testData.MPayrollPayment.UAT.loginCompanyId, SIT ? testData.MPayrollPayment.SIT.loginUserId : testData.MPayrollPayment.UAT.loginUserId);
	});
	const suitObject = this;
	beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
		handlerCase(suitObject, this);
	});

	it('Create a MPayroll Payment  with new Payee', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUMPayrollPayment);
		await _PaymentsPages.PayrollPage.loadCondition();
		await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount);
		await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.PayrollPage.newPayeeName.input(testData.MPayrollPayment.newPayeeName);
		await _PaymentsPages.PayrollPage.enterDetailButton.click();
		await _PaymentsPages.PayrollPage.bsbCodeText.input(testData.MPayrollPayment.bsbCode);
		await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.MPayrollPayment.newPayeeAcctNumber);
		await _PaymentsPages.PayrollPage.newPayeeButton.click();
		await _PaymentsPages.PayrollPage.amount.input(testData.MPayrollPayment.amount);
		await _PaymentsPages.PayrollPage.payeeRef.input(testData.MPayrollPayment.ReferenceForPayee);
		await _PaymentsPages.PayrollPage.showoptionaldetailsPayee1.jsClick();
		await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
		await _PaymentsPages.PayrollPage.emailIdO.input(testData.MPayrollPayment.emailIdO);
		await _PaymentsPages.PayrollPage.emailId1.input(testData.MPayrollPayment.emailId1);
		await _PaymentsPages.PayrollPage.emailId2.input(testData.MPayrollPayment.emailId2);
		await _PaymentsPages.PayrollPage.emailId3.input(testData.MPayrollPayment.emailId3);
		await _PaymentsPages.PayrollPage.emailId4.input(testData.MPayrollPayment.emailId4);
		await _PaymentsPages.PayrollPage.message.input(testData.MPayrollPayment.message);
		await _PaymentsPages.PayrollPage.nextButton.click();
		await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
		await _PaymentsPages.PayrollPage.submitButton.click();
		await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.MPayrollPayment.amount),
			await ensure(_PaymentsPages.PayrollPage.toNewPayeeValue).textContains(testData.MPayrollPayment.newPayeeName),
			await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Copy a MPayroll Payment with new Payee', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_MPYRL, testData.status.PendingApproval);
		}
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.PayrollPage.copyButton.click();
		await _PaymentsPages.PayrollPage.loadCondition();
		await _PaymentsPages.PayrollPage.nextButton.click();
		await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
		await _PaymentsPages.PayrollPage.submitButton.click();
		await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
			await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
			await ensure(_PaymentsPages.PayrollPage.toNewPayeeValue).isNotEmpty()
		]);
	});

	it('Edit a MPayroll Payment ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_MPYRL, testData.status.PendingApproval);
		}
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.PayrollPage.editButton.click();
		await _PaymentsPages.PayrollPage.loadCondition();
		await _PaymentsPages.PayrollPage.deletePayee.jsClick();
		await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.jsClick();
		await _PaymentsPages.PayrollPage.newPayeeName.input(testData.MPayrollPayment.newPayeeNameEdit);
		await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.MPayrollPayment.SIT.payeeBankIDEdit : testData.MPayrollPayment.UAT.payeeBankIDEdit);
		await _PaymentsPages.PayrollPage.enterDetailButton.click();
		await _PaymentsPages.PayrollPage.bsbCodeText.input(testData.MPayrollPayment.bsbCodeEdit);
		await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.MPayrollPayment.newPayeeAcctNumber);
		await _PaymentsPages.PayrollPage.newPayeeButton.click();
		await _PaymentsPages.PayrollPage.amount.input(testData.MPayrollPayment.amountEdit);
		await _PaymentsPages.PayrollPage.batchId.input("");
		await _PaymentsPages.PayrollPage.nextButton.click();
		await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
		await _PaymentsPages.PayrollPage.submitButton.click();
		await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
			await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
			await ensure(_PaymentsPages.PayrollPage.toNewPayeeValue).textContains(testData.MPayrollPayment.newPayeeNameEdit),
			await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Reject a MPayroll Payment ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_MPYRL, testData.status.PendingApproval);
		}
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.PayrollPage.rejectButton.click();
		await _PaymentsPages.PayrollPage.reasonForRejection.input(testData.MPayrollPayment.rejectReason);
		await _PaymentsPages.PayrollPage.rejectDialogButton.click();
		await _PaymentsPages.PayrollPage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.rejectStatus).textContains(testData.status.Rejected)
		]);
	});

	it('Delete a MPayroll Payment ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_MPYRL, testData.status.PendingApproval);
		}
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.PayrollPage.deleteButton.click();
		await _PaymentsPages.PayrollPage.deleteDialogButton.click();
		await _PaymentsPages.PayrollPage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
		await lib_1.ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.MPayrollPayment.labelNoInformationDisplay);
	});

	it("Create with Approval Now with M-Chanllenge", async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUMPayrollPayment);
		await _PaymentsPages.PayrollPage.loadCondition();
		await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount);
		await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.PayrollPage.newPayeeName.input(testData.MPayrollPayment.newPayeeName);
		await _PaymentsPages.PayrollPage.enterDetailButton.click();
		await _PaymentsPages.PayrollPage.bsbCodeText.input(testData.MPayrollPayment.bsbCode);
		await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.MPayrollPayment.newPayeeAcctNumber);
		await _PaymentsPages.PayrollPage.newPayeeButton.click();
		await _PaymentsPages.PayrollPage.amount.input(testData.MPayrollPayment.amount);
		await _PaymentsPages.PayrollPage.payeeRef.input(testData.MPayrollPayment.ReferenceForPayee);
		await _PaymentsPages.PayrollPage.showoptionaldetailsPayee1.jsClick();
		await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
		await _PaymentsPages.PayrollPage.emailIdO.input(testData.MPayrollPayment.emailIdO);
		await _PaymentsPages.PayrollPage.emailId1.input(testData.MPayrollPayment.emailId1);
		await _PaymentsPages.PayrollPage.emailId2.input(testData.MPayrollPayment.emailId2);
		await _PaymentsPages.PayrollPage.emailId3.input(testData.MPayrollPayment.emailId3);
		await _PaymentsPages.PayrollPage.emailId4.input(testData.MPayrollPayment.emailId4);
		await _PaymentsPages.PayrollPage.message.input(testData.MPayrollPayment.message);
		await _PaymentsPages.PayrollPage.nextButton.click();
		await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
		await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClickIfExist();
		await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
		await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.PayrollPage.challengeResponse.input("34234");
		await _PaymentsPages.PayrollPage.submitButton.click();
		await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.MPayrollPayment.amount),
			await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.Approved)
		]);
	});

	it("Create with Approval Now without M-Chanllenge", async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUMPayrollPayment);
		await _PaymentsPages.PayrollPage.loadCondition();
		await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount);
		await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.PayrollPage.newPayeeName.input(testData.MPayrollPayment.newPayeeName);
		await _PaymentsPages.PayrollPage.enterDetailButton.click();
		await _PaymentsPages.PayrollPage.bsbCodeText.input(testData.MPayrollPayment.bsbCode);
		await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.MPayrollPayment.newPayeeAcctNumber);
		await _PaymentsPages.PayrollPage.newPayeeButton.click();
		await _PaymentsPages.PayrollPage.amount.input(testData.MPayrollPayment.amountA2);
		await _PaymentsPages.PayrollPage.payeeRef.input(testData.MPayrollPayment.ReferenceForPayee);
		await _PaymentsPages.PayrollPage.showoptionaldetailsPayee1.jsClick();
		await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
		await _PaymentsPages.PayrollPage.emailIdO.input(testData.MPayrollPayment.emailIdO);
		await _PaymentsPages.PayrollPage.emailId1.input(testData.MPayrollPayment.emailId1);
		await _PaymentsPages.PayrollPage.emailId2.input(testData.MPayrollPayment.emailId2);
		await _PaymentsPages.PayrollPage.emailId3.input(testData.MPayrollPayment.emailId3);
		await _PaymentsPages.PayrollPage.emailId4.input(testData.MPayrollPayment.emailId4);
		await _PaymentsPages.PayrollPage.message.input(testData.MPayrollPayment.message);
		await _PaymentsPages.PayrollPage.nextButton.click();
		await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
		await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClickIfExist();
		await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
		await _PaymentsPages.PayrollPage.challengeResponse.input("34234");
		await _PaymentsPages.PayrollPage.submitButton.click();
		await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
		await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.MPayrollPayment.amountA2),
			await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.Approved)
		]);
	});

	it('Upload MPayroll Payment via Upload File', async function () {
		// upload File start
		let paymentType = "ALL - Universal File Format";
		await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.MPayrollPayment.SIT.fileName : testData.MPayrollPayment.UAT.fileName, testData.MPayrollPayment.approvalOptionByTxn).then(async (data) => {
			fileName = data;
		});
		// upload File end
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
			await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
			await ensure(_PaymentsPages.PayrollPage.toNewPayeeValue).isNotEmpty()
		]);
	});

	it('File Upload - Reject item for MPayroll Payment ', async function () {
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.PayrollPage.rejectButton.click();
		await _PaymentsPages.PayrollPage.reasonForRejection.input(testData.MPayrollPayment.rejectReason);
		await _PaymentsPages.PayrollPage.rejectDialogButton.click();
		await _PaymentsPages.PayrollPage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.rejectStatus).textContains(testData.status.Rejected)
		]);
	});

	it('Create with Save as Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUMPayrollPayment);
		await _PaymentsPages.PayrollPage.loadCondition();
		await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount);
		await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
		tempNewPayeeName = testData.MPayrollPayment.newPayeeName + generatedID();
		await _PaymentsPages.PayrollPage.newPayeeName.input(tempNewPayeeName);
		await _PaymentsPages.PayrollPage.enterDetailButton.click();
		await _PaymentsPages.PayrollPage.bsbCodeText.input(testData.MPayrollPayment.bsbCode);
		await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.MPayrollPayment.newPayeeAcctNumber);
		await _PaymentsPages.PayrollPage.newPayeeButton.click();
		await _PaymentsPages.PayrollPage.amount.input(testData.MPayrollPayment.amount);
		await _PaymentsPages.PayrollPage.payeeRef.input(testData.MPayrollPayment.ReferenceForPayee);
		await _PaymentsPages.PayrollPage.showoptionaldetailsPayee1.jsClick();
		await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
		await _PaymentsPages.PayrollPage.emailIdO.input(testData.MPayrollPayment.emailIdO);
		await _PaymentsPages.PayrollPage.emailId1.input(testData.MPayrollPayment.emailId1);
		await _PaymentsPages.PayrollPage.emailId2.input(testData.MPayrollPayment.emailId2);
		await _PaymentsPages.PayrollPage.emailId3.input(testData.MPayrollPayment.emailId3);
		await _PaymentsPages.PayrollPage.emailId4.input(testData.MPayrollPayment.emailId4);
		await _PaymentsPages.PayrollPage.message.input(testData.MPayrollPayment.message);
		await _PaymentsPages.PayrollPage.nextButton.click();
		await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
		await _PaymentsPages.PayrollPage.saveAsTemplateCheckbox.jsClick();
		TemplateName = 'AUMP' + generatedID() + randomNumbers();
		console.log(TemplateName);
		await _PaymentsPages.PayrollPage.templateName.input(TemplateName);
		await _PaymentsPages.PayrollPage.submitButton.click();
		await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
			templateRef = text;
		});
		await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.MPayrollPayment.amount),
			await ensure(_PaymentsPages.PayrollPage.toNewPayeeValue).textContains(tempNewPayeeName),
		]);
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
		await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.MPayrollPayment.amount),
			await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiary).textContains(tempNewPayeeName),
		]);
	});

	it('Create from Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		if (0 !== TemplateName.trim().length) {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		} else {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.MPayrollPayment.SIT.existingTemplate : testData.MPayrollPayment.UAT.existingTemplate);
		}
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionCreatePaymentTemplate2();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			templateRef = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
			await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
			await ensure(_PaymentsPages.PayrollPage.toNewPayeeValue).isNotEmpty(),
		]);
	});

	it('Save MPayroll Payment successfully As Draft', async function () {
		let paymentReference = '';
		await _PaymentsPages.openMenu(Menu.Payments.AUMPayrollPayment);
		await _PaymentsPages.PayrollPage.loadCondition();
		await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount);
		await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.PayrollPage.newPayeeName.input(testData.MPayrollPayment.newPayeeName);
		await _PaymentsPages.PayrollPage.enterDetailButton.click();
		await _PaymentsPages.PayrollPage.bsbCodeText.input(testData.MPayrollPayment.bsbCode);
		await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.MPayrollPayment.newPayeeAcctNumber);
		await _PaymentsPages.PayrollPage.newPayeeButton.click();
		await _PaymentsPages.PayrollPage.amount.input(testData.MPayrollPayment.amount);
		await _PaymentsPages.PayrollPage.payeeRef.input(testData.MPayrollPayment.ReferenceForPayee);
		await _PaymentsPages.PayrollPage.showoptionaldetailsPayee1.jsClick();
		await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
		await _PaymentsPages.PayrollPage.emailIdO.input(testData.MPayrollPayment.emailIdO);
		await _PaymentsPages.PayrollPage.emailId1.input(testData.MPayrollPayment.emailId1);
		await _PaymentsPages.PayrollPage.emailId2.input(testData.MPayrollPayment.emailId2);
		await _PaymentsPages.PayrollPage.emailId3.input(testData.MPayrollPayment.emailId3);
		await _PaymentsPages.PayrollPage.emailId4.input(testData.MPayrollPayment.emailId4);
		await _PaymentsPages.PayrollPage.message.input(testData.MPayrollPayment.message);

		await _PaymentsPages.PayrollPage.saveAsDraft.click();
		await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
			paymentReference = text;
			console.error(paymentReference);
		});
		await _PaymentsPages.PayrollPage.dismissButton.click();
		await _PaymentsPages.PayrollPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
		await Promise.all([
			await lib_1.ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount),
			await lib_1.ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.MPayrollPayment.amount),
			await lib_1.ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.Saved),
		]);
	});

	it('Create a MPayroll Payment for verify and release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUMPayrollPayment);
		await _PaymentsPages.PayrollPage.loadCondition();
		await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount);
		await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.PayrollPage.newPayeeName.input(testData.MPayrollPayment.newPayeeName);
		await _PaymentsPages.PayrollPage.enterDetailButton.click();
		await _PaymentsPages.PayrollPage.bsbCodeText.input(testData.MPayrollPayment.bsbCode);
		await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.MPayrollPayment.newPayeeAcctNumber);
		await _PaymentsPages.PayrollPage.newPayeeButton.click();
		await _PaymentsPages.PayrollPage.amount.input(testData.MPayrollPayment.amountVerify);
		await _PaymentsPages.PayrollPage.payeeRef.input(testData.MPayrollPayment.ReferenceForPayee);
		await _PaymentsPages.PayrollPage.showoptionaldetailsPayee1.jsClick();
		await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
		await _PaymentsPages.PayrollPage.emailIdO.input(testData.MPayrollPayment.emailIdO);
		await _PaymentsPages.PayrollPage.emailId1.input(testData.MPayrollPayment.emailId1);
		await _PaymentsPages.PayrollPage.emailId2.input(testData.MPayrollPayment.emailId2);
		await _PaymentsPages.PayrollPage.emailId3.input(testData.MPayrollPayment.emailId3);
		await _PaymentsPages.PayrollPage.emailId4.input(testData.MPayrollPayment.emailId4);
		await _PaymentsPages.PayrollPage.message.input(testData.MPayrollPayment.message);
		await _PaymentsPages.PayrollPage.nextButton.click();
		await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
		await _PaymentsPages.PayrollPage.submitButton.click();
		await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
			verifyReference = text;
		});
		await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.MPayrollPayment.SIT.fromAccount : testData.MPayrollPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.MPayrollPayment.amountVerify)
		]);
	});
});

describe('Verify And Release A MPayroll Payment', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.MPayrollPayment.SIT.loginCompanyId : testData.MPayrollPayment.UAT.loginCompanyId, SIT ? testData.MPayrollPayment.SIT.verifyUserId : testData.MPayrollPayment.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify a MPayroll Payment via My Verify', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, verifyReference, testData.paymentType.AU_MPYRL).then(reference => {
			verifyReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(verifyReference);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
		]);
	});

	it('Approve a MPayroll Payment', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== verifyReference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_MPYRL, testData.status.PendingApproval);
		}
		await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.PayrollPage.approveButton.click();
		await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.PayrollPage.challengeResponse.input(testData.MPayrollPayment.challengeResponse);
		await _PaymentsPages.PayrollPage.approveButton.click();
		await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
			approvalReference = text;
		});
		await _PaymentsPages.PayrollPage.loadConditionForDismissDialog();
		await _PaymentsPages.PayrollPage.dismissButton.click();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(approvalReference);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});
	it('Release a MPayroll Payment via My Release', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_MPYRL).then(reference => {
			approvalReference = reference;
		});;
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(approvalReference);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});
});
