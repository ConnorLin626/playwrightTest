/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure,randomNumbers, generatedID, SIT, handlerCase, PROJECT_TYPE, devWatch } from '../../../lib';
import { browser } from 'protractor';

// this from Online Fast Collection Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate for Fast Collection,then Approval
let reference2 = "";
// this from copy Fast Collection,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';
let _FilesPages = new FilesPages();
let fileName = "";
let referenceEdit = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let uploadTestData = _PaymentsPages.fetchTestData('uploadTestData/SG_uploadTestData.json');

describe('SG_New Fast Collectioon', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NewFastCollection.SIT.loginCompanyId : testData.NewFastCollection.UAT.loginCompanyId, SIT ? testData.NewFastCollection.SIT.loginUserId : testData.NewFastCollection.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a New Fast Collection with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        //await _PaymentsPages.AccountTransferPage.page.click();
        await _PaymentsPages.NewFastCollectionPage.fastCollection.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.newPayeeTab.click();
        await _PaymentsPages.NewFastCollectionPage.newPayerName.input(testData.NewFastCollection.newPayerName);
        await _PaymentsPages.NewFastCollectionPage.newPayerAdd1.input(testData.NewFastCollection.newPayerAdd1);
        await _PaymentsPages.NewFastCollectionPage.newPayerAdd2.input(testData.NewFastCollection.newPayerAdd2);
        await _PaymentsPages.NewFastCollectionPage.newPayerAdd3.input(testData.NewFastCollection.newPayerAdd3);
        await _PaymentsPages.NewFastCollectionPage.payeeBankID.select(SIT ? testData.NewFastCollection.SIT.payeeBankID : testData.NewFastCollection.UAT.payeeBankID);
        await _PaymentsPages.NewFastCollectionPage.newPayerAcctNumber.input(testData.NewFastCollection.newPayerAcctNumber);
        await _PaymentsPages.NewFastCollectionPage.ddaReference.input(testData.NewFastCollection.ddaReference);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.emailId2.input(testData.NewFastCollection.emailId2);
        await _PaymentsPages.NewFastCollectionPage.emailId3.input(testData.NewFastCollection.emailId3);
        await _PaymentsPages.NewFastCollectionPage.emailId4.input(testData.NewFastCollection.emailId4);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await checkViewOnlinePageAllField(false);//Add for IDXP-812

    });

    it('Create an Fast Collection Payment with ApprovalNow with Mchanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        //await _PaymentsPages.AccountTransferPage.page.click();
        await _PaymentsPages.NewFastCollectionPage.fastCollection.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.emailId2.input(testData.NewFastCollection.emailId2);
        await _PaymentsPages.NewFastCollectionPage.emailId3.input(testData.NewFastCollection.emailId3);
        await _PaymentsPages.NewFastCollectionPage.emailId4.input(testData.NewFastCollection.emailId4);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
        await _PaymentsPages.NewFastCollectionPage.approvalNowCheckBox.jsClick();
        //await _PaymentsPages.TelegraphicTransferPage.pushOption.jsClickIfExist();
        await ensure(_PaymentsPages.NewFastCollectionPage.getChallengeSMS).isVisible();
        await _PaymentsPages.NewFastCollectionPage.getChallengeSMS.click();
        await _PaymentsPages.NewFastCollectionPage.challengeResponse.input('123123123');
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create an Fast Collection Payment with ApprovalNow without Mchanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        //await _PaymentsPages.AccountTransferPage.page.click();
        await _PaymentsPages.NewFastCollectionPage.fastCollection.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA2);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
        await _PaymentsPages.NewFastCollectionPage.approvalNowCheckBox.jsClick();
        //await _PaymentsPages.TelegraphicTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.NewFastCollectionPage.challengeResponse.input('123123123');
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create an Fast Collection Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        //await _PaymentsPages.AccountTransferPage.page.click();
        await _PaymentsPages.NewFastCollectionPage.fastCollection.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
        await _PaymentsPages.NewFastCollectionPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'FastCollTemplate' + generatedID();
        await _PaymentsPages.NewFastCollectionPage.templateName.input(TemplateName);
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.amountA1),
            await ensure(_PaymentsPages.NewFastCollectionPage.toExistingPayerValue).textContains(testData.NewFastCollection.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollecctionTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.NewFastCollectionPage.payeeReceivedAmount).textContains(testData.NewFastCollection.amountA1),
            await ensure(_PaymentsPages.NewFastCollectionPage.toExistingPayerValue).textContains(testData.NewFastCollection.existingPayee),
        ]);
    });

    it('Create an Fast Collection Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.NewFastCollection.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.NewFastCollectionPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.NewFastCollectionPage.nextButton.jsClick();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NewFastCollectionPage.toExistingPayerValue).isNotEmpty(),
        ]);
    });

    it('Create an Fast Collection with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        //await _PaymentsPages.AccountTransferPage.page.click();
        await _PaymentsPages.NewFastCollectionPage.fastCollection.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.emailId2.input(testData.NewFastCollection.emailId2);
        await _PaymentsPages.NewFastCollectionPage.emailId3.input(testData.NewFastCollection.emailId3);
        await _PaymentsPages.NewFastCollectionPage.emailId4.input(testData.NewFastCollection.emailId4);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.saveAsDraft.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.amountA1),
            //await ensure(_PaymentsPages.NewFastCollectionPage.toExistingPayerValue).textContains(testData.NewFastCollection.existingPayee),
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    //IDXP-2278 Fast Collection
    it('Copy an Fast Collection with Save as Draft which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        //await _PaymentsPages.AccountTransferPage.page.click();
        await _PaymentsPages.NewFastCollectionPage.fastCollection.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.fromAccount.select(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount);
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountA1);
        await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.updatedPayee);
        await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
        await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
        await _PaymentsPages.NewFastCollectionPage.isBeneAdvising.jsClick();
        await _PaymentsPages.NewFastCollectionPage.emailIdO.input(testData.NewFastCollection.emailIdO);
        await _PaymentsPages.NewFastCollectionPage.emailId1.input(testData.NewFastCollection.emailId1);
        await _PaymentsPages.NewFastCollectionPage.emailId2.input(testData.NewFastCollection.emailId2);
        await _PaymentsPages.NewFastCollectionPage.emailId3.input(testData.NewFastCollection.emailId3);
        await _PaymentsPages.NewFastCollectionPage.emailId4.input(testData.NewFastCollection.emailId4);
        await _PaymentsPages.NewFastCollectionPage.message.input(testData.NewFastCollection.message);
        await _PaymentsPages.NewFastCollectionPage.isTransactionNote.jsClick();
        await _PaymentsPages.NewFastCollectionPage.transactionNote.input(testData.NewFastCollection.transactionNote);
        await _PaymentsPages.NewFastCollectionPage.saveAsDraft.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
         //edit payee
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.NewFastCollection.updatedPayee);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
        //await browser.sleep(2000);
        let ramNumbers = randomNumbers();
        await _PaymentsPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.add2+ramNumbers);
        //await browser.sleep(2000);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== paymentReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.Saved);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.copyButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();

        await Promise.all([
                await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
                await ensure(_PaymentsPages.TelegraphicTransferPage.PayeeDetail).textContains(testData.Beneficiary.add2+ramNumbers),
                ]);

        await _PaymentsPages.NewFastCollectionPage.loadConditionForEdit();
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromPayeeAdd2).textContains(testData.Beneficiary.add2+ramNumbers),  
        ]);




    });

    it('Copy an Fast Collection via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.copyButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.amount.clean();
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountV);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForEdit();
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.amountV),
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });


    it('Reject an Fast Collection Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.rejectButton.jsClick();
        await _PaymentsPages.NewFastCollectionPage.reasonForRejection.input(testData.NewFastCollection.rejectReason);
        await _PaymentsPages.NewFastCollectionPage.rejectDialogButton.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit an Fast Collection Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.editButton.click();
        await _PaymentsPages.NewFastCollectionPage.loadCondition();
        await _PaymentsPages.NewFastCollectionPage.loadConditionForEdit();
        await _PaymentsPages.NewFastCollectionPage.amount.clean();
        await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.editAmount);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForEdit();
        await _PaymentsPages.NewFastCollectionPage.nextButton.click();
        await _PaymentsPages.NewFastCollectionPage.submitButton.click();
        await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        if (referenceEdit == reference) {
            await checkViewOnlinePageAllField(true);//Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(testData.NewFastCollection.editAmount),
            ]);
        }
    });

    it('Delete an Fast Collection Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Collection", testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.deleteButton.jsClick();
        await _PaymentsPages.NewFastCollectionPage.deleteDialogButton.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.NewFastCollectionPage).isUXRejectDialogSuccess();
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Upload Fast Collection via UFF Format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.loadCondition();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.NewFastCollection.SIT.fileName : testData.NewFastCollection.UAT.fileName, "By transaction amount").then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        // await devWatch();
        await checkViewPageAllField(); //IDXP-812
    });

    // it('Create an Fast Collection for Verify and Release', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.page.click();
    //     await _PaymentsPages.NewFastCollectionPage.fastCollection.click();
    //     await _PaymentsPages.NewFastCollectionPage.loadCondition();
    //     await _PaymentsPages.NewFastCollectionPage.fromAccount.select(testData.NewFastCollection.fromAccount);
    //     await _PaymentsPages.NewFastCollectionPage.amount.input(testData.NewFastCollection.amountV);
    //     await _PaymentsPages.NewFastCollectionPage.existingPayee.select(testData.NewFastCollection.existingPayee);
    //     await _PaymentsPages.NewFastCollectionPage.purposeCode.select(testData.NewFastCollection.purposeCode);
    //     await _PaymentsPages.NewFastCollectionPage.paymentDetail.input(testData.NewFastCollection.paymentDetail);
    //     await _PaymentsPages.NewFastCollectionPage.nextButton.click();
    //     await _PaymentsPages.NewFastCollectionPage.loadConditionForPrevewPage();
    //     await _PaymentsPages.NewFastCollectionPage.submitButton.click();
    //     await _PaymentsPages.NewFastCollectionPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.NewFastCollectionPage.getIdealxInfoReferenceID().then(text => {
    //         reference3 = text;
    //     });
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
    //     await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

    //     await Promise.all([
    //         await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.PendingVerification),
    //     ]);
    // });
});

