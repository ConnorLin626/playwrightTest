import { browser } from "protractor";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, generatedID, handlerCase, PROJECT_TYPE, SIT,logger} from "../../../lib";
import { ApprovalsPages, PaymentsPages } from "../../../pages/IDEALX";

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let reference = '';
let reference2 = '';
let reference3 = '';
let reference4 = '';
let templateName = "";
let templateName1 = "";
let referenceEdit = "";

describe('SG_Demand Draft', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.DemandDraft.SIT.loginCompanyId : testData.DemandDraft.UAT.loginCompanyId,
            SIT ? testData.DemandDraft.SIT.loginUserId : testData.DemandDraft.UAT.loginUserId, "P@ssword123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create DD Payment ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.demandDraftPaymentPage.demandDraftPayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await fillUpFields(false);
        await _PaymentsPages.demandDraftPaymentPage.paymentDetail.input(testData.DemandDraft.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.DemandDraft.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
            console.log(reference2);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
        await checkViewOnlinePageAllField(false);//Add for IDXP-812
    });

    // it('Edit DD Payment', async function () {
    //     await logger.info(" Edit dd payment step_1")
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await logger.info(" Edit dd payment step_2")
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await logger.info(" Edit dd payment step_3")
    //     if (0 !== reference2.trim().length) {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
    //     await logger.info(" Edit dd payment step_4_1")
    //     } else {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Demand Draft", testData.status.PendingApproval);
    //     await logger.info(" Edit dd payment step_4_2")
    //     }
    //     await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
    //     await logger.info(" Edit dd payment step_5")
    //     await _PaymentsPages.demandDraftPaymentPage.edit.click();
    //     await logger.info(" Edit dd payment step_6")
    //     await _PaymentsPages.demandDraftPaymentPage.amount.clean();
    //     await logger.info(" Edit dd payment step_7")
    //     await _PaymentsPages.demandDraftPaymentPage.amount.input(testData.DemandDraft.editAmount);
    //     await logger.info(" Edit dd payment step_8")
    //     await _PaymentsPages.AccountTransferPage.nextButton.click();
    //     await logger.info(" Edit dd payment step_9")
    //     await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    //     await logger.info(" Edit dd payment step_10")
    //     await _PaymentsPages.AccountTransferPage.submitButton.click();
    //     await logger.info(" Edit dd payment step_11")
    //     await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    //     await logger.info(" Edit dd payment step_12")
    //     await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
    //         referenceEdit = text;
    //         console.log(referenceEdit);
    //     });
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await logger.info(" Edit dd payment step_13")
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
    //     await logger.info(" Edit dd payment step_14")
    //     await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
    //     await logger.info(" Edit dd payment step_15")
    //     if (referenceEdit == reference2) {
    //         await checkViewOnlinePageAllField(true);//Add for IDXP-812
    //     await logger.info(" Edit dd payment step_16")
    //     } else {
    //         await Promise.all([
    //             await ensure(_PaymentsPages.demandDraftPaymentPage.sendAmountValue).textContains(testData.DemandDraft.editAmount),
    //         ]);
    //     }
    // });


    it('Create DD Payment with Approve now', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.demandDraftPaymentPage.demandDraftPayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await fillUpFields(false);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.AccountTransferPage.getChallengeSMS).isVisible();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.click();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.DemandDraft.enterResponseI3Text);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(SIT ? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3),
            await ensure(_PaymentsPages.demandDraftPaymentPage.customerReferenceValue).textContains(reference),
            await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textContainsLessOne(testData.status.Approved,testData.status.Completed,testData.status.Received),
        ]);
    });

    it('Create DD Payment template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSgCDDTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName1 = 'DemandDraft' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName1);
        await fillUpFields(true);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await console.log(templateName1);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName1);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(SIT ? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textIs(testData.status.Approved),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentTypeValue).textContains(testData.DemandDraft.DDPaymentTypeName)
        ]);
    });

        //due to approver new ui

    it('Offline Approve DD Payment', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileFilter.input(reference2);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.scrollToBottom();
        await _ApprovalsPages.ApprovalPage.getChallengeBtn.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.groupApproverOption.select(SIT ? testData.DemandDraft.SIT.approverOption : testData.DemandDraft.UAT.approverOption);
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.DemandDraft.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.DemandDraft.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.finishButton.jsClick();
        //await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference2);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
    });

    it('Create & Reject DD Payment', async function () {
        //Create
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.demandDraftPaymentPage.demandDraftPayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await fillUpFields(false);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
            console.log(reference3);
        });
        //Reject
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Demand Draft", testData.status.PendingApproval);
        }
        await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.AccountTransferPage.rejectButton.click();
        await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.AccountTransfer.rejectReason);
        await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Delete DD Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Corporate Cheque", testData.status.PendingApproval);
        }
        await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
        await _PaymentsPages.BulkPaymentPage.scrollToBottom();
        await _PaymentsPages.BulkPaymentPage.deleteButton.click();
        await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForDismissDialog();
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

   //add for AB-9011:Payable To field value contain special char(/a-zA-Z0-9 `~!@#$%&()_-+={[}]$/;)
    it('Create DD Payment with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.demandDraftPaymentPage.demandDraftPayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await fillUpFieldswithNewPayee(false);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(SIT ? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3),
            await ensure(_PaymentsPages.demandDraftPaymentPage.customerReferenceValue).textContains(reference2),
            await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payableToValue).textIs(testData.DemandDraft.payableTo),
        ]);
    });

    //add for AB-9011:Payable To field value contain special char(/a-zA-Z0-9 `~!@#$%&()_-+={[}]$/;)
    it('Create DD Payment template with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSgCDDTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'DemandDraft' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await fillUpFieldswithNewPayee(true);
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
            await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(SIT ? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textIs(testData.status.Approved),
            await ensure(_PaymentsPages.demandDraftPaymentPage.paymentTypeValue).textContains(testData.DemandDraft.DDPaymentTypeName),
            await ensure(_PaymentsPages.demandDraftPaymentPage.payableToValue1).textContains(testData.DemandDraft.payableTo),
        ]);
    });

    // it('Create & Copy Demand Draft', async function () {
    //     //Create
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await logger.info(" Create & Copy Demand Draft step_1")
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await logger.info(" Create & Copy Demand Draft step_2")
    //     await _PaymentsPages.demandDraftPaymentPage.demandDraftPayment.click();
    //     await logger.info(" Create & Copy Demand Draft step_3")
    //     await _PaymentsPages.AccountTransferPage.loadCondition();
    //     await logger.info(" Create & Copy Demand Draft step_4")
    //     await fillUpFields(false);
    //     await logger.info(" Create & Copy Demand Draft step_5")
    //     await _PaymentsPages.AccountTransferPage.nextButton.click();
    //     await logger.info(" Create & Copy Demand Draft step_6")
    //     await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    //     await logger.info(" Create & Copy Demand Draft step_7")
    //     await _PaymentsPages.AccountTransferPage.submitButton.click();
    //     await logger.info(" Create & Copy Demand Draft step_8")
    //     await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    //     await logger.info(" Create & Copy Demand Draft step_9")
    //     await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference4 = text;
    //         console.log(reference4);
    //     });
    //     await logger.info(" Create & Copy Demand Draft step_10")
    //     //Copy
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await logger.info(" Create & Copy Demand Draft step_11")
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await logger.info(" Create & Copy Demand Draft step_11")
    //     if (0 !== reference4.trim().length) {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
    //         await logger.info(" Create & Copy Demand Draft step_11-1")
    //     } else {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Demand Draft", testData.status.PendingApproval);
    //         await logger.info(" Create & Copy Demand Draft step_11-2")
    //     }
    //     await logger.info(" Create & Copy Demand Draft step_12")
    //     await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
    //     await logger.info(" Create & Copy Demand Draft step_13")
    //     await _PaymentsPages.AccountTransferPage.scrollToBottom();
    //     await logger.info(" Create & Copy Demand Draft step_14")
    //     await _PaymentsPages.AccountTransferPage.copyButton.click();
    //     await logger.info(" Create & Copy Demand Draft step_15")
    //     await _PaymentsPages.AccountTransferPage.loadCondition();
    //     await logger.info(" Create & Copy Demand Draft step_16")
    //     await _PaymentsPages.AccountTransferPage.nextButton.click();
    //     await logger.info(" Create & Copy Demand Draft step_17")
    //     await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    //     await logger.info(" Create & Copy Demand Draft step_18")
    //     await _PaymentsPages.AccountTransferPage.submitButton.click();
    //     await logger.info(" Create & Copy Demand Draft step_19")
    //     await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    //     await logger.info(" Create & Copy Demand Draft step_20")
    //     await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference4 = text;
    //         console.log(reference4);
    //     });
    //     await logger.info(" Create & Copy Demand Draft step_21")
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await logger.info(" Create & Copy Demand Draft step_22")
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await logger.info(" Create & Copy Demand Draft step_23")
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
    //     await logger.info(" Create & Copy Demand Draft step_24")
    //     await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
    //     await logger.info(" Create & Copy Demand Draft step_25")
    //     await Promise.all([
    //         await ensure(_PaymentsPages.demandDraftPaymentPage.pickupLocationValue).textContains(testData.DemandDraft.pickupLocation),
    //     ]);
    //     await logger.info(" Create & Copy Demand Draft step_26")
    // });

    // it('Make Demand Draft payment from template', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName1);
    //     await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
    //     await _PaymentsPages.AccountTransferPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.scrollTo(0,1500);
    //     await _PaymentsPages.demandDraftPaymentPage.pickupLocation.select(testData.DemandDraft.pickupLocation);
    //     await _PaymentsPages.AccountTransferPage.nextButton.click();
    //     await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    //     await _PaymentsPages.AccountTransferPage.submitButton.click();
    //     await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
    //         reference4 = text;
    //         console.log(reference4);
    //     });
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
    //     await _PaymentsPages.demandDraftPaymentPage.loadConditionForViewPage();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.demandDraftPaymentPage.pickupLocationValue).textContains(testData.DemandDraft.pickupLocation),
    //     ]);
    // });

    it('create DD payee with Payee Address line 1 let blank', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.createNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.BeneficiaryPage.loadConditionForCreateBenePage();
        await _PaymentsPages.BeneficiaryPage.selectedCountry.select(testData.DemandDraft.Country);
        let chequePayeeName = 'chequePayee' + generatedID();
        await _PaymentsPages.BeneficiaryPage.newPayeeName.input(chequePayeeName);
        await _PaymentsPages.BeneficiaryPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
        await console.log(chequePayeeName);
        await _PaymentsPages.BeneficiaryPage.chequeOrDemand.jsClick();
        await _PaymentsPages.BeneficiaryPage.ddPaymentOption.jsClick();
        await _PaymentsPages.BeneficiaryPage.printedName.input(testData.DemandDraft.chequeDDPrintedName);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.addr1ErrMsg).textContains(testData.DemandDraft.payeeAddr1ErrMsg)
        ]);
    });

    it('Create Demand Draft with new payee, then let Payee Address line 1 blank and Pick Up Location blank', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.demandDraftPaymentPage.demandDraftPayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await fillUpFieldsWithoutField();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.demandDraftPaymentPage.addr1ErrMsg).textContains(testData.DemandDraft.payeeAddr1ErrMsg),
            await ensure(_PaymentsPages.demandDraftPaymentPage.pickUpLocationErrMsg).textContains(testData.DemandDraft.pickUpLocationErrMsg)
        ]);
    });

});

