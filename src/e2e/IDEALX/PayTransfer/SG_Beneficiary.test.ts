import { test, expect, Page } from '@playwright/test';
import { NavigatePages } from '../../../pages/Navigate';
import { PaymentsPages } from '../../../pages/IDEALX';
import { TestHelper } from '../../../pages/utils';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 加载测试数据 - 从 data/SG_testData_01.json 统一配置
 * 支持多用户并行测试，避免冲突
 */
const testDataPath = path.join(process.cwd(), 'data', 'SG_testData_01.json');
const testDataRaw = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

// 动态生成带时间戳的数据，确保测试数据的唯一性
const testData = {
  ...testDataRaw,
  Beneficiary: {
    ...testDataRaw.Beneficiary,
    newPayeeName: testDataRaw.Beneficiary.newPayeeName + ' ' + Date.now(),
    newPayeeNickname: testDataRaw.Beneficiary.newPayeeNickname + ' ' + Date.now()
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
 * 测试套件：Beneficiary
 * 基于 forAIstudy/src/e2e/IDEALX/PayTransfer/SG_Beneficiary.test.ts
 */
test.describe.serial('Beneficiary', () => {
  test.beforeEach(async ({ page }) => {
    const projectName = test.info().project.name;
    const envData = testData.Beneficiary.SIT;
    await new NavigatePages(page, test.info()).loginIdealx(envData.loginCompanyId, envData.loginUserId, "123123", testData);
  });

  test.afterEach(async ({ page }) => {
    await TestHelper.takeScreenshotOnFinish(page, test.info());
  });

  test('Create Domestic Beneficiary', async ({ page }) => {
    await createDomesticBeneficiary(page);
  });

  // test('Edit Beneficiary', async ({ page }) => {
  //   await editBeneficiary(page);
  // });

  // test('Create a new Paynow Payee', async ({ page }) => {
  //   await createPayNowPayee(page);
  // });

  // test('Delete Paynow Payee', async ({ page }) => {
  //   await deletePayNowPayee(page);
  // });

  // test('Create International Beneficiary', async ({ page }) => {
  //   await createInternationalBeneficiary(page);
  // });

  // test('Edit International Beneficiary', async ({ page }) => {
  //   await editInternationalBeneficiary(page);
  // });

  // test('Create DD Beneficiary', async ({ page }) => {
  //   await createDDBeneficiary(page);
  // });

  // test('Create cheque Beneficiary', async ({ page }) => {
  //   await createChequeBeneficiary(page);
  // });

  // test('Create EDP Beneficiary', async ({ page }) => {
  //   await createEDPBeneficiary(page);
  // });

  // test('Create a new Paynow EDPPayee', async ({ page }) => {
  //   await createPayNowEDPPayee(page);
  // });

  // test('Download Beneficiary', async ({ page }) => {
  //   await downloadBeneficiary(page);
  // });
});

// 存储动态生成的收款人名称，用于后续测试引用
let domesticPayeeName = '';
let payNowPayeeNickName = '';
let payNowName = '';
let payeeBankName = '';
let internationalPayeeNickName = '';

/**
 * 创建国内收款人的测试逻辑
 * 对应 Protractor 版本的第21行测试用例
 */
async function createDomesticBeneficiary(page: Page) {
  const pages = getPages(page);
  domesticPayeeName = 'DomesticPayee' + Date.now();

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.createNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
  await pages.BeneficiaryPage.newPayeeName.fill(domesticPayeeName);
  await pages.BeneficiaryPage.newPayeeNickName.fill(domesticPayeeName);
  await pages.BeneficiaryPage.newPayeeNumber.fill(testData.Beneficiary.newPayeeAcctNumber);
  await page.waitForTimeout(500).catch(() => {});
  await pages.BeneficiaryPage.retriveNameBtn.click().catch(() => {});
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await pages.BeneficiaryPage.printedName.fill(testData.Beneficiary.newPayeePrintedName);
  await expect(pages.BeneficiaryPage.newPayeeNumber).toContainText(testData.Beneficiary.newPayeeAcctNumber);
  await pages.BeneficiaryPage.next.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(domesticPayeeName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayeeName).toContainText(domesticPayeeName);
  await expect(pages.BeneficiaryPage.paymentOptions).toContainText(testData.Beneficiary.sgAccountTransfer);
}

/**
 * 编辑收款人的测试逻辑
 * 对应 Protractor 版本的第55行测试用例
 */
async function editBeneficiary(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(domesticPayeeName);
  await page.waitForTimeout(2000).catch(() => {});
  await expect(pages.BeneficiaryPage.centerPayeeName).toContainText(domesticPayeeName);
  await pages.BeneficiaryPage.editNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});

  await pages.BeneficiaryPage.newPayeeName.fill('');
  let editPayeeName = 'Payee' + Date.now();
  await pages.BeneficiaryPage.newPayeeName.fill(editPayeeName);
  await pages.BeneficiaryPage.addAddress.click();
  await pages.BeneficiaryPage.newPayeeAdd1.fill(testData.Beneficiary.editNewPayeeAdd1);
  await pages.BeneficiaryPage.next.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(editPayeeName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayeeName).toContainText(editPayeeName);
  await expect(pages.BeneficiaryPage.centerAddress1).toContainText(testData.Beneficiary.editNewPayeeAdd1);

  await deletePayee(page, editPayeeName);
}

