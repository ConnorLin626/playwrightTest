/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages } from "../../../pages/IDEALX";
import { saveScreen, ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let groupName = '';
let reference = '';
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData_01.json');
let fileName = "";

let createNewGroup = async function () {
    let index = 10;
    await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(fileName)
    await browser.sleep(1000);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.payment1.jsClick();
    await _ApprovalsPages.transferCentersPage.createGroupButton.jsClick();
    await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
    await _ApprovalsPages.transferCentersPage.groupCreateButton.jsClick();
    await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
};

describe("Offline Approvals By Group", async function () { 
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.OfflineApprovalByGroup.SIT.loginCompanyId : testData.OfflineApprovalByGroup.UAT.loginCompanyId, SIT ? testData.OfflineApprovalByGroup.SIT.loginUserId : testData.OfflineApprovalByGroup.UAT.loginUserId, testData.OfflineApprovalByGroup.UAT.pin123ID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Approve Group in the Offline Approval List", async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForALL : testData.FileService.UAT.fileNameForALL, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await browser.sleep(6000)
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();

        let _selectGroupCount = [1];

        await createNewGroup();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition(); 
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineByGroup.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
        await _ApprovalsPages.ApprovalPage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.ApprovalPage.groupApproveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForPreviewApproval();
        await _ApprovalsPages.ApprovalPage.groupApproverOption.select(testData.OfflineApprovalByGroup.approverOption);
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByGroup.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.OfflineApprovalByGroup.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected)
        ]);
    });
});
