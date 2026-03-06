import { Button, component, log, ensure, Page, TestPages, TextInput, waitForUXLoading, OptionSelect, devWatch } from "../../../lib";
import { browser, ExpectedConditions } from "protractor";
import { FilesPages } from "./index";

@log export class FilesExchangePage extends Page {
  constructor() {
    super();
  }

  @component('//a[contains(@href,"#/file/file-exchange")]') public filesExchangeCenter: Button;
  @component("//*[@id='transactionAdditionalFilter']") public ShowAdditionalFilters: Button;
  @component('//input[@id="requestType"]') public requestType: TextInput;
  @component('//input[@name="destinationId"]') public destinationId: TextInput;
  @component('//p-auto-complete[@formcontrolname="requestType"]') public requestType1: OptionSelect;
  @component('//a[contains(@href,"#/file/file-exchange/send")]')
  public sendFilesTab: Button;
  @component('//a[contains(@href,"#/file/file-exchange/receive")]')
  public receiveFilesTab: Button;
  @component('//p[@id="statusLabel-0"]')
  public statusLabel: Button;
  @component('//*[@id="fromAccount"]')
  public organisationText: TextInput;
  @component('//*[@name="selectAllName"]')
  public selectAllNameButton: Button;
  @component('//button[@id="fileExchangeDelete"]')
  public deleteButton: Button;
  @component('//button[@id="dialogDelete"]')
  public dialogDeleteBtn: Button;
  @component('//button[@id="fileExchangeApprove"]')
  public approveButton: Button;
  @component('//button[@name="Approve"]')
  public dialogApproveBtn: Button;
  @component('//button[@id="fileExchangeReject"]')
  public rejectButton: Button;
  @component('//button[@name="reject"]')
  public dialogRejectBtn: Button;
  @component('//p-auto-complete[@formcontrolname="category"]')
  public categoryValue: OptionSelect;
  @component('//datatable-row-wrapper/datatable-body-row/div[2]/datatable-body-cell[7]/div/div/p')
  public requestTypeVale: Button;

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(
        this.ShowAdditionalFilters.element
      ),
      this.ShowAdditionalFilters.getTimeOut()
    );
    await browser.sleep(3000)
  }

  public async loadDeleteDialog() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.dialogDeleteBtn.element), this.dialogDeleteBtn.getTimeOut()
    );
  }

  public async loadApproveDialog() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.dialogApproveBtn.element), this.dialogApproveBtn.getTimeOut()
    );
  }

  public async loadRejectDialog() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.dialogRejectBtn.element), this.dialogRejectBtn.getTimeOut()
    );
  }

  public async fileUpload(_FilesPages: FilesPages, uploadFileName: string, requestType: string, destinationId: string) {
    let fileName = "";
    let testData = _FilesPages.fetchTestData("SG_testData_01.json");
    await this.loadCondition();
    await _FilesPages.uploadFilePage.browseforfiles.select3(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await _FilesPages.uploadFilePage.loadConditionUpload();
    await Promise.all([
      await ensure(this.categoryValue).textContains(testData.FileExchange.category),
    ]);
    await _FilesPages.filesExchangePage.destinationId.input(destinationId);
    await _FilesPages.uploadFilePage.scrollTo(0, 800);
    await _FilesPages.uploadFilePage.uploadButton.click();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isUXRejectDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await this.loadCondition();
    await browser.sleep(5000) //wait for MQ response
    return fileName;
  }

  public async fileUpload2(_FilesPages: FilesPages, uploadFileName: string, requestType: string) {
    let fileName = "";
    let testData = _FilesPages.fetchTestData("SG_testData_01.json");
    await this.loadCondition();
    await _FilesPages.uploadFilePage.browseforfiles.select3(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await _FilesPages.uploadFilePage.loadConditionUpload();
    await Promise.all([
      await ensure(this.categoryValue).textContains(testData.FileExchange.category),
    ]);
    await _FilesPages.filesExchangePage.requestType1.select(requestType);
    //await _FilesPages.uploadFilePage.byTxn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.organisationText).isNotEmpty(),
    ]);
    await _FilesPages.uploadFilePage.scrollTo(0, 500);
    await _FilesPages.uploadFilePage.uploadButton.click();
    await _FilesPages.uploadFilePage.ok.click();
    await this.loadCondition();
    await browser.sleep(5000) //wait for MQ response
    return fileName;
  }
  // for Category=Trade
  public async fileUpload3(_FilesPages: FilesPages, uploadFileName: string, requestType: string, category:string) {
    let fileName = "";
    await this.loadCondition();
    await _FilesPages.uploadFilePage.browseforfiles.select3(uploadFileName).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await _FilesPages.uploadFilePage.loadConditionUpload();
    await _FilesPages.uploadFilePage.scrollTo(0, 500);
    await _FilesPages.filesExchangePage.categoryValue.select(category);
    await Promise.all([
      await ensure(this.categoryValue).textContains(category),
    ]);
    await _FilesPages.filesExchangePage.requestType1.select(requestType);
    //await _FilesPages.uploadFilePage.byTxn.jsClickIfExist();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.organisationText).isNotEmpty(),
    ]);

    await _FilesPages.uploadFilePage.uploadButton.click();
    await _FilesPages.uploadFilePage.ok.click();
    await this.loadCondition();
    await browser.sleep(5000) //wait for MQ response
    return fileName;
  }

}