describe('SG_Fast Collection_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.NewFastCollection.SIT.loginCompanyId : testData.NewFastCollection.UAT.loginCompanyId, SIT ? testData.NewFastCollection.SIT.verifyUserId : testData.NewFastCollection.UAT.verifyUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an Fast Collection Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'SG - Fast Collection').then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an Fast Collection Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Fsat Collection', testData.status.PendingApproval);
        }
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await _PaymentsPages.NewFastCollectionPage.approveButton.jsClick();
        await _PaymentsPages.NewFastCollectionPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.NewFastCollectionPage.challengeResponse.input('123123123');
        await _PaymentsPages.NewFastCollectionPage.approveButton.click();
        await _PaymentsPages.NewFastCollectionPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.NewFastCollectionPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release an Fast Collection Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "Fast Collection").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.NewFastCollectionPage.loadConditionForViewNewFastCollectionPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.NewFastCollectionPage.customerReference).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.NewFastCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(uploadTestData.fastCollectionPayment.amountValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(SIT ? uploadTestData.fastCollectionPayment.fromAccount : uploadTestData.fastCollectionPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.NewFastCollectionPage.fromNewPayerAcctNum).textContains(uploadTestData.fastCollectionPayment.fromNewPayerAcctNum),
        await ensure(_PaymentsPages.NewFastCollectionPage.fromNewPayerAcctName).textContains(uploadTestData.fastCollectionPayment.fromNewPayerAcctName),
        await ensure(_PaymentsPages.NewFastCollectionPage.fromPayeeAdd2).textContains(uploadTestData.fastCollectionPayment.fromPayeeAdd2),
        await ensure(_PaymentsPages.NewFastCollectionPage.collectionDate).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.paymentTypeValue).textContains(uploadTestData.fastCollectionPayment.paymentTypeValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.payeeReceivedAmount).textContains(uploadTestData.fastCollectionPayment.amountValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankIDValue).textContains(uploadTestData.fastCollectionPayment.payerBankID),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankAdd1).textContains(SIT ? uploadTestData.fastCollectionPayment.payerBankAdd1 : uploadTestData.fastCollectionPayment.UAT.payerBankAdd1),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankAdd2).textContains(SIT ? uploadTestData.fastCollectionPayment.payerBankAdd2 : uploadTestData.fastCollectionPayment.UAT.payerBankAdd2),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankCity).textContains(uploadTestData.fastCollectionPayment.payerBankCity),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankCountry).textContains(uploadTestData.fastCollectionPayment.payerBankCountry),
        await ensure(_PaymentsPages.NewFastCollectionPage.newPayerSWIFTBIC).textContains(uploadTestData.fastCollectionPayment.newPayerSWIFTBIC),
        await ensure(_PaymentsPages.NewFastCollectionPage.payeeBankCode).textContains(uploadTestData.fastCollectionPayment.payeeBankCode),
        await ensure(_PaymentsPages.NewFastCollectionPage.payeeBrchCode).textContains(uploadTestData.fastCollectionPayment.payeeBrchCode),
        await ensure(_PaymentsPages.NewFastCollectionPage.ddaRefValue).textContains(uploadTestData.fastCollectionPayment.ddaRefValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.paymentDetailValue).textContains(uploadTestData.fastCollectionPayment.paymentDetail),
        await ensure(_PaymentsPages.NewFastCollectionPage.msgToPayerValue).textContains(uploadTestData.fastCollectionPayment.msgToPayerValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(uploadTestData.fastCollectionPayment.emailId0),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(uploadTestData.fastCollectionPayment.emailId1),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(uploadTestData.fastCollectionPayment.emailId2),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(uploadTestData.fastCollectionPayment.emailId3),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(uploadTestData.fastCollectionPayment.emailId4),
        await ensure(_PaymentsPages.NewFastCollectionPage.totalDeductAmt).textContains(uploadTestData.fastCollectionPayment.amountValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.purposeCodeValue).textContains(uploadTestData.fastCollectionPayment.purposeCodeValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.custRef).isNotEmpty(),
        // await ensure(_PaymentsPages.NewFastCollectionPage.messageToApproverValue).textContains(testData.fastCollectionPayment.transactionNote)
    ]);
    if(SIT){
        await ensure(_PaymentsPages.NewFastCollectionPage.balanceValue).isNotEmpty()
    }
}

