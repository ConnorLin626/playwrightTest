/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ApprovalsPages, NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
// this from OnlineCreate, then Reject/Edit/Delete
let reference = '';
// this from createFromTemplate,then copy
let reference2 = '';
// this from copy,then Verify/Approval/Release
let reference3 = '';
let verifyReference = '';
let approvalReference = '';
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
const CB_1 = require("../../../pages/IDEALX");
const lib_1 = require("../../../lib");
const protractor_1 = require("protractor");
let testData = _PaymentsPages.fetchTestData('GC_testData.json');

describe('GC_IntraCompanyTransfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.loginUserId : testData.IntraCompanyTransfer.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an ICT Payment  that From account currency is not same as To account currency', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromUSDAccount : testData.IntraCompanyTransfer.UAT.fromUSDAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toEURAccount : testData.IntraCompanyTransfer.UAT.toEURAccount);
        await ensure(_PaymentsPages.IntraCompanyTransferPage.AccountErrorMeaasge).textIs(testData.IntraCompanyTransfer.ErrorMessage);
    }),


    it('Create an ICT Payment  with approve now with M-Chanllenge', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromUSDAccount : testData.IntraCompanyTransfer.UAT.fromUSDAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toUSDAccount : testData.IntraCompanyTransfer.UAT.toUSDAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.pushOption.jsClickIfExist();
        await ensure(_PaymentsPages.IntraCompanyTransferPage.getChallenge).isVisible();
        await _PaymentsPages.IntraCompanyTransferPage.getChallenge.click();
        await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input(testData.IntraCompanyTransfer.challengeCode);
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await browser.sleep(5000);
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromUSDAccount : testData.IntraCompanyTransfer.UAT.fromUSDAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.toUSDAccount : testData.IntraCompanyTransfer.UAT.toUSDAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Completed,testData.status.Received)
        ]);
    }); 
});
