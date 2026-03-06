/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import {
    Button,
    component, log,
    DateSelect,
    OptionSelect,
    Page,
    RadioButton,
    TextInput,
    waitForUXLoading
} from "../../../lib";
import { browser, ExpectedConditions } from "protractor";

@log export class CreateOATReportsPage extends Page {
    @component('//*[@id="supplier-0"]') public supplierItem: Button;
    @component('//*[@name="fileName"]') public fileName: TextInput;
    @component('//*[@name="reportName"]') public reportName: TextInput;
    @component('//*[@id="label-multi-dropdown-supplier"]') public supplier: Button;
    @component('//*[@id="label-multi-dropdown-account"]') public account: Button;
    @component('//*[@id="search"]') public searchInput: TextInput;
    @component('//*[@id="account-0"]') public accountItem: Button;
    //@component('//autocomplete-multi[@formcontrolname="reportAccountList"]') public account: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="reportOrganisation"]') public organisation: OptionSelect;
    @component('//*[@value="O" and @name="reportCreation"]') public oneOff: RadioButton;
    @component('//p-auto-complete[@formcontrolname="startRelativeDate"]') public startRelativeDate: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="endRelativeDate"]') public endRelativeDate: OptionSelect;
    @component('//date-picker[@formcontrolname="startAbsoluteDate"]') public startAbsoluteDate: DateSelect;
    @component('//date-picker[@formcontrolname="endAbsoluteDate"]') public endAbsoluteDate: DateSelect;
    @component('//p-auto-complete[@formcontrolname="dailyInThe"]') public dailyInThe: OptionSelect;
    @component('//input[@id="dailyInThe"]') public dailyInTheInput: TextInput;
    @component('//div[@class="ui-autocomplete-list-item-wrapper"]') public autocompletePupUp: Button;
    @component('//p-auto-complete[@formcontrolname="weeklyOnDay"]') public weeklyOnDay: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="weeklyOnTime"]') public weeklyOnTime: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="monthlyOnDay"]') public monthlyOnDay: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="monthlyOnTime"]') public monthlyOnTime: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="relativeDay"]') public relativeDay: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="relativeTime"]') public relativeTime: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="access"]') public usage: OptionSelect;
    @component('//*[@id="label-multi-dropdown-sendTo"]') public sendTo: OptionSelect;
    @component('//*[@id="sendTo-0"]') public sendToItem: OptionSelect;
    @component('//*[@id="search"]') public sendToSearch: TextInput;
    @component('//*[@name="reportPassword"]') public password: TextInput;
    @component('//*[@name="reportConfirmPwd"]') public confirmPassword: TextInput;
    @component('//*[@name="remarks"]') public remarks: TextInput;
    @component('//button[@id="btn-save-publish"]') public btnSavePublish: Button;
    @component('//*[@name="dismiss"]') public dismiss: Button;
    @component('//*[@name="publish"]') public publish: Button;
    @component('//div[@id="label-multi-dropdown-account"]') public accountSelect: Button;
    @component('//input[@id="search"]') public search: TextInput;
    @component('//input[@id="account-0"]') public account0Select: Button;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.btnSavePublish.element),
            this.btnSavePublish.getTimeOut()
        );
    }

    public async loadDialog() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.publish.element),
            this.publish.getTimeOut()
        );
    }

    public async loadShowReportDetails() {
        await waitForUXLoading();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.dismiss.element),
            this.dismiss.getTimeOut()
        );
    }
}
