/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class FileUploadEnquiryPage extends Page {
  constructor() {
    super();
  }

//File Upload Enquiry Link

@component('//a[@title="Setup System Operations and Events"]') public topOperationsLink: Button;
@component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[18]/a') public fileUploadEnquiryLink: Button;
@component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
@component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
@component('//select[@name="columnName"]') public selectSearchBy: HtmlSelect;
@component('//input[@name="columnValue"]') public inputSearchBy: TextInput;
@component('//input[@name="startDate"]') public inputStartDate: TextInput;
@component('//input[@name="endDate"]') public inputEndDate: TextInput;
@component('//input[@name="submit_search"]') public searchFileUploadButton: Button;

@component('/html/body/table[3]/tbody/tr[1]/td[2]') public searchResultLabel: TextInput;
@component('/html/body/table[3]/tbody/tr[3]/td[3]/a') public firstResultLink: Button;
@component('/html/body/table[3]/tbody/tr[3]/td[4]') public fromAccountValue: TextInput;
@component('/html/body/table[3]/tbody/tr[3]/td[6]') public amountValue: TextInput;

public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchFileUploadButton.element), this.searchFileUploadButton.getTimeOut());
  }
}