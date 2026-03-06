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
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK_AutoPay Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.AutoPayPayment.SIT.loginCompanyId : testData.AutoPayPayment.UAT.loginCompanyId, SIT ? testData.AutoPayPayment.SIT.loginUserId : testData.AutoPayPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a AutoPay Payment with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeTab.click();
        await _PaymentsPages.AutoPayPaymentPage.newPayeeName.input(testData.AutoPayPayment.newPayeeName);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeAdd1.input(testData.AutoPayPayment.newPayeeAdd1);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeAdd2.input(testData.AutoPayPayment.newPayeeAdd2);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeAdd3.input(testData.AutoPayPayment.newPayeeAdd3);
        await _PaymentsPages.AutoPayPaymentPage.payeeBankID.select(SIT ? testData.AutoPayPayment.SIT.payeeBankID : testData.AutoPayPayment.UAT.payeeBankID);
        await _PaymentsPages.AutoPayPaymentPage.newPayeeAcctNumber.input(testData.AutoPayPayment.newPayeeAcctNumber);
        // await _PaymentsPages.AutoPayPaymentPage.selectedCategory.select(testData.AutoPayPayment.category);
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.emailIdO.input(testData.AutoPayPayment.emailIdO);
        await _PaymentsPages.AutoPayPaymentPage.emailId1.input(testData.AutoPayPayment.emailId1);
        await _PaymentsPages.AutoPayPaymentPage.emailId2.input(testData.AutoPayPayment.emailId2);
        await _PaymentsPages.AutoPayPaymentPage.emailId3.input(testData.AutoPayPayment.emailId3);
        await _PaymentsPages.AutoPayPaymentPage.emailId4.input(testData.AutoPayPayment.emailId4);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.payeeReference.input(testData.AutoPayPayment.payeeReference);
        await _PaymentsPages.AutoPayPaymentPage.payeeParticulars.input(testData.AutoPayPayment.payeeParticulars);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
            console.error(reference);
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXSuccess();
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AutoPayPaymentPage.cutoffTimeValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.exchangeRateValue).isNotEmpty(),
        ]);
    });

    it('Create a AutoPay Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.faxTab.click();
        await _PaymentsPages.AutoPayPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.AutoPayPaymentPage.faxAreaCode0.input(testData.AutoPayPayment.faxAreaCode0);
        await _PaymentsPages.AutoPayPaymentPage.faxNo0.input(testData.AutoPayPayment.faxNo0);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'AutoPayName' + generatedID();
        await _PaymentsPages.AutoPayPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
            console.error(paymentReference);
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXSuccess();

        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValueForTemplate).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.payeeValueForTemplate).textContains(testData.AutoPayPayment.existingPayee),
        ]);

        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a AutoPay Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AutoPayPayment.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getInfoReferenceID().then(text => {
            reference2 = text;
            console.error(reference2);
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a AutoPay Payment with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.faxTab.click();
        await _PaymentsPages.AutoPayPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.AutoPayPaymentPage.faxAreaCode0.input(testData.AutoPayPayment.faxAreaCode0);
        await _PaymentsPages.AutoPayPaymentPage.faxNo0.input(testData.AutoPayPayment.faxNo0);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.saveAsDraft.click();
        await _PaymentsPages.AutoPayPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
            console.error(paymentReference);
        });
        await _PaymentsPages.AutoPayPaymentPage.dismissButton.click();
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).textContains(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountA1),
            await ensure(_PaymentsPages.AutoPayPaymentPage.toExistingPayeeValue).textContains(testData.AutoPayPayment.existingPayee),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - AutoPay Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.copyButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.amount.clean();
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountV);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getInfoReferenceID().then(text => {
            reference3 = text;
            console.error(reference3);
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXSuccess();
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).textContains(testData.AutoPayPayment.amountV),
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - AutoPay Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.rejectButton.click();
        await _PaymentsPages.AutoPayPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.AutoPayPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AutoPayPaymentPage.dismissButton.click();
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - AutoPay Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.editButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.amount.clean();
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.editAmount);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
            console.error(reference);
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXSuccess();
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.amountValue).isNotEmpty(),
        ]);
    });

    it('Delete a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - AutoPay Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.deleteButton.click();
        await _PaymentsPages.AutoPayPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AutoPayPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('HK_AutoPay Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.AutoPayPayment.SIT.loginCompanyId : testData.AutoPayPayment.UAT.loginCompanyId, SIT ? testData.AutoPayPayment.SIT.verifyUserId : testData.AutoPayPayment.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a AutoPay Payment via My Verify', async function () {
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
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForVerifyTxn.select('HK - AutoPay Payment');
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
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a AutoPay Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("HK - AutoPay Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForViewAutoPayPaymentPage();
        await _PaymentsPages.AutoPayPaymentPage.approveButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AutoPayPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.AutoPayPaymentPage.approveButton.click();
        await _PaymentsPages.AutoPayPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AutoPayPaymentPage.dismissButton.click();
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a AutoPay Payment via My Release', async function () {
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
            await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForReleaseTxn.select('HK - AutoPay Payment');
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
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a AutoPay Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA2);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.faxTab.click();
        await _PaymentsPages.AutoPayPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.AutoPayPaymentPage.faxAreaCode0.input(testData.AutoPayPayment.faxAreaCode0);
        await _PaymentsPages.AutoPayPaymentPage.faxNo0.input(testData.AutoPayPayment.faxNo0);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
            console.error(paymentReference);
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXSuccess();
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a AutoPay Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.HKPaymentLocalOverseasPayee);
        await _PaymentsPages.AutoPayPaymentPage.loadCondition();
        await _PaymentsPages.AutoPayPaymentPage.fromAccount.select(SIT ? testData.AutoPayPayment.SIT.fromAccount : testData.AutoPayPayment.UAT.fromAccount);
        await _PaymentsPages.AutoPayPaymentPage.amount.input(testData.AutoPayPayment.amountA1);
        await _PaymentsPages.AutoPayPaymentPage.existingPayee.select(testData.AutoPayPayment.existingPayee);
        await _PaymentsPages.AutoPayPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.faxTab.click();
        await _PaymentsPages.AutoPayPaymentPage.faxCountryCode0.selectFirst();
        await _PaymentsPages.AutoPayPaymentPage.faxAreaCode0.input(testData.AutoPayPayment.faxAreaCode0);
        await _PaymentsPages.AutoPayPaymentPage.faxNo0.input(testData.AutoPayPayment.faxNo0);
        await _PaymentsPages.AutoPayPaymentPage.message.input(testData.AutoPayPayment.message);
        await _PaymentsPages.AutoPayPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.AutoPayPaymentPage.transactionNote.input(testData.AutoPayPayment.transactionNote);
        await _PaymentsPages.AutoPayPaymentPage.nextButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.AutoPayPaymentPage.approvalNowCheckBox.jsClick();
        // await ensure(_PaymentsPages.AutoPayPaymentPage.mchallengeText).textContains(testData.AutoPayPayment.mChllengeText);
        await _PaymentsPages.AutoPayPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.AutoPayPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.AutoPayPaymentPage.submitButton.click();
        await _PaymentsPages.AutoPayPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AutoPayPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
            console.error(paymentReference);
        });
        await ensure(_PaymentsPages.AutoPayPaymentPage).isUXSuccess();
        await _PaymentsPages.AutoPayPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.AutoPayPaymentPage.transactionStatusValue).textIs(testData.status.Approved),
        ]);
    });
});