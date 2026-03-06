/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ForexPage } from "../../../pages/CB";
import { saveScreen, ensure, SIT, handlerCase } from "../../../lib";
import { Menu } from "../../../config/menu";
import { browser } from "protractor";

let _ForexPage = new ForexPage();
let testData = _ForexPage.fetchTestData('SG_testData.json');

describe('Forex(FX)', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FXContract.SIT.loginCompanyId : testData.FXContract.UAT.loginCompanyId, SIT ? testData.FXContract.SIT.loginUserId : testData.FXContract.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Check FX Contract', async function () {
        await _ForexPage.openMenu(Menu.Forex.FXContracts);
        await _ForexPage.FXContractsPage.loadCondition();
        await _ForexPage.FXContractsPage.fxFilter.clean();
        await _ForexPage.FXContractsPage.fxFilter.input(testData.FXContract.buySellCurrency);
        await _ForexPage.FXContractsPage.loadCondition();
        await ensure(_ForexPage.FXContractsPage.buyAmount).isNotEmpty();
    });

    it('Check Book FX Detal with DOL Maker', async function () {
        await new NavigatePages().loginCB(SIT ? testData.FXContract.SIT.loginCompanyIdBookFX : testData.FXContract.UAT.loginCompanyIdBookFX, SIT ? testData.FXContract.SIT.loginUserIdBookFX : testData.FXContract.UAT.loginUserIdBookFX);
        await _ForexPage.openMenu(Menu.Forex.bookFXDeal);

    });
});