import { Page, TestInfo } from '@playwright/test';
import { LoginPage } from './LoginPage';

export {
  LoginPage
};

/**
 * 导航页面对象 - 封装所有导航相关的操作
 * 基于 forAIstudy/src/pages/Navigate/index.ts
 */
export class NavigatePages {
  private page: Page;
  private testInfo: TestInfo;
  public loginPage: LoginPage;

  constructor(page: Page, testInfo?: TestInfo) {
    this.page = page;
    this.testInfo = testInfo || (page as any).testInfo;
    this.loginPage = new LoginPage(page);
  }

  /**
   * 简化的 IDEALX 登录方法
   * 支持多种参数配置方式，优先级从高到低：
   * 1. 直接传入的 userId/corpId/pin 参数
   * 2. 从 testData 对象中获取
   * 3. 根据项目名称自动选择默认 userId（仅当 userId 未提供且 testData 不存在时）
   * 
   * @param corpId - 企业ID（可选，优先级高于 testData）
   * @param userId - 用户ID（可选，优先级高于自动选择和 testData）
   * @param pin - PIN码（可选，优先级高于 testData）
   * @param testData - 测试数据对象（可选，用于获取默认登录信息）
   * 
   * 使用示例:
   * 1. 自动选择userId（根据项目名称）:
   *    await navigatePages.loginIdealx(testData.login.corpId, undefined, testData.login.pin, testData);
   * 
   * 2. 指定userId（覆盖自动选择）:
   *    await navigatePages.loginIdealx('CORP01', 'USER123', '123456');
   * 
   * 3. 使用testData中的默认值:
   *    await navigatePages.loginIdealx(undefined, undefined, undefined, testData);
   */
  public async loginIdealx(corpId?: string, userId?: string, pin?: string, testData?: any): Promise<void> {
    const projectName = this.testInfo?.project?.name || 'chromium';

    // 优先级1: 使用直接传入的参数
    let finalCorpId = corpId;
    let finalPin = pin;
    let finalUserId = userId;

    // 优先级2: 如果参数未提供，尝试从 testData 获取
    if (!finalCorpId && testData?.login?.corpId) {
      finalCorpId = testData.login.corpId;
    }
    if (!finalPin && testData?.login?.pin) {
      finalPin = testData.login.pin;
    }
    if (!finalUserId && testData?.login) {
      // 如果有 testData 且 userId 未提供，根据项目名称选择
      if (projectName === 'chromium' && testData.login.userIdChrome1) {
        finalUserId = testData.login.userIdChrome1;
      } else if (projectName === 'chromium2' && testData.login.userIdChrome2) {
        finalUserId = testData.login.userIdChrome2;
      } else if (projectName === 'firefox' && testData.login.userIdFirefox) {
        finalUserId = testData.login.userIdFirefox;
      } else if (testData.login.userIdChrome1) {
        // 默认使用 userIdChrome1
        finalUserId = testData.login.userIdChrome1;
      }
    }

    // 验证必要参数
    if (!finalCorpId) {
      throw new Error('未提供 corpId 且无法从 testData 获取，请在参数中传入或确保 testData.login.corpId 存在');
    }
    if (!finalPin) {
      throw new Error('未提供 pin 且无法从 testData 获取，请在参数中传入或确保 testData.login.pin 存在');
    }
    if (!finalUserId) {
      throw new Error(`未提供 userId 且无法从 testData 获取。项目名称: ${projectName}，请确保 testData 中存在对应的 userId 配置或直接传入 userId 参数`);
    }

    console.log(`[${projectName}] 登录信息: corpId=${finalCorpId}, userId=${finalUserId}`);

    const baseURL = this.testInfo?.project?.use?.baseURL || 'https://192.168.0.251:10444';
    await this.page.goto(baseURL);
    await this.loginPage.login(finalCorpId, finalUserId, finalPin);
  }

  /**
   * 指定用户 ID 的 IDEALX 登录方法
   * @param orgid - 企业ID
   * @param userid - 用户ID
   * @param pinid - PIN码
   */
  public async loginIdealxWithUser(orgid: string, userid: string, pinid: string): Promise<void> {
    const baseURL = this.testInfo?.project?.use?.baseURL || 'https://192.168.0.251:10444';
    await this.page.goto(baseURL);
    await this.loginPage.login(orgid, userid, pinid);
  }
}
