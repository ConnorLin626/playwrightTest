/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { handlerCase,randomNumbers, PROJECT_TYPE, ensure, generatedID, SIT } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
// this from Online ACT Create, then Reject/Edit/Delete
let reference = '';
//this from createFromTemplate for ACT,then Approval
let reference2 = '';
//this for create then verify /release
let verifyReference = '';
let reference3 = '';
let approvalReference = '';
let paymentReference = '';
let TemplateName = '';
let referenceEdit='';

describe('SG_Account Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserId : testData.AccountTransfer.UAT.loginUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an ACT Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
        await _PaymentsPages.AccountTransferPage.payeeBank.select("DBS Bank SINGAPORE");
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await checkViewPageAllField(false); //Add for IDXP-812

    });

    it('Create an ACT Payment with ApprovalNow with Mchanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.AccountTransferPage.getChallengeSMS).isVisible();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.click();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input("123123");
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        console.log(paymentReference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Create an ACT Payment with ApprovalNow without Mchanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA2);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input("123123");
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PartialApproved),
        ]);
    });

    it('Create an ACT Payment with Save as Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.savaAsTemplateCheckBox.jsClick();
        TemplateName = 'ACTTemplate' + generatedID();
        await _PaymentsPages.AccountTransferPage.templateName.input(TemplateName);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayee),
        ]);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.templateNameValue).textContains(TemplateName),
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayee),
        ]);
    });

    it('Create an ACT Payment from Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== TemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(TemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.AccountTransfer.existingTemplate);
        }
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.nextButton.jsClick();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).isNotEmpty(),
        ]);
    });

    it('Create an ACT with Save as Draft', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountA1);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
        await _PaymentsPages.AccountTransferPage.saveAsDraft.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            paymentReference = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountA1),
            await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.existingPayee),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.Saved),
        ]);
    });

     //IDXP-2278 ACT
    it('Copy a ACT with Save as Draft which payee be updated', async function () {
            await _PaymentsPages.AccountTransferPage.paymentMenu.click();
            await _PaymentsPages.TransferCentersPage.loadCondition();
            await _PaymentsPages.AccountTransferPage.makePayment.click();
            await _PaymentsPages.TelegraphicTransferPage.loadCondition();
            await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
            await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.AccountTransfer.amountA1);
            await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.AccountTransfer.updatePayee);
            await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
            await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
            await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
            await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
            await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
            await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
            await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
            await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
            await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
            await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
            await _PaymentsPages.AccountTransferPage.saveAsDraft.click();
            await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
                paymentReference = text;
            });
            await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
            await _PaymentsPages.AccountTransferPage.paymentMenu.click();
            //edit payee
            await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
            await _PaymentsPages.BeneficiaryPage.loadCondition();
            await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
            await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.AccountTransfer.updatePayee);
            await _PaymentsPages.BeneficiaryPage.loadCondition();
            await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
            await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
            let ramNumbers = randomNumbers();
            // await _PaymentsPages.BeneficiaryPage.addAddress.jsClick();
            await _PaymentsPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.add2+ramNumbers);
            await _PaymentsPages.BeneficiaryPage.checkBtn.jsClick();

            await browser.sleep(2000);

            await _PaymentsPages.BeneficiaryPage.next.click();
            await _PaymentsPages.BeneficiaryPage.dismiss.click();
            await _PaymentsPages.BeneficiaryPage.loadCondition();
    
            //copy txn
            await _PaymentsPages.AccountTransferPage.paymentMenu.click();
            await _PaymentsPages.TransferCentersPage.loadCondition();
             if (0 !== paymentReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.Saved);
        }
            await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
            await _PaymentsPages.AccountTransferPage.copyButton.click();
            await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
            await _PaymentsPages.TelegraphicTransferPage.loadCondition();
    
            await Promise.all([
                
                await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
                await ensure(_PaymentsPages.TelegraphicTransferPage.PayeeDetail).textContains(testData.Beneficiary.add2+ramNumbers),
            ]);
            await browser.sleep(2000);
            await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
            await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
            await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
                reference3 = text;
            });
            console.log(reference3)
            await _PaymentsPages.AccountTransferPage.paymentMenu.click();
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
            await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();   
            await Promise.all([
                await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
                await ensure(_PaymentsPages.AccountTransferPage.toExistingPayeeNameValue).textContains(testData.AccountTransfer.updatePayee),
                await ensure(_PaymentsPages.AccountTransferPage.newPayeeAdd2Value).textContains(testData.Beneficiary.add2+ramNumbers),
            ]);
    
    
    
        });

    it('Copy an ACT via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.copyButton.jsClick();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.amount.clean();
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
        await browser.sleep(2000);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.amountV),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingVerification),
        ]);
    });

    it('Edit an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.editButton.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.amount.clean();
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.editAmount);
        await browser.sleep(3000);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); //Add for IDXP-812
        } else {
            await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.editAmount)
        ]);
        }
    });

    it('Reject an ACT via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.AccountTransferPage.rejectButton.click();
        await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.AccountTransfer.rejectReason);
        await _PaymentsPages.AccountTransferPage.rejectDialogButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it('Delete an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.AccountTransferPage.deleteButton.click();
        await _PaymentsPages.AccountTransferPage.deleteDialogButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);
    });

    //Add for R8.13,IDXP-38  UAT no existing FX
   if(SIT){
    it('Edit an ACT Payment with non Dol user check amount deduct logic ', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.loginUserNonDol : testData.AccountTransfer.UAT.loginUserNonDol, "P@ssword123");
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== paymentReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.editButton.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.AccountTransfer.paymentCurrencyFCY);
        await _PaymentsPages.AccountTransferPage.amount.clean();
        await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.editAmount);
        await _PaymentsPages.AccountTransferPage.useFxCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.FXcontract0.jsClick();
        await _PaymentsPages.AccountTransferPage.FXcontract1.jsClick();
        await _PaymentsPages.AccountTransferPage.FXcontract0Amt.clean();
        await _PaymentsPages.AccountTransferPage.FXcontract0Amt.input(testData.AccountTransfer.amountA1);
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.deductAmt).textContains(testData.AccountTransfer.deductAmt),
            await ensure(_PaymentsPages.AccountTransferPage.TotalAmtDeduct).textContains(testData.AccountTransfer.deductAmt),
        ]);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(testData.AccountTransfer.deductAmt),
            await ensure(_PaymentsPages.AccountTransferPage.AmtToDeductValue).textContains(testData.AccountTransfer.deductAmt1),
            await ensure(_PaymentsPages.AccountTransferPage.AmtToDeductValue1).textContains(testData.AccountTransfer.deductAmt1),
            await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(testData.AccountTransfer.deductAmt),
        ]);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.AccountTransfer.editAmount),
            await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).textContains(testData.AccountTransfer.deductAmt),
            await ensure(_PaymentsPages.AccountTransferPage.AmtToDeductValue).textContains(testData.AccountTransfer.deductAmt1),
            await ensure(_PaymentsPages.AccountTransferPage.AmtToDeductValue1).textContains(testData.AccountTransfer.deductAmt1),
            await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(testData.AccountTransfer.deductAmt),
        ]);
    });
    }
});

