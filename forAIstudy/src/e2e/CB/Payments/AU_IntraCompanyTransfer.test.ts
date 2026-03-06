/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages, FilesPages } from "../../../pages/CB";
import { Menu } from '../../../config/menu';
import { ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
// this from OnlineCreate, then Reject/Edit/Delete
let reference = '';
// this from createFromTemplate,then copy
let reference2 = '';
// this from copy,then Verify/Approval/Release
let reference3 = '';
let verifyReference = '';
let approvalReference = '';
let templateName = '';
let paymentReference = '';
let fileName = '';
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
let _FilesPages = new FilesPages();
const protractor_1 = require("protractor");
let testData = _PaymentsPages.fetchTestData('AU_testData.json');

describe('AU_IntraCompanyTransfer', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.loginUserId : testData.IntraCompanyTransfer.UAT.loginUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Create an ICT Payment', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
		await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteButton.jsClick();
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
		]);
	});

	it('Copy an ICT Payment', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
		}
		await _PaymentsPages.intraCompanyTransferPage.copyButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForCopy();
		await _PaymentsPages.intraCompanyTransferPage.amount.clean();
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountV);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForCopy();
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).isNotEmpty(),
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
		]);
	});
	it('Reject an ICT Payment via Transfer Center', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
		}
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await _PaymentsPages.intraCompanyTransferPage.rejectButton.click();
		await _PaymentsPages.intraCompanyTransferPage.reasonForRejection.input('reasonForRejection');
		await _PaymentsPages.intraCompanyTransferPage.rejectDialogButton.click();
		await _PaymentsPages.intraCompanyTransferPage.getDialogReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXRejectDialogSuccess();
		await _PaymentsPages.intraCompanyTransferPage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textIs(testData.status.Rejected),
		]);
	});

	it('Delete an ICT Payment via Transfer Center', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
		}
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await _PaymentsPages.intraCompanyTransferPage.deleteButton.click();
		await _PaymentsPages.intraCompanyTransferPage.deleteDialogButton.click();
		await _PaymentsPages.intraCompanyTransferPage.getDialogReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXRejectDialogSuccess();
		await _PaymentsPages.intraCompanyTransferPage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

		await Promise.all([
			await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs('No information to display'),
		]);
	});
	it('Edit an ICT Payment via Transfer Center', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference2.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
		}
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await _PaymentsPages.intraCompanyTransferPage.editButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForEdit();
		await _PaymentsPages.intraCompanyTransferPage.amount.clean();
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.editAmount);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForEdit();
		await _PaymentsPages.intraCompanyTransferPage.modifyNextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			reference3 = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).isNotEmpty(),
		]);
	});
	it('Create ICT with Approva Now with M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
		await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteButton.jsClick();
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.approvalNowCheckBox.jsClick();
		// await _PaymentsPages.intraCompanyTransferPage.pushOption.jsClick();
		await ensure(_PaymentsPages.intraCompanyTransferPage.getChallenge).isVisible();
		await _PaymentsPages.intraCompanyTransferPage.getChallenge.click();
		await _PaymentsPages.intraCompanyTransferPage.challengeResponse.input('123123123');
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			paymentReference = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
		]);
	});

	it('Create ICT with Approva Now without M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
		await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA2);
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteButton.jsClick();
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.approvalNowCheckBox.jsClick();
		// await _PaymentsPages.intraCompanyTransferPage.pushOption.jsClick();
		await _PaymentsPages.intraCompanyTransferPage.challengeResponse.input('123123');
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			paymentReference = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PartialApproved),
		]);
	});

	it('Create ICT with Save as Tempalte', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
		await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccountWithFCY : testData.IntraCompanyTransfer.UAT.toAccountWithFCY);
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteButton.jsClick();
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.saveAsTemplateCheckbox.jsClick();
		templateName = 'ICTtemp' + generatedID();
		await _PaymentsPages.intraCompanyTransferPage.templateName.input(templateName);
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			paymentReference = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
		]);

		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
		await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTTemplatePage();

		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.viewTemplateName).textIs(templateName),
			await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.intraCompanyTransferPage.viewTemplateAmount).textContains(testData.IntraCompanyTransfer.amountA1),
		]);
	});

	it('Create an ICT Payment from template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		if (0 !== templateName.trim().length) {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
		} else {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.IntraCompanyTransfer.SIT.existingTemplate : testData.IntraCompanyTransfer.UAT.existingTemplate);
		}
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForCreateICTFromTemplatePage();
		await _PaymentsPages.intraCompanyTransferPage.amount.clean();
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountV);
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).isNotEmpty(),
		]);
	});

	it('Create an ICT with Save as Draft', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
		await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteButton.jsClick();
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.transactionNote);
		await _PaymentsPages.intraCompanyTransferPage.saveAsDraft.click();
		await _PaymentsPages.intraCompanyTransferPage.getDialogReferenceID().then(text => {
			paymentReference = text;
		});
		await _PaymentsPages.intraCompanyTransferPage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textIs(testData.status.Saved),
		]);
	});

	it('Upload ICT via Upload Files', async function () {
		// upload File start
		let paymentType = "ALL - Universal File Format";
		await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.IntraCompanyTransfer.SIT.fileName : testData.IntraCompanyTransfer.UAT.fileName, testData.IntraCompanyTransfer.approvalOptionByTxn).then(async (data) => {
			fileName = data;
		});
		// upload File end
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccountUpload : testData.IntraCompanyTransfer.UAT.fromAccountUpload),
			await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountUpload),
			await ensure(_PaymentsPages.intraCompanyTransferPage.toAccountValue).textContains(testData.IntraCompanyTransfer.toAccountUpload),
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textContains(testData.status.PendingApproval),
		]);
	});

	// it('Upload ICT via Upload Profiles', async function () {
	// 	// go to upload profile
	// 	await uploadProfilesForBulk(SIT ? testData.IntraCompanyTransfer.SIT.fileName : testData.IntraCompanyTransfer.UAT.fileName);
	// });

	it('Create a Intra-Company Transfer For Veriry and Release', async function () {
		//create an ICT Payment for Verify and Realease
		await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGIntraCompanyTransafer);
		await _PaymentsPages.intraCompanyTransferPage.loadCondition();
		await _PaymentsPages.intraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
		await _PaymentsPages.intraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
		await _PaymentsPages.intraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountVerify);
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteButton.jsClick();
		await _PaymentsPages.intraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
		await _PaymentsPages.intraCompanyTransferPage.nextButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForPreviewPage();
		await _PaymentsPages.intraCompanyTransferPage.submitButton.click();
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForSubmittedPage();
		await _PaymentsPages.intraCompanyTransferPage.getInfoReferenceID().then(text => {
			verifyReference = text;
		});
		await ensure(_PaymentsPages.intraCompanyTransferPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountVerify),
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingVerification),
		]);
	});
});

