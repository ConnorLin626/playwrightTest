/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE, devWatch } from '../../../lib';
import { browser, promise } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = '';
// this from createFromTemplate,then copy
let reference2 = '';
// this from copy,then Verify/Approval/Release
let reference3 = '';
//this for payment with max amount
let reference4 = '';
let verifyReference = '';
let approvalReference = '';
let templateName = '';
let paymentReference = '';
let referenceEdit ='';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_IntraCompanyTransfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.loginUserId : testData.IntraCompanyTransfer.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an ICT Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
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
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await checkViewPageAllField(false) //add for IDXP-812
    });


    it('Create ICT with Approva Now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.approvalNowCheckBox.jsClick();
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
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA2);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.approvalNowCheckBox.jsClick();
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
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create ICT with Save as Tempalte', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccountWithFCY : testData.IntraCompanyTransfer.UAT.toAccountWithFCY);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.saveAsTemplateCheckbox.jsClick();
        templateName = 'ICTtemplate' + generatedID();
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
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.IntraCompanyTransfer.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForCreateICTFromTemplatePage();
        await _PaymentsPages.IntraCompanyTransferPage.amount.clean();
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(SIT ? testData.IntraCompanyTransfer.SIT.amountV : testData.IntraCompanyTransfer.UAT.amountV);
        await _PaymentsPages.IntraCompanyTransferPage.getChallenge.clickIfExist();
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
    });

    // Add for AB-6454
    // it('Create an ICT Payment with FX from template', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //     if (0 !== templateName.trim().length) {
    //         await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
    //     } else {
    //         await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.IntraCompanyTransfer.existingTemplate);
    //     }
    //     await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTTemplatePage();
    //     await _PaymentsPages.PaymentTemplatesPage.makeAPayment.click()
    //     await _PaymentsPages.IntraCompanyTransferPage.loadConditionForCreateICTFromTemplatePage();
    //     await _PaymentsPages.IntraCompanyTransferPage.enterCheckFX.clickIfExist();
    //     await _PaymentsPages.IntraCompanyTransferPage.fxContract0.clickIfExist();
    //     if (await _PaymentsPages.IntraCompanyTransferPage.fRef0.isElementPresent()) {
    //         await _PaymentsPages.IntraCompanyTransferPage.fRef0.input(testData.IntraCompanyTransfer.fRef0);
    //     }
    //     await _PaymentsPages.IntraCompanyTransferPage.nextButton.jsClick();
    //     await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
    //     await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
    //     await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
    //         paymentReference = text;
    //     });
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
    //     await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

    //     await Promise.all([
    //         await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).isNotEmpty(),
    //         await ensure(_PaymentsPages.IntraCompanyTransferPage.contractRefValue).isNotEmpty(),
    //     ]);
    // });


    it('Create an ICT with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.transactionNote);
        await _PaymentsPages.IntraCompanyTransferPage.saveAsDraft.click();
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

    it('Copy an ICT Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
        }
        await _PaymentsPages.IntraCompanyTransferPage.copyButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.amount.clean();
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(SIT ? testData.IntraCompanyTransfer.SIT.amountV : testData.IntraCompanyTransfer.UAT.amountV);
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });

    it('Edit an ICT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
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
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForEdit();
        await _PaymentsPages.IntraCompanyTransferPage.modifyNextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        if(reference==referenceEdit){
            await checkViewPageAllField(true); //Add for IDXP-812
            
        }else{
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.editAmount),
        ]);
       }
        
    });

    it('Reject an ICT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
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
        await _PaymentsPages.TransferCentersPage.loadCondition();
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
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs('No information to display'),
        ]);
    });
    //add for R8.18 IDXP-1295
    it('Create an ICT Payment with max Amount 999999999999.99 USD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccountWithUSD : testData.IntraCompanyTransfer.UAT.fromAccountWithUSD);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccountWithUSD : testData.IntraCompanyTransfer.UAT.toAccountWithUSD);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.maxUSDAmount);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference4 = text;
        });
        console.log(reference4)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccountWithUSD : testData.IntraCompanyTransfer.UAT.fromAccountWithUSD),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.maxUSDAmountValue),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.toAccountWithUSD : testData.IntraCompanyTransfer.UAT.fromAccountWithUSD),
        ]);
    });

    //AB-14708 ICT
    it('Create an ICT Payment with SC toaccount', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toSCAccount : testData.IntraCompanyTransfer.UAT.toSCAccount);
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
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await checkViewPageAllField(false),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.toSCAccount : testData.IntraCompanyTransfer.UAT.toSCAccount),
        ]);
    });

    it('Approve an ICT Payment with SC toaccount', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeBtn.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.responseCode.input("12345678");
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
    });

});

describe('SG_IntraCompanyTransfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.verifyUserId : testData.IntraCompanyTransfer.UAT.verifyUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an ICT Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'Intra Company Transfer').then(reference => {
            verifyReference = reference;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an ICT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
        }
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.approveButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.getChallenge.jsClickIfExist();
        await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.IntraCompanyTransferPage.approveButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.IntraCompanyTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release an ICT Payment via My Release', async function () {

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "Intra Company Transfer").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
        await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(isEdit ? testData.IntraCompanyTransfer.editAmount : testData.IntraCompanyTransfer.amountA1),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        // Add check all field
        await ensure(_PaymentsPages.IntraCompanyTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.referenceValue).textContains(isEdit ?  referenceEdit : reference),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(isEdit ? testData.IntraCompanyTransfer.editAmount : testData.IntraCompanyTransfer.amountA1),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentType).textContains(testData.IntraCompanyTransfer.paymentType),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.totalDeductValueNonDol).textContains(isEdit ? testData.IntraCompanyTransfer.editAmount : testData.IntraCompanyTransfer.amountA1),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.messageToApproverValue).textContains(testData.IntraCompanyTransfer.additionNote),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.IntraCompanyTransferPage.balanceValue).isNotEmpty()
    }
}
