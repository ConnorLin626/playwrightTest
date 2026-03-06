import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect } from '../../../lib';
import moment = require("moment");

@log export class ManageSavedContactsPage extends Page {
    constructor() {
        super();
    }

    // alert list page
    @component('//input[@id="alerts-filter"]') public alertsFilter: TextInput;
    @component('//*[@id="alert-edit-delivery"]') public editSavedContactsBtn: Button;

    // Manage Saved Contacts page
    @component('//button[@id="contacts-page-back"]') public backBtn: Button;
    @component('//button[@id="add-new-email"]') public addNewEmailBtn: Button;
    @component('//button[@id="add-new-mobile"]') public addNewMobileNoBtn: Button;
    @component('//input[@id="search-contacts"]') public searchFilter: TextInput;
    @component('//*[@id="contact-nickname-0"]') public nickNameValue: TextInput;
    @component('//*[@id="contact-address-0"]') public emailMobileValue: TextInput;
    @component('//*[@id="contact-edit-0"]/span[1]') public editDetailBtn: Button;
    @component('//*[@id="contacts-delete-0"]/span[1]') public delBtn: Button;
    @component('//div[@id="No Information to display"]') public noInforDisplay: TextInput;
    @component('//div[@class="alert alert-error ng-star-inserted"]/ul/li/span') public errorMsgValue: TextInput;

    // New Email Popup
    @component('//input[@id="nickname0-input"]') public nickName: TextInput;
    @component('//input[@id="address0-input"]') public emailAddr: TextInput;
    @component('//button[@id="saveAndCloseEmail"]') public saveEmailBtn: Button;

    // NEW mobile PopUp
    @component('//button[@id="saveAndCloseMobil"]') public saveMobileBtn: Button;
    @component('//p-auto-complete[@id="countryCode0"]') public countryCode: OptionSelect;
    @component('//input[@id="areaCode0-input"]') public areaCode: TextInput;
    @component('//input[@id="mobileNumber0-input"]') public mobileNo: TextInput;
    
    // Delete pop up
    @component('//button[@id="dialogDelete"]') public deleteBtn: Button;
    @component('//button[@name="dismiss"]') public okBtn: Button;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.visibilityOf(this.alertsFilter.element),
            this.alertsFilter.getTimeOut()
        );
    }

    public async loadCondition4ManageContracts() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.backBtn.element), this.backBtn.getTimeOut()
        );
    }
    public async loadCondition4EmailPop() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.saveEmailBtn.element), this.saveEmailBtn.getTimeOut()
        );
    }

    public async loadCondition4MobilePop() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.saveMobileBtn.element), this.saveMobileBtn.getTimeOut()
        );
    }

    public async loadCondition4DeletePop() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.deleteBtn.element), this.deleteBtn.getTimeOut()
        );
    }

    public async loadCondition4DeleteConfirm() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.okBtn.element), this.okBtn.getTimeOut()
        );
    }
}
