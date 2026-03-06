/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages,FilesPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { ensure, SIT, handlerCase, generatedID, } from "../../../lib";
import { browser } from "protractor";
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
let _FilesPages = new FilesPages();
let fileName = "";
let testData = _PaymentsPages.fetchTestData("AU_testData.json");
let verifyReference = "";
let templateRef = "";
let newPayeeName = "";
let approvalReference = "";

describe("AU Telegraphic Transfer Payment", async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () {
		await new NavigatePages().loginCB(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId);
	});
	const suitObject = this;
	beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
		handlerCase(suitObject, this);
	});

	it('Create a Telegraphic Transfer with new Payee', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select("AUSTRIA");
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.enterDetailButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.sharedRadio.jsClick();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeName),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PartialApproved)
		]);
	});

	it('Copy a Telegraphic Transfer', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
		}
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.copyButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			reference2 = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toAccountNumberValue).isNotEmpty(),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification)
		]);
	});

	it('Edit a Telegraphic Transfer ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
		}
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.editButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForEdit();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountEdit);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeNameEdit);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountEdit),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeNameEdit)
		]);
	});

	it('Reject a Telegraphic Transfer ', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
		}
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.rejectButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.reasonForRejection.input(testData.TelegraphicTransfer.rejectReason);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.rejectDialogButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.Rejected)
		]);
	});

	it('Delete a Telegraphic Transfer', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
		}
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.deleteButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.deleteDialogButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
		await _PaymentsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
		await lib_1.ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.TelegraphicTransfer.labelNoInformationDisplay);
	});

	it("Approve a Telegraphic Transfer", async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== reference2.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
		}
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.pushOption.jsClickIfExist();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input("2345622");
		await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForDismissDialog();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received)
		]);
	});

	it('Create with Approval Now with M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select("AUSTRIA");
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.enterDetailButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.sharedRadio.jsClick();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.approveNowCheckBox.jsClick();
		//await _PaymentsPages.PaymentLocalOverseasPayeePage.pushOption.clickIfExist();
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.mchallengeText).textContains(testData.TelegraphicTransfer.mChllengeText);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeName),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Received)
		]);
	});

	it('Create with Approval Now without M-Chanllenge', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select("AUSTRIA");
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.enterDetailButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.sharedRadio.jsClick();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.approveNowCheckBox.jsClick();
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.pchallengeText).textContains(testData.TelegraphicTransfer.pMChllengeText);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input(testData.TelegraphicTransfer.challengeResponse);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			reference = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountA2),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeName),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.PartialApproved, testData.status.Approved, testData.status.Received)
		]);
	});

	it('Upload Telegraphic Transfer via Files Services Upload', async function () {
		// upload File start
		let paymentType = "ALL - Universal File Format";
		await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.TelegraphicTransfer.SIT.fileName : testData.TelegraphicTransfer.UAT.fileName, testData.TelegraphicTransfer.approvalOptionByTxn).then(async (data) => {
			fileName = data;
		});
		// upload File end
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
		]);
	});

	it('Create with Save as Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select("AUSTRIA");
		newPayeeName = testData.TelegraphicTransfer.newPayeeName + generatedID();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(newPayeeName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.enterDetailButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.sharedRadio.jsClick();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.saveAsTemplateCheckbox.jsClick();
		TemplateName = 'AUTT' + generatedID();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.templateName.input(TemplateName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			templateRef = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(templateRef);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).textContains(newPayeeName)
		]);

		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
		await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();

		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amount),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).textContains(newPayeeName)
		]);
	});

	it('Create from Template', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
		await _PaymentsPages.PaymentTemplatesPage.loadCondition();
		if (0 !== TemplateName.trim().length) {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
		} else {
			await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.TelegraphicTransfer.SIT.existingTemplate : testData.TelegraphicTransfer.UAT.existingTemplate);
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
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).isNotEmpty(),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).isNotEmpty()
		]);
	});

	it('Save a Telegraphic Transfer successfully As Draft', async function () {
		let paymentReference = '';
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select("AUSTRIA");
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName + generatedID());
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.enterDetailButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.sharedRadio.jsClick();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.saveAsDraft.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
			paymentReference = text;
			// console.error(paymentReference);
		});
		await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.Saved)
		]);
	});

	it('Create a Telegraphic Transfer for verify and release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountVerify);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select("AUSTRIA");
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.enterDetailButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankName.input(testData.TelegraphicTransfer.newPayeeBankName);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR1.input(testData.TelegraphicTransfer.newPayeeBankADDR1);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeBankADDR2.input(testData.TelegraphicTransfer.newPayeeBankADDR2);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.sharedRadio.jsClick();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
			verifyReference = text;
		});
		await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.PendingVerification)
		]);
	});
});

describe('Verify And Release a Telegraphic Transfer', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.verifyUserId : testData.TelegraphicTransfer.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify a Telegraphic Transfer via My Verify', async function () {
		await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, verifyReference, testData.paymentType.AU_TT).then(reference => {
			verifyReference = reference;
		});;
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.PendingApproval)
		]);
	});

	it('Release a Telegraphic Transfer via My Release', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== verifyReference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_TT, testData.status.PendingApproval);
		}
		await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.pushOption.jsClickIfExist();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input("222222");
		await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
			approvalReference = text;
		});
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForDismissDialog();
		await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
		await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_TT).then(reference => {
			approvalReference = reference;
		});
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
		await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});
});

