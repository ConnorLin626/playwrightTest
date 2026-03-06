/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages} from '../../../pages/IDEALX';
import { ensure, SIT, handlerCase,generatedID, PROJECT_TYPE } from '../../../lib';
import { browser, promise } from 'protractor';

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('ID_testData.json');
let reference='';
let referenceEdit='';
let payeeName = 'TTNewPayee' +generatedID();
let templateName1 = ""

describe('ID_TT', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.TTPayment.SIT.loginCompanyId : testData.TTPayment.UAT.loginCompanyId, SIT ? testData.TTPayment.SIT.loginUserId : testData.TTPayment.UAT.loginUserId, testData.TTPayment.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    // Add for R8.13 IDXP-437
    it('Create TT without Compliance Code & Underlying Code check will display error message', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TTPayment.currency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TTPayment.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click()
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TTPayment.country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testData.TTPayment.SIT.payeeBankID : testData.TTPayment.UAT.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(testData.TTPayment.newPayeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TTPayment.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.complianceCodeErrorMsg).textContains(testData.TTPayment.complianceCodeErroMsg),
            await ensure(_PaymentsPages.TelegraphicTransferPage.underlyingCodeErrorMsg).textContains(testData.TTPayment.underlyingCodeErroMsg),
        ]);
    });

    it('Create TT Template without Compliance Code & Underlying Code check will display error message', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleIDPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        let templateName = 'TTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TTPayment.currency);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.TTPayment.amount);
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TTPayment.existingPayee)
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.complianceCodeErrorMsg).textContains(testData.TTPayment.complianceCodeErroMsg),
            await ensure(_PaymentsPages.TelegraphicTransferPage.underlyingCodeErrorMsg).textContains(testData.TTPayment.underlyingCodeErroMsg),
        ]);
    });
   
    it('Create TT with new Payee and save as template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TTPayment.currency);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TTPayment.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click()
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TTPayment.country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testData.TTPayment.SIT.payeeBankID : testData.TTPayment.UAT.payeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TTPayment.routingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(SIT ? testData.TTPayment.SIT.newPayeeAcctNumber :  testData.TTPayment.UAT.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TTPayment.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TTPayment.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TTPayment.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TTPayment.newPayeeAdd2);
        await _PaymentsPages.RTGSPaymentPage.residStatus.select(testData.TTPayment.residStatus);
        await _PaymentsPages.RTGSPaymentPage.category.select(testData.TTPayment.category);
        await _PaymentsPages.RTGSPaymentPage.relationship.select(testData.TTPayment.relationship);
        await _PaymentsPages.RTGSPaymentPage.identity.select(testData.TTPayment.identity);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TTPayment.purposeCode);
        await _PaymentsPages.RTGSPaymentPage.regulatoryComplianceCode.select(testData.TTPayment.complianceCode);
        await _PaymentsPages.RTGSPaymentPage.underlyingCode.select(testData.TTPayment.underlyingCode);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TTPayment.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TTPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TTPayment.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TTPayment.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TTPayment.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TTPayment.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TTPayment.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TTPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TTPayment.messageToOrderingBank);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        //Create payment with save as template
        await _PaymentsPages.TelegraphicTransferPage.savaAsTemplateCheckBox.jsClick();
        let templateName = 'TTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateName.getText().then(text => {
            templateName1 = text;
        });
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await checkViewPageAllField(false) //Add for IDXP-812
    });
    
    it('Edit a TT Payment via Transfer Center', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        if (0 !== reference.trim().length) {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);

        } else {
            await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaSearch("ID - Telegraphic Transfer", testData.status.PendingApproval);
        }
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await _PaymentsPages.TelegraphicTransferPage.editButton.click();
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.amount.clean();
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TTPayment.editAmount);
        await browser.sleep(2000);
        await _PaymentsPages.RTGSPaymentPage.nextButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            referenceEdit = text;
        });
        console.log(referenceEdit)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(referenceEdit);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        if (reference == referenceEdit) {
            await checkViewPageAllField(true); // Add for IDXP-812
        } else {
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TTPayment.editAmount)
        ]);
        }
    });

    it('Edit TT Template check Compliance Code & Underlying Code', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        console.log(templateName1)
        if (0 !== templateName1.trim().length) {
            await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName1);
            await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
            await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTTemplatePage();
            await Promise.all([
                await ensure(_PaymentsPages.TelegraphicTransferPage.templateNameValue).textContains(templateName1),
                await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount),
                await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TTPayment.amount),
                await ensure(_PaymentsPages.PaymentTemplatesPage.templateTTStatus).textContains(testData.status.PendingApproval),
                await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(testData.TTPayment.purposeCode),
                await ensure(_PaymentsPages.TelegraphicTransferPage.underlyingCodeValue).textContains(testData.TTPayment.underlyingCode),
                await ensure(_PaymentsPages.TelegraphicTransferPage.complianceCodeValue).textContains(testData.TTPayment.complianceCode),
            ])
        } else {
            await _PaymentsPages.PaymentTemplatesPage.goToViewPTemplatePageViaSearch("ID - Telegraphic Transfer"),
            await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTTemplatePage();
            await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.templateNameValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).isNotEmpty(),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).isNotEmpty(),
        ])
        }
        // Then Edit the Template
        await _PaymentsPages.TelegraphicTransferPage.templateNameValue.getText().then(text => {
            templateName1 = text;
        });
        await _PaymentsPages.PaymentTemplatesPage.EditTTTemplate.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        await _PaymentsPages.TelegraphicTransferPage.existingPayee.select(testData.TTPayment.existingPayee);
        await _PaymentsPages.RTGSPaymentPage.residStatus.select(testData.TTPayment.residStatus);
        await _PaymentsPages.RTGSPaymentPage.category.select(testData.TTPayment.category);
        await _PaymentsPages.RTGSPaymentPage.relationship.select(testData.TTPayment.relationship);
        await _PaymentsPages.RTGSPaymentPage.identity.select(testData.TTPayment.identity);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TTPayment.purposeCode);
        await _PaymentsPages.RTGSPaymentPage.regulatoryComplianceCode.select(testData.TTPayment.complianceCodeEdit);
        await _PaymentsPages.RTGSPaymentPage.underlyingCode.select(testData.TTPayment.underlyingCodeEdit);
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName1);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTTemplatePage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.templateNameValue).textContains(templateName1),
            await ensure(_PaymentsPages.TelegraphicTransferPage.underlyingCodeValue).textContains(testData.TTPayment.underlyingCodeEdit),
            await ensure(_PaymentsPages.TelegraphicTransferPage.complianceCodeValue).textContains(testData.TTPayment.complianceCodeEdit),
        ]);
    });
    //add for R8.18 IDXP-1312
    it('Create TT which from account is CNY payment currency is IDR with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.makePayment.click();
        await _PaymentsPages.TelegraphicTransferPage.loadCondition();
        await _PaymentsPages.TelegraphicTransferPage.fromAccount.select(SIT ? testData.TTPayment.SIT.fromAccountCNY : testData.TTPayment.UAT.fromAccountCNY);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TTPayment.idrCcy);
        await _PaymentsPages.TelegraphicTransferPage.amount.input(testData.TTPayment.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click()
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TTPayment.newPayeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testData.TTPayment.SIT.cnPayeeBankID: testData.TTPayment.UAT.cnPayeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TTPayment.routingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(SIT ? testData.TTPayment.SIT.newPayeeAcctNumber :  testData.TTPayment.UAT.newPayeeAcctNumber);
        payeeName = 'TTNewPayee' +generatedID();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickname.input(testData.TTPayment.newPayeeNickname);
        await _PaymentsPages.TelegraphicTransferPage.switchFormatButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TTPayment.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TTPayment.townCity);
        await _PaymentsPages.TelegraphicTransferPage.streetName.input(testData.TTPayment.streetName);
        await _PaymentsPages.TelegraphicTransferPage.buildingNum.input(testData.TTPayment.buildingNum);
        await _PaymentsPages.TelegraphicTransferPage.buildingName.input(testData.TTPayment.buildingName);
        await _PaymentsPages.TelegraphicTransferPage.floor.input(testData.TTPayment.floor);
        await _PaymentsPages.TelegraphicTransferPage.room.input(testData.TTPayment.room);
        await _PaymentsPages.TelegraphicTransferPage.department.input(testData.TTPayment.department);
        await _PaymentsPages.TelegraphicTransferPage.subDepartment.input(testData.TTPayment.subDepartment);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TTPayment.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.countrySubDivsion.input(testData.TTPayment.countrySubDivsion);
        await _PaymentsPages.TelegraphicTransferPage.townLocationName.input(testData.TTPayment.townLocationName);
        await _PaymentsPages.TelegraphicTransferPage.districtName.input(testData.TTPayment.districtName);
        await _PaymentsPages.RTGSPaymentPage.residStatus.select(testData.TTPayment.residStatus);
        await _PaymentsPages.RTGSPaymentPage.category.select(testData.TTPayment.category);
        await _PaymentsPages.RTGSPaymentPage.relationship.select(testData.TTPayment.relationship);
        await _PaymentsPages.RTGSPaymentPage.identity.select(testData.TTPayment.identity);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TTPayment.purposeCode);
        await _PaymentsPages.RTGSPaymentPage.regulatoryComplianceCode.select(testData.TTPayment.complianceCode);
        await _PaymentsPages.RTGSPaymentPage.underlyingCode.select(testData.TTPayment.underlyingCode);
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.paymentDetail.input(testData.TTPayment.paymentDetail);
        await _PaymentsPages.TelegraphicTransferPage.isBeneAdvising.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.emailIdO.input(testData.TTPayment.emailIdO);
        await _PaymentsPages.TelegraphicTransferPage.emailId1.input(testData.TTPayment.emailId1);
        await _PaymentsPages.TelegraphicTransferPage.emailId2.input(testData.TTPayment.emailId2);
        await _PaymentsPages.TelegraphicTransferPage.emailId3.input(testData.TTPayment.emailId3);
        await _PaymentsPages.TelegraphicTransferPage.emailId4.input(testData.TTPayment.emailId4);
        await _PaymentsPages.TelegraphicTransferPage.message.input(testData.TTPayment.message);
        await _PaymentsPages.TelegraphicTransferPage.isTransactionNote.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.transactionNote.input(testData.TTPayment.transactionNote);
        await _PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBank.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.messageToOrderingBank.input(testData.TTPayment.messageToOrderingBank);
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });
        console.log(reference)
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TTPayment.SIT.fromAccountCNY : testData.TTPayment.UAT.fromAccountCNY),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TTPayment.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toNewPayeeAcctNumValue).textContains(SIT ? testData.TTPayment.SIT.newPayeeAcctNumber :  testData.TTPayment.UAT.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingApproval),
        ])
    });

    it('Create TT Template which from account is IDR payment currency is CNY with new payee', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSingleIDPaymentTemplateBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        let templateName = 'TTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(templateName);
        await _PaymentsPages.RTGSPaymentPage.fromAccount.select(SIT ? testData.TTPayment.SIT.fromAccountIDR : testData.TTPayment.UAT.fromAccountIDR);
        await _PaymentsPages.TelegraphicTransferPage.currency.select(testData.TTPayment.cnyCcy);
        await _PaymentsPages.RTGSPaymentPage.amount.input(testData.TTPayment.amount);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeTab.click()
        await _PaymentsPages.TelegraphicTransferPage.cognitiveContinueBtn.jsClickIfExist();
        await _PaymentsPages.TelegraphicTransferPage.Country.select(testData.TTPayment.newPayeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(SIT ? testData.TTPayment.SIT.cnPayeeBankID: testData.TTPayment.UAT.cnPayeeBankID);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeRoutingCode.input(testData.TTPayment.routingCode);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAcctNumber.input(SIT ? testData.TTPayment.SIT.newPayeeAcctNumber :  testData.TTPayment.UAT.newPayeeAcctNumber);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TTPayment.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TTPayment.townCity);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd1.input(testData.TTPayment.newPayeeAdd1);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeAdd2.input(testData.TTPayment.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TTPayment.postalCode);
        await _PaymentsPages.RTGSPaymentPage.residStatus.select(testData.TTPayment.residStatus);
        await _PaymentsPages.RTGSPaymentPage.category.select(testData.TTPayment.category);
        await _PaymentsPages.RTGSPaymentPage.relationship.select(testData.TTPayment.relationship);
        await _PaymentsPages.RTGSPaymentPage.identity.select(testData.TTPayment.identity);
        await _PaymentsPages.TelegraphicTransferPage.purposeCode.select(testData.TTPayment.purposeCode);
        await _PaymentsPages.RTGSPaymentPage.regulatoryComplianceCode.select(testData.TTPayment.complianceCode);
        await _PaymentsPages.RTGSPaymentPage.underlyingCode.select(testData.TTPayment.underlyingCode);
        await _PaymentsPages.TelegraphicTransferPage.RPPC.click();
        await _PaymentsPages.singlePaymentPage.filterRppc.input(testData.TTPayment.benePurposeCode);
        await _PaymentsPages.singlePaymentPage.selectFirstResult.click();
        await _PaymentsPages.TelegraphicTransferPage.bankChargesShared.jsClick();
        await _PaymentsPages.RTGSPaymentPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(templateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TTPayment.SIT.fromAccountIDR : testData.TTPayment.UAT.fromAccountIDR),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TTPayment.amount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.tempToAccountNumberValue).textContains(SIT ? testData.TTPayment.SIT.newPayeeAcctNumber :  testData.TTPayment.UAT.newPayeeAcctNumber),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateTTStatus).textContains(testData.status.PendingApproval),
        ])
    });

    it('Create TT from Template from account is IDR that do not have SKN RTOL BIFAST RTGS ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(testData.TTPayment.existingTemp);
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
        await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
        await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
            reference = text;
        });

        await _PaymentsPages.TelegraphicTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.TelegraphicTransferPage.loadConditionForViewTTPaymentPage();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TTPayment.SIT.fromAccountIDR : testData.TTPayment.UAT.fromAccountIDR),
            await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(testData.TTPayment.amount),
            await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeAcctValue).textContains(SIT ? testData.TTPayment.SIT.newPayeeAcctNumber :  testData.TTPayment.UAT.newPayeeAcctNumber),
            await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textContains(testData.status.PendingApproval),
        ])
    });

});

