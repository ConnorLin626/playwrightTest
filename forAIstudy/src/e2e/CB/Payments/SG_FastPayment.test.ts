/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
import * as moment from "moment";

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let paymentReference = '';
let templateName = '';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

let createNewPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.fastPaymentPage.newPayeeTab.click();
    await _PaymentsPages.fastPaymentPage.newPayeeName.input(testData.FastPayment.newPayeeName);
    await _PaymentsPages.fastPaymentPage.newPayeeAdd1.input(testData.FastPayment.newPayeeAdd1);
    await _PaymentsPages.fastPaymentPage.newPayeeAdd2.input(testData.FastPayment.newPayeeAdd2);
    await _PaymentsPages.fastPaymentPage.newPayeeAdd3.input(testData.FastPayment.newPayeeAdd3);
    await _PaymentsPages.fastPaymentPage.payeeBankID.select(SIT ? testData.FastPayment.SIT.payeeBankID : testData.FastPayment.UAT.payeeBankID);
    await _PaymentsPages.fastPaymentPage.newPayeeAcctNumber.input(testData.FastPayment.newPayeeAcctNumber);
}

let existingPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.fastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
}

let fillFastPaymentData = async function (_PaymentsPages: PaymentsPages, isCreate: Boolean, isMchanllenge: Boolean) {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
    await _PaymentsPages.fastPaymentPage.loadCondition();
    await _PaymentsPages.fastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
    if (isMchanllenge) {
        await _PaymentsPages.fastPaymentPage.amount.input(testData.FastPayment.amountA1);
    } else {
        await _PaymentsPages.fastPaymentPage.amount.input(testData.FastPayment.amountA2);
    }
    if (isCreate) {
        await createNewPayee(_PaymentsPages);
    } else {
        await existingPayee(_PaymentsPages);
    }
    // await _PaymentsPages.fastPaymentPage.fastPaymentType.jsClick();
    await _PaymentsPages.fastPaymentPage.purposeCode.select(testData.FastPayment.purposeCode);
    await _PaymentsPages.fastPaymentPage.paymentDetail.input(testData.FastPayment.paymentDetail);
    await _PaymentsPages.fastPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.fastPaymentPage.emailIdO.input(testData.FastPayment.emailIdO);
    await _PaymentsPages.fastPaymentPage.emailId1.input(testData.FastPayment.emailId1);
    await _PaymentsPages.fastPaymentPage.emailId2.input(testData.FastPayment.emailId2);
    await _PaymentsPages.fastPaymentPage.emailId3.input(testData.FastPayment.emailId3);
    await _PaymentsPages.fastPaymentPage.emailId4.input(testData.FastPayment.emailId4);
    await _PaymentsPages.fastPaymentPage.message.input(testData.FastPayment.message);
    await _PaymentsPages.fastPaymentPage.isTransactionNote.jsClick();
    await _PaymentsPages.fastPaymentPage.transactionNote.input(testData.FastPayment.transactionNote);
}

