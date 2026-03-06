/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
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
let referenceEdit = "";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Manage Payroll Alternate', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ManagePayroll02.SIT.loginCompanyId : testData.ManagePayroll02.UAT.loginCompanyId, SIT ? testData.ManagePayroll02.SIT.loginUserId : testData.ManagePayroll02.UAT.loginUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Manage Payroll Alternate with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.managePayroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.jsClick();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll02.payeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.ManagePayroll02.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(testData.ManagePayroll02.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll02.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amountA1);
        await _PaymentsPages.PayrollPage.payeeRef.input(testData.ManagePayroll02.payeeRef);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.ManagePayroll02.paymentDetails);
        await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
        await _PaymentsPages.PayrollPage.emailIdO.input(testData.ManagePayroll02.emailIdO);
        await _PaymentsPages.PayrollPage.emailId1.input(testData.ManagePayroll02.emailId1);
        await _PaymentsPages.PayrollPage.emailId2.input(testData.ManagePayroll02.emailId2);
        await _PaymentsPages.PayrollPage.emailId3.input(testData.ManagePayroll02.emailId3);
        await _PaymentsPages.PayrollPage.emailId4.input(testData.ManagePayroll02.emailId4);
        await _PaymentsPages.PayrollPage.message.input(testData.ManagePayroll02.message);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField(false);//Add for IDXP-812
    });

    it('Create with ApprovaNow with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.managePayroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.ManagePayroll02.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amountA1);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.ManagePayroll02.EnterResponse);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create with ApprovaNow without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.managePayroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.jsClick();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.ManagePayroll02.payeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.ManagePayroll02.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(testData.ManagePayroll02.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.ManagePayroll02.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amountA2IX);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.ManagePayroll02.EnterResponse);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PartialApproved),
        ]);
    });

    it('Create Manage Payroll Alternate with Save as Tempalte', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.managePayroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.ManagePayroll02.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amountA1);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'MPDTName' + generatedID();
        await _PaymentsPages.PayrollPage.templateName.input(TemplateName);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayroll02.amountA1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.ManagePayroll02.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PayrollPage.loadConditionForViewTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateFromAccount).textContains(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateAmount).textContains(testData.ManagePayroll02.amountA1),
            await ensure(_PaymentsPages.PayrollPage.viewTemplatePayeeNameValue).textContains(testData.ManagePayroll02.existingPayee),
        ]);
    });

    it('Create Manage Payroll Alternate from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.ManagePayroll02.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.PayrollPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amountA1);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create Manage Payroll Alternate with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.managePayroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.ManagePayroll02.existingPayee);
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amountA1);
        await _PaymentsPages.PayrollPage.saveAsDraft.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayroll02.amountA1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.ManagePayroll02.existingPayee),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Copy Manage Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Management Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.copyButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.amountVIX);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayroll02.amountV),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit Manage Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Management Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.editButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.ManagePayroll02.editamount);
        await _PaymentsPages.PayrollPage.batchId.clean();
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        if(referenceEdit == reference){
            await checkViewPageAllField(true);//add for IDXP-812 
        }else{
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.ManagePayroll02.editamount),
            ]);
        }  
    });

    it('Reject Manage Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Management Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.rejectButton.jsClick();
        await _PaymentsPages.PayrollPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.PayrollPage.rejectDialogButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        console.log('start');
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        console.log('end');

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Delete Manage Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Management Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.deleteButton.jsClick();
        await _PaymentsPages.PayrollPage.deleteDialogButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXRejectDialogSuccess();
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Verify Manage Payroll Alternate via My Verify', async function () {

        await new NavigatePages().loginIdealx(SIT ? testData.ManagePayroll02.SIT.loginCompanyId : testData.ManagePayroll02.UAT.loginCompanyId, SIT ? testData.ManagePayroll02.SIT.verifyUserId : testData.ManagePayroll02.UAT.verifyUserId, "P@ssword123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.viewVerifyReleaseBtn.jsClick();
        await _PaymentsPages.PayrollPage.verifyReleaseConfirmButton.jsClick();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve Manage Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Management Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.approveButton.jsClick();
        await _PaymentsPages.PayrollPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.ManagePayroll02.EnterResponse);
        await _PaymentsPages.PayrollPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release Manage Payroll Alternate via My Release', async function () {

        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        if (0 !== verifyReference.trim().length && 0 !== approvalReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Management Payroll (Alternate)", testData.status.PendingRelease);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.viewVerifyReleaseBtn.jsClick();
        await _PaymentsPages.PayrollPage.verifyReleaseConfirmButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.ManagePayroll02.SIT.fromAccount : testData.ManagePayroll02.UAT.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(isEdit? testData.ManagePayroll02.editamount : testData.ManagePayroll02.amountA1),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.ManagePayroll02.accountNumber),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        //Add all field
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(testData.ManagePayroll02.paymentType),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentSummaryValue).textContains(isEdit? testData.ManagePayroll02.editamount : testData.ManagePayroll02.amountA1),
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.ManagePayroll02.payeeName),
        await ensure(_PaymentsPages.PayrollPage.payeeNickNameValue).textContains(testData.ManagePayroll02.newPayeeNickname),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue).textContains(SIT? testData.ManagePayroll02.SIT.bankName : testData.ManagePayroll02.UAT.bankName),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(testData.ManagePayroll02.payeeBankID),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(isEdit? testData.ManagePayroll02.editamount : testData.ManagePayroll02.amountA1),
        await ensure(_PaymentsPages.PayrollPage.purposeCodeValue).textContains(testData.ManagePayroll02.purposeCode),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(testData.ManagePayroll02.payeeRef),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue).textContains(testData.ManagePayroll02.paymentDetails),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll02.emailIdO),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll02.emailId1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll02.emailId2),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll02.emailId3),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.ManagePayroll02.emailId4),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(testData.ManagePayroll02.message),
        await ensure(_PaymentsPages.PayrollPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.activityLog).isNotEmpty(),
    ]);
    if(SIT){
        await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty()
    }
}