/*
 * �Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, DateSelect, FileSelect, WebComponent, ensure } from "../../../lib";

@log export class ITTPage extends Page {

  constructor() {
    super();
  }

  @component('//label[@id="showAddFilter"]') public showAddFilterLabel: Button;
  @component('//date-picker[@formcontrolname="paymentDateStart"]') public dateFromSelect: DateSelect;
  @component('//date-picker[@formcontrolname="paymentDateEnd"]') public dateToSelect: DateSelect;
  @component('//button[@name="search"]') public searchButton: Button;
  @component('//*[@id="transaction-reference_0"]') public firstDataItem: Button;
  @component('//span[@id="single-edit"]') public editButton: Button;
  @component('//button[@name="next"]') public nextButton: Button;
  @component('//auto-complete[@formcontrolname="pmtCategory1"]') public paymentCategory1DropDown: OptionSelect;
  @component('//auto-complete[@formcontrolname="seriesCode1"]') public seriesCode1DropDown: OptionSelect;
  @component('//button[@name="next"]') public submitButton: Button;
  @component('//span[@id="seriesCode1Data"]') public seriesCode1View: TextInput;

  //IN ITT
  @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
  @component('//input[@name="itt-regulatory-advising-fxcontract"]') public fxContract: TextInput;
  @component('//input[@name="disposalAccountInstructionInput"]') public disposalAccountInstruction: TextInput;
  @component('//input[@name="billReference"]') public billRef: TextInput;
  @component('//input[@id="digiDocFileUpload"]') public digiDocFileUploadButton: FileSelect;
  @component('//p-auto-complete[@formcontrolname="docType"]') public digiDocFileType: OptionSelect;
  @component('//itt-view-section/div/div/section/div/div/div[1]/span[2]') public purposeCodeValue: TextInput;


  public async loadCondition() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.showAddFilterLabel.element), this.showAddFilterLabel.getTimeOut());
  }

  public async loadCondition4Search() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchButton.element), this.searchButton.getTimeOut());
  }

  public async loadCondition4ITTView() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.editButton.element), this.editButton.getTimeOut());
  }
  public async loadCondition4ITTEdit() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
  }
  public async loadCondition4ITTSubmit() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

}
