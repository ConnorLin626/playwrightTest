// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
import { NavigatePages, PaymentsPages, FilesPages, ApprovalsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";
/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/

// this from OnlineCreate, then Edit/Reject/Delete
let _PaymentsPages = new PaymentsPages();
let reference : any = 0;
let testData = _PaymentsPages.fetchTestData('HK_testData.json');
let range= 999999999-1;
let customerReference = 1 + Math.round(Math.random()*range);

describe("HK Philippines", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.PartnerBank.SIT.loginCompanyId : testData.PartnerBank.UAT.loginCompanyId, SIT ? testData.PartnerBank.SIT.loginUserId : testData.PartnerBank.UAT.loginUserId, "123456"); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('HK Philippines - High Value Payment - RTGS', async function () {
        //create HK Philippines - High Value Payment - RTGS
        await _PaymentsPages.PaymentViaPartnerBankPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentViaPartnerBankPage.paymentViaPartnerBank.click();
        await _PaymentsPages.PaymentViaPartnerBankPage.loadCondition();
        await _PaymentsPages.PaymentViaPartnerBankPage.ptnBnkCountry.select(testData.PartnerBank.partnerBankLocation.PHILIPPINES);//select 'Partner Bank Location' = 'PHILIPPINES'
        await _PaymentsPages.PaymentViaPartnerBankPage.ptnBnkAccount.select(SIT ? testData.PartnerBank.SIT.RTGS.sourceAccount : testData.PartnerBank.UAT.RTGS.sourceAccount);//Choose Funding Account which has create access
        await _PaymentsPages.PaymentViaPartnerBankPage.ptnBnkPaymentType.select("High Value Payment - RTGS");//select PaymentType = "High Value Payment - RTGS"
        await _PaymentsPages.PaymentViaPartnerBankPage.ptnBnkCurrency.select("PHP");//select 'Currency' = 'PHP'
        await _PaymentsPages.PaymentViaPartnerBankPage.searchExistingPayee.input(testData.PartnerBank.SIT.payeeName);//select any existing Payee
        await _PaymentsPages.PaymentViaPartnerBankPage.existingPayee.click();
        await _PaymentsPages.PaymentViaPartnerBankPage.payeeAmount.input(testData.PartnerBank.amount);//input amount
        await _PaymentsPages.PaymentViaPartnerBankPage.showPayeeaddress.jsClick();//showPayeeaddress
        await _PaymentsPages.PaymentViaPartnerBankPage.payeeAddress.input("123123");//input Payeeaddress1 with any value.
        //* Check purposeCode is mandatory field but customeReference not.
        //set Custome Reference and purposeCode inputbox empty first.
        await _PaymentsPages.PaymentViaPartnerBankPage.nextButton.click();
        if (await _PaymentsPages.PaymentViaPartnerBankPage.alertError.ElementExist()) {
            await _PaymentsPages.PaymentViaPartnerBankPage.purposeCode.select(SIT ? testData.PartnerBank.SIT.RTGS.purposeCode : testData.PartnerBank.UAT.RTGS.purposeCode);//select purposeCode=BLSPAY
            //await _PaymentsPages.PaymentViaPartnerBankPage.customeReference.input(customerReference1.toString());//input customeReference with any value.
            await _PaymentsPages.PaymentViaPartnerBankPage.nextButton.click();
        }else{
            console.debug("submit success, purposeCode should be mandatory field.");
        }
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentViaPartnerBankPage.submitButton.click();
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentViaPartnerBankPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.PaymentViaPartnerBankPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference.toString());
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForViewpaymentViaPartnerBankPage();
        console.debug("viewAmount:"+await _PaymentsPages.PaymentViaPartnerBankPage.viewAmount.ElementExist());
        console.debug("ensure:"+ensure(_PaymentsPages.PaymentViaPartnerBankPage.viewAmount).isNotEmpty());
    });  

    it('HK Philippines - High Value Payment - PDDTS', async function () {
        //create HK Philippines - High Value Payment - PDDTS
        await _PaymentsPages.PaymentViaPartnerBankPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentViaPartnerBankPage.paymentViaPartnerBank.click();//create payment paymentViaPartnerBank
        //await _PaymentsPages.PaymentViaPartnerBankPage.loadCondition();
        await _PaymentsPages.PaymentViaPartnerBankPage.ptnBnkCountry.select(testData.PartnerBank.partnerBankLocation.PHILIPPINES);//select 'Partner Bank Location' = 'PHILIPPINES'
        await _PaymentsPages.PaymentViaPartnerBankPage.ptnBnkAccount.select(SIT ? testData.PartnerBank.SIT.PDDTS.sourceAccount : testData.PartnerBank.UAT.PDDTS.sourceAccount);//Choose Funding Account which has create access
        await _PaymentsPages.PaymentViaPartnerBankPage.ptnBnkPaymentType.select("High Value Payment - PDDTS");//select PaymentType = "High Value Payment - RTGS"
        await _PaymentsPages.PaymentViaPartnerBankPage.ptnBnkCurrency.select("USD");//select 'Currency' = 'PHP'
        await _PaymentsPages.PaymentViaPartnerBankPage.searchExistingPayee.input(testData.PartnerBank.SIT.payeeName);//select any existing Payee
        await _PaymentsPages.PaymentViaPartnerBankPage.existingPayee.click();
        await _PaymentsPages.PaymentViaPartnerBankPage.payeeAmount.input(testData.PartnerBank.amount);//input amount
        await _PaymentsPages.PaymentViaPartnerBankPage.showPayeeaddress.jsClick();//showPayeeaddress
        await _PaymentsPages.PaymentViaPartnerBankPage.payeeAddress.input("123123");//input Payeeaddress1 with any value.
        await _PaymentsPages.PaymentViaPartnerBankPage.purposeCode.select(SIT ? testData.PartnerBank.SIT.PDDTS.purposeCode : testData.PartnerBank.UAT.PDDTS.purposeCode);//select purposeCode=BLSPAY
        await _PaymentsPages.PaymentViaPartnerBankPage.customeReference.input(customerReference.toString());//input customeReference with any value.
        await _PaymentsPages.PaymentViaPartnerBankPage.nextButton.click();
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentViaPartnerBankPage.submitButton.click();
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForSubmittedPage();
        //edit HK Philippines - High Value Payment - PDDTS,check Check purposeCode is mandatory field but customeReference not.
        await _PaymentsPages.PaymentViaPartnerBankPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(customerReference.toString());
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForViewpaymentViaPartnerBankPage();
        await _PaymentsPages.PaymentViaPartnerBankPage.editButton.click();
        console.debug("paymentViaPartnerBank:"+_PaymentsPages.PaymentViaPartnerBankPage.paymentViaPartnerBank.ElementExist());
        await _PaymentsPages.PaymentViaPartnerBankPage.purposeCode.select("select");//select purposeCode=BLSPAY
        await _PaymentsPages.PaymentViaPartnerBankPage.customeReference.clean();
        console.debug(_PaymentsPages.PaymentViaPartnerBankPage.customeReference.getText());
        await _PaymentsPages.PaymentViaPartnerBankPage.nextButton.click();
        if (await _PaymentsPages.PaymentViaPartnerBankPage.alertError.ElementExist()) {
            await _PaymentsPages.PaymentViaPartnerBankPage.purposeCode.select(SIT ? testData.PartnerBank.SIT.PDDTS.purposeCode : testData.PartnerBank.UAT.PDDTS.purposeCode);//select purposeCode=BLSPAY
            await _PaymentsPages.PaymentViaPartnerBankPage.nextButton.click();
        }else{
            console.debug("submit success, purposeCode should be mandatory field.");
        }
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForPrevewPage();
        await _PaymentsPages.PaymentViaPartnerBankPage.submitButton.click();
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForSubmittedPage();
        await _PaymentsPages.PaymentViaPartnerBankPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(customerReference.toString());
        console.debug("customerReference:"+customerReference);
        await _PaymentsPages.PaymentViaPartnerBankPage.loadConditionForViewpaymentViaPartnerBankPage();
        console.debug("viewAmount:"+await _PaymentsPages.PaymentViaPartnerBankPage.viewAmount.ElementExist());
        console.debug("ensure:"+ensure(_PaymentsPages.PaymentViaPartnerBankPage.viewAmount).isNotEmpty());
    }); 
});
