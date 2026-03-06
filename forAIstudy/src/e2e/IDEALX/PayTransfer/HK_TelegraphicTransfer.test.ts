/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');
let reference = "";
let reference1 = "";
let referenceEdit ="";
let referenceCopy ="";

describe('HK_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, SIT ? testData.TelegraphicTransfer.SIT.pinId : testData.TelegraphicTransfer.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it('Create a TT Payment without Purpose Code', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        // await _PaymentsPages.PaymentLocalOverseasPayeePage.purposeCode.select(testData.TelegraphicTransfer.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        // await _PaymentsPages.PaymentLocalOverseasPayeePage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.clickIfExist();
        await _PaymentsPages.PayrollPage.hasUXIxErrorMsg1(testData.TelegraphicTransfer.errorMessage).then(value => {
            if (!value) {
                throw new Error('error message is wrong.');
            }
        });
    });

    it('Create a TT Payment with Purpose Code and Payment Details', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankIsIntermediary.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankCountry.select(testData.TelegraphicTransfer.intermediaryBankCountry);
        await _PaymentsPages.TelegraphicTransferPage.intermediaryBankID.select(testData.TelegraphicTransfer.intermediaryBankID);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.TelegraphicTransfer.purposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        // add for AB-8435: HK TT payment details support chinese char
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await checkViewPageAllField(false); //IDXP-812
    });

    it('Edit a HK TT Payment via Transfer Center', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("HK - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
            console.log(reference);
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        if(referenceEdit==reference){
            await checkViewPageAllField(true); //IDXP-812
        }else{
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.editAmount)
        }
    });

    // IDXP-777 Purpose Code dropdown for INR
    it('Copy a TT Payment with Purpose Code for INR CCY', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.INRCCY);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.NewTTPayeeForINR);
        await _PaymentsPages.TelegraphicTransferPage.purposeCodeReskin.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.TelegraphicTransfer.purposeCodeForINR);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TelegraphicTransfer.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TelegraphicTransfer.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TelegraphicTransfer.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TelegraphicTransfer.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TelegraphicTransfer.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TelegraphicTransfer.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TelegraphicTransfer.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference1 = text;
            console.log(reference1);
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.copyButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.editAmount);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.clean();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.EditpaymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TransferCentersPage.getIdealxInfoReferenceID().then(text => {
            referenceCopy = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceCopy);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.editAmount),

            await ensure(_PaymentsPages.TelegraphicTransferPage.purposeOfPaymentView).textContains(testData.TelegraphicTransfer.purposeCodeForINR),
        ]);
    });

    //Add for IDXP-2004
    it('Create a TT Payment with existing payee that address1 no value check will display update payee pop up', async function () {
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.paymentCurrency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayeeNoAdd1);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        //await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TelegraphicTransfer.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.updatePayeePopUp).textContains(testData.TelegraphicTransfer.updatePayeeDeatil),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.closBtn.click();
    });
});

export async function checkViewPageAllField(isEdit: boolean = true) {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TelegraphicTransfer.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(isEdit ? testData.TelegraphicTransfer.editAmount : testData.TelegraphicTransfer.amountA1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(SIT ? testData.TelegraphicTransfer.SIT.payeeBankName : testData.TelegraphicTransfer.UAT.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocationHK).textContains(testData.TelegraphicTransfer.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankCity).textContains(SIT ? testData.TelegraphicTransfer.SIT.payeeBankCity : testData.TelegraphicTransfer.UAT.payeeBankCity),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankRoutingCode).textContains(testData.TelegraphicTransfer.payeeBankRoutingCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textContains(SIT ? testData.TelegraphicTransfer.SIT.payeeBankSwiftbic: testData.TelegraphicTransfer.UAT.payeeBankSwiftbic),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textContains(testData.TelegraphicTransfer.intermediaryBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textContains(SIT ? testData.TelegraphicTransfer.SIT.intermediaryBankName: testData.TelegraphicTransfer.UAT.intermediaryBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TelegraphicTransfer.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TelegraphicTransfer.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TelegraphicTransfer.bankChargeValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(testData.TelegraphicTransfer.chargeAcctValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(testData.TelegraphicTransfer.purposeCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.custRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TelegraphicTransfer.transactionNote),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TelegraphicTransfer.messageToOrderingBank),
    ]);
}
