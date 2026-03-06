/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure,randomNumbers, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

// this from Online Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';
let referenceEdit='';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
export async function addNewPayee() {
    await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
    await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.payeeName);
    await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(testData.BulkPayment.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.accountNumber);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
}

export async function addExistingPayee(name: string, amount: string) {
    await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(name);
    await _PaymentsPages.BulkPaymentPage.addButton.jsClick();
    await _PaymentsPages.BulkPaymentPage.amount.input(amount);
}


describe('SG_Bulk payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Bulk payment with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await addNewPayee();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
        await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.BulkPayment.paymentDetails);
        await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
        await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
        await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
        await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
        await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
        await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewPageAllField(false);   //add for IDXP-812
    });

    it('Create with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.BulkPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create with Approva Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await addNewPayee();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA2IX);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amountA2),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PartialApproved),
        ]);
    });

    it('Create Bulk payment with Save as Tempalte', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'BPTName' + generatedID();
        await _PaymentsPages.BulkPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateFromAccount).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.viewTemplateAmount).textContains(testData.BulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.BulkPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.BulkPayment.existingPayee),
        ]);
    });

    it('Create a Bulk Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.BulkPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadConditionCreatePayemntTemplate();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
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
        ]);
    });

    it('Create a Bulkpayment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.saveAsDraft.jsClick();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await browser.sleep(2000);
        await _PaymentsPages.BulkPaymentPage.scrollTo(0,800);
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amountA1),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(testData.BulkPayment.existingPayee),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });

    //IDXP-2278 Bulk
    it('Copy a Bulk Payment with Save as Draft which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.BulkPayment.updatePayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.saveAsDraft.jsClick();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        //edit payee
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.BulkPayment.updatePayee);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
        let ramNumbers = randomNumbers();
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.BulkPayment.existingPayeeAcctNum+ramNumbers);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== paymentReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.Saved);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.copyButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await Promise.all([
                    await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("One or more payee details have been updated. "),
                    await ensure(_PaymentsPages.BulkPaymentPage.payeeAccountDetail).textContains(testData.BulkPayment.existingPayeeAcctNum+ramNumbers),
                ]);
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.payeeAccountDetail).textContains(testData.BulkPayment.existingPayeeAcctNum+ramNumbers),  
        ]);
        
        
        
        
    });

    it('Copy a Bulk via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.copyButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.amount.clean();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountVIX);
        // await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
        //await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.amountV),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.editButton.click();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.addExistingPayee(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.editamount);
        // await _PaymentsPages.BulkPaymentPage.amount.clean();
        // await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.editamount);
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
        if (reference ==referenceEdit){
            await checkViewPageAllField(true) //add for IDXP-812  check all field
        }
        else{
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.BulkPayment.editamount),
        ]);
        }
    });

    it('Reject a Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Delete a Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.scrollToBottom();
        await _PaymentsPages.BulkPaymentPage.deleteButton.click();
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissRejectDialog();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.jsClick();
    });

    //For AB-8924
    it('Create Bulk Payment tempalte with Reference for payee let blank', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.jsClick();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createSgBulkTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        TemplateName = "BulkPayment" + generatedID();
        await console.log(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.BulkPayment.amountVIX);
        await addExistingPayee(testData.BulkPayment.existingPayee, testData.BulkPayment.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.BulkPayment.BlankChar);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.BulkPayment.amountA1)
        ]);
    });

    it('Edit Bulk Payment template with Reference for payee field contain space char', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.EditTemplate.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.payeeAmount.clean();
        await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.BulkPayment.editamount);
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.clean();
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.BulkPayment.payeeRefValue);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.BulkPayment.editamount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewpayeeRef).textContains(testData.BulkPayment.payeeRefValue)

        ]);
    });
    //Add for DASB-74531
    it('Create Bulk payment with new payee input duplicate nickname', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
        await _PaymentsPages.BulkPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.existingPayee);
        await _PaymentsPages.BulkPaymentPage.payeeBankID.input(testData.BulkPayment.payeeBankID);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.accountNumber);
        await _PaymentsPages.BulkPaymentPage.savePayee.jsClick();
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await ensure(_PaymentsPages.BulkPaymentPage.nicknameMsg).textContains(testData.BulkPayment.Msg);
    });
});

