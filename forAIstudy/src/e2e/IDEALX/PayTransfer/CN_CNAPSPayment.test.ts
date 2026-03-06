/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages,FilesPages,SwitchToSubsiPages, } from '../../../pages/IDEALX';
import { ProfileSettingsPages } from '../../../pages/IDEALX/ProfileSettings';
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

// this for OnlineCreate, then Reject/Edit/Delete
let reference = "";
// this for createFromTemplate,then Approval
let reference2 = "";
// this for copy,then Verify/Approval/Release
let reference3 = "";
// this for 100 amount CNAPS case
let reference4 = "";
// this for 1 amount CNAPS case
let reference5 = "";
let TemplateName = '';
let paymentReference = '';
let verifyReference = '';
let approvalReference = '';
let referenceEdit='';
let groupName = '';
const _ProfileSettingsPages = new ProfileSettingsPages();
let _profileSettingspage = _ProfileSettingsPages.profileSettingsPage;
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');
let _FilesPages = new FilesPages();
let _switchToSubsiPages = new SwitchToSubsiPages();

describe('CN_CNAPS Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CNAPSPayment.SIT.loginCompanyId : testData.CNAPSPayment.UAT.loginCompanyId, SIT ? testData.CNAPSPayment.SIT.loginUserId : testData.CNAPSPayment.UAT.loginUserId, testData.CNAPSPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create a CNAPS Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.CNAPSPaymentPage.Country.select(testData.CNAPSPayment.Country);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeName.input(testData.CNAPSPayment.newPayeeName);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeNickname.input(testData.CNAPSPayment.newPayeeNickname);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeAdd1.input(testData.CNAPSPayment.newPayeeAdd1);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeAdd2.input(testData.CNAPSPayment.newPayeeAdd2);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeAdd3.input(testData.CNAPSPayment.newPayeeAdd3);
        await _PaymentsPages.CNAPSPaymentPage.payeeBankID.select(SIT ? testData.CNAPSPayment.SIT.payeeBankID : testData.CNAPSPayment.UAT.payeeBankID);
        await browser.sleep(5000);
        await _PaymentsPages.CNAPSPaymentPage.newPayeeAcctNumber.input(testData.CNAPSPayment.newPayeeAcctNumber);
        //await _PaymentsPages.CNAPSPaymentPage.selectedCategory.select(testData.CNAPSPayment.category);
        await _PaymentsPages.CNAPSPaymentPage.urgentType.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.emailIdO.input(testData.CNAPSPayment.emailIdO);
        await _PaymentsPages.CNAPSPaymentPage.emailId1.input(testData.CNAPSPayment.emailId1);
        await _PaymentsPages.CNAPSPaymentPage.emailId2.input(testData.CNAPSPayment.emailId2);
        await _PaymentsPages.CNAPSPaymentPage.emailId3.input(testData.CNAPSPayment.emailId3);
        await _PaymentsPages.CNAPSPaymentPage.emailId4.input(testData.CNAPSPayment.emailId4);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log("CNAPSRef:"+reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await checkViewPageAllField(false); //Add for IDXP-812
    });

    it('Create a CNAPS Payment with ApprovalNow withoutmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA2);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.emailIdO.input(testData.CNAPSPayment.emailIdO);
        await _PaymentsPages.CNAPSPaymentPage.emailId1.input(testData.CNAPSPayment.emailId1);
        await _PaymentsPages.CNAPSPaymentPage.emailId2.input(testData.CNAPSPayment.emailId2);
        await _PaymentsPages.CNAPSPaymentPage.emailId3.input(testData.CNAPSPayment.emailId3);
        await _PaymentsPages.CNAPSPaymentPage.emailId4.input(testData.CNAPSPayment.emailId4);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.approvalNowCheckBox.jsClick();
       // await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.CNAPSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await browser.sleep(1000);
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create a CNAPS Payment with ApprovalNow withmchllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.emailIdO.input(testData.CNAPSPayment.emailIdO);
        await _PaymentsPages.CNAPSPaymentPage.emailId1.input(testData.CNAPSPayment.emailId1);
        await _PaymentsPages.CNAPSPaymentPage.emailId2.input(testData.CNAPSPayment.emailId2);
        await _PaymentsPages.CNAPSPaymentPage.emailId3.input(testData.CNAPSPayment.emailId3);
        await _PaymentsPages.CNAPSPaymentPage.emailId4.input(testData.CNAPSPayment.emailId4);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.approvalNowCheckBox.jsClick();
        //await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await ensure(_PaymentsPages.CNAPSPaymentPage.mchallengeText).textContains(testData.CNAPSPayment.mChllengeText);
        await _PaymentsPages.CNAPSPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.CNAPSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create a CNAPS Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.emailIdO.input(testData.CNAPSPayment.emailIdO);
        await _PaymentsPages.CNAPSPaymentPage.emailId1.input(testData.CNAPSPayment.emailId1);
        await _PaymentsPages.CNAPSPaymentPage.emailId2.input(testData.CNAPSPayment.emailId2);
        await _PaymentsPages.CNAPSPaymentPage.emailId3.input(testData.CNAPSPayment.emailId3);
        await _PaymentsPages.CNAPSPaymentPage.emailId4.input(testData.CNAPSPayment.emailId4);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'CNAPSName' + generatedID();
        await _PaymentsPages.CNAPSPaymentPage.templateName.input(TemplateName);
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.templateNameValue).textIs(TemplateName),
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccoountValueForTemplate).textContains(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValueForTemplate).textContains(testData.CNAPSPayment.amountA1),
            await ensure(_PaymentsPages.CNAPSPaymentPage.payeeValueForTemplate).textContains(testData.CNAPSPayment.newPayeeName),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountA1),
            await ensure(_PaymentsPages.CNAPSPaymentPage.toExistingPayeeValue).isNotEmpty()
        ]);
    });

    it('Create a CNAPS Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.CNAPSPayment.existingTemplateName);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);

        if (0 !== TemplateName.trim().length) {
            await Promise.all([
                await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount),
                await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountA1),
                await ensure(_PaymentsPages.CNAPSPaymentPage.toExistingPayeeValue).textContains(testData.CNAPSPayment.newPayeeName),
            ]);
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).isNotEmpty(),
                await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).isNotEmpty(),
                await ensure(_PaymentsPages.CNAPSPaymentPage.toExistingPayeeValue).isNotEmpty(),
            ]);
        }
    });

    it('Create a CNAPS Payment with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.paymentDetail.input(testData.CNAPSPayment.paymentDetail);
        await _PaymentsPages.CNAPSPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.emailIdO.input(testData.CNAPSPayment.emailIdO);
        await _PaymentsPages.CNAPSPaymentPage.emailId1.input(testData.CNAPSPayment.emailId1);
        await _PaymentsPages.CNAPSPaymentPage.emailId2.input(testData.CNAPSPayment.emailId2);
        await _PaymentsPages.CNAPSPaymentPage.emailId3.input(testData.CNAPSPayment.emailId3);
        await _PaymentsPages.CNAPSPaymentPage.emailId4.input(testData.CNAPSPayment.emailId4);
        await _PaymentsPages.CNAPSPaymentPage.message.input(testData.CNAPSPayment.message);
        await _PaymentsPages.CNAPSPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.transactionNote.input(testData.CNAPSPayment.transactionNote);
        await _PaymentsPages.CNAPSPaymentPage.saveAsDraft.click();
        await _PaymentsPages.CNAPSPaymentPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.CNAPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountA1),
            await ensure(_PaymentsPages.CNAPSPaymentPage.toExistingPayeeValue).textContains(testData.CNAPSPayment.newPayeeName),
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.Saved),
        ]);
    });

    it('Copy a CNAPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.copyButton.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.amount.clean();
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountV);
        await browser.sleep(2000);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.amountV),
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.PendingVerification, testData.status.PendingApproval),
        ]);
    });

    it('Edit a CNAPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.editButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.amount.clean();
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.editAmount);
        await browser.sleep(3000);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); //Add for IDXP-812
        } else {
            await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(testData.CNAPSPayment.editAmount)
        ]);
        }
    });

    it('Reject a CNAPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();;
        await _PaymentsPages.CNAPSPaymentPage.rejectButton.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.reasonForRejection.input("reasonForRejection");
        await _PaymentsPages.CNAPSPaymentPage.rejectDialogButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.CNAPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Delete a CNAPS Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.deleteButton.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.deleteDialogButton.click();
        await _PaymentsPages.CNAPSPaymentPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.CNAPSPaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.CNAPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    it('Create a CNAPS Payment for verify and release', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountV);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingPayee);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.PendingVerification),
        ]);
    });
    //add for AB-14788
    it('Create multi CNAPS out 100 amount limit', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CNAPSPayment.SIT.loginLMTId : testData.CNAPSPayment.UAT.loginLMTId, SIT ? testData.CNAPSPayment.SIT.loginLMTUserId : testData.CNAPSPayment.UAT.loginLMTUserId, testData.CNAPSPayment.UAT.pinID);
        //Crate&Approve 100 amount CNAPS
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.jsClick();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(testData.CNAPSPayment.fromlimitAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.Limitamount1);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingHQPayee);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.approvalNowCheckBox.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
       // await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.CNAPSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        //check approved
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference4 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference4);
        await browser.sleep(2000);
        //await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.Completed),
        //Crate&Approve 1 amount CNAPS check error
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(testData.CNAPSPayment.fromlimitAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.Limitamount2);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingHQPayee);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.approvalNowCheckBox.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
       // await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        await _PaymentsPages.CNAPSPaymentPage.challengeResponse.input('12312312');
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference5 = text;
        });
        await Promise.all([
             await ensure(_profileSettingspage.errorMsgValue).textContains(testData.CNAPSPayment.limitMessage),
                 
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference5);
        await Promise.all([
             await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),        
        ]);   



    });
});

