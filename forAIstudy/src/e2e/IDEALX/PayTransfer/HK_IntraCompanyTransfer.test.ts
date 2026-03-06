/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let referenceEdit ='';
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData.json');

describe('HK_IntraCompanyTransfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.loginUserId : testData.IntraCompanyTransfer.UAT.loginUserId,SIT ? testData.IntraCompanyTransfer.SIT.pinId : testData.IntraCompanyTransfer.UAT.pinId); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create an ICT Payment', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.IntraCompanyTransfer.additionNote);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await checkViewPageAllField(false) //add for IDXP-812
    });

    it('Edit an ICT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch('Intra Company Transfer', testData.status.PendingApproval);
        }
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        await _PaymentsPages.IntraCompanyTransferPage.editButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.amount.clean();
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.IntraCompanyTransfer.editAmount);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForEdit();
        await _PaymentsPages.IntraCompanyTransferPage.modifyNextButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
        await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTPaymentPage();
        if(reference==referenceEdit){
            await checkViewPageAllField(true); //Add for IDXP-812
            
        } else {
            await Promise.all([
                await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.editAmount),
            ]);
       }
    });
});

export async function checkViewPageAllField(isEdit= false) {
    await Promise.all([
        await ensure(_PaymentsPages.IntraCompanyTransferPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.deductAmountValue).textContains(isEdit ? testData.IntraCompanyTransfer.editAmount : testData.IntraCompanyTransfer.amountA1),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount : testData.IntraCompanyTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.toAccount : testData.IntraCompanyTransfer.UAT.toAccount),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(isEdit ? testData.IntraCompanyTransfer.editAmount : testData.IntraCompanyTransfer.amountA1),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.paymentType).textContains(testData.IntraCompanyTransfer.paymentType),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.totalDeductValueNonDol).textContains(isEdit ? testData.IntraCompanyTransfer.editAmount : testData.IntraCompanyTransfer.amountA1),
        await ensure(_PaymentsPages.IntraCompanyTransferPage.messageToApproverValue).textContains(testData.IntraCompanyTransfer.additionNote),
    ]);
}