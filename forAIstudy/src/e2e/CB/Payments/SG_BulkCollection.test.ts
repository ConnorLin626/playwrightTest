/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
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
let TemplateName = '';
let paymentReference = '';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Bulk Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkCollection.SIT.loginCompanyId : testData.BulkCollection.UAT.loginCompanyId, SIT ? testData.BulkCollection.SIT.loginUserId : testData.BulkCollection.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a Bulk collection with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentSGBulkCollection);
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.bulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.bulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayeeName);
        await _PaymentsPages.bulkCollectionPage.payerBankID.select(testData.BulkCollection.payerBankID);
        await _PaymentsPages.bulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.bulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.bulkCollectionPage.addPayer.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
        await _PaymentsPages.bulkCollectionPage.payeeRef.input(testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.bulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        await _PaymentsPages.bulkCollectionPage.msgToPayer.jsClick();
        await _PaymentsPages.bulkCollectionPage.emailIdO.input(testData.BulkCollection.emailIdO);
        await _PaymentsPages.bulkCollectionPage.emailId1.input(testData.BulkCollection.emailId1);
        await _PaymentsPages.bulkCollectionPage.emailId2.input(testData.BulkCollection.emailId2);
        await _PaymentsPages.bulkCollectionPage.emailId3.input(testData.BulkCollection.emailId3);
        await _PaymentsPages.bulkCollectionPage.emailId4.input(testData.BulkCollection.emailId4);
        await _PaymentsPages.bulkCollectionPage.msg.input(testData.BulkCollection.message);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
            await ensure(_PaymentsPages.bulkCollectionPage.accountNumberValue).textContains(testData.BulkCollection.payerBankAccountNumber),
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('create a Bulk Collection with Approve Now with Mchallenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentSGBulkCollection);
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.loadConditionForPayee();
        await _PaymentsPages.bulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.bulkCollectionPage.addButton.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
        await _PaymentsPages.bulkCollectionPage.payeeRef.input(testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.bulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        await _PaymentsPages.bulkCollectionPage.msgToPayer.jsClick();
        await _PaymentsPages.bulkCollectionPage.emailIdO.input(testData.BulkCollection.emailIdO);
        await _PaymentsPages.bulkCollectionPage.emailId1.input(testData.BulkCollection.emailId1);
        await _PaymentsPages.bulkCollectionPage.emailId2.input(testData.BulkCollection.emailId2);
        await _PaymentsPages.bulkCollectionPage.emailId3.input(testData.BulkCollection.emailId3);
        await _PaymentsPages.bulkCollectionPage.emailId4.input(testData.BulkCollection.emailId4);
        await _PaymentsPages.bulkCollectionPage.msg.input(testData.BulkCollection.message);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.bulkCollectionPage.getChallengeButton).isVisible();
        await _PaymentsPages.bulkCollectionPage.getChallengeButton.click();
        await _PaymentsPages.bulkCollectionPage.challengeResponse.input(testData.BulkCollection.responseCode);
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('create a Bulk Collection with Approve Now without Mchallenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentSGBulkCollection);
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.loadConditionForPayee();
        await _PaymentsPages.bulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.bulkCollectionPage.addButton.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.amountA2);
        await _PaymentsPages.bulkCollectionPage.payeeRef.input(testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.bulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        await _PaymentsPages.bulkCollectionPage.msgToPayer.jsClick();
        await _PaymentsPages.bulkCollectionPage.emailIdO.input(testData.BulkCollection.emailIdO);
        await _PaymentsPages.bulkCollectionPage.emailId1.input(testData.BulkCollection.emailId1);
        await _PaymentsPages.bulkCollectionPage.emailId2.input(testData.BulkCollection.emailId2);
        await _PaymentsPages.bulkCollectionPage.emailId3.input(testData.BulkCollection.emailId3);
        await _PaymentsPages.bulkCollectionPage.emailId4.input(testData.BulkCollection.emailId4);
        await _PaymentsPages.bulkCollectionPage.msg.input(testData.BulkCollection.message);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.bulkCollectionPage.challengeResponse.input(testData.BulkCollection.responseCode);
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.PartialApproved),
        ]);
    });

    it('Create a Bulk collection save as template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentSGBulkCollection);
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.bulkCollectionPage.newPayerTab.click();
        let PayeeName = 'bulkcolpayee' + generatedID();
        await _PaymentsPages.bulkCollectionPage.newPayeeName.input(PayeeName);
        await _PaymentsPages.bulkCollectionPage.payerBankID.select(testData.BulkCollection.payerBankID);
        await _PaymentsPages.bulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.bulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.bulkCollectionPage.addPayer.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
        await _PaymentsPages.bulkCollectionPage.payeeRef.input(testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.bulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        await _PaymentsPages.bulkCollectionPage.msgToPayer.jsClick();
        await _PaymentsPages.bulkCollectionPage.emailIdO.input(testData.BulkCollection.emailIdO);
        await _PaymentsPages.bulkCollectionPage.emailId1.input(testData.BulkCollection.emailId1);
        await _PaymentsPages.bulkCollectionPage.emailId2.input(testData.BulkCollection.emailId2);
        await _PaymentsPages.bulkCollectionPage.emailId3.input(testData.BulkCollection.emailId3);
        await _PaymentsPages.bulkCollectionPage.emailId4.input(testData.BulkCollection.emailId4);
        await _PaymentsPages.bulkCollectionPage.msg.input(testData.BulkCollection.message);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.saveAsTemplate.jsClick();
        TemplateName = 'COLName' + generatedID();
        await _PaymentsPages.bulkCollectionPage.templateName.input(TemplateName)
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
            await ensure(_PaymentsPages.bulkCollectionPage.accountNumberValue).textContains(testData.BulkCollection.payerBankAccountNumber),
        ]);
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.bulkCollectionPage.viewTemplateFromAccount).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.bulkCollectionPage.viewTemplateAmount).textContains(testData.BulkCollection.amountA1)
        ]);
    });

    it('Create a Bulk Collection Payment from template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.BulkCollection.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForCreateFromTempaltePage();
        await _PaymentsPages.bulkCollectionPage.amount.clean();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
        await _PaymentsPages.bulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.clean();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        // await _PaymentsPages.bulkCollectionPage.msg.input(testData.BulkCollection.message);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).isNotEmpty(),
        ]);
    });

    it('save a Bulk Collection ', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentSGBulkCollection);
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.loadConditionForPayee();
        await _PaymentsPages.bulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.bulkCollectionPage.addButton.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
        await _PaymentsPages.bulkCollectionPage.payeeRef.input(testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.bulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        await _PaymentsPages.bulkCollectionPage.msgToPayer.jsClick();
        await _PaymentsPages.bulkCollectionPage.emailIdO.input(testData.BulkCollection.emailIdO);
        await _PaymentsPages.bulkCollectionPage.emailId1.input(testData.BulkCollection.emailId1);
        await _PaymentsPages.bulkCollectionPage.emailId2.input(testData.BulkCollection.emailId2);
        await _PaymentsPages.bulkCollectionPage.emailId3.input(testData.BulkCollection.emailId3);
        await _PaymentsPages.bulkCollectionPage.emailId4.input(testData.BulkCollection.emailId4);
        await _PaymentsPages.bulkCollectionPage.msg.input(testData.BulkCollection.message);
        await _PaymentsPages.bulkCollectionPage.saveAsDraft.click();

        await _PaymentsPages.bulkCollectionPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.bulkCollectionPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Copy an Bulk Collection', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.bulkCollectionPage.copyButton.click();
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.amount.clean();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.amountV);
        await _PaymentsPages.bulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.clean();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.bulkCollectionPage.rejectButton.click();
        await _PaymentsPages.bulkCollectionPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.bulkCollectionPage.rejectDialogButton.click();
        await _PaymentsPages.bulkCollectionPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.bulkCollectionPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Edit an Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.bulkCollectionPage.editButton.click();
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.amount.clean();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.editAmount);
        await _PaymentsPages.bulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.clean();
        await _PaymentsPages.bulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        await _PaymentsPages.bulkCollectionPage.batchID.clean()
        await _PaymentsPages.bulkCollectionPage.nextButton.jsClick();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).isNotEmpty(),
        ]);
    });

    it('Delete a Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.bulkCollectionPage.deleteButton.click();
        await _PaymentsPages.bulkCollectionPage.deleteDialogButton.click();
        await _PaymentsPages.bulkCollectionPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.bulkCollectionPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Can not create Bulk Collection with item amount greater than 999999999.99 SGD', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentSGBulkCollection);
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.bulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.bulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayeeName);
        await _PaymentsPages.bulkCollectionPage.payerBankID.select(testData.BulkCollection.payerBankID);
        await _PaymentsPages.bulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.bulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.bulkCollectionPage.addPayer.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.moreThanMaxAmount);
        await ensure(_PaymentsPages.bulkCollectionPage.amountErrorTip).textContains(testData.BulkCollection.amountErrorTip);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.hasUXErrorMsg(testData.BulkCollection.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create Bulk Collection with item amount enqual to 999999999.99 SGD', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentSGBulkCollection);
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.bulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.bulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayeeName);
        await _PaymentsPages.bulkCollectionPage.payerBankID.select(testData.BulkCollection.payerBankID);
        await _PaymentsPages.bulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.bulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.bulkCollectionPage.addPayer.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.maxAmount);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.bulkCollectionPage.amountValue).textContains(testData.BulkCollection.maxAmount),
        ]);
    });

    it('Create Bulk Collection with Total amount greater than 999999999.99 SGD', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentSGBulkCollection);
        await _PaymentsPages.bulkCollectionPage.loadCondition();
        await _PaymentsPages.bulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.bulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.bulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayeeName);
        await _PaymentsPages.bulkCollectionPage.payerBankID.select(testData.BulkCollection.payerBankID);
        await _PaymentsPages.bulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.bulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.bulkCollectionPage.addPayer.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.maxAmount);
        await _PaymentsPages.bulkCollectionPage.existingPayerTab.jsClick();
        await _PaymentsPages.bulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.bulkCollectionPage.addButton.click();
        await _PaymentsPages.bulkCollectionPage.amount.input(testData.BulkCollection.maxAmount);
        await _PaymentsPages.bulkCollectionPage.nextButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.bulkCollectionPage.submitButton.click();
        await _PaymentsPages.bulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.bulkCollectionPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.bulkCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            // await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.Payroll.maxAmount),
        ]);
    });
});

