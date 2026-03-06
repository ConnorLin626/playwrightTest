/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { ensure, SIT, handlerCase, generatedID, } from "../../../lib";
import * as moment from 'moment';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');
let expiryDate = moment().add(10, 'days').format('DD-MMM-YYYY');
let Description = '';
describe('Banker Guarantee Amendment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.bankerGuaranteeAmendment.SIT.loginCompanyId : testData.bankerGuaranteeAmendment.UAT.loginCompanyId,
            SIT ? testData.bankerGuaranteeAmendment.SIT.loginUserId : testData.bankerGuaranteeAmendment.UAT.loginUserId)
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Banker Guarantee Amendment', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadCondition();
        // step 1
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.selectProductType.selectByValue(testData.paymentType.IGUA);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.selectSubProductType.selectByValue(testData.paymentType.IGUA_ISS);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.createAmendmentCheckBox.jsClick();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.continueButton.jsClick();
        // step 2
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.balanceCustomerRef.input(SIT ? testData.bankerGuaranteeAmendment.SIT.balanceCustomerRef : testData.bankerGuaranteeAmendment.UAT.balanceCustomerRef);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.continueSaveButton.click();
        await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.sendVia.selectFirst();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.expiryDate.input(expiryDate);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.amountSelect.selectFirst();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.transAmount.input(testData.bankerGuaranteeAmendment.transAmount);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.amendmentCharges.selectFirst();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.debitAccNo.selectByValue(SIT ? "137005-022-SEK" : "141504-020-SGD");
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.cntPerson.input(testData.bankerGuaranteeAmendment.cntPerson);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.telephoneNumber.selectFirst();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.areaCode.input(testData.bankerGuaranteeAmendment.areaCode);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.number.input(testData.bankerGuaranteeAmendment.number);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.submit.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(SIT ? testData.bankerGuaranteeAmendment.SIT.customerRef : testData.bankerGuaranteeAmendment.UAT.customerRef);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForImportLCEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.expiryDate).textContains(expiryDate),
            await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.transAmount).isNotEmpty(),
            await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.debitAccNo).isNotEmpty(),
        ]);
    });

    it('Approve Banker Guarantee Amendment', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(SIT ? testData.bankerGuaranteeAmendment.SIT.customerRef : testData.bankerGuaranteeAmendment.UAT.customerRef);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForImportLCEditPage();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.approve.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.confirmButton.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.approvePassword.input(testData.bankerGuaranteeAmendment.approvePassword);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradeAmendmentPageViaRef(SIT ? testData.bankerGuaranteeAmendment.SIT.customerRef : testData.bankerGuaranteeAmendment.UAT.customerRef);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForImportLCViewPage();
        await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });

    it('Upload attatchment for Banker Guarantee', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.loadCondition();
        await _TradeFinancePages.transactionReviewPage.filterButton.jsClick();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.selectProductType.selectByValue(testData.paymentType.IGUA);
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.selectStatus.select("Issued");
        await _TradeFinancePages.transactionReviewPage.customerRef.clean();
        await _TradeFinancePages.transactionReviewPage.filterGo.jsClick();
        await _TradeFinancePages.transactionReviewPage.firstTxn.jsClick();
        await _TradeFinancePages.transactionReviewPage.detailButton.jsClick();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForImportLCViewPage();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.manageDoc.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForUpload();
        Description = "Description" + generatedID();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.description1.input(Description);
        let fileName = "";
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.file1Name.select("300dpiTrade.jpg").then((data) => {
            let pos: number = data.lastIndexOf('/');
            fileName = (data.substr(pos + 1));
        });
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.uploadButton.click();

        let windows = await browser.getAllWindowHandles();
        await browser.switchTo().window(windows[0]);
        await _TradeFinancePages.transactionReviewPage.pageSwitchToI3();
        await Promise.all([
            await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.successfulMessageText).textIs("Attachment(s) added successfully"),
            await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.tableList).textContains(Description),
        ]);
    });

});