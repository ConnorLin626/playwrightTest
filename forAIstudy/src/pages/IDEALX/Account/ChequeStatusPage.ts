/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, waitForI3Loading, OptionSelect, DateSelect, RadioButton } from '../../../lib';
// import { StopChequePage } from './../PayTransfer/StopChequePage';

@log export class ChequeStatusPage extends Page {
    constructor() {
        super();
    }
    @component('//a[contains(@href,"#/accounts/cheque-status")]') public chequeStatueTab: Button;
    @component('//*[@id="chequeStatusListTBody"]') public chequeStatusListTBody: TextInput;
    @component('//*[@id="transactionAdditionalFilter"]') public showHideAddFilterBtn: Button;
    @component('//a[@id="ux-tab-SHOWALL"]') public tabShowAll: Button;
    @component('//a[@id="ux-tab-ISSUED"]') public tabIssued: Button;
    @component('//a[@id="ux-tab-EXPIRED"]') public tabExpired: Button;
    @component('//a[@id="ux-tab-PRESENTED"]') public tabPresented: Button;
    @component('//a[@id="ux-tab-RETURNED_STOPPED"]') public tabReturnedStopped: Button;
    @component('//p-auto-complete[@formcontrolname="organisation"]') public organisationSelect: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="account"]') public accountSelect: OptionSelect;
    @component('//date-picker[@formcontrolname="valueDateFrom"]') public dateFromSelect: DateSelect;
    @component('//date-picker[@formcontrolname="valueDateTo"]') public dateToSelect: DateSelect;
    @component('//dbs-radio-group[@id="chequeStatus-productType-RadioGrp"]') public productTypeRadioGrp: RadioButton;
    @component('//button[@id="chequeStatus-item-ButtonStopCheque-0"]') public stopChequeActionBtn: Button;
    @component('//button[@name="search"]') public searchButton: Button;
    @component('//input[@id="chequeState-filter"]') public chequeStateFilter: TextInput;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showHideAddFilterBtn.element), this.showHideAddFilterBtn.getTimeOut());
    }

    public async loadCondition4Search() {
        await waitForUXLoading();
        await browser.sleep(2000);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.searchButton.element), this.searchButton.getTimeOut());
    }
    // public async loadConditionForGoToStopCheque() {
    //     await waitForUXLoading();
    //     let _StopChequePage = new StopChequePage();
    //     await browser.wait(ExpectedConditions.elementToBeClickable(_StopChequePage.stopChequeBtn.element), _StopChequePage.stopChequeBtn.getTimeOut());
    // }
}