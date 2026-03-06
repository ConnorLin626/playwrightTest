/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { FilesPages } from '..';
import { Menu } from '../../../config/menu';
import { Page, component, log, find, Button, generatedID, TextInput, waitForUXLoading, HtmlSelect, DateSelect, FileSelect, waitForI3Loading, findAll, OptionSelect } from '../../../lib';
import * as moment from 'moment';

@log export class Filemanagement_UploadFile extends Page {
  constructor() {
    super();
  }
  @component("//input[@type='file']") public browseforfiles: FileSelect;
  @component("//multi-level-dropdown[@formcontrolname='typeFormat']") public PaymentType: OptionSelect;
  @component("//p-auto-complete[@formcontrolname='approvalOption']") public ApprovalOption: OptionSelect;
  @component("//date-picker[@formcontrolname='paymentDate']") public amendPaymentDate: DateSelect;
  @component('//p-auto-complete[@formcontrolname="organisation"]') public Organisationselect: OptionSelect;
  @component('//input[@id="confidentialFile"]') public ConfidentialFile: Button;
  @component("//input[@id='testFile']") public TestFile: Button;
  @component('//button[@name="upload"]') public UploadButton: Button;
  @component('//a[@id="ux-tab-FS_TEST_FILES"]') public TestFilestab: Button;

  @component("//label[@id='file-list-addition']") public ShowAdditionalFilters: Button;
  @component('//p-auto-complete[@formcontrolname="organisation"]') public organisation: OptionSelect;
  @component("//p-auto-complete[@formcontrolname='fileFormat']") public FileFormat: OptionSelect;
  @component("//p-auto-complete[@formcontrolname='approvalOption']") public approvaloption: OptionSelect;
  @component('//input[@id="upload-filter"]') public Filter: TextInput;
  @component("//button[@name='search']") public search: Button;
  @component("//button[@name='dismiss']") public ok: Button;
  @component('//span[@class="icon-refresh-active"]') public refresh: Button;

  @component('//p[@id="fileNameLabel-0"]') public FileName: TextInput;
  @component('//div[@id="txnFromAccount-0"]') public FromAccount: TextInput;
  @component('//div[@id="txnAmount-0"]') public Amount: TextInput;
  @component("//span[@id='fileToggleButton-0']") public Showtransactions: Button;
  @component("//div[@id='errorMessage-0']") public errorMsg: TextInput;
  @component('//button[@id="fileNameButton-0"]') public FileName_Showall: Button;

  public async fsUpload(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
    let fileName = "";
    let currentData = this.getCurrentDate();
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await this.loadCondition();
    await this.browseforfiles.select(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await this.loadConditionUpload();
    await this.PaymentType.select(paymentType);
    await this.ApprovalOption.select(approvalOption);
    await this.amendPaymentDate.select(currentData);
    await this.UploadButton.click();
    await this.ok.click();
    await this.loadCondition();
    await browser.sleep(20000) //wait for MQ response
    return fileName;

  }

  public async fsUpload1(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
    let fileName = "";
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await this.loadCondition();
    await this.browseforfiles.select(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await this.loadConditionUpload();
    await this.PaymentType.select(paymentType);
    await this.ApprovalOption.select(approvalOption);
    await this.TestFile.click();
    await this.UploadButton.click();
    await this.ok.click();
    await this.loadCondition();
    return fileName;
  }

  public async fsUpload2(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
    let currentData = this.getCurrentDate();
    let fileName = "";
    //await _FilesPages.openMenu(Menu.CompanyInfo.SwitchToSubsi2);
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await this.loadCondition();
    await this.browseforfiles.select(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await this.loadConditionUpload();
    await this.PaymentType.select(paymentType);
    await this.ApprovalOption.select(approvalOption);
    await this.amendPaymentDate.select(currentData);
    await this.ConfidentialFile.jsClick();
    await this.UploadButton.click();
    await this.ok.click();
    await this.loadCondition();
    return fileName;
  }

  public async fsUpload3(_FilesPages: FilesPages, Organisation: string, paymentType: string, uploadFileName: string, approvalOption: string) {
    let currentData = this.getCurrentDate();
    let fileName = "";
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await this.loadCondition();
    await this.browseforfiles.select(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await this.loadConditionUpload();
    await this.Organisationselect.select(Organisation);
    await this.PaymentType.select(paymentType);
    await this.ApprovalOption.select(approvalOption);
    await this.amendPaymentDate.select(currentData);
    await this.ConfidentialFile.click();
    await this.UploadButton.click();
    await this.ok.click();
    await this.loadCondition();
    return fileName;
  }

  public async fsUpload4(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
    let currentData = this.getCurrentDate();
    let fileName = "";
    //await _FilesPages.openMenu(Menu.CompanyInfo.SwitchToSubsi2);
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await this.loadCondition();
    await this.browseforfiles.select(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await this.loadConditionUpload();
    await this.PaymentType.select(paymentType);
    await this.ApprovalOption.select(approvalOption);
    await this.amendPaymentDate.select(currentData);
    await this.ConfidentialFile.jsClick();
    await this.UploadButton.click();
    await this.ok.click();
    await this.loadCondition();
    return fileName;
  }
  public async HKfsUpload(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
    let fileName = "";
    let currentData = this.getCurrentDate();
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await this.loadCondition();
    await this.browseforfiles.select(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await this.loadConditionUpload();
    await this.PaymentType.select(paymentType);
    await this.ApprovalOption.select(approvalOption);
    await this.amendPaymentDate.select(currentData);
    await this.UploadButton.click();
    await this.ok.click();
    await this.loadCondition();
    return fileName;
  }
  public async IDdigifsUpload(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
    let fileName = "";
    let currentData = this.getCurrentDate();
    await _FilesPages.openMenu(Menu.Files.FileManagementCenter);
    await this.loadCondition();
    await this.browseforfiles.select(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await this.loadConditionUpload();
    await this.PaymentType.select(paymentType);
    await this.ApprovalOption.select(approvalOption);
    await this.amendPaymentDate.select(currentData);
    await this.UploadButton.click();
    await this.ok.click();
    await this.loadCondition();
    return fileName;
  }


  public getCurrentDate() {
    return moment(new Date()).format("DD MMM YYYY");
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.ShowAdditionalFilters.element), this.ShowAdditionalFilters.getTimeOut());
  }
  public async loadConditionUpload() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.UploadButton.element), this.UploadButton.getTimeOut());
  }
  public async loadConditiontest() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.Showtransactions.element), this.Showtransactions.getTimeOut());
  }
}