export async function uploadProfilesForBulk(tempName: string) {
	console.log("temp = " + tempName);
	await _FilesPages.openMenu(Menu.Files.UploadProfiles);
	await _FilesPages.uploadProfilePage.loadCondition();
	await _FilesPages.uploadProfilePage.action.select('Execute');
	// await _FilesPages.uploadProfilePage.fileName.select(SIT ? testData.PaymentImport.SIT.fileName : testData.PaymentImport.UAT.fileName);
	await _FilesPages.uploadProfilePage.fileName.select(tempName).then((data) => {
		let pos: number = data.lastIndexOf('/');
		fileName = data.substr(pos + 1);
		//console.log("fileName = " + fileName);
	});
	await _FilesPages.uploadProfilePage.uploadFileButton.click();
	await protractor_1.browser.sleep(8000);
	await _FilesPages.openMenu(Menu.Payments.TransferCenter);
	await _FilesPages.transferCentersPage.transferCenterfilter.input(fileName);
	await _FilesPages.transferCentersPage.loadCondition();
	await _FilesPages.transferCentersPage.referenceLink.click();
	await _FilesPages.uploadProfilePage.loadConditionforViewICTPaymentPage();

	await Promise.all([
		await ensure(_PaymentsPages.intraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccountUpload : testData.IntraCompanyTransfer.UAT.fromAccountUpload),
		await ensure(_PaymentsPages.intraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountUpload),
		await ensure(_PaymentsPages.intraCompanyTransferPage.toAccountValue).textContains(testData.IntraCompanyTransfer.toAccountUpload),
		await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textContains(testData.status.PendingApproval),
	]);
}
describe('AU_IntraCompanyTransfer_Approvals', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.verifyUserId : testData.IntraCompanyTransfer.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify an ICT Payment via My Verify', async function () {
		//'Verify an ICT Payment via My Verify
		await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, verifyReference, testData.paymentType.AU_ICT).then(reference => {
			verifyReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Release an ICT Payment via My Release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== verifyReference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_ICT, testData.status.PendingApproval);
		}
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await _PaymentsPages.intraCompanyTransferPage.approveButton.click();
		await _PaymentsPages.intraCompanyTransferPage.getChallenge.jsClickIfExist();
		await _PaymentsPages.intraCompanyTransferPage.challengeResponse.input('123123');
		await _PaymentsPages.intraCompanyTransferPage.approveButton.click();
		await _PaymentsPages.intraCompanyTransferPage.getDialogReferenceID().then(text => {
			approvalReference = text;
		});
		await _PaymentsPages.intraCompanyTransferPage.dismissButton.click();
		await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_ICT).then(reference => {
			approvalReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
		await _PaymentsPages.intraCompanyTransferPage.loadConditionForViewICTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.intraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});
});