export async function checkViewOnlinePageAllField(isEdit = false) {
    await Promise.all([
        await ensure(_PaymentsPages.NewFastCollectionPage.customerReference).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.NewFastCollectionPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.amountValue).textContains(isEdit ? testData.NewFastCollection.editAmount : testData.NewFastCollection.amountA1),
        await ensure(_PaymentsPages.NewFastCollectionPage.fromAccountValue).textContains(SIT ?testData.NewFastCollection.SIT.fromAccount : testData.NewFastCollection.UAT.fromAccount),
        //await ensure(_PaymentsPages.NewFastCollectionPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.fromNewPayerAcctNum).textContains(testData.NewFastCollection.newPayerAcctNumber),
        await ensure(_PaymentsPages.NewFastCollectionPage.fromNewPayerAcctName).textContains(testData.NewFastCollection.newPayerName),
        await ensure(_PaymentsPages.NewFastCollectionPage.fromPayeeAdd2).textContains(testData.NewFastCollection.newPayerAdd2),
        await ensure(_PaymentsPages.NewFastCollectionPage.collectionDate).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.paymentTypeValue).textContains(testData.NewFastCollection.paymentTypeValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.payeeReceivedAmount).textContains(isEdit ? testData.NewFastCollection.editAmount : testData.NewFastCollection.amountA1),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankIDValue).textContains(SIT ? testData.NewFastCollection.SIT.PayerBankIDValue : testData.NewFastCollection.UAT.PayerBankIDValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankAdd1).textContains(SIT ? testData.NewFastCollection.SIT.payerBankAdd1 : testData.NewFastCollection.UAT.payerBankAdd1),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankAdd2).textContains(SIT ? testData.NewFastCollection.SIT.payerBankAdd2 : testData.NewFastCollection.UAT.payerBankAdd2),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankCity).textContains(SIT ? testData.NewFastCollection.SIT.payerBankCity : testData.NewFastCollection.UAT.payerBankCity),
        await ensure(_PaymentsPages.NewFastCollectionPage.payerBankCountry).textContains(SIT ? testData.NewFastCollection.SIT.payerBankCountry : testData.NewFastCollection.UAT.payerBankCountry),
        await ensure(_PaymentsPages.NewFastCollectionPage.newPayerSWIFTBIC).textContains(SIT ? testData.NewFastCollection.SIT.newPayerSWIFTBIC : testData.NewFastCollection.UAT.newPayerSWIFTBIC),
        await ensure(_PaymentsPages.NewFastCollectionPage.payeeBankCode).textContains(SIT ? testData.NewFastCollection.SIT.payeeBankCode : testData.NewFastCollection.UAT.payeeBankCode),
        await ensure(_PaymentsPages.NewFastCollectionPage.ddaRefValue).textContains(testData.NewFastCollection.ddaReference),
        await ensure(_PaymentsPages.NewFastCollectionPage.paymentDetailValue).textContains(testData.NewFastCollection.paymentDetail),
        await ensure(_PaymentsPages.NewFastCollectionPage.msgToPayerValue).textContains(testData.NewFastCollection.message),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(testData.NewFastCollection.emailIdO),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(testData.NewFastCollection.emailId1),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(testData.NewFastCollection.emailId2),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(testData.NewFastCollection.emailId3),
        await ensure(_PaymentsPages.NewFastCollectionPage.emailList).textContains(testData.NewFastCollection.emailId4),
        await ensure(_PaymentsPages.NewFastCollectionPage.totalDeductAmt).textContains(isEdit ? testData.NewFastCollection.editAmount : testData.NewFastCollection.amountA1),
        await ensure(_PaymentsPages.NewFastCollectionPage.purposeCodeValue).textContains(testData.NewFastCollection.purposeCodeValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.custRef).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.messageToApproverValue).textContains(testData.NewFastCollection.transactionNote),
        await ensure(_PaymentsPages.NewFastCollectionPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.activityLog).textContains(isEdit ? "Modify" : "Create")

    ]);
}