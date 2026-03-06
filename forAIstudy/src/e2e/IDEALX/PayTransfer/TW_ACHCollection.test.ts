/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser } from 'protractor';
import { ensure, generatedID, handlerCase, SIT, PROJECT_TYPE } from "../../../lib";
import { PaymentsPages, NavigatePages } from "../../../pages/IDEALX";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let reference: string = null;
let reference2 = "";
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';
let referenceEdit: string = null;

describe('TW ACH Bulk Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TWACHCollection.SIT.loginCompanyId : testData.TWACHCollection.UAT.loginCompanyId, SIT ? testData.TWACHCollection.SIT.loginUserId : testData.TWACHCollection.UAT.loginUserId, SIT ? 123123 : testData.TWACHCollection.UAT.Password); });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('create ACH Bulk Collection with New Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
        await addNewPayee();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.amountA1);
        await _PaymentsPages.BulkCollectionPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
        await _PaymentsPages.BulkCollectionPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
        await _PaymentsPages.BulkCollectionPage.payeeStockCode.input(testData.TWACHCollection.payeeStockCode);
        await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.BulkCollectionPage.payeePassbook.input(testData.TWACHCollection.payeePassbook);
        await _PaymentsPages.BulkCollectionPage.payeeFreeText4Sender.input(testData.TWACHCollection.payeePaymentDetail);
        await _PaymentsPages.BulkCollectionPage.msgToPayer.jsClick();
        await _PaymentsPages.BulkCollectionPage.emailIdO.input(testData.TWACHCollection.emailIdO);
        await _PaymentsPages.BulkCollectionPage.emailId1.input(testData.TWACHCollection.emailId1);
        await _PaymentsPages.BulkCollectionPage.emailId2.input(testData.TWACHCollection.emailId2);
        await _PaymentsPages.BulkCollectionPage.emailId3.input(testData.TWACHCollection.emailId3);
        await _PaymentsPages.BulkCollectionPage.emailId4.input(testData.TWACHCollection.emailId4);
        await _PaymentsPages.BulkCollectionPage.msg.input(testData.TWACHCollection.message);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
            console.log(referenceEdit);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await checkViewPageAllField(false); //IDXP-812
    });

    it('create ACH Bulk Collection with Approval Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
        await addNewPayee();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.amountA1);
        await _PaymentsPages.BulkCollectionPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
        await _PaymentsPages.BulkCollectionPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
        await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.BulkCollectionPage.payeePassbook.input(testData.TWACHCollection.payeePassbook);
        await _PaymentsPages.BulkCollectionPage.payeeFreeText4Sender.input(testData.TWACHCollection.payeePaymentDetail);
        await _PaymentsPages.BulkCollectionPage.msgToPayer.jsClick();
        await _PaymentsPages.BulkCollectionPage.emailIdO.input(testData.TWACHCollection.emailIdO);
        await _PaymentsPages.BulkCollectionPage.emailId1.input(testData.TWACHCollection.emailId1);
        await _PaymentsPages.BulkCollectionPage.emailId2.input(testData.TWACHCollection.emailId2);
        await _PaymentsPages.BulkCollectionPage.emailId3.input(testData.TWACHCollection.emailId3);
        await _PaymentsPages.BulkCollectionPage.emailId4.input(testData.TWACHCollection.emailId4);
        await _PaymentsPages.BulkCollectionPage.msg.input(testData.TWACHCollection.message);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkCollectionPage.pushOpion.jsClickIfExist();
        await ensure(_PaymentsPages.BulkCollectionPage.getChallengeButton).isVisible();
        await _PaymentsPages.BulkCollectionPage.getChallengeButton.click();
        await _PaymentsPages.BulkCollectionPage.challengeResponse.input(testData.TWACHCollection.EnterResponse);
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved, testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('create ACH Bulk Collection with Approval Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
        await addNewPayee();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.amountA2Ix);
        await _PaymentsPages.BulkCollectionPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
        await _PaymentsPages.BulkCollectionPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkCollectionPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkCollectionPage.getChallengeButton.jsClickIfExist();
        await _PaymentsPages.BulkCollectionPage.challengeResponse.input(testData.TWACHCollection.EnterResponse);
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountA2),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PartialApproved),
        ]);
    });

    it('Create ACH Bulk Collection with Save as Tempalte', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
        await _PaymentsPages.BulkCollectionPage.addExistingPayee(testData.TWACHCollection.existingPayer);
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.amountA1);
        await _PaymentsPages.BulkCollectionPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
        await _PaymentsPages.BulkCollectionPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.saveAsTemplate.jsClick();
        TemplateName = 'COLName' + generatedID();
        await _PaymentsPages.BulkCollectionPage.templateName.input(TemplateName);
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.BulkCollectionPage.viewTemplateFromAccount).textContains(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountA1),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountA1),
            await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(testData.TWACHCollection.existingPayer),
        ]);
    });

    it('Create a ACH Bulk Collection from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHCollection.existingTemplate);
        // }
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHCollection.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        //await _PaymentsPages.BulkCollectionPage.loadConditionForCreateFromTWACHTempaltePage();
        await _PaymentsPages.BulkCollectionPage.amount.clean();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.amountA1);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).isNotEmpty(),
        ]);
    });

    // add IDXP-2013
    it('Create TW ACH Bulk Collection from view template page', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TWACHCollection.TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
        await _PaymentsPages.PaymentTemplatesPage.makeAPayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await Promise.all([
            await _PaymentsPages.BulkCollectionPage.selectFromAccount.isDisabled(),
            await _PaymentsPages.BulkCollectionPage.bankCharge.isDisabled(),
            await _PaymentsPages.BulkCollectionPage.serviceID.isDisabled(),
            await _PaymentsPages.BulkCollectionPage.mandateDetail.isDisabled(),
            await _PaymentsPages.BulkCollectionPage.stockCode.isDisabled(),
        ]);
    });


    it('Create a ACH Bulk Collection with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
        await _PaymentsPages.BulkCollectionPage.addExistingPayee(testData.TWACHCollection.existingPayer);
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.amountA1);
        await _PaymentsPages.BulkCollectionPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
        await _PaymentsPages.BulkCollectionPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
        await _PaymentsPages.BulkCollectionPage.saveAsDraft.click();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountA1),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    it('Copy a ACH Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.copyButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.amount.clean();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.amountVIx);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.TWACHCollection.amountV),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a ACH Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.rejectButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.BulkCollectionPage.rejectDialogButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForDismissRejectDialog();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.BulkCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Edit a ACH Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== referenceEdit.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.editButton.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.amount.clean();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.editamount);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        if (referenceEdit == reference3) {
            await checkViewPageAllField(true); //IDXP-812

        } else {
            await Promise.all([
                await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.TWACHCollection.editamount),
            ]);
        }
    });

    it('Delete a ACH Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.deleteButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.BulkCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference3);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Verify a ACH Bulk Collection via My Verify', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.billerServiceID.select(testData.TWACHCollection.billerServiceID);
        await _PaymentsPages.BulkCollectionPage.addExistingPayee(testData.TWACHCollection.existingPayer);
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.TWACHCollection.amountVIx);
        await _PaymentsPages.BulkCollectionPage.payeeNationalID.input(testData.TWACHCollection.payeeNationalID);
        await _PaymentsPages.BulkCollectionPage.payeeMandateDetail.input(testData.TWACHCollection.payeeMandateDetail);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });

        await new NavigatePages().loginIdealx(SIT ? testData.TWACHCollection.SIT.loginCompanyId : testData.TWACHCollection.UAT.loginCompanyId, SIT ? testData.TWACHCollection.SIT.verifyUserId : testData.TWACHCollection.UAT.verifyUserId, SIT ? 123123 : testData.TWACHBPY.UAT.Password);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.viewVerifyReleaseBtn.jsClick();
        await _PaymentsPages.BulkCollectionPage.verifyReleaseConfirmButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a ACH Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.approveButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.BulkCollectionPage.getChallengeButton.jsClickIfExist();
        await _PaymentsPages.BulkCollectionPage.challengeResponse.input(testData.TWACHCollection.EnterResponse);
        await _PaymentsPages.BulkCollectionPage.approveButton.click();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a ACH Bulk Collection via My Release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.viewVerifyReleaseBtn.jsClick();
        await _PaymentsPages.BulkCollectionPage.verifyReleaseConfirmButton.click();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});


