/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import * as moment from 'moment';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');
let customerRef = 'ISSG' + generatedID();
let issuedDate = moment().subtract(10, 'days').format('DD-MMM-YYYY');

describe('Shipping Guarantee', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.shippingGuarantee.SIT.loginCompanyId : testData.shippingGuarantee.UAT.loginCompanyId,
            SIT ? testData.shippingGuarantee.SIT.loginUserId : testData.shippingGuarantee.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create shipping Guarantee', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.shippingGuaranteePage.loadCondition();
        // step 1
        await _TradeFinancePages.shippingGuaranteePage.selectProductType.selectByValue(testData.paymentType.ISSG);
        await _TradeFinancePages.shippingGuaranteePage.continueButton.click();
        // step 2
        if (await _TradeFinancePages.shippingGuaranteePage.customerRef.isElementPresent()) {
            await _TradeFinancePages.shippingGuaranteePage.customerRef.input(customerRef);
        }
        await _TradeFinancePages.shippingGuaranteePage.routeApplication.selectFirst();
        await _TradeFinancePages.shippingGuaranteePage.continueSaveButton.click();
        await ensure(_TradeFinancePages.shippingGuaranteePage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.shippingGuaranteePage.selectApplicant.selectFirst();
        await _TradeFinancePages.shippingGuaranteePage.currency.select(testData.currency.USD);
        await _TradeFinancePages.shippingGuaranteePage.transAmount.input(testData.shippingGuarantee.transAmount);
        await _TradeFinancePages.shippingGuaranteePage.departure.input(testData.shippingGuarantee.departure);
        await _TradeFinancePages.shippingGuaranteePage.destination.input(testData.shippingGuarantee.destination);
        await _TradeFinancePages.shippingGuaranteePage.shippingAirline.input(testData.shippingGuarantee.shippingAirline);
        await _TradeFinancePages.shippingGuaranteePage.vesselFlight.input(testData.shippingGuarantee.vesselFlight);
        await _TradeFinancePages.shippingGuaranteePage.issuedDate.input(issuedDate);
        await _TradeFinancePages.shippingGuaranteePage.blReference.input(testData.shippingGuarantee.blReference);
        await _TradeFinancePages.shippingGuaranteePage.goodsDescription.input(testData.shippingGuarantee.goodsDescription);
        await _TradeFinancePages.shippingGuaranteePage.collectOriginals.selectFirst();
        await _TradeFinancePages.shippingGuaranteePage.debitCharges.selectFirst();
        await _TradeFinancePages.shippingGuaranteePage.cntPerson.input(testData.shippingGuarantee.cntPerson);
        await _TradeFinancePages.shippingGuaranteePage.telephoneNumber.selectFirst();
        await _TradeFinancePages.shippingGuaranteePage.areaCode.input(testData.shippingGuarantee.areaCode);
        await _TradeFinancePages.shippingGuaranteePage.number.input(testData.shippingGuarantee.number);
        await _TradeFinancePages.shippingGuaranteePage.submit.click();
        await _TradeFinancePages.shippingGuaranteePage.yesButton.jsClick();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.shippingGuaranteePage.loadConditionForShippingGuaranteeEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.shippingGuaranteePage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.shippingGuaranteePage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.shippingGuaranteePage.issuedDate).isNotEmpty(),
            await ensure(_TradeFinancePages.shippingGuaranteePage.transAmount).textIs(testData.shippingGuarantee.transAmount),
            await ensure(_TradeFinancePages.shippingGuaranteePage.debitCharges).isNotEmpty(),
        ]);
    });

    it('Approve shipping Guarantee', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.shippingGuaranteePage.loadConditionForShippingGuaranteeEditPage();
        await _TradeFinancePages.shippingGuaranteePage.approve.click();
        await _TradeFinancePages.shippingGuaranteePage.confirmButton.click();
        await _TradeFinancePages.shippingGuaranteePage.approvePassword.input(testData.shippingGuarantee.approvePassword);
        await _TradeFinancePages.shippingGuaranteePage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.shippingGuaranteePage.loadConditionForShippingGuaranteeViewPage();
        await ensure(_TradeFinancePages.shippingGuaranteePage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });
});