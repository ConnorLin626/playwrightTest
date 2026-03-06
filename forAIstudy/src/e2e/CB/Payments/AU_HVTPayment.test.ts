import { HVTPaymentPage } from './../../../pages/CB/Payments/HVTPaymentPage';
/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages,FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let paymentReference = '';
let templateName = '';
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
const protractor_1 = require("protractor");
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let fileName = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('AU_testData.json');

let createNewPayee = async function (_PaymentsPages: PaymentsPages, isOtherBank: Boolean) {
    await _PaymentsPages.HVTPaymentPage.newPayeeTab.click();
    await _PaymentsPages.HVTPaymentPage.newPayeeName.input(testData.HVTPayment.newPayeeName);
    await _PaymentsPages.HVTPaymentPage.newPayeeAdd1.input(testData.HVTPayment.newPayeeAdd1);
    await _PaymentsPages.HVTPaymentPage.newPayeeAdd2.input(testData.HVTPayment.newPayeeAdd2);
    // await _PaymentsPages.HVTPaymentPage.newPayeeAdd3.input(testData.HVTPayment.newPayeeAdd3);
    if(isOtherBank){
        await _PaymentsPages.HVTPaymentPage.otherBankCheckBox.jsClick();
    }
    await _PaymentsPages.HVTPaymentPage.payeeBankID.select(testData.HVTPayment.payeeBankID);
    await _PaymentsPages.HVTPaymentPage.newPayeeAcctNumber.input(testData.HVTPayment.newPayeeAcctNumber);
}

let existingPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.HVTPaymentPage.existingPayee.select(testData.HVTPayment.existingPayee);
}

let fillHVTPaymentData = async function (_PaymentsPages: PaymentsPages, isCreate: Boolean, isOtherBank: Boolean, amountNum: string) {
    await _PaymentsPages.openMenu(Menu.Payments.AUPaymentLocalOverseasPayee);
    await _PaymentsPages.HVTPaymentPage.loadCondition();
    await _PaymentsPages.HVTPaymentPage.fromAccount.select(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount);
    await _PaymentsPages.HVTPaymentPage.amount.input(amountNum);
    if (isCreate) {
        await createNewPayee(_PaymentsPages, isOtherBank);
        await _PaymentsPages.HVTPaymentPage.setDateBtn.jsClick();
        await _PaymentsPages.HVTPaymentPage.HVTPaymentCheckBox.jsClick();
    } else {
        await existingPayee(_PaymentsPages);
    }
    await _PaymentsPages.HVTPaymentPage.chargeUsCheckBox.jsClick();
}

