/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, AccountPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
import moment = require('moment');

let _AccountPages = new AccountPages();
let testData = _AccountPages.fetchTestData('ID_testData.json');
let dateFrom = moment().subtract(6, 'months').format('DD MMM YYYY');
let dateTo = moment().add(6, 'months').format('DD MMM YYYY');

describe('Loans', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.loans.SIT.loginCompanyId : testData.loans.UAT.loginCompanyId,
      SIT ? testData.loans.SIT.loginUserId : testData.loans.UAT.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Loans Display with Search', async function () {

    await displayLoansWithSearch();

  });

  it('Switch Tabs', async function () {

    await _AccountPages.loansPage.tabActive.click();
    await _AccountPages.loansPage.loadCondition4Search();
    // await _AccountPages.loansPage.tabOverdue.click();
    // await _AccountPages.loansPage.loadCondition4Search();
    // await _AccountPages.loansPage.tabClosed.click();
    // await _AccountPages.loansPage.loadCondition4Search();
    await _AccountPages.loansPage.tabShowAll.click();
    await _AccountPages.loansPage.loadCondition4Search();

  });

  it('Generate Detail Report', async function () {
    if (!SIT) {
      await _AccountPages.loansPage.generateDetailReportBtn.click();
      await _AccountPages.loansPage.loadConditionForDBSLogoOnReportPage();
      await ensure(_AccountPages.loansPage.bulkPaymentAccountValue).isNotEmpty();
    }
  });

});

async function displayLoansWithSearch(): Promise<void> {

  await _AccountPages.openMenu(Menu.Accounts.Loans);
  await _AccountPages.loansPage.loadCondition();
  await _AccountPages.loansPage.modifySearchButton.jsClick();
  await _AccountPages.loansPage.dateFromSelect.select(dateFrom);
  await _AccountPages.loansPage.dateToSelect.select(dateTo);
  // await _AccountPages.loansPage.showAllCheckBox.jsClick();
  // await _AccountPages.loansPage.blockDiscountingCheckBox.jsClick();
  await _AccountPages.loansPage.searchButton.click();
  await _AccountPages.loansPage.loadCondition4Search();

  await Promise.all([
    await ensure(_AccountPages.loansPage.firstListItem).isElementPresent()
  ]);
}
