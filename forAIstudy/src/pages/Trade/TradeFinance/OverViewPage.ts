/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect,waitForI3Loading } from '../../../lib';

@log export class OverViewPage extends Page {
    @component('//*[@id="nav-item-navBBMainTradeFinanceText"]') public tradeFinanceMenu: Button;
    @component('//*[@href="#/trade-finance/overview"]') public overViewTab: Button;
    @component('//*[@href="#/trade-finance/transactions"]') public txnTab: Button;
    @component('//*[@href="#/trade-finance/transactions/processed-transaction"]') public processTab: Button;
    @component('//*[@id="selectedCurrency"]') public selecttCcy: TextInput;
    @component('//overview-summary/div/div[1]/div[1]/div[2]/p-auto-complete/div/div[1]/div/span') public selecttCcyLabel: TextInput;
    @component('//*[@class="overview-summary__left"]') public defaultCcy: TextInput;
    @component('//*[@class="ui-autocomplete-list-item-label ng-star-inserted"]') public filterCCyVale: TextInput;
    @component('//*[@class="currency"]') public totalAmountCcy: TextInput;
    @component('//*[@class="total-amount"]') public totalAmount: TextInput;
    @component('//ng-component/ng-component/div/div[2]/div[1]/overview-task/div/div[2]/div/div[2]/div[2]/span[2]') public appliaction: Button;
    @component('//*[@id="transactionDetail-custRef-0"]') public txnRef: TextInput;
    @component('//*[@id="transactionAdditionalFilter"]') public filterBtn: Button;
    @component('//*[@id="sampling-filter"]') public filterInput: TextInput;
    @component('//*[@id="transactionAdditionalFilter"]') public reSetBtn: Button;
    @component('//dbs-dropdown[@formcontrolname="status"]') public filterStatus: OptionSelect;
    @component('//ng-component/div/div[2]/ng-component/div/div/div[1]/trade-advance-search/div/div/div[2]/dbs-form-filter/div/popper-content/div/div[1]/div/form/div/div[5]/div[2]/dbs-dropdown/div/div/div/span[2]') public clearAll: Button;
    @component('//*[@id="C"]') public filterStatusPendingApproval: Button;
    @component('//*[@name="search"]') public searchBtn: Button;
    @component('//*[@class="switch__slider round"]') public switchUIBtn: Button;
    @component('//*[@name="Approve"]') public useOldBtn: Button;
    @component('//*[@id="mainContent"]/table/tbody/tr[1]/td') public inquiryTitle: TextInput;
    @component('//*[@id="hdnFilterMoreLessTxt"]') public inquiryFilter: Button;
    


    //view page
    @component('//*[@id="tradeReference"]') public viewTxnRef: TextInput;
    @component('//*[contains(@class,"item-status")]') public viewTxnStatus: TextInput;
    @component('//*[@name="approve"]') public approveBtn: Button;
    @component('//*[@name="transactionReject"]') public rejectBtn: Button;
    @component('//*[@name="reject"]') public confirmBtn: Button;
    @component('//*[@name="responseCode"]') public responseCode: TextInput;
    @component('//*[@id="mat-dialog-1"]/dbs-manual-auth-dialog/div/div[2]/form/div/div[2]/button') public approveDialog: Button;
    @component('//*[@name="finish"]') public doneBtn: Button;

    constructor() {
        super();
    }

    public async loadCondition() {
        //await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.defaultCcy.element), this.defaultCcy.getTimeOut());
    }

    public async loadConditionForTxn() {
        await waitForUXLoading();
        await browser.sleep(5000);
        await browser.wait(ExpectedConditions.visibilityOf(this.txnRef.element), this.txnRef.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.txnRef.element), this.txnRef.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTxnStatus.element), this.viewTxnStatus.getTimeOut());
    }

    public async loadConditionForApproveComplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.doneBtn.element), this.doneBtn.getTimeOut());
    }

    public async loadConditionForOldPage() {
        await this.pageSwitchToI3();
        console.log(5555)
        await browser.sleep(8000)
        await browser.wait(ExpectedConditions.visibilityOf(this.inquiryFilter.element), this.inquiryFilter.getTimeOut());
    }
}
