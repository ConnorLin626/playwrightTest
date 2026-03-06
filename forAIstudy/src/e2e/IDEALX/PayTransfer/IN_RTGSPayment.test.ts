/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, generatedID, handlerCase, SIT, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import { OperationsPages } from '../../../pages/SAM';
import * as moment from "moment";

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
// this for Approve RTGS after cutoff time
let reference4 = "";
let TemplateName = '';
let paymentReference = '';
let verifyReference = '';
let approvalReference = '';
let paymentReferenceMax = '';
let referenceEdit ='';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let _OperationsPages = new OperationsPages();
let testData = _PaymentsPages.fetchTestData('IN_testData.json');
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let day = new Date().getDay();
let currentDate = moment(new Date()).format("DD MMM YYYY");


describe('IN_RTGS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.RTGSPayment.SIT.loginCompanyId : testData.RTGSPayment.UAT.loginCompanyId, SIT ? testData.RTGSPayment.SIT.loginUserId : testData.RTGSPayment.UAT.loginUserId, testData.RTGSPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a RTGS Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.Country.select(testData.RTGSPayment.Country);
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        };
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        // await _PaymentsPages.RTGSPaymentPage.selectedCategory.select(testData.RTGSPayment.category);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.emailId3.input(testData.RTGSPayment.emailId3);
        await _PaymentsPages.RTGSPaymentPage.emailId4.input(testData.RTGSPayment.emailId4);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await checkViewPageAllField(false);//Add for IDXP-812
    });

    it('Create a RTGS Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA2);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a RTGS Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a RTGS Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.emailId3.input(testData.RTGSPayment.emailId3);
        await _PaymentsPages.RTGSPaymentPage.emailId4.input(testData.RTGSPayment.emailId4);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'RTGSName' + generatedID();
        await _PaymentsPages.RTGSPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValueForTemplate).isNotEmpty(),
            await ensure(_PaymentsPages.RTGSPaymentPage.payeeValueForTemplate).textContains(testData.RTGSPayment.existingPayee),
        ]);

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountA1),
            await ensure(_PaymentsPages.RTGSPaymentPage.toExistingPayeeNameValue).textContains(testData.RTGSPayment.existingPayee),
        ]);
    });

    it('Create a RTGS Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.RTGSPayment.existingTemplateName);
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.RTGSPayment.existingTemplateName);
        // }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.loadConditionCreatePayemntTemplate();
        await _PaymentsPages.RTGSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.RTGSPaymentPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create a RTGS Payment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.emailId1.input(testData.RTGSPayment.emailId1);
        await _PaymentsPages.RTGSPaymentPage.emailId2.input(testData.RTGSPayment.emailId2);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountA1),
            await ensure(_PaymentsPages.RTGSPaymentPage.toExistingPayeeNameValue).textContains(testData.RTGSPayment.existingPayee),
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.copyButton.jsClick();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.amount.clean();
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountV);
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.clean();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input("Copy" + testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountV),
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.editButton.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.amount.clean();
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.editAmount);
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.clean();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input("Edit" + testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, referenceEdit);
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.editAmount),
        ]);
        }
    });

    it('Reject a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.RTGSPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.RTGSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);


        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(testData.status.Rejected),
        ]);
    });

   

    it('Delete a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.RTGSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.RTGSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Can not create RTGS with amount less than 200000 INR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.lessMinAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.Country.select(testData.RTGSPayment.Country);
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        };
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await ensure(_PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox).hasClassName("disabled");
    });


    it('Create a RTGS Payment with min amount 200000 INR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.minAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.Country.select(testData.RTGSPayment.Country);
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        };
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.minAmount),
        ]);
    });

    it('Can not create RTGS with amount greater than 999999999.99 INR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.greaterMaxAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.Country.select(testData.RTGSPayment.Country);
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        };
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.hasUXIxErrorMsg1(testData.RTGSPayment.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create a RTGS Payment with max amount 999999999.99 INR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.maxAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.Country.select(testData.RTGSPayment.Country);
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        };
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReferenceMax = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReferenceMax);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.maxAmount),
        ]);
    });
    // below for AB-9129
    it('Create a RTGS Payment then aprrove then check the paymentdate', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.Country.select(testData.RTGSPayment.Country);
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        let isnewPayeeNicknameVisible = await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        };
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd1.input(testData.RTGSPayment.newPayeeAdd1);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd2.input(testData.RTGSPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAdd3.input(testData.RTGSPayment.newPayeeAdd3);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(testData.RTGSPayment.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.paymentDetail.input(testData.RTGSPayment.paymentDetail);
        await _PaymentsPages.RTGSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTGSPaymentPage.emailIdO.input(testData.RTGSPayment.emailIdO);
        await _PaymentsPages.RTGSPaymentPage.message.input(testData.RTGSPayment.message);
        await _PaymentsPages.RTGSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTGSPaymentPage.transactionNote.input(testData.RTGSPayment.transactionNote);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.amountA1),
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).textContains(currentDate),
        ]);
        // approve the payment then check the pamentdate
        await _PaymentsPages.RTGSPaymentPage.approveButton.click();
        await _PaymentsPages.RTGSPaymentPage.pushOption.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.getChallengeSMS.jsClick();
        await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.RTGSPaymentPage.approveButton.jsClick();
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
            await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).textContains(currentDate),
        ]);
    });
    it('Create a RTGS Payment for approve after cutofftime', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.amountA1);
        await _PaymentsPages.RTGSPaymentPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference4 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference4);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            // await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).textIs(currentDate),
        ]);
    });
    //due to RTGS is 24*7 comment it out 2025/2/9
    // it('Approve RTGS After cutofftime', async function () {
    //     await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
    //     // set today as holiday
    //     await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSIN, _PaymentsPages.RTGSPaymentPage.INRTGSScheduleLink, day, "");
    //     // approve schedule
    //     await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2)
    //     await _OperationsPages.schedulesPage.approveCutOffTime(testDataSAM.selectAffiliateByValue.DBSIN, _PaymentsPages.RTGSPaymentPage.approveScheduleLink);
    //     await new NavigatePages().loginIdealx(SIT ? testData.RTGSPayment.SIT.loginCompanyId : testData.RTGSPayment.UAT.loginCompanyId, SIT ? testData.RTGSPayment.SIT.loginUserId : testData.RTGSPayment.UAT.loginUserId, "123123");
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     if (0 !== reference4.trim().length) {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4)
    //     } else {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
    //     }
    //     await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
    //     await _PaymentsPages.RTGSPaymentPage.approveButton.jsClick();
    //     await _PaymentsPages.RTGSPaymentPage.pushOption.jsClickIfExist();
    //     await _PaymentsPages.RTGSPaymentPage.getChallengeSMS.jsClickIfExist();
    //     await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
    //     await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('12312312');
    //     await _PaymentsPages.RTGSPaymentPage.approveBtn.click();
    //     await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
    //         reference4 = text;
    //     });
    //     await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference4);
    //     //console.log(paymentDate)
    //     await Promise.all([
    //         console.log(currentDate),
    //         await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).textNotContains(currentDate),
    //     ]);
    //     await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
    //     // set today as workingDay
    //     await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSIN, _PaymentsPages.RTGSPaymentPage.INRTGSScheduleLink, day, testDataSAM.schedule.CutoffTime01);
    //     // approve schedule
    //     await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2)
    //     await _OperationsPages.schedulesPage.approveCutOffTime(testDataSAM.selectAffiliateByValue.DBSIN, _PaymentsPages.RTGSPaymentPage.approveScheduleLink);
    // });
});

