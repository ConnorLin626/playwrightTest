/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class SearchPage extends Page {
    constructor() {
      super();
    }


    @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[6]/a') public topPersonnelLink: Button;
    @component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[8]/a') public searchLink: Button;
    @component('//input[@name="loginID"]') public inputLoginID: TextInput;
    @component('//input[@name="lastName"]') public inputName: TextInput;
    @component('//input[@name="phoneNumber1"]') public inputPhoneNumber1: TextInput;
    @component('//input[@name="emailID"]') public inputEmailID: TextInput;
    @component('//input[@name="groupName"]') public inputGroupName: TextInput;
    @component('//select[@name="allAffilaite"]') public selectAffiliate: HtmlSelect;
    @component('//input[@name="actionAdvance"]') public searchButton: Button;
    @component('/html/body/table[3]/tbody/tr[4]/td[2]/a') public firstResultLink: Button;

    public async loadCondition() {
      await browser.wait(ExpectedConditions.elementToBeClickable(this.searchButton.element), this.searchButton.getTimeOut());
  }
}