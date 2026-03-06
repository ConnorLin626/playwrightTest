/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let referenceEdit = "";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');

describe('TW_ ACH Manage Payroll Alternate', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TWACHManagePayroll02.SIT.loginCompanyId : testData.TWACHManagePayroll02.UAT.loginCompanyId, SIT ? testData.TWACHManagePayroll02.SIT.loginUserId : testData.TWACHManagePayroll02.UAT.loginUserId, SIT ? 123123 : testData.TWACHManagePayroll02.UAT.Password);});    
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Manage Payroll Alternate with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PayrollPage.managePayroll02.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.fromAccount.select(SIT ? testData.TWACHManagePayroll02.SIT.fromAccount : testData.TWACHManagePayroll02.UAT.fromAccount);
        //await _PaymentsPages.PayrollPage.paymentPriorityType.select("Next day payment (ACH)");
        await _PaymentsPages.PayrollPage.billerServiceID.select(testData.TWACHManagePayroll02.billerServiceID);
        await _PaymentsPages.PayrollPage.newPayee.jsClick();
        await _PaymentsPages.PayrollPage.newPayeeName.input(testData.TWACHManagePayroll02.payeeName);
        await _PaymentsPages.PayrollPage.newPayeeNickname.input(testData.TWACHManagePayroll02.newPayeeNickname);
        await _PaymentsPages.PayrollPage.payeeBankID.input(SIT ? testData.TWACHManagePayroll02.SIT.payeeBankID : testData.TWACHManagePayroll02.UAT.payeeBankID);
        await _PaymentsPages.PayrollPage.payeeBankResult.click();
        await _PaymentsPages.PayrollPage.newPayeeAcctNo.input(testData.TWACHManagePayroll02.accountNumber);
        await _PaymentsPages.PayrollPage.newPayeeButton.click();
        await _PaymentsPages.PayrollPage.amount.input(testData.TWACHManagePayroll02.amountA1);
        await _PaymentsPages.PayrollPage.payeeNationalID.input(testData.TWACHManagePayroll02.payeeNationalID);
        await _PaymentsPages.PayrollPage.payeeMandateDetail.input(testData.TWACHManagePayroll02.payeeMandateDetail);
        await _PaymentsPages.PayrollPage.payeeStockCode.input(testData.TWACHManagePayroll02.payeeStockCode);
        await _PaymentsPages.PayrollPage.showoptionaldetails.click();
        await _PaymentsPages.PayrollPage.payeePassbook.input(testData.TWACHManagePayroll02.payeePassbook);
        await _PaymentsPages.PayrollPage.payeeFreeText4Sender.input(testData.TWACHManagePayroll02.payeeFreeText4Sender)
        await _PaymentsPages.PayrollPage.isBeneAdvising.jsClick();
        await _PaymentsPages.PayrollPage.emailIdO.input(testData.TWACHManagePayroll02.emailIdO);
        await _PaymentsPages.PayrollPage.emailId1.input(testData.TWACHManagePayroll02.emailId1);
        await _PaymentsPages.PayrollPage.emailId2.input(testData.TWACHManagePayroll02.emailId2);
        await _PaymentsPages.PayrollPage.emailId3.input(testData.TWACHManagePayroll02.emailId3);
        await _PaymentsPages.PayrollPage.emailId4.input(testData.TWACHManagePayroll02.emailId4);
        await _PaymentsPages.PayrollPage.message.input(testData.TWACHManagePayroll02.message);
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
        await checkViewPageAllField(false);//Add for IDXP-812
    });

    it('Edit Manage Payroll Alternate via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("TW - ACH Management Payroll (Alternate)", testData.status.PendingApproval);
        }
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await _PaymentsPages.PayrollPage.editButton.click();
        await _PaymentsPages.PayrollPage.loadCondition();
        await _PaymentsPages.PayrollPage.amount.clean();
        await _PaymentsPages.PayrollPage.amount.input(testData.TWACHManagePayroll02.amountEdit);
        await _PaymentsPages.PayrollPage.batchId.clean();
        await _PaymentsPages.PayrollPage.nextButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForPreviewPage();
        await _PaymentsPages.PayrollPage.submitButton.click();
        await _PaymentsPages.PayrollPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PayrollPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });

        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        if(referenceEdit == reference){
            await checkViewPageAllField(true);//add for IDXP-812 
        }else{
            await Promise.all([
                await ensure(_PaymentsPages.PayrollPage.amountView).textContains(testData.TWACHManagePayroll02.amountEdit),
            ]);
        }  
    });

});

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.TWACHManagePayroll02.SIT.fromAccount : testData.TWACHManagePayroll02.UAT.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.amountView).textContains(isEdit? testData.TWACHManagePayroll02.amountEdit : testData.TWACHManagePayroll02.amountA1),
        await ensure(_PaymentsPages.PayrollPage.accountNumberValue).textContains(testData.TWACHManagePayroll02.accountNumber),
        await ensure(_PaymentsPages.PayrollPage.transactionStatusValue).textContains(testData.status.PendingApproval),
        //Add all field
        await ensure(_PaymentsPages.PayrollPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.paymentType).textContains(testData.TWACHManagePayroll02.paymentType),
        await ensure(_PaymentsPages.PayrollPage.bankChargeView).textContains(testData.TWACHManagePayroll02.bankChargeUs),
        await ensure(_PaymentsPages.PayrollPage.chargeAccountView).textContains(SIT ? testData.TWACHManagePayroll02.SIT.fromAccount : testData.TWACHManagePayroll02.UAT.fromAccount),
        await ensure(_PaymentsPages.PayrollPage.paymentDate).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.referenceValue).textContains(reference),
        await ensure(_PaymentsPages.PayrollPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.billerServiceIDValue).textContains(testData.TWACHManagePayroll02.billerServiceID),
        await ensure(_PaymentsPages.PayrollPage.paymentSummaryValue).textContains(isEdit? testData.TWACHManagePayroll02.amountEdit : testData.TWACHManagePayroll02.amountA1),
        await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.TWACHManagePayroll02.payeeName),
        await ensure(_PaymentsPages.PayrollPage.payeeNickNameValue).textContains(testData.TWACHManagePayroll02.newPayeeNickname),
        await ensure(_PaymentsPages.PayrollPage.bankNameValue).textContains(SIT ? testData.TWACHManagePayroll02.SIT.bankName : testData.TWACHManagePayroll02.UAT.bankName),
        await ensure(_PaymentsPages.PayrollPage.branchNameValue).textContains(SIT ? testData.TWACHManagePayroll02.SIT.branchName : testData.TWACHManagePayroll02.UAT.branchName),
        await ensure(_PaymentsPages.PayrollPage.bankSwiftBicValue).textContains(SIT ? testData.TWACHManagePayroll02.SIT.payeeBankID : testData.TWACHManagePayroll02.UAT.payeeBankID),
        await ensure(_PaymentsPages.PayrollPage.nationalIDValue).textContains(testData.TWACHManagePayroll02.payeeNationalID),
        await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(isEdit? testData.TWACHManagePayroll02.amountEdit : testData.TWACHManagePayroll02.amountA1),
        await ensure(_PaymentsPages.PayrollPage.mandateDetailsView).textContains(testData.TWACHManagePayroll02.payeeMandateDetail),
        await ensure(_PaymentsPages.PayrollPage.stockCodeView).textContains(testData.TWACHManagePayroll02.payeeStockCode),
        await _PaymentsPages.PayrollPage.showOptionView.jsClick(),
        await ensure(_PaymentsPages.PayrollPage.passBookValue).textContains(testData.TWACHManagePayroll02.payeePassbook),
        await ensure(_PaymentsPages.PayrollPage.freeTextValue).textContains(testData.TWACHManagePayroll02.payeeFreeText4Sender),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.TWACHManagePayroll02.emailIdO),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.TWACHManagePayroll02.emailId1),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.TWACHManagePayroll02.emailId2),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.TWACHManagePayroll02.emailId3),
        await ensure(_PaymentsPages.PayrollPage.emailListValue).textContains(testData.TWACHManagePayroll02.emailId4),
        await ensure(_PaymentsPages.PayrollPage.messageValue).textContains(testData.TWACHManagePayroll02.message),
        await ensure(_PaymentsPages.PayrollPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.PayrollPage.activityLog).isNotEmpty(),
    ]);
}