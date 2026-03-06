/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure,randomNumbers, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let TemplateName = '';
let paymentReference = '';
let verifyReference = '';
let referenceEdit = '';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');

export async function addNewPayee() {
    await _PaymentsPages.PayrollPage.newPayee.click();
    await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.payeeName);
    await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll.newPayeeNickname);
    await _PaymentsPages.PayrollPage.payeeBankID.input(testData.Payroll.payeeBankID);
    await _PaymentsPages.PayrollPage.payeeBankResult.click();
    await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.accountNumber);
    await _PaymentsPages.PayrollPage.newPayeeButton.click();
}

describe('TW_Payroll', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId, SIT ? 123123 : testData.Payroll.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Payroll with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await addNewPayee();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.payeeRef.input(testData.Payroll.payeeRef);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.paymentDetails.input(testData.Payroll.paymentDetails);
        await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
        await _PaymentsPages.PayrollPage.emailIdO.input(testData.Payroll.emailIdO);
        await _PaymentsPages.PayrollPage.emailId1.input(testData.Payroll.emailId1);
        await _PaymentsPages.PayrollPage.emailId2.input(testData.Payroll.emailId2);
        await _PaymentsPages.PayrollPage.emailId3.input(testData.Payroll.emailId3);
        await _PaymentsPages.PayrollPage.emailId4.input(testData.Payroll.emailId4);
        await _PaymentsPages.PayrollPage.message.input(testData.Payroll.message);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await checkViewPageAllField(false); // IDXP-812
    });

    it('Create with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee1);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.filterExistingPayee.clean();
        // add second payee
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee2);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount2);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
        await _PaymentsPages.PayrollPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll.EnterResponse);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create with Approva Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await addNewPayee();
        //amount3 need more than 1 PA group approve
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount3Ix);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll.EnterResponse);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount3),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PartialApproved),
        ]);
    });

    it('Create Payroll with Save as Tempalte', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee1);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.saveAsTemplateCheckbox.jsClick();
        TemplateName = 'SALTName' + generatedID();
        await _PaymentsPages.PayrollPage.templateName.input(TemplateName);
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll.existingPayee1),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PayrollPage.loadConditionForViewTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateFromAccount).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.viewTemplateAmount).textContains(testData.Payroll.amount1),
            await ensure(_PaymentsPages.PayrollPage.viewTemplatePayeeNameValue).textContains(testData.Payroll.existingPayee1),
        ]);
    });

    it('Create a Payroll from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.Payroll.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.PayrollPage.loadConditionCreateTWPaymentTemplate();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.editamount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        if (0 !== TemplateName.trim().length) {
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
                await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.editamount),
                await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll.existingPayee1),
            ]);
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
                await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
                await ensure(_PaymentsPages.PayrollPage.payeeNameValue).isNotEmpty(),
            ]);
        }
    });

    it('Create a Payroll with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee1);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.saveAsDraft.click();
        await _PaymentsPages.PayrollPage.loadConditionForDismissDialog();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount1),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll.existingPayee1),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });
     //IDXP-2278 Payroll
    it('Edit a Payroll with Save as Draft which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.updatedPayee2);
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount1);
        await _PaymentsPages.PayrollPage.saveAsDraft.click();
        await _PaymentsPages.PayrollPage.loadConditionForDismissDialog();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();

        //edit payee
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.Payroll.updatedPayee2);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
        let ramNumbers = randomNumbers();
        //await _PaymentsPages.BeneficiaryPage.addAddress.jsClick();
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.Beneficiary.accountNumber+ramNumbers);
        //await _PaymentsPages.BeneficiaryPage.checkBtn.click();
        await browser.sleep(2000);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        
        //edit txn
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== paymentReference.trim().length) {
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        } else {
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.Saved);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("One or more payee details have been updated."),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeAccountDetail).textContains(testData.Beneficiary.accountNumber+ramNumbers),
        ]);
        await browser.sleep(2000);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
                    
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await Promise.all([
        //await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.toNewPayeeValue).textContains(testData.Payroll.updatedPayee2),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.Beneficiary.accountNumber+ramNumbers),
        ]);
            
        

    });

    it('Copy a Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.copyButton.jsClick();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amountVIx);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amountV),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    // it('Create a Payroll for Verify and Release', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.PayrollPage.payroll.click();
    //     await _PaymentsPages.PayrollPage.loadCondition();
    //     await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
    //     await _PaymentsPages.PayrollPage.addExistingPayee(testData.Payroll.existingPayee1);
    //     await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amountVIx);
    //     await _PaymentsPages.PayrollPage.nextButton.click();
    //     await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
    //     await _PaymentsPages.PayrollPage.submitButton.click();
    //     await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
    //         reference3 = text;
    //     });

    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
    //     await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

    //     await Promise.all([
    //         await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
    //         await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amountV),
    //         await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
    //     ]);
    // });

    it('Edit a Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.editButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.editamount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        if(referenceEdit == reference){
            await checkViewPageAllField(false);

        } else {
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.editamount),
            ]);
        }
    });

    it('Reject a Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.rejectButton.jsClick();
        await _PaymentsPages.PayrollPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.PayrollPage.rejectDialogButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForDismissDialog();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXRejectDialogSuccess();
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Delete a Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.deleteButton.jsClick();
        await _PaymentsPages.PayrollPage.deleteDialogButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForDismissDialog();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXRejectDialogSuccess();
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });
});

