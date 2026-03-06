/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, HtmlSelect, FileSelect, waitForI3Loading } from '../../../lib';

@log export class UploadProfilePage extends Page {
  constructor() {
    super();
  }

  @component('//*[@id="text"]') public createNewButton: Button;
  @component('//*[@id="actionArr[0]"]') public action: HtmlSelect;
  @component('//input[@id="theFile"]') public fileName: FileSelect;
  @component('//input[@name="paymentDate"]') public paymentDate: TextInput;
  @component('//*[@id="normalAnchorBtn"]') public uploadFileButton: Button;
  @component('//table[@id="importProfileListTable"]/tbody/tr[2]/td[2]') public sourceFileName: Button;

  // View Bulk Payment page
  @component('//span[@id="bulk-view-accountNum"]') public bpyFromAccountValue: TextInput;
  @component('//strong[@id="bulk-view-amount_0"]') public bpyAmountValue: TextInput;
  @component("//button[@name='approve']") public approvalButton: Button;
  @component("//button[@name='get-challenge']") public getChallengeSMS: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;
  @component('//button[@name="dismiss"]') public dismissButton: Button;
  @component('//div[@id="bulk-view-status_0"]') public transactionStatusValue: TextInput;

  //View ICT Payment page
  @component('//div[@id="ict-view-status"]') public transactionStatusValueICT: TextInput;
  public async loadCondition() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewButton.element), this.createNewButton.getTimeOut());
  }

  public async loadConditionforUploadListPage() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.sourceFileName.element), this.sourceFileName.getTimeOut());
  }

  public async loadConditionforViewPaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
  }

  public async loadConditionforViewICTPaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValueICT.element), this.transactionStatusValueICT.getTimeOut());
  }
}
