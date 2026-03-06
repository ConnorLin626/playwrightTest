/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages} from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let reference ="";
let referenceEdit ="";
let testData = _PaymentsPages.fetchTestData('IN_testData.json');

describe('IN_TT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TTPayment.SIT.loginCompanyId : testData.TTPayment.UAT.loginCompanyId, SIT ? testData.TTPayment.SIT.loginUserId : testData.TTPayment.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // Add for IDXP-812
    it('Create TT Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TTPayment.currency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TTPayment.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click()
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TTPayment.country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TTPayment.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TTPayment.beneRoutingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TTPayment.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TTPayment.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TTPayment.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TTPayment.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TTPayment.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TTPayment.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TTPayment.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TTPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.underlyingCode.select(testData.TTPayment.underlyingCode);
        await _PaymentsPages.TelegraphicTransferPage.LocationOfService.select(testData.TTPayment.locationofService);
        await _PaymentsPages.TelegraphicTransferPage.CAAcknNumber.input(testData.TTPayment.CAAcknNumber);
        await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.TTPayment.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.TTPayment.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TTPayment.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TTPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TTPayment.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TTPayment.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TTPayment.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TTPayment.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TTPayment.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TTPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TTPayment.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.A2Ack.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await checkViewPageAllField(false)  // add for IDXP-812
    });
   
    it('Edit TT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);

        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("IN - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TTPayment.editAmount);
        await _PaymentsPages.TelegraphicTransferPage.underlyingCode.select(testData.TTPayment.underlyingCodeEdit);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TTPayment.editAmount)
        ]);
        }
    });


    // Add for IEBAA-3757
    it('Create TT Payment after final approval bank return reject code RF02', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TTPayment.currency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TTPayment.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click()
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TTPayment.country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TTPayment.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TTPayment.beneRoutingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(testData.TTPayment.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TTPayment.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TTPayment.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TTPayment.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TTPayment.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TTPayment.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TTPayment.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TTPayment.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.underlyingCode.select(testData.TTPayment.underlyingCode);
        await _PaymentsPages.TelegraphicTransferPage.LocationOfService.select(testData.TTPayment.locationofService);
        await _PaymentsPages.TelegraphicTransferPage.CAAcknNumber.input(testData.TTPayment.CAAcknNumber);
        await _PaymentsPages.TelegraphicTransferPage.digiDocFileUploadButton.select(testData.TTPayment.uploadFileName);
        await _PaymentsPages.TelegraphicTransferPage.DocType.select(testData.TTPayment.DocumentType);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TTPayment.rejectCode);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TTPayment.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.A2Ack.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.challengeResponse.input('123123');
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await browser.sleep(4000);// Waiting for status change
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.BankRejected),
            await ensure(_PaymentsPages.TelegraphicTransferPage.bankRejectSection).textContains(testData.status.BankRejected),
            await ensure(_PaymentsPages.TelegraphicTransferPage.bankRemarksValue).textContains(testData.TTPayment.bankRemarks),
        ]);
        await _PaymentsPages.TelegraphicTransferPage.notificationButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForNotificationPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.MessageInfo).textIs(testData.TTPayment.inboxMessage),
        ]);
    });
});

export async function checkViewPageAllField(isEdit:boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TTPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TTPayment.newPayeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TTPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TTPayment.newPayeeAdd2),
       //wait ensure(_PaymentsPages.TelegraphicTransferPage.toAccountNumberValue).textContains(testData.TTPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TTPayment.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(isEdit ? testData.TTPayment.editAmount:testData.TTPayment.amount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(testData.TTPayment.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocation).textContains(testData.TTPayment.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).textContains(testData.TTPayment.bankAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress2).textContains(testData.TTPayment.bankAdd2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankCity).textContains(testData.TTPayment.bankCity),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankRoutingCode).textContains(testData.TTPayment.routingCodeValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(testData.TTPayment.payeeBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TTPayment.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TTPayment.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TTPayment.bankChargeUs),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(testData.TTPayment.purposeCodeValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.underlyingCodeValue).textContains(isEdit?testData.TTPayment.underlyingCodeEdit :  testData.TTPayment.underlyingCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.localOfServiceValue).textContains(testData.TTPayment.locationofService),
        await ensure(_PaymentsPages.TelegraphicTransferPage.caAckNumValue).textContains(testData.TTPayment.CAAcknNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.digiDocUploadedDocumentType3).textContains(testData.TTPayment.DocumentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.custRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TTPayment.transactionNote),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TTPayment.messageToOrderingBank),
        await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}
