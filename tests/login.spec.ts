import { test, expect } from '@playwright/test';

test.describe('SSO登录测试', () => {
  const username = 'SG2BE11';
  const password = 'SG2BE11SL1';
  const loginUrl = 'https://192.168.0.251:10444/iws/ssologin';

  test('Chrome浏览器登录测试', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', '此测试仅在Chrome中运行');
    await performLogin(page, username, password, loginUrl);
  });

  test('Firefox浏览器登录测试', async ({ page, browserName }) => {
    test.skip(browserName !== 'firefox', '此测试仅在Firefox中运行');
    await performLogin(page, username, password, loginUrl);
  });

  test('跨浏览器登录测试', async ({ page, browserName }) => {
    await performLogin(page, username, password, loginUrl);
  });
});

async function performLogin(page: any, username: string, password: string, loginUrl: string) {
  // 访问登录页面
  await page.goto(loginUrl);

  // 等待页面加载
  await page.waitForLoadState('networkidle');

  // 截图保存初始状态
  await page.screenshot({ path: `screenshots/login-initial-${page.context().browser()._options.name}.png` });

  // 尝试查找用户名输入框（多种可能的选择器）
  const usernameSelectors = [
    'input[name="username"]',
    'input[name="user"]',
    'input[id="username"]',
    'input[type="text"]',
    '#username',
    '.username',
    '[placeholder*="用户名"]',
    '[placeholder*="账号"]',
  ];

  let usernameInput: any = null;
  for (const selector of usernameSelectors) {
    try {
      usernameInput = await page.waitForSelector(selector, { timeout: 2000 });
      if (usernameInput) break;
    } catch {
      continue;
    }
  }

  if (!usernameInput) {
    // 如果找不到标准输入框，打印页面内容用于调试
    const pageContent = await page.content();
    console.log('页面内容片段:', pageContent.substring(0, 500));
    throw new Error('未找到用户名输入框，请检查页面结构');
  }

  // 输入用户名
  await usernameInput.fill(username);

  // 尝试查找密码输入框
  const passwordSelectors = [
    'input[name="password"]',
    'input[name="pwd"]',
    'input[type="password"]',
    '#password',
    '.password',
    '[placeholder*="密码"]',
  ];

  let passwordInput: any = null;
  for (const selector of passwordSelectors) {
    try {
      passwordInput = await page.waitForSelector(selector, { timeout: 2000 });
      if (passwordInput) break;
    } catch {
      continue;
    }
  }

  if (!passwordInput) {
    throw new Error('未找到密码输入框，请检查页面结构');
  }

  // 输入密码
  await passwordInput.fill(password);

  // 截图保存输入后的状态
  await page.screenshot({ path: `screenshots/login-filled-${page.context().browser()._options.name}.png` });

  // 尝试查找登录按钮
  const loginButtonSelectors = [
    'button[type="submit"]',
    'input[type="submit"]',
    'button:has-text("登录")',
    'button:has-text("Login")',
    '.login-btn',
    '#login-btn',
    'button:has-text("确定")',
  ];

  let loginButton: any = null;
  for (const selector of loginButtonSelectors) {
    try {
      loginButton = await page.waitForSelector(selector, { timeout: 2000 });
      if (loginButton) break;
    } catch {
      continue;
    }
  }

  if (loginButton) {
    await loginButton.click();
  } else {
    // 如果找不到按钮，尝试按回车键
    await passwordInput.press('Enter');
  }

  // 等待页面跳转或响应
  await page.waitForTimeout(3000);

  // 截图保存登录后的状态
  await page.screenshot({ path: `screenshots/login-success-${page.context().browser()._options.name}.png` });

  // 验证登录是否成功（检查URL变化或页面元素）
  const currentUrl = page.url();
  console.log(`当前URL: ${currentUrl}`);

  // 检查是否跳转到了登录页面之外
  expect(currentUrl).not.toBe(loginUrl);

  // 或者检查是否有错误消息
  const hasError = await page.locator('.error, .error-message, [class*="error"]').count();
  if (hasError > 0) {
    const errorMessage = await page.locator('.error, .error-message, [class*="error"]').first().textContent();
    console.log(`登录可能失败: ${errorMessage}`);
  }

  console.log(`${page.context().browser()._options.name} 浏览器登录测试完成`);
}
