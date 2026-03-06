/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading } from '../../../lib';

@log export class SamplingRequestPage extends Page {
    @component('//*[@id="nav-item-navBBMainTradeFinanceText"]') public tradeFinanceMenu: Button;
    @component('//*[@href="#/trade-finance/sampling-request/list"]') public samplingRequestTab: Button;
    @component('//*[@name="third-party-filter"]') public filterInput: TextInput;
    @component('//sampling-request-list/div/table/tbody/tr[1]/td[1]/div/div[1]/p') public requestRef: Button;
    @component('//*[@data-mat-icon-name="icon-vector"]') public docAttachment: Button;
    @component('//dbs-toolbar/div/div[1]/div[1]/button/mat-icon') public backButton: Button;
    @component('//span[starts-with(@class,"download-title")]') public downloadAll: Button;

    //View request page
    @component('//*[@class="right"]') public viewDownload: Button;
    @component('//*[@class="status-success"]') public viewStatus: TextInput;



    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.requestRef.element), this.requestRef.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewStatus.element), this.viewStatus.getTimeOut());
    }
}
