/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages, NavigatePages, ApprovalsPages, FilesPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let referenceArray = [];
let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _FilesPages.fetchTestData('SG_testData_01.json');

let reference = '';
let fileName = '';
let fileType = 'ALL - Universal File Format';

describe('Offline Approvals By Transaction', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.OfflineApprovalByTxn.SIT.loginCompanyId : testData.OfflineApprovalByTxn.UAT.loginCompanyId, SIT ? testData.OfflineApprovalByTxn.SIT.loginUserId : testData.OfflineApprovalByTxn.UAT.loginUserId, testData.OfflineApprovalByTxn.UAT.pin123ID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Offline Approve Multiple Payments Select User Is In Group', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.OfflineApprovalByTxn.SIT.fileNameByTxn : testData.OfflineApprovalByTxn.UAT.fileNameByTxn, testData.OfflineApprovalByTxn.approvalOptionByTxn).then(async data => {
            fileName = data;
            // console.log(fileName);
        });
        // upload File end

        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileFilter.input(fileName);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1, 2);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.ApprovalPage.transactionList_Reference1.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeBtn.jsClickIfExist();
        console.log("get challenge Btn");
        await _ApprovalsPages.ApprovalPage.groupApproverOption.select(testData.OfflineApprovalByTxn.approverOption);
        console.log("approverOption");
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByTxn.challengeResponse);
        //await _ApprovalsPages.transferCentersPage.loadConditionforApprovalSection();
        //await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.OfflineApprovalByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        console.log("approveButton");
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.ApprovalPage.finishButton.jsClick();
        //await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceArray[0]);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.clean();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceArray[1]);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
    });
 // Due to IDXP-287,user list will only diaply user which has access
    // it('Offline Approve Multiple Payments Select User Is Not In Group', async function () {
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.ApprovalPage.byFileFilter.input(fileName);
    //     await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1, 2);
    //     await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
    //         referenceArray.push(text.trim());
    //     });
    //     await _ApprovalsPages.ApprovalPage.transactionList_Reference1.getText().then(text => {
    //         referenceArray.push(text.trim());
    //     });
    //     await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
    //     await _ApprovalsPages.ApprovalPage.groupApproverOption.select(testData.OfflineApprovalByTxn.approverOption1);
    //     await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.OfflineApprovalByTxn.challengeResponse);
    //     await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.OfflineApprovalByTxn.challengeResponse);
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.hasUXIxErrorMsg1('The transaction cannot be approved by the selected approver. Please select another approver.').then(value => {
    //         if (!value) {
    //             throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
    //         }
    //     });
    // });

    // below for AB-9338
    it('Upload a confidential file which with Pending Verification status', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload4(_FilesPages, fileType, SIT ? testData.OfflineApprovalByTxn.SIT.fileName2 : testData.OfflineApprovalByTxn.UAT.fileName2, testData.OfflineApprovalByTxn.approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await Promise.all([
            await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
        ]);
        //use user without confidential access to login AUTOSG01U06
        await new NavigatePages().loginIdealx(SIT ? testData.OfflineApprovalByTxn.SIT.loginCompanyId : testData.OfflineApprovalByTxn.UAT.loginCompanyId, SIT ? testData.OfflineApprovalByTxn.SIT.loginUserIdwithoutConfidential : testData.OfflineApprovalByTxn.UAT.loginUserIdwithoutConfidential, '123123')
        await _ApprovalsPages.ApprovalPage.approvalMenu.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.byFileFilter.input(fileName);
        await Promise.all([
            await ensure(_ApprovalsPages.MyVerificationAndReleasePage.labelNoInformationDisplay).textIs(testData.OfflineApprovalByTxn.labelNoInformationDisplay)
        ]);

        //use user with confidential access to login AUTOSG01R04
        await new NavigatePages().loginIdealx(SIT ? testData.OfflineApprovalByTxn.SIT.loginCompanyId : testData.OfflineApprovalByTxn.UAT.loginCompanyId, SIT ? testData.OfflineApprovalByTxn.SIT.verifyUserId : testData.OfflineApprovalByTxn.UAT.verifyUserId, testData.OfflineApprovalByTxn.UAT.pinID)
        await _ApprovalsPages.ApprovalPage.approvalMenu.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.byFileFilter.input(fileName);
        await Promise.all([
            await ensure(_ApprovalsPages.MyVerificationAndReleasePage.transactionList).isNotEmpty(),
        ]);
        await _ApprovalsPages.MyVerificationAndReleasePage.selectAllCheckBox.jsClick();;
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(fileName);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    // it('Offline Approve confidential file select user without confidential access to approve ', async function () {
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.jsClick();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.ApprovalPage.byFileFilter.input(fileName);
    //     await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
    //         reference = text.trim();
    //     });
    //     await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.jsClick();
    //     await _ApprovalsPages.AccountTransferPage.approveButton.jsClick();
    //     await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
    //     await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.OfflineApprovalByTxn.SIT.loginUserIdwithoutConfidential : testData.OfflineApprovalByTxn.UAT.loginUserIdwithoutConfidential)
    //     await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
    //     await _PaymentsPages.AccountTransferPage.approveButton.click();
    //     await _PaymentsPages.AccountTransferPage.hasUXIxErrorMsg1(testData.OfflineApprovalByTxn.errorMsg).then(value => {
    //         if (!value) {
    //             throw new Error('The transaction cannot be approved by the selected approver. Please select another approver.');
    //         }
    //     });
    // });

    it('Offline Approve normal file select user without confidential access to approve ', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.OfflineApprovalByTxn.SIT.fileName1 : testData.OfflineApprovalByTxn.UAT.fileName1, testData.OfflineApprovalByTxn.approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await Promise.all([
            await ensure(_FilesPages.ViewFilePage.FileNameLink).textContains(fileName),
        ]);
        await _ApprovalsPages.ApprovalPage.approvalMenu.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileFilter.input(fileName);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.jsClick();
        await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.AccountTransferPage.approveButton.jsClick();
        await _ApprovalsPages.AccountTransferPage.selectOption.select(SIT ? testData.OfflineApprovalByTxn.SIT.loginUserIdwithoutConfidential : testData.OfflineApprovalByTxn.UAT.loginUserIdwithoutConfidential)
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _ApprovalsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    it('Offline Approve normal file select user with confidential access to approve ', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.offlineLineMenu.jsClick();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileFilter.input(fileName);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.jsClick();
        await _ApprovalsPages.AccountTransferPage.approveButton.jsClick();
        await _ApprovalsPages.AccountTransferPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.AccountTransferPage.selectOption.select(testData.OfflineApprovalByTxn.approverOption)
        await _PaymentsPages.AccountTransferPage.challengeResponse.input('123123123');
        await _ApprovalsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.BulkPaymentPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });

    
    // Add for AB-9099: check offline approve payment via user has (not) payment approve access

    // it('Offline Approve Payment Select User Has(not) payment approve access ', async function () {
    //     await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId, "123456")
    //     await CreatNewBulkPayment();
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    //     if (0 !== reference.trim().length) {
    //         await _ApprovalsPages.ApprovalPage.goToApprovePaymentPageViaRef(reference);
    //     } else {
    //         await _ApprovalsPages.ApprovalPage.goToApprovePaymentPageViaSearch("SG - Bulk Payment");
    //     }
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.SelectUser.select(testData.OfflineApprovalByTxn.ModifyUserA);
    //     await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
    //     await _PaymentsPages.BulkPaymentPage.approveButton.click();
    //     await _ApprovalsPages.ApprovalPage.hasUXIxErrorMsg1(testData.OfflineApprovalByTxn.messageToApprove);
    //     await _ApprovalsPages.ApprovalPage.SelectUser.select(testData.OfflineApprovalByTxn.ModifyUserB);
    //     await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
    //     await _PaymentsPages.BulkPaymentPage.approveButton.click();
    //     await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
    //         reference = text;
    //     });
    //     await _PaymentsPages.BulkPaymentPage.dismissButton.click();
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    //     ]);
    // });


    // it('Offline Approve Payment Select User Has(not) payment approve access at subsi company ', async function () {
    //     await new NavigatePages().loginIdealx(SIT ? testData.BulkPayment.SIT.loginCompanyId : testData.BulkPayment.UAT.loginCompanyId, SIT ? testData.BulkPayment.SIT.loginUserId : testData.BulkPayment.UAT.loginUserId, "123456")
    //     await _FilesPages.uploadFilePage.companyMenu.click();
    //     await _FilesPages.uploadFilePage.selectCompany.click();
    //     await _FilesPages.uploadFilePage.searchCompany.input(SIT ? "KING QUEEN HOLDINGS LTD" : "KING QUEEN HOLDINGS LTD");
    //     await _FilesPages.uploadFilePage.selectCompanyResult.jsClick();
    //     await _switchToSubsiPages.viewSubsiPage.loadCondition();
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.loadCondition();
    //     await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
    //     await _PaymentsPages.BulkPaymentPage.loadCondition();
    //     await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.OfflineApprovalByTxn.SIT.SubsiAccount : testData.OfflineApprovalByTxn.UAT.SubsiAccount);
    //     await addNewPayee();
    //     await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
    //     await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.payeeRef);
    //     await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
    //     await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.BulkPayment.paymentDetails);
    //     await _PaymentsPages.BulkPaymentPage.nextButton.click();
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
    //     await _PaymentsPages.BulkPaymentPage.submitButton.click();
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
    //     await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
    //         reference = text;
    //     });
    //     await _ApprovalsPages.ApprovalPage.approvalMenu.click();
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.ApprovalPage.filter.input(reference);
    //     await _ApprovalsPages.ApprovalPage.loadCondition();
    //     await _ApprovalsPages.ApprovalPage.refLink.jsClick();
    //     await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
    //     await _ApprovalsPages.ApprovalPage.SelectUser.select(testData.OfflineApprovalByTxn.ModifyUserB);
    //     await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
    //     await _PaymentsPages.BulkPaymentPage.approveButton.click();
    //     await _ApprovalsPages.ApprovalPage.hasUXIxErrorMsg1(testData.OfflineApprovalByTxn.messageToApprove);
    //     await _ApprovalsPages.ApprovalPage.SelectUser.select(testData.OfflineApprovalByTxn.ModifyUserA);
    //     await _PaymentsPages.BulkPaymentPage.challengeResponse.input(testData.BulkPayment.EnterResponse);
    //     await _PaymentsPages.BulkPaymentPage.approveButton.click();
    //     await _PaymentsPages.BulkPaymentPage.getDialogReferenceID().then(text => {
    //         reference = text;
    //     });
    //     await _PaymentsPages.BulkPaymentPage.dismissButton.click();
    //     await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    //     await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    //     await _PaymentsPages.BulkPaymentPage.loadConditionForViewPaymentPage();
    //     await Promise.all([
    //         await ensure(_PaymentsPages.BulkPaymentPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    //     ]);
    // });



});

export async function CreatNewBulkPayment() {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
    await _PaymentsPages.BulkPaymentPage.loadCondition();
    await _PaymentsPages.BulkPaymentPage.fromAccount.select(SIT ? testData.BulkPayment.SIT.fromAccount : testData.BulkPayment.UAT.fromAccount);
    await addNewPayee();
    await _PaymentsPages.BulkPaymentPage.amount.input(testData.BulkPayment.amountA1);
    await _PaymentsPages.BulkPaymentPage.payeeRef.input(testData.BulkPayment.payeeRef);
    await _PaymentsPages.BulkPaymentPage.showoptionaldetailsPayee1.click();
    await _PaymentsPages.BulkPaymentPage.paymentDetails.input(testData.BulkPayment.paymentDetails);
    await _PaymentsPages.BulkPaymentPage.isBeneAdvising.jsClick();
    await _PaymentsPages.BulkPaymentPage.emailIdO.input(testData.BulkPayment.emailIdO);
    await _PaymentsPages.BulkPaymentPage.emailId1.input(testData.BulkPayment.emailId1);
    await _PaymentsPages.BulkPaymentPage.emailId2.input(testData.BulkPayment.emailId2);
    await _PaymentsPages.BulkPaymentPage.emailId3.input(testData.BulkPayment.emailId3);
    await _PaymentsPages.BulkPaymentPage.emailId4.input(testData.BulkPayment.emailId4);
    await _PaymentsPages.BulkPaymentPage.message.input(testData.BulkPayment.message);
    await _PaymentsPages.BulkPaymentPage.customDayButton.jsClick();
    await _PaymentsPages.BulkPaymentPage.giroTypeButton.jsClick();
    await _PaymentsPages.BulkPaymentPage.nextButton.click();
    await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
    await _PaymentsPages.BulkPaymentPage.submitButton.click();
    await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
        reference = text;
    });
}

export async function addNewPayee() {
    await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
    await _PaymentsPages.BulkPaymentPage.newPayeeName.input(testData.BulkPayment.payeeName);
    await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(testData.BulkPayment.newPayeeNickname);
    await _PaymentsPages.BulkPaymentPage.payeeBankID.input(testData.BulkPayment.payeeBankID);
    await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
    await _PaymentsPages.BulkPaymentPage.newPayeeAcctNo.input(testData.BulkPayment.accountNumber);
    await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
}