/**
 * 创建PayNow收款人的测试逻辑
 * 对应 Protractor 版本的第92行测试用例
 */
async function createPayNowPayee(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.createNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
  await pages.BeneficiaryPage.payNowProxy.click();
  await pages.BeneficiaryPage.proxyTypeMobNum.fill(testData.Beneficiary.proxyTypeMobNum);
  await pages.BeneficiaryPage.retrievePayNowName.click();
  payNowPayeeNickName = 'PayNowName' + Date.now();
  await pages.BeneficiaryPage.newPayNowNickName.fill(payNowPayeeNickName);
  payNowName = await pages.BeneficiaryPage.retrievePayNowSpan.textContent() || '';
  await pages.BeneficiaryPage.submit.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill(payNowPayeeNickName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayNowPayeeName).toContainText(payNowName);
  await expect(pages.BeneficiaryPage.centerMobileProxy).toContainText(testData.Beneficiary.proxyTypeMobNum);
}

/**
 * 删除PayNow收款人的测试逻辑
 * 对应 Protractor 版本的第119行测试用例
 */
async function deletePayNowPayee(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(payNowPayeeNickName);
  await page.waitForTimeout(2000).catch(() => {});
  await expect(pages.BeneficiaryPage.centerPayNowPayeeName).toContainText(payNowName);
  await pages.BeneficiaryPage.deleteNewPayee.click();
  await pages.BeneficiaryPage.confirmDelete.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});

  await expect(pages.BeneficiaryPage.beneficiaryResult).toContainText('No data to display');
}

/**
 * 创建国际收款人的测试逻辑
 * 对应 Protractor 版本的第136行测试用例
 */
async function createInternationalBeneficiary(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.createNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.bankCategory, 'Other Bank');
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.OtherBankType, 'Foreign currency / overseas payment');
  await pages.BeneficiaryPage.enterManually.click();
  payeeBankName = 'payeeBank' + Date.now();
  await pages.BeneficiaryPage.payeeBankName.fill(payeeBankName);
  await pages.BeneficiaryPage.payeeBankAdd1.fill(testData.Beneficiary.newPayeeAdd1);
  await pages.BeneficiaryPage.newPayeeNumber.fill(testData.Beneficiary.newPayeeAcctNumber);
  await expect(pages.BeneficiaryPage.newPayeeNumber).toContainText(testData.Beneficiary.newPayeeAcctNumber);
  await pages.BeneficiaryPage.newPayeeName.fill(testData.Beneficiary.newPayeeName);
  internationalPayeeNickName = 'interNickName' + Date.now();
  await pages.BeneficiaryPage.newPayeeNickName.fill(internationalPayeeNickName);
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.payeeLocation, testData.Beneficiary.payeeLocation);
  await pages.BeneficiaryPage.townCity.fill(testData.Beneficiary.townCity);
  await pages.BeneficiaryPage.newPayeeAdd1.fill(testData.Beneficiary.newPayeeAdd1);
  await pages.BeneficiaryPage.newPayeeAdd2.fill(testData.Beneficiary.newPayeeAdd2);
  await pages.BeneficiaryPage.postalCode.fill(testData.Beneficiary.postalCode);
  await pages.BeneficiaryPage.printedName.fill(testData.Beneficiary.newPayeePrintedName);
  await pages.BeneficiaryPage.next.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(internationalPayeeNickName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayeeName).toContainText(testData.Beneficiary.newPayeeName);
  await expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.payeeLocation);
  await expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.townCity);
  await expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.newPayeeAdd1);
  await expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.newPayeeAdd2);
  await expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.postalCode);
}