describe('AU_HVT Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.HVTPayment.SIT.loginCompanyId : testData.HVTPayment.UAT.loginCompanyId, SIT ? testData.HVTPayment.SIT.loginUserId : testData.HVTPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a AU HVT Payment with new Payee', async function () {
        await fillHVTPaymentData(_PaymentsPages, true, true, testData.HVTPayment.amountA2);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXSuccess();
        await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountA2),
            await ensure(_PaymentsPages.HVTPaymentPage.toAccountNumberValue).textContains(testData.HVTPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create a AU HVT Payment with ApprovalNow mChllenge', async function () {
        await fillHVTPaymentData(_PaymentsPages, false, false,testData.HVTPayment.amountA2);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.approvalNowCheckBox.jsClickIfExist();
		await _PaymentsPages.HVTPaymentPage.pushOpion.jsClickIfExist();
		await _PaymentsPages.HVTPaymentPage.getChallengeButton.clickIfExist();
        await _PaymentsPages.HVTPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXSuccess();
        await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

   it('Create a AU HVT Payment without ApprovalNow mChllenge', async function () {
        await fillHVTPaymentData(_PaymentsPages, false, false,testData.HVTPayment.amountA1);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.approvalNowCheckBox.jsClick();
		await _PaymentsPages.HVTPaymentPage.pushOpion.jsClickIfExist();
		await _PaymentsPages.HVTPaymentPage.responseCode.input("222222");
		await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXSuccess();
        await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved),
        ]);
    });

    it('Create a AU HVT Payment with Save as Template', async function () {
        await fillHVTPaymentData(_PaymentsPages, false, false,testData.HVTPayment.amountA2);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.savaAsTemplateCheckBox.jsClick();
        templateName = 'HVTName' + generatedID();
        await _PaymentsPages.HVTPaymentPage.templateName.input(templateName);
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewhvtTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.templateNameValue).textContains(templateName),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountA2),
            await ensure(_PaymentsPages.HVTPaymentPage.toExistingPayeeNameValue).textContains(testData.HVTPayment.existingPayee),
        ]);
        await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountA2),
            await ensure(_PaymentsPages.HVTPaymentPage.toExistingPayeeNameValue).textContains(testData.HVTPayment.existingPayee),
        ]);

    });

    it('Create a AU HVT Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.HVTPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.HVTPaymentPage.nextButton.jsClick();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXSuccess();
        await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HVTPaymentPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create a AU HVT with Save as Draft', async function () {
        await fillHVTPaymentData(_PaymentsPages, false, false, testData.HVTPayment.amountA2);
        await _PaymentsPages.HVTPaymentPage.saveAsDraft.click();
        await _PaymentsPages.HVTPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.HVTPaymentPage.dismissButton.click();
        await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountA2),
            await ensure(_PaymentsPages.HVTPaymentPage.toExistingPayeeNameValue).textContains(testData.HVTPayment.existingPayee),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a AU HVT Payment Transfer Center', async function () {
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        } else {
            await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "AU - High Value Domestic Payments", testData.status.PendingApproval);
        }
        await _PaymentsPages.HVTPaymentPage.copyButton.click();
        await _PaymentsPages.HVTPaymentPage.loadCondition();
        await _PaymentsPages.HVTPaymentPage.loadConditionForEditCopy();
        await _PaymentsPages.HVTPaymentPage.amount.clean();
        await _PaymentsPages.HVTPaymentPage.amount.input(testData.HVTPayment.amountV);
        await _PaymentsPages.HVTPaymentPage.paymentDetail.clean();
        await _PaymentsPages.HVTPaymentPage.paymentDetail.input("Copy" + testData.HVTPayment.paymentDetail);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXSuccess();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountV),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a AU HVT Payment  Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "AU - High Value Domestic Payments", testData.status.PendingApproval);
        }
        await _PaymentsPages.HVTPaymentPage.rejectButton.click();
        await _PaymentsPages.HVTPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.HVTPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.HVTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.HVTPaymentPage.dismissButton.click();
        await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Edit a AU HVT Payment  Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "AU - High Value Domestic Payments", testData.status.PendingApproval);
        }
        await _PaymentsPages.HVTPaymentPage.editButton.click();
        await _PaymentsPages.HVTPaymentPage.loadCondition();
        await _PaymentsPages.HVTPaymentPage.loadConditionForEditCopy();
        await _PaymentsPages.HVTPaymentPage.amount.clean();
        await _PaymentsPages.HVTPaymentPage.amount.input(testData.HVTPayment.editAmount);
        await _PaymentsPages.HVTPaymentPage.paymentDetail.clean();
        await _PaymentsPages.HVTPaymentPage.paymentDetail.input("Edit" + testData.HVTPayment.paymentDetail);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXSuccess();
        await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.editAmount),
        ]);
    });

    it('Delete a AU HVT Payment Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HVTPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "AU - High Value Domestic Payments", testData.status.PendingApproval);
        }
        await _PaymentsPages.HVTPaymentPage.deleteButton.click();
        await _PaymentsPages.HVTPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.HVTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.HVTPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

});

