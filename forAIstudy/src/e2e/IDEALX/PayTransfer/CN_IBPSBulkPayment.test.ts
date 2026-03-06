/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages,FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE, devWatch } from "../../../lib";
import { browser } from 'protractor';
import * as moment from "moment"
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let TemplateName = "";
let paymentReference = '';
let verifyReference = "";
let referenceEdit ="";
let templateRef = "";
let ibpsBulkTemplateName =""
let approvalReference = "";
let _PaymentsPages = new PaymentsPages();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/CN_uploadTestData.json');
let fileName = '';


describe('CN_IBPS Bulk Payment ', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IBPSBulkPayment.SIT.loginCompanyId : testData.IBPSBulkPayment.UAT.loginCompanyId, SIT ? testData.IBPSBulkPayment.SIT.loginUserId : testData.IBPSBulkPayment.UAT.loginUserId, testData.IBPSBulkPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an IBPS Bulk Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.IBPSBulkRadioBtn.jsClick();
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.IBPSBulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.IBPSBulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT?testData.IBPSBulkPayment.payeeBankID:testData.IBPSBulkPayment.uatPayeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.IBPSBulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.IBPSBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.IBPSBulkPayment.referenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.IBPSBulkPayment.paymentDetails);
        // Due to DASB-28774: CN IBPS bulkpayment UI - to disable the email bene notification from UI
        // await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        // await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.IBPSBulkPayment.emailIdO);
        // await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.IBPSBulkPayment.emailId1);
        // await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.IBPSBulkPayment.emailId2);
        // await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.IBPSBulkPayment.emailId3);
        // await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.IBPSBulkPayment.emailId4);
        // await _PaymentsPages.BulkPaymentPage.message.input(testData.IBPSBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewIBPSBulkPageAllField(false); //Add for IDXP-812
    });

    it('Create IBPS Bulk with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.IBPSBulkRadioBtn.jsClick();
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.IBPSBulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.IBPSBulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT?testData.IBPSBulkPayment.payeeBankID:testData.IBPSBulkPayment.uatPayeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.IBPSBulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.IBPSBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.IBPSBulkPayment.referenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.IBPSBulkPayment.paymentDetails);
        // Due to DASB-28774: CN IBPS bulkpayment UI - to disable the email bene notification from UI
        // await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        // await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.IBPSBulkPayment.emailIdO);
        // await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.IBPSBulkPayment.emailId1);
        // await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.IBPSBulkPayment.emailId2);
        // await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.IBPSBulkPayment.emailId3);
        // await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.IBPSBulkPayment.emailId4);
        // await _PaymentsPages.BulkPaymentPage.message.input(testData.IBPSBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.IBPSBulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.IBPSBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create IBPS Bulk with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.IBPSBulkRadioBtn.jsClick();
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.IBPSBulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.IBPSBulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT?testData.IBPSBulkPayment.payeeBankID:testData.IBPSBulkPayment.uatPayeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.IBPSBulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.IBPSBulkPayment.amountA2IX);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.IBPSBulkPayment.referenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.IBPSBulkPayment.paymentDetails);
        // Due to DASB-28774: CN IBPS bulkpayment UI - to disable the email bene notification from UI
        // await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        // await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.IBPSBulkPayment.emailIdO);
        // await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.IBPSBulkPayment.emailId1);
        // await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.IBPSBulkPayment.emailId2);
        // await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.IBPSBulkPayment.emailId3);
        // await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.IBPSBulkPayment.emailId4);
        // await _PaymentsPages.BulkPaymentPage.message.input(testData.IBPSBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.IBPSBulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
       
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.IBPSBulkPayment.amountA2),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PartialApproved)
        ]);
    });

    it('Create IBPS Bulk Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.IBPSBulkRadioBtn.jsClick();
        await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(testData.IBPSBulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.addButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.IBPSBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.IBPSBulkPayment.referenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.IBPSBulkPayment.paymentDetails);
        // Due to DASB-28774: CN IBPS bulkpayment UI - to disable the email bene notification from UI
        // await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        // await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.IBPSBulkPayment.emailIdO);
        // await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.IBPSBulkPayment.emailId1);
        // await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.IBPSBulkPayment.emailId2);
        // await _PaymentsPages.BulkPaymentPage.message.input(testData.IBPSBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'IBPSBULK' + generatedID();
        await _PaymentsPages.TelegraphicTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            templateRef = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.IBPSBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.IBPSBulkPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateFromAccount).textContains(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateAmount).textContains(testData.IBPSBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.IBPSBulkPayment.existingPayee),
        ]);
    });

    it('Create IBPS Bulk Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.IBPSBulkPayment.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2 );
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Save IPBS Bulk Payment As Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.IBPSBulkRadioBtn.jsClick();
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.IBPSBulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.IBPSBulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT?testData.IBPSBulkPayment.payeeBankID:testData.IBPSBulkPayment.uatPayeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.IBPSBulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.IBPSBulkPayment.amountA1);
        await browser.sleep(2000);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.IBPSBulkPayment.referenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.IBPSBulkPayment.paymentDetails);
        // Due to DASB-28774: CN IBPS bulkpayment UI - to disable the email bene notification from UI
        // await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        // await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.IBPSBulkPayment.emailIdO);
        // await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.IBPSBulkPayment.emailId1);
        // await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.IBPSBulkPayment.emailId2);
        // await _PaymentsPages.BulkPaymentPage.message.input(testData.IBPSBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.saveAsDraft.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.IBPSBulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Copy IBPS Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.CN_IBPSBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.copyButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.IBPSBulkPayment.amountVIX)
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.IBPSBulkPayment.amountV),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification)
        ]);
    });

    it('Edit IBPS Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.CN_IBPSBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.editButton.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.deletePayee.click();
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.IBPSBulkPayment.newPayeeNameEdit);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.IBPSBulkPayment.newPayeeNameEdit);
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(SIT?testData.IBPSBulkPayment.payeeBankID:testData.IBPSBulkPayment.uatPayeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.IBPSBulkPayment.newPayeeAcctNumberEdit);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.IBPSBulkPayment.editamount);
        await _PaymentsPages.BulkPaymentPage.batchId.clean();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        if (reference == referenceEdit) {
            await checkViewIBPSBulkPageAllField(true); //Add for IDXP-812
        }else{
            await Promise.all([
                await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
                await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.IBPSBulkPayment.editamount),
                await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.IBPSBulkPayment.newPayeeName),
                await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
            ]);
        }   
       
    });

    it('Reject IBPS Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.CN_IBPSBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input(testData.IBPSBulkPayment.rejectReason);
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissRejectDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete IBPS Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.CN_IBPSBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDeleteDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.IBPSBulkPayment.labelNoInformationDisplay);
    });

    it('Upload IBPS Bulk Payment via Files services Upload', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.IBPSBulkPayment.SIT.fileName : testData.IBPSBulkPayment.UAT.fileName, testData.IBPSBulkPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewBPPPageAllField(); // IDXP-812
    });

    it('Download IBPS Bulk Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.filesMangementCenter.click();
        await _FilesPages.uploadFilePage.downloadTab.click();
        await _FilesPages.downloadFilePage.loadCondition();
        await _FilesPages.downloadFilePage.creDownloadFileBtn.click();
        let fileName = 'downloadIBPSBulk' + generatedID();
        await _FilesPages.downloadFilePage.fileName.input(fileName);
        await _FilesPages.downloadFilePage.paymentType.select(testData.IBPSBulkPayment.downloadFileType);
        await _FilesPages.downloadFilePage.scrollTo(0, 400);
        await _FilesPages.downloadFilePage.absoluteDatesBtn.jsClick();
        await _FilesPages.downloadFilePage.startAbsoluteDate.select(testData.IBPSBulkPayment.fromDate);
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

    it('Create IBPS Bulk Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.bulkTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        ibpsBulkTemplateName = 'ibpsBulk' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(ibpsBulkTemplateName);
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.IBPSBulkRadioBtn.jsClick();
        await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(testData.IBPSBulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.addButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.IBPSBulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.IBPSBulkPayment.referenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.jsClick();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.IBPSBulkPayment.paymentDetails);
        // Due to DASB-28774: CN IBPS bulkpayment UI - to disable the email bene notification from UI
        // await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        // await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.IBPSBulkPayment.emailIdO);
        // await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.IBPSBulkPayment.emailId1);
        // await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.IBPSBulkPayment.emailId2);
        // await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.IBPSBulkPayment.emailId3);
        // await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.IBPSBulkPayment.emailId4);
        // await _PaymentsPages.BulkPaymentPage.message.input(testData.IBPSBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(ibpsBulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewBulkPage();

        await Promise.all([
        await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateName).textIs(ibpsBulkTemplateName),
        await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateAmount).textContains(testData.IBPSBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.IBPSBulkPayment.existingPayee),
        await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved)
        ]);
    });

    it('Approve IBPS Bulk Payment Template', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.IBPSBulkPayment.SIT.loginCompanyId : testData.IBPSBulkPayment.UAT.loginCompanyId, SIT ? testData.IBPSBulkPayment.SIT.verifyUserId : testData.IBPSBulkPayment.UAT.verifyUserId, testData.IBPSBulkPayment.UAT.pinID);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== ibpsBulkTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(ibpsBulkTemplateName);
        } else {

            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            ibpsBulkTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.approveBtn.click();
        await _PaymentsPages.BulkPaymentPage.approveButton.click(); //preview approve
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(ibpsBulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewBulkPage();

        await Promise.all([
        await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContains(testData.status.Approved)
        
        ]);
    });

    it('Delete IBPS Bulk Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== ibpsBulkTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(ibpsBulkTemplateName);
        } else {

            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
        }
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            ibpsBulkTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForDeletePage();
        await _PaymentsPages.PaymentTemplatesPage.preDeleteBtn.jsClick();  //preview delete
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(ibpsBulkTemplateName);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.IBPSBulkPayment.labelNoInformationDisplay);
    });
   
});

   
describe('Verify And Release IBPS Bulk Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IBPSBulkPayment.SIT.loginCompanyId : testData.IBPSBulkPayment.UAT.loginCompanyId, SIT ? testData.IBPSBulkPayment.SIT.verifyUserId : testData.IBPSBulkPayment.UAT.verifyUserId, testData.IBPSBulkPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an IBPS Bulk Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.CN_IBPSBulk).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it('Approve an IBPS Bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.CN_IBPSBulk, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.approveButton.jsClick();
        // await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.IBPSBulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release an IBPS Bulk Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.CN_IBPSBulk).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});


export async function checkViewBPPPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT?uploadTestData.IBPSBulkPayment.fromAccount:uploadTestData.IBPSBulkPayment.fromUatAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(uploadTestData.IBPSBulkPayment.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(uploadTestData.IBPSBulkPayment.totalAmt),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),

        //payee 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textIs(uploadTestData.IBPSBulkPayment.payeeNameValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textIs(SIT?uploadTestData.IBPSBulkPayment.payeeBankSwiftBic1:uploadTestData.IBPSBulkPayment.uatpayeeBankSwiftBic1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(uploadTestData.IBPSBulkPayment.accountNumberValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(uploadTestData.IBPSBulkPayment.amountValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(uploadTestData.IBPSBulkPayment.TransactionCodeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(uploadTestData.IBPSBulkPayment.referenceForPayeeValue1),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(uploadTestData.IBPSBulkPayment.paymentDetailsValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(uploadTestData.IBPSBulkPayment.messageValue1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.IBPSBulkPayment.emailValue00),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.IBPSBulkPayment.emailValue01),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.IBPSBulkPayment.emailValue02),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.IBPSBulkPayment.emailValue03),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(uploadTestData.IBPSBulkPayment.emailValue04),

        //payee 2
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textIs(uploadTestData.IBPSBulkPayment.payeeNameValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textIs(SIT?uploadTestData.IBPSBulkPayment.payeeBankSwiftBic2:uploadTestData.IBPSBulkPayment.uatpayeeBankSwiftBic1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(uploadTestData.IBPSBulkPayment.accountNumberValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue2).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(uploadTestData.IBPSBulkPayment.amountValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue2).textContains(uploadTestData.IBPSBulkPayment.TransactionCodeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(uploadTestData.IBPSBulkPayment.referenceForPayeeValue2),
        await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(uploadTestData.IBPSBulkPayment.paymentDetailsValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(uploadTestData.IBPSBulkPayment.messageValue2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.IBPSBulkPayment.emailValue10),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.IBPSBulkPayment.emailValue11),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.IBPSBulkPayment.emailValue12),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.IBPSBulkPayment.emailValue13),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(uploadTestData.IBPSBulkPayment.emailValue14),
     ]);
}

