import { Page, TestInfo } from '@playwright/test';
import * as path from 'path';

/**
 * 测试辅助工具类
 */
export class TestHelper {
  /**
   * 在测试结束时截图
   * @param page - Playwright Page 对象
   * @param testInfo - 测试信息
   * @param screenshotDir - 截图保存目录，默认 'screenshots'
   */
  static async takeScreenshotOnFinish(
    page: Page,
    testInfo: TestInfo,
    screenshotDir: string = 'screenshots'
  ): Promise<void> {
    const projectName = testInfo.project.name;
    const testTitle = testInfo.title;
    const timestamp = Date.now();
    const filename = `${testTitle}-${projectName}-${timestamp}.png`;
    const filepath = path.join(process.cwd(), screenshotDir, filename);
    await page.screenshot({ path: filepath, fullPage: true });
  }
}
