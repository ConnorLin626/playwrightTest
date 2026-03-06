/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages,FilesPages, PaymentsPages,ReportsPages, } from "../../../pages/IDEALX";
import { ensure, SIT, Button, TextInput, pageSwitchWindow,handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser, ExpectedConditions } from "protractor";
import moment = require("moment");

let referenceEdit = '';
let ttReference = "";
let fastReference = "";
let fileName = "";
let transferDetReportName = "";

let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let _AccountReportsListPage = new ReportsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData_03.json');
let reportTestData = _AccountReportsListPage.fetchTestData('SG_testData_03.json');
let uploadTestData = _FilesPages.fetchTestData('uploadTestData/SG_uploadTestData.json');


describe('SG Payment with Virtual Account', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.FastPayment.SIT.loginCompanyId : testData.FastPayment.UAT.loginCompanyId, SIT ? testData.FastPayment.SIT.loginUserId : testData.FastPayment.UAT.loginUserId, testData.FastPayment.UAT.password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    
    it('Create SG Fast Payment with from accout is VA account(Old UI)', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.FastPaymentPage.fastPayment.click();
        await _PaymentsPages.FastPaymentPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.loadConditionForUATSelectAccount();
        await _PaymentsPages.FastPaymentPage.fromAccount.select(SIT ? testData.FastPayment.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.FastPaymentPage.currency.select(testData.FastPayment.ccy);
        await _PaymentsPages.FastPaymentPage.amount.input(testData.FastPayment.amount);
        await _PaymentsPages.FastPaymentPage.existingPayee.select(testData.FastPayment.existingPayee);
        await _PaymentsPages.FastPaymentPage.purposeCodeReskin.click();
        await _PaymentsPages.FastPaymentPage.filterRppc.input(testData.FastPayment.purposeCode);
        await _PaymentsPages.FastPaymentPage.selectFirstResult.click();
        await _PaymentsPages.FastPaymentPage.paymentDetail.input(testData.FastPayment.paymentDetail);
        await _PaymentsPages.FastPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.FastPaymentPage.emailIdO.input(testData.FastPayment.emailIdO);
        await _PaymentsPages.FastPaymentPage.emailId1.input(testData.FastPayment.emailId1);
        await _PaymentsPages.FastPaymentPage.emailId2.input(testData.FastPayment.emailId2);
        await _PaymentsPages.FastPaymentPage.emailId3.input(testData.FastPayment.emailId3);
        await _PaymentsPages.FastPaymentPage.emailId4.input(testData.FastPayment.emailId4);
        await _PaymentsPages.FastPaymentPage.message.input(testData.FastPayment.message);
        await _PaymentsPages.FastPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.FastPaymentPage.transactionNote.input(testData.FastPayment.transactionNote);
        await _PaymentsPages.FastPaymentPage.nextButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.FastPaymentPage.submitButton.click();
        await _PaymentsPages.FastPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.FastPaymentPage.getIdealxInfoReferenceID().then(text => {
           fastReference = text.trim();
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fastReference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await browser.sleep(1000);
        await checkViewPageAllField(false); //Add for IDXP-812
    });

    it('Edit SG TT with from accout is VA account(Old UI)', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.loadConditionForUATSelectAccount();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TelegraphicTransfer.existingPayee);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesOur.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            ttReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TransferCentersPage.loadConditionForUATSelectAccount();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TelegraphicTransfer.fromVirtualAccount:testData.TelegraphicTransfer.UAT.fromVirtualAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TelegraphicTransfer.ccy);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TelegraphicTransfer.amount);
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TelegraphicTransfer.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            ttReference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.fromVirtualAccount:testData.TelegraphicTransfer.UAT.fromVirtualAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TelegraphicTransfer.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingApproval)
        ]);
    });

    it('FS Upload SG TT with from accout is VA account', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForTTWithVA : testData.FileService.UAT.fileNameForTTWithVA, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.loadConditionForFileNameLink();
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? uploadTestData.TTWithVA.fromVirtualAccount : uploadTestData.TTWithVA.UAT.fromVirtualAccount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(uploadTestData.TTWithVA.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(uploadTestData.status.PendingApproval)
        ]);  
    });

    it('Create Transfer Detail  Report with account is VA account', async function () {
        await _AccountReportsListPage.acctReportListPage.reportMenu.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await _AccountReportsListPage.acctReportListPage.paymentReport.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
        await process4InitCommonValue(
            "TranDetRepWithVA",
            _AccountReportsListPage.acctReportListPage.transferDetCreateButton
        ).then(text => {
            transferDetReportName = text;
        });
        
        await process4Schedule(
            transferDetReportName,
            _AccountReportsListPage.acctReportListPage.transferDetViewDetailsButton,
            _AccountReportsListPage.acctReportListPage.transferDetViewReportName,
            _AccountReportsListPage.acctReportListPage.transferDetViewAcct,
        );
        
        await processGenerateReport(
            transferDetReportName,
            _AccountReportsListPage.acctReportListPage.transferDetActionButton,
            _AccountReportsListPage.acctReportListPage.transferDetActionGenerateButton,
            _AccountReportsListPage.paymentReportsPage.accountValue4Reports2
        );
        
        await browser.close();
        await pageSwitchWindow("DBS IDEAL");
    });

    it('Delete Transfer Detail Report with account is VA accont', async function () {
        await _AccountReportsListPage.acctReportListPage.transferDetActionDeleteButton.jsClick();
        await _AccountReportsListPage.acctReportListPage.loadDeleteDialog();
        await _AccountReportsListPage.acctReportListPage.dialogDeleteBtn.jsClick();
        await Promise.all([
            await ensure(
                _AccountReportsListPage.acctReportListPage
            ).isUXRejectDialogSuccess() //has success message.
        ]);
        await _AccountReportsListPage.acctReportListPage.dismiss.click();
        await _AccountReportsListPage.acctReportListPage.loadCondition();
    });
    //add for IDXP-1413 VA Payment
    it('FS Upload SG TT with bank charge accout is VA account', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.FileService.fileTypeIx, SIT ? testData.FileService.SIT.fileNameForTTWithDebitForVA : testData.FileService.UAT.fileNameForTTWithDebitForVA, testData.FileService.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.Showtransactions.jsClick();

        await Promise.all([
            await ensure(_FilesPages.uploadFilePage.errorMsg).textContains(testData.FileService.errorMsgForDebitAccountIsVA)
        ]);
    });
});

