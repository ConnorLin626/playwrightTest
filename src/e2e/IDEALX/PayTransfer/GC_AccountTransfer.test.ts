import { test, expect, Page } from '@playwright/test';
import { NavigatePages } from '../../../pages/Navigate';
import { PaymentsPages } from '../../../pages/IDEALX';
import { TestHelper } from '../../../pages/utils';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 加载测试数据 - 从 data/GC_testData.json 统一配置
 * 支持多用户并行测试，避免冲突
 */
const testDataPath = path.join(process.cwd(), 'data', 'GC_testData.json');
const testDataRaw = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

// 动态生成带时间戳的数据，确保测试数据的唯一性
const testData = {
  ...testDataRaw,
  AccountTransfer: {
    ...testDataRaw.AccountTransfer,
    newPayeeName: testDataRaw.AccountTransfer.PayeeName + ' ' + Date.now(),
    newPayeeNickname: testDataRaw.AccountTransfer.PayeeName + ' ' + Date.now()
  }
};

/**
 * 全局页面对象 - 支持多个 test.describe 共享
 * 懒加载模式：首次使用时创建
 */
let pages: PaymentsPages | null = null;

/**
 * 获取或创建 PaymentsPages 实例
 */
function getPages(page: Page): PaymentsPages {
  if (!pages) {
    pages = new PaymentsPages(page);
  }
  return pages;
}

/**
 * 测试套件：GC Account Transfer Payment
 * 基于 forAIstudy/src/e2e/IDEALX/PayTransfer/GC_AccountTransfer.test.ts
 */
