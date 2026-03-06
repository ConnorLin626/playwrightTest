/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Menu } from "../../../config/menu";
import { FilesPages } from '..';
import { Page, component, log, find, Button, generatedID, TextInput, ensure, waitForUXLoading, HtmlSelect, DateSelect, FileSelect, waitForI3Loading, findAll, OptionSelect } from '../../../lib';
import * as moment from 'moment';


@log export class ViewFilePage extends Page {

  //Upload file
  @component("//input[@type='file']") public browseforfiles: FileSelect;
  @component('//button[@name="upload"]') public UploadButton: Button;
  @component("//multi-level-dropdown[@formcontrolname='typeFormat']") public PaymentType: OptionSelect;
  @component("//p-auto-complete[@formcontrolname='approvalOption']") public ApprovalOption: OptionSelect;
  @component("//date-picker[@formcontrolname='paymentDate']") public amendPaymentDate: DateSelect;
  @component('//input[@id="confidentialFile"]') public ConfidentialFile: Button;
  @component("//button[@name='dismiss']") public ok: Button;
  @component('//input[@id="upload-filter"]') public Filter: TextInput;
  @component("//label[@id='file-list-addition']") public ShowAdditionalFilters: Button;
  @component("//button[@name='search']") public search: Button;
  @component("//span[@id='fileToggleButton-0']") public Showtransactions: Button;
  @component('//div[@id="txnFromAccount-0"]') public FromAccount: TextInput;


  //View file
  @component('//*[@id="upload-filter"]') public Filefilter: TextInput;
  @component('//*[@id="fileNameButton-0"]') public FileNameLink: Button;
  @component('//input[contains(@id,"file-view-select-")]') public SelectTxn: Button;
  @component('//section/ng-component/div/view-file/div/div[2]/div[4]/div/button[1]') public ViewFileCancel: Button;
  @component('//*[@id="viewTxnBtn-0"]') public ViewFileTxn1: TextInput;
  @component('//*[@id="viewTxnBtn-1"]') public ViewFileTxn2: TextInput;
  @component('//*[@id="viewTxnBtn-2"]') public ViewFileTxn3: TextInput;
  @component('//*[@id="viewTxnBtn-3"]') public ViewFileTxn4: TextInput;



  //Group tab
  @component('//*[@id="ux-tab-GROUP"]') public GroupTab: Button;
  @component('//*[@id="transferCenter-group-filter"]') public GroupFilter: TextInput;
  @component('//*[@id="groupNameButton-0"]') public GroupNamelink: Button;
  @component('//*[@id="CreatePdf"]') public PrintButn: Button;


  //View Group
  @component('//*[@id="view-group-list-reference_0"]') public viewGroupTxn1: TextInput;
  @component('//*[@id="view-group-list-reference_1"]') public viewGroupTxn2: TextInput;
  @component('//input[contains(@id,"group-view-list-")]') public ViewGrouSelectTxn: Button;
  @component('//*[@name="view-group-remove"]') public RemoveButn: TextInput;
  @component('//*[name="remove-txn-group-remove"]') public RemoveConfButn: TextInput;
  @component('//*[name="dismiss"]') public DismissButn: TextInput;




  //Create new group
  @component('//*[@name="transferCenter-addReference"]') public GroupName: TextInput;
  @component('//*[@id="groupCreate"]') public CreateGrouButn: Button;
  @component('//*[@name="create-PDF-close"]') public GroupCancelButn: Button;

  //Add to existing group
  @component('//*[@id="AddToExistingGroup"]') public ExistingGroup: Button;
  @component('//*[@id="selectedGroup"]') public SeleExisGroup: OptionSelect;
  @component('//*[@name="Confirm"]') public ConfirmButn: Button;
  @component('//*[@name="dismiss"]') public OKButn: Button;

  //Delete txn
  @component('//*[@id="transactionDelete"]') public TxnDeleButn: Button;

  //Rebatch
  @component('//*[@id="transactionRebatch"]') public RebatchButn: Button;
  @component('//file-rebatch/div/div[1]/div[1]/div[2]/dbs-radio-group/div/dbs-radio[2]/div/label') public SeleNewFile: Button;
  @component('//file-rebatch/div/div[1]/div[1]/div[2]/dbs-radio-group/div/div[2]/dbs-input/span/div/input') public VirtFileName: TextInput;
  @component('//*[@name="confirm"]') public RebatConfButn: Button;

  //Delete File
  @component('//*[@id="fileDelete"]') public deleteFileButn: Button;
  @component('//*[@id="dialogDelete"]') public deleteButn: Button;
  @component('//*[@id="No information to display"]') public FileResult: TextInput;




  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteFileButn.element), this.deleteFileButn.getTimeOut());
  }
  public async loadConditionForViewFile() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.CreateGrouButn.element), this.CreateGrouButn.getTimeOut());
  }

  public async loadConditionForViewGroup() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.PrintButn.element), this.PrintButn.getTimeOut());
  }

  public async fsUpload(_FilesPages: FilesPages, paymentType: string, uploadFileName: string, approvalOption: string) {
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

  public getCurrentDate() {
    return moment(new Date()).format("DD MMM YYYY");
  }

  public async loadConditionUpload() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.UploadButton.element), this.UploadButton.getTimeOut());
  }


}
