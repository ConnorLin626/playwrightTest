/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from 'protractor';

// this from Online ACT Create, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate for ACT,then Approval
let reference2 = "";
// this from copy ACT,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let TemplateName = '';
let paymentReference = '';
let _FilesPages = new FilesPages();
let fileName = "";
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('MO_testData.json');

describe('MO_Account Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an ACT Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank MACAU');
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create an ACT Payment with ApprovalNow with Mchanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.AccountTransferPage.getChallengeSMS).isVisible();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.click();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create an ACT Payment with ApprovalNow without Mchanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA2);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create an ACT Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'ACTTemplate' + generatedID();
        await _PaymentsPages.AccountTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayee),
        ]);

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayee),
        ]);
    });

    it('Create an ACT Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AccountTransfer.existingTemplate);
        // }
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AccountTransfer.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await _PaymentsPages.AccountTransferPage.nextButton.jsClick();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create an ACT with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.saveAsDraft.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayee),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy an ACT via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("MO - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.amount.clean();
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountV),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    // it('Create an ACT Payment for Verify and Release', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.makePayment.click();
    //     await _PaymentsPages.AccountTransferPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
    //     await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
    //     await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
    //     await _PaymentsPages.AccountTransferPage.nextButton.click();
    //     await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    //     await _PaymentsPages.AccountTransferPage.submitButton.click();
    //     await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference3 = text;
    //     });

    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
    //     await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

    //     await Promise.all([
    //         await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingVerification),
    //     ]);
    // });

    it('Reject an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("MO - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.rejectButton.jsClick();
        await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.AccountTransfer.rejectReason);
        await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Edit an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("MO - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.editButton.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.amount.clean();
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.editAmount);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.editAmount),
        ]);
    });

    it('Delete an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("MO - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.deleteButton.jsClick();
        await _PaymentsPages.AccountTransferPage.deleteDialogButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Upload Account Transfer via File Upload', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.loadCondition();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.AccountTransfer.SIT.fileName : testData.AccountTransfer.UAT.fileName, testData.AccountTransfer.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountUpload),
            //await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeValue).textContains(testData.AccountTransfer.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });
});


describe('MO_Account Transfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.verifyUserId : testData.AccountTransfer.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an ACT Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'Account Transfer').then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Account Transfer', testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.AccountTransferPage.approveButton.jsClick();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release an ACT Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference3, approvalReference, 'Account Transfer').then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewMoPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});