export async function checkViewIBPSBulkPageAllField(isEdit : boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.IBPSBulkPayment.SIT.fromAccount : testData.IBPSBulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isEdit ? testData.IBPSBulkPayment.editamount : testData.IBPSBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(isEdit ? testData.IBPSBulkPayment.newPayeeNameEdit:  testData.IBPSBulkPayment.newPayeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.cutofftime).textContains(currentDate),
        // Add all field
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.IBPSBulkPayment.paymentType),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isEdit ? testData.IBPSBulkPayment.editamount : testData.IBPSBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(isEdit ? referenceEdit :reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isEdit ? testData.IBPSBulkPayment.editamount : testData.IBPSBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textIs(isEdit ? testData.IBPSBulkPayment.newPayeeNameEdit : testData.IBPSBulkPayment.payeeNickName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textIs(SIT?(isEdit ? testData.IBPSBulkPayment.payeeBankName : testData.IBPSBulkPayment.payeeBankName):(isEdit ? testData.IBPSBulkPayment.uatPayeeBankName : testData.IBPSBulkPayment.uatPayeeBankName)),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textIs(SIT?testData.IBPSBulkPayment.payeeBankID:testData.IBPSBulkPayment.uatPayeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isEdit ? testData.IBPSBulkPayment.newPayeeAcctNumberEdit : testData.IBPSBulkPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.TransactionCodeValue).textContains(testData.IBPSBulkPayment.transactionCodeValue),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(isEdit ? "-" : testData.IBPSBulkPayment.referenceForPayee),
     ]);
     if(isEdit=false){
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(testData.IBPSBulkPayment.paymentDetails)
        
     }
}

