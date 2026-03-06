/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, handlerCase, SIT, devWatch } from '../../../lib';
import { browser } from 'protractor';
import { OperationsPages } from '../../../pages/SAM';
import * as moment from "moment";

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
// this for Approve RTGS after cutoff time
let reference4 = "";
let TemplateName = '';
let paymentReference = '';
let verifyReference = '';
let approvalReference = '';
let paymentReferenceMax = '';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _OperationsPages = new OperationsPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let day = new Date().getDay();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let paymentDate = moment().add(1, 'days').format('DD MMM YYYY');


describe('IN_RTGS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.RTGSPayment.SIT.loginCompanyId : testData.RTGSPayment.UAT.loginCompanyId, SIT ? testData.RTGSPayment.SIT.loginUserId : testData.RTGSPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a RTGS Payment with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        // await _PaymentsPages.RTGSPaymentPage.selectedCategory.select(testData.RTGSPayment.category);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.emailId3.input(testData.RTGSPayment.emailId3);
        await _PaymentsPages.RTGSPaymentPage.emailId4.input(testData.RTGSPayment.emailId4);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountA1),
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).isNotEmpty(),
            // await ensure(_PaymentsPages.RTGSPaymentPage.exchangeRateValue).isNotEmpty(),
        ]);
    });

    it('Create a RTGS Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA2);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.emailId3.input(testData.RTGSPayment.emailId3);
        await _PaymentsPages.RTGSPaymentPage.emailId4.input(testData.RTGSPayment.emailId4);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a RTGS Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a RTGS Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'RTGSName' + generatedID();
        await _PaymentsPages.RTGSPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();

        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValueForTemplate).isNotEmpty(),
            await ensure(_PaymentsPages.RTGSPaymentPage.payeeValueForTemplate).textContains(testData.RTGSPayment.existingPayee),
        ]);


        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountA1),
            await ensure(_PaymentsPages.RTGSPaymentPage.toExistingPayeeValue).textContains(testData.RTGSPayment.existingPayee),
        ]);
    });

    it('Create a RTGS Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.RTGSPayment.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionCreatePayemntTemplate();
        await _PaymentsPages.RTGSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.RTGSPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a RTGS Payment with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.emailId3.input(testData.RTGSPayment.emailId3);
        await _PaymentsPages.RTGSPaymentPage.emailId4.input(testData.RTGSPayment.emailId4);;
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountA1),
            await ensure(_PaymentsPages.RTGSPaymentPage.toExistingPayeeValue).textContains(testData.RTGSPayment.existingPayee),
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.copyButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForEditCopy();
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.click();
        if (await _PaymentsPages.RTGSPaymentPage.transactionNote.isElementPresent()) {
            await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        }
        await _PaymentsPages.RTGSPaymentPage.amount.clean();
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountV);
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.clean();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input("Copy" + testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountV),
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.rejectButton.click();
        await _PaymentsPages.RTGSPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.RTGSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);


        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.editButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForEditCopy();
        await _PaymentsPages.RTGSPaymentPage.amount.clean();
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.editAmount);
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.clean();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input("Edit" + testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.editAmount),
        ]);
    });

    it('Delete a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.deleteButton.click();
        await _PaymentsPages.RTGSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Can not create RTGS with amount less than 200000 INR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.lessMinAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await ensure(_PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox).hasClassName("disabled");
    });


    it('Create a RTGS Payment with min amount 200000 INR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.minAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.minAmount),
        ]);
    });

    it('Can not create RTGS with amount greater than 999999999.99 INR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.greaterMaxAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.hasUXErrorMsg(testData.RTGSPayment.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create a RTGS Payment with max amount 999999999.99 INR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.maxAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            paymentReferenceMax = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReferenceMax);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.maxAmount),
        ]);
    });

    // Due to PCS CR, IN-RTGS will change to 24*7 and fetch cut off time via API regardless of SAM setup, 注释掉该case
    //     it('Create a RTGS Payment for approve after cutofftime', async function () {
    //         await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
    //         await _PaymentsPages.RTGSPaymentPage.loadCondition();
    //         await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
    //         await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
    //         await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
    //         await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
    //         await _PaymentsPages.RTGSPaymentPage.nextButton.click();
    //         await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
    //         await _PaymentsPages.RTGSPaymentPage.submitButton.click();
    //         await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
    //         await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
    //             reference4 = text;
    //         });
    //         await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
    //         await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference4);
    //         await Promise.all([
    //             await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
    //             // await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).textIs(currentDate),
    //         ]);
    //     });

    //     it('Approve RTGS After cutofftime', async function () {
    //         await new NavigatePages().loginSAM(SIT ? testDataSAM.loginSAMID.ASADM1 : testDataSAM.loginSAMID.ASADM2)
    //         // set today as holiday
    //         await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSIN, _PaymentsPages.RTGSPaymentPage.INRTGSScheduleLink, day, "");
    //         await new NavigatePages().loginCB(SIT ? testData.RTGSPayment.SIT.loginCompanyId : testData.RTGSPayment.UAT.loginCompanyId, SIT ? testData.RTGSPayment.SIT.loginUserId : testData.RTGSPayment.UAT.loginUserId);
    //         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    //         if (0 !== reference4.trim().length) {
    //             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference4)
    //         } else {
    //             await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
    //         }
    //         await _PaymentsPages.RTGSPaymentPage.approveButton.click();
    //         await _PaymentsPages.RTGSPaymentPage.getChallengeSMS.clickIfExist();
    //         await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('12312312');
    //         await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
    //         await _PaymentsPages.RTGSPaymentPage.approveButton.jsClick();
    //         await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
    //             reference4 = text;
    //         });
    //         await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
    //         await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference4);
    //         console.log(currentDate)
    //         await Promise.all([
    //             console.log(paymentDate),
    //             await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).textNotContains(currentDate),
    //         ]);
    //         await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2)
    //         // set today as workingDay
    //         await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSIN, _PaymentsPages.RTGSPaymentPage.INRTGSScheduleLink, day, testDataSAM.schedule.CutoffTime01);
    //     });

    // below for AB-9129
    it('Create a RTGS Payment then aprrove then check the paymentdate', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.INPaymentLocalOverseasPayee);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXSuccess();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountA1),
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).textContains(currentDate),
        ]);
        // approve the payment then check the pamentdate
        await _PaymentsPages.RTGSPaymentPage.approveButton.click();
        await _PaymentsPages.RTGSPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.RTGSPaymentPage.approveButton.click();
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
            await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).textContains(currentDate),
        ]);
    });

});

describe('IN_RTGS Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.RTGSPayment.SIT.loginCompanyId : testData.RTGSPayment.UAT.loginCompanyId, SIT ? testData.RTGSPayment.SIT.verifyUserId : testData.RTGSPayment.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a RTGS Payment via My Verify', async function () {
        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, paymentReferenceMax, 'IN - RTGS Payment').then(reference => {
            verifyReference = reference;
            console.error("RTGSverifyReference" + verifyReference);
        })
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.approveButton.click();
        await _PaymentsPages.RTGSPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.RTGSPaymentPage.approveButton.click();
        await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a RTGS Payment via My Release', async function () {
        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'IN - RTGS Payment').then(reference => {
            paymentReference = reference;
            console.error("RTGSreleaselReference" + paymentReference);
        })
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});



