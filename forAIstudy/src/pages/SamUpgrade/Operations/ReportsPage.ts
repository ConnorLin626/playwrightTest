/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class ReportsPage extends Page {
  constructor() {
    super();
  }

//Reports Link

@component('//a[@title="Setup System Operations and Events"]') public topOperationsLink: Button;
@component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
@component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
@component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[2]/a') public reportsLink: Button;
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[3]/td[1]/small[1]/a') public viewApprovalPolicyReportLink: Button;
@component('//select[@name="columnName"]') public selectSearchBy: HtmlSelect;
@component('//input[@name="columnValue"]') public inputSearchFor: TextInput;
@component('//input[@id="Search"]') public searchReportButton: Button;
@component('//select[@name="companyId"]') public selectSearchResultCheckbox: HtmlSelect;
//@component('//button[@onclick="viewReport()"]') public viewReportButton: Button;
@component('//*[@id="viewReport"]/input') public viewReportButton: Button;
@component('//*[@value="View Report"]') public viewReportBtn: Button;
@component('//div[@class="style_5" and contains(@id,"AUTOGENBOOKMARK_3_")]') public reportTitle: TextInput;
@component('//*[contains(@id,"AUTOGENBOOKMARK_4_")]/tbody/tr[1]/td[3]/div') public reportCorpIDValue: TextInput;

@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[3]/td[1]/small[2]/a') public viewInactiveCustomersPurgingReportLink: Button;
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[3]/td[1]/small[3]/a') public viewPendingProfileReportLink: Button;

@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[3]/td[1]/small[5]/a') public viewDrmntUserCleanupReportLink: Button;
@component('/html/body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[4]/td[2]/span[2]') public endCalendar: Button;
@component('/html/body/div/div[5]/table/tbody/tr[6]/td[2]') public endDay: Button;


public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.viewDrmntUserCleanupReportLink.element), this.viewDrmntUserCleanupReportLink.getTimeOut());
  }
public async loadConditionOnReportPage() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.reportTitle.element), this.reportTitle.getTimeOut());
  }
}