/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let TemplateName = '';
let paymentReference = '';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN_CNAPS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.CNAPSPayment.SIT.loginCompanyId : testData.CNAPSPayment.UAT.loginCompanyId, SIT ? testData.CNAPSPayment.SIT.loginUserId : testData.CNAPSPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a CNAPS Payment with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(testData.CNAPSPayment.fromAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.CNAPSPaymentPage.newPayeeName.input(testData.CNAPSPayment.newPayeeName);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeAdd1.input(testData.CNAPSPayment.newPayeeAdd1);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeAdd2.input(testData.CNAPSPayment.newPayeeAdd2);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeAdd3.input(testData.CNAPSPayment.newPayeeAdd3);
        await _PaymentsPages.CNAPSPaymentPage.payeeBankID.select(SIT ? testData.CNAPSPayment.SIT.payeeBankID : testData.CNAPSPayment.UAT.payeeBankID); await _PaymentsPages.CNAPSPaymentPage.newPayeeAcctNumber.input(testData.CNAPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.CNAPSPaymentPage.selectedCategory.select(testData.CNAPSPayment.category);
        await _PaymentsPages.CNAPSPaymentPage.urgentType.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.emailIdO.input(testData.CNAPSPayment.emailIdO);
        await _PaymentsPages.CNAPSPaymentPage.emailId1.input(testData.CNAPSPayment.emailId1);
        await _PaymentsPages.CNAPSPaymentPage.emailId2.input(testData.CNAPSPayment.emailId2);
        await _PaymentsPages.CNAPSPaymentPage.emailId3.input(testData.CNAPSPayment.emailId3);
        await _PaymentsPages.CNAPSPaymentPage.emailId4.input(testData.CNAPSPayment.emailId4);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXSuccess();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(testData.CNAPSPayment.fromAccount),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountA1),
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.CNAPSPaymentPage.cutoffTimeValue).isNotEmpty(),
            await ensure(_PaymentsPages.CNAPSPaymentPage.exchangeRateValue).isNotEmpty(),
        ]);
    });

    it('Create a CNAPS Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(testData.CNAPSPayment.fromAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA2);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.faxTab.click();
        await _PaymentsPages.CNAPSPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.CNAPSPaymentPage.faxAreaCode0.input(testData.CNAPSPayment.faxAreaCode0);
        await _PaymentsPages.CNAPSPaymentPage.faxNo0.input(testData.CNAPSPayment.faxNo0);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXSuccess();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a CNAPS Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(testData.CNAPSPayment.fromAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.faxTab.click();
        await _PaymentsPages.CNAPSPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.CNAPSPaymentPage.faxAreaCode0.input(testData.CNAPSPayment.faxAreaCode0);
        await _PaymentsPages.CNAPSPaymentPage.faxNo0.input(testData.CNAPSPayment.faxNo0);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.CNAPSPaymentPage.mchallengeText).textContains(testData.CNAPSPayment.mChllengeText);
        await _PaymentsPages.CNAPSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.CNAPSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXSuccess();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a CNAPS Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(testData.CNAPSPayment.fromAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.faxTab.click();
        await _PaymentsPages.CNAPSPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.CNAPSPaymentPage.faxAreaCode0.input(testData.CNAPSPayment.faxAreaCode0);
        await _PaymentsPages.CNAPSPaymentPage.faxNo0.input(testData.CNAPSPayment.faxNo0);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'CNAPSName' + generatedID();
        await _PaymentsPages.CNAPSPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXSuccess();

        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccoountValueForTemplate).textContains(testData.CNAPSPayment.fromAccount),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValueForTemplate).textContains(testData.CNAPSPayment.amountA1),
            await ensure(_PaymentsPages.CNAPSPaymentPage.payeeValueForTemplate).textContains(testData.CNAPSPayment.existingPayee),
        ]);

        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(testData.CNAPSPayment.fromAccount),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountA1),
            await ensure(_PaymentsPages.CNAPSPaymentPage.toExistingPayeeValue).isNotEmpty()
        ]);
    });

    it('Create a CNAPS Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.CNAPSPayment.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXSuccess();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);

        if (0 !== TemplateName.trim().length) {
            await Promise.all([
                await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(testData.CNAPSPayment.fromAccount),
                await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountA1),
                await ensure(_PaymentsPages.CNAPSPaymentPage.toExistingPayeeValue).textContains(testData.CNAPSPayment.existingPayee),
            ]);
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).isNotEmpty(),
                await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).isNotEmpty(),
                await ensure(_PaymentsPages.CNAPSPaymentPage.toExistingPayeeValue).isNotEmpty(),
            ]);
        }
    });

    it('Create a CNAPS Payment with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.CNPaymentLocalOverseasPayee);
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(testData.CNAPSPayment.fromAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.faxTab.click();
        await _PaymentsPages.CNAPSPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.CNAPSPaymentPage.faxAreaCode0.input(testData.CNAPSPayment.faxAreaCode0);
        await _PaymentsPages.CNAPSPaymentPage.faxNo0.input(testData.CNAPSPayment.faxNo0);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.CNAPSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.CNAPSPaymentPage.dismissButton.click();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(testData.CNAPSPayment.fromAccount),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountA1),
            await ensure(_PaymentsPages.CNAPSPaymentPage.toExistingPayeeValue).textContains(testData.CNAPSPayment.existingPayee),
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a CNAPS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.copyButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.amount.clean();
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountV);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXSuccess();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountV),
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a CNAPS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.rejectButton.click();
        await _PaymentsPages.CNAPSPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.CNAPSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.CNAPSPaymentPage.dismissButton.click();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit a CNAPS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.editButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.amount.clean();
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.editAmount);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXSuccess();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).isNotEmpty(),
        ]);
    });

    it('Delete a CNAPS Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.deleteButton.click();
        await _PaymentsPages.CNAPSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.CNAPSPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('CN_CNAPS Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.CNAPSPayment.SIT.loginCompanyId : testData.CNAPSPayment.UAT.loginCompanyId, SIT ? testData.CNAPSPayment.SIT.verifyUserId : testData.CNAPSPayment.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a CNAPS Payment via My Verify', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
        await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVeirfyTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTab.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyTxnTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTabByTxn.click();
        //await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForVerifyTxn.input(reference3);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForVerifyTxn.select('CN - Domestic Transfer');
        }
        await _PaymentsPages.VerificationAndReleasesPage.goButtonForVerifyTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.verifyByTxnI3Select1stTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.verifyTxnButton.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyPaymentPage();
        await _PaymentsPages.VerificationAndReleasesPage.confirmVerifyI3Button.click();
        //await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
        await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
        await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a CNAPSPayment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.approveButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CNAPSPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.CNAPSPaymentPage.approveButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.CNAPSPaymentPage.dismissButton.click();
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a CNAPS Payment via My Release', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
        await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTab();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTab.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTxnTab();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTabByTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForReleaseTxn.input(reference3);
        } else {
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForReleaseTxn.select('CN - Domestic Transfer');
        }
        await _PaymentsPages.VerificationAndReleasesPage.goButtonForReleaseTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
        await _PaymentsPages.VerificationAndReleasesPage.releaseByTxnI3Select1stTxn.click();
        await _PaymentsPages.VerificationAndReleasesPage.releaseTxnI3Button.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleasePaymentPage();
        await _PaymentsPages.VerificationAndReleasesPage.confirmReleaseI3Button.click();
        await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
        await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
        await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.CNAPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});