describe('SG_Bulk Payment_Approvals', async function () {
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.verifyUserId : testData.BulkPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Bulk Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'SG - Bulk Payment').then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a Bulk Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.scrollToBottom();
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a Bulk Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference3, approvalReference, 'SG - Bulk Payment').then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});

// 245 comment befpre

// describe('SG_Bulk Payment_Pagination', async function () {
//     before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId); });
//     const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this,PROJECT_TYPE.IDEALX); });

//     it('View Bulk Payment for payee Less than 1000', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.loadCondition();
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageforPagination(SIT ? testData.BulkPayment.referenceSIT : testData.BulkPayment.referenceUAT, testData.BulkPayment.paymentType);
//         await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
//         await _PaymentsPages.BulkPaymentPage.loadConditionForViewPagination();
//         await _PaymentsPages.BulkPaymentPage.switchBulkViewTab(_PaymentsPages.BulkPaymentPage.viewShowAllTab);
//         await _PaymentsPages.BulkPaymentPage.checkPaginationForShowAllTab();
//         await _PaymentsPages.BulkPaymentPage.checkPaginationForRejectTab();
//     });
// });
export async function checkViewPageAllField(isEdit = false) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(isEdit ? testData.BulkPayment.editamount : testData.BulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isEdit ? testData.BulkPayment.existingPayeeAcctNum : testData.BulkPayment.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        // check all field
        await ensure(_PaymentsPages.BulkPaymentPage.hashValue).isNotEmpty(),
        //await ensure(_PaymentsPages.BulkPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentTypeValue).textContains(testData.BulkPayment.paymentTypeViewValue),
        await ensure(_PaymentsPages.BulkPaymentPage.deductAmountView).textContains(isEdit ? testData.BulkPayment.deductAmount:testData.BulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.chargeAccount).textContains(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.BulkPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentSummaryValue).textContains(isEdit ? testData.BulkPayment.deductAmount : testData.BulkPayment.amountA1),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(isEdit ? testData.BulkPayment.existingPayee : testData.BulkPayment.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).textContains(isEdit ? testData.BulkPayment.existingPayee : testData.BulkPayment.payeeName),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankName).textContains(testData.BulkPayment.payeeBankName),
        await ensure(_PaymentsPages.BulkPaymentPage.accountNumberValue).textContains(isEdit ? testData.BulkPayment.existingPayeeAcctNum : testData.BulkPayment.accountNumber),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeBankSwiftBic).textContains(testData.BulkPayment.payeeBankID),
        await ensure(_PaymentsPages.BulkPaymentPage.referenceForPayeeValue).textContains(isEdit ? "00001" : testData.BulkPayment.payeeRef),
        await ensure(_PaymentsPages.BulkPaymentPage.purposeCodeValue).textContains(testData.BulkPayment.purposeCode),
    ]);
    if(isEdit){
        await Promise.all([
        await _PaymentsPages.BulkPaymentPage.showOptionView2.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue2).textContains(testData.BulkPayment.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue2).textContains(testData.BulkPayment.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue2).textContains(testData.BulkPayment.emailId4)
    ]);
    }else{
        await Promise.all([
        await _PaymentsPages.BulkPaymentPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.BulkPaymentPage.paymentDetailValue).textContains(testData.BulkPayment.paymentDetails),
        await ensure(_PaymentsPages.BulkPaymentPage.messageValue).textContains(testData.BulkPayment.message),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailIdO),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailId1),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailId2),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailId3),
        await ensure(_PaymentsPages.BulkPaymentPage.emailListValue).textContains(testData.BulkPayment.emailId4)
    ]);
    }
    await Promise.all([
        await ensure(_PaymentsPages.BulkPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}