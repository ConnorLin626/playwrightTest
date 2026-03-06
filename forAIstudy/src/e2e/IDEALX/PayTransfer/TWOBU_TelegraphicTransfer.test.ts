/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TWOBU_testData.json');
let reference = "";
let referenceCopy ="";

// IDXP-2116
describe('TWOBU_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, SIT ? testData.TelegraphicTransfer.SIT.pinId : testData.TelegraphicTransfer.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it('Copy a TT Payment with New MM Purpose Code', async function () {
        //create a TT without New MM Purpose Code
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.cnexistingPayee);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TelegraphicTransfer.purposeCode);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
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
        //copy TT with select new MM purpose
        await _PaymentsPages.TelegraphicTransferPage.copyButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        //update to MM Payee
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.mmexistingPayee);
         await Promise.all([
                    await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeLabel2).textContains("Purpose of payment (Receiving party purpose code)"),
                ]);
        await _PaymentsPages.TelegraphicTransferPage.RPPC.click();
        await _PaymentsPages.TelegraphicTransferPage.filterRppc.input(testData.TelegraphicTransfer.RPPC);
        await _PaymentsPages.TelegraphicTransferPage.selectFirstResult.click();
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
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.mmexistingPayee),
            await ensure(_PaymentsPages.TelegraphicTransferPage.ReceivingPartyPurposeCodeView).textContains(testData.TelegraphicTransfer.RPPC),
        ]);
    });
});