/**
 * 编辑国际收款人的测试逻辑
 * 对应 Protractor 版本的第180行测试用例
 */
async function editInternationalBeneficiary(page: Page) {
  const pages = getPages(page);

  await pages.BeneficiaryPage.editNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.newPayeeName.fill('');
  let editPayeeName = 'International' + Date.now();
  await pages.BeneficiaryPage.newPayeeName.fill(editPayeeName);
  await pages.BeneficiaryPage.switchFormatButton.click();
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.payeeLocation, testData.Beneficiary.editPayeeLocation);
  await pages.BeneficiaryPage.townCity.fill(testData.Beneficiary.editTownCity);
  await pages.BeneficiaryPage.streetName.fill(testData.Beneficiary.streetName);
  await page.waitForTimeout(5000).catch(() => {});
  await pages.BeneficiaryPage.postalCode.fill('');
  await page.waitForTimeout(5000).catch(() => {});
  await pages.BeneficiaryPage.next.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(editPayeeName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayeeName).toContainText(editPayeeName);
  await expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.streetName);
  await expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.editPayeeLocation);
  await expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.editTownCity);

  await deletePayee(page, editPayeeName);
}

/**
 * 创建汇票收款人的测试逻辑
 * 对应 Protractor 版本的第214行测试用例
 */
async function createDDBeneficiary(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.createNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
  await pages.BeneficiaryPage.chequeOrDemand.click();
  await pages.BeneficiaryPage.ddPaymentOption.click();
  let ddPayeeName = 'DemandDraftPayee' + Date.now();
  await pages.BeneficiaryPage.newPayeeName.fill(ddPayeeName);
  await pages.BeneficiaryPage.newPayeeNickName.fill(ddPayeeName);
  await pages.BeneficiaryPage.newPayeeAdd1.fill(testData.Beneficiary.newPayeeAdd1);
  await pages.BeneficiaryPage.newPayeeAdd2.fill(testData.Beneficiary.newPayeeAdd2);
  await pages.BeneficiaryPage.newPayeeAdd3.fill(testData.Beneficiary.newPayeeAdd3);
  await pages.BeneficiaryPage.printedName.fill(testData.Beneficiary.chequeDDPrintedName);
  await pages.BeneficiaryPage.next.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(ddPayeeName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayeeName).toContainText(ddPayeeName);
  await expect(pages.BeneficiaryPage.paymentOptions).toContainText(testData.Beneficiary.DDpaymentValue);
  await deletePayee(page, ddPayeeName);
}

/**
 * 创建支票收款人的测试逻辑
 * 对应 Protractor 版本的第245行测试用例
 */
async function createChequeBeneficiary(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.createNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
  await pages.BeneficiaryPage.chequeOrDemand.click();
  await pages.BeneficiaryPage.chequePaymentOption.click();
  let chequePayeeName = 'chequePayee' + Date.now();
  await pages.BeneficiaryPage.newPayeeName.fill(chequePayeeName);
  await pages.BeneficiaryPage.newPayeeNickName.fill(chequePayeeName);
  await pages.BeneficiaryPage.newPayeeAdd2.fill(testData.Beneficiary.newPayeeAdd2);
  await pages.BeneficiaryPage.printedName.fill(testData.Beneficiary.chequeDDPrintedName);
  await pages.BeneficiaryPage.next.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(chequePayeeName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayeeName).toContainText(chequePayeeName);
  await expect(pages.BeneficiaryPage.paymentOptions).toContainText(testData.Beneficiary.chequPaymentValue);
  await deletePayee(page, chequePayeeName);
}

