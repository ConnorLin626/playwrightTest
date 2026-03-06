/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, waitForUXLoading, waitForI3Loading, ListSelect } from '../../../lib';

@log export class ViewSubsiPage extends Page {
  constructor() {
    super();
  }

  @component('//table[@id="importProfileListTable"]') public importProfileList: ListSelect;
  // @component('//a[@id="subsidiarySwitchToLinkId"]') public switchToButton: Button;
  @component('//table/tbody/tr[5]/td[3]/div/ul/li[1]/a') public switchToButton: Button;
  @component('//button[@id="Close"]') public laterButton: Button;

  public async loadCondition() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
  }

  public async loadConditionForViewSubsi() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.switchToButton.element), this.switchToButton.getTimeOut());
  }
}
