/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser } from 'protractor';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import * as utils from '../../../lib/utils';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let reference: string = null;
let reference2: string = null;
let reference4ApproveNow: string = null;
let reference4Template: string = null;
let reference4Save: string = null;
let templateName: string = null;
let reference4VR: string = null;

describe('TW FISC Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TWFISC.SIT.loginCompanyId : testData.TWFISC.UAT.loginCompanyId, SIT ? testData.TWFISC.SIT.loginUserId : testData.TWFISC.UAT.loginUserId, SIT ? 123123 : testData.TWFISC.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create FISC Payment with New Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TWFISC.amountVR);
        await addNewPayee();
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TWFISC.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TWFISC.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TWFISC.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TWFISC.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TWFISC.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TWFISC.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TWFISC.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TWFISC.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log('Reference of Create FISC Payment with New Payee:', reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField(false); // IDXP-812

    });

    it('Create FISC Payment with Approva Now with M-Chanllenge', async function () {
        await approveNow(testData.TWFISC.amount);
    });


    it('Create FISC Payment with Approva Now without M-Chanllenge', async function () {
        await approveNow(testData.TWFISC.amountWithoutM);
    });

    it('Create FISC Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TWFISC.amount);
        await _PaymentsPages.SGPayNowPage.addExisting4Single(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.savaAsTemplateCheckBox.jsClick();
        templateName = 'TWFISCTemplateName' + utils.generatedID();
        console.log('TemplateName:', templateName);
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(templateName);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference4Template = text;
            console.log('Reference of Create FISC Payment with Save as Template:', reference4Template);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4Template);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount),
            await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(testData.TWFISC.amount),
            await ensure(_PaymentsPages.TWFISCPaymentPage.existingPayeeNameView).textContains(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName),
        ]);

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewTemplatePaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount),
            await ensure(_PaymentsPages.TWFISCPaymentPage.sendAmtView).textContains(testData.TWFISC.amount),
            await ensure(_PaymentsPages.TWFISCPaymentPage.existingPayeeNameView).textContains(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName),
        ]);
    });

    it('Create FISC Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference4Template = text;
            console.log('Reference of Create FISC Payment from Template:', reference4Template);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4Template);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount),
            await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(testData.TWFISC.amount),
            await ensure(_PaymentsPages.TWFISCPaymentPage.existingPayeeNameView).textContains(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName),
        ]);
    });

    it('Create FISC Payment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TWFISC.amount);
        await addNewPayee();
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.saveAsDraft.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            reference4Save = text;
            console.log('Reference of Create FISC Payment with Save as Draft:', reference4Save);
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4Save);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount),
            await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(testData.TWFISC.amount),
            await ensure(_PaymentsPages.TWFISCPaymentPage.newPayeeNameView).textContains(testData.TWFISC.newPayeeName),
            await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textIs(testData.status.Saved),
        ]);
    });

    it('Copy FISC Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
            console.log('Reference of Copy FISC Payment:', reference2);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField(false); //IDXP-812
    });

    it('Edit FISC Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.TWFISCPaymentPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TWFISC.editAmount);
        await browser.sleep(2000);
        // await _PaymentsPages.SGPayNowPage.addExisting4Single(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
            console.log('Reference of Edit FISC Payment:', reference2);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField(true); //IDXP-812
    });

    //Reject the "reference2"
    it('Reject FISC Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.rejectButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.reasonForRejection.input(testData.TWFISC.rejectResason);
        await _PaymentsPages.TelegraphicTransferPage.rejectDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            console.log('Reference of Reject FISC Payment:', reference2);
            reference2 = text;
        });
        await ensure(_PaymentsPages.TelegraphicTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textIs(testData.status.Rejected),
        ]);
    });

    //Delete the "reference2"
    it('Delete FISC Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.deleteButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.deleteDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            console.log('Reference of Delete FISC Payment:', reference2);
            reference2 = text;
        });
        await ensure(_PaymentsPages.TelegraphicTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference2);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('Verify&Release Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TWFISC.SIT.loginCompanyId : testData.TWFISC.UAT.loginCompanyId, SIT ? testData.TWFISC.SIT.verifyUserId : testData.TWFISC.UAT.verifyUserId, SIT ? 123123 : testData.TWFISC.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify FISC Payment', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference, 'TW - FISC Payment').then(reference => {
            reference4VR = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4VR);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textIs(testData.status.PendingApproval),
        ]);
    });

    //approve the "reference"
    it('Approve FISC Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input(testData.TWFISC.responseCode);
        await _PaymentsPages.TelegraphicTransferPage.approveButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            console.log('Reference of Approve FISC Payment:', reference);
            reference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release FISC Payment', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference, reference4VR, "TW - FISC Payment").then(reference => {
            reference4VR = reference;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4VR);
        await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

