/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages,FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { ensure, SIT, generatedID, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = '';
// this from createFromTemplate,then copy
let reference2 = '';
let verifyReference = '';
let fileName: string = null;
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('AU_testData.json');
let TemplateName = "";
let templateRef = "";
let tempNewPayeeName = "";
let approvalReference = "";
let _FilesPages = new FilesPages();

describe('AU Cross Border ACH', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {
		await new NavigatePages().loginCB(
			SIT ? testData.CrossBorder.SIT.login.loginCompanyId : testData.CrossBorder.UAT.login.loginCompanyId,
			SIT ? testData.CrossBorder.SIT.login.loginUserId : testData.CrossBorder.UAT.login.loginUserId);
	});
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Create a Cross Border ACH Payment With a new payee', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
		await _PaymentsPages.crossBoarderACHPage.loadCondition();
		await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
		await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
		await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
		await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
		await _PaymentsPages.crossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
		await _PaymentsPages.crossBoarderACHPage.newpayeeadd1.input('newpayeeadd');
		await _PaymentsPages.crossBoarderACHPage.swiftBICSelect.select(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
		await _PaymentsPages.crossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
		await _PaymentsPages.crossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
		await _PaymentsPages.crossBoarderACHPage.addPayeeBtn.click();
		await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
		await _PaymentsPages.crossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
		await _PaymentsPages.crossBoarderACHPage.hideOptDetail.jsClick();
		await _PaymentsPages.crossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
		await _PaymentsPages.crossBoarderACHPage.nextButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
		await _PaymentsPages.crossBoarderACHPage.submitButton.click();
		await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
		await _PaymentsPages.crossBoarderACHPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
			await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
			await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
			await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingApproval),
		]);
	});

	it('Copy a Cross Border ACH Payment', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
		}
		await _PaymentsPages.crossBoarderACHPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.crossBoarderACHPage.copyButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadCondition();
		await _PaymentsPages.crossBoarderACHPage.nextButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadConditionForPreviewPage();
		await _PaymentsPages.crossBoarderACHPage.submitButton.click();
		await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
		await _PaymentsPages.crossBoarderACHPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
		await _PaymentsPages.crossBoarderACHPage.loadConditionForViewPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
			await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
			await ensure(_PaymentsPages.crossBoarderACHPage.paymentDateView).isNotEmpty(),
			await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
			await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textIs(testData.status.PendingApproval),
		]);
	});

	it('Edit a Cross Border ACH ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
		}
		await _PaymentsPages.crossBoarderACHPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.crossBoarderACHPage.editButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadCondition();
		await _PaymentsPages.crossBoarderACHPage.deletePayee.click();
		await _PaymentsPages.crossBoarderACHPage.newPayeeWitoutPaynow.click();
		await _PaymentsPages.crossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameEdit);
		await _PaymentsPages.crossBoarderACHPage.newpayeeadd1.input('newpayeeadd');
		await _PaymentsPages.crossBoarderACHPage.swiftBICSelect.select(SIT ? testData.CrossBorder.SIT.payeeBankIDEdit : testData.CrossBorder.UAT.payeeBankIDEdit);
		await _PaymentsPages.crossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.accountNumberINTL);
		await _PaymentsPages.crossBoarderACHPage.addPayeeBtn.click();
		await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountEdit);
		await _PaymentsPages.crossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
		await _PaymentsPages.crossBoarderACHPage.hideOptDetail.jsClick();
		await _PaymentsPages.crossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
		await _PaymentsPages.crossBoarderACHPage.nextButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadConditionForPreviewPage();
		await _PaymentsPages.crossBoarderACHPage.submitButton.click();
		await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
		await _PaymentsPages.crossBoarderACHPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
		await _PaymentsPages.crossBoarderACHPage.loadConditionForViewPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountEdit),
			await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameEdit),
		]);
	});

	it('Reject a Cross Border ACH ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
		}
		await _PaymentsPages.crossBoarderACHPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.crossBoarderACHPage.rejectButton.click();
		await _PaymentsPages.crossBoarderACHPage.reasonForRejection.input(testData.CrossBorder.rejectReason);
		await _PaymentsPages.crossBoarderACHPage.rejectDialogButton.click();
		await _PaymentsPages.crossBoarderACHPage.dismissButton.click();
		await _PaymentsPages.crossBoarderACHPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.transactionStatusReject).textContains(testData.status.Rejected)
		]);
	});

	it('Delete a Cross Border ACH ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
		}
		await _PaymentsPages.crossBoarderACHPage.loadConditionForViewPaymentPage();
		await _PaymentsPages.crossBoarderACHPage.deleteButton.click();
		await _PaymentsPages.crossBoarderACHPage.deleteDialogButton.click();
		await _PaymentsPages.crossBoarderACHPage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
		await ensure(_PaymentsPages.transferCentersPage.transactionResult).textContains(testData.CrossBorder.labelNoInformationDisplay);
	});

	it('Approve a Cross Border ACH Payment', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference2.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_CBA, testData.status.PendingApproval);
		}
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await _PaymentsPages.crossBoarderACHPage.approveButton.click();
		await _PaymentsPages.crossBoarderACHPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.crossBoarderACHPage.challengeResponse.input(testData.CrossBorder.responseCode);
		await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
		await _PaymentsPages.crossBoarderACHPage.approveButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadConditionForDismissDialog();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
			reference2 = text;
		});
		await _PaymentsPages.crossBoarderACHPage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textIs(testData.status.Approved),
		]);
	});

	it('Create with Approva Now with M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
		await _PaymentsPages.crossBoarderACHPage.loadCondition();
		await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
		await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
		await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
		await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
		await _PaymentsPages.crossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
		await _PaymentsPages.crossBoarderACHPage.newpayeeadd1.input('newpayeeadd');
		await _PaymentsPages.crossBoarderACHPage.swiftBICSelect.select(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
		await _PaymentsPages.crossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
		await _PaymentsPages.crossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
		await _PaymentsPages.crossBoarderACHPage.addPayeeBtn.click();
		await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
		await _PaymentsPages.crossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
		await _PaymentsPages.crossBoarderACHPage.hideOptDetail.jsClick();
		await _PaymentsPages.crossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
		await _PaymentsPages.crossBoarderACHPage.nextButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
		await _PaymentsPages.crossBoarderACHPage.approveNowCheckBox.jsClick();
		await _PaymentsPages.crossBoarderACHPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.crossBoarderACHPage.challengeResponse.input("34234");
		await _PaymentsPages.crossBoarderACHPage.submitButton.click();
		//await _PaymentsPages.crossBoarderACHPage.dismissButton.click();
		await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
		await _PaymentsPages.crossBoarderACHPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
			await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
			await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
			await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.Approved)
		]);
	});

	it('Create with Approva Now without M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
		await _PaymentsPages.crossBoarderACHPage.loadCondition();
		await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
		await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
		await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
		await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
		await _PaymentsPages.crossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
		await _PaymentsPages.crossBoarderACHPage.newpayeeadd1.input('newpayeeadd');
		await _PaymentsPages.crossBoarderACHPage.swiftBICSelect.select(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
		await _PaymentsPages.crossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
		await _PaymentsPages.crossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
		await _PaymentsPages.crossBoarderACHPage.addPayeeBtn.click();
		await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountA2);
		await _PaymentsPages.crossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
		await _PaymentsPages.crossBoarderACHPage.hideOptDetail.jsClick();
		await _PaymentsPages.crossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
		await _PaymentsPages.crossBoarderACHPage.nextButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
		await _PaymentsPages.crossBoarderACHPage.approveNowCheckBox.jsClick();
		await _PaymentsPages.crossBoarderACHPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.crossBoarderACHPage.challengeResponse.input("34234");
		await _PaymentsPages.crossBoarderACHPage.submitButton.click();
		await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
		await _PaymentsPages.crossBoarderACHPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
			await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountA2),
			await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.Approved)
		]);
	});

	//Comment this case for AB-7387 CR and CBACH is not support template anymore
	// it('Create with Save as Template', async function () {
	// 	await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
	// 	await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
	// 	await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
	// 	await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
	// 	await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
	// 	tempNewPayeeName = testData.CrossBorder.payeeNameINTL + generatedID();
	// 	await _PaymentsPages.crossBoarderACHPage.newPayeeName.input(tempNewPayeeName);
	// 	await _PaymentsPages.crossBoarderACHPage.swiftBICSelect.select(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
	// 	await _PaymentsPages.crossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
	// 	await _PaymentsPages.crossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
	// 	await _PaymentsPages.crossBoarderACHPage.addPayeeBtn.click();
	// 	await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
	// 	await _PaymentsPages.crossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
	// 	await _PaymentsPages.crossBoarderACHPage.hideOptDetail.jsClick();
	// 	await _PaymentsPages.crossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
	// 	await _PaymentsPages.crossBoarderACHPage.nextButton.click();
	// 	await _PaymentsPages.crossBoarderACHPage.saveAsTemplateCheckbox.jsClick();
	// 	TemplateName = 'CBA' + generatedID();
	// 	await _PaymentsPages.crossBoarderACHPage.templateName.input(TemplateName);
	// 	await _PaymentsPages.crossBoarderACHPage.submitButton.click();
	// 	await _PaymentsPages.crossBoarderACHPage.loadConditionForSubmittedPage();
	// 	await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
	// 		templateRef = text;
	// 	});
	// 	await _PaymentsPages.crossBoarderACHPage.finishedButton.click();
	// 	await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
	// 	await _PaymentsPages.crossBoarderACHPage.loadConditionForViewPaymentPage();

	// 	await Promise.all([
	// 		//Check the Transaction under Transfer Center>View Page
	// 		await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
	// 		await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL)
	// 	]);
	// });

	it('Save Bulk ACH successfully As Draft', async function () {
		let paymentReference = '';
		await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
		await _PaymentsPages.crossBoarderACHPage.loadCondition();
		await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
		await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
		await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
		await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
		await _PaymentsPages.crossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
		await _PaymentsPages.crossBoarderACHPage.newpayeeadd1.input('newpayeeadd');
		await _PaymentsPages.crossBoarderACHPage.swiftBICSelect.select(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
		await _PaymentsPages.crossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
		await _PaymentsPages.crossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
		await _PaymentsPages.crossBoarderACHPage.addPayeeBtn.click();
		await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
		await _PaymentsPages.crossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
		await _PaymentsPages.crossBoarderACHPage.hideOptDetail.jsClick();
		await _PaymentsPages.crossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
		await _PaymentsPages.crossBoarderACHPage.saveAsDraft.click();
		await _PaymentsPages.crossBoarderACHPage.getDialogReferenceID().then(text => {
			paymentReference = text;
			//  console.error(paymentReference);
		});
		await _PaymentsPages.crossBoarderACHPage.loadConditionForDismissDialog();
		await _PaymentsPages.crossBoarderACHPage.dismissButton.click();
		await _PaymentsPages.crossBoarderACHPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
			await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
			await ensure(_PaymentsPages.crossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
		]);
	});
	it('Upload a Cross Border ACH Payment', async function () {
		await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, "Universal File Format",SIT ? testData.CrossBorder.SIT.fileService.fileName : testData.CrossBorder.UAT.fileService.fileName, testData.BulkPayment.approvalOptionByTxn).then(
                (data) => {
                    fileName = data;
                }
			);
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).isNotEmpty(),
		]);
	});

	it('Create a Cross Border ACH Payment For Verify and Release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
		await _PaymentsPages.crossBoarderACHPage.loadCondition();
		await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
		await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(SIT ? testData.CrossBorder.SIT.paymentCountry : testData.CrossBorder.UAT.paymentCountry);
		await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
		await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
		await _PaymentsPages.crossBoarderACHPage.newPayeeName.input(testData.CrossBorder.payeeNameINTL);
		await _PaymentsPages.crossBoarderACHPage.newpayeeadd1.input('newpayeeadd');
		await _PaymentsPages.crossBoarderACHPage.swiftBICSelect.select(SIT ? testData.CrossBorder.SIT.payeeBankID : testData.CrossBorder.UAT.payeeBankID);
		await _PaymentsPages.crossBoarderACHPage.newPayeeRoutingCode.input(testData.CrossBorder.newPayeeRoutingCode);
		await _PaymentsPages.crossBoarderACHPage.newPayeeAcctNo.input(testData.CrossBorder.newPayeeAcctNumber);
		await _PaymentsPages.crossBoarderACHPage.addPayeeBtn.click();
		await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(SIT ? testData.CrossBorder.SIT.amountVerify : testData.CrossBorder.UAT.amountVerify);
		await _PaymentsPages.crossBoarderACHPage.payeePurpose1.input(testData.CrossBorder.payeePurpose1);
		await _PaymentsPages.crossBoarderACHPage.hideOptDetail.jsClick();
		await _PaymentsPages.crossBoarderACHPage.payeeDetail1.input(testData.CrossBorder.payeeDetail1);
		await _PaymentsPages.crossBoarderACHPage.nextButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
		await _PaymentsPages.crossBoarderACHPage.submitButton.click();
		await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
		await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
			verifyReference = text;
		});
		await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingVerification),
		]);
	});
});
describe('Verify And Release A Cross Border ACH', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {
		await new NavigatePages().loginCB(
			SIT ? testData.CrossBorder.SIT.login.loginCompanyId : testData.CrossBorder.UAT.login.loginCompanyId,
			SIT ? testData.CrossBorder.SIT.login.verifyUserId : testData.CrossBorder.UAT.login.verifyUserId);
	});
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify a Cross Border ACH via My Verify', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, verifyReference, testData.paymentType.AU_CBA).then(reference => {
			verifyReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingApproval)
		]);
	});

	it('Release a Cross Border ACH via My Release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== verifyReference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("Cross Border ACH", testData.status.PendingApproval);
		}
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await _PaymentsPages.crossBoarderACHPage.approveButton.click();
		await _PaymentsPages.crossBoarderACHPage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.crossBoarderACHPage.challengeResponse.input(testData.CrossBorder.responseCode);
		await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
		await _PaymentsPages.crossBoarderACHPage.approveButton.click();
		await _PaymentsPages.crossBoarderACHPage.getDialogReferenceID().then(text => {
			approvalReference = text;
		});
		await _PaymentsPages.crossBoarderACHPage.dismissButton.click();
		await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_CBA).then(reference => {
			approvalReference = reference;
		})
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
		await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
		await Promise.all([
			await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});
});
