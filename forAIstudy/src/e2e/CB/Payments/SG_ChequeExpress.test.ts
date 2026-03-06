/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, generatedID, waitForI3Loading, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Approval/Edit/Delete
let reference = "";
// this from createFromTemplate
let reference2 = "";
// this from copy,then Verify/Approval/Release/Delete
let reference3 = "";
let TemplateName = "";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Cheque Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(testData.ChequePayment.loginCompanyId, testData.ChequePayment.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a Cheque Payment with new Payee', async function () {

        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGCorpChq);
        await _PaymentsPages.chequePaymentPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.fromAccountI3.select(testData.ChequePayment.fromAccount);
        await _PaymentsPages.chequePaymentPage.chequeType.click();
        await _PaymentsPages.chequePaymentPage.nextContinue.jsClick();
        await waitForI3Loading();
        await _PaymentsPages.chequePaymentPage.addNewBeneficiary();
        await _PaymentsPages.chequePaymentPage.payeeAmount.input(testData.ChequePayment.amountA1);
        await _PaymentsPages.chequePaymentPage.previewI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionPreview();
        await _PaymentsPages.chequePaymentPage.submitI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await Promise.all([
            await ensure(_PaymentsPages.chequePaymentPage.fromAccountValue).textContains(testData.ChequePayment.fromAccount),
            await ensure(_PaymentsPages.chequePaymentPage.amountValue).textContains(testData.ChequePayment.amountA1),
            await ensure(_PaymentsPages.chequePaymentPage.beneficiaryValue).textContains(testData.ChequePayment.payeeName1),
            await ensure(_PaymentsPages.chequePaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.chequePaymentPage.cutOffTimeValue).isNotEmpty(),
        ]);
    });

    it('Create Cheque Payment - Approve now with M-Challenge ', async function () {
        let paymentReference = '';
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGCorpChq);
        await _PaymentsPages.chequePaymentPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.fromAccountI3.select(testData.ChequePayment.fromAccount);
        await _PaymentsPages.chequePaymentPage.chequeType.click();
        await _PaymentsPages.chequePaymentPage.nextContinue.click();
        await _PaymentsPages.chequePaymentPage.loadConditionOnAddExistingBeneficiary();
        await _PaymentsPages.chequePaymentPage.addExistingBeneficiary(210000);
        await _PaymentsPages.chequePaymentPage.payeeAmount.input(testData.ChequePayment.amountA1);
        await _PaymentsPages.chequePaymentPage.approveNowRadio.click();
        await _PaymentsPages.chequePaymentPage.previewI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionApproveNow();
        await ensure(_PaymentsPages.chequePaymentPage.mChallengeI3Text).textContains(testData.ChequePayment.mChallengeI3Text);
        await _PaymentsPages.chequePaymentPage.EnterResponseI3Text.input(testData.ChequePayment.enterResponseI3Text);
        await _PaymentsPages.chequePaymentPage.approvePaymentButton.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionApproveNowSuccessPage();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await ensure(_PaymentsPages.chequePaymentPage.transactionStatusValue).textIs(testData.status.Approved);
    });

    it('Create Cheque Payment - Approve now without M-Challenge ', async function () {
        let paymentReference = '';
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGCorpChq);
        await _PaymentsPages.chequePaymentPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.fromAccountI3.select(testData.ChequePayment.fromAccount);
        await _PaymentsPages.chequePaymentPage.chequeType.click();
        await _PaymentsPages.chequePaymentPage.nextContinue.click();
        await _PaymentsPages.chequePaymentPage.loadConditionOnAddExistingBeneficiary();
        await _PaymentsPages.chequePaymentPage.addExistingBeneficiary(210000);
        await _PaymentsPages.chequePaymentPage.payeeAmount.input(testData.ChequePayment.amountA2);
        await _PaymentsPages.chequePaymentPage.approveNowRadio.click();
        await _PaymentsPages.chequePaymentPage.previewI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionApproveNow();
        await ensure(_PaymentsPages.chequePaymentPage.withoutMChallengeI3Text).textContains(testData.ChequePayment.withoutMChallengeI3Text);
        await _PaymentsPages.chequePaymentPage.EnterResponseI3Text.input(testData.ChequePayment.enterResponseI3Text);
        await _PaymentsPages.chequePaymentPage.approvePaymentButton.click();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await ensure(_PaymentsPages.chequePaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved);
    });

    it('Create Cheque Payment with Save as Template', async function () {
        let paymentReference = '';
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGCorpChq);
        await _PaymentsPages.chequePaymentPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.fromAccountI3.select(testData.ChequePayment.fromAccount);
        await _PaymentsPages.chequePaymentPage.chequeType.jsClick();
        await _PaymentsPages.chequePaymentPage.nextContinue.jsClick();
        await _PaymentsPages.chequePaymentPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'ChequePayment' + generatedID();
        await _PaymentsPages.chequePaymentPage.templateNameI3Text.input(TemplateName);
        await _PaymentsPages.chequePaymentPage.addExistingBeneficiary(210000);
        await _PaymentsPages.chequePaymentPage.payeeAmount.input(testData.ChequePayment.amountA1);
        await _PaymentsPages.chequePaymentPage.previewI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionPreview();
        await _PaymentsPages.chequePaymentPage.submitI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await Promise.all([
            await ensure(_PaymentsPages.chequePaymentPage.fromAccountValue).textContains(testData.ChequePayment.fromAccount),
            await ensure(_PaymentsPages.chequePaymentPage.amountValue).textContains(testData.ChequePayment.amountA1),
            await ensure(_PaymentsPages.chequePaymentPage.beneficiaryValue).isNotEmpty(),
        ]);
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForI3ViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.chequePaymentPage.templateNameValue).textContains(TemplateName),
            await ensure(_PaymentsPages.chequePaymentPage.fromPartyTemplateValue).textContains(testData.ChequePayment.fromAccount),
            await ensure(_PaymentsPages.chequePaymentPage.amountTemplateValue).textContains(testData.ChequePayment.amountA1),
            await ensure(_PaymentsPages.chequePaymentPage.beneficiaryTemplateValue).isNotEmpty(),
        ]);
    });

    it('Create Cheque Payment from Template', async function () {

        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (TemplateName) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.ChequePayment.templateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.chequePaymentPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.chequePaymentPage.previewTemplateI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionOnPreviewTemplate();
        await _PaymentsPages.chequePaymentPage.submitTemplateI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();

        if (TemplateName) {
            await Promise.all([
                await ensure(_PaymentsPages.chequePaymentPage.fromAccountValue).textContains(testData.ChequePayment.fromAccount),
                await ensure(_PaymentsPages.chequePaymentPage.amountValue).textContains(testData.ChequePayment.amountA1),
                await ensure(_PaymentsPages.chequePaymentPage.beneficiaryValue).isNotEmpty(),
            ]);
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.chequePaymentPage.fromAccountValue).isNotEmpty(),
                await ensure(_PaymentsPages.chequePaymentPage.amountValue).isNotEmpty(),
                await ensure(_PaymentsPages.chequePaymentPage.beneficiaryValue).isNotEmpty(),
            ]);
        }
    });

    it('Create Cheque Payment with Save as Draft', async function () {
        let paymentReference = '';
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentCreateSGCorpChq);
        await _PaymentsPages.chequePaymentPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.fromAccountI3.select(testData.ChequePayment.fromAccount);
        await _PaymentsPages.chequePaymentPage.chequeType.click();
        await _PaymentsPages.chequePaymentPage.nextContinue.click();
        await waitForI3Loading();
        await _PaymentsPages.chequePaymentPage.addExistingBeneficiary(210000);
        await _PaymentsPages.chequePaymentPage.payeeAmount.input(testData.ChequePayment.amountA1);
        await _PaymentsPages.chequePaymentPage.SaveAsDraftI3Button.jsClick();
        await waitForI3Loading();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await Promise.all([
            await ensure(_PaymentsPages.chequePaymentPage.fromAccountValue).textContains(testData.ChequePayment.fromAccount),
            await ensure(_PaymentsPages.chequePaymentPage.amountValue).textContains(testData.ChequePayment.amountA1),
            await ensure(_PaymentsPages.chequePaymentPage.transactionStatusValue).textIs(testData.status.Saved),
            await ensure(_PaymentsPages.chequePaymentPage.cutOffTimeValue).isNotEmpty(),
            await ensure(_PaymentsPages.chequePaymentPage.beneficiaryValue).isNotEmpty(),
        ]);
    });

    it('Copy Cheque Payment via Transfer Center', async function () {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (reference2) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
            console.log(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.SG_BCH, testData.status.PendingApproval);
        }
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await _PaymentsPages.chequePaymentPage.copyButton.jsClick();
        await _PaymentsPages.chequePaymentPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.payeeAmount.clean();
        await _PaymentsPages.chequePaymentPage.payeeAmount.input(testData.ChequePayment.amountCopy);
        await _PaymentsPages.chequePaymentPage.previewI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionPreview();
        await _PaymentsPages.chequePaymentPage.submitI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();

        await Promise.all([
            await ensure(_PaymentsPages.chequePaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.chequePaymentPage.amountValue).textContains(testData.ChequePayment.amountCopy),
            await ensure(_PaymentsPages.chequePaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Edit Cheque Payment via Transfer Center', async function () {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (reference) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.SG_BCH, testData.status.PendingApproval);
        }
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await _PaymentsPages.chequePaymentPage.editButton.jsClick();
        await _PaymentsPages.chequePaymentPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.payeeAmount.clean();
        await _PaymentsPages.chequePaymentPage.payeeAmount.input(testData.ChequePayment.amountA3);
        await _PaymentsPages.chequePaymentPage.previewTemplateI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionOnEditPage();
        await _PaymentsPages.chequePaymentPage.submitI3Button.jsClick();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();

        await Promise.all([
            await ensure(_PaymentsPages.chequePaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.chequePaymentPage.amountValue).textContains(testData.ChequePayment.amountA3),
            await ensure(_PaymentsPages.chequePaymentPage.beneficiaryValue).isNotEmpty(),
        ]);
    });

    it('Approval Cheque Payment via Transfer Center', async function () {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (reference) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.SG_BCH, testData.status.PendingApproval);
        }
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await _PaymentsPages.chequePaymentPage.approvePaymentButton.jsClick();
        await _PaymentsPages.chequePaymentPage.EnterResponseI3Text.input(testData.ChequePayment.enterResponseI3Text);
        await _PaymentsPages.chequePaymentPage.approvePaymentAgainButton.click();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();

        await ensure(_PaymentsPages.chequePaymentPage.transactionStatusValue).textContains(testData.status.Approved);
    });

    it('Reject Cheque Payment via Transfer Center', async function () {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.SG_BCH, testData.status.PendingApproval);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await _PaymentsPages.chequePaymentPage.rejectButton.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionOnReject();
        await _PaymentsPages.chequePaymentPage.rejectPaymentButton.jsClick();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();

        await ensure(_PaymentsPages.chequePaymentPage.transactionStatusValue).textContains(testData.status.Rejected);
    });

    it('Delete Cheque Payment via Transfer Center', async function () {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (reference) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.SG_BCH, testData.status.PendingApproval);
        }
        await _PaymentsPages.chequePaymentPage.loadConditionOnView();
        await _PaymentsPages.chequePaymentPage.deleteButton.jsClick();
        await _PaymentsPages.chequePaymentPage.loadConditionOnDelete();
        await _PaymentsPages.chequePaymentPage.deletePaymentButton.jsClick();
        await _PaymentsPages.chequePaymentPage.getI3ReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.chequePaymentPage).isI3Success();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.ChequePayment.labelNoInformationDisplay);
    });
});