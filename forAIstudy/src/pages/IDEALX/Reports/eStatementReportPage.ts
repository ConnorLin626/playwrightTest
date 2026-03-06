/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import {
    Page,
    component, log,
    Button,
} from '../../../lib';

@log export class eStatementReportPage extends Page {
    constructor() {
        super();
    }

    @component('//button[@class="btn btn__minimal btn--word-break btn--action"]') public DownloadBtn: Button;


    async loadCondition(): Promise<any> {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.DownloadBtn.element), this.DownloadBtn.getTimeOut());
    }

}
