/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('SG_testData.json');
let paymentReferenceList = [];
let transactionList = [];
let fileName = '';
let verifyTxnFlag = false;
let verifyFileFlag = false;
let totalItems = 0;

describe('Create Payment and Upload File For Verify and Release', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.loginUserId : testData.VerificationAndReleases.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create Multiple Online Payment', async function () {
        for (let i = 0; i < 2; i++) {
            await _ApprovalsPages.openMenu(Menu.Payments.PaymentLocalOverseasPayee);
            await _ApprovalsPages.AccountTransferPage.loadCondition();
            await _ApprovalsPages.AccountTransferPage.fromAccount.select(SIT ? testData.AccountTransfer.SIT.fromAccount : testData.AccountTransfer.UAT.fromAccount);
            await _ApprovalsPages.AccountTransferPage.amount.input(testData.AccountTransfer.amountV);
            await _ApprovalsPages.AccountTransferPage.loadCondition();
            await _ApprovalsPages.AccountTransferPage.existingPayee.select(testData.AccountTransfer.existingPayee);
            await _ApprovalsPages.AccountTransferPage.paymentDetail.input(testData.AccountTransfer.paymentDetail);
            await _ApprovalsPages.AccountTransferPage.isBeneAdvising.jsClick();
            await _ApprovalsPages.AccountTransferPage.emailIdO.input(testData.AccountTransfer.emailIdO);
            await _ApprovalsPages.AccountTransferPage.emailId1.input(testData.AccountTransfer.emailId1);
            await _ApprovalsPages.AccountTransferPage.message.input(testData.AccountTransfer.message);
            await _ApprovalsPages.AccountTransferPage.isTransactionNote.jsClick();
            await _ApprovalsPages.AccountTransferPage.transactionNote.input(testData.AccountTransfer.transactionNote);
            await _ApprovalsPages.AccountTransferPage.nextButton.click();
            await _ApprovalsPages.AccountTransferPage.loadConditionForPrevewPage();
            await _ApprovalsPages.AccountTransferPage.submitButton.click();
            await _ApprovalsPages.AccountTransferPage.loadConditionForSubmittedPage();
            await ensure(_ApprovalsPages.AccountTransferPage).isUXSuccess();
            await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.loginUserId : testData.VerificationAndReleases.UAT.loginUserId); 
    
        }
    });

    it('Upload txn via FS_By File', async function () {
        await _ApprovalsPages.uploadFilePage.fsUpload(_FilesPages, testData.VerificationAndReleases.fileType, testData.VerificationAndReleases.fileFormat, SIT ? testData.VerificationAndReleases.SIT.fileName : testData.VerificationAndReleases.UAT.fileName, testData.VerificationAndReleases.approvalOption, testData.VerificationAndReleases.approvalCurrency).then(async data => {
            fileName = data;
        });
    });
});

