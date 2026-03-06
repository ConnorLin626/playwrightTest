/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, } from "../../../pages/IDEALX";
import { generatedID, ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');
let singleTemplateName = '';
let newPayeeName='';

describe('CN Manage Template', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.template.SIT.loginCompanyId : testData.template.UAT.loginCompanyId, SIT ? testData.template.SIT.loginUserId : testData.template.UAT.loginUserId, "P@ssword1A!");
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create CN IBPS payment template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        // await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleCNPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'ibpsPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT?testData.template.SIT.fromIBPSAccount : testData.template.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.template.IBPSPayment.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.addNewPayeeBtn.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.selectedCountry.select(testData.template.IBPSPayment.Country);
        newPayeeName = 'IBPSNewPayeeName' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.newPayeeName.input(newPayeeName);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeNickName.input(newPayeeName);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd1.input(testData.template.IBPSPayment.newPayeeAdd1);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd2.input(testData.template.IBPSPayment.newPayeeAdd2);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd3.input(testData.template.IBPSPayment.newPayeeAdd3);
        await _PaymentsPages.IBPSPaymentPage.payeeBankID.select(testData.template.IBPSPayment.payeeBankID); 
        await browser.sleep(5000);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAcctNumber.input(testData.template.IBPSPayment.newPayeeAcctNumber);
        await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.template.IBPSPayment.paymentDetail);
        //await _PaymentsPages.PaymentTemplatesPage.TxnRemark1.input(testData.template.IBPSPayment.paymentDetail);



        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccount).textContains(SIT?testData.template.SIT.fromIBPSAccount : testData.template.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amount).textContains(testData.template.IBPSPayment.amountA1),
            await ensure(_PaymentsPages.IBPSPaymentPage.toExistingPayeeValue).textContains(newPayeeName)
        ]);
    })

    //R8.14 add CROATIA + EUR
    it('Create CN Cross border ach payment template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        // await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createCrossBorderPaymentTemBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        let templateName = 'achPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT?testData.template.SIT.fromAccount : testData.template.UAT.fromUatAccount);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(testData.template.CrossBorder.paymentCountry);
        await _PaymentsPages.CrossBoarderACHPage.paymentCountry.select(testData.template.CrossBorder.cROATIACtry);
        await _PaymentsPages.CrossBoarderACHPage.debitType.select(testData.template.CrossBorder.debitType);
        await _PaymentsPages.CrossBoarderACHPage.newPayee.click();
        let newPayeeName = 'newPayeeName' + generatedID();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeName.input(newPayeeName);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeNickname.input(newPayeeName);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAdd1.input(testData.template.CrossBorder.newPayeeAdd1);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAdd2.input(testData.template.CrossBorder.newPayeeAdd2);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAdd3.input(testData.template.CrossBorder.newPayeeAdd3);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeBankID.input(testData.template.CrossBorder.payeeBankId);
        await _PaymentsPages.BulkPaymentPage.payeeBankResult.click();
        await _PaymentsPages.CrossBoarderACHPage.newPayeeRoutingCode.input(testData.template.CrossBorder.newPayeeRoutingCode);
        await _PaymentsPages.CrossBoarderACHPage.newPayeeAcctNo.input(testData.template.CrossBorder.newPayeeAcctNo);
        await _PaymentsPages.CrossBoarderACHPage.addPayeeBtn.click();
        await _PaymentsPages.CrossBoarderACHPage.payeeAmount.input(testData.template.CrossBorder.amount);
        await _PaymentsPages.CrossBoarderACHPage.purposePaymentLine.input(testData.template.CrossBorder.purposePaymentLine);
        await _PaymentsPages.CrossBoarderACHPage.counterPartyCode.select(testData.template.CrossBorder.counterPartyCode);
        await _PaymentsPages.CrossBoarderACHPage.specPmtPurpose.select(testData.template.CrossBorder.specPmtPurpose);
        await _PaymentsPages.CrossBoarderACHPage.pmtCategory1.select(testData.template.CrossBorder.pmtCategory1);
        await _PaymentsPages.CrossBoarderACHPage.seriesCode1.select(testData.template.CrossBorder.seriesCode1);
        await _PaymentsPages.CrossBoarderACHPage.cnttTransRemark1.input(testData.template.CrossBorder.cnttTransRemark1);
        await _PaymentsPages.CrossBoarderACHPage.showHideDetail.click(); 
        await _PaymentsPages.CrossBoarderACHPage.paymentDetailLine.input(testData.template.CrossBorder.paymentDetail);
        await _PaymentsPages.CrossBoarderACHPage.MessageToPayee.jsClick();
        await _PaymentsPages.CrossBoarderACHPage.Email1.input(testData.template.CrossBorder.Email1);
        await _PaymentsPages.CrossBoarderACHPage.Email2.input(testData.template.CrossBorder.Email2);
        await _PaymentsPages.CrossBoarderACHPage.Email3.input(testData.template.CrossBorder.Email3);
        await _PaymentsPages.CrossBoarderACHPage.Email4.input(testData.template.CrossBorder.Email4);
        await _PaymentsPages.CrossBoarderACHPage.Email5.input(testData.template.CrossBorder.Email5);
        await _PaymentsPages.CrossBoarderACHPage.Message.input(testData.template.CrossBorder.Message);
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
            await ensure(_PaymentsPages.CrossBoarderACHPage.fromAccountView).textContains(SIT?testData.template.SIT.fromAccount : testData.template.UAT.fromUatAccount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.template.CrossBorder.amount),
            await ensure(_PaymentsPages.CrossBoarderACHPage.amountView).textContains(testData.template.CrossBorder.EUR)
        ]);
    })
});