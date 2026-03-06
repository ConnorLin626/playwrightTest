import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from "protractor";
import {NavigatePages} from "../../../pages/Navigate";
import {PaymentsPages, ApprovalsPages} from "../../../pages/IDEALX";
import {FilesPages} from "../../../pages/IDEALX/Files";

const _PaymentsPages = new PaymentsPages();
const _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let reference = '';
let fileName = '';
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('Select auth reskin', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.loginUserId : testData.IntraCompanyTransfer.UAT.loginUserId, "123123");});
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create SG ICT with select auth', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await selectApprover(testData.SelectApprover.approverName);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await Promise.all([
            await ensure(_PaymentsPages.selectApproverPage.idealXInfoMsg4SelectApprover).textContains(testData.SelectApprover.selectApproverSuccessMsg),
        ]);
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.selectApproverPage.selectedApproverName).textContains(testData.SelectApprover.approverName),
        ]);
    });

    it('FS transaction - upload by Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, testData.SelectApprover.fileName, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
            console.log(fileName);
        });
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForICTViewPage();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValue4ICT).isNotEmpty(),
        ]);
        await selectApprover(testData.SelectApprover.approverName);
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.selectApproverPage.selectedApproverName).textContains(testData.SelectApprover.approverName),
        ]);
    });

    it('FS transaction - upload by File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, testData.SelectApprover.fileName, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
            console.log(fileName);
        });
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.scrollToBottom();
        await selectApprover4ByFile(testData.SelectApprover.approverName);
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();

        await Promise.all([
            await ensure(_PaymentsPages.selectApproverPage.selectedApproverName2).textContains(testData.SelectApprover.approverName),
        ]);
    });

    it('Approve transaction - login user is not selected approver', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.approveButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.getChallenge.jsClickIfExist();
        await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input('123123123');
        await browser.sleep(3000);
        await _PaymentsPages.IntraCompanyTransferPage.approveButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.hasUXIxErrorMsg1('You cannot authorize the transaction as you are not part of the required Authorization Group. Please contact a System Administrator.').then(value => {
            if (!value) {
                throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
            }
        });
    });

    it('Approve transaction - login user is selected approver', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.groupApproverOption.select(testData.SelectApprover.approverName);
        await _PaymentsPages.IntraCompanyTransferPage.getChallenge.jsClickIfExist();
        await _PaymentsPages.IntraCompanyTransferPage.challengeResponse.input('123123123');
        await browser.sleep(3000);
        await _PaymentsPages.IntraCompanyTransferPage.approveButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.getDialogReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.IntraCompanyTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});

async function selectApprover(approverName: string): Promise<void> {
    await _PaymentsPages.selectApproverPage.selectApproveButton.click();
    await _PaymentsPages.selectApproverPage.loadCondition();
    await _PaymentsPages.selectApproverPage.approverFilter.input(approverName);
    await _PaymentsPages.selectApproverPage.approverList.selectIdealxFile(1);
    await _PaymentsPages.selectApproverPage.previewButton.click();
    await _PaymentsPages.selectApproverPage.loadCondition4Submit();
    await _PaymentsPages.selectApproverPage.submitButton.click();
}
async function selectApprover4ByFile(approverName: string): Promise<void> {
    await _PaymentsPages.selectApproverPage.selectApproveButton.click();
    await _PaymentsPages.selectApproverPage.loadCondition();
    await _PaymentsPages.selectApproverPage.approverFilter.input(approverName);
    await _PaymentsPages.selectApproverPage.selectAllApprover.jsClick();
    await _PaymentsPages.selectApproverPage.previewButton.click();
    await _PaymentsPages.selectApproverPage.loadCondition4Submit();
    await _PaymentsPages.selectApproverPage.submitButton.click();
}
