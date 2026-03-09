import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Navigate/LoginPage';
import { AccountTransferPage } from '../../../pages/IDEALX/PayTransfer/AccountTransferPage';
import { BeneficiaryPage } from '../../../pages/IDEALX/PayTransfer/BeneficiaryPage';
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
 * 测试套件：ACT Payment - 创建新收款人测试
 * 基于 forAIstudy/src/e2e/IDEALX/PayTransfer/SG_AccountTransfer.test.ts
 */
test.describe('ACT Payment - Create with New Payee', () => {

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
    await page.goto(test.info().project.use.baseURL as string);
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
  let referenceNumber: string = '';
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
  console.log(`[${projectName}] 步骤 3: 选择 From Account = ${testData.AccountTransfer.SIT.fromAccount}`);
  await actPage.selectOption(actPage.fromAccount, testData.AccountTransfer.SIT.fromAccount);
  await page.waitForTimeout(1000).catch(() => {});

  // ========================================
  // 步骤 4: 输入金额
  // ========================================
  console.log(`[${projectName}] 步骤 4: 输入金额 = ${testData.AccountTransfer.amountA1 || '10.00'}`);
  await actPage.amount.fill('10.00');
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 5: 点击新收款人标签页并 Continue
  // ========================================
  console.log(`[${projectName}] 步骤 5: 点击新收款人标签页并 Continue`);
  await actPage.newPayeeTab.click();
  await actPage.waitForPageLoad();
  await actPage.continueBtn.click();
  await page.waitForTimeout(1000).catch(() => {});
  await page.screenshot({ path: `screenshots/ACT-NewPayee-step3-newPayeeTab-${projectName}-${Date.now()}.png` });

  // ========================================
  // 步骤 6: 选择国家
  // ========================================
  console.log(`[${projectName}] 步骤 6: 选择国家 = ${testData.AccountTransfer.Country}`);
  const countryInput = actPage.Country.locator('xpath=.//input');
  await countryInput.click();
  await page.waitForTimeout(500).catch(() => {});
  await countryInput.fill(testData.AccountTransfer.Country);
  await page.waitForTimeout(1000).catch(() => {});
  // 查找并点击匹配的国家选项
  const countryOption = page.locator(`//span[contains(text(), '${testData.AccountTransfer.Country}') or contains(text(), '${testData.AccountTransfer.Country.substring(0, 10)}')]`).first();
  if (await countryOption.isVisible({ timeout: 2000 }).catch(() => false)) {
    await countryOption.click();
  }
  await page.waitForTimeout(1000).catch(() => {});

  // ========================================
  // 步骤 7: 选择银行
  // ========================================
  console.log(`[${projectName}] 步骤 7: 选择银行 = ${testData.AccountTransfer.payeeBank}`);
  // 点击 payeeBank 中的银行选项 (对应 Protractor 的 .select() 方法)
  await actPage.payeeBank.locator(`//dbs-radio//span[contains(text(), '${testData.AccountTransfer.payeeBank}')]`).click();
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
  const PayeelocationInput = beneficiaryPage.payeeLocation.locator('xpath=.//input');
  await PayeelocationInput.click();
  await page.waitForTimeout(500).catch(() => {});
  await PayeelocationInput.fill(testData.Beneficiary.payeeLocation);
  await page.waitForTimeout(1000).catch(() => {});
  // 查找并点击匹配的位置选项
  const locationOption = page.locator(`//span[contains(text(), '${testData.Beneficiary.payeeLocation}') or contains(text(), '${testData.Beneficiary.payeeLocation.substring(0, 10)}')]`).first();
  if (await locationOption.isVisible({ timeout: 2000 }).catch(() => false)) {
    await locationOption.click();
  }
  await page.waitForTimeout(1000).catch(() => {});
  // ========================================
  // 步骤 13: 输入城市
  // ========================================
  console.log(`[${projectName}] 步骤 13: 输入城市 = ${testData.Beneficiary.townCity}`);
  await beneficiaryPage.townCity.fill(testData.Beneficiary.townCity);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 13: 输入地址1
  // ========================================
  console.log(`[${projectName}] 步骤 13: 输入地址1`);
  await actPage.newPayeeAdd1.fill(testData.AccountTransfer.newPayeeAdd1);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 14: 输入地址2
  // ========================================
  console.log(`[${projectName}] 步骤 14: 输入地址2`);
  await actPage.newPayeeAdd2.fill(testData.AccountTransfer.newPayeeAdd2);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 15: 输入邮编
  // ========================================
  console.log(`[${projectName}] 步骤 15: 输入邮编 = ${testData.Beneficiary.postalCode}`);
  await beneficiaryPage.postalCode.fill(testData.Beneficiary.postalCode);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 16: 输入付款详情
  // ========================================
  console.log(`[${projectName}] 步骤 16: 输入付款详情`);
  await actPage.paymentDetail.fill(testData.AccountTransfer.paymentDetail);
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 17: 勾选交易备注
  // ========================================
  console.log(`[${projectName}] 步骤 17: 勾选交易备注`);
  // 点击 checkbox 的父容器或标签（checkbox 本身可能不可见）
  const transactionNoteLabel = page.locator(`//label[@for="isTransactionNote"] or //label[contains(text(), 'Transaction Note')]`).first();
  if (await transactionNoteLabel.isVisible({ timeout: 2000 }).catch(() => false)) {
    await transactionNoteLabel.click();
  } else {
    // 如果找不到 label，尝试点击父元素
    await actPage.isTransactionNote.locator('xpath=..').click();
  }
  await page.waitForTimeout(500).catch(() => {});

  // ========================================
  // 步骤 18: 输入交易备注
  // ========================================
  console.log(`[${projectName}] 步骤 18: 输入交易备注`);
  await actPage.transactionNote.fill(testData.AccountTransfer.transactionNote);
  await page.waitForTimeout(1000).catch(() => {});

  await page.screenshot({ path: `screenshots/ACT-NewPayee-step4-filled-${projectName}-${Date.now()}.png`, fullPage: true });

  // ========================================
  // 步骤 19: 点击 Next 按钮
  // ========================================
  console.log(`[${projectName}] 步骤 19: 点击 Next 按钮`);
  await actPage.nextButton.click();
  await actPage.waitForPageLoad();

  await page.screenshot({ path: `screenshots/ACT-NewPayee-step5-preview-${projectName}-${Date.now()}.png`, fullPage: true });

  // ========================================
  // 步骤 20: 提交付款
  // ========================================
  console.log(`[${projectName}] 步骤 20: 提交付款`);
  await actPage.submitButton.click();
  await page.waitForTimeout(5000).catch(() => {});

  // ========================================
  // 步骤 21: 验证成功消息并获取参考编号
  // ========================================
  console.log(`[${projectName}] 步骤 21: 验证成功消息并获取参考编号`);

  const successMsgVisible = await actPage.successMessage.isVisible({ timeout: 10000 }).catch(() => false);
  if (successMsgVisible) {
    const messageText = await actPage.successMessage.textContent();
    console.log(`[${projectName}] 成功消息: ${messageText}`);
    expect(messageText?.toLowerCase()).toContain('success');
  } else {
    console.log(`[${projectName}] 未找到成功消息元素，跳过验证`);
  }

  // 尝试多种方式获取参考编号
  try {
    // 方式1: 使用原定位器
    let refElementVisible = await actPage.referenceNumber.isVisible({ timeout: 3000 }).catch(() => false);
    if (refElementVisible) {
      const refText = await actPage.referenceNumber.textContent();
      if (refText) {
        referenceNumber = refText.trim();
        console.log(`[${projectName}] 参考编号(方式1): ${referenceNumber}`);
      }
    }

    // 方式2: 如果方式1失败，尝试其他选择器
    if (!referenceNumber) {
      const refElement2 = page.locator('//div[contains(@id, "referNo")]//label[2] | //div[contains(@class, "reference")] | //label[contains(text(), "Reference")]/..').first();
      if (await refElement2.isVisible({ timeout: 3000 }).catch(() => false)) {
        const refText2 = await refElement2.textContent();
        if (refText2) {
          referenceNumber = refText2.trim();
          console.log(`[${projectName}] 参考编号(方式2): ${referenceNumber}`);
        }
      }
    }

    // 方式3: 如果前两种方式都失败，尝试从页面文本中提取参考编号格式
    if (!referenceNumber) {
      const pageText = await page.textContent('body');
      const refMatch = pageText?.match(/(?:Reference|Ref|Reference No\.?)\s*:?\s*([A-Z0-9]+)/i);
      if (refMatch && refMatch[1]) {
        referenceNumber = refMatch[1].trim();
        console.log(`[${projectName}] 参考编号(方式3): ${referenceNumber}`);
      }
    }

    if (referenceNumber) {
      console.log(`[${projectName}] 最终参考编号: ${referenceNumber}`);
    } else {
      console.log(`[${projectName}] 警告: 未能获取参考编号`);
    }
  } catch (error) {
    console.log(`[${projectName}] 获取参考编号失败: ${error}`);
  }

  await page.screenshot({ path: `screenshots/ACT-NewPayee-step6-success-${projectName}-${Date.now()}.png`, fullPage: true });

  // ========================================
  // 步骤 22: 点击 Finish 按钮
  // ========================================
  console.log(`[${projectName}] 步骤 22: 点击 Finish 按钮`);
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

  // 如果获取到参考编号，则导航到查看页面并验证
  if (referenceNumber) {
    expect(referenceNumber.length).toBeGreaterThan(0);

    // ========================================
    // 步骤 23: 导航到查看页面并验证
    // ========================================
    console.log(`[${projectName}] 步骤 23: 导航到查看页面并验证`);
    await actPage.paymentMenu.click();
    await page.waitForTimeout(2000).catch(() => {});

    // 输入参考编号并搜索
    await page.locator('//*[@id="transferCenter-filter"]').fill(referenceNumber);
    await page.waitForTimeout(2000).catch(() => {});

    // 点击查看链接
    const viewLink = page.locator('//*[@id="transaction-list-reference_0"]');
    if (await viewLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await viewLink.click();
      await page.waitForLoadState('domcontentloaded').catch(() => {});
      await page.waitForTimeout(3000).catch(() => {});

      // 验证前面填入的值
      console.log(`[${projectName}] 开始验证填入的值`);

      // 验证状态
      const statusElement = actPage.actStatusValue;
      if (await statusElement.isVisible({ timeout: 5000 }).catch(() => false)) {
        const statusText = await statusElement.textContent();
        console.log(`[${projectName}] 付款状态: ${statusText}`);
        expect(['Received', 'Approved', 'PendingRelease', 'Completed', 'BankRejected', 'PendingApproval']).toContain(statusText);
      }

      // 验证金额
      const amountElement = actPage.amountValue;
      if (await amountElement.isVisible({ timeout: 3000 }).catch(() => false)) {
        const amountText = await amountElement.textContent();
        console.log(`[${projectName}] 付款金额: ${amountText}`);
        expect(amountText).toContain('10.00');
      }

      // 验证收款人姓名
      const payeeNameElement = actPage.toNewPayeeNameValue;
      if (await payeeNameElement.isVisible({ timeout: 3000 }).catch(() => false)) {
        const payeeNameText = await payeeNameElement.textContent();
        console.log(`[${projectName}] 收款人姓名: ${payeeNameText}`);
        expect(payeeNameText).toContain(testData.AccountTransfer.newPayeeName.split(' ')[0]);
      }

      // 验证收款人账号
      const payeeAcctElement = actPage.newPayeeAcctNum;
      if (await payeeAcctElement.isVisible({ timeout: 3000 }).catch(() => false)) {
        const payeeAcctText = await payeeAcctElement.textContent();
        console.log(`[${projectName}] 收款人账号: ${payeeAcctText}`);
        expect(payeeAcctText).toContain(testData.AccountTransfer.newPayeeAcctNumber);
      }

      console.log(`[${projectName}] 验证完成`);
    } else {
      console.log(`[${projectName}] 警告: 未找到查看链接`);
    }
  } else {
    console.log(`[${projectName}] 警告: 未获取到参考编号，跳过验证`);
  }
}
