/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase, devWatch } from '../../../lib';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

let customerRef = '';

describe('Trade Finance Transaction APF', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.TradeFinance_APF.SIT.loginCompanyId : testData.TradeFinance_APF.UAT.loginCompanyId,
            SIT ? testData.TradeFinance_APF.SIT.loginUserId : testData.TradeFinance_APF.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Able to create Trade Finance APF', async function () {

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.tradeFinanceAPFPage.loadCondition();
        // step 1
        await _TradeFinancePages.tradeFinanceAPFPage.selectProductType.selectByValue(testData.paymentType.TradeFinance);
        await _TradeFinancePages.tradeFinanceAPFPage.selectSubProductType.selectByValue(testData.paymentType.TradeFinance_APF);
        await _TradeFinancePages.tradeFinanceAPFPage.continueButton.click();
        // step 2
        customerRef = 'TFAPF' + generatedID();
        await _TradeFinancePages.tradeFinanceAPFPage.custRef.input(customerRef);
        await _TradeFinancePages.tradeFinanceAPFPage.selectRouting.selectFirst();
        await _TradeFinancePages.tradeFinanceAPFPage.continueSaveButton.click();
        await Promise.all([
            await ensure(_TradeFinancePages.tradeFinanceAPFPage).isTradeSuccess(), // has success message.
        ]);
        //input detail data
        await _TradeFinancePages.tradeFinanceAPFPage.applicant.selectFirst();
        // await _TradeFinancePages.tradeFinanceAPFPage.bene3rdPartyIDBtn.click();
        // await _TradeFinancePages.tradeFinanceAPFPage.loadConditionForBene3rdPartyPage();
        // await _TradeFinancePages.tradeFinanceAPFPage.partyID1st.click();
        // await _TradeFinancePages.tradeFinanceAPFPage.selectButton.click();
        await _TradeFinancePages.tradeFinanceAPFPage.tradeLoanType.selectFirst();
        await _TradeFinancePages.tradeFinanceAPFPage.invoiceCcy.selectByValue(testData.TradeFinance_APF.invoiceCcy);
        await _TradeFinancePages.tradeFinanceAPFPage.invoiceAmt.input(testData.TradeFinance_APF.invoiceAmt);
        await _TradeFinancePages.tradeFinanceAPFPage.financeCcy.selectByValue(testData.TradeFinance_APF.financeCcy);
        await _TradeFinancePages.tradeFinanceAPFPage.financePeriod.input(testData.TradeFinance_APF.financePeriod);
        await _TradeFinancePages.tradeFinanceAPFPage.supplierName.input(testData.TradeFinance_APF.supplierName);
        await _TradeFinancePages.tradeFinanceAPFPage.natureOfUnderlyingTrade.select(testData.TradeFinance_APF.natureOfUnderlyingTrade)
        await _TradeFinancePages.tradeFinanceAPFPage.descriptionOfGoods.input(testData.TradeFinance_APF.descriptionOfGoods);
        await _TradeFinancePages.tradeFinanceAPFPage.debitAcctOnMaturity.selectFirst();
        await _TradeFinancePages.tradeFinanceAPFPage.debitChargesFromAnotherAcct.selectFirst();
        await _TradeFinancePages.tradeFinanceAPFPage.contactPerson.input(testData.TradeFinance_APF.contactPerson);
        await _TradeFinancePages.tradeFinanceAPFPage.telCtrycode.selectByValue(testData.TradeFinance_APF.telCtrycode);
        await _TradeFinancePages.tradeFinanceAPFPage.telAreacode.input(testData.TradeFinance_APF.telAreacode);
        await _TradeFinancePages.tradeFinanceAPFPage.telNumber.input(testData.TradeFinance_APF.telNumber);
        await _TradeFinancePages.tradeFinanceAPFPage.attachmentsOptions.selectByValue(testData.TradeFinance_APF.attachmentsOptions);
        await _TradeFinancePages.tradeFinanceAPFPage.submitButton.click();
        await _TradeFinancePages.tradeFinanceAPFPage.loadConditionForAPFConfirmPage();
        await _TradeFinancePages.tradeFinanceAPFPage.yesButton.click();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.tradeFinanceAPFPage.loadConditionForAPFEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.tradeFinanceAPFPage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.tradeFinanceAPFPage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.tradeFinanceAPFPage.invoiceAmtView).textContains(testData.TradeFinance_APF.invoiceAmt),
            await ensure(_TradeFinancePages.tradeFinanceAPFPage.debitChargesFromAnotherAcctValue).isNotEmpty(),
        ]);
    });

    it('Approve an Trade Finance APF', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.tradeFinanceAPFPage.loadConditionForAPFEditPage();
        await _TradeFinancePages.tradeFinanceAPFPage.approveButton.click();
        await _TradeFinancePages.tradeFinanceAPFPage.confirmButton.click();
        await _TradeFinancePages.tradeFinanceAPFPage.approvePassword.input(testData.TradeFinance_APF.approvePassword);
        await _TradeFinancePages.tradeFinanceAPFPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.tradeFinanceAPFPage.loadConditionForAPFViewPage();
        await ensure(_TradeFinancePages.tradeFinanceAPFPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });

});