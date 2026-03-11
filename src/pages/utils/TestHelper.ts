import { Page, TestInfo } from '@playwright/test';
import * as path from 'path';
import { SftpClient } from './SftpClient';
import * as fs from 'fs';

/**
 * 服务器日志配置接口
 */
export interface LogServerConfig {
  enabled: boolean;
  configPath: string;
  environment: string;
  logFilePaths: string[];
  lines: number;
}

/**
 * 默认服务器日志配置
 */
export const DEFAULT_LOG_SERVER_CONFIG: LogServerConfig = {
  enabled: true,
  configPath: 'data/sftpConfig.json',
  environment: 'SIT',
  logFilePaths: [
    '/eplog/eplog.txt',
    '/ep_log/eplog.txt',
    '/logs/cash/corpbanking/eplog.txt',
    '/logs/cash/corpbanking/ep_log.txt'
  ],
  lines: 50
};

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

  /**
   * 获取当前测试的用户关键字（根据项目名称）
   * @param testInfo - Playwright 测试信息
   * @param testData - 测试数据对象
   * @returns 用户关键字数组
   */
  static getTestUserKeywords(testInfo: TestInfo, testData: any): string[] {
    const projectName = testInfo.project?.name || 'chromium';
    const corpId = testData.login?.corpId;
    let userId = '';

    // 根据项目名称选择对应的 userId
    if (projectName === 'chromium' && testData.login?.userIdChrome1) {
      userId = testData.login.userIdChrome1;
    } else if (projectName === 'chromium2' && testData.login?.userIdChrome2) {
      userId = testData.login.userIdChrome2;
    } else if (projectName === 'firefox' && testData.login?.userIdFirefox) {
      userId = testData.login.userIdFirefox;
    } else {
      userId = testData.login?.userIdChrome1 || testData.login?.userIdFirefox || '';
    }

    const keywords: string[] = [];
    if (corpId) keywords.push(corpId);
    if (userId) keywords.push(userId);
    return keywords;
  }

  /**
   * 在测试失败时获取服务器日志
   * @param testInfo - Playwright 测试信息
   * @param testData - 测试数据对象（包含 login 信息）
   * @param config - 服务器日志配置（可选，默认使用 DEFAULT_LOG_SERVER_CONFIG）
   * @returns 日志文件路径，如果失败返回 null
   */
  static async fetchServerLogsOnFailure(
    testInfo: TestInfo,
    testData: any,
    config: LogServerConfig = DEFAULT_LOG_SERVER_CONFIG
  ): Promise<string | null> {
    if (!config.enabled) {
      return null;
    }

    // 只在测试失败时获取日志
    if (testInfo.status !== 'failed') {
      return null;
    }

    console.log('Test failed, fetching server logs...');

    // 获取当前测试的用户关键字
    const userKeywords = TestHelper.getTestUserKeywords(testInfo, testData);
    console.log(`User keywords for log filtering: ${userKeywords.join(', ')}`);

    try {
      // 将日志路径数组合并为逗号分隔的字符串
      const logFilePath = config.logFilePaths.join(',');

      const logFilePathResult = await SftpClient.fetchServerLogsOnFailure(
        config.configPath,
        config.environment,
        logFilePath,
        config.lines,
        testInfo.title,
        userKeywords
      );

      if (logFilePathResult) {
        console.log(`✓ Server logs saved to: ${logFilePathResult}`);
        // 附加到测试报告
        testInfo.attachments.push({
          name: `Server Logs (User: ${userKeywords.join(', ')} - Last ${config.lines} lines)`,
          path: logFilePathResult,
          contentType: 'text/plain'
        });
      } else {
        console.warn('✗ Failed to fetch server logs');
      }

      return logFilePathResult;
    } catch (error) {
      console.error('Error fetching server logs:', error);
      return null;
    }
  }

  /**
   * 在测试失败时获取服务器日志（简化版本）
   * 只需要在 afterEach 中调用此方法即可
   * @param page - Playwright Page 对象
   * @param testInfo - Playwright 测试信息
   * @param testData - 测试数据对象
   * @param logConfig - 日志配置（可选）
   * @example
   * // 在 afterEach 中使用:
   * test.afterEach(async ({ page }) => {
   *   await TestHelper.takeScreenshotOnFinish(page, test.info());
   *   await TestHelper.fetchLogsOnFailure(test.info(), testData);
   * });
   */
  static async fetchLogsOnFailure(
    testInfo: TestInfo,
    testData: any,
    logConfig?: LogServerConfig
  ): Promise<void> {
    const config = logConfig || DEFAULT_LOG_SERVER_CONFIG;
    await TestHelper.fetchServerLogsOnFailure(testInfo, testData, config);
  }
}
