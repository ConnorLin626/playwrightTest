/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import * as moment from "moment";

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this from createFromTemplate,then Approval
let reference2 = "";
// this for Wallet provider
let reference1 = ""
let verifyReference = "";
let approvalReference = "";
let paymentReference = '';
let templateName = '';
let reference3 = '';
let referenceEdit = '';
let reference4 = '';
let FPSTemplateName = '';
let newFPSPayeeName = ''


let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

let createNewPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.FastPaymentPage.newPayeeTab.click();
    await _PaymentsPages.FastPaymentPage.cognitiveContinueBtn.jsClickIfExist();
    await _PaymentsPages.FastPaymentPage.Country.select(testData.FastPayment.Country);
    await _PaymentsPages.FastPaymentPage.payeeBankID.select(SIT ? testData.FastPayment.SIT.payeeBankID : testData.FastPayment.UAT.payeeBankID);
    await _PaymentsPages.FastPaymentPage.newPayeeAcctNumber.input(testData.FastPayment.newPayeeAcctNumber);
    await _PaymentsPages.FastPaymentPage.newPayeeName.input(testData.FastPayment.newPayeeName);
    await _PaymentsPages.FastPaymentPage.newPayeeNickname.input(testData.FastPayment.newPayeeNickname);
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.FastPayment.newPayeeAdd1);
    await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.FastPayment.newPayeeAdd2);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
}

let createNewPayeewithNewWalletProvider = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.FastPaymentPage.newPayeeTab.click();
    await _PaymentsPages.FastPaymentPage.cognitiveContinueBtn.jsClickIfExist();
    await _PaymentsPages.FastPaymentPage.Country.select(testData.FastPayment.Country);
    await _PaymentsPages.AccountTransferPage.payeeBank.select(testData.FastPayment.otherBankWalletLabel);
    await Promise.all([
        await ensure(_PaymentsPages.FastPaymentPage.otherBankWalletLabel).textContains(testData.FastPayment.otherBankWalletLabel),
        await ensure(_PaymentsPages.FastPaymentPage.swiftBICSearchLabel).textContains(testData.FastPayment.swiftBICSearchLabel),
        await ensure(_PaymentsPages.FastPaymentPage.swiftBICSearchBtn).elementValueContains(testData.FastPayment.swiftBICSearchBtnName),
    ]);
    await _PaymentsPages.FastPaymentPage.payeeBankID.select(SIT ? testData.FastPayment.SIT.payeeBankID : testData.FastPayment.UAT.payeeBankID);
    await _PaymentsPages.FastPaymentPage.newPayeeAcctNumber.input(testData.FastPayment.newPayeeAcctNumber);
    await Promise.all([
        await ensure(_PaymentsPages.FastPaymentPage.walletAccountLabel).textContains(testData.FastPayment.walletAccountLabel),
    ]);
    await _PaymentsPages.FastPaymentPage.newPayeeName.input(testData.FastPayment.newPayeeName);
    await _PaymentsPages.FastPaymentPage.newPayeeNickname.input(testData.FastPayment.newPayeeNickname);
    await _PaymentsPages.BeneficiaryPage.switchFormatButton.click();
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.BeneficiaryPage.streetName.input(testData.Beneficiary.streetName);
    await _PaymentsPages.BeneficiaryPage.buildingNum.input(testData.Beneficiary.buildingNum);
    await _PaymentsPages.BeneficiaryPage.buildingName.input(testData.Beneficiary.buildingName);
    await _PaymentsPages.BeneficiaryPage.floor.input(testData.Beneficiary.floor);
    await _PaymentsPages.BeneficiaryPage.room.input(testData.Beneficiary.room);
    await _PaymentsPages.BeneficiaryPage.department.input(testData.Beneficiary.department);
    await _PaymentsPages.BeneficiaryPage.subDepartment.input(testData.Beneficiary.subDepartment);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    await _PaymentsPages.BeneficiaryPage.countrySubDivsion.input(testData.Beneficiary.countrySubDivsion);
    await _PaymentsPages.BeneficiaryPage.townLocationName.input(testData.Beneficiary.townLocationName);
    await _PaymentsPages.BeneficiaryPage.districtName.input(testData.Beneficiary.districtName);    
}

