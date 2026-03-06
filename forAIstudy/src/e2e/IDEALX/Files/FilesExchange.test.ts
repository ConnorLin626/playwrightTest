/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData("SG_testData_01.json");
let fileName = "";
let fileName4Approve = "";

describe("File Exchange - Send", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileExchange.SIT.loginCompanyId2 : testData.FileExchange.UAT.loginCompanyId2, SIT ? testData.FileExchange.SIT.loginUserId2 : testData.FileExchange.UAT.loginUserId2, "123123"); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

  it("Upload file with Destination ID has value", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.RequestType1, testData.FileExchange.destinationId).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_PendingApproval),
    ]);
  });

  it("Select file to delete", async function () {
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.deleteButton.jsClick();
    await _FilesPages.filesExchangePage.loadDeleteDialog();
    await _FilesPages.filesExchangePage.dialogDeleteBtn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isFilesExchangeDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).isNotElementPresent()
    ]);
  });

  it("Upload file with Destination ID has not value and Organisation has value", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload2(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.RequestType1).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_PendingApproval),
    ]);
  });

  it("Select file to reject", async function () {
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.rejectButton.jsClick();
    await _FilesPages.filesExchangePage.loadRejectDialog();
    await _FilesPages.filesExchangePage.dialogRejectBtn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isFilesExchangeDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_Rejected),
    ]);
  });

  //this case is combined with "R27Enhancement - Select file to approve and
  //"R28Enhancement - Approve file with Category=Cash and Destination ID has value"
  it("Select file to approve", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.RequestType1, testData.FileExchange.destinationId).then(async data => { fileName = data; fileName4Approve = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.approveButton.jsClick();
    await _FilesPages.filesExchangePage.loadApproveDialog();
    await _FilesPages.filesExchangePage.dialogApproveBtn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isFilesExchangeDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_Sent),
    ]);
  });

  //this case is "R28Enhancement - Approve file with Category=Cash and Request type = Others"
  it("Select file to approve with Request Type is Others", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload2(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.RequestType2).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.approveButton.jsClick();
    await _FilesPages.filesExchangePage.loadApproveDialog();
    await _FilesPages.filesExchangePage.dialogApproveBtn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isFilesExchangeDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_Sent),
    ]);
  });

  //this case is "R28Enhancement - Approve file with Category=Cash and Request type != Others"
  it("Select file to approve with Request Type is not Others", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload2(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.RequestType1).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.approveButton.jsClick();
    await _FilesPages.filesExchangePage.loadApproveDialog();
    await _FilesPages.filesExchangePage.dialogApproveBtn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isFilesExchangeDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_Approved),
    ]);
  });
  // below for File exchange upload trade request type
  it("Upload file with Category is Trade and Request type is Application for Transfer of Documentary Credit", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload3(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.TradeRequestType1,testData.FileExchange.tradecategory).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);

    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_PendingApproval),
      await ensure(_FilesPages.filesExchangePage.requestTypeVale).textContains(testData.FileExchange.TradeRequestType1),
    ]);
  });

  it("Approve file with Category is Trade and Request type is Settlement Instruction Form", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload3(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.TradeRequestType2,testData.FileExchange.tradecategory).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_PendingApproval),
      await ensure(_FilesPages.filesExchangePage.requestTypeVale).textContains(testData.FileExchange.TradeRequestType2),
    ]);
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.approveButton.jsClick();
    await _FilesPages.filesExchangePage.loadApproveDialog();
    await _FilesPages.filesExchangePage.dialogApproveBtn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isFilesExchangeDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_Approved),
    ]);
  });

  it("Reject file with Category is Trade and Request type is Silent Confirmation", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload3(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.TradeRequestType3,testData.FileExchange.tradecategory).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_PendingApproval),
      await ensure(_FilesPages.filesExchangePage.requestTypeVale).textContains(testData.FileExchange.TradeRequestType3),
    ]);
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.rejectButton.jsClick();
    await _FilesPages.filesExchangePage.loadRejectDialog();
    await _FilesPages.filesExchangePage.dialogRejectBtn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isFilesExchangeDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_Rejected),
    ]);
  });

  it("Delete file with Category is Trade and Request type is Trade Instruction Letter", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload3(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.TradeRequestType4,testData.FileExchange.tradecategory).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_PendingApproval),
      await ensure(_FilesPages.filesExchangePage.requestTypeVale).textContains(testData.FileExchange.TradeRequestType4),
    ]);
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.deleteButton.jsClick();
    await _FilesPages.filesExchangePage.loadDeleteDialog();
    await _FilesPages.filesExchangePage.dialogDeleteBtn.jsClick();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isFilesExchangeDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).isNotElementPresent()
    ]);
  });

   // below for File exchange upload KYC request type
   it("Upload file with Category is KYC and Request type is Declaration Form", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.fileUpload3(_FilesPages, SIT ? testData.FileExchange.SIT.fileName : testData.FileExchange.UAT.fileName, testData.FileExchange.KYCRequest,testData.FileExchange.KYCCatgory).then(async data => { fileName = data; });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);

    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_Approved),
      await ensure(_FilesPages.filesExchangePage.requestTypeVale).textContains(testData.FileExchange.KYCRequest),
    ]);
  });
});

describe("File Exchange - Receive", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileExchange.SIT.loginCompanyId2 : testData.FileExchange.UAT.loginCompanyId2, SIT ? testData.FileExchange.SIT.loginUserId2 : testData.FileExchange.UAT.loginUserId2, "123123"); });
  const suitObject = this;
  beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

  it("Download file", async function () {
    await goToFilesChangeReceive();
    await _FilesPages.uploadFilePage.fileFilter.input(fileName4Approve);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.statusReadyDownload),
    ]);
  });
});

async function goToFilesChangeSend(): Promise<void> {
  await _FilesPages.uploadFilePage.filesMenu.click();
  await _FilesPages.filesExchangePage.filesExchangeCenter.click();
  await _FilesPages.filesExchangePage.sendFilesTab.click();
  await _FilesPages.filesExchangePage.loadCondition();
}

async function goToFilesChangeReceive(): Promise<void> {
  await _FilesPages.uploadFilePage.filesMenu.click();
  await _FilesPages.filesExchangePage.filesExchangeCenter.click();
  await _FilesPages.filesExchangePage.receiveFilesTab.click();
  await _FilesPages.filesExchangePage.loadCondition();
}
