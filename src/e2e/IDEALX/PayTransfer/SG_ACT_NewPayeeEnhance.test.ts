import { test, expect, Page } from '@playwright/test';
import { NavigatePages } from '../../../pages/Navigate';
import { PaymentsPages } from '../../../pages/IDEALX';
import { TestHelper } from '../../../pages/utils';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 加载测试数据 - 从 data/SG_testData.json 统一配置
 * 支持多用户并行测试，避免冲突
 */
const testDataPath = path.join(process.cwd(), 'data', 'SG_testData.json');
const testDataRaw = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

// 动态生成带时间戳的数据，确保测试数据的唯一性
const testData = {
  ...testDataRaw,
  AccountTransfer: {
    ...testDataRaw.AccountTransfer,
    newPayeeName: testDataRaw.AccountTransfer.newPayeeName + ' ' + Date.now(),
    newPayeeNickname: testDataRaw.AccountTransfer.newPayeeNickname + ' ' + Date.now(),
    transactionNote: testDataRaw.AccountTransfer.transactionNote + ' ' + Date.now()
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
 * 测试套件：ACT Payment - 创建新收款人测试
 * 基于 forAIstudy/src/e2e/IDEALX/PayTransfer/SG_AccountTransfer.test.ts
 */
test.describe('ACT Payment - Create with New Payee', () => {
  test.beforeEach(async ({ page }) => {
    const projectName = test.info().project.name;
    await new NavigatePages(page, test.info()).loginIdealx(testData.login.corpId,undefined,testData.login.pin,testData);
  });

  test.afterEach(async ({ page }) => {
    // 截图
    await TestHelper.takeScreenshotOnFinish(page, test.info());

    // 测试失败时获取服务器日志（自动识别当前用户）
    await TestHelper.fetchLogsOnFailure(test.info(), testData);
  });

  test('Create an ACT Payment with new Payee', async ({ page }) => {
    await createACTPaymentWithNewPayee(page);
  });
});

/**
 * 创建 ACT Payment 使用新收款人的主要测试逻辑
 * 对应 Protractor 版本的第28行测试用例
 */
async function createACTPaymentWithNewPayee(page: Page) {
  const pages = getPages(page);
  let referenceNumber: string = '';
  await pages.AccountTransferPage.paymentMenu.click();
  await pages.AccountTransferPage.makePayment.click();
  await pages.AccountTransferPage.selectOption(pages.AccountTransferPage.fromAccount, testData.AccountTransfer.SIT.fromAccount);
  await pages.AccountTransferPage.amount.fill('10.00');
  await pages.AccountTransferPage.newPayeeTab.click();
  await pages.AccountTransferPage.continueBtn.click();
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry,testData.AccountTransfer.Country);
  await pages.AccountTransferPage.payeeBankRadio.click();
  await pages.AccountTransferPage.newPayeeAcctNumber.fill(testData.AccountTransfer.newPayeeAcctNumber);
  await pages.AccountTransferPage.newPayeeName.fill(testData.AccountTransfer.newPayeeName);
  await pages.AccountTransferPage.newPayeeNickname.fill(testData.AccountTransfer.newPayeeNickname);
  await pages.BeneficiaryPage.addAddress.click();
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.payeeLocation,testData.Beneficiary.payeeLocation);
  await pages.BeneficiaryPage.townCity.fill(testData.Beneficiary.townCity);
  await pages.AccountTransferPage.newPayeeAdd1.fill(testData.AccountTransfer.newPayeeAdd1);
  await pages.AccountTransferPage.newPayeeAdd2.fill(testData.AccountTransfer.newPayeeAdd2);
  await pages.BeneficiaryPage.postalCode.fill(testData.Beneficiary.postalCode);
  await pages.AccountTransferPage.paymentDetail.fill(testData.AccountTransfer.paymentDetail);
  await pages.AccountTransferPage.isTransactionNote.click();
  await pages.AccountTransferPage.transactionNote.fill(testData.AccountTransfer.transactionNote);
  await pages.AccountTransferPage.nextButton.click();
  await pages.AccountTransferPage.submitButton.click();
  await page.waitForTimeout(2000).catch(() => {});//需要等待否则获取为空
  const refText = await pages.AccountTransferPage.referenceNumber.textContent();
  if (refText) {
    referenceNumber = refText.trim();
  }
  await pages.AccountTransferPage.finishedButton.click();
  await pages.AccountTransferPage.paymentMenu.click();
  await pages.AccountTransferPage.tranferCenterFiler.fill(referenceNumber);
  await page.waitForTimeout(2000).catch(() => {});
  await pages.AccountTransferPage.refLink.click();
  await page.waitForTimeout(2000).catch(() => {});
  await Promise.all([
      expect(pages.AccountTransferPage.actStatusValue).toContainText('Pending Approval'),
      expect(pages.AccountTransferPage.amountValue).toContainText('10.00'),
      expect(pages.AccountTransferPage.toNewPayeeNameValue).toContainText(testData.AccountTransfer.newPayeeName),
      expect(pages.AccountTransferPage.newPayeeAcctNum).toContainText(testData.AccountTransfer.newPayeeAcctNumber),
  ]);
}