describe('TW_Payroll_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.verifyUserId : testData.Payroll.UAT.verifyUserId, SIT ? 123123 : testData.Payroll.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Payroll via My Verify list', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'TW - Payroll').then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a Payroll via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - Payroll", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.approveButton.jsClick();
        await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input(testData.Payroll.EnterResponse);
        await _PaymentsPages.PayrollPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.PayrollPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a Payroll via My Release list', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, paymentReference, "TW - Payroll").then(reference => {
            paymentReference = reference;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received),
        ]);
    });
});

// describe('TW_Payroll_Pagination', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId, "123123"); });
//     const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this,PROJECT_TYPE.IDEALX); });

//     it('View Payroll for payee More than 2000', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.TransferCentersPage.loadCondition();
//         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageforPagination(SIT ? testData.Payroll.referenceSIT : testData.Payroll.referenceUAT, testData.Payroll.paymentType);
//         await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
//         await _PaymentsPages.PayrollPage.loadConditionForViewPagination();
//         await _PaymentsPages.PayrollPage.switchBulkViewTab(_PaymentsPages.PayrollPage.viewShowAllTab, testData.Payroll.firstLoadText);
//         await _PaymentsPages.PayrollPage.viewLoadMoreButton.click();
//         await _PaymentsPages.PayrollPage.switchBulkViewTab(_PaymentsPages.PayrollPage.viewShowAllTab, testData.Payroll.firstLoadText2);
//         await _PaymentsPages.PayrollPage.viewLoadMoreButton.click();
//         await _PaymentsPages.PayrollPage.loadConditionForViewPagination();
//         await _PaymentsPages.PayrollPage.checkPaginationForShowAllTab();
//         await _PaymentsPages.PayrollPage.checkPaginationForRejectTab();
//     });
// });

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(testData.Payroll.paymentType),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(isEdit? testData.Payroll.editamount : testData.Payroll.amount1),
        await ensure(_PaymentsPages.PayrollPage.bankChargeView).textContains(testData.Payroll.bankChargeUs),
        await ensure(_PaymentsPages.PayrollPage.chargeAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),

        //payee
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.Payroll.payeeName),
        await ensure(_PaymentsPages.PayrollPage.payeeNickNameValue).textContains(testData.Payroll.newPayeeNickname),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.branchNameValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(testData.Payroll.payeeBankID),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.Payroll.accountNumber),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(isEdit? testData.Payroll.editamount : testData.Payroll.amount1),
        await ensure(_PaymentsPages.PayrollPage.TransactionCodeValue).textContains('22'),
        await ensure(_PaymentsPages.PayrollPage.referenceForPayeeValue).textContains(testData.Payroll.payeeRef),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.paymentDetailValue).textContains(testData.Payroll.paymentDetails),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll.emailIdO),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll.emailId1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll.emailId2),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll.emailId3),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.Payroll.emailId4),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(testData.Payroll.message),
        await ensure(_PaymentsPages.PayrollPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.activityLog).isNotEmpty(),
    ]);
}