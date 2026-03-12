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
 * 测试套件：HK Beneficiary - 收款人管理测试
 * 基于 forAIstudy/src/e2e/IDEALX/PayTransfer/HK_Beneficiary.test.ts
 */
test.describe.serial('HK Beneficiary', () => {
  test.beforeEach(async ({ page }) => {
    const projectName = test.info().project.name;
    const envData = projectName.includes('UAT') ? testData.Beneficiary.UAT : testData.Beneficiary.SIT;
    await new NavigatePages(page, test.info()).loginIdealx(envData.loginCompanyId, envData.loginUserId, envData.pinId, testData);
  });

  test.afterEach(async ({ page }) => {
    await TestHelper.takeScreenshotOnFinish(page, test.info());
  });

  test('Create Domestic Beneficiary with details format', async ({ page }) => {
    await createDomesticBeneficiaryWithDetailsFormat(page);
  });

  // test('Edit Domestic Beneficiary with simple format', async ({ page }) => {
  //   await editDomesticBeneficiaryWithSimpleFormat(page);
  // });

  // test('Create TT Beneficiary with manually input max bank name length', async ({ page }) => {
  //   await createTTBeneficiaryWithMaxBankName(page);
  // });

  // test('Create Beneficiary with duplicate payee nickName', async ({ page }) => {
  //   await createBeneficiaryWithDuplicateNickname(page);
  // });
});

/**
 * 创建国内收款人（详细格式）
 * 对应 Protractor 版本的第19行测试用例
 */
async function createDomesticBeneficiaryWithDetailsFormat(page: Page) {
  const pages = getPages(page);
  const domesticPayeeName = 'DomesticPayee' + Date.now();

  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  await pages.BeneficiaryPage.createNewPayee.click();
  await pages.BeneficiaryPage.continueBtn.click();
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
  await page.waitForTimeout(2000).catch(() => {});
  await pages.BeneficiaryPage.bankCategory.click({force:true});
  await pages.BeneficiaryPage.newPayeeBankId.pressSequentially(testData.Beneficiary.newPayeeBankId); 
  await pages.BeneficiaryPage.bankSelect.click();
  await pages.BeneficiaryPage.newPayeeNumber.fill(testData.Beneficiary.newPayeeAcctNumber);
  await page.waitForTimeout(500).catch(() => {});
  await pages.BeneficiaryPage.newPayeeName.fill(domesticPayeeName);
  await pages.BeneficiaryPage.newPayeeNickName.fill(domesticPayeeName);
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

  // await expect(pages.BeneficiaryPage.newPayeeNumber).toContainText(testData.Beneficiary.newPayeeAcctNumber);
  await pages.BeneficiaryPage.next.click();
  await pages.BeneficiaryPage.dismiss.click();
  // await pages.BeneficiaryPage.payeeFilter.clean();
  await pages.BeneficiaryPage.payeeFilter.fill(domesticPayeeName);

  await Promise.all([
    expect(pages.BeneficiaryPage.centerPayeeName).toHaveText(domesticPayeeName),
    expect(pages.BeneficiaryPage.paymentOptions).toContainText("HK-CHATS Payment"),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.payeeLocation),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.townCity),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.streetName),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.buildingNum),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.buildingName),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.floor),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.room),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.department),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.subDepartment),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.postalCode),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.countrySubDivsion),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.townLocationName),
    expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.districtName),
  ]);
}

/**
 * 编辑国内收款人（简单格式）
 * 对应 Protractor 版本的第78行测试用例
 */
// async function editDomesticBeneficiaryWithSimpleFormat(page: Page) {
//   const pages = getPages(page);
//   const domesticPayeeName = 'DomesticPayee' + Date.now();
//   const editPayeeName = 'EditDomestic' + Date.now();

//   // 首先创建一个收款人
//   await createDomesticBeneficiaryWithDetailsFormat(page);

