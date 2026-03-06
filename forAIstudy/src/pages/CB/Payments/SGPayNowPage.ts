/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Page, TextInput, Button, OptionSelect, DateSelect, RadioButton, FileSelect, ListSelect } from '../../../lib';
import * as utils from '../../../lib/utils';
import * as constVal from '../../../pages/CB/Payments/constantValue';
import { PaymentsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';

@log export class SGPayNowPage extends Page {

  @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//input[@name="send-amount"]') public amount: TextInput;
  @component('//date-picker[@formcontrolname="paymentDate"]') public paymentDate: DateSelect;
  @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
  //"Chose Date" at Make a Payment Payment Screen 
  @component('//input[@id="set_date"]') public choseDateRadioButton: Button;
  //"Payment priority" at Make a Payment Payment Screen 
  @component('//input[@id="immediate_type"]') public fastTypeRadioButton: Button;
  //"Payment priority" at Make a Payment Payment Screen 
  @component('//input[@id="next_day_paynow"]') public nextDateTypeRadioButton: Button;
  //"status" field at View Single(eg FAST) Payment Screen
  @component('//div[@id="domestic-view-status"]') public statusLableViewSinglePayment: TextInput;
  @component("//button[@name='next']") public nextButton: Button;
  @component("//button[@name='submit']") public submitButton: Button;
  @component("//button[@name='approve']") public approveButton: Button;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;

  //"payee name" at View Single(eg FAST) Payment Screen
  @component('//span[@id="domestic-view-payNow-proxy"]') payNowPayeeNameViewSinglePayment: TextInput;
  @component('//span[@id="domestic-view-newPayNow-proxy"]') newPayNowPayeeNameViewSinglePayment: TextInput;
  //"payment date" at View Single(eg FAST) Payment Screen
  @component('//span[@id="domestic-view-paymentDate"]') paymentDateViewSinglePayment: TextInput;
  @component('//a[@id="ux-tab-EXISTING"]') public existingTab: Button;
  @component('//a[@id="ux-tab-NEWPAYNOW"]') public payNowTab: Button;
  @component('//li[@id="labelPayNow_1"]') public payNowTab4Bulk: Button;
  @component('//input[@id="proxyTypeCmpnyIde"]') public companyIdentifierRadio: Button;
  @component('//input[@id="proxyTypeMobNum"]') public mobileNumberRadio: Button;
  @component('//input[@id="proxyTypeNF"]') public nfRadio: Button;
  //"from account" at View Single(eg FAST) Payment JSP Screen via Manage Files
  @component('//*[@id="domestic-view-accountNum"]') public fromAccount_ViewUploadSinglePayment: TextInput;
  //"amount" at View Single(eg FAST) Payment JSP Screen via Manage Files
  @component('//*[@id="domestic-view-deductAmount"]') public amount_ViewUploadSinglePayment: TextInput;
  //"payee name" at View Single(eg FAST) Payment JSP Screen via Manage Files
  @component('//*[@id="domestic-view-newPayNow-proxy"]') public payeeName_ViewUploadSinglePayment: TextInput;
  //"status" at View FAST Payment JSP Screen via Manage Files
  @component('//*[@id="domestic-view-status"]') public status_ViewUploadSinglePayment: TextInput;
  //"status" at View GIRO Payment JSP Screen via Manage Files
  @component('//tr[@data-title="Transaction Information"]/td/div/div[2]/table/tbody/tr/td/div/table[@id="uploadpaymentDetails"]/tbody/tr[7]/td[2]') public statusGIRO_ViewUploadSinglePaymentOldUI: TextInput;
  //"approved by" at View Single(eg FAST) Payment JSP Screen via Manage Files
  @component('//*[@id="domestic-view-paymentDate"]') public cutoff_ViewUploadSinglePaymentOldUI: TextInput;
  @component('//dbs-radio-group[@formcontrolname="payNowProxyType"]') public payNowProxyTypeRadioButton: RadioButton;
  @component('//input[@name="proxyTypeCmpnyIdeInput"]') public proxyTypeCmpnyIde: TextInput;
  @component('//paynow-mobile-country/p-auto-complete') public proxyTypeMobNumCountry: OptionSelect;
  @component('//input[@name="proxyTypeMobNumInput"]') public proxyTypeMobNum: TextInput;
  @component('//input[@name="proxyTypeNFInput"]') public proxyTypeNF: TextInput;
  @component('//button[@name="add-payee"]') public addPayee: Button;
  //different with the xpath of normal bulk payment(BulkPaymentpage.transactionStatusValue), paynow is "div[3]/div[2]/strong
  //"status" in transaction List View Bulk Payment Screen
  @component('//strong[@id="bulk-view-pendingStatus_0"]') public statusLableViewPayNowBulkPayment: TextInput;
  //"PayNow proxy" in transaction List View Bulk Payment Screen
  @component('//div[@id="paynow-proxy-mobNum-0"]') public proxyValueViewPayNowBulkPayment: TextInput;

  @component('//button[@name="upload-file"]') public payNowEnqUploadFileButton: Button;
  @component('//input[@id="PayNowFileUpload"]') public payNowEnqChoseFileButton: FileSelect;
  @component('//input[@id="showFileName2"]') public uploadFileNameInputBox: TextInput;
  @component('//button[@name="upload"]') public doUploadButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;
  @component('//input[@name="filter-search-data"]') public payNowFilterSearch: TextInput;
  @component('//div[@id="paynow-enq-data-list"]') public payNowDatatList: ListSelect;
  @component('//input[@id="selectTName0"]') public payNowFirstData: ListSelect;
  @component('//p[@id="labelNoInformationDisplay"]') public transactionResult: TextInput;
  //"status" in PayNow Enq List
  @component('//td[@id="paynow-enq-data-status-0"]')
  public statusLabelPayNowEnqList: TextInput;
  @component("//button[@name='Approve']") public payNowApproveButton: Button;
  @component("//button[@id='paynowenqlistDelete']") public deleteButton: Button;
  @component("//button[@id='dialogDelete']") public dialogDeleteButton: Button;

  public async loadCondition() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
  }

  public async loadCondition4ViewSinglePayment() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.statusLableViewSinglePayment.element), this.statusLableViewSinglePayment.getTimeOut());
  }

  public async loadCondition4ViewPayNowBulkPayment() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.statusLableViewPayNowBulkPayment.element), this.statusLableViewPayNowBulkPayment.getTimeOut());
  }

  public async loadCondition4PayNowEnq() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.payNowEnqUploadFileButton.element), this.payNowEnqUploadFileButton.getTimeOut());
  }

  public async loadCondition4PayNowUploadFile() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.uploadFileNameInputBox.element), this.uploadFileNameInputBox.getTimeOut());
  }

  public async loadCondition4PayNowApprove() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.challengeResponse.element), this.challengeResponse.getTimeOut());
  }

  public async loadCondition4PayNowExistingPayee() {
    let _PaymentsPages = new PaymentsPages();
    await utils.waitForUXLoading();
    await browser.sleep(2000);//coding as normal step, but happen frequently "field required" when click "next", so sleep to control the step
    await browser.wait(ExpectedConditions.elementToBeClickable(_PaymentsPages.BulkPaymentpage.amount.element), _PaymentsPages.BulkPaymentpage.amount.getTimeOut());
  }

  public async addExisting4Single(exsitingPayeeName: string): Promise<void> {
    await this.addExistingPayNow4Single(exsitingPayeeName);
  }
  public async addExistingPayNow4Single(exsitingPayeeName: string): Promise<void> {
    await this.existingTab.click();
    await this.existingPayee.select(exsitingPayeeName);
  }

  public async addExistingPayNow4Bulk(exsitingPayeeName: string): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    _PaymentsPages.BulkPaymentpage.addExistingPayee(exsitingPayeeName);
  }

  public async addNewPayNow4Single(payNowProxyType: string, payNowProxyValue: string, payNowProxyCountryPhoneCode?: string): Promise<void> {
    await this.payNowTab.click();
    if (payNowProxyType === constVal.payNowTypeCodeMap.U) {
      await this.companyIdentifierRadio.jsClick();
      await this.proxyTypeCmpnyIde.input(payNowProxyValue);
    } else if (payNowProxyType === constVal.payNowTypeCodeMap.M) {
      await this.mobileNumberRadio.jsClick();
      await this.proxyTypeMobNumCountry.select(payNowProxyCountryPhoneCode);
      await this.proxyTypeMobNum.input(payNowProxyValue);
    } else if (payNowProxyType === constVal.payNowTypeCodeMap.N) {
      await this.nfRadio.jsClick();
      await this.proxyTypeNF.input(payNowProxyValue);
    }
  }

  public async addNewPayNow4Bulk(payNowProxyType: string, payNowProxyValue: string, payNowProxyCountryPhoneCode?: string): Promise<void> {
    await this.payNowTab4Bulk.click();
    if (payNowProxyType === constVal.payNowTypeCodeMap.U) {
      await this.payNowProxyTypeRadioButton.select(constVal.payNowProxyTypeLableMap.U);
      await this.proxyTypeCmpnyIde.input(payNowProxyValue);
    } else if (payNowProxyType === constVal.payNowTypeCodeMap.M) {
      await this.payNowProxyTypeRadioButton.select(constVal.payNowProxyTypeLableMap.M);
      await this.proxyTypeMobNumCountry.select(payNowProxyCountryPhoneCode);
      await this.proxyTypeMobNum.input(payNowProxyValue);
    } else if (payNowProxyType === constVal.payNowTypeCodeMap.N) {
      await this.payNowProxyTypeRadioButton.select(constVal.payNowProxyTypeLableMap.N);
      await this.proxyTypeNF.input(payNowProxyValue);
    }
    await this.addPayee.click();
  }

  //Manage Files -> filter by Name -> click file name -> enter View File -> Click File Name -> enter View Payment
  public async goToViewUploadSinglePaymentOldUI(fileName: string): Promise<void> {
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
    await this.loadCondition4ViewSinglePaymentOldUI();
  }

  public async loadCondition4ViewSinglePaymentOldUI() {
    await utils.waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount_ViewUploadSinglePayment.element), this.fromAccount_ViewUploadSinglePayment.getTimeOut());
  }

  public async uploadPayNowEnq(uploadFileName: string): Promise<string> {
    let filePath: string = null;
    let fileName: string = null;
    let _FilesPages = new FilesPages();
    let _PaymentsPages = new PaymentsPages();
    await _FilesPages.openMenu(Menu.Files.FileEnquiry);
    await _PaymentsPages.SGPayNowPage.loadCondition4PayNowEnq();
    await _PaymentsPages.SGPayNowPage.payNowEnqUploadFileButton.click();
    await _PaymentsPages.SGPayNowPage.loadCondition4PayNowUploadFile();
    await _PaymentsPages.SGPayNowPage.payNowEnqChoseFileButton.select(uploadFileName).then(
      (data) => {
        filePath = data;
        console.log(filePath);
        let pos: number = filePath.lastIndexOf('/');
        fileName = filePath.substr(pos + 1);
        console.log(fileName);
      });
    await _PaymentsPages.SGPayNowPage.doUploadButton.click();
    await _PaymentsPages.SGPayNowPage.dismissButton.click();

    return await fileName;

  }

  public async goToNowEnqItem(uploadFileName: string): Promise<void> {
    let _FilesPages = new FilesPages();
    let _PaymentsPages = new PaymentsPages();
    await _FilesPages.openMenu(Menu.Files.FileEnquiry);
    await _PaymentsPages.SGPayNowPage.loadCondition4PayNowEnq();
    await _PaymentsPages.SGPayNowPage.payNowFilterSearch.input(uploadFileName);
    await _PaymentsPages.SGPayNowPage.loadCondition4PayNowEnq();
  }

  public async checkPayNowEnqItem(uploadFileName: string): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.SGPayNowPage.goToNowEnqItem(uploadFileName);
    //use jsClick instead of selectAll() to increase the process
    //    await _PaymentsPages.SGPayNowPage.payNowDatatList.setDataListType(utils.DATALIST_TYPE.PAYNOW).selectAll();
    await _PaymentsPages.SGPayNowPage.payNowFirstData.jsClick();
  }

  public async approvePayNowEnqItem(resposneCode: string): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.SGPayNowPage.payNowApproveButton.jsClick();
    await _PaymentsPages.SGPayNowPage.loadCondition4PayNowApprove();
    await _PaymentsPages.SGPayNowPage.challengeResponse.input(resposneCode);
    await _PaymentsPages.SGPayNowPage.approveButton.jsClick();
    await _PaymentsPages.SGPayNowPage.dismissButton.jsClick();
  }
}