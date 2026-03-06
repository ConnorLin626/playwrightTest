/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, findAll, waitForI3Loading, ListSelect, HtmlSelect } from '../../../lib';

@log export class AlertRemindersPage extends Page {
  constructor() {
    super();
  }

  @component('//a[@href="/s1gcb/sbb/app/bank/user/selectAlertRule?flow=create"]') public createAlertButton: Button;
  @component('//*[@id="accountListTable"]/tbody/tr[15]/td[3]/input') public pendingVerificationAlertRadio: Button;
  @component('//div[@id="contentDiv"]//a[@href="javaScript:submitSubmit()"]') public continueButton: Button;
  @component('//select[@name="selectedAccountIndex"]') public selectedAccount: HtmlSelect;
  @component('//input[@name="threshold.value"]') public thresholdValue: TextInput;
  @component('//input[@name="startDate"]') public startDate: TextInput;
  @component('//div[@id="contentDiv"]//a[@href="javaScript:submitPreview()"]') public submitPreviewButton: Button;
  @component('//a[@href="javaScript:submitSubmit()"]') public submitSubmitButton: Button;
  @component('//table[@id="alerts"]') public alertList: ListSelect;
  @component('//table[@id="accountListTable"]/tbody/tr[4]/td[4]') public alertAcct: TextInput;
  @component('//table[@id="accountListTable"]/tbody/tr[6]/td[4]') public viewThresholdValue: TextInput;

  public async loadCondition() {
    await waitForUXLoading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.createAlertButton.element), this.createAlertButton.getTimeOut());
  }

  public async loadConditionForCreatePage() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }

  public async loadConditionForPreview() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.stalenessOf(this.createAlertButton.element), this.createAlertButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitPreviewButton.element), this.submitPreviewButton.getTimeOut());
  }
  public async loadConditionForView() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.stalenessOf(this.submitPreviewButton.element), this.submitPreviewButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitSubmitButton.element), this.submitSubmitButton.getTimeOut());
  }

  public async editAlertIfExist(_title: string) {
    let _elementArr = [];
    await findAll('//table[@id="alerts"]/tbody/*/*/a').each(async _element => {
      await _element.getText().then(async titleValue => {
        if (-1 < titleValue.indexOf(_title)) {
          _elementArr.push(_element);
        }
      });
    });
    if (_elementArr.length === 0) {
      let element = [];
      await this.createAlertButton.click();
      await this.loadConditionForCreatePage();
      await findAll('//*[@id="accountListTable"]/tbody/*/td').each(async _element => {
        await _element.getText().then(async text => {
          if (-1 < text.indexOf(_title)) {
            let inputElement = _element.$$("input").first();
            element.push(inputElement);
          }
        })
      });
      await element[0].click();
      await this.continueButton.click();
    }
    else {
      await _elementArr[0].click();
    }
  }
}
