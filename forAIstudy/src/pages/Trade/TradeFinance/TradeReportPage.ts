/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, pageSwitchWindow } from '../../../lib';

@log export class TradeReportPage extends Page {

    @component("//input[@id='hdnFilterMoreLessTxt']") public filterBtnTop: Button;
    @component('//select[@id="reportTypeFilter"]') public reportType: HtmlSelect;
    @component('//input[@id="reportTitleFilter"]') public reportTitle: TextInput;
    @component("//input[@name='submit_view' and @value='View']") public viewBtn: Button;
    @component("//input[@id='submit_rptFilter']") public filterBtnBottom: Button;
    @component("//input[@name='submit_filter']") public goBtn: Button;
    @component("//input[contains(@id,'User Details')]") public reportSelect: Button;
    @component('//select[@id="holdingSubsidiaryList_selection"]') public organisationSelect: HtmlSelect;

    //Report Detail
    @component('//div[@id="parameterDialogokButton"]') public okBtn: Button;
    @component('//*[@id="layout"]/tbody/tr[1]/td/table/tbody/tr/td[1]/b') public reportName: TextInput;
    @component('//*[@id="__bookmark_1"]/tbody/tr[1]/th[2]/div') public companyName: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.filterBtnTop.element), this.filterBtnTop.getTimeOut());
    }

    public async loadConditionForViewReport(windowName: string) {
        await pageSwitchWindow(windowName);
        if (await this.okBtn.isElementPresent())
            this.okBtn.click();
        await browser.wait(ExpectedConditions.visibilityOf(this.reportName.element), this.reportName.getTimeOut());
    }

    public async loadConditionForFilterReport(windowName: string) {
        await pageSwitchWindow(windowName);
        await browser.wait(ExpectedConditions.visibilityOf(this.okBtn.element), this.okBtn.getTimeOut());
    }
}