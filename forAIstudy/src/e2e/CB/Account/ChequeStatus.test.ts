/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, AccountPages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _AccountPages = new AccountPages();
let _PaymentsPages = new PaymentsPages();
let testData = _AccountPages.fetchTestData('SG_testData.json');
let reference: string = null;

describe('Cheque Status', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Accounts.ChequeStatus.SIT.loginCompanyId : testData.Accounts.ChequeStatus.UAT.loginCompanyId,
      SIT ? testData.Accounts.ChequeStatus.SIT.loginUserId : testData.Accounts.ChequeStatus.UAT.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Cheque Status Display with ALL', async function () {

    await displayChequeStatusWithSearch('ALL');

  });

  // it.skip('Cheque Status Display with Search Corporate Cheque', async function () {

  //   await displayChequeStatusWithSearch('Corporate Cheque');

  // });

  it('Cheque Status Display with Search Cheque Express', async function () {

    await displayChequeStatusWithSearch('Cheque Express');

  });

  it('Switch Tabs', async function () {
    await displayChequeStatusWithSearch('ALL');
    await _AccountPages.chequeStatusPage.tabIssued.click();
    await _AccountPages.chequeStatusPage.loadCondition4Search();
    await _AccountPages.chequeStatusPage.tabExpired.click();
    await _AccountPages.chequeStatusPage.loadCondition4Search();
    await _AccountPages.chequeStatusPage.tabPresented.click();
    await _AccountPages.chequeStatusPage.loadCondition4Search();
    await _AccountPages.chequeStatusPage.tabReturnedStopped.click();
    await _AccountPages.chequeStatusPage.loadCondition4Search();
    await _AccountPages.chequeStatusPage.tabShowAll.click();
    await _AccountPages.chequeStatusPage.loadCondition4Search();

  });
  //Remove first,will modify after reskin

  // it('Stop Cheque Action', async function () {

  //   await displayChequeStatusWithSearch('ALL');
  //   await _AccountPages.chequeStatusPage.chequeStateFilter.clean();
  //   await _AccountPages.chequeStatusPage.chequeStateFilter.input(SIT ? testData.Accounts.ChequeStatus.SIT.chequeNumberForStopCheque : testData.Accounts.ChequeStatus.UAT.chequeNumberForStopCheque);
  //   await _AccountPages.chequeStatusPage.stopChequeActionBtn.click();
  //   await _AccountPages.chequeStatusPage.loadCondition4GoToOLDUIStopCheque();
  //   await _PaymentsPages.stopChequePage.previewI3Button.click();
  //   await _PaymentsPages.stopChequePage.loadConditionForSubmit();
  //   await _PaymentsPages.stopChequePage.submitI3Button.jsClick();
  //   await _PaymentsPages.stopChequePage.getI3ReferenceID().then(text => {
  //     reference = text;
  //     console.log('Reference of Create Stop Cheque Action:', reference);
  //   });
  //   await ensure(_PaymentsPages.stopChequePage).isI3Success();
  //   await _PaymentsPages.stopChequePage.goToViewStopChequeViaRef(reference);
  //   await _PaymentsPages.stopChequePage.loadConditionOnView();
  //   await Promise.all([
  //     await ensure(_PaymentsPages.stopChequePage.fromAccountValue).textContains(SIT ? testData.Accounts.ChequeStatus.SIT.fromAccount : testData.Accounts.ChequeStatus.UAT.fromAccount),
  //     await ensure(_PaymentsPages.stopChequePage.statusValue).textIs(testData.status.PendingApproval),
  //   ]);
  // });

  it('Can search cheque with value date is blank', async function () {
    await _AccountPages.openMenu(Menu.Accounts.ChequeStatus);
    await _AccountPages.chequeStatusPage.loadCondition();
    await _AccountPages.chequeStatusPage.showHideAddFilterBtn.click();
    await _AccountPages.chequeStatusPage.loadCondition4Search();
    await _AccountPages.chequeStatusPage.accountSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.fromAccount : testData.Accounts.ChequeStatus.UAT.fromAccountForValue);
    await _AccountPages.chequeStatusPage.searchButton.click();
    await _AccountPages.chequeStatusPage.loadCondition4Search();
    await Promise.all([
      await ensure(_AccountPages.chequeStatusPage.chequeStatusListTBody).isElementPresent()
    ]);
  });
});

async function displayChequeStatusWithSearch(prodcutType: string): Promise<void> {
  await _AccountPages.openMenu(Menu.Accounts.ChequeStatus);
  await _AccountPages.chequeStatusPage.loadCondition();
  await _AccountPages.chequeStatusPage.showHideAddFilterBtn.click();
  await _AccountPages.chequeStatusPage.loadCondition4Search();
  //Because only one organisation in dropdown, the dropdown is disable, the OptionSelect.selet is very low, so comment below to improve the step
  //  await _AccountPages.chequeStatusPage.organisationSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.organisation : testData.Accounts.ChequeStatus.UAT.organisation);
  await _AccountPages.chequeStatusPage.accountSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.fromAccount : testData.Accounts.ChequeStatus.UAT.fromAccount);
  await _AccountPages.chequeStatusPage.dateFromSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.dateFrom : testData.Accounts.ChequeStatus.UAT.dateFrom);
  await _AccountPages.chequeStatusPage.dateToSelect.select(SIT ? testData.Accounts.ChequeStatus.SIT.dateTo : testData.Accounts.ChequeStatus.UAT.dateTo);
  await _AccountPages.chequeStatusPage.productTypeRadioGrp.select(prodcutType);
  await _AccountPages.chequeStatusPage.searchButton.click();
  await _AccountPages.chequeStatusPage.loadCondition4Search();

  await Promise.all([
    await ensure(_AccountPages.chequeStatusPage.chequeStatusListTBody).isElementPresent()
  ]);
}
