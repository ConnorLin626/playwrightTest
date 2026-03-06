/*
 * ©Copyright ACI Worldwide, Inc 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure,randomNumbers, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import moment = require('moment');

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';
let reference3 = '';
let referenceP = '';
let referenceEdit='';
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a TT Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.myrPaymentCcy);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TelegraphicTransfer.myPayeeBankID);
        //due to new task#DASB-14900
        await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TelegraphicTransfer.newPayeeRoutingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        //Add for IDXP-2000,create With simple format, all fields have values
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TelegraphicTransfer.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransfer.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankIsIntermediary.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankCountry.select(testData.TelegraphicTransfer.intermediaryBankCountry);
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankID.select(testData.TelegraphicTransfer.intermediaryBankID);
        // add for IDXP-2116 add new purpose code when payment ccy = MYR
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeLabel).textContains(testData.TelegraphicTransfer.PurposeOfPaymentLabel),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.TelegraphicTransfer.specPmtPurpose);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        // await _PaymentsPages.TelegraphicTransferPage.Bycontinuing.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.continueBtn.click(); // for IDXP-929 CR
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await checkViewPageAllField(false)  // add for IDXP-812
    });

    it('Create a TT Payment with ApprovalNow pMchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA2);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
        //await ensure(_PaymentsPages.TelegraphicTransferPage.pchallengeText).textContains(testData.TelegraphicTransfer.pMChllengeText);
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a TT Payment with ApprovalNow mChllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TelegraphicTransfer.Country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TelegraphicTransfer.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TelegraphicTransfer.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TelegraphicTransfer.newPayeeNickname);
        //Due to IDXP-2000 only mandatory field has value
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransfer.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransfer.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TelegraphicTransfer.newPayeeAdd1);
        //due to new task#DASB-14900
        //await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TelegraphicTransfer.newPayeeRoutingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TelegraphicTransfer.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesThey.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.TelegraphicTransferPage.mchallengeText).textContains(testData.TelegraphicTransfer.mChllengeText);
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123123');

        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a TT Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'TTName' + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
        ]);

    });

    it('Create a TT Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TelegraphicTransfer.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);

    });

    it('Create a TT with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.saveAsDraft.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.Saved),
        ]);
    });
    //IDXP-2278 TT
    it('Copy a TT with Save as Draft which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.updatePayee);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.saveAsDraft.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //edit payee
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.TelegraphicTransfer.updatePayee);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
        let ramNumbers = randomNumbers();
        await _PaymentsPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.add1+ramNumbers);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();

        //copy txn
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
            await ensure(_PaymentsPages.TelegraphicTransferPage.PayeeDetail).textContains(testData.Beneficiary.add1+ramNumbers),
        ]);
        await browser.sleep(2000);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        console.log(reference3)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.updatePayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd1Value).textContains(testData.Beneficiary.add1+ramNumbers),
        ]);



    });

    it('Copy a TT via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        // if (0 !== reference2.trim().length) {
        //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        // } else {
        //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        // }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.AccountTransferPage.copyButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
          await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountV);
        await browser.sleep(2000);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        console.log(reference3)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingVerification),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAdd1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAdd2),
        ]);
    });

    it('Edit a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);

        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.editAmount);
        await browser.sleep(300);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.continueBtn.clickIfExist(); // for IDXP-929 CR
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.editAmount)
        ]);
        }
    });

    it('Reject a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.rejectButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.TelegraphicTransferPage.rejectDialogButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.TelegraphicTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.Rejected),
        ]);
    });

    //IEBAA-709_Channels related enhancement for Project Partior
    it('Create a TT Payment with currency is SGD and payee bank support PARTIOR', async function () {
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        let CutOffTime = '23:58 hrs ' + currentDate
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        //await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.SupportPartiorPayee);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceP = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceP);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amountA1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.SupportPartiorPayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
        ]);
        if(SIT){
            await ensure(_PaymentsPages.TelegraphicTransferPage.paymentCutOffTime).textIs(CutOffTime)
        }
    });


    it('Approve TT for PARTIOR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceP);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('response');
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.TelegraphicTransferPage.approveButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
            referenceP = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceP);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Delete a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
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

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    //Add for R8.18 IDXP-1295
    it('Edit a TT Payment with max amount 999999999999.99 CNH ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccountWithCNH : testData.TelegraphicTransfer.UAT.fromAccountWithCNH);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.maxCNHAmount);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.TelegraphicTransfer.cnhPurposeCode);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.maxCNHAmount);
        await browser.sleep(300);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        console.log(paymentReference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccountWithCNH : testData.TelegraphicTransfer.UAT.fromAccountWithCNH),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.maxCNHAmountValue),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeAcctValue).textContains(testData.TelegraphicTransfer.existingPayeeAcctNum),
        ]);
    });
});


describe('SG_Telegraphic Transfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.verifyUserId : testData.TelegraphicTransfer.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a TT Payment via My Verify', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'SG - Telegraphic Transfer').then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
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
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a TT Payment via My Release', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference3, approvalReference, "SG - Telegraphic Transfer").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
    
    //IEBAA-3306_Showing FX savings message
    if(SIT){
        it('DOL User Create a TT Payment with Showing FX savings message Old ui', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId02 : testData.TelegraphicTransfer.UAT.loginUserId02, "P@ssword1A!");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await ensure(_PaymentsPages.TelegraphicTransferPage.savingsMessage).textContains(testData.TelegraphicTransfer.preferentialRate);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).textContains(testData.TelegraphicTransfer.exchangeRate);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).textContains(testData.TelegraphicTransfer.exchangeRate);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).textContains(testData.TelegraphicTransfer.exchangeRate);
    });
    }  
});

export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(isEdit ? testData.TelegraphicTransfer.editAmount:testData.TelegraphicTransfer.amountA1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAdd2),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TelegraphicTransfer.newPayeeAdd3),//due to IDXP-2000
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
        // R8.11 new purpose code
        await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(testData.TelegraphicTransfer.specPmtPurpose),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        // Add all field
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TelegraphicTransfer.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(testData.TelegraphicTransfer.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(testData.TelegraphicTransfer.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(testData.TelegraphicTransfer.myPayeeBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textIs(SIT? testData.TelegraphicTransfer.SIT.intermediaryBankName : testData.TelegraphicTransfer.UAT.intermediaryBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textIs(testData.TelegraphicTransfer.intermediaryBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankAdress1).textContains(testData.TelegraphicTransfer.intermediaryBankCountry),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TelegraphicTransfer.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TelegraphicTransfer.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TelegraphicTransfer.bankChargeUs),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TelegraphicTransfer.transactionNote),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TelegraphicTransfer.messageToOrderingBank),
        await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty()
    }
}
