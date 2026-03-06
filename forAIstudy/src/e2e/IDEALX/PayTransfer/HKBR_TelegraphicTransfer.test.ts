/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';
let _PaymentsPages = new PaymentsPages();

let testData = _PaymentsPages.fetchTestData('HKB_testData.json');
let reference = "";
let TemplateName = '';

describe('HK_Telegraphic Transfer', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TelegraphicTransfer.SIT.loginCompanyId : testData.TelegraphicTransfer.UAT.loginCompanyId, SIT ? testData.TelegraphicTransfer.SIT.loginUserId : testData.TelegraphicTransfer.UAT.loginUserId, SIT ? testData.TelegraphicTransfer.SIT.pinId : testData.TelegraphicTransfer.UAT.pinId); });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this, PROJECT_TYPE.IDEALX);
    });

    //IDXP-2116
    it('Create a TT Payment from template with new BHD purpose code', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();        
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TelegraphicTransfer.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionCreatePaymentTemplate();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeLabel).textContains("Purpose of payment (Receiving party purpose code)")
        ]),
        await _PaymentsPages.TelegraphicTransferPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
                reference = text;
            });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await checkViewPageAllField(false); 
           
    });  
    
});

export async function checkViewPageAllField(isEdit: boolean = true) {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TelegraphicTransfer.SIT.fromAccount : testData.TelegraphicTransfer.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(testData.TelegraphicTransfer.existingPayee),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TelegraphicTransfer.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(isEdit ? testData.TelegraphicTransfer.editAmount : testData.TelegraphicTransfer.amountA1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(testData.TelegraphicTransfer.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocationHK).textContains(testData.TelegraphicTransfer.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankCity).textContains(testData.TelegraphicTransfer.payeeBankCity),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankRoutingCode).textContains(testData.TelegraphicTransfer.payeeBankRoutingCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textContains(testData.TelegraphicTransfer.payeeBankSwiftbic),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankSWIFTBIC).textContains(testData.TelegraphicTransfer.intermediaryBankID),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.IntermediaryBankName).textContains(SIT ? testData.TelegraphicTransfer.SIT.intermediaryBankName: testData.TelegraphicTransfer.UAT.intermediaryBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TelegraphicTransfer.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TelegraphicTransfer.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TelegraphicTransfer.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TelegraphicTransfer.bankChargeValue),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.purposeOfPaymentView).textContains(testData.TelegraphicTransfer.bhdPurposeCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.custRefValue).isNotEmpty(),
        //await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TelegraphicTransfer.transactionNote),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TelegraphicTransfer.messageToOrderingBank),
    ]);
}
