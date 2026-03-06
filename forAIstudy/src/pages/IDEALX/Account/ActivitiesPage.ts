/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, OptionSelect, waitForUXLoading, TextInput, pageSwitchWindow, waitForI3Loading } from '../../../lib';
import { BalancesPage } from './BalancesPage';

@log export class ActivitiesPage extends Page {
    constructor() {
        super();
    }
    @component('//a[contains(@href,"#/accounts/activity")]') public accountActivityTab: Button;
    @component('//h1[@id="activitiesTitle"]') public activitiesTitle: TextInput;
    @component('//p-auto-complete[@formcontrolname="organisationRes"]') public organisationSelect: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="accountRes"]') public accountSelect: OptionSelect;
    @component('//*[@id="activities-lastTwo-current"]') public lastTwoAndCurrent: Button;
    @component('//button[@name="search"]') public searchButton: Button;
    @component('//p-auto-complete[@formcontrolname="accountRes"]') public fromAccountSelect: OptionSelect;
    @component('//input[@id="activities-customize"]') public activitiesCustomizeRadio: Button;
    @component('//*[@class="icon icon__arrow"]') public showMoreDetailLink: Button;
    @component('//div[@id="moreDetailContentDiv-0"]') public showMoreDetailContentDiv: TextInput;
    @component('//p[@id="moreDetail-earmarkAmount-0"]') public showMoreDetailItemEarmarkAmount: TextInput;
    @component('//*[@id="exportExcelCSV"]') public csvIcon: Button;
    @component('//*[@id="exportExcelPDF"]') public pdfIcon: Button;
    @component('//p[@id="accountDetail-item-label-0"]') public accountDetailItemLabel: TextInput;
    @component('//button[@name="modify-search"]') public modifySearchButton: Button;

    //filter input at "Transaction Detail" Section
    @component('//input[@id="activities-filter"]') public activitiesTransactionDetailFilter: TextInput;
    @component('//p[@id="transactionDetail-tranDesc-0"]') public activitiesTransactionDetailTranDesc: TextInput;
    @component('//button[@id="transactionDetail-viewReport-0"]') public activitiesTransactionDetailViewReport: Button;

    // report
    @component('//img[@class="style_3" and contains(@src,"/I3BirtReports/preview")]') public DBSLogo: TextInput;
    @component('//table[@class = "style_10" and contains(@id,"__bookmark_1")]/tbody/tr[2]/td[1]/div') public bulkPaymentAccountValue: TextInput;

    // old ui
    @component('//top-link//label[@class="action"]') public oldActivitiesLink: Button;
    @component('//table//a[@title="Download XLS"]') public xlsIconI3: Button;
    @component('//table//a[@title="Download PDF"]') public pdfIconI3: Button;
    @component('//input[@name="search"]') public searchButtonI3: Button;

    public async loadCondition() {
        let _BalancesPage = new BalancesPage();
        await _BalancesPage.loadCondition();
    }

    public async loadCondition4Search() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.modifySearchButton.element), this.modifySearchButton.getTimeOut());
    }

    public async loadCondition4ShowMoreDetail() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showMoreDetailItemEarmarkAmount.element), this.showMoreDetailItemEarmarkAmount.getTimeOut());
    }

    public async loadCondition4TransactionDetailFilter() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.activitiesTransactionDetailTranDesc.element), this.activitiesTransactionDetailTranDesc.getTimeOut());
    }

    public async loadConditionForDBSLogoOnReportPage() {
        await pageSwitchWindow("BIRT Report Viewer");
        await browser.wait(ExpectedConditions.stalenessOf(this.activitiesTransactionDetailViewReport.element), this.activitiesTransactionDetailViewReport.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.DBSLogo.element), this.DBSLogo.getTimeOut());
    }

    public async loadConditionForOldUI() {
        await this.pageSwitchToI3();
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.xlsIconI3.element), this.xlsIconI3.getTimeOut());
    }
}