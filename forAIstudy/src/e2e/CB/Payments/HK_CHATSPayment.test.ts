/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
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
let approvalReference = "";
let paymentReference = '';
let templateName = '';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

let createNewPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeTab.click();
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeName.input(testData.CHATSPayment.newPayeeName);
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeAdd1.input(testData.CHATSPayment.newPayeeAdd1);
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeAdd2.input(testData.CHATSPayment.newPayeeAdd2);
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeAdd3.input(testData.CHATSPayment.newPayeeAdd3);
    await _PaymentsPages.HKCHATSPaymentPage.payeeBankID.select(testData.CHATSPayment.payeeBankID);
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeAcctNumber.input(testData.CHATSPayment.newPayeeAcctNumber);
};

let existingPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.HKCHATSPaymentPage.existingPayee.select(testData.CHATSPayment.existingPayee);
};

let fillCHATSPaymentData = async function (_PaymentsPages: PaymentsPages, isCreate: Boolean, isMChallenge: Boolean) {
    await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
    await _PaymentsPages.HKCHATSPaymentPage.loadCondition();
    await _PaymentsPages.HKCHATSPaymentPage.fromAccount.select(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount);
    if (isMChallenge) {
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.amountA1);
    } else {
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.amountA2);
    }
    if (isCreate) {
        await createNewPayee(_PaymentsPages);
    } else {
        await existingPayee(_PaymentsPages);
    }
    await _PaymentsPages.HKCHATSPaymentPage.setDate.click();
    await _PaymentsPages.HKCHATSPaymentPage.normalType.jsClick();
    await _PaymentsPages.HKCHATSPaymentPage.loadConditionForBankChargesOur();
    await _PaymentsPages.HKCHATSPaymentPage.bankChargesOur.click();
    await _PaymentsPages.HKCHATSPaymentPage.paymentDetail.input(testData.CHATSPayment.paymentDetail);
    await _PaymentsPages.HKCHATSPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.HKCHATSPaymentPage.emailIdO.input(testData.CHATSPayment.emailIdO);
    await _PaymentsPages.HKCHATSPaymentPage.emailId1.input(testData.CHATSPayment.emailId1);
    await _PaymentsPages.HKCHATSPaymentPage.emailId2.input(testData.CHATSPayment.emailId2);
    await _PaymentsPages.HKCHATSPaymentPage.emailId3.input(testData.CHATSPayment.emailId3);
    await _PaymentsPages.HKCHATSPaymentPage.emailId4.input(testData.CHATSPayment.emailId4);
    await _PaymentsPages.HKCHATSPaymentPage.message.input(testData.CHATSPayment.message);
};

describe('HK_CHATS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.CHATSPayment.SIT.loginCompanyId : testData.CHATSPayment.UAT.loginCompanyId,
            SIT ? testData.CHATSPayment.SIT.loginUserId : testData.CHATSPayment.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a HK Chats Payment with new Payee', async function () {
        await fillCHATSPaymentData(_PaymentsPages, true, false);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastFromAccountValue).textContains(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastAmountValue).textContains(testData.CHATSPayment.amountA2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toAccountNumberValue).textContains(testData.CHATSPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create a HK Chats Payment with Save as Template', async function () {
        await fillCHATSPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.savaAsTemplateCheckBox.jsClick();
        templateName = 'FastName' + generatedID();
        await _PaymentsPages.HKCHATSPaymentPage.templateName.input(templateName);
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForViewFastTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.templateNameValue).textIs(templateName),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastFromAccountValue).textContains(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastAmountValue).textContains(testData.CHATSPayment.amountA2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toExistingPayeeAcctNumValue).textContains(testData.CHATSPayment.existingPayee),
        ]);
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastFromAccountValue).textContains(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastAmountValue).textContains(testData.CHATSPayment.amountA2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toExistingPayeeAcctNumValue).textContains(testData.CHATSPayment.existingPayee),
        ]);
    });

    it('Create a HK Chats Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.CHATSPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getInfoReferenceID().then(text => {
            reference2 = text;
            console.log(reference2);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toExistingPayeeAcctNumValue).isNotEmpty(),
        ]);
    });

    it('Create a SG Fast with Save as Draft', async function () {
        await fillCHATSPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.HKCHATSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.HKCHATSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await _PaymentsPages.HKCHATSPaymentPage.dismissButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastFromAccountValue).textContains(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastAmountValue).textContains(testData.CHATSPayment.amountA2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toExistingPayeeAcctNumValue).textContains(testData.CHATSPayment.existingPayee),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a SG Fast via Transfer Center', async function () {
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.copyButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadCondition();
        await _PaymentsPages.HKCHATSPaymentPage.amount.clean();
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.amountV);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getInfoReferenceID().then(text => {
            reference3 = text;
            console.log(reference3);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fastAmountValue).textContains(testData.CHATSPayment.amountV),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a HK Chats Payment via Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.editButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadCondition();
        await _PaymentsPages.HKCHATSPaymentPage.amount.clean();
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.editAmount);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.fastAmountValue).textContains(testData.CHATSPayment.editAmount);
    });

    it('Reject a HK Chats Payment via Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.rejectButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.HKCHATSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.dismissButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContains(testData.status.Rejected);
    });

    it('Delete a HK Chats Payment via Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.deleteButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);
        await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display");
    });
});

