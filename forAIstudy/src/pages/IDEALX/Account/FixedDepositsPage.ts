/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect, DateSelect, pageSwitchWindow, DBSCalendarSelect } from '../../../lib';

@log export class FixedDepositsPage extends Page {

    // fixed deposits page
    @component('//*[@id="nav-item-navBBTopAccountsLinkText"]') public accountMenu: Button;
    @component('//a[contains(@href,"#/accounts/fixedDeposit")]') public fixedDepositTab: Button;
    @component('//a[contains(@href,"#/approvals/fixed-deposit")]') public fixedDepositApproveMenu: Button;
    @component('//a[@id="ux-tab-TRANSACTION"]') public viewFDTab: Button;
    @component('//button[@name="modify-search"]') public modifySearchButton: Button;
    @component('h1[@id="fixedDepositTitle"]') public fixedDepositTitle: TextInput;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public accountSelect: OptionSelect;
    @component('//dbs-input[@formcontrolname="fromMaturityDate"]/div/div/dbs-input/div/div/div/input') public fromDate: Button;
    @component('//dbs-calendar[1]/div/div/div/dbs-day-calendar/div/table/tbody/tr[5]/td[1]/button') public startdate: Button;
    @component('//button[@class="btn btn__primary btn--xs"]') public applyButton: Button;
    @component('//*[@id="md-input-3-input"]') public endDate: Button;
    @component('//dbs-calendar[2]/div/div/div/dbs-day-calendar/div//table/tbody/tr[5]/td[1]/button') public enddate: Button;
    @component('//dbs-calendar[@formcontrolname="fromMaturityDate"]') public dateFromSelect: DBSCalendarSelect;
    @component('//dbs-calendar[@formcontrolname="fromToMaturityDate"]') public dateToSelect: DBSCalendarSelect;
    @component('//p-auto-complete[@formcontrolname="currency"]') public fromCurrencySelect: OptionSelect;
    @component('//a[@id="ux-tab-FD_ACTIVE"]') public activeTab: Button;
    @component('//a[@id="ux-tab-MATURED"]') public maturedTab: Button;
    @component('//a[@id="ux-tab-SHOWALL"]') public showAllTab: Button;
    @component('//div[@id="fixedDepositItem-0"]') public firstListItem: TextInput;
    @component('//*[@id="labelShowDetails-0"]') public showMoreDetailLink: Button;
    @component('//p[@id="fixedDepositItem-SumDet-interestRate-0"]') public moreDetailItemInterestRate: TextInput;
    @component('//button[@id="generateDetailReport-0"]') public generateDetailReportBtn: Button;
    @component('//button[@name="search"]') public searchButton: Button;
    // report
    @component('//img[@class="style_3" and contains(@src,"/I3BirtReports/preview")]') public DBSLogo: TextInput;
    @component('//table[contains(@id,"AUTOGENBOOKMARK_6")]/tbody/tr[1]/td[3]/div') public bulkPaymentAccountValue: TextInput;

    constructor() {
        super();
    }

    public async loadConditionForFD() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewFDTab.element), this.viewFDTab.getTimeOut());
    }

    public async loadCondition() {
        await waitForUXLoading();
        browser.sleep(6000);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.modifySearchButton.element), this.modifySearchButton.getTimeOut());
    }

    public async loadConditionForSearchSection() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.modifySearchButton.element), this.modifySearchButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.accountSelect.element), this.accountSelect.getTimeOut());
    }

    public async loadCondition4Search() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.searchButton.element), this.searchButton.getTimeOut());
    }

    public async loadCondition4ShowMoreDetail() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.moreDetailItemInterestRate.element), this.moreDetailItemInterestRate.getTimeOut());
    }

    public async loadConditionForDBSLogoOnReportPage() {
        await pageSwitchWindow("BIRT Report Viewer");
        await browser.wait(ExpectedConditions.stalenessOf(this.generateDetailReportBtn.element), this.generateDetailReportBtn.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.DBSLogo.element), this.DBSLogo.getTimeOut());
    }
}