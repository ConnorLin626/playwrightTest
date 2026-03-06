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

describe('TW ACH Payment', async function () {
    this.retries(browser.params.caseRetryTimes);

    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TWACHBPY.SIT.loginCompanyId : testData.TWACHBPY.UAT.loginCompanyId, SIT ? testData.TWACHBPY.SIT.loginUserId : testData.TWACHBPY.UAT.loginUserId, SIT ? 123123 : testData.TWACHBPY.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('create ACH Bulk Payment with New Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.TWACHBPY.billerServiceID);
        await addNewPayee(testData.TWACHBPY.amountA1);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await checkViewPageAllField(); //IDXP-812
    });

    it('create ACH Bulk Payment with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.TWACHBPY.billerServiceID);
        await addNewPayee(testData.TWACHBPY.amountA1);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await ensure(_PaymentsPages.BulkPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.TWACHBPY.EnterResponse);
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

    it('create ACH Bulk Payment with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.TWACHBPY.billerServiceID);
        await addNewPayee(testData.TWACHBPY.amountA2Ix);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.TWACHBPY.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHBPY.amountA2),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved),
        ]);
    });

    it('Create ACH Bulk payment with Save as Tempalte', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.TWACHBPY.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.TWACHBPY.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHBPY.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeNationalID.input(testData.TWACHBPY.payeeNationalID);
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
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateFromAccount).textContains(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateAmount).textContains(testData.TWACHBPY.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.TWACHBPY.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHBPY.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.TWACHBPY.existingPayee),
        ]);
    });

    it('Create a ACH Bulk Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHBPY.existingTemplate);
        // }
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHBPY.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHBPY.amountA1);
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

    it('Create a ACH Bulk Payment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.TWACHBPY.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.TWACHBPY.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHBPY.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeNationalID.input(testData.TWACHBPY.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.saveAsDraft.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
            console.log("printACHref"+paymentReference);
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHBPY.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.TWACHBPY.existingPayee),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Copy a ACH Bulk via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.copyButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHBPY.amountVIx);
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
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHBPY.amountV),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a ACH Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissRejectDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Edit a ACH Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.editButton.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHBPY.editamount);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHBPY.editamount),
        ]);
    });

    it('Delete a ACH Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Payment", testData.status.PendingApproval);
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

    it('Verify a ACH Bulk Payment via My Verify', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.BulkPaymentPage.billerServiceID.select(testData.TWACHBPY.billerServiceID);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.TWACHBPY.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.TWACHBPY.amountVIx);
        await _PaymentsPages.BulkPaymentPage.payeeNationalID.input(testData.TWACHBPY.payeeNationalID);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await new NavigatePages().loginIdealx(SIT ? testData.TWACHBPY.SIT.loginCompanyId : testData.TWACHBPY.UAT.loginCompanyId, SIT ? testData.TWACHBPY.SIT.verifyUserId : testData.TWACHBPY.UAT.verifyUserId, SIT ? 123123 : testData.TWACHBPY.UAT.Password);
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
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a ACH Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.approveButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.TWACHBPY.EnterResponse);
        await _PaymentsPages.PayrollPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        // await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await browser.sleep(1000);
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a ACH Bulk Payment via My Release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _ApprovalsPages.MyVerificationAndReleasePage.viewVerifyReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseConfirmButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function addNewPayee(amountValue: any) {
    await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
    await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.TWACHBPY.payeeName);
    await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.TWACHBPY.newPayeeNickname);
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT ? testData.TWACHBPY.SIT.payeeBankID : testData.TWACHBPY.UAT.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.TWACHBPY.accountNumber);
    await _PaymentsPages.BulkPaymentPage.payeeNationalID.input(testData.TWACHBPY.companyID);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(amountValue);
    // await _PaymentsPages.BulkPaymentPage.payeeNationalID.input(testData.TWACHBPY.payeeNationalID);
    await _PaymentsPages.BulkPaymentPage.payeeMandateDetail.input(testData.TWACHBPY.payeeMandateDetail);
    await _PaymentsPages.BulkPaymentPage.payeeStockCode.input(testData.TWACHBPY.payeeStockCode);
    await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.BulkPaymentPage.payeePassbook.input(testData.TWACHBPY.payeePassbook);
    await _PaymentsPages.BulkPaymentPage.payeeFreeText4Sender.input(testData.TWACHBPY.payeePaymentDetail);
    await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.TWACHBPY.emailIdO);
    await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.TWACHBPY.emailId1);
    await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.TWACHBPY.emailId2);
    await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.TWACHBPY.emailId3);
    await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.TWACHBPY.emailId4);
    await _PaymentsPages.BulkPaymentPage.message.input(testData.TWACHBPY.message);
}

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.TWACHBPY.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(testData.TWACHBPY.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.bankChargeView).textContains(testData.TWACHBPY.bankChargeView),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccountView).textContains(SIT ? testData.TWACHBPY.SIT.fromAccount : testData.TWACHBPY.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.billerServiceIDValue).textContains(testData.TWACHBPY.billerServiceID),

        //Payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.TWACHBPY.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(SIT ? testData.TWACHBPY.SIT.payeeBankID : testData.TWACHBPY.UAT.payeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.TWACHBPY.accountNumber),
         await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.TWACHBPY.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.mandateDetailsView).textContains(testData.TWACHBPY.payeeMandateDetail),
        await ensure(_PaymentsPages.BulkPaymentPage.stockCodeView).textContains(testData.TWACHBPY.payeeStockCode),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.passBookView).textContains(testData.TWACHBPY.payeePassbook),
        await ensure(_PaymentsPages.BulkPaymentPage.freeTextView).textContains(testData.TWACHBPY.payeePaymentDetail),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.TWACHBPY.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.TWACHBPY.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.TWACHBPY.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.TWACHBPY.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.TWACHBPY.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.TWACHBPY.emailId4),
    ]);
}