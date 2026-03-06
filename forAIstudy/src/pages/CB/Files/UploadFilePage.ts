/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { Page, component, log, find, Button, TextInput, waitForUXLoading, HtmlSelect, FileSelect, waitForI3Loading, findAll } from '../../../lib';
import * as moment from 'moment';

@log export class UploadFilePage extends Page {
  constructor() {
    super();
  }
  // Upload File Page
  @component('//select[@name="fileType"]') public fileType: HtmlSelect;
  @component('//select[@name="fileFormat"]') public fileFormat: HtmlSelect;
  @component('//input[@name="theFile"]') public fileName: FileSelect;
  @component('//input[@name="defaultValueDate"]') public amendPaymentDate: TextInput;
  @component('//input[@name="confidential"]') public confidential: TextInput;
  @component('//select[@name="aprvlOptn"]') public approvalOption: HtmlSelect;
  @component('//select[@name="aprvlCrny"]') public approvalCurrency: HtmlSelect;
  @component('//a[@id="normalAnchorBtn"]') public uploadFileButton: Button;
  @component('//div[@id="bulk-view-status_0"]') public transactionStatusValue: TextInput;

  // Manage File Page
  @component('//a[@id="filter"]') public filter: Button;
  @component('//input[@name="batchName"]') public fileNameFilter: TextInput;
  @component('//a[@id="goFilter"]') public goButton: Button;
  @component('//a[@id="uploadBatchView-0"]') public fileNameLink: Button;
  @component('//*[@id="ux-tab-FS_PENDING"]') public pendingApprovalLink: Button;
  @component('//*[@id="fileHash-0"]') public fileHash: TextInput;
  @component('//input[@name="reference"]') public I3ViewFileRef: TextInput;
  @component('/html/body/div/div/div/my-app/section/ng-component/div/view-file/div/div[2]/div[2]/view-file-txn-list/div/div/div[3]/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[1]/datatable-body-row/div[2]/datatable-body-cell[7]/div/div/p') public I3ViewFileTxnStatus: TextInput;

  // View File Page
  @component('//*[@id="viewTxnBtn-0"]') public paymentReferenceLink: Button;
  @component('//*[@type="text"]') public viewFileRef: TextInput;
  @component('//table[@class="table-start-lu"]/tbody/tr/td/div/table/tbody/tr[4]/td[5]') public totalItems: Button;
  @component('//*[@name="PDF"]') public DownloadPDF: TextInput;
  @component('//*[@id="__bookmark_2"]/tbody/tr[2]/td[2]/div') public PaymentDate: TextInput;
  // View Bulk Payment(DBS)/Payroll(DBS)/Cheque Payment Page(old ui)
  @component('//span[@id="bulk-view-accountNum"]') public fromAccountValue: TextInput;
  @component('//strong[@id="bulk-view-amount_0"]') public amountValue: TextInput;
  @component('//table[@id="uploadpaymentDetails"]/tbody/tr[4]/td[2]') public internalReference: TextInput;
  @component('//*[@id="uploadpaymentDetails"]/tbody/tr[8]/td[2]') public amountValueForCheque: TextInput;

  // View GIRO/LVT Page(old ui)
  @component('//*[@id="domestic-view-accountNum"]') public fromAccountValueForGIRO: TextInput;
  @component('//*[@id="domestic-view-deductAmount"]') public amountValueForGIRO: TextInput;
  @component('//table[2]/tbody/tr/td/a/span[1]') public cancelButton: Button;

  // View HVT Page(old ui)
  @component('//*[@id="uploadpaymentDetails"]/tbody/tr[2]/td[2]') public fromAccountValueForHVT: TextInput;
  @component('//*[@id="uploadpaymentDetails"]/tbody/tr[4]/td[2]') public amountValueForHVT: TextInput;

  // View Fast Payment Page(new ui)
  @component('//span[@id="domestic-view-accountNum"]') public fromAccountValueForFPS: TextInput;
  @component('//label[@id="domestic-view-sendAmount"]') public amountValueForFPS: TextInput;
  @component('//div[@id="domestic-view-status"]') public statusValueForFPS: TextInput;

