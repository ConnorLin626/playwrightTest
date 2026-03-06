/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";
import {TradeFinancePages} from "../../../pages/Trade/TradeFinance";
import {Menu} from "../../../config/menu";

let _FilesPages = new FilesPages();
const _TradeFinancePages = new TradeFinancePages();
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');
let fileName = "";
let fileName4Approve = "";

describe("Trade->File Exchange", async function() {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(SIT ? testData.FileExchange.SIT.loginCompanyId : testData.FileExchange.UAT.loginCompanyId,
        SIT ? testData.FileExchange.SIT.loginUserId : testData.FileExchange.UAT.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it("Upload file with Category", async function() {
    await goToFilesChangeSend();
    await _TradeFinancePages.FilesExchangePage
        .fileUpload2(
            _FilesPages,
            SIT
                ? testData.FileExchange.SIT.fileName
                : testData.FileExchange.UAT.fileName,
            testData.FileExchange.RequestType
        )
        .then(async data => {
          fileName = data;
        });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_PendingApproval),
    ]);
  });

  it("Upload file with Category and approve", async function() {
    await goToFilesChangeSend();
    await _TradeFinancePages.FilesExchangePage
        .fileUpload2(
            _FilesPages,
            SIT
                ? testData.FileExchange.SIT.fileName
                : testData.FileExchange.UAT.fileName,
            testData.FileExchange.RequestType1
        )
        .then(async data => {
          fileName = data;
        });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await _FilesPages.filesExchangePage.selectAllNameButton.jsClick();
    await _FilesPages.filesExchangePage.approveButton.click();
    await _TradeFinancePages.FilesExchangePage.getChallenge.clickIfExist();
    await _TradeFinancePages.FilesExchangePage.responseCode.input(testData.FileExchange.responseCode);
    await browser.sleep(3000);
    await _FilesPages.filesExchangePage.approveButton.click();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isUxSuccessSuccess()
    ]);
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage.statusLabel).textContains(testData.FileExchange.status_Approved),
    ]);
  });

  it("Upload file with Category and reject", async function() {
    await goToFilesChangeSend();
    await _TradeFinancePages.FilesExchangePage
        .fileUpload2(
            _FilesPages,
            SIT
                ? testData.FileExchange.SIT.fileName
                : testData.FileExchange.UAT.fileName,
            testData.FileExchange.RequestType2
        )
        .then(async data => {
          fileName = data;
        });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
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

  it("Upload file with Category and delete", async function() {
    await goToFilesChangeSend();
    await _TradeFinancePages.FilesExchangePage
        .fileUpload2(
            _FilesPages,
            SIT
                ? testData.FileExchange.SIT.fileName
                : testData.FileExchange.UAT.fileName,
            testData.FileExchange.RequestType3
        )
        .then(async data => {
          fileName = data;
        });
    await _FilesPages.uploadFilePage.fileFilter.input(fileName);
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


});

async function goToFilesChangeSend(): Promise<void> {
  await _TradeFinancePages.openMenu(Menu.TradeFinance.FilesExchange);
  await _TradeFinancePages.FilesExchangePage.loadCondition();
  await _TradeFinancePages.FilesExchangePage.sendFilesTab.click();
  await _TradeFinancePages.FilesExchangePage.loadCondition();
}

async function goToFilesChangeReceive(): Promise<void> {
  await _FilesPages.uploadFilePage.filesMenu.click();
  await _FilesPages.filesExchangePage.filesExchangeCenter.click();
  await _FilesPages.filesExchangePage.receiveFilesTab.click();
  await _FilesPages.filesExchangePage.loadCondition();
}
