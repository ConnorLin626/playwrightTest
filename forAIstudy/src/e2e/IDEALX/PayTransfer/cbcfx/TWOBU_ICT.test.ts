/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE} from "../../../../lib";
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let testDataCB = _PaymentsPages.fetchTestData('TWOBU_testData.json');
let reference = "";

describe('TWOBU ICT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {await new NavigatePages().loginIdealx(SIT ? testDataCB.ICT.SIT.loginCompanyId : testDataCB.ICT.UAT.loginCompanyId, SIT ? testDataCB.ICT.SIT.loginUserId : testDataCB.ICT.UAT.loginUserId, "123123");});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // Add for R8.12 ,IDXP-389
    it('Create ICT with new add Purpose Code for TWOBU', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testDataCB.ICT.SIT.fromAccount : testDataCB.ICT.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testDataCB.ICT.SIT.toAccount : testDataCB.ICT.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testDataCB.ICT.amount);
        //wait input and loding complete
        await browser.sleep(2000);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testDataCB.ICT.SIT.fromAccount : testDataCB.ICT.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testDataCB.ICT.SIT.toAccount : testDataCB.ICT.UAT.toAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testDataCB.ICT.amount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testDataCB.status.PendingVerification,testDataCB.status.PendingApproval),
        ]);
    });
});