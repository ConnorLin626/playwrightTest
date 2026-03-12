import { test, expect, Page } from '@playwright/test';
import { NavigatePages } from '../../../pages/Navigate';
import { PaymentsPages } from '../../../pages/IDEALX';
import { TestHelper } from '../../../pages/utils';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 加载测试数据 - 从 data/TW_testData.json 统一配置
 * 支持多用户并行测试，避免冲突
 */
const testDataPath = path.join(process.cwd(), 'data', 'TW_testData.json');
const testDataRaw = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

// 动态生成带时间戳的数据，确保测试数据的唯一性
const testData = {
  ...testDataRaw,
  singlePaymentReskin: {
    ...testDataRaw.singlePaymentReskin,
    newPayeeName: testDataRaw.singlePaymentReskin.payeeName + ' ' + Date.now(),
    newPayeeNickname: testDataRaw.singlePaymentReskin.newPayeeNickname + ' ' + Date.now()
  },
  Beneficiary: {
    ...testDataRaw.Beneficiary
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
 * 测试套件：TW Single Payment - 使用新收款人测试
 * 基于 forAIstudy/src/e2e/IDEALX/Reskin/PayTransfer/TW_SinglePayment.test.ts
 */
test.describe.serial('TW Single Payment - Create with New Payee', () => {
  test.beforeEach(async ({ page }) => {
    const testEnv = (process.env.TEST_ENV || 'SIT').toUpperCase();
    const projectName = test.info().project.name || 'chromium';

    // 使用新收款人创建 Single Payment
    await new NavigatePages(page, test.info()).loginIdealx(
      // 根据环境 + 项目名称选择不同的 corpId
      testEnv === 'SIT' ?
        (projectName === 'chromium' ? testData.singlePaymentReskin.SIT.corpIdChrome1 :
         projectName === 'chromium2' ? testData.singlePaymentReskin.SIT.corpIdChrome2 :
         projectName === 'firefox' ? testData.singlePaymentReskin.SIT.corpIdFirefox :
         testData.singlePaymentReskin.SIT.corpIdChrome1) :
        (projectName === 'chromium' ? testData.singlePaymentReskin.UAT.corpIdChrome1 :
         projectName === 'chromium2' ? testData.singlePaymentReskin.UAT.corpIdChrome2 :
         projectName === 'firefox' ? testData.singlePaymentReskin.UAT.corpIdFirefox :
         testData.singlePaymentReskin.UAT.corpIdChrome1),
      // 根据环境 + 项目名称选择不同的 userId
      testEnv === 'SIT' ?
        (projectName === 'chromium' ? testData.singlePaymentReskin.SIT.userIdChrome1 :
         projectName === 'chromium2' ? testData.singlePaymentReskin.SIT.userIdChrome2 :
         projectName === 'firefox' ? testData.singlePaymentReskin.SIT.userIdFirefox :
         testData.singlePaymentReskin.SIT.userIdChrome1) :
        (projectName === 'chromium' ? testData.singlePaymentReskin.UAT.userIdChrome1 :
         projectName === 'chromium2' ? testData.singlePaymentReskin.UAT.userIdChrome2 :
         projectName === 'firefox' ? testData.singlePaymentReskin.UAT.userIdFirefox :
         testData.singlePaymentReskin.UAT.userIdChrome1),
      testEnv === 'SIT' ? '123123' : testData.singlePaymentReskin.UAT.Password
    );
  });
  test.afterEach(async ({ page }) => {
    // 截图
    await TestHelper.takeScreenshotOnFinish(page, test.info());
  });
  test('Create TT with new payee', async ({ page }) => {
    await createTTWithNewPayee(page);
  });
});
async function createTTWithNewPayee(page: Page) {
  const pages = getPages(page);
  let ttReference = '';

  await pages.singlePaymentPage.PayTransferMenu.click();
  await pages.TransferCentersPage.loadCondition();
  await pages.singlePaymentPage.makePayment.click();
  await pages.singlePaymentPage.loadCondition();

  const testEnv = (process.env.TEST_ENV || 'SIT').toUpperCase();
  await pages.singlePaymentPage.fromAccount.click();
  await pages.singlePaymentPage.fromAcctInput.fill(
    testEnv === 'SIT' ? testData.singlePaymentReskin.SIT.fromAccount01 : testData.singlePaymentReskin.UAT.fromAccount01
  );
  await pages.singlePaymentPage.fromAcctSelected.click();

  await pages.singlePaymentPage.existingPayee.click();
  await pages.singlePaymentPage.addNewPayee.click();
  await pages.singlePaymentPage.continueBtn.click();

  await pages.singlePaymentPage.payeeLocationInput.click();
  await pages.singlePaymentPage.payeeLocationInput.fill(testData.singlePaymentReskin.payeeLocation);
  await pages.singlePaymentPage.payeeLocationSelected.click();

  await pages.singlePaymentPage.enterManully.click();
  await pages.singlePaymentPage.newPayeeBankName.fill(testData.singlePaymentReskin.MaxbankName);
  await pages.singlePaymentPage.newPayeeBankAdd1.fill(testData.singlePaymentReskin.bankAdd1);
  await pages.singlePaymentPage.newPayeeBankAdd2.fill(testData.singlePaymentReskin.bankAdd2);
  await pages.singlePaymentPage.routingCode.fill(testData.singlePaymentReskin.routingCode);
  await pages.singlePaymentPage.accountNumber.fill(testData.singlePaymentReskin.newPayeeAcctNumber);
  await pages.singlePaymentPage.payeeName.fill(testData.singlePaymentReskin.newPayeeName);
  await pages.singlePaymentPage.payeeNickname.fill(testData.singlePaymentReskin.newPayeeNickname);

  await pages.singlePaymentPage.newPayeeReviewBtn.click();
  await pages.singlePaymentPage.savePayee.click();
  await pages.singlePaymentPage.usePayee.click();

  await pages.singlePaymentPage.amount.fill(testData.singlePaymentReskin.sendAmount);
  await page.waitForTimeout(2000).catch(() => {});

  await pages.singlePaymentPage.twttPayment.click();
  await pages.singlePaymentPage.bankChargeUs.click();
  await pages.singlePaymentPage.purposeCode.selectOption(testData.singlePaymentReskin.purposeCode);
  await pages.singlePaymentPage.isDetailsToPayee.click();
  await pages.singlePaymentPage.paymentDetail.fill(testData.singlePaymentReskin.paymentDetails);

  await pages.singlePaymentPage.reviewBtn.click();
  await pages.singlePaymentPage.submitBtn.click();

  await page.waitForTimeout(2000).catch(() => {});
  const refText = await pages.singlePaymentPage.reference.textContent();
  if (refText) {
    ttReference = refText.trim();
  }

  await pages.singlePaymentPage.PayTransferMenu.click();
  await pages.TransferCentersPage.goToViewPaymentPageViaRef(ttReference);
  await pages.singlePaymentPage.loadConditionForViewPage();

  await Promise.all([
    expect(pages.singlePaymentPage.statusValue).toContainText(testData.status.PendingVerification),
    expect(pages.singlePaymentPage.viewAmountValue).toContainText(testData.singlePaymentReskin.verifyAmountValue),
    expect(pages.singlePaymentPage.fromAccountValue).toContainText(
      testEnv === 'SIT' ? testData.singlePaymentReskin.SIT.fromAccount01 : testData.singlePaymentReskin.UAT.fromAccount01
    ),
    expect(pages.singlePaymentPage.beneValue).toContainText(testData.singlePaymentReskin.newPayeeName),
    expect(pages.singlePaymentPage.payeeAccountValue).toContainText(testData.singlePaymentReskin.newPayeeAcctNumber),
    expect(pages.singlePaymentPage.payeeLocationValue).toContainText(testData.singlePaymentReskin.payeeLocation),
    expect(pages.singlePaymentPage.routingCodeValue).toContainText(testData.singlePaymentReskin.routingCode),
    expect(pages.singlePaymentPage.chargeValue).toContainText(testData.singlePaymentReskin.charge),
    expect(pages.singlePaymentPage.purposeCodeValue).toContainText(testData.singlePaymentReskin.purposeCode),
    expect(pages.singlePaymentPage.bankNameView).toContainText(testData.singlePaymentReskin.MaxbankName),
    expect(pages.singlePaymentPage.bankAddress1).toContainText(testData.singlePaymentReskin.bankAdd1),
    expect(pages.singlePaymentPage.bankAddress2).toContainText(testData.singlePaymentReskin.bankAdd2)
  ]);
}
