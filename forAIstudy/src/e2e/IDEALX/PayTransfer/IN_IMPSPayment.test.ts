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
let referenceEdit = '';
let impsTemplateName=''
let fileName = '';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();

let testData = _PaymentsPages.fetchTestData('IN_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/IN_uploadTestData.json');
let currentDate = moment(new Date()).format("DD MMM YYYY");

describe('IN_IMPS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IMPSPayment.SIT.loginCompanyId : testData.IMPSPayment.UAT.loginCompanyId, SIT ? testData.IMPSPayment.SIT.loginUserId : testData.IMPSPayment.UAT.loginUserId, testData.IMPSPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an IMPS Payment with new Payee', async function () {
        const now = new Date();
        const target = new Date();
        //let dayOfWeek = now.getDay();
        target.setHours(2, 30, 0, 0);
        let indiaCurrentDate = moment().utcOffset(330).format("DD MMM YYYY");
        currentDate = indiaCurrentDate;      
        console.log("IMPScurrentDate:"+ currentDate);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.IMPSPaymentPage.loadCondition();
        await _PaymentsPages.IMPSPaymentPage.fromAccount.select(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount);
        await _PaymentsPages.IMPSPaymentPage.amount.input(testData.IMPSPayment.amountA1);
        await _PaymentsPages.IMPSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.IMPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.IMPSPaymentPage.newPayeeName.input(testData.IMPSPayment.newPayeeName);
        await _PaymentsPages.IMPSPaymentPage.newPayeeNickname.input(testData.IMPSPayment.newPayeeNickname);
        await _PaymentsPages.IMPSPaymentPage.newPayeeAdd1.input(testData.IMPSPayment.newPayeeAdd1);
        await _PaymentsPages.IMPSPaymentPage.newPayeeAdd2.input(testData.IMPSPayment.newPayeeAdd2);
        await _PaymentsPages.IMPSPaymentPage.newPayeeAdd3.input(testData.IMPSPayment.newPayeeAdd3);
        await _PaymentsPages.IMPSPaymentPage.payeeBankID.select(SIT ? testData.IMPSPayment.SIT.payeeBankID : testData.IMPSPayment.UAT.payeeBankID);
        await _PaymentsPages.IMPSPaymentPage.newPayeeAcctNumber.input(testData.IMPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.IMPSPaymentPage.impsBtn.jsClick();
        await _PaymentsPages.IMPSPaymentPage.paymentDetail.input(testData.IMPSPayment.paymentDetail);
        await _PaymentsPages.IMPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.IMPSPaymentPage.emailIdO.input(testData.IMPSPayment.emailIdO);
        await _PaymentsPages.IMPSPaymentPage.emailId1.input(testData.IMPSPayment.emailId1);
        await _PaymentsPages.IMPSPaymentPage.emailId2.input(testData.IMPSPayment.emailId2);
        await _PaymentsPages.IMPSPaymentPage.emailId3.input(testData.IMPSPayment.emailId3);
        await _PaymentsPages.IMPSPaymentPage.emailId4.input(testData.IMPSPayment.emailId4);
        await _PaymentsPages.IMPSPaymentPage.message.input(testData.IMPSPayment.message);
        await _PaymentsPages.IMPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.IMPSPaymentPage.transactionNote.input(testData.IMPSPayment.transactionNote);
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.IMPSPaymentPage.submitButton.click();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IMPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewIMPSPaymentPage();
        await checkViewPageAllField(false) //add for IDXP-812
    });

    it('Create an IMPS Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.IMPSPaymentPage.loadCondition();
        await _PaymentsPages.IMPSPaymentPage.fromAccount.select(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount);
        await _PaymentsPages.IMPSPaymentPage.amount.input(testData.IMPSPayment.amountA2);
        await _PaymentsPages.IMPSPaymentPage.newIMPSPayeeTab.click();
        await _PaymentsPages.IMPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.IMPSPaymentPage.newPayeeName.input(testData.IMPSPayment.newPayeeName);
        await _PaymentsPages.IMPSPaymentPage.newPayeeNickname.input(testData.IMPSPayment.newPayeeNickname);
        await _PaymentsPages.IMPSPaymentPage.newPayeeAdd1.input(testData.IMPSPayment.newPayeeAdd1);
        await _PaymentsPages.IMPSPaymentPage.newPayeeAdd2.input(testData.IMPSPayment.newPayeeAdd2);
        await _PaymentsPages.IMPSPaymentPage.newPayeeAdd3.input(testData.IMPSPayment.newPayeeAdd3);
        await _PaymentsPages.IMPSPaymentPage.impsMMID.input(testData.IMPSPayment.mmid);
        await _PaymentsPages.IMPSPaymentPage.impsMobileNumber.input(testData.IMPSPayment.mobileNumber)
        await _PaymentsPages.IMPSPaymentPage.savePayee.jsClick();
        await _PaymentsPages.IMPSPaymentPage.paymentDetail.input(testData.IMPSPayment.paymentDetail);
        await _PaymentsPages.IMPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.IMPSPaymentPage.emailIdO.input(testData.IMPSPayment.emailIdO);
        await _PaymentsPages.IMPSPaymentPage.emailId1.input(testData.IMPSPayment.emailId1);
        await _PaymentsPages.IMPSPaymentPage.emailId2.input(testData.IMPSPayment.emailId2);
        await _PaymentsPages.IMPSPaymentPage.emailId3.input(testData.IMPSPayment.emailId3);
        await _PaymentsPages.IMPSPaymentPage.emailId4.input(testData.IMPSPayment.emailId4);
        await _PaymentsPages.IMPSPaymentPage.message.input(testData.IMPSPayment.message);
        await _PaymentsPages.IMPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.IMPSPaymentPage.transactionNote.input(testData.IMPSPayment.transactionNote);
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        //Add for DASB-74531
        await ensure(_PaymentsPages.IMPSPaymentPage.nicknameMsg).isNotElementPresent(),
        await ensure(_PaymentsPages.IMPSPaymentPage.nicknameMsgTop).textContains(testData.IMPSPayment.Msg),
        await _PaymentsPages.BIFASTPaymentPage.savePayee.click();
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.IMPSPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.IMPSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.IMPSPaymentPage.submitButton.click();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IMPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create an IMPS Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.IMPSPaymentPage.loadCondition();
        await _PaymentsPages.IMPSPaymentPage.fromAccount.select(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount);
        await _PaymentsPages.IMPSPaymentPage.amount.input(testData.IMPSPayment.amountA1);
        await _PaymentsPages.IMPSPaymentPage.existingPayee.select(testData.IMPSPayment.existingPayee);
        await _PaymentsPages.IMPSPaymentPage.impsBtn.jsClick();
        await _PaymentsPages.IMPSPaymentPage.paymentDetail.input(testData.IMPSPayment.paymentDetail);
        await _PaymentsPages.IMPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.IMPSPaymentPage.emailIdO.input(testData.IMPSPayment.emailIdO);
        await _PaymentsPages.IMPSPaymentPage.emailId1.input(testData.IMPSPayment.emailId1);
        await _PaymentsPages.IMPSPaymentPage.emailId2.input(testData.IMPSPayment.emailId2);
        await _PaymentsPages.IMPSPaymentPage.emailId3.input(testData.IMPSPayment.emailId3);
        await _PaymentsPages.IMPSPaymentPage.emailId4.input(testData.IMPSPayment.emailId4);
        await _PaymentsPages.IMPSPaymentPage.message.input(testData.IMPSPayment.message);
        await _PaymentsPages.IMPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.IMPSPaymentPage.transactionNote.input(testData.IMPSPayment.transactionNote);
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.IMPSPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.IMPSPaymentPage.getChallengeSMS.jsClick();
        await _PaymentsPages.IMPSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.IMPSPaymentPage.submitButton.click();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IMPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create an IMPS Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.IMPSPaymentPage.loadCondition();
        await _PaymentsPages.IMPSPaymentPage.fromAccount.select(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount);
        await _PaymentsPages.IMPSPaymentPage.amount.input(testData.IMPSPayment.amountA1);
        await _PaymentsPages.IMPSPaymentPage.existingPayee.select(testData.IMPSPayment.existingPayee);
        await _PaymentsPages.IMPSPaymentPage.impsBtn.jsClick();
        await _PaymentsPages.IMPSPaymentPage.paymentDetail.input(testData.IMPSPayment.paymentDetail);
        await _PaymentsPages.IMPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.IMPSPaymentPage.emailIdO.input(testData.IMPSPayment.emailIdO);
        await _PaymentsPages.IMPSPaymentPage.emailId1.input(testData.IMPSPayment.emailId1);
        await _PaymentsPages.IMPSPaymentPage.emailId2.input(testData.IMPSPayment.emailId2);
        await _PaymentsPages.IMPSPaymentPage.emailId3.input(testData.IMPSPayment.emailId3);
        await _PaymentsPages.IMPSPaymentPage.emailId4.input(testData.IMPSPayment.emailId4);
        await _PaymentsPages.IMPSPaymentPage.message.input(testData.IMPSPayment.message);
        await _PaymentsPages.IMPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.IMPSPaymentPage.transactionNote.input(testData.IMPSPayment.transactionNote);
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.IMPSPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'IMPSTemplate' + generatedID();
        await _PaymentsPages.IMPSPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.IMPSPaymentPage.submitButton.click();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IMPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewTemplatePayge();
        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.IMPSPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.IMPSPaymentPage.amountValueForTemplate).textContains(testData.IMPSPayment.amountA1),
            await ensure(_PaymentsPages.IMPSPaymentPage.payeeValueForTemplate).isNotEmpty()
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.fromAccountValue).textContains(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.IMPSPaymentPage.amountValue).textContains(testData.IMPSPayment.amountA1),
            await ensure(_PaymentsPages.IMPSPaymentPage.toExistingPayeeValue).isNotEmpty()
        ]);
    });

    it('Create an IMPS Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.IMPSPayment.existingTemplateName);
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.IMPSPayment.existingTemplateName);
        // }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.IMPSPaymentPage.loadCondition();
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        await _PaymentsPages.IMPSPaymentPage.submitButton.click();
        await _PaymentsPages.IMPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.IMPSPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.IMPSPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create an IMPS Payment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.IMPSPaymentPage.loadCondition();
        await _PaymentsPages.IMPSPaymentPage.fromAccount.select(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount);
        await _PaymentsPages.IMPSPaymentPage.amount.input(testData.IMPSPayment.amountA1);
        await _PaymentsPages.IMPSPaymentPage.existingPayee.select(testData.IMPSPayment.existingPayee);
        await _PaymentsPages.IMPSPaymentPage.impsBtn.jsClick();
        await _PaymentsPages.IMPSPaymentPage.paymentDetail.input(testData.IMPSPayment.paymentDetail);
        await _PaymentsPages.IMPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.IMPSPaymentPage.emailIdO.input(testData.IMPSPayment.emailIdO);
        await _PaymentsPages.IMPSPaymentPage.emailId1.input(testData.IMPSPayment.emailId1);
        await _PaymentsPages.IMPSPaymentPage.emailId2.input(testData.IMPSPayment.emailId2);
        await _PaymentsPages.IMPSPaymentPage.emailId3.input(testData.IMPSPayment.emailId3);
        await _PaymentsPages.IMPSPaymentPage.emailId4.input(testData.IMPSPayment.emailId4);
        await _PaymentsPages.IMPSPaymentPage.message.input(testData.IMPSPayment.message);
        await _PaymentsPages.IMPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.IMPSPaymentPage.transactionNote.input(testData.IMPSPayment.transactionNote);
        await _PaymentsPages.IMPSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.IMPSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.IMPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.fromAccountValue).textContains(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.IMPSPaymentPage.amountValue).textContains(testData.IMPSPayment.amountA1),
            await ensure(_PaymentsPages.IMPSPaymentPage.toExistingPayeeValue).textContains(testData.IMPSPayment.existingPayee),
            await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy an IMPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - IMPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewIMPSPaymentPage();
        await _PaymentsPages.IMPSPaymentPage.copyButton.jsClick();
        await _PaymentsPages.IMPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.IMPSPaymentPage.loadCondition();
        await _PaymentsPages.IMPSPaymentPage.amount.clean();
        await _PaymentsPages.IMPSPaymentPage.amount.input(testData.IMPSPayment.amountV);
        await browser.sleep(2000);
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        await _PaymentsPages.IMPSPaymentPage.submitButton.click();
        await _PaymentsPages.IMPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);

        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.IMPSPaymentPage.amountValue).textContains(testData.IMPSPayment.amountV),
            await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit an IMPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - IMPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewIMPSPaymentPage();
        await _PaymentsPages.IMPSPaymentPage.editButton.click();
        await _PaymentsPages.IMPSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.IMPSPaymentPage.loadCondition();
        await _PaymentsPages.IMPSPaymentPage.amount.clean();
        await _PaymentsPages.IMPSPaymentPage.amount.input(testData.IMPSPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        await _PaymentsPages.IMPSPaymentPage.submitButton.click();
        await _PaymentsPages.IMPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, referenceEdit);
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.IMPSPaymentPage.amountValue).textContains(testData.IMPSPayment.editAmount)
            ]);
        }
    });

    it('Reject an IMPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - IMPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewIMPSPaymentPage();
        await _PaymentsPages.IMPSPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.IMPSPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.IMPSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.IMPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.IMPSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.IMPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });


    it('Delete an IMPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - IMPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewIMPSPaymentPage();
        await _PaymentsPages.IMPSPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.IMPSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.IMPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.IMPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Upload IMPS Payment via Files services Upload', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.IMPSPayment.SIT.fileName : testData.IMPSPayment.UAT.fileName, testData.IMPSPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewIMPSPaymentPage();
        await checkViewRTGSPageAllField(); //IDXP-812
    });

    it('Download IMPS Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.filesMangementCenter.click();
        await _FilesPages.uploadFilePage.downloadTab.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadIMPS' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(testData.IMPSPayment.downloadFileType);
        await _FilesPages.downloadFilePage.scrollTo(0, 400);
        await _FilesPages.downloadFilePage.absoluteDatesBtn.jsClick();
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData.IMPSPayment.fromDate);
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

    it('Create an IMPS Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.IMPSPaymentPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        impsTemplateName = 'impsTmeplate' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(impsTemplateName);
        await _PaymentsPages.IMPSPaymentPage.fromAccount.select(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount);
        await _PaymentsPages.IMPSPaymentPage.amount.input(testData.IMPSPayment.amountA1);
        await _PaymentsPages.IMPSPaymentPage.existingPayee.select(testData.IMPSPayment.existingPayee);
        await _PaymentsPages.IMPSPaymentPage.impsBtn.jsClick();
        await _PaymentsPages.IMPSPaymentPage.paymentDetail.input(testData.IMPSPayment.paymentDetail);
        await _PaymentsPages.IMPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.IMPSPaymentPage.emailIdO.input(testData.IMPSPayment.emailIdO);
        await _PaymentsPages.IMPSPaymentPage.emailId1.input(testData.IMPSPayment.emailId1);
        await _PaymentsPages.IMPSPaymentPage.emailId2.input(testData.IMPSPayment.emailId2);
        await _PaymentsPages.IMPSPaymentPage.emailId3.input(testData.IMPSPayment.emailId3);
        await _PaymentsPages.IMPSPaymentPage.emailId4.input(testData.IMPSPayment.emailId4);
        await _PaymentsPages.IMPSPaymentPage.message.input(testData.IMPSPayment.message);
        await _PaymentsPages.IMPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.IMPSPaymentPage.transactionNote.input(testData.IMPSPayment.transactionNote);
        await _PaymentsPages.IMPSPaymentPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(impsTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewTemplatePayge();
        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.templateNameValue).textIs(impsTemplateName),
            await ensure(_PaymentsPages.IMPSPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.IMPSPaymentPage.amountValueForTemplate).isNotEmpty(),
            await ensure(_PaymentsPages.IMPSPaymentPage.payeeValueForTemplate).textContains(testData.IMPSPayment.existingPayee),
            await ensure(_PaymentsPages.IMPSPaymentPage.templateStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved)
        ]);
    });

    it('Approve IMPS Payment Template', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.IMPSPayment.SIT.loginCompanyId : testData.IMPSPayment.UAT.loginCompanyId, SIT ? testData.IMPSPayment.SIT.verifyUserId : testData.IMPSPayment.UAT.verifyUserId, testData.IMPSPayment.UAT.password); 
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== impsTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(impsTemplateName);
        } else {

            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            impsTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.approveBtn.click();
        await _PaymentsPages.IMPSPaymentPage.approveButton.click(); //preview approve
        await _PaymentsPages.IMPSPaymentPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(impsTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewTemplatePayge();

        await Promise.all([
        await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textContains(testData.status.Approved)
        
        ]);
    });

    it('Delete IMPS Pyament Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== impsTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(impsTemplateName);
        } else {

            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            impsTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForDeletePage();
        await _PaymentsPages.PaymentTemplatesPage.preDeleteBtn.jsClick();  //preview delete
        await _PaymentsPages.IMPSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.IMPSPaymentPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(impsTemplateName);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.IMPSPayment.labelNoInformationDisplay);
    });
});