/**
 * 创建EDP收款人的测试逻辑
 * 对应 Protractor 版本的第277行测试用例
 */
async function createEDPBeneficiary(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.createNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
  let EDPPayeeName = 'EDPPayee' + Date.now();
  await pages.BeneficiaryPage.newPayeeName.fill(EDPPayeeName);
  await pages.BeneficiaryPage.newPayeeNickName.fill(EDPPayeeName);
  await pages.BeneficiaryPage.addAddress.click();
  await pages.BeneficiaryPage.newPayeeAdd1.fill(testData.Beneficiary.newPayeeAdd1);
  await pages.BeneficiaryPage.newPayeeAdd2.fill(testData.Beneficiary.newPayeeAdd2);
  await pages.BeneficiaryPage.newPayeeNumber.fill(testData.Beneficiary.newPayeeAcctNumber);
  await pages.BeneficiaryPage.retriveNameBtn.click().catch(() => {});
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await pages.BeneficiaryPage.printedName.fill(testData.Beneficiary.newPayeePrintedName);
  await expect(pages.BeneficiaryPage.newPayeeNumber).toContainText(testData.Beneficiary.newPayeeAcctNumber);
  await pages.BeneficiaryPage.next.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(EDPPayeeName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayeeName).toContainText(EDPPayeeName);
  await expect(pages.BeneficiaryPage.paymentOptions).toContainText(testData.Beneficiary.sgEDP);
  await deletePayee(page, EDPPayeeName);
}

/**
 * 创建PayNow EDP收款人的测试逻辑
 * 对应 Protractor 版本的第314行测试用例
 */
async function createPayNowEDPPayee(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.createNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
  await pages.BeneficiaryPage.payNowProxy.click();
  await pages.BeneficiaryPage.proxyTypeMobNum.fill(testData.Beneficiary.proxyTypeMobNum);
  await pages.BeneficiaryPage.retrievePayNowName.click();
  let payNowPayeeEDPNickName = 'EDPPayNowName' + Date.now();
  await pages.BeneficiaryPage.newPayNowNickName.fill(payNowPayeeEDPNickName);
  payNowName = await pages.BeneficiaryPage.retrievePayNowSpan.textContent() || '';
  await pages.BeneficiaryPage.submit.click();
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill(payNowPayeeEDPNickName);
  await page.waitForTimeout(2000).catch(() => {});

  await expect(pages.BeneficiaryPage.centerPayNowPayeeName).toContainText(payNowName);
  await expect(pages.BeneficiaryPage.centerMobileProxy).toContainText(testData.Beneficiary.proxyTypeMobNum);
  await expect(pages.BeneficiaryPage.paymentOptions).toContainText(testData.Beneficiary.sgEDP);
  await deletePayee(page, payNowPayeeEDPNickName);
}

/**
 * 下载收款人列表的测试逻辑
 * 对应 Protractor 版本的第345行测试用例
 */
async function downloadBeneficiary(page: Page) {
  const pages = getPages(page);

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.downloadPayeeTab.click();
  await pages.BeneficiaryPage.approveStatusLabel.click();
  await pages.BeneficiaryPage.search.fill('Approved');
  await expect(pages.BeneficiaryPage.search).toContainText('Approved');
  await pages.BeneficiaryPage.approveStatusSelectAll.click();
  await pages.BeneficiaryPage.approveStatus.click();
  await pages.BeneficiaryPage.submit.click();
}

/**
 * 删除收款人辅助函数
 * 对应 Protractor 版本的 deletePayee 函数
 */
async function deletePayee(page: Page, payeeName: string) {
  const pages = getPages(page);
  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.payeeFilter.fill('');
  await pages.BeneficiaryPage.payeeFilter.fill(payeeName);
  await pages.BeneficiaryPage.deletePayeeBtn.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.confirmDelete.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.dismiss.click().catch(() => {});
}