describe('CN_CNAPS Payment_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CNAPSPayment.SIT.loginCompanyId : testData.CNAPSPayment.UAT.loginCompanyId, SIT ? testData.CNAPSPayment.SIT.verifyUserId : testData.CNAPSPayment.UAT.verifyUserId, testData.CNAPSPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a CNAPS Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, verifyReference, 'CN - Domestic Transfer').then(reference => {
            verifyReference = reference;
        });;

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve a CNAPSPayment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("CN - Domestic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForViewCNAPSPaymentPage();
        await _PaymentsPages.CNAPSPaymentPage.approveButton.jsClick();
        await _PaymentsPages.AccountTransferPage.pushOption.jsClickIfExist();
        //await _PaymentsPages.CNAPSPaymentPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.CNAPSPaymentPage.challengeResponse.input('123123123');
        await browser.sleep(2000);
        await _PaymentsPages.CNAPSPaymentPage.approveBtn.click();
        await _PaymentsPages.CNAPSPaymentPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.CNAPSPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release a CNAPS Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'CN - Domestic Transfer').then(reference => {
            approvalReference = reference;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);

        await Promise.all([
            await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
    //add for AB-14669
    it('Switch To Subsi Create&approve a Subsi CNAPS Payment by group', async function () {
        let _selectGroupCount = [1];
        await new NavigatePages().loginIdealx(SIT ? testData.CNAPSPayment.SIT.loginHQId : testData.CNAPSPayment.UAT.loginCompanyId, SIT ? testData.CNAPSPayment.SIT.loginHQUserId : testData.CNAPSPayment.UAT.loginHQUserId, testData.CNAPSPayment.UAT.pinID);
        //Switch SC
        await _FilesPages.uploadFilePage.companyMenu.click();
        await _FilesPages.uploadFilePage.selectCompany.click();
        await _FilesPages.uploadFilePage.searchCompany.input(SIT?testData.CNAPSPayment.scCompanyID:testData.CNAPSPayment.scUatCompanyID);
        await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
        await _switchToSubsiPages.viewSubsiPage.loadCondition();
        //Create CNAPS
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.CNAPSPaymentPage.loadCondition();
        await _PaymentsPages.CNAPSPaymentPage.fromAccount.select(testData.CNAPSPayment.fromSCAccount);
        await _PaymentsPages.CNAPSPaymentPage.amount.input(testData.CNAPSPayment.amountA1);
        await _PaymentsPages.CNAPSPaymentPage.existingPayee.select(testData.CNAPSPayment.existingSCPayee);
        await _PaymentsPages.CNAPSPaymentPage.nextButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.CNAPSPaymentPage.submitButton.click();
        await _PaymentsPages.CNAPSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.CNAPSPaymentPage.getIdealxInfoReferenceID().then(text => {
            verifyReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        //Group payment
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(verifyReference);
        await _ApprovalsPages.transferCentersPage.payment1.jsClick();
        await _ApprovalsPages.transferCentersPage.createGroupButton.click();
        await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
        await _ApprovalsPages.transferCentersPage.groupCreateButton.click();
        await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
        //Approve CNAPS
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        console.log(groupName)
        await _ApprovalsPages.ApprovalPage.groupList.selectFile(..._selectGroupCount);
        await _ApprovalsPages.ApprovalPage.groupApproveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForPreviewApproval();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.CNAPSPayment.challengeResponse);
        await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await Promise.all([
           await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

export async function checkViewPageAllField(isEdit : boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.CNAPSPaymentPage.fromAccountValue).textContains(SIT?testData.CNAPSPayment.fromAccount:testData.CNAPSPayment.fromUATAccount),
        await ensure(_PaymentsPages.CNAPSPaymentPage.amountValue).textContains(isEdit ? testData.CNAPSPayment.editAmount : testData.CNAPSPayment.amountA1),
        await ensure(_PaymentsPages.CNAPSPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.CNAPSPaymentPage.cutoffTimeValue).isNotEmpty(),
        // Add all field
        await ensure(_PaymentsPages.CNAPSPaymentPage.headerRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.CNAPSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.deductAmtValue).textContains(isEdit ? testData.CNAPSPayment.editAmount : testData.CNAPSPayment.amountA1),
        await ensure(_PaymentsPages.CNAPSPaymentPage.toPayeeValue).textContains(testData.CNAPSPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.CNAPSPaymentPage.toNewPayeeNameValue).textContains(testData.CNAPSPayment.newPayeeName),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd1).textContains(testData.CNAPSPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd2).textContains(testData.CNAPSPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeAdd3).textContains(testData.CNAPSPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentTypeValue).textContains(testData.CNAPSPayment.paymentType),
        await ensure(_PaymentsPages.CNAPSPaymentPage.deliveryMethodValue).textContains(testData.CNAPSPayment.deliveryMethod),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankNameValue).textContains(SIT?testData.CNAPSPayment.payeeBankName:testData.CNAPSPayment.uatPayeeBankName),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankCountry).textContains(testData.CNAPSPayment.payeeBankCountry),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankSwiftBic).textIs(SIT?testData.CNAPSPayment.PayeeBankID:testData.CNAPSPayment.uatPayeeBankID),
        await ensure(_PaymentsPages.CNAPSPaymentPage.payeeBankCode).textIs(testData.CNAPSPayment.payeeBankCode),
        await ensure(_PaymentsPages.CNAPSPaymentPage.paymentDetailValue).textContains(testData.CNAPSPayment.paymentDetail),
        await ensure(_PaymentsPages.CNAPSPaymentPage.msgToPayeeValue).textContains(testData.CNAPSPayment.message),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(testData.CNAPSPayment.emailIdO),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(testData.CNAPSPayment.emailId1),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(testData.CNAPSPayment.emailId2),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(testData.CNAPSPayment.emailId3),
        await ensure(_PaymentsPages.CNAPSPaymentPage.emailList).textContains(testData.CNAPSPayment.emailId4),
        await ensure(_PaymentsPages.CNAPSPaymentPage.totalDeductAmt).textContains(isEdit ? testData.CNAPSPayment.editAmount : testData.CNAPSPayment.amountA1),
        await ensure(_PaymentsPages.CNAPSPaymentPage.custRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.CNAPSPaymentPage.messageToApproverValue).textContains(testData.CNAPSPayment.transactionNote),
        await ensure(_PaymentsPages.CNAPSPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.CNAPSPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}
