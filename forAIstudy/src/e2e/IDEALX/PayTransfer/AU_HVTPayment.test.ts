
/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages, FilesPages } from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE, devWatch } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let paymentReference = '';
let templateName = '';
let approvalReference = '';
const lib_1 = require("../../../lib");
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let fileName = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('AU_testData.json');

let createNewPayee = async function (_PaymentsPages: PaymentsPages, isOtherBank: Boolean) {
    await _PaymentsPages.HVTPaymentPage.newPayeeTab.click();
    await _PaymentsPages.HVTPaymentPage.cognitiveContinueBtn.jsClickIfExist();
    await _PaymentsPages.HVTPaymentPage.Country.select(testData.HVTPayment.Country);
    await _PaymentsPages.HVTPaymentPage.payeeBankID.select(testData.HVTPayment.payeeBankID);
    await _PaymentsPages.HVTPaymentPage.newPayeeAcctNumber.input(testData.HVTPayment.newPayeeAcctNumber);
    await _PaymentsPages.HVTPaymentPage.newPayeeName.input(testData.HVTPayment.newPayeeName);
    await _PaymentsPages.HVTPaymentPage.newPayeeNickname.input(testData.HVTPayment.newPayeeNickname);
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
    await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    if (isOtherBank) {
        await _PaymentsPages.HVTPaymentPage.otherBankCheckBox.jsClick();
    }
    
}

let existingPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.HVTPaymentPage.existingPayee.select(testData.HVTPayment.existingPayee);
}

let fillHVTPaymentData = async function (_PaymentsPages: PaymentsPages, isCreate: Boolean, isOtherBank: Boolean, amountNum: string) {
    await _PaymentsPages.AccountTransferPage.makePayment.click();
    await _PaymentsPages.HVTPaymentPage.loadCondition();
    await _PaymentsPages.HVTPaymentPage.fromAccount.select(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount);
    await _PaymentsPages.HVTPaymentPage.amount.input(amountNum);
    if (isCreate) {
        await createNewPayee(_PaymentsPages, isOtherBank);
        await _PaymentsPages.HVTPaymentPage.setDateBtn.jsClick();
        await _PaymentsPages.HVTPaymentPage.HVTPaymentCheckBox.jsClick();
    } else {
        await existingPayee(_PaymentsPages);
        if(!SIT){
           await _PaymentsPages.HVTPaymentPage.setDateBtn.jsClick();
           await _PaymentsPages.HVTPaymentPage.HVTPaymentCheckBox.jsClick();
        }  

    }
    await _PaymentsPages.HVTPaymentPage.chargeUsCheckBox.jsClick();
}

describe('AU_HVT Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.HVTPayment.SIT.loginCompanyId : testData.HVTPayment.UAT.loginCompanyId, SIT ? testData.HVTPayment.SIT.loginUserId : testData.HVTPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a AU HVT Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await fillHVTPaymentData(_PaymentsPages, true, true, testData.HVTPayment.amountA2);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountA2),
            await ensure(_PaymentsPages.HVTPaymentPage.toAccountNumberValue).textContains(testData.HVTPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create a AU HVT Payment with ApprovalNow mChllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await fillHVTPaymentData(_PaymentsPages, false, false, testData.HVTPayment.amountA2);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.approvalNowCheckBox.jsClickIfExist();
        await _PaymentsPages.HVTPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.HVTPaymentPage.getChallengeButton.clickIfExist();
        await _PaymentsPages.HVTPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a AU HVT Payment without ApprovalNow mChllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await fillHVTPaymentData(_PaymentsPages, false, false, testData.HVTPayment.amountA1);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.HVTPaymentPage.pushOpion.jsClickIfExist();
        await _PaymentsPages.HVTPaymentPage.responseCode.input("222222");
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved),
        ]);
    });

    it('Create a AU HVT Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await fillHVTPaymentData(_PaymentsPages, false, false, testData.HVTPayment.amountA2);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.savaAsTemplateCheckBox.jsClick();
        templateName = 'HVTName' + generatedID();
        await _PaymentsPages.HVTPaymentPage.templateName.input(templateName);
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewhvtTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.templateNameValue).textContains(templateName),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountA2),
            await ensure(_PaymentsPages.HVTPaymentPage.toExistingPayeeNameValue).textContains(testData.HVTPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountA2),
            await ensure(_PaymentsPages.HVTPaymentPage.toExistingPayeeNameValue).textContains(testData.HVTPayment.existingPayee),
        ]);

    });

    it('Create a AU HVT Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.HVTPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.HVTPaymentPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.HVTPaymentPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.HVTPaymentPage.nextButton.jsClick();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HVTPaymentPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
        await _PaymentsPages.PaymentTemplatesPage.deleteTemplate(templateName);
    });

    it('Create a AU HVT with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await fillHVTPaymentData(_PaymentsPages, false, false, testData.HVTPayment.amountA2);
        await _PaymentsPages.HVTPaymentPage.saveAsDraft.click();
        await _PaymentsPages.HVTPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
            console.log("AUHVTRef1:"+paymentReference);
        });
        await console.log("AUHVTRef2:"+paymentReference);
        await _PaymentsPages.HVTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountA2),
            await ensure(_PaymentsPages.HVTPaymentPage.toExistingPayeeNameValue).textContains(testData.HVTPayment.existingPayee),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a AU HVT Payment Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("AU - High Value Domestic Payments", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.HVTPaymentPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.HVTPaymentPage.loadCondition();
        await _PaymentsPages.HVTPaymentPage.loadConditionForEditCopy();
        await _PaymentsPages.HVTPaymentPage.amount.clean();
        await _PaymentsPages.HVTPaymentPage.amount.input(testData.HVTPayment.amountV);
        await _PaymentsPages.HVTPaymentPage.paymentDetail.clean();
        await _PaymentsPages.HVTPaymentPage.paymentDetail.input("Copy" + testData.HVTPayment.paymentDetail);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountV),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Create a AU HVT Payment for Verify and Release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await fillHVTPaymentData(_PaymentsPages, true, true, testData.HVTPayment.amountV);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccount : testData.HVTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountV),
            await ensure(_PaymentsPages.HVTPaymentPage.toAccountNumberValue).textContains(testData.HVTPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        ]);
    });

    it('Reject a AU HVT Payment Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("AU - High Value Domestic Payments", testData.status.PendingApproval);
        }
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
        await _PaymentsPages.HVTPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.HVTPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.HVTPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.HVTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.HVTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Edit a AU HVT Payment Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("AU - High Value Domestic Payments", testData.status.PendingApproval);
        }
        await _PaymentsPages.HVTPaymentPage.editButton.click();
        await _PaymentsPages.HVTPaymentPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.HVTPaymentPage.loadCondition();
        await _PaymentsPages.HVTPaymentPage.amount.clean();
        await _PaymentsPages.HVTPaymentPage.amount.input(testData.HVTPayment.editAmount);
        await _PaymentsPages.HVTPaymentPage.paymentDetail.clean();
        await _PaymentsPages.HVTPaymentPage.paymentDetail.input("Edit" + testData.HVTPayment.paymentDetail);
        await _PaymentsPages.HVTPaymentPage.nextButton.click();
        await _PaymentsPages.HVTPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.HVTPaymentPage.submitButton.click();
        await _PaymentsPages.HVTPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.editAmount),
        ]);
    });

    it('Delete a AU HVT Payment Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("AU - High Value Domestic Payments", testData.status.PendingApproval);
        }
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
        await _PaymentsPages.HVTPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.HVTPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.HVTPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.HVTPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.HVTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

});

