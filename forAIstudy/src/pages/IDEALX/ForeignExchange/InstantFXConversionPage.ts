/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button,TextInput, waitForUXLoading, OptionSelect, DBSCalendarSelect, devWatch } from '../../../lib';


@log export class InstantFXConversionPage extends Page {

    @component('//*[@id="nav-item-navBBTopForexLinkText"]') public foreignExchangeMenu: Button;
    @component('//*[@class="btn btn__secondary btn__end ng-star-inserted"]') public createFXButton: Button;
    
    //CReate FX page
    @component('//dbs-dropdown-fx[@formcontrolname="currency"]//label[1]') public fromCCY: Button;
    @component('//ng-component/div/div[1]/form/div[1]/div[3]/div/div[3]/div[1]/dbs-dropdown-fx/div/label[1]') public toCCY: Button;
    @component('//*[@id="search"]') public search: TextInput;
    @component('//dbs-dropdown-fx/div/div/ul/li/span') public searchResult:Button;
    @component('//*[@class="item selected ng-star-inserted"]') public selectedResult:Button;
    @component('//dbs-input[@formcontrolname="amount"]//input') public amount: TextInput;
    @component('//dbs-dropdown-account[@formcontrolname="fromAccount"]') public fromAccount : Button;
    @component('//dbs-dropdown-account/div/div/ul/li[1]/div[1]/div') public fromAccountValue : Button;
    @component('//dbs-dropdown-account[@formcontrolname="toAccount"]') public toAccount : Button;
    @component('//dbs-dropdown-account/div/div/ul/li[1]/div[1]/div/span[1]') public toAccountValue : Button;
    @component('//*[@id="md-textbox-0-input"]') public messageToApprover : TextInput;
    @component('//dbs-input[@formcontrolname="customerReference"]//input') public statementReference : TextInput;
    @component('//ng-component/div/ng-component/div/div[2]/div[2]/div/button') public getRate : Button;

    @component('//*[@name="get-challenge"]') public getChallenge : Button;
    @component('//*[@name="responseCode"]') public responseCode : TextInput;
    @component('//*[@class="btn fx-mobile-quote btn__secondary ng-star-inserted"]') public sendToApprover : Button;
    @component('//*[@class="btn fx-mobile-quote ng-star-inserted btn__primary"]') public sendToApproverEnable : Button;
    @component('//*[@value="Submit"]') public submitBtn: Button;
    @component('//ng-component/div/ng-component/div/div[2]/div[1]/div[2]/button[2]') public confirmNowBtn: Button;
    @component('//ng-component/div/ng-component/div/div[1]/form/div[3]/div[2]/customer-reference/div/div[2]/div[2]/div[1]/dbs-dropdown/div/label[2]') public pmtCategory1: Button;
    @component('//ng-component/div/div[1]/form/div[3]/div[2]/customer-reference/div/div[2]/div[2]/div[1]/dbs-dropdown/div/div/ul/li[1]/div') public pmtCategory1Value: Button;
    @component('//ng-component/div/div[1]/form/div[3]/div[2]/customer-reference/div/div[2]/div[2]/div[2]/dbs-dropdown/div/label[1]') public seriesCode1: Button;
    @component('//ng-component/div/div[1]/form/div[3]/div[2]/customer-reference/div/div[2]/div[2]/div[2]/dbs-dropdown/div/div/ul/li[1]/div/div') public seriesCode1Value: Button;
    
    //Complete page 
    @component('//*[@id="iconConfirmation"]') public successIcon: Button;
    @component('//ng-component/div/div[3]/div[2]/div[2]/div[2]/div[1]/span') public transactionRef: TextInput;
    @component('//ng-component/div/div[3]/div[2]/div[2]/div[1]/div[2]/span') public transactionRefCN: TextInput;

    @component('//ng-component/div/div[3]/div[2]/div[3]/div[2]/div/span') public statementRef: TextInput;
    @component('//ng-component/div/div[3]/div[2]/div[3]/div/div[2]/span') public statementRefCN: TextInput;


    //View page
    @component('//ng-component/div/ng-component/div/div[3]/div[2]/div[1]/div[1]/div[2]/div/div/div/div[2]') public fromAccountView: TextInput;
    @component('//ng-component/div/div[3]/div[2]/div[1]/div[2]/div[2]/div/div/div/div[2]') public toAccountView: TextInput;
    @component('//*[@class="text-amount ng-star-inserted"]') public amountView: TextInput;
    @component('//*[@class="success-heading"]') public stausView: TextInput;
    @component('//ng-component/div/div[3]/div[2]/div[2]/div[1]/div[2]/span') public refView: TextInput;
    @component('//ng-component/div/div[3]/div[2]/div[3]/div[2]/div/span') public statementRefView: TextInput;
    @component('//ng-component/div/div[3]/div[2]/div[3]/div/div/span') public statementRefViewHKBP: TextInput;
    @component('//ng-component/div/div[3]/div[2]/div[2]/div[1]/div[2]/span') public transactionRefView: TextInput;
    @component('//*[@name="approve"]') public approveBtn: Button;
    @component('//*[@name="SendToApprover"]') public proceedBtn: Button;
    @component('//p-auto-complete[@id="approverOption"]') public selectApprover: OptionSelect;





    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createFXButton.element), this.createFXButton.getTimeOut());
    }

    public async loadConditionForCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.sendToApprover.element), this.sendToApprover.getTimeOut());
    }

    public async loadConditionForConfirmPage() {
        await waitForUXLoading();
        //await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.confirmNowBtn.element), this.confirmNowBtn.getTimeOut());
    }

    public async loadConditionForCompletePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.stausView.element), this.stausView.getTimeOut());
    }
    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.stausView.element), this.stausView.getTimeOut());
    }

}
