/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { FilesPages, NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/CB";
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser, ExpectedConditions } from "protractor";

let reference = "";
let templateName = "FASTBulkT" + generatedID();
let fileName = "";
let verifyFileName = "";

const _PaymentsPages = new PaymentsPages();
const _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
const testData = _PaymentsPages.fetchTestData('SG_testData.json');

export async function commonPre() {
	await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
	await _PaymentsPages.BulkPaymentpage.loadCondition();
	await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount);
}

export async function commonAfter() {
	await _PaymentsPages.BulkPaymentpage.nextButton.click();
	await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
	await _PaymentsPages.BulkPaymentpage.submitButton.click();
	await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
	await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
		reference = text;
	});
	await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
	await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
	await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
	await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
}

export async function addExistingPayee(name: string, amount: string, payeeRef: string) {
	await _PaymentsPages.BulkPaymentpage.loadCondition();
	await browser.sleep(3000);
	await _PaymentsPages.BulkPaymentpage.filterExistingPayee.input(name);
	await _PaymentsPages.BulkPaymentpage.addpayee.click();
	await _PaymentsPages.BulkPaymentpage.amount.input(amount);
	await _PaymentsPages.BulkPaymentpage.payeeRef.input(payeeRef);
}

export async function addNewPayNow() {
	await _PaymentsPages.BulkPaymentpage.newPayNow.click();
	await _PaymentsPages.BulkPaymentpage.proxyTypeMobNum.input(testData.FastBulkPayment.proxyTypeMobNum);
	await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
	await browser.wait(ExpectedConditions.visibilityOf(_PaymentsPages.BulkPaymentpage.amount.element), _PaymentsPages.BulkPaymentpage.amount.getTimeOut());
	await _PaymentsPages.BulkPaymentpage.amount.input(testData.FastBulkPayment.amountA1);
	await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.FastBulkPayment.payeeRef);
}

export async function addNewPayee() {
	await _PaymentsPages.BulkPaymentpage.newPayee.click();
	await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.FastBulkPayment.payeeName);
	await _PaymentsPages.BulkPaymentpage.payeeBankID.select(SIT ? testData.FastBulkPayment.SIT.payeeBankID : testData.FastBulkPayment.UAT.payeeBankID);
	await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.FastBulkPayment.accountNumber);
	await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
	await _PaymentsPages.BulkPaymentpage.amount.input(testData.FastBulkPayment.amountA1);
	await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.FastBulkPayment.payeeRef);
	await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
	await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.FastBulkPayment.paymentDetails);
	await _PaymentsPages.BulkPaymentpage.isBeneAdvising.jsClick();
	await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.FastBulkPayment.emailIdO);
	await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.FastBulkPayment.emailId1);
	await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.FastBulkPayment.emailId2);
	await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.FastBulkPayment.emailId3);
	await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.FastBulkPayment.emailId4);
	await _PaymentsPages.BulkPaymentpage.message.input(testData.FastBulkPayment.message);
}

