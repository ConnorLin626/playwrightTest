/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
import { OperationsPages } from '../../../pages/SAM';
import * as moment from "moment"

let reference = "";
let reference1 = "";
let approvalReference = '';
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
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId, testData.Payroll.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Can not create payroll with item amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.moreThanMaxAmountIX);
        await ensure(_PaymentsPages.PayrollPage.amountErrorTip).textContains(testData.Payroll.amountErrorTip);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.hasUXIxErrorMsg1(testData.Payroll.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Create payroll with item amount enqual to 1000000000 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.maxAmountIX);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.maxAmount),
        ]);
    });

    it('Create payroll with Total amount greater than 1000000000 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.click();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.Payroll.newPayeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.Payroll.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.Payroll.SIT.payeeBankID : testData.Payroll.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.Payroll.newPayeeAcctNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.maxAmountIX);
        await _PaymentsPages.PayrollPage.existingPayeeTabIx.click();
        await _PaymentsPages.PayrollPage.filterExistingPayee.input(testData.Payroll.payrollExistingPayee);
        await _PaymentsPages.PayrollPage.addpayee.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amountIX);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.PendingApproval, testData.status.PendingVerification),
        ]);
    });

        //due to approver new ui

    it('Approve Payroll after cutoff time via My approve', async function () {
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
        // set today as holiday
        await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSID, _PaymentsPages.PayrollPage.IDPayrollScheduleLink, day, "");
        // approve schedule
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2)
        await _OperationsPages.schedulesPage.approveCutOffTime(testDataSAM.selectAffiliateByValue.DBSID, _PaymentsPages.PayrollPage.approveScheduleLink);
        await new NavigatePages().loginIdealx(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId, "123123");
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _ApprovalsPages.ApprovalPage.byTransactionFilter.input(reference);
        } else {
            await _ApprovalsPages.ApprovalPage.showAddFilter.click();
            await _ApprovalsPages.ApprovalPage.paymentTypeList.select("ID - Payroll");
            await _PaymentsPages.PayrollPage.serachButton.jsClick();
        }
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference1 = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.approveBtn.jsClick();
        await _PaymentsPages.PayrollPage.pushOption.jsClickIfExist();
        await _PaymentsPages.PayrollPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.PayrollPage.challengeResponse.input('12312312');
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _PaymentsPages.PayrollPage.approveSubmitBtn.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.paymentDate).textNotContains(currentDate),
        ]);
    });

    it('Release a payroll Payment via My Release', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();

        await _ApprovalsPages.MyVerificationAndReleasePage.releaseSingleTxnUnderList(_PaymentsPages, reference, reference1, "ID - Payroll").then(reference => {
            approvalReference = reference;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(approvalReference);
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed, testData.status.BankRejected),
            await ensure(_PaymentsPages.PayrollPage.paymentDate).textNotContains(currentDate),
        ]);
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM1)
        // set today as workingDay
        await _OperationsPages.schedulesPage.editCutOffTime(testDataSAM.selectAffiliateByValue.DBSID, _PaymentsPages.PayrollPage.IDPayrollScheduleLink, day, testDataSAM.schedule.CutoffTime01);
        // approve schedule
        await new NavigatePages().loginSAM(testDataSAM.loginSAMID.ASADM2)
        await _OperationsPages.schedulesPage.approveCutOffTime(testDataSAM.selectAffiliateByValue.DBSID, _PaymentsPages.PayrollPage.approveScheduleLink);
    });
});