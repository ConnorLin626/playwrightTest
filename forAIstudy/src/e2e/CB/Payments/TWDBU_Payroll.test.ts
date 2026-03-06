/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let TemplateName = '';
let paymentReference = '';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');

export async function addNewPayee() {
    await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
    await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.payeeName);
    await _PaymentsPages.PayrollPage.payeeBankID.select(testData.Payroll.payeeBankID)
    await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.accountNumber);
    await _PaymentsPages.PayrollPage.newPayeeButton.click();
}

describe('TW_Payroll', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Payroll with new payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await addNewPayee();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.payeeRef.input(testData.Payroll.payeeRef);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.Payroll.paymentDetails);
        await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
        await _PaymentsPages.PayrollPage.emailIdO.input(testData.Payroll.emailIdO);
        await _PaymentsPages.PayrollPage.emailId1.input(testData.Payroll.emailId1);
        await _PaymentsPages.PayrollPage.emailId2.input(testData.Payroll.emailId2);
        await _PaymentsPages.PayrollPage.emailId3.input(testData.Payroll.emailId3);
        await _PaymentsPages.PayrollPage.emailId4.input(testData.Payroll.emailId4);
        await _PaymentsPages.PayrollPage.message.input(testData.Payroll.message);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
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
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount1),
            await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.Payroll.accountNumber),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee1);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.filterExistingPayee.clean();
        // add second payee
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee2);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount2);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.PayrollPage.mchallengeText).textContains(testData.Payroll.mChllengeText);
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll.EnterResponse);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create with Approva Now without M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await addNewPayee();
        //amount3 need more than 1 PA group approve
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount3);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll.EnterResponse);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount3),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create Payroll with Save as Tempalte', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee1);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.payeeRef.input(testData.Payroll.payeeRef);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'SALTName' + generatedID();
        await _PaymentsPages.PayrollPage.templateName.input(TemplateName);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll.existingPayee1),
        ]);

        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PayrollPage.loadConditionForViewTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateFromAccount).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateAmount).textContains(testData.Payroll.amount1),
            await ensure(_PaymentsPages.PayrollPage.viewTemplatePayeeNameValue).textContains(testData.Payroll.existingPayee1),
        ]);
    });

    it('Create a Payroll from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.Payroll.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.PayrollPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.editamount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        if (0 !== TemplateName.trim().length) {
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
                await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.editamount),
                await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll.existingPayee1),
            ]);
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
                await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
                await ensure(_PaymentsPages.PayrollPage.payeeNameValue).isNotEmpty(),
            ]);
        }
    });

    it('Create a Payroll with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateTWPayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee1);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.saveAsDraft.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll.existingPayee1),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a Payroll via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.copyButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amountV);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amountV),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a Payroll via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        await _PaymentsPages.PayrollPage.editButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.editamount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
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
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.editamount),
        ]);
    });

    it('Reject a Payroll via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.rejectButton.click();
        await _PaymentsPages.PayrollPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.PayrollPage.rejectDialogButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXRejectDialogSuccess();
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Delete a Payroll via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.deleteButton.click();
        await _PaymentsPages.PayrollPage.deleteDialogButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXRejectDialogSuccess();
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('TW_Payroll_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.verifyUserId : testData.Payroll.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a Payroll via My Verify list', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
        await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVeirfyTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTab.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyTxnTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTabByTxn.click();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForVerifyTxn.input(reference3);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForVerifyTxnTW.select('TW - Payroll');
        }
        await _PaymentsPages.VerificationAndReleasesPage.goButtonForVerifyTxnTW.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyByTxnI3Select1stTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTxnButtonTW.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyPaymentPage();
        await _PaymentsPages.VerificationAndReleasesPage.confirmVerifyI3Button.click();
        await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
        await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a Payroll via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll.EnterResponse);
        await _PaymentsPages.PayrollPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a Payroll via My Release list', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
        await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTab();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTab.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTxnTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTabByTxn.click();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForReleaseTxn.input(reference3);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForReleaseTxnTW.select('TW - Payroll');
        }
        await _PaymentsPages.VerificationAndReleasesPage.goButtonForReleaseTxnTW.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.releaseByTxnI3Select1stTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTxnI3ButtonTW.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleasePaymentPage();
        await _PaymentsPages.VerificationAndReleasesPage.confirmReleaseI3Button.click();
        await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
        await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});

describe('TW_Payroll_Pagination', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('View Payroll for payee More than 2000', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageforPagination(SIT ? testData.Payroll.referenceSIT : testData.Payroll.referenceUAT, testData.Payroll.paymentType);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.loadConditionForViewPagination();
        await _PaymentsPages.PayrollPage.switchBulkViewTab(_PaymentsPages.PayrollPage.viewShowAllTab, testData.Payroll.firstLoadText);
        await _PaymentsPages.PayrollPage.viewLoadMoreButton.click();
        await _PaymentsPages.PayrollPage.switchBulkViewTab(_PaymentsPages.PayrollPage.viewShowAllTab, testData.Payroll.firstLoadText2);
        await _PaymentsPages.PayrollPage.viewLoadMoreButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForViewPagination();
        await _PaymentsPages.PayrollPage.checkPaginationForShowAllTab();
        await _PaymentsPages.PayrollPage.checkPaginationForRejectTab();
    });
});