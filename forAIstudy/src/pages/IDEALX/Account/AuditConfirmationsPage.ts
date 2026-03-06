import {Button, component, log, OptionSelect, Page, TextInput, RadioButton, waitForUXLoading} from "../../../lib";
import {browser, ExpectedConditions} from "protractor";

@log export class AuditConfirmationsPage extends Page {
    constructor() {
        super();
    }
    @component('//tbody[@class="result-tbody"]/tr[1]/td[2]/div/p') public refLink: Button;
    @component('//a[contains(@href,"#/accounts/audit-confirmations")]') public auditConfirmationsTab: Button;
    @component('//button[@id="createRequest"]') public createRequestBtn: Button;
    @component('//button[@name="next"]') public previewBtn: Button;
    @component('//button[@name="submit"]') public submitBtn: Button;
    @component('//button[@name="finish"]') public finishBtn: Button;
    @component('//div[contains(@class,"ui-autocomplete-list-item-wrapper")]') public autocompletePupUp: Button;
    @component('//input[@id="month"]') public monthInput: TextInput;
    @component('//input[@id="year"]') public yearInput: TextInput;
    @component('//button[@id="addNewEmail"]') public addNewEmailBtn: Button;
    @component('//button[@name="saveAndClose"]') public saveAndCloseBtn: Button;
    @component('//input[@id="nickname0-input"]') public newAddressNickName: TextInput;
    @component('//input[@id="address0-input"]') public newAddressAddressId: TextInput;
    @component('//div[@id="label-multi-dropdown-auditEmail"]') public emailSelect: Button;
    @component('//input[@id="search"]') public search: TextInput;
    @component('//input[@id="selectAllInput"]') public emailAllSelect: OptionSelect;
    @component('//input[@id="auditEmail-0"]') public email0Select: Button;
    @component('//span[@id="email0"]') public email0Value: TextInput;
    @component('//*[@id="auditName"]') public auditNameSelect: TextInput;
    @component('//audit-firm-details/div/div[2]/p-auto-complete/div/div[2]/ul/li[1]/div/span') public auditNameSelectValue: TextInput;
    @component('//input[@id="deliveryType-email"]') public deliveryTypeEmail: Button;
    @component('//input[@id="deliveryType-postal"]') public deliveryTypePostal: Button;
    @component('//input[@id="deliveryType-both"]') public deliveryTypeBoth: Button;
    @component('//dbs-input[@formcontrolname="addresseeName"]/div/div/div/input') public addressNameInput: TextInput;
    @component('//input[@id="postal-address-another"]') public useOtherAddress:Button;
    @component('//dbs-input[@formcontrolname="anotherAddress"]/div/div/div/input') public anotherAddressInput:TextInput;
    @component('//dbs-input[@formcontrolname="postalCode"]/div/div/div/input') public postalCodeInput:TextInput;
    @component('//*[@id="anotherCountry"]') public anotherCountryInput:TextInput;
    @component('//input[@name="password"]') public passwordInput: TextInput;
    @component('//input[@name="confirmPassword"]') public confirmPasswordInput: TextInput;
    @component('//dbs-radio-group[@formcontrolname="postalAddress"]') public postalAddress: RadioButton;
    @component('//input[@id="audit-confirmations-filter"]') public fileFilter: TextInput;
    @component('//*[@id="Received-auditConfirmation-0"]') public statusLabel: Button;
    @component('//button[@name="Edit"]') public editBtn: Button;
    @component('//dbs-input/div/div/div[1]/input') public postalAddressName: TextInput;
    //submit page
    @component('//ng-component/div/div[1]/h1') public submitStatus: TextInput;
    @component('//audit-request-details/div/div/div[1]/span[2]/span[2]') public nameOfAuditFirmValue: TextInput;
    @component('//audit-request-details/div/div/div[4]/span[2]/span[2]') public postalCodeValue: TextInput;
    @component('//audit-request-details/div/div/div[2]/span[1]/span[2]') public methodAndFeeOnlyPostalValue: TextInput;
    @component('//audit-request-details/div/div/div[3]/span[1]/span[2]') public addressNameValue:TextInput;
    @component('//audit-request-details/div/div/div[3]/span[2]/span[2]') public auditorAddressValue:TextInput;
    @component('//audit-request-details/div/div/div[3]/span[2]/span[4]') public onlyPostalCodeValue: TextInput;

    //View page
    @component('//div[@class="summary-title"]') public SummaryTitle: TextInput;
    @component('//p[@class="audit-status ng-star-inserted"]/span[3]') public Status: TextInput;
    @component('//div[@class="details-item padding-bottom-0 no-bottom"]/div[1]/p') public lawFirm: TextInput;
    @component('//div[@class="details-content"]/div[2]/div/div/p[1]') public applicantName: TextInput;
    @component('//div[@class="details-content"]/div[2]/div/div/p[2]') public requestorTitle: TextInput;
    @component('//information-banner/div/div/div/div[2]/p[2]') public rejectReason: TextInput;


    async loadCondition(): Promise<any> {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createRequestBtn.element), this.createRequestBtn.getTimeOut());
    }

    async loadCreateCondition(): Promise<any> {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.previewBtn.element), this.previewBtn.getTimeOut());
    }

    async loadPreviewCondition(): Promise<any> {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
    }

    async loadSubmitCondition(): Promise<any> {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishBtn.element), this.finishBtn.getTimeOut());
    }

    async loadEditCondition(): Promise<any> {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.editBtn.element), this.editBtn.getTimeOut());
    }

    async loadAddNewEmailCondition(): Promise<any> {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.saveAndCloseBtn.element), this.saveAndCloseBtn.getTimeOut());
    }

}
