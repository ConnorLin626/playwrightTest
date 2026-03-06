/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, devWatch, waitForI3Loading } from '../../../lib';

@log export class TransactionInProcessPage extends Page {

  @component('//input[@id="hdnFilterMoreLessTxt"]') public filterButton: Button;
  @component('//input[@id="transPendingApprlBtn"]') public transPendingApprlBtn: Button;
  @component('//input[@name="submit_filter"]') public submitFilterButton: Button;
  @component('//input[@name="submit_select" and @type="submit"]') public selectButton: Button;
  @component('//input[@name="submit_delete"]') public deleteButton: Button;
  @component('//input[@name="submit_approve" and @type="submit"]') public approve: Button;
  @component('//select[@id="product"]') public selectProductType: HtmlSelect;
  @component('//select[@id="subProduct"]') public selectSubProductType: HtmlSelect;
  @component('//select[@id="transactionTypeCd"]') public selectTransactionType: HtmlSelect;
  @component('//select[@id="statusCd"]') public selectStatusCd: HtmlSelect;
  @component('//input[@id="filterCustReference"]') public customerRef: TextInput;
  @component('//input[@name="submit_filter" and @value="Go"]') public filterGo: Button;
  @component('//input[@name="objectIds" and @type="checkbox"][1]') public firstTxn: Button;
  @component('//select[@name="transactionTypeCd"]') public selectType: HtmlSelect;
  @component('//tr[@class="clsGTrIdx"]/td[1]') public noRecords: TextInput;
  @component('//input[@name="submit_delete"]') public deleteBtn: Button;
  @component('//input[@name="submit_reject"]') public rejectBtn: Button;
  @component('//input[@name="submit_view"]') public viewBtn: Button;
  @component('//input[@name="submit_approve"]') public approvalBtn: Button;
  @component('//input[@name="submit_offlineApprove"]') public offlineApproveBtn: Button;
  @component('//input[@name="submit_offlinePrint"]') public offlinePrintBtn: Button;
  @component('//input[@name="submit_template"]') public saveTemplateBtn: Button;
  @component('//input[@id="saveAsTemplateNameTmp"]') public templateName: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transPendingApprlBtn.element), this.transPendingApprlBtn.getTimeOut());
  }

  public async loadConditionForCustomerRefBeClick() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.visibilityOf(this.customerRef.element), this.customerRef.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.filterGo.element), this.filterGo.getTimeOut());
  }

  public async goToEditTradePageViaRef(reference: string) {
    await this.loadCondition();
    await this.filterButton.jsClick();
    await this.loadConditionForCustomerRefBeClick();
    // await this.selectStatusCd.select("Pending Approval");
    await this.customerRef.input(reference);
    await this.filterGo.jsClick();
    await this.loadCondition();
    await this.firstTxn.jsClick();
    await this.selectButton.jsClick();
  }

  public async goToEditTradePageViaFilter(productType?: string, subProductType?: string, status?: string) {
    await this.loadCondition();
    await this.filterButton.jsClick();
    await this.loadConditionForCustomerRefBeClick();
    if (0 !== productType.length) {
      await this.selectProductType.selectByValue(productType);
    }
    if (0 !== subProductType.length) {
      await this.selectSubProductType.selectByValue(subProductType);
    }
    if (0 !== status.length) {
      await this.selectStatusCd.select(status);
    }
    await this.filterGo.jsClick();
    await this.loadCondition();
    await this.firstTxn.click();
    await this.selectButton.click();
  }

  public async goToCheckAmendmentExist(reference?: string, type?: string, ) {
    await this.loadCondition();
    await this.filterButton.jsClick();
    await this.loadConditionForCustomerRefBeClick();
    if (reference) {
      await this.customerRef.input(reference);
    }
    if (type) {
      await this.selectType.select(type);
    }
    await this.filterGo.jsClick();
    await this.loadCondition();
  }
}
