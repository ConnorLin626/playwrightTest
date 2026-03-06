/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, AccountPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _AccountPages = new AccountPages();
let testData = _AccountPages.fetchTestData('SG_testData.json');

describe('Fixed Deposit', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.Accounts.fixedDeposit.SIT.loginCompanyId : testData.Accounts.fixedDeposit.UAT.loginCompanyId, SIT ? testData.Accounts.fixedDeposit.SIT.loginUserId : testData.Accounts.fixedDeposit.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Fixed Deposit Display with Search', async function () {
    await displayFixedDepositWithSearch();
  });

  it('Switch Tabs', async function () {

    await _AccountPages.fixedDepositsPage.activeTab.click();
    await _AccountPages.fixedDepositsPage.loadCondition4Search();
    // await _AccountPages.fixedDepositsPage.maturedTab.click();
    // await _AccountPages.fixedDepositsPage.loadCondition4Search();
    await _AccountPages.fixedDepositsPage.showAllTab.click();
    await _AccountPages.fixedDepositsPage.loadCondition4Search();
  });

  it('Check Show More Detail', async function () {

    await _AccountPages.fixedDepositsPage.showMoreDetailLink.click();
    await _AccountPages.fixedDepositsPage.loadCondition4ShowMoreDetail();
    await Promise.all([
      await ensure(_AccountPages.fixedDepositsPage.moreDetailItemInterestRate).isNotEmpty()
    ]);
  });

  it('Generate Detail Report', async function () {
    if (!SIT) {
      await _AccountPages.fixedDepositsPage.generateDetailReportBtn.click();
      await _AccountPages.fixedDepositsPage.loadConditionForDBSLogoOnReportPage();
      // await ensure(_AccountPages.fixedDepositsPage.bulkPaymentAccountValue).textContains(SIT ? testData.Accounts.fixedDeposit.SIT.fromAccount : testData.Accounts.fixedDeposit.UAT.fromAccount);
      await ensure(_AccountPages.fixedDepositsPage.bulkPaymentAccountValue).isNotEmpty();
    }
  });
});

export async function displayFixedDepositWithSearch() {
  await _AccountPages.openMenu(Menu.Accounts.FixedDeposits);
  if (!SIT) {
    await _AccountPages.fixedDepositsPage.loadConditionForFD();
    await _AccountPages.fixedDepositsPage.viewFDTab.jsClick();
  }
  await _AccountPages.fixedDepositsPage.loadCondition();
  await _AccountPages.fixedDepositsPage.modifySearchButton.jsClick();
  await _AccountPages.fixedDepositsPage.loadConditionForSearchSection();
  // await _AccountPages.fixedDepositsPage.accountSelect.select(SIT ? testData.Accounts.fixedDeposit.SIT.fromAccount : testData.Accounts.fixedDeposit.UAT.fromAccount);
  // await _AccountPages.fixedDepositsPage.dateFromSelect.select(SIT ? testData.Accounts.fixedDeposit.SIT.dateFrom : testData.Accounts.fixedDeposit.UAT.dateFrom);
  // await _AccountPages.fixedDepositsPage.dateToSelect.select(SIT ? testData.Accounts.fixedDeposit.SIT.dateTo : testData.Accounts.fixedDeposit.UAT.dateTo);
  // await _AccountPages.fixedDepositsPage.fromCurrencySelect.select(SIT ? testData.Accounts.fixedDeposit.SIT.currency : testData.Accounts.fixedDeposit.UAT.currency);
  await _AccountPages.fixedDepositsPage.searchButton.click();
  await _AccountPages.fixedDepositsPage.loadCondition4Search();

  await ensure(_AccountPages.fixedDepositsPage.firstListItem).isElementPresent()
}
