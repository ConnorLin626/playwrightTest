/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, DashboardPages } from "../../../pages/CB";
import { saveScreen, ensure, SIT, handlerCase } from "../../../lib";
import { Menu } from "../../../config/menu";
import { browser } from "protractor";

let _DashboardPages = new DashboardPages();
let testData = _DashboardPages.fetchTestData('SG_testData.json');
let testDataSAM = _DashboardPages.fetchTestData('SAM_testData.json');
let content = '';

describe('Dashboard Policy', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('SAM configured', async function () {
    await _DashboardPages.configurationsPage.topConfigurationLink.click();
    await _DashboardPages.configurationsPage.loadCondition();
    await _DashboardPages.configurationsPage.selectAffiliate.select(testDataSAM.selectAffiliate.DBSSG);
    await _DashboardPages.configurationsPage.submitAffiliateButton.jsClick();
    await _DashboardPages.configurationsPage.dashboardPolicyLink.jsClick();
    await _DashboardPages.configurationsPage.disclaimerText.getText().then(text => {
      content = text.trim();
    });
  });
});

describe('Announcement', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.Dashboard.SIT.loginCompanyId : testData.Dashboard.UAT.loginCompanyId,
      SIT ? testData.Dashboard.SIT.loginUserId : testData.Dashboard.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Check the Announcement can display correct with SAM configured', async function () {
    await _DashboardPages.openMenu(Menu.Dashboard.Home);
    await _DashboardPages.dashboardPage.loadCondition();
    await Promise.all([
      await ensure(_DashboardPages.dashboardPage.announcementContent).textContainsLessOne(content)
    ]);
  });
});