// Verification And Releases part
describe('Verification And Releases', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.VerificationAndReleases.SIT.loginCompanyId : testData.VerificationAndReleases.UAT.loginCompanyId, SIT ? testData.VerificationAndReleases.SIT.verifyUserId : testData.VerificationAndReleases.UAT.verifyUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Verify Multiple Online Payment', async function () {
        await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForNewUI();
        await _ApprovalsPages.verificationAndReleasesPage.oldVerifyLink.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadCondition();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVeirfyTab();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        await _ApprovalsPages.verificationAndReleasesPage.verifyTab.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVerifyTxnTab();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        await _ApprovalsPages.verificationAndReleasesPage.verifyTabByTxn.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVerifyBtn();
        await _ApprovalsPages.verificationAndReleasesPage.verifyByTxnI3Select1stTxn.click();
        await _ApprovalsPages.verificationAndReleasesPage.verifyByTxnI3Select1stTxnRef.getText().then(text => {
            paymentReferenceList.push(text.trim());
        });
        await _ApprovalsPages.verificationAndReleasesPage.verifyByTxnI3Select2ndTxn.click();
        await _ApprovalsPages.verificationAndReleasesPage.verifyByTxnI3Select2ndTxnRef.getText().then(text => {
            paymentReferenceList.push(text.trim());
        });
        await _ApprovalsPages.verificationAndReleasesPage.verifyTxnButton.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVerifyPaymentPage();
        await _ApprovalsPages.verificationAndReleasesPage.confirmVerifyI3Button.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVerifyBtn();
        await ensure(_ApprovalsPages.verificationAndReleasesPage).isI3Success();
        await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _ApprovalsPages.transferCentersPage.loadCondition();
        for (let i = 0; i < paymentReferenceList.length; i++) {
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(paymentReferenceList[i]);
            await Promise.all([
                await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContains(testData.status.PendingApproval),
            ]);
        }
        verifyTxnFlag = true;
    });

    it('Verify a File', async function () {
        await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForNewUI();
        await _ApprovalsPages.verificationAndReleasesPage.oldVerifyLink.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadCondition();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVeirfyTab();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        await _ApprovalsPages.verificationAndReleasesPage.verifyTab.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVerifyFileTab();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        await _ApprovalsPages.verificationAndReleasesPage.verifyTabByFile.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        if (0 !== fileName.trim().length) {
            await _ApprovalsPages.verificationAndReleasesPage.verifyByfileFilter.input(fileName);
            await _ApprovalsPages.verificationAndReleasesPage.verifyByFileGo.click();
        }
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVerifyFileBtn();
        await _ApprovalsPages.verificationAndReleasesPage.verifyByFileI3Select1st.click();
        await _ApprovalsPages.verificationAndReleasesPage.verifyByFileI3Select1stfileName.getText().then(text => {
            fileName = text.trim();
        });
        await _ApprovalsPages.verificationAndReleasesPage.verifyByFileBtn.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVerifyFilePage();
        await _ApprovalsPages.verificationAndReleasesPage.verifyByFileI3Select1stItemNum.getText().then(text => {
            totalItems = parseInt(text.trim());
        });
        await _ApprovalsPages.verificationAndReleasesPage.confirmVerifyFileI3Button.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForVerifyFileBtn();
        await ensure(_ApprovalsPages.verificationAndReleasesPage).isI3Success();//has success message.
        await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transactionFilterButton.click();
        await _ApprovalsPages.transferCentersPage.fileNameFileter.input(fileName);
        await _ApprovalsPages.transferCentersPage.searchButton.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.getApprovalTransactionReference(totalItems).then(list => {
            transactionList = list;
        });

        for (let i = 0; i < totalItems; i++) {
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(transactionList[i]);
            await Promise.all([
                await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContains(testData.status.PendingApproval),
            ]);
        }
        verifyFileFlag = true;
    });

    it('Release Multiple Online Payment', async function () {
        if (0 !== paymentReferenceList.length && verifyTxnFlag === true) {
            await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
            await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
            await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionButton.click();
            await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
            for (let i = 0; i < paymentReferenceList.length; i++) {
                await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.clean();
                await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(paymentReferenceList[i]);
                await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
            }
            await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
            await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
            await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input('123123123');
            await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs('12312312');
            await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
            await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUXSuccess(); //has success message.
            await _ApprovalsPages.paymentsTransactionsFilesPage.finishButton.click();
        }
        // Release
        await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForNewUI();
        await _ApprovalsPages.verificationAndReleasesPage.oldVerifyLink.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadCondition();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseTab();
        await _ApprovalsPages.verificationAndReleasesPage.releaseTab.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseTxnTab();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        await _ApprovalsPages.verificationAndReleasesPage.releaseTabByTxn.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseBtn();
        await _ApprovalsPages.verificationAndReleasesPage.releaseByTxnI3Select1stTxn.click();
        let paymentReference = [];
        await _ApprovalsPages.verificationAndReleasesPage.releaseByTxnI3Select1stTxnRef.getText().then(text => {
            paymentReference.push(text.trim());
        })
        await _ApprovalsPages.verificationAndReleasesPage.releaseByTxnI3Select2ndTxn.click();
        await _ApprovalsPages.verificationAndReleasesPage.releaseByTxnI3Select2ndTxnRef.getText().then(text => {
            paymentReference.push(text.trim());
        })
        await _ApprovalsPages.verificationAndReleasesPage.releaseTxnI3Button.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleasePaymentPage();
        await _ApprovalsPages.verificationAndReleasesPage.confirmReleaseI3Button.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseBtn();
        await Promise.all([
            await ensure(_ApprovalsPages.verificationAndReleasesPage).isI3Success(),//has success message.
        ]);
        await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _ApprovalsPages.transferCentersPage.loadCondition();
        for (let i = 0; i < paymentReference.length; i++) {
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(paymentReference[i]);
            await Promise.all([
                await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
            ]);
        }
    });

    it('Release a File', async function () {
        if (0 !== fileName.trim().length && verifyFileFlag === true) {
            await _ApprovalsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles);
            await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
            await _ApprovalsPages.paymentsTransactionsFilesPage.byFileButton.click();
            await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
            await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.clean();
            await _ApprovalsPages.paymentsTransactionsFilesPage.byFileAdditionFilter_Files.input(fileName);
            await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
            await _ApprovalsPages.paymentsTransactionsFilesPage.fileList.selectFile(1);
            await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForByFile();
            await _ApprovalsPages.paymentsTransactionsFilesPage.fileApproveBtn.click();
            await _ApprovalsPages.paymentsTransactionsFilesPage.getChallengeSMS.clickIfExist();
            await _ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse.input("12312312");
            await ensure(_ApprovalsPages.paymentsTransactionsFilesPage.challengeResponse).textIs("12312312");
            await _ApprovalsPages.paymentsTransactionsFilesPage.previewApproveButton.click();
            await _ApprovalsPages.paymentsTransactionsFilesPage.loadConditionForCompletedPage();
            await Promise.all([
                await ensure(_ApprovalsPages.paymentsTransactionsFilesPage).isUxSuccessSuccess() //has success message.
            ]);
        }

        await _ApprovalsPages.openMenu(Menu.Approvals.Verifications);
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForNewUI();
        await _ApprovalsPages.verificationAndReleasesPage.oldVerifyLink.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadCondition();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseTab();
        await _ApprovalsPages.verificationAndReleasesPage.releaseTab.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseFileTab();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForList();
        await _ApprovalsPages.verificationAndReleasesPage.releaseTabByFile.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseFileBtn();
        if (0 !== fileName.trim().length && verifyFileFlag === true) {
            await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseFilterGo();
            await _ApprovalsPages.verificationAndReleasesPage.releaseFilterFileName.input(fileName);
            await _ApprovalsPages.verificationAndReleasesPage.releaseFileGoBtn.click();
        }
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseFileBtn();
        await _ApprovalsPages.verificationAndReleasesPage.releaseByFileI3Select1stTxn.click();
        await _ApprovalsPages.verificationAndReleasesPage.releaseByFileI3Select1stFileName.getText().then(text => {
            fileName = text.trim();
        });
        await _ApprovalsPages.verificationAndReleasesPage.releaseFileButton.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseFilePage();
        await _ApprovalsPages.verificationAndReleasesPage.verifyByFileI3Select1stItemNum.getText().then(text => {
            totalItems = parseInt(text.trim());
        });
        await _ApprovalsPages.verificationAndReleasesPage.confirmReleaseFileI3Button.click();
        await _ApprovalsPages.verificationAndReleasesPage.loadConditionForReleaseFileBtn();
        await ensure(_ApprovalsPages.verificationAndReleasesPage).isI3Success();

        await _ApprovalsPages.openMenu(Menu.Payments.TransferCenter);
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transactionFilterButton.click();
        await _ApprovalsPages.transferCentersPage.fileNameFileter.input(fileName);
        await _ApprovalsPages.transferCentersPage.searchButton.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.getApprovalTransactionReference(totalItems).then(list => {
            transactionList = list;
        });
        for (let i = 0; i < totalItems; i++) {
            await _ApprovalsPages.transferCentersPage.transferCenterfilter.input(transactionList[i]);
            await Promise.all([
                await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
            ]);
        }
    });
});