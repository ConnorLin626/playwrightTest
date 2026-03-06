/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { Page, component, log, Button, HtmlSelect, TextInput } from "../../../lib";
import { browser, ExpectedConditions } from "protractor";

@log export class ConfigurationsPage extends Page {
  constructor() {
    super();
  }

  @component('//input[@name="search"]') public searchHomeButton: Button;
  @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[10]/a') public topConfigurationLink: Button;
  @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
  @component('//input[@name="submit_affiliate"]') public submitAffiliateButton: Button;
  @component('//a[text()="Dashboard Policy"]') public dashboardPolicyLink: Button;
  @component('/html/body/table[2]/tbody/tr[23]/td[3]/input') public submitPreviewButton: Button;
  @component('//textarea[@name="content"]') public disclaimerText: TextInput;

  public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitAffiliateButton.element), this.submitAffiliateButton.getTimeOut());
  }

  public async loadConditionForViewPage() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitPreviewButton.element), this.submitPreviewButton.getTimeOut());
  }
}