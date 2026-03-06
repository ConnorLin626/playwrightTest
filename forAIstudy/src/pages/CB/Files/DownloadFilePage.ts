/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, waitForI3Loading, waitForUXLoading, OptionSelect, DateSelect } from '../../../lib';

@log export class DownloadFilePage extends Page {
    constructor() {
        super();
    }
    // Download File Page
    @component('//multi-level-dropdown[@formcontrolname="paymentTypeCode"]') public paymentType: OptionSelect;
    @component('//input[@name="fileName"]') public fileName: TextInput;
    @component('//p-auto-complete[@formcontrolname="filesOrganisation"]') public orgSelect: OptionSelect;
    @component('//input[@name="customerReference"]') public custRef: TextInput;
    @component('//input[@name="uploadedFileName"]') public uploadFileName: TextInput;

    @component('//datatable-scroller/datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[2]/div/div/p/span') public fileLink: Button;
    @component('//*[@id="text"]') public doneButton: Button;

    @component('//*[@id="downlowd-file-create"]') public creDownloadFileBtn: Button;
    @component('//date-picker[@formcontrolname="startAbsoluteDate"]') public startAbsoluteDate: DateSelect;
    @component('//date-picker[@formcontrolname="endAbsoluteDate"]') public endAbsoluteDate: DateSelect;
    @component('//*[@name="next"]') public nextBtn: Button;
    @component('//*[@name="dismiss"]') public dismissBtn: Button;
    @component('//*[@id="download-published-refresh"]') public refershButton: Button;
    @component('//*[@id="downlowd-file-create"]') public downloadBtn: Button;
    @component('//*[@id="label-multi-dropdown-account"]') public account: Button;
    @component('//*[@id="search"]') public searchInput: TextInput;
    @component('//*[@id="account-0"]') public accountItem: Button;
    @component('//input[@id="selectAllInput"]') public selectAll: Button;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.creDownloadFileBtn.element), this.creDownloadFileBtn.getTimeOut());
    }


    public async loadConditionForDownloadFile() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.nextBtn.element), this.nextBtn.getTimeOut());
    }

}