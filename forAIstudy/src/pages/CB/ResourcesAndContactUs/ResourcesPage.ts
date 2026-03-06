/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, TextInput, waitForUXLoading } from '../../../lib';

@log export class ResourcesPage extends Page {
  constructor() {
    super();
  }
  
  @component('//input[@id="search-resource"]') public searchFilter: TextInput;
  @component('//datatable-body-row/div[2]/datatable-body-cell[2]/div/div[2]/p') public descriptionValue: TextInput;
  @component('//datatable-body-row/div[2]/datatable-body-cell[2]/div/div[1]/p') public titleValue: TextInput;
  

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchFilter.element), this.searchFilter.getTimeOut());
  }
}