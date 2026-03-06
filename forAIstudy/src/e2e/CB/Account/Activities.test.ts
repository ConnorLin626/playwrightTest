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
let dateFrom = moment().subtract(6, 'months').format('DD MMM YYYY');
let dateTo = moment().format('DD MMM YYYY');

describe('Activities', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Accounts.Activities.SIT.loginCompanyId : testData.Accounts.Activities.UAT.loginCompanyId,
      SIT ? testData.Accounts.Activities.SIT.loginUserId : testData.Accounts.Activities.UAT.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Activities display with Search', async function () {
    await displayActiviesWithSearch();
  });

  it('Check Show more Detail', async function () {

    await _AccountPages.activitiesPage.showMoreDetailLink.click();
    await _AccountPages.activitiesPage.loadCondition4ShowMoreDetail();
    await Promise.all([
      await ensure(_AccountPages.activitiesPage.showMoreDetailItemEarmarkAmount).isNotEmpty(),
    ]);

  });

  it('Create Transfer to own account via Activities Action', async function () {

    await displayActiviesWithSearch();
    await _AccountPages.balancesPage.dailySummaryItemActionButton.jsClick();
    await _AccountPages.balancesPage.actionTransferOwnAccountButton.jsClick();
    await _AccountPages.balancesPage.createICT();

  });

  it('Create Single Payment via Activities Action', async function () {

    await displayActiviesWithSearch();
    await _AccountPages.balancesPage.dailySummaryItemActionButton.jsClick();
    await _AccountPages.balancesPage.actionSinglePaymenttButton.jsClick();
    await _AccountPages.balancesPage.createSinglePayment();

  });

  it('Click CSV icon in the NEW UI', async function () {
    await _AccountPages.openMenu(Menu.Accounts.Activities);
    await _AccountPages.activitiesPage.loadCondition();
    await _AccountPages.activitiesPage.csvIcon.click();
    await _AccountPages.activitiesPage.modifySearchButton.jsClick();
    await _AccountPages.activitiesPage.lastTwoAndCurrent.jsClick();
  });

  it('Click PDF icon in the NEW UI', async function () {
    await _AccountPages.openMenu(Menu.Accounts.Activities);
    await _AccountPages.activitiesPage.loadCondition();
    await _AccountPages.activitiesPage.pdfIcon.click();
    await _AccountPages.activitiesPage.modifySearchButton.jsClick();
    await _AccountPages.activitiesPage.lastTwoAndCurrent.jsClick();
  });

  // // 已经取消Old UI link,代码 disable

  // it('Click XLS icon in the OLD UI', async function () {
  //   await _AccountPages.openMenu(Menu.Accounts.Activities);
  //   await _AccountPages.activitiesPage.loadCondition();
  //   await _AccountPages.activitiesPage.oldActivitiesLink.click();
  //   await _AccountPages.activitiesPage.loadConditionForOldUI();
  //   await _AccountPages.activitiesPage.xlsIconI3.click();
  //   await _AccountPages.activitiesPage.searchButtonI3.jsClick();
  // });

  // it('Click PDF icon in the OLD UI', async function () {
  //   await _AccountPages.openMenu(Menu.Accounts.Activities);
  //   await _AccountPages.activitiesPage.loadCondition();
  //   await _AccountPages.activitiesPage.oldActivitiesLink.click();
  //   await _AccountPages.activitiesPage.loadConditionForOldUI();
  //   await _AccountPages.activitiesPage.pdfIconI3.click();
  //   await _AccountPages.activitiesPage.searchButtonI3.jsClick();
  // });

  it('Filter Transaction Detail & View Remmitance Advice report', async function () {
    if (!SIT) {
      await displayActiviesWithSearch();
      await _AccountPages.activitiesPage.activitiesTransactionDetailFilter.input(SIT ? testData.Accounts.Activities.SIT.filterTransactionDetail : testData.Accounts.Activities.UAT.filterTransactionDetail);
      await _AccountPages.activitiesPage.loadCondition4TransactionDetailFilter();
      await Promise.all([
        await ensure(_AccountPages.activitiesPage.activitiesTransactionDetailTranDesc).isNotEmpty(),
      ]);

      await _AccountPages.activitiesPage.activitiesTransactionDetailViewReport.click();
      await _AccountPages.activitiesPage.loadConditionForDBSLogoOnReportPage();
      await ensure(_AccountPages.activitiesPage.bulkPaymentAccountValue).textContains(SIT ? testData.Accounts.Activities.SIT.fromAccount : testData.Accounts.Activities.UAT.fromAccount);

    }
  });
});

async function displayActiviesWithSearch(): Promise<void> {
  await _AccountPages.openMenu(Menu.Accounts.Activities);
  await _AccountPages.activitiesPage.loadCondition();
  await _AccountPages.activitiesPage.modifySearchButton.jsClick();
  await _AccountPages.activitiesPage.fromAccountSelect.select(SIT ? testData.Accounts.Activities.SIT.fromAccount : testData.Accounts.Activities.UAT.fromAccount);
  // await _AccountPages.activitiesPage.lastTwoAndCurrent.jsClick();
  await _AccountPages.balancesPage.dateFromSelect.select(dateFrom);
  await _AccountPages.balancesPage.dateToSelect.select(dateTo);
  await _AccountPages.activitiesPage.searchButton.click();
  await _AccountPages.activitiesPage.loadCondition4Search();

  await Promise.all([
    await ensure(_AccountPages.activitiesPage.accountDetailItemLabel).isNotEmpty()
  ]);
}
