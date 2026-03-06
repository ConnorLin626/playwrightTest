/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading, HtmlSelect, waitForUXLoading } from '../../../lib';

@log export class BillPaymentPage extends Page {

  //Create Page
  @component('//*[@id="boAutoArrayList_0__bo_organization"]') public BillOrganisation: HtmlSelect;
  @component('//*[@id="boAutoArrayList_0__bo_debitAccount"]') public debitAccount: HtmlSelect;
  @component('//*[@id="boAutoArrayList_0__bo_billaccountnumber"]') public billReference: TextInput;
  @component('//*[@id="boAutoArrayList_0__bo_amount"]') public amount: TextInput;
  @component('//*[@id="approvalChoice_B"]') public approveNoWCheckBox: TextInput;
  @component('//*[@id="previewButton_Link"]') public previewButton: Button;
  @component('//div[@id="singleTransfer_form1ContentForm"]/div[1]/ul[2]/li/a/span[@id="textbox"]/span[@id="text"]') public sendChallenge: Button;
  @component('//*[@id="signature"]') public response: TextInput;
  @component('//a[@id="approveButton_Link"]') public approveButton: Button;
  @component('//a[@id="submitButton_Link"]') public submitButton: Button;
  @component('//*[@id="deleteButtonpending_Link"]') public delete: Button;

  // view page
  @component('//div[@id="tiContentContainer"]//span[@id="fromParty"]') public viewDebitAccount: TextInput;
  @component('//span[@id="amount"]') public viewAmount: TextInput;
  @component('//span[@id="cutofftime"]') public cutOffTimeValue: TextInput;
  @component('//span[@id="status"]') public transactionStatus: TextInput;
  @component('//span[@id="customerReference"]') public customerReferenceValue: TextInput;

  // old bill payment link in the new ui page
  @component('//top-link/div/div/ul/li/span/label[2]') public oldBillPaymentLink: Button;

  // View Page for New UI
  @component('//span[@id="act-view-accountNum"]') public debitAccountValue: TextInput;


  constructor() {
    super();
  }

  public async loadConditionForNewUI() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.presenceOf(this.oldBillPaymentLink.element), this.oldBillPaymentLink.getTimeOut());
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.presenceOf(this.debitAccount.element), this.debitAccount.getTimeOut());
  }

  public async loadConditionForPreviewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewButton.element), this.previewButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForApprovalNowPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewButton.element), this.previewButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.response.element), this.response.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
  }

  public async loadConditionForApprovaPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.approveButton.element), this.approveButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.response.element), this.response.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForOLDTransferCenterPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.submitButton.element), this.submitButton.getTimeOut());
    await waitForI3Loading();
  }

  public async loadConditionOnView() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.visibilityOf(this.viewDebitAccount.element), this.viewDebitAccount.getTimeOut());
  }

  public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
  }

  public async loadConditionOnViewNewUI() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.debitAccountValue.element), this.debitAccountValue.getTimeOut());
  }

}