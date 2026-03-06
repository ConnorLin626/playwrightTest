/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages} from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase,generatedID,PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let templateName = '';
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN_ACT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ACT.SIT.loginCompanyId : testData.ACT.UAT.loginCompanyId, SIT ? testData.ACT.SIT.loginUserId : testData.ACT.UAT.loginUserId, testData.ACT.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create ACT with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(testData.ACT.fromAccount);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.ACT.amountA);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click()
        await _PaymentsPages.AccountTransferPage.Country.select(testData.ACT.country);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.ACT.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.ACT.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.ACT.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.ACT.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.ACT.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.ACT.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.ACT.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.ACT.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.ACT.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.ACT.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.ACT.transactionNote);
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
        await checkViewPageAllField();
    });

    it('Create CN ACT template that from account is CNY to account is IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleCNPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'CNACTPayment' + generatedID();
        let ACTPayeeName = 'ACTPayee' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.AccountTransferPage.fromAccount.select(testData.ACT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.currencySelect.select(testData.ACT.idrPaymentCcy);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.ACT.amount);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.Country.select(testData.ACT.country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.ACT.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(ACTPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(ACTPayeeName);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        //await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForACTtempViewPayge();
        await Promise.all([
           await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccountACT).textContains(testData.ACT.fromAccount),
           await ensure(_PaymentsPages.PaymentTemplatesPage.amountACT).textContains(testData.ACT.amount),
           await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameACT).textContains(ACTPayeeName),
           await ensure(_PaymentsPages.PaymentTemplatesPage.templateACTStatus).textIs(testData.status.Approved),
        ]);
        await deleteTemplate(templateName)
        await deletePayee(ACTPayeeName);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.AccountTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(testData.ACT.fromAccount),
        await ensure(_PaymentsPages.AccountTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.payeeInfo).textContains(testData.ACT.newPayeeAcctNumber),
        await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.ACT.newPayeeName),
        await ensure(_PaymentsPages.AccountTransferPage.payeeInfo).textContains(testData.ACT.newPayeeAdd1),
        await ensure(_PaymentsPages.AccountTransferPage.payeeInfo).textContains(testData.ACT.newPayeeAdd2), 
        // await ensure(_PaymentsPages.AccountTransferPage.payeeInfo).textContains(testData.ACT.newPayeeAdd3),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.paymentType).textContains(testData.ACT.paymentType),
        await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.ACT.amountA),
        await ensure(_PaymentsPages.AccountTransferPage.paymentDetailValue).textContains(testData.ACT.paymentDetail),
        await ensure(_PaymentsPages.AccountTransferPage.messageValue).textContains(testData.ACT.message),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.ACT.emailIdO),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.ACT.emailId1),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.ACT.emailId2),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.ACT.emailId3),
        await ensure(_PaymentsPages.AccountTransferPage.emailList).textContains(testData.ACT.emailId4),
        await ensure(_PaymentsPages.AccountTransferPage.totalDeductValue).textContains(testData.ACT.amountA),
        await ensure(_PaymentsPages.AccountTransferPage.messageToApproverValue).textContains(testData.ACT.transactionNote),
        await ensure(_PaymentsPages.AccountTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.AccountTransferPage.activityLog).textContains("Create")
    ]);
}

export async function deletePayee(payeename : string) {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(payeename);
        await _PaymentsPages.BeneficiaryPage.deletePayeeBtn.click();
        await _PaymentsPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        await _PaymentsPages.BeneficiaryPage.confirmDelete.click();
        await _PaymentsPages.BeneficiaryPage.loadConditionForDismissButton();
        await _PaymentsPages.BeneficiaryPage.dismiss.click();
}

export async function deleteTemplate(templateName : string){
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
    await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
        templateName = text.trim();
    });
    await _PaymentsPages.PaymentTemplatesPage.deleteBtn.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForDeletePage();
    await _PaymentsPages.PaymentTemplatesPage.preDeleteBtn.jsClick();  //preview delete
    await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
    await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
}