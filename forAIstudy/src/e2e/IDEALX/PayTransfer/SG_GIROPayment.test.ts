/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, generatedID } from "../../../lib";
import { browser } from "protractor";

// this from OnlineCreate
let reference = "";
let referenceEdit="";
let GiroTemplateName = "";
let giroFPSPayeeName = "";
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');

//add for AB-8673:check beneficiary bank detail value
describe('SG_Giro Payment', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.giroPayment.SIT.loginCompanyId : testData.giroPayment.UAT.loginCompanyId, SIT ? testData.giroPayment.SIT.loginUserId : testData.giroPayment.UAT.loginUserId, "P@ssword123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

    it('Create a SG Giro Payment with new DBS Payee', async function () {
        await _PaymentsPages.giroPaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.giroPaymentPage.giroPaymentMenu.click();
        await _PaymentsPages.giroPaymentPage.loadCondition();
        await _PaymentsPages.giroPaymentPage.fromAccount.select(SIT ? testData.giroPayment.SIT.fromAccount : testData.giroPayment.UAT.fromAccount);
        await _PaymentsPages.giroPaymentPage.amount.input(testData.giroPayment.amountA1);
        await _PaymentsPages.giroPaymentPage.newPayeeTab.click();
        await _PaymentsPages.giroPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.giroPaymentPage.Country.select(testData.giroPayment.Country);
        await _PaymentsPages.giroPaymentPage.newPayeeBankID.select(testData.giroPayment.newPayeeBankID);
        await _PaymentsPages.giroPaymentPage.newPayeeAcctNumber.input(testData.giroPayment.newPayeeAcctNumber);
        await _PaymentsPages.giroPaymentPage.newPayeeName.input(testData.giroPayment.newPayeeName);
        await _PaymentsPages.giroPaymentPage.newPayeeNickname.input(testData.giroPayment.newPayeeNickname);
        await _PaymentsPages.giroPaymentPage.chooseDate.jsClick();
        await _PaymentsPages.giroPaymentPage.giroType.jsClick();
        await _PaymentsPages.giroPaymentPage.purposeCode.select(testData.giroPayment.purposeCode);
        await _PaymentsPages.giroPaymentPage.nextButton.click();
        await _PaymentsPages.giroPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.giroPaymentPage.approvalNowCheckBox.jsClick();
        await ensure(_PaymentsPages.giroPaymentPage.getChallengeSMS).isVisible();
        await _PaymentsPages.giroPaymentPage.getChallengeSMS.click();
        await _PaymentsPages.giroPaymentPage.challengeResponse.input('123123123');
        await _PaymentsPages.giroPaymentPage.submitButton.click();
        await _PaymentsPages.giroPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.giroPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        // await ensure(_PaymentsPages.giroPaymentPage).isUXSuccess();
        await _PaymentsPages.giroPaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await Promise.all([
            await ensure(_PaymentsPages.giroPaymentPage.fromAccountValue).textContains(SIT ? testData.giroPayment.SIT.fromAccount : testData.giroPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.giroPaymentPage.amountValue).textContains(testData.giroPayment.amountA1),
            await ensure(_PaymentsPages.giroPaymentPage.accountNumberValue).textContains(testData.giroPayment.newPayeeAcctNumber),
            await ensure(_PaymentsPages.giroPaymentPage.payeeNameValue).textIs(testData.giroPayment.newPayeeName),
            await ensure(_PaymentsPages.giroPaymentPage.payeeBankNameValue).textIs(testData.giroPayment.payeeBankName),
            await ensure(_PaymentsPages.giroPaymentPage.payeeBankIDValue).textIs(testData.giroPayment.newPayeeBankID),
            await ensure(_PaymentsPages.giroPaymentPage.payeeBankCodeValue).textIs(testData.giroPayment.payeeBankCode),
            await ensure(_PaymentsPages.giroPaymentPage.payeeBankBranchCodeValue).textIs(testData.giroPayment.payeeBankBranchCode),
            await ensure(_PaymentsPages.giroPaymentPage.statusValue).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved)
        ]);
    });

    it('Create a SG Giro Payment with new Paynow Payee with all fields', async function () {
        await _PaymentsPages.giroPaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.giroPaymentPage.giroPaymentMenu.click();
        await _PaymentsPages.giroPaymentPage.loadCondition();
        await _PaymentsPages.giroPaymentPage.fromAccount.select(SIT ? testData.giroPayment.SIT.fromAccount : testData.giroPayment.UAT.fromAccount);
        await _PaymentsPages.giroPaymentPage.amount.input(testData.giroPayment.amountA1);
        await _PaymentsPages.giroPaymentPage.newPayNowTab.click();
        await _PaymentsPages.giroPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.giroPaymentPage.mobileNum.input(testData.giroPayment.mobileNum);
        let isnewPayeeNicknameVisible = await _PaymentsPages.giroPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true ){
            await _PaymentsPages.giroPaymentPage.newPayeeNickname.input(testData.giroPayment.newPayeeNickname);
        };
        await _PaymentsPages.giroPaymentPage.chooseDate.jsClick();
        await _PaymentsPages.giroPaymentPage.giroType.jsClick();
        await _PaymentsPages.giroPaymentPage.purposeCode.select(testData.giroPayment.purposeCode);
        await _PaymentsPages.giroPaymentPage.paymentDetail.input(testData.giroPayment.paymentDetails);
        await _PaymentsPages.giroPaymentPage.isBeneAdvising.jsClick();
        await _PaymentsPages.giroPaymentPage.emailIdO.input(testData.giroPayment.emailIdO);
        await _PaymentsPages.giroPaymentPage.emailId1.input(testData.giroPayment.emailId1);
        await _PaymentsPages.giroPaymentPage.emailId2.input(testData.giroPayment.emailId2);
        await _PaymentsPages.giroPaymentPage.emailId3.input(testData.giroPayment.emailId3);
        await _PaymentsPages.giroPaymentPage.emailId4.input(testData.giroPayment.emailId4);
        await _PaymentsPages.giroPaymentPage.message.input(testData.giroPayment.message);
        await _PaymentsPages.giroPaymentPage.refForPayee.input(testData.giroPayment.refForPayee);
        await _PaymentsPages.giroPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.giroPaymentPage.transactionNote.input(testData.giroPayment.transactionNote);
        await _PaymentsPages.giroPaymentPage.nextButton.click();
        await _PaymentsPages.giroPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.giroPaymentPage.submitButton.click();
        await _PaymentsPages.giroPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.giroPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference);
        await _PaymentsPages.giroPaymentPage.PayTransferMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.giroPaymentPage.loadConditionForViewGiroPaymentPage();
        await checkViewPageAllField(false); //add for IDXP-812
    });
    
    it('Edit Giro Paymenet via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("SG - GIRO Payment", testData.status.PendingApproval);
        }
        await _PaymentsPages.giroPaymentPage.loadConditionForViewGiroPaymentPage();
        await _PaymentsPages.giroPaymentPage.editButton.click();
        await _PaymentsPages.giroPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.giroPaymentPage.loadCondition();
        let isnewPayeeNicknameVisible = await _PaymentsPages.giroPaymentPage.newPayeeNickname.isElementPresent();
        if (isnewPayeeNicknameVisible === true) {
            await _PaymentsPages.giroPaymentPage.newPayeeNickname.input(testData.giroPayment.newPayeeNickname);
        };
        await _PaymentsPages.giroPaymentPage.amount.clean();
        await _PaymentsPages.giroPaymentPage.amount.input(testData.giroPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.giroPaymentPage.nextButton.jsClick();
        await _PaymentsPages.giroPaymentPage.loadConditionOnPreviewPage();
        await _PaymentsPages.giroPaymentPage.submitButton.click();
        await _PaymentsPages.giroPaymentPage.loadConditionOnSubmittedPage();
        await _PaymentsPages.giroPaymentPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.giroPaymentPage.loadConditionForViewGiroPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
        await Promise.all([
            await ensure(_PaymentsPages.giroPaymentPage.amountValue).textContains(testData.giroPayment.editAmount),
        ]);
        }
    });

    it('Create Giro Payment Template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        GiroTemplateName = 'GiroTemplate' + generatedID();
        giroFPSPayeeName = 'newGiroPayeeName' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(GiroTemplateName);
        await _PaymentsPages.giroPaymentPage.fromAccount.select(SIT ? testData.giroPayment.SIT.fromAccount : testData.giroPayment.UAT.fromAccount);
        await _PaymentsPages.giroPaymentPage.amount.input(testData.giroPayment.amountA1);
        await _PaymentsPages.giroPaymentPage.existingPayee.select(testData.giroPayment.existingGIROPayee);
        await _PaymentsPages.giroPaymentPage.purposeCode.select(testData.giroPayment.purposeCode)
        await _PaymentsPages.giroPaymentPage.isTransactionNote.jsClick();
        await _PaymentsPages.giroPaymentPage.transactionNote.input(testData.giroPayment.transactionNote);
        await _PaymentsPages.giroPaymentPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(GiroTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewFPSTemplatePage();
        await _PaymentsPages.PaymentTemplatesPage.EditDometicTemplate.click();
        await browser.sleep(1000);
        await _PaymentsPages.giroPaymentPage.newPayeeTab.click();
        await _PaymentsPages.giroPaymentPage.continueBtn.clickIfExist();
        await _PaymentsPages.giroPaymentPage.Country.select(testData.giroPayment.Country);
        await _PaymentsPages.giroPaymentPage.newPayeeBankID.select(testData.giroPayment.newPayeeBankID);
        await _PaymentsPages.giroPaymentPage.newPayeeAcctNumber.input(testData.giroPayment.newPayeeAcctNumber);
        await _PaymentsPages.giroPaymentPage.newPayeeName.input(giroFPSPayeeName);
        await _PaymentsPages.giroPaymentPage.newPayeeNickname.input(giroFPSPayeeName);
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.FastPayment.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.FastPayment.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.giroPaymentPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(GiroTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewFPSTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.giroPaymentPage.templateNameValue).textIs(GiroTemplateName),
            await ensure(_PaymentsPages.giroPaymentPage.fromAccountForTemplate).textContains(SIT ? testData.giroPayment.SIT.fromAccount : testData.giroPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.giroPaymentPage.amountForTemplate).textContains(testData.giroPayment.amountA1),
            await ensure(_PaymentsPages.giroPaymentPage.payeeNameForTemplate).textContains(giroFPSPayeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateStatus).textContainsLessOne(testData.status.PendingApproval,testData.status.Approved)
        ]);
    });
});

