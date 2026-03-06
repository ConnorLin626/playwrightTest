/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
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
let referenceEdit='';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');
let currentDate = moment(new Date()).format("DD MMM YYYY");
let paymentDate = moment().add(1, 'days').format('DD MMM YYYY');

describe('IN_NEFT Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NEFTPayment.SIT.loginCompanyId : testData.NEFTPayment.UAT.loginCompanyId, SIT ? testData.NEFTPayment.SIT.loginUserId : testData.NEFTPayment.UAT.loginUserId, testData.NEFTPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a NEFT Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.NEFTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.NEFTPaymentPage.Country.select(testData.NEFTPayment.Country);
        await _PaymentsPages.NEFTPaymentPage.newPayeeName.input(testData.NEFTPayment.newPayeeName);
        await _PaymentsPages.NEFTPaymentPage.newPayeeNickname.input(testData.NEFTPayment.newPayeeNickname);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd1.input(testData.NEFTPayment.newPayeeAdd1);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd2.input(testData.NEFTPayment.newPayeeAdd2);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd3.input(testData.NEFTPayment.newPayeeAdd3);
        await _PaymentsPages.NEFTPaymentPage.payeeBankID.select(SIT ? testData.NEFTPayment.SIT.payeeBankID : testData.NEFTPayment.UAT.payeeBankID);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAcctNumber.input(testData.NEFTPayment.newPayeeAcctNumber);
        // await _PaymentsPages.NEFTPaymentPage.selectedCategory.select(testData.NEFTPayment.category);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.payeeReference.input(testData.NEFTPayment.payeeReference);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await checkViewPageAllField(false) //Add for IDXP-812
    });

    it('Create a NEFT Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA2);
        await _PaymentsPages.NEFTPaymentPage.existingPayee.select(testData.NEFTPayment.existingPayeeIx);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.NEFTPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a NEFT Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.existingPayee.select(testData.NEFTPayment.existingPayeeIx);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.NEFTPaymentPage.getChallengeSMS.jsClick();
        await _PaymentsPages.NEFTPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a NEFT Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.existingPayee.select(testData.NEFTPayment.existingPayeeIx);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'NEFTName' + generatedID();
        await _PaymentsPages.NEFTPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValueForTemplate).textContains(testData.NEFTPayment.amountA1),
            await ensure(_PaymentsPages.NEFTPaymentPage.payeeValueForTemplate).textContains(testData.NEFTPayment.existingPayeeIx),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).textContains(testData.NEFTPayment.amountA1),
            await ensure(_PaymentsPages.NEFTPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a NEFT Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.NEFTPayment.existingTemplateName);
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.NEFTPayment.existingTemplateName);
        // }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a NEFT Payment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.existingPayee.select(testData.NEFTPayment.existingPayeeIx);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.emailId2.input(testData.NEFTPayment.emailId2);
        await _PaymentsPages.NEFTPaymentPage.emailId3.input(testData.NEFTPayment.emailId3);
        await _PaymentsPages.NEFTPaymentPage.emailId4.input(testData.NEFTPayment.emailId4);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.saveAsDraft.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).textContains(testData.NEFTPayment.amountA1),
            await ensure(_PaymentsPages.NEFTPaymentPage.toExistingPayeeValue).textContains(testData.NEFTPayment.existingPayeeIx),
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a NEFT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.copyButton.jsClick();
        await _PaymentsPages.NEFTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.amount.clean();
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountV);
        await browser.sleep(300);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).textContains(testData.NEFTPayment.amountV),
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });
    
    it('Edit a NEFT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.editButton.click();
        await _PaymentsPages.NEFTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        await _PaymentsPages.NEFTPaymentPage.amount.clean();
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.editAmount);
        await browser.sleep(3000);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, referenceEdit);
        if(referenceEdit ==reference){
            await checkViewPageAllField(true) //check view page all field
        }else{
            await Promise.all([
                await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).isNotEmpty(),
            ]);   
        }
    });

    it('Reject a NEFT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.NEFTPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.NEFTPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NEFTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    

    it('Delete a NEFT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.NEFTPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
    //for AB-9129
    it('Create a NEFT Payment then approve then check the paymentdate', async function () {
        const now = new Date();
        const target = new Date();
        let dayOfWeek = now.getDay();
        target.setHours(2, 30, 0, 0);
        let indiaCurrentDate = moment().utcOffset(330).format("DD MMM YYYY");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.NEFTPaymentPage.loadCondition();
        if(!SIT){
            await browser.sleep(3000);
        }
        await _PaymentsPages.NEFTPaymentPage.fromAccount.select(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount);
        await _PaymentsPages.NEFTPaymentPage.amount.input(testData.NEFTPayment.amountA1);
        await _PaymentsPages.NEFTPaymentPage.newPayeeTab.click();
        await _PaymentsPages.NEFTPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.NEFTPaymentPage.Country.select(testData.NEFTPayment.Country);
        await _PaymentsPages.NEFTPaymentPage.newPayeeName.input(testData.NEFTPayment.newPayeeName);
        await _PaymentsPages.NEFTPaymentPage.newPayeeNickname.input(testData.NEFTPayment.newPayeeNickname);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd1.input(testData.NEFTPayment.newPayeeAdd1);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd2.input(testData.NEFTPayment.newPayeeAdd2);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAdd3.input(testData.NEFTPayment.newPayeeAdd3);
        await _PaymentsPages.NEFTPaymentPage.payeeBankID.select(SIT ? testData.NEFTPayment.SIT.payeeBankID : testData.NEFTPayment.UAT.payeeBankID);
        await _PaymentsPages.NEFTPaymentPage.newPayeeAcctNumber.input(testData.NEFTPayment.newPayeeAcctNumber);
        // await _PaymentsPages.NEFTPaymentPage.selectedCategory.select(testData.NEFTPayment.category);
        await _PaymentsPages.NEFTPaymentPage.paymentDetail.input(testData.NEFTPayment.paymentDetail);
        await _PaymentsPages.NEFTPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NEFTPaymentPage.emailIdO.input(testData.NEFTPayment.emailIdO);
        await _PaymentsPages.NEFTPaymentPage.emailId1.input(testData.NEFTPayment.emailId1);
        await _PaymentsPages.NEFTPaymentPage.message.input(testData.NEFTPayment.message);
        await _PaymentsPages.NEFTPaymentPage.payeeReference.input(testData.NEFTPayment.payeeReference);
        await _PaymentsPages.NEFTPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.NEFTPaymentPage.transactionNote.input(testData.NEFTPayment.transactionNote);
        await _PaymentsPages.NEFTPaymentPage.nextButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.NEFTPaymentPage.submitButton.click();
        await _PaymentsPages.NEFTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NEFTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log("NEFT1"+reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        if(dayOfWeek != 1){
            currentDate = indiaCurrentDate;
            console.log(currentDate); // 输出如 "15 Apr 2025"（近似印度时间）
        }else if(dayOfWeek == 1 && indiaCurrentDate < currentDate){
            currentDate = moment(new Date()).format("DD MMM YYYY");
        }
        console.log("NEFTcurrentDate:"+ currentDate);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.toNewPayeeAcctValue).isNotEmpty(),
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.NEFTPaymentPage.cutoffTimeValue).textContainsLessOne(currentDate,moment(new Date()).format("DD MMM YYYY"))
        ]);
        // approve above payment then ckeck the paymentdate
        await _PaymentsPages.NEFTPaymentPage.approveButton.jsClick();
        await _PaymentsPages.NEFTPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NEFTPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.NEFTPaymentPage.approveButton.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        console.log("NEFT2:"+reference);
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
            await ensure(_PaymentsPages.NEFTPaymentPage.cutoffTimeValue).textContainsLessOne(currentDate,moment(new Date()).format("DD MMM YYYY"))
        ]);
    });
});

