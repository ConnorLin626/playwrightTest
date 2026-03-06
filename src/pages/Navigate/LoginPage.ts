import { Page } from '@playwright/test';

/**
 * 登录页面对象 - 基于 forAIstudy/src/pages/Navigate/LoginPage.ts
 */
export class LoginPage {
  constructor(private page: Page) {}

  // 定位器
  readonly corpIdInput = this.page.locator('#corpId');
  readonly userIdInput = this.page.locator('#username');
  readonly pinInput = this.page.locator('#psw');

  /**
   * 执行登录
   * @param corpId - 企业ID
   * @param userId - 用户ID
   * @param pin - PIN码
   */
  async login(corpId: string, userId: string, pin: string) {
    console.log(`[登录] Corp ID: ${corpId}, User ID: ${userId}`);

    await this.corpIdInput.fill(corpId);
    await this.userIdInput.fill(userId);
    await this.pinInput.fill(pin);

    await this.page.keyboard.press('Enter');
    // 使用 domcontentloaded 代替 networkidle，避免因持续轮询导致的超时
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    // 额外等待一段时间，让页面完全加载
    await this.page.waitForTimeout(2000).catch(() => {});

    console.log('[登录] 登录完成');
  }
}