describe('SG_Account Transfer_Approvals', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.AccountTransfer.SIT.loginCompanyId : testData.AccountTransfer.UAT.loginCompanyId, SIT ? testData.AccountTransfer.SIT.verifyUserId : testData.AccountTransfer.UAT.verifyUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify an ACT Payment via My Verify', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifySingleTxnUnderList(_ApprovalsPages, reference3, 'SG - Account Transfer').then(reference => {
            verifyReference = reference;
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    it('Approve an ACT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        if (0 !== verifyReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(verifyReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            approvalReference = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Release an ACT Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, verifyReference, approvalReference, 'SG - Account Transfer').then(reference => {
            paymentReference = reference;
        })
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received,testData.status.Completed),
        ]);
    });
});

export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
        await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(isEdit ? testData.AccountTransfer.editAmount : testData.AccountTransfer.amountA1),
        await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.AccountTransfer.newPayeeName),
        await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
        // Add check all field
        await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.referenceValue).textContains(isEdit ?  referenceEdit : reference),
        await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.newPayeeAcctNum).textContains(testData.AccountTransfer.newPayeeAcctNumber),
        await ensure(_PaymentsPages.AccountTransferPage.newPayeeAdd1Value).textContains(testData.AccountTransfer.newPayeeAdd1),
        await ensure(_PaymentsPages.AccountTransferPage.newPayeeAdd2Value).textContains(testData.AccountTransfer.newPayeeAdd2), 
        // await ensure(_PaymentsPages.AccountTransferPage.newPayeeAdd3Value).textContains(testData.AccountTransfer.newPayeeAdd3),
        await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(testData.AccountTransfer.paymentType),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(testData.AccountTransfer.paymentDetail),
        await ensure(_PaymentsPages.AccountTransferPage.messageValue).textContains(testData.AccountTransfer.message),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.AccountTransfer.emailIdO),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.AccountTransfer.emailId1),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.AccountTransfer.emailId2),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.AccountTransfer.emailId3),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.AccountTransfer.emailId4),
        await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(isEdit ? testData.AccountTransfer.editAmount : testData.AccountTransfer.amountA1),
        await ensure(_PaymentsPages.AccountTransferPage.messageToApproverValue).textContains(testData.AccountTransfer.transactionNote),
        await ensure(_PaymentsPages.AccountTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty()
    }
}