describe('IN_NEFT Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NEFTPayment.SIT.loginCompanyId : testData.NEFTPayment.UAT.loginCompanyId, SIT ? testData.NEFTPayment.SIT.verifyUserId : testData.NEFTPayment.UAT.verifyUserId, testData.NEFTPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a NEFT Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'IN - NEFT Payment').then(reference => {
            verifyReference = reference;
        });;

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a NEFTPayment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - NEFT Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.NEFTPaymentPage.loadConditionForViewNEFTPaymentPage();
        await _PaymentsPages.NEFTPaymentPage.approveButton.jsClick();
        await _PaymentsPages.NEFTPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.NEFTPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.NEFTPaymentPage.approveButton.click();
        await _PaymentsPages.NEFTPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.NEFTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.NEFTPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a NEFT Payment via My Release', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "IN - NEFT Payment").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.NEFTPaymentPage.fromAccountValue).textContains(SIT ? testData.NEFTPayment.SIT.fromAccount : testData.NEFTPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.NEFTPaymentPage.amountValue).textContains(isEdit? testData.NEFTPayment.editAmount : testData.NEFTPayment.amountA1),
        await ensure(_PaymentsPages.NEFTPaymentPage.toNewPayeeNameValue).textContains(testData.NEFTPayment.newPayeeName),
        await ensure(_PaymentsPages.NEFTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.NEFTPaymentPage.cutoffTimeValue).isNotEmpty(),
        // Add check all field
        await ensure(_PaymentsPages.NEFTPaymentPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.NEFTPaymentPage.hashValue).isNotEmpty(),
        // await ensure(_PaymentsPages.NEFTPaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.toNewPayeeAcctValue).textContains(testData.NEFTPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.NEFTPaymentPage.payeeAdd1).textContains(testData.NEFTPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.NEFTPaymentPage.payeeAdd2).textContains(testData.NEFTPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.NEFTPaymentPage.payeeAdd3).textContains(testData.NEFTPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.NEFTPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.paymentTypeValue).textContains(testData.NEFTPayment.paymentType),
        await ensure(_PaymentsPages.NEFTPaymentPage.sendAmtValue).textContains(isEdit? testData.NEFTPayment.editAmount : testData.NEFTPayment.amountA1),
        await ensure(_PaymentsPages.NEFTPaymentPage.bankNameValue).textContains(SIT ? testData.NEFTPayment.bankName : testData.NEFTPayment.UAT.bankName),
        await ensure(_PaymentsPages.NEFTPaymentPage.bankAdd1Value).textContains(SIT ? testData.NEFTPayment.bankAdd1 : testData.NEFTPayment.UAT.bankAdd1),
        await ensure(_PaymentsPages.NEFTPaymentPage.bankAdd2Value).textContains(SIT ? testData.NEFTPayment.bankAdd2 : testData.NEFTPayment.UAT.bankAdd2),
        await ensure(_PaymentsPages.NEFTPaymentPage.bankCityValue).textContains(SIT ? testData.NEFTPayment.bankCity : testData.NEFTPayment.UAT.bankCity),
        await ensure(_PaymentsPages.NEFTPaymentPage.bankCountryValue).textContains(SIT ? testData.NEFTPayment.bankCountry : testData.NEFTPayment.UAT.bankCountry),
        await ensure(_PaymentsPages.NEFTPaymentPage.bankSwiftBicValue).textContains(SIT ? testData.NEFTPayment.SIT.payeeBankID : testData.NEFTPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.NEFTPaymentPage.paymentDetailsValue).textContains(testData.NEFTPayment.paymentDetail),
        await ensure(_PaymentsPages.NEFTPaymentPage.msgValue).textContains(testData.NEFTPayment.message),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(testData.NEFTPayment.emailIdO),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(testData.NEFTPayment.emailId1),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(testData.NEFTPayment.emailId2),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(testData.NEFTPayment.emailId3),
        await ensure(_PaymentsPages.NEFTPaymentPage.emailListValue).textContains(testData.NEFTPayment.emailId4),
        await ensure(_PaymentsPages.NEFTPaymentPage.custRefValue).textContains(reference),
        await ensure(_PaymentsPages.NEFTPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.messageToApproverValue).textContains(testData.IMPSPayment.transactionNote),
        await ensure(_PaymentsPages.NEFTPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.NEFTPaymentPage.activityLog).isNotEmpty(),
    ]);
    if(SIT){
        await ensure(_PaymentsPages.NEFTPaymentPage.acctBalanceValue).isNotEmpty()
    }
}
