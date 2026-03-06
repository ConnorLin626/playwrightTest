/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, DateSelect, waitForUXLoading, WebComponent, RadioButton } from '../../../lib';

@log export class TelegraphicTransferPage extends Page {

  @component('//dbs-radio-group[@formcontrolname="paymentDateType"]') public paymentDate: RadioButton;
  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentDate.element), this.paymentDate.getTimeOut());
  }
}