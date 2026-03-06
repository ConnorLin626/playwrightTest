/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages} from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase,generatedID, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let templateName="";
let testData = _PaymentsPages.fetchTestData('ID_testData.json');

describe('ID_ICT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ICTPayment.SIT.loginCompanyId : testData.ICTPayment.UAT.loginCompanyId, SIT ? testData.ICTPayment.SIT.loginUserId : testData.ICTPayment.UAT.loginUserId, testData.ICTPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // Add for R8.13 IDXP-437
    it('Create ICT without Compliance Code & Underlying Code check will display error message', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.IntraCompanyTransferPage.ictMenu.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.ICTPayment.SIT.fromAccount : testData.ICTPayment.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.ICTPayment.SIT.toAccount : testData.ICTPayment.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICTPayment.amount);
        await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.complianceCodeErrorMsg).textContains(testData.ICTPayment.complianceCodeErroMsg),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.underlyingCodeErrorMsg).textContains(testData.ICTPayment.underlyingCodeErroMsg),
        ]);
    });

    it('Create ICT Template without Compliance Code & Underlying Code check will display error message', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createIDICTPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'ICTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.ICTPayment.SIT.fromAccount : testData.ICTPayment.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.ICTPayment.SIT.toAccount : testData.ICTPayment.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICTPayment.amount);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.complianceCodeErrorMsg).textContains(testData.ICTPayment.complianceCodeErroMsg),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.underlyingCodeErrorMsg).textContains(testData.ICTPayment.underlyingCodeErroMsg),
        ]);
    });
   
    it('Create ICT Template check Compliance Code & Underlying Code', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createIDICTPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'ICTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.ICTPayment.SIT.fromAccount : testData.ICTPayment.UAT.fromAccount);
        await _PaymentsPages.IntraCompanyTransferPage.toAccount.select(SIT ? testData.ICTPayment.SIT.toAccount : testData.ICTPayment.UAT.toAccount);
        await _PaymentsPages.IntraCompanyTransferPage.amount.input(testData.ICTPayment.amount);
        await _PaymentsPages.RTGSPaymentPage.regulatoryComplianceCode.select(testData.ICTPayment.complianceCode);
        await _PaymentsPages.RTGSPaymentPage.underlyingCode.select(testData.ICTPayment.underlyingCode);
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteButton.jsClick();
        await _PaymentsPages.IntraCompanyTransferPage.transactionNoteInput.input(testData.ICTPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.submitBtn.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.IntraCompanyTransferPage.loadConditionForViewICTTemplatePage();

        await Promise.all([
            await ensure(_PaymentsPages.IntraCompanyTransferPage.complianceCodeValue).textContains(testData.ICTPayment.complianceCode),
            await ensure(_PaymentsPages.IntraCompanyTransferPage.underlyingCodeValue).textContains(testData.ICTPayment.underlyingCode),
        ]);
    });
});
