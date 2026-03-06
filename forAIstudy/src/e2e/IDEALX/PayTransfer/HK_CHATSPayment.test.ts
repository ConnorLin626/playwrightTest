/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { Browser, browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this from copy,then Verify/Approval/Release
let reference3 = "";
let verifyReference = "";
let approvalReference = "";
let paymentReference = '';
let hkChatsDraftReference = '';
let templateName = '';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

let createNewPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeTab.click();
    await _PaymentsPages.HKCHATSPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.HKCHATSPaymentPage.Country.select(testData.CHATSPayment.Country);
    await _PaymentsPages.HKCHATSPaymentPage.payeeBankID.select(testData.CHATSPayment.payeeBankID);
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeAcctNumber.input(testData.CHATSPayment.newPayeeAcctNumber);
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeName.input(testData.CHATSPayment.newPayeeName);
    await _PaymentsPages.HKCHATSPaymentPage.newPayeeNickname.input(testData.CHATSPayment.newPayeeNickname);
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.BeneficiaryPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
    await _PaymentsPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);  
};

let existingPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.HKCHATSPaymentPage.existingPayee.select(testData.CHATSPayment.existingPayee);
};

let fillCHATSPaymentData = async function (_PaymentsPages: PaymentsPages, isCreate: Boolean, isMChallenge: Boolean) {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.makePayment.click();
    await _PaymentsPages.HKCHATSPaymentPage.loadCondition();
    await _PaymentsPages.HKCHATSPaymentPage.fromAccount.select(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount);
    if (isMChallenge) {
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.amountA1);
    } else {
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.amountA2);
    }
    if (isCreate) {
        await createNewPayee(_PaymentsPages);
    } else {
        await existingPayee(_PaymentsPages);
    }
    await _PaymentsPages.HKCHATSPaymentPage.setDate.jsClick();
    await _PaymentsPages.HKCHATSPaymentPage.normalType.jsClick();
    await _PaymentsPages.HKCHATSPaymentPage.loadConditionForBankChargesOur();
    await _PaymentsPages.HKCHATSPaymentPage.bankChargesOur.jsClick();
    await _PaymentsPages.HKCHATSPaymentPage.paymentDetail.input(testData.CHATSPayment.paymentDetail);
    await _PaymentsPages.HKCHATSPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.HKCHATSPaymentPage.emailIdO.input(testData.CHATSPayment.emailIdO);
    await _PaymentsPages.HKCHATSPaymentPage.emailId1.input(testData.CHATSPayment.emailId1);
    await _PaymentsPages.HKCHATSPaymentPage.emailId2.input(testData.CHATSPayment.emailId2);
    await _PaymentsPages.HKCHATSPaymentPage.emailId3.input(testData.CHATSPayment.emailId3);
    await _PaymentsPages.HKCHATSPaymentPage.emailId4.input(testData.CHATSPayment.emailId4);
    await _PaymentsPages.HKCHATSPaymentPage.message.input(testData.CHATSPayment.message);
    await _PaymentsPages.HKCHATSPaymentPage.isTransactionNote.jsClick();
    await _PaymentsPages.HKCHATSPaymentPage.transactionNote.input(testData.CHATSPayment.messageToApprover);
};

