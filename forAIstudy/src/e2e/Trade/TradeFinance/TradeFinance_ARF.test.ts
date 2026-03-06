/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

let customerRef = '';

describe('Trade Finance Transaction ARF', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.TradeFinance_ARF.SIT.loginCompanyId : testData.TradeFinance_ARF.UAT.loginCompanyId,
            SIT ? testData.TradeFinance_ARF.SIT.loginUserId : testData.TradeFinance_ARF.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Able to create Trade Finance ARF', async function () {

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.tradeFinanceARFPage.loadCondition();
        // step 1
        await _TradeFinancePages.tradeFinanceARFPage.selectProductType.selectByValue(testData.paymentType.TradeFinance);
        await _TradeFinancePages.tradeFinanceARFPage.selectSubProductType.selectByValue(testData.paymentType.TradeFinance_ARF);
        await _TradeFinancePages.tradeFinanceARFPage.continueButton.click();
        // step 2
        await _TradeFinancePages.tradeFinanceARFPage.selectRouting.selectFirst();
        customerRef = 'TFARF' + generatedID();
        await _TradeFinancePages.tradeFinanceARFPage.custRef.input(customerRef);
        await _TradeFinancePages.tradeFinanceARFPage.continueSaveButton.click();
        await Promise.all([
            await ensure(_TradeFinancePages.tradeFinanceARFPage).isTradeSuccess(), // has success message.
        ]);
        //input detail data
        await _TradeFinancePages.tradeFinanceARFPage.applicant.selectFirst();
        await _TradeFinancePages.tradeFinanceARFPage.invoiceCcy.selectByValue(testData.TradeFinance_ARF.invoiceCcy);
        await _TradeFinancePages.tradeFinanceARFPage.invoiceAmt.input(testData.TradeFinance_ARF.invoiceAmt);
        await _TradeFinancePages.tradeFinanceARFPage.financeCcy.selectByValue(testData.TradeFinance_ARF.financeCcy);
        await _TradeFinancePages.tradeFinanceAPFPage.financePeriod.input(testData.TradeFinance_APF.financePeriod);
        await _TradeFinancePages.tradeFinanceARFPage.descriptionOfGoods.input(testData.TradeFinance_ARF.descriptionOfGoods);
        await _TradeFinancePages.tradeFinanceARFPage.debitAcctOnMaturity.selectFirst();
        await _TradeFinancePages.tradeFinanceARFPage.debitChargesFromAnotherAcct.selectFirst();
        await _TradeFinancePages.tradeFinanceARFPage.contactPerson.input(testData.TradeFinance_ARF.contactPerson);
        await _TradeFinancePages.tradeFinanceARFPage.telCtrycode.selectByValue(testData.TradeFinance_ARF.telCtrycode);
        await _TradeFinancePages.tradeFinanceARFPage.telAreacode.input(testData.TradeFinance_ARF.telAreacode);
        await _TradeFinancePages.tradeFinanceARFPage.telNumber.input(testData.TradeFinance_ARF.telNumber);
        await _TradeFinancePages.tradeFinanceARFPage.attachmentsOptions.selectByValue(testData.TradeFinance_ARF.attachmentsOptions);
        await _TradeFinancePages.tradeFinanceARFPage.submitButton.click();
        await _TradeFinancePages.tradeFinanceARFPage.loadConditionForARFConfirmPage();
        await _TradeFinancePages.tradeFinanceARFPage.yesButton.click();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.tradeFinanceARFPage.loadConditionForARFEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.tradeFinanceARFPage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.tradeFinanceARFPage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.tradeFinanceARFPage.invoiceAmtView).textContains(testData.TradeFinance_ARF.invoiceAmt),
            await ensure(_TradeFinancePages.tradeFinanceARFPage.debitChargesFromAnotherAcctValue).isNotEmpty(),
        ]);
    });

    it('Approve an Trade Finance ARF', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.tradeFinanceARFPage.loadConditionForARFEditPage();
        await _TradeFinancePages.tradeFinanceARFPage.approveButton.click();
        await _TradeFinancePages.tradeFinanceARFPage.confirmButton.click();
        await _TradeFinancePages.tradeFinanceARFPage.approvePassword.input(testData.TradeFinance_ARF.approvePassword);
        await _TradeFinancePages.tradeFinanceARFPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.tradeFinanceARFPage.loadConditionForARFViewPage();
        await ensure(_TradeFinancePages.tradeFinanceARFPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });

});