let existingPayee = async function (_PaymentsPages: PaymentsPages) {
    await _PaymentsPages.FastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
}

let fillFastPaymentData = async function (_PaymentsPages: PaymentsPages, isCreate: Boolean, isMchanllenge: Boolean, isWalletProvider: Boolean) {

    await _PaymentsPages.FastPaymentPage.loadCondition();
    await _PaymentsPages.FastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
    if (isMchanllenge) {
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.amountA1);
    } else {
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.amountA2IX);
    }
    if (isCreate) {
        if (isWalletProvider) {
            await createNewPayeewithNewWalletProvider(_PaymentsPages);
        } else {
            await createNewPayee(_PaymentsPages);
        }
    } else {
        await existingPayee(_PaymentsPages);
    }
    // update for IDXP-2116
    await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
    await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.FastPayment.purposeCode);
    await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
    await _PaymentsPages.FastPaymentPage.paymentDetail.input(testData.FastPayment.paymentDetail);
    await _PaymentsPages.FastPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.FastPaymentPage.emailIdO.input(testData.FastPayment.emailIdO);
    await _PaymentsPages.FastPaymentPage.emailId1.input(testData.FastPayment.emailId1);
    await _PaymentsPages.FastPaymentPage.emailId2.input(testData.FastPayment.emailId2);
    await _PaymentsPages.FastPaymentPage.emailId3.input(testData.FastPayment.emailId3);
    await _PaymentsPages.FastPaymentPage.emailId4.input(testData.FastPayment.emailId4);
    await _PaymentsPages.FastPaymentPage.message.input(testData.FastPayment.message);
    await _PaymentsPages.FastPaymentPage.isTransactionNote.jsClick();
    await _PaymentsPages.FastPaymentPage.transactionNote.input(testData.FastPayment.transactionNote);
}

