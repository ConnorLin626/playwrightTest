/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, } from "../../../pages/IDEALX";
import { generatedID, ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let _optPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('HK_testData_01.json');
let testData2 = _optPages.fetchTestData("HK_testData_01.json");
let singleTemplateName = '';
let ttTemplateName = '';
let NewPayeeName = '';
let bulkTemplateName ='';

describe('HK Manage Template', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.template.SIT.loginCompanyId : testData.template.UAT.loginCompanyId, SIT ? testData.template.SIT.loginUserId : testData.template.UAT.loginUserId, SIT ? testData.template.SIT.pinId : testData.template.UAT.pinId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create Bulk Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createHKBulkTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        bulkTemplateName = 'bulkPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.template.bulkPayment.SIT.fromAccount:testData.template.bulkPayment.UAT.fromAccount);
        await _PaymentsPages.BulkPaymentPage.DebitType.click();
        await _PaymentsPages.BulkPaymentPage.ConsolidatedDebit.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForPayeePage();
        await _PaymentsPages.PaymentTemplatesPage.existingPayeeFilter.input(testData.template.bulkPayment.existingPayeeName);
        await _PaymentsPages.PaymentTemplatesPage.addButton.click();
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.template.bulkPayment.payeeRef);
        await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.template.bulkPayment.amount);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.template.bulkPayment.SIT.fromAccount : testData.template.bulkPayment.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.payeeFilter.input(testData.template.bulkPayment.existingPayeeName);
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiary).textContains(testData.template.bulkPayment.existingPayeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.template.bulkPayment.amountIX)
        ]);
    });

    it('Create a Single Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleHKPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'fastPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.template.singlePayment.SIT.fromAccount : testData.template.singlePayment.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.template.singlePayment.amount);
        await _PaymentsPages.PaymentTemplatesPage.payeeSelect.select(testData.template.singlePayment.existingPayeeName);;
        await _PaymentsPages.AutoPayPaymentPage.chargeAccount.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccount).textContains(SIT ? testData.template.singlePayment.SIT.fromAccount : testData.template.singlePayment.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amount).textContains(testData.template.singlePayment.amount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.beneficiary).textContains(testData.template.singlePayment.existingPayeeName)
        ]);
    })
    //Add for IDXP-2256
     it('Create a TT Template with manually input max bank name length', async function () {
        this.timeout(420000);
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleHKPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        ttTemplateName = 'TT' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(ttTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.template.TT.SIT.fromAccount : testData.template.TT.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.template.TT.amount);
        await _PaymentsPages.PaymentTemplatesPage.addNewPayeeBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.selectedCountry.select(testData.template.TT.PayeeCountry);
        await _PaymentsPages.PaymentTemplatesPage.enterManually.click();
        await _PaymentsPages.PaymentTemplatesPage.payeeBankName.input(testData.template.TT.MaxPayeeBankName);
        await _PaymentsPages.PaymentTemplatesPage.payeeBankAdd1.input(testData.template.TT.payeeBankAdd1);
        await _PaymentsPages.PaymentTemplatesPage.payeeBankAdd2.input(testData.template.TT.payeeBankAdd2);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAcctNumber.input(testData.template.TT.newPayeeAcctNumber);
        NewPayeeName = "TTPayee" + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.newPayeeName.input(NewPayeeName);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeNickName.input(NewPayeeName);
        await _PaymentsPages.PaymentTemplatesPage.payeeLocation.select(testData.template.TT.PayeeLocation);
        await _PaymentsPages.PaymentTemplatesPage.townCity.input(testData.template.TT.TownCity);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd1.input(testData.template.TT.payeeAddress1);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd2.input(testData.template.TT.payeeAddress2);
        await _PaymentsPages.PaymentTemplatesPage.postalCode.input(testData.template.TT.PostalCode);
        await _PaymentsPages.AutoPayPaymentPage.chargeAccount.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        //await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(ttTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewOTTaccount).textContains(SIT ? testData.template.TT.SIT.fromAccount : testData.template.TT.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewAmount).textContains(testData.template.TT.amount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewOTTbeneName).textContains(NewPayeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewOTTPayeeBankName).textContains(testData.template.TT.MaxPayeeBankName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewOTTPayeeBankAdd1).textContains(testData.template.TT.payeeBankAdd1),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewOTTPayeeBankAdd2).textContains(testData.template.TT.payeeBankAdd2),
        ]);
        //delete template
        await deleteTemplate(ttTemplateName);
        //delete payee 
        await deletePayee(NewPayeeName);

    })

    it('Approve Bulk Payment Template on View Page', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.template.SIT.loginCompanyId : testData.template.UAT.loginCompanyId, SIT ? testData.template.SIT.approveUserId : testData.template.UAT.approveUserId, SIT ? testData.template.SIT.pinId : testData.template.UAT.pinId); 
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== bulkTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
            await _PaymentsPages.PaymentTemplatesPage.showAdditionFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select("HK - Bulk Payment")
        }
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            bulkTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewBulkPage();
        await _PaymentsPages.PaymentTemplatesPage.viewApproveBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.confirmApproveBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.dismissBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewBulkPage();

        await Promise.all([
        await ensure(_PaymentsPages.PaymentTemplatesPage.bulkTransactionStatus).textContains(testData.status.Approved)
        
        ]);
    });

    it('Approve Single Payment Template on View Page', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        if (0 !== singleTemplateName.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        } else {
            await _PaymentsPages.PaymentTemplatesPage.pendingTab.click();
            await _PaymentsPages.PaymentTemplatesPage.showAdditionFilter.click();
            await _PaymentsPages.PaymentTemplatesPage.paymentTypeList.select("HK FPS Payment (Batch)")
        }
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
            singleTemplateName = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();
        await _PaymentsPages.PaymentTemplatesPage.viewApproveBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.confirmApproveBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.dismissBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForViewPayge();

        await Promise.all([
        await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textContains(testData.status.Approved)
        
        ]);
    });
});

export async function deletePayee(payeename : string) {
        await _optPages.AccountTransferPage.paymentMenu.click();
        await _optPages.BeneficiaryPage.payeeMenu.click();
        await _optPages.BeneficiaryPage.loadCondition();
        await _optPages.BeneficiaryPage.payeeFilter.clean();
        await _optPages.BeneficiaryPage.payeeFilter.input(payeename);
        await _optPages.BeneficiaryPage.deletePayeeBtn.click();
        await _optPages.BeneficiaryPage.loadConditionForConfirmDeleteButton();
        await _optPages.BeneficiaryPage.confirmDelete.click();
        await _optPages.BeneficiaryPage.loadConditionForDismissButton();
        await _optPages.BeneficiaryPage.dismiss.click();
}
export async function deleteTemplate(templateName : string){
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
    await _PaymentsPages.PaymentTemplatesPage.selectTemCheckBox.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.getText().then(text => {
        templateName = text.trim();
    });
    await _PaymentsPages.PaymentTemplatesPage.deleteBtn.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForDeletePage();
    await _PaymentsPages.PaymentTemplatesPage.preDeleteBtn.jsClick();  //preview delete
    await _PaymentsPages.BulkPaymentPage.deleteDialogButton.click();
    await _PaymentsPages.TelegraphicTransferPage.dismissButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
}
