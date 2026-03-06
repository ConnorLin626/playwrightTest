/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages } from '../../../pages/IDEALX';
import { saveScreen, ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let referenceArray = [];
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('SG_testData_01.json');
let fileName = '';
let paymentRefown = "";//create by user which do not approval own access and has approval access, and use to approval by user which have approval and approval own access 
let fileType = 'ALL - Universal File Format';

describe('My Approvals By Transaction', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByTxn.SIT.loginCompanyId : testData.MyApprovalByTxn.UAT.loginCompanyId, SIT ? testData.MyApprovalByTxn.SIT.loginUserId : testData.MyApprovalByTxn.UAT.loginUserId, testData.MyApprovalByTxn.UAT.pin123ID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Approve a Single Payment', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload(_FilesPages, fileType, SIT ? testData.MyApprovalByTxn.SIT.fileNameByTxn : testData.MyApprovalByTxn.UAT.fileNameByTxn, testData.MyApprovalByTxn.approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        // upload File end

        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(fileName);
        // await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.MyApprovalByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
    });

    it('Approve Multiple Payments', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1, 2);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.ApprovalPage.transactionList_Reference1.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.MyApprovalByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceArray[0]);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.clean();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceArray[1]);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
        ]);
    });

    it('Reject a Single Payment', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.rejectButton.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.MyApprovalByTxn.rejectReason);
        await ensure(_ApprovalsPages.ApprovalPage.reasonForRejection).textIs(testData.MyApprovalByTxn.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        // await ensure(_ApprovalsPages.ApprovalPage).isUXRejectDialogSuccess(); //has success message.
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
        ]);
    });

    it('Reject Multiple Payments', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1, 2);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.ApprovalPage.transactionList_Reference1.getText().then(text => {
            referenceArray.push(text.trim());
        });
        await _ApprovalsPages.ApprovalPage.rejectButton.jsClick();
        await _ApprovalsPages.ApprovalPage.reasonForRejection.input(testData.MyApprovalByTxn.rejectReason);
        await ensure(_ApprovalsPages.ApprovalPage.reasonForRejection).textIs(testData.MyApprovalByTxn.rejectReason);
        await _ApprovalsPages.ApprovalPage.rejectDialogButton.click();
        // await ensure(_ApprovalsPages.ApprovalPage).isUXRejectDialogSuccess();//has success message.
        await _ApprovalsPages.ApprovalPage.dismissButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceArray[2]);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.clean();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(referenceArray[3]);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
        ]);
    });
});

describe('User with Approval access and without Approval own access', async function () {
    this.retries(browser.params.caseRetryTimes);
    // before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApprovalByTxn.SIT.loginCompanyId : testData.MyApprovalByTxn.UAT.loginCompanyId, SIT ? testData.MyApprovalByTxn.SIT.loginUserIdWithoutApprovalOwn : testData.MyApprovalByTxn.UAT.loginUserIdWithoutApprovalOwn); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('User can Approval txn created by others', async function () {
        let _ApprovalsPages = new ApprovalsPages();
        let paymentRef = "";
        await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByTxn.SIT.loginCompanyId : testData.MyApprovalByTxn.UAT.loginCompanyId, SIT ? testData.MyApprovalByTxn.SIT.loginUserIdWithoutApproval : testData.MyApprovalByTxn.UAT.loginUserIdWithoutApproval, testData.MyApprovalByTxn.UAT.pin123ID);
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.AccountTransferPage.makePayment.click();
        await _ApprovalsPages.TelegraphicTransferPage.createTT(
            SIT ? testData.MyApprovalByTxn.SIT.fromAccount : testData.MyApprovalByTxn.UAT.fromAccount,
            testData.MyApprovalByTxn.amountA1,
            testData.MyApprovalByTxn.existingPayee,
            testData.MyApprovalByTxn.paymentDetail,
            testData.MyApprovalByTxn.transactionNote,
            testData.MyApprovalByTxn.messageToOrderingBank).then(async reference => {
                paymentRef = reference;
            });
        await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByTxn.SIT.loginCompanyId : testData.MyApprovalByTxn.UAT.loginCompanyId, SIT ? testData.MyApprovalByTxn.SIT.loginUserIdWithoutApprovalOwn : testData.MyApprovalByTxn.UAT.loginUserIdWithoutApprovalOwn, testData.MyApprovalByTxn.UAT.pin123ID);
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(paymentRef);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.MyApprovalByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(paymentRef);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
    });

    it('User can not view txn created by himself under My Approval', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByTxn.SIT.loginCompanyId : testData.MyApprovalByTxn.UAT.loginCompanyId, SIT ? testData.MyApprovalByTxn.SIT.loginUserIdWithoutApprovalOwn : testData.MyApprovalByTxn.UAT.loginUserIdWithoutApprovalOwn, testData.MyApprovalByTxn.UAT.pin123ID);
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.AccountTransferPage.makePayment.click();
        await _ApprovalsPages.TelegraphicTransferPage.createTT(
            SIT ? testData.MyApprovalByTxn.SIT.fromAccount : testData.MyApprovalByTxn.UAT.fromAccount,
            testData.MyApprovalByTxn.amountA1,
            testData.MyApprovalByTxn.existingPayee,
            testData.MyApprovalByTxn.paymentDetail,
            testData.MyApprovalByTxn.transactionNote,
            testData.MyApprovalByTxn.messageToOrderingBank).then(async reference => {
                paymentRefown = reference;
            });
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(paymentRefown);
        await ensure(_ApprovalsPages.ApprovalPage.labelNoInformationDisplay).textIs(testData.MyApprovalByTxn.labelNoInformationDisplay);
    });
});

