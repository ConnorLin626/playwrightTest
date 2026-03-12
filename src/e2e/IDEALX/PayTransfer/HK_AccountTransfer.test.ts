import { test, expect, Page } from '@playwright/test';
import { NavigatePages } from '../../../pages/Navigate';
import { PaymentsPages } from '../../../pages/IDEALX';
import { TestHelper } from '../../../pages/utils';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 加载测试数据 - 从 data/HK_testData.json 统一配置
 * 支持多用户并行测试，避免冲突
 */
const testDataPath = path.join(process.cwd(), 'data', 'HK_testData.json');
const testDataRaw = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

// 动态生成带时间戳的数据，确保测试数据的唯一性
const testData = {
  ...testDataRaw,
  AccountTransfer: {
    ...testDataRaw.AccountTransfer,
    newPayeeName: testDataRaw.AccountTransfer.newPayeeName + ' ' + Date.now(),
    newPayeeNickname: testDataRaw.AccountTransfer.newPayeeNickname + ' ' + Date.now()
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
 * 测试套件：HK Account Transfer Payment
 * 基于 forAIstudy/src/e2e/IDEALX/PayTransfer/HK_AccountTransfer.test.ts
 */
test.describe('HK Account Transfer Payment', () => {
  test.beforeEach(async ({ page }) => {
    const projectName = test.info().project.name;
    await new NavigatePages(page, test.info()).loginIdealx(testData.AccountTransfer.SIT.loginCompanyId, testData.AccountTransfer.SIT.loginUserId, testData.AccountTransfer.SIT.pinId, testData);
  });
  test.afterEach(async ({ page }) => {
    await TestHelper.takeScreenshotOnFinish(page, test.info());
  });
  test('Create ACT payment with existing payee when retrieve name resp success', async ({ page }) => {
    const pages = getPages(page);
    const envData =  testData.AccountTransfer.SIT;
    let referenceNumber: string = '';
    await pages.AccountTransferPage.paymentMenu.click();
    await pages.AccountTransferPage.makePayment.click();
    await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.fromAccount, envData.fromAccount);
    await pages.AccountTransferPage.amount.fill(testData.AccountTransfer.amountA1);
    await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.existingPayee, testData.AccountTransfer.existingPayeeRetrSuccess);
    await expect(pages.AccountTransferPage.createPageRetriveName).toContainText(envData.retrieveNameValue);
    await pages.AccountTransferPage.nextButton.click();
    await pages.AccountTransferPage.submitButton.click();
    await page.waitForTimeout(2000).catch(() => {});
    const refText = await pages.AccountTransferPage.referenceNumber.textContent();
    if (refText) {
      referenceNumber = refText.trim();
    }
    await pages.AccountTransferPage.paymentMenu.click();
    await pages.AccountTransferPage.tranferCenterFiler.fill(referenceNumber);
    await page.waitForTimeout(2000).catch(() => {});
    await pages.AccountTransferPage.refLink.click();
    await page.waitForTimeout(2000).catch(() => {});
    await expect(pages.AccountTransferPage.actStatusValue).toContainText(testData.status.PendingApproval);
    await expect(pages.AccountTransferPage.amountValue).toContainText(testData.AccountTransfer.amountA1);
    await expect(pages.AccountTransferPage.fromAccountValue).toContainText(envData.fromAccount);
    await expect(pages.AccountTransferPage.toExistingPayeeNameValue).toContainText(testData.AccountTransfer.existingPayeeRetrSuccess);
  });

  // test('Create ACT payment with new payee when retrieve name resp success', async ({ page }) => {
  //   const pages = getPages(page);
  //   const envData = test.info().project.name === 'SIT' ? testData.AccountTransfer.SIT : testData.AccountTransfer.UAT;

  //   let referenceNumber: string = '';
  //   await pages.AccountTransferPage.paymentMenu.click();
  //   await pages.AccountTransferPage.makePayment.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.fromAccount, envData.fromAccount);
  //   await pages.AccountTransferPage.amount.fill(testData.AccountTransfer.amountA1);
  //   await pages.AccountTransferPage.newPayeeTab.click();
  //   await pages.AccountTransferPage.continueBtn.click().catch(() => {});
  //   await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.Country, testData.AccountTransfer.Country);
  //   await pages.AccountTransferPage.payeeBankRadio.click();
  //   await pages.AccountTransferPage.newPayeeAcctNumber.fill(envData.newPayeeAcctNumber);
  //   await pages.AccountTransferPage.newPayeeName.fill(testData.AccountTransfer.newPayeeName);
  //   const isnewPayeeNicknameVisible = await pages.AccountTransferPage.newPayeeNickname.isVisible().catch(() => false);
  //   if (isnewPayeeNicknameVisible) {
  //     await pages.AccountTransferPage.newPayeeNickname.fill(testData.AccountTransfer.newPayeeNickname);
  //   }
  //   await pages.BeneficiaryPage.addAddress.click();
  //   await pages.AccountTransferPage.selectOption(pages.BeneficiaryPage.payeeLocation, testData.Beneficiary.payeeLocation);
  //   await pages.BeneficiaryPage.townCity.fill(testData.Beneficiary.townCity);
  //   await pages.AccountTransferPage.newPayeeAdd1.fill(testData.AccountTransfer.newPayeeAdd1);
  //   await pages.AccountTransferPage.newPayeeAdd2.fill(testData.AccountTransfer.newPayeeAdd2);
  //   await pages.BeneficiaryPage.postalCode.fill(testData.Beneficiary.postalCode);
  //   await pages.AccountTransferPage.retireveNameBtn.click();
  //   await expect(pages.AccountTransferPage.createPageRetriveNameNewPayee).toContainText(envData.retrieveNameValue);
  //   await pages.AccountTransferPage.nextButton.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.AccountTransferPage.submitButton.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   const refText = await pages.AccountTransferPage.referenceNumber.textContent();
  //   if (refText) {
  //     referenceNumber = refText.trim();
  //   }
  //   await pages.AccountTransferPage.paymentMenu.click();
  //   await pages.TransferCentersPage.tranferCenterFiler.fill(referenceNumber);
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.AccountTransferPage.refLink.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await expect(pages.AccountTransferPage.actStatusValue).toContainText(testData.status.PendingApproval);
  //   await expect(pages.AccountTransferPage.amountValue).toContainText(testData.AccountTransfer.amountA1);
  //   await expect(pages.AccountTransferPage.fromAccountValue).toContainText(envData.fromAccount);
  //   await expect(pages.AccountTransferPage.toNewPayeeNameValue).toContainText(testData.AccountTransfer.newPayeeName);
  // });

  // test('Create ACT payment with new payee when retrieve name resp failed', async ({ page }) => {
  //   const pages = getPages(page);
  //   const envData = test.info().project.name === 'SIT' ? testData.AccountTransfer.SIT : testData.AccountTransfer.UAT;

  //   await pages.AccountTransferPage.paymentMenu.click();
  //   await pages.AccountTransferPage.makePayment.click();
  //   await page.waitForTimeout(2000).catch(() => {});
  //   await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.fromAccount, envData.fromAccount);
  //   await pages.AccountTransferPage.amount.fill(testData.AccountTransfer.amountA1);
  //   await pages.AccountTransferPage.newPayeeTab.click();
  //   await pages.AccountTransferPage.continueBtn.click().catch(() => {});
  //   await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.Country, testData.AccountTransfer.Country);
  //   await pages.AccountTransferPage.newPayeeName.fill(testData.AccountTransfer.newPayeeName);
  //   await pages.AccountTransferPage.payeeBankRadio.click();
  //   await pages.AccountTransferPage.newPayeeAcctNumber.fill(testData.AccountTransfer.retrieveFailAcctNum);
  //   await pages.BeneficiaryPage.addAddress.click();
  //   await pages.AccountTransferPage.selectOption(pages.BeneficiaryPage.payeeLocation, testData.Beneficiary.payeeLocation);
  //   await pages.BeneficiaryPage.townCity.fill(testData.Beneficiary.townCity);
  //   await pages.AccountTransferPage.newPayeeAdd1.fill(testData.AccountTransfer.newPayeeAdd1);
  //   await pages.AccountTransferPage.newPayeeAdd2.fill(testData.AccountTransfer.newPayeeAdd2);
  //   await pages.BeneficiaryPage.postalCode.fill(testData.Beneficiary.postalCode);
  //   await pages.AccountTransferPage.retireveNameBtn.click();
  //   await expect(pages.AccountTransferPage.createPageRetrieveNameFailMsg).toContainText(envData.retrieveNameFailMessage);
  //   });
});