describe('TW FISC Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TWFISC.SIT.loginCompanyId1 : testData.TWFISC.UAT.loginCompanyId1, SIT ? testData.TWFISC.SIT.loginUserId1 : testData.TWFISC.UAT.loginUserId1, SIT ? 123123 : testData.TWFISC.UAT.Password); });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

// add IEBAA-3387
it('Check the edit button for create FISC payment from template', async function () {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWFISC.TemplateName);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
    await _PaymentsPages.PaymentTemplatesPage.makeAPayment.click();
    await _PaymentsPages.singlePaymentPage.loadCondition();
    await _PaymentsPages.singlePaymentPage.reviewBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForReviewPage();
    await _PaymentsPages.singlePaymentPage.submitBtn.click();
    await _PaymentsPages.singlePaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.singlePaymentPage.reference.getText().then(text => {
        reference = text.trim();
        console.log('Reference of Create FISC Payment from template:', reference);
    });
    await ensure(_PaymentsPages.singlePaymentPage.editBtn).isNotElementPresent(),
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.actionBtn.click()
    await ensure(_PaymentsPages.TransferCentersPage.actionEditBtn).isNotElementPresent(),
    await _PaymentsPages.TransferCentersPage.refLink.click()
    await _PaymentsPages.singlePaymentPage.loadConditionForViewPage();
    await Promise.all([
        await ensure(_PaymentsPages.singlePaymentPage.editBtn).isNotElementPresent(),
    ]);
});


    // add IDXP-2013
    it('Create FISC payment from view template page', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWFISC.TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await _PaymentsPages.PaymentTemplatesPage.makeAPayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await Promise.all([
            await _PaymentsPages.TWFISCPaymentPage.fromAccount.isDisabled(),
            await _PaymentsPages.TWFISCPaymentPage.existingPayee.isDisabled(),
            await _PaymentsPages.TWFISCPaymentPage.bankChargeUs.isDisabled(),
            await _PaymentsPages.TWFISCPaymentPage.chargeAccounts.isDisabled(),
        ]);
    });
});

//for ApproveNow M-Challenge and ApproveNow without M-Challenge, they decided by amount
async function approveNow(amount: string): Promise<void> {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.makePayment.click();
    await _PaymentsPages.TelegraphicTransferPage.loadCondition();
    await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount);
    await _PaymentsPages.TelegraphicTransferPage.amount.input(amount);
    await _PaymentsPages.SGPayNowPage.addExisting4Single(SIT ? testData.TWFISC.SIT.existingPayeeName : testData.TWFISC.UAT.existingPayeeName);
    await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
    await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
    await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
    await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
    await _PaymentsPages.TelegraphicTransferPage.pushOption.clickIfExist();
    await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input(testData.TWFISC.responseCode);
    await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
    await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
    await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then((data) => {
        reference4ApproveNow = data;
        console.log('Reference of ApproveNow:', reference4ApproveNow);
    });
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4ApproveNow);
    await _PaymentsPages.TWFISCPaymentPage.loadConditionForViewPaymentPage();
    await Promise.all([
        await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
}

async function addNewPayee(): Promise<void> {
    await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
    await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
    await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TWFISC.newPayeeName);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TWFISC.newPayeeNickname);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TWFISC.newPayeeAdd1);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TWFISC.newPayeeAdd2);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd3.input(testData.TWFISC.newPayeeAdd3);
    await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testData.TWFISC.SIT.payeeBankID : testData.TWFISC.UAT.payeeBankID);
    await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TWFISC.newPayeeAcctNum);
}

