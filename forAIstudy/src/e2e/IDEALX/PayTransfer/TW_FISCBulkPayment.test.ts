/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser } from 'protractor';
import { NavigatePages, PaymentsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, handlerCase, SIT, PROJECT_TYPE, generatedID } from "../../../lib";

let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _PaymentsPages.fetchTestData('TW_testData.json');
let fileName = '';
let templateName = '';
let paymentType = "";
let approvalOption = "";

//DASB-16490
describe('TW FISC Bulk Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TWFISCBPY.SIT.loginCompanyId : testData.TWFISCBPY.UAT.loginCompanyId, SIT ? testData.TWFISCBPY.SIT.loginUserId : testData.TWFISCBPY.UAT.loginUserId, SIT ? 123123 : testData.TWFISCBPY.UAT.Password); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('upload an Fisc bulk payment set transaction code = 28', async function () {
        paymentType = "ALL - Universal File Format";
        approvalOption = "transaction";
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, paymentType, SIT ? testData.TWFISCBPY.SIT.fileName : testData.TWFISCBPY.UAT.fileName, approvalOption).then(async (data) => {
            fileName = data;
            console.log(fileName);
        });
        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(fileName);
        await Promise.all([
            await ensure(_PaymentsPages.TransferCentersPage.TransactionCodeValue).textContains(testData.TWFISCBPY.TransactionCode),
            await ensure(_PaymentsPages.TransferCentersPage.DebitTypeValue).textContains(testData.TWFISCBPY.DebitType)
        ]);
    });

    it('Create bulk payment Template via select Debit type =  Consolidated Debit,', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createFISCBulkTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        templateName = "FISCBulkT" + generatedID();
        await console.log(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.TWFISCBPY.SIT.fromAccount : testData.TWFISCBPY.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.TWFISCBPY.amountV);
        //await _PaymentsPages.PaymentTemplatesPage.debitTypeSelect.select(testData.TWFISCBPY.DebitType);
        await _PaymentsPages.BulkPaymentPage.debitTypeSelect.click();
        await _PaymentsPages.BulkPaymentPage.ConsolidatedDebit.click()
        await addExistingPayee(testData.TWFISCBPY.ExistingPayee, testData.TWFISCBPY.amountA2);
        await _PaymentsPages.PaymentTemplatesPage.TransactionValue.jsClick();
        await ensure(_PaymentsPages.PaymentTemplatesPage.TransactionValue).textIs(testData.TWFISCBPY.TransactionCode);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.DebitTypeValue).textContains(testData.TWFISCBPY.DebitType),
            await ensure(_PaymentsPages.PaymentTemplatesPage.TransactionCodeValue).textContains(testData.TWFISCBPY.TransactionCode)
        ]);
    });

    // add for IEBAA-3403/IEBAA-3410
    it('Create SC Bulk payment template with Organisation Select All ', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.template.SIT.loginCompanyId02 : testData.template.UAT.loginCompanyId02, SIT ? testData.template.SIT.loginUserId02 : testData.template.UAT.loginUserId02,  SIT ? 123123 : testData.template.UAT.Password);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        // await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateOrganition.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.showAll.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createFISCBulkTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        await _PaymentsPages.PaymentTemplatesPage.createTempOrgSelect.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.SCOrg.jsClick();
        templateName="TWBulk"+generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.template.SIT.fromSCAccount01 : testData.template.UAT.fromSCAccount01);
        await _PaymentsPages.BulkPaymentPage.debitTypeSelect.click();
        await _PaymentsPages.BulkPaymentPage.ConsolidatedDebit.click();
        await addExistingPayee(testData.template.bulkPayee01, testData.template.amount);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateOrganition.click();
        await _PaymentsPages.PaymentTemplatesPage.showAll.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.template.SIT.fromSCAccount01 : testData.template.UAT.fromSCAccount01),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiary).textContains(testData.template.bulkPayee01),
        ]);
    });

    it('Delete SC template with Organisation Select All', async function () {
        //delete one template
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateOrganition.click();
        await _PaymentsPages.PaymentTemplatesPage.showAll.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.deleteBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.dialogDelete.click();
        await _PaymentsPages.PaymentTemplatesPage.dismissBtn.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateOrganition.click();
        await _PaymentsPages.PaymentTemplatesPage.showAll.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await ensure(_PaymentsPages.TransferCentersPage.transactionResult).textIs(testData.template.labelNoInformationDisplay);
    });
});

export async function addExistingPayee(name: string, amount: string) {
    await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(name);
    await _PaymentsPages.BulkPaymentPage.addButton.click();
    await _PaymentsPages.BulkPaymentPage.amount.input(amount);
}
