/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { FilesPages, NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { saveScreen, ensure, generatedID, SIT, handlerCase, PROJECT_TYPE, devWatch } from '../../../lib';
import { browser, ExpectedConditions } from "protractor";

let reference = "";
let reference2 = "";
let reference3 = "";
let templateName = "";
let referenceEdit = "";


const _PaymentsPages = new PaymentsPages();
const testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG Express Bulk Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ExpressBulkCollection.SIT.loginCompanyId : testData.ExpressBulkCollection.UAT.loginCompanyId, SIT ? testData.ExpressBulkCollection.SIT.loginUserId : testData.ExpressBulkCollection.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Express bulk Collection', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await addExistingPayee(testData.ExpressBulkCollection.existingPayeeName, testData.ExpressBulkCollection.amountA1, testData.BulkCollection.referenceForPayer);
        await addNewPayee();
        await _PaymentsPages.BulkCollectionPage.customDayButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.expressTypeButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
            console.log(reference2);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await checkViewPageAllField(false);  //Add for IDXP-812

    });


    it('Edit Express bulk Collection', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Express Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.editButton.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.amount.clean();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.ExpressBulkCollection.editAmount);
        await _PaymentsPages.BulkCollectionPage.nextButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        if (referenceEdit == reference) {
            await checkViewPageAllField(true); //Add for IDXP-812
        }
        else {
            await Promise.all([
                await ensure(_PaymentsPages.BulkCollectionPage.amountValue).isNotEmpty(),
            ]);
        }
    });


    it('Create Express bulk Collection with Approve now', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await addExistingPayee(testData.ExpressBulkCollection.existingPayeeName, testData.BulkCollection.amountA1, testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.BulkCollectionPage.customDayButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.expressTypeButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.BulkCollectionPage.getChallengeButton).isVisible();
        await _PaymentsPages.BulkCollectionPage.getChallengeButton.click();
        await _PaymentsPages.BulkCollectionPage.challengeResponse.input(testData.BulkCollection.responseCode);
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).textContains(reference),
            await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(testData.ExpressBulkCollection.paymentTypeName),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved),
        ]);
    });

    it('Create Express bulk Collection template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSgBulkColTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        templateName = "ExpressBulkColT" + generatedID();
        await console.log(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.ExpressBulkCollection.maxAmount);
        await addExistingPayee(testData.ExpressBulkCollection.existingPayeeName, testData.BulkCollection.amountA1, testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.BulkCollectionPage.expressTypeButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContains(testData.status.Approved),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionPaymentType).textContains(testData.ExpressBulkCollection.paymentTypeName)
        ]);

    });

    it('Approve Express bulk Collection', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Express Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.scrollToBottom();
        await _PaymentsPages.BulkCollectionPage.approveButton.click();
        await _PaymentsPages.BulkCollectionPage.getChallengeButton.clickIfExist();
        await _PaymentsPages.BulkCollectionPage.challengeResponse.input(testData.BulkCollection.responseCode);
        await browser.sleep(3000);
        await _PaymentsPages.BulkCollectionPage.approveButton.click();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved),
        ]);
    });

    it('Create & Reject Express bulk Collection', async function () {
        //Create
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await addExistingPayee(testData.ExpressBulkCollection.existingPayeeName, testData.BulkCollection.amountA1, testData.BulkCollection.referenceForPayer);
        await _PaymentsPages.BulkCollectionPage.customDayButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.expressTypeButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
            console.log(reference3);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(testData.ExpressBulkCollection.paymentTypeName),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
        //Reject
        await _PaymentsPages.BulkCollectionPage.rejectButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.BulkCollectionPage.rejectDialogButton.click();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await browser.sleep(3000);
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Delete Express bulk Collection', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Express Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.scrollToBottom();
        await _PaymentsPages.BulkCollectionPage.deleteButton.click();
        await _PaymentsPages.BulkCollectionPage.deleteDialogButton.click();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.BulkCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference3);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

});

