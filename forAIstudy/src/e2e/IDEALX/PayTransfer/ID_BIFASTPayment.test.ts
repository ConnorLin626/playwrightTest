/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages,FilesPages } from '../../../pages/IDEALX';
import { ensure, generatedID, handlerCase, SIT, PROJECT_TYPE } from '../../../lib';
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
let BIFASTTemplateName=''
let fileName = '';
let referenceEdit ='';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();

let testData = _PaymentsPages.fetchTestData('ID_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/ID_uploadTestData.json');
let currentDate = moment(new Date()).format("DD MMM YYYY");

describe('ID_BIFAST Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BIFASTPayment.SIT.loginCompanyId : testData.BIFASTPayment.UAT.loginCompanyId, SIT ? testData.BIFASTPayment.SIT.loginUserId : testData.BIFASTPayment.UAT.loginUserId, testData.BIFASTPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create ID BIFAST Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.BIFASTPaymentPage.loadCondition();
        await _PaymentsPages.BIFASTPaymentPage.fromAccount.select(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount);
        await _PaymentsPages.BIFASTPaymentPage.amount.input(testData.BIFASTPayment.amountA1);
        await _PaymentsPages.BIFASTPaymentPage.newBIFASTPayeeTab.click();
        await _PaymentsPages.BIFASTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.newPayeeName.input(testData.BIFASTPayment.newPayeeName);
        await _PaymentsPages.BIFASTPaymentPage.newPayeeNickname.input(testData.BIFASTPayment.newPayeeNickname);
        await _PaymentsPages.BIFASTPaymentPage.proxyTypeMobile.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.mobileNumber.input(testData.BIFASTPayment.mobileNumber);
        await _PaymentsPages.BIFASTPaymentPage.fetchPayeeName.click();
        await _PaymentsPages.BIFASTPaymentPage.savePayee.jsClick ();
        await _PaymentsPages.BIFASTPaymentPage.BIFASTBtn.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.purposeCode.select(testData.BIFASTPayment.purposeCode);
        await _PaymentsPages.BIFASTPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.input(testData.BIFASTPayment.paymentDetail);
        await _PaymentsPages.BIFASTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.emailIdO.input(testData.BIFASTPayment.emailIdO);
        await _PaymentsPages.BIFASTPaymentPage.emailId1.input(testData.BIFASTPayment.emailId1);
        await _PaymentsPages.BIFASTPaymentPage.emailId2.input(testData.BIFASTPayment.emailId2);
        await _PaymentsPages.BIFASTPaymentPage.emailId3.input(testData.BIFASTPayment.emailId3);
        await _PaymentsPages.BIFASTPaymentPage.emailId4.input(testData.BIFASTPayment.emailId4);
        await _PaymentsPages.BIFASTPaymentPage.message.input(testData.BIFASTPayment.message);
        await _PaymentsPages.BIFASTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.transactionNote.input(testData.BIFASTPayment.transactionNote);
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        //Add for DASB-74531
        await ensure(_PaymentsPages.BIFASTPaymentPage.nicknameMsg).isNotElementPresent(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.nicknameMsgTop).textContains(testData.BIFASTPayment.Msg),
        await _PaymentsPages.BIFASTPaymentPage.savePayee.click();
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.BIFASTPaymentPage.submitButton.click();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BIFASTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages,reference);
        await checkViewBIFASTPageAllField(false);//Add for IDXP-812
    });

    it('Create a BIFAST Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.BIFASTPaymentPage.loadCondition();
        await _PaymentsPages.BIFASTPaymentPage.fromAccount.select(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount);
        await _PaymentsPages.BIFASTPaymentPage.amount.input(testData.BIFASTPayment.amountA2);
        await _PaymentsPages.BIFASTPaymentPage.newBIFASTPayeeTab.click();
        await _PaymentsPages.BIFASTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.newPayeeName.input(testData.BIFASTPayment.newPayeeName);
        await _PaymentsPages.BIFASTPaymentPage.newPayeeNickname.input(testData.BIFASTPayment.newPayeeNickname);
        await _PaymentsPages.BIFASTPaymentPage.proxyTypeEmail.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.email.input(testData.BIFASTPayment.newPayeeEmail);
        await _PaymentsPages.BIFASTPaymentPage.fetchPayeeName.click();
        await _PaymentsPages.BIFASTPaymentPage.BIFASTBtn.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.purposeCode.select(testData.BIFASTPayment.purposeCode);
        await _PaymentsPages.BIFASTPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.input(testData.BIFASTPayment.paymentDetail);
        await _PaymentsPages.BIFASTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.emailIdO.input(testData.BIFASTPayment.emailIdO);
        await _PaymentsPages.BIFASTPaymentPage.emailId1.input(testData.BIFASTPayment.emailId1);
        await _PaymentsPages.BIFASTPaymentPage.emailId2.input(testData.BIFASTPayment.emailId2);
        await _PaymentsPages.BIFASTPaymentPage.emailId3.input(testData.BIFASTPayment.emailId3);
        await _PaymentsPages.BIFASTPaymentPage.emailId4.input(testData.BIFASTPayment.emailId4);
        await _PaymentsPages.BIFASTPaymentPage.message.input(testData.BIFASTPayment.message);
        await _PaymentsPages.BIFASTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.transactionNote.input(testData.BIFASTPayment.transactionNote);
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.BIFASTPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.BIFASTPaymentPage.submitButton.click();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BIFASTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a BIFAST Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.BIFASTPaymentPage.loadCondition();
        await _PaymentsPages.BIFASTPaymentPage.fromAccount.select(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount);
        await _PaymentsPages.BIFASTPaymentPage.amount.input(testData.BIFASTPayment.amountA1);
        await _PaymentsPages.BIFASTPaymentPage.newBIFASTPayeeTab.click();
        await _PaymentsPages.BIFASTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.newPayeeName.input(testData.BIFASTPayment.newPayeeName);
        await _PaymentsPages.BIFASTPaymentPage.newPayeeNickname.input(testData.BIFASTPayment.newPayeeNickname);
        await _PaymentsPages.BIFASTPaymentPage.proxyTypeAccount.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.accountNumber.input(testData.BIFASTPayment.acctNumber);
        await _PaymentsPages.BIFASTPaymentPage.payeeBankID.select(SIT ? testData.BIFASTPayment.SIT.payeeBankID : testData.BIFASTPayment.UAT.payeeBankID);
        await _PaymentsPages.BIFASTPaymentPage.fetchPayeeName.click();
        await _PaymentsPages.BIFASTPaymentPage.BIFASTBtn.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.purposeCode.select(testData.BIFASTPayment.purposeCode);
        await _PaymentsPages.BIFASTPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.input(testData.BIFASTPayment.paymentDetail);
        await _PaymentsPages.BIFASTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.emailIdO.input(testData.BIFASTPayment.emailIdO);
        await _PaymentsPages.BIFASTPaymentPage.emailId1.input(testData.BIFASTPayment.emailId1);
        await _PaymentsPages.BIFASTPaymentPage.emailId2.input(testData.BIFASTPayment.emailId2);
        await _PaymentsPages.BIFASTPaymentPage.message.input(testData.BIFASTPayment.message);
        await _PaymentsPages.BIFASTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.transactionNote.input(testData.BIFASTPayment.transactionNote);
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.BIFASTPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.getChallengeSMS.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.BIFASTPaymentPage.submitButton.click();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BIFASTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a BIFAST Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.BIFASTPaymentPage.loadCondition();
        await _PaymentsPages.BIFASTPaymentPage.fromAccount.select(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount);
        await _PaymentsPages.BIFASTPaymentPage.amount.input(testData.BIFASTPayment.amountA1);
        await _PaymentsPages.BIFASTPaymentPage.existingPayee.select(testData.BIFASTPayment.existingPayee);
        await _PaymentsPages.BIFASTPaymentPage.BIFASTBtn.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.purposeCode.select(testData.BIFASTPayment.purposeCode);
        await _PaymentsPages.BIFASTPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.input(testData.BIFASTPayment.paymentDetail);
        await _PaymentsPages.BIFASTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.emailIdO.input(testData.BIFASTPayment.emailIdO);
        await _PaymentsPages.BIFASTPaymentPage.message.input(testData.BIFASTPayment.message);
        await _PaymentsPages.BIFASTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.transactionNote.input(testData.BIFASTPayment.transactionNote);
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.BIFASTPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'BIFASTTemplate' + generatedID();
        await _PaymentsPages.BIFASTPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.BIFASTPaymentPage.submitButton.click();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BIFASTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewTemplatePayge();
        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.BIFASTPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BIFASTPaymentPage.amountValueForTemplate).textContains(testData.BIFASTPayment.amountA1),
            await ensure(_PaymentsPages.BIFASTPaymentPage.payeeValueForTemplate).textContains(testData.BIFASTPayment.existingPayee)
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.fromAccountValue).textContains(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BIFASTPaymentPage.amountValue).textContains(testData.BIFASTPayment.amountA1),
            await ensure(_PaymentsPages.BIFASTPaymentPage.toExistingPayeeValue).textContains(testData.BIFASTPayment.existingPayee)
        ]);
    });

    it('Create a BIFAST Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.BIFASTPayment.existingTemplateName);
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.BIFASTPayment.existingTemplateName);
        // }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BIFASTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.loadCondition();
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.clean();
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.input(testData.BIFASTPayment.paymentDetail);
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        await _PaymentsPages.BIFASTPaymentPage.submitButton.click();
        await _PaymentsPages.BIFASTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.BIFASTPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.BIFASTPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a BIFAST Payment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.BIFASTPaymentPage.loadCondition();
        await _PaymentsPages.BIFASTPaymentPage.fromAccount.select(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount);
        await _PaymentsPages.BIFASTPaymentPage.amount.input(testData.BIFASTPayment.amountA1);
        await _PaymentsPages.BIFASTPaymentPage.existingPayee.select(testData.BIFASTPayment.existingPayee);
        await _PaymentsPages.BIFASTPaymentPage.BIFASTBtn.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.purposeCode.select(testData.BIFASTPayment.purposeCode);
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.input(testData.BIFASTPayment.paymentDetail);
        await _PaymentsPages.BIFASTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.emailIdO.input(testData.BIFASTPayment.emailIdO);
        await _PaymentsPages.BIFASTPaymentPage.emailId1.input(testData.BIFASTPayment.emailId1);
        await _PaymentsPages.BIFASTPaymentPage.emailId2.input(testData.BIFASTPayment.emailId2);
        await _PaymentsPages.BIFASTPaymentPage.emailId3.input(testData.BIFASTPayment.emailId3);
        await _PaymentsPages.BIFASTPaymentPage.emailId4.input(testData.BIFASTPayment.emailId4);
        await _PaymentsPages.BIFASTPaymentPage.message.input(testData.BIFASTPayment.message);
        await _PaymentsPages.BIFASTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.transactionNote.input(testData.BIFASTPayment.transactionNote);
        await _PaymentsPages.BIFASTPaymentPage.saveAsDraft.click();
        await _PaymentsPages.BIFASTPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BIFASTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.fromAccountValue).textContains(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BIFASTPaymentPage.amountValue).textContains(testData.BIFASTPayment.amountA1),
            await ensure(_PaymentsPages.BIFASTPaymentPage.toExistingPayeeValue).textContains(testData.BIFASTPayment.existingPayee),
            await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a BIFAST Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - BIFAST Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewBIFASTPaymentPage();
        await _PaymentsPages.BIFASTPaymentPage.copyButton.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.loadCondition();
        await _PaymentsPages.BIFASTPaymentPage.newPayeeNickname.input(testData.BIFASTPayment.newPayeeNickname);
        await _PaymentsPages.BIFASTPaymentPage.amount.clean();
        await _PaymentsPages.BIFASTPaymentPage.amount.input(testData.BIFASTPayment.amountV);
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.clean();
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.input(testData.BIFASTPayment.paymentDetail);
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        await _PaymentsPages.BIFASTPaymentPage.submitButton.click();
        await _PaymentsPages.BIFASTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);

        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.BIFASTPaymentPage.amountValue).textContains(testData.BIFASTPayment.amountV),
            await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a BIFAST Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - BIFAST Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewBIFASTPaymentPage();
        await _PaymentsPages.BIFASTPaymentPage.editButton.click();
        await _PaymentsPages.BIFASTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.loadCondition();
        await _PaymentsPages.BIFASTPaymentPage.newPayeeNickname.input(testData.BIFASTPayment.newPayeeNickname);
        await _PaymentsPages.BIFASTPaymentPage.amount.clean();
        await _PaymentsPages.BIFASTPaymentPage.amount.input(testData.BIFASTPayment.editAmount);
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        await _PaymentsPages.BIFASTPaymentPage.submitButton.click();
        await _PaymentsPages.BIFASTPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, referenceEdit);
        if(referenceEdit == reference){
            await checkViewBIFASTPageAllField(true);//add for IDXP-812
        }else{
            await Promise.all([
                await ensure(_PaymentsPages.BIFASTPaymentPage.amountValue).textContains(testData.BIFASTPayment.editAmount)
            ]);
        }
       
    });

    it('Reject a BIFAST Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - BIFAST Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewBIFASTPaymentPage();
        await _PaymentsPages.BIFASTPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.BIFASTPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.BIFASTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BIFASTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BIFASTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });


    it('Delete a BIFAST Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - BIFAST Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewBIFASTPaymentPage();
        await _PaymentsPages.BIFASTPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BIFASTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.BIFASTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Upload BIFAST Payment via Files services Upload', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.BIFASTPayment.SIT.fileName : testData.IBPSBulkPayment.UAT.fileName, testData.BIFASTPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewBIFASTPaymentPage();
        await checkViewPageAllField(); //IDXP-812
    });

    it('Download BIFAST Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.filesMangementCenter.click();
        await _FilesPages.uploadFilePage.downloadTab.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadBIFAST' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(testData.BIFASTPayment.downloadFileType);
        await _FilesPages.downloadFilePage.scrollTo(0, 400);
        await _FilesPages.downloadFilePage.absoluteDatesBtn.jsClick();
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData.BIFASTPayment.fromDate);
        await _FilesPages.downloadFilePage.endAbsoluteDate.select(currentDate);
        await _FilesPages.downloadFilePage.loadConditionForDownloadFile();
        await _FilesPages.downloadFilePage.nextBtn.jsClick();
        await _FilesPages.downloadFilePage.dismissBtn.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.refershButton.jsClick();
        await Promise.all([
            await ensure(_FilesPages.downloadFilePage.fileLink).textContains(fileName),
            await ensure(_FilesPages.downloadFilePage.downloadBtn).isNotDisabled(),
        ]);
    });

    it('Create a BIFAST Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        BIFASTTemplateName = 'BIFASTTmeplate' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(BIFASTTemplateName);
        await _PaymentsPages.BIFASTPaymentPage.fromAccount.select(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount);
        await _PaymentsPages.BIFASTPaymentPage.amount.input(testData.BIFASTPayment.amountA1);
        await _PaymentsPages.BIFASTPaymentPage.existingPayee.select(testData.BIFASTPayment.existingPayee);
        await _PaymentsPages.BIFASTPaymentPage.BIFASTBtn.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.purposeCode.select(testData.BIFASTPayment.purposeCode);
        await _PaymentsPages.BIFASTPaymentPage.paymentDetail.input(testData.BIFASTPayment.paymentDetail);
        await _PaymentsPages.BIFASTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.emailIdO.input(testData.BIFASTPayment.emailIdO);
        await _PaymentsPages.BIFASTPaymentPage.emailId1.input(testData.BIFASTPayment.emailId1);
        await _PaymentsPages.BIFASTPaymentPage.message.input(testData.BIFASTPayment.message);
        await _PaymentsPages.BIFASTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.transactionNote.input(testData.BIFASTPayment.transactionNote);
        await _PaymentsPages.BIFASTPaymentPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(BIFASTTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewTemplatePayge();
        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.templateNameValue).textIs(BIFASTTemplateName),
            await ensure(_PaymentsPages.BIFASTPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BIFASTPaymentPage.amountValueForTemplate).isNotEmpty(),
            await ensure(_PaymentsPages.BIFASTPaymentPage.payeeValueForTemplate).textContains(testData.BIFASTPayment.existingPayee),
            await ensure(_PaymentsPages.BIFASTPaymentPage.templateStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved)
        ]);
    });

    it('Approve BIFAST Payment Template', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.BIFASTPayment.SIT.loginCompanyId : testData.BIFASTPayment.UAT.loginCompanyId, SIT ? testData.BIFASTPayment.SIT.verifyUserId : testData.BIFASTPayment.UAT.verifyUserId, "123123"); 
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== BIFASTTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(BIFASTTemplateName);
        } else {

            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            BIFASTTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.approveBtn.click();
        await _PaymentsPages.BIFASTPaymentPage.approveButton.click(); //preview approve
        await _PaymentsPages.BIFASTPaymentPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(BIFASTTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewTemplatePayge();

        await Promise.all([
        await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textContains(testData.status.Approved)
        
        ]);
    });

    it('Delete BIFAST Pyament Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== BIFASTTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(BIFASTTemplateName);
        } else {

            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            BIFASTTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForDeletePage();
        await _PaymentsPages.PaymentTemplatesPage.preDeleteBtn.jsClick();  //preview delete
        await _PaymentsPages.BIFASTPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BIFASTPaymentPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(BIFASTTemplateName);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.BIFASTPayment.labelNoInformationDisplay);
    });
});
// due to approver new ui

