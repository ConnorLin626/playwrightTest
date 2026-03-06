/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, DashboardPages } from "../../../pages/CB";
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { PaymentsTransactionsFilesPage, TransferCentersPage } from "../../../pages/CB/Approvals";
import { PaymentTemplatesPage } from "../../../pages/CB/Payments";
import { BeneficiaryPage } from "../../../pages/CB/Payments/BeneficiaryPage";
import { browser } from "protractor";

const _DashboardPages = new DashboardPages();
let testData = _DashboardPages.fetchTestData("SG_testData.json");
let itemCount: number;

describe('Dashboard Pending Items', async function () {
  this.retries(browser.params.caseRetryTimes);
  // this.timeout(60 * 1000);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId,
      SIT ? testData.Dashboard.SIT.loginUserId : testData.Dashboard.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Pending Items By Transaction', async function () {
    let _PaymentsTransactionsFilesPage = new PaymentsTransactionsFilesPage();
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadPendingItemsCondition();
    await _DashboardPages.dashboardPage.dashboardTransactionButton.getText().then(async item => {
      await _DashboardPages.dashboardPage.getPendingListCount(item).then(count => {
        itemCount = count;
      });
    });
    await _DashboardPages.dashboardPage.dashboardTransactionButton.click();
    if (itemCount < 1000) {
      await _PaymentsTransactionsFilesPage.loadConditionForTransactionListResult();
      await Promise.all([
        await ensure(_PaymentsTransactionsFilesPage.transactionListResult).textContains(itemCount.toString()),
        await ensure(_PaymentsTransactionsFilesPage.byTransactionButton).hasClassName(testData.Dashboard.currentTabName)
      ]);
    } else {
      await _PaymentsTransactionsFilesPage.loadConditionForMoreResults();
      await ensure(_PaymentsTransactionsFilesPage.byTransactionButton).hasClassName(testData.Dashboard.currentTabName)
    }
  });

  it('Pending Items By File', async function () {
    let _PaymentsTransactionsFilesPage = new PaymentsTransactionsFilesPage();
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadPendingItemsCondition();
    await _DashboardPages.dashboardPage.dashboardFileButton.getText().then(async item => {
      await _DashboardPages.dashboardPage.getPendingListCount(item).then(count => {
        itemCount = count;
      });
    });
    await _DashboardPages.dashboardPage.dashboardFileButton.click();
    if (itemCount < 1000) {
      await _PaymentsTransactionsFilesPage.loadConditionForFileListResult();
      await Promise.all([
        await ensure(_PaymentsTransactionsFilesPage.fileListResult).textContains(itemCount.toString()),
        await ensure(_PaymentsTransactionsFilesPage.byFileButton).hasClassName(testData.Dashboard.currentTabName)
      ]);
    } else {
      await _PaymentsTransactionsFilesPage.loadConditionForMoreResults();
      await ensure(_PaymentsTransactionsFilesPage.byFileButton).hasClassName(testData.Dashboard.currentTabName);
    }
  });

  it('Pending Items Offline Group', async function () {
    let _TransferCentersPage = new TransferCentersPage();
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadPendingItemsCondition();
    await _DashboardPages.dashboardPage.dashboardGroupButton.getText().then(async item => {
      await _DashboardPages.dashboardPage.getPendingListCount(item).then(count => {
        itemCount = count;
      });
    });
    await _DashboardPages.dashboardPage.dashboardGroupButton.click();
    await _TransferCentersPage.loadOfflineGroup();
    if (itemCount < 1000) {
      await Promise.all([
        await ensure(_TransferCentersPage.groupPendingTableCount).textContains('(' + itemCount + ')'),
        await ensure(_TransferCentersPage.groupPendingTable).hasClassName(testData.Dashboard.currentTabName)
      ]);
    } else {
      await ensure(_TransferCentersPage.groupPendingTable).hasClassName(testData.Dashboard.currentTabName);
    }
  });

  it('Pending Items Manage Payees', async function () {
    let _BeneficiaryPage = new BeneficiaryPage();
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadPendingItemsCondition();
    await _DashboardPages.dashboardPage.dashboardPayeeButton.getText().then(async item => {
      await _DashboardPages.dashboardPage.getPendingListCount(item).then(count => {
        itemCount = count;
      });
    });
    await _DashboardPages.dashboardPage.dashboardPayeeButton.click();
    await _BeneficiaryPage.loadConditionPendingTable();
    if (itemCount < 1000) {
      await Promise.all([
        await ensure(_BeneficiaryPage.payeePendingTableCount).textContains(('(' + itemCount + ')')),
        await ensure(_BeneficiaryPage.payeePendingTable).hasClassName(testData.Dashboard.currentTabName)
      ]);
    } else {
      await ensure(_BeneficiaryPage.payeePendingTable).hasClassName(testData.Dashboard.currentTabName);
    }
  });

  it('Pending Items Manage Template', async function () {
    let _PaymentTemplatesPage = new PaymentTemplatesPage();
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadPendingItemsCondition();
    await _DashboardPages.dashboardPage.dashboardTemplatesButton.getText().then(async item => {
      await _DashboardPages.dashboardPage.getPendingListCount(item).then(count => {
        itemCount = count;
      });
    });
    await _DashboardPages.dashboardPage.dashboardTemplatesButton.click();
    await _PaymentTemplatesPage.loadCondition();
    if (itemCount < 1000) {
      await Promise.all([
        await ensure(_PaymentTemplatesPage.pendingTableCount).textContains('(' + itemCount + ')'),
        await ensure(_PaymentTemplatesPage.pendingTable).hasClassName(testData.Dashboard.currentTabName)
      ]);
    } else {
      await ensure(_PaymentTemplatesPage.pendingTable).hasClassName(testData.Dashboard.currentTabName);
    }
  });

});
