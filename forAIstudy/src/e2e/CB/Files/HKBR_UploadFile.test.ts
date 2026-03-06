/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, ApprovalsPages, } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let fileType = "ALL - Universal File Format";
let testData = _FilesPages.fetchTestData('HKB_testData.json');

describe('HKBR FPS File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    let fileName = '';

    it('Upload HKBR FPS File with All Proxy - By File', async function () {

        await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForFPSProxy : testData.FileService.UAT.fileNameForFPSProxy, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.jsClick();
        await _FilesPages.ViewFilePage.FileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFPSPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForFPS).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForFPS).isNotEmpty(),
        ]);
    });

    it('Approve HKL FPS File via My Approvals (New UI)', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
        await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(fileName);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
        await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.FileService.challengeResponse);
        await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
        await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
        await _FilesPages.openMenu(Menu.Payments.TransferCenter);
        await _FilesPages.transferCentersPage.loadCondition();
        await _FilesPages.transferCentersPage.showAdditionFilter.click();
        await _FilesPages.transferCentersPage.fileNameFileter.input(fileName);
        await _FilesPages.transferCentersPage.searchButton.click();
        await _FilesPages.transferCentersPage.loadCondition();
        await _FilesPages.transferCentersPage.referenceLink.click();
        await _FilesPages.uploadFilePage.loadConditionForViewFPSPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForFPS).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForFPS).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.statusValueForFPS).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received, testData.status.BankRejected),
        ]);
    });
});