describe('IN_RTGS Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.RTGSPayment.SIT.loginCompanyId : testData.RTGSPayment.UAT.loginCompanyId, SIT ? testData.RTGSPayment.SIT.verifyUserId : testData.RTGSPayment.UAT.verifyUserId, testData.RTGSPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a RTGS Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'IN - RTGS Payment').then(reference => {
            verifyReference = reference;
        });;
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a RTGS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - RTGS Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();
        await _PaymentsPages.RTGSPaymentPage.approveButton.jsClick();
        await _PaymentsPages.RTGSPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.RTGSPaymentPage.approveButton.click();
        await _PaymentsPages.RTGSPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.RTGSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a RTGS Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'IN - RTGS Payment').then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTGSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(isEdit ? testData.RTGSPayment.editAmount:testData.RTGSPayment.amountA1),
        await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).isNotEmpty(),
        //Add all field
        await ensure(_PaymentsPages.RTGSPaymentPage.headerRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.RTGSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.deductAmtValue).isNotEmpty(),
        // await ensure(_PaymentsPages.RTGSPaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeAcctNumValue).textContains(testData.RTGSPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeNameValue).textContains(testData.RTGSPayment.newPayeeName),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeAdd1Value).textContains(testData.RTGSPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeAdd2Value).textContains(testData.RTGSPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeAdd3Value).textContains(testData.RTGSPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentTypeValue).textContains(testData.RTGSPayment.paymentType),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankNameValue).textContains(SIT ? testData.RTGSPayment.payeeBankName : testData.RTGSPayment.UAT.payeeBankName),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd1Value).textContains(SIT ? testData.RTGSPayment.bankAdd1 : testData.RTGSPayment.UAT.bankAdd1),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd2Value).textContains(SIT ? testData.RTGSPayment.bankAdd2 : testData.RTGSPayment.UAT.bankAdd2),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCityValue).textContains(SIT ? testData.RTGSPayment.payeeBankCity : testData.RTGSPayment.UAT.payeeBankCity),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCountryValue).textContains(SIT ? testData.RTGSPayment.payeeBankCountry : testData.RTGSPayment.UAT.payeeBankCountry),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeSwiftBicValue).textIs(SIT ? testData.RTGSPayment.payeeBankID : testData.RTGSPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCodeValue).textContains(SIT ? testData.RTGSPayment.payeeBankCode : testData.RTGSPayment.UAT.payeeBankCode),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBrchCodeValue).textContains(SIT ? testData.RTGSPayment.payeeBranchCode : testData.RTGSPayment.UAT.payeeBranchCode),
        await ensure(_PaymentsPages.RTGSPaymentPage.msgValue).textContains(testData.RTGSPayment.message),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(testData.RTGSPayment.emailIdO),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(testData.RTGSPayment.emailId1),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(testData.RTGSPayment.emailId2),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(testData.RTGSPayment.emailId3),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(testData.RTGSPayment.emailId4),
        await ensure(_PaymentsPages.RTGSPaymentPage.totalDeductAmtValue).textContains(isEdit ? testData.RTGSPayment.editAmount:testData.RTGSPayment.amountA1),
        await ensure(_PaymentsPages.RTGSPaymentPage.custRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.RTGSPaymentPage.messageToApproverValue).textContains(testData.RTGSPayment.transactionNote),
        await ensure(_PaymentsPages.RTGSPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.NEFTPaymentPage.acctBalanceValue).isNotEmpty()
    }
}


