/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { saveScreen, ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
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
let approvalReference = '';
let referenceEdit ='';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');

describe('ID_SKN Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.SKNPayment.SIT.loginCompanyId : testData.SKNPayment.UAT.loginCompanyId, SIT ? testData.SKNPayment.SIT.loginUserId : testData.SKNPayment.UAT.loginUserId,testData.SKNPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a SKN Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.fromAccount.select(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount);
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.amountA1);
        await _PaymentsPages.SKNPaymentPage.newPayeeTab.click();
        await _PaymentsPages.SKNPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.Country.select(testData.SKNPayment.Country);
        await _PaymentsPages.SKNPaymentPage.newPayeeName.input(testData.SKNPayment.newPayeeName);
        await _PaymentsPages.SKNPaymentPage.newPayeeNickname.input(testData.SKNPayment.newPayeeNickname);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd1.input(testData.SKNPayment.newPayeeAdd1);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd2.input(testData.SKNPayment.newPayeeAdd2);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd3.input(testData.SKNPayment.newPayeeAdd3);
        await _PaymentsPages.SKNPaymentPage.payeeBankID.select(SIT ? testData.SKNPayment.SIT.payeeBankID : testData.SKNPayment.UAT.payeeBankID);
        await _PaymentsPages.SKNPaymentPage.newPayeeAcctNumber.input(testData.SKNPayment.newPayeeAcctNumber);
        // await _PaymentsPages.SKNPaymentPage.selectedCategory.select(testData.SKNPayment.category);
        await _PaymentsPages.SKNPaymentPage.beneficiaryResident.select(testData.SKNPayment.beneficiaryResident);
        await _PaymentsPages.SKNPaymentPage.beneficiaryCategory.select(testData.SKNPayment.beneficiaryCategory);
        await _PaymentsPages.SKNPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.SKNPaymentPage.paymentDetail.input(testData.SKNPayment.paymentDetail);
        await _PaymentsPages.SKNPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.SKNPaymentPage.emailIdO.input(testData.SKNPayment.emailIdO);
        await _PaymentsPages.SKNPaymentPage.emailId1.input(testData.SKNPayment.emailId1);
        await _PaymentsPages.SKNPaymentPage.emailId2.input(testData.SKNPayment.emailId2);
        await _PaymentsPages.SKNPaymentPage.emailId3.input(testData.SKNPayment.emailId3);
        await _PaymentsPages.SKNPaymentPage.emailId4.input(testData.SKNPayment.emailId4);
        await _PaymentsPages.SKNPaymentPage.message.input(testData.SKNPayment.message);
        // await _PaymentsPages.SKNPaymentPage.payeeReference.input(testData.SKNPayment.payeeReference);
        await _PaymentsPages.SKNPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.SKNPaymentPage.transactionNote.input(testData.SKNPayment.transactionNote);
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await checkViewSKNPageAllField(false);//add for IDXP-812
    });

    it('Create a SKN Payment ApprovalNow without mchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.fromAccount.select(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount);
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.amountA2);
        await _PaymentsPages.SKNPaymentPage.existingPayee.select(testData.SKNPayment.existingPayee);
        await _PaymentsPages.SKNPaymentPage.beneficiaryResident.select(testData.SKNPayment.beneficiaryResident)
        await _PaymentsPages.SKNPaymentPage.beneficiaryCategory.select(testData.SKNPayment.beneficiaryCategory);
        await _PaymentsPages.SKNPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.SKNPaymentPage.paymentDetail.input(testData.SKNPayment.paymentDetail);
        await _PaymentsPages.SKNPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.SKNPaymentPage.emailIdO.input(testData.SKNPayment.emailIdO);
        await _PaymentsPages.SKNPaymentPage.emailId1.input(testData.SKNPayment.emailId1);
        await _PaymentsPages.SKNPaymentPage.emailId2.input(testData.SKNPayment.emailId2);
        await _PaymentsPages.SKNPaymentPage.emailId3.input(testData.SKNPayment.emailId3);
        await _PaymentsPages.SKNPaymentPage.emailId4.input(testData.SKNPayment.emailId4);
        await _PaymentsPages.SKNPaymentPage.message.input(testData.SKNPayment.message);
        // await _PaymentsPages.SKNPaymentPage.payeeReference.input(testData.SKNPayment.payeeReference);
        await _PaymentsPages.SKNPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.SKNPaymentPage.transactionNote.input(testData.SKNPayment.transactionNote);
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.SKNPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a SKN Payment ApprovalNow with mchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.fromAccount.select(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount);
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.amountA1);
        await _PaymentsPages.SKNPaymentPage.existingPayee.select(testData.SKNPayment.existingPayee);
        await _PaymentsPages.SKNPaymentPage.beneficiaryResident.select(testData.SKNPayment.beneficiaryResident)
        await _PaymentsPages.SKNPaymentPage.beneficiaryCategory.select(testData.SKNPayment.beneficiaryCategory);
        await _PaymentsPages.SKNPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.SKNPaymentPage.paymentDetail.input(testData.SKNPayment.paymentDetail);
        await _PaymentsPages.SKNPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.SKNPaymentPage.emailIdO.input(testData.SKNPayment.emailIdO);
        await _PaymentsPages.SKNPaymentPage.emailId1.input(testData.SKNPayment.emailId1);
        await _PaymentsPages.SKNPaymentPage.emailId2.input(testData.SKNPayment.emailId2);
        await _PaymentsPages.SKNPaymentPage.emailId3.input(testData.SKNPayment.emailId3);
        await _PaymentsPages.SKNPaymentPage.emailId4.input(testData.SKNPayment.emailId4);
        await _PaymentsPages.SKNPaymentPage.message.input(testData.SKNPayment.message);
        //await _PaymentsPages.SKNPaymentPage.payeeReference.input(testData.SKNPayment.payeeReference);
        await _PaymentsPages.SKNPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.SKNPaymentPage.transactionNote.input(testData.SKNPayment.transactionNote);
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.SKNPaymentPage.approvalNowCheckBox.jsClick();
        //加了这句话后UAT会关掉challenge，先注释
        //await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.SKNPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a SKN Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.fromAccount.select(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount);
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.amountA1);
        await _PaymentsPages.SKNPaymentPage.existingPayee.select(testData.SKNPayment.existingPayee);
        await _PaymentsPages.SKNPaymentPage.beneficiaryResident.select(testData.SKNPayment.beneficiaryResident)
        await _PaymentsPages.SKNPaymentPage.beneficiaryCategory.select(testData.SKNPayment.beneficiaryCategory);
        await _PaymentsPages.SKNPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.SKNPaymentPage.paymentDetail.input(testData.SKNPayment.paymentDetail);
        await _PaymentsPages.SKNPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.SKNPaymentPage.emailIdO.input(testData.SKNPayment.emailIdO);
        await _PaymentsPages.SKNPaymentPage.emailId1.input(testData.SKNPayment.emailId1);
        await _PaymentsPages.SKNPaymentPage.emailId2.input(testData.SKNPayment.emailId2);
        await _PaymentsPages.SKNPaymentPage.emailId3.input(testData.SKNPayment.emailId3);
        await _PaymentsPages.SKNPaymentPage.emailId4.input(testData.SKNPayment.emailId4);
        await _PaymentsPages.SKNPaymentPage.message.input(testData.SKNPayment.message);
        // await _PaymentsPages.SKNPaymentPage.payeeReference.input(testData.SKNPayment.payeeReference);
        await _PaymentsPages.SKNPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.SKNPaymentPage.transactionNote.input(testData.SKNPayment.transactionNote);
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.SKNPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'SKNName' + generatedID();
        await _PaymentsPages.SKNPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.SKNPaymentPage.fromAccoountValueForTemplate).textContains(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.SKNPaymentPage.amountValueForTemplate).textContains(testData.SKNPayment.amountA1),
            await ensure(_PaymentsPages.SKNPaymentPage.payeeValueForTemplate).textContains(testData.SKNPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).textContains(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.SKNPaymentPage.amountValue).textContains(testData.SKNPayment.amountA1),
            await ensure(_PaymentsPages.SKNPaymentPage.toExistingPayeeValue).isNotEmpty()
        ]);
    });

    it('Create a SKN Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        // if (0 !== TemplateName.trim().length) {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        // } else {
        //     await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.SKNPayment.existingTemplateName);
        // }
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.SKNPayment.existingTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.SKNPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);

        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.SKNPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.SKNPaymentPage.toExistingPayeeValue).isNotEmpty(),
        ]);
    });

    it('Create a SKN Payment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.fromAccount.select(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount);
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.amountA1);
        await _PaymentsPages.SKNPaymentPage.existingPayee.select(testData.SKNPayment.existingPayee);
        await _PaymentsPages.SKNPaymentPage.beneficiaryResident.select(testData.SKNPayment.beneficiaryResident)
        await _PaymentsPages.SKNPaymentPage.beneficiaryCategory.select(testData.SKNPayment.beneficiaryCategory);
        await _PaymentsPages.SKNPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.SKNPaymentPage.paymentDetail.input(testData.SKNPayment.paymentDetail);
        await _PaymentsPages.SKNPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.SKNPaymentPage.emailIdO.input(testData.SKNPayment.emailIdO);
        await _PaymentsPages.SKNPaymentPage.emailId1.input(testData.SKNPayment.emailId1);
        await _PaymentsPages.SKNPaymentPage.emailId2.input(testData.SKNPayment.emailId2);
        await _PaymentsPages.SKNPaymentPage.emailId3.input(testData.SKNPayment.emailId3);
        await _PaymentsPages.SKNPaymentPage.emailId4.input(testData.SKNPayment.emailId4);
        await _PaymentsPages.SKNPaymentPage.message.input(testData.SKNPayment.message);
        //await _PaymentsPages.SKNPaymentPage.payeeReference.input(testData.SKNPayment.payeeReference);
        await _PaymentsPages.SKNPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.SKNPaymentPage.transactionNote.input(testData.SKNPayment.transactionNote);
        await _PaymentsPages.SKNPaymentPage.saveAsDraft.click();
        await _PaymentsPages.SKNPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.SKNPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).textContains(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.SKNPaymentPage.amountValue).textContains(testData.SKNPayment.amountA1),
            await ensure(_PaymentsPages.SKNPaymentPage.toExistingPayeeValue).textContains(testData.SKNPayment.existingPayee),
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a SKN Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - SKN Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.SKNPaymentPage.loadConditionForViewSKNPaymentPage();
        await _PaymentsPages.SKNPaymentPage.copyButton.jsClick();
        await _PaymentsPages.SKNPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.amount.clean();
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.amountV);
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);

        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.SKNPaymentPage.amountValue).textContains(testData.SKNPayment.amountV),
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a SKN Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - SKN Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.SKNPaymentPage.loadConditionForViewSKNPaymentPage();
        await _PaymentsPages.SKNPaymentPage.editButton.click();
        await _PaymentsPages.SKNPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.amount.clean();
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        if(referenceEdit == reference){
            await checkViewSKNPageAllField(true);//add for IDXP-812
        }else{
            await Promise.all([
                await ensure(_PaymentsPages.SKNPaymentPage.amountValue).isNotEmpty(),
            ]);
        }   
    });

    it('Reject a SKN Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - SKN Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.SKNPaymentPage.loadConditionForViewSKNPaymentPage();
        await _PaymentsPages.SKNPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.SKNPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.SKNPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.SKNPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.SKNPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.SKNPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);

        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Delete a SKN Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - SKN Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.SKNPaymentPage.loadConditionForViewSKNPaymentPage();
        await _PaymentsPages.SKNPaymentPage
        await _PaymentsPages.SKNPaymentPage.deleteButton.click();
        await _PaymentsPages.SKNPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.SKNPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.SKNPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.SKNPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Create a SKN Payment for Verify and Release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.fromAccount.select(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount);
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.amountV);
        await _PaymentsPages.SKNPaymentPage.existingPayee.select(testData.SKNPayment.existingPayee);
        await _PaymentsPages.SKNPaymentPage.beneficiaryResident.select(testData.SKNPayment.beneficiaryResident)
        await _PaymentsPages.SKNPaymentPage.beneficiaryCategory.select(testData.SKNPayment.beneficiaryCategory);
        await _PaymentsPages.SKNPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).textContains(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.SKNPaymentPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });

    it('Can create a SKN Payment with max amount  1000000000', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.fromAccount.select(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount);
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.maxAmount);
        await _PaymentsPages.SKNPaymentPage.newPayeeTab.click();
        await _PaymentsPages.SKNPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.Country.select(testData.SKNPayment.Country);
        await _PaymentsPages.SKNPaymentPage.newPayeeName.input(testData.SKNPayment.newPayeeName);
        await _PaymentsPages.SKNPaymentPage.newPayeeNickname.input(testData.SKNPayment.newPayeeNickname);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd1.input(testData.SKNPayment.newPayeeAdd1);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd2.input(testData.SKNPayment.newPayeeAdd2);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd3.input(testData.SKNPayment.newPayeeAdd3);
        await _PaymentsPages.SKNPaymentPage.payeeBankID.select(SIT ? testData.SKNPayment.SIT.payeeBankID : testData.SKNPayment.UAT.payeeBankID);
        await _PaymentsPages.SKNPaymentPage.newPayeeAcctNumber.input(testData.SKNPayment.newPayeeAcctNumber);
        await _PaymentsPages.SKNPaymentPage.beneficiaryResident.select(testData.SKNPayment.beneficiaryResident);
        await _PaymentsPages.SKNPaymentPage.beneficiaryCategory.select(testData.SKNPayment.beneficiaryCategory);
        await _PaymentsPages.SKNPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.SKNPaymentPage.paymentDetail.input(testData.SKNPayment.paymentDetail);
        await _PaymentsPages.SKNPaymentPage.nextButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.SKNPaymentPage.submitButton.click();
        await _PaymentsPages.SKNPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SKNPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).textContains(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.SKNPaymentPage.amountValue).textContains(testData.SKNPayment.maxAmount),
        ]);
    });

    it('Can not create a SKN Payment with greater than max amount 1000000001', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.SKNPaymentPage.loadCondition();
        await _PaymentsPages.SKNPaymentPage.fromAccount.select(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount);
        await _PaymentsPages.SKNPaymentPage.amount.input(testData.SKNPayment.greaterMaxAmount);
        await _PaymentsPages.SKNPaymentPage.newPayeeTab.click();
        await _PaymentsPages.SKNPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.Country.select(testData.SKNPayment.Country);
        await _PaymentsPages.SKNPaymentPage.newPayeeName.input(testData.SKNPayment.newPayeeName);
        await _PaymentsPages.SKNPaymentPage.newPayeeNickname.input(testData.SKNPayment.newPayeeNickname);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd1.input(testData.SKNPayment.newPayeeAdd1);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd2.input(testData.SKNPayment.newPayeeAdd2);
        await _PaymentsPages.SKNPaymentPage.newPayeeAdd3.input(testData.SKNPayment.newPayeeAdd3);
        await _PaymentsPages.SKNPaymentPage.payeeBankID.select(SIT ? testData.SKNPayment.SIT.payeeBankID : testData.SKNPayment.UAT.payeeBankID);
        await _PaymentsPages.SKNPaymentPage.newPayeeAcctNumber.input(testData.SKNPayment.newPayeeAcctNumber);
        await ensure(_PaymentsPages.SKNPaymentPage.SKNPaymentCheckBox).hasClassName("disabled");
    });
});

