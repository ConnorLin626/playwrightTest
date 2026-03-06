/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from Online MEPS Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate for MEPS,then Approval
let reference2 = "";
// this from copy MEPS,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_MEPS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.MEPSPayment.SIT.loginCompanyId : testData.MEPSPayment.UAT.loginCompanyId, SIT ? testData.MEPSPayment.SIT.loginUserId : testData.MEPSPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create  MEPSPayment Payment with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.MEPSPaymentPage.newPayeeName.input(testData.MEPSPayment.newPayeeName);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAdd1.input(testData.MEPSPayment.newPayeeAdd1);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAdd2.input(testData.MEPSPayment.newPayeeAdd2);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAdd3.input(testData.MEPSPayment.newPayeeAdd3);
        await _PaymentsPages.MEPSPaymentPage.payeeBankID.select(testData.MEPSPayment.PayeebankID);
        await _PaymentsPages.MEPSPaymentPage.newPayeeAcctNumber.input(testData.MEPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.MEPSPaymentPage.emailIdO.input(testData.MEPSPayment.emailIdO);
        await _PaymentsPages.MEPSPaymentPage.emailId1.input(testData.MEPSPayment.emailId1);
        await _PaymentsPages.MEPSPaymentPage.emailId2.input(testData.MEPSPayment.emailId2);
        await _PaymentsPages.MEPSPaymentPage.emailId3.input(testData.MEPSPayment.emailId3);
        await _PaymentsPages.MEPSPaymentPage.emailId4.input(testData.MEPSPayment.emailId4);
        await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountA1),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSnewPayeeAccountNumberValue).textContains(testData.MEPSPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create MEPSPayment with ApprovalNow with Mchanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingPayee);
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.MEPSPaymentPage.faxTab.click();
        await _PaymentsPages.MEPSPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.MEPSPaymentPage.faxAreaCode0.input(testData.MEPSPayment.faxAreaCode0);
        await _PaymentsPages.MEPSPaymentPage.faxNo0.input(testData.MEPSPayment.faxNo0);
        await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.approvalNowCheckBox.jsClick();
        // await ensure(_PaymentsPages.MEPSPaymentPage.MEPSmChanllengeText).textContains(testData.MEPSPayment.MEPSmChanllengeText);
        await _PaymentsPages.MEPSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.MEPSPaymentPage.challengeResponse.input('OK');
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create MEPSPayment with ApprovalNow without Mchanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA2);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingPayee);
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.MEPSPaymentPage.emailIdO.input(testData.MEPSPayment.emailIdO);
        await _PaymentsPages.MEPSPaymentPage.emailId1.input(testData.MEPSPayment.emailId1);
        await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.approvalNowCheckBox.jsClick();
        // await ensure(_PaymentsPages.MEPSPaymentPage.MEPSwithoutMchanllenge).textContains(testData.MEPSPayment.MEPSWithoutChanllenge);
        await _PaymentsPages.MEPSPaymentPage.challengeResponse.input('OK');
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create MEPSPayment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingPayee);
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.MEPSPaymentPage.emailIdO.input(testData.MEPSPayment.emailIdO);
        await _PaymentsPages.MEPSPaymentPage.emailId1.input(testData.MEPSPayment.emailId1);
        await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'MEPSTName' + generatedID();
        await _PaymentsPages.MEPSPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.MEPSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.MEPSPaymentPage.fromAccountForTemplate).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.amountForTemplate).textContains(testData.MEPSPayment.amountA1),
            await ensure(_PaymentsPages.MEPSPaymentPage.payeeNameForTemplate).textContains(testData.MEPSPayment.existingPayee),
        ]);
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountA1),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSpayeeNameValue).textContains(testData.MEPSPayment.existingPayee),
        ]);
    });

    it('Create MEPSPayment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.MEPSPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionCreatePayemntTemplate();
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSpayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create MEPSPayment with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.fromAccount.select(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount);
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountA1);
        await _PaymentsPages.MEPSPaymentPage.existingPayee.select(testData.MEPSPayment.existingPayee);
        await _PaymentsPages.MEPSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.MEPSPaymentPage.paymentDetail.input(testData.MEPSPayment.paymentDetail);
        await _PaymentsPages.MEPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.MEPSPaymentPage.emailIdO.input(testData.MEPSPayment.emailIdO);
        await _PaymentsPages.MEPSPaymentPage.emailId1.input(testData.MEPSPayment.emailId1);
        await _PaymentsPages.MEPSPaymentPage.emailId2.input(testData.MEPSPayment.emailId2);
        await _PaymentsPages.MEPSPaymentPage.emailId3.input(testData.MEPSPayment.emailId3);
        await _PaymentsPages.MEPSPaymentPage.emailId4.input(testData.MEPSPayment.emailId4);
        await _PaymentsPages.MEPSPaymentPage.message.input(testData.MEPSPayment.message);
        await _PaymentsPages.MEPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.MEPSPaymentPage.transactionNote.input(testData.MEPSPayment.transactionNote);
        await _PaymentsPages.MEPSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.MEPSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).textContains(SIT ? testData.MEPSPayment.SIT.fromAccount : testData.MEPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountA1),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSpayeeNameValue).textContains(testData.MEPSPayment.existingPayee),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.Saved),

        ]);
    });

    it('Copy MEPSPayment Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - MEPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.copyButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.amount.clean();
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.amountV);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSfromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.amountV),
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });

    it('Reject MEPSPayment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - MEPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.rejectButton.click();
        await _PaymentsPages.MEPSPaymentPage.reasonForRejection.input(testData.MEPSPayment.rejectReason);
        await _PaymentsPages.MEPSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.MEPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit MEPSPayment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - MEPS Payment", testData.status.PendingApproval);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.editButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadCondition();
        await _PaymentsPages.MEPSPaymentPage.amount.clean();
        await _PaymentsPages.MEPSPaymentPage.amount.input(testData.MEPSPayment.editAmount);
        await _PaymentsPages.MEPSPaymentPage.nextButton.click();
        await _PaymentsPages.MEPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.MEPSPaymentPage.submitButton.click();
        await _PaymentsPages.MEPSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPSamountValue).textContains(testData.MEPSPayment.editAmount),
        ]);
    });

    it('Delete MEPSPayment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - MEPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.deleteButton.click();
        await _PaymentsPages.MEPSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.MEPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.MEPSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('SG_MEPSPayment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.MEPSPayment.SIT.loginCompanyId : testData.MEPSPayment.UAT.loginCompanyId, SIT ? testData.MEPSPayment.SIT.verifyUserId : testData.MEPSPayment.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify MEPSPayment via My Verify', async function () {

        await _PaymentsPages.VerificationAndReleasesPage.verifySingleTxn(_PaymentsPages, reference3, "SG - MEPS Payment").then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve MEPSPayment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - MEPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();
        await _PaymentsPages.MEPSPaymentPage.approveButton.click();
        await _PaymentsPages.MEPSPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.MEPSPaymentPage.challengeResponse.input('OK');
        await _PaymentsPages.MEPSPaymentPage.approveButton.click();
        await _PaymentsPages.MEPSPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.MEPSPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release MEPSPayment via My Release', async function () {

        await _PaymentsPages.VerificationAndReleasesPage.releaseSingleTxn(_PaymentsPages, verifyReference, approvalReference, "SG - MEPS Payment").then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.MEPSPaymentPage.loadConditionForViewMEPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.MEPSPaymentPage.MEPStransactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});