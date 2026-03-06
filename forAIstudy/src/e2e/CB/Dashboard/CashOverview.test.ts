/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, DashboardPages } from "../../../pages/CB";
import { saveScreen, ensure, devWatch, SIT, handlerCase } from "../../../lib";
import { Menu } from "../../../config/menu";
import { browser } from "protractor";

let _DashboardPages = new DashboardPages();
let testData = _DashboardPages.fetchTestData('SG_testData.json');

describe('CASH OVERVIEW', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    new NavigatePages().loginCB(
      SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId,
      SIT ? testData.Dashboard.SIT.loginUserId : testData.Dashboard.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Show all transasction from Accounts  ', async function () {
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadCondition();
    await Promise.all([
      await ensure(_DashboardPages.dashboardPage.availableBalanceAmount).isNotEmpty(),
      await ensure(_DashboardPages.dashboardPage.availableBalanceDate).isNotEmpty()
    ])
    await _DashboardPages.dashboardPage.showAllTxnButton.click();
    await _DashboardPages.activities.loadCondition();
    await Promise.all([
      await ensure(_DashboardPages.activities.activitiesTitle).textContains(testData.Dashboard.activitiesTitle)
    ]);
  });

  it('Make a Payment or Transfer from Accounts', async function () {
    let _accountNumber = '';
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadCondition();
    await _DashboardPages.dashboardPage.accountNumber.getText().then(text => {
      _accountNumber = text.trim();
    });
    await _DashboardPages.dashboardPage.actionButton.click();
    await _DashboardPages.dashboardPage.makeAPaymentButton.jsClick();
    await _DashboardPages.paymentPage.loadCondition();
    await _DashboardPages.paymentPage.currency.select(testData.Dashboard.currency);
    await _DashboardPages.paymentPage.amount.input(testData.Dashboard.amount);
    await _DashboardPages.paymentPage.existingPayee.select(
      SIT ? testData.Dashboard.SIT.singleExistingPayeeName : testData.Dashboard.UAT.singleExistingPayeeName
    );
    await _DashboardPages.paymentPage.MEPSButton.click();
    await _DashboardPages.paymentPage.bankChargesOur.click();
    await ensure(_DashboardPages.paymentPage.fromAccount).textContainsLessOne(_accountNumber);
    await _DashboardPages.paymentPage.nextButton.click();
    await _DashboardPages.paymentPage.loadConditionForPreviewPage();
    await _DashboardPages.paymentPage.submitButton.click();
    await _DashboardPages.paymentPage.loadConditionForSubmittedPage();
    await Promise.all([
      await ensure(_DashboardPages.paymentPage).isUXSuccess(),
      await ensure(_DashboardPages.paymentPage.accountNumber).textContainsLessOne(_accountNumber)
    ]);
  });

  it('Make Bulk Payment from Accounts', async function () {
    let _accountNumber = '';
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadCondition();
    await _DashboardPages.dashboardPage.accountNumber.getText().then(text => {
      _accountNumber = text.trim();
    });
    await _DashboardPages.dashboardPage.actionButton.click();
    await _DashboardPages.dashboardPage.makeBulkPaymentButton.jsClick();
    await _DashboardPages.bulkPaymentPage.loadCondition();
    await _DashboardPages.bulkPaymentPage.todayDayButton.click();
    await ensure(_DashboardPages.bulkPaymentPage.fromAccount).textContainsLessOne(_accountNumber);
    await _DashboardPages.bulkPaymentPage.filterExistingPayee.input(
      SIT ? testData.Dashboard.SIT.bulkExistingPayeeName : testData.Dashboard.UAT.bulkExistingPayeeName
    );
    await _DashboardPages.bulkPaymentPage.addpayee.click();
    await _DashboardPages.bulkPaymentPage.amount.input(testData.Dashboard.payeeAmount);
    await _DashboardPages.bulkPaymentPage.payeeRef.input(testData.Dashboard.payeeReference);
    await _DashboardPages.bulkPaymentPage.nextButton.click();
    await _DashboardPages.bulkPaymentPage.loadConditionForPreviewPage();
    await _DashboardPages.bulkPaymentPage.submitButton.click();
    await _DashboardPages.bulkPaymentPage.loadConditionForSubmittedPage();
    await Promise.all([
      await ensure(_DashboardPages.bulkPaymentPage).isUXSuccess(),
      await ensure(_DashboardPages.bulkPaymentPage.fromAccountView).textContainsLessOne(_accountNumber)
    ]);
  });

  it('Fixed Deposits', async function () {
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadCondition();
    await _DashboardPages.dashboardPage.tabFixedDeposits.click();
    await _DashboardPages.dashboardPage.loadCondition();
    await _DashboardPages.dashboardPage.showAllFixedDepositsButton.jsClick();
    await _DashboardPages.fixedDepositsPage.loadCondition();
    await Promise.all([
      await ensure(_DashboardPages.fixedDepositsPage.fixedDepositTitle).textContains(testData.Dashboard.fixedDepositTitle)
    ]);
  });

  it('Loans', async function () {
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadCondition();
    await _DashboardPages.dashboardPage.tabLoan.click();
    await _DashboardPages.dashboardPage.loadCondition();
    await _DashboardPages.dashboardPage.showAllLoanButton.jsClick();
    await _DashboardPages.loansPage.loadCondition();
    await Promise.all([
      await ensure(_DashboardPages.loansPage.loansTitle).textContains(testData.Dashboard.loansTitle)
    ]);
  });
});