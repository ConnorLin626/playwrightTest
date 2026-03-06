/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import {
    Page,
    component, log,
    Button,
    TextInput,
    waitForI3Loading,
    HtmlSelect,
    pageSwitchWindow,
    RadioButton,
    OptionSelect
} from '../../../lib';

@log export class AdminReportsPage extends Page {
    constructor() {
        super();
    }

    @component('//button[@id="admin-generate-0"]') public companySetupReportGenBtn: Button;
    @component('//li[@id="admin-standard-0"]') public companySetupStandard: Button;
    @component('//button[@id="admin-generate-1"]') public userSetupReportGenBtn: Button;
    @component('//li[@id="admin-personalised-1"]') public userSetupPersonalised: Button;
    @component('//button[@id="admin-generate-3"]') public userLoginReportGenBtn: Button;
    @component('//li[@id="admin-personalised-3"]') public userLoginPersonalised: Button;
    @component('//button[@name="next"]') public viewBtn: Button;
    @component('//dbs-radio-group[@formcontrolname="deliveryFormat"]') public fileFormatRadio: RadioButton;
    @component('//*[@id="label-multi-dropdown-account"]') public accountDorp: OptionSelect;
    @component('//*[@for="selectAllInput"]') public accountDorpValue: Button;
    @component('//table[contains(@class, "style_")]/tbody/tr[2]/td[3]/div') public userIdEleBirt: TextInput;
    @component('//table[contains(@class, "style_")]/tbody/tr[1]/td[3]/div') public corpIdEleBirt: TextInput;

    async loadCondition(): Promise<any> {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.companySetupReportGenBtn.element), this.companySetupReportGenBtn.getTimeOut());
    }
    async loadCondition4ClickSecondLevelBtn(secondLevelButton: Button): Promise<any> {
        await browser.wait(ExpectedConditions.elementToBeClickable(secondLevelButton.element), secondLevelButton.getTimeOut());
    }
    async loadCondition4PersonalizedPage(): Promise<any> {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewBtn.element), this.viewBtn.getTimeOut());
    }
}
