/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, OptionSelect, FileSelect } from "../../../lib";
import * as utils from '../../../lib/utils';
import { BulkPaymentpage } from './BulkPaymentpage';
import { Menu } from '../../../config/menu';
import { PaymentsPages, FilesPages, ApprovalsPages } from '../../../pages/CB';
import * as constVal from '../../../pages/CB/Payments/constantValue';

@log export class CrossBoarderACHPage extends BulkPaymentpage {

  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="countrySelected"]') public paymentCountry: OptionSelect;
  @component('//auto-complete[@formcontrolname="debitTypeObjectSelected"]') public debitType: OptionSelect;
  @component('//input[@name="payeeAmount"]') payeeAmount: TextInput; //amount for first payee
  @component('//input[@name="crsbrdint1-bp-payee-payeePurpose1"]') purposePaymentLine: TextInput; //purpose payment line1 for first INTL payee
  @component('//input[@name="crsbrdint1-bp-payee-payeeAdditional1"]') additionalInfoLine: TextInput; //additional info line1 for first INTL payee
  @component('//div[@id="temp-bulk-create-optDetail_0"]') showHideDetail: Button; //show hide button for first INTL payee
  @component('//input[@name="crsbrdint1-bp-payee-payeeDetail1"]') paymentDetailLine: TextInput;  //payment Detail Line1 for first INTL payee
  @component('//input[@name="new-payee-add1"]') newpayeeadd1: TextInput;

  @component('//div[@id="crsbrd-view-edit"]') public editButton: Button;
  @component('//button[@name="addPayee"]') public addPayeeBtn: Button;
  @component('//button[@name="next"]') public nextButton: Button;
  @component('//button[@name="submit"]') public submitButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;
  @component('//span[@id="crsbrd-view-fromAccount"]') public fromAccountPreview: TextInput;
  @component('//span[@id="crsbrd-view-fromAccount"]') public fromAccountView: TextInput;
  @component('//span[@id="crsbrd-view-payAmt"]') public amountView: TextInput;
  @component('//span[@id="crsbrd-view-paymentDate"]') public paymentDateView: TextInput;
  @component('//strong[@id="crsbrd-view-name_0"]') public ExistingPayee: TextInput;
  @component('//strong[@id="crsbrd-view-name_1"]') public ExistingPayee2: TextInput;
  @component('//strong[@id="crsbrd-view-pendingStatus_0"]') public crsBrdTransactionStatusValue: TextInput;
  @component('//strong[@id="crsbrd-view-rejectedStatus_0"]') public transactionStatusReject: TextInput;

  @component('//a[@id="filter"]') public filterButton: Button;
  @component('//input[@name="batchName"]') public fileNameFilterValue: TextInput;
  @component('//a[@id="goFilter"]') public goFilterBtn: Button;
  //"file name link" at View File JSP Screen via Manage Files
  @component('//td[@id="fileName-0"]/a[@id="uploadBatchView-0"]') public uploadFileNameLink: Button;
  //"file name link" at View Payment JSP Screen via Manage Files
  @component('//td[@id="refNum-0"]/a[@id="uploadPaymentView-0"]') public uploadPaymentLink: Button;
  @component('//div[starts-with(@class, "manual clearfix")]') public enterDetail: Button

  @component('//button[@name="approve"]')
  public approveButton: Button;

  @component('//div[@class="push-option"]')
  public pushOption: Button;

  @component('//input[@name="new-payee-routing-code"]')
  public newPayeeRoutingCode: TextInput;

  @component('//input[@name="crsbrdint1-bp-payee-payeePurpose1"]')
  public payeePurpose1: TextInput;

  @component('//input[@name="crsbrdint1-bp-payee-payeeDetail1"]')
  public payeeDetail1: TextInput;

  @component('//li[@id="labelNewPayee_1"]/span')
  public newPayeeTab: Button;

  @component('//div[@id="swift-selector-element"]')
  public swiftBICSelect: OptionSelect;

  @component('//input[@name="new-payee-acct-number"]')
  public newPayeeAcctNo: TextInput;

  @component('//div[@id="temp-bulk-create-optDetail_0"]')
  public hideOptDetail: Button;

  //"status" at Approval Confirmation Screen via My Approve
  @component('//p[@id="complete-transaction-labelStatus-0"]')
  public myApproveFileStatus: TextInput;

  // CN - Cross Border ACH
  // Create/Edit Regulatory Reporting
  @component('//auto-complete[@formcontrolname="counterptycntryCode"]') public counterPartyCode: OptionSelect;
  @component('//auto-complete[@formcontrolname="specPmtPurpose"]') public specPmtPurpose: OptionSelect;
  @component('//auto-complete[@formcontrolname="pmtCategory1"]') public pmtCategory1: OptionSelect;
  @component('//auto-complete[@formcontrolname="seriesCode1"]') public seriesCode1: OptionSelect;
  @component('//input[@name="cnttTransRemark1"]') public cnttTransRemark1: TextInput;
  @component('//input[@id="digiDocFileUpload"]') public digiDocFileUploadButton: FileSelect;
  @component('//div[@class="utilizedAmount"]/dbs-input/span/div/input') public utilizedAmount: TextInput;
  // View
  @component('//li[@class="digidoc-uploaded"]') public digiDocUploaded: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
  }

  public async loadCondition4Preview() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountPreview.element), this.fromAccountPreview.getTimeOut());
  }

  public async wait4ViewCrsBrdUXScreenReady() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.crsBrdTransactionStatusValue.element), this.crsBrdTransactionStatusValue.getTimeOut());
  }

  public async loadCondition4MngFile() {
    await this.pageSwitchToI3();
    await utils.waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.filterButton.element), this.filterButton.getTimeOut());
  }

  public async loadCondition4ViewFile() {
    await utils.waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.uploadPaymentLink.element), this.uploadPaymentLink.getTimeOut());
  }

  public async loadCondition4ViewPayment() {
    await this.pageSwitchToUX();
    await utils.waitForUXLoading();
    await browser.sleep(2000);//use this can be use for all cases
  }

  public async loadCondition4ViewPaymentOldUI() {
    await utils.waitForI3Loading();
    await browser.sleep(2000);//use this can be use for all cases
  }

  public async loadCondition4MyApprovalCompleted() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.myApproveFileStatus.element), this.myApproveFileStatus.getTimeOut());
  }

  public async addINTLNewPayee(payeeName: string, payeeBankID: string, accountNumber: string): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    await this.newPayeeTab.click();
    await this.newPayeeName.input(payeeName);
    await this.newpayeeadd1.input('newpayeeadd');
    await this.swiftBICSelect.select(payeeBankID);
    await this.newPayeeAcctNo.input(accountNumber);
    await _PaymentsPages.PartnerBankPayment.addPayeeBtn.click();
  }

  public async uploadFileByTXN(fileType: string, fileFormat: string, uploadFileName: string): Promise<string> {
    let _FilesPages = new FilesPages();
    let fileName: string = null;
    await this.uploadFileCommon(_FilesPages, fileType, fileFormat, uploadFileName, constVal.approvalOptionLableMap.byTXN).then(
      (data) => {
        fileName = data;
      }
    );
    await this.uploadFileCommon2(_FilesPages);
    return await fileName;
  }

  public async uploadFileByFile(fileType: string, fileFormat: string, uploadFileName: string, approvalCurrency: string): Promise<string> {
    let _FilesPages = new FilesPages();
    let fileName: string = null;
    await this.uploadFileCommon(_FilesPages, fileType, fileFormat, uploadFileName, constVal.approvalOptionLableMap.byFile).then(
      (data) => {
        fileName = data;
      }
    );
    await _FilesPages.uploadFilePage.approvalCurrency.select(approvalCurrency);
    await this.uploadFileCommon2(_FilesPages);
    return await fileName;
  }

  //Manage Files -> filter by Name -> click file name -> enter View File -> Click File Name -> enter View Payment(UX Screen)
  public async goToViewUploadPayment(fileName: string): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    await this.goToViewUploadPaymentCommon(fileName);
    await _PaymentsPages.crossBoarderACHPage.loadCondition4ViewPayment();
  }

  //Manage Files -> filter by Name -> click file name -> enter View File -> Click File Name -> enter View Payment(OLD UI)
  public async goToViewUploadPaymentOldUI(fileName: string): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    await this.goToViewUploadPaymentCommon(fileName);
    await _PaymentsPages.crossBoarderACHPage.loadCondition4ViewPaymentOldUI();
  }

  //My Approve -> By File -> Filter by Name -> click File Name -> enter View Screen
  public async goToMyApprovalByFileViewFile(fileNameByFile: string): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    let _ApprovalsPages = new ApprovalsPages();
    await _PaymentsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileNameByFile);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byFileFileNameRef.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForViewFile();
  }

  private async uploadFileCommon(_FilesPages: FilesPages, fileType: string, fileFormat: string, uploadFileName: string, approvalOption: string): Promise<string> {

    let filePath: string = null;
    let fileName: string = null;
    await _FilesPages.openMenu(Menu.Files.UploadFile);
    await _FilesPages.uploadFilePage.loadCondition();
    await _FilesPages.uploadFilePage.fileType.select(fileType);
    await _FilesPages.uploadFilePage.fileFormat.select(fileFormat);
    await _FilesPages.uploadFilePage.fileName.select(uploadFileName).then(
      (data) => {
        filePath = data;
        console.log(filePath);
        let pos: number = filePath.lastIndexOf('/');
        fileName = filePath.substr(pos + 1);
        console.log(fileName);
      });
    await _FilesPages.uploadFilePage.amendPaymentDate.input(utils.formatDate2String(new Date(), 'DD-MMM-YYYY'));
    await _FilesPages.uploadFilePage.approvalOption.select(approvalOption);
    return await fileName;
  }

  private async uploadFileCommon2(_FilesPages: FilesPages): Promise<void> {
    await _FilesPages.uploadFilePage.uploadFileButton.click();
    await browser.sleep(5000);//wait for MQ procssing
  }

  private async goToViewUploadPaymentCommon(fileName: string): Promise<void> {
    let _FilesPages = new FilesPages();
    let _PaymentsPages = new PaymentsPages();
    await _FilesPages.openMenu(Menu.Files.ManageFiles);
    await _PaymentsPages.crossBoarderACHPage.loadCondition4MngFile();
    await _PaymentsPages.crossBoarderACHPage.filterButton.click();
    await _PaymentsPages.crossBoarderACHPage.fileNameFilterValue.input(fileName);
    await _PaymentsPages.crossBoarderACHPage.goFilterBtn.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4MngFile();
    await _PaymentsPages.crossBoarderACHPage.uploadFileNameLink.jsClick();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4ViewFile();
    await _PaymentsPages.crossBoarderACHPage.uploadPaymentLink.jsClick();
  }
}
