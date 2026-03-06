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
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
export async function addNewPayee() {
    await _PaymentsPages.BulkPaymentpage.newPayee.jsClick();
    await _PaymentsPages.BulkPaymentpage.newPayeeName.input(testData.BulkPayment.payeeName);
    await _PaymentsPages.BulkPaymentpage.payeeBankID.select(testData.BulkPayment.payeeBankID)
    await _PaymentsPages.BulkPaymentpage.newPayeeAcctNo.input(testData.BulkPayment.accountNumber);
    await _PaymentsPages.BulkPaymentpage.newPayeeButton.click();
}
export async function addExistingPayee(name: string, amount: string) {
    await _PaymentsPages.BulkPaymentpage.filterExistingPayee.input(name);
    await _PaymentsPages.BulkPaymentpage.addpayee.click();
    await _PaymentsPages.BulkPaymentpage.amount.input(amount);
}

describe('SG_Bulk payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Bulk payment with new payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await addNewPayee();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentpage.payeeRef.input(testData.BulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentpage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentpage.paymentDetails.input(testData.BulkPayment.paymentDetails);
        await _PaymentsPages.BulkPaymentpage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentpage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentpage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentpage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentpage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentpage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentpage.message.input(testData.BulkPayment.message);
        await _PaymentsPages.BulkPaymentpage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentpage.accountNumberValue).textContains(testData.BulkPayment.accountNumber),
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Create with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentpage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.BulkPaymentpage.getChallengeSMS).isVisible();
        await _PaymentsPages.BulkPaymentpage.getChallengeSMS.click();
        await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create with Approva Now without M-Chanllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await addNewPayee();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA2);
        await _PaymentsPages.BulkPaymentpage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amountA2),
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PartialApproved),
        ]);
    });

    it('Create Bulk payment with Save as Tempalte', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentpage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'BPTName' + generatedID();
        await _PaymentsPages.BulkPaymentpage.templateName.input(TemplateName);
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
        await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select("SG - Bulk Payment");
        await _PaymentsPages.PaymentTemplatesPage.searchButton.click();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.BulkPaymentpage.viewTemplateFromAccount).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentpage.viewTemplateAmount).textContains(testData.BulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(testData.BulkPayment.existingPayee),
        ]);
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(testData.BulkPayment.existingPayee),
        ]);
    });

    it('Create a Bulk Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
            await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select("SG - Bulk Payment");
            await _PaymentsPages.PaymentTemplatesPage.searchButton.click();
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.BulkPayment.existingTemplate);
            await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select("SG - Bulk Payment");
            await _PaymentsPages.PaymentTemplatesPage.searchButton.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionCreatePayemntTemplate();
        await _PaymentsPages.BulkPaymentpage.amount.clean();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentpage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create a Bulkpayment with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateBulkpayment);
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentpage.addExistingPayee(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentpage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.saveAsDraft.click();
        await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BulkPaymentpage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentpage.payeeNameValue).textContains(testData.BulkPayment.existingPayee),
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Copy a Bulk via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentpage.copyButton.click();
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.amount.clean();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.amountV);
        await _PaymentsPages.BulkPaymentpage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.amountV),
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentpage.rejectButton.click();
        await _PaymentsPages.BulkPaymentpage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.BulkPaymentpage.rejectDialogButton.click();
        await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentpage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Edit a Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentpage.editButton.click();
        await _PaymentsPages.BulkPaymentpage.loadCondition();
        await _PaymentsPages.BulkPaymentpage.amount.clean();
        await _PaymentsPages.BulkPaymentpage.amount.input(testData.BulkPayment.editamount);
        await _PaymentsPages.BulkPaymentpage.nextButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentpage.submitButton.click();
        await _PaymentsPages.BulkPaymentpage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentpage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.amountView).textContains(testData.BulkPayment.editamount),
        ]);
    });

    it('Delete a Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentpage.deleteButton.click();
        await _PaymentsPages.BulkPaymentpage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentpage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentpage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    //For AB-8924
    it('Create Bulk Payment template with Reference for payee field contain space char', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSgBulkTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        TemplateName = "BulkPayment" + generatedID();
        await console.log(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.BulkPayment.amountVIX);
        await addExistingPayee(testData.BulkPayment.existingPayee, testData.BulkPayment.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.BulkPayment.payeeRefValue);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.BulkPayment.amountA1),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewpayeeRef).textContains(testData.BulkPayment.payeeRefValue)

        ]);
    });

    it('Edit Bulk Payment tempalte with Reference for payee let blank', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.EditTemplate.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.payeeAmount.clean();
        await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.BulkPayment.editamount);
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.clean();
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.BulkPayment.BlankChar);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.BulkPayment.editamount)
        ]);
    });

});

describe('SG_Bulk Payment_Approvals', async function () {
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.verifyUserId : testData.BulkPayment.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a Bulk Payment via My Verify', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference3, "SG - Bulk Payment").then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentpage.approveButton.click();
        await _PaymentsPages.BulkPaymentpage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentpage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentpage.approveButton.click();
        await _PaymentsPages.BulkPaymentpage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkPaymentpage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a Bulk Payment via My Release', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "SG - Bulk Payment").then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentpage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});

// describe('SG_Bulk Payment_Pagination', async function () {
//     before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId); });
//     const suitObject = this;beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

//     it('View Bulk Payment for payee Less than 1000', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.loadCondition();
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageforPagination(SIT ? testData.BulkPayment.referenceSIT : testData.BulkPayment.referenceUAT, testData.BulkPayment.paymentType);
//         await _PaymentsPages.BulkPaymentpage.loadConditionForViewPaymentPage();
//         await _PaymentsPages.BulkPaymentpage.loadConditionForViewPagination();
//         await _PaymentsPages.BulkPaymentpage.switchBulkViewTab(_PaymentsPages.BulkPaymentpage.viewShowAllTab);
//         await _PaymentsPages.BulkPaymentpage.checkPaginationForShowAllTab();
//         await _PaymentsPages.BulkPaymentpage.checkPaginationForRejectTab();
//     });
// });
