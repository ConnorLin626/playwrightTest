import { ProfileSettingsPages } from '../../../pages/IDEALX/ProfileSettings';
import { NavigatePages } from '../../../pages/Navigate';
import { SIT, handlerCase, PROJECT_TYPE, ensure } from '../../../lib';
import { browser } from 'protractor';

const _ProfileSettingsPages = new ProfileSettingsPages();
let _profileSettingspage = _ProfileSettingsPages.profileSettingsPage;
let testData = _ProfileSettingsPages.fetchTestData("SG_testData_03.json");

let _mockData = SIT ? testData.profileSettings.SIT : testData.profileSettings.UAT;

describe("Profile & Settings", async function () {
    // this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.profileSettings.SIT.loginCompanyId : testData.profileSettings.UAT.loginCompanyId, SIT ? testData.profileSettings.SIT.loginUserId : testData.profileSettings.UAT.loginUserId, testData.profileSettings.UAT.password); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

     //check if prefix is +886, phone number can't start with 0
     it("Update Mobile", async function () {
        await _profileSettingspage.profileSettingsMenu.click();
        await _profileSettingspage.loadCondition();
        await _profileSettingspage.mobileUpdateButton.click();
        await _profileSettingspage.loadDialog();
        await _profileSettingspage.countryCodeDropDown.click();
        await _profileSettingspage.contryCodeInput.input(testData.profileSettings.twCountryCode);
        await _profileSettingspage.selectContryCode.click();
        await _profileSettingspage.mobileNo.input(testData.profileSettings.twMobileNo);
        await _profileSettingspage.verifyBtn.click();
        await Promise.all([
            await ensure(_profileSettingspage.errorMsgValue).textContains(testData.profileSettings.errorInforDisplay),
        ]);
    });

});