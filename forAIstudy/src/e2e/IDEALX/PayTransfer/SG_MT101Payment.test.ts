import { browser } from "protractor";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure,randomNumbers, handlerCase, PROJECT_TYPE, SIT } from "../../../lib";
import { PaymentsPages } from "../../../pages/IDEALX";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let reference = "";
let reference2 = "";
let referenceEdit = '';
let paymentReference = '';
let reference3 = '';

describe('SG MT101 Payments', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MT101Payment.SIT.loginCompanyId : testData.MT101Payment.UAT.loginCompanyId, SIT ? testData.MT101Payment.SIT.loginUserId : testData.MT101Payment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create SG MT101 payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.mt101PaymentMenu.click();
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await fillUpFields(
            SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount,
            testData.MT101Payment.paymentCurrency,
            testData.MT101Payment.amount,
            testData.MT101Payment.fxContractReference,
            testData.MT101Payment.existingPayee);
        await _PaymentsPages.mt101PaymentPage.regulatoryReporting1.input(testData.MT101Payment.regulatoryReportingText1);
        await _PaymentsPages.mt101PaymentPage.regulatoryReporting2.input(testData.MT101Payment.regulatoryReportingText2);
        await _PaymentsPages.mt101PaymentPage.regulatoryReporting3.input(testData.MT101Payment.regulatoryReportingText3);
        await _PaymentsPages.mt101PaymentPage.paymentDetail.input(testData.MT101Payment.paymentDetails);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.MT101Payment.transactionNotes);
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
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();
        await checkViewOnlinePageAllField(false);//Add for IDXP-812
    });

    it('Edit SG MT101 Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference2.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("MT101 Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();
        await _PaymentsPages.mt101PaymentPage.edit.click();
        await _PaymentsPages.mt101PaymentPage.amount.clean();
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.editAmount);
        await browser.sleep(3000);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
            console.log(referenceEdit);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();
        if (referenceEdit == reference2) {
            await checkViewOnlinePageAllField(true);//Add for IDXP-812
        } else {
            await ensure(_PaymentsPages.mt101PaymentPage.deductAmountValue).textContains(SIT? testData.MT101Payment.editAmount : testData.MT101Payment.UAT.deductAmount)
        }
    });

    it('Delete SG MT101 Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();
        await _PaymentsPages.mt101PaymentPage.scrollToBottom();
        await _PaymentsPages.mt101PaymentPage.deleteButton.click();
        await _PaymentsPages.mt101PaymentPage.deleteDialogButton.click();
        await _PaymentsPages.mt101PaymentPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await ensure(_PaymentsPages.mt101PaymentPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference2);

        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs("No information to display"),
        ]);

    });

    it('Create SG MT101 payment with Approve Now', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.mt101PaymentPage.mt101PaymentMenu.click();
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await fillUpFields(
            SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount,
            testData.MT101Payment.paymentCurrency,
            testData.MT101Payment.amount,
            testData.MT101Payment.fxContractReference,
            testData.MT101Payment.existingPayee);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approveNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.AccountTransferPage.challengeResponse.input(testData.MT101Payment.challengeResponse);
        await browser.sleep(3000);
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.mt101PaymentPage.fromAccountValue).textContains(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount),
            await ensure(_PaymentsPages.mt101PaymentPage.customerRefValue).textIs(reference),
            await ensure(_PaymentsPages.mt101PaymentPage.statusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    //IDXP-2278 MT101
    it('Copy an MT101 with Save as Draft Which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.mt101PaymentMenu.click();
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await fillUpFields(
            SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount,
            testData.MT101Payment.paymentCurrency,
            testData.MT101Payment.amount,
            testData.MT101Payment.fxContractReference,
            testData.MT101Payment.updatedPayee);
        await _PaymentsPages.mt101PaymentPage.regulatoryReporting1.input(testData.MT101Payment.regulatoryReportingText1);
        await _PaymentsPages.mt101PaymentPage.regulatoryReporting2.input(testData.MT101Payment.regulatoryReportingText2);
        await _PaymentsPages.mt101PaymentPage.regulatoryReporting3.input(testData.MT101Payment.regulatoryReportingText3);
        await _PaymentsPages.mt101PaymentPage.paymentDetail.input(testData.MT101Payment.paymentDetails);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.MT101Payment.transactionNotes);
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
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.MT101Payment.updatedPayee);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.editNewPayee.jsClick();
        await _PaymentsPages.BeneficiaryPage.continueBtn.jsClick();
        let ramNumbers = randomNumbers();
        //await _PaymentsPages.BeneficiaryPage.addAddress.jsClick();
        await _PaymentsPages.BeneficiaryPage.newPayeeAdd2.input(testData.Beneficiary.add2+ramNumbers);
        //await _PaymentsPages.BeneficiaryPage.checkBtn.click();
        
        await browser.sleep(2000);
        
        await _PaymentsPages.BeneficiaryPage.next.click();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();

        //copy
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== paymentReference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("MT101 Payment", testData.status.Saved);
        }
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();
        await _PaymentsPages.mt101PaymentPage.copy.click();
        await _PaymentsPages.mt101PaymentPage.loadCondition();

        await Promise.all([
                        await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
                        await ensure(_PaymentsPages.TelegraphicTransferPage.PayeeDetail).textContains(testData.Beneficiary.add2+ramNumbers),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference3 = text;
        });
        console.log(reference3)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference3);
        await _PaymentsPages.mt101PaymentPage.loadConditionForViewPage();
        await Promise.all([
            //await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.mt101PaymentPage.existingPayeeName).textContains(testData.MT101Payment.updatedPayee),
            await ensure(_PaymentsPages.mt101PaymentPage.payeeAdd2).textContains(testData.Beneficiary.add2+ramNumbers),
        ]);
    });

    //Add for DASB-74531
    it('Create SG MT101 payment with new payee input duplicate nickname', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.mt101PaymentMenu.click();
        await _PaymentsPages.mt101PaymentPage.loadCondition();
        await _PaymentsPages.mt101PaymentPage.fromAccount.select(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount);
        await _PaymentsPages.mt101PaymentPage.paymentCurrency.select(testData.MT101Payment.paymentCurrency);
        await _PaymentsPages.mt101PaymentPage.amount.input(testData.MT101Payment.amount);
        await _PaymentsPages.mt101PaymentPage.fxContractReference.input(testData.MT101Payment.fxContractReference);
        await _PaymentsPages.mt101PaymentPage.newPayeeTab.click();
        await _PaymentsPages.mt101PaymentPage.payeeBankID.select(testData.MT101Payment.swiftBicValue);
        await _PaymentsPages.mt101PaymentPage.newPayeeAcctNumber.input(testData.MT101Payment.beneAccountNumber);
        await _PaymentsPages.mt101PaymentPage.newPayeeNameInput.input(testData.MT101Payment.existingPayee);
        await _PaymentsPages.mt101PaymentPage.newPayeeNickname.input(testData.MT101Payment.existingPayee);
        await _PaymentsPages.mt101PaymentPage.savePayee.jsClick();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await ensure(_PaymentsPages.mt101PaymentPage.nicknameMsg).textContains(testData.MT101Payment.Msg);
        await ensure(_PaymentsPages.mt101PaymentPage.nicknameField).textNotContains(testData.MT101Payment.Msg2);
    });
});