describe('ID_BIFAST Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BIFASTPayment.SIT.loginCompanyId : testData.BIFASTPayment.UAT.loginCompanyId, SIT ? testData.BIFASTPayment.SIT.verifyUserId : testData.BIFASTPayment.UAT.verifyUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a BIFAST Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'ID - BIFAST Payment').then(reference => {
            verifyReference = reference;
        });;

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an BIFAST Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - BIFAST Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BIFASTPaymentPage.loadConditionForViewBIFASTPaymentPage();
        await _PaymentsPages.BIFASTPaymentPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BIFASTPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.AutoPayPaymentPage.approveSubmitBtn.click();
        await _PaymentsPages.BIFASTPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BIFASTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BIFASTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a BIFAST Payment via My Release', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "ID - BIFAST Payment").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BIFASTPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BIFASTPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.amountValue).textContains(uploadTestData.BIFAST.amountValue),
        await ensure(_PaymentsPages.BIFASTPaymentPage.fromAccountValue).textContains(uploadTestData.BIFAST.fromAccount),
        await ensure(_PaymentsPages.BIFASTPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.toPayeeValue).textContains(uploadTestData.BIFAST.idBifast),
        await ensure(_PaymentsPages.BIFASTPaymentPage.toPayeeValue).textContains(uploadTestData.BIFAST.newPayeeName),
        await ensure(_PaymentsPages.BIFASTPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.paymentTypeValue).textContains(uploadTestData.BIFAST.paymentType),
        await ensure(_PaymentsPages.BIFASTPaymentPage.sendAmtValue).textContains(uploadTestData.BIFAST.amountValue),
        await ensure(_PaymentsPages.BIFASTPaymentPage.paymentDetailValue).textContains(uploadTestData.BIFAST.paymentDetailsValue),
        await ensure(_PaymentsPages.BIFASTPaymentPage.msgToPayeeValue).textContains(uploadTestData.BIFAST.msgToPayeeValue),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(uploadTestData.BIFAST.emailValue0),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(uploadTestData.BIFAST.emailValue1),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(uploadTestData.BIFAST.emailValue2),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(uploadTestData.BIFAST.emailValue3),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(uploadTestData.BIFAST.emailValue4),
        await ensure(_PaymentsPages.BIFASTPaymentPage.totalDeductAmtValue).textContains(uploadTestData.BIFAST.amountValue),
        await ensure(_PaymentsPages.BIFASTPaymentPage.bankChargeValue).textContains(uploadTestData.BIFAST.bankChargeValue),
        await ensure(_PaymentsPages.BIFASTPaymentPage.chargeAcctValue).textContains(uploadTestData.BIFAST.fromAccount),
        await ensure(_PaymentsPages.BIFASTPaymentPage.purposeCodeValue).textContains(uploadTestData.BIFAST.purposeCodeValue),
        await ensure(_PaymentsPages.BIFASTPaymentPage.custRefValue).isNotEmpty(),
        // await ensure(_PaymentsPages.BIFASTPaymentPage.messageToApproverValue).textContains(uploadTestData.BIFAST.messageToApproverValue)
    ]);
}

