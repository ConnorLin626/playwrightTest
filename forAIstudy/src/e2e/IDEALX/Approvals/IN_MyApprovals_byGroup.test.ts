/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let groupName = '';
let reference = '';
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('IN_testData.json');
let fileName = "";

let createNewGroup = async function () {
    let index = 10;
    await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.showAdditionFilter.jsClick();
    await _ApprovalsPages.transferCentersPage.scrollTo(0, 500);
    await _ApprovalsPages.transferCentersPage.transactionStatusList.select(testData.status.PendingApproval);
    await _ApprovalsPages.transferCentersPage.fileNameFileter.input(fileName)
    await _ApprovalsPages.transferCentersPage.searchButton.jsClick();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    // await _ApprovalsPages.transferCentersPage.getFirstCheckBox(10).then(data => {
    //     index = data + 1;
    // });
    // await _ApprovalsPages.transferCentersPage.transactionList.select(index);
    await _ApprovalsPages.transferCentersPage.transferCenterSelectButton.jsClick();
    await _ApprovalsPages.transferCentersPage.createGroupButton.jsClick();
    await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
    await _ApprovalsPages.transferCentersPage.groupCreateButton.jsClick();

    await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
};

describe("IN_My Approvals By Group", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByGroup.SIT.loginCompanyId : testData.MyApprovalByGroup.UAT.loginCompanyId, SIT ? testData.MyApprovalByGroup.SIT.loginUserId : testData.MyApprovalByGroup.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Approve Group in the My Approval List", async function () {
        this.timeout(420000);
        await _FilesPages.uploadFilePage.filesMenu.click()
        let _selectGroupCount = [1];
        await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApprovalByGroup.SIT.fileNameByTxn : testData.MyApprovalByGroup.UAT.fileNameByTxn, testData.MyApprovalByGroup.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        console.log(fileName)
        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byGroupButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.ApprovalPage.scrollToBottom();
        await _ApprovalsPages.ApprovalPage.groupApproveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForPreviewApproval();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.click();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByGroup.challengeResponse);
        await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        // await _ApprovalsPages.transferCentersPage.loadConditionGroupList();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition2();
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
        await _ApprovalsPages.ApprovalPage.scrollToBottom();
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
        //await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
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
        await _ApprovalsPages.ApprovalPage.groupApproverOption.select(SIT ? testData.MyApprovalByGroup.SIT.approverOption : testData.MyApprovalByGroup.UAT.approverOption);
       // await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByGroup.challengeResponse);
        await _ApprovalsPages.transferCentersPage.groupApproveAllButton.jsClick();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
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
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
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
        //await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.ApprovalPage.groupList1.jsClick();
        await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.transferCentersPage.groupRejectButton.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.MyApprovalByGroup.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await browser.sleep(5000);
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await _ApprovalsPages.transferCentersPage.viewGroupFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.viewGroupListStatus).textContains(testData.status.Rejected),
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
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.jsClick();
        //await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.ApprovalPage.groupList1.jsClick();
        await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.transferCentersPage.groupRemoveButton.jsClick();
        await _ApprovalsPages.transferCentersPage.removeDialogButton.jsClick();
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.transferCentersPage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.loadOfflineGroup();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.labelNoInformationDisplay).textIs(testData.MyApprovalByGroup.labelNoInformationDisplay),
        ]);
    });

});