export async function addNewPayee() {
    await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
    await _PaymentsPages.BulkCollectionPage.newPayeeName.input(testData.TWACHCollection.payeeName);
    await _PaymentsPages.BulkCollectionPage.payerBankID.input(SIT ? testData.TWACHCollection.SIT.payeeBankID : testData.TWACHCollection.UAT.payeeBankID);
    await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
    await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.TWACHCollection.accountNumber);
    await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.TWACHCollection.DDAreference);
    await _PaymentsPages.BulkCollectionPage.addPayer.click();
}

export async function checkViewPageAllField(isEdit: boolean = false) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkCollectionPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(testData.TWACHCollection.paymentType),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(isEdit ? testData.TWACHCollection.editamount : testData.TWACHCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.bankChargeType).textContains(testData.TWACHCollection.bankChargeType),
        await ensure(_PaymentsPages.BulkCollectionPage.chargeAcctValue).textContains(SIT ? testData.TWACHCollection.SIT.fromAccount : testData.TWACHCollection.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.billerServiceIDValue).textContains(testData.TWACHCollection.billerServiceID),

        // payer
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(testData.TWACHCollection.payeeName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic).textContains(SIT ? testData.TWACHCollection.SIT.payeeBankID : testData.TWACHCollection.UAT.payeeBankID),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(testData.TWACHCollection.accountNumber),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(testData.TWACHCollection.DDAreference),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(isEdit ? testData.TWACHCollection.editamount : testData.TWACHCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.mandateDetailValue).textContains(testData.TWACHCollection.payeeMandateDetail),
        await ensure(_PaymentsPages.BulkCollectionPage.stockCodeValue).textContains(testData.TWACHCollection.payeeStockCode),
        await _PaymentsPages.BulkCollectionPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.passBookValue).textContains(testData.TWACHCollection.payeePassbook),
        await ensure(_PaymentsPages.BulkCollectionPage.freeTextValue).textContains(testData.TWACHCollection.payeePaymentDetail),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue).textContains(testData.TWACHCollection.message),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.TWACHCollection.emailIdO),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.TWACHCollection.emailId1),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.TWACHCollection.emailId2),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.TWACHCollection.emailId3),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.TWACHCollection.emailId4),
    ]);
}