describe('SG_Fast Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FastPayment.SIT.loginCompanyId : testData.FastPayment.UAT.loginCompanyId, SIT ? testData.FastPayment.SIT.loginUserId : testData.FastPayment.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a SG Fast Payment with new Payee', async function () {
        await fillFastPaymentData(_PaymentsPages, true, false);
        await _PaymentsPages.fastPaymentPage.nextButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.fastPaymentPage.submitButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.fastPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXSuccess();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountA2),
            await ensure(_PaymentsPages.fastPaymentPage.toAccountNumberValue).textContains(testData.FastPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create a SG Fast Payment with ApprovalNow mChllenge', async function () {
        await fillFastPaymentData(_PaymentsPages, true, true);
        await _PaymentsPages.fastPaymentPage.nextButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.fastPaymentPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.fastPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.fastPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.fastPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.fastPaymentPage.submitButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.fastPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXSuccess();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a SG Fast Payment without ApprovalNow mChllenge', async function () {
        await fillFastPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.fastPaymentPage.nextButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.fastPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.fastPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.fastPaymentPage.submitButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.fastPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXSuccess();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved),
        ]);
    });

    it('Create a SG Fast Payment with Save as Template', async function () {
        await fillFastPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.fastPaymentPage.nextButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.fastPaymentPage.savaAsTemplateCheckBox.jsClick();
        templateName = 'FastName' + generatedID();
        await _PaymentsPages.fastPaymentPage.templateName.input(templateName);
        await _PaymentsPages.fastPaymentPage.submitButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.fastPaymentPage.getInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForViewFastTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.templateNameValue).textIs(templateName),
            await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountA2),
            await ensure(_PaymentsPages.fastPaymentPage.toExistingPayeeNameValue).textContains(testData.FastPayment.existingPayee),
        ]);
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountA2),
            await ensure(_PaymentsPages.fastPaymentPage.toExistingPayeeNameValue).textContains(testData.FastPayment.existingPayee),
        ]);
    });

    it('Create a SG Fast Payment from Template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.FastPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.fastPaymentPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.fastPaymentPage.nextButton.jsClick();
        await _PaymentsPages.fastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.fastPaymentPage.submitButton.click();
        await _PaymentsPages.fastPaymentPage.getInfoReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXSuccess();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.fastPaymentPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create a SG Fast with Save as Draft', async function () {
        await fillFastPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.fastPaymentPage.saveAsDraft.click();
        await _PaymentsPages.fastPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.fastPaymentPage.dismissButton.click();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountA2),
            await ensure(_PaymentsPages.fastPaymentPage.toExistingPayeeNameValue).textContains(testData.FastPayment.existingPayee),
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a SG Fast via Transfer Center', async function () {
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        } else {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastPaymentPage.copyButton.click();
        await _PaymentsPages.fastPaymentPage.loadCondition();
        await _PaymentsPages.fastPaymentPage.loadConditionForEditCopy();
        await _PaymentsPages.fastPaymentPage.amount.clean();
        await _PaymentsPages.fastPaymentPage.amount.input(testData.FastPayment.amountV);
        await _PaymentsPages.fastPaymentPage.loadConditionForEditCopy();
        await _PaymentsPages.fastPaymentPage.nextButton.click();
        await _PaymentsPages.fastPaymentPage.submitButton.click();
        await _PaymentsPages.fastPaymentPage.getInfoReferenceID().then(text => {
            reference3 = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXSuccess();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference3);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountV),
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Reject a SG Fast Payment via Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastPaymentPage.rejectButton.click();
        await _PaymentsPages.fastPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.fastPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.fastPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.fastPaymentPage.dismissButton.click();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Edit a SG Fast Payment via Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastPaymentPage.editButton.click();
        await _PaymentsPages.fastPaymentPage.loadCondition();
        await _PaymentsPages.fastPaymentPage.loadConditionForEditCopy();
        await _PaymentsPages.fastPaymentPage.amount.clean();
        await _PaymentsPages.fastPaymentPage.amount.input(testData.FastPayment.editAmount);
        await _PaymentsPages.fastPaymentPage.paymentDetail.clean();
        await _PaymentsPages.fastPaymentPage.paymentDetail.input("Edit" + testData.FastPayment.paymentDetail);
        await _PaymentsPages.fastPaymentPage.nextButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.fastPaymentPage.submitButton.click();
        await _PaymentsPages.fastPaymentPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXSuccess();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.FastPayment.editAmount),
        ]);
    });

    it('Delete a SG Fast Payment via Transfer Center', async function () {
        if (0 !== reference.trim().length) {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - Fast Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastPaymentPage.deleteButton.click();
        await _PaymentsPages.fastPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.fastPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.fastPaymentPage.dismissButton.click();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.loadCondition();
        await _PaymentsPages.transferCentersPage.transferCenterfilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.transferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Can not create fast payment with iteam amount greater than 200000 SGD', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.fastPaymentPage.loadCondition();
        await _PaymentsPages.fastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.fastPaymentPage.amount.input(testData.FastPayment.greaterThanMaxAmount);
        await _PaymentsPages.fastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
        await ensure(_PaymentsPages.fastPaymentPage.fastPaymentType).hasClassName("disabled");
    });

    it('Can create fast payment with iteam amount enqual to 200000 SGD', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
        await _PaymentsPages.fastPaymentPage.loadCondition();
        await _PaymentsPages.fastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.fastPaymentPage.amount.input(testData.FastPayment.maxAmount);
        await _PaymentsPages.fastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        await _PaymentsPages.fastPaymentPage.paymentDate.select(currentDate);
        await _PaymentsPages.fastPaymentPage.purposeCode.select(testData.FastPayment.purposeCode);
        await _PaymentsPages.fastPaymentPage.paymentDetail.input(testData.FastPayment.paymentDetail);
        await _PaymentsPages.fastPaymentPage.nextButton.click();
        await _PaymentsPages.fastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.fastPaymentPage.submitButton.click();
        await _PaymentsPages.fastPaymentPage.getInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await ensure(_PaymentsPages.fastPaymentPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.fastPaymentPage.loadConditionForViewFastPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.fastPaymentPage.fastAmountValue).textContains(testData.FastPayment.maxAmount),
        ]);
    });
});

describe('SG_Fast Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FastPayment.SIT.loginCompanyId : testData.FastPayment.UAT.loginCompanyId, SIT ? testData.FastPayment.SIT.verifyUserId : testData.FastPayment.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify a Fast Payment via My Verify', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.verifySingleTxnUnderList(_PaymentsPages, reference3, "SG - FAST Payment").then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);

        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a SG Fast Payment via Transfer Center', async function () {
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        } else {
            await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, "SG - FAST Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.fastPaymentPage.approveButton.click();
        await _PaymentsPages.fastPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.fastPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.fastPaymentPage.approveButton.click();
        await _PaymentsPages.fastPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.fastPaymentPage.dismissButton.click();
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a Fast Payment via My Release', async function () {

        await _ApprovalsPages.myVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, "SG - FAST Payment").then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.fastPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.fastPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});