describe('Verify And Release a High Value Domestic', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.HVTPayment.SIT.loginCompanyId : testData.HVTPayment.UAT.loginCompanyId, SIT ? testData.HVTPayment.SIT.verifyUserId : testData.HVTPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a High Value Domestic via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, testData.paymentType.AU_HVT).then(reference => {
            verifyReference = reference;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(verifyReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it('Approve a High Value Domestic via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch(testData.paymentType.AU_HVT, testData.status.PendingApproval);
        }
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
        await _PaymentsPages.HVTPaymentPage.approveButton.jsClick();
        await _PaymentsPages.HVTPaymentPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.HVTPaymentPage.responseCode.input("23333");
        await _PaymentsPages.HVTPaymentPage.approveButton.click();
        await _PaymentsPages.PayrollPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.HVTPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Release a Low Value Domestic via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.AU_BPAY).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});

describe('AU_HVT Payment File Upload', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.HVTPayment.SIT.loginCompanyId : testData.HVTPayment.UAT.loginCompanyId, SIT ? testData.HVTPayment.SIT.loginUserId : testData.HVTPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Upload High Value Domestic via Files- File Upload- Upload Files', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", lib_1.SIT ? testData.HVTPayment.SIT.fileName : testData.HVTPayment.UAT.fileName, testData.HVTPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccountUpload : testData.HVTPayment.UAT.fromAccountUpload),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountUpload),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.HVTPaymentPage.toNewPayeeNameValue).textContains(testData.HVTPayment.uploadNewPayeeName)
        ]);
    });

    it('File Upload - Reject item for High Value Domestic', async function () {
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
        await _PaymentsPages.HVTPaymentPage.rejectButton.click();
        await _PaymentsPages.HVTPaymentPage.reasonForRejection.input(testData.HVTPayment.rejectReason);
        await _PaymentsPages.HVTPaymentPage.rejectDialogButton.jsClick();
        await _PaymentsPages.HVTPaymentPage.dismissButton.jsClick();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.Rejected)
        ]);
    });

    //IDXP-2022
    it('Upload High Value Domestic via UFFV2 detailed format', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", lib_1.SIT ? testData.HVTPayment.SIT.fileName2 : testData.HVTPayment.UAT.fileName2, testData.HVTPayment.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.HVTPaymentPage.loadConditionForViewHVTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.HVTPaymentPage.hvtFromAccountValue).textContains(SIT ? testData.HVTPayment.SIT.fromAccountUpload : testData.HVTPayment.UAT.fromAccountUpload),
            await ensure(_PaymentsPages.HVTPaymentPage.hvtAmountValue).textContains(testData.HVTPayment.amountUpload),
            await ensure(_PaymentsPages.HVTPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
            await ensure(_PaymentsPages.HVTPaymentPage.toNewPayeeNameValue).textContains(testData.HVTPayment.uploadNewPayeeName)
        ]);
    });
});