describe('ID_SKN Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.SKNPayment.SIT.loginCompanyId : testData.SKNPayment.UAT.loginCompanyId, SIT ? testData.SKNPayment.SIT.verifyUserId : testData.SKNPayment.UAT.verifyUserId, testData.SKNPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a SKN Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'ID - SKN Payment').then(reference => {
            verifyReference = reference;
            console.error("SKNverifyReference" + verifyReference);
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a SKN Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - SKN Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.SKNPaymentPage.loadConditionForViewSKNPaymentPage();
        await _PaymentsPages.SKNPaymentPage.approveButton.jsClick();
        await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.SKNPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.SKNPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.SKNPaymentPage.approveBtn.click();
        await _PaymentsPages.SKNPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
            console.error("SKNapprovalReference" + approvalReference);
        });
        await _PaymentsPages.SKNPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a SKN Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'ID - SKN Payment').then(reference => {
            paymentReference = reference;
            console.error("SKNreleaselReference" + paymentReference);
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewSKNPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.SKNPaymentPage.fromAccountValue).textContains(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.SKNPaymentPage.amountValue).textContains(isEdit ? testData.SKNPayment.editAmount : testData.SKNPayment.amountA1),
        await ensure(_PaymentsPages.SKNPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.SKNPaymentPage.cutoffTimeValue).isNotEmpty(),
        //Add all field
        await ensure(_PaymentsPages.SKNPaymentPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.SKNPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.toNewPayeeNameValue).textContains(testData.SKNPayment.newPayeeName),
        await ensure(_PaymentsPages.SKNPaymentPage.toNewPayeeAccNumValue).textContains(testData.SKNPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeAdd1Value).textContains(testData.SKNPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeAdd2Value).textContains(testData.SKNPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeAdd3Value).textContains(testData.SKNPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentTypeValue).textContains(testData.SKNPayment.paymentType),
        await ensure(_PaymentsPages.SKNPaymentPage.sendAmtValue).textContains(isEdit ? testData.SKNPayment.editAmount : testData.SKNPayment.amountA1),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankNameValue).textContains(SIT ? testData.SKNPayment.SIT.payeeBankName : testData.SKNPayment.UAT.payeeBankName),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankAdd1Value).textContains(SIT ? testData.SKNPayment.SIT.bankAdd1 : testData.SKNPayment.UAT.bankAdd1),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCityValue).textContains(SIT ? testData.SKNPayment.SIT.bankCity : testData.SKNPayment.UAT.bankCity),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCountryValue).textContains(testData.SKNPayment.bankCountry),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeSwiftBicValue).textContains(SIT ? testData.SKNPayment.SIT.payeeBankID : testData.SKNPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBankCodeValue).textContains(SIT ? testData.SKNPayment.SIT.bankCode : testData.SKNPayment.UAT.bankCode),
        await ensure(_PaymentsPages.SKNPaymentPage.payeeBrchCodeValue).textContains(SIT ? testData.SKNPayment.SIT.branchCode : testData.SKNPayment.UAT.branchCode),
        await ensure(_PaymentsPages.SKNPaymentPage.paymentDetailValue).textContains(testData.SKNPayment.paymentDetail),
        await ensure(_PaymentsPages.SKNPaymentPage.msgToPayeeValue).textContains(testData.SKNPayment.message),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(testData.SKNPayment.emailIdO),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(testData.SKNPayment.emailId1),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(testData.SKNPayment.emailId2),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(testData.SKNPayment.emailId3),
        await ensure(_PaymentsPages.SKNPaymentPage.emailList).textContains(testData.SKNPayment.emailId4),
        await ensure(_PaymentsPages.SKNPaymentPage.totalDeductAmt).textContains(isEdit ? testData.SKNPayment.editAmount : testData.SKNPayment.amountA1),
        await ensure(_PaymentsPages.SKNPaymentPage.bankChargeValue).textContains(testData.SKNPayment.bankCharge),
        await ensure(_PaymentsPages.SKNPaymentPage.chargeAcctValue).textContains(SIT ? testData.SKNPayment.SIT.fromAccount : testData.SKNPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.SKNPaymentPage.residStatus).textContains(testData.SKNPayment.beneficiaryResident),
        await ensure(_PaymentsPages.SKNPaymentPage.categoryValue).textContains(testData.SKNPayment.beneficiaryCategory),
        await ensure(_PaymentsPages.SKNPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.custRefValue).textContains(reference),
        await ensure(_PaymentsPages.SKNPaymentPage.messageToApproverValue).textContains(testData.SKNPayment.transactionNote),
        await ensure(_PaymentsPages.SKNPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.SKNPaymentPage.activityLog).isNotEmpty(),
    ]);
}