// due to approver new ui

describe('IN_IMPS Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IMPSPayment.SIT.loginCompanyId : testData.IMPSPayment.UAT.loginCompanyId, SIT ? testData.IMPSPayment.SIT.verifyUserId : testData.IMPSPayment.UAT.verifyUserId, testData.IMPSPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an IMPS Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'IN - IMPS Payment').then(reference => {
            verifyReference = reference;
        });;

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an IMPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - IMPS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.IMPSPaymentPage.loadConditionForViewIMPSPaymentPage();
        await _PaymentsPages.IMPSPaymentPage.approveButton.jsClick();
        await _PaymentsPages.IMPSPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.IMPSPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.IMPSPaymentPage.approveButton.click();
        await _PaymentsPages.IMPSPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.IMPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IMPSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release an IMPS Payment via My Release', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "IN - IMPS Payment").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewRTGSPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.IMPSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.IMPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.IMPSPaymentPage.amountValue).textContains(uploadTestData.IMPS.amountValue),
        await ensure(_PaymentsPages.IMPSPaymentPage.fromAccountValue).textContains(SIT? uploadTestData.IMPS.fromAccount : uploadTestData.IMPS.UAT.fromAccount),
        // await ensure(_PaymentsPages.IMPSPaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.IMPSPaymentPage.toPayeeValue).textContains(uploadTestData.IMPS.newPayeeName),
        await ensure(_PaymentsPages.IMPSPaymentPage.toExistingPayeeAcctNum).textContains(uploadTestData.IMPS.newPayeeAcct),
        await ensure(_PaymentsPages.IMPSPaymentPage.toExistingPayeeIFSC).textContains(SIT? uploadTestData.IMPS.payeeIFSC : uploadTestData.IMPS.UAT.payeeIFSC),
        await ensure(_PaymentsPages.IMPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.IMPSPaymentPage.paymentTypeValue).textContains(uploadTestData.IMPS.paymentType),
        await ensure(_PaymentsPages.IMPSPaymentPage.sendAmtValue).textContains(uploadTestData.IMPS.amountValue),
        await ensure(_PaymentsPages.IMPSPaymentPage.paymentDetailsValue).textContains(uploadTestData.IMPS.paymentDetailsValue),
        await ensure(_PaymentsPages.IMPSPaymentPage.msgValue).textContains(uploadTestData.IMPS.msgValue),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(uploadTestData.IMPS.emailValue0),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(uploadTestData.IMPS.emailValue1),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(uploadTestData.IMPS.emailValue2),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(uploadTestData.IMPS.emailValue3),
        await ensure(_PaymentsPages.IMPSPaymentPage.custRefValue).isNotEmpty(),
        //await ensure(_PaymentsPages.IMPSPaymentPage.messageToApproverValue).textContains(uploadTestData.IMPS.transactionNote)
     ]);
     if(SIT){
        await ensure(_PaymentsPages.NEFTPaymentPage.acctBalanceValue).isNotEmpty()
    }
}

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.IMPSPaymentPage.fromAccountValue).textContains(SIT ? testData.IMPSPayment.SIT.fromAccount : testData.IMPSPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.IMPSPaymentPage.amountValue).textContains(isEdit ? testData.IMPSPayment.editAmount : testData.IMPSPayment.amountA1),
        await ensure(_PaymentsPages.IMPSPaymentPage.toPayeeValue).textContains(testData.IMPSPayment.newPayeeName),
        await ensure(_PaymentsPages.IMPSPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.IMPSPaymentPage.paymentDateValue).textContainsLessOne(currentDate,moment(new Date()).format("DD MMM YYYY")),
        // Add check all field
        await ensure(_PaymentsPages.IMPSPaymentPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.IMPSPaymentPage.hashValue).isNotEmpty(),
        // await ensure(_PaymentsPages.IMPSPaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.IMPSPaymentPage.toExistingPayeeAcctNum).textContains(testData.IMPSPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.IMPSPaymentPage.toExistingPayeeIFSC).textContains(SIT ? testData.IMPSPayment.SIT.payeeBankID : testData.IMPSPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.IMPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.IMPSPaymentPage.paymentTypeValue).textContains(testData.IMPSPayment.paymentType),
        await ensure(_PaymentsPages.IMPSPaymentPage.sendAmtValue).textContains(isEdit ? testData.IMPSPayment.editAmount : testData.IMPSPayment.amountA1),
        await ensure(_PaymentsPages.IMPSPaymentPage.paymentDetailsValue).textContains(testData.IMPSPayment.paymentDetail),
        await ensure(_PaymentsPages.IMPSPaymentPage.msgValue).textContains(testData.IMPSPayment.message),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(testData.IMPSPayment.emailIdO),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(testData.IMPSPayment.emailId1),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(testData.IMPSPayment.emailId2),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(testData.IMPSPayment.emailId3),
        await ensure(_PaymentsPages.IMPSPaymentPage.emailListValue).textContains(testData.IMPSPayment.emailId4),
        await ensure(_PaymentsPages.IMPSPaymentPage.custRefValue).textContains(reference),
        await ensure(_PaymentsPages.IMPSPaymentPage.messageToApproverValue).textContains(testData.IMPSPayment.transactionNote),
        await ensure(_PaymentsPages.IMPSPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.IMPSPaymentPage.activityLog).isNotEmpty(),   
    ]);
    if(SIT){
        await ensure(_PaymentsPages.NEFTPaymentPage.acctBalanceValue).isNotEmpty()
    }

}