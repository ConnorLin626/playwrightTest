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
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';
let referenceEdit='';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Bulk Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkCollection.SIT.loginCompanyId : testData.BulkCollection.UAT.loginCompanyId, SIT ? testData.BulkCollection.SIT.loginUserId : testData.BulkCollection.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a Bulk collection with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.BulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayeeName);
        await _PaymentsPages.BulkCollectionPage.payerBankID.input(testData.BulkCollection.payerBankID);
        await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
        await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.BulkCollectionPage.addPayer.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
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
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await checkViewPageAllField(false);  //Add for IDXP-812
    });

    it('Create a Bulk Collection with Approve Now with Mchallenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.BulkCollectionPage.addButton.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
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
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.BulkCollectionPage.getChallengeButton).isVisible();
        await _PaymentsPages.BulkCollectionPage.getChallengeButton.click();
        await _PaymentsPages.BulkCollectionPage.challengeResponse.input(testData.BulkCollection.responseCode);
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a Bulk Collection with Approve Now without Mchallenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.BulkCollectionPage.addButton.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA2IX);
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
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.BulkCollectionPage.challengeResponse.input(testData.BulkCollection.responseCode);
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PartialApproved),
        ]);
    });

    it('Create a Bulk collection save as template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
        let PayeeName = 'bulkcolpayee' + generatedID();
        await _PaymentsPages.BulkCollectionPage.newPayeeName.input(PayeeName);
        await _PaymentsPages.BulkCollectionPage.payerBankID.input(testData.BulkCollection.payerBankID);
        await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
        await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.BulkCollectionPage.addPayer.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
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
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.saveAsTemplate.jsClick();
        TemplateName = 'COLName' + generatedID();
        await _PaymentsPages.BulkCollectionPage.templateName.input(TemplateName)
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
            await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(testData.BulkCollection.payerBankAccountNumber),
        ]);

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.viewTemplateName).textIs(TemplateName),
            await ensure(_PaymentsPages.BulkCollectionPage.viewTemplateFromAccount).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1)
        ]);
    });

    it('Create a Bulk Collection Payment from template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.BulkCollection.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForCreateFromTempaltePage();
        await _PaymentsPages.BulkCollectionPage.amount.clean();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
        await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.BulkCollectionPage.collectionDetails.clean();
        await _PaymentsPages.BulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        // await _PaymentsPages.BulkCollectionPage.msg.input(testData.BulkCollection.message);
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

    it('Save a Bulk Collection ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.BulkCollectionPage.addButton.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
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
        await _PaymentsPages.BulkCollectionPage.saveAsDraft.click();

        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            paymentReference = text;
            console.log("SGBulkCollref:"+paymentReference);
        });
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.BulkCollection.amountA1),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.Saved),
        ]);
    });


    //IDXP-2278 Bulk
        it('Copy a Bulk Collection with Save as Draft which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.updatePayee);
        await _PaymentsPages.BulkCollectionPage.addButton.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountA1);
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
        await _PaymentsPages.BulkCollectionPage.saveAsDraft.click();

        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            paymentReference = text;
            console.log("SGBulkCollref:"+paymentReference);
        });
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();


        //edit payee
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.BulkCollection.updatePayee);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
        //await browser.sleep(2000);
        let ramNumbers = randomNumbers();
        await _PaymentsPages.BeneficiaryPage.newPayeeNumber.input(testData.BulkCollection.existingPayeeAcctNum+ramNumbers);
        //await browser.sleep(2000);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        //copy
      await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== paymentReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.Saved);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.copyButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.jsClick();
        
        await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("One or more payee details have been updated. "),
        await ensure(_PaymentsPages.BulkPaymentPage.payeeAccountDetail).textContains(testData.BulkCollection.existingPayeeAcctNum+ramNumbers),
        ]);

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
           await ensure(_PaymentsPages.BulkPaymentPage.payeeAccountDetail).textContains(testData.BulkCollection.existingPayeeAcctNum+ramNumbers),  
         ]);
            
        });

    it('Copy an Bulk Collection', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.copyButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.amount.clean();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountVIX);
        await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.jsClick();
        await _PaymentsPages.BulkCollectionPage.collectionDetails.clean();
        await _PaymentsPages.BulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
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
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Create a Bulk Collection for Verify and Release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.BulkCollectionPage.addButton.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.amountVIX);
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

            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit an Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.editButton.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.amount.clean();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.editAmountIX);
        await _PaymentsPages.BulkCollectionPage.showOptionDetailPayee1.click();
        await _PaymentsPages.BulkCollectionPage.collectionDetails.clean();
        await _PaymentsPages.BulkCollectionPage.collectionDetails.input(testData.BulkCollection.collectionDetailsToThePayerBank);
        await _PaymentsPages.BulkCollectionPage.batchID.clean()
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
        if (referenceEdit==reference){
            await checkViewPageAllField(true); //Add for IDXP-812
        }
        else{
            await Promise.all([
                await ensure(_PaymentsPages.BulkCollectionPage.amountValue).isNotEmpty(),
        ]);
    }
    }); 

    it('Reject a Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.rejectButton.click();
        await _PaymentsPages.BulkCollectionPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.BulkCollectionPage.rejectDialogButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForDismissRejectDialog();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Delete a Bulk Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _PaymentsPages.BulkCollectionPage.deleteButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
        await _PaymentsPages.BulkCollectionPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.BulkCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.BulkCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Can not create Bulk Collection with item amount greater than 999999999.99 SGD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.BulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayeeName);
        await _PaymentsPages.BulkCollectionPage.payerBankID.input(testData.BulkCollection.payerBankID);
        await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
        await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.BulkCollectionPage.addPayer.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.moreThanMaxAmountIX);
        await ensure(_PaymentsPages.BulkCollectionPage.amountErrorTip).textContains(testData.BulkCollection.amountErrorTip);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.hasUXIxErrorMsg1(testData.BulkCollection.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create Bulk Collection with item amount enqual to 999999999.99 SGD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.BulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayeeName);
        await _PaymentsPages.BulkCollectionPage.payerBankID.input(testData.BulkCollection.payerBankID);
        await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
        await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.BulkCollectionPage.addPayer.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.maxAmountIX);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(testData.BulkCollection.maxAmount),
        ]);
    });

    it('Create Bulk Collection with Total amount greater than 999999999.99 SGD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.bulkCollection.click();
        await _PaymentsPages.BulkCollectionPage.loadCondition();
        await _PaymentsPages.BulkCollectionPage.fromAccount.select(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount);
        await _PaymentsPages.BulkCollectionPage.newPayerTab.click();
        await _PaymentsPages.BulkCollectionPage.newPayeeName.input(testData.BulkCollection.newPayeeName);
        await _PaymentsPages.BulkCollectionPage.payerBankID.input(testData.BulkCollection.payerBankID);
        await _PaymentsPages.BulkCollectionPage.payerBankResult.click();
        await _PaymentsPages.BulkCollectionPage.newPayerAccountNum.input(testData.BulkCollection.payerBankAccountNumber);
        await _PaymentsPages.BulkCollectionPage.DDARef.input(testData.BulkCollection.DDAreference);
        await _PaymentsPages.BulkCollectionPage.addPayer.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.maxAmountIX);
        await _PaymentsPages.BulkCollectionPage.existingPayerTab.jsClick();
        await _PaymentsPages.BulkCollectionPage.filterExistingPayee.input(testData.BulkCollection.existingPayeeName);
        await _PaymentsPages.BulkCollectionPage.addButton.click();
        await _PaymentsPages.BulkCollectionPage.amount.input(testData.BulkCollection.maxAmountIX);
        await _PaymentsPages.BulkCollectionPage.nextButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkCollectionPage.submitButton.click();
        await _PaymentsPages.BulkCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),

        ]);
    });
});