async function fillUpFields(fromAccount: string, paymentCurrency: string, amount: string, fxContractRef: string, existingPayee: string) {
    await _PaymentsPages.mt101PaymentPage.fromAccount.select(fromAccount);
    await _PaymentsPages.mt101PaymentPage.paymentCurrency.select(paymentCurrency);
    await _PaymentsPages.mt101PaymentPage.amount.input(amount);
    await _PaymentsPages.mt101PaymentPage.fxContractReference.input(fxContractRef);
    await _PaymentsPages.mt101PaymentPage.existingTab.jsClick();
    await _PaymentsPages.demandDraftPaymentPage.existingBeneficiary.select(existingPayee);
}

export async function checkViewOnlinePageAllField(isEdit = false) {
    await Promise.all([
        await ensure(_PaymentsPages.mt101PaymentPage.customerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.mt101PaymentPage.statusValue).textContains(testData.status.PendingApproval),
        await ensure(_PaymentsPages.mt101PaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.mt101PaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.mt101PaymentPage.pmtTypeValue).textContains(testData.MT101Payment.paymentType),
        await ensure(_PaymentsPages.mt101PaymentPage.custRef).isNotEmpty(),
        await ensure(_PaymentsPages.NewFastCollectionPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.mt101PaymentPage.fromAccountValue).textContains(SIT ? testData.MT101Payment.SIT.fromAccount : testData.MT101Payment.UAT.fromAccount),
        await ensure(_PaymentsPages.mt101PaymentPage.existingPayeeeAcctNum).textContains(testData.MT101Payment.beneAccountNumber),
        await ensure(_PaymentsPages.mt101PaymentPage.existingPayeeName).textContains(testData.MT101Payment.existingPayee),
        await ensure(_PaymentsPages.mt101PaymentPage.payeeAdd1).textContains(testData.MT101Payment.existingPayeeAddr1),
        await ensure(_PaymentsPages.mt101PaymentPage.payeeAdd2).textContains(testData.MT101Payment.existingPayeeAddr2),
        await ensure(_PaymentsPages.mt101PaymentPage.payeeAdd3).textContains(testData.MT101Payment.existingPayeeAddr3),
        await ensure(_PaymentsPages.mt101PaymentPage.sendAmountValue).textContains(isEdit ? testData.MT101Payment.editAmount : testData.MT101Payment.amount),
        await ensure(_PaymentsPages.mt101PaymentPage.swiftBic).textContains(testData.MT101Payment.swiftBicValue),
        await ensure(_PaymentsPages.mt101PaymentPage.payeeBankName).textContains(testData.MT101Payment.payeeBankNameValue),
        await ensure(_PaymentsPages.mt101PaymentPage.bankCity).textContains(testData.MT101Payment.bankCityValue),
        await ensure(_PaymentsPages.mt101PaymentPage.bankCounty).textContains(testData.MT101Payment.bankCountyValue),
        await ensure(_PaymentsPages.mt101PaymentPage.regulatoryReporting).textContains(testData.MT101Payment.regulatoryReportingText1),
        await ensure(_PaymentsPages.mt101PaymentPage.regulatoryReporting2Value).textContains(testData.MT101Payment.regulatoryReportingText2),
        await ensure(_PaymentsPages.mt101PaymentPage.regulatoryReporting3Value).textContains(testData.MT101Payment.regulatoryReportingText3),
        await ensure(_PaymentsPages.mt101PaymentPage.paymentDetailsValue).textContains(testData.MT101Payment.paymentDetails),
        await ensure(_PaymentsPages.mt101PaymentPage.transactionNoteValue).textContains(testData.MT101Payment.transactionNotes),
        await ensure(_PaymentsPages.mt101PaymentPage.bankChargeValue).textContains(testData.MT101Payment.bankChargeValue),
        await ensure(_PaymentsPages.NewFastCollectionPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.mt101PaymentPage.balanceValue).isNotEmpty()
        await ensure(_PaymentsPages.mt101PaymentPage.deductAmountValue).textContains(isEdit ?testData.MT101Payment.editAmount : testData.MT101Payment.amount)
        await ensure(_PaymentsPages.mt101PaymentPage.fxContract).textContains(testData.MT101Payment.fxContractReference),
        await ensure(_PaymentsPages.mt101PaymentPage.bankAdd2).textContains(testData.MT101Payment.bankAdd2Value),
        await ensure(_PaymentsPages.mt101PaymentPage.totalDeductValue).textContains(isEdit ? testData.MT101Payment.editAmount : testData.MT101Payment.amount)
    }else{
         await ensure(_PaymentsPages.mt101PaymentPage.deductAmountValue).isNotEmpty(),
          await ensure(_PaymentsPages.mt101PaymentPage.totalDeductValue).isNotEmpty()
    }
}