  // View Bulk Payment Page(new ui)
  @component('//span[@id="bulk-view-accountNum"]') public fromAccountValueForBP: TextInput;
  @component('//span[@id="bulk-view-paymentAmount"]') public amountValueForBP: TextInput;
  @component('//div[@id="bulk-view-status_0"]') public statusValueForBP: TextInput;

  // View TW TT Payment Page(new ui)
  @component('//span[@id="view-ott-accountNum"]') public fromAccountValueForTT: TextInput;
  @component('//span[@id="label-purpose-code"]') public purposecodeValue: TextInput;
  @component('//span[@id="label-sub-purpose-code"]') public subPurposeCodeValue: TextInput;
  @component('//span[@id="label-other-description"]') public otherDesValue: TextInput;

  //Upload fail page
  @component('//a[@id="uploadPaymentView-0"]') public uploadFailLink: TextInput;
  @component('//a[@id="refresh"]') public backBtn: Button;
  @component('//td[@id="errorMsg-0"]') public errorMsg: TextInput;


  public async loadCondition() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fileType.element), this.fileType.getTimeOut());
  }

  public async loadConditionForManageFilePage() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.filter.element), this.filter.getTimeOut());
  }

  public async loadConditionForViewFilePage() {
    await waitForUXLoading;
    await browser.wait(ExpectedConditions.stalenessOf(this.fileNameLink.element), this.fileNameLink.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentReferenceLink.element), this.paymentReferenceLink.getTimeOut());
  }

  public async loadConditionForViewI3Page() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
  }

  public async loadConditionForViewFPSPage() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValueForFPS.element), this.fromAccountValueForFPS.getTimeOut());
  }

  public async loadConditionForViewBPPage() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValueForBP.element), this.fromAccountValueForBP.getTimeOut());
  }

  //View Upload File Log page
  public async loadConditionForViewFailLogPage() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.visibilityOf(this.backBtn.element), this.backBtn.getTimeOut());
  }

  public async getI3AllReferenceID() {
    let _oldI3fileRefList = [];
    await find('//*[@id="uploadPaymentView-0"]').getText().then(async text => {
      _oldI3fileRefList.push(text);
    });
    await find('//*[@id="uploadPaymentView-1"]').getText().then(async text => {
      _oldI3fileRefList.push(text);
    });
    return _oldI3fileRefList;
  }

  public async fsUpload(_FilesPages: FilesPages, fileType: string, fileFormat: string, uploadFileName: string, approvalOption: string, approvalCurrency?: string) {
    let currentData = moment(new Date()).format('DD-MMM-YYYY');
    let fileName = "";
    await _FilesPages.openMenu(Menu.Files.UploadFile);
    await this.loadCondition();
    await this.fileType.select(fileType);
    await this.fileFormat.select(fileFormat);
    // await this.fileName.select(uploadFileName);
    await this.fileName.select(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await this.amendPaymentDate.input(currentData);
    await this.approvalOption.select(approvalOption);
    if (approvalOption === "By File") {
      await this.approvalCurrency.select(approvalCurrency);
    }
    await this.uploadFileButton.click();
    await this.loadConditionForManageFilePage();
    await _FilesPages.uploadFilePage.filter.click();
    await _FilesPages.uploadFilePage.fileNameFilter.clean();
    await _FilesPages.uploadFilePage.fileNameFilter.input(fileName);
    await browser.sleep(35000);// wait MQ response
    await _FilesPages.uploadFilePage.goButton.click();
    await _FilesPages.uploadFilePage.loadConditionForManageFilePage();
    if (await _FilesPages.uploadFilePage.fileNameLink.isElementPresent()) {
      await _FilesPages.uploadFilePage.fileNameLink.jsClick();
      await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
    } else {
      fileName = "";
    };
    return fileName;
  }

  public async getTransactionRefViewFilePage(items: number) {
    let _txnRefList = [];
    for (let index = 0; index < items; index++) {
      await (find('//*[@id="uploadPaymentView-' + index + '"]')).getText().then(async text => {
        _txnRefList.push(text);
      })
    }
    return _txnRefList;
  }

  public async loadConditionForViewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
  }
  public async loadConditionforViewPaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusValue.element), this.transactionStatusValue.getTimeOut());
  }

  public async loadConditionForViewTTPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValueForTT.element), this.fromAccountValueForTT.getTimeOut());
  }

}