describe('Verify And Release a High Value Domestic', async function () {
	this.retries(browser.params.caseRetryTimes);
	before(async function () { await new NavigatePages().loginCB(SIT ? testData.HVTPayment.SIT.loginCompanyId : testData.HVTPayment.UAT.loginCompanyId, SIT ? testData.HVTPayment.SIT.verifyUserId : testData.HVTPayment.UAT.verifyUserId); });
	const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

	it('Verify a High Value Domestic via My Verify', async function () {
		await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
		await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.myVerificationAndReleasePage.showAddFilter.click();
    await _ApprovalsPages.myVerificationAndReleasePage.paymentTypeList.select(testData.paymentType.AU_HVT);
    await _ApprovalsPages.myVerificationAndReleasePage.byFileAdditionFilter_Search.click();
    await _ApprovalsPages.myVerificationAndReleasePage.loadCondition();
		await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
		await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
			verifyReference = text.trim();
		});
		await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyBtn.click();
		await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
		await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
		await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(verifyReference);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
		]);
	});

	it('Approve a High Value Domestic via Transfer Center', async function () {
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		if (0 !== verifyReference.trim().length) {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
		} else {
			await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_HVT, testData.status.PendingApproval);
		}
		await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
		await _PaymentsPages.HVTPaymentPage.approveButton.click();
		await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
		await _PaymentsPages.HVTPaymentPage.responseCode.input("23333");
		await _PaymentsPages.HVTPaymentPage.loadConditionForApprovePaymentPage();
		await _PaymentsPages.HVTPaymentPage.approveButton.click();
		await protractor_1.browser.sleep(5000); // when push approval, before click need to wail the response
		await _PaymentsPages.HVTPaymentPage.loadConditionForDismissDialog();
		await _PaymentsPages.HVTPaymentPage.dismissButton.click();
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(verifyReference);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContains(testData.status.PendingRelease)
		]);
	});

	it('Release a Low Value Domestic via My Release', async function () {
		await _PaymentsPages.openMenu(Menu.Approvals.Releases);
		await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
		await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
		await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
			reference3 = text.trim();
		});
		await _ApprovalsPages.myVerificationAndReleasePage.txnReleaseBtn.click();
		await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
		await ensure(_ApprovalsPages.myVerificationAndReleasePage).isUXSuccess();
		await _ApprovalsPages.myVerificationAndReleasePage.finishButton.click();
		await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
		await _ApprovalsPages.transferCentersPage.loadCondition();
		await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference3);
		await Promise.all([
			await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
		]);
	});
});

describe('AU_HVT Payment Fileupdate', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.HVTPayment.SIT.loginCompanyId : testData.HVTPayment.UAT.loginCompanyId, SIT ? testData.HVTPayment.SIT.loginUserId : testData.HVTPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });
    it('Upload High Value Domestic via Files- File Upload- Upload Files', async function () {
        // upload File start
        let paymentType = "ALL - Universal File Format";
		await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.HVTPayment.SIT.fileName : testData.HVTPayment.UAT.fileName, testData.HVTPayment.approvalOptionByTxn).then(async (data) => {
			fileName = data;
		});
		// upload File end
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
	    await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccountUpload : testData.HVTPayment.UAT.fromAccountUpload),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountUpload),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.HVTPaymentPage.toNewPayeeNameValue).textContains(testData.HVTPayment.uploadNewPayeeName)
		]);
	});

	it('File Upload - Reject item for High Value Domestic', async function () {
		// go to Transfer Center
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
		await _PaymentsPages.HVTPaymentPage.rejectButton.click();
		await _PaymentsPages.HVTPaymentPage.reasonForRejection.input(testData.HVTPayment.rejectReason);
		await _PaymentsPages.HVTPaymentPage.rejectDialogButton.click();
		await _PaymentsPages.HVTPaymentPage.dismissButton.click();
		await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
		await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
		await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
		await Promise.all([
			await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.Rejected)
		]);
	});
});
