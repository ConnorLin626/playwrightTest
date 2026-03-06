/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
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
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_ManagePayrollDBS', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.ManagePayrollDBS.SIT.loginCompanyId : testData.ManagePayrollDBS.UAT.loginCompanyId, SIT ? testData.ManagePayrollDBS.SIT.loginUserId : testData.ManagePayrollDBS.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create ManagePayrollDBS with new payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.ManagePayrollDBS);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayrollDBS.payeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(testData.ManagePayrollDBS.payeeBankID)
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayrollDBS.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayrollDBS.amountA1);
        await _PaymentsPages.PayrollPage.payeeRef.input(testData.ManagePayrollDBS.payeeRef);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.ManagePayrollDBS.paymentDetails);
        await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
        await _PaymentsPages.PayrollPage.emailIdO.input(testData.ManagePayrollDBS.emailIdO);
        await _PaymentsPages.PayrollPage.emailId1.input(testData.ManagePayrollDBS.emailId1);
        await _PaymentsPages.PayrollPage.emailId2.input(testData.ManagePayrollDBS.emailId2);
        await _PaymentsPages.PayrollPage.emailId3.input(testData.ManagePayrollDBS.emailId3);
        await _PaymentsPages.PayrollPage.emailId4.input(testData.ManagePayrollDBS.emailId4);
        await _PaymentsPages.PayrollPage.message.input(testData.ManagePayrollDBS.message);
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
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayrollDBS.amountA1),
            await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.ManagePayrollDBS.accountNumber),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create with ApprovaNow with M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.ManagePayrollDBS);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.ManagePayrollDBS.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayrollDBS.amountA1);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        //await ensure(_PaymentsPages.PayrollPage.mchallengeText).textContains(testData.ManagePayrollDBS.mChllengeText);
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.ManagePayrollDBS.EnterResponse);
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
        await _PaymentsPages.openMenu(Menu.Payments.ManagePayrollDBS);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayrollDBS.payeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(testData.ManagePayrollDBS.payeeBankID)
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayrollDBS.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayrollDBS.amountA2);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.ManagePayrollDBS.EnterResponse);
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

    it('Create ManagePayrollDBS with Save as Tempalte', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.ManagePayrollDBS);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.ManagePayrollDBS.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayrollDBS.amountA1);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'MPDTName' + generatedID();
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
            await ensure(_PaymentsPages.PayrollPage.viewTemplateFromAccount).textContains(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateAmount).textContains(testData.ManagePayrollDBS.amountA1),
            await ensure(_PaymentsPages.PayrollPage.viewTemplatePayeeNameValue).textContains(testData.ManagePayrollDBS.existingPayee),
        ]);
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayrollDBS.amountA1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.ManagePayrollDBS.existingPayee),
        ]);
    });

    it('Create ManagePayrollDBS from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.ManagePayrollDBS.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.PayrollPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayrollDBS.amountA1);
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
                await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount),
                await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayrollDBS.amountA1),
                await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.ManagePayrollDBS.existingPayee),
            ]);
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
                await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
                await ensure(_PaymentsPages.PayrollPage.payeeNameValue).isNotEmpty(),
            ]);
        }
    });

    it('Create ManagePayrollDBS with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.ManagePayrollDBS);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.ManagePayrollDBS.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayrollDBS.amountA1);
        await _PaymentsPages.PayrollPage.saveAsDraft.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayrollDBS.amountA1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.ManagePayrollDBS.existingPayee),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy ManagePayrollDBS via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Management payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.copyButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayrollDBS.amountV);
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
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayrollDBS.SIT.fromAccount : testData.ManagePayrollDBS.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayrollDBS.amountV),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });

    it('Reject ManagePayrollDBS via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Management payroll", testData.status.PendingApproval);
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
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionRejectStatus).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit ManagePayrollDBS via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Management payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.editButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayrollDBS.editamount);
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
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayrollDBS.editamount),
        ]);
    });

    it('Delete ManagePayrollDBS via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Management payroll", testData.status.PendingApproval);
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

describe('SG_ManagePayrollDBS_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.ManagePayrollDBS.SIT.loginCompanyId : testData.ManagePayrollDBS.UAT.loginCompanyId, SIT ? testData.ManagePayrollDBS.SIT.verifyUserId : testData.ManagePayrollDBS.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify ManagePayrollDBS via My Verify', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference3, "SG - Management payroll").then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Approve ManagePayrollDBS via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Management payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.approveButton.click();
        //await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
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

    it('Release ManagePayrollDBS via My Release', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "SG - Management payroll").then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

describe('SG_ManagePayrollDBS_Pagination', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.ManagePayrollDBS.SIT.loginCompanyId : testData.ManagePayrollDBS.UAT.loginCompanyId, SIT ? testData.ManagePayrollDBS.SIT.loginUserId : testData.ManagePayrollDBS.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('View ManagePayrollDBS for payee More than 1000 and less than 2000', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageforPagination(SIT ? testData.ManagePayrollDBS.referenceSIT : testData.ManagePayrollDBS.referenceUAT, testData.ManagePayrollDBS.paymentType);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.loadConditionForViewPagination();
        await _PaymentsPages.PayrollPage.switchBulkViewTab(_PaymentsPages.PayrollPage.viewShowAllTab, testData.ManagePayrollDBS.firstLoadText);
        await _PaymentsPages.PayrollPage.viewLoadMoreButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForViewPagination();
        await _PaymentsPages.PayrollPage.checkPaginationForShowAllTab();
        await _PaymentsPages.PayrollPage.checkPaginationForRejectTab();
    });
});