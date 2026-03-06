/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button,TextInput, waitForUXLoading, OptionSelect, DBSCalendarSelect, devWatch } from '../../../lib';


@log export class LimitOrderPage extends Page {

    @component('//*[@id="nav-item-navBBTopForexLinkText"]') public foreignExchangeMenu: Button;

    //Limit Order List
    @component('//a[contains(@href,"#/fx/limit-order-list")]') public limitOrderTab: Button;
    @component('//*[@id="contractRef_0"]') public txnRefLink: Button;
    @component('//*[@id="limit-order-filter"]') public limitOrderFilter: TextInput;
    @component('//*[@id="createNew"]') public createNewBtn: Button;
    @component('//*[@id="transactionAdditionalFilter"]') public additionFilter: Button;
    @component('//dbs-dropdown[@formcontrolname="status"]') public selectStatus: OptionSelect;
    @component('//*[@Type="checkbox"]') public checkbox: Button;
    @component('//*[@name="reset"]') public applyFilter: Button;
    
   
    // Create Limit Order
    @component('//ng-component/div/form/div[1]/div[1]/div[1]/dbs-dropdown/div/label[1]') public sellAccountCCY: Button;
    @component('//ng-component/div/form/div[1]/div[3]/div[1]/dbs-dropdown/div/label[1]') public buyAccountCCY: Button;
    @component('//*[@id="search"]') public searchButton: TextInput;
    @component('//*[@class="dropdownval"]') public searchResult: Button;
    @component('//dbs-input[@formcontrolname="amount"]//input') public amount: TextInput;
    @component('//*[@data-mat-icon-name="icon-amount-sub-button"]') public subBtn: Button;
    @component('//*[@id="from-acct-select"]/div/div/div/div[1]') public sellAccountBtn: Button;
    // @component('//li[contains(@class,"account-item")]') public sellAccountValue: Button;
    @component('//li[@id="acct-id-0"]') public sellAccountValue: Button;
    @component('//li[@id="acct-id-3"]') public sellUATAccountValue: Button;
    @component('//*[@id="to-acct-select"]/div/div/div/div') public buyAccountBtn: Button;
    // @component('//li[contains(@class,"account-item")]') public buyAccountValue: Button;
    @component('//li[@id="acct-id-0"]') public buyAccountValue: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//regulatory-reporting/div/div/div[2]/div[1]/dbs-dropdown/div/label[1]') public pmtCategory1: Button;
    @component('//regulatory-reporting/div/div/div[2]/div[1]/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div') public pmtCategory1Value: Button;
    @component('//regulatory-reporting/div/div/div[2]/div[2]/dbs-dropdown/div/label[1]') public seriesCode1: Button;
    @component('//regulatory-reporting/div/div/div[2]/div[2]/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div') public seriesCode1Value: Button;
    @component('//dbs-calendar[@formcontrolname="expiredDate"]') public expireDate: DBSCalendarSelect;
    @component('//textarea[@class="ng-untouched ng-pristine ng-valid"]') public remarks: TextInput;
    @component('//*[@id="next-btn"]') public nextBtn: Button;
    @component('//*[@name="edit"]') public editBtn: Button;
    @component('//*[@name="action"]') public processBtn: Button;
    @component('//*[@name="sentToApprover"]') public sentToApproveBtn: Button;
    @component('//*[@name="get-challenge"]') public getChallengeBtn: Button;
    @component('//*[@name="responseCode"]') public responseCode: TextInput;
    @component('//*[@value="Submit"]') public submitBtn: Button;
    @component('//*[@name="goToOrderOverview"]') public goToOrderOverviewBtn: Button;
    @component('//*[@id="transactionReference"]') public transactionReference: TextInput;

    //View Limit Order
    @component('//*[contains(@class,"payment-status")]') public transactionStatus: TextInput;
    @component('//*[@id="from-acct-label"]') public fromAccountView: TextInput;
    @component('//*[@id="to-acct-label"]') public toAccountView: TextInput;
    @component('//*[@class="currency_amount_sell"]') public sellAmountView: TextInput;
    @component('//*[@class="currency_amount_buy"]') public buyAmountView: TextInput;
    @component('//limit-order-summary/div[4]/div[4]/span[@class="date-time-value"]') public expireDateView: TextInput;
    @component('//limit-order-summary/div[4]/div[5]/span[@class="date-time-value"]') public expireDateViewCN: TextInput;
    @component('//*[@name="approve"]') public approveBtn: Button;
    @component('//*[@name="cancelOrder"]') public cancelOrder: Button;
    @component('//*[@name="reject"]') public rejectBtn : Button;
    @component('//dbs-reject-dialog//button[@name="reject"]') public dialogRejectBtn: Button;
    @component('//input[@name="reasonForRejection"]') public rejectReason : TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.txnRefLink.element), this.txnRefLink.getTimeOut());
    }

    public async loadConditionForCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.sellAccountCCY.element), this.sellAccountCCY.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.nextBtn.element), this.nextBtn.getTimeOut());
    }

    public async loadConditionForPreviewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.editBtn.element), this.editBtn.getTimeOut());
    }
    public async loadConditionForApprovePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.getChallengeBtn.element), this.getChallengeBtn.getTimeOut());
    }

    public async loadConditionForSubmitPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.goToOrderOverviewBtn.element), this.goToOrderOverviewBtn.getTimeOut());
    }


    public async loadConditionForViewtPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatus.element), this.transactionStatus.getTimeOut());
    }


    public async goToViewLimitOrderViaSearch(status: string) {
        await this.additionFilter.click();
        if ("" !== status) {
            await this.selectStatus.click();
            await this.searchButton.input(status);
            await this.checkbox.jsClick();
        }
        await this.applyFilter.click();
        await this.loadCondition();
    }
}
