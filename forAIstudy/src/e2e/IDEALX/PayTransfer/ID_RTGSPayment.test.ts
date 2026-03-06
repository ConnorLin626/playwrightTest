/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, FilesPages} from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase,generatedID, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = "";
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let fileName = "";
let templateName="";
let testData = _PaymentsPages.fetchTestData('ID_testData.json');
let uploadTestData = _PaymentsPages.fetchTestData('uploadTestData/ID_uploadTestData.json');

describe('ID_RTGS', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.RTGSPayment.SIT.loginCompanyId : testData.RTGSPayment.UAT.loginCompanyId, SIT ? testData.RTGSPayment.SIT.loginUserId : testData.RTGSPayment.UAT.loginUserId, testData.RTGSPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Can not create RTGS with amount less than 100000001 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.lessMinamount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await ensure(_PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox).hasClassName("disabled");
    });

    it('Can create RTGS with amount 100000001 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.minAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.residStatus.select(testData.RTGSPayment.residStatus);
        await _PaymentsPages.RTGSPaymentPage.category.select(testData.RTGSPayment.category);
        await _PaymentsPages.RTGSPaymentPage.relationship.select(testData.RTGSPayment.relationship);
        await _PaymentsPages.RTGSPaymentPage.identity.select(testData.RTGSPayment.identity);
        await _PaymentsPages.RTGSPaymentPage.purposeCode.select(testData.RTGSPayment.purposeCode);
        // await _PaymentsPages.RTGSPaymentPage.regulatoryComplianceCode.select(testData.RTGSPayment.regulatoryComplianceCode);
        // await _PaymentsPages.RTGSPaymentPage.underlyingCode.select(testData.RTGSPayment.underlyingCode);
        await _PaymentsPages.RTGSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.minAmount),
        ]);
    });

    it('Can not create RTGS with amount greater than 9999999999999 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.moreThanMaxAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.hasUXIxErrorMsg1(testData.RTGSPayment.errorMessage).then(value => {
            if (!value) {
                throw new Error('When input invalid amount,then click Next button,error message is wrong.');
            }
        });
    });

    it('Can create RTGS with amount 9999999999999 IDR', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.maxAmount);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.residStatus.select(testData.RTGSPayment.residStatus);
        await _PaymentsPages.RTGSPaymentPage.category.select(testData.RTGSPayment.category);
        await _PaymentsPages.RTGSPaymentPage.relationship.select(testData.RTGSPayment.relationship);
        await _PaymentsPages.RTGSPaymentPage.identity.select(testData.RTGSPayment.identity);
        await _PaymentsPages.RTGSPaymentPage.purposeCode.select(testData.RTGSPayment.purposeCode);
        // await _PaymentsPages.RTGSPaymentPage.regulatoryComplianceCode.select(testData.RTGSPayment.regulatoryComplianceCode);
        // await _PaymentsPages.RTGSPaymentPage.underlyingCode.select(testData.RTGSPayment.underlyingCode);
        await _PaymentsPages.RTGSPaymentPage.bankChargesThey.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.maxAmount),
        ]);
    });
    // Add for AB-11702 DASB-46862 AB-11985
    it('Upload RTGS that bank has siwft bic & bank code & branch code', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.RTGSPayment.fileType, SIT ? testData.RTGSPayment.SIT.fileName : testData.RTGSPayment.UAT.fileName, testData.RTGSPayment.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await checkViewPageAllField(); //IDXP-812
    });

    it('Upload RTGS that bank only has bank code & branch code', async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, testData.RTGSPayment.fileType, SIT ? testData.RTGSPayment.SIT.fileName1 : testData.RTGSPayment.UAT.fileName1, testData.RTGSPayment.approvalOptionByTransaction).then(async data => {
            fileName = data;
        });
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileFilter.input(fileName);
        await _FilesPages.uploadFilePage.refresh.jsClick();
        await _FilesPages.uploadFilePage.fileNameLink.jsClick();
        await _FilesPages.uploadFilePage.loadConditionForViewFilePage();
        await _FilesPages.uploadFilePage.paymentReferenceLink.jsClick();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContainsLessOne(testData.status.PendingApproval,testData.status.PendingVerification),
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccount : testData.RTGSPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCodeValue).textContains(SIT ? testData.RTGSPayment.SIT.bankCode1 : testData.RTGSPayment.UAT.bankCode1),
            await ensure(_PaymentsPages.RTGSPaymentPage.payeeBrchCodeValue).textContains(SIT ? testData.RTGSPayment.SIT.branchCode1 : testData.RTGSPayment.UAT.branchCode1),
        ]);
    });

    // Add for R8.13 IDXP-437
    it('Create RTGS without Compliance Code & Underlying Code check will display error message', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccountFCY : testData.RTGSPayment.UAT.fromAccountFCY);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.minAmount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.RTGSPayment.currency);
        await _PaymentsPages.RTGSPaymentPage.newPayeeTab.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.newPayeeName.input(testData.RTGSPayment.newPayeeName);
        await _PaymentsPages.RTGSPaymentPage.newPayeeNickname.input(testData.RTGSPayment.newPayeeNickname);
        await _PaymentsPages.RTGSPaymentPage.payeeBankID.select(SIT ? testData.RTGSPayment.SIT.payeeBankID : testData.RTGSPayment.UAT.payeeBankID);
        await _PaymentsPages.RTGSPaymentPage.newPayeeAcctNumber.input(testData.RTGSPayment.newPayeeAcctNumber);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.complianceCodeErrorMsg).textContains(testData.RTGSPayment.complianceCodeErroMsg),
            await ensure(_PaymentsPages.RTGSPaymentPage.underlyingCodeErrorMsg).textContains(testData.RTGSPayment.underlyingCodeErroMsg),
        ]);
    });

    it('Create RTGS Template without Compliance Code & Underlying Code check will display error message', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleIDPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        templateName = 'RTGSPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.RTGSPayment.SIT.fromAccountFCY : testData.RTGSPayment.UAT.fromAccountFCY);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.RTGSPayment.minAmount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.RTGSPayment.currency);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.RTGSPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.RTGSPaymentCheckBox.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.complianceCodeErrorMsg).textContains(testData.RTGSPayment.complianceCodeErroMsg),
            await ensure(_PaymentsPages.RTGSPaymentPage.underlyingCodeErrorMsg).textContains(testData.RTGSPayment.underlyingCodeErroMsg),
        ]);
    });

    it('Create RTGS from Template check Compliance Code & Underlying Code', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.RTGSPayment.existingTemplate);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.RTGSPaymentPage.continueBtn.jsClickIfExist();
        await _PaymentsPages.RTGSPaymentPage.loadCondition();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForPrevewPage();
        await _PaymentsPages.RTGSPaymentPage.submitButton.click();
        await _PaymentsPages.RTGSPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.RTGSPaymentPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.RTGSPaymentPage.loadConditionForViewRTGSPaymentPage();

        await Promise.all([
            await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? testData.RTGSPayment.SIT.fromAccountFCY : testData.RTGSPayment.UAT.fromAccountFCY),
            await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(testData.RTGSPayment.minAmount),
            await ensure(_PaymentsPages.RTGSPaymentPage.toExistingPayeeNameValue).textContains(testData.RTGSPayment.existingPayee),
            await ensure(_PaymentsPages.RTGSPaymentPage.underlyingCodeValue).textContains(testData.RTGSPayment.underlyingCode),
            await ensure(_PaymentsPages.RTGSPaymentPage.complianceCodeValue).textContains(testData.RTGSPayment.complianceCode),
        ]);
    });
});