//   // 然后编辑该收款人
//   await pages.BeneficiaryPage.editNewPayee.jsClick();
//   await pages.BeneficiaryPage.continueBtn.jsClickIfExist();
//   await pages.BeneficiaryPage.newPayeeName.clean();
//   await pages.BeneficiaryPage.newPayeeName.fill(editPayeeName);
//   await pages.BeneficiaryPage.newPayeeNickName.fill(editPayeeName);
//   await pages.BeneficiaryPage.switchFormatButton.click();
//   await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.payeeLocation, testData.Beneficiary.editPayeeLocation);
//   await pages.BeneficiaryPage.townCity.fill(testData.Beneficiary.editTownCity);
//   await pages.BeneficiaryPage.postalCode.clean();
//   await pages.BeneficiaryPage.next.click();
//   await pages.BeneficiaryPage.dismiss.click();
//   await pages.BeneficiaryPage.payeeFilter.clean();
//   await pages.BeneficiaryPage.payeeFilter.fill(editPayeeName);

//   await Promise.all([
//     expect(pages.BeneficiaryPage.centerPayeeName).toHaveText(editPayeeName),
//     expect(pages.BeneficiaryPage.paymentOptions).toContainText("HK-CHATS Payment"),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.editPayeeLocation),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.editTownCity),
//   ]);

//   // 删除收款人
//   await deletePayee(page, editPayeeName);
// }

// /**
//  * 创建电汇收款人（手动输入最大银行名称长度）
//  * 对应 Protractor 版本的第108行测试用例
//  */
// async function createTTBeneficiaryWithMaxBankName(page: Page) {
//   const pages = getPages(page);
//   const TTPayeeName = 'TTPayee' + Date.now();

//   await pages.AccountTransferPage.paymentMenu.click();
//   await pages.BeneficiaryPage.payeeMenu.click();
//   await pages.BeneficiaryPage.createNewPayee.jsClick();
//   await pages.BeneficiaryPage.continueBtn.jsClickIfExist();
//   await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.sgCountry);
//   await pages.BeneficiaryPage.enterManually.click();
//   await pages.BeneficiaryPage.payeeBankName.fill(testData.Beneficiary.newPayeeBankName);
//   await pages.BeneficiaryPage.payeeBankAdd1.fill(testData.Beneficiary.newPayeBankAdd1);
//   await pages.BeneficiaryPage.payeeBankAdd2.fill(testData.Beneficiary.newPayeBankAdd2);
//   await pages.BeneficiaryPage.newPayeeNumber.fill(testData.Beneficiary.newTTPayeeAcctNumber);
//   await page.waitForTimeout(500).catch(() => {});
//   await pages.BeneficiaryPage.newPayeeName.fill(TTPayeeName);
//   await pages.BeneficiaryPage.newPayeeNickName.fill(TTPayeeName);
//   await pages.BeneficiaryPage.switchFormatButton.click();
//   await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.payeeLocation, testData.Beneficiary.payeeLocation);
//   await pages.BeneficiaryPage.townCity.fill(testData.Beneficiary.townCity);
//   await pages.BeneficiaryPage.streetName.fill(testData.Beneficiary.streetName);
//   await pages.BeneficiaryPage.buildingNum.fill(testData.Beneficiary.buildingNum);
//   await pages.BeneficiaryPage.buildingName.fill(testData.Beneficiary.buildingName);
//   await pages.BeneficiaryPage.floor.fill(testData.Beneficiary.floor);
//   await pages.BeneficiaryPage.room.fill(testData.Beneficiary.room);
//   await pages.BeneficiaryPage.department.fill(testData.Beneficiary.department);
//   await pages.BeneficiaryPage.subDepartment.fill(testData.Beneficiary.subDepartment);
//   await pages.BeneficiaryPage.postalCode.fill(testData.Beneficiary.postalCode);
//   await pages.BeneficiaryPage.countrySubDivsion.fill(testData.Beneficiary.countrySubDivsion);
//   await pages.BeneficiaryPage.townLocationName.fill(testData.Beneficiary.townLocationName);
//   await pages.BeneficiaryPage.districtName.fill(testData.Beneficiary.districtName);

