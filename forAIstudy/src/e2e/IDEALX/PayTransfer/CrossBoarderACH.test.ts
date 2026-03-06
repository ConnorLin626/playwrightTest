/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages, FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let fileName: string = null;
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/SG_uploadTestData.json');
let referenceEdit = '';
let reference = '';

describe('Cross Border Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CrossBorder.SIT.login.loginCompanyId : testData.CrossBorder.UAT.login.loginCompanyId, SIT ? testData.CrossBorder.SIT.login.loginUserId : testData.CrossBorder.UAT.login.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a Cross Border ACH Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(testData.CrossBorder.paymentCountry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.addExistingPayee(SIT ? testData.CrossBorder.SIT.existingFilterValue : testData.CrossBorder.UAT.existingFilterValue);
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amount);
        await _PaymentsPages.CrossBoarderACHPage.paymentDetail.input(testData.CrossBorder.paymentDetail);
        await _PaymentsPages.CrossBoarderACHPage.showOptionDetail.click();
        await _PaymentsPages.CrossBoarderACHPage.IntermediaryBankInformation.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.selectedIntermediaryCountry.select(testData.CrossBorder.IntermediaryCountry);
        await _PaymentsPages.CrossBoarderACHPage.payeeBankID.input(SIT ? testData.CrossBorder.SIT.bankID : testData.CrossBorder.UAT.bankID);
        await _PaymentsPages.CrossBoarderACHPage.MessageToPayee.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.Email1.input(testData.CrossBorder.Email1);
        await _PaymentsPages.CrossBoarderACHPage.Email2.input(testData.CrossBorder.Email2);
        await _PaymentsPages.CrossBoarderACHPage.Email3.input(testData.CrossBorder.Email3);
        await _PaymentsPages.CrossBoarderACHPage.Email4.input(testData.CrossBorder.Email4);
        await _PaymentsPages.CrossBoarderACHPage.Email5.input(testData.CrossBorder.Email5);
        await _PaymentsPages.CrossBoarderACHPage.Message.input(testData.CrossBorder.Message);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await checkViewOnlinePageAllField(false); //Add for IDXP-812
    });

    it('Edit a Cross Border ACH Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("Cross Border ACH", testData.status.PendingApproval);
        }
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await _PaymentsPages.CrossBoarderACHPage.editButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.amount.clean();
        await _PaymentsPages.CrossBoarderACHPage.amount.input(testData.CrossBorder.amountV);
        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
            console.log(referenceEdit);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        if (referenceEdit == reference) {
            await checkViewOnlinePageAllField(true);//Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAmt1).textContains(testData.CrossBorder.amountV),
            ]);
        }

    });

    it('Upload a Cross Border ACH Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.CrossBorder.SIT.fileService.fileName : testData.CrossBorder.UAT.fileService.fileName, "By transaction amount").then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        // await _PaymentsPages.CrossBoarderACHPage.loadCondition4ViewPayment();

        await checkViewPageAllField();// IDXP-812
    });

    it('Approve a Cross Border ACH Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await _PaymentsPages.CrossBoarderACHPage.approveButton.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CrossBoarderACHPage.challengeResponse.input(testData.CrossBorder.responseCode);
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.CrossBoarderACHPage.approveButton.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.Approved),
        ]);
    });

    it('Create an INTL Cross Border ACH Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.crossBorderMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(testData.CrossBorder.paymentCountryINTL);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.addINTLNewPayee(testData.CrossBorder.payeeNameINTL, testData.CrossBorder.payeeBankIDINTL, testData.CrossBorder.accountNumberINTL);
        // await _PaymentsPages.CrossBoarderACHPage.addINTLNewPayee(testData.CrossBorder.payeeNameINTL1, testData.CrossBorder.payeeBankIDINTL1, testData.CrossBorder.accountNumberINTL1);
        await _PaymentsPages.CrossBoarderACHPage.loadCondition();
        await _PaymentsPages.CrossBoarderACHPage.addpayee.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amountINTL);
        await _PaymentsPages.CrossBoarderACHPage.purposePaymentLine.input(testData.CrossBorder.purposePaymentLine1);
        await _PaymentsPages.CrossBoarderACHPage.additionalInfoLine.input(testData.CrossBorder.additionalInfoLine1);
        await _PaymentsPages.CrossBoarderACHPage.showHideDetail.click();
        await _PaymentsPages.CrossBoarderACHPage.paymentDetailLine.input(testData.CrossBorder.paymentDetailLine1);

        await _PaymentsPages.CrossBoarderACHPage.nextButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.submitButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4Preview();
        await _PaymentsPages.CrossBoarderACHPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CrossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.CrossBorder.amountINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.paymentDateView).isNotEmpty(),
            await ensure(_PaymentsPages.CrossBoarderACHPage.ExistingPayee).textContains(testData.CrossBorder.payeeNameINTL),
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Upload an INTL Cross Border ACH Payment--By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.CrossBorder.SIT.fileService.fileNameINTL : testData.CrossBorder.UAT.fileService.fileNameINTL, SIT ? testData.CrossBorder.SIT.fileService.approvalCurrency : testData.CrossBorder.UAT.fileService.approvalCurrency).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);

        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.CrossBoarderACHPage.paymentDateView).isNotEmpty(),
            await ensure(_PaymentsPages.CrossBoarderACHPage.ExistingPayee).isNotEmpty(),
            await ensure(_PaymentsPages.CrossBoarderACHPage.crsBrdTransactionStatusValue).isNotEmpty(),
        ]);
    });

    // R8.14 IDXP-768 Crotia + EUR
    it('Upload an INTL Cross Border ACH Payment with croatia', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.CrossBorder.SIT.fileService.fileNameHRV : testData.CrossBorder.UAT.fileService.fileNameHRV, SIT ? testData.CrossBorder.SIT.fileService.approvalCurrency : testData.CrossBorder.UAT.fileService.approvalCurrency).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);

        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains("EUR"),
        ]);
    });
    
    it('Approve File an INTL Cross Border ACH Payment', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        await _PaymentsPages.CrossBoarderACHPage.goToMyApprovalByFileViewFile(fileName);
        await _ApprovalsPages.ApprovalPage.viewFileApproveAll.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.CrossBorder.responseCode);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4MyApprovalCompleted();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.myApproveFileStatus).textIs(testData.status.Approved),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.CrossBoarderACHPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountValue).textContains(SIT ?uploadTestData.ACH.fromAccount : uploadTestData.ACH.UAT.fromAccount),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeArea).textContains(uploadTestData.ACH.payeeArea),
        await ensure(_PaymentsPages.CrossBoarderACHPage.deductedAmt).textContains(uploadTestData.ACH.amountValue),
        await ensure(_PaymentsPages.CrossBoarderACHPage.debitTypeValue).textContains(uploadTestData.ACH.debitType),
        await ensure(_PaymentsPages.CrossBoarderACHPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.internalRef).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.statusValue).textContains(uploadTestData.status.PendingApproval),
        // Payee1
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeName1).textContains(uploadTestData.ACH.payeeName1),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeBankCode1).textContains(uploadTestData.ACH.payeeBankCode1),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAcctNum1).textContains(uploadTestData.ACH.payeeAcctNum1),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAmt1).textContains(uploadTestData.ACH.payeeAmt1),
        await _PaymentsPages.CrossBoarderACHPage.showOptBtn1.jsClick(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.paymentDetails1).textContains(uploadTestData.ACH.paymentDetails1),
        await ensure(_PaymentsPages.CrossBoarderACHPage.message1).textContains(uploadTestData.ACH.message1),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(uploadTestData.ACH.emailId10),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(uploadTestData.ACH.emailId11),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(uploadTestData.ACH.emailId12),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(uploadTestData.ACH.emailId12),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(uploadTestData.ACH.emailId14),

        // Payee2
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeName2).textContains(uploadTestData.ACH.payeeName2),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeBankCode2).textContains(uploadTestData.ACH.payeeBankCode2),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAcctNum2).textContains(uploadTestData.ACH.payeeAcctNum2),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAmt2).textContains(uploadTestData.ACH.payeeAmt2),
        await _PaymentsPages.CrossBoarderACHPage.showOptBtn2.jsClick(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.paymentDetails2).textContains(uploadTestData.ACH.paymentDetails2),
        await ensure(_PaymentsPages.CrossBoarderACHPage.message2).textContains(uploadTestData.ACH.message2),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList2).textContains(uploadTestData.ACH.emailId20),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList2).textContains(uploadTestData.ACH.emailId21),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList2).textContains(uploadTestData.ACH.emailId22),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList2).textContains(uploadTestData.ACH.emailId22),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList2).textContains(uploadTestData.ACH.emailId24)
    ]);
    if(SIT){
        await ensure(_PaymentsPages.CrossBoarderACHPage.balanceValue).isNotEmpty()
    }
}

