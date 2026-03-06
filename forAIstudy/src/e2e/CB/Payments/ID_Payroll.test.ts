/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';
import { OperationsPages } from '../../../pages/SAM';
import * as moment from "moment"

let reference = "";
let reference1 = "";
let verifyReference = '';
let approvalReference = '';
let templateName = '';
let paymentReference = '';
let _PaymentsPages = new PaymentsPages();
let _ApprovalsPages = new ApprovalsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');
let _OperationsPages = new OperationsPages();
let testDataSAM = _OperationsPages.fetchTestData('SAM_testData.json');
let day = new Date().getDay();
let currentDate = moment(new Date()).format("DD MMM YYYY");
let paymentDate = moment().add(1, 'days').format('DD MMM YYYY');

describe('ID_Payroll', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginCB(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Can not create payroll with item amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDPayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.moreThanMaxAmount);
        await ensure(_PaymentsPages.PayrollPage.amountErrorTip).textContains(testData.Payroll.amountErrorTip);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.hasUXErrorMsg(testData.Payroll.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create payroll with item amount enqual to 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDPayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.maxAmount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.maxAmount),
        ]);
    });

    it('Create payroll with Total amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.IDPayroll);
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayeeWitoutPaynow.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.payeeBankID.select(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.maxAmount);
        await _PaymentsPages.PayrollPage.existingPayeeTab.click();
        await _PaymentsPages.PayrollPage.filterExistingPayee.input(testData.Payroll.payrollExistingPayee);
        await _PaymentsPages.PayrollPage.addpayee.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getInfoReferenceID().then(text => {
            reference = text;
        });
        await ensure(_PaymentsPages.PayrollPage).isUXSuccess();
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            // await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.Payroll.maxAmount),
            // await ensure(_PaymentsPages.PayrollPage.paymentDate).textContains(currentDate),
            // await ensure(_PaymentsPages.PayrollPage.paymentDate).textContains(paymentDate),
        ]);
    });

    it('Approve Payroll after cutoff time via My approve', async function () {
        await new NavigatePages().loginSAM(SIT ? testDataSAM.loginSAMID.ASADM1 : testDataSAM.loginSAMID.ASADM2)
        // set today as holiday
        await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSID, _PaymentsPages.PayrollPage.IDPayrollScheduleLink, day, "");
        await new NavigatePages().loginCB(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId);
        await _PaymentsPages.openMenu(Menu.Approvals.PaymentsTransactionsFiles)
        await _ApprovalsPages.paymentsTransactionsFilesPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _ApprovalsPages.paymentsTransactionsFilesPage.byTransactionFilter.input(reference);
        } else {
            await _ApprovalsPages.paymentsTransactionsFilesPage.showAddFilter.click();
            await _ApprovalsPages.paymentsTransactionsFilesPage.paymentTypeList.select("ID - Payroll");
            await _PaymentsPages.PayrollPage.serachButton.click();
        }
        await _ApprovalsPages.paymentsTransactionsFilesPage.transactionList.selectFile(1);
        await _ApprovalsPages.paymentsTransactionsFilesPage.approveButton.click();
        await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
        await _PaymentsPages.PayrollPage.getChallengeSMS.clickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input('12312312');
        await _PaymentsPages.PayrollPage.approveButton.jsClick();
        await _PaymentsPages.RTGSPaymentPage.getInfoReferenceID().then(text => {
            reference1 = text;
        });
        await _PaymentsPages.PayrollPage.goToViewPaymentPageViaRef(_PaymentsPages, reference1);
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.paymentDate).textNotContains(currentDate),
        ]);
    });

    it('Release a payroll Payment via My Release', async function () {
        await _PaymentsPages.openMenu(Menu.Approvals.Releases);
        if (0 !== reference.trim().length) {
            await _ApprovalsPages.myVerificationAndReleasePage.byTransactionFilter.input(reference);
        } else {
            await _ApprovalsPages.myVerificationAndReleasePage.showAddFilter.click();
            await _ApprovalsPages.myVerificationAndReleasePage.paymentTypeList.select("ID - Payroll");
            await _PaymentsPages.PayrollPage.serachButton.click();
            await _ApprovalsPages.myVerificationAndReleasePage.loadConditionForReleaseByTxn();
        }
        await _ApprovalsPages.myVerificationAndReleasePage.transactionList.selectFile(1);
        await _ApprovalsPages.myVerificationAndReleasePage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.myVerificationAndReleasePage.txnReleaseBtn.click();
        await _ApprovalsPages.myVerificationAndReleasePage.txnVerifyReleasePreBtn.click();
        await _ApprovalsPages.myVerificationAndReleasePage.hasUXInfoMsg("successful").then(value => {
            if (!value) {
                throw new Error('Page failed. Expected message contain success.');
            }
        });
        await _PaymentsPages.PayrollPage.goToViewPaymentPageViaRef(_PaymentsPages, reference);
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
            await ensure(_PaymentsPages.PayrollPage.paymentDate).textNotContains(currentDate),
        ]);
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2)
        // set today as workingDay
        await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSID, _PaymentsPages.PayrollPage.IDPayrollScheduleLink, day, testDataSAM.schedule.CutoffTime01);
    });
});