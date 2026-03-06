/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages,FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from 'protractor';
import * as moment from "moment"
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let TemplateName = "";
let paymentReference = '';
let verifyReference = "";
let templateRef = "";
let FPSTemplateName =""
let approvalReference = "";
let _PaymentsPages = new PaymentsPages();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('MO_testData.json');
let fileName = '';
let newFPSPayeeName = '';


describe('MO_FPS Payment ', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FPSPayment.SIT.loginCompanyId : testData.FPSPayment.UAT.loginCompanyId, SIT ? testData.FPSPayment.SIT.loginUserId : testData.FPSPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an FPS Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.FPSPayment.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.FPSPayment.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.FPSPayment.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.FPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.FPSPayment.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.FPSPayment.newPayeeNickname);
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.FastPaymentPage.purposeCode.select(testData.FPSPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.FPSPayment.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.FPSPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.FPSPayment.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.FPSPayment.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.FPSPayment.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.FPSPayment.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.FPSPayment.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.FPSPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).textContains(testData.FPSPayment.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberViewValue).textContains(testData.FPSPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.newPayeeNameViewValue).textContains(testData.FPSPayment.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateViewValue).textContains(currentDate),
        ]);
    });

    it('Create FPS with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.FPSPayment.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.FPSPayment.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.FPSPayment.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.FPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.FPSPayment.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.FPSPayment.newPayeeNickname);
        await addAddressAllFieldOldUI("details");
        await _PaymentsPages.FastPaymentPage.purposeCode.select(testData.FPSPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.FPSPayment.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.FPSPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.FPSPayment.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.FPSPayment.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.FPSPayment.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.FPSPayment.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.FPSPayment.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.FPSPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.TelegraphicTransferPage.mchallengeText).textContains(testData.FPSPayment.mChllengeText);
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.newPayeeNameViewValue).textContains(testData.FPSPayment.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).textContains(testData.FPSPayment.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create FPS with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.FPSPayment.amountA2);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.FPSPayment.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.FPSPayment.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.FPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.FPSPayment.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.FPSPayment.newPayeeNickname);        
        await _PaymentsPages.FastPaymentPage.purposeCode.select(testData.FPSPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.FPSPayment.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.FPSPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.FPSPayment.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.FPSPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
       
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.newPayeeNameViewValue).textContains(testData.FPSPayment.newPayeeName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).textContains(testData.FPSPayment.amountA2),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContains(testData.status.PartialApproved)
        ]);
    });

    it('Create FPS Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.FPSPayment.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.FPSPayment.existingPayee);
        await _PaymentsPages.FastPaymentPage.purposeCode.select(testData.FPSPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'MOFPS' + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            templateRef = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).textContains(testData.FPSPayment.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.existingPayeeNameViewValue).textContains(testData.FPSPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewFPSTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fpsTemplateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewTemplateValue).textContains(testData.FPSPayment.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.existingPayeeNameViewValue).textContains(testData.FPSPayment.existingPayee),
        ]);
    });

    it('Create FPS Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.FPSPayment.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.FastPaymentPage.purposeCode.select(testData.FPSPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2 );
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewTemplateValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.existingPayeeNameViewValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Save FPS Payment As Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.FPSPayment.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.FPSPayment.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.FPSPayment.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.FPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.FPSPayment.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.FPSPayment.newPayeeNickname);
        await addAddressAllFieldOldUI("sample");
        await _PaymentsPages.FastPaymentPage.purposeCode.select(testData.FPSPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.FPSPayment.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.FPSPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.FPSPayment.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.FPSPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.saveAsDraft.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).textContains(testData.FPSPayment.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContains(testData.status.Saved),
        ]);
    });

    it('Copy FPS Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.MO_FPS, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.FPSPayment.amountV)
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).textContains(testData.FPSPayment.amountV),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification)
        ]);
    });

    it('Reject FPS Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.MO_FPS, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.rejectButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.reasonForRejection.input(testData.FPSPayment.rejectReason);
        await _PaymentsPages.TelegraphicTransferPage.rejectDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContains(testData.status.Rejected)
        ]);
    });

    it('Edit FPS Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.MO_FPS, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editBtn.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.FPSPayment.editAmount);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).textContains(testData.FPSPayment.editAmount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Delete FPS Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.MO_FPS, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.deleteButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.deleteDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.TelegraphicTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.FPSPayment.labelNoInformationDisplay);
    });

    it('Upload FPS Payment via Files Services Upload', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FPSPayment.fileType, SIT ? testData.FPSPayment.SIT.fileName : testData.FPSPayment.UAT.fileName, testData.FPSPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.newPayeeNameViewValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContains(testData.status.PendingApproval)

        ]);
    });

    it('Download FPS Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.filesMangementCenter.click();
        await _FilesPages.uploadFilePage.downloadTab.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadeMOFPS' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(testData.FPSPayment.downloadFileType);
        await _FilesPages.downloadFilePage.scrollTo(0, 400);
        await _FilesPages.downloadFilePage.absoluteDatesBtn.jsClick();
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData.FPSPayment.fromDate);
        await _FilesPages.downloadFilePage.endAbsoluteDate.select(currentDate);
        await _FilesPages.downloadFilePage.loadConditionForDownloadFile();
        await _FilesPages.downloadFilePage.nextBtn.jsClick();
        await _FilesPages.downloadFilePage.dismissBtn.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.refershButton.jsClick();
        await Promise.all([
            await ensure(_FilesPages.downloadFilePage.fileLink).textContains(fileName),
              ]); 
        if(SIT){
            await ensure(_FilesPages.downloadFilePage.downloadBtn).isNotDisabled()
        } 
    });

    //IDXP-2022
    it('Upload FPS Payment with UFFV2 Simple format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FPSPayment.fileType, SIT ? testData.FPSPayment.SIT.FPSUFVF2 : testData.FPSPayment.UAT.FPSUFVF2, testData.FPSPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.newPayeeNameViewValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.newPayeeNameAdd1Value).textContains(testData.FPSPayment.newPayeeAdd1ForFS),
            await ensure(_PaymentsPages.TelegraphicTransferPage.newPayeeNameAdd2Value).textContains(testData.FPSPayment.newPayeeAdd2ForFS),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContains(testData.status.PendingApproval)

        ]);
    });

    it('Create FPS Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createMOFPSTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        FPSTemplateName = 'FPSTemplate' + generatedID();
        newFPSPayeeName = 'newFPSPayeeName' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(FPSTemplateName);
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.FPSPayment.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.FPSPayment.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.FPSPayment.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.FPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(newFPSPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(newFPSPayeeName);
        await addAddressAllFieldOldUI("details");
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.FPSPayment.purposeCode)
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.FPSPayment.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.FPSPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.FPSPayment.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.FPSPayment.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.FPSPayment.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.FPSPayment.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.FPSPayment.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.FPSPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(FPSTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewFPSTemplatePage();

        await Promise.all([
                await ensure(_PaymentsPages.TelegraphicTransferPage.fpsTemplateNameValue).textIs(FPSTemplateName),
                await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountViewValue).textContains(SIT ? testData.FPSPayment.SIT.fromAccount : testData.FPSPayment.UAT.fromAccount),
                await ensure(_PaymentsPages.TelegraphicTransferPage.amountViewTemplateValue).textContains(testData.FPSPayment.amountA1),
                await ensure(_PaymentsPages.TelegraphicTransferPage.existingPayeeNameViewValue).textContains(newFPSPayeeName),
                await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved)
        ]);
    });

    it('Approve FPS Payment Template', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.FPSPayment.SIT.loginCompanyId : testData.FPSPayment.UAT.loginCompanyId, SIT ? testData.FPSPayment.SIT.verifyUserId : testData.FPSPayment.UAT.verifyUserId, "P@ssword123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(FPSTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            FPSTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.approveBtn.click();
        await _PaymentsPages.BulkPaymentPage.approveButton.click(); //preview approve
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(FPSTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewFPSTemplatePage();

        await Promise.all([
        await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textContains(testData.status.Approved)
        
        ]);
    });

    it('Delete FPS Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== FPSTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(FPSTemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
            await _PaymentsPages.PaymentTemplatesPage.showAdditonFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select(testData.paymentType.MO_FPS);
    
        }
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            FPSTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForDeletePage();
        await _PaymentsPages.PaymentTemplatesPage.preDeleteBtn.jsClick();  //preview delete
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(FPSTemplateName);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.FPSPayment.labelNoInformationDisplay);
        await deletePayee(newFPSPayeeName);
    });   
});

   
describe('Verify And Release FPS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FPSPayment.SIT.loginCompanyId : testData.FPSPayment.UAT.loginCompanyId, SIT ? testData.FPSPayment.SIT.verifyUserId : testData.FPSPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a FPS Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.MO_FPS).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it('Approve an FPS Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.MO_FPS, testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release an FPS Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.MO_FPS).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewMOFPSPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatusView).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});

