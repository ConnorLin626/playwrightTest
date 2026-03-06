/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages, ReportsPages } from "../../../pages/IDEALX";
import { ensure, generatedID, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import * as constVal from '../../../pages/IDEALX/PayTransfer/constantValue';
import { browser } from 'protractor';
import * as moment from 'moment';
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let _ApprovalsPages = new ApprovalsPages();


let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let uploadTestData = _PaymentsPages.fetchTestData('uploadTestData/SG_uploadTestData.json');
let reference: string = null;
let bulkPayNowReference: string = null;
let fileName: string = null;
let today = moment(); // 当前日期
let lastDayOfMonth = moment().endOf('month'); // 当前月份的最后一天
describe('SG PayNow Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.payNowPayment.SIT.login.loginCompanyId : testData.payNowPayment.UAT.login.loginCompanyId, SIT ? testData.payNowPayment.SIT.login.loginUserId : testData.payNowPayment.UAT.login.verifyUserId, "P@ssword1A!"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    it('Create PayNow FAST with Existing Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.payNowPayment.click();
        await _PaymentsPages.SGPayNowPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
        await _PaymentsPages.SGPayNowPage.amount.input(testData.payNowPayment.amount);
        await _PaymentsPages.SGPayNowPage.addExistingPayNow4Single(SIT ? testData.payNowPayment.SIT.exsitingPayeeName : testData.payNowPayment.UAT.exsitingPayeeName);
        await _PaymentsPages.singlePaymentPage.purposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.payNowPayment.purposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.SGPayNowPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.SGPayNowPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SGPayNowPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log('Reference of Create PayNow FAST with Existing Payee:', reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();

        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.payNowPayment.amount),
            await ensure(_PaymentsPages.SGPayNowPage.payNowPayeeNameViewSinglePayment).textContains(SIT? testData.payNowPayment.SIT.proxyTypeMobNum : testData.payNowPayment.UAT.proxyTypeMobNum),
            await ensure(_PaymentsPages.SGPayNowPage.statusLableViewSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
            await ensure(_PaymentsPages.SGPayNowPage.paymentDateViewSinglePayment).isNotEmpty(),
        ]);
    });

    it('Approve PayNow FAST with Existing Payee', async function () {

        await approveSinglePaymentAndCheckApproved(reference);

    });

    it('Create PayNow FAST with New Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.payNowPayment.click();
        await _PaymentsPages.SGPayNowPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
        await _PaymentsPages.SGPayNowPage.amount.input(testData.payNowPayment.amount);
        await _PaymentsPages.SGPayNowPage.addNewPayNow4Single(constVal.payNowTypeCodeMap.M, SIT ? testData.payNowPayment.SIT.proxyTypeMobNum :testData.payNowPayment.UAT.proxyTypeMobNum, testData.payNowPayment.proxyTypeMobNumCountry);
        await _PaymentsPages.singlePaymentPage.purposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.payNowPayment.purposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.SGPayNowPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.SGPayNowPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SGPayNowPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log('Reference of Create PayNow FAST with New Payee:', reference);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();
        await checkViewFastPaynowPageAllField(true);//Add for IDXP-812
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.payNowPayment.amount),
            await ensure(_PaymentsPages.SGPayNowPage.newPayNowPayeeNameViewSinglePayment).textContains(SIT? testData.payNowPayment.SIT.proxyTypeMobNum : testData.payNowPayment.UAT.proxyTypeMobNum),
            await ensure(_PaymentsPages.SGPayNowPage.statusLableViewSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
            await ensure(_PaymentsPages.SGPayNowPage.paymentDateViewSinglePayment).isNotEmpty(),
        ]);
    });

    it('Approve PayNow FAST with New Payee', async function () {

        await approveSinglePaymentAndCheckApproved(reference);

    });

    it('Upload PayNow FAST via FS', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.payNowPayment.SIT.fileService.fileName : testData.payNowPayment.UAT.fileService.fileName, "By transaction amount").then(async (data) => {
            fileName = data;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.FastPaymentPage.loadConditionForViewFastPaymentPage();

        await checkViewFastPaynowPageAllField(false); //IDXP-812

    });

    it('Approve PayNow FAST via FS', async function () {
        await _PaymentsPages.CrossBoarderACHPage.goToMyApprovalByFileViewFile(fileName);
        await _ApprovalsPages.ApprovalPage.viewFileApproveAll.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.CrossBorder.responseCode);
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4MyApprovalCompleted();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.myApproveFileStatus).textIs(constVal.statusLabelMap.Approved),
        ]);

    });

    it('Create PayNow GIRO with New Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.payNowPayment.click();
        await _PaymentsPages.SGPayNowPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
        await _PaymentsPages.SGPayNowPage.amount.input(testData.payNowPayment.amount);
        await _PaymentsPages.SGPayNowPage.addNewPayNow4Single(constVal.payNowTypeCodeMap.M, SIT?testData.payNowPayment.SIT.proxyTypeMobNum : testData.payNowPayment.UAT.proxyTypeMobNum, testData.payNowPayment.proxyTypeMobNumCountry);
        // await _PaymentsPages.SGPayNowPage.choseDateRadioButton.jsClick();
        //await _PaymentsPages.SGPayNowPage.nextDateTypeRadioButton.jsClick();
        await _PaymentsPages.singlePaymentPage.purposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.payNowPayment.purposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.SGPayNowPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.SGPayNowPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.SGPayNowPage.getIdealxInfoReferenceID().then((data) => {
            reference = data;
            console.log('Reference of Create PayNow GIRO with New Payee:', reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();

        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(testData.payNowPayment.amount),
            await ensure(_PaymentsPages.SGPayNowPage.newPayNowPayeeNameViewSinglePayment).textContains(SIT ? testData.payNowPayment.SIT.proxyTypeMobNum : testData.payNowPayment.UAT.proxyTypeMobNum),
            await ensure(_PaymentsPages.SGPayNowPage.statusLableViewSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
            await ensure(_PaymentsPages.SGPayNowPage.paymentDateViewSinglePayment).isNotEmpty(),
        ]);
    });

    it('Approve PayNow GIRO with New Payee', async function () {

        await approveSinglePaymentAndCheckApproved(reference);

    });

    //Add for DASB-74531
    it('Create PayNow GIRO with New Payee input duplicate nickname', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.payNowPayment.click();
        await _PaymentsPages.SGPayNowPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
        await _PaymentsPages.SGPayNowPage.amount.input(testData.payNowPayment.amount);
        await _PaymentsPages.SGPayNowPage.payNowTab.click();
        await _PaymentsPages.SGPayNowPage.continueBtn.jsClick();//add for IDXP-1492
        await _PaymentsPages.SGPayNowPage.mobileNumberRadio.jsClick();
        // await _PaymentsPages.SGPayNowPage.proxyTypeMobNumCountry.select(testData.payNowPayment.proxyTypeMobNumCountry);
        await _PaymentsPages.SGPayNowPage.proxyTypeMobNum.input(SIT?testData.payNowPayment.SIT.proxyTypeMobNum : testData.payNowPayment.UAT.proxyTypeMobNum);
        await _PaymentsPages.SGPayNowPage.newPayeeNickname.input(testData.payNowPayment.SIT.exsitingPayeeName);
        await _PaymentsPages.SGPayNowPage.savePayee.jsClick();
        await _PaymentsPages.singlePaymentPage.purposeOfPayment.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.payNowPayment.purposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.SGPayNowPage.nextButton.click();
        await _PaymentsPages.SGPayNowPage.submitButton.click();
        await ensure(_PaymentsPages.SGPayNowPage.nicknameMsg).textContains(testData.payNowPayment.Msg);
    });
    //


    it('Upload PayNow GIRO via FS--By File', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.payNowPayment.SIT.fileService.fileNameGIRO : testData.payNowPayment.UAT.fileService.fileNameGIRO, SIT ? testData.payNowPayment.SIT.fileService.approvalCurrency : testData.payNowPayment.UAT.fileService.approvalCurrency).then(async (data) => {
            fileName = data;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);

        await Promise.all([
            await ensure(_PaymentsPages.SGPayNowPage.fromAccount_ViewUploadSinglePayment).isNotEmpty(),
            await ensure(_PaymentsPages.SGPayNowPage.amount_ViewUploadSinglePayment).isNotEmpty(),
            await ensure(_PaymentsPages.SGPayNowPage.payeeName_ViewUploadSinglePayment).isNotEmpty(),
            await ensure(_PaymentsPages.SGPayNowPage.status_ViewUploadSinglePayment).textIs(constVal.statusLabelMap.PendingApproval),
            await ensure(_PaymentsPages.SGPayNowPage.cutoff_ViewUploadSinglePaymentOldUI).isNotEmpty(),
        ]);
    });

    it('Approve PayNow GIRO via FS--By File', async function () {

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.CrossBoarderACHPage.goToMyApprovalByFileViewFile(fileName);
        await _ApprovalsPages.ApprovalPage.viewFileApproveAll.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.CrossBorder.responseCode);
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.ApprovalPage.approveButton.click();
        await _PaymentsPages.CrossBoarderACHPage.loadCondition4MyApprovalCompleted();
        await Promise.all([
            await ensure(_PaymentsPages.CrossBoarderACHPage.myApproveFileStatus).textIs(constVal.statusLabelMap.Approved),
        ]);
    });

    it('Create PayNow Bulk Payment with Existing Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
        await _PaymentsPages.SGPayNowPage.addExistingPayNow4Bulk(SIT ? testData.payNowPayment.SIT.exsitingPayeeName : testData.payNowPayment.UAT.exsitingPayeeName);
        //await _PaymentsPages.SGPayNowPage.loadCondition4PayNowExistingPayee();
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.payNowPayment.amount);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage;
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            bulkPayNowReference = text;
            console.log('Reference of Create PayNow Bulk Payment with Existing Payee:', bulkPayNowReference);
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(bulkPayNowReference);
        await _PaymentsPages.SGPayNowPage.loadCondition4ViewPayNowBulkPayment();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.payNowPayment.amount),
            await ensure(_PaymentsPages.BulkPaymentPage.payeeNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.SGPayNowPage.statusLableViewPayNowBulkPayment).textIs(constVal.statusLabelMap.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty(),
        ]);
    });

    it('Approve PayNow Bulk Payment with Existing Payee', async function () {

        await approveBulkPayNowPaymentAndCheckApproved(bulkPayNowReference);

    });

    it('Create PayNow Bulk Payment with New Payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.BulkPaymentPage.bulkPayment.click();
        await _PaymentsPages.BulkPaymentPage.loadCondition();
        await _PaymentsPages.SGPayNowPage.fromAccount.select(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount);
        await _PaymentsPages.SGPayNowPage.addNewPayNow4Bulk(constVal.payNowTypeCodeMap.M,SIT ? testData.payNowPayment.SIT.proxyTypeMobNum :testData.payNowPayment.UAT.proxyTypeMobNum, testData.payNowPayment.proxyTypeMobNumCountry);
        //    await _PaymentsPages.SGPayNowPage.addNewPayNow4Bulk(constVal.payNowTypeCodeMap.U, testData.payNowPayment.proxyTypeCmpnyIde);
        //    await _PaymentsPages.SGPayNowPage.addNewPayNow4Bulk(constVal.payNowTypeCodeMap.N, testData.payNowPayment.proxyTypeNF);
        await _PaymentsPages.BulkPaymentPage.amount.input(testData.payNowPayment.amount);
        await _PaymentsPages.BulkPaymentPage.nextButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.BulkPaymentPage.submitButton.click();
        await _PaymentsPages.BulkPaymentPage.loadConditionForSubmittedPage;
        await _PaymentsPages.BulkPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
            console.log('Reference of Create PayNow Bulk Payment with New Payee:', reference);
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.SGPayNowPage.loadCondition4ViewPayNowBulkPayment();

        await Promise.all([
            await ensure(_PaymentsPages.BulkPaymentPage.fromAccountView).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.BulkPaymentPage.amountView).textContains(testData.payNowPayment.amount),
            await ensure(_PaymentsPages.SGPayNowPage.proxyValueViewPayNowBulkPayment).textContains(SIT? testData.payNowPayment.SIT.proxyTypeMobNum:testData.payNowPayment.UAT.proxyTypeMobNum),
            //      await ensure(_PaymentsPages.SGPayNowPage.proxyValueViewPayNowBulkPayment).textContains(testData.payNowPayment.proxyTypeCmpnyIde),
            //      await ensure(_PaymentsPages.SGPayNowPage.proxyValueViewPayNowBulkPayment).textContains(testData.payNowPayment.proxyTypeNF),
            await ensure(_PaymentsPages.SGPayNowPage.statusLableViewPayNowBulkPayment).textIs(constVal.statusLabelMap.PendingApproval),
            await ensure(_PaymentsPages.BulkPaymentPage.paymentDateView).isNotEmpty,
        ]);
    });

    it('Approve PayNow Bulk Payment with New Payee', async function () {

        await approveBulkPayNowPaymentAndCheckApproved(reference);

    });

    it('Upload PayNow File Enquiry', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _PaymentsPages.SGPayNowPage.uploadPayNowEnq(SIT ? testData.payNowPayment.SIT.payNowEnquiry.uploadFileName : testData.payNowPayment.UAT.payNowEnquiry.uploadFileName).then((data) => {
            fileName = data;
            console.log('fileName of Upload PayNow File Enquiry:', reference);
        });
        await _PaymentsPages.SGPayNowPage.goToNowEnqItem(fileName);
        await Promise.all([
            await ensure(_PaymentsPages.SGPayNowPage.statusLabelPayNowEnqList).textIs(constVal.statusLabelMap.PendingApproval),
        ]);

    });

    it('Approve PayNow File Enquiry', async function () {

        await _PaymentsPages.SGPayNowPage.checkPayNowEnqItem(fileName);
        await _PaymentsPages.SGPayNowPage.approvePayNowEnqItem(testData.CrossBorder.responseCode);
        await _PaymentsPages.SGPayNowPage.goToNowEnqItem(fileName);
        await Promise.all([
            await ensure(_PaymentsPages.SGPayNowPage.statusLabelPayNowEnqList).textContainsLessOne(constVal.statusLabelMap.Approved, constVal.statusLabelMap.PartialApproved),
        ]);

    });

    it('Delete PayNow File Enquiry', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _PaymentsPages.SGPayNowPage.uploadPayNowEnq(SIT ? testData.payNowPayment.SIT.payNowEnquiry.uploadFileName : testData.payNowPayment.UAT.payNowEnquiry.uploadFileName).then((data) => {
            fileName = data;
        });
        await _PaymentsPages.SGPayNowPage.checkPayNowEnqItem(fileName);
        await _PaymentsPages.SGPayNowPage.deleteButton.jsClick();
        await _PaymentsPages.SGPayNowPage.dialogDeleteButton.click();
        await _PaymentsPages.SGPayNowPage.dismissButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.SGPayNowPage.transactionResult).textIs("No information to display"),
        ]);
    });

    //PayNow Reports-bulk payment. Make sure case - 'Create PayNow Bulk Payment with New/Existing Payee' is success
    it("Payment Reports-PayNow Bulk Payment", async function () {
        // let fromDate = moment(new Date()).format('DD-MMM-YYYY');
        // let toDate = moment().add(10, 'days').format('DD-MMM-YYYY');
        let _PaymentReportsPage = new ReportsPages();
        await _PaymentReportsPage.acctReportListPage.reportMenu.click();
        await _PaymentReportsPage.acctReportListPage.loadCondition();
        await _PaymentReportsPage.acctReportListPage.paymentReport.click();
        await _PaymentReportsPage.paymentReportsPage.showBulkTemplate.jsClick
        await _PaymentReportsPage.paymentReportsPage.bulkPaymentCreateButton.jsClick();
        await _PaymentReportsPage.paymentReportsPage.loadConditionOnEditPage();
        let PaymentReportsName = 'PayNowBulkPayment' + generatedID();
        console.log(PaymentReportsName);
        await _PaymentReportsPage.paymentReportsPage.customRptNameText.input(PaymentReportsName);
        if (!today.isSame(lastDayOfMonth, 'day')) {
            await _PaymentReportsPage.paymentReportsPage.customerReferenceText.input(bulkPayNowReference);
        }
        console.log(bulkPayNowReference);
        await _PaymentReportsPage.createAccountReportsPage.relativeDates.jsClick();
        //await _PaymentReportsPage.paymentReportsPage.absoluteDateValue.jsClick();
        await _PaymentReportsPage.paymentReportsPage.continueButton.jsClick();
        await _PaymentReportsPage.paymentReportsPage.updateButton.jsClick();
        await _PaymentReportsPage.paymentReportsPage.loadConditionForDBSLogoOnReportPage();
        await ensure(_PaymentReportsPage.paymentReportsPage.bulkPaymentAccountValue).textContains(SIT ? testData.payNowPayment.SIT.payNowFromAccountName : testData.payNowPayment.UAT.fromAccount);
    });

});
//UX Transfer Center -> filter by reference -> click reference -> approve -> go to Transfer Center againt to check
export async function approveSinglePaymentAndCheckApproved(reference: string): Promise<void> {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();
    await _PaymentsPages.SGPayNowPage.approveButton.jsClick();
    await _PaymentsPages.SGPayNowPage.getChallengeSMS.clickIfExist();
    await _PaymentsPages.SGPayNowPage.challengeResponse.input(testData.CrossBorder.responseCode);
    await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
    await _PaymentsPages.SGPayNowPage.approveButton.click();
    await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewSinglePayment();
    await Promise.all([
        await ensure(_PaymentsPages.SGPayNowPage.statusLableViewSinglePayment).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
}

export async function approveBulkPayNowPaymentAndCheckApproved(reference: string): Promise<void> {
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewPayNowBulkPayment();
    await _PaymentsPages.SGPayNowPage.approveButton.jsClick();
    await _PaymentsPages.SGPayNowPage.getChallengeSMS.jsClickIfExist();
    await _PaymentsPages.SGPayNowPage.challengeResponse.input(testData.CrossBorder.responseCode);
    await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
    await _PaymentsPages.SGPayNowPage.approveButton.jsClick();
    await _PaymentsPages.SGPayNowPage.approveButton.jsClickIfExist();
    await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.SGPayNowPage.loadCondition4ViewPayNowBulkPayment();
    await Promise.all([
        await ensure(_PaymentsPages.SGPayNowPage.statusLableViewPayNowBulkPayment).textContainsLessOne(testData.status.Received, testData.status.Approved, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
    ]);
}

export async function checkViewFastPaynowPageAllField(isOnline:boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.FastPaymentPage.transactionStatusValue).textIs(isOnline ? testData.status.PendingApproval : uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.FastPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.fastAmountValue).textContains(isOnline ? testData.payNowPayment.amount : uploadTestData.fastPaynowPayment.amountValue),
        await ensure(_PaymentsPages.FastPaymentPage.payNowMobileNum).textContains(isOnline ? (SIT? testData.payNowPayment.SIT.mobileNumValue : testData.payNowPayment.UAT.mobileNumValue) : uploadTestData.fastPaynowPayment.payNowMobileNum),
        await ensure(_PaymentsPages.FastPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.FastPaymentPage.paymentTypeValue).textContains(isOnline ? testData.payNowPayment.paymentType : uploadTestData.fastPaynowPayment.paymentType),
        await ensure(_PaymentsPages.FastPaymentPage.deductAmountValue).textContains(isOnline ? testData.payNowPayment.amount : uploadTestData.fastPaynowPayment.amountValue),
        await ensure(_PaymentsPages.FastPaymentPage.totalDeductValue).textContains(isOnline ? testData.payNowPayment.amount : uploadTestData.fastPaynowPayment.amountValue),
        await ensure(_PaymentsPages.FastPaymentPage.purposeCodeValue).textContains(isOnline ? testData.payNowPayment.purposeCode : uploadTestData.fastPaynowPayment.purposeCodeValue),
        // await ensure(_PaymentsPages.FastPaymentPage.messageToApproverValue).textContains(uploadTestData.fastPaynowPayment.transactionNote)
    ]);
    if(isOnline){
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.headerRefValue).textContains(reference),
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.referenceValue).textContains(reference),
            await ensure(_PaymentsPages.FastPaymentPage.chargeAcctValue).textContains(SIT ? testData.payNowPayment.SIT.fromAccount : testData.payNowPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.nextApprover).isNotEmpty(),
            await ensure(_PaymentsPages.FastPaymentPage.activityLog).isNotEmpty(),
        ]);       
    }else{
        await Promise.all([
            await ensure(_PaymentsPages.FastPaymentPage.headerRefValue).isNotEmpty(),
            await ensure(_PaymentsPages.FastPaymentPage.fastFromAccountValue).textContains(SIT? uploadTestData.fastPaynowPayment.fromAccount : uploadTestData.fastPaynowPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.FastPaymentPage.paymentDetailValue).textIs(uploadTestData.fastPaynowPayment.paymentDetail),
            await ensure(_PaymentsPages.FastPaymentPage.messageValue).textContains(uploadTestData.fastPaynowPayment.messageValue),
            await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(uploadTestData.fastPaynowPayment.emailId0),
            await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(uploadTestData.fastPaynowPayment.emailId1),
            await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(uploadTestData.fastPaynowPayment.emailId2),
            await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(uploadTestData.fastPaynowPayment.emailId3),
            await ensure(_PaymentsPages.FastPaymentPage.emailList).textContains(uploadTestData.fastPaynowPayment.emailId4),
            await ensure(_PaymentsPages.FastPaymentPage.referenceValue).isNotEmpty(),
            await ensure(_PaymentsPages.FastPaymentPage.chargeAcctValue).textContains(SIT? uploadTestData.fastPaynowPayment.fromAccount : uploadTestData.fastPaynowPayment.UAT.fromAccount),
        ]); 
    }
}
