/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('SG_testData.json');

describe('Offline Approvals', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(SIT ? testData.OfflineApproval.SIT.loginCompanyId : testData.OfflineApproval.UAT.loginCompanyId, SIT ? testData.OfflineApproval.SIT.loginUserId : testData.OfflineApproval.UAT.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Offline Approvals By Transaction', async function () {
    let reference = '';
    let fileName = '';
    let _ApprovalsPages = new ApprovalsPages();
    // upload File start
    await _FilesPages.uploadFilePage.fsUpload(
      _FilesPages,
      testData.OfflineApproval.fileType,
      testData.OfflineApproval.fileFormat,
      SIT ? testData.OfflineApproval.SIT.fileName : testData.OfflineApproval.UAT.fileName,
      testData.OfflineApproval.approvalOptionByTxn
    ).then(async data => {
      fileName = data;
    });
    // upload File end
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprovals);
    await _ApprovalsPages.offlineApprovalPage.loadCondition();
    await _ApprovalsPages.offlineApprovalPage.offlineApprovalI3ByTxn.click();
    await _ApprovalsPages.offlineApprovalPage.loadConditionForByTxnPage();
    if (0 !== fileName.trim().length) {
      await _ApprovalsPages.offlineApprovalPage.offlineApproveTxnI3FileName.input(fileName);
      await _ApprovalsPages.offlineApprovalPage.offlineApproveI3TxnSearch.click();
      await _ApprovalsPages.offlineApprovalPage.loadConditionForByTxnPage();
    }
    await _ApprovalsPages.offlineApprovalPage.offlineApproveI3TxnReference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.offlineApprovalPage.offlineApprovalI3Select1stTxn.click();
    await _ApprovalsPages.offlineApprovalPage.offlineApproveTxnI3Button.jsClick();
    await _ApprovalsPages.offlineApprovalPage.loadConditionForApprovalTxnPage();
    await _ApprovalsPages.offlineApprovalPage.challengeResponseI3.input(testData.OfflineApproval.challengeResponse);
    await ensure(_ApprovalsPages.offlineApprovalPage.challengeResponseI3).textIs(testData.OfflineApproval.challengeResponse);
    await _ApprovalsPages.offlineApprovalPage.selectApproverI3.select(SIT ? testData.OfflineApproval.SIT.selectedApprover : testData.OfflineApproval.UAT.selectedApprover);
    await _ApprovalsPages.offlineApprovalPage.submitI3TxnButton.jsClick();
    await _ApprovalsPages.offlineApprovalPage.loadCondition();
    await ensure(_ApprovalsPages.offlineApprovalPage).isI3Success();//has success message.
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(
        testData.status.Approved,
        testData.status.PartialApproved,
        testData.status.PendingRelease,
        testData.status.Received,
        testData.status.BankRejected,
        testData.status.Completed
      )
    ]);
  });

  it('Offline Approvals By File', async function () {
    let fileName = '';
    let totalItems = 0;
    let transactionList = [];
    let _ApprovalsPages = new ApprovalsPages();
    // upload File start
    await _FilesPages.uploadFilePage.fsUpload(
      _FilesPages,
      testData.OfflineApproval.fileType,
      testData.OfflineApproval.fileFormat,
      SIT ? testData.OfflineApproval.SIT.fileName : testData.OfflineApproval.UAT.fileName,
      testData.OfflineApproval.approvalOptionByFile,
      testData.OfflineApproval.approvalCurrency
    ).then(async data => {
      fileName = data;
    });
    // upload File end
    await _ApprovalsPages.openMenu(Menu.Approvals.OfflineApprovals);
    await _ApprovalsPages.offlineApprovalPage.loadCondition();
    await _ApprovalsPages.offlineApprovalPage.offlineApprovalI3ByFile.click();
    await _ApprovalsPages.offlineApprovalPage.loadConditionForByFilePage();
    await _ApprovalsPages.offlineApprovalPage.offlineApprovalI3Select1stFile.jsClick();
    await _ApprovalsPages.offlineApprovalPage.offlineApproveFileI3Button.jsClick();
    await _ApprovalsPages.offlineApprovalPage.loadConditionForApprovalFilePage();
    await _ApprovalsPages.offlineApprovalPage.challengeResponseI3.input(testData.OfflineApproval.challengeResponse);
    await ensure(_ApprovalsPages.offlineApprovalPage.challengeResponseI3).textIs(testData.OfflineApproval.challengeResponse);
    await _ApprovalsPages.offlineApprovalPage.selectApproverI3.select(SIT ? testData.OfflineApproval.SIT.selectedApprover : testData.OfflineApproval.UAT.selectedApprover);
    await _ApprovalsPages.offlineApprovalPage.totalItems.getText().then(text => {
      totalItems = parseInt(text);
    });
    await _ApprovalsPages.offlineApprovalPage.fileName.getText().then(text => {
      fileName = text.trim();
    });
    await _ApprovalsPages.offlineApprovalPage.submitI3FileButton.click();
    await _ApprovalsPages.offlineApprovalPage.loadCondition();
    await ensure(_ApprovalsPages.offlineApprovalPage).isI3Success();//has success message.
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transactionFilterButton.click();
    await _ApprovalsPages.transferCentersPage.fileNameFileter.input(fileName);
    await _ApprovalsPages.transferCentersPage.searchButton.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.getApprovalTransactionReference(totalItems).then(list => {
      transactionList = list;
    });
    await _ApprovalsPages.openMenu(Menu.Files.ManageFiles);
    await _ApprovalsPages.uploadFilePage.loadConditionForManageFilePage();
    await _ApprovalsPages.uploadFilePage.filter.click();
    await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
    await _ApprovalsPages.uploadFilePage.goButton.click();
    await _ApprovalsPages.uploadFilePage.loadConditionForManageFilePage();
    await _ApprovalsPages.uploadFilePage.fileNameLink.click();
    await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
    for (let i = 0; i < transactionList.length; i++) {
      await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
      await _ApprovalsPages.uploadFilePage.filter.jsClick();
      await _ApprovalsPages.uploadFilePage.I3ViewFileRef.clean();
      await _ApprovalsPages.uploadFilePage.I3ViewFileRef.input(transactionList[i]);
      await _ApprovalsPages.uploadFilePage.goButton.click();
      await Promise.all([
        await ensure(_ApprovalsPages.uploadFilePage.I3ViewFileTxnStatus).textContainsLessOne(
          testData.status.Approved,
          testData.status.PartialApproved,
          testData.status.PendingRelease,
          testData.status.Received,
          testData.status.BankRejected,
          testData.status.Completed
        )
      ]);
    }
  });
});