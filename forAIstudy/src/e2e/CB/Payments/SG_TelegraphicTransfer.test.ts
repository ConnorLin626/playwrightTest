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

describe('SG_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a TT Payment with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select(testData.TelegraphicTransfer.Country);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd3.input(testData.TelegraphicTransfer.newPayeeAdd3);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeBankID.select(SIT ? testData.TelegraphicTransfer.payeeBankID : testData.TelegraphicTransfer.UAT.payeeBankID);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeRoutingCode.input(testData.TelegraphicTransfer.newPayeeRoutingCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.intermediaryBankIsIntermediary.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.intermediaryBankCountry.select(testData.TelegraphicTransfer.intermediaryBankCountry);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.intermediaryBankID.select(testData.TelegraphicTransfer.intermediaryBankID);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAcctNumber),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.paymentDateValue).isNotEmpty(),
            // await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.exchangeRateValue).isNotEmpty(),
        ]);
    });

    it('Create a TT Payment with ApprovalNow pMchllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesShared.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.pchallengeText).textContains(testData.TelegraphicTransfer.pMChllengeText);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input('123123123');
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a TT Payment with ApprovalNow mChllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeTab.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.Country.select(testData.TelegraphicTransfer.Country);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.payeeBankID.select(SIT ? testData.TelegraphicTransfer.payeeBankID : testData.TelegraphicTransfer.UAT.payeeBankID);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeRoutingCode.input(testData.TelegraphicTransfer.newPayeeRoutingCode);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesThey.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.mchallengeText).textContains(testData.TelegraphicTransfer.mChllengeText);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input('123123123');
        await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a TT Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'TTName' + generatedID();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.templateName.input(TemplateName);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();

        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
        ]);

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
        ]);
    });

    it('Create a TT Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TelegraphicTransfer.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create a TT with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.bankChargesOur.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isBeneAdvising.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isTransactionNote.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.saveAsDraft.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a TT via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.copyButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.clean();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.amountV);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.clean();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.rejectButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.PaymentLocalOverseasPayeePage.rejectDialogButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXRejectDialogSuccess();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.editButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadCondition();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.clean();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.amount.input(testData.TelegraphicTransfer.editAmount);
        await browser.sleep(2000); // for test
        await _PaymentsPages.PaymentLocalOverseasPayeePage.nextButton.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.submitButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.amountValue).textContains(testData.TelegraphicTransfer.editAmount),
        ]);
    });

    it('Delete a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.deleteButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.deleteDialogButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage).isUXRejectDialogSuccess();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('SG_Telegraphic Transfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.verifyUserId : testData.TelegraphicTransfer.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a TT Payment via My Verify', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference3, 'SG - Telegraphic Transfer').then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.click();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.challengeResponse.input('123123123');
        await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.approveButton.jsClick();
        await _PaymentsPages.PaymentLocalOverseasPayeePage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.PaymentLocalOverseasPayeePage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a TT Payment via My Release', async function () {
        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "SG - Telegraphic Transfer").then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PaymentLocalOverseasPayeePage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentLocalOverseasPayeePage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});