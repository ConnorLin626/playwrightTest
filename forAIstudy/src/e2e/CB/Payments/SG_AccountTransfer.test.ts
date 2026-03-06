/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from Online ACT Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate for ACT,then Approval
let reference2 = "";
// this from copy ACT,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Account Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create an ACT Payment with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank SINGAPORE');
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.PartnerBank.newPayeeNickname);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd3.input(testData.AccountTransfer.newPayeeAdd3);
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create an ACT Payment with ApprovalNow with Mchanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.AccountTransferPage.getChallengeSMS).isVisible();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.click();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create an ACT Payment with ApprovalNow without Mchanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA2);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create an ACT Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'ACTTemplate' + generatedID();
        await _PaymentsPages.AccountTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
        await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select("SG - Account Transfer");
        await _PaymentsPages.PaymentTemplatesPage.searchButton.click();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeValue).textContains(testData.AccountTransfer.existingPayee),
        ]);

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeValue).textContains(testData.AccountTransfer.existingPayee),
        ]);
    });

    it('Create an ACT Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
            await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select("SG - Account Transfer");
            await _PaymentsPages.PaymentTemplatesPage.searchButton.click();
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AccountTransfer.existingTemplate);
            await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select("SG - Account Transfer");
            await _PaymentsPages.PaymentTemplatesPage.searchButton.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.AccountTransferPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.AccountTransferPage.nextButton.jsClick();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create an ACT with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.saveAsDraft.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeValue).textContains(testData.AccountTransfer.existingPayee),
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy an ACT via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.loadConditionForEdit();
        await _PaymentsPages.AccountTransferPage.amount.clean();
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
        await _PaymentsPages.AccountTransferPage.loadConditionForEdit();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountV),
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
        await _PaymentsPages.AccountTransferPage.rejectButton.click();
        await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.AccountTransfer.rejectReason);
        await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
        await _PaymentsPages.AccountTransferPage.editButton.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.loadConditionForEdit();
        await _PaymentsPages.AccountTransferPage.amount.clean();
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.editAmount);
        await _PaymentsPages.AccountTransferPage.loadConditionForEdit();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.editAmount),
        ]);
    });

    it('Delete an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
        await _PaymentsPages.AccountTransferPage.deleteButton.click();
        await _PaymentsPages.AccountTransferPage.deleteDialogButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('SG_Account Transfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.verifyUserId : testData.AccountTransfer.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify an ACT Payment via My Verify', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference3, 'SG - Account Transfer').then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release an ACT Payment via My Release', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'SG - Account Transfer').then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewACTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.ACTtransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});