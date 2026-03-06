import { browser, ExpectedConditions } from 'protractor';
import {
    Page,
    component, log,
    Button,
    TextInput,
    OptionSelect,
    RadioButton,
    waitForUXLoading,
    DateSelect,
    ListSelect, WebComponent
} from '../../../lib';

@log export class SelectApproverPage extends Page {

    @component('//button[@name="select-approve"]') public selectApproveButton: Button;
    @component('//button[@name="Preview"]') public previewButton: Button;
    @component('//button[@name="Submit"]') public submitButton: Button;
    @component('//input[@name="approve-filter"]') public approverFilter: TextInput;
    @component("//datatable-scroller") public approverList: ListSelect;
    @component('//span[@id="selectedApproverName"]') public selectedApproverName: TextInput;
    @component('//dbs-top-panel/div/div[starts-with(@class, "alert alert-info")]/ul') public idealXInfoMsg4SelectApprover: WebComponent;
    @component('//input[@name="selectedAllApprover"]') public selectAllApprover: Button;
    @component('//span[@id="viewFile_selectedApprover"]') public selectedApproverName2: TextInput;

    constructor() {
        super();
    }

    async loadCondition(): Promise<any> {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.previewButton.element), this.previewButton.getTimeOut());
    }

    async loadCondition4Submit(): Promise<any> {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

}
