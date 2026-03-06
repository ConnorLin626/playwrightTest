/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, handlerCase, SIT } from '../../../lib';
import { browser } from 'protractor';
import * as moment from "moment";
// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let TemplateName = '';
let paymentReference = '';
let verifyReference = '';
let approvalReference = '';
let _ApprovalsPages = new ApprovalsPages();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');

describe('IN_NEFT Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.NEFTPayment.SIT.loginCompanyId : testData.NEFTPayment.UAT.loginCompanyId, SIT ? testData.NEFTPayment.SIT.loginUserId : testData.NEFTPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a NEFT Payment with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.NEFTPaymentPage.newPayeeName.input(testData.NEFTPayment.newPayeeName);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd1.input(testData.NEFTPayment.newPayeeAdd1);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd2.input(testData.NEFTPayment.newPayeeAdd2);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd3.input(testData.NEFTPayment.newPayeeAdd3);
        await _PaymentsPages.NEFTPaymentPage.payeeBankID.select(SIT ? testData.NEFTPayment.SIT.payeeBankID : testData.NEFTPayment.UAT.payeeBankID);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAcctNumber.input(testData.NEFTPayment.newPayeeAcctNumber);
        // await _PaymentsPages.NEFTPaymentPage.selectedCategory.select(testData.NEFTPayment.category);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.payeeReference.input(testData.NEFTPayment.payeeReference);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXSuccess();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.toPayeeValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.NEFTPaymentPage.cutoffTimeValue).isNotEmpty(),
            //await ensure(_PaymentsPages.NEFTPaymentPage.exchangeRateValue).isNotEmpty(),
        ]);
    });

    it('Create a NEFT Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA2);
        await _PaymentsPages.NEFTPaymentPage.existingPayee.select(testData.NEFTPayment.existingPayee);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.NEFTPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXSuccess();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a NEFT Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.existingPayee.select(testData.NEFTPayment.existingPayee);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.NEFTPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.NEFTPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXSuccess();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a NEFT Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.existingPayee.select(testData.NEFTPayment.existingPayee);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'NEFTName' + generatedID();
        await _PaymentsPages.NEFTPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXSuccess();

        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValueForTemplate).textContains(testData.NEFTPayment.amountA1),
            await ensure(_PaymentsPages.NEFTPaymentPage.payeeValueForTemplate).textContains(testData.NEFTPayment.existingPayee),
        ]);

        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).textContains(testData.NEFTPayment.amountA1),
            await ensure(_PaymentsPages.NEFTPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a NEFT Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.NEFTPayment.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXSuccess();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a NEFT Payment with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.existingPayee.select(testData.NEFTPayment.existingPayee);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.saveAsDraft.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).textContains(testData.NEFTPayment.amountA1),
            await ensure(_PaymentsPages.NEFTPaymentPage.toExistingPayeeValue).textContains(testData.NEFTPayment.existingPayee),
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a NEFT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.copyButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.amount.clean();
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountV);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXSuccess();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).textContains(testData.NEFTPayment.amountV),
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a NEFT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.rejectButton.click();
        await _PaymentsPages.NEFTPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.NEFTPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit a NEFT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.editButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.amount.clean();
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.editAmount);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXSuccess();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).isNotEmpty(),
        ]);
    });

    it('Delete a NEFT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.deleteButton.click();
        await _PaymentsPages.NEFTPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    //for AB-9129
    it('Create a NEFT Payment then approve then check the paymentdate', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.NEFTPaymentPage.newPayeeName.input(testData.NEFTPayment.newPayeeName);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd1.input(testData.NEFTPayment.newPayeeAdd1);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd2.input(testData.NEFTPayment.newPayeeAdd2);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd3.input(testData.NEFTPayment.newPayeeAdd3);
        await _PaymentsPages.NEFTPaymentPage.payeeBankID.select(SIT ? testData.NEFTPayment.SIT.payeeBankID : testData.NEFTPayment.UAT.payeeBankID);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAcctNumber.input(testData.NEFTPayment.newPayeeAcctNumber);
        // await _PaymentsPages.NEFTPaymentPage.selectedCategory.select(testData.NEFTPayment.category);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.payeeReference.input(testData.NEFTPayment.payeeReference);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXSuccess();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.toPayeeValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.NEFTPaymentPage.cutoffTimeValue).textContains(currentDate)
        ]);
        // approve above payment then ckeck the paymentdate
        await _PaymentsPages.NEFTPaymentPage.approveButton.click();
        await _PaymentsPages.NEFTPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NEFTPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.NEFTPaymentPage.approveButton.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
            await ensure(_PaymentsPages.NEFTPaymentPage.cutoffTimeValue).textContains(currentDate)
        ]);
    });
});

describe('IN_NEFT Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.NEFTPayment.SIT.loginCompanyId : testData.NEFTPayment.UAT.loginCompanyId, SIT ? testData.NEFTPayment.SIT.verifyUserId : testData.NEFTPayment.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a NEFT Payment via My Verify', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference3, 'IN - NEFT Payment').then(reference => {
            verifyReference = reference;
        })

        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a NEFTPayment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.approveButton.click();
        await _PaymentsPages.NEFTPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NEFTPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.NEFTPaymentPage.approveButton.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a NEFT Payment via My Release', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'IN - NEFT Payment').then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});