describe('SG_Bulk Collection_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.BulkCollection.SIT.loginCompanyId : testData.BulkCollection.UAT.loginCompanyId, SIT ? testData.BulkCollection.SIT.verifyUserId : testData.BulkCollection.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an Bulk Collection via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'SG - Bulk Collection').then(reference => {
            verifyReference = reference;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a Bulk Collection via Transfer Center', async function () {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Bulk Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkCollectionPage.approveButton.jsClick();
        await _PaymentsPages.BulkCollectionPage.getChallengeButton.jsClickIfExist();
        await _PaymentsPages.BulkCollectionPage.challengeResponse.input('123123123');
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

    it('Release Bulk Collection via My Release', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference3, approvalReference, 'SG - Bulk Collection').then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});
// below 245 disable
// describe('SG_Bulk Collection_Pagination', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     before(async function () { await new NavigatePages().loginCB(SIT ? testData.BulkCollection.SIT.loginCompanyId : testData.BulkCollection.UAT.loginCompanyId, SIT ? testData.BulkCollection.SIT.loginUserId : testData.BulkCollection.UAT.loginUserId); });
//     const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this,PROJECT_TYPE.IDEALX); });

//     it('View Bulk Collection for payee More than 1000 and less than 2000', async function () {
//         await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
//         await _PaymentsPages.transferCentersPage.loadCondition();
//         await _PaymentsPages.transferCentersPage.goToViewPaymentPageforPagination(SIT ? testData.BulkCollection.referenceSIT : testData.BulkCollection.referenceUAT, testData.BulkCollection.paymentType);
//         await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
//         await _PaymentsPages.BulkCollectionPage.loadConditionForViewPagination();
//         await _PaymentsPages.BulkCollectionPage.switchBulkViewTab(_PaymentsPages.BulkCollectionPage.viewShowAllTab, testData.BulkCollection.firstLoadText);
//         await _PaymentsPages.BulkCollectionPage.viewLoadMoreButton.click();
//         await _PaymentsPages.BulkCollectionPage.loadConditionForViewPagination();
//         await _PaymentsPages.BulkCollectionPage.checkPaginationForShowAllTab();
//         await _PaymentsPages.BulkCollectionPage.checkPaginationForRejectTab();
//     });
// });
export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
        await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).textContains(SIT ? testData.BulkCollection.SIT.fromAccount : testData.BulkCollection.UAT.fromAccount),
        await ensure(_PaymentsPages.BulkCollectionPage.amountValue).textContains(isEdit ? testData.BulkCollection.editAmount:testData.BulkCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        // Add all field  
        await ensure(_PaymentsPages.BulkCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentType).textContains(testData.BulkCollection.paymentTypeView),
        await ensure(_PaymentsPages.BulkCollectionPage.totalAmountValue).textContains(isEdit ? testData.BulkCollection.editAmount:testData.BulkCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.BulkCollectionPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.BulkCollectionPage.collectionSummaryValue).textContains(isEdit ? testData.BulkCollection.editAmount:testData.BulkCollection.amountA1),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNameValue).textContains(testData.BulkCollection.newPayeeName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeNickNameValue).textContains(testData.BulkCollection.newPayeeName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankName).textContains(SIT? testData.BulkCollection.SIT.payerBankName : testData.BulkCollection.UAT.payerBankName),
        await ensure(_PaymentsPages.BulkCollectionPage.payeeBankSwiftBic).textContains(testData.BulkCollection.payerBankID),
        await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).textContains(testData.BulkCollection.payerBankAccountNumber),
        await ensure(_PaymentsPages.BulkCollectionPage.DDAReferenceValue).textContains(testData.BulkCollection.DDAreference),
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
        await ensure(_PaymentsPages.BulkCollectionPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT)(
        await ensure(_PaymentsPages.BulkCollectionPage.balanceValue).isNotEmpty()
    )
}
