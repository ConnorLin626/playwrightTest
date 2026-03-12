import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  reporter: 'html',
  timeout: 120000, // 增加全局超时到2分钟
  expect: {
    timeout: 30000, // 断言超时30秒
  },
  use: {
    //baseURL: 'https://192.168.0.251:10444',
    baseURL: 'https://192.168.0.251:10444/iws/ssologin',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true, // 忽略HTTPS证书错误
    headless: false, // 默认以有头模式运行
    actionTimeout: 30000, // 操作超时30秒
    navigationTimeout: 60000, // 导航超时60秒
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-web-security'],
        },
      },
    },
    {
      name: 'chromium2',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-web-security'],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          firefoxUserPrefs: {
            'dom.webnotifications.enabled': false,
          },
        },
      },
    },
  ],
});
