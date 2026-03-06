import { browser, ExpectedConditions } from "protractor";
import { Button, component, log, OptionSelect, Page, TextInput, waitForUXLoading } from "../../../lib";
import * as utils from "../../../lib/utils";

@log export class VNTaxPaymentPage extends Page {
  //create page
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="taxCode"]') public taxCode: OptionSelect;
  @component("//datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[6]/div/button") public addBtn1: Button;
  @component("//datatable-row-wrapper[2]/datatable-body-row/div[2]/datatable-body-cell[6]/div/button") public addBtn2: Button;
  @component('//input[contains(@id,"fx-contract-0")]') public existingContractBtn: Button;
  @component("//button[@name='next']") public nextButton: Button;
  @component("//button[@name='submit']") public submitButton: Button;
  @component('//button[@name="finish"]') public finishedButton: Button;

  //view page
  @component('//span[@id="statusDesc"]') public statusValue: TextInput;
  @component("//*[@id='tax-view-accountNum']") public fromAccountValue: TextInput;
  @component("//*[@id='viewReference']") public refValue: TextInput;
  @component("//*[@id='fxDolViewSection']") public fxViewSection: TextInput;
  @component('//button[@name="reject"]') public rejectButton: Button;
  @component('//button[@name="delete"]') public deleteButton: Button;

  //reject
  @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
  @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;

  //delete
  @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;

  //approve
  @component("//button[@name='approve']") public approveButton: Button;
  @component('//div[@class="push-option"]') public pushOption: Button;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;
  @component("//input[@name='approveNow']") public approveNowCheckBox: Button;
  @component('//p[@id="labelNoInformationDisplay"]') public transactionResult: TextInput;

  //View fild page
  @component("//*[@class='icon-refresh-active']") public refreshBtn: Button;
  @component("//*[@id='detail-transaction-reference-0']") public refLink: Button;

  constructor() {
    super();
  }

  public async loadCondition() {
    await utils.waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.fromAccount.element),
      this.fromAccount.getTimeOut()
    );
  }
  public async loadConditionForPrevewPage() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.stalenessOf(this.nextButton.element),
      this.nextButton.getTimeOut()
    );
    await browser.wait(
      ExpectedConditions.visibilityOf(this.submitButton.element),
      this.submitButton.getTimeOut()
    );
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.submitButton.element),
      this.submitButton.getTimeOut()
    );
  }

  public async loadConditionForSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.stalenessOf(this.submitButton.element),
      this.submitButton.getTimeOut()
    );
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.finishedButton.element),
      this.finishedButton.getTimeOut()
    );
  }
  public async loadConditionForViewTaxPaymentPage() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.visibilityOf(this.statusValue.element),
      this.statusValue.getTimeOut()
    );
  }
}
