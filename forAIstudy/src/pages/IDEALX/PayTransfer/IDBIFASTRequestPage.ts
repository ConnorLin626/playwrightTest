/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect, find, DateSelect, ListSelect, devWatch,SIT } from "../../../lib";

@log export class IDBIFASTRequestPage extends Page {
    @component('//a[contains(@href,"#/transfers/RFP")]') public bifastRequestMenu: Button;
    @component('//*[@id="byTXN-filter"]') public bifastReuqestCenterFilter: TextInput;
    @component("//button[@id='transaction-reference_0']") public refLink: Button;
    
    //View page
    @component('//*[@class="section-header-content"]/div[1]/div[2]') public refValue: TextInput;
    @component('//*[@class="section-header-content"]/div[2]/div[2]') public statusValue: TextInput;
    @component('//dbs-view-section-rpi/div/section[1]/div[3]/div/div[2]') public debitACCTValue: TextInput;
    @component('//dbs-view-section-rpi/div/section[1]/div[2]/div/div[1]') public sendPartyName: TextInput;
    @component('//dbs-view-section-rpi/div/section[1]/div[2]/div/div[2]') public sendPartyAcct: TextInput;
    @component('//dbs-view-section-rpi/div/section[1]/div[5]/span[2]') public paymentType: TextInput;
    @component('//dbs-view-section-rpi/div/section[1]/div[1]/span[2]') public requestAmount: TextInput;
    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.refLink.element), this.refLink.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.refLink.element), this.refLink.getTimeOut());
    }

    
    public async goToViewPaymentPageViaRef(reference: string) {
        await this.loadCondition();
        await this.bifastReuqestCenterFilter.input(reference);
        await this.loadCondition();
        await this.refLink.jsClick();
    }

}
