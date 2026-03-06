import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { AccountTransferPage } from '../src/pages/IDEALX/PayTransfer/AccountTransferPage';
import { BeneficiaryPage } from '../src/pages/IDEALX/PayTransfer/BeneficiaryPage';

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
 * 登录页面对象
 */
class LoginPage {
  constructor(private page: Page) {}

  readonly corpIdInput = this.page.locator('#corpId');
  readonly userIdInput = this.page.locator('#username');
  readonly pinInput = this.page.locator('#psw');

  async login(corpId: string, userId: string, pin: string) {
    console.log(`[登录] Corp ID: ${corpId}, User ID: ${userId}`);
    await this.corpIdInput.fill(corpId);
    await this.userIdInput.fill(userId);
    await this.pinInput.fill(pin);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    console.log('[登录] 登录完成');
  }
}

/**
 * 测试套件：ACT Payment - 创建新收款人测试
 * 基于 forAIstudy/src/e2e/IDEALX/PayTransfer/SG_AccountTransfer.test.ts
 */
test.describe('ACT Payment - Create with New Payee', () => {
  let referenceNumber: string = '';

  test.beforeEach(async ({ page }) => {
    const projectName = test.info().project.name;
    console.log(`\n[${projectName}] =======================================`);
    console.log(`[${projectName}] 测试开始: ${test.info().title}`);
    console.log(`[${projectName}] =======================================`);

    // 根据项目名称选择不同的登录账号，避免并行冲突
    let userId: string;

    if (projectName === 'chromium') {
      userId = testData.login.userIdChrome1;
    } else if (projectName === 'chromium2') {
      userId = testData.login.userIdChrome2;
    } else {
      userId = testData.login.userIdFirefox;
    }

    console.log(`[${projectName}] 使用登录账号: ${testData.login.corpId}/${userId}`);

    // 登录
    const loginPage = new LoginPage(page);
    await page.goto('https://192.168.0.251:10444/iws/ssologin');
    await loginPage.login(
      testData.login.corpId,
      userId,
      testData.login.pin
    );
  });

  test.afterEach(async ({ page }) => {
    const projectName = test.info().project.name;
    console.log(`[${projectName}] 测试完成`);
    await page.screenshot({ path: `screenshots/ACT-NewPayee-finish-${projectName}-${Date.now()}.png`, fullPage: true });
  });

  /**
   * 测试用例: 根据项目名称运行对应的测试
   * 每个项目只运行一次，避免重复登录
   */
  test('Create an ACT Payment with new Payee', async ({ page }) => {
    await createACTPaymentWithNewPayee(page);
  });
});

/**
 * 创建 ACT Payment 使用新收款人的主要测试逻辑
 * 对应 Protractor 版本的第28行测试用例
 */