describe('SG_FAST_Bulk Payment', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.FastBulkPayment.SIT.loginCompanyId : testData.FastBulkPayment.UAT.loginCompanyId, SIT ? testData.FastBulkPayment.SIT.loginUserId : testData.FastBulkPayment.UAT.loginUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Create FAST Bulk Payment with New Payee', async function () {
		await commonPre();
		await addNewPayee();
		await _PaymentsPages.BulkPaymentpage.todayDayButton.jsClick();
		await commonAfter();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.FastBulkPayment.amountA1),
			await ensure(_PaymentsPages.BulkPaymentpage.accountNumberValue).textContains(testData.FastBulkPayment.accountNumber),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
		]);
	});

	it('Approve FAST Bulk Payment with New Payee', async function () {
		await _PaymentsPages.BulkPaymentpage.approveButton.click();
		await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.BulkPayment.EnterResponse);
		await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
		await _PaymentsPages.BulkPaymentpage.approveButton.click();
		await _PaymentsPages.BulkPaymentpage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved),
		]);
	});

	it('Create FAST Bulk Payment with Existing Normal Payee(multi) and ticked Save as Template', async function () {
		await commonPre();
		await addExistingPayee(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2, testData.FastBulkPayment.amountA2, testData.FastBulkPayment.payeeRef);
		await addExistingPayee(SIT ? testData.FastBulkPayment.SIT.existingPayeeA1 : testData.FastBulkPayment.UAT.existingPayeeA1, testData.FastBulkPayment.amountA1, testData.FastBulkPayment.payeeRef);
		await _PaymentsPages.BulkPaymentpage.todayDayButton.jsClick();
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.saveAsTemplateCheckbox.jsClick();
		await _PaymentsPages.BulkPaymentpage.templateName.input(templateName);
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();

		// template
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
		await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewTemplatePage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.viewTemplateName).textIs(templateName),
			await ensure(_PaymentsPages.BulkPaymentpage.viewTemplateFromAccount).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount)
		]);

		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.FastBulkPayment.amountA1),
			await ensure(_PaymentsPages.BulkPaymentpage.amountViewA2).textContains(testData.FastBulkPayment.amountA2),
			await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayeeA1 : testData.FastBulkPayment.UAT.existingPayeeA1),
			await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValueA2).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
		]);
	});

	it('Edit FAST Bulk Payment with Existing Normal Payee', async function () {
		await _PaymentsPages.BulkPaymentpage.editButton.click();
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.FastBulkPayment.editAmountA2);
		await commonAfter();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.FastBulkPayment.editAmountA2),
			await ensure(_PaymentsPages.BulkPaymentpage.amountViewA2).textContains(testData.FastBulkPayment.amountA2),
			await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayeeA1 : testData.FastBulkPayment.UAT.existingPayeeA1),
			await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValueA2).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
		]);
	});

	it('Create FAST Bulk Payment from Template and ticked Approve Now', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.nextButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
		await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClick();
		await ensure(_PaymentsPages.BulkPaymentpage.getChallengeSMS).isVisible();
		await _PaymentsPages.BulkPaymentpage.getChallengeSMS.click();
		await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.FastBulkPayment.EnterResponse);
		await _PaymentsPages.BulkPaymentpage.submitButton.click();
		await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
		await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved)
		]);
	});

	it('Create FAST Bulk Payment with New PayNow(Mobile Number)', async function () {
		await commonPre();
		await addNewPayNow();
		await _PaymentsPages.BulkPaymentpage.todayDayButton.jsClick();
		await commonAfter();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.FastBulkPayment.amountA1),
			await ensure(_PaymentsPages.BulkPaymentpage.payNowMobNum).textContains(testData.FastBulkPayment.proxyTypeMobNum),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
		]);
	});

	it('Copy FAST Bulk Payment with New PayNow(Mobile Number) and Save as Draft', async function () {
		await _PaymentsPages.BulkPaymentpage.copyButton.click();
		await _PaymentsPages.BulkPaymentpage.loadCondition();
		await _PaymentsPages.BulkPaymentpage.saveAsDraft.jsClick();
		await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
			reference = text;
		});
		await _PaymentsPages.BulkPaymentpage.dismissButton.jsClick();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.FastBulkPayment.amountA1),
			await ensure(_PaymentsPages.BulkPaymentpage.payNowMobNum).textContains(testData.FastBulkPayment.proxyTypeMobNum),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Saved),
		]);
	});

	it('Create FAST Bulk Payment with existing PayNow Payee(Company identifier)', async function () {
		await commonPre();
		await addExistingPayee(SIT ? testData.FastBulkPayment.SIT.existingPayNowA1 : testData.FastBulkPayment.UAT.existingPayNowA1, testData.FastBulkPayment.amountA1, testData.FastBulkPayment.payeeRef);
		await _PaymentsPages.BulkPaymentpage.todayDayButton.jsClick();
		await commonAfter();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.FastBulkPayment.amountA1),
			await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(SIT ? testData.FastBulkPayment.SIT.existingPayNowA1 : testData.FastBulkPayment.UAT.existingPayNowA1),
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
		]);
	});

	it('Reject FAST Bulk Payment with existing PayNow Payee(Company identifier)', async function () {
		await _PaymentsPages.BulkPaymentpage.rejectButton.jsClick();
		await _PaymentsPages.BulkPaymentpage.reasonForRejection.input(testData.FastBulkPayment.reasonForRejection);
		await _PaymentsPages.BulkPaymentpage.rejectDialogButton.jsClick();
		await _PaymentsPages.BulkPaymentpage.dismissButton.jsClick();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Rejected)
		]);
	});

	it('File Upload FAST Bulk Payment with PayNow payee - By File', async function () {
		await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.FileService.SIT.fileNameForBPP : testData.FileService.UAT.fileNameForBPP, testData.FileService.approvalCurrency).then(async data => {
			fileName = data;
		});
		await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
		await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
		await _FilesPages.ViewFilePage.FileNameLink.jsClick();
		await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
		await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
		await _FilesPages.uploadFilePage.loadConditionForViewBPPage();

		await Promise.all([
			await ensure(_FilesPages.uploadFilePage.fromAccountValueForBP).isNotEmpty(),
			await ensure(_FilesPages.uploadFilePage.amountValueForBP).isNotEmpty(),
		]);
	});


	it('Delete FAST Bulk Payment with PayNow payee', async function () {
		await _FilesPages.openMenu(Menu.Payments.TransferCenter);
		await _FilesPages.transferCentersPage.loadCondition();
		await _FilesPages.transferCentersPage.transferCenterfilter.input(fileName);
		await _FilesPages.transferCentersPage.transferCenterSelectButton.jsClick();
		await _FilesPages.transferCentersPage.transactionDeleteButton.jsClick();
		await _FilesPages.transferCentersPage.dialogDeleteButton.jsClick();
		await ensure(_FilesPages.transferCentersPage).isUXRejectDialogSuccess();
		await _FilesPages.transferCentersPage.dismissButton.click();
	});

	it('Can not create Fast Bulk Payment with item amount greater than 200000 SGD', async function () {
		await commonPre();
		await _PaymentsPages.BulkPaymentpage.newPayee.click();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.FastBulkPayment.payeeName);
		await _PaymentsPages.BulkPaymentpage.payeeBankID.select(SIT ? testData.FastBulkPayment.SIT.payeeBankID : testData.FastBulkPayment.UAT.payeeBankID);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.FastBulkPayment.accountNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.FastBulkPayment.greaterMaxAmount);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.FastBulkPayment.payeeRef);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.FastBulkPayment.paymentDetails);
		await ensure(_PaymentsPages.BulkPaymentpage.fastTypeButton).hasClassName("disabled");
	});

	it('Create Fast Bulk Payment with item amount enqual to 200000 SGD', async function () {
		await commonPre();
		await _PaymentsPages.BulkPaymentpage.newPayee.click();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.FastBulkPayment.payeeName);
		await _PaymentsPages.BulkPaymentpage.payeeBankID.select(SIT ? testData.FastBulkPayment.SIT.payeeBankID : testData.FastBulkPayment.UAT.payeeBankID);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.FastBulkPayment.accountNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.FastBulkPayment.maxAmount);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.FastBulkPayment.payeeRef);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.FastBulkPayment.paymentDetails);
		await commonAfter();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
			await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.FastBulkPayment.maxAmount),
		]);
	});

	it('Create Fast Bulk Payment with Total amount greater than 200000 SGD', async function () {
		await commonPre();
		await addExistingPayee(SIT ? testData.FastBulkPayment.SIT.existingPayeeA2 : testData.FastBulkPayment.UAT.existingPayeeA2, testData.FastBulkPayment.maxAmount, testData.FastBulkPayment.payeeRef);
		await _PaymentsPages.BulkPaymentpage.newPayee.click();
		await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.FastBulkPayment.payeeName);
		await _PaymentsPages.BulkPaymentpage.payeeBankID.select(SIT ? testData.FastBulkPayment.SIT.payeeBankID : testData.FastBulkPayment.UAT.payeeBankID);
		await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.FastBulkPayment.accountNumber);
		await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
		await _PaymentsPages.BulkPaymentpage.amount.input(testData.FastBulkPayment.maxAmount);
		await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.FastBulkPayment.payeeRef);
		await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
		await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.FastBulkPayment.paymentDetails);
		await commonAfter();

		await Promise.all([
			await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
		]);
	});

	it('File Upload FAST Bulk Payment with normal payee - By Transaction', async function () {
		await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "ALL - Universal File Format", SIT ? testData.FileService.SIT.fileNameForBPF : testData.FileService.UAT.fileNameForBPF, "By transaction amount").then(async data => {
			verifyFileName = data;
		});

		await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
		await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
		await _FilesPages.ViewFilePage.FileNameLink.jsClick();
		await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
		await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
		await _FilesPages.uploadFilePage.loadConditionForViewBPPage();

		await Promise.all([
			await ensure(_FilesPages.uploadFilePage.fromAccountValueForBP).isNotEmpty(),
			await ensure(_FilesPages.uploadFilePage.amountValueForBP).isNotEmpty(),
		]);
	});

});