test.describe.serial('GC Account Transfer Payment', () => {
  let referenceNumber: string = '';
  let templateName: string = '';
  let ACTPayeeName: string = '';

  test.beforeEach(async ({ page }) => {
    const projectName = test.info().project.name;
    const envData = projectName === 'SIT' ? testData.AccountTransfer.SIT : testData.AccountTransfer.UAT;
    await new NavigatePages(page, test.info()).loginIdealx(envData.loginCompanyId, envData.loginUserId, '123123', testData);
  });

  test.afterEach(async ({ page }) => {
    await TestHelper.takeScreenshotOnFinish(page, test.info());
  });
  // test('Copy an Account Transfer that Created from File Services', async ({ page }) => {
  //   const pages = getPages(page);
  //   let referenceNumber = '';
  //   const projectName = test.info().project.name;
  //   const envData = projectName === 'SIT' ? testData.FileService.SIT : testData.FileService.UAT;
  //   const accountEnvData = projectName === 'SIT' ? testData.AccountTransfer.SIT : testData.AccountTransfer.UAT;

  //   await pages.FilesPages.filesMenu.click();
  //   const paymentType = 'ALL - Universal File Format';
  //   const approvalOption = 'transaction';
  //   const fileName = await pages.FilesPages.uploadFilePage.fsUpload5(pages.FilesPages, paymentType, envData.fileNameForACT, approvalOption);
  //   await pages.FilesPages.uploadFilePage.refresh.click().catch(() => {});
  //   await pages.FilesPages.uploadFilePage.fileFilter.fill(fileName);
  //   await pages.FilesPages.uploadFilePage.refresh.click().catch(() => {});
  //   await pages.FilesPages.uploadFilePage.fileNameLink.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.FilesPages.uploadFilePage.paymentReferenceLink.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.AccountTransferPage.copyButton.click();
  //   await pages.AccountTransferPage.continueBtn.click().catch(() => {});
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.AccountTransferPage.nextButton.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.AccountTransferPage.submitButton.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   const refText = await pages.AccountTransferPage.referenceNumber.textContent();
  //   if (refText) {
  //     referenceNumber = refText.trim();
  //   }
  //   await pages.AccountTransferPage.paymentMenu.click();
  //   await pages.AccountTransferPage.tranferCenterFiler.fill(referenceNumber);
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.AccountTransferPage.refLink.click();
  //   await page.waitForTimeout(2000).catch(() => {});

  //   await expect(pages.AccountTransferPage.actStatusValue).toContainText(testData.status.PendingApproval);
  //   await expect(pages.AccountTransferPage.fromAccountValue).toContainText(accountEnvData.fromAccount);
  //   await expect(pages.AccountTransferPage.toNewPayeeNameValue).toContainText(testData.AccountTransfer.PayeeName);
  //   await expect(pages.AccountTransferPage.toNewPayeeAcctValue).toContainText(testData.AccountTransfer.PayeeAccount);
  //   await expect(pages.AccountTransferPage.amountValue).toContainText(testData.AccountTransfer.amountA1);
  //   await expect(pages.AccountTransferPage.paymentDetailValue).toContainText(testData.AccountTransfer.PaymentDetails);
  // });

  test('Create GC ACT template', async ({ page }) => {
    const pages = getPages(page);
    const templateName = 'GCACTPayment' + Date.now();
    const ACTPayeeName = 'ACTPayee' + Date.now();

    await pages.AccountTransferPage.paymentMenu.click();
    await pages.PaymentTemplatesPage.templateMenu.click();
    await page.waitForTimeout(2000).catch(() => {});
    await pages.PaymentTemplatesPage.createNewTemplateButton.click();
    await page.waitForTimeout(2000).catch(() => {});
    await pages.PaymentTemplatesPage.createSingleGCPaymentTemplateBtn.click();
    await pages.PaymentTemplatesPage.templateName.fill(templateName);
    await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.fromAccount, testData.AccountTransfer.fromGBPAccount);
    await pages.PaymentTemplatesPage.defaultAmount.fill(testData.AccountTransfer.amountA1);
    await pages.AccountTransferPage.newPayeeTab.click();
    await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.newPayeeCountry, testData.AccountTransfer.Country);
    await pages.AccountTransferPage.payeeBankRadio.click({ force: true });
    await pages.AccountTransferPage.newPayeeAcctNumber.fill(testData.AccountTransfer.newPayeeAcctNumber);
    await pages.AccountTransferPage.newPayeeName.fill(ACTPayeeName);
    await pages.AccountTransferPage.newPayeeNickname.fill(ACTPayeeName);
    await pages.BeneficiaryPage.addAddress.click();
    await pages.BeneficiaryPage.switchFormatButton.click();
    await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.payeeLocation, testData.Beneficiary.payeeLocation);
    await pages.BeneficiaryPage.townCity.fill(testData.Beneficiary.townCity);
    await pages.BeneficiaryPage.streetName.fill(testData.Beneficiary.streetName);
    await pages.BeneficiaryPage.buildingNum.fill(testData.Beneficiary.buildingNum);
    await pages.BeneficiaryPage.buildingName.fill(testData.Beneficiary.buildingName);
    await pages.BeneficiaryPage.floor.fill(testData.Beneficiary.floor);
    await pages.BeneficiaryPage.room.fill(testData.Beneficiary.room);
    await pages.BeneficiaryPage.department.fill(testData.Beneficiary.department);
    await pages.BeneficiaryPage.subDepartment.fill(testData.Beneficiary.subDepartment);
    await pages.BeneficiaryPage.postalCode.fill(testData.Beneficiary.postalCode);
    await pages.BeneficiaryPage.countrySubDivsion.fill(testData.Beneficiary.countrySubDivsion);
    await pages.BeneficiaryPage.townLocationName.fill(testData.Beneficiary.townLocationName);
    await pages.BeneficiaryPage.districtName.fill(testData.Beneficiary.districtName);
    await pages.PaymentTemplatesPage.nextButton.click();
    await pages.PaymentTemplatesPage.submitButton.click();
    await page.waitForTimeout(2000).catch(() => {});
    await pages.PaymentTemplatesPage.finishButton.click();
    await pages.PaymentTemplatesPage.manageTemplateFilter.fill(templateName);
    await pages.PaymentTemplatesPage.templateNameLink.click();
    await page.waitForTimeout(2000).catch(() => {});

    await expect(pages.PaymentTemplatesPage.ViewTemplateName).toContainText(templateName);
    await expect(pages.PaymentTemplatesPage.fromAccountACT).toContainText(testData.AccountTransfer.fromGBPAccount);
    await expect(pages.PaymentTemplatesPage.amountACT).toContainText(testData.AccountTransfer.amountA1);
    await expect(pages.PaymentTemplatesPage.toExistingPayeeNameACT).toContainText(ACTPayeeName);
    await expect(pages.PaymentTemplatesPage.templateACTStatus).toContainText(testData.status.PendingApproval);
  });

  // test('Approve GC ACT template', async ({ page }) => {
  //   const pages = getPages(page);
  // const projectName = test.info().project.name;
  // const envData = projectName === 'SIT' ? testData.AccountTransfer.SIT : testData.AccountTransfer.UAT;
  // const approveUserId = projectName === 'SIT' ? testData.AccountTransfer.SIT.ApproveTemplateUserId : testData.AccountTransfer.UAT.ApproveTemplateUserId;

  // await new NavigatePages(page, test.info()).loginIdealx(envData.loginCompanyId, approveUserId, '123123', testData);
  // await pages.AccountTransferPage.paymentMenu.click();
  // await page.waitForTimeout(2000).catch(() => {});
  // await pages.PaymentTemplatesPage.templateMenu.click();
  // await page.waitForTimeout(2000).catch(() => {});
  // await pages.PaymentTemplatesPage.manageTemplateFilter.fill(templateName);
  // await pages.PaymentTemplatesPage.selectTemCheckBox.click();
  // await pages.PaymentTemplatesPage.approveBtn.click();
  // await pages.PaymentTemplatesPage.viewApproveBtn.click();
  // await pages.PaymentTemplatesPage.dismissBtn.click().catch(() => {});
  // await pages.PaymentTemplatesPage.manageTemplateFilter.fill(templateName);
  // await pages.PaymentTemplatesPage.templateNameLink.click();
  // await page.waitForTimeout(2000).catch(() => {});

  // await expect(pages.PaymentTemplatesPage.fromAccountACT).toContainText(testData.AccountTransfer.fromGBPAccount);
  // await expect(pages.PaymentTemplatesPage.amountACT).toContainText(testData.AccountTransfer.amountA1);
  // await expect(pages.PaymentTemplatesPage.toExistingPayeeNameACT).toContainText(ACTPayeeName);
  // await expect(pages.PaymentTemplatesPage.templateACTStatus).toContainText(testData.status.Approved);
  // });
});