/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, FilesPages, ApprovalsPages,PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('HKB_testData.json');
let fileType = "ALL - Universal File Format"

describe('HKBR FPS File Services', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FileService.SIT.loginCompanyId : testData.FileService.UAT.loginCompanyId, SIT ? testData.FileService.SIT.loginUserId : testData.FileService.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    let fileName = '';

    it('Upload HKBR FPS File with All Proxy - By File and with Purpose code - e-Lai See', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameForFPSProxy : testData.FileService.UAT.fileNameForFPSProxy, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFPSPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForFPS).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForFPS).isNotEmpty(),
            await ensure(_PaymentsPages.FPSPaymentPage.PurposeCodeValue).textContains(testData.HKBRFPSPayment.PurposeCode1)
        ]);
    });

    it('Approve HKL FPS File via My Approvals (New UI)', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewByTx();
        await _ApprovalsPages.ApprovalPage.newByFileButton.click();
        await _ApprovalsPages.ApprovalPage.filter.click();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.MyVerificationAndReleasePage.selectAllCheckBox.jsClick();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForReview();
        await _ApprovalsPages.ApprovalPage.reviewApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.FileService.challengeResponse);
        await browser.sleep(1200);
        await _ApprovalsPages.ApprovalPage.confirmApproveBtn.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _FilesPages.AccountTransferPage.paymentMenu.click();
        await _FilesPages.TransferCentersPage.loadCondition();
        await _FilesPages.TransferCentersPage.transferCenterFilter.input(fileName);
        await _FilesPages.TransferCentersPage.loadCondition();
        await _FilesPages.TransferCentersPage.refLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFPSPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForFPS).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.amountValueForFPS).isNotEmpty(),
            await ensure(_FilesPages.uploadFilePage.statusValueForFPS).textContainsLessOne(testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Approved, testData.status.Received, testData.status.BankRejected, testData.status.Completed),
        ]);
    });

    it('Upload HKBR FPS File with tansactioncode=38 and 98', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.FileService.SIT.fileNameCollection : testData.FileService.UAT.fileNameCollection, testData.FileService.approvalOptionTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();

        await Promise.all([
            await ensure(_PaymentsPages.BulkCollectionPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkCollectionPage.amountValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionCodeView).isNotEmpty(),
            await ensure(_PaymentsPages.BulkCollectionPage.accountNumberValue).isNotEmpty(),
            await ensure(_PaymentsPages.BulkCollectionPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
        ]);
    });

});