describe('HK_CHATS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CHATSPayment.SIT.loginCompanyId : testData.CHATSPayment.UAT.loginCompanyId, SIT ? testData.CHATSPayment.SIT.loginUserId : testData.CHATSPayment.UAT.loginUserId, SIT ? testData.CHATSPayment.SIT.pinId : testData.CHATSPayment.UAT.pinId);
    });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a HK Chats Payment with new Payee', async function () {
        await fillCHATSPaymentData(_PaymentsPages, true, false);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await checkViewPageAllField(false, false); //IDXP-812
    });

    it('Create a HK Chats Payment - Approval Now with mChallenge', async function () {
        await fillCHATSPaymentData(_PaymentsPages, false, true);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.approvalNowCheckBox.jsClick();
        let ispushOptionVisible = await _PaymentsPages.HKCHATSPaymentPage.pushOption.isElementPresent();
        let isRespVisible = await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.isElementPresent();
        if (ispushOptionVisible === true && isRespVisible === false){
            await _PaymentsPages.HKCHATSPaymentPage.pushOption.jsClick();
        };
        // await ensure(_PaymentsPages.HKCHATSPaymentPage.mchallengeText).textContains(testData.CHATSPayment.mChallengeText);
        await _PaymentsPages.HKCHATSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.input(testData.CHATSPayment.challengeResponse);
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
    });

    it('Create a HK Chats Payment - Approve Now without mChallenge', async function () {
        await fillCHATSPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.approvalNowCheckBox.jsClick();
        let ispushOptionVisible = await _PaymentsPages.HKCHATSPaymentPage.pushOption.isElementPresent();
        let isRespVisible = await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.isElementPresent();
        if (ispushOptionVisible === true && isRespVisible === false){
            await _PaymentsPages.HKCHATSPaymentPage.pushOption.jsClick();
        };
        // await ensure(_PaymentsPages.HKCHATSPaymentPage.noChallenge).textContains(testData.CHATSPayment.withoutChallenge);
        await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.input(testData.CHATSPayment.challengeResponse);
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved);
    });

    it('Create a HK Chats Payment with Save as Template', async function () {
        await fillCHATSPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.savaAsTemplateCheckBox.jsClick();
        templateName = 'chatsName' + generatedID();
        await _PaymentsPages.HKCHATSPaymentPage.templateName.input(templateName);
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
            console.log(paymentReference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForViewTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.templateNameValue).textIs(templateName),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fromAccountValue).textContains(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.sendAmtValue).textContains(testData.CHATSPayment.amountA2),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fromAccountValue).textContains(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.deductAmtValue).textContains(testData.CHATSPayment.amountA2),
        ]);
    });

    it('Create a HK Chats Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.CHATSPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
            console.log(reference2);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.deductAmtValue).isNotEmpty(),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toExistingPayeeAcctNumValue).isNotEmpty(),
        ]);
    });

    it('Create a HK Chats with Save as Draft', async function () {
        await fillCHATSPaymentData(_PaymentsPages, false, false);
        await _PaymentsPages.HKCHATSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.HKCHATSPaymentPage.getDialogReferenceID().then(text => {
            hkChatsDraftReference = text;
            console.log(hkChatsDraftReference);
        });
        await _PaymentsPages.HKCHATSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, hkChatsDraftReference);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fromAccountValue).textContains(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.deductAmtValue).textContains(testData.CHATSPayment.amountA2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a HK Chats via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference2);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.loadCondition();
        await _PaymentsPages.HKCHATSPaymentPage.amount.clean();
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.amountV);
        await browser.sleep(2000);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
            console.log(reference3);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.deductAmtValue).textContains(testData.CHATSPayment.amountV),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a HK Chats Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.editButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.HKCHATSPaymentPage.loadCondition();
        await _PaymentsPages.HKCHATSPaymentPage.amount.clean();
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);

        await checkViewPageAllField(true, false); //IDXP-812
    });

    it('Reject a HK Chats Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.HKCHATSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContains(testData.status.Rejected);
    });

    it('Delete a HK Chats Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.HKCHATSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.HKCHATSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display");
    });

    it('Create a HK Chats Payment for verify and release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.HKCHATSPaymentPage.fromAccount.select(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount);
        await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.amountV);
        await _PaymentsPages.HKCHATSPaymentPage.existingPayee.select(testData.CHATSPayment.existingPayee);
        await _PaymentsPages.HKCHATSPaymentPage.setDate.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.normalType.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForBankChargesOur();
        await _PaymentsPages.HKCHATSPaymentPage.bankChargesOur.jsClick();
        await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
            console.log(verifyReference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });

    //add case for IDXP-2014
    //CR was revert by IEBAA-3636, comment it out 06272025
    // it('Create CHATS payment with EUR', async function () {
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.makePayment.click();
    //     await _PaymentsPages.HKCHATSPaymentPage.loadCondition();
    //     await _PaymentsPages.HKCHATSPaymentPage.fromAccount.select(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount);
    //     await _PaymentsPages.HKCHATSPaymentPage.currency.select(testData.CHATSPayment.EUR);
    //     await _PaymentsPages.HKCHATSPaymentPage.amount.input(testData.CHATSPayment.amountA1);
    //     await _PaymentsPages.HKCHATSPaymentPage.existingPayee.select(testData.CHATSPayment.chatsExistingPayee);
    //     await _PaymentsPages.HKCHATSPaymentPage.setDate.jsClick();
    //     await _PaymentsPages.HKCHATSPaymentPage.normalType.jsClick();
    //     await _PaymentsPages.HKCHATSPaymentPage.loadConditionForBankChargesOur();
    //     await _PaymentsPages.HKCHATSPaymentPage.bankChargesOur.jsClick();
    //     await _PaymentsPages.HKCHATSPaymentPage.paymentDetail.input(testData.CHATSPayment.paymentDetail);
    //     await _PaymentsPages.HKCHATSPaymentPage.isBeneAdvising.jsClick();
    //     await _PaymentsPages.HKCHATSPaymentPage.emailIdO.input(testData.CHATSPayment.emailIdO);
    //     await _PaymentsPages.HKCHATSPaymentPage.emailId1.input(testData.CHATSPayment.emailId1);
    //     await _PaymentsPages.HKCHATSPaymentPage.emailId2.input(testData.CHATSPayment.emailId2);
    //     await _PaymentsPages.HKCHATSPaymentPage.emailId3.input(testData.CHATSPayment.emailId3);
    //     await _PaymentsPages.HKCHATSPaymentPage.emailId4.input(testData.CHATSPayment.emailId4);
    //     await _PaymentsPages.HKCHATSPaymentPage.message.input(testData.CHATSPayment.message);
    //     await _PaymentsPages.HKCHATSPaymentPage.isTransactionNote.jsClick();
    //     await _PaymentsPages.HKCHATSPaymentPage.transactionNote.input(testData.CHATSPayment.messageToApprover);
    //     await _PaymentsPages.HKCHATSPaymentPage.nextButton.click();
    //     await _PaymentsPages.HKCHATSPaymentPage.loadConditionForPreviewPage();
    //     await _PaymentsPages.HKCHATSPaymentPage.submitButton.click();
    //     await _PaymentsPages.HKCHATSPaymentPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.HKCHATSPaymentPage.getIdealxInfoReferenceID().then(text => {
    //         reference = text;
    //         console.log(reference);
    //     });

    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
    //     await checkViewPageAllField(false, true); //IDXP-812
    // });

});



describe('HK_CHATS Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CHATSPayment.SIT.loginCompanyId : testData.CHATSPayment.UAT.loginCompanyId,
            SIT ? testData.CHATSPayment.SIT.verifyUserId : testData.CHATSPayment.UAT.verifyUserId, SIT ? testData.CHATSPayment.SIT.pinId : testData.CHATSPayment.UAT.pinId);
    });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Fast Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, testData.paymentType.HK_CHATS).then(reference => {
            verifyReference = reference;
        });;
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval);
    });

    it('Approve a HK Chats Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, verifyReference);
        } else {
            await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaSearch(_PaymentsPages, testData.paymentType.HK_CHATS, testData.status.PendingApproval);
        }
        await _PaymentsPages.HKCHATSPaymentPage.scrollToBottom();
        await _PaymentsPages.HKCHATSPaymentPage.approveButton.click();
        let ispushOptionVisible = await _PaymentsPages.HKCHATSPaymentPage.pushOption.isElementPresent();
        let isRespVisible = await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.isElementPresent();
        if (ispushOptionVisible === true && isRespVisible === false){
            await _PaymentsPages.HKCHATSPaymentPage.pushOption.jsClick();
        };
        await _PaymentsPages.HKCHATSPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.HKCHATSPaymentPage.challengeResponse.input(testData.CHATSPayment.challengeResponse);
        await _PaymentsPages.HKCHATSPaymentPage.approveButton.click();
        await _PaymentsPages.HKCHATSPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
            console.log(approvalReference);
        });
        await _PaymentsPages.HKCHATSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected);
    });

    it('Release a Fast Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, testData.paymentType.HK_CHATS).then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.HKCHATSPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, approvalReference);
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected);
    });
});

export async function checkViewPageAllField(isEdit: boolean = false, isFCY: boolean = false) {
    if (isFCY) {
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toExistingPayeeAcctNumValue).textContains(testData.CHATSPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toExistingPayeeNameValue).textContains(testData.CHATSPayment.newPayeeName),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.deductAmtValue).textContains(testData.CHATSPayment.amountE),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.totalDeductAmtValue).textContains(testData.CHATSPayment.amountE),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.sendAmtValue).textContains(testData.CHATSPayment.amountA1),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.existingPayeeBankSwiftbic).textContains(testData.CHATSPayment.payeeBankIDCHATS),
        ]);
    } else {
        await Promise.all([
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toAccountNumberValue).textContains(testData.CHATSPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.toNewPayeeNameValue).textContains(testData.CHATSPayment.newPayeeName),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.deductAmtValue).textContains(isEdit ? testData.CHATSPayment.editAmount : testData.CHATSPayment.amountA2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.totalDeductAmtValue).textContains(isEdit ? testData.CHATSPayment.editAmount : testData.CHATSPayment.amountA2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.sendAmtValue).textContains(isEdit ? testData.CHATSPayment.editAmount : testData.CHATSPayment.amountA2),
            await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeBankSwiftbic2).textContains(testData.CHATSPayment.payeeBankID),
        ]);
    }
    await Promise.all([
        await ensure(_PaymentsPages.HKCHATSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.fromAccountValue).textContains(SIT ? testData.CHATSPayment.SIT.fromAccount : testData.CHATSPayment.UAT.fromAccount),
        // await ensure(_PaymentsPages.HKCHATSPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeAdd1Value).textContains(testData.CHATSPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeAdd2Value).textContains(testData.CHATSPayment.newPayeeAdd2),
        // await ensure(_PaymentsPages.HKCHATSPaymentPage.payeeAdd3Value).textContains(testData.CHATSPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.paymentTypeValue).textContains(testData.CHATSPayment.paymentType),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.paymentDetailValue).textContains(testData.CHATSPayment.paymentDetail),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.msgToPayeeValue).textContains(testData.CHATSPayment.message),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(testData.CHATSPayment.emailIdO),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(testData.CHATSPayment.emailId1),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(testData.CHATSPayment.emailId2),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(testData.CHATSPayment.emailId3),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.emailListValue).textContains(testData.CHATSPayment.emailId4),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.bankChargeValue).textContains(testData.CHATSPayment.bankChargeValue),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.chargeAcctValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.custRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.HKCHATSPaymentPage.messageToApproverValue).textContains(testData.CHATSPayment.messageToApprover)
    ]);
}