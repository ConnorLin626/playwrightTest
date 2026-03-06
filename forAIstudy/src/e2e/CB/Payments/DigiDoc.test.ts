/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages } from "../../../pages/CB";
import { Menu } from "../../../config/menu";
import { ensure, SIT, handlerCase } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData("CN_testData.json");

describe("Digi Doc", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT
        ? testData.TelegraphicTransfer.SIT.loginCompanyId
        : testData.TelegraphicTransfer.UAT.loginCompanyId,
      SIT
        ? testData.TelegraphicTransfer.SIT.loginUserId
        : testData.TelegraphicTransfer.UAT.loginUserId
    );
  });
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
    handlerCase(suitObject, this);
  });

  it("ITT", async function () {
    await displayDataWithSearchandSelectFirstOne();
    await _PaymentsPages.ITTPage.loadCondition4ITTView();
    await _PaymentsPages.ITTPage.editButton.click();
    await _PaymentsPages.ITTPage.loadCondition4ITTEdit();
    await _PaymentsPages.ITTPage.paymentCategory1DropDown.select(
      testData.TelegraphicTransfer.digidoc.ITT.newBOPpaymentCategory1
    );
    await _PaymentsPages.ITTPage.seriesCode1DropDown.select(
      testData.TelegraphicTransfer.digidoc.ITT.newBOPseriesCode1
    );
    await _PaymentsPages.ITTPage.nextButton.click();
    await _PaymentsPages.ITTPage.loadCondition4ITTSubmit();
    await _PaymentsPages.ITTPage.submitButton.click();
    await ensure(_PaymentsPages.ITTPage).isUXSuccess();

    await displayDataWithSearchandSelectFirstOne();
    await _PaymentsPages.ITTPage.loadCondition4ITTView();
    await Promise.all([
      await ensure(_PaymentsPages.ITTPage.seriesCode1View).textContains(
        testData.TelegraphicTransfer.digidoc.ITT.newBOPseriesCode1
      )
    ]);
  });
});

async function displayDataWithSearchandSelectFirstOne(): Promise<void> {
  await _PaymentsPages.openMenu(Menu.Approvals.PaymentsITT);
  await _PaymentsPages.ITTPage.loadCondition();
  await _PaymentsPages.ITTPage.showAddFilterLabel.jsClick();
  await _PaymentsPages.ITTPage.dateFromSelect.select(
    testData.TelegraphicTransfer.digidoc.ITT.dateFrom
  );
  await _PaymentsPages.ITTPage.dateToSelect.select(
    testData.TelegraphicTransfer.digidoc.ITT.dateTo
  );
  await _PaymentsPages.ITTPage.searchButton.click();
  await _PaymentsPages.ITTPage.loadCondition4Search();
  await _PaymentsPages.ITTPage.firstDataItem.click();
}
