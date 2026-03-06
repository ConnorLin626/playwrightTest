/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { Button, component, log, Page, TextInput } from "../../../lib";
import { browser, ExpectedConditions } from "protractor";

@log export class RefreshSessionPage extends Page {

  @component('//*[@id="swagger-ui"]/section/div[1]/div/div/form/input') public exploreInput: TextInput;
  @component('//*[@id="swagger-ui"]/section/div[1]/div/div/form/button') public exploreButton: Button;
  @component('//*[@id="swagger-ui"]/section/div[2]/div') public loadingContainer: TextInput;
  @component('//*[@id="operations-default-refreshSession"]/div[2]/div/div[1]/div[1]/div[2]/button') public tryItOut: Button;
  @component('//*[@id="operations-default-refreshSession"]/div[2]/div/div[1]/div[2]/table/tbody/tr[1]/td[2]/div/div/div/textarea') public refreshSessionReq: TextInput;
  @component('//*[@id="operations-default-refreshSession"]/div[2]/div/div[2]/button') public execute: Button;
  @component('//*[@id="operations-default-refreshSession"]/div[2]/div/div[3]/div[2]/div/div/table/tbody/tr/td[2]/div[1]/pre') public respondBody: TextInput;
  @component('//*[@id="operations-default-refreshSession"]/div[2]/div/div[3]/div[2]/div/div/table/tbody/tr/td[2]/div[1]/pre/span[11]') public code: TextInput;
  constructor() {
    super();
  }
  public async loadCondition() {
    await browser.wait(ExpectedConditions.visibilityOf(this.loadingContainer.element), this.loadingContainer.getTimeOut());
  }

  public async loadConditionDefault() {
    await browser.wait(ExpectedConditions.visibilityOf(this.tryItOut.element), this.tryItOut.getTimeOut());
  }

  public async loginPage() {
    await browser.get(browser.baseUrl);
    await this.loadCondition();
  }
}