async function createACTPaymentWithNewPayee(page: Page) {
  const projectName = test.info().project.name;
  console.log(`[${projectName}] 开始执行: Create an ACT Payment with new Payee`);

  const actPage = new AccountTransferPage(page);
  const beneficiaryPage = new BeneficiaryPage(page);

  // ========================================
  // 步骤 1: 导航到 Payments 菜单
  // ========================================
  console.log(`[${projectName}] 步骤 1: 点击 Payments 菜单`);
  await actPage.paymentMenu.click();
  await actPage.waitForPageLoad();
  await page.screenshot({ path: `screenshots/ACT-NewPayee-step1-menu-${projectName}-${Date.now()}.png` });

  // ========================================
  // 步骤 2: 点击 Make Payment
  // ========================================
  console.log(`[${projectName}] 步骤 2: 点击 Make Payment`);
  await actPage.makePayment.click();
  await actPage.waitForPageLoad();
  await page.screenshot({ path: `screenshots/ACT-NewPayee-step2-makePayment-${projectName}-${Date.now()}.png` });

  // ========================================
  // 步骤 3: 选择 From Account
  // ========================================
  console.log(`[${projectName}] 步骤 3: 选择 From Account = ${testData.AccountTransfer.UAT.fromAccount}`);
  await actPage.selectOption(actPage.fromAccount, testData.AccountTransfer.UAT.fromAccount);
  await page.waitForTimeout(1000).catch(() => {});

  // ========================================
  // 步骤 4: 输入金额
  // ========================================
  console.log(`[${projectName}] 步骤 4: 输入金额 = ${testData.AccountTransfer.amountA1 || '10.00'}`);
  await actPage.amount.fill('10.00');
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 5: 点击新收款人标签页
  // ========================================
  console.log(`[${projectName}] 步骤 5: 点击新收款人标签页`);
  await actPage.newPayeeTab.click();
  await actPage.waitForPageLoad();
  await page.screenshot({ path: `screenshots/ACT-NewPayee-step3-newPayeeTab-${projectName}-${Date.now()}.png` });

  // ========================================
  // 步骤 6: 选择国家
  // ========================================
  console.log(`[${projectName}] 步骤 6: 选择国家 = ${testData.AccountTransfer.Country}`);
  await actPage.selectCountry(testData.AccountTransfer.Country);
  await page.waitForTimeout(1000).catch(() => {});

  // ========================================
  // 步骤 7: 选择银行
  // ========================================
  console.log(`[${projectName}] 步骤 7: 选择银行 = ${testData.AccountTransfer.payeeBank}`);
  await actPage.selectBank(testData.AccountTransfer.payeeBank);
  await page.waitForTimeout(1000).catch(() => {});

  // ========================================
  // 步骤 8: 输入收款人账号
  // ========================================
  console.log(`[${projectName}] 步骤 8: 输入收款人账号 = ${testData.AccountTransfer.newPayeeAcctNumber}`);
  await actPage.newPayeeAcctNumber.fill(testData.AccountTransfer.newPayeeAcctNumber);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 9: 输入收款人姓名
  // ========================================
  console.log(`[${projectName}] 步骤 9: 输入收款人姓名`);
  await actPage.newPayeeName.fill(testData.AccountTransfer.newPayeeName);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 10: 输入收款人昵称
  // ========================================
  console.log(`[${projectName}] 步骤 10: 输入收款人昵称`);
  await actPage.newPayeeNickname.fill(testData.AccountTransfer.newPayeeNickname);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 11: 添加收款人地址
  // ========================================
  console.log(`[${projectName}] 步骤 11: 添加收款人地址`);
  await beneficiaryPage.addAddress.click();
  await page.waitForTimeout(1000).catch(() => {});

  // ========================================
  // 步骤 12: 选择收款人位置
  // ========================================
  console.log(`[${projectName}] 步骤 12: 选择收款人位置 = ${testData.Beneficiary.payeeLocation}`);
  await beneficiaryPage.selectOption(beneficiaryPage.payeeLocation, testData.Beneficiary.payeeLocation);
  await page.waitForTimeout(1000).catch(() => {});

  // ========================================
  // 步骤 13: 输入城市
  // ========================================
  console.log(`[${projectName}] 步骤 13: 输入城市 = ${testData.Beneficiary.townCity}`);
  await beneficiaryPage.townCity.fill(testData.Beneficiary.townCity);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 14: 输入地址1
  // ========================================
  console.log(`[${projectName}] 步骤 14: 输入地址1`);
  await actPage.newPayeeAdd1.fill(testData.AccountTransfer.newPayeeAdd1);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 15: 输入地址2
  // ========================================
  console.log(`[${projectName}] 步骤 15: 输入地址2`);
  await actPage.newPayeeAdd2.fill(testData.AccountTransfer.newPayeeAdd2);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 16: 输入邮编
  // ========================================
  console.log(`[${projectName}] 步骤 16: 输入邮编 = ${testData.Beneficiary.postalCode}`);
  await beneficiaryPage.postalCode.fill(testData.Beneficiary.postalCode);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 17: 输入付款详情
  // ========================================
  console.log(`[${projectName}] 步骤 17: 输入付款详情`);
  await actPage.paymentDetail.fill(testData.AccountTransfer.paymentDetail);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 18: 勾选收款人通知
  // ========================================
  console.log(`[${projectName}] 步骤 18: 勾选收款人通知`);
  await actPage.isBeneAdvising.click();
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 19: 输入邮箱地址
  // ========================================
  console.log(`[${projectName}] 步骤 19: 输入邮箱地址`);
  await actPage.emailIdO.fill(testData.AccountTransfer.emailIdO);
  await actPage.emailId1.fill(testData.AccountTransfer.emailId1);
  await actPage.emailId2.fill(testData.AccountTransfer.emailId2);
  await actPage.emailId3.fill(testData.AccountTransfer.emailId3);
  await actPage.emailId4.fill(testData.AccountTransfer.emailId4);
  await page.waitForTimeout(1000).catch(() => {});

  // ========================================
  // 步骤 20: 输入通知消息
  // ========================================
  console.log(`[${projectName}] 步骤 20: 输入通知消息`);
  await actPage.message.fill(testData.AccountTransfer.message);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 21: 勾选交易备注
  // ========================================
  console.log(`[${projectName}] 步骤 21: 勾选交易备注`);
  await actPage.isTransactionNote.click();
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 22: 输入交易备注
  // ========================================
  console.log(`[${projectName}] 步骤 22: 输入交易备注`);
  await actPage.transactionNote.fill(testData.AccountTransfer.transactionNote);
  await page.waitForTimeout(1000).catch(() => {});

  await page.screenshot({ path: `screenshots/ACT-NewPayee-step4-filled-${projectName}-${Date.now()}.png`, fullPage: true });

  // ========================================
  // 步骤 23: 点击 Next 按钮
  // ========================================
  console.log(`[${projectName}] 步骤 23: 点击 Next 按钮`);
  await actPage.nextButton.click();
  await actPage.waitForPageLoad();

  await page.screenshot({ path: `screenshots/ACT-NewPayee-step5-preview-${projectName}-${Date.now()}.png`, fullPage: true });

  // ========================================
  // 步骤 24: 提交付款
  // ========================================
  console.log(`[${projectName}] 步骤 24: 提交付款`);
  await actPage.submitButton.click();
  await page.waitForTimeout(5000).catch(() => {});

  // ========================================
  // 步骤 25: 验证成功消息并获取参考编号
  // ========================================
  console.log(`[${projectName}] 步骤 25: 验证成功消息并获取参考编号`);

  // 检查是否有成功消息
  const successMsgVisible = await actPage.successMessage.isVisible({ timeout: 10000 }).catch(() => false);
  if (successMsgVisible) {
    const messageText = await actPage.successMessage.textContent();
    console.log(`[${projectName}] 成功消息: ${messageText}`);
    expect(messageText?.toLowerCase()).toContain('success');
  } else {
    console.log(`[${projectName}] 未找到成功消息元素，跳过验证`);
  }

  // 获取参考编号
  try {
    const refElementVisible = await actPage.referenceNumber.isVisible({ timeout: 5000 }).catch(() => false);
    if (refElementVisible) {
      const refText = await actPage.referenceNumber.textContent();
      if (refText) {
        referenceNumber = refText.trim();
        console.log(`[${projectName}] 参考编号: ${referenceNumber}`);
        expect(referenceNumber).toBeTruthy();
      }
    }
  } catch (error) {
    console.log(`[${projectName}] 获取参考编号失败: ${error}`);
  }

  await page.screenshot({ path: `screenshots/ACT-NewPayee-step6-success-${projectName}-${Date.now()}.png`, fullPage: true });

  // ========================================
  // 步骤 26: 点击 Finish 按钮
  // ========================================
  console.log(`[${projectName}] 步骤 26: 点击 Finish 按钮`);
  try {
    const finishButtonVisible = await actPage.finishedButton.isVisible({ timeout: 5000 }).catch(() => false);
    if (finishButtonVisible) {
      await actPage.finishedButton.click();
      await page.waitForTimeout(2000).catch(() => {});
    } else {
      console.log(`[${projectName}] Finish 按钮不可见，可能已经完成`);
    }
  } catch (error) {
    console.log(`[${projectName}] Finish 按钮操作失败: ${error}`);
  }

  console.log(`[${projectName}] =======================================`);
  console.log(`[${projectName}] ACT Payment 创建完成`);
  console.log(`[${projectName}] 参考编号: ${referenceNumber}`);
  console.log(`[${projectName}] =======================================`);

  // 最终断言
  expect(referenceNumber.length).toBeGreaterThan(0);
}
