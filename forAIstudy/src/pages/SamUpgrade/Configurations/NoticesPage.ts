/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class NoticesPage extends Page {
  constructor() {
    super();
  }

  //Notices Link

  @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[10]/a') public toConfigurationLink: Button;
  @component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[2]/a') public noticesLink: Button;
  @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
  @component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
  @component('/html/body/table[2]/tbody/tr[10]/td[2]/a') public firstAlertLink: Button;
  @component('/html/body/table[2]/tbody/tr[9]/td[3]') public alertTypeValue: TextInput;
  @component('//input[@name="submit"]') public previewAlertButton: Button;
  @component('//input[@name="submit_update"]') public submitAlertButton: Button;
  @component('/html/body/table[2]/tbody/tr[60]/td[2]/a') public disclaimerLink: Button;
  @component('//input[@name="submit_preview"]') public previewDisclaimerButton: Button;
  @component('//input[@name="submit_submit"]') public submitDisclaimerButton: Button;
  @component('/html/body/table[2]/tbody/tr[9]/td[3]') public disclaimerValue: TextInput;

  public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.disclaimerLink.element), this.disclaimerLink.getTimeOut());
  }
}