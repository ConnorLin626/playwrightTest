/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let referenceEdit ='';
let templateName="";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

//add for IDXP-1000
describe('CN_IntraCompanyTransfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.IntraCompanyTransfer.SIT.loginCompanyId : testData.IntraCompanyTransfer.UAT.loginCompanyId, SIT ? testData.IntraCompanyTransfer.SIT.loginUserId : testData.IntraCompanyTransfer.UAT.loginUserId, testData.Beneficiary.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    
    it('Create an ICT Payment from account is IDR to account is IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount1 : testData.IntraCompanyTransfer.UAT.fromAccount1);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount1 : testData.IntraCompanyTransfer.UAT.toAccount1);
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
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.transactionStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.fromAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount1 : testData.IntraCompanyTransfer.UAT.fromAccount1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.toAccountValue).textContains(SIT ? testData.IntraCompanyTransfer.SIT.toAccount1 : testData.IntraCompanyTransfer.UAT.toAccount1),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.amountValue).textContains(testData.IntraCompanyTransfer.amountA1),
        ]);

    });
    it('edit an ICT template from account is IDR to account is CNY', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createIDICTPaymentTemplateBtn.click();
        templateName = 'ICTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount1 : testData.IntraCompanyTransfer.UAT.fromAccount1);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.IntraCompanyTransfer.SIT.toAccount2 : testData.IntraCompanyTransfer.UAT.toAccount2);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.IntraCompanyTransfer.amountA1);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.submitBtn.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTTemplatePage();
        await _PaymentsPages.PaymentTemplatesPage.editTempButton.click();
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.IntraCompanyTransfer.editAmount);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.submitBtn.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateICTStatus).textIs(testData.status.Approved),
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccountICT).textContains(SIT ? testData.IntraCompanyTransfer.SIT.fromAccount1 : testData.IntraCompanyTransfer.UAT.fromAccount1),
            await ensure(_PaymentsPages.PaymentTemplatesPage.toAccountICT).textContains(SIT ? testData.IntraCompanyTransfer.SIT.toAccount2 : testData.IntraCompanyTransfer.UAT.toAccount2),
            await ensure(_PaymentsPages.PaymentTemplatesPage.sendAmountValue).textContains(testData.IntraCompanyTransfer.editAmount),
        ]);

    });

});