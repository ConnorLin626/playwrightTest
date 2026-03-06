import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect } from '../../../lib';

@log export class ProfileSettingsPage extends Page {
    constructor() {
        super();
    }

    //profile & settings page
    @component('//*[@id="profile-setting"]') public profileSettingsMenu: Button;
    @component('//profile-detail/div/div/div[2]/div[2]/div[2]/div[2]/div[2]') public mobileUpdateButton: Button;
    @component('//*[@class="phone__dropdown"]') public countryCodeDropDown: Button;
    @component('//*[@class="dropdown__optionContainer-inputbox ng-untouched ng-pristine ng-valid"]') public contryCodeInput: TextInput;
    @component('//*[@class="countryCode"]') public selectContryCode: Button;
    @component('//dbs-update-profile-details-dialog/div/form/div[2]/div[1]/dbs-phone/div/div/div/div[2]/input') public mobileNo: TextInput;
    @component('//button[@name="verify"]') public verifyBtn: Button;
    @component('//dbs-top-panel/div/div[2]/ul/li/span') public errorMsgValue: TextInput;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.visibilityOf(this.mobileUpdateButton.element),
            this.mobileUpdateButton.getTimeOut()
        );
        await browser.wait(
            ExpectedConditions.elementToBeClickable(
                this.mobileUpdateButton.element
            ),
            this.mobileUpdateButton.getTimeOut()
        );
    }


    public async loadDialog() {
        await waitForUXLoading();
        // await browser.wait(
        //     ExpectedConditions.elementToBeClickable(this.dismissButton.element),
        //     this.dismissButton.getTimeOut()
        // );
    }
}