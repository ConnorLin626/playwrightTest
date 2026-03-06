/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
// this from OnlineCreate, then Reject/Edit/Delete
let reference = '';
// this from createFromTemplate,then copy
let reference2 = '';
// this from copy,then Verify/Approval/Release
let reference3 = '';
let verifyReference = '';
let approvalReference = '';
let templateName = '';
let paymentReference = '';
let fileName = '';
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const CB_1 = require("../../../pages/IDEALX");
const lib_1 = require("../../../lib");
let _FilesPages = new CB_1.FilesPages();
const protractor_1 = require("protractor");
let testData = _PaymentsPages.fetchTestData('AU_testData.json');

describe('AU_IntraCompanyTransfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.loginUserId : testData.IntraCompanyTransfer.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an ICT Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Edit an ICT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
        }
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.editButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.amount.clean();
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.editAmount);
        await _PaymentsPages.IntraCompanyTransferPage.modifyNextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).isNotEmpty(),
        ]);
    });

    it('Copy an ICT Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
        }
        await _PaymentsPages.IntraCompanyTransferPage.copyButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.amount.clean();
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountV);
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        ]);
    });

    it('Reject an ICT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
        }
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.rejectButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.reasonForRejection.input('reasonForRejection');
        await _PaymentsPages.IntraCompanyTransferPage.rejectDialogButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.IntraCompanyTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.IntraCompanyTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Delete an ICT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
        }
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.deleteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.deleteDialogButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.IntraCompanyTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.IntraCompanyTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs('No information to display'),
        ]);
    });

    it('Create ICT with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.approvalNowCheckBox.jsClick();
        // await _PaymentsPages.IntraCompanyTransferPage.pushOption.jsClick();
        await ensure(_PaymentsPages.IntraCompanyTransferPage.getChallenge).isVisible();
        await _PaymentsPages.IntraCompanyTransferPage.getChallenge.click();
        await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create ICT with Approva Now without M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA2);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.approvalNowCheckBox.jsClick();
        // await _PaymentsPages.IntraCompanyTransferPage.pushOption.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input('123123');
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create ICT with Save as Tempalte', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccountWithFCY : testData.IntraCompanyTransfer.UAT.toAccountWithFCY);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.saveAsTemplateCheckbox.jsClick();
        templateName = 'ICTtemp' + generatedID();
        await _PaymentsPages.IntraCompanyTransferPage.templateName.input(templateName);
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.viewTemplateName).textIs(templateName),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.viewTemplateAmount).textContains(testData.IntraCompanyTransfer.amountA1),
        ]);
    });

    it('Create an ICT Payment from template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(SIT ? testData.IntraCompanyTransfer.SIT.existingTemplate : testData.IntraCompanyTransfer.UAT.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForCreateICTFromTemplatePage();
        await _PaymentsPages.IntraCompanyTransferPage.amount.clean();
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountV);
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).isNotEmpty(),
        ]);
        await _PaymentsPages.PaymentTemplatesPage.deleteTemplate(templateName);
    });

    it('Create an ICT with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.transactionNote);
        await _PaymentsPages.IntraCompanyTransferPage.saveAsDraft.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForDismissDialog();
        await _PaymentsPages.IntraCompanyTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.IntraCompanyTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Upload ICT via Upload Files', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", lib_1.SIT ? testData.IntraCompanyTransfer.SIT.fileName : testData.IntraCompanyTransfer.UAT.fileName, testData.IntraCompanyTransfer.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewMoICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccountUpload : testData.IntraCompanyTransfer.UAT.fromAccountUpload),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountUpload),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT? testData.IntraCompanyTransfer.SIT.toAccountUpload : testData.IntraCompanyTransfer.UAT.toAccountUpload),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    // it('Upload ICT via Upload Profiles', async function () {
    // 	// go to upload profile
    // 	await uploadProfilesForBulk(SIT ? testData.IntraCompanyTransfer.SIT.fileName : testData.IntraCompanyTransfer.UAT.fileName);
    // });

    it('Create a Intra-Company Transfer For Veriry and Release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountVerify);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountVerify),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });
});


describe('AU_IntraCompanyTransfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.verifyUserId : testData.IntraCompanyTransfer.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an ICT Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        //'Verify an ICT Payment via My Verify
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.AU_ICT).then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewMoICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContains(testData.status.PendingApproval)
        ]);
    });

    it('Approve an ICT vai Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_ICT, testData.status.PendingApproval);
        }
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.approveButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.getChallenge.jsClickIfExist();
        await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input('123123');
        await _PaymentsPages.IntraCompanyTransferPage.approveButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.IntraCompanyTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected, testData.status.PendingRelease),
        ]);
    });

    it('Release an ICT Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_ICT).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});