export async function checkViewPageAllField() {
    await Promise.all([
        await ensure(_PaymentsPages.RTGSPaymentPage.headerRefValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.statusValue).textContains(uploadTestData.status.PendingApproval),
        await ensure(_PaymentsPages.RTGSPaymentPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.deductAmtValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.fromAccountValue).textContains(SIT ? uploadTestData.RTGS.SIT.fromAccount : uploadTestData.RTGS.UAT.fromAccount),
        await ensure(_PaymentsPages.RTGSPaymentPage.acctBalanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeAcctNumValue).textContains(uploadTestData.RTGS.newPayeeAcct),
        await ensure(_PaymentsPages.RTGSPaymentPage.toNewPayeeNameValue).textContains(uploadTestData.RTGS.newPayeeName),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentTypeValue).textContains(uploadTestData.RTGS.paymentType),
        await ensure(_PaymentsPages.RTGSPaymentPage.amountValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankNameValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankNameValue : uploadTestData.RTGS.UAT.payeeBankNameValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd1Value).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankAdd1Value : uploadTestData.RTGS.UAT.payeeBankAdd1Value),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankAdd2Value).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankAdd2Value : uploadTestData.RTGS.UAT.payeeBankAdd2Value),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCityValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankCityValue : uploadTestData.RTGS.UAT.payeeBankCityValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCountryValue).textContains(uploadTestData.RTGS.payeeBankCountryValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeSwiftBicValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeSwiftBicValue : uploadTestData.RTGS.UAT.payeeSwiftBicValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBankCodeValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBankCodeValue : uploadTestData.RTGS.UAT.payeeBankCodeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.payeeBrchCodeValue).textContains(SIT ? uploadTestData.RTGS.SIT.payeeBrchCodeValue : uploadTestData.RTGS.UAT.payeeBrchCodeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.paymentDetailsValue).textContains(uploadTestData.RTGS.paymentDetailsValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.msgValue).textContains(uploadTestData.RTGS.msgValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue0),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue1),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue2),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue3),
        await ensure(_PaymentsPages.RTGSPaymentPage.emailListValue).textContains(uploadTestData.RTGS.emailValue4),
        await ensure(_PaymentsPages.RTGSPaymentPage.totalDeductAmtValue).textContains(uploadTestData.RTGS.amountValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.bankChargeValue).textContains(uploadTestData.RTGS.bankChargeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.chargeAcctValue).textContains(SIT ? uploadTestData.RTGS.SIT.fromAccount : uploadTestData.RTGS.UAT.fromAccount),
        await ensure(_PaymentsPages.RTGSPaymentPage.purposeCodeValue).textContains(uploadTestData.RTGS.purposeCodeValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.residStatusValue).textContains(uploadTestData.RTGS.residStatusValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.relationshipValue).textContains(uploadTestData.RTGS.relationshipValue),
        await ensure(_PaymentsPages.RTGSPaymentPage.custRefValue).isNotEmpty()
    ]);
}
