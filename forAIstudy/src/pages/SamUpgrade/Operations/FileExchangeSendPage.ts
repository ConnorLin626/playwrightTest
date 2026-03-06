/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class FileExchangeSendPage extends Page {
  constructor() {
    super();
  }

//File Exchange-Send Link

@component('//a[@title="Setup System Operations and Events"]') public topOperationsLink: Button;
@component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[14]/a') public fileExchangeSendLink: Button;
@component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
@component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
@component('//input[@name="corpId"]') public inputCorpID: TextInput;
@component('//input[@name="fileDate"]') public inputFileDate: TextInput;
@component('//input[@name="fileName"]') public inputFileName: TextInput;
@component('//select[@name="status"]') public selectFileStatus: HtmlSelect;
@component('//input[@name="submit_search"]') public searchFileExchange: Button;

@component('/html/body/table[2]/tbody/tr[8]/td[2]/table/tbody/tr[2]/td[1]/small[1]/a') public uploadFileLink: Button;
@component('/html/body/table[2]/tbody/tr[2]/td[2]') public pageHeadline: TextInput;
@component('/html/body/table[2]/tbody/tr[8]/td[2]/table/tbody/tr[2]/td[1]/small[2]/a') public listAllFilesLink: Button;
@component('/html/body/table[3]/tbody/tr[1]/td[2]') public searchResultLabel: TextInput;
@component('/html/body/table[3]/tbody/tr[3]/td[2]/strong') public noRecordMsg: TextInput;

@component('/html/body/table[3]/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]') public fileDateValue: TextInput;

public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchFileExchange.element), this.searchFileExchange.getTimeOut());
  }
}