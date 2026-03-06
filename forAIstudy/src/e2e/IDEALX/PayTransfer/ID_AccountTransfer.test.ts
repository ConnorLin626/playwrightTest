/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages} from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase,generatedID, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let templateName="";
let reference="";
let reference1 ='';
let reference2 ='';
let testData = _PaymentsPages.fetchTestData('ID_testData.json');

describe('ID_ACT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.ACTPayment.SIT.loginCompanyId : testData.ACTPayment.UAT.loginCompanyId, SIT ? testData.ACTPayment.SIT.loginUserId : testData.ACTPayment.UAT.loginUserId, testData.ACTPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // Add for R8.13 IDXP-437
    it('Create ACT without Compliance Code & Underlying Code check will display error message', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.ACTPayment.SIT.fromAccount : testData.ACTPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.ACTPayment.currency);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.ACTPayment.amount);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click()
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.ACTPayment.country);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.ACTPayment.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.ACTPayment.newPayeeNickname);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.complianceCodeErrorMsg).textContains(testData.ACTPayment.complianceCodeErroMsg),
            await ensure(_PaymentsPages.AccountTransferPage.underlyingCodeErrorMsg).textContains(testData.ACTPayment.underlyingCodeErroMsg),
        ]);
    });

    it('Create ACT Template without Compliance Code & Underlying Code check will display error message', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleIDPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'ACTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.ACTPayment.SIT.fromAccount : testData.ACTPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.ACTPayment.currency);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.ACTPayment.amount);
        await _PaymentsPages.AccountTransferPage.existingPayee.select(testData.ACTPayment.existingPayee);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.complianceCodeErrorMsg).textContains(testData.ACTPayment.complianceCodeErroMsg),
            await ensure(_PaymentsPages.AccountTransferPage.underlyingCodeErrorMsg).textContains(testData.ACTPayment.underlyingCodeErroMsg),
        ]);
    });
   
    //add for R8.17 IDXP-1154
    it('Create an ACT transaction with push approve now', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.fromAccount.select(SIT ? testData.ACTPayment.SIT.fromAccount : testData.ACTPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.ACTPayment.currency);
        await _PaymentsPages.AccountTransferPage.amount.input(testData.ACTPayment.amount);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click()
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.ACTPayment.country);
        await _PaymentsPages.AccountTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.ACTPayment.country);
        await _PaymentsPages.AccountTransferPage.payeeBankRadio.jsClick();
        await _PaymentsPages.AccountTransferPage.newPayeeAcctNumber.input(testData.ACTPayment.newPayeeAcctNumber);
        await _PaymentsPages.AccountTransferPage.newPayeeName.input(testData.ACTPayment.newPayeeName);
        await _PaymentsPages.AccountTransferPage.newPayeeNickname.input(testData.ACTPayment.newPayeeNickname);
        await _PaymentsPages.BeneficiaryPage.addAddress.click();
        await _PaymentsPages.BeneficiaryPage.payeeLocation.select(testData.Beneficiary.payeeLocation);
        await _PaymentsPages.BeneficiaryPage.townCity.input(testData.Beneficiary.townCity);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd1.input(testData.Beneficiary.newPayeeAdd1);
        await _PaymentsPages.AccountTransferPage.newPayeeAdd2.input(testData.Beneficiary.newPayeeAdd2);
        await _PaymentsPages.BeneficiaryPage.postalCode.input(testData.Beneficiary.postalCode);
        await _PaymentsPages.RTGSPaymentPage.purposeCode.select(testData.ACTPayment.purposeCode);
        await _PaymentsPages.RTGSPaymentPage.regulatoryComplianceCode.select(testData.ACTPayment.complianceCode);
        await _PaymentsPages.RTGSPaymentPage.underlyingCode.select(testData.ACTPayment.underlyingCode);
        await _PaymentsPages.AccountTransferPage.paymentDetail.input(testData.ACTPayment.paymentDetail);
        await _PaymentsPages.AccountTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.AccountTransferPage.emailIdO.input(testData.ACTPayment.emailIdO);
        await _PaymentsPages.AccountTransferPage.emailId1.input(testData.ACTPayment.emailId1);
        await _PaymentsPages.AccountTransferPage.emailId2.input(testData.ACTPayment.emailId2);
        await _PaymentsPages.AccountTransferPage.emailId3.input(testData.ACTPayment.emailId3);
        await _PaymentsPages.AccountTransferPage.emailId4.input(testData.ACTPayment.emailId4);
        await _PaymentsPages.AccountTransferPage.message.input(testData.ACTPayment.message);
        await _PaymentsPages.AccountTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.AccountTransferPage.transactionNote.input(testData.ACTPayment.transactionNote);
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.AccountTransferPage.pushBtnButton.jsClick();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.ACTPayment.SIT.fromAccount : testData.ACTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.ACTPayment.amount),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.ACTPayment.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.PartialApproved,testData.status.Approved,testData.status.Completed),
            await ensure(_PaymentsPages.AccountTransferPage.purposeCodeView).textContains(testData.ACTPayment.purposeCode),
            await ensure(_PaymentsPages.AccountTransferPage.underlyingCodeValue).textContains(testData.ACTPayment.underlyingCode),
            await ensure(_PaymentsPages.AccountTransferPage.complianceCodeValue).textContains(testData.ACTPayment.complianceCode),
        ]);
    });

    it('Copy ACT then check Compliance Code & Underlying Code', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.copyButton.click();
        await _PaymentsPages.AccountTransferPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.AccountTransferPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.nextButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.AccountTransferPage.submitButton.click();
        await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
            reference1 = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.fromAccountValue).textContains(SIT ? testData.ACTPayment.SIT.fromAccount : testData.ACTPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.AccountTransferPage.amountValue).textContains(testData.ACTPayment.amount),
            await ensure(_PaymentsPages.AccountTransferPage.toNewPayeeNameValue).textContains(testData.ACTPayment.newPayeeName),
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textIs(testData.status.PendingApproval),
            await ensure(_PaymentsPages.AccountTransferPage.underlyingCodeValue).textContains(testData.ACTPayment.underlyingCode),
            await ensure(_PaymentsPages.AccountTransferPage.complianceCodeValue).textContains(testData.ACTPayment.complianceCode),
        ]);
        if(reference1 == reference){
            await ensure(_PaymentsPages.AccountTransferPage.purposeCodeView).textContains(testData.ACTPayment.purposeCode)
        }else{
            await ensure(_PaymentsPages.AccountTransferPage.purposeCodeView).isNotEmpty()
        }
    });

    it('Approve ACT on view page with push approve now', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference1.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference1);
        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - Account Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();
        await _PaymentsPages.AccountTransferPage.approveButton.click();
        await _PaymentsPages.AccountTransferPage.pushBtnButton.jsClick();
        await _PaymentsPages.AccountTransferPage.loadConditionForApproveNowPopUp();
        await _PaymentsPages.AccountTransferPage.getDialogReferenceID().then(text => {
            reference2 = text;
        });
        await _PaymentsPages.AccountTransferPage.dismissButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference2);
        await _PaymentsPages.AccountTransferPage.loadConditionForViewPage();

        await Promise.all([
            await ensure(_PaymentsPages.AccountTransferPage.actStatusValue).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.Received, testData.status.PendingRelease, testData.status.Completed, testData.status.BankRejected),
        ]);
    });
});