export async function checkViewPageAllField(isEdit :boolean) {
    await Promise.all([
        await ensure(_PaymentsPages.TelegraphicTransferPage.referenceValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.TelegraphicTransferPage.transactionStatus).textIs(testData.status.PendingApproval),
        await ensure(_PaymentsPages.TelegraphicTransferPage.hashValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.deductAmountValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.fromAccountValue).textContains(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.balanceValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeAcctValue).textContains(SIT ? testData.TTPayment.SIT.newPayeeAcctNumber :  testData.TTPayment.UAT.newPayeeAcctNumber),
        await ensure(_PaymentsPages.TelegraphicTransferPage.toExistingPayeeNameValue).textContains(payeeName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd1Value).textContains(testData.TTPayment.newPayeeAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd2Value).textContains(testData.TTPayment.newPayeeAdd2),
       //await ensure(_PaymentsPages.TelegraphicTransferPage.payeeAdd3Value).textContains(testData.TTPayment.newPayeeAdd3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDateValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentType).textContains(testData.TTPayment.paymentType),
        await ensure(_PaymentsPages.TelegraphicTransferPage.amountValue).textContains(isEdit ? testData.TTPayment.editAmount:testData.TTPayment.amount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.baseOnExchangeRate).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankName).textContains(SIT ? testData.TTPayment.SIT.payeeBankName : testData.TTPayment.UAT.payeeBankName),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankLocationHK).textContains(SIT ? testData.TTPayment.SIT.payeeBankLocation : testData.TTPayment.UAT.payeeBankLocation),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress1).textContains(SIT ? testData.TTPayment.SIT.bankAdd1 : testData.TTPayment.UAT.bankAdd1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankAdress2).textContains(SIT ? testData.TTPayment.SIT.bankAdd2 : testData.TTPayment.UAT.bankAdd2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankCity).textContains(testData.TTPayment.bankCity),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankRoutingCode).textContains(testData.TTPayment.routingCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.payeeBankSwiftBic).textIs(SIT ? testData.TTPayment.SIT.payeeBankID : testData.TTPayment.UAT.payeeBankID),
        await ensure(_PaymentsPages.TelegraphicTransferPage.paymentDetailValue).textContains(testData.TTPayment.paymentDetail),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageValue).textContains(testData.TTPayment.message),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailIdO),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailId1),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailId2),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailId3),
        await ensure(_PaymentsPages.TelegraphicTransferPage.emailList).textContains(testData.TTPayment.emailId4),
        await ensure(_PaymentsPages.TelegraphicTransferPage.totalDeductValue).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.bankChargeValue).textContains(testData.TTPayment.bankCharge),
        await ensure(_PaymentsPages.TelegraphicTransferPage.chargeAcctValue).textContains(SIT ? testData.TTPayment.SIT.fromAccount : testData.TTPayment.UAT.fromAccount),
        await ensure(_PaymentsPages.TelegraphicTransferPage.residStatus).textContains(testData.TTPayment.residStatus),
        await ensure(_PaymentsPages.TelegraphicTransferPage.categoryValue).textContains(testData.TTPayment.category),
        await ensure(_PaymentsPages.TelegraphicTransferPage.relationshipValue).textContains(testData.TTPayment.relationship),
        await ensure(_PaymentsPages.TelegraphicTransferPage.identityValue).textContains(testData.TTPayment.identity),
        await ensure(_PaymentsPages.TelegraphicTransferPage.purposeCodeValue).textContains(testData.TTPayment.purposeCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.complianceCodeValue).textContains(testData.TTPayment.complianceCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.underlyingCodeValue).textContains(isEdit ? testData.TTPayment.underlyingCodeEdit :  testData.TTPayment.underlyingCode),
        await ensure(_PaymentsPages.TelegraphicTransferPage.custRefValue).textContains(isEdit ? referenceEdit : reference),
        await ensure(_PaymentsPages.TelegraphicTransferPage.messageToApproverValue).textContains(testData.TTPayment.transactionNote),
        await ensure(_PaymentsPages.TelegraphicTransferPage.isMessageToOrderingBankValue).textContains(testData.TTPayment.messageToOrderingBank),
        await ensure(_PaymentsPages.TelegraphicTransferPage.nextApprover).isNotEmpty(),
        await ensure(_PaymentsPages.TelegraphicTransferPage.activityLog).textContains(isEdit ? "Modify" : "Create")
    ]);
}
