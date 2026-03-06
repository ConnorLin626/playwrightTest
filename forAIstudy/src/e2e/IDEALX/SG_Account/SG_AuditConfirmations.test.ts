import { browser, ElementFinder } from "protractor";
import { NavigatePages, AccountPages } from '../../../pages/IDEALX';
import { ensure, handlerCase, PROJECT_TYPE, SIT, find, Button, TextInput } from "../../../lib";

let _AccountPages = new AccountPages();
let testData = _AccountPages.fetchTestData('SG_testData.json');
// let reference = "EBACR20201229336";
let reference = "";
// let referId_xPath = '//label[@id="'+reference+'-auditConfirmation-0"]';
let referId_xPath = "";
let auditName = testData.Accounts.AuditConfirmations.auditName;
let auditName_xPath = "";
let address_xPath = "";

//move from "../dist/e2e/IDEALX/Account/AuditConfirmations.test.js" due to this service only available from 6:00 am to 8:30 pm,so make it excute later

describe('Audit Confirmations', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(
            SIT ? testData.Accounts.AuditConfirmations.SIT.loginCompanyId : testData.Accounts.AuditConfirmations.UAT.loginCompanyId,
            SIT ? testData.Accounts.AuditConfirmations.SIT.loginUserId : testData.Accounts.AuditConfirmations.UAT.loginUserId, "123123");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create request as non-ZERO State by Email', async function () {
        await goToAuditConfirmations();
        await goToCreateRequest();
        await fillUpCommonFields();
        await _AccountPages.auditConfirmationsPage.deliveryTypeEmail.jsClick();
        await addNewEmail(testData.Accounts.AuditConfirmations.newEmailNickName0, testData.Accounts.AuditConfirmations.newEmailAddressId0);
        await fillUpPassword(testData.Accounts.AuditConfirmations.password);
        await submitRequest();
        await _AccountPages.auditConfirmationsPage.getAuditConfirmationReferenceID().then(text => {
            reference = text;
            referId_xPath = '//div[@id="' + reference + '-auditConfirmation-0"]';
        });
        await goToAuditConfirmations();
        console.log(reference);
        await _AccountPages.auditConfirmationsPage.fileFilter.input(reference);
        await Promise.all([
            await ensure(_AccountPages.auditConfirmationsPage.statusLabel).textContains(testData.Accounts.AuditConfirmations.status_Received),
            await ensure(_AccountPages.auditConfirmationsPage.email0Value).textContains(testData.Accounts.AuditConfirmations.newEmailAddressId0),
        ]);
    });

    it('Edit request by Email', async function () {
        await goToAuditConfirmations();
        await _AccountPages.auditConfirmationsPage.fileFilter.input(reference);
        await new Button(find(referId_xPath), referId_xPath).jsClick();
        await _AccountPages.auditConfirmationsPage.loadEditCondition();
        await _AccountPages.auditConfirmationsPage.editBtn.click();
        await _AccountPages.auditConfirmationsPage.loadCreateCondition();
        await addNewEmail(testData.Accounts.AuditConfirmations.newEmailNickName1, testData.Accounts.AuditConfirmations.newEmailAddressId1);
        await fillUpPassword(testData.Accounts.AuditConfirmations.password1);
        await submitRequest();
        await goToAuditConfirmations();
        await _AccountPages.auditConfirmationsPage.fileFilter.input(reference);
        await Promise.all([
            await ensure(_AccountPages.auditConfirmationsPage.statusLabel).textContains(testData.Accounts.AuditConfirmations.status_Received),
            await ensure(_AccountPages.auditConfirmationsPage.email0Value).textContains(testData.Accounts.AuditConfirmations.newEmailAddressId1),
        ]);
    });

    it('Create request as non-ZERO State by Both', async function () {
        await goToAuditConfirmations();
        await goToCreateRequest();
        await fillUpCommonFields();
        await _AccountPages.auditConfirmationsPage.deliveryTypeBoth.jsClick();
        await _AccountPages.auditConfirmationsPage.addressNameInput.input(testData.Accounts.AuditConfirmations.addressName);
        await _AccountPages.auditConfirmationsPage.postalAddress.select(testData.Accounts.AuditConfirmations.postalAddress0);
        await fillUpPassword(testData.Accounts.AuditConfirmations.password);
        await submitRequest();
        await _AccountPages.auditConfirmationsPage.getAuditConfirmationReferenceID().then(text => {
            reference = text;
            referId_xPath = '//div[@id="' + reference + '-auditConfirmation-0"]';
            auditName_xPath = '//div[@id="' + auditName + '-auditConfirmation-0"]';
            address_xPath = auditName_xPath + '/p[2]';
        });
        await goToAuditConfirmations();
        await _AccountPages.auditConfirmationsPage.fileFilter.input(reference);
        await Promise.all([
            await ensure(_AccountPages.auditConfirmationsPage.statusLabel).textContains(testData.Accounts.AuditConfirmations.status_Received),
            await ensure(new TextInput(find(address_xPath), address_xPath)).textContains(testData.Accounts.AuditConfirmations.postalAddress0),
        ]);
    });

    it('Edit request by Both', async function () {
        await goToAuditConfirmations();
        await _AccountPages.auditConfirmationsPage.fileFilter.input(reference);
        await new Button(find(referId_xPath), referId_xPath).jsClick();
        await _AccountPages.auditConfirmationsPage.loadEditCondition();
        await _AccountPages.auditConfirmationsPage.editBtn.click();
        await _AccountPages.auditConfirmationsPage.loadCreateCondition();
        await _AccountPages.auditConfirmationsPage.postalAddress.select(testData.Accounts.AuditConfirmations.postalAddress1);
        await fillUpPassword(testData.Accounts.AuditConfirmations.password1);
        await submitRequest();
        await goToAuditConfirmations();
        await _AccountPages.auditConfirmationsPage.fileFilter.input(reference);
        await Promise.all([
            await ensure(_AccountPages.auditConfirmationsPage.statusLabel).textContains(testData.Accounts.AuditConfirmations.status_Received),
            await ensure(new TextInput(find(address_xPath), address_xPath)).textContains(testData.Accounts.AuditConfirmations.postalAddress1),
        ]);
    });

    //add for DASB-17008/DASB-15234,check submit page
    it('Create request Delivery method = Email and postal ', async function () {
        await goToAuditConfirmations();
        await goToCreateRequest();
        await fillUpCommonFieldsSpecial();
        await _AccountPages.auditConfirmationsPage.deliveryTypeBoth.jsClick();
        await addNewEmail(testData.Accounts.AuditConfirmations.newEmailNickName0, testData.Accounts.AuditConfirmations.newEmailAddressId0);
        await _AccountPages.auditConfirmationsPage.postalAddressName.input(testData.Accounts.AuditConfirmations.postalAddress0);
        await fillUpPassword(testData.Accounts.AuditConfirmations.password);
        await submitRequest();
        await Promise.all([
            await ensure(_AccountPages.auditConfirmationsPage.submitStatus).textContains(testData.Accounts.AuditConfirmations.status_Submit),
            await ensure(_AccountPages.auditConfirmationsPage.nameOfAuditFirmValue).textContains(testData.Accounts.AuditConfirmations.auditNameSpecial),
            await ensure(_AccountPages.auditConfirmationsPage.postalCodeValue).textContains(testData.Accounts.AuditConfirmations.postalCode),
        ]);
    });

    //Add for IDXP-2307
    it('Create request Delivery method = Postal only with Full AddressName and address', async function () {
        await goToAuditConfirmations();
        await goToCreateRequest();
        await fillUpCommonFieldsSpecial();
        await _AccountPages.auditConfirmationsPage.deliveryTypePostal.jsClick();
        await _AccountPages.auditConfirmationsPage.postalAddressName.input(testData.Accounts.AuditConfirmations.postalAddressNameFull);
        await _AccountPages.auditConfirmationsPage.useOtherAddress.jsClick();
        await _AccountPages.auditConfirmationsPage.anotherAddressInput.input(testData.Accounts.AuditConfirmations.AnotherAddressFull);
        await _AccountPages.auditConfirmationsPage.postalCodeInput.input(testData.Accounts.AuditConfirmations.postalCode);
        await _AccountPages.auditConfirmationsPage.previewBtn.click();
        await _AccountPages.auditConfirmationsPage.loadPreviewCondition();
        await Promise.all([
            await ensure(_AccountPages.auditConfirmationsPage.nameOfAuditFirmValue).textContains(testData.Accounts.AuditConfirmations.auditNameSpecial),
            await ensure(_AccountPages.auditConfirmationsPage.methodAndFeeOnlyPostalValue).textContains(testData.Accounts.AuditConfirmations.methodAndFeeForOnlyPostal),
            await ensure(_AccountPages.auditConfirmationsPage.addressNameValue).textContains(testData.Accounts.AuditConfirmations.postalAddressNameFull),
            await ensure(_AccountPages.auditConfirmationsPage.auditorAddressValue).textContains(testData.Accounts.AuditConfirmations.AnotherAddressFull),
            await ensure(_AccountPages.auditConfirmationsPage.onlyPostalCodeValue).textContains(testData.Accounts.AuditConfirmations.postalCode),
        ]);
        await _AccountPages.auditConfirmationsPage.submitBtn.click();
        await _AccountPages.auditConfirmationsPage.loadSubmitCondition();   
        await Promise.all([
            await ensure(_AccountPages.auditConfirmationsPage.submitStatus).textContains(testData.Accounts.AuditConfirmations.status_Submit),
            await ensure(_AccountPages.auditConfirmationsPage.nameOfAuditFirmValue).textContains(testData.Accounts.AuditConfirmations.auditNameSpecial),
            await ensure(_AccountPages.auditConfirmationsPage.methodAndFeeOnlyPostalValue).textContains(testData.Accounts.AuditConfirmations.methodAndFeeForOnlyPostal),
            await ensure(_AccountPages.auditConfirmationsPage.addressNameValue).textContains(testData.Accounts.AuditConfirmations.postalAddressNameFull),
            await ensure(_AccountPages.auditConfirmationsPage.auditorAddressValue).textContains(testData.Accounts.AuditConfirmations.AnotherAddressFull),
            await ensure(_AccountPages.auditConfirmationsPage.onlyPostalCodeValue).textContains(testData.Accounts.AuditConfirmations.postalCode),
        ]);
    });

});

