/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { SessionPages } from "../../pages/UXAPI/SessionPages";
import { ensure, saveScreen, handlerCase } from "../../lib";
import { browser } from "protractor";

let _SessionPages = new SessionPages();
let testData = _SessionPages.fetchTestData('/UXAPI/UXAPI_testData.json');

describe('Refresh Session', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await _SessionPages.refreshSessionPage.loginPage();
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Test RefreshSession', async function () {
    await _SessionPages.refreshSessionPage.loadCondition();
    await _SessionPages.refreshSessionPage.exploreInput.click();
    await _SessionPages.refreshSessionPage.exploreInput.input(testData.refreshSession.url);
    await _SessionPages.refreshSessionPage.exploreButton.click();
    await _SessionPages.refreshSessionPage.loadConditionDefault();
    await _SessionPages.refreshSessionPage.tryItOut.jsClickIfExist();
    await _SessionPages.refreshSessionPage.refreshSessionReq.input(testData.refreshSession.refreshSessionReq);
    await _SessionPages.refreshSessionPage.execute.click();

    await Promise.all([
      await ensure(_SessionPages.refreshSessionPage.code).textIs(testData.refreshSession.code),
    ]);
  });
});