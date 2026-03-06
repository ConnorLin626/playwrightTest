/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, PaymentsPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData("CN_testData.json");

describe("Digi Doc", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, "123123"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("ITT", async function () {
        await displayDataWithSearchandSelectFirstOne();
        await _PaymentsPages.ITTPage.loadCondition4ITTView();
        await _PaymentsPages.ITTPage.editButton.jsClick();
        await _PaymentsPages.ITTPage.loadCondition4ITTEdit();
        await _PaymentsPages.ITTPage.paymentCategory1DropDown.select(testData.TelegraphicTransfer.digidoc.ITT.newBOPpaymentCategory1);
        await _PaymentsPages.ITTPage.seriesCode1DropDown.select(testData.TelegraphicTransfer.digidoc.ITT.newBOPseriesCode1);
        await _PaymentsPages.ITTPage.remark.clean();
        await _PaymentsPages.ITTPage.remark.input("remark");
        await _PaymentsPages.ITTPage.nextButton.click();
        await _PaymentsPages.ITTPage.loadCondition4ITTSubmit();
        await _PaymentsPages.ITTPage.submitButton.click();
        await displayDataWithSearchandSelectFirstOne();
        await _PaymentsPages.ITTPage.loadCondition4ITTView();
        await Promise.all([
            await ensure(_PaymentsPages.ITTPage.seriesCode1View).isNotEmpty(),
        ]);
    });
});

async function displayDataWithSearchandSelectFirstOne(): Promise<void> {
    await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    await _PaymentsPages.ITTPage.ITTApprove.click();
    await _PaymentsPages.ITTPage.loadCondition2();
    await _PaymentsPages.ITTPage.showAddFilterLabel2.jsClick();
    await _PaymentsPages.ITTPage.dateFromSelect.select(testData.TelegraphicTransfer.digidoc.ITT.dateFrom);
    await _PaymentsPages.ITTPage.dateToSelect.select(testData.TelegraphicTransfer.digidoc.ITT.dateTo);
    await _PaymentsPages.ITTPage.searchButton.jsClick();
    await _PaymentsPages.ITTPage.loadCondition4Search();
    await _PaymentsPages.ITTPage.firstDataItem.jsClick();
}