export async function checkViewBIFASTPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.BIFASTPaymentPage.fromAccountValue).textContains(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BIFASTPaymentPage.amountValue).textContains(isEdit ? testData.BIFASTPayment.editAmount : testData.BIFASTPayment.amountA1),
        await ensure(_PaymentsPages.BIFASTPaymentPage.toPayeeValue).textContains(testData.BIFASTPayment.newPayeeName),
        await ensure(_PaymentsPages.BIFASTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BIFASTPaymentPage.paymentDateValue).textContains(currentDate),
        //Add all field
        await ensure(_PaymentsPages.BIFASTPaymentPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.BIFASTPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.toPayeeValue).textContains(testData.BIFASTPayment.mobileNumber),
        await ensure(_PaymentsPages.BIFASTPaymentPage.toPayeeValue).textContains(testData.BIFASTPayment.newPayeeName),
        await ensure(_PaymentsPages.BIFASTPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.paymentTypeValue).textContains(testData.BIFASTPayment.paymentType),
        await ensure(_PaymentsPages.BIFASTPaymentPage.sendAmtValue).textContains(isEdit ? testData.BIFASTPayment.editAmount : testData.BIFASTPayment.amountA1),
        await ensure(_PaymentsPages.BIFASTPaymentPage.paymentDetailValue).textContains(testData.BIFASTPayment.paymentDetail),
        await ensure(_PaymentsPages.BIFASTPaymentPage.msgToPayeeValue).textContains(testData.BIFASTPayment.message),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(testData.BIFASTPayment.emailIdO),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(testData.BIFASTPayment.emailId1),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(testData.BIFASTPayment.emailId2),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(testData.BIFASTPayment.emailId3),
        await ensure(_PaymentsPages.BIFASTPaymentPage.emailListValue).textContains(testData.BIFASTPayment.emailId4),
        await ensure(_PaymentsPages.BIFASTPaymentPage.totalDeductAmtValue).textContains(isEdit ? testData.BIFASTPayment.editAmount : testData.BIFASTPayment.amountA1),
        await ensure(_PaymentsPages.BIFASTPaymentPage.bankChargeValue).textContains(testData.BIFASTPayment.bankCharge),
        await ensure(_PaymentsPages.BIFASTPaymentPage.chargeAcctValue).textContains(SIT ? testData.BIFASTPayment.SIT.fromAccount : testData.BIFASTPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BIFASTPaymentPage.purposeCodeValue).textContains(testData.BIFASTPayment.purposeCodeValue),
        await ensure(_PaymentsPages.BIFASTPaymentPage.custRefValue).textContains(reference),
        await ensure(_PaymentsPages.BIFASTPaymentPage.messageToApproverValue).textContains(testData.BIFASTPayment.transactionNote),
        await ensure(_PaymentsPages.BIFASTPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.BIFASTPaymentPage.activityLog).isNotEmpty(),
    ]);
}