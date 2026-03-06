/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser } from 'protractor';
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, handlerCase, SIT, PROJECT_TYPE } from "../../../lib";

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let reference: string = null;
let reference2 = "";
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';

describe('TW ACH Payroll', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TWACHPayroll.SIT.loginCompanyId : testData.TWACHPayroll.UAT.loginCompanyId, SIT ? testData.TWACHPayroll.SIT.loginUserId : testData.TWACHPayroll.UAT.loginUserId, SIT ? 123123 : testData.TWACHPayroll.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('create ACH Payroll with New Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount);
        //await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
        await addNewPayee();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.amountA1);
        await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.TWACHPaymentPage.payeePassbook.input(testData.TWACHPayroll.payeePassbook);
        await _PaymentsPages.TWACHPaymentPage.payeePaymentDetail.input(testData.TWACHPayroll.payeePaymentDetail);
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.TWACHPayroll.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.TWACHPayroll.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.TWACHPayroll.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.TWACHPayroll.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.TWACHPayroll.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.TWACHPayroll.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHPayroll.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.TWACHPayroll.accountNumber),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('create ACH Payroll with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount);
        //await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
        await addNewPayee();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.amountA1);
        await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.TWACHPaymentPage.payeePassbook.input(testData.TWACHPayroll.payeePassbook);
        await _PaymentsPages.TWACHPaymentPage.payeePaymentDetail.input(testData.TWACHPayroll.payeePaymentDetail);
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.TWACHPayroll.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.TWACHPayroll.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.TWACHPayroll.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.TWACHPayroll.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.TWACHPayroll.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.TWACHPayroll.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await ensure(_PaymentsPages.BulkPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.TWACHPayroll.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('create ACH Payroll with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount);
        //await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
        await addNewPayee();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.amountA2Ix);
        await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.TWACHPayroll.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHPayroll.amountA2),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PartialApproved),
        ]);
    });

    it('Create ACH Bulk Payroll with Save as Tempalte', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount);
        //await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.TWACHPayroll.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.amountA1);
        await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'BPTName' + generatedID();
        await _PaymentsPages.BulkPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateFromAccount).textContains(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateAmount).textContains(testData.TWACHPayroll.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.TWACHPayroll.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHPayroll.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.TWACHPayroll.existingPayee),
        ]);
    });

    it('Create a ACH Bulk Payroll from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHPayroll.existingTemplate);
        // }
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHPayroll.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.amountA1);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create a ACH Payroll with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount);
        //await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.TWACHPayroll.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.amountA1);
        await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.saveAsDraft.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHPayroll.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.TWACHPayroll.existingPayee),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Copy a ACH Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.copyButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.amountVIx);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHPayroll.amountV),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a Bulk Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Edit a Bulk Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.editButton.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await browser.sleep(8000);
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.editamount);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHPayroll.editamount),
        ]);
    });

    it('Delete a Bulk Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDeleteDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference3);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Verify a Bulk Payroll via My Verify', async function () {

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHPayroll.SIT.fromAccount : testData.TWACHPayroll.UAT.fromAccount);
        //await _PaymentsPages.TWACHPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.TWACHPaymentPage.billerServiceID.select(testData.TWACHPayroll.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.TWACHPayroll.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHPayroll.amountVIx);
        await _PaymentsPages.TWACHPaymentPage.payeeNationalID.input(testData.TWACHPayroll.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await new NavigatePages().loginIdealx(SIT ? testData.TWACHPayroll.SIT.loginCompanyId : testData.TWACHPayroll.UAT.loginCompanyId, SIT ? testData.TWACHPayroll.SIT.verifyUserId : testData.TWACHPayroll.UAT.verifyUserId,  SIT ? 123123 : testData.TWACHPayroll.UAT.Password);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _ApprovalsPages.MyVerificationAndReleasePage.viewVerifyReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseConfirmButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        ]);
    });

    it('Approve a Bulk Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.approveButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.TWACHPayroll.EnterResponse);
        await _PaymentsPages.PayrollPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a ACH Payroll via My Release', async function () {

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _ApprovalsPages.MyVerificationAndReleasePage.viewVerifyReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseConfirmButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

});

export async function addNewPayee() {
    await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.TWACHPayroll.payeeName);
    await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.TWACHPayroll.newPayeeNickname);
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.TWACHPayroll.SIT.payeeBankID : testData.TWACHPayroll.UAT.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.TWACHPayroll.accountNumber);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
}