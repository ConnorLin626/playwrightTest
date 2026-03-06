/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, } from "../../../pages/IDEALX";
import { generatedID, saveScreen, ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData_01.json');
let bulkTemplateName = '';
let singleTemplateName = '';
let payeeName="";

describe('Manage Template', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.payrollPaymentTemplate.SIT.loginCompanyId : testData.payrollPaymentTemplate.UAT.loginCompanyId, SIT ? testData.payrollPaymentTemplate.SIT.loginUserId : testData.payrollPaymentTemplate.UAT.loginUserId, testData.payrollPaymentTemplate.UAT.pinID);
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Create bulk template at least 2 payees - amount 0', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createBulkTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        bulkTemplateName = 'Payroll' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.payrollPaymentTemplate.SIT.fromAccount : testData.payrollPaymentTemplate.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.payrollPaymentTemplate.amountV);
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForPayeePage();
        await _PaymentsPages.PaymentTemplatesPage.existingPayeeFilter.input(testData.payrollPaymentTemplate.existingPayeeName1);
        await _PaymentsPages.PaymentTemplatesPage.addButton.click();
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.payrollPaymentTemplate.payeeRef);
        await _PaymentsPages.PaymentTemplatesPage.existingPayeeFilter.clean();
        await _PaymentsPages.PaymentTemplatesPage.existingPayeeFilter.input(testData.payrollPaymentTemplate.existingPayeeName2);
        await _PaymentsPages.PaymentTemplatesPage.addButton.click();
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.payrollPaymentTemplate.payeeRef);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.payrollPaymentTemplate.SIT.fromAccount : testData.payrollPaymentTemplate.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.payeeFilter.input(testData.payrollPaymentTemplate.existingPayeeName1);
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiary).textContains(testData.payrollPaymentTemplate.existingPayeeName1)
        ]);
        await _PaymentsPages.PaymentTemplatesPage.payeeFilter.clean();
        await _PaymentsPages.PaymentTemplatesPage.payeeFilter.input(testData.payrollPaymentTemplate.existingPayeeName2);
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiary).textContains(testData.payrollPaymentTemplate.existingPayeeName2)
        ]);
    });

    it('Create transaction from above bulk template', async function () {
        let reference = '';
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.clean();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
        await ensure(_PaymentsPages.PaymentTemplatesPage.manageTemplateFilter).textIs(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.makeAPaymentLink.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.addPayeeFilter.input(testData.payrollPaymentTemplate.existingPayeeName1);
        await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.payrollPaymentTemplate.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.addPayeeFilter.clean();
        await _PaymentsPages.PaymentTemplatesPage.addPayeeFilter.input(testData.payrollPaymentTemplate.existingPayeeName2);
        await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.payrollPaymentTemplate.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.batchReference.getText().then(text => {
            reference = text.trim();
        });
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await _PaymentsPages.PayrollPage.loadConditionForViewPaymentPage();
        await ensure(_PaymentsPages.PayrollPage.fromAccountView).textContains(SIT ? testData.payrollPaymentTemplate.SIT.fromAccount : testData.payrollPaymentTemplate.UAT.fromAccount);
        await _PaymentsPages.PayrollPage.viewPayrollFilter.input(testData.payrollPaymentTemplate.existingPayeeName1);
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.payrollPaymentTemplate.existingPayeeName1),
            await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(testData.payrollPaymentTemplate.amountA1)
        ]);
        await _PaymentsPages.PayrollPage.viewPayrollFilter.clean();
        await _PaymentsPages.PayrollPage.viewPayrollFilter.input(testData.payrollPaymentTemplate.existingPayeeName2);
        await Promise.all([
            await ensure(_PaymentsPages.PayrollPage.payeeNameValue).textContains(testData.payrollPaymentTemplate.existingPayeeName2),
            await ensure(_PaymentsPages.PayrollPage.amountFirst).textContains(testData.payrollPaymentTemplate.amountA1)
        ]);
    });

    it('Create a single payment template', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'fastPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.FastPayment.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.FastPayment.amountV);
        await _PaymentsPages.PaymentTemplatesPage.payeeSelect.select(testData.FastPayment.existingPayee);
        await _PaymentsPages.PaymentTemplatesPage.purposeCodeSelect.click();
        await _PaymentsPages.PaymentTemplatesPage.filterRppc.input(testData.FastPayment.purposeCode);
        await _PaymentsPages.PaymentTemplatesPage.selectFirstResult.click();
        await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.FastPayment.paymentDetail);
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
            await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccount).textContains(SIT ? testData.FastPayment.SIT.fromAccount : testData.FastPayment.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.amount).textContains(testData.FastPayment.amountA1),
            await ensure(_PaymentsPages.PaymentTemplatesPage.beneficiary).textContains(testData.FastPayment.existingPayee)
        ]);
    })
    
    //Add for IDXP-2004
    it('Create RTGS Template with existing payee that towncity no value check will display update payee detail pop up', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'RTGSPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.RTGSPaymentTemplate.SIT.fromAccount : testData.RTGSPaymentTemplate.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.RTGSPaymentTemplate.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.payeeSelect.select(testData.RTGSPaymentTemplate.existingPayeeName1);
        await _PaymentsPages.PaymentTemplatesPage.RTGSType.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.bankCharges.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.updatePayeePopUp).textContains(testData.RTGSPaymentTemplate.updatePayeeDeatil)
        ]);
        await _PaymentsPages.PaymentTemplatesPage.closBtn.click();
    })

    it('Create TT Template with existing payee that address1 no value check will display update payee detail pop up', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'TTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.TelegraphicTransferTemplate.SIT.fromAccount : testData.TelegraphicTransferTemplate.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.TelegraphicTransferTemplate.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.payeeSelect.select(testData.TelegraphicTransferTemplate.existingPayee);
        await _PaymentsPages.PaymentTemplatesPage.bankCharges.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await Promise.all([
            await ensure(_PaymentsPages.TelegraphicTransferPage.updatePayeePopUp).textContains(testData.TelegraphicTransferTemplate.updatePayeeDeatil)
        ]);
        await _PaymentsPages.PaymentTemplatesPage.closBtn.click();
    })

    //IDXP-777 Purpose Code dropdown for INR
    it('Create a TT Template with currency is INR ', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'SGTTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.TelegraphicTransferTemplate.SIT.fromAccount : testData.TelegraphicTransferTemplate.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.currencySelect.select(testData.TelegraphicTransferTemplate.inrPaymentCcy);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.TelegraphicTransferTemplate.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.addNewPayeeBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.selectedCountry.select(testData.TelegraphicTransferTemplate.country);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TelegraphicTransferTemplate.newPayeeBankId);
        await _PaymentsPages.PaymentTemplatesPage.IFSCcode.input('ABCD0123456'),
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAcctNumber.input(testData.TelegraphicTransferTemplate.accountNum);
        payeeName='TT Auto'+generatedID();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransferTemplate.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransferTemplate.townCity);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd1.input(testData.TelegraphicTransferTemplate.newPayeeAdd1);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAdd2.input(testData.TelegraphicTransferTemplate.newPayeeAdd2);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransferTemplate.postalCode);
        await _PaymentsPages.PaymentTemplatesPage.purposeCodeSelect.click();
        await _PaymentsPages.PaymentTemplatesPage.filterRppc.input(testData.TelegraphicTransferTemplate.purposeCodeForINR);
        await _PaymentsPages.PaymentTemplatesPage.selectFirstResult.click();
        await _PaymentsPages.PaymentTemplatesPage.bankCharges.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.TelegraphicTransferTemplate.paymentDetail);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        //await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameValue).textContains(payeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.PurposeCodeValue).textContains(testData.TelegraphicTransferTemplate.purposeCodeForINR),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateTTStatus).textIs(testData.status.Approved),
       ]);
    });

    it('Create a TT Template with new payee address and detail format that all fields has value', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'SGTTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.TelegraphicTransferTemplate.SIT.fromAccount : testData.TelegraphicTransferTemplate.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.currencySelect.select(testData.TelegraphicTransferTemplate.currency);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.TelegraphicTransferTemplate.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.addNewPayeeBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.selectedCountry.select(testData.TelegraphicTransferTemplate.HKcountry);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TelegraphicTransferTemplate.newPayeeBankIdHK);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAcctNumber.input(testData.TelegraphicTransferTemplate.accountNum);
        payeeName='TT Auto'+generatedID();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.switchFormatButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransferTemplate.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransferTemplate.townCity);
        await _PaymentsPages.TelegraphicTransferPage.streetName.input(testData.TelegraphicTransferTemplate.streetName);
        await _PaymentsPages.TelegraphicTransferPage.buildingNum.input(testData.TelegraphicTransferTemplate.buildingNum);
        await _PaymentsPages.TelegraphicTransferPage.buildingName.input(testData.TelegraphicTransferTemplate.buildingName);
        await _PaymentsPages.TelegraphicTransferPage.floor.input(testData.TelegraphicTransferTemplate.floor);
        await _PaymentsPages.TelegraphicTransferPage.room.input(testData.TelegraphicTransferTemplate.room);
        await _PaymentsPages.TelegraphicTransferPage.department.input(testData.TelegraphicTransferTemplate.department);
        await _PaymentsPages.TelegraphicTransferPage.subDepartment.input(testData.TelegraphicTransferTemplate.subDepartment);
        await _PaymentsPages.TelegraphicTransferPage.postalCode.input(testData.TelegraphicTransferTemplate.postalCode);
        await _PaymentsPages.TelegraphicTransferPage.countrySubDivsion.input(testData.TelegraphicTransferTemplate.countrySubDivsion);
        await _PaymentsPages.TelegraphicTransferPage.townLocationName.input(testData.TelegraphicTransferTemplate.townLocationName);
        await _PaymentsPages.TelegraphicTransferPage.districtName.input(testData.TelegraphicTransferTemplate.districtName);
        await _PaymentsPages.PaymentTemplatesPage.bankCharges.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.TelegraphicTransferTemplate.paymentDetail);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        //await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameValue).textContains(payeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateTTStatus).textIs(testData.status.Approved)
        ]);
    });

    it('Create and Edit TT Template with new payee address and detail format that only mandatory field has value', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.createSinglePaymentTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        singleTemplateName = 'SGTTPayment' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.TelegraphicTransferTemplate.SIT.fromAccount : testData.TelegraphicTransferTemplate.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.currencySelect.select(testData.TelegraphicTransferTemplate.currency);
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.TelegraphicTransferTemplate.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.addNewPayeeBtn.click();
        await _PaymentsPages.PaymentTemplatesPage.selectedCountry.select(testData.TelegraphicTransferTemplate.HKcountry);
        await _PaymentsPages.TelegraphicTransferPage.payeeBankID.select(testData.TelegraphicTransferTemplate.newPayeeBankIdHK);
        await _PaymentsPages.PaymentTemplatesPage.newPayeeAcctNumber.input(testData.TelegraphicTransferTemplate.accountNum);
        payeeName='TT Auto'+generatedID();
        await _PaymentsPages.TelegraphicTransferPage.newPayeeName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.newPayeeNickName.input(payeeName);
        await _PaymentsPages.TelegraphicTransferPage.switchFormatButton.jsClick();
        await _PaymentsPages.TelegraphicTransferPage.payeeLocation.select(testData.TelegraphicTransferTemplate.payeeLocation);
        await _PaymentsPages.TelegraphicTransferPage.townCity.input(testData.TelegraphicTransferTemplate.townCity);
        await _PaymentsPages.TelegraphicTransferPage.streetName.input(testData.TelegraphicTransferTemplate.streetName);
        await _PaymentsPages.PaymentTemplatesPage.bankCharges.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.TelegraphicTransferTemplate.paymentDetail);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        //await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameValue).textContains(payeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateTTStatus).textIs(testData.status.Approved),
        ]);
        //Edit the template
        await _PaymentsPages.PaymentTemplatesPage.EditTTTemplate.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForSingleCreatePage();
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.clean();
        await _PaymentsPages.PaymentTemplatesPage.defaultAmount.input(testData.TelegraphicTransferTemplate.amountV);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForTTtempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.toExistingPayeeNameValue).textContains(payeeName),
            await ensure(_PaymentsPages.PaymentTemplatesPage.sendAmountTTValue).textContains(testData.TelegraphicTransferTemplate.amountV),
            await ensure(_PaymentsPages.PaymentTemplatesPage.templateTTStatus).textIs(testData.status.Approved),
        ]);
    });
    
    //For AB-8924
    it('Create Payroll template with Reference for payee field contain space char', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.createBulkTemplateButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        bulkTemplateName = 'Payroll' + generatedID();
        await _PaymentsPages.PaymentTemplatesPage.templateName.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.payrollPaymentTemplate.SIT.fromAccount : testData.payrollPaymentTemplate.UAT.fromAccount);
        await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.payrollPaymentTemplate.amountV);
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForPayeePage();
        await _PaymentsPages.PaymentTemplatesPage.existingPayeeFilter.input(testData.payrollPaymentTemplate.existingPayeeName1);
        await _PaymentsPages.PaymentTemplatesPage.addButton.click();
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.payrollPaymentTemplate.payeeRefValue);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.payrollPaymentTemplate.SIT.fromAccount : testData.payrollPaymentTemplate.UAT.fromAccount),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewpayeeRef).textContains(testData.payrollPaymentTemplate.payeeRefValue),
        ]);
    });

    it('Edit Payroll template with Reference for payee field contain max length valid value', async function () {
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.templateMenu.click();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
        await _PaymentsPages.PaymentTemplatesPage.EditTemplate.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.payrollPaymentTemplate.amountA1);
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.clean();
        await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.payrollPaymentTemplate.maxLengthPayeeRef);
        await _PaymentsPages.PaymentTemplatesPage.nextButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
        await _PaymentsPages.PaymentTemplatesPage.submitButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
        await _PaymentsPages.PaymentTemplatesPage.finishButton.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadCondition();
        await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
        await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
        await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
        await Promise.all([
            await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.payrollPaymentTemplate.amountA1),
            await ensure(_PaymentsPages.PaymentTemplatesPage.ViewpayeeRef).textContains(testData.payrollPaymentTemplate.maxLengthPayeeRef),
        ]);
    });

    // it('Create FAST Bulk Payment template with New PayNow', async function () {
    //   // init value
    //   bulkTemplateName = 'FASTBulkPayment' + generatedID();
    //   const fastBulkPayeeNickName = 'FASTBulkNick' + generatedID();

    //   await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
    //   await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //   await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
    //   await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.createSgBulkTemplateButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
    //   await _PaymentsPages.PaymentTemplatesPage.templateName.input(bulkTemplateName);
    //   await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount);
    // 	await _PaymentsPages.PaymentTemplatesPage.loadConditionForPayeePage();
    //   await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.FastBulkPayment.amountV);
    //   await _PaymentsPages.PaymentTemplatesPage.newPayNowButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.newPayNowMobNum.input(testData.FastBulkPayment.proxyTypeMobNum);
    //   await _PaymentsPages.PaymentTemplatesPage.newPayNowNickName.input(fastBulkPayeeNickName);
    //   await _PaymentsPages.PaymentTemplatesPage.addPayeeButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.FastBulkPayment.amountA1);
    //   await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.FastBulkPayment.payeeRef);
    //   await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
    //   await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
    //   await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
    //   await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //   await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
    //   await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
    //   await Promise.all([
    //     await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
    //     await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.FastBulkPayment.amountA1),
    //     await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiaryNickName).textContains(fastBulkPayeeNickName),
    //     await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayNowMobNum).textContains(testData.FastBulkPayment.proxyTypeMobNum),
    //   ]);
    // });

    // it('Create FAST Bulk Payment template with existing payee', async function () {
    //   // init value
    //   bulkTemplateName = 'FASTBulkPayment' + generatedID();
    //   await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);

    //   await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //   await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
    //   await _PaymentsPages.PaymentTemplatesPage.createNewTemplateButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.createSgBulkTemplateButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
    //   await _PaymentsPages.PaymentTemplatesPage.templateName.input(bulkTemplateName);
    //   await _PaymentsPages.PaymentTemplatesPage.accountSelect.select(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount);
    //   await _PaymentsPages.PaymentTemplatesPage.maxAmount.input(testData.FastBulkPayment.amountV);
    //   await _PaymentsPages.PaymentTemplatesPage.loadConditionForPayeePage();
    //   await _PaymentsPages.PaymentTemplatesPage.existingPayeeFilter.input(testData.FastBulkPayment.SIT.existingPayeeA1);
    //   await _PaymentsPages.PaymentTemplatesPage.addButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.FastBulkPayment.amountA1);
    //   await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.FastBulkPayment.payeeRef);
    //   await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
    //   await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
    //   await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
    //   await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
    //   await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    //   await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
    //   await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
    //   await Promise.all([
    //     await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.FastBulkPayment.SIT.fromAccount : testData.FastBulkPayment.UAT.fromAccount),
    //     await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.FastBulkPayment.amountA1),
    //     await ensure(_PaymentsPages.PaymentTemplatesPage.bulkBeneficiary).textContains(testData.FastBulkPayment.SIT.existingPayeeA1)
    //   ]);
    // });
});