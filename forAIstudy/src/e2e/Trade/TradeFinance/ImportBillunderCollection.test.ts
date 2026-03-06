/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, handlerCase } from '../../../lib';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

let customerRef = '';
let status = '';

describe('Import Bill under Collection', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(testData.ImportBiillunderCollection.UAT.loginCompanyId, testData.ImportBiillunderCollection.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Approve an Import Bill under Collection', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
        await _TradeFinancePages.transactionInProcessPage.selectProductType.select("Import Bill under Collection");
        await _TradeFinancePages.transactionInProcessPage.selectSubProductType.select("Import Bill under Collection");
        await _TradeFinancePages.transactionInProcessPage.selectStatusCd.select("Received From Bank");
        await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
        await _TradeFinancePages.transactionInProcessPage.loadCondition();
        await _TradeFinancePages.transactionInProcessPage.firstTxn.click();
        await _TradeFinancePages.transactionInProcessPage.selectButton.click();
        await _TradeFinancePages.importBillunderCollectionPage.loadConditionForIBUCEditPage();
        await _TradeFinancePages.importBillunderCollectionPage.ref.getText().then(text => {
            customerRef = text.trim();
        });
        await _TradeFinancePages.importBillunderCollectionPage.status.getText().then(text => {
            status = text.trim();
        });
        // to  make sure has data to approve 
        if (status == 'Received From Bank') {
            await _TradeFinancePages.importBillunderCollectionPage.sendResponseTo.select(testData.ImportBiillunderCollection.sendResponseTo);
            await _TradeFinancePages.importBillunderCollectionPage.responseOptions.select(testData.ImportBiillunderCollection.responseOption);
            await _TradeFinancePages.importBillunderCollectionPage.contactPerson.clean();
            await _TradeFinancePages.importBillunderCollectionPage.contactPerson.input(testData.ImportBiillunderCollection.contactPerson);
            await _TradeFinancePages.importBillunderCollectionPage.telCtrycode.select(testData.ImportBiillunderCollection.telCtrycode);
            await _TradeFinancePages.importBillunderCollectionPage.telAreacode.clean();
            await _TradeFinancePages.importBillunderCollectionPage.telAreacode.input(testData.ImportBiillunderCollection.telAreacode);
            await _TradeFinancePages.importBillunderCollectionPage.telNumber.clean();
            await _TradeFinancePages.importBillunderCollectionPage.telNumber.input(testData.ImportBiillunderCollection.telNumber);
            await _TradeFinancePages.importBillunderCollectionPage.faxCtrycode.select(testData.ImportBiillunderCollection.faxCtrycode);
            await _TradeFinancePages.importBillunderCollectionPage.faxAreacode.clean();
            await _TradeFinancePages.importBillunderCollectionPage.faxAreacode.input(testData.ImportBiillunderCollection.faxAreacode);
            await _TradeFinancePages.importBillunderCollectionPage.faxNumber.clean();
            await _TradeFinancePages.importBillunderCollectionPage.faxNumber.input(testData.ImportBiillunderCollection.faxNumber);
            await _TradeFinancePages.importBillunderCollectionPage.submitBtn.jsClick();
            await _TradeFinancePages.transactionInProcessPage.filterButton.jsClick();
            await _TradeFinancePages.transactionInProcessPage.selectProductType.select("Import Bill under Collection");
            await _TradeFinancePages.transactionInProcessPage.selectSubProductType.select("Import Bill under Collection");
            await _TradeFinancePages.transactionInProcessPage.selectStatusCd.select("Pending Approval");
            await _TradeFinancePages.transactionInProcessPage.customerRef.input(customerRef);
            await _TradeFinancePages.transactionInProcessPage.filterGo.jsClick();
            await _TradeFinancePages.transactionInProcessPage.loadCondition();
            await _TradeFinancePages.transactionInProcessPage.firstTxn.click();
            await _TradeFinancePages.transactionInProcessPage.selectButton.click();
        }

        //Approve
        await _TradeFinancePages.importBillunderCollectionPage.loadConditionForIBUCEditPage();
        await _TradeFinancePages.importBillunderCollectionPage.approveButton.click();
        await _TradeFinancePages.importBillunderCollectionPage.confirmButton.click();
        await _TradeFinancePages.importBillunderCollectionPage.approvePassword.input(testData.ImportBiillunderCollection.approvePassword);
        await _TradeFinancePages.importBillunderCollectionPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.importBillunderCollectionPage.loadConditionForIBUCViewPage();
        await ensure(_TradeFinancePages.importBillunderCollectionPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });

});