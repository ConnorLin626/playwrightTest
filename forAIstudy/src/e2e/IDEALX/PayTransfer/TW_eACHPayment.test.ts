/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser } from 'protractor';
import { ensure,randomNumbers, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let reference: string = null;
let paymentReference='';
let reference2 = '';
let reference3 = '';

describe('TW eACH Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.eACHPayment.SIT.loginCompanyId : testData.eACHPayment.UAT.loginCompanyId, SIT ? testData.eACHPayment.SIT.loginUserId : testData.eACHPayment.UAT.loginUserId, SIT ? 123123 : testData.eACHPayment.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create eACH Payment with New Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.eACHPaymentPage.loadCondition();
        await _PaymentsPages.eACHPaymentPage.fromAccount.select(SIT ? testData.eACHPayment.SIT.fromAccount : testData.eACHPayment.UAT.fromAccount);
        await _PaymentsPages.eACHPaymentPage.amount.input(testData.eACHPayment.amount);
        await addNewPayee();
        await _PaymentsPages.eACHPaymentPage.billerServiceID.select(testData.eACHPayment.billerServiceID);
        await _PaymentsPages.eACHPaymentPage.paymentDetail.input(testData.eACHPayment.paymentDetail);
        await _PaymentsPages.eACHPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.eACHPaymentPage.emailIdO.input(testData.eACHPayment.emailIdO);
        await _PaymentsPages.eACHPaymentPage.emailId1.input(testData.eACHPayment.emailId1);
        await _PaymentsPages.eACHPaymentPage.emailId2.input(testData.eACHPayment.emailId2);
        await _PaymentsPages.eACHPaymentPage.emailId3.input(testData.eACHPayment.emailId3);
        await _PaymentsPages.eACHPaymentPage.emailId4.input(testData.eACHPayment.emailId4);
        await _PaymentsPages.eACHPaymentPage.message.input(testData.eACHPayment.message);
        await _PaymentsPages.eACHPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.eACHPaymentPage.transactionNote.input(testData.eACHPayment.transactionNote);
        await _PaymentsPages.eACHPaymentPage.nextButton.click();
        await _PaymentsPages.eACHPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.eACHPaymentPage.submitButton.click();
        await _PaymentsPages.eACHPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.eACHPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage();
        await checkViewPageAllField(false); // IDXP-812

    });

    it('Edit eACH Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage();
        await _PaymentsPages.eACHPaymentPage.editButton.click();
        await _PaymentsPages.eACHPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.eACHPaymentPage.loadCondition();
        await _PaymentsPages.eACHPaymentPage.amount.clean();
        await _PaymentsPages.eACHPaymentPage.amount.input(testData.eACHPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.eACHPaymentPage.nextButton.click();
        await _PaymentsPages.eACHPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.eACHPaymentPage.submitButton.click();
        await _PaymentsPages.eACHPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.eACHPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log('Reference of Edit eACH Payment:', reference);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage();
        await checkViewPageAllField(true); //IDXP-812
    });
    //IDXP-2278 ACH
    it('Edit eACH Payment With save as draft which payee be updated', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.eACHPaymentPage.loadCondition();
        await _PaymentsPages.eACHPaymentPage.fromAccount.select(SIT ? testData.eACHPayment.SIT.fromAccount : testData.eACHPayment.UAT.fromAccount);
        await _PaymentsPages.eACHPaymentPage.amount.input(testData.eACHPayment.amount);
        await _PaymentsPages.eACHPaymentPage.existingforPayee.select(testData.eACHPayment.updatedPayee);
        await _PaymentsPages.eACHPaymentPage.billerServiceID.select(testData.eACHPayment.billerServiceID);
        await _PaymentsPages.eACHPaymentPage.paymentDetail.input(testData.eACHPayment.paymentDetail);
        await _PaymentsPages.eACHPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.eACHPaymentPage.emailIdO.input(testData.eACHPayment.emailIdO);
        await _PaymentsPages.eACHPaymentPage.emailId1.input(testData.eACHPayment.emailId1);
        await _PaymentsPages.eACHPaymentPage.emailId2.input(testData.eACHPayment.emailId2);
        await _PaymentsPages.eACHPaymentPage.emailId3.input(testData.eACHPayment.emailId3);
        await _PaymentsPages.eACHPaymentPage.emailId4.input(testData.eACHPayment.emailId4);
        await _PaymentsPages.eACHPaymentPage.message.input(testData.eACHPayment.message);
        await _PaymentsPages.eACHPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.eACHPaymentPage.transactionNote.input(testData.eACHPayment.transactionNote);
        await _PaymentsPages.eACHPaymentPage.saveButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getDialogReferenceID().then(text => {
                        paymentReference = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //edit payee
        await _PaymentsPages.BeneficiaryPage.payeeMenu.click();
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.clean();
        await _PaymentsPages.BeneficiaryPage.payeeFilter.input(testData.eACHPayment.updatedPayee);
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

        //edit txn
                    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
                    await _PaymentsPages.TransferCentersPage.loadCondition();
                     if (0 !== paymentReference.trim().length) {
                    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
                } else {
                    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - eACH Payment", testData.status.Saved);
                }
                    await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage();
                    await _PaymentsPages.eACHPaymentPage.editButton.click();
                    await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
                    await _PaymentsPages.TelegraphicTransferPage.loadCondition();
            
                    await Promise.all([
                        
                        await ensure(_PaymentsPages.TelegraphicTransferPage.snackbarMsg).textContains("Payee details have been updated."),
                        await ensure(_PaymentsPages.TelegraphicTransferPage.PayeeDetail).textContains(testData.Beneficiary.add2+ramNumbers),
                    ]);
                    await browser.sleep(2000);
                    await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
                    await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
                    
                    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
                    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(paymentReference);
                    await _PaymentsPages.eACHPaymentPage.loadConditionForVieweACHPaymentPage(); 
                    await Promise.all([
                        //await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).isNotEmpty(),
                        await ensure(_PaymentsPages.eACHPaymentPage.toExistingPayeeNameValue).textContains(testData.eACHPayment.updatedPayee),
                        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd2).textContains(testData.Beneficiary.add2+ramNumbers),
                    ]);
            




        
    });





});