export async function addAddressAllFieldOldUI(format : string) {
    if(format.includes("sample")){
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    }else{
        await _PaymentsPages.BeneficiaryPage.switchFormatButton.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.BeneficiaryPage.streetName.input(testData.Beneficiary.streetName);
        await _PaymentsPages.BeneficiaryPage.buildingNum.input(testData.Beneficiary.buildingNum);
        await _PaymentsPages.BeneficiaryPage.buildingName.input(testData.Beneficiary.buildingName);
        await _PaymentsPages.BeneficiaryPage.floor.input(testData.Beneficiary.floor);
        await _PaymentsPages.BeneficiaryPage.room.input(testData.Beneficiary.room);
        await _PaymentsPages.BeneficiaryPage.department.input(testData.Beneficiary.department);
        await _PaymentsPages.BeneficiaryPage.subDepartment.input(testData.Beneficiary.subDepartment);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.BeneficiaryPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
        await _PaymentsPages.BeneficiaryPage.townLocationName.input(testData.Beneficiary.townLocationName);
        await _PaymentsPages.BeneficiaryPage.districtName.input(testData.Beneficiary.districtName);
    }
}

export async function deletePayee(payeename : string) {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
    await _PaymentsPages.BeneficiaryPage.loadCondition();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
    await _PaymentsPages.BeneficiaryPage.payeeFilter.input(payeename);
    await _PaymentsPages.BeneficiaryPage.deletePayeeBtn.click();
    await _PaymentsPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
    await _PaymentsPages.BeneficiaryPage.confirmDelete.click();
    await _PaymentsPages.BeneficiaryPage.loadConditionForDismissButton();
    await _PaymentsPages.BeneficiaryPage.dismiss.click();
}