/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let referenceArray = [];
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('SG_testData.json');
let fileName = '';
let paymentRefown = "";//create by user which do not approval own access and has approval access, and use to approval by user which have approval and approval own access 
let paymentType = "ALL - Universal File Format";

describe('My Approvals By Transaction', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Approve a Single Payment', async function () {
    await _FilesPages.filemanagement_UploadFile.fsUpload(_FilesPages, paymentType, SIT ? testData.MyApproval.SIT.fileNameByTxn : testData.MyApproval.UAT.fileNameByTxn, testData.MyApproval.approvalOptionByTxn).then(async data => {
      fileName = data;
    });

    let _ApprovalsPages = new ApprovalsPages();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(
        testData.status.Approved,
        testData.status.PartialApproved,
        testData.status.PendingRelease,
        testData.status.Received,
        testData.status.BankRejected,
        testData.status.Completed
      )
    ]);
  });

  it('Approve Multiple Payments', async function () {
    let _ApprovalsPages = new ApprovalsPages();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1, 2);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
      referenceArray.push(text.trim());
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference1.getText().then(text => {
      referenceArray.push(text.trim());
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[0]);
    await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(
      testData.status.Approved,
      testData.status.PartialApproved,
      testData.status.PendingRelease,
      testData.status.Received,
      testData.status.BankRejected,
      testData.status.Completed
    );
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[1]);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(
        testData.status.Approved,
        testData.status.PartialApproved,
        testData.status.PendingRelease,
        testData.status.Received,
        testData.status.BankRejected,
        testData.status.Completed
      )
    ]);
  });

  it('Reject a Single Payment', async function () {
    let _ApprovalsPages = new ApprovalsPages();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
      reference = text.trim();
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.click();
    // await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXRejectDialogSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(reference);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
    ]);
  });

  it('Reject Multiple Payments', async function () {
    let _ApprovalsPages = new ApprovalsPages();
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1, 2);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference.getText().then(text => {
      referenceArray.push(text.trim());
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList_Reference1.getText().then(text => {
      referenceArray.push(text.trim());
    });
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection.input(testData.MyApproval.rejectReason);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.reasonForRejection).textIs(testData.MyApproval.rejectReason);
    await _ApprovalsPages.paymentsTransactionsFilesPage.rejectDialogButton.click();
    // await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXRejectDialogSuccess();//has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.dismissButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[2]);
    await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected);
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.clean();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(referenceArray[3]);
    await Promise.all([
      await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Rejected)
    ]);
  });
});

describe('User with Approval access and without Approval own access', async function () {
  this.retries(browser.params.caseRetryTimes);
  // before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserIdWithoutApprovalOwn : testData.MyApproval.UAT.loginUserIdWithoutApprovalOwn); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('User can Approval txn created by others', async function () {
    let _ApprovalsPages = new ApprovalsPages();
    let paymentRef = "";
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserIdWithoutApproval : testData.MyApproval.UAT.loginUserIdWithoutApproval);
    await _ApprovalsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
    await _ApprovalsPages.paymentLocalOverseasPayeePage.createTT(
      SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount,
      testData.TelegraphicTransfer.amountA1,
      testData.TelegraphicTransfer.existingPayee,
      testData.TelegraphicTransfer.paymentDetail,
      testData.TelegraphicTransfer.transactionNote,
      testData.TelegraphicTransfer.messageToOrderingBank).then(async reference => {
        paymentRef = reference;
      });
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserIdWithoutApprovalOwn : testData.MyApproval.UAT.loginUserIdWithoutApprovalOwn);
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(paymentRef);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(paymentRef);
    await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
  });

  it('User can not view txn created by himself under My Approval', async function () {
    await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserIdWithoutApprovalOwn : testData.MyApproval.UAT.loginUserIdWithoutApprovalOwn);
    let _ApprovalsPages = new ApprovalsPages();
    await _ApprovalsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
    await _ApprovalsPages.paymentLocalOverseasPayeePage.createTT(
      SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount,
      testData.TelegraphicTransfer.amountA1,
      testData.TelegraphicTransfer.existingPayee,
      testData.TelegraphicTransfer.paymentDetail,
      testData.TelegraphicTransfer.transactionNote,
      testData.TelegraphicTransfer.messageToOrderingBank).then(async reference => {
        paymentRefown = reference;
      });
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(paymentRefown);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.labelNoInformationDisplay).textIs(testData.MyApproval.labelNoInformationDisplay);
  });
});

describe('User without Approval access and with Approval own access', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserIdWithoutApproval : testData.MyApproval.UAT.loginUserIdWithoutApproval); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('User can Approval txn created by himself', async function () {
    let paymentRef = "";
    await _ApprovalsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
    await _ApprovalsPages.paymentLocalOverseasPayeePage.createTT(
      SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount,
      testData.TelegraphicTransfer.amountA1,
      testData.TelegraphicTransfer.existingPayee,
      testData.TelegraphicTransfer.paymentDetail,
      testData.TelegraphicTransfer.transactionNote,
      testData.TelegraphicTransfer.messageToOrderingBank).then(async reference => {
        paymentRef = reference;
      });
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(paymentRef);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(paymentRef);
    await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
  });

  it('User can not view txn created by others under My Approval', async function () {
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(paymentRefown);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.labelNoInformationDisplay).textIs(testData.MyApproval.labelNoInformationDisplay);
  });
});

describe('User has Approval and Approval own access', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () { await new NavigatePages().loginCB(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId); });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('User can Approval txn created by himself', async function () {
    let paymentRef = "";
    await _ApprovalsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
    await _ApprovalsPages.paymentLocalOverseasPayeePage.createTT(
      SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount,
      testData.TelegraphicTransfer.amountA1,
      testData.TelegraphicTransfer.existingPayee,
      testData.TelegraphicTransfer.paymentDetail,
      testData.TelegraphicTransfer.transactionNote,
      testData.TelegraphicTransfer.messageToOrderingBank).then(async reference => {
        paymentRef = reference;
      });
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(paymentRef);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(paymentRef);
    await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
  });

  it('User can approval txn created by others', async function () {
    await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
    await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(paymentRefown);
    await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
    await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
    await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input(testData.MyApproval.challengeResponse);
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
    await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
    await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
    await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
    await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
    await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
    await _ApprovalsPages.transferCentersPage.loadCondition();
    await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(paymentRefown);
    await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed);
  });
});