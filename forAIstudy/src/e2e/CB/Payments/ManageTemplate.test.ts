/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages } from "../../../pages/Navigate";
import { generatedID, saveScreen, ensure, SIT, handlerCase } from "../../../lib";
import { Menu } from "../../../config/menu";
import { PaymentsPages } from "../../../pages/CB/Payments";
import { browser } from "protractor";

let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('SG_testData.json');
let bulkTemplateName = '';
let singleTemplateName = '';

describe('Manage Template', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(SIT ? testData.payrollPaymentTemplate.SIT.loginCompanyId : testData.payrollPaymentTemplate.UAT.loginCompanyId, SIT ? testData.payrollPaymentTemplate.SIT.loginUserId : testData.payrollPaymentTemplate.UAT.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Create bulk template at least 2 payees(amount 0)', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
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
    await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
    await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
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
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
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
    await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
    await _PaymentsPages.PaymentTemplatesPage.batchReference.getText().then(text => {
      reference = text.trim();
    });
    await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.loadCondition();
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
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
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
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
    await _PaymentsPages.PaymentTemplatesPage.purposeCodeSelect.select(testData.FastPayment.purposeCode);
    await _PaymentsPages.PaymentTemplatesPage.paymentDetail.input(testData.FastPayment.paymentDetail);
    await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
    await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
    await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
    await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(singleTemplateName);
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
    await Promise.all([
      await ensure(_PaymentsPages.PaymentTemplatesPage.fromAccount).isNotEmpty(),
      await ensure(_PaymentsPages.PaymentTemplatesPage.amount).textContains(testData.FastPayment.amountA1),
      await ensure(_PaymentsPages.PaymentTemplatesPage.beneficiary).textContains(testData.FastPayment.existingPayee)
    ]);
  })

  //For AB-8924
  it('Create Payroll Alternate template with Reference for payee field contain max length valid value', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
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
    await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.payrollPaymentTemplate.maxLengthPayeeRef);
    await _PaymentsPages.PaymentTemplatesPage.nextButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateVerifyDetailPage();
    await _PaymentsPages.PaymentTemplatesPage.submitButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateSubmitPage();
    await ensure(_PaymentsPages.PaymentTemplatesPage).isUXSuccess();
    await _PaymentsPages.PaymentTemplatesPage.finishButton.click();
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
    await Promise.all([
      await ensure(_PaymentsPages.PaymentTemplatesPage.bulkFromAccount).textContains(SIT ? testData.payrollPaymentTemplate.SIT.fromAccount : testData.payrollPaymentTemplate.UAT.fromAccount),
      await ensure(_PaymentsPages.PaymentTemplatesPage.ViewpayeeRef).textContains(testData.payrollPaymentTemplate.maxLengthPayeeRef)
    ]);
  });

  it('Edit Payroll template with Reference for payee field contain space char', async function () {
    await _PaymentsPages.openMenu(Menu.Payments.PaymentTemplates);
    await _PaymentsPages.PaymentTemplatesPage.loadCondition();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateOrganisation.ElementExist();
    await _PaymentsPages.PaymentTemplatesPage.manageTemplateFilter.input(bulkTemplateName);
    await _PaymentsPages.PaymentTemplatesPage.templateNameLink.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForBulkTempViewPayge();
    await _PaymentsPages.PaymentTemplatesPage.EditTemplate.jsClick();
    await _PaymentsPages.PaymentTemplatesPage.loadConditionForCreateInputDetailPage();
    await _PaymentsPages.PaymentTemplatesPage.payeeAmount.input(testData.payrollPaymentTemplate.amountA1);
    await _PaymentsPages.PaymentTemplatesPage.payeeRef.clean();
    await _PaymentsPages.PaymentTemplatesPage.payeeRef.input(testData.payrollPaymentTemplate.payeeRefValue);
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
      await ensure(_PaymentsPages.PaymentTemplatesPage.bulkPayeeAmount).textContains(testData.BulkPayment.amountA1),
      await ensure(_PaymentsPages.PaymentTemplatesPage.ViewpayeeRef).textContains(testData.payrollPaymentTemplate.payeeRefValue)
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