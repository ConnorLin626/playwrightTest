/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, AccountPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
import moment = require('moment');

let _AccountPages = new AccountPages();
let testData = _AccountPages.fetchTestData('SG_testData.json');
let firstAccountNum = "";
let dateFrom = moment().subtract(6, 'months').format('DD MMM YYYY');
let dateTo = moment().format('DD MMM YYYY');

describe('Balances', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Accounts.Balance.SIT.login.loginCompanyId : testData.Accounts.Balance.UAT.login.loginCompanyId,
      SIT ? testData.Accounts.Balance.SIT.login.loginUserId : testData.Accounts.Balance.UAT.login.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Balance display with Search', async function () {

    await displayBalanceWithSearch();

  });

  it('Check Show daily summary', async function () {

    await _AccountPages.balancesPage.showDailySummaryLink.click();
    await _AccountPages.balancesPage.loadCondition4ShowDailySummary();
    await Promise.all([
      await ensure(_AccountPages.balancesPage.dailySummaryItemBizDate).isNotEmpty(),
      await ensure(_AccountPages.balancesPage.dailySummaryItemAvailableBal).isNotEmpty()
    ]);
  });

  it('Check View Transaction History', async function () {

    await _AccountPages.balancesPage.viewTransactionHistoryLink.click();
    await _AccountPages.balancesPage.loadCondition4ViewTransactionHistory();
    let accountNum = firstAccountNum.match(/(?<=-).*(?=-)/g).toString();
    await Promise.all([
      await ensure(_AccountPages.balancesPage.accountDetailItemLabel).textContains(accountNum)
    ]);
  });

  it('Create Transfer to own account via Balance Action', async function () {

    await displayBalanceWithSearch();
    await _AccountPages.balancesPage.dailySummaryItemActionButton.jsClick();
    await _AccountPages.balancesPage.actionTransferOwnAccountButton.jsClick();
    await _AccountPages.balancesPage.createICT();

  });

  it('Create Single Payment via Balance Action', async function () {

    await displayBalanceWithSearch();
    await _AccountPages.balancesPage.dailySummaryItemActionButton.jsClick();
    await _AccountPages.balancesPage.actionSinglePaymenttButton.jsClick();
    await _AccountPages.balancesPage.createSinglePayment();

  });

  it('User cannot view the account balance when dont have account access', async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Accounts.Balance.SIT.login.loginCompanyId : testData.Accounts.Balance.UAT.login.loginCompanyId,
      SIT ? testData.Accounts.Balance.SIT.login.userNotAccountBalance : testData.Accounts.Balance.UAT.login.userNotAccountBalance);
    await _AccountPages.openMenu(Menu.Accounts.Balances);
    await _AccountPages.balancesPage.loadCondition();
    await _AccountPages.balancesPage.modifySearchButton.jsClick();
    await _AccountPages.balancesPage.lastTwoAndCurrent.jsClick();
    await _AccountPages.balancesPage.searchButton.click();
    await _AccountPages.balancesPage.loadCondition4Search();

    await Promise.all([
      await ensure(_AccountPages.balancesPage.firstListItem).isNotElementPresent()
    ]);
  });

});

async function displayBalanceWithSearch(): Promise<void> {
  await _AccountPages.openMenu(Menu.Accounts.Balances);
  await _AccountPages.balancesPage.loadCondition();
  await _AccountPages.balancesPage.modifySearchButton.jsClick();
  // await _AccountPages.balancesPage.lastTwoAndCurrent.jsClick();
  // await _AccountPages.balancesPage.balanceCustomizeRadio.jsClick();
  // await _AccountPages.balancesPage.fromAccountInput.input(SIT ? testData.Accounts.Balance.SIT.organisation : testData.Accounts.Balance.UAT.organisation);
  await _AccountPages.balancesPage.dateFromSelect.select(dateFrom);
  await _AccountPages.balancesPage.dateToSelect.select(dateTo);
  await _AccountPages.balancesPage.searchButton.click();
  await _AccountPages.balancesPage.loadCondition4Search();

  await Promise.all([
    await ensure(_AccountPages.balancesPage.firstListItem).isElementPresent()
  ]);
  await _AccountPages.balancesPage.firstAccountNum.getText().then(data => {
    firstAccountNum = data;
  })
}
