/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class ActivityPage extends Page {
    constructor() {
      super();
    }


    @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[6]/a') public topPersonnelLink: Button;
    @component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[6]/a') public activityLink: Button;
    @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
    @component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
    @component('//select[@name="userFunction"]') public selectUserFunction: HtmlSelect;
    @component('//select[@name="longinIds"]') public selectSupportPersonID: HtmlSelect;
    @component('//input[@name="startDate"]') public inputStartDate: TextInput;
    @component('//input[@name="endDate"]') public inputEndDate: TextInput;
    @component('//input[@name="submit_search"]') public submitActivityButton: Button;
    @component('/html/body/table[2]/tbody/tr[21]/td[2]/a') public firstActivityLink: Button;
    @component('/html/body/table[2]/tbody/tr[11]/td[3]') public functionTypeValue: TextInput;

    public async loadCondition() {
      await browser.wait(ExpectedConditions.elementToBeClickable(this.submitActivityButton.element), this.submitActivityButton.getTimeOut());
  }
    
}