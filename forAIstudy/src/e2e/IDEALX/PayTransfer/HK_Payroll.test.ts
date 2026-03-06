/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _FilesPages = new FilesPages();
let fileName ="";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK_Payroll', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.Payroll.SIT.loginCompanyId : testData.Payroll.UAT.loginCompanyId, SIT ? testData.Payroll.SIT.loginUserId : testData.Payroll.UAT.loginUserId, SIT ? testData.Payroll.SIT.pinId : testData.Payroll.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    it('File Services upload upload any Payroll with new change Account number payee', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        // upload File start
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.Payroll.SIT.fileName : testData.Payroll.UAT.fileName, testData.Payroll.approvalOptionByTxn).then(async (data) => {
            fileName = data;
        });
        // upload File end
        // go to Transfer Center
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount),
            await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.Payroll.amount),
            await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.Payroll.AcctNumberPayee),
            await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        ]);
    });

    //Add for DASB-74531
    it('Create Payroll payment Add using HK FPS details', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.payroll.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.Payroll.SIT.fromAccount : testData.Payroll.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.newPayee.jsClick();
        await _PaymentsPages.PayrollPage.FPSPayeDetail.jsClick();
        await _PaymentsPages.PayrollPage.fpsMobileNumber.input(testData.Payroll.mobileNumber);
        await _PaymentsPages.PayrollPage.retriveButton.jsClick();
        await browser.sleep(1000);
        await _PaymentsPages.PayrollPage.savePayNow.jsClick();
        await _PaymentsPages.PayrollPage.newPayNowNickName.input(testData.Payroll.newPayeeNickname);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await ensure(_PaymentsPages.PayrollPage.nicknameMsg).isNotElementPresent()
        await _PaymentsPages.PayrollPage.amount.input(testData.Payroll.amount);
        await _PaymentsPages.PayrollPage.nextButton.click();
        await ensure(_PaymentsPages.PayrollPage.nicknameMsgTop).textContains(testData.Payroll.Msg)
    });
});