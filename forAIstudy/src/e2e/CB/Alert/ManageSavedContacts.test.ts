import { AlertsPages } from "../../../pages/CB/Alert";
import { NavigatePages } from "../../../pages/Navigate";
import { ensure, SIT, handlerCase, generatedID } from "../../../lib";
import { Menu } from "../../../config/menu";

let _alertPage = new AlertsPages();
let testData = _alertPage.fetchTestData("SG_testData.json");

let _mockData = SIT ? testData.ManageSavedContacts.SIT : testData.ManageSavedContacts.UAT;
let _manageSavedContactsPage = _alertPage.manageSavedContactsPage

let nickname = "";
let nicknameforNewMobile = "";

describe("Manage Saved Contacts", async function () {
    // this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(_mockData.loginCompanyId, _mockData.loginUserId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it("Add Edit delete New Email", async function () {
        await _alertPage.openMenu(Menu.Alert.CreateManageAlerts);
        await _manageSavedContactsPage.loadCondition();
        await _manageSavedContactsPage.editSavedContactsBtn.jsClick();
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
            await ensure(_manageSavedContactsPage.noInforDisplay).textContains(testData.ManageSavedContacts.noInforDisplay),
        ]);
    });

    it("Add Edit delete New Mobile", async function () {
        await _alertPage.openMenu(Menu.Alert.CreateManageAlerts);
        await _manageSavedContactsPage.loadCondition();
        await _manageSavedContactsPage.editSavedContactsBtn.jsClick();
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
            await ensure(_manageSavedContactsPage.noInforDisplay).textContains(testData.ManageSavedContacts.noInforDisplay),
        ]);
    });
});