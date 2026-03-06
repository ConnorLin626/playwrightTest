/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import * as moment from 'moment';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');
let expiryDate = moment().add(10, 'days').format('DD-MMM-YYYY');

describe('Import LC Amendment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.importLCAmendment.SIT.loginCompanyId : testData.importLCAmendment.UAT.loginCompanyId,
            SIT ? testData.importLCAmendment.SIT.loginUserId : testData.importLCAmendment.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Import LC Amendment', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.importLCAmendmentPage.loadCondition();
        // step 1
        await _TradeFinancePages.importLCAmendmentPage.selectProductType.selectByValue(testData.paymentType.IDLC);
        await _TradeFinancePages.importLCAmendmentPage.selectSubProductType.selectByValue(testData.paymentType.IDLC_ISS);
        await _TradeFinancePages.importLCAmendmentPage.createAmendmentCheckBox.click();
        await _TradeFinancePages.importLCAmendmentPage.continueButton.click();
        // step 2
        await _TradeFinancePages.importLCAmendmentPage.balanceCustomerRef.input(SIT ? testData.importLCAmendment.SIT.balanceCustomerRef : testData.importLCAmendment.UAT.balanceCustomerRef);
        await _TradeFinancePages.importLCAmendmentPage.continueSaveButton.click();
        await ensure(_TradeFinancePages.importLCAmendmentPage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.importLCAmendmentPage.sendVia.selectFirst();
        await _TradeFinancePages.importLCAmendmentPage.expiryDate.input(expiryDate);
        await _TradeFinancePages.importLCAmendmentPage.amountSelect.selectFirst();
        await _TradeFinancePages.importLCAmendmentPage.transAmount.input(testData.importLCAmendment.transAmount);
        await _TradeFinancePages.importLCAmendmentPage.amendmentIssuanceCharges.selectFirst();
        await _TradeFinancePages.importLCAmendmentPage.debitAccNo.selectByValue(SIT ? testData.importLCAmendment.SIT.debitAccNo : testData.importLCAmendment.UAT.debitAccNo);
        await _TradeFinancePages.importLCAmendmentPage.cntPerson.input(testData.importLCAmendment.cntPerson);
        await _TradeFinancePages.importLCAmendmentPage.telephoneNumber.selectFirst();
        await _TradeFinancePages.importLCAmendmentPage.areaCode.input(testData.importLCAmendment.areaCode);
        await _TradeFinancePages.importLCAmendmentPage.number.input(testData.importLCAmendment.number);
        await _TradeFinancePages.importLCAmendmentPage.submit.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadConditionForCustomerRefBeClick();
        await _TradeFinancePages.transactionInProcessPage.selectProductType.selectByValue(testData.paymentType.IDLC);
        await _TradeFinancePages.transactionInProcessPage.selectSubProductType.selectByValue(testData.paymentType.IDLC_ISS);
        await _TradeFinancePages.transactionInProcessPage.customerRef.input(SIT ? testData.importLCAmendment.SIT.customerRef : testData.importLCAmendment.UAT.customerRef);
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionInProcessPage.selectButton.jsClick();

        // await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(SIT ? testData.importLCAmendment.SIT.customerRef : testData.importLCAmendment.UAT.customerRef);
        await _TradeFinancePages.importLCAmendmentPage.loadConditionForImportLCEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.importLCAmendmentPage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.importLCAmendmentPage.expiryDate).textContains(expiryDate),
            await ensure(_TradeFinancePages.importLCAmendmentPage.transAmount).isNotEmpty(),
            await ensure(_TradeFinancePages.importLCAmendmentPage.debitAccNo).isNotEmpty(),
        ]);
    });

    it('Approve Import LC Amendment', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadConditionForCustomerRefBeClick();
        await _TradeFinancePages.transactionInProcessPage.selectProductType.selectByValue(testData.paymentType.IDLC);
        await _TradeFinancePages.transactionInProcessPage.selectSubProductType.selectByValue(testData.paymentType.IDLC_ISS);
        await _TradeFinancePages.transactionInProcessPage.customerRef.input(SIT ? testData.importLCAmendment.SIT.customerRef : testData.importLCAmendment.UAT.customerRef);
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionInProcessPage.selectButton.jsClick();
        // await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(SIT ? testData.importLCAmendment.SIT.customerRef : testData.importLCAmendment.UAT.customerRef);
        await _TradeFinancePages.importLCAmendmentPage.loadConditionForImportLCEditPage();
        await _TradeFinancePages.importLCAmendmentPage.approve.click();
        await _TradeFinancePages.importLCAmendmentPage.confirmButton.click();
        await _TradeFinancePages.importLCAmendmentPage.approvePassword.input(testData.importLCAmendment.approvePassword);
        await _TradeFinancePages.importLCAmendmentPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradeAmendmentPageViaRef(SIT ? testData.importLCAmendment.SIT.customerRef : testData.importLCAmendment.UAT.customerRef);
        await _TradeFinancePages.importLCAmendmentPage.loadConditionForImportLCViewPage();
        await ensure(_TradeFinancePages.importLCAmendmentPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });
});
