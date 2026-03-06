/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, HtmlSelect } from '../../../lib';

@log export class BankAccountSettingPage extends Page {
    constructor() {
        super();
    }

    //Company profile page
    @component('//li[@id="menuCompany"]') public companyMenu: Button;
    @component('//a[@id="menuCompanyProfile"]') public companyProfileMenu: Button;
    @component('//span[@id="btn-print"]') public printBtn: Button;
    
    //Bank account setting page
    @component('//a[@id="ux-tab-ACCOUNT"]') public bankAcctTab: Button;
    @component('//input[@id="account-filter"]') public acctFilter: TextInput;
    @component('//*[@id="account-0"]') public acctNoValue: TextInput;
    @component('//*[@class="collapse-button ng-star-inserted"]') public additionalFilter: Button;
    @component('//*[@id="searchForm"]/div[1]/p-auto-complete/div/div[1]/div') public approvalStatus: TextInput;
    @component('//*[@id="searchForm"]/div[1]/p-auto-complete/div/div[2]/ul/li[5]/div/span') public approvalStatusValue: TextInput;
    @component('//*[@name="search-btn"]') public searchBtn: Button;
    @component('//*[@id="cash-panel"]/account-list/div/div[2]/div[1]/div[2]/div[4]/p[1]') public statusValue: TextInput;

    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.printBtn.element), this.printBtn.getTimeOut());
    }

}