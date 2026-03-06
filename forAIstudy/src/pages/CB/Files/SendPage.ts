/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { Page, component, log, find, Button,generatedID, TextInput, waitForUXLoading, HtmlSelect, FileSelect, waitForI3Loading, findAll,OptionSelect } from '../../../lib';
import * as moment from 'moment';

@log export class SendPage extends Page {
  constructor() {
    super();
  }
  //File Exchange - Send Page
  @component("//a[@id='uploadBtn']") public UploadFileButton: Button;
  @component("//a[@id='approveBtn']") public ApproveButton: Button;
  @component("//a[@id='deleteBtn']") public DeleteButton: Button;
  @component('//input[@id="fileNameInput"]') public FileName: TextInput;
  @component("//a[@id='searchBtn']") public SearchButton: Button;
  @component('//input[@id="checkResource[0]"]') public CheckboxButton: Button;
  @component('//td[@id="requestTypeText[0]"]') public CheckRequestType: TextInput;
  @component('//select[@name="status"]') public fileStatus: HtmlSelect;
  @component('//select[@name="requestType"]') public requestType: HtmlSelect;
  @component("//td[@id='statusText[0]']") public FileStatus: TextInput;
  //File Exchange - Upload File Page
  @component('//select[@id="requestType"]') public RequestType: HtmlSelect;
  @component('//input[@id="theFileBtn"]') public FileBtn: FileSelect;
  @component('//a[@id="uploadFileBtn"]') public UploadButton: Button;
  //File Exchange - View Approve Files
  @component("//a[@id='approveBtn']") public ApproveBut: Button;	
  //File Exchange - View Delete Files
  @component('//td[@id="fileNameLabel[0]"]') public filename: TextInput;
  @component("//a[@id='deleteBtn']") public DeleteBut: Button;	
  @component("//td[@id='noFilesLabel']") public Searchresult: TextInput;



 public async fsUpload1(_FilesPages: FilesPages,FileName: string, RequestType: string) {
    await _FilesPages.openMenu(Menu.Files.Send);
    await this.loadCondition();
    await this.UploadFileButton.click();
    await this.loadConditionUpload();
    await this.RequestType.select(RequestType);
    await this.FileBtn.select2(FileName);
    await this.UploadButton.click();
    await this.loadCondition();}

  public async fsUpload2(_FilesPages: FilesPages,FileName: string, RequestType: string) {
    await _FilesPages.openMenu(Menu.Files.Send);
    await this.loadCondition();
    await this.UploadFileButton.click();
    await this.loadConditionUpload();
    await this.RequestType.select(RequestType);
    await this.FileBtn.select2(FileName);           
    await this.UploadButton.click();
    await this.loadCondition();}

  public async loadCondition() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.UploadFileButton.element), this.UploadFileButton.getTimeOut());
  }
  public async loadConditionUpload() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.UploadButton.element), this.UploadButton.getTimeOut());
  }
  public async loadConditionApprove() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.ApproveBut.element), this.ApproveBut.getTimeOut());
  }
  public async loadConditionDelete() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.DeleteBut.element), this.DeleteBut.getTimeOut());
  }
}