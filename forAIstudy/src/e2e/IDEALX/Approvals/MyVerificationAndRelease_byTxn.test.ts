/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
// reference 1 and reference 2 for multi verify and release
let reference1 = '';
let reference2 = '';
let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData_01.json');

let createNewTransaction = async function () {
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
    await _PaymentsPages.AccountTransferPage.nextButton.jsClick();
    await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    await ensure(_PaymentsPages.AccountTransferPage.amountValue).isNotEmpty();
    await _PaymentsPages.AccountTransferPage.submitButton.jsClick();
    await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
        reference = text;
    });
};

describe('My Verify-Release By Transaction', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.loginUserId : testData.VerificationAndReleasesByTxn.UAT.loginUserId, testData.VerificationAndReleasesByTxn.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Verify a Single Payment', async function () {
        await createNewTransaction();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.verifyUserId : testData.VerificationAndReleasesByTxn.UAT.verifyUserId, testData.VerificationAndReleasesByTxn.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        // await _ApprovalsPages.MyVerificationAndReleasePage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it('Release a Single Payment', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.VerificationAndReleasesByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.VerificationAndReleasesByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.txnReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Verify Multiple Payment', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.loginUserId : testData.VerificationAndReleasesByTxn.UAT.loginUserId, testData.VerificationAndReleasesByTxn.UAT.pinID);
        await createNewTransaction();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference1 = text;
        });
        console.log(reference1)
        await createNewTransaction();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference2 = text;
        });
        console.log(reference2)
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.verifyUserId : testData.VerificationAndReleasesByTxn.UAT.verifyUserId, testData.VerificationAndReleasesByTxn.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        //await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1, 2);
        // await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
        //     referenceArray.push(text.trim());
        // });
        // await _ApprovalsPages.ApprovalPage.transactionList_Reference1.getText().then(text => {
        //     referenceArray.push(text.trim());
        // });
        // await _ApprovalsPages.ApprovalPage.filter.input(referenceArray[0]);
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference1);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        //await _ApprovalsPages.ApprovalPage.filter.input(referenceArray[1]);
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference2);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.jsClick();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        //await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceArray[0]);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference1);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
        ]);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.clean();
        // await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceArray[1]);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference2);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it('Release Multiple Payment', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        //await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(referenceArray[0]);
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference1);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        //await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(referenceArray[1]);
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference2);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        // await _ApprovalsPages.ApprovalPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.VerificationAndReleasesByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.VerificationAndReleasesByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.finishButton.jsClick();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference1);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference2);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.MyVerificationAndReleasePage.txnReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.jsClick();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference1);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.clean();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference2);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Reject a Single Verify Payment', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.loginUserId : testData.VerificationAndReleasesByTxn.UAT.loginUserId, testData.VerificationAndReleasesByTxn.UAT.pinID);
        await createNewTransaction();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.verifyUserId : testData.VerificationAndReleasesByTxn.UAT.verifyUserId, testData.VerificationAndReleasesByTxn.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.MyVerificationAndReleasePage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection.input(testData.VerificationAndReleasesByTxn.rejectReason);
        await ensure(_ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection).textIs(testData.VerificationAndReleasesByTxn.rejectReason);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectDialogButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
        ]);
    });

    it('Reject a Single Release Payment', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.loginUserId : testData.VerificationAndReleasesByTxn.UAT.loginUserId, testData.VerificationAndReleasesByTxn.UAT.pinID);
        await createNewTransaction();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.verifyUserId : testData.VerificationAndReleasesByTxn.UAT.verifyUserId, testData.VerificationAndReleasesByTxn.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.txnVerifyReleasePreBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.finishButton.click();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        // await _ApprovalsPages.ApprovalPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.VerificationAndReleasesByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.VerificationAndReleasesByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.finishButton.jsClick();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        // await _ApprovalsPages.MyVerificationAndReleasePage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection.input(testData.VerificationAndReleasesByTxn.rejectReason);
        await ensure(_ApprovalsPages.MyVerificationAndReleasePage.reasonForRejection).textIs(testData.VerificationAndReleasesByTxn.rejectReason);
        await _ApprovalsPages.MyVerificationAndReleasePage.rejectDialogButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
        ]);
    });

    it('Verify Payment In View page', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.loginUserId : testData.VerificationAndReleasesByTxn.UAT.loginUserId, testData.VerificationAndReleasesByTxn.UAT.pinID);
        await createNewTransaction();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.verifyUserId : testData.VerificationAndReleasesByTxn.UAT.verifyUserId, testData.VerificationAndReleasesByTxn.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _ApprovalsPages.MyVerificationAndReleasePage.viewVerifyReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseConfirmButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.PendingApproval)
        ]);
    });

    it('Release Payment In View page', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        // await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        // await _ApprovalsPages.ApprovalPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.VerificationAndReleasesByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.VerificationAndReleasesByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _ApprovalsPages.MyVerificationAndReleasePage.viewVerifyReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseConfirmButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected)
        ]);
    });

    it('Reject Payment In Verify View page', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.loginUserId : testData.VerificationAndReleasesByTxn.UAT.loginUserId, testData.VerificationAndReleasesByTxn.UAT.pinID);
        await createNewTransaction();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.verifyUserId : testData.VerificationAndReleasesByTxn.UAT.verifyUserId,testData.VerificationAndReleasesByTxn.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.rejectButton.jsClick();
        await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.VerificationAndReleasesByTxn.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.jsClick();
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
        ]);
    });

    it('Reject Payment In Release View page', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.loginUserId : testData.VerificationAndReleasesByTxn.UAT.loginUserId, testData.VerificationAndReleasesByTxn.UAT.pinID);
        await createNewTransaction();
        await new NavigatePages().loginIdealx(SIT ? testData.VerificationAndReleasesByTxn.SIT.loginCompanyId : testData.VerificationAndReleasesByTxn.UAT.loginCompanyId, SIT ? testData.VerificationAndReleasesByTxn.SIT.verifyUserId : testData.VerificationAndReleasesByTxn.UAT.verifyUserId, testData.VerificationAndReleasesByTxn.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _ApprovalsPages.MyVerificationAndReleasePage.viewVerifyReleaseBtn.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.verifyReleaseConfirmButton.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.dismissButton.click();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForVerifyByTxn();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList1.jsClick();
        //await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        // await _ApprovalsPages.ApprovalPage.getChallengeSMS.clickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.VerificationAndReleasesByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.VerificationAndReleasesByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.finishButton.jsClick();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.MyVerificationAndReleasePage.releaseMenu.jsClick();
        await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        await _ApprovalsPages.MyVerificationAndReleasePage.transactionList_Reference.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.rejectButton.jsClick();
        await _PaymentsPages.AccountTransferPage.reasonForRejection.input(testData.VerificationAndReleasesByTxn.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.jsClick();
        await ensure(_PaymentsPages.AccountTransferPage).isUXRejectDialogSuccess();
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        //await _ApprovalsPages.MyVerificationAndReleasePage.loadConditionForReleaseByTxn();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
        ]);
    });
});