export async function checkViewOnlinePageAllField(isEdit = false) {
    await Promise.all([
        await ensure(_PaymentsPages.CrossBoarderACHPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountValue).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeArea).textContains(testData.CrossBorder.paymentCountry),
        await ensure(_PaymentsPages.CrossBoarderACHPage.deductedAmt).textContains(isEdit ? testData.CrossBorder.amountV : testData.CrossBorder.amount),
        await ensure(_PaymentsPages.CrossBoarderACHPage.debitTypeValue).textContains(testData.CrossBorder.debitType),
        await ensure(_PaymentsPages.CrossBoarderACHPage.contractRef).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.indicativeExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.amountToTransfer).textContains(isEdit ? testData.CrossBorder.amountV : testData.CrossBorder.amount),
        await ensure(_PaymentsPages.CrossBoarderACHPage.amountToDeduct).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.internalRef).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.statusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeName1).textContains(SIT ? testData.CrossBorder.SIT.existingFilterValue : testData.CrossBorder.UAT.existingFilterValue),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeBankCode1).textContains(SIT ? testData.CrossBorder.SIT.payeeBankCodeValue : testData.CrossBorder.UAT.payeeBankCodeValue),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeBankName1).textContains(SIT ? testData.CrossBorder.SIT.payeeBankNameValue : testData.CrossBorder.UAT.payeeBankNameValue),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAcctNum1).textContains(testData.CrossBorder.accountNumberINTL),
        await ensure(_PaymentsPages.CrossBoarderACHPage.payeeAmt1).textContains(isEdit ? testData.CrossBorder.amountV : testData.CrossBorder.amount),
        await _PaymentsPages.CrossBoarderACHPage.showOptBtn1.jsClick(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.paymentDetails1).textContains(testData.CrossBorder.paymentDetail),
        await ensure(_PaymentsPages.CrossBoarderACHPage.message1).textContains(testData.CrossBorder.Message),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(testData.CrossBorder.Email1),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(testData.CrossBorder.Email2),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(testData.CrossBorder.Email3),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(testData.CrossBorder.Email4),
        await ensure(_PaymentsPages.CrossBoarderACHPage.emailList1).textContains(testData.CrossBorder.Email5),
        await ensure(_PaymentsPages.CrossBoarderACHPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.CrossBoarderACHPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT)(
         await ensure(_PaymentsPages.CrossBoarderACHPage.balanceValue).isNotEmpty()
    )
}