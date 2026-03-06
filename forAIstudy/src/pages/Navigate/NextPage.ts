/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, Page } from '../../lib';

@log export class NextPage extends Page {

  //@component('//*[@id="previewButton_Link"]') public NextButton: Button;
  @component('//*[@name="submit_sbuserLogin"]') public NextButton: Button;

  constructor() {
    super();
  }

  public async loadCondition() {
    await browser.wait(ExpectedConditions.visibilityOf(this.NextButton.element), this.NextButton.getTimeOut());
  }

  public async next(): Promise<void> {
    await this.loadCondition();
    await this.NextButton.click();
  }

}
