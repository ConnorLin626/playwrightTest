/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from 'protractor';
// this from OnlineCreate, then Edit/Reject/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
let TemplateName = "";
let _PaymentsPages = new PaymentsPages();
const CB_1 = require("../../../pages/IDEALX");
const lib_1 = require("../../../lib");
let _FilesPages = new CB_1.FilesPages();
let _ApprovalsPages = new ApprovalsPages();
let fileName = '';
let testData = _PaymentsPages.fetchTestData('AU_testData.json');
let verifyReference = "";
let templateRef = "";
let tempNewPayeeName = "";
let approvalReference = "";

describe('AU_Bulk Payment ', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a Bulk ACH with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.enterDetailButton.click();
        await _PaymentsPages.BulkPaymentPage.bsbCodeText.input(testData.BulkPayment.bsbCode);
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amount);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amount),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.BulkPayment.newPayeeName),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Copy a Bulk ACH with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.copyButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification)
        ]);
    });

    it('Edit a Bulk ACH ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.editButton.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.deletePayee.click();
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.newPayeeNameEdit);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.enterDetailButton.click();
        await _PaymentsPages.BulkPaymentPage.bsbCodeText.input(testData.BulkPayment.bsbCodeEdit);
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountEdit);
        await _PaymentsPages.BulkPaymentPage.batchId.input("");
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amountEdit),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.BulkPayment.newPayeeNameEdit),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Reject a Bulk ACH ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input(testData.BulkPayment.rejectReason);
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus).textContains(testData.status.Rejected)
        ]);
    });

    it('Delete a Bulk ACH ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await lib_1.ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.BulkPayment.labelNoInformationDisplay);
    });

    it('Create with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.enterDetailButton.click();
        await _PaymentsPages.BulkPaymentPage.bsbCodeText.input(testData.BulkPayment.bsbCode);
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amount);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amount),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Approved)
        ]);
    });

    it('Create with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.enterDetailButton.click();
        await _PaymentsPages.BulkPaymentPage.bsbCodeText.input(testData.BulkPayment.bsbCode);
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA2IX);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amountA2),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Approved)
        ]);
    });

    it('Upload Bulk ACH via Files services Upload', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", lib_1.SIT ? testData.BulkPayment.SIT.fileName : testData.BulkPayment.UAT.fileName, testData.BulkPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval)

        ]);
    });

    it('File Upload - Reject item for Bulk ACH', async function () {
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.rejectButton.click();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input(testData.BulkPayment.rejectReason);
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.dismissButton.jsClick();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.rejectStatus).textContains(testData.status.Rejected)
        ]);
    });

    it('Create Bulk Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        tempNewPayeeName = testData.BulkPayment.newPayeeName + generatedID();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(tempNewPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(tempNewPayeeName);
        await _PaymentsPages.BulkPaymentPage.enterDetailButton.click();
        await _PaymentsPages.BulkPaymentPage.bsbCodeText.input(testData.BulkPayment.bsbCode);
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amount);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'BULK' + generatedID();
        console.log(TemplateName);
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
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amount),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(tempNewPayeeName)
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();

        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.BulkPayment.amount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiary).textContains(tempNewPayeeName)
        ]);
    });

    it('Create Bulk Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.BulkPayment.SIT.existingTemplate : testData.BulkPayment.UAT.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            templateRef = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(templateRef);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty()
        ]);
        await _PaymentsPages.PaymentTemplatesPage.deleteTemplate(TemplateName);
    });

    it('Save Bulk ACH successfully As Draft', async function () {
        let AUBulkRef = ''
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.enterDetailButton.click();
        await _PaymentsPages.BulkPaymentPage.bsbCodeText.input(testData.BulkPayment.bsbCode);
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amount);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.saveAsDraft.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            AUBulkRef = text.trim();
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(AUBulkRef);
        await console.log("AUBulkref:"+AUBulkRef);
        await Promise.all([
            await lib_1.ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await lib_1.ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amount),
            await lib_1.ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Create a Bulk ACH for verify and release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.newPayeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
        await _PaymentsPages.BulkPaymentPage.enterDetailButton.click();
        await _PaymentsPages.BulkPaymentPage.bsbCodeText.input(testData.BulkPayment.bsbCode);
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.newPayeeAcctNumber);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountVerifyIX);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.ReferenceForPayee);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
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
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amountVerify),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification)
        ]);
    });
});

describe('Verify And Release A Bulk ACH', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.verifyUserId : testData.BulkPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Bulk ACH via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.AU_BPAY).then(reference => {
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

    it('Approve a Bulk ACH ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_BPAY, testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.approveButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.challengeResponse);
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
         await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release a Bulk ACH via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_BPAY).then(reference => {
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
