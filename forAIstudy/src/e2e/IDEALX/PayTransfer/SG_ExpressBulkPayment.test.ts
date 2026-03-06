/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from "protractor";

let reference = "";
let reference2 = "";
let reference3 = "";
let templateName = "";
let referenceEdit = "";

const _PaymentsPages = new PaymentsPages();
const testData = _PaymentsPages.fetchTestData('SG_testData.json');

export async function commonPre() {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
    await _PaymentsPages.BulkPaymentPage.loadCondition();
    await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.ExpressBulkPayment.SIT.fromAccount : testData.ExpressBulkPayment.UAT.fromAccount);
}

export async function commonAfter(): Promise<string> {
    await _PaymentsPages.BulkPaymentPage.nextButton.click();
    await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentPage.submitButton.click();
    await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
        reference = text;
        console.log(reference);
    });
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    return reference;
}

export async function addExistingPayee(name: string, amount: string, payeeRef: string) {
    await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(name);
    await _PaymentsPages.BulkPaymentPage.addButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(amount);
    await _PaymentsPages.BulkPaymentPage.payeeRef.input(payeeRef);
}

export async function addNewPayee() {
    await _PaymentsPages.BulkPaymentPage.newPayee.click();
    await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.ExpressBulkPayment.payeeName);
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(testData.ExpressBulkPayment.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.ExpressBulkPayment.accountNumber);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(testData.ExpressBulkPayment.amountA1);
    await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.ExpressBulkPayment.payeeRef);
    await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.ExpressBulkPayment.paymentDetails);
    await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.ExpressBulkPayment.emailIdO);
    await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.ExpressBulkPayment.emailId1);
    await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.ExpressBulkPayment.emailId2);
    await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.ExpressBulkPayment.emailId3);
    await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.ExpressBulkPayment.emailId4);
    await _PaymentsPages.BulkPaymentPage.message.input(testData.ExpressBulkPayment.message);
}

describe('SG Express_Bulk Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ExpressBulkPayment.SIT.loginCompanyId : testData.ExpressBulkPayment.UAT.loginCompanyId, SIT ? testData.ExpressBulkPayment.SIT.loginUserId : testData.ExpressBulkPayment.UAT.loginUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Express bulk Payment', async function () {
        await commonPre();
        await addExistingPayee(testData.ExpressBulkPayment.existingExpressA1, testData.ExpressBulkPayment.amountA1, testData.BulkPayment.payeeRef);
        await addExistingPayee(testData.ExpressBulkPayment.existingExpressA2, testData.ExpressBulkPayment.amountA1, testData.BulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.ExpressBulkPayment.paymentDetails);
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.ExpressBulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.ExpressBulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.ExpressBulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.ExpressBulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.ExpressBulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.ExpressBulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.expressTypeButton.jsClick();
        await commonAfter().then((text) => {
            reference2 = text;
        });
        await checkViewPageAllField(false);  //Add for IDXP-812

    });


    it('Edit a Express_Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Express Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.editButton.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.ExpressBulkPayment.editAmount);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true) //add for IDXP-812  check all field
        }
        else {
            await Promise.all([
                await ensure(_PaymentsPages.BulkPaymentPage.amountView).isNotEmpty(),
            ]);
        }
    });


    it('Create Express bulk payment with Approve now', async function () {
        await commonPre();
        await addExistingPayee(testData.ExpressBulkPayment.existingExpressA1, testData.ExpressBulkPayment.amountA2, testData.ExpressBulkPayment.payeeRef);
        await addNewPayee();
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.expressTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.BulkPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.ExpressBulkPayment.responseCode);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log("SG ExpressBulkPayment1:" + reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        console.log("SG ExpressBulkPayment2:" + reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.ExpressBulkPayment.SIT.fromAccount : testData.ExpressBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(reference),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved),
        ]);
    });

    it('Create Express bulk Payment template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSgBulkTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        templateName = "ExpressBulkT" + generatedID();
        await console.log(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.FastBulkPayment.amountV);
        await addExistingPayee(testData.ExpressBulkPayment.existingExpressA1, testData.ExpressBulkPayment.amountA2, testData.ExpressBulkPayment.payeeRef);
        await addExistingPayee(testData.ExpressBulkPayment.existingExpressA2, testData.ExpressBulkPayment.amountA1, testData.ExpressBulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.expressTypeButton.jsClick();
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
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.ExpressBulkPayment.SIT.fromAccount : testData.ExpressBulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContains(testData.status.Approved),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionPaymentType).textContains(testData.ExpressBulkPayment.paymentTypeName)
        ]);
    });

    it('Approve Express bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Express Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.scrollToBottom();
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.ExpressBulkPayment.responseCode);
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create & Reject Express bulk Payment', async function () {
        //Create
        await commonPre();
        await addExistingPayee(testData.ExpressBulkPayment.existingExpressA1, testData.ExpressBulkPayment.amountA2, testData.ExpressBulkPayment.payeeRef);
        await addExistingPayee(testData.ExpressBulkPayment.existingExpressA2, testData.ExpressBulkPayment.amountA1, testData.ExpressBulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.expressTypeButton.jsClick();
        await commonAfter().then((text) => {
            reference3 = text;
        });
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.ExpressBulkPayment.paymentTypeName),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
        //Reject
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input(testData.ExpressBulkPayment.rejectReason);
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Delete Express bulk Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Express Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.scrollToBottom();
        await _PaymentsPages.BulkPaymentPage.deleteButton.click();
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference3);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

export async function checkViewPageAllField(isEdit : boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.ExpressBulkPayment.SIT.fromAccount : testData.ExpressBulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.ExpressBulkPayment.paymentTypeName),

        // Add all field  
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isEdit ? testData.ExpressBulkPayment.totalAmountEditValue : testData.ExpressBulkPayment.totalAmountValue),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccount).textContains(SIT ? testData.ExpressBulkPayment.SIT.fromAccount : testData.ExpressBulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(isEdit ? referenceEdit : reference2),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.totalAmountValue).textContains(isEdit ? testData.ExpressBulkPayment.totalAmountEditValue : testData.ExpressBulkPayment.totalAmountValue),
        //Payer 1
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.ExpressBulkPayment.existingExpressA2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue).textContains(testData.ExpressBulkPayment.existingExpressA2),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(testData.ExpressBulkPayment.payerBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(testData.ExpressBulkPayment.payeeBankSwiftBic),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(testData.ExpressBulkPayment.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isEdit ? testData.ExpressBulkPayment.editAmount : testData.ExpressBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(testData.ExpressBulkPayment.purposeCode),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(testData.ExpressBulkPayment.payeeRef),
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(testData.ExpressBulkPayment.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.ExpressBulkPayment.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.ExpressBulkPayment.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.ExpressBulkPayment.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.ExpressBulkPayment.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.ExpressBulkPayment.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.ExpressBulkPayment.emailId4),
        //Payer 2
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValueA2).textContains(testData.ExpressBulkPayment.existingExpressA1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNickNameValue2).textContains(testData.ExpressBulkPayment.existingExpressA1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName2).textContains(testData.ExpressBulkPayment.payerBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic2).textContains(testData.ExpressBulkPayment.payeeBankSwiftBic),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue2).textContains(testData.ExpressBulkPayment.accountNumber2),
        await ensure(_PaymentsPages.BulkPaymentPage.amountViewA2).textContains(testData.ExpressBulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue2).textContains(testData.ExpressBulkPayment.purposeCode),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue2).textContains(testData.ExpressBulkPayment.payeeRef),

        await ensure(_PaymentsPages.BulkPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
         await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty()
    }
}
