# Playwright 自动化测试项目

基于 forAIstudy 项目结构重构的 Playwright 自动化测试框架，支持 Chrome 和 Firefox 并行测试。

## 📁 项目结构

```
playwrightTest/
├── data/                           # 测试数据目录（JSON格式）
│   └── SG_testData.json            # 新加坡测试数据
├── src/
│   ├── pages/                      # 页面对象模型（POM）
│   │   ├── Navigate/               # 导航页面对象
│   │   │   └── LoginPage.ts        # 登录页面对象
│   │   ├── IDEALX/                 # IDEALX模块页面对象
│   │   │   ├── PayTransfer/        # 付款转账页面对象
│   │   │   │   ├── AccountTransferPage.ts
│   │   │   │   └── BeneficiaryPage.ts
│   │   │   └── index.ts
│   │   └── index.ts                # 页面对象统一导出
│   └── e2e/                        # 端到端测试用例
│       └── IDEALX/                 # IDEALX模块测试
│           └── PayTransfer/        # 付款转账测试
│               └── SG_ACT_NewPayee.test.ts
├── tests/                          # 旧版测试文件（兼容保留）
│   ├── login.spec.ts
│   └── ACT-Payment-NewPayee.spec.ts
├── playwright.config.ts             # Playwright配置文件
├── package.json                    # 项目依赖配置
├── screenshots/                    # 测试截图
├── playwright-report/              # 测试报告
└── test-results/                   # 测试结果
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 安装浏览器驱动

```bash
npm run install:browsers
```

## 📝 测试命令

### Suites 配置（类似 Protractor）

```bash
# 运行所有 IDEALX 测试
npm run test:idealex

# 运行付款转账测试
npm run test:paytransfer

# 运行 ACT Payment 测试（Chrome + Firefox 并行）
npm run test:act

# 单独测试 Chrome
npm run test:act:chrome

# 单独测试 Firefox
npm run test:act:firefox
```

### 通用测试命令

```bash
# 有头模式运行所有测试（Chrome + Firefox）
npm run test:headed

# 无头模式运行
npm test

# 仅 Chrome 测试
npm run test:chrome

# 仅 Firefox 测试
npm run test:firefox

# 旧版登录测试
npm run test:login
```

## 📊 测试报告

测试完成后，可以通过以下命令查看 HTML 报告：

```bash
npx playwright show-report
```

报告位于 `playwright-report/index.html`

## 🎯 测试用例说明

### SG_ACT_NewPayee.test.ts

**测试场景**: Create an ACT Payment with new Payee

**测试步骤** (共26步):
1. 导航到 Payments 菜单
2. 点击 Make Payment
3. 选择 From Account
4. 输入金额
5. 点击新收款人标签页
6. 选择国家
7. 选择银行
8-16. 填写收款人信息（账号、姓名、昵称、地址等）
17-22. 填写付款详情和通知信息
23. 点击 Next
24. 提交付款
25. 验证成功消息并获取参考编号
26. 点击 Finish

**页面对象**:
- `LoginPage` - 登录页面对象
- `AccountTransferPage` - 账户转账页面对象
- `BeneficiaryPage` - 收款人地址页面对象

## 🔧 配置说明

### 多用户并行测试配置

为避免并行测试时的冲突，不同浏览器使用不同的登录账号：

| 浏览器/项目 | Corp ID | User ID | PIN |
|------------|---------|---------|-----|
| Chrome (chromium) | SG2BE11 | SG2BE11SL1 | 123123 |
| Firefox (firefox) | SG2BE11 | SG2BE11SL2 | 123123 |

配置位置：
- `src/e2e/IDEALX/PayTransfer/SG_ACT_NewPayee.test.ts`
- `data/SG_testData.json`

### playwright.config.ts

```typescript
- testDir: './src/e2e'           // 测试文件目录
- fullyParallel: true            // 完全并行执行
- workers: 2                     // 并行工作进程数
- timeout: 120000                // 全局超时2分钟
- actionTimeout: 30000           // 操作超时30秒
- navigationTimeout: 60000      // 导航超时60秒
```

### 浏览器配置

- **Chrome**: Desktop Chrome
- **Firefox**: Desktop Firefox

### 超时配置

- 全局测试超时: 120秒
- 断言超时: 30秒
- 操作超时: 30秒
- 导航超时: 60秒

## 📦 测试数据

测试数据存储在 `data/SG_testData.json` 中，包含：

```json
{
  "login": {
    "corpId": "SG2BE11",
    "userIdChrome": "SG2BE11SL1",
    "userIdFirefox": "SG2BE11SL2",
    "pin": "123123"
  },
  "AccountTransfer": {
    "fromAccount": "0019051983",
    "Country": "Singapore",
    "payeeBank": "DBS Bank SINGAPORE",
    ...
  },
  "Beneficiary": {
    "payeeLocation": "Singapore",
    "townCity": "Singapore",
    "postalCode": "123456"
  }
}
```

注意：`userIdChrome` 和 `userIdFirefox` 用于并行测试，避免冲突。

## 🛠️ 页面对象模式（POM）

项目采用页面对象模式，将页面元素定位和操作封装在单独的类中：

### 示例：AccountTransferPage

```typescript
export class AccountTransferPage {
  constructor(private page: Page) {}

