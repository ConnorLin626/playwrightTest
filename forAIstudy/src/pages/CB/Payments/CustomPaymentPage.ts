/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Menu } from "../../../config/menu";
import { Page, component, log, Button, ensure, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';
import { PaymentsPages } from "./index";

@log export class CustomPaymentPage extends Page {
  // Create Page
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="taxCode"]') public taxCode: OptionSelect;
  @component('//datatable-row-wrapper[2]/datatable-body-row/div[2]/datatable-body-cell[7]/div/div/button') public AddCustomTax1: Button;
  @component('//datatable-row-wrapper[3]/datatable-body-row/div[2]/datatable-body-cell[7]/div/div/button') public AddCustomTax2: Button;
  @component('//input[contains(@id,"fx-contract-0")]') public ContractBtn: Button;
  @component('//*[@id="ux-input-1"]') public EnterID: TextInput;
  @component('//*[@id="enterTaxBtn"]') public AddNewTaxButn: Button;
  @component("//button[@name='next']") public nextButton: Button;
  @component("//button[@name='submit']") public submitButton: Button;
  @component('//button[@name="finish"]') public finishedButton: Button;

  // Approve Customs Payments Page
  @component("//*[@id='approveNow']") public approveNowCheckBox: Button;
  @component('//div[@class="push-option"]') public pushOption: Button;
  @component("//button[@name='approve']") public approveButton: Button;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component('//button[@name="get-challenge"]') public mchallengeText: TextInput;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;

  // View Customs Payments Page
  @component('//*[@id="tax-view-accountNum"]') public fromAccountView: TextInput;
  @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[1]') public ContractRef: TextInput;
  @component('//*[@id="my-app"]/ng-component/div/ng-component/div/div/tax-view-section/div/tax-view-summary/div/div[2]/span[2]') public ViewStatus: TextInput;
  @component('//button[@name="dismiss"]') public dismissButton: Button;
  @component('//*[@name="search"]') public serachButton: Button;

  // Reject Page
  @component("//button[@name='reject']") public rejectButton: Button;
  @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
  @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;
  @component("//strong[@id='bulk-view-rejectStatus_0']") public rejectStatus: TextInput;

  // Delete Page
  @component('//button[@name="delete"]') public deleteButton: Button;
  @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;

  // File
  @component('//div[@id="txnFromAccount-0"]') public FromAccount: TextInput;
  @component('//*[@id="fileStatusButton-0"]') public FileViewStatus: TextInput;




  constructor() {
    super();
  }
  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
  }

  public async loadConditionForPreviewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
  }

  public async loadConditionForViewPaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountView.element), this.fromAccountView.getTimeOut());
  }

  public async loadConditionForApprovePaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
  }
  public async loadConditionForDismissDialog() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
  }

  public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
  }

}