export async function checkViewPageAllField(isEdit:boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.FastPayment.fromAccount : testData.FastPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.FastPayment.amount),
        await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        //Check all field
        await ensure(_PaymentsPages.FastPaymentPage.headerRefValue).textContains(fastReference),
        await ensure(_PaymentsPages.FastPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.deductAmountValue).textContains(testData.FastPayment.amount),
        //await ensure(_PaymentsPages.FastPaymentPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.cutoffTimeValue).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.paymentDetailValue).textIs(testData.FastPayment.paymentDetail),
        await ensure(_PaymentsPages.FastPaymentPage.messageValue).textContains(testData.FastPayment.message),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailIdO),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailId1),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailId2),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailId3),
        await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(testData.FastPayment.emailId4),
        await ensure(_PaymentsPages.FastPaymentPage.totalDeductValue).textContains(isEdit? testData.FastPayment.editAmount : testData.FastPayment.amount),
        await ensure(_PaymentsPages.FastPaymentPage.referenceValue).textContains(isEdit ? referenceEdit : fastReference),
        await ensure(_PaymentsPages.FastPaymentPage.chargeAcctValue).textContains(SIT ? testData.FastPayment.fromAccount : testData.FastPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.FastPaymentPage.messageToApproverValue).textContains(testData.FastPayment.transactionNote),
        await ensure(_PaymentsPages.FastPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}

async function process4InitCommonValue(
    prefixReportName: string,
    createBtn: Button
) {
    let text: string = "";
    await createBtn.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadCondition();
    await _AccountReportsListPage.createAccountReportsPage.reportName.input(prefixReportName + moment());
    text = await _AccountReportsListPage.createAccountReportsPage.reportName.getText();
    await _AccountReportsListPage.createAccountReportsPage.virtualAccounts.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.account.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.searchInput.input(
        SIT
            ? reportTestData.CreateAccountReport.SIT.VirtualAccountNotInclude
            : reportTestData.CreateAccountReport.UAT.VirtualAccountNotInclude
    );
    await _AccountReportsListPage.createAccountReportsPage.accountItem.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.relativeDates.jsClick();
    return text;
}

async function process4Schedule(
    reportName: string,
    viewDetailsButton: Button,
    reportNameInView: TextInput,
    accountInView: TextInput,
    
) {
    await _AccountReportsListPage.createAccountReportsPage.btnSavePublish.jsClick();
    await _AccountReportsListPage.createAccountReportsPage.loadDialog();
    await _AccountReportsListPage.createAccountReportsPage.dismiss.jsClick();
    await _AccountReportsListPage.acctReportListPage.loadCondition();
    await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
    await viewDetailsButton.jsClick();
    await Promise.all([
        await ensure(reportNameInView).textContains(reportName),
        await ensure(accountInView).textContains(SIT? reportTestData.CreateAccountReport.SIT.VirtualAccounts: reportTestData.CreateAccountReport.UAT.viewReportVirtualAccounts),
        
    ]);
}

async function loadCondition4Report(accountElement: TextInput) {
    await pageSwitchWindow("BIRT Report Viewer");
    await browser.wait(
        ExpectedConditions.stalenessOf(_AccountReportsListPage.paymentReportsPage.firstViewButton.element),
        _AccountReportsListPage.paymentReportsPage.firstViewButton.getTimeOut()
    );
    await browser.wait(
        ExpectedConditions.elementToBeClickable(accountElement.element),
        accountElement.getTimeOut()
    );
}

async function processGenerateReport(
    reportName: string,
    optionBtn: Button,
    generateBtn: Button,
    accountElement: TextInput
) {
    await _AccountReportsListPage.acctReportListPage.filterInput.input(reportName);
    await optionBtn.jsClick();
    await generateBtn.jsClick();
    await loadCondition4Report(accountElement);
    await Promise.all([
        await ensure(accountElement).textContains(SIT ? reportTestData.CreateAccountReport.SIT.VirtualAccounts : reportTestData.CreateAccountReport.UAT.VirtualAccounts),
    ]);
}