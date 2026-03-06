/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu'
import { saveScreen, ensure, generatedID, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

// this from OnlineCreate, then Reject/Edit/Delete
let reference = "";
let reference2 = "";
let templateName = "";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

describe('SG_Demand Draft', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginCB(SIT ? testData.DemandDraft.SIT.loginCompanyId : testData.DemandDraft.UAT.loginCompanyId,
            SIT ? testData.DemandDraft.SIT.loginUserId : testData.DemandDraft.UAT.loginUserId);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create & Copy Demand Draft', async function () {
        //Create
        await _PaymentsPages.openMenu(Menu.Payments.DemandDraft);
        await _PaymentsPages.DDPaymentPage.newLoadCondition();
        await fillUpFields(false);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();

        //Copy
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.DDPaymentPage.newLoadCondition4View();
        await _PaymentsPages.AccountTransferPage.scrollToBottom();
        await _PaymentsPages.AccountTransferPage.copyButton.click();
        await _PaymentsPages.DDPaymentPage.newLoadCondition();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            reference = text;
            console.log(reference);
        });
        await ensure(_PaymentsPages.AccountTransferPage).isUXSuccess();

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.DDPaymentPage.newLoadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.pickupLocationValueIX).textContains(testData.DemandDraft.pickupLocation)
        ]);

    });

    it('Create DD Payment template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSgCDDTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'DemandDraft' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await fillUpFields(true);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await console.log(templateName);

        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition4DDTempView();
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.fromAccountValueIX).textContains(testData.DemandDraft.toAccountI3),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textIs(testData.status.Approved),
            await ensure(_PaymentsPages.DDPaymentPage.paymentTypeValue).textContains(testData.DemandDraft.DDPaymentTypeName)
        ]);
    });

    it('Make Demand Draft payment from template', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.jsClick();
        await _PaymentsPages.DDPaymentPage.newLoadCondition();
        await _PaymentsPages.DDPaymentPage.pickupLocationIX.select(testData.DemandDraft.pickupLocation);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getInfoReferenceID().then(text => {
            reference2 = text;
            console.log(reference2);
        });

        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.DDPaymentPage.newLoadCondition4View();
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.pickupLocationValueIX).textContains(testData.DemandDraft.pickupLocation)
        ]);

    });

    it('create DD payee with Payee / Address line 1 let blank', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.Beneficiary);
        await _PaymentsPages.BeneficiaryPage.loadCondition();
        await _PaymentsPages.BeneficiaryPage.createNewPayee.click();
        await _PaymentsPages.BeneficiaryPage.loadConditionForCreateBenePage();
        let chequePayeeName = 'chequePayee' + generatedID();
        await _PaymentsPages.BeneficiaryPage.newPayeeName.input(chequePayeeName);
        await console.log(chequePayeeName);
        await _PaymentsPages.BeneficiaryPage.chequeOrDemand.jsClick();
        await _PaymentsPages.BeneficiaryPage.ddPaymentOption.jsClick();
        await _PaymentsPages.BeneficiaryPage.printedName.input(testData.Beneficiary.chequeDDPrintedName);
        await _PaymentsPages.BeneficiaryPage.next.click();
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.addr1ErrMsg).textContains(testData.DemandDraft.payeeAddr1ErrMsg)
        ]);
    });

    it('Create Demand Draft with new payee, then let Payee / Address line 1 blank and Pick Up Location blank', async function () {
        await _PaymentsPages.openMenu(Menu.Payments.DemandDraft);
        await _PaymentsPages.DDPaymentPage.newLoadCondition();
        await fillUpFieldsWithoutField();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.DDPaymentPage.addr1ErrMsg).textContains(testData.DemandDraft.payeeAddr1ErrMsg),
            await ensure(_PaymentsPages.DDPaymentPage.pickUpLocationErrMsg).textContains(testData.DemandDraft.pickUpLocationErrMsg)
        ]);
    });

});

async function fillUpFields(isTemplate: boolean) {

    await _PaymentsPages.DDPaymentPage.fromAccountIX.select(testData.DemandDraft.toAccountI3);
    await _PaymentsPages.DDPaymentPage.newLoadCondition();
    await _PaymentsPages.DDPaymentPage.paymentCurrencyIX.select("SGD");
    await _PaymentsPages.DDPaymentPage.payableCountryIX.select("BN");
    await _PaymentsPages.DDPaymentPage.amountIX.input(testData.DemandDraft.amountA1);
    if (isTemplate) {
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.DemandDraft.amountA1);
    }
    await existingBeneficiary(testData.DemandDraft.newBeneficiaryName);
    await _PaymentsPages.DDPaymentPage.pickupLocationIX.select(testData.DemandDraft.pickupLocation);
}

async function fillUpFieldsWithoutField() {
    await _PaymentsPages.DDPaymentPage.fromAccountIX.select(testData.DemandDraft.toAccountI3);
    await _PaymentsPages.DDPaymentPage.newLoadCondition();
    await _PaymentsPages.DDPaymentPage.paymentCurrencyIX.select(testData.DemandDraft.paymentCCY);
    await _PaymentsPages.DDPaymentPage.payableCountryIX.select(testData.DemandDraft.payableCountry);
    await _PaymentsPages.DDPaymentPage.amountIX.input(testData.DemandDraft.amountA1);
    await _PaymentsPages.DDPaymentPage.newPayeeTabIX.click();
    await _PaymentsPages.DDPaymentPage.payeeNameIX.input(testData.DemandDraft.newPayeeName);
    await _PaymentsPages.DDPaymentPage.payableToIX.input(testData.DemandDraft.payableTo);
}

async function existingBeneficiary(existingPayee: string) {
    await _PaymentsPages.DDPaymentPage.existingBeneficiaryIX.select(existingPayee);
}