//   await expect(pages.BeneficiaryPage.newPayeeNumber).toContainText(testData.Beneficiary.newTTPayeeAcctNumber);
//   await pages.BeneficiaryPage.next.click();
//   await pages.BeneficiaryPage.dismiss.click();
//   await pages.BeneficiaryPage.payeeFilter.clean();
//   await pages.BeneficiaryPage.payeeFilter.fill(TTPayeeName);

//   await Promise.all([
//     expect(pages.BeneficiaryPage.centerPayeeName).toHaveText(TTPayeeName),
//     expect(pages.BeneficiaryPage.paymentOptions).toContainText("HK-Telegraphic Transfer"),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.payeeLocation),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.townCity),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.streetName),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.buildingNum),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.buildingName),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.floor),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.room),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.department),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.subDepartment),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.postalCode),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.countrySubDivsion),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.townLocationName),
//     expect(pages.BeneficiaryPage.addressValue).toContainText(testData.Beneficiary.districtName),
//     expect(pages.BeneficiaryPage.centerBankNameValue).toContainText(testData.Beneficiary.newPayeeBankName),
//     expect(pages.BeneficiaryPage.centerBankAdd1Value).toContainText(testData.Beneficiary.newPayeBankAdd1),
//     expect(pages.BeneficiaryPage.centerBankAdd2Value).toContainText(testData.Beneficiary.newPayeBankAdd2),
//   ]);

//   // 删除收款人
//   await deletePayee(page, TTPayeeName);
// }

// /**
//  * 创建具有重复收款人昵称的收款人
//  * 对应 Protractor 版本的第173行测试用例
//  */
// async function createBeneficiaryWithDuplicateNickname(page: Page) {
//   const pages = getPages(page);
//   const domesticPayeeName = 'DomesticPayee' + Date.now();

//   await pages.AccountTransferPage.paymentMenu.click();
//   await pages.BeneficiaryPage.payeeMenu.click();
//   await pages.BeneficiaryPage.createNewPayee.jsClick();
//   await pages.BeneficiaryPage.continueBtn.jsClickIfExist();
//   await pages.BeneficiaryPage.selectOption(pages.BeneficiaryPage.selectedCountry, testData.Beneficiary.Country);
//   await pages.BeneficiaryPage.newPayeeNumber.fill(testData.Beneficiary.newPayeeAcctNumber);
//   await page.waitForTimeout(500).catch(() => {});
//   await pages.BeneficiaryPage.retireveNameBtn.click();
//   await pages.BeneficiaryPage.newPayeeName.fill(domesticPayeeName);
//   await pages.BeneficiaryPage.newPayeeNickName.fill(testData.Beneficiary.PayeeNickname);
//   await pages.BeneficiaryPage.next.click();
//   await expect(pages.BeneficiaryPage.nicknameMsg).toContainText(testData.Beneficiary.Msg);
//   await expect(pages.BeneficiaryPage.topMsg).not.toBeVisible();
// }

/**
 * 删除收款人的辅助函数
 * 对应 Protractor 版本的第194行
 */
async function deletePayee(page: Page, payeename: string) {
  const pages = getPages(page);
  await pages.AccountTransferPage.paymentMenu.click();
  await pages.BeneficiaryPage.payeeMenu.click();
  // await pages.BeneficiaryPage.payeeFilter.clean();
  await pages.BeneficiaryPage.payeeFilter.fill(payeename);
  await pages.BeneficiaryPage.deletePayeeBtn.click();
  await pages.BeneficiaryPage.confirmDelete.click();
  await pages.BeneficiaryPage.dismiss.click();
}
