/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from Online Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let TemplateName = '';
let paymentReference = '';
let verifyReference = "";
let approvalReference = "";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK_Payroll Alternate', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.Payroll02.SIT.loginCompanyId : testData.Payroll02.UAT.loginCompanyId, SIT ? testData.Payroll02.SIT.loginUserId : testData.Payroll02.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Payroll Alternate with new payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPayroll02);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll02.payeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(testData.Payroll02.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll02.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.amountA1);
        await _PaymentsPages.PayrollPage.payeeRef.input(testData.Payroll02.payeeRef);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        // await _PaymentsPages.PayrollPage.paymentDetails.input(testData.Payroll02.paymentDetails);
        await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
        await _PaymentsPages.PayrollPage.emailIdO.input(testData.Payroll02.emailIdO);
        await _PaymentsPages.PayrollPage.emailId1.input(testData.Payroll02.emailId1);
        await _PaymentsPages.PayrollPage.emailId2.input(testData.Payroll02.emailId2);
        await _PaymentsPages.PayrollPage.emailId3.input(testData.Payroll02.emailId3);
        await _PaymentsPages.PayrollPage.emailId4.input(testData.Payroll02.emailId4);
        await _PaymentsPages.PayrollPage.message.input(testData.Payroll02.message);
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
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll02.amountA1),
            await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.Payroll02.accountNumber),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create with ApprovaNow with M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPayroll02);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll02.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.amountA1);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        //await ensure(_PaymentsPages.PayrollPage.mchallengeText).textContains(testData.ManagePayrollDBS.mChllengeText);
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll02.EnterResponse);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create with ApprovaNow without M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPayroll02);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll02.payeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(testData.Payroll02.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll02.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.amountA2);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll02.EnterResponse);
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
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create Payroll Alternate with Save as Tempalte', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPayroll02);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll02.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.amountA1);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'PAY2Tname' + generatedID();
        await _PaymentsPages.PayrollPage.templateName.input(TemplateName);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PayrollPage.loadConditionForViewTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateFromAccount).textContains(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateAmount).textContains(testData.Payroll02.amountA1),
            await ensure(_PaymentsPages.PayrollPage.viewTemplatePayeeNameValue).textContains(testData.Payroll02.existingPayee),
        ]);
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll02.amountA1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll02.existingPayee),
        ]);
    });

    it('Create Payroll Alternate from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.Payroll02.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.amountA1);
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

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create Payroll Alternate with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPayroll02);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll02.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.amountA1);
        await _PaymentsPages.PayrollPage.saveAsDraft.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll02.amountA1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll02.existingPayee),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.copyButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.amountV);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll02.SIT.fromAccount : testData.Payroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll02.amountV),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });

    it('Reject Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.rejectButton.click();
        await _PaymentsPages.PayrollPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.PayrollPage.rejectDialogButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        console.log('start');
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        console.log('end');

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionRejectStatus).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.editButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll02.editamount);
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
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll02.editamount),
        ]);
    });

    it('Delete Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
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

describe('HK_Payroll Alternate_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.Payroll02.SIT.loginCompanyId : testData.Payroll02.UAT.loginCompanyId, SIT ? testData.Payroll02.SIT.verifyUserId : testData.Payroll02.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify Payroll Alternate via My Verify', async function () {
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
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForVerifyTxn.select('HK - Payroll (Alternate)');
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
        });
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Approve Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll02.EnterResponse);
        await _PaymentsPages.PayrollPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release Payroll Alternate via My Release', async function () {
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
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForReleaseTxn.input(approvalReference);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForReleaseTxn.select('HK - Payroll (Alternate)');
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
        });
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});