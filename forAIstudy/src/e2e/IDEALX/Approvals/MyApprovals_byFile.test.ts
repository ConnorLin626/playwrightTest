/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData_01.json');
let _selectFileCount = [1];
let fileName1 = '';
let fileName2 = '';

describe("My Approvals By File", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByFile.SIT.loginCompanyId : testData.MyApprovalByFile.UAT.loginCompanyId, SIT ? testData.MyApprovalByFile.SIT.loginUserId : testData.MyApprovalByFile.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Approve Single File", async function () {
        let _selectFileCount = [1];
        let fileName = '';
        let _totalItems = 0;
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApprovalByFile.SIT.fileNameByFile : testData.MyApprovalByFile.UAT.fileNameByFile, testData.MyApprovalByFile.approvalOptionByFile, testData.MyApprovalByFile.approvalCurrency).then(async data => {
            fileName = data;
        });
        // upload end 
        let paymentRefList = [];
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        if ('' !== fileName) {
            await ensure(_ApprovalsPages.ApprovalPage.filter).isVisible();
            await _ApprovalsPages.ApprovalPage.filter.clean();
            await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        } else {
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.click();
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApprovalByFile.approvalOptionByFile);
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
        }
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(..._selectFileCount);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByFile.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
            fileName = value;
        });
        await _ApprovalsPages.ApprovalPage.completeTotalItems.getText().then(async items => {
            _totalItems = parseInt(items);
        });
        await _ApprovalsPages.ApprovalPage.getApproveTransactionRef(_totalItems).then(async list => {
            paymentRefList = list;
        });
        await _ApprovalsPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.loadCondition();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
        await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
        await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
        for (let i = 0; i < paymentRefList.length; i++) {
            await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
            await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
            await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
            await Promise.all([
                await ensure(_ApprovalsPages.uploadFilePage.viewFileStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
            ]);
        }
    });

    it("Approve Multiple Payment", async function () {
        let _selectTxnNum = [1, 2];
        let fileName = "";
        let paymentRefList = [];
        let _totalItems = 0;
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApprovalByFile.SIT.fileNameByFile : testData.MyApprovalByFile.UAT.fileNameByFile, testData.MyApprovalByFile.approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        // upload end 
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        if ('' !== fileName) {
            await ensure(_ApprovalsPages.ApprovalPage.filter).isVisible();
            await _ApprovalsPages.ApprovalPage.filter.clean();
            await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        } else {
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.click();
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApprovalByFile.approvalOptionByTxn);
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
        }
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.showTxnButton.jsClick();
        await _ApprovalsPages.ApprovalPage.payment1.jsClick()
        await _ApprovalsPages.ApprovalPage.payment2.jsClick()
        //await _ApprovalsPages.ApprovalPage.fileDetailsList.selectFileTxn(..._selectTxnNum);
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForApprovePayment();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByFile.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
            fileName = value;
        });
        await _ApprovalsPages.ApprovalPage.completeTotalItems.getText().then(async items => {
            _totalItems = parseInt(items);
        });
        await _ApprovalsPages.ApprovalPage.getApproveTransactionRef(_totalItems).then(async list => {
            paymentRefList = list;
        });

        // await devWatch();
        await _ApprovalsPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.loadCondition();
        await ensure(_ApprovalsPages.uploadFilePage.fileNameFilter).isVisible();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
        await browser.sleep(2000);
        await ensure(_ApprovalsPages.uploadFilePage.fileNameLink).isElementPresent();
        await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
        await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
        for (let i = 0; i < paymentRefList.length; i++) {
            await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
            await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
            await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
            await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
            await Promise.all([
                await ensure(_ApprovalsPages.uploadFilePage.viewFileStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
            ]);
        }
    });

    it("Reject Single Payment", async function () {
        let _selectFileCount = [1];
        let _selectTxnCount = 1;
        let fileNameList = [];
        let fileName = '';
        let paymentRefList = [];
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApprovalByFile.SIT.fileNameByFile : testData.MyApprovalByFile.UAT.fileNameByFile, testData.MyApprovalByFile.approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        // upload end 

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        if ('' !== fileName) {
            await ensure(_ApprovalsPages.ApprovalPage.filter).isVisible();
            await _ApprovalsPages.ApprovalPage.filter.clean();
            await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        } else {
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.click();
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApprovalByFile.approvalOptionByTxn);
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
        }
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.showTxnButton.jsClick();
        await _ApprovalsPages.ApprovalPage.payment1.jsClick()
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        //await _ApprovalsPages.ApprovalPage.fileDetailsList.selectFileTxn(_selectTxnCount);
        await _ApprovalsPages.ApprovalPage.getListFileName(_selectFileCount).then(async _fileNme => {
            fileNameList = _fileNme;
        });
        await _ApprovalsPages.ApprovalPage.getListTxnRef(_selectTxnCount).then(async _txnRef => {
            paymentRefList = _txnRef;
        });
        await _ApprovalsPages.ApprovalPage.fileRejectBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(
            testData.MyApprovalByFile.rejectReason
        );
        await ensure(_ApprovalsPages.ApprovalPage.reasonForRejection).textIs(testData.MyApprovalByFile.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        //await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        // await Promise.all([
        //   await ensure(_ApprovalsPages.ApprovalPage).isUXRejectDialogSuccess() //has success message.
        // ]);

        await _ApprovalsPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.loadCondition();
        await ensure(_ApprovalsPages.uploadFilePage.fileNameFilter).isVisible();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileNameList[0]);
        await browser.sleep(1000);
        await ensure(_ApprovalsPages.uploadFilePage.fileNameLink).isElementPresent();
        await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
        await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
        await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
        await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
        await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[0]);
        await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
        await ensure(
            _ApprovalsPages.uploadFilePage.viewFileStatus).textIs(testData.status.Rejected);
    });

    // add AB-8607

    it('Upload New UFF Payroll with 5 transaction via By File', async function () {
        let fileName = '';
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.loadCondition();
        await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForSAL : testData.FileService.SIT.fileNameForSAL, testData.FileService.approvalOptionByFile).then(async data => {
            fileName = data;
        });

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        if ('' !== fileName) {
            await ensure(_ApprovalsPages.ApprovalPage.filter).isVisible();
            await _ApprovalsPages.ApprovalPage.filter.clean();
            await _ApprovalsPages.ApprovalPage.filter.input(fileName);
            console.log(1)
        } else {
            await _ApprovalsPages.ApprovalPage.filter.input("SG_SAL_FSUpload_NUFF");
        }
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(..._selectFileCount);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.FileService.challengeResponse);
        //await browser.sleep(3000);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
            fileName = value;
        });
        await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
            fileName = value;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await browser.sleep(300);
        await _PaymentsPages.BulkCollectionPage.loadConditionForViewBulkCollectionPage();
        await _ApprovalsPages.uploadFilePage.scrollTo(0,800);
        await browser.sleep(500);
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.amountView).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.Approved),
        ]);

    });

    it("Reject Multiple File", async function () {
        this.timeout(420000);
        let _selectFileCount = [1, 2];
        let fileNameList = [];
        //upload part start
        for (let i = 0; i < _selectFileCount.length; i++) {
            await _FilesPages.uploadFilePage.filesMenu.click();
            await _ApprovalsPages.uploadFilePage.fsUpload7(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApprovalByFile.SIT.fileNameByFile : testData.MyApprovalByFile.UAT.fileNameByFile, testData.MyApprovalByFile.approvalOptionByFile, testData.MyApprovalByFile.approvalCurrency).then(async data => {
                if (data !== '') {
                    fileNameList.push(data);
                }
            });
        }
        fileName1 = fileNameList[0];
        fileName2 = fileNameList[1];
        // upload part end
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        if (fileNameList.length === 0) {
            await _ApprovalsPages.ApprovalPage.filter.click();
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApprovalByFile.approvalOptionByFile);
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
            await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
            await _ApprovalsPages.ApprovalPage.getListFileName(_selectFileCount).then(async _fileNme => {
                fileNameList = _fileNme;
            });
        }
        await _ApprovalsPages.ApprovalPage.filter.input(fileNameList[0]);
        await _ApprovalsPages.ApprovalPage.SelectFile.jsClick();
        await _ApprovalsPages.ApprovalPage.filter.input(fileNameList[1]);
        await _ApprovalsPages.ApprovalPage.SelectFile.jsClick();
        
        await _ApprovalsPages.ApprovalPage.scrollToBottom();
        await _ApprovalsPages.ApprovalPage.fileRejectBtn.click();
        await browser.sleep(2000);
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.MyApprovalByFile.rejectReason);
       // await ensure(_ApprovalsPages.ApprovalPage.reasonForRejection).textIs(testData.MyApprovalByFile.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        //await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        // await Promise.all([
        //   await ensure(_ApprovalsPages.ApprovalPage).isUXRejectDialogSuccess() //has success message.
        // ]);
        await _ApprovalsPages.ApprovalPage.loadConditionForRejectDismiss();
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _ApprovalsPages.ApprovalPage.loadCondition2();
    });

    it("Check Reject Multiple File", async function () {
        this.timeout(420000);
        await _ApprovalsPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.loadCondition2();
        await ensure(_ApprovalsPages.uploadFilePage.fileNameFilter).isVisible();
        // await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName1);
        await browser.sleep(2000);
        await ensure(_ApprovalsPages.uploadFilePage.fileNameLink).isElementPresent();
        await _ApprovalsPages.uploadFilePage.fileNameLink.click();
        await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage3();
        await _ApprovalsPages.uploadFilePage.scrollTo(0,800);
        await Promise.all([
            await ensure(_ApprovalsPages.uploadFilePage.viewFileTransactionStatus1).textIs(testData.status.Rejected),
            await ensure(_ApprovalsPages.uploadFilePage.viewFileTransactionStatus2).textIs(testData.status.Rejected)
        ]);
        await _ApprovalsPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.loadCondition2();
        await ensure(_ApprovalsPages.uploadFilePage.fileNameFilter).isVisible();
        // await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName2);
        await browser.sleep(2000);
        await ensure(_ApprovalsPages.uploadFilePage.fileNameLink).isElementPresent();
        await _ApprovalsPages.uploadFilePage.fileNameLink.click();
        await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage3();
        await _ApprovalsPages.uploadFilePage.scrollTo(0,800);
        await Promise.all([
            await ensure(_ApprovalsPages.uploadFilePage.viewFileTransactionStatus1).textIs(testData.status.Rejected),
            await ensure(_ApprovalsPages.uploadFilePage.viewFileTransactionStatus2).textIs(testData.status.Rejected)
        ]);
        
    });

});