async function goToAuditConfirmations(): Promise<void> {
    await _AccountPages.FixedDepositsPage.accountMenu.click();
    await _AccountPages.auditConfirmationsPage.auditConfirmationsTab.click();
    await _AccountPages.auditConfirmationsPage.loadCondition();
}

async function goToCreateRequest(): Promise<void> {
    await _AccountPages.auditConfirmationsPage.createRequestBtn.click();
    await _AccountPages.auditConfirmationsPage.loadCreateCondition();
}

async function fillUpCommonFields(): Promise<void> {
    await _AccountPages.auditConfirmationsPage.monthInput.input(testData.Accounts.AuditConfirmations.month);
    await _AccountPages.auditConfirmationsPage.autocompletePupUp.jsClick();
    await _AccountPages.auditConfirmationsPage.yearInput.input(testData.Accounts.AuditConfirmations.year);
    await _AccountPages.auditConfirmationsPage.autocompletePupUp.jsClick();
    await _AccountPages.auditConfirmationsPage.auditNameSelect.jsClick();
    await _AccountPages.auditConfirmationsPage.auditNameSelect.input(auditName);
    await _AccountPages.auditConfirmationsPage.auditNameSelectValue.click();

}

async function fillUpCommonFieldsSpecial(): Promise<void> {
    await _AccountPages.auditConfirmationsPage.monthInput.input(testData.Accounts.AuditConfirmations.month);
    await _AccountPages.auditConfirmationsPage.autocompletePupUp.jsClick();
    await _AccountPages.auditConfirmationsPage.yearInput.input(testData.Accounts.AuditConfirmations.year);
    await _AccountPages.auditConfirmationsPage.autocompletePupUp.jsClick();
    await _AccountPages.auditConfirmationsPage.auditNameSelect.input(testData.Accounts.AuditConfirmations.auditNameSpecial);
    await _AccountPages.auditConfirmationsPage.auditNameSelectValue.click();
}

