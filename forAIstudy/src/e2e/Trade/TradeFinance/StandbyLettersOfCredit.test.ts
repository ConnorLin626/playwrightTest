/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from '../../../pages/CB';
import { TradeFinancePages } from '../../../pages/Trade';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, SIT, generatedID, handlerCase } from '../../../lib';
import * as moment from 'moment';
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');
let expiryDate = moment().add(10, 'days').format('DD-MMM-YYYY');
let customerRef = "";

describe('Standby Letters of Credit', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.StandbyLettersOfCredit.SIT.loginCompanyId : testData.StandbyLettersOfCredit.UAT.loginCompanyId,
            SIT ? testData.StandbyLettersOfCredit.SIT.loginUserId : testData.StandbyLettersOfCredit.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Standby Letters of Credit', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionCreate);
        await _TradeFinancePages.standbyLettersOfCreditPage.loadCondition();
        // step 1
        await _TradeFinancePages.standbyLettersOfCreditPage.selectProductType.selectByValue(testData.paymentType.StandbyLC);
        await _TradeFinancePages.standbyLettersOfCreditPage.continueButton.jsClick();
        // step 2
        customerRef = "SDLC" + generatedID();
        await _TradeFinancePages.standbyLettersOfCreditPage.customerRef.input(customerRef);
        await _TradeFinancePages.standbyLettersOfCreditPage.selectRoute.selectFirst();
        await _TradeFinancePages.standbyLettersOfCreditPage.selectApplicationType.selectByValue(testData.StandbyLettersOfCredit.selectApplicationType);
        await _TradeFinancePages.standbyLettersOfCreditPage.continueSaveButton.click();
        await ensure(_TradeFinancePages.standbyLettersOfCreditPage).isTradeSuccess();
        //input test data
        await _TradeFinancePages.standbyLettersOfCreditPage.applicant.selectFirst();
        await _TradeFinancePages.standbyLettersOfCreditPage.trdPartyID.clean();
        await _TradeFinancePages.standbyLettersOfCreditPage.benePartyId.input(SIT ? testData.StandbyLettersOfCredit.SIT.benePartyId : testData.StandbyLettersOfCredit.UAT.benePartyId);
        await _TradeFinancePages.standbyLettersOfCreditPage.advisingBankPartyId.input(SIT ? testData.StandbyLettersOfCredit.SIT.advisingBankPartyId : testData.StandbyLettersOfCredit.UAT.advisingBankPartyId);
        await _TradeFinancePages.standbyLettersOfCreditPage.sendVia.selectFirst();
        await _TradeFinancePages.standbyLettersOfCreditPage.expiryDate.input(expiryDate);
        await _TradeFinancePages.standbyLettersOfCreditPage.selectCurrency.select(testData.currency.USD);
        await _TradeFinancePages.standbyLettersOfCreditPage.amount.input(testData.StandbyLettersOfCredit.amount);
        await _TradeFinancePages.standbyLettersOfCreditPage.selectDetails.selectFirst();
        await _TradeFinancePages.standbyLettersOfCreditPage.details.input(testData.StandbyLettersOfCredit.details);
        await _TradeFinancePages.standbyLettersOfCreditPage.selectDebitChargeFrom.selectByValue(SIT ? testData.StandbyLettersOfCredit.SIT.debitChargeFrom : testData.StandbyLettersOfCredit.UAT.debitChargeFrom);
        await _TradeFinancePages.standbyLettersOfCreditPage.contactPerson.input(testData.StandbyLettersOfCredit.contactPerson);
        await _TradeFinancePages.standbyLettersOfCreditPage.selectTelCountryCode.selectFirst();
        await _TradeFinancePages.standbyLettersOfCreditPage.telAreacode.input(testData.StandbyLettersOfCredit.telAreacode);
        await _TradeFinancePages.standbyLettersOfCreditPage.telephoneNum.input(testData.StandbyLettersOfCredit.telephoneNum);
        await _TradeFinancePages.standbyLettersOfCreditPage.submitButton.jsClick();
        await _TradeFinancePages.standbyLettersOfCreditPage.loadConditionForConfirmPage();
        await _TradeFinancePages.standbyLettersOfCreditPage.yesButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        //Check on Approval Page
        await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        await _TradeFinancePages.standbyLettersOfCreditPage.loadConditionForEditPage();
        await Promise.all([
            await ensure(_TradeFinancePages.standbyLettersOfCreditPage.applicationStatus).textContains(testData.status.PendingApproval),
            await ensure(_TradeFinancePages.standbyLettersOfCreditPage.applicantValue).isNotEmpty(),
            await ensure(_TradeFinancePages.standbyLettersOfCreditPage.amountValue).textContains(testData.StandbyLettersOfCredit.amount),
            await ensure(_TradeFinancePages.standbyLettersOfCreditPage.debitChargeFromValue).isNotEmpty(),
        ]);
    });

    it('Approve Standby Letters of Credit', async function () {
        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionsInProcess);
        if (0 !== customerRef.length) {
            await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaRef(customerRef);
        } else {
            await _TradeFinancePages.transactionInProcessPage.goToEditTradePageViaFilter("ISLC", "", "Pending Approval");
        }
        await _TradeFinancePages.standbyLettersOfCreditPage.loadConditionForEditPage();
        await _TradeFinancePages.standbyLettersOfCreditPage.customerRef.getText().then(text => {
            customerRef = text.trim();
            console.error("Standby LC customerRef:" + customerRef);
        })
        await _TradeFinancePages.standbyLettersOfCreditPage.approveButton.click();
        await _TradeFinancePages.standbyLettersOfCreditPage.confirmButton.click();
        await _TradeFinancePages.standbyLettersOfCreditPage.approvePassword.input(testData.StandbyLettersOfCredit.approvePassword);
        await _TradeFinancePages.standbyLettersOfCreditPage.confirmButton.click();
        await ensure(_TradeFinancePages.transactionInProcessPage).isTradeSuccess();

        await _TradeFinancePages.openMenu(Menu.TradeFinance.TransactionReview);
        await _TradeFinancePages.transactionReviewPage.goToViewTradePageViaRef(customerRef);
        await _TradeFinancePages.standbyLettersOfCreditPage.loadConditionForViewPage();
        await ensure(_TradeFinancePages.standbyLettersOfCreditPage.currentStatus).textContainsLessOne(testData.status.QueuedForTransmission, testData.status.Sent, testData.status.Arrived);
    });
});