  readonly paymentMenu = this.page.locator('//*[@id="nav-item-navBBTopPaymentsLinkText"]');
  readonly makePayment = this.page.locator('//*[@id="icon__make_payment"]');

  async selectOption(locator: any, value: string) {
    await locator.click();
    // ... 选择逻辑
  }
}
```

## 📸 截图和录屏

- 截图存储位置: `screenshots/`
- 失败时自动截图: 启用
- 失败时自动录屏: 启用
- 视频存储位置: `test-results/`

## 🔍 调试技巧

### 有头模式运行

```bash
npm run test:headed
```

### 慢动作模式

```bash
npx playwright test --headed --slow-mo=1000
```

### 调试模式

```bash
npx playwright test --debug
```

### 保留浏览器

```bash
npx playwright test --headed --headed
```

## ⚠️ 注意事项

1. **HTTPS 证书错误**: 配置中已启用 `ignoreHTTPSErrors: true`
2. **waitForTimeout**: 所有超时等待都添加了错误处理，防止废弃方法报错
3. **元素定位**: 使用 XPath 定位器，基于 Protractor 选择器
4. **数据隔离**: 每个测试使用独立的数据（通过 `Date.now()` 生成唯一值）

## 📝 与 forAIstudy 对比

| 特性 | forAIstudy (Protractor) | playwrightTest (Playwright) |
|------|------------------------|----------------------------|
| 测试框架 | Protractor + Mocha | Playwright |
| 浏览器支持 | Chrome | Chrome + Firefox |
| 并行执行 | 支持 | 支持 |
| 页面对象 | src/pages/ | src/pages/ |
| 测试数据 | data/ | data/ |
| 测试用例 | src/e2e/ | src/e2e/ |
| 配置文件 | protractor.config.js | playwright.config.ts |
| Suites配置 | suites.test | npm scripts |
| 报告格式 | Mochawesome | HTML Reporter |

## 🎓 最佳实践

1. **使用页面对象**: 所有页面元素定位封装在 `src/pages/` 中
2. **数据分离**: 测试数据存储在 `data/` 目录的 JSON 文件中
3. **模块化测试**: 按业务模块组织测试用例（IDEALX、CB、Trade等）
4. **并行测试**: 利用 Playwright 的并行能力提高测试效率
5. **清晰的日志**: 每个关键步骤都输出日志信息
6. **截图记录**: 关键步骤自动截图，便于问题排查

## 📞 联系支持

如有问题，请查看：
- Playwright 官方文档: https://playwright.dev
- 项目文档: README.md
