/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class FileExchangeReceivePage extends Page {
  constructor() {
    super();
  }

//File Exchange-Receive Link

@component('//a[@title="Setup System Operations and Events"]') public topOperationsLink: Button;
@component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[16]/a') public fileExchangeReceiveLink: Button;
@component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
@component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
@component('//input[@name="corpId"]') public inputCorpID: TextInput;
@component('//input[@name="fileDate"]') public inputFileDate: TextInput;
@component('//input[@name="fileName"]') public inputFileName: TextInput;
@component('//select[@name="status"]') public selectFileStatus: HtmlSelect;
@component('//input[@name="submit_search"]') public searchFileExchage: Button;

@component('/html/body/table[3]/tbody/tr[1]/td[2]') public searchResultLabel: TextInput;
@component('/html/body/table[3]/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]') public fileDateValue: TextInput;

@component('/html/body/table[2]/tbody/tr[8]/td[2]/table/tbody/tr[2]/td[1]/small/a') public listAllFilesLink: Button;

public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchFileExchage.element), this.searchFileExchage.getTimeOut());
  }
}