export async function addExistingPayee(name: string, amount: string) {
    await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(name);
    await _PaymentsPages.BulkPaymentPage.addButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(amount);
}

export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
        await ensure(_PaymentsPages.TWFISCPaymentPage.headerRefView).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.transactionStatusView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        await ensure(_PaymentsPages.TWFISCPaymentPage.hashValueView).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.amountView).textContains(isEdit ? testData.TWFISC.editAmount : utils.formatStr2Money(testData.TWFISC.amountVR)),
        await ensure(_PaymentsPages.TWFISCPaymentPage.fromAccountView).textContains(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount),
        await ensure(_PaymentsPages.TWFISCPaymentPage.acctBalaView).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.newPayeeAcctView).textContains(testData.TWFISC.newPayeeAcctNum),
        await ensure(_PaymentsPages.TWFISCPaymentPage.newPayeeNameView).textContains(testData.TWFISC.newPayeeName),
        await ensure(_PaymentsPages.TWFISCPaymentPage.payeeAdd1View).textContains(testData.TWFISC.newPayeeAdd1),
        await ensure(_PaymentsPages.TWFISCPaymentPage.payeeAdd2View).textContains(testData.TWFISC.newPayeeAdd2),
        await ensure(_PaymentsPages.TWFISCPaymentPage.payeeAdd3View).textContains(testData.TWFISC.newPayeeAdd3),
        await ensure(_PaymentsPages.TWFISCPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.cutoffTimeView).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.paymentTypeView).textContains(testData.TWFISC.paymentTypeView),
        await ensure(_PaymentsPages.TWFISCPaymentPage.sendAmtView).textContains(isEdit ? testData.TWFISC.editAmount : utils.formatStr2Money(testData.TWFISC.amountVR)),
        await ensure(_PaymentsPages.TWFISCPaymentPage.payeeBankNameView).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.payeeBankAdd1View).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.payeeBankSwiftBicView).textContains(SIT ? testData.TWFISC.SIT.payeeBankID : testData.TWFISC.UAT.payeeBankID),
        await ensure(_PaymentsPages.TWFISCPaymentPage.payeeBankCodeView).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.payeeBrchCodeView).isNotEmpty(),
        await ensure(_PaymentsPages.TWFISCPaymentPage.paymentDetailView).textContains(testData.TWFISC.paymentDetail),
        await ensure(_PaymentsPages.TWFISCPaymentPage.messageView).textContains(testData.TWFISC.message),
        await ensure(_PaymentsPages.TWFISCPaymentPage.emailListView).textContains(testData.TWFISC.emailIdO),
        await ensure(_PaymentsPages.TWFISCPaymentPage.emailListView).textContains(testData.TWFISC.emailId1),
        await ensure(_PaymentsPages.TWFISCPaymentPage.emailListView).textContains(testData.TWFISC.emailId2),
        await ensure(_PaymentsPages.TWFISCPaymentPage.emailListView).textContains(testData.TWFISC.emailId3),
        await ensure(_PaymentsPages.TWFISCPaymentPage.emailListView).textContains(testData.TWFISC.emailId4),
        await ensure(_PaymentsPages.TWFISCPaymentPage.bankChargeView).textContains(testData.TWFISC.bankChargeView),
        await ensure(_PaymentsPages.TWFISCPaymentPage.chargeAcctView).textContains(SIT ? testData.TWFISC.SIT.fromAccount : testData.TWFISC.UAT.fromAccount),
        await ensure(_PaymentsPages.TWFISCPaymentPage.msgToApproverView).textContains(testData.TWFISC.transactionNote),
    ]);
}