async function fillUpPassword(passwordStr: string): Promise<void> {
    await _AccountPages.auditConfirmationsPage.passwordInput.input(passwordStr);
    await _AccountPages.auditConfirmationsPage.confirmPasswordInput.input(passwordStr);
}

async function addNewEmail(nickName: string, addressId: string): Promise<void> {
    await _AccountPages.auditConfirmationsPage.addNewEmailBtn.click();
    await _AccountPages.auditConfirmationsPage.loadAddNewEmailCondition();
    await _AccountPages.auditConfirmationsPage.newAddressNickName.input(nickName);
    await _AccountPages.auditConfirmationsPage.newAddressAddressId.input(addressId);
    await _AccountPages.auditConfirmationsPage.saveAndCloseBtn.click();
    await _AccountPages.auditConfirmationsPage.loadCreateCondition();
    await _AccountPages.auditConfirmationsPage.emailSelect.jsClick();
    await _AccountPages.auditConfirmationsPage.emailAllSelect.jsClick();
    await _AccountPages.auditConfirmationsPage.emailAllSelect.jsClick();
    await _AccountPages.auditConfirmationsPage.search.input(addressId);
    await _AccountPages.auditConfirmationsPage.email0Select.jsClick();
}

async function submitRequest(): Promise<void> {
    await _AccountPages.auditConfirmationsPage.previewBtn.click();
    await _AccountPages.auditConfirmationsPage.loadPreviewCondition();
    await _AccountPages.auditConfirmationsPage.submitBtn.click();
    await _AccountPages.auditConfirmationsPage.loadSubmitCondition();
}