export async function addExistingPayee(name: string, amount: string, payeeRef: string) {
    await _PaymentsPages.BulkCollectionPage.filterExistingPayee.input(name);
    await _PaymentsPages.BulkCollectionPage.addButton.click();
    await _PaymentsPages.BulkCollectionPage.amount.input(amount);
    await _PaymentsPages.BulkCollectionPage.payeeRef.input(payeeRef);
}

export async function addNewPayee() {
    await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
    await _PaymentsPages.BulkCollectionPage.newPayeeName.input(testData.ExpressBulkCollection.newPayeeName);
    await _PaymentsPages.BulkCollectionPage.payerBankID.input(testData.ExpressBulkCollection.payerBankID);
    await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
    await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
    await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
    await _PaymentsPages.BulkCollectionPage.addPayer.click();
    await _PaymentsPages.BulkCollectionPage.amount.input(testData.ExpressBulkCollection.amountA1);
    await _PaymentsPages.BulkCollectionPage.payeeRef.input(testData.BulkCollection.referenceForPayer);
    await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.click();
    await _PaymentsPages.BulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
    await _PaymentsPages.BulkCollectionPage.msgToPayer.jsClick();
    await _PaymentsPages.BulkCollectionPage.emailIdO.input(testData.BulkCollection.emailIdO);
    await _PaymentsPages.BulkCollectionPage.emailId1.input(testData.BulkCollection.emailId1);
    await _PaymentsPages.BulkCollectionPage.emailId2.input(testData.BulkCollection.emailId2);
    await _PaymentsPages.BulkCollectionPage.emailId3.input(testData.BulkCollection.emailId3);
    await _PaymentsPages.BulkCollectionPage.emailId4.input(testData.BulkCollection.emailId4);
    await _PaymentsPages.BulkCollectionPage.msg.input(testData.BulkCollection.message);
}


export async function checkViewPageAllField(isEdit = false) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(testData.ExpressBulkCollection.paymentTypeName),
        // Add all field  
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(isEdit ? testData.ExpressBulkCollection.totalAmountEditValue : testData.ExpressBulkCollection.totalAmountValue),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).textContains(isEdit ? referenceEdit : reference2),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionSummaryValue).textContains(isEdit ? testData.ExpressBulkCollection.totalAmountEditValue : testData.ExpressBulkCollection.totalAmountValue),
        //Payer 1
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(testData.ExpressBulkCollection.newPayeeName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue).textContains(testData.ExpressBulkCollection.newPayeeName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName).textContains(testData.ExpressBulkCollection.payerBankName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic).textContains(testData.ExpressBulkCollection.payerBankID),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(testData.BulkCollection.payerBankAccountNumber),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(testData.BulkCollection.DDAreference),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(isEdit ? testData.ExpressBulkCollection.editAmount : testData.ExpressBulkCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.purposeCodeValue).textContains(testData.BulkCollection.purposeCode),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue).textContains(testData.BulkCollection.referenceForPayer),
        await _PaymentsPages.BulkCollectionPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionDetailValue).textContains(testData.BulkCollection.collectionDetailsToThePayerBank),
        await ensure(_PaymentsPages.BulkCollectionPage.messageValue).textContains(testData.BulkCollection.message),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailIdO),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId1),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId2),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId3),
        await ensure(_PaymentsPages.BulkCollectionPage.emailList).textContains(testData.BulkCollection.emailId4),
        //Payer 2
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue2).textContains(testData.ExpressBulkCollection.existingPayeeName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue2).textContains(testData.ExpressBulkCollection.existingPayeeName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName2).textContains(testData.ExpressBulkCollection.payerBankName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic2).textContains(testData.ExpressBulkCollection.payerBankID),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue2).textContains(testData.ExpressBulkCollection.payerBankAccountNumber),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue2).textContains(testData.ExpressBulkCollection.DDAreference),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue2).textContains(testData.ExpressBulkCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.purposeCodeValue2).textContains(testData.BulkCollection.purposeCode),
        await ensure(_PaymentsPages.BulkCollectionPage.refForPayeeValue2).textContains(testData.BulkCollection.referenceForPayer),

        await ensure(_PaymentsPages.BulkCollectionPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.BulkCollectionPage.balanceValue).isNotEmpty()
    }
}