describe('SG_FAST_Bulk Payment_Approvals', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.FastBulkPayment.SIT.loginCompanyId : testData.FastBulkPayment.UAT.loginCompanyId, SIT ? testData.FastBulkPayment.SIT.verifyUserId : testData.FastBulkPayment.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify FAST Bulk Payment with normal payee via My Verify', async function () {
		await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
		await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
		await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(verifyFileName);
		await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
		await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyBtn.click();
		await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
		await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
		await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
		await _FilesPages.openMenu(Menu.Payments.TransferCenter);
		await _FilesPages.transferCentersPage.goToViewPaymentPageViaRef(verifyFileName);
		await _FilesPages.uploadProfilePage.loadConditionforViewPaymentPage();

		await Promise.all([
			await ensure(_FilesPages.uploadProfilePage.transactionStatusValue).textContains(testData.status.PendingApproval),
		]);
	});

	it('Approve FAST Bulk Payment with normal payee via My Approvals', async function () {
		await _FilesPages.openMenu(Menu.Payments.TransferCenter);
		await _FilesPages.transferCentersPage.goToViewPaymentPageViaRef(verifyFileName);
		await _FilesPages.uploadProfilePage.loadConditionforViewPaymentPage();
		await _FilesPages.uploadProfilePage.approvalButton.click();
		await _FilesPages.uploadProfilePage.getChallengeSMS.clickIfExist();
		await _FilesPages.uploadProfilePage.challengeResponse.input(testData.BulkPayment.EnterResponse);
		await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
		await _FilesPages.uploadProfilePage.approvalButton.jsClick();
		await _FilesPages.uploadProfilePage.dismissButton.click();
		await _FilesPages.openMenu(Menu.Payments.TransferCenter);
		await _FilesPages.transferCentersPage.goToViewPaymentPageViaRef(verifyFileName);
		await _FilesPages.uploadProfilePage.loadConditionforViewPaymentPage();
		await Promise.all([
			await ensure(_FilesPages.uploadProfilePage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
		]);
	});

	it('Release FAST Bulk Payment with normal payee via My Release', async function () {
		await _PaymentsPages.openMenu(Menu.Approvals.Releases);
		await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
		await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(verifyFileName);
		await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
		await _ApprovalsPages.myVerificationAndReleasePage.txnReleaseBtn.click();
		await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
		await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
		await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
		await _FilesPages.openMenu(Menu.Payments.TransferCenter);
		await _FilesPages.transferCentersPage.goToViewPaymentPageViaRef(verifyFileName);
		await _FilesPages.uploadProfilePage.loadConditionforViewPaymentPage();

		await Promise.all([
			await ensure(_FilesPages.uploadProfilePage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
		]);
	});
});