/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, HtmlSelect, waitForI3Loading, FileSelect, pageSwitchWindow ,waitForUXLoading} from '../../../lib';
import { ImportLCIssuancePage } from './ImportLCIssuancePage'
import { FilesPages } from '../../../pages/CB';
@log export class BankerGuaranteeAmendmentPage extends ImportLCIssuancePage {

  @component('//input[@id="isAmendment" and @type="checkbox"]') public createAmendmentCheckBox: Button;
  @component('//input[@id="balanceCustRef"]') public balanceCustomerRef: TextInput;
  //input data
  @component('//select[@name="entryOrAmendObject.sendViaCd"]') public sendVia: HtmlSelect;
  @component('//select[@name="transactionValue.trnIncreaseDecreaseCd"]') public amountSelect: HtmlSelect;
  @component('//select[@id="entryOrAmendObject.amendmentCharges"]') public amendmentCharges: HtmlSelect;
  @component('//select[@name="entryOrAmendObject.debitChargesFrom"]') public debitAccNo: HtmlSelect;
  @component('//input[@name="entryOrAmendObject.contactPerson"]') public cntPerson: TextInput;
  @component('//select[@id="telNumber1"]') public telephoneNumber: HtmlSelect;
  @component('//input[@id="entryOrAmendObject.telNumber2"]') public areaCode: TextInput;
  @component('//input[@id="entryOrAmendObject.telNumber3"]') public number: TextInput;
  // Transaction Review page
  @component('//select[@id="product"]') public selectProductType: HtmlSelect;
  @component('//*[@name="statusCd"]') public selectStatus: HtmlSelect;
  @component('//input[@id="manageDocs"]') public manageDoc: Button;
  @component('//input[@id="text1"]') public description1: TextInput;
  @component('//input[@id="file1"]') public file1Name: FileSelect;
  @component('//input[@id="submitUploadAttachments"]') public uploadButton: Button;
  @component('//*[@id="divAttachAdd"]/table/tbody/tr/td[2]') public successfulMessageText: TextInput;
  @component('//*[@id="table-start-lu"]/tbody/tr/td/table[1]/tbody/tr[2]/td/div[4]/div[2]/div[2]') public errorMessageText: TextInput;

  @component('//*[@id="tableAttachList"]') public tableList: TextInput;

  //New Trade
  @component('//*[@href="#/approvals/trade-list"]') public TradeFinanceTab: Button;
  @component('//*[@id="transactionDetail-custRef-0"]/div[1]') public custRefLink: Button;
  @component('//*[@id="trade-checkbox-0"]') public custRefCheckBox: Button;
  @component('//*[@id="transactionDetail-docs-0"]') public docIcon: Button;
  @component('//*[@class="download-title"]') public downloadAll: Button;
  @component('//*[@id="transactionApprove"]') public transactionApprove: Button;
  @component('//*[@name="approve"]') public reviewApprove: Button;
  @component('//*[@name="reject"]') public confirmBtn: Button;
  @component('//*[@name="responseCode"]') public responseCode: TextInput;
  @component('//*[@class="btn btn__primary"]') public approveBtn: Button;
  @component('//*[@name="finish"]') public doneBtn: Button;
  @component('//*[@name="sampling-filter"]') public search: TextInput;
  @component('//dbs-trade-list/dbs-empty-page/div/div/div/p[1]') public searchResult: TextInput;
  @component('//div[starts-with(@class, "successful-approve-message")]') public successMsg: Button;
  @component('//*[@id="tradeReference"]') public tradeRef: TextInput;
  @component('//*[@name="transactionReject"]') public rejectBtn: Button;
  @component('//*[@name="reasonForRejection"]') public rejectReason: TextInput;
  @component('//*[@name="dismiss"]') public dismissBtn: Button;
  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }

  public async loadConditionForImportLCEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
  }
  public async loadConditionForUpload() {
    await pageSwitchWindow("//div[@id='mainContent']");
  }
  public async loadConditionForImportLCViewPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
  }
 public async loadConditionForMyApproveTradeList() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.custRefLink.element), this.custRefLink.getTimeOut());
  }
  public async loadConditionForReviewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.reviewApprove.element), this.reviewApprove.getTimeOut());
  }
  public async loadConditionForApproveSuccessPage() {
    await waitForUXLoading();
    //await browser.wait(ExpectedConditions.elementToBeClickable(this.successMsg.element), this.successMsg.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.doneBtn.element), this.doneBtn.getTimeOut());
  }

  public async loadConditionForViewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.reviewApprove.element), this.reviewApprove.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.tradeRef.element), this.tradeRef.getTimeOut());
  }

}
