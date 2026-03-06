import { browser } from 'protractor';
import { NavigatePages, PaymentsPages } from '../../../pages/IDEALX';
import { handlerCase, SIT, PROJECT_TYPE, ensure } from '../../../lib';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');

let referenceForETAX = ""; 

describe('ID_ETAX Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ETAXPayment.SIT.loginCompanyId : testData.ETAXPayment.UAT.loginCompanyId, SIT ? testData.ETAXPayment.SIT.loginUserId : testData.ETAXPayment.UAT.loginUserId, testData.ETAXPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create ETAX with all fields', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.taxPayment.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForIDTax();
        await _PaymentsPages.ETAXPaymentPage.FromAccount.select(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount);
        await _PaymentsPages.ETAXPaymentPage.billCode.input(testData.ETAXPayment.billingCode);
        await _PaymentsPages.ETAXPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.ETAXPaymentPage.transactionNote.input(testData.ETAXPayment.additionNote)
        await _PaymentsPages.ETAXPaymentPage.nextButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.ETAXPaymentPage.submitButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.ETAXPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceForETAX = text;
        });
        await _PaymentsPages.ETAXPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceForETAX);
        await _PaymentsPages.ETAXPaymentPage.loadConditionForViewIDTax();
        await checkViewPageAllField();//Add for IDXP-812
    });

    it('Create payment with 3 new fields Kelurahan,Kecamatan,Provinsi ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.ETAXPaymentPage.taxPayment.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForIDTax();
        await _PaymentsPages.ETAXPaymentPage.FromAccount.select(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount);
        await _PaymentsPages.ETAXPaymentPage.billingRegister.jsClick();
        await _PaymentsPages.ETAXPaymentPage.taxAmount.input(testData.ETAXPayment.taxAmount);
        await _PaymentsPages.ETAXPaymentPage.NPWP.input(testData.ETAXPayment.NPWP);
        await _PaymentsPages.ETAXPaymentPage.NPWPDepositor.input(testData.ETAXPayment.NPWPDepositor);
        await _PaymentsPages.ETAXPaymentPage.taxIdNumber.input(testData.ETAXPayment.taxIdNumber);
        await _PaymentsPages.ETAXPaymentPage.payerName.input(testData.ETAXPayment.taxPayerName);
        await _PaymentsPages.ETAXPaymentPage.payerAddress.input(testData.ETAXPayment.taxPayerAddress);
        await _PaymentsPages.ETAXPaymentPage.payerCity.input(testData.ETAXPayment.taxPayerCity);
        await _PaymentsPages.ETAXPaymentPage.accountCode.input(testData.ETAXPayment.accountCode);
        await _PaymentsPages.ETAXPaymentPage.depositTypeCode.input(testData.ETAXPayment.depositTypeCode);
        await _PaymentsPages.ETAXPaymentPage.SSP.input(testData.ETAXPayment.SSP);
        await _PaymentsPages.ETAXPaymentPage.kelurahan.input(testData.ETAXPayment.kelurahan);
        await _PaymentsPages.ETAXPaymentPage.kecamatan.input(testData.ETAXPayment.kecamatan);
        await _PaymentsPages.ETAXPaymentPage.provinsi.input(testData.ETAXPayment.provinsi);
        await _PaymentsPages.ETAXPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.ETAXPaymentPage.transactionNote.input(testData.ETAXPayment.additionNote)
        await _PaymentsPages.ETAXPaymentPage.nextButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.ETAXPaymentPage.submitButton.click();
        await _PaymentsPages.ETAXPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.ETAXPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceForETAX = text.trim();
        });
        await _PaymentsPages.ETAXPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceForETAX);
        await _PaymentsPages.ETAXPaymentPage.loadConditionForViewIDTax();
        await Promise.all([
            await ensure(_PaymentsPages.ETAXPaymentPage.kelurahanValue).textContains(testData.ETAXPayment.kelurahan),
            await ensure(_PaymentsPages.ETAXPaymentPage.KecamatanValue).textContains(testData.ETAXPayment.kecamatan),
            await ensure(_PaymentsPages.ETAXPaymentPage.provinsiValue).textContains(testData.ETAXPayment.provinsi),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.ETAXPaymentPage.IDheaderRefValue).textContains(referenceForETAX),
        await ensure(_PaymentsPages.ETAXPaymentPage.ViewStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Submitted,testData.status.Failed),
        await ensure(_PaymentsPages.ETAXPaymentPage.viewAccountValue).textContains(SIT ? testData.ETAXPayment.SIT.fromAccount : testData.ETAXPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.ETAXPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.ETAXPaymentPage.IDpaymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.ETAXPaymentPage.billOrgValue).textContains(testData.ETAXPayment.billingOrg),
        await ensure(_PaymentsPages.ETAXPaymentPage.billCodeValue).textContains(testData.ETAXPayment.billiingCodeValue),
        await ensure(_PaymentsPages.ETAXPaymentPage.messageToApproverValue).textContains(testData.ETAXPayment.additionNote),
        await ensure(_PaymentsPages.ETAXPaymentPage.referenceValue).textContains(referenceForETAX),
        await ensure(_PaymentsPages.ETAXPaymentPage.activityLog).isNotEmpty(),
    ]);
}