describe('User without Approval access and with Approval own access', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByTxn.SIT.loginCompanyId : testData.MyApprovalByTxn.UAT.loginCompanyId, SIT ? testData.MyApprovalByTxn.SIT.loginUserIdWithoutApproval : testData.MyApprovalByTxn.UAT.loginUserIdWithoutApproval, testData.MyApprovalByTxn.UAT.pin123ID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('User can Approval txn created by himself', async function () {
        let paymentRef = "";
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.AccountTransferPage.makePayment.click();
        await _ApprovalsPages.TelegraphicTransferPage.createTT(
            SIT ? testData.MyApprovalByTxn.SIT.fromAccount : testData.MyApprovalByTxn.UAT.fromAccount,
            testData.MyApprovalByTxn.amountA1,
            testData.MyApprovalByTxn.existingPayee,
            testData.MyApprovalByTxn.paymentDetail,
            testData.MyApprovalByTxn.transactionNote,
            testData.MyApprovalByTxn.messageToOrderingBank).then(async reference => {
                paymentRef = reference;
            });
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(paymentRef);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByTxn.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.MyApprovalByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(paymentRef);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
    });

    it('User can not view txn created by others under My Approval', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(paymentRefown);
        await ensure(_ApprovalsPages.ApprovalPage.labelNoInformationDisplay).textIs(testData.MyApprovalByTxn.labelNoInformationDisplay);
    });
});

describe('User has Approval and Approval own access', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApprovalByTxn.SIT.loginCompanyId : testData.MyApprovalByTxn.UAT.loginCompanyId, SIT ? testData.MyApprovalByTxn.SIT.loginUserId : testData.MyApprovalByTxn.UAT.loginUserId, testData.MyApprovalByTxn.UAT.pin123ID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('User can Approval txn created by himself', async function () {
        let paymentRef = "";
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.AccountTransferPage.makePayment.click();
        await _ApprovalsPages.TelegraphicTransferPage.createTT(
            SIT ? testData.MyApprovalByTxn.SIT.fromAccount : testData.MyApprovalByTxn.UAT.fromAccount,
            testData.MyApprovalByTxn.amountA1,
            testData.MyApprovalByTxn.existingPayee,
            testData.MyApprovalByTxn.paymentDetail,
            testData.MyApprovalByTxn.transactionNote,
            testData.MyApprovalByTxn.messageToOrderingBank).then(async reference => {
                paymentRef = reference;
            });
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(paymentRef);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByTxn.challengeResponse);
        //await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.MyApprovalByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(paymentRef);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
    });

    it('User can approval txn created by others', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.clean();
        await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(paymentRefown);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApprovalByTxn.challengeResponse);
        //await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.MyApprovalByTxn.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _ApprovalsPages.ApprovalPage.finishButton.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(paymentRefown);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
    });
});