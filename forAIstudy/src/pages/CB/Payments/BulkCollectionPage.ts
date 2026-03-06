/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, ensure } from '../../../lib';

@log export class BulkCollectionPage extends Page {
  //Create page
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//li[@id="labelNewPayer_1"]') public newPayerTab: Button;
  @component('//input[@name="new-payee-payeeName"]') public newPayeeName: TextInput;
  @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
  @component('//div[@id="swift-selector-element"]') public payerBankID: OptionSelect;
  @component('//input[@name="new-payee-accountNumber"]') public newPayerAccountNum: TextInput;
  @component('//input[@name="new-payee-dda"]') public DDARef: TextInput;
  @component('//button[@name="add-payee"]') public addPayer: Button;
  @component('//input[@name="payeeAmount"]') public amount: TextInput;
  @component('//div[@id="temp-bulk-create-optDetail_0"]') public showOptionDetailPayee1: Button;
  @component('//textarea[@name="payeeDetails"]') public collectionDetails: TextInput;
  @component('//*[@name="payeeRef"]') public payeeRef: TextInput;
  @component('//input[@name="isBeneAdvising0"]') public msgToPayer: Button;
  @component('//*[@id="ux-tab-fax"]') public faxTab: Button;
  @component('//auto-complete[@formcontrolname="ctryCode"]') public faxCtryCode0: OptionSelect;
  @component("//input[@name='fax-0']") public faxAreaCode0: TextInput;
  @component('//input[@name="faxNo-0"]') public faxNo0: TextInput;
  @component('//textarea[@name="adviceContent"]') public msg: TextInput;
  @component("//input[@name='email-0']") public emailIdO: TextInput;
  @component("//input[@name='email-1']") public emailId1: TextInput;
  @component("//input[@name='email-2']") public emailId2: TextInput;
  @component("//input[@name='email-3']") public emailId3: TextInput;
  @component("//input[@name='email-4']") public emailId4: TextInput;
  @component("//*[@name='add']") public addButton: Button;
  @component('//input[@name="payee-selector"]') public filterExistingPayee: TextInput;
  @component("//button[@name='next']") public nextButton: Button;
  @component("//button[@name='submit']") public submitButton: Button;
  @component("//button[@name='finish']") public finishButton: Button;
  @component("//button[@name='approve']") public approveButton: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;
  @component("//*[@name='approveNow']") public approveNowCheckBox: Button;
  @component("//*[@name='get-challenge']") public getChallengeButton: Button;
  @component('//*[@name="batch-id"]') public batchID: TextInput;
  @component("//*[@name='saveAsTemplate']") public saveAsTemplate: Button;
  @component('//*[@name="templateName"]') public templateName: TextInput;
  @component('//*[@name="save-as-draft"]') public saveAsDraft: Button;
  @component('//bp-payee-amount//span[starts-with(@class, "error tooltip")]') public amountErrorTip: TextInput;
  @component("//*[@id='labelExistingPayee_0']") public existingPayerTab: Button;

  //Delete Bulk Collection
  @component('//button[@name="delete"]') public deleteButton: Button;
  @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;

  //Copy Bulk Collection
  @component("//*[@name='copy']") public copyButton: Button;

  //Edit Bulk Collection
  @component('//div[@id="bulk-view-edit"]') public editButton: Button;

  //Reject Bulk Collection
  @component("//button[@name='reject']") public rejectButton: Button;
  @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
  @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;

  //View Bulk Collection
  @component('//span[@id="bulk-view-accountNum"]') public fromAccountView: TextInput;
  @component('//strong[@id="bulk-view-amount_0"]') public amountValue: TextInput;
  @component('//strong[@id="bulk-view-acctNum_0"]') public accountNumberValue: TextInput;
  @component('//*[@id="bulk-view-name_0"]') public payeeNameValue: TextInput;
  @component('//div[@id="bulk-view-status_0"]') public transactionStatusValue: TextInput;
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

  //View Bulk Collection Template
  @component('//span[@id="bulk-viewTemp-name"]') public viewTemplateName: TextInput;
  @component('//span[@id="bulk-viewTemp-accountNum"]') public viewTemplateFromAccount: TextInput;
  @component('//strong[@id="bulk-view-amount_0"]') public viewTemplateAmount: TextInput;

  //Create TW ACH Bulk Collection from template
  @component('//input[@name="payeeNationalID"]') public TWACHPayerID: TextInput;

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
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
  }

  public async loadConditionForViewBulkCollectionPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountView.element), this.fromAccountView.getTimeOut());
  }
  public async loadConditionForViewTemplatePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTemplateName.element), this.viewTemplateName.getTimeOut());
  }

  public async loadConditionForCreateFromTempaltePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.amount.element), this.amount.getTimeOut());
  }

  public async loadConditionForCreateFromTWACHTempaltePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.TWACHPayerID.element), this.TWACHPayerID.getTimeOut());
  }

  public async loadConditionForViewPagination() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.showOptionalButton.element), this.showOptionalButton.getTimeOut());
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
      await this.viewPreHundredButton.clickIfExist()
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
        // await this.viewPreTenButton.ElementExist() === false,
        await this.viewPreHundredButton.ElementExist() === false,
        // await this.viewPaginationButton.ElementExist() === false,
      ]);
    }
  }
}