/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages } from "../../../pages/CB";
import { Menu } from '../../../config/menu';
import { ensure, generatedID, SIT, handlerCase } from '../../../lib';
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
let vReference = '';
const CB_1 = require("../../../pages/CB");
const lib_1 = require("../../../lib");
let fileName = "";
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new CB_1.FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('UK_testData.json');

const _ttPage = _PaymentsPages.PaymentLocalOverseasPayeePage;
const _ttData = testData.TelegraphicTransfer;

describe('UK_TelegraphicTransfer', async function () {
    this.retries(browser.params.caseRetryTimes);

    before(async function () { await new NavigatePages().loginCB(SIT ? _ttData.SIT.loginCompanyId : _ttData.UAT.loginCompanyId, SIT ? _ttData.SIT.loginUserId : _ttData.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a TT Payment with new Payee', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
        await _ttPage.loadCondition();
        await _ttPage.fromAccount.select(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount);
        await _ttPage.amount.input(_ttData.amountA1);
        await _ttPage.newPayeeTab.click();
        await _ttPage.Country.select(_ttData.Country);
        await _ttPage.newPayeeName.input(_ttData.newPayeeName);
        await _ttPage.newPayeeAdd1.input(_ttData.newPayeeAdd1);
        await _ttPage.newPayeeAdd2.input(_ttData.newPayeeAdd2);
        await _ttPage.newPayeeAdd3.input(_ttData.newPayeeAdd3);
        await _ttPage.payeeBankID.select(SIT ? _ttData.SIT.ttPayeeBankID : _ttData.UAT.ttPayeeBankID);
        await _ttPage.newPayeeRoutingCode.input(_ttData.newPayeeRoutingCode);
        await _ttPage.newPayeeAcctNumber.input(_ttData.newPayeeAcctNumber);
        await _ttPage.intermediaryBankIsIntermediary.jsClick();
        await _ttPage.intermediaryBankCountry.select(_ttData.intermediaryBankCountry);
        await _ttPage.intermediaryBankID.select(_ttData.intermediaryBankID);
        await _ttPage.bankChargesOur.jsClick();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.isBeneAdvising.jsClick();
        await _ttPage.emailIdO.input(_ttData.emailIdO);
        await _ttPage.emailId1.input(_ttData.emailId1);
        await _ttPage.emailId2.input(_ttData.emailId2);
        await _ttPage.emailId3.input(_ttData.emailId3);
        await _ttPage.emailId4.input(_ttData.emailId4);
        await _ttPage.message.input(_ttData.message);
        await _ttPage.isTransactionNote.jsClick();
        await _ttPage.transactionNote.input(_ttData.transactionNote);
        await _ttPage.isMessageToOrderingBank.jsClick();
        await _ttPage.messageToOrderingBank.input(_ttData.messageToOrderingBank);
        await _ttPage.nextButton.click();
        await _ttPage.loadConditionForPrevewPage();
        await _ttPage.submitButton.click();
        await _ttPage.loadConditionForSubmittedPage();
        await _ttPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_ttPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.fromAccountValue).textContains(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount),
            await ensure(_ttPage.amountValue).textContains(_ttData.amountA1),
            await ensure(_ttPage.toNewPayeeNameValue).textContains(_ttData.newPayeeName),
            await ensure(_ttPage.transactionStatus).textIs(testData.status.PendingApproval)
        ]);
    });

    it('Create a TT Payment with ApprovalNow mChllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
        await _ttPage.loadCondition();
        await _ttPage.fromAccount.select(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount);
        await _ttPage.amount.input(_ttData.amountA1);
        await _ttPage.newPayeeTab.click();
        await _ttPage.newPayeeName.input(_ttData.newPayeeName);
        await _ttPage.newPayeeAdd1.input(_ttData.newPayeeAdd1);
        await _ttPage.payeeBankID.select(SIT ? _ttData.SIT.mTTPayeeBankID : _ttData.UAT.mTTPayeeBankID);
        await _ttPage.newPayeeRoutingCode.input(_ttData.newPayeeRoutingCode);
        await _ttPage.newPayeeAcctNumber.input(_ttData.newPayeeAcctNumber);
        await _ttPage.bankChargesThey.jsClick();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.isMessageToOrderingBank.jsClick();
        await _ttPage.messageToOrderingBank.input(_ttData.messageToOrderingBank);
        await _ttPage.nextButton.click();
        await _ttPage.loadConditionForPrevewPage();
        await _ttPage.approvalNowCheckBox.jsClick();
		await ensure( _ttPage.mchallengeText).textContains(_ttData.mChllengeText);
        await _ttPage.getChallengeSMS.clickIfExist();
        await _ttPage.challengeResponse.input(_ttData.challengeCode);
        await _ttPage.submitButton.click();
        await _ttPage.loadConditionForSubmittedPage();
        await _ttPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_ttPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.transactionStatus).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a TT Payment with ApprovalNow without mChllenge', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
        await _ttPage.loadCondition();
        await _ttPage.fromAccount.select(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount);
        await _ttPage.amount.input(_ttData.amountA2);
        await _ttPage.newPayeeTab.click();
        await _ttPage.newPayeeName.input(_ttData.newPayeeName);
        await _ttPage.newPayeeAdd1.input(_ttData.newPayeeAdd1);
        await _ttPage.payeeBankID.select(SIT ? _ttData.SIT.mTTPayeeBankID : _ttData.UAT.mTTPayeeBankID);
        await _ttPage.newPayeeRoutingCode.input(_ttData.newPayeeRoutingCode);
        await _ttPage.newPayeeAcctNumber.input(_ttData.newPayeeAcctNumber);
        await _ttPage.bankChargesThey.jsClick();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.isMessageToOrderingBank.jsClick();
        await _ttPage.messageToOrderingBank.input(_ttData.messageToOrderingBank);
        await _ttPage.nextButton.click();
        await _ttPage.loadConditionForPrevewPage();
        await _ttPage.approvalNowCheckBox.jsClick();
		// await ensure(_ttPage.pchallengeText).textContains(_ttData.pMChllengeText);
		await _ttPage.getChallengeSMS.clickIfExist();
        await _ttPage.challengeResponse.input(_ttData.challengeCode);
        await _ttPage.submitButton.click();
        await _ttPage.loadConditionForSubmittedPage();
        await _ttPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_ttPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.transactionStatus).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a TT Payment with Save as Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
        await _ttPage.loadCondition();
        await _ttPage.fromAccount.select(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount);
        await _ttPage.amount.input(_ttData.amountA1);
        await _ttPage.existingPayee.select(SIT ? _ttData.SIT.existingPayee : _ttData.UAT.existingPayee);
        await _ttPage.bankChargesOur.jsClick();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.isBeneAdvising.jsClick();
        await _ttPage.emailIdO.input(_ttData.emailIdO);
        await _ttPage.emailId1.input(_ttData.emailId1);
        await _ttPage.emailId2.input(_ttData.emailId2);
        await _ttPage.emailId3.input(_ttData.emailId3);
        await _ttPage.emailId4.input(_ttData.emailId4);
        await _ttPage.message.input(_ttData.message);
        await _ttPage.isTransactionNote.jsClick();
        await _ttPage.transactionNote.input(_ttData.transactionNote);
        await _ttPage.isMessageToOrderingBank.jsClick();
        await _ttPage.nextButton.click();
        await _ttPage.loadConditionForPrevewPage();
        await _ttPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'TTName' + generatedID();
        await _ttPage.templateName.input(TemplateName);
        await _ttPage.submitButton.click();
        await _ttPage.loadConditionForSubmittedPage();
        await _ttPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_ttPage).isUXSuccess();

        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _ttPage.loadConditionForViewTTTemplatePage();
        await Promise.all([
            await ensure(_ttPage.templateNameValue).textIs(TemplateName),
            await ensure(_ttPage.fromAccountValue).textContains(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount),
            await ensure(_ttPage.amountValue).textContains(_ttData.amountA1),
            await ensure(_ttPage.toExistingPayeeNameValue).textContains(SIT ? _ttData.SIT.existingPayee : _ttData.UAT.existingPayee),
        ]);

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _ttPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_ttPage.fromAccountValue).textContains(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount),
            await ensure(_ttPage.amountValue).textContains(_ttData.amountA1),
            await ensure(_ttPage.toExistingPayeeNameValue).textContains(SIT ? _ttData.SIT.existingPayee : _ttData.UAT.existingPayee),
        ]);
    });

    it('Create a TT Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? _ttData.SIT.existingTemplate:_ttData.UAT.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _ttPage.loadConditionCreatePaymentTemplate();
        await _ttPage.nextButton.jsClick();
        await _ttPage.submitButton.click();
        await _ttPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_ttPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _ttPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_ttPage.fromAccountValue).isNotEmpty(),
            await ensure(_ttPage.amountValue).isNotEmpty(),
            await ensure(_ttPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create a TT with Save as Draft', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
        await _ttPage.loadCondition();
        await _ttPage.fromAccount.select(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount);
        await _ttPage.amount.input(_ttData.amountA1);
        await _ttPage.existingPayee.select(SIT ? _ttData.SIT.existingPayee : _ttData.UAT.existingPayee);
        await _ttPage.bankChargesOur.jsClick();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.isBeneAdvising.jsClick();
        await _ttPage.emailIdO.input(_ttData.emailIdO);
        await _ttPage.emailId1.input(_ttData.emailId1);
        await _ttPage.emailId2.input(_ttData.emailId2);
        await _ttPage.emailId3.input(_ttData.emailId3);
        await _ttPage.emailId4.input(_ttData.emailId4);
        await _ttPage.message.input(_ttData.message);
        await _ttPage.isTransactionNote.jsClick();
        await _ttPage.transactionNote.input(_ttData.transactionNote);
        await _ttPage.isMessageToOrderingBank.jsClick();
        await _ttPage.messageToOrderingBank.input(_ttData.messageToOrderingBank);
        await _ttPage.saveAsDraft.click();
        await _ttPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _ttPage.dismissButton.click();
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.fromAccountValue).textContains(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount),
            await ensure(_ttPage.amountValue).textContains(_ttData.amountA1),
            await ensure(_ttPage.toExistingPayeeNameValue).textContains(SIT ? _ttData.SIT.existingPayee : _ttData.UAT.existingPayee),
            await ensure(_ttPage.transactionStatus).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a TT via Transfer Center', async function () {

        await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
        await _ttPage.loadCondition();
        await _ttPage.fromAccount.select(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount);
        await _ttPage.currency.select(_ttData.paymentCurrency);
        await _ttPage.amount.input(_ttData.amountA2);
        await _ttPage.newPayeeTab.click();
        await _ttPage.Country.select(_ttData.Country);
        await _ttPage.newPayeeName.input(_ttData.newPayeeName);
        await _ttPage.newPayeeAdd1.input(_ttData.newPayeeAdd1);
        await _ttPage.newPayeeAdd2.input(_ttData.newPayeeAdd2);
        await _ttPage.newPayeeAdd3.input(_ttData.newPayeeAdd3);
        await _ttPage.payeeBankID.select(SIT ? _ttData.SIT.ttPayeeBankID : _ttData.UAT.ttPayeeBankID);
        await _ttPage.newPayeeRoutingCode.input(_ttData.newPayeeRoutingCode);
        await _ttPage.newPayeeAcctNumber.input(_ttData.newPayeeAcctNumber);
        await _ttPage.intermediaryBankIsIntermediary.jsClick();
        await _ttPage.intermediaryBankCountry.select(_ttData.intermediaryBankCountry);
        await _ttPage.intermediaryBankID.select(_ttData.intermediaryBankID);
        await _ttPage.bankChargesOur.jsClick();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.isBeneAdvising.jsClick();
        await _ttPage.emailIdO.input(_ttData.emailIdO);
        await _ttPage.emailId1.input(_ttData.emailId1);
        await _ttPage.emailId2.input(_ttData.emailId2);
        await _ttPage.emailId3.input(_ttData.emailId3);
        await _ttPage.emailId4.input(_ttData.emailId4);
        await _ttPage.message.input(_ttData.message);
        await _ttPage.isTransactionNote.jsClick();
        await _ttPage.transactionNote.input(_ttData.transactionNote);
        await _ttPage.isMessageToOrderingBank.jsClick();
        await _ttPage.messageToOrderingBank.input(_ttData.messageToOrderingBank);
        await _ttPage.nextButton.click();
        await _ttPage.loadConditionForPrevewPage();
        await _ttPage.submitButton.click();
        await _ttPage.loadConditionForSubmittedPage();
        let newReference = '';
        await _ttPage.getInfoReferenceID().then(text => {
            newReference = text;
        });
        await ensure(_ttPage).isUXSuccess();


        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== newReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(newReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_TT, testData.status.PendingApproval);
        }
        await _ttPage.loadConditionForViewTTPaymentPage();
        await _ttPage.copyButton.click();
        await _ttPage.loadCondition();
        await _ttPage.amount.clean();
        await _ttPage.amount.input(_ttData.amountCopy);
        await _ttPage.paymentDetail.clean();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.nextButton.click();
        await _ttPage.submitButton.click();
        await _ttPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_ttPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.fromAccountValue).isNotEmpty(),
            await ensure(_ttPage.amountValue).isNotEmpty(),
            await ensure(_ttPage.transactionStatus).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Edit a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_TT, testData.status.PendingApproval);
        }
        await _ttPage.loadConditionForViewTTPaymentPage();
        await _ttPage.editButton.click();
        await _ttPage.loadCondition();
        await _ttPage.amount.clean();
        await _ttPage.amount.input(_ttData.editAmount);
        await _ttPage.paymentDetail.clean();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.nextButton.jsClick();
        await _ttPage.submitButton.click();
        await _ttPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_ttPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.amountValue).textContains(_ttData.editAmount),
        ]);
    });

    it('Reject a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_TT, testData.status.PendingApproval);
        }
        await _ttPage.loadConditionForViewTTPaymentPage();
        await _ttPage.rejectButton.click();
        await _ttPage.reasonForRejection.input(testData.reasonForRejection);
        await _ttPage.rejectDialogButton.click();
        await _ttPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_ttPage).isUXRejectDialogSuccess();
        await _ttPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.transactionStatus).textIs(testData.status.Rejected),
        ]);
    });

    it('Delete a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== reference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_TT, testData.status.PendingApproval);
        }
        await _ttPage.loadConditionForViewTTPaymentPage();
        await _ttPage.deleteButton.click();
        await _ttPage.deleteDialogButton.click();
        await _ttPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_ttPage).isUXRejectDialogSuccess();
        await _ttPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs(testData.noInfoError),
        ]);
    });

    it('Upload TT via Files to File Upload to Upload Files', async function () {
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload(_FilesPages, _ttData.fileType, _ttData.fileFormat, lib_1.SIT ? _ttData.fileName : _ttData.fileName, _ttData.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _ttPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_ttPage.fromAccountValue).textContains(SIT ? _ttData.SIT.fromAccountUpload : _ttData.UAT.fromAccountUpload),
            await ensure(_ttPage.amountValue).textContains(_ttData.amountUpload),
            await ensure(_ttPage.toNewPayeeNameValue).textContains(_ttData.newPayeeNameUpload),
            await ensure(_ttPage.transactionStatus).textIs(testData.status.PendingApproval),
        ]);
    });

    it('create a TT payment for verify', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.UKPaymentLocalOverseasPayee);
        await _ttPage.loadCondition();
        await _ttPage.fromAccount.select(SIT ? _ttData.SIT.fromAccount : _ttData.UAT.fromAccount);
        await _ttPage.amount.input(_ttData.amountVerify);
        await _ttPage.newPayeeTab.click();
        await _ttPage.newPayeeName.input(_ttData.newPayeeName);
        await _ttPage.newPayeeAdd1.input(_ttData.newPayeeAdd1);
        await _ttPage.newPayeeAdd2.input(_ttData.newPayeeAdd2);
        await _ttPage.newPayeeAdd3.input(_ttData.newPayeeAdd3);
        await _ttPage.payeeBankID.select(SIT ? _ttData.SIT.mTTPayeeBankID : _ttData.UAT.mTTPayeeBankID);
        await _ttPage.newPayeeRoutingCode.input(_ttData.newPayeeRoutingCode);
        await _ttPage.newPayeeAcctNumber.input(_ttData.newPayeeAcctNumber);
        await _ttPage.intermediaryBankIsIntermediary.jsClick();
        await _ttPage.intermediaryBankCountry.select(_ttData.intermediaryBankCountry);
        await _ttPage.intermediaryBankID.select(_ttData.intermediaryBankID);
        await _ttPage.bankChargesOur.jsClick();
        await _ttPage.paymentDetail.input(_ttData.paymentDetail);
        await _ttPage.isBeneAdvising.jsClick();
        await _ttPage.emailIdO.input(_ttData.emailIdO);
        await _ttPage.emailId1.input(_ttData.emailId1);
        await _ttPage.emailId2.input(_ttData.emailId2);
        await _ttPage.emailId3.input(_ttData.emailId3);
        await _ttPage.emailId4.input(_ttData.emailId4);
        await _ttPage.message.input(_ttData.message);
        await _ttPage.isTransactionNote.jsClick();
        await _ttPage.transactionNote.input(_ttData.transactionNote);
        await _ttPage.isMessageToOrderingBank.jsClick();
        await _ttPage.messageToOrderingBank.input(_ttData.messageToOrderingBank);
        await _ttPage.nextButton.click();
        await _ttPage.loadConditionForPrevewPage();
        await _ttPage.submitButton.click();
        await _ttPage.loadConditionForSubmittedPage();
        await _ttPage.getInfoReferenceID().then(text => {
            vReference = text;
        });
        await ensure(_ttPage).isUXSuccess();
    });
});


describe('UK_Telegraphic Transfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? _ttData.SIT.loginCompanyId : _ttData.UAT.loginCompanyId, SIT ? _ttData.SIT.verifyUserId : _ttData.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });


    it('Verify a TT Payment via My Verify', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, vReference, 'UK - Telegraphic Transfer').then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.transactionStatus).textContains(testData.status.PendingApproval),
        ]);
    })

    it('Approve a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        if (0 !== vReference.trim().length) {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(vReference);
        } else {
            await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.UK_TT, testData.status.PendingApproval);
        }
        await _ttPage.loadConditionForViewTTPaymentPage();

        await _ttPage.approveButton.click();
        await _ttPage.getChallengeSMS.clickIfExist();
        await _ttPage.challengeResponse.input(_ttData.challengeCode);
        await _PaymentsPages.transferCentersPage.loadConditionforApprovalSection();
        await _ttPage.approveButton.jsClick();
        await _ttPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _ttPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a TT Payment via My Release', async function () {
        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.UK_TT).then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _ttPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_ttPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});