describe('SG_Bulk Collection_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkCollection.SIT.loginCompanyId : testData.BulkCollection.UAT.loginCompanyId, SIT ? testData.BulkCollection.SIT.verifyUserId : testData.BulkCollection.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify an Bulk Collection via My Verify', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference3, "SG - Bulk Collection").then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a Bulk Collection via Transfer Center', async function () {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.bulkCollectionPage.approveButton.click();
        await _PaymentsPages.bulkCollectionPage.getChallengeButton.clickIfExist();
        await _PaymentsPages.bulkCollectionPage.challengeResponse.input('123123123');
        await _PaymentsPages.bulkCollectionPage.approveButton.click();
        await _PaymentsPages.bulkCollectionPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.bulkCollectionPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release Bulk Collection via My Release', async function () {
        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "SG - Bulk Collection").then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.bulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

// describe('SG_Bulk Collection_Pagination', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkCollection.SIT.loginCompanyId : testData.BulkCollection.UAT.loginCompanyId, SIT ? testData.BulkCollection.SIT.loginUserId : testData.BulkCollection.UAT.loginUserId); });
//     const suitObject = this;beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

//     it('View Bulk Collection for payee More than 1000 and less than 2000', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.loadCondition();
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageforPagination(SIT ? testData.BulkCollection.referenceSIT : testData.BulkCollection.referenceUAT, testData.BulkCollection.paymentType);
//         await _PaymentsPages.bulkCollectionPage.loadConditionForViewBulkCollectionPage();
//         await _PaymentsPages.bulkCollectionPage.loadConditionForViewPagination();
//         await _PaymentsPages.bulkCollectionPage.switchBulkViewTab(_PaymentsPages.bulkCollectionPage.viewShowAllTab, testData.BulkCollection.firstLoadText);
//         await _PaymentsPages.bulkCollectionPage.viewLoadMoreButton.click();
//         await _PaymentsPages.bulkCollectionPage.loadConditionForViewPagination();
//         await _PaymentsPages.bulkCollectionPage.checkPaginationForShowAllTab();
//         await _PaymentsPages.bulkCollectionPage.checkPaginationForRejectTab();
//     });
// });