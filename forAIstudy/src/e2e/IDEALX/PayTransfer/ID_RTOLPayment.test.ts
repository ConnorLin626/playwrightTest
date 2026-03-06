/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, handlerCase, SIT, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import * as moment from "moment";
// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
let referenceEdit ="";

let _PaymentsPages = new PaymentsPages();

let testData = _PaymentsPages.fetchTestData('ID_testData.json');
let currentDate = moment(new Date()).format("DD MMM YYYY");

describe('ID_RTOL Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.RTOLPayment.SIT.loginCompanyId : testData.RTOLPayment.UAT.loginCompanyId, SIT ? testData.RTOLPayment.SIT.loginUserId : testData.RTOLPayment.UAT.loginUserId, testData.RTOLPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create ID RTOL Payment with new Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTOLPaymentPage.loadCondition();
        await _PaymentsPages.RTOLPaymentPage.fromAccount.select(SIT ? testData.RTOLPayment.SIT.fromAccount : testData.RTOLPayment.UAT.fromAccount);
        await _PaymentsPages.RTOLPaymentPage.amount.input(testData.RTOLPayment.amount);
        await _PaymentsPages.RTOLPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTOLPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.RTOLPayment.country);
        await _PaymentsPages.RTOLPaymentPage.newPayeeName.input(testData.RTOLPayment.newPayeeName);
        await _PaymentsPages.RTOLPaymentPage.newPayeeNickname.input(testData.RTOLPayment.newPayeeNickname);
        await _PaymentsPages.RTOLPaymentPage.newPayeeAdd1.input(testData.RTOLPayment.newPayeeAdd1);
        await _PaymentsPages.RTOLPaymentPage.newPayeeAdd2.input(testData.RTOLPayment.newPayeeAdd2);
        await _PaymentsPages.RTOLPaymentPage.newPayeeAdd3.input(testData.RTOLPayment.newPayeeAdd3);
        await _PaymentsPages.RTOLPaymentPage.payeeBankID.select(SIT ? testData.RTOLPayment.SIT.payeeBankID : testData.RTOLPayment.UAT.payeeBankID);
        await _PaymentsPages.RTOLPaymentPage.newPayeeAcctNumber.input(testData.RTOLPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTOLPaymentPage.rtolTypeButton.jsClick();
        await _PaymentsPages.RTOLPaymentPage.paymentDetail.input(testData.RTOLPayment.paymentDetail);
        await _PaymentsPages.RTOLPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.RTOLPaymentPage.emailIdO.input(testData.RTOLPayment.emailIdO);
        await _PaymentsPages.RTOLPaymentPage.emailId1.input(testData.RTOLPayment.emailId1);
        await _PaymentsPages.RTOLPaymentPage.emailId2.input(testData.RTOLPayment.emailId2);
        await _PaymentsPages.RTOLPaymentPage.emailId3.input(testData.RTOLPayment.emailId3);
        await _PaymentsPages.RTOLPaymentPage.emailId4.input(testData.RTOLPayment.emailId4);
        await _PaymentsPages.RTOLPaymentPage.message.input(testData.RTOLPayment.message);
        await _PaymentsPages.RTOLPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.RTOLPaymentPage.transactionNote.input(testData.RTOLPayment.transactionNote);
        await _PaymentsPages.RTOLPaymentPage.nextButton.click();
        await _PaymentsPages.RTOLPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTOLPaymentPage.submitButton.click();
        await _PaymentsPages.RTOLPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTOLPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTOLPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages,reference);
        await checkViewPageAllField(false) //Add for IDXP-812
    });


    it('Edit a RTOLPayment Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - RTOL Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.RTOLPaymentPage.loadConditionForViewRTOLPaymentPage();
        await _PaymentsPages.RTOLPaymentPage.editButton.click();
        await _PaymentsPages.RTOLPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTOLPaymentPage.loadCondition();
        await _PaymentsPages.RTOLPaymentPage.amount.clean();
        await _PaymentsPages.RTOLPaymentPage.amount.input(testData.RTOLPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.RTOLPaymentPage.nextButton.click();
        await _PaymentsPages.RTOLPaymentPage.submitButton.click();
        await _PaymentsPages.RTOLPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.RTOLPaymentPage.goToViewPaymentPageViaRef(_PaymentsPages, referenceEdit);
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.RTOLPaymentPage.amountValue).textContains(testData.RTOLPayment.editAmount)
        ]);
        }
    });

});
export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.RTOLPaymentPage.headerRefValue).textContains(reference),
        await ensure(_PaymentsPages.RTOLPaymentPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.RTOLPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTOLPaymentPage.amountValue).textContains(isEdit ? testData.RTOLPayment.editAmount : testData.RTOLPayment.amount),
        await ensure(_PaymentsPages.RTOLPaymentPage.fromAccountValue).textContains(SIT ? testData.RTOLPayment.SIT.fromAccount : testData.RTOLPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.RTOLPaymentPage.balanceAmtValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTOLPaymentPage.toNewPayeeAccNumValue).textContains(testData.RTOLPayment.newPayeeAcctNumber),
        await ensure(_PaymentsPages.RTOLPaymentPage.toNewPayeeValue).textContains(testData.RTOLPayment.newPayeeName),
        await ensure(_PaymentsPages.RTOLPaymentPage.payeeAdd1Value).textContains(testData.RTOLPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.RTOLPaymentPage.payeeAdd2Value).textContains(testData.RTOLPayment.newPayeeAdd2),
        await ensure(_PaymentsPages.RTOLPaymentPage.payeeAdd3Value).textContains(testData.RTOLPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.RTOLPaymentPage.paymentDateValue).textContains(currentDate),
        await ensure(_PaymentsPages.RTOLPaymentPage.paymentTypeValue).textContains(testData.RTOLPayment.paymentType),
        await ensure(_PaymentsPages.RTOLPaymentPage.sendAmtValue).textContains(isEdit ? testData.RTOLPayment.editAmount : testData.RTOLPayment.amount),
        await ensure(_PaymentsPages.RTOLPaymentPage.bankNameValue).textContains(SIT ? testData.RTOLPayment.SIT.payeeBankName : testData.RTOLPayment.UAT.payeeBankName),
        await ensure(_PaymentsPages.RTOLPaymentPage.bankAdd1Value).textContains(SIT ? testData.RTOLPayment.SIT.bankAdd1 : testData.RTOLPayment.UAT.bankAdd1),
        await ensure(_PaymentsPages.RTOLPaymentPage.bankCityValue).textContains(SIT ? testData.RTOLPayment.SIT.bankCity : testData.RTOLPayment.UAT.bankCity),
        await ensure(_PaymentsPages.RTOLPaymentPage.bankCountryValue).textContains(testData.RTOLPayment.bankCountry),
        await ensure(_PaymentsPages.RTOLPaymentPage.bankSwiftbicValue).textContains(SIT ? testData.RTOLPayment.SIT.payeeBankID : testData.RTOLPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.RTOLPaymentPage.bankCodeValue).textContains(SIT ? testData.RTOLPayment.SIT.bankCode : testData.RTOLPayment.UAT.bankCode),
        await ensure(_PaymentsPages.RTOLPaymentPage.branchCodeValue).textContains(SIT ? testData.RTOLPayment.SIT.branchCode: testData.RTOLPayment.UAT.branchCode),
        await ensure(_PaymentsPages.RTOLPaymentPage.paymentDetailValue).textContains(testData.RTOLPayment.paymentDetail),
        await ensure(_PaymentsPages.RTOLPaymentPage.msgToPayeeValue).textContains(testData.RTOLPayment.message),
        await ensure(_PaymentsPages.RTOLPaymentPage.emailListValue).textContains(testData.RTOLPayment.emailIdO),
        await ensure(_PaymentsPages.RTOLPaymentPage.emailListValue).textContains(testData.RTOLPayment.emailId1),
        await ensure(_PaymentsPages.RTOLPaymentPage.emailListValue).textContains(testData.RTOLPayment.emailId2),
        await ensure(_PaymentsPages.RTOLPaymentPage.emailListValue).textContains(testData.RTOLPayment.emailId3),
        await ensure(_PaymentsPages.RTOLPaymentPage.emailListValue).textContains(testData.RTOLPayment.emailId4),
        await ensure(_PaymentsPages.RTOLPaymentPage.totalDeductAmtValue).textContains(isEdit ? testData.RTOLPayment.editAmount : testData.RTOLPayment.amount),
        await ensure(_PaymentsPages.RTOLPaymentPage.custRefValue).textContains(reference),
        await ensure(_PaymentsPages.RTOLPaymentPage.messageToApproverValue).textContains(testData.RTOLPayment.transactionNote),
        await ensure(_PaymentsPages.RTOLPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.RTOLPaymentPage.activityLog).isNotEmpty(),
    ]);
}
