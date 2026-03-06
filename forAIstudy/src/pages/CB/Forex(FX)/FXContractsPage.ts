/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, TextInput, waitForUXLoading } from '../../../lib';

@log export class FXContractsPage extends Page {
    constructor() {
        super();
    }

    @component('//input[@name="fx-filter"]') public fxFilter: TextInput;
    @component('//span[@id="buyAmount_0"]') public buyAmount: TextInput;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fxFilter.element), this.fxFilter.getTimeOut());
    }
}