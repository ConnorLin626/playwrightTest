import {Button, component, log, Page, TextInput} from "../../../lib";
import {browser, ExpectedConditions} from "protractor";


@log export class CashManagementReportsPage extends Page {
    constructor() {
        super();
    }

    @component('//button[@id="BNKExpAccSum-create"]') public industryAcctSumReportGenBtn: Button;
    @component('//button[@id="BNKExpAccDet-create"]') public industryAcctDetReportGenBtn: Button;
    @component('//input[@id="selected_left_0"]') public reportContentAcctNo: Button;
    @component('//input[@name="fileName"]') public fileNameInput: TextInput;
    @component('//button[@name="dismiss"]') public okBtn: Button;
    @component('//button[@id="dialogDelete"]') public deleteBtn: Button;
    @component('//input[@id="reports-filter"]') public reportsFilterInput: TextInput;
    @component('//span[@id="BNKExpAccSum-options-0"]') public optionSumBtn: TextInput;
    @component('//span[@id="BNKExpAccDet-options-0"]') public optionDetBtn: TextInput;
    @component('//li[@id="BNKExpAccSum-edit-0"]') public option0EditBtn: Button;
    @component('//li[@id="BNKExpAccSum-delete-0"]') public optionSumDeleteBtn: Button;
    @component('//li[@id="BNKExpAccDet-delete-0"]') public optionDetDeleteBtn: Button;
    @component('//p[@id="BNKExpAccSum-view-account-0"]') public expandSumReport: Button;
    @component('//p[@id="BNKExpAccDet-view-account-0"]') public expandDetReport: Button;
    @component('//input[@id="selectAllInput"]') public selectAllBtn: Button;
    @component('//li[@id="BNKExpAccSum-account-0"]') public sumAccountsDetail: TextInput;
    @component('//li[@id="BNKExpAccDet-account-0"]') public detAccountsDetail: TextInput;
    @component('//*[@id="BNKExpAccSum-paymentDateRange-relative"]') public sumDateRange: TextInput;
    @component('//*[@id="BNKExpAccSum-deliveryFormat"]') public sumFileFormate: TextInput;
    @component('//*[@id="BNKExpAccDet-paymentDateRange-relative"]') public detDateRange: TextInput;
    @component('//*[@id="BNKExpAccDet-deliveryFormat"]') public detFileFormate: TextInput;
    @component('//*[@id="BNKExpAccDet-reportName-0"]') public detReportName: TextInput;


    async loadCondition(): Promise<any> {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.industryAcctSumReportGenBtn.element), this.industryAcctSumReportGenBtn.getTimeOut());
    }

    async loadCondition4OKDialog(): Promise<any> {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.okBtn.element), this.okBtn.getTimeOut());
    }
    async loadCondition4DeleteDialog(): Promise<any> {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteBtn.element), this.deleteBtn.getTimeOut());
    }
}