/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, ApprovalsPages, } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
import { Filemanagement_UploadFile } from '../../../pages/CB/Files';

let _FilesPages = new FilesPages();
let _Filemanagement_UploadFile = new Filemanagement_UploadFile();
let testData = _FilesPages.fetchTestData('HK_testData.json');

describe('HKL FPS File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    let fileName = "";
    let paymentType = "";
    let approvalOption = "";

    it('Upload HKL FPS File with All Proxy - By File(New UI)', async function () {
        paymentType = "ALL - Universal File Format";
        approvalOption="file";
        await _FilesPages.filemanagement_UploadFile.HKfsUpload(_FilesPages, paymentType,SIT ? testData.FileService.SIT.fileName : testData.FileService.UAT.fileName,approvalOption).then(async data => {
            fileName = data;
        });
        await _FilesPages.filemanagement_UploadFile.Filter.input(fileName);
        await _FilesPages.filemanagement_UploadFile.refresh.click();
		await Promise.all([
        await ensure(_FilesPages.filemanagement_UploadFile.FileName_Showall).textContains(fileName),
        ]);
    });

    it('Approve HKL FPS File via My Approvals (New UI)', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        let paymentRefList = [];
        let _totalItems = 0;
        await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
        await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
        await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileName);
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
        await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(1);
        await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.FileService.challengeResponse);
        await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
        await _ApprovalsPages.paymentsTransactionsFilesPage.completeTotalItems.getText().then(async items => {
            _totalItems = parseInt(items);
        });
        await _ApprovalsPages.paymentsTransactionsFilesPage.getApproveTransactionRef(_totalItems).then(async list => {
            paymentRefList = list;
        });
        for (let i = 0; i < paymentRefList.length; i++) {
            await _FilesPages.openMenu(Menu.Payments.TransferCenter);
            await _FilesPages.transferCentersPage.transferCenterfilter.input(paymentRefList[i]);
            await _FilesPages.transferCentersPage.referenceLink.click();
            await _FilesPages.uploadFilePage.loadConditionForViewFPSPage();
            await Promise.all([
                await ensure(_FilesPages.uploadFilePage.statusValueForFPS).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received, testData.status.BankRejected),
            ]);
        }
    });
});