/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, handlerCase, PROJECT_TYPE, SIT } from '../../../lib';
import { browser } from 'protractor';


let reference = "";
let reference2 = "";
let CorporateChequereference = "";
// this from copy,then Verify/Approval/Release/Delete
let reference3 = "";
let templateName = "";
let referenceEdit = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Express Cheque Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ChequePayment.SIT.loginCompanyId : testData.ChequePayment.UAT.loginCompanyId, SIT ? testData.ChequePayment.SIT.loginUserId : testData.ChequePayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a express cheque Payment with multi payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.chequePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.fromAccount.select(SIT? testData.ChequePayment.SIT.fromAccount:testData.ChequePayment.UAT.fromAccount);
        //await _PaymentsPages.chequePaymentPage.chequeTypeRadio.select(testData.ChequePayment.chequeType_ChequeExpress);
        await _PaymentsPages.chequePaymentPage.addExistingPayee(
            testData.ChequePayment.existingPayee,
            testData.ChequePayment.amountA1,
            testData.ChequePayment.payeeRef);
        await _PaymentsPages.chequePaymentPage.showOptDetail_0.click();
        await _PaymentsPages.chequePaymentPage.PrintAtLocation.select(testData.ChequePayment.printAtLocationValue);
        await _PaymentsPages.chequePaymentPage.InvoiceDetails.input(testData.ChequePayment.InvoiceDetailsValue);
        await _PaymentsPages.chequePaymentPage.clientReference1.input(testData.ChequePayment.clientReference1Value);
        await _PaymentsPages.chequePaymentPage.clientReference2.input(testData.ChequePayment.clientReference2Value);
        await _PaymentsPages.chequePaymentPage.clientReference3.input(testData.ChequePayment.clientReference3Value);
        await _PaymentsPages.chequePaymentPage.clientReference4.input(testData.ChequePayment.clientReference4Value);
        await _PaymentsPages.chequePaymentPage.paymentdetails.input(testData.ChequePayment.paymentdetailsValue);
        // let payeeNickName="payeeNick"+generatedID();
        await _PaymentsPages.chequePaymentPage.addNewPayee(
            testData.ChequePayment.payeeName1,
            testData.ChequePayment.payeeName1,
            testData.ChequePayment.newPayeeAdd1,
            testData.ChequePayment.amountA1_1,
            testData.ChequePayment.payeeRef,
            testData.ChequePayment.printName);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        console.log(reference2);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await checkViewChequeExpressPageAllField(false);//Add for IDXP-812
    });


    it('Edit express cheque Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Cheque Express", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.chequePaymentPage.editButton.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.scrollTo(500, 1500)
        await _PaymentsPages.chequePaymentPage.deleteDetailButton.click();
        await _PaymentsPages.chequePaymentPage.addExistingPayee(
            testData.ChequePayment.existingPayeeEdit,
            testData.ChequePayment.amountA1,
            testData.ChequePayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click()
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        if (referenceEdit = reference2) {
            await checkViewChequeExpressPageAllField(true);//Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.chequePaymentPage.payeeAmount).textContains(testData.ChequePayment.amountA1),
            ]);
        }
    });

    it('Create express cheque Payment and Approve now', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.chequePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.fromAccount.select(SIT? testData.ChequePayment.SIT.fromAccount:testData.ChequePayment.UAT.fromAccount);
        //await _PaymentsPages.chequePaymentPage.chequeTypeRadio.select(testData.ChequePayment.chequeType_ChequeExpress);
        await _PaymentsPages.chequePaymentPage.addExistingPayee(
            testData.ChequePayment.existingPayee,
            testData.ChequePayment.amountA1,
            testData.ChequePayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
        await ensure(_PaymentsPages.BulkPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT? testData.ChequePayment.SIT.fromAccount:testData.ChequePayment.UAT.fromAccount),
            await ensure(_PaymentsPages.chequePaymentPage.referenceView).textContains(reference),
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Approve express cheque Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Cheque Express", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.scrollToBottom();
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
        await browser.sleep(2000);
        await _PaymentsPages.BulkPaymentPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.approveButton.jsClickIfExist();
        await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create & Reject express cheque Payment', async function () {
        //Create
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.chequePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.chequePaymentPage.fromAccount.select(SIT? testData.ChequePayment.SIT.fromAccount:testData.ChequePayment.UAT.fromAccount);
        //await _PaymentsPages.chequePaymentPage.chequeTypeRadio.select(testData.ChequePayment.chequeType_ChequeExpress);
        await _PaymentsPages.chequePaymentPage.addExistingPayee(
            testData.ChequePayment.existingPayee,
            testData.ChequePayment.amountA1,
            testData.ChequePayment.payeeRef);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        //Reject
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Cheque Express", testData.status.PendingApproval);
        }
        await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.BulkPaymentPage.reasonForRejection.input("reasonForRejection");
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

    it('Delete express cheque Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference3.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Cheque Express", testData.status.PendingApproval);
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

export async function checkViewChequeExpressPageAllField(isEdit = false) {
    await Promise.all([

        await ensure(_PaymentsPages.chequePaymentPage.fromAccountView).textContains(SIT? testData.ChequePayment.SIT.fromAccount:testData.ChequePayment.UAT.fromAccount),
        await ensure(_PaymentsPages.chequePaymentPage.referenceView).textContains(isEdit ? referenceEdit : reference2),
        await ensure(_PaymentsPages.chequePaymentPage.deductedAmountValue).textContains(isEdit ? testData.ChequePayment.editAmountView : testData.ChequePayment.amountView),
        await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        //Add all field  
        await ensure(_PaymentsPages.chequePaymentPage.hashValueView).isNotEmpty(),
        await ensure(_PaymentsPages.chequePaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.chequePaymentPage.paymentTypeValue).textContains(testData.ChequePayment.chequeTypeValue_ChequeExpress),
        await ensure(_PaymentsPages.chequePaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.chequePaymentPage.totalAmount).textContains(isEdit ? testData.ChequePayment.totleEditAmountView : testData.ChequePayment.totleAmountView),
        //payee 1
        await ensure(_PaymentsPages.chequePaymentPage.chequeName).textContains(isEdit ? testData.ChequePayment.existingPayee : testData.ChequePayment.printName),
        await ensure(_PaymentsPages.chequePaymentPage.chequeNickName).textContains(isEdit ? testData.ChequePayment.existingPayee : testData.ChequePayment.payeeName1),
        await ensure(_PaymentsPages.chequePaymentPage.chequeNum).textContains(testData.ChequePayment.chequeNumValue),
        await ensure(_PaymentsPages.chequePaymentPage.deliveryMethod).textContains(isEdit ? testData.ChequePayment.deliveryMethod2Value : testData.ChequePayment.deliveryMethod1Value),
        await ensure(_PaymentsPages.chequePaymentPage.deliveryAdd).textContains(isEdit ? testData.ChequePayment.existingPayeeAdd1 : testData.ChequePayment.newPayeeAdd1),
        await ensure(_PaymentsPages.chequePaymentPage.pendingStatus).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.chequePaymentPage.payeeAmount).textContains(isEdit ? testData.ChequePayment.amountA1 : testData.ChequePayment.amountA1_1),
        await ensure(_PaymentsPages.chequePaymentPage.refForPayee).textContains(testData.ChequePayment.payeeRef),
        //payee 2
        await ensure(_PaymentsPages.chequePaymentPage.chequeName2).textContains(isEdit ? testData.ChequePayment.existingPayee : testData.ChequePayment.existingPayee),
        await ensure(_PaymentsPages.chequePaymentPage.chequeNickName2).textContains(isEdit ? testData.ChequePayment.existingPayee : testData.ChequePayment.existingPayee),
        await ensure(_PaymentsPages.chequePaymentPage.chequeNum2).textContains(testData.ChequePayment.chequeNumValue),
        await ensure(_PaymentsPages.chequePaymentPage.deliveryMethod2).textContains(isEdit ? testData.ChequePayment.deliveryMethod2Value : testData.ChequePayment.deliveryMethod2Value),
        await ensure(_PaymentsPages.chequePaymentPage.deliveryAdd2).textContains(isEdit ? testData.ChequePayment.existingPayeeAdd1 : testData.ChequePayment.existingPayeeAdd1),
        await ensure(_PaymentsPages.chequePaymentPage.pendingStatus2).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.chequePaymentPage.payeeAmount2).textContains(isEdit ? testData.ChequePayment.amountA1 : testData.ChequePayment.amountA1),
        await ensure(_PaymentsPages.chequePaymentPage.refForPayee2).textContains(testData.ChequePayment.payeeRef),

        await _PaymentsPages.chequePaymentPage.showOptionView2.click(),
        await ensure(_PaymentsPages.chequePaymentPage.printAtLocation2).textContains(testData.ChequePayment.printAtLocationValue),
        await ensure(_PaymentsPages.chequePaymentPage.invoiceDetails2).textContains(testData.ChequePayment.InvoiceDetailsValue),
        await ensure(_PaymentsPages.chequePaymentPage.clientRef11).textContains(testData.ChequePayment.clientReference1Value),
        await ensure(_PaymentsPages.chequePaymentPage.clientRef21).textContains(testData.ChequePayment.clientReference2Value),
        await ensure(_PaymentsPages.chequePaymentPage.clientRef31).textContains(testData.ChequePayment.clientReference3Value),
        await ensure(_PaymentsPages.chequePaymentPage.clientRef41).textContains(testData.ChequePayment.clientReference4Value),
        await ensure(_PaymentsPages.chequePaymentPage.paymentDetails2).textContains(testData.ChequePayment.paymentdetailsValue),
        await ensure(_PaymentsPages.chequePaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.chequePaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}

//since IDXP-2100 CCH been removed comment out below case
// describe('SG_Corporation Cheque Payments', async function () {
//     this.retries(browser.params.caseRetryTimes);
//     before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ChequePayment.SIT.loginCompanyId : testData.ChequePayment.UAT.loginCompanyId, SIT ? testData.ChequePayment.SIT.loginUserId : testData.ChequePayment.UAT.loginUserId, "123123"); });
//     const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

//     it('Create Corporate cheque Payment', async function () {
//         await _PaymentsPages.AccountTransferPage.paymentMenu.click();
//         await _PaymentsPages.TransferCentersPage.loadCondition();
//         await _PaymentsPages.chequePaymentPage.chequePayment.click();
//         await _PaymentsPages.AccountTransferPage.loadCondition();
//         await _PaymentsPages.chequePaymentPage.fromAccount.select(testData.ChequePayment.fromAccount);
//         await _PaymentsPages.chequePaymentPage.chequeTypeRadio.select(testData.ChequePayment.chequeType_CorporateCheque);
//         await _PaymentsPages.chequePaymentPage.addExistingPayee(
//             testData.ChequePayment.existingPayee,
//             testData.ChequePayment.amountA1,
//             testData.ChequePayment.payeeRef);
//         await _PaymentsPages.chequePaymentPage.showOptDetail_0.click();
//         await _PaymentsPages.chequePaymentPage.PrintAtLocation.select(testData.ChequePayment.printAtLocationValue);
//         await _PaymentsPages.chequePaymentPage.InvoiceDetails.input(testData.ChequePayment.InvoiceDetailsValue);
//         await _PaymentsPages.chequePaymentPage.clientReference1.input(testData.ChequePayment.clientReference1Value);
//         await _PaymentsPages.chequePaymentPage.clientReference2.input(testData.ChequePayment.clientReference2Value);
//         await _PaymentsPages.chequePaymentPage.clientReference3.input(testData.ChequePayment.clientReference3Value);
//         await _PaymentsPages.chequePaymentPage.clientReference4.input(testData.ChequePayment.clientReference4Value);
//         await _PaymentsPages.chequePaymentPage.paymentdetails.input(testData.ChequePayment.paymentdetailsValue);
//         await _PaymentsPages.BulkPaymentPage.nextButton.click();
//         await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
//         await _PaymentsPages.BulkPaymentPage.submitButton.click();
//         await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
//         await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
//             CorporateChequereference = text;
//             console.log(CorporateChequereference);
//         });
//         await _PaymentsPages.AccountTransferPage.paymentMenu.click()
//         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(CorporateChequereference);
//         await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
//         await checkViewCorporateExpressPageAllField(false);//Add for IDXP-812

//     });

//     it('Edit a Corporate Cheque Payment', async function () {
//         await _PaymentsPages.AccountTransferPage.paymentMenu.click();
//         await _PaymentsPages.TransferCentersPage.loadCondition();
//         if (0 !== CorporateChequereference.trim().length) {
//             await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(CorporateChequereference);
//         } else {
//             await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Corporate Cheque", testData.status.PendingApproval);
//         }
//         await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
//         await _PaymentsPages.chequePaymentPage.editButton.click();
//         await _PaymentsPages.AccountTransferPage.loadCondition();
//         await _PaymentsPages.chequePaymentPage.scrollTo(400, 1100)
//         await _PaymentsPages.chequePaymentPage.amount.clean();
//         await _PaymentsPages.chequePaymentPage.amount.input(testData.ChequePayment.editAmountView);
//         await _PaymentsPages.BulkPaymentPage.nextButton.click();
//         await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
//         await _PaymentsPages.BulkPaymentPage.submitButton.click();
//         await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
//         await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
//             referenceEdit = text;
//         });
//         console.log(referenceEdit);
//         await _PaymentsPages.AccountTransferPage.paymentMenu.click()
//         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
//         await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
//         if (referenceEdit = CorporateChequereference) {
//             await checkViewCorporateExpressPageAllField(true);//Add for IDXP-812
//         } else {
//             await Promise.all([
//                 await ensure(_PaymentsPages.chequePaymentPage.payeeAmount).textContains(testData.ChequePayment.editAmountView),
//             ]);
//         }
//     });

//     it('Create Corporate Cheque Payment with Approve now', async function () {
//         await _PaymentsPages.AccountTransferPage.paymentMenu.click();
//         await _PaymentsPages.TransferCentersPage.loadCondition();
//         await _PaymentsPages.chequePaymentPage.chequePayment.click();
//         await _PaymentsPages.AccountTransferPage.loadCondition();
//         await _PaymentsPages.chequePaymentPage.fromAccount.select(testData.ChequePayment.fromAccount);
//         await _PaymentsPages.chequePaymentPage.chequeTypeRadio.select(testData.ChequePayment.chequeType_CorporateCheque);
//         await _PaymentsPages.chequePaymentPage.addExistingPayee(
//             testData.ChequePayment.existingPayee,
//             testData.ChequePayment.amountA1,
//             testData.ChequePayment.payeeRef);
//         await _PaymentsPages.BulkPaymentPage.nextButton.click();
//         await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
//         await _PaymentsPages.BulkPaymentPage.approveNowCheckBox.jsClick();
//         await ensure(_PaymentsPages.BulkPaymentPage.getChallengeSMS).isVisible();
//         await _PaymentsPages.BulkPaymentPage.getChallengeSMS.click();
//         await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
//         await _PaymentsPages.BulkPaymentPage.submitButton.click();
//         await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
//         await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
//             reference = text;
//         });
//         await _PaymentsPages.AccountTransferPage.paymentMenu.click();
//         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
//         await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

//         await Promise.all([
//             await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(testData.ChequePayment.fromAccount),
//             await ensure(_PaymentsPages.chequePaymentPage.referenceView).textContains(reference),
//             await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
//         ]);
//     });

//     it('Create Corporate cheque Payment template', async function () {
//         await _PaymentsPages.AccountTransferPage.paymentMenu.click();
//         await _PaymentsPages.TransferCentersPage.loadCondition();
//         await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
//         await _PaymentsPages.PaymentTemplatesPage.loadCondition();
//         await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
//         await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
//         await _PaymentsPages.PaymentTemplatesPage.createSgCorChequeTemplateButton.click();
//         await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
//         templateName = 'CorporationCheque' + generatedID();
//         await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
//         await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(testData.ChequePayment.fromAccount);
//         await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.ChequePayment.amountA1);
//         await _PaymentsPages.chequePaymentPage.addExistingPayee(
//             testData.ChequePayment.existingPayee,
//             testData.ChequePayment.amountA1,
//             testData.ChequePayment.payeeRef);
//         await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
//         await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
//         await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
//         await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
//         await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
//         await _PaymentsPages.AccountTransferPage.paymentMenu.click();
//         await _PaymentsPages.TransferCentersPage.loadCondition();
//         await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
//         await _PaymentsPages.PaymentTemplatesPage.loadCondition();
//         await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
//         await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
//         await Promise.all([
//             await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(testData.ChequePayment.fromAccount),
//             await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContains(testData.status.Approved),
//             await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionPaymentType).textContains(testData.ChequePayment.chequeType_CorporateCheque)
//         ]);
//     });

    //due to approver new ui

    // it('Offline Approve Corporate Cheque Payment', async function () {
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.ApprovalPage.byFileFilter.input(reference2);
    //     await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
    //     await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
    //     await _ApprovalsPages.ApprovalPage.scrollToBottom();
    //     await _ApprovalsPages.ApprovalPage.groupApproverOption.select(testData.ChequePayment.approverOption);
    //     await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    //     await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.finishButton.jsClick();
    //     //await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
    //     await _ApprovalsPages.transferCentersPage.loadCondition();
    //     await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference2);
    //     await Promise.all([
    //         await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
    //     ]);
    // });

    // it('Create & Reject Corporate cheque Payment', async function () {
    //     //Create
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.chequePaymentPage.chequePayment.click();
    //     await _PaymentsPages.AccountTransferPage.loadCondition();
    //     await _PaymentsPages.chequePaymentPage.fromAccount.select(testData.ChequePayment.fromAccount);
    //     await _PaymentsPages.chequePaymentPage.chequeTypeRadio.select(testData.ChequePayment.chequeType_CorporateCheque);
    //     await _PaymentsPages.chequePaymentPage.addExistingPayee(
    //         testData.ChequePayment.existingPayee,
    //         testData.ChequePayment.amountA1,
    //         testData.ChequePayment.payeeRef);
    //     await _PaymentsPages.BulkPaymentPage.nextButton.click();
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
    //     await _PaymentsPages.BulkPaymentPage.submitButton.click();
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
    //         reference3 = text;
    //     });
    //     //Reject
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     if (0 !== reference3.trim().length) {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
    //     } else {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Corporate Cheque", testData.status.PendingApproval);
    //     }
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    //     await _PaymentsPages.BulkPaymentPage.rejectButton.jsClick();
    //     await _PaymentsPages.BulkPaymentPage.reasonForRejection.input("reasonForRejection");
    //     await _PaymentsPages.BulkPaymentPage.rejectDialogButton.click();
    //     // await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
    //     //     reference3 = text;
    //     // });
    //     await _PaymentsPages.BulkPaymentPage.dismissButton.click();
    //     // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();

    //     await Promise.all([
    //         await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.Rejected),
    //         await ensure(_PaymentsPages.BulkPaymentPage.referenceValue).textContains(reference3),
    //     ]);
    // });

    // it('Delete Corporate cheque Payment', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     if (0 !== reference3.trim().length) {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
    //     } else {
    //         await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Corporate Cheque", testData.status.PendingApproval);
    //     }
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    //     await _PaymentsPages.BulkPaymentPage.scrollToBottom();
    //     await _PaymentsPages.BulkPaymentPage.deleteButton.click();
    //     await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
    //     await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
    //         reference3 = text;
    //     });
    //     await ensure(_PaymentsPages.BulkPaymentPage).isUXRejectDialogSuccess();
    //     await _PaymentsPages.BulkPaymentPage.dismissButton.click();
    //     // await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference3);

    //     await Promise.all([
    //         await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
    //     ]);
    // });

    // //add for AB - 9011: Print name support special char
    // it('Create Corporate cheque Payment with new payee', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     //await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.chequePaymentPage.chequePayment.click();
    //     await _PaymentsPages.chequePaymentPage.loadCondition();
    //     await _PaymentsPages.chequePaymentPage.fromAccount.select(testData.ChequePayment.fromAccount);
    //     await _PaymentsPages.chequePaymentPage.chequeTypeRadio.select(testData.ChequePayment.chequeType_CorporateCheque);
    //     await _PaymentsPages.chequePaymentPage.addNewPayee(
    //         testData.ChequePayment.payeeName1,
    //         testData.ChequePayment.newPayeeAdd1,
    //         testData.ChequePayment.amountA1,
    //         testData.ChequePayment.payeeRef,
    //         testData.ChequePayment.printName);
    //     await _PaymentsPages.chequePaymentPage.nextButton.click();
    //     await _PaymentsPages.chequePaymentPage.loadConditionForPreviewPage();
    //     await _PaymentsPages.chequePaymentPage.submitButton.click();
    //     await _PaymentsPages.chequePaymentPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.chequePaymentPage.getIdealxInfoReferenceID().then(text => {
    //         reference2 = text;
    //         console.log(reference2);
    //     });
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click()
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
    //     await _PaymentsPages.chequePaymentPage.loadConditionForViewPaymentPage();

    //     await Promise.all([
    //         await ensure(_PaymentsPages.chequePaymentPage.fromAccountView).textContains(testData.ChequePayment.fromAccount),
    //         await ensure(_PaymentsPages.chequePaymentPage.printNameValue).textContains(testData.ChequePayment.printName),
    //         await ensure(_PaymentsPages.chequePaymentPage.referenceView).textContains(testData.ChequePayment.paymentType_CorporateCheque),
    //         await ensure(_PaymentsPages.chequePaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
    //     ]);

    // });

    //add for AB-9011:Print name support special char
    // it('Create Corporate cheque Payment template with new Payee', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
    //     await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
    //     await _PaymentsPages.PaymentTemplatesPage.createSgCorChequeTemplateButton.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
    //     templateName = 'CorporationCheque' + generatedID();
    //     await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
    //     await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(testData.ChequePayment.fromAccount);
    //     await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.ChequePayment.amountA1);
    //     let CCHPayeeName = 'CCHpayee' + generatedID();
    //     await _PaymentsPages.chequePaymentPage.addNewPayee(
    //         CCHPayeeName,
    //         testData.ChequePayment.newPayeeAdd1,
    //         testData.ChequePayment.amountA1,
    //         testData.ChequePayment.payeeRef,
    //         testData.ChequePayment.printName);
    //     await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
    //     await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
    //     await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    //     await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
    //     await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(testData.ChequePayment.fromAccount),
    //         await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContains(testData.status.Approved),
    //         await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionPaymentType).textContains(testData.ChequePayment.chequeType_CorporateCheque),
    //         await ensure(_PaymentsPages.chequePaymentPage.printNameValue).textContains(testData.ChequePayment.printName)
    //     ]);
    // });
//});

// export async function checkViewCorporateExpressPageAllField(isEdit = false) {
//     await Promise.all([

//         await ensure(_PaymentsPages.chequePaymentPage.fromAccountView).textContains(testData.ChequePayment.fromAccount),
//         await ensure(_PaymentsPages.chequePaymentPage.referenceView).textContains(isEdit ? referenceEdit : CorporateChequereference),
//         await ensure(_PaymentsPages.chequePaymentPage.deductedAmountValue).textContains(isEdit ? testData.ChequePayment.editAmountView : testData.ChequePayment.amountA1),
//         await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
//         //Add all field  
//         await ensure(_PaymentsPages.chequePaymentPage.hashValueView).isNotEmpty(),
//         await ensure(_PaymentsPages.chequePaymentPage.acctBalanceValue).isNotEmpty(),
//         await ensure(_PaymentsPages.chequePaymentPage.paymentTypeValue).textContains(testData.ChequePayment.chequeTypeValue_CorporateCheque),
//         await ensure(_PaymentsPages.chequePaymentPage.paymentDateValue).isNotEmpty(),
//         await ensure(_PaymentsPages.chequePaymentPage.totalAmount).textContains(isEdit ? testData.ChequePayment.totleEditAmountView : testData.ChequePayment.corporateTotleAmountView),
//         //payee 1
//         await ensure(_PaymentsPages.chequePaymentPage.chequeName).textContains(testData.ChequePayment.existingPayee),
//         await ensure(_PaymentsPages.chequePaymentPage.chequeNickName).textContains(testData.ChequePayment.existingPayee),
//         await ensure(_PaymentsPages.chequePaymentPage.chequeNum).textContains(testData.ChequePayment.chequeNumValue),
//         await ensure(_PaymentsPages.chequePaymentPage.deliveryMethod).textContains(testData.ChequePayment.deliveryMethod2Value),
//         await ensure(_PaymentsPages.chequePaymentPage.deliveryAdd).textContains(testData.ChequePayment.existingPayeeAdd1),
//         await ensure(_PaymentsPages.chequePaymentPage.pendingStatus).textContains(testData.status.PendingApproval),
//         await ensure(_PaymentsPages.chequePaymentPage.payeeAmount).textContains(isEdit ? testData.ChequePayment.editAmountView : testData.ChequePayment.amountA1),
//         await ensure(_PaymentsPages.chequePaymentPage.refForPayee).textContains(testData.ChequePayment.payeeRef),
//         await _PaymentsPages.chequePaymentPage.showOptionView.click(),
//         await ensure(_PaymentsPages.chequePaymentPage.printAtLocation).textContains(testData.ChequePayment.printAtLocationValue),
//         await ensure(_PaymentsPages.chequePaymentPage.invoiceDetails).textContains(testData.ChequePayment.InvoiceDetailsValue),
//         await ensure(_PaymentsPages.chequePaymentPage.clientRef10).textContains(testData.ChequePayment.clientReference1Value),
//         await ensure(_PaymentsPages.chequePaymentPage.clientRef20).textContains(testData.ChequePayment.clientReference2Value),
//         await ensure(_PaymentsPages.chequePaymentPage.clientRef30).textContains(testData.ChequePayment.clientReference3Value),
//         await ensure(_PaymentsPages.chequePaymentPage.clientRef40).textContains(testData.ChequePayment.clientReference4Value),
//         await ensure(_PaymentsPages.chequePaymentPage.paymentDetails).textContains(testData.ChequePayment.paymentdetailsValue),
//         await ensure(_PaymentsPages.chequePaymentPage.nextApprover).isNotEmpty(),
//         await ensure(_PaymentsPages.chequePaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
//     ]);
// }