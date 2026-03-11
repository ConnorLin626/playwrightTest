import { Page, TestInfo } from '@playwright/test';
import { LoginPage } from './LoginPage';

export {
  LoginPage
};

/**
 * 环境类型
 */
export type TestEnvironment = 'SIT' | 'UAT' | 'PROD';

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
   * 支持 SIT/UAT 环境自动识别和多种参数配置方式
   *
   * @param envOrCorpId - 环境名称 (SIT/UAT/PROD) 或直接传入 corpId，或测试数据对象
   * @param userIdOrPin - 用户ID 或 PIN码 或测试数据对象（取决于参数组合）
   * @param pin - PIN码（可选）
   * @param testData - 测试数据对象（可选）
   *
   * 使用示例:
   *
   * 1. 根据环境自动选择（推荐）:
   *    await navigatePages.loginIdealx('SIT', testData);
   *    await navigatePages.loginIdealx('UAT', testData);
   *
   * 2. 手动指定所有参数:
   *    await navigatePages.loginIdealx('AUTOSG01', 'AUTOSG01A16', '123123');
   *
   * 3. 从环境变量读取环境:
   *    process.env.TEST_ENV = 'SIT'; // 或 'UAT'
   *    await navigatePages.loginIdealx(testData);
   *
   * 4. 传入特定 userId:
   *    await navigatePages.loginIdealx('SIT', 'CUSTOM_USER_ID', undefined, testData);
   */
  public async loginIdealx(
    envOrCorpId?: string | any,
    userIdOrPin?: string | any,
    pin?: string,
    testData?: any
  ): Promise<void> {
    const projectName = this.testInfo?.project?.name || 'chromium';
    const defaultEnv = (process.env.TEST_ENV || 'SIT').toUpperCase() as TestEnvironment;

    let finalCorpId: string;
    let finalUserId: string;
    let finalPin: string;
    let environment: TestEnvironment;
    let sac: string = '123123'; // UAT 环境的 SAC 验证码

    // 模式1: loginIdealx('SIT', testData) 或 loginIdealx('UAT', testData)
    if (['SIT', 'UAT', 'PROD'].includes(envOrCorpId?.toUpperCase()) && typeof userIdOrPin === 'object') {
      environment = envOrCorpId.toUpperCase() as TestEnvironment;
      testData = userIdOrPin;

      const loginData = this.getLoginDataByEnv(testData, environment, projectName);
      finalCorpId = loginData.corpId;
      finalUserId = loginData.userId;
      finalPin = loginData.pin;
      sac = loginData.sac || sac;
    }
    // 模式2: loginIdealx(testData) - 使用环境变量或默认 SIT
    else if (typeof envOrCorpId === 'object' && userIdOrPin === undefined && pin === undefined) {
      testData = envOrCorpId;
      environment = defaultEnv;

      const loginData = this.getLoginDataByEnv(testData, environment, projectName);
      finalCorpId = loginData.corpId;
      finalUserId = loginData.userId;
      finalPin = loginData.pin;
      sac = loginData.sac || sac;
    }
    // 模式3: loginIdealx('SIT', 'CUSTOM_USER_ID', undefined, testData)
    else if (['SIT', 'UAT', 'PROD'].includes(envOrCorpId?.toUpperCase())) {
      environment = envOrCorpId.toUpperCase() as TestEnvironment;

      finalUserId = typeof userIdOrPin === 'string' ? userIdOrPin : '';
      pin = typeof pin === 'string' ? pin : undefined;
      sac = testData?.login?.[environment]?.sac || '123123';

      const loginData = this.getLoginDataByEnv(testData, environment, projectName);
      finalCorpId = loginData.corpId;
      finalPin = pin || loginData.pin;
    }
    // 模式4: loginIdealx('AUTOSG01', 'AUTOSG01A16', '123123') - 手动指定
    else {
      environment = defaultEnv;
      finalCorpId = envOrCorpId;
      finalUserId = userIdOrPin;
      finalPin = pin || testData?.login?.[environment]?.pin || testData?.login?.pin || '123123';
      sac = testData?.login?.[environment]?.sac || '123123';
    }

    // 验证必要参数
    if (!finalCorpId) {
      throw new Error(`未提供 corpId 且无法从 testData[${environment}] 获取`);
    }
    if (!finalUserId) {
      throw new Error(`未提供 userId 且无法从 testData[${environment}] 获取。项目名称: ${projectName}`);
    }
    if (!finalPin) {
      throw new Error(`未提供 pin 且无法从 testData[${environment}] 获取`);
    }

    console.log(`[${projectName}][${environment}] 登录信息: corpId=${finalCorpId}, userId=${finalUserId}`);

    const baseURL = this.testInfo?.project?.use?.baseURL || 'https://192.168.0.251:10444';
    await this.page.goto(baseURL);

    // 根据环境调用不同的登录方法
    await this.loginPage.login(finalCorpId, finalUserId, finalPin, environment, sac);
  }

  /**
   * 根据环境和项目名称获取登录数据
   */
  private getLoginDataByEnv(testData: any, env: TestEnvironment, projectName: string): {
    corpId: string;
    userId: string;
    pin: string;
    sac?: string;
  } {
    // 尝试从 testData.login[env] 获取
    let corpId, userId, pin, sac;

    if (testData?.login?.[env]) {
      corpId = testData.login[env].corpId;
      pin = testData.login[env].pin;
      sac = testData.login[env].sac || '123123';

      // 根据项目名称选择 userId
      if (projectName === 'chromium' && testData.login[env].userIdChrome1) {
        userId = testData.login[env].userIdChrome1;
      } else if (projectName === 'chromium2' && testData.login[env].userIdChrome2) {
        userId = testData.login[env].userIdChrome2;
      } else if (projectName === 'firefox' && testData.login[env].userIdFirefox) {
        userId = testData.login[env].userIdFirefox;
      } else if (testData.login[env].userId) {
        userId = testData.login[env].userId;
      }
    }

    // 如果没找到，尝试从 testData.AccountTransfer[env] 获取
    if (!corpId && testData?.AccountTransfer?.[env]?.loginCompanyId) {
      corpId = testData.AccountTransfer[env].loginCompanyId;
    }
    if (!userId && testData?.AccountTransfer?.[env]?.loginUserId) {
      userId = testData.AccountTransfer[env].loginUserId;
    }

    // 如果还找不到，使用默认值
    if (!corpId) {
      corpId = testData?.login?.corpId || '';
    }
    if (!userId) {
      userId = this.getUserIdByProject(testData, projectName);
    }
    if (!pin) {
      pin = testData?.login?.pin || '123123';
    }

    return { corpId, userId, pin, sac };
  }

  /**
   * 根据项目名称获取对应的 userId
   */
  private getUserIdByProject(testData: any, projectName: string): string {
    if (projectName === 'chromium' && testData.login?.userIdChrome1) {
      return testData.login.userIdChrome1;
    } else if (projectName === 'chromium2' && testData.login?.userIdChrome2) {
      return testData.login.userIdChrome2;
    } else if (projectName === 'firefox' && testData.login?.userIdFirefox) {
      return testData.login.userIdFirefox;
    }
    return testData.login?.userIdChrome1 || testData.login?.userIdFirefox || '';
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
