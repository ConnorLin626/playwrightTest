import { Page } from '@playwright/test';

/**
 * 登录页面对象 - 基于 forAIstudy/src/pages/Navigate/LoginPage.ts
 * 支持 SIT 和 UAT 两种环境的登录流程
 */
export class LoginPage {
  constructor(private page: Page) {}

  // SIT 环境定位器
  readonly sitCorpIdInput = this.page.locator('#corpId');
  readonly sitUserIdInput = this.page.locator('#username');
  readonly sitPinInput = this.page.locator('#psw');
  readonly sitSubmitBtn = this.page.locator('[type="submit"]');

  // UAT 环境定位器
  readonly uatLoginWithOrgIdBtn = this.page.locator('//login-pin/div/div[4]/div/login-form/div[1]/div[2]/button[1]');
  readonly uatOrgIdInput = this.page.locator('#OID');
  readonly uatUserIdInput = this.page.locator('#UID');
  readonly uatPinInput = this.page.locator('#PIN');
  readonly uatSacInput = this.page.locator('#SAC');
  readonly uatSubmitBtn = this.page.locator('[type="submit"]');
  readonly uatEnterCode2Btn = this.page.locator('.link-primary.link-underline-opacity-0');
  readonly uatEnterCode3Btn = this.page.locator('//swipe-prompt-modal/div[2]/div/button[1]');
  readonly uatAuthenticateNowBtn = this.page.locator('.btn.btn-lg.btn-primary.modal-button');

  // 通用定位器
  readonly companyMenu = this.page.locator('.header-company__name');
  readonly paymentMenu = this.page.locator('#nav-item-navBBTopPaymentsLinkText');

  /**
   * 执行登录 - 根据 SIT/UAT 环境自动选择登录流程
   * @param corpId - 企业ID
   * @param userId - 用户ID
   * @param pin - PIN码
   * @param environment - 环境类型: 'SIT' | 'UAT'
   * @param sac - SAC验证码（仅UAT环境需要，默认'123123'）
   */
  async login(corpId: string, userId: string, pin: string, environment: 'SIT' | 'UAT' = 'SIT', sac: string = '123123') {
    console.log(`[登录][${environment}] Corp ID: ${corpId}, User ID: ${userId}`);

    if (environment === 'SIT') {
      await this.loginSIT(corpId, userId, pin);
    } else {
      await this.loginUAT(corpId, userId, pin, sac);
    }

    console.log(`[登录][${environment}] 登录完成`);
  }

  /**
   * SIT 环境登录流程
   */
  private async loginSIT(corpId: string, userId: string, pin: string) {
    await this.sitCorpIdInput.fill(corpId);
    await this.sitUserIdInput.fill(userId);
    await this.sitPinInput.fill(pin);
    await this.sitSubmitBtn.click();

    // 等待页面加载
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await this.page.waitForTimeout(2000).catch(() => {});

    // 等待菜单加载完成
    await this.waitForMenuLoad();
  }

  /**
   * UAT 环境登录流程
   */
  private async loginUAT(corpId: string, userId: string, pin: string, sac: string) {
    // 点击"loginWithOrgID"按钮
    await this.uatLoginWithOrgIdBtn.click().catch(() => {
      console.log('[登录][UAT] loginWithOrgID 按钮未找到，可能已经在登录页');
    });

    await this.page.waitForTimeout(1000).catch(() => {});

    // 填写登录信息
    await this.uatOrgIdInput.fill(corpId);
    await this.uatUserIdInput.fill(userId);
    await this.uatPinInput.fill(pin);
    await this.uatSubmitBtn.click();

    await this.page.waitForTimeout(5000).catch(() => {});

    // 检查是否需要点击 enterCode 按钮
    const enterCode2Visible = await this.uatEnterCode2Btn.isVisible({ timeout: 2000 }).catch(() => false);
    if (enterCode2Visible) {
      console.log('[登录][UAT] 检测到 enterCode2 按钮');
      await this.uatEnterCode2Btn.click();
      await this.page.waitForTimeout(1000).catch(() => {});
    }

    const enterCode3Visible = await this.uatEnterCode3Btn.isVisible({ timeout: 2000 }).catch(() => false);
    if (enterCode3Visible) {
      console.log('[登录][UAT] 检测到 enterCode3 按钮');
      await this.uatEnterCode3Btn.click();
      await this.page.waitForTimeout(1000).catch(() => {});
    }

    // 填写 SAC 验证码
    const sacInputVisible = await this.uatSacInput.isVisible({ timeout: 2000 }).catch(() => false);
    if (sacInputVisible) {
      console.log('[登录][UAT] 填写 SAC 验证码');
      await this.uatSacInput.fill(sac);
      await this.uatAuthenticateNowBtn.click();
    }

    // 等待页面加载
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
    await this.page.waitForTimeout(2000).catch(() => {});

    // 等待菜单加载完成
    await this.waitForMenuLoad();
  }

  /**
   * 等待菜单加载完成
   */
  private async waitForMenuLoad() {
    try {
      await this.companyMenu.waitFor({ state: 'visible', timeout: 10000 });
      console.log('[登录] 菜单已加载');
    } catch (error) {
      console.log('[登录] 等待菜单超时，可能已进入页面');
    }
  }
}
