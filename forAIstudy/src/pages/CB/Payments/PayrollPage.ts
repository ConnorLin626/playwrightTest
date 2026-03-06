/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Menu } from "../../../config/menu";
import { Page, component, log, Button, ensure, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';
import { PaymentsPages } from "./index";

@log export class PayrollPage extends Page {
  // Create Page
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//input[@name="payeeAmount"]') public amount: TextInput;
  @component('//input[@name="payeeRef"]') public payeeRef: TextInput;
  @component('//div[@class="hide-option padding-top-0 hide-when-mobile"]') public showoptionaldetails: Button;
  @component('//textarea[@name="payeeDetails"]') public paymentDetails: TextInput;
  @component('//input[@name="isBeneAdvising0"]') public isBeneAdvising: Button;
  @component("//input[@name='email-0']") public emailIdO: TextInput;
  @component("//input[@name='email-1']") public emailId1: TextInput;
  @component("//input[@name='email-2']") public emailId2: TextInput;
  @component("//input[@name='email-3']") public emailId3: TextInput;
  @component("//input[@name='email-4']") public emailId4: TextInput;
  @component('//div[@id="temp-bulk-create-optDetail_0"]') public showoptionaldetailsPayee1: Button;
  @component("//*[@name='adviceContent']") public message: TextInput;
  @component("//button[@name='next']") public nextButton: Button;
  @component("//button[@name='submit']") public submitButton: Button;
  @component("//button[@name='approve']") public approveButton: Button;
  @component('//button[@name="finish"]') public finishedButton: Button;
  @component('//button[@name="copy"]') public copyButton: Button;
  @component("//*[@id='approveNow']") public approveNowCheckBox: Button;
  @component('//div[@class="push-option"]') public pushOption: Button;
  @component('//button[@name="get-challenge"]') public mchallengeText: TextInput;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;
  @component("//input[@name='saveAsTemplate']") public saveAsTemplateCheckbox: Button;
  @component("//*[@name='templateName']") public templateName: TextInput;
  @component('//button[@name="save-as-draft"]') public saveAsDraft: Button;
  @component('//bp-payee-amount//span[starts-with(@class, "error tooltip")]') public amountErrorTip: TextInput;
  @component('//div[@id="delete_"]') public deletePayee: Button;

  // New Payee
  @component('//*[@id="labelNewPayee_2"]') public newPayee: Button;
  @component('//*[@id="labelNewPayee_1"]') public newPayeeWitoutPaynow: Button;
  @component('//*[@name="new-payee-payeeName"]') public newPayeeName: TextInput;
  @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
  @component('//*[@name="new-payee-accountNumber"]') public newPayeeAcctNo: TextInput;
  @component('//*[@name="add-payee"]') public newPayeeButton: Button;
  @component('//div[@id="swift-selector-element"]') public payeeBankID: OptionSelect;
  @component('//div[starts-with(@class, "manual clearfix")]') public enterDetailButton: Button;
  @component('//input[@name="bp-swift-select-bsbCode"]') public bsbCodeText: TextInput;

  //ExiSting payee
  @component('//*[@id="labelExistingPayee_0"]') public existingPayeeTab: Button;
  @component('//input[@id="payee-selector"]') public filterExistingPayee: TextInput;
  @component('//button[@name="add"]') public addpayee: Button;

  // Reject Page
  @component("//button[@name='reject']") public rejectButton: Button;
  @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
  @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;
  @component("//strong[@id='bulk-view-rejectStatus_0']") public rejectStatus: TextInput;

  // Edit Page
  @component('//*[@id="bulk-view-edit"]') public editButton: Button;
  @component("//input[@name='batch-id']") public batchId: TextInput;

  // Delete Page
  @component('//button[@name="delete"]') public deleteButton: Button;
  @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;

  // View payroll Template Page
  @component('//*[@id="bulk-viewTemp-name"]') public viewTemplateName: TextInput;
  @component('//*[@id="bulk-viewTemp-status"]') public viewTemplateStatus: TextInput;
  @component('//*[@id="bulk-viewTemp-accountNum"]') public viewTemplateFromAccount: TextInput;
  @component('//*[@id="bulk-view-amount_0"]') public viewTemplateAmount: TextInput;
  @component('//*[@id="bulk-view-name_0"]') public viewTemplatePayeeNameValue: TextInput;

  // View payroll Payment Page
  @component('//*[@id="bulk-view-accountNum"]') public fromAccountView: TextInput;
  @component('//*[@id="bulk-view-paymentAmount"]') public amountView: TextInput;
  @component('//*[@id="bulk-view-pendingStatus_0"]') public transactionStatusValue: TextInput;
  @component('//*[@id="bulk-view-rejectStatus_0"]') public transactionRejectStatus: TextInput;
  @component('//*[@id="bulk-view-name_0"]') public payeeNameValue: TextInput;
  @component('//*[@id="bulk-view-acctNum_0"]') public accountNumberValue: TextInput;
  @component('//*[@id="bulk-view-filter"]') public viewPayrollFilter: TextInput;
  @component('//*[@id="bulk-view-amount_0"]') public amountFirst: TextInput;
  @component('//button[@name="view-verify-release"]') public viewVerifyReleaseBtn: Button;
  @component('//button[@name="verify-release"]') public verifyReleaseConfirmButton: Button;
  @component('//span[@id="bulk-view-name_0"]') public toNewPayeeValue: TextInput;
  @component('//view-transfer-list/div/div/div[1]/div[2]/div[2]/strong') public bankNameValue: TextInput;
  @component('//view-transfer-list/div/div/div[1]/div[2]/div[3]') public bankSwiftBicValue: TextInput;

  //old payment date component common by Ethan
  //@component('//ng-component/div/div/bulk-view-section/div/bp-view-summary-section/div[7]/span[2]') public paymentDate: TextInput;
  //new payment date component add by Ethan
  @component('//ng-component/div/div/bulk-view-section/div/bp-view-summary-section/div[8]/span[2]') public paymentDate: TextInput;

  // create from template
  @component('//multi-level-dropdown[@formcontrolname="payeePurposeCode"]') public TemplatePurposeCodeValue: TextInput;

  // view page for 4333 issue
  //tab
  @component('//a[@id="ux-tab-1"]') public viewShowAllTab: Button;
  @component('//a[@id="ux-tab-2"]') public viewPendingTab: Button;
  @component('//a[@id="ux-tab-3"]') public viewRejectedTab: Button;
  @component('//a[@id="ux-tab-4"]') public viewCompletedTab: Button;

  @component('//label[@id="view-bulk-loaded"]') public viewLoadedLabel: TextInput;
  @component('//label[@id="bulk-loaded-more"]') public viewLoadMoreButton: Button;
  @component('//button[@name="view-up-to-0"] ') public viewPreTenButton: Button;
  @component('//button[@name="view-up-to-1"] ') public viewPreHundredButton: Button;
  @component('//*[@id="pagination-1"]') public viewPaginationButton: Button;
  @component('//span[@id="radio-label-0"]') public viewRejectedTabRadio: TextInput;
  @component('//span[@id="view-bulk-totalItem"]') public viewBulkTotalItem: TextInput;
  @component('//span[@id="show-optional-details-0"]') public showOptionalButton: Button;

  // SAM>RTGS schedule cut off time link
  @component('//a[contains(@href,"/csr/common/schedule/bom") and text()="Indonesia Payroll"]') public IDPayrollScheduleLink: Button;
  // @component('//datatable-scroller/datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/label') public checkBox: Button;
  // @component('//md-dialog-container/cdk-focus-trap/div[2]/confirm-dialog/div/top-panel/div/div[2]/ul/li/span') public paymentDateMsg: TextInput;
  @component('//*[@name="search"]') public serachButton: Button;
  // @component('//datatable-row-wrapper/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/p[1]') public paymentDateAdjust: TextInput;
  constructor() {
    super();
  }
  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
  }
  public async loadConditionForPayee() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.addpayee.element), this.addpayee.getTimeOut());
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

  public async loadConditionForViewTemplatePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTemplateStatus.element), this.viewTemplateStatus.getTimeOut());
  }

  public async loadConditionForApprovePaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
  }
  public async loadConditionForDismissDialog() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
  }

  public async loadConditionCreatePaymentTemplate() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.TemplatePurposeCodeValue.element), this.TemplatePurposeCodeValue.getTimeOut());
    await waitForUXLoading();
  }

  public async addExistingPayee(testDate: string): Promise<void> {
    await this.loadConditionForPayee();
    await this.filterExistingPayee.input(testDate);
    await this.addpayee.jsClick();
  }

  public async loadConditionForViewPagination() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.showOptionalButton.element), this.showOptionalButton.getTimeOut());
  }
  public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
  }

  public async switchBulkViewTab(_element: Button, text: string) {
    await this.loadConditionForViewPagination();
    await _element.clickIfExist();
    await Promise.all([
      await ensure(this.viewLoadedLabel).isVisible(),
      await ensure(this.viewLoadedLabel).textContains(text),
      await ensure(this.viewLoadMoreButton).isVisible(),
    ]);
  }
  public async checkPaginationForShowAllTab() {
    await this.viewShowAllTab.clickIfExist();
    await Promise.all([
      await this.viewLoadedLabel.ElementExist() === false,
      await ensure(this.viewPreTenButton).isVisible(),
      await ensure(this.viewPreHundredButton).isVisible(),
      await ensure(this.viewPaginationButton).isVisible(),
      await this.viewPaginationButton.clickIfExist(),
      await this.viewPreHundredButton.clickIfExist(),
    ]);
  }
  public async checkPaginationForRejectTab() {
    await this.viewRejectedTab.clickIfExist();
    let num = 0;
    await this.viewRejectedTabRadio.getText().then(text => {
      num = parseInt(text.replace(/[^0-9]/ig, ""));
    });
    if (num > 10) {
      await Promise.all([
        await ensure(this.viewPreTenButton).isVisible(),
        await ensure(this.viewPreHundredButton).isVisible(),
        await ensure(this.viewPaginationButton).isVisible(),
      ]);
    } else {
      await Promise.all([
        await this.viewPreTenButton.ElementExist() === false,
        // await this.viewPreHundredButton.ElementExist() === false,
        // await this.viewPaginationButton.ElementExist() === false,
      ]);
    }
  }
}
