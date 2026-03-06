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
let effectiveDate = moment().add(5, 'days').format('DD-MMM-YYYY');
let expiryDate = moment().add(10, 'days').format('DD-MMM-YYYY');

let customerRef = 'IGUAISS' + generatedID();

describe('Banker Guarantee', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.bankerGuarantee.SIT.loginCompanyId : testData.bankerGuarantee.UAT.loginCompanyId,
            SIT ? testData.bankerGuarantee.SIT.loginUserId : testData.bankerGuarantee.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Banker Guarantee Issuance', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.loadCondition();
        // step 1
        await _TradeFinancePages.bankerGuaranteeIssuancePage.selectProductType.selectByValue(testData.paymentType.IGUA);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.selectSubProductType.selectByValue(testData.paymentType.IGUA_ISS);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.continueButton.click();
        // step 2
        await _TradeFinancePages.shippingGuaranteePage.customerRef.input(customerRef);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.routeApplication.selectFirst();
        await _TradeFinancePages.bankerGuaranteeIssuancePage.applicationType.selectByValue("Issuance");
        await _TradeFinancePages.bankerGuaranteeIssuancePage.continueSaveButton.click();
        await ensure(_TradeFinancePages.bankerGuaranteeIssuancePage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.bankerGuaranteeIssuancePage.selectApplicant.selectFirst();
        await _TradeFinancePages.bankerGuaranteeIssuancePage.beneficiaryPartyID.input(testData.bankerGuarantee.beneficiaryPartyID);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.beneficiaryPartyName.input(testData.bankerGuarantee.beneficiaryPartyName);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.loadConditionForBeneficiaryIsVisibility();
        await _TradeFinancePages.bankerGuaranteeIssuancePage.beneficiaryPartyAddress1.input(testData.bankerGuarantee.beneficiaryPartyAddress1);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.beneficiaryPartyCountry.selectByValue("193");
        await _TradeFinancePages.bankerGuaranteeIssuancePage.advisingBankPartyID.input(testData.bankerGuarantee.advisingBankPartyID);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.advisingBankPartyName.input(testData.bankerGuarantee.advisingBankPartyName);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.loadConditionForAdvisingBankIsVisibility();
        await _TradeFinancePages.bankerGuaranteeIssuancePage.advisingBankPartyAddress1.input(testData.bankerGuarantee.advisingBankPartyAddress1);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.currency.select(testData.currency.USD);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.transAmount.input(testData.bankerGuarantee.transAmount);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.detailsSelect.selectByValue("DEC");
        await _TradeFinancePages.bankerGuaranteeIssuancePage.detailsText.input(testData.bankerGuarantee.detailsText);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.effectiveDate.input(effectiveDate);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.expiryDate.input(expiryDate);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.debitAccNo.selectByValue(SIT ? "137005-022-SEK" : "881016-021-CNH");
        await _TradeFinancePages.bankerGuaranteeIssuancePage.cntPerson.input(testData.bankerGuarantee.cntPerson);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.telephoneNumber.selectFirst();
        await _TradeFinancePages.bankerGuaranteeIssuancePage.areaCode.input(testData.bankerGuarantee.areaCode);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.number.input(testData.bankerGuarantee.number);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.submit.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();
        //Check on Edit Page
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.loadConditionForImportLCEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.bankerGuaranteeIssuancePage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.bankerGuaranteeIssuancePage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.bankerGuaranteeIssuancePage.effectiveDate).isNotEmpty(),
            await ensure(_TradeFinancePages.bankerGuaranteeIssuancePage.transAmount).textIs(testData.bankerGuarantee.transAmount),
            await ensure(_TradeFinancePages.bankerGuaranteeIssuancePage.debitAccNo).isNotEmpty(),
        ]);
    });

    it('Approve Banker Guarantee Issuance', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.loadConditionForImportLCEditPage();
        await _TradeFinancePages.bankerGuaranteeIssuancePage.approve.click();
        await _TradeFinancePages.bankerGuaranteeIssuancePage.confirmButton.click();
        await _TradeFinancePages.bankerGuaranteeIssuancePage.approvePassword.input(testData.bankerGuarantee.approvePassword);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.bankerGuaranteeIssuancePage.loadConditionForImportLCViewPage();
        await ensure(_TradeFinancePages.bankerGuaranteeIssuancePage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });
});
