import { AlertsPages, NavigatePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";

let _alertPage = new AlertsPages();
let _alertPagesListPage = new AlertsPages();
let testData = _alertPage.fetchTestData("SG_testData_03.json");

let _mockData = SIT ? testData.ManageSavedContacts.SIT : testData.ManageSavedContacts.UAT;
let _manageSavedContactsPage = _alertPage.manageSavedContactsPage

let nickname = "";
let nicknameforNewMobile = "";

describe("Manage Saved Contacts", async function () {
    // this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ManageSavedContacts.SIT.loginCompanyId : testData.ManageSavedContacts.UAT.loginCompanyId, SIT ? testData.ManageSavedContacts.SIT.loginUserId : testData.ManageSavedContacts.UAT.loginUserId, testData.ManageSavedContacts.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Add Edit delete New Email", async function () {
        //await _alertPagesListPage.createManageAlertPage.userMenu.click();
        await _alertPagesListPage.createManageAlertPage.profileMenu.click();
        await _alertPagesListPage.createManageAlertPage.alertMenu.click();
        await _manageSavedContactsPage.loadCondition();
        await _manageSavedContactsPage.editSavedContactsBtn.click();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.addNewEmailBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4EmailPop();
        nickname = testData.ManageSavedContacts.nickname + generatedID();
        await _manageSavedContactsPage.nickName.input(nickname);
        await _manageSavedContactsPage.emailAddr.input(testData.ManageSavedContacts.email);
        await _manageSavedContactsPage.saveEmailBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.searchFilter.input(nickname);
        await Promise.all([
            await ensure(_manageSavedContactsPage.nickNameValue).textContains(nickname),
            await ensure(_manageSavedContactsPage.emailMobileValue).textContains(testData.ManageSavedContacts.email),
        ]);

        //Edit
        await _manageSavedContactsPage.editDetailBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4EmailPop();
        await _manageSavedContactsPage.emailAddr.clean();
        await _manageSavedContactsPage.emailAddr.input(testData.ManageSavedContacts.emailEdit);
        await _manageSavedContactsPage.saveEmailBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.searchFilter.input(nickname);
        await Promise.all([
            await ensure(_manageSavedContactsPage.nickNameValue).textContains(nickname),
            await ensure(_manageSavedContactsPage.emailMobileValue).textContains(testData.ManageSavedContacts.emailEdit),
        ]);

        //Delete
        await _manageSavedContactsPage.delBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4DeletePop();
        await _manageSavedContactsPage.deleteBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4DeleteConfirm();
        await _manageSavedContactsPage.okBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.searchFilter.input(nickname);
        await Promise.all([
            await ensure(_manageSavedContactsPage.noInforDisplay).textContains("No Information to display"),
        ]);
    });

    it("Add Edit delete New Mobile", async function () {
        //await _alertPagesListPage.createManageAlertPage.userMenu.click();
        await _alertPagesListPage.createManageAlertPage.profileMenu.click();
        await _alertPagesListPage.createManageAlertPage.alertMenu.click();
        await _manageSavedContactsPage.loadCondition();
        await _manageSavedContactsPage.editSavedContactsBtn.click();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.addNewMobileNoBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4MobilePop();
        nicknameforNewMobile = testData.ManageSavedContacts.nickname + generatedID();
        await _manageSavedContactsPage.nickName.input(nicknameforNewMobile);
        await _manageSavedContactsPage.countryCode.select(testData.ManageSavedContacts.countryCode);
        await _manageSavedContactsPage.areaCode.input(testData.ManageSavedContacts.areaCode);
        await _manageSavedContactsPage.mobileNo.input(testData.ManageSavedContacts.mobileNo);
        await _manageSavedContactsPage.saveMobileBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.searchFilter.input(nicknameforNewMobile);
        await Promise.all([
            await ensure(_manageSavedContactsPage.nickNameValue).textContains(nicknameforNewMobile),
            await ensure(_manageSavedContactsPage.emailMobileValue).textContains(testData.ManageSavedContacts.mobileNo),
        ]);

        //Edit
        await _manageSavedContactsPage.editDetailBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4MobilePop();
        await _manageSavedContactsPage.mobileNo.clean();
        await _manageSavedContactsPage.mobileNo.input(testData.ManageSavedContacts.mobileNoEdit);
        await _manageSavedContactsPage.saveMobileBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.searchFilter.input(nicknameforNewMobile);
        await Promise.all([
            await ensure(_manageSavedContactsPage.nickNameValue).textContains(nicknameforNewMobile),
            await ensure(_manageSavedContactsPage.emailMobileValue).textContains(testData.ManageSavedContacts.mobileNoEdit),
        ]);

        //Delete
        await _manageSavedContactsPage.delBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4DeletePop();
        await _manageSavedContactsPage.deleteBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4DeleteConfirm();
        await _manageSavedContactsPage.okBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.searchFilter.input(nicknameforNewMobile);
        await Promise.all([
            await ensure(_manageSavedContactsPage.noInforDisplay).textContains("No Information to display"),
        ]);
    });

    //check if prefix is +886, phone number can't start with 0
    it("Add New and Edit Mobile", async function () {
        //await _alertPagesListPage.createManageAlertPage.userMenu.click();
        await _alertPagesListPage.createManageAlertPage.profileMenu.click();
        await _alertPagesListPage.createManageAlertPage.alertMenu.click();
        await _manageSavedContactsPage.loadCondition();
        await _manageSavedContactsPage.editSavedContactsBtn.click();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await _manageSavedContactsPage.addNewMobileNoBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4MobilePop();
        nicknameforNewMobile = testData.ManageSavedContacts.nickname + generatedID();
        await _manageSavedContactsPage.nickName.input(nicknameforNewMobile);
        await _manageSavedContactsPage.countryCode.select(testData.ManageSavedContacts.twCountryCode);
        await _manageSavedContactsPage.areaCode.input(testData.ManageSavedContacts.areaCode);
        await _manageSavedContactsPage.mobileNo.input(testData.ManageSavedContacts.twMobileNo);
        await _manageSavedContactsPage.saveMobileBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await Promise.all([
            await ensure(_manageSavedContactsPage.errorMsgValue).textContains(testData.ManageSavedContacts.errorInforDisplay),
        ]);

        //Edit
        await _manageSavedContactsPage.searchFilter.input(testData.ManageSavedContacts.mobileNoTWEdit);
        await _manageSavedContactsPage.editDetailBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4MobilePop();
        await _manageSavedContactsPage.countryCode.select(testData.ManageSavedContacts.twCountryCode);
        await _manageSavedContactsPage.mobileNo.clean();
        await _manageSavedContactsPage.mobileNo.input(testData.ManageSavedContacts.twMobileNo);
        await _manageSavedContactsPage.saveMobileBtn.jsClick();
        await _manageSavedContactsPage.loadCondition4ManageContracts();
        await Promise.all([
            await ensure(_manageSavedContactsPage.errorMsgValue).textContains(testData.ManageSavedContacts.errorInforDisplay),
        ]);
    });
});