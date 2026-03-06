/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages,FilesPages } from "../../../pages/CB";
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase, generatedID } from "../../../lib";
import { browser } from 'protractor';
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let fileName = '';
let testData = _PaymentsPages.fetchTestData('AU_testData.json');
let verifyReference = "";
let templateRef = "";
let tempNewPayeeName = "";
let approvalReference = "";

describe('AU_Bulk Payment ', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Create a Bulk ACH with new Payee', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUBulkPayment);
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
		await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeName);
		await _PaymentsPages.BulkPaymentpage.enterDetailButton.click();
		await _PaymentsPages.BulkPaymentpage.bsbCodeText.input(testData.BulkPayment.bsbCode);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amount);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.isBeneAdvising.click();
		await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.BulkPayment.emailIdO);
		await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.BulkPayment.emailId1);
		await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.BulkPayment.emailId2);
		await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.BulkPayment.emailId3);
		await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.BulkPayment.emailId4);
		await _PaymentsPages.BulkPaymentpage.message.input(testData.BulkPayment.message);
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amount),
			await ensure(_PaymentsPages.BulkPaymentpage.toNewPayeeValue).textContains(testData.BulkPayment.newPayeeName),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Copy a Bulk ACH with new Payee', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
		}
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await _PaymentsPages.BulkPaymentpage.copyButton.click();
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.toNewPayeeValue).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification)
		]);
	});

	it('Edit a Bulk ACH ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
		}
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await _PaymentsPages.BulkPaymentpage.editButton.click();
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.deletePayee.jsClick();
		await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.jsClick();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeNameEdit);
		await _PaymentsPages.BulkPaymentpage.enterDetailButton.click();
		await _PaymentsPages.BulkPaymentpage.bsbCodeText.input(testData.BulkPayment.bsbCodeEdit);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountEdit);
		await _PaymentsPages.BulkPaymentpage.batchId.input("");
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amountEdit),
			await ensure(_PaymentsPages.BulkPaymentpage.toNewPayeeValue).textContains(testData.BulkPayment.newPayeeNameEdit),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Reject a Bulk ACH ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
		}
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await _PaymentsPages.BulkPaymentpage.rejectButton.click();
		await _PaymentsPages.BulkPaymentpage.reasonForRejection.input(testData.BulkPayment.rejectReason);
		await _PaymentsPages.BulkPaymentpage.rejectDialogButton.click();
		await _PaymentsPages.BulkPaymentpage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.rejectStatus).textContains(testData.status.Rejected)
		]);
	});

	it('Delete a Bulk ACH ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
		}
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await _PaymentsPages.BulkPaymentpage.deleteButton.click();
		await _PaymentsPages.BulkPaymentpage.deleteDialogButton.click();
		await _PaymentsPages.BulkPaymentpage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
		await lib_1.ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.BulkPayment.labelNoInformationDisplay);
	});

	it('Create with Approval Now with M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUBulkPayment);
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
		await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeName);
		await _PaymentsPages.BulkPaymentpage.enterDetailButton.click();
		await _PaymentsPages.BulkPaymentpage.bsbCodeText.input(testData.BulkPayment.bsbCode);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amount);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.isBeneAdvising.click();
		await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.BulkPayment.emailIdO);
		await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.BulkPayment.emailId1);
		await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.BulkPayment.emailId2);
		await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.BulkPayment.emailId3);
		await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.BulkPayment.emailId4);
		await _PaymentsPages.BulkPaymentpage.message.input(testData.BulkPayment.message);
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClickIfExist();
		await _PaymentsPages.BulkPaymentpage.pushOpion.jsClickIfExist();
		await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.BulkPayment.challengeResponse);
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amount),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Approved)
		]);
	});

	it('Create with Approval Now without M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUBulkPayment);
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
		await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeName);
		await _PaymentsPages.BulkPaymentpage.enterDetailButton.click();
		await _PaymentsPages.BulkPaymentpage.bsbCodeText.input(testData.BulkPayment.bsbCode);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA2);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.isBeneAdvising.click();
		await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.BulkPayment.emailIdO);
		await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.BulkPayment.emailId1);
		await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.BulkPayment.emailId2);
		await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.BulkPayment.emailId3);
		await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.BulkPayment.emailId4);
		await _PaymentsPages.BulkPaymentpage.message.input(testData.BulkPayment.message);
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClickIfExist();
		await _PaymentsPages.BulkPaymentpage.pushOpion.jsClickIfExist();
		await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.BulkPayment.challengeResponse);
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amountA2),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Approved)
		]);
	});

	it('Upload Bulk ACH via Files services Upload', async function () {
		// upload File start
		let paymentType = "ALL - Universal File Format";
		await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.BulkPayment.SIT.fileName : testData.BulkPayment.UAT.fileName, testData.BulkPayment.approvalOptionByTxn).then(async (data) => {
			fileName = data;
		});
		// upload File end
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.toNewPayeeValue).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval)

		]);
	});

	it('File Upload - Reject item for Bulk ACH', async function () {
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await _PaymentsPages.BulkPaymentpage.rejectButton.click();
		await _PaymentsPages.BulkPaymentpage.reasonForRejection.input(testData.BulkPayment.rejectReason);
		await _PaymentsPages.BulkPaymentpage.rejectDialogButton.click();
		await _PaymentsPages.BulkPaymentpage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.rejectStatus).textContains(testData.status.Rejected)
		]);
	});

	it('Create with Save as Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUBulkPayment);
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
		await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
		tempNewPayeeName = testData.BulkPayment.newPayeeName + generatedID();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(tempNewPayeeName);
		await _PaymentsPages.BulkPaymentpage.enterDetailButton.click();
		await _PaymentsPages.BulkPaymentpage.bsbCodeText.input(testData.BulkPayment.bsbCode);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amount);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.isBeneAdvising.click();
		await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.BulkPayment.emailIdO);
		await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.BulkPayment.emailId1);
		await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.BulkPayment.emailId2);
		await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.BulkPayment.emailId3);
		await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.BulkPayment.emailId4);
		await _PaymentsPages.BulkPaymentpage.message.input(testData.BulkPayment.message);
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.saveAsTemplateCheckbox.click();
		TemplateName = 'BULK' + generatedID();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.templateName.input(TemplateName);
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			templateRef = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

		// Check the Transaction under Transfer Center>View Page
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amount),
			await ensure(_PaymentsPages.BulkPaymentpage.toNewPayeeValue).textContains(tempNewPayeeName)

		]);
	});

	it('Check the Template under Manage Template - View Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
		await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();

		await Promise.all([
			await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.BulkPayment.amount),
			await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiary).textContains(tempNewPayeeName)
		]);
	});


	it('Create from Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		if (0 !== TemplateName.trim().length) {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		} else {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.BulkPayment.SIT.existingTemplate : testData.BulkPayment.UAT.existingTemplate);
		}
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionCreatePaymentTemplate2();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.jsClick();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			templateRef = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).isNotEmpty(),
			await ensure(_PaymentsPages.BulkPaymentpage.toNewPayeeValue).isNotEmpty()
		]);
	});

	it('Save Bulk ACH successfully As Draft', async function () {
		let paymentReference = '';
		await _PaymentsPages.openMenu(Menu.Payments.AUBulkPayment);
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
		await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeName);
		await _PaymentsPages.BulkPaymentpage.enterDetailButton.click();
		await _PaymentsPages.BulkPaymentpage.bsbCodeText.input(testData.BulkPayment.bsbCode);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amount);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.isBeneAdvising.click();
		await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.BulkPayment.emailIdO);
		await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.BulkPayment.emailId1);
		await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.BulkPayment.emailId2);
		await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.BulkPayment.emailId3);
		await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.BulkPayment.emailId4);
		await _PaymentsPages.BulkPaymentpage.message.input(testData.BulkPayment.message);

		await _PaymentsPages.BulkPaymentpage.saveAsDraft.click();
		await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
			paymentReference = text;
			//console.error(paymentReference);
		});
		await _PaymentsPages.BulkPaymentpage.dismissButton.click();
		await _PaymentsPages.BulkPaymentpage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
		await Promise.all([
			await lib_1.ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
			await lib_1.ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amount),
			await lib_1.ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Saved),
		]);
	});

	it('Create a Bulk ACH for verify and release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUBulkPayment);
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
		await _PaymentsPages.BulkPaymentpage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.newPayeeName);
		await _PaymentsPages.BulkPaymentpage.enterDetailButton.click();
		await _PaymentsPages.BulkPaymentpage.bsbCodeText.input(testData.BulkPayment.bsbCode);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountVerify);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.isBeneAdvising.click();
		await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.BulkPayment.emailIdO);
		await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.BulkPayment.emailId1);
		await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.BulkPayment.emailId2);
		await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.BulkPayment.emailId3);
		await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.BulkPayment.emailId4);
		await _PaymentsPages.BulkPaymentpage.message.input(testData.BulkPayment.message);
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			verifyReference = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amountVerify),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingVerification)
		]);
	});
});

describe('Verify And Release A Bulk ACH', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.verifyUserId : testData.BulkPayment.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify a Bulk ACH via My Verify', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, verifyReference, testData.paymentType.AU_BPAY).then(reference => {
			verifyReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(verifyReference);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
		]);
	});

	it('Approve a Bulk ACH ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== verifyReference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
		}
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await _PaymentsPages.BulkPaymentpage.approveButton.click();
		await _PaymentsPages.BulkPaymentpage.pushOpion.jsClickIfExist();
		await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.BulkPayment.challengeResponse);
		await _PaymentsPages.BulkPaymentpage.approveButton.click();
		await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
			approvalReference = text;
		});
		await _PaymentsPages.BulkPaymentpage.loadConditionForDismissDialog();
		await _PaymentsPages.BulkPaymentpage.dismissButton.click();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(approvalReference);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
		]);
	});

	it('Release a Bulk ACH via My Release', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_BPAY).then(reference => {
			approvalReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(approvalReference);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received),
		]);
	});
});