async function fillUpFields(isTemplate: boolean) {
    await _PaymentsPages.demandDraftPaymentPage.fromAccount.select(SIT? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3);
    await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.demandDraftPaymentPage.paymentCurrency.select("SGD");
    await _PaymentsPages.demandDraftPaymentPage.payableCountry.select("BN");
    await _PaymentsPages.demandDraftPaymentPage.amount.input(testData.DemandDraft.amountA1);
    if (isTemplate) {
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.DemandDraft.amountA1);
    }
    await existingBeneficiary(testData.DemandDraft.newBeneficiaryName);
    await _PaymentsPages.demandDraftPaymentPage.pickupLocation.select(testData.DemandDraft.pickupLocation);
}

async function existingBeneficiary(existingPayee: string) {
    await _PaymentsPages.demandDraftPaymentPage.existingBeneficiary.select(existingPayee);
}

async function fillUpFieldswithNewPayee(isTemplate: boolean) {
    await _PaymentsPages.demandDraftPaymentPage.fromAccount.select(SIT? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3);
    await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.demandDraftPaymentPage.paymentCurrency.select(testData.DemandDraft.paymentCCY);
    await _PaymentsPages.demandDraftPaymentPage.payableCountry.select(testData.DemandDraft.payableCountry);
    await _PaymentsPages.demandDraftPaymentPage.amount.input(testData.DemandDraft.amountA1);
    if (isTemplate) {
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.DemandDraft.amountA1);
    }
    // await existingBeneficiary(testData.DemandDraft.newBeneficiaryName);
    let newPayeeName='newPayeeName'+generatedID();
    let newPayeeNickname='newPayeeNickname' + generatedID();
    await _PaymentsPages.demandDraftPaymentPage.newPayeeTab.click();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.demandDraftPaymentPage.payeeName.input(newPayeeName);
    await _PaymentsPages.demandDraftPaymentPage.newPayeeNickname.input(newPayeeNickname);
    await _PaymentsPages.demandDraftPaymentPage.payeeAddress1.input(testData.DemandDraft.newPayeeAddress1);
    await _PaymentsPages.demandDraftPaymentPage.payableTo.input(testData.DemandDraft.payableTo);
    await _PaymentsPages.demandDraftPaymentPage.pickupLocation.select(testData.DemandDraft.pickupLocation);
}

