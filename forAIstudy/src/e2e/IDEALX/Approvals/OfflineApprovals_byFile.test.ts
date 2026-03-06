/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages, SwitchToSubsiPages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";
let _PaymentsPages = new PaymentsPages(); 
let _ApprovalsPages = new ApprovalsPages();
let _switchToSubsiPages = new SwitchToSubsiPages();
let fileName = "";
let fileType = 'ALL - Universal File Format';

let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData_01.json');

describe("Offline Approvals By File", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.OfflineApprovalByFile.SIT.loginCompanyId : testData.OfflineApprovalByFile.UAT.loginCompanyId, SIT ? testData.OfflineApprovalByFile.SIT.loginUserId : testData.OfflineApprovalByFile.UAT.loginUserId, testData.OfflineApprovalByFile.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });


    it("Approve Multiple Payment Select User Is In Group", async function () {
        let _selectTxnNum = [1, 2];
        let fileName = "";
        let paymentRefList = [];
        let _totalItems = 0;
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.OfflineApprovalByFile.SIT.fileNameByFile : testData.OfflineApprovalByFile.UAT.fileNameByFile, testData.OfflineApprovalByFile.approvalOptionByFile, testData.OfflineApprovalByFile.approvalCurrency).then(async data => {
            fileName = data;
        });
        // upload end
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineByFile.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        if ('' !== fileName) {
            await ensure(_ApprovalsPages.ApprovalPage.byFileAdditionFilter).isVisible();
            await _ApprovalsPages.ApprovalPage.filter.clean();
            await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        } else {
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.jsClick();
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.OfflineApprovalByFile.approvalOptionByTxn);
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
        }
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        // await _ApprovalsPages.ApprovalPage.fileList.selectFile(1);
        // await _ApprovalsPages.ApprovalPage.showTxnButton.jsClick();
        // await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        //await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.fileList1.jsClick();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick()
        await _ApprovalsPages.ApprovalPage.loadConditionForApprovePayment();
        await _ApprovalsPages.ApprovalPage.groupApproverOption.select(testData.OfflineApprovalByFile.approverOption);
        await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByFile.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.OfflineApprovalByFile.challengeResponse);
        await browser.sleep(6000)// when push approval, before click need to wail the response
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
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
            await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
            await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
            await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
            await Promise.all([
                await ensure(
                    _ApprovalsPages.uploadFilePage.viewFileStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
            ]);
        }
    });
 // Due to IDXP-287,user list will only diaply user which has access
    // it("Approve Multiple Payment Select User Is Not In Group", async function () {
    //     let _selectTxnNum = [1, 2];
    //     let fileName = "";
    //     let paymentRefList = [];
    //     let _totalItems = 0;

    //     await _FilesPages.uploadFilePage.filesMenu.click();
    //     await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.OfflineApprovalByFile.SIT.fileNameByFile : testData.OfflineApprovalByFile.UAT.fileNameByFile, testData.OfflineApprovalByFile.approvalOptionByFile, testData.OfflineApprovalByFile.approvalCurrency).then(async data => {
    //         fileName = data;
    //     });
    //     // upload end
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineByFile.click();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     if ('' !== fileName) {
    //         await ensure(_ApprovalsPages.ApprovalPage.byFileAdditionFilter).isVisible();
    //         await _ApprovalsPages.ApprovalPage.filter.clean();
    //         await _ApprovalsPages.ApprovalPage.filter.input(fileName);
    //     } else {
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.jsClick();
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.OfflineApprovalByFile.approvalOptionByTxn);
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
    //     }
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     // await _ApprovalsPages.ApprovalPage.fileList.selectFile(1);
    //     // await _ApprovalsPages.ApprovalPage.showTxnButton.jsClick();
    //     // await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     // await _ApprovalsPages.ApprovalPage.fileDetailsList.selectIdealxFile(..._selectTxnNum);
    //     await _ApprovalsPages.ApprovalPage.fileList1.jsClick();
    //     await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForApprovePayment();
    //     await _ApprovalsPages.ApprovalPage.groupApproverOption.select(testData.OfflineApprovalByFile.approverOption1);
    //     await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByFile.challengeResponse);
    //     await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.OfflineApprovalByFile.challengeResponse);
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.hasUXIxErrorMsg1('You cannot authorize the transaction as you are not part of the required Authorization Group. Please contact a System Administrator.').then(value => {
    //         if (!value) {
    //             throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
    //         }
    //     });
    // });


    // below for AB-9338
    // it("FS upload confidential file by file then select user which without confidential access to approve ", async function () {
    //     await _FilesPages.uploadFilePage.filesMenu.click();
    //     await _FilesPages.uploadFilePage.fsUpload4(_FilesPages, fileType, SIT ? testData.OfflineApprovalByFile.SIT.fileName : testData.OfflineApprovalByFile.UAT.fileName, testData.OfflineApprovalByFile.approvalOptionByFile).then(async data => {
    //         fileName = data;
    //     });
    //     await _FilesPages.uploadFilePage.refresh.jsClick();
    //     await _FilesPages.uploadFilePage.fileFilter.input(fileName);
    //     await Promise.all([
    //         await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
    //     ]);
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineByFile.click();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     await _ApprovalsPages.ApprovalPage.filter.input(fileName);
    //     await _ApprovalsPages.MyVerificationAndReleasePage.selectAllCheckBox.jsClick();;
    //     await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForApprovePayment();
    //     await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    //     await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.OfflineApprovalByFile.SIT.loginUserIdwithoutConfidential : testData.OfflineApprovalByFile.UAT.loginUserIdwithoutConfidential)
    //     await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.hasUXIxErrorMsg1(testData.OfflineApprovalByFile.errorMsg).then(value => {
    //         if (!value) {
    //             throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
    //         }
    //     });
    // });

    it("FS upload confidential file by file then select user which with confidential access to approve ", async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.OfflineApprovalByFile.SIT.fileNameByFile : testData.OfflineApprovalByFile.UAT.fileNameByFile, testData.OfflineApprovalByFile.approvalOptionByFile, testData.OfflineApprovalByFile.approvalCurrency).then(async data => {
            fileName = data;
        });
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineByFile.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await _ApprovalsPages.MyVerificationAndReleasePage.selectAllCheckBox.jsClick();;
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForApprovePayment();
        await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.OfflineApprovalByFile.SIT.selectedApprover : testData.OfflineApprovalByFile.UAT.selectedApprover)
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.approveButton.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.finishButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(fileName);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval, testData.status.Approved)
        ]);
    });

    it("Check Pending Release status for confidential file which upload via FS", async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload4(_FilesPages, fileType, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.OfflineApprovalByFile.approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await Promise.all([
            await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
        ]);
        // verify the file
        await new NavigatePages().loginIdealx(SIT ? testData.OfflineApprovalByFile.SIT.loginCompanyId : testData.OfflineApprovalByFile.UAT.loginCompanyId, SIT ? testData.OfflineApprovalByFile.SIT.verifyUserId : testData.OfflineApprovalByFile.UAT.verifyUserId, testData.OfflineApprovalByFile.UAT.pin123ID)
        await _ApprovalsPages.ApprovalPage.approvalMenu.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyByFileTab.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await _ApprovalsPages.MyVerificationAndReleasePage.selectAllCheckBox.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.fileVerifyBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.previewFileBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        //aprrove the file to change the status to pending release
        await _ApprovalsPages.ApprovalPage.approvalMenu.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await _ApprovalsPages.MyVerificationAndReleasePage.selectAllCheckBox.jsClick();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByFile.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        // user with confidential access to login 
        await new NavigatePages().loginIdealx(SIT ? testData.OfflineApprovalByFile.SIT.loginCompanyId : testData.OfflineApprovalByFile.UAT.loginCompanyId, SIT ? testData.OfflineApprovalByFile.SIT.verifyUserId : testData.OfflineApprovalByFile.UAT.verifyUserId, testData.OfflineApprovalByFile.UAT.pin123ID)
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseByFileTab.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForMyReleaseByFile();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await Promise.all([
            await ensure(_ApprovalsPages.MyVerificationAndReleasePage.fileNameButton).textContains(fileName),
        ]);
        //use user without confidential access to login AUTOSG01U06
        await new NavigatePages().loginIdealx(SIT ? testData.OfflineApprovalByFile.SIT.loginCompanyId : testData.OfflineApprovalByFile.UAT.loginCompanyId, SIT ? testData.OfflineApprovalByFile.SIT.loginUserIdwithoutConfidential : testData.OfflineApprovalByFile.UAT.loginUserIdwithoutConfidential, testData.OfflineApprovalByFile.UAT.pin123ID)
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseByFileTab.click();
        await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await Promise.all([
            await ensure(_ApprovalsPages.MyVerificationAndReleasePage.labelNoInformationDisplay).textIs(testData.OfflineApprovalByFile.labelNoInformationDisplay)
        ]);
    });


    // Add for AB-9099: check offline approve file via user has (not) file approve access
    // it('Offline Approve file via User Has(not) File - approve function', async function () {
    //     await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId, "123456")
    //     let _selectTxnNum = [1, 2];
    //     let fileName = "";
    //     let paymentRefList = [];
    //     let _totalItems = 0;
    //     await _FilesPages.uploadFilePage.filesMenu.click();
    //     await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.OfflineApprovalByFile.SIT.fileName : testData.OfflineApprovalByFile.UAT.fileName, testData.OfflineApprovalByFile.approvalOptionByFile, testData.OfflineApprovalByFile.approvalCurrency).then(async data => {
    //         fileName = data;
    //     });
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineByFile.click();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     if ('' !== fileName) {
    //         await ensure(_ApprovalsPages.ApprovalPage.byFileAdditionFilter).isVisible();
    //         await _ApprovalsPages.ApprovalPage.filter.clean();
    //         await _ApprovalsPages.ApprovalPage.filter.input(fileName);
    //     } else {
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.jsClick();
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.OfflineApprovalByFile.approvalOptionByTxn);
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
    //     }
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     await _ApprovalsPages.ApprovalPage.fileList1.jsClick();
    //     await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForApprovePayment();
    //     await _ApprovalsPages.ApprovalPage.SelectUser.select(testData.OfflineApprovalByFile.ModifyUserB);
    //     await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByFile.challengeResponse);
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.hasUXIxErrorMsg1(testData.OfflineApprovalByFile.messageToApprove);
    //     await _ApprovalsPages.ApprovalPage.SelectUser.select(testData.OfflineApprovalByFile.ModifyUserA);
    //     await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByFile.challengeResponse);
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
    //     await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
    //         fileName = value;
    //     });
    //     await _ApprovalsPages.ApprovalPage.completeTotalItems.getText().then(async items => {
    //         _totalItems = parseInt(items);
    //     });
    //     await _ApprovalsPages.ApprovalPage.getApproveTransactionRef(_totalItems).then(async list => {
    //         paymentRefList = list;
    //     });
    //     await _ApprovalsPages.uploadFilePage.filesMenu.click();
    //     await _ApprovalsPages.uploadFilePage.loadCondition();
    //     await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
    //     await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
    //     await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
    //     await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
    //     for (let i = 0; i < paymentRefList.length; i++) {
    //         await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
    //         await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
    //         await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
    //         await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
    //         await Promise.all([
    //             await ensure(
    //                 _ApprovalsPages.uploadFilePage.viewFileStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
    //         ]);
    //     }
    // });

    // it("Offline Approve file via User Has(not) File - approve function at subsi company ", async function () {
    //     await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId, "123456")
    //     let _selectTxnNum = [1, 2];
    //     let fileName = "";
    //     let paymentRefList = [];
    //     let _totalItems = 0;
    //     await _FilesPages.uploadFilePage.companyMenu.click();
    //     await _FilesPages.uploadFilePage.selectCompany.click();
    //     await _FilesPages.uploadFilePage.searchCompany.input(SIT ? "KING QUEEN HOLDINGS LTD" : "KING QUEEN HOLDINGS LTD");
    //     await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
    //     await _switchToSubsiPages.viewSubsiPage.loadCondition();
    //     await _FilesPages.uploadFilePage.filesMenu.click();
    //     await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.OfflineApprovalByFile.SIT.SubsifileName : testData.OfflineApprovalByFile.UAT.SubsifileName, testData.OfflineApprovalByFile.approvalOptionByFile, testData.OfflineApprovalByFile.approvalCurrency).then(async data => {
    //         fileName = data;
    //     });
    //     // upload end
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineByFile.click();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     if ('' !== fileName) {
    //         await ensure(_ApprovalsPages.ApprovalPage.byFileAdditionFilter).isVisible();
    //         await _ApprovalsPages.ApprovalPage.filter.clean();
    //         await _ApprovalsPages.ApprovalPage.filter.input(fileName);
    //     } else {
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.jsClick();
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.OfflineApprovalByFile.approvalOptionByTxn);
    //         await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
    //     }
    //     await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
    //     await _ApprovalsPages.ApprovalPage.fileList1.jsClick();
    //     await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForApprovePayment();
    //     await _ApprovalsPages.ApprovalPage.SelectUser.select(testData.OfflineApprovalByFile.ModifyUserA);
    //     await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByFile.challengeResponse);
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.hasUXIxErrorMsg1(testData.OfflineApprovalByFile.messageToApprove);
    //     await _ApprovalsPages.ApprovalPage.SelectUser.select(testData.OfflineApprovalByFile.ModifyUserB);
    //     await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByFile.challengeResponse);
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
    //     await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
    //         fileName = value;
    //     });
    //     await _ApprovalsPages.ApprovalPage.completeTotalItems.getText().then(async items => {
    //         _totalItems = parseInt(items);
    //     });
    //     await _ApprovalsPages.ApprovalPage.getApproveTransactionRef(_totalItems).then(async list => {
    //         paymentRefList = list;
    //     });
    //     await _ApprovalsPages.uploadFilePage.filesMenu.click();
    //     await _ApprovalsPages.uploadFilePage.loadCondition();
    //     await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
    //     await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
    //     await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
    //     await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
    //     for (let i = 0; i < paymentRefList.length; i++) {
    //         await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
    //         await _ApprovalsPages.uploadFilePage.viewFileRef.clean();
    //         await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
    //         await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
    //         await Promise.all([
    //             await ensure(
    //                 _ApprovalsPages.uploadFilePage.viewFileStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
    //         ]);
    //     }
    // });

});