describe('SG_Fast Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.CHATSPayment.SIT.loginCompanyId : testData.CHATSPayment.UAT.loginCompanyId,
            SIT ? testData.CHATSPayment.SIT.verifyUserId : testData.CHATSPayment.UAT.verifyUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a Fast Payment via My Verify', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
        await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVeirfyTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTab.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyTxnTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTabByTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForVerifyTxn.input(reference3);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForVerifyTxn.select(testData.paymentType.HK_CHATS);
        }
        await _PaymentsPages.VerificationAndReleasesPage.goButtonForVerifyTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyByTxnI3Select1stTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTxnButton.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyPaymentPage();
        await _PaymentsPages.VerificationAndReleasesPage.confirmVerifyI3Button.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
        await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
        await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
            verifyReference = text;
            console.log(verifyReference);
        });
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval);
    });

    it('Approve a HK Chats Payment via Transfer Center', async function () {
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.approveButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.input(testData.CHATSPayment.challengeResponse);
        await _PaymentsPages.HKCHATSPaymentPage.approveButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
            console.log(approvalReference);
        });
        await _PaymentsPages.HKCHATSPaymentPage.dismissButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
    });

    it('Release a Fast Payment via My Release', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
        await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTab();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTab.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTxnTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTabByTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
        if (0 !== verifyReference.trim().length && 0 !== approvalReference.trim().length) {
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForReleaseTxn.input(verifyReference);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForReleaseTxn.select(testData.paymentType.HK_CHATS);
        }
        await _PaymentsPages.VerificationAndReleasesPage.goButtonForReleaseTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.releaseByTxnI3Select1stTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTxnI3Button.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleasePaymentPage();
        await _PaymentsPages.VerificationAndReleasesPage.confirmReleaseI3Button.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
        await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
        await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected);
    });
    it('Create a HK Chats Payment - Approval Now with mChallenge', async function () {
        await fillCHATSPaymentData(_PaymentsPages, false, true);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.approvalNowCheckBox.jsClick();
        // await ensure(_PaymentsPages.HKCHATSPaymentPage.mchallengeText).textContains(testData.CHATSPayment.mChallengeText);
        await _PaymentsPages.HKCHATSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.input(testData.CHATSPayment.challengeResponse);
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
    });

    it('Create a HK Chats Payment - Approve Now without mChallenge', async function () {
        await fillCHATSPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.approvalNowCheckBox.jsClick();
        // await ensure(_PaymentsPages.HKCHATSPaymentPage.noChallenge).textContains(testData.CHATSPayment.withoutChallenge);
        await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.input(testData.CHATSPayment.challengeResponse);
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved);
    });
});