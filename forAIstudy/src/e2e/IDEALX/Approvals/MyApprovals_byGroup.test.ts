/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let groupName = '';
let reference = '';
let _ApprovalsPages = new ApprovalsPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData_01.json');
let fileName = "";
let _FilesPages = new FilesPages();

let createNewGroup = async function () {
    let index = 10;
    await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.showAdditionFilter.jsClick();
    await _ApprovalsPages.transferCentersPage.scrollTo(0, 500);
    await _ApprovalsPages.transferCentersPage.transactionStatusList.select(testData.status.PendingApproval);
    //await _ApprovalsPages.transferCentersPage.transactionStatus.jsClickIfExist();
    // FS Part already upload many txn via By Transaction,search these txn to group
    // if (SIT) {
    //     fileName = testData.FileService.SIT.fileNameForALL.split('/').pop();
    // } else {
    //     fileName = testData.FileService.UAT.fileNameForALL.split('/').pop();
    // }
    console.error("FileNameToMyApprovalGroup:" + fileName);
    await _ApprovalsPages.transferCentersPage.fileNameFileter.clean();
    await _ApprovalsPages.transferCentersPage.fileNameFileter.input(fileName);
    await _ApprovalsPages.transferCentersPage.searchButton.jsClick();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    // await _ApprovalsPages.transferCentersPage.getFirstCheckBox(10).then(data => {
    //     index = data + 1;
    // });
    //await _ApprovalsPages.transferCentersPage.transactionList.selectIdealxFile(1);
    await _ApprovalsPages.transferCentersPage.payment1.jsClick();
    await _ApprovalsPages.transferCentersPage.createGroupButton.jsClick();
    await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
    await _ApprovalsPages.transferCentersPage.groupCreateButton.jsClick();
    await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
};

describe("My Approvals By Group", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByGroup.SIT.loginCompanyId : testData.MyApprovalByGroup.UAT.loginCompanyId, SIT ? testData.MyApprovalByGroup.SIT.loginUserId : testData.MyApprovalByGroup.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
 
    it('Upload New UFF with All Payment Types via By Transaction', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForALL : testData.FileService.UAT.fileNameForALL, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage2();
        await _FilesPages.uploadFilePage.paymentReferenceLink1.jsClick();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.fromAccountValueForGIRO).isNotEmpty(),
        ]);
    });

    it("Approve Group in the My Approval List", async function () {
        let _selectGroupCount = [1];

        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.ApprovalPage.groupApproveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForPreviewApproval();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByGroup.challengeResponse);
        await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.ApprovalPage.groupButton.jsClick();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it("Reject Group in the My Approval List", async function () {
        let _selectFileCount = [1];

        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectFileCount);
        await _ApprovalsPages.ApprovalPage.groupRejectButton.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.MyApprovalByGroup.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        await ensure(_ApprovalsPages.ApprovalPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textIs(testData.status.Rejected),
        ]);
    });

    it("Approve All in the View Group Page", async function () {

        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.jsClick();
        await _ApprovalsPages.transferCentersPage.groupApproveAllButton.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByGroup.challengeResponse);
        await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.transferCentersPage.groupApproveAllButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it("Offline Approve in the View Group Page", async function () {

        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.jsClick();
        await _ApprovalsPages.transferCentersPage.groupApproveAllButton.jsClick();
        await _ApprovalsPages.ApprovalPage.groupApproverOption.select(testData.MyApprovalByGroup.approverOption);
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByGroup.challengeResponse);
        await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.transferCentersPage.groupApproveAllButton.jsClick();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it("Reject transaction in the View Group Page", async function () {
        let _selectGroupCount = [1];

        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.jsClick();
        await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.transferCentersPage.groupRejectButton.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.MyApprovalByGroup.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await _ApprovalsPages.transferCentersPage.viewGroupFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.viewGroupListStatus).textIs(testData.status.Rejected),
        ]);
    });

    it("Remove transaction in the View Group Page", async function () {
        let _selectGroupCount = [1];

        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.click();
        await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.transferCentersPage.groupRemoveButton.jsClick();
        await _ApprovalsPages.transferCentersPage.removeDialogButton.click();
        await _ApprovalsPages.transferCentersPage.loadConditionForDismiss();
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.transferCentersPage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.loadOfflineGroup();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.labelNoInformationDisplay).textIs(testData.MyApprovalByGroup.labelNoInformationDisplay),
        ]);
    });

    it("Reject All in the View Group Page", async function () {

        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.jsClick();
        await _ApprovalsPages.transferCentersPage.groupRejectAllButton.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.MyApprovalByGroup.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        await browser.sleep(3000);
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textIs(testData.status.Rejected),
        ]);
    });
});