async function fillUpFieldsWithoutField() {
    await _PaymentsPages.demandDraftPaymentPage.fromAccount.select(SIT? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3);
    await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.demandDraftPaymentPage.paymentCurrency.select(testData.DemandDraft.paymentCCY);
    await _PaymentsPages.demandDraftPaymentPage.payableCountry.select(testData.DemandDraft.payableCountry);
    await _PaymentsPages.demandDraftPaymentPage.amount.input(testData.DemandDraft.amountA1);
    await _PaymentsPages.demandDraftPaymentPage.newPayeeTab.click();
    await _PaymentsPages.BeneficiaryPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.demandDraftPaymentPage.payeeName.input(testData.DemandDraft.newPayeeName);
    await _PaymentsPages.demandDraftPaymentPage.newPayeeNickname.input(testData.DemandDraft.newPayeeNickname);
    await _PaymentsPages.demandDraftPaymentPage.payableTo.input(testData.DemandDraft.payableTo);
}


export async function checkViewOnlinePageAllField(isEdit = false) {
    await Promise.all([
        await ensure(_PaymentsPages.demandDraftPaymentPage.fromAccountValue).textContains(SIT? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3),
        await ensure(_PaymentsPages.demandDraftPaymentPage.statusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.demandDraftPaymentPage.payableToValueNew).textIs(testData.DemandDraft.existingPayeeName),
        //Add all field  
        await ensure(_PaymentsPages.demandDraftPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.deductAmount).textContains(isEdit ? testData.DemandDraft.editAmount : testData.DemandDraft.amountA1),
        await ensure(_PaymentsPages.demandDraftPaymentPage.existingPayeeNameValue).textContains(testData.DemandDraft.existingPayeeName),
        await ensure(_PaymentsPages.demandDraftPaymentPage.payeeAdd1Value).textContains(testData.DemandDraft.newBeneficiaryAddress1),
        await ensure(_PaymentsPages.demandDraftPaymentPage.paymentCcyValue).textContains(testData.DemandDraft.paymentCCY),
        await ensure(_PaymentsPages.demandDraftPaymentPage.payableCountryValue).textContains(testData.DemandDraft.payableCountry),
        await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.chargeAccountValue).textContains(SIT ? testData.DemandDraft.SIT.toAccountI3 : testData.DemandDraft.UAT.toAccountI3),
        await ensure(_PaymentsPages.demandDraftPaymentPage.paymentTypeValue).textContains(testData.DemandDraft.paymentTypeValue),
        await ensure(_PaymentsPages.demandDraftPaymentPage.sendAmountValue).textContains(isEdit ? testData.DemandDraft.editAmount : testData.DemandDraft.amountA1),
        await ensure(_PaymentsPages.demandDraftPaymentPage.exchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.deliveryModeValue).textContains(testData.DemandDraft.deliveryMethod),
        await ensure(_PaymentsPages.demandDraftPaymentPage.mailNameValue).textContains(testData.DemandDraft.existingPayeeName),
        await ensure(_PaymentsPages.demandDraftPaymentPage.mailAdd1Value).textContains(testData.DemandDraft.newBeneficiaryAddress1),
        await ensure(_PaymentsPages.demandDraftPaymentPage.pickupLocationValue).textContains(testData.DemandDraft.pickupLocation),
        await ensure(_PaymentsPages.demandDraftPaymentPage.paymentDetailsValue).textContains(testData.DemandDraft.paymentDetail),
        await ensure(_PaymentsPages.demandDraftPaymentPage.deductTotalAmountValue).textContains(isEdit ? testData.DemandDraft.editAmount : testData.DemandDraft.amountA1),
        await ensure(_PaymentsPages.demandDraftPaymentPage.custRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.msgToApproverValue).textContains(testData.DemandDraft.transactionNote),
        await ensure(_PaymentsPages.demandDraftPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.demandDraftPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT)(
        await ensure(_PaymentsPages.demandDraftPaymentPage.balanceValue).isNotEmpty()
    )
}