describe('SG_Fast Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FastPayment.SIT.loginCompanyId : testData.FastPayment.UAT.loginCompanyId, SIT ? testData.FastPayment.SIT.loginUserId : testData.FastPayment.UAT.loginUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a SG Fast Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await fillFastPaymentData(_PaymentsPages, true, false, false);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await checkViewPageAllField(false); //Add for IDXP-812
    });

    it('Create a SG Fast Payment with new Wallet provider', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await fillFastPaymentData(_PaymentsPages, true, false, true);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference1 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountA2),
            await ensure(_PaymentsPages.FastPaymentPage.toAccountNumberValue).textContains(testData.FastPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it('Create a SG Fast Payment with ApprovalNow mChllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await fillFastPaymentData(_PaymentsPages, true, true, false);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.FastPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.FastPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.FastPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a SG Fast Payment without ApprovalNow mChllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await fillFastPaymentData(_PaymentsPages, false, false, false);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.FastPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PartialApproved),
        ]);
    });

    it('Create a SG Fast Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await fillFastPaymentData(_PaymentsPages, false, false, false);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.savaAsTemplateCheckBox.jsClick();
        templateName = 'FastName' + generatedID();
        await _PaymentsPages.FastPaymentPage.templateName.input(templateName);
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountA2),
            await ensure(_PaymentsPages.FastPaymentPage.toExistingPayeeNameValue).textContains(testData.FastPayment.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.templateNameValue).textIs(templateName),
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountA2),
            await ensure(_PaymentsPages.FastPaymentPage.toExistingPayeeNameValue).textContains(testData.FastPayment.existingPayee),
        ]);
    });

    it('Create a SG Fast Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== templateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.FastPayment.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.FastPaymentPage.loadConditionCreatePaymentTemplate();
        await _PaymentsPages.FastPaymentPage.nextButton.jsClick();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).isNotEmpty(),
            await ensure(_PaymentsPages.FastPaymentPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);

    });

    it('Create a SG Fast with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await fillFastPaymentData(_PaymentsPages, false, false, false);
        await _PaymentsPages.FastPaymentPage.saveAsDraft.click();
        await _PaymentsPages.FastPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.FastPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountA2),
            await ensure(_PaymentsPages.FastPaymentPage.toExistingPayeeNameValue).textContains(testData.FastPayment.existingPayee),
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a SG Fast via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.FastPaymentPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.amount.clean();
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.amountV);
        await browser.sleep(2000);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountV),
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit a SG Fast Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.FastPaymentPage.editButton.click();
        await _PaymentsPages.FastPaymentPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.FastPaymentPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.amount.clean();
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.editAmount);
        await _PaymentsPages.FastPaymentPage.paymentDetail.clean();
        await _PaymentsPages.FastPaymentPage.paymentDetail.input("Edit" + testData.FastPayment.paymentDetail);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); //Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.editAmount),
            ]);
        }
    });

    it('Reject a SG Fast Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.FastPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.FastPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.FastPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.FastPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.FastPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.FastPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContains(testData.status.Rejected),
        ]);
    });

    it('Delete a SG Fast Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Fast Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.FastPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.FastPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.FastPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.FastPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.FastPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Can not create fast payment with iteam amount greater than 200000 SGD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await _PaymentsPages.FastPaymentPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.greaterThanMaxAmount);
        await _PaymentsPages.FastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
        await ensure(_PaymentsPages.FastPaymentPage.nextButton).hasClassName("disabled");
    });

    it('Can create fast payment with iteam amount enqual to 200000 SGD', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await _PaymentsPages.FastPaymentPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.maxAmount);
        await _PaymentsPages.FastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
        // let currentDate = moment(new Date()).format('DD MMM YYYY');
        await _PaymentsPages.FastPaymentPage.chooseDate.jsClick();
        //Update for IDXP-2116
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.FastPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _PaymentsPages.FastPaymentPage.paymentDetail.input(testData.FastPayment.paymentDetail);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.maxAmount),
        ]);
    });

    it('create fast payment for verify and release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await _PaymentsPages.FastPaymentPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.amountVIX);
        await _PaymentsPages.FastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        await _PaymentsPages.FastPaymentPage.paymentDate.select(currentDate);
        //Update for IDXP-2116
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.FastPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _PaymentsPages.FastPaymentPage.paymentDetail.input(testData.FastPayment.paymentDetail);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then((data) => {
            reference3 = data;
            console.log(reference3);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amountV),
        ]);
    });

    //add for IEBAA-3373 
    if(SIT){
      it('Create fast payment after final approval bank return reject code RF03', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();   
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await _PaymentsPages.FastPaymentPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.amountA1);
        await _PaymentsPages.FastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
        let currentDate = moment(new Date()).format('DD MMM YYYY');
        await _PaymentsPages.FastPaymentPage.paymentDate.select(currentDate);
        //Update for IDXP-2116
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.FastPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _PaymentsPages.FastPaymentPage.paymentDetail.input(testData.FastPayment.paymentRejectCode);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then((data) => {
            reference4 = data;
            console.log(reference4);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await _PaymentsPages.FastPaymentPage.approveButton.click();
        await _PaymentsPages.FastPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.FastPaymentPage.challengeResponse.input('123123123');
        await browser.sleep(4000);
        await _PaymentsPages.FastPaymentPage.approveButton.click();
        await _PaymentsPages.FastPaymentPage.getDialogReferenceID().then(text => {
            reference4 = text;
        });
        await _PaymentsPages.FastPaymentPage.dismissButton.click();
        await browser.sleep(5000); 
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContains(testData.status.BankRejected),
            await ensure(_PaymentsPages.FastPaymentPage.bankRemarks).textContains(testData.FastPayment.bankRemarks)
        ]);
    });
    }  

    it('Create Fast Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        FPSTemplateName = 'FPSTemplate' + generatedID();
        newFPSPayeeName = 'newFPSPayeeName' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(FPSTemplateName);
        await _PaymentsPages.FastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.amountA1);
        await _PaymentsPages.FastPaymentPage.newPayeeTab.click();
        await _PaymentsPages.FastPaymentPage.Country.select(testData.FastPayment.Country);
        await _PaymentsPages.FastPaymentPage.payeeBankID.select(testData.FastPayment.SIT.payeeBankID);
        await _PaymentsPages.FastPaymentPage.newPayeeAcctNumber.input(testData.FastPayment.newPayeeAcctNumber);
        await _PaymentsPages.FastPaymentPage.newPayeeName.input(newFPSPayeeName);
        await _PaymentsPages.FastPaymentPage.newPayeeNickname.input(newFPSPayeeName);
        //Update for IDXP-2116
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.FastPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
        await _PaymentsPages.FastPaymentPage.paymentDetail.input(testData.FastPayment.paymentDetail);
        await _PaymentsPages.FastPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.FastPaymentPage.transactionNote.input(testData.FastPayment.transactionNote);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(FPSTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewFPSTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fpsTemplateNameValue).textIs(FPSTemplateName),
            await ensure(_PaymentsPages.FastPaymentPage.fromAccountViewValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.amountViewTemplateValue).textContains(testData.FastPayment.amountA1),
            await ensure(_PaymentsPages.FastPaymentPage.existingPayeeNameViewValue).textContains(newFPSPayeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved)
        ]);
    });
});

describe('SG_Fast Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FastPayment.SIT.loginCompanyId : testData.FastPayment.UAT.loginCompanyId, SIT ? testData.FastPayment.SIT.verifyUserId : testData.FastPayment.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Fast Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'SG - FAST Payment').then(reference => {
            verifyReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a SG Fast Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - FAST Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.FastPaymentPage.scrollToBottom();
        await _PaymentsPages.FastPaymentPage.approveButton.click();
        await _PaymentsPages.FastPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.FastPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.FastPaymentPage.approveButton.click();
        await _PaymentsPages.FastPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.FastPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a Fast Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference3, approvalReference, "SG - FAST Payment").then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField(isEdit: Boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(isEdit ? testData.FastPayment.editAmount : testData.FastPayment.amountA2),
        await ensure(_PaymentsPages.FastPaymentPage.toAccountNumberValue).textContains(testData.FastPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        //Check all field
        await ensure(_PaymentsPages.FastPaymentPage.headerRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.FastPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.deductAmountValue).textContains(isEdit ? testData.FastPayment.editAmount : testData.FastPayment.amountA2),
        await ensure(_PaymentsPages.FastPaymentPage.toNewPayeeNameValue).textContains(testData.FastPayment.newPayeeName),
        await ensure(_PaymentsPages.FastPaymentPage.payeeAdress1Value).textContains(testData.FastPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.FastPaymentPage.payeeAdress2Value).textContains(testData.FastPayment.newPayeeAdd2),
        // await ensure(_PaymentsPages.FastPaymentPage.payeeAdress3Value).textContains(testData.FastPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.FastPaymentPage.cutoffTimeValue).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.paymentTypeValue).textContains(testData.FastPayment.paymentType),
        await ensure(_PaymentsPages.FastPaymentPage.payeeBankName).textContains(SIT? testData.FastPayment.SIT.payeeBankName : testData.FastPayment.UAT.payeeBankName),
        await ensure(_PaymentsPages.FastPaymentPage.payeeBankAdress1).textContains(SIT ? testData.FastPayment.SIT.payeeBankAdress : testData.FastPayment.UAT.payeeBankAdress),
        await ensure(_PaymentsPages.FastPaymentPage.payeeBankSwiftBic).textIs(SIT ? testData.FastPayment.SIT.payeeBankID : testData.FastPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.FastPaymentPage.payeeBankCode).textIs(SIT? testData.FastPayment.SIT.payeeBankCode : testData.FastPayment.UAT.payeeBankCode),
        await ensure(_PaymentsPages.FastPaymentPage.payeeBranchCode).textIs(testData.FastPayment.payeeBranckCode),
        await ensure(_PaymentsPages.FastPaymentPage.paymentDetailValue).textIs(isEdit ? "Edit" + testData.FastPayment.paymentDetail : testData.FastPayment.paymentDetail),
        await ensure(_PaymentsPages.FastPaymentPage.messageValue).textContains(testData.FastPayment.message),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailIdO),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailId1),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailId2),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailId3),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailId4),
        await ensure(_PaymentsPages.FastPaymentPage.totalDeductValue).textContains(isEdit ? testData.FastPayment.editAmount : testData.FastPayment.amountA2),
        await ensure(_PaymentsPages.FastPaymentPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.FastPaymentPage.chargeAcctValue).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.FastPaymentPage.messageToApproverValue).textContains(testData.FastPayment.transactionNote),
        await ensure(_PaymentsPages.FastPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.FastPaymentPage.balanceValue).isNotEmpty()
    }
}
