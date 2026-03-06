/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, devWatch, waitForI3Loading } from '../../../lib';

@log export class TransactionReviewPage extends Page {

  @component('//input[@id="hdnFilterMoreLessTxt"]') public filterButton: Button;
  @component('//input[@id="filterCustReference"]') public customerRef: TextInput;
  @component('//input[@name="submit_filter" and @value="Go"]') public filterGo: Button;
  @component('//input[@name="objectIds" and @type="checkbox"][1]') public firstTxn: Button;
  @component('//input[@name="submit_detail" and @type="submit"]') public detailButton: Button;
  @component('//*[@id="reviewgrid"]/thead/tr/th[5]') public lastActivity: Button;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.filterButton.element), this.filterButton.getTimeOut());
  }

  public async goToViewTradePageViaRef(reference: string) {
    await this.loadCondition();
    await this.filterButton.jsClick();
    await this.loadConditionForCustomerRefBeClick();
    await this.customerRef.input(reference);
    await this.filterGo.jsClick();
    await this.loadCondition();
    await this.firstTxn.jsClick();
    await this.detailButton.jsClick();
  }

  public async goToViewTradeAmendmentPageViaRef(reference: string) {
    await this.loadCondition();
    await this.filterButton.jsClick();
    await this.loadConditionForCustomerRefBeClick();
    await this.customerRef.input(reference);
    await this.filterGo.jsClick();
    await this.loadCondition();
    await this.lastActivity.click();
    await this.loadCondition();
    await this.lastActivity.click();
    await this.loadCondition();
    await this.firstTxn.click();
    await this.detailButton.click();
  }

  public async loadConditionForCustomerRefBeClick() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.visibilityOf(this.customerRef.element), this.customerRef.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.filterGo.element), this.filterGo.getTimeOut());
  }

}
