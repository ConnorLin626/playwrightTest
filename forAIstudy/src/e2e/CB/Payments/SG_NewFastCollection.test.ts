/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from Online Fast Collection Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate for Fast Collection,then Approval
let reference2 = "";
// this from copy Fast Collection,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';
let _FilesPages = new FilesPages();
let fileName = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_New Fast Collectioon', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.NewFastCollection.SIT.loginCompanyId : testData.NewFastCollection.UAT.loginCompanyId, SIT ? testData.NewFastCollection.SIT.loginUserId : testData.NewFastCollection.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a New Fast Collection with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.NewFastCollectionPayment);
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(testData.NewFastCollection.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.newPayeeTab.click();
        await _PaymentsPages.NewFastCollectionPage.newPayerName.input(testData.NewFastCollection.newPayerName);
        await _PaymentsPages.NewFastCollectionPage.newPayerAdd1.input(testData.NewFastCollection.newPayerAdd1);
        await _PaymentsPages.NewFastCollectionPage.newPayerAdd2.input(testData.NewFastCollection.newPayerAdd2);
        await _PaymentsPages.NewFastCollectionPage.newPayerAdd3.input(testData.NewFastCollection.newPayerAdd3);
        await _PaymentsPages.NewFastCollectionPage.payeeBankID.select(SIT ? testData.NewFastCollection.SIT.payeeBankID : testData.NewFastCollection.UAT.payeeBankID);
        await _PaymentsPages.NewFastCollectionPage.newPayerAcctNumber.input(testData.NewFastCollection.newPayerAcctNumber);
        await _PaymentsPages.NewFastCollectionPage.ddaReference.input(testData.NewFastCollection.ddaReference);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.emailId2.input(testData.NewFastCollection.emailId2);
        await _PaymentsPages.NewFastCollectionPage.emailId3.input(testData.NewFastCollection.emailId3);
        await _PaymentsPages.NewFastCollectionPage.emailId4.input(testData.NewFastCollection.emailId4);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewFastCollectionPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(testData.NewFastCollection.fromAccount),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.amountA1),
            await ensure(_PaymentsPages.NewFastCollectionPage.toNewPayerValue).textContains(testData.NewFastCollection.newPayerName),
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create an Fast Collection Payment with ApprovalNow with Mchanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.NewFastCollectionPayment);
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(testData.NewFastCollection.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.faxTab.click();
        await _PaymentsPages.NewFastCollectionPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.NewFastCollectionPage.faxAreaCode0.input(testData.NewFastCollection.faxAreaCode0);
        await _PaymentsPages.NewFastCollectionPage.faxNo0.input(testData.NewFastCollection.faxNo0);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
        await _PaymentsPages.NewFastCollectionPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.NewFastCollectionPage.getChallengeSMS).isVisible();
        await _PaymentsPages.NewFastCollectionPage.getChallengeSMS.click();
        await _PaymentsPages.NewFastCollectionPage.challengeResponse.input('123123123');
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewFastCollectionPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create an Fast Collection Payment with ApprovalNow without Mchanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.NewFastCollectionPayment);
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(testData.NewFastCollection.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA2);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
        await _PaymentsPages.NewFastCollectionPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.NewFastCollectionPage.challengeResponse.input('123123123');
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewFastCollectionPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create an Fast Collection Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.NewFastCollectionPayment);
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(testData.NewFastCollection.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
        await _PaymentsPages.NewFastCollectionPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'FastCollTemplate' + generatedID();
        await _PaymentsPages.NewFastCollectionPage.templateName.input(TemplateName);
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewFastCollectionPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollecctionTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(testData.NewFastCollection.fromAccount),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue1).textContains(testData.NewFastCollection.amountA1),
            await ensure(_PaymentsPages.NewFastCollectionPage.toExistingPayerValue).textContains(testData.NewFastCollection.existingPayee),
        ]);

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(testData.NewFastCollection.fromAccount),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.amountA1),
            await ensure(_PaymentsPages.NewFastCollectionPage.toExistingPayerValue).textContains(testData.NewFastCollection.existingPayee),
        ]);
    });

    it('Create an Fast Collection Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.NewFastCollection.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.NewFastCollectionPage.nextButton.jsClick();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NewFastCollectionPage.toExistingPayerValue).isNotEmpty(),
        ]);
    });

    it('Create an Fast Collection with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.NewFastCollectionPayment);
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(testData.NewFastCollection.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.emailId2.input(testData.NewFastCollection.emailId2);
        await _PaymentsPages.NewFastCollectionPage.emailId3.input(testData.NewFastCollection.emailId3);
        await _PaymentsPages.NewFastCollectionPage.emailId4.input(testData.NewFastCollection.emailId4);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.saveAsDraft.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(testData.NewFastCollection.fromAccount),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.amountA1),
            await ensure(_PaymentsPages.NewFastCollectionPage.toExistingPayerValue).textContains(testData.NewFastCollection.existingPayee),
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy an Fast Collection via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.copyButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForEdit();
        await _PaymentsPages.NewFastCollectionPage.amount.clean();
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountV);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForEdit();
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.amountV),
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject an Fast Collection Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.rejectButton.click();
        await _PaymentsPages.NewFastCollectionPage.reasonForRejection.input(testData.NewFastCollection.rejectReason);
        await _PaymentsPages.NewFastCollectionPage.rejectDialogButton.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit an Fast Collection Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.editButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForEdit();
        await _PaymentsPages.NewFastCollectionPage.amount.clean();
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.editAmount);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForEdit();
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.editAmount),
        ]);
    });

    it('Delete an Fast Collection Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.deleteButton.click();
        await _PaymentsPages.NewFastCollectionPage.deleteDialogButton.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Upload Fast Collection via Files->File Upload->Upload Files', async function () {
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload(_FilesPages, testData.NewFastCollection.fileType, testData.NewFastCollection.fileFormat, SIT ? testData.NewFastCollection.SIT.fileName : testData.NewFastCollection.UAT.fileName, testData.NewFastCollection.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(testData.NewFastCollection.fromAccount),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.amountA1),
            await ensure(_PaymentsPages.NewFastCollectionPage.toNewPayerValue).textContains(testData.NewFastCollection.newPayerName),
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });
});

describe('SG_Fast Collection_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.NewFastCollection.SIT.loginCompanyId : testData.NewFastCollection.UAT.loginCompanyId, SIT ? testData.NewFastCollection.SIT.verifyUserId : testData.NewFastCollection.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify an Fast Collection Payment via My Verify', async function () {
        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference3, 'Fast Collection').then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an Fast Collection Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch('Fsat Collection', testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.approveButton.click();
        await _PaymentsPages.NewFastCollectionPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.NewFastCollectionPage.challengeResponse.input('123123123');
        await _PaymentsPages.NewFastCollectionPage.approveButton.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release an Fast Collection Payment via My Release', async function () {
        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'Fast Collection').then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});