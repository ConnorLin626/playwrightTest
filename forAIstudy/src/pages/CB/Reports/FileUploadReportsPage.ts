/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading, HtmlSelect, pageSwitchWindow } from '../../../lib';

@log export class FileUploadReportsPage extends Page {
  constructor() {
    super();
  }

  @component('//a[contains(@href,"common/efdreports/user/transactionReport") and text()="Transaction Detail Report"]') public transactionDetailPersonaliseButton: Button;
  @component('//span[@s1id="pageHeadlineDisplay"]') public transactionDetailTitle: TextInput;
  @component('//input[@name="fromPaymentDate"]') public fromPaymentDate: TextInput;
  @component('//input[@name="toPaymentDate"]') public toPaymentDate: HtmlSelect;
  @component('//a[@onclick="ajax_submit_view(\'view\')"]') public viewButton: Button;

  //Birt Report Page
  //@component('//table[@class="style_13" and starts-with(@id,"AUTOGENBOOKMARK_5_")]/tbody/tr[2]/td[3]/div') public transactionDetailFromAccountValue: TextInput;
  @component('//table[contains(@class, "style_") and contains(@id,"AUTOGENBOOKMARK_5_")]/tbody/tr[2]/td[3]/div') public transactionDetailFromAccountValue: TextInput;
  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionDetailPersonaliseButton.element), this.transactionDetailPersonaliseButton.getTimeOut());
  }
  public async loadConditionOnEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.transactionDetailPersonaliseButton.element), this.transactionDetailPersonaliseButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionDetailTitle.element), this.transactionDetailTitle.getTimeOut())
  }

  public async loadConditionOnReportPage(time: any = this.viewButton.getTimeOut()) {
    await browser.sleep(5000); //wait for loading Report Page
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(ExpectedConditions.stalenessOf(this.viewButton.element), this.viewButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionDetailFromAccountValue.element), time)
  }
}
