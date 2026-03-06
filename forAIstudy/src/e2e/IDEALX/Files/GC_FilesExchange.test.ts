/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData("GC_testData.json");
let fileName = "";
let fileName4Approve = "";

describe("GC File Exchange - Send", async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileExchange.SIT.loginCompanyId : testData.FileExchange.UAT.loginCompanyId, SIT ? testData.FileExchange.SIT.loginUserId : testData.FileExchange.UAT.loginUserId, "123123"); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

  it("GC Select file to approve", async function () {
    await goToFilesChangeSend();
    await _FilesPages.filesExchangePage.loadCondition();
    await _FilesPages.uploadFilePage.browseforfiles.select3(testData.FileExchange.fileName01).then((data) => {
      let pos: number = data.lastIndexOf('/');
      fileName = (data.substr(pos + 1));
    });
    await _FilesPages.uploadFilePage.loadConditionUpload();
    // await _FilesPages.uploadFilePage.scrollTo(0, 800);
    await _FilesPages.filesExchangePage.requestType1.select(testData.FileExchange.RequestType1);
    await _FilesPages.uploadFilePage.uploadButton.click();
    await Promise.all([
      await ensure(_FilesPages.filesExchangePage).isUXRejectDialogSuccess()
    ]);
    await _FilesPages.uploadFilePage.ok.click();
    await _FilesPages.filesExchangePage.loadCondition();
    await browser.sleep(5000) //wait for MQ response
    //approve
    await new NavigatePages().loginIdealx(SIT ? testData.FileExchange.SIT.loginCompanyId : testData.FileExchange.UAT.loginCompanyId, SIT ? testData.FileExchange.SIT.approveUserId : testData.FileExchange.UAT.approveUserId, "123123");
    await goToFilesChangeSend();
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
});

async function goToFilesChangeSend(): Promise<void> {
  await _FilesPages.uploadFilePage.filesMenu.click();
  await _FilesPages.filesExchangePage.filesExchangeCenter.click();
  await _FilesPages.filesExchangePage.sendFilesTab.click();
  await _FilesPages.filesExchangePage.loadCondition();
}