describe('TW eACH Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.eACHPayment.SIT.loginCompanyId1 : testData.eACHPayment.UAT.loginCompanyId1, SIT ? testData.eACHPayment.SIT.loginUserId1 : testData.eACHPayment.UAT.loginUserId1, SIT ? 123123 : testData.eACHPayment.UAT.Password); });
    const suitObject = this; beforeEach(async function () { process.env.currentTestTitle = this.currentTest.title; }); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // add IDXP-2013
    it('Create TW eACH payment from view template page', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.eACHPayment.TemplateName);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await _PaymentsPages.PaymentTemplatesPage.makeAPayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate2();
        await Promise.all([
            await _PaymentsPages.eACHPaymentPage.selectFromAccount.isDisabled(),
            await _PaymentsPages.eACHPaymentPage.existingPayee.isDisabled(),
            await _PaymentsPages.eACHPaymentPage.serviceID.isDisabled(),
        ]);
    });
});


async function addNewPayee(): Promise<void> {
    await _PaymentsPages.eACHPaymentPage.newPayeeTab.click();
    await _PaymentsPages.eACHPaymentPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.eACHPaymentPage.newPayeeName.input(testData.eACHPayment.newPayeeName);
    await _PaymentsPages.eACHPaymentPage.newPayeeNickname.input(testData.eACHPayment.newPayeeNickname);
    await _PaymentsPages.eACHPaymentPage.newPayeeAdd1.input(testData.eACHPayment.newPayeeAdd1);
    await _PaymentsPages.eACHPaymentPage.newPayeeAdd2.input(testData.eACHPayment.newPayeeAdd2);
    await _PaymentsPages.eACHPaymentPage.newPayeeAdd3.input(testData.eACHPayment.newPayeeAdd3);
    await _PaymentsPages.eACHPaymentPage.payeeBankID.select(SIT ? testData.eACHPayment.SIT.payeeBankID : testData.eACHPayment.UAT.payeeBankID);
    await _PaymentsPages.eACHPaymentPage.newPayeeAcctNumber.input(testData.eACHPayment.newPayeeAcctNum);
    await _PaymentsPages.eACHPaymentPage.newPayeeNationalId.input(testData.eACHPayment.newPayeeNationalId);
}

export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
        await ensure(_PaymentsPages.eACHPaymentPage.headerRef).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.eACHStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        await ensure(_PaymentsPages.eACHPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.deductAmountValue).textContains(isEdit ? testData.eACHPayment.editAmount : testData.eACHPayment.amount),
        await ensure(_PaymentsPages.eACHPaymentPage.fromAccountValue).textContains(SIT ? testData.eACHPayment.SIT.fromAccount : testData.eACHPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.eACHPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.toNewPayeeAcctValue).textContains(testData.eACHPayment.newPayeeAcctNum),
        await ensure(_PaymentsPages.eACHPaymentPage.toNewPayeeNameValue).textContains(testData.eACHPayment.newPayeeName),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd1).textContains(testData.eACHPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd2).textContains(testData.eACHPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeAdd3).textContains(testData.eACHPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.eACHPaymentPage.nationalId).textContains(testData.eACHPayment.newPayeeNationalId),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentType).textContains(testData.eACHPayment.paymentTypeView),
        await ensure(_PaymentsPages.eACHPaymentPage.sendAmountValue).textContains(isEdit ? testData.eACHPayment.editAmount : testData.eACHPayment.amount),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankName).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankAdress1).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankSwiftBic).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankCode).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeBankBrchCode).isNotEmpty(),
        await ensure(_PaymentsPages.eACHPaymentPage.payeeNationalID).textContains(testData.eACHPayment.newPayeeNationalId),
        await ensure(_PaymentsPages.eACHPaymentPage.paymentDetailValue).textContains(testData.eACHPayment.paymentDetail),
        await ensure(_PaymentsPages.eACHPaymentPage.messageValue).textContains(testData.eACHPayment.message),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(testData.eACHPayment.emailIdO),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(testData.eACHPayment.emailId1),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(testData.eACHPayment.emailId2),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(testData.eACHPayment.emailId3),
        await ensure(_PaymentsPages.eACHPaymentPage.emailList).textContains(testData.eACHPayment.emailId4),
        await ensure(_PaymentsPages.eACHPaymentPage.billerServiceId).textContains(testData.eACHPayment.billerServiceID),
        await ensure(_PaymentsPages.eACHPaymentPage.msgToApproverView).textContains(testData.eACHPayment.transactionNote),
    ]);
}