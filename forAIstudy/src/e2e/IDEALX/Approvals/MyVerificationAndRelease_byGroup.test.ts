/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, PaymentsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let groupName = ''; 
let reference = '';
let _selectGroupCount = [1];
let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData_01.json');

let createNewGroup = async function () {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.makePayment.click();
    await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
    await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
    await _PaymentsPages.AccountTransferPage.newPayeeTab.jsClick();
    await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
    await _PaymentsPages.AccountTransferPage.Country.select(testData.AccountTransfer.Country);
    await _PaymentsPages.AccountTransferPage.payeeBank.select('DBS Bank SINGAPORE');
    await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.AccountTransfer.newPayeeAcctNumber);
    await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.AccountTransfer.newPayeeName);
    await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.AccountTransfer.newPayeeNickname);
    await _PaymentsPages.BeneficiaryPage.addAddress.click();
    await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
    await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
    await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.AccountTransfer.newPayeeAdd1);
    await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.AccountTransfer.newPayeeAdd2);
    await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
    await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
    await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
    await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
    await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
    await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
    await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
    await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
    await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
    await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
    await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
    await _PaymentsPages.AccountTransferPage.nextButton.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    await _PaymentsPages.AccountTransferPage.submitButton.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
        reference = text;
    });
    await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
    await _ApprovalsPages.transferCentersPage.transferCenterSelectButton.jsClick();
    await _ApprovalsPages.transferCentersPage.createGroupButton.jsClick();
    await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
    await _ApprovalsPages.transferCentersPage.groupCreateButton.jsClick();
    await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
};

let createNewGroupWithExisting = async function () {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.makePayment.click();
    await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
    await _PaymentsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
    await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
    await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
    await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
    await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
    await _PaymentsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
    await _PaymentsPages.AccountTransferPage.emailId2.input(testData.AccountTransfer.emailId2);
    await _PaymentsPages.AccountTransferPage.emailId3.input(testData.AccountTransfer.emailId3);
    await _PaymentsPages.AccountTransferPage.emailId4.input(testData.AccountTransfer.emailId4);
    await _PaymentsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
    await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
    await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
    await _PaymentsPages.AccountTransferPage.nextButton.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    await _PaymentsPages.AccountTransferPage.submitButton.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
        reference = text;
    });
    await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
    await _ApprovalsPages.transferCentersPage.transferCenterSelectButton.jsClick();
    await _ApprovalsPages.transferCentersPage.createGroupButton.jsClick();
    await _ApprovalsPages.transferCentersPage.loadCreateGroupCondition();
    await _ApprovalsPages.transferCentersPage.groupCreateButton.jsClick();
    await _ApprovalsPages.transferCentersPage.cancelCreatePDFButton.click();
};

export async function verifyGroupInVerifyList() {
    await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    await _ApprovalsPages.ApprovalPage.loadCondition();
    await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
    //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
    await _ApprovalsPages.MyVerificationAndReleasePage.groupButton.jsClick();
    await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByGroup();
    await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
        groupName = text.trim();
    });
    await _ApprovalsPages.MyVerificationAndReleasePage.byTxnFilter.input(groupName);
    await _ApprovalsPages.MyVerificationAndReleasePage.groupList1.jsClick();
    //await _ApprovalsPages.MyVerificationAndReleasePage.groupList.selectIdealxFile(..._selectGroupCount);
    await _ApprovalsPages.MyVerificationAndReleasePage.groupVerifyButton.jsClick();
    await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForPrivewVerifyGroupPage();
    await _ApprovalsPages.MyVerificationAndReleasePage.PreviewVerifyReleaseButton.jsClick();
    await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForCompletedPage();
};

export async function approvalGroupInApprovalList() {
    await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    await _ApprovalsPages.ApprovalPage.loadCondition();
    await _ApprovalsPages.ApprovalPage.byGroupButton.jsClick();
    await _ApprovalsPages.ApprovalPage.loadConditionForByGroup();
    await _ApprovalsPages.ApprovalPage.GroupFilter.input(groupName);
    await _ApprovalsPages.MyVerificationAndReleasePage.groupList1.jsClick();
    //await _ApprovalsPages.ApprovalPage.groupList.selectIdealxFile(..._selectGroupCount);
    await _ApprovalsPages.ApprovalPage.groupApproveButton.jsClick();
    await _ApprovalsPages.ApprovalPage.loadConditionForPreviewApproval();
    await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
    await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.VerificationAndReleasesByGroup.challengeResponse);
    await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
};

export async function releaseGroupInReleaseList() {
    await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    await _ApprovalsPages.ApprovalPage.loadCondition();
    await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
    //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
    await _ApprovalsPages.MyVerificationAndReleasePage.byGroupButton.jsClick();
    await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByGroup();
    await _ApprovalsPages.ApprovalPage.GroupFilter.input(groupName);
    await _ApprovalsPages.MyVerificationAndReleasePage.groupList1.jsClick();
    //await _ApprovalsPages.MyVerificationAndReleasePage.groupList.selectIdealxFile(..._selectGroupCount);
    await _ApprovalsPages.MyVerificationAndReleasePage.groupReleaseButton.jsClick();
    await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForPrivewReleaseGroupPage();
    await _ApprovalsPages.MyVerificationAndReleasePage.PreviewVerifyReleaseButton.jsClick();
    await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForCompletedPage();
};

describe("My Verify-Release By Group", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Verify Group in the My Verification List", async function () {
        await createNewGroup();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await verifyGroupInVerifyList();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it("Release Group in the My Release List", async function () {
        await approvalGroupInApprovalList();
        await releaseGroupInReleaseList();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it("Reject Group in the My Verification List", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID);
        await createNewGroup();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.groupButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByGroup();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.GroupFilter.input(groupName);
        // await _ApprovalsPages.MyVerificationAndReleasePage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.MyVerificationAndReleasePage.groupList1.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.groupRejectButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection.input(testData.VerificationAndReleasesByGroup.rejectReason);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectDialogButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForDismiss();
        await ensure(_ApprovalsPages.MyVerificationAndReleasePage).isUXRejectDialogSuccess();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await _ApprovalsPages.transferCentersPage.scrollTo(0,500);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Rejected)
        ]);
    });

    it("Verify all in verifications view group page", async function () {
        this.timeout(420000)
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID);
        await createNewGroup();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.groupButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByGroup();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseAllButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseConfirmButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForDismiss();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textIs(testData.status.PendingApproval),
        ]);
    });

    it("Release all in releases view group page - create new group", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID);
        await createNewGroup();
    });
    it("Release all in releases view group page - release group", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await verifyGroupInVerifyList();
        await approvalGroupInApprovalList();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByGroup();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseAllButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseConfirmButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForDismiss2();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition2();
        await _ApprovalsPages.ApprovalPage.groupButton.click();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        // await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await _ApprovalsPages.transferCentersPage.scrollTo(0,500);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it("Reject all in verification view group page", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID);
        await createNewGroupWithExisting();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.groupButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByGroup();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.jsClick();
        await _ApprovalsPages.transferCentersPage.groupRejectAllButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection.input(testData.VerificationAndReleasesByGroup.rejectReason);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectDialogButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForDismiss();
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
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

    it("Reject all in releases view group page", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID);
        await createNewGroupWithExisting();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await verifyGroupInVerifyList();
        await approvalGroupInApprovalList();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByGroup();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.jsClick();
        await _ApprovalsPages.transferCentersPage.groupRejectAllButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection.input(testData.VerificationAndReleasesByGroup.rejectReason);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectDialogButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForDismiss();
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
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

    it("Reject transaction in verification view group page", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID);
        await createNewGroup();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.groupButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByGroup();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.jsClick();
        await _ApprovalsPages.ApprovalPage.groupList1.jsClick();
        // await _ApprovalsPages.MyVerificationAndReleasePage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.transferCentersPage.groupRejectButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection.input(testData.VerificationAndReleasesByGroup.rejectReason);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectDialogButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForDismiss();
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.groupButton.jsClick();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await _ApprovalsPages.transferCentersPage.viewGroupFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.viewGroupListStatus).textIs(testData.status.Rejected),
        ]);
    });

    it("Reject transaction in releases view group page", async function () {
        this.timeout(420000);
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID);
        await createNewGroup();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await verifyGroupInVerifyList();
        await approvalGroupInApprovalList();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByGroup();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.jsClick();
        await _ApprovalsPages.ApprovalPage.groupList1.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.transferCentersPage.viewGroupReferenceLink.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.transferCentersPage.groupRejectButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection.input(testData.VerificationAndReleasesByGroup.rejectReason);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectDialogButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForDismiss();
        await ensure(_ApprovalsPages.transferCentersPage).isUXRejectDialogSuccess();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
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

    it("Reject Group in the My Release List", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.loginUserId : testData.VerificationAndReleasesByGroup.UAT.loginUserId, testData.VerificationAndReleasesByGroup.UAT.pinID);
        await createNewGroup();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByGroup.SIT.loginCompanyId : testData.VerificationAndReleasesByGroup.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByGroup.SIT.verifyUserId : testData.VerificationAndReleasesByGroup.UAT.verifyUserId, testData.VerificationAndReleasesByGroup.UAT.pin123ID);
        await verifyGroupInVerifyList();
        await approvalGroupInApprovalList();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        // await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByGroup();
        await _ApprovalsPages.MyVerificationAndReleasePage.byGroupNameRef.getText().then(text => {
            groupName = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.GroupFilter.input(groupName);
        await _ApprovalsPages.MyVerificationAndReleasePage.groupList1.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.groupList.selectIdealxFile(..._selectGroupCount);
        await _ApprovalsPages.MyVerificationAndReleasePage.groupRejectButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection.input(testData.VerificationAndReleasesByGroup.rejectReason);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectDialogButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForDismiss3();
        await ensure(_ApprovalsPages.MyVerificationAndReleasePage).isUXRejectDialogSuccess();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await browser.sleep(10000);
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition2();
        await _ApprovalsPages.ApprovalPage.groupButton.jsClick();
        await _ApprovalsPages.transferCentersPage.transferCenterGroupFilter.input(groupName);
        await _ApprovalsPages.transferCentersPage.groupNameLink.jsClick();
        await _ApprovalsPages.transferCentersPage.loadViewGroupCondition();
        await _ApprovalsPages.transferCentersPage.scrollTo(0,800);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.groupStatusValue).textContainsLessOne(testData.status.Rejected)
        ]);
    });
});