export async function checkViewPageAllField(isEdit : Boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.giroPaymentPage.fromAccountValue).textContains(SIT ? testData.giroPayment.SIT.fromAccount : testData.giroPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.giroPaymentPage.amountValue).textContains(isEdit ? testData.giroPayment.editAmount: testData.giroPayment.amountA1),
        // Add all field
        await ensure(_PaymentsPages.giroPaymentPage.headerRefValue).textContains(isEdit? referenceEdit : reference),
        await ensure(_PaymentsPages.giroPaymentPage.statusValue).textContainsLessOne(testData.status.PendingApproval),
        await ensure(_PaymentsPages.giroPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.payNowMobileValue).textContains(testData.giroPayment.mobileNum),
        await ensure(_PaymentsPages.giroPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.paymentType).textContains(testData.giroPayment.paymentType),
        await ensure(_PaymentsPages.giroPaymentPage.sendAmountValue).textContains(isEdit ? testData.giroPayment.editAmount: testData.giroPayment.amountA1),
        await ensure(_PaymentsPages.giroPaymentPage.paymentDeatilValue).textContains(testData.giroPayment.paymentDetails),
        await ensure(_PaymentsPages.giroPaymentPage.messageValue).textContains(testData.giroPayment.message),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(testData.giroPayment.emailIdO),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(testData.giroPayment.emailId1),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(testData.giroPayment.emailId2),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(testData.giroPayment.emailId3),
        await ensure(_PaymentsPages.giroPaymentPage.emailList).textContains(testData.giroPayment.emailId4),
        await ensure(_PaymentsPages.giroPaymentPage.totalDeductValue).textContains(isEdit ? testData.giroPayment.editAmount: testData.giroPayment.amountA1),
        await ensure(_PaymentsPages.giroPaymentPage.purposeCodeValue).textContains(testData.giroPayment.purposeCode),
        await ensure(_PaymentsPages.giroPaymentPage.batchIDValue).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.messageToApproverValue).textContains(testData.giroPayment.transactionNote),
        await ensure(_PaymentsPages.giroPaymentPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.giroPaymentPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
    if(SIT){
        await ensure(_PaymentsPages.giroPaymentPage.balanceValue).isNotEmpty()
    }
}



