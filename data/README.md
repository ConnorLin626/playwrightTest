# 测试数据配置说明

## 数据文件位置

所有测试数据统一配置在 `data/SG_testData.json` 文件中。

## 数据结构

```json
{
  "login": {
    "corpId": "SG2BE11",
    "userIdChrome1": "SG2BE11SL1",
    "userIdChrome2": "SG2BE11SL3",
    "userIdFirefox": "SG2BE11SL2",
    "pin": "123123"
  },
  "AccountTransfer": {
    "UAT": { "fromAccount": "0019051983" },
    "SIT": { "fromAccount": "0039007639" },
    "Country": "Singapore",
    "payeeBank": "DBS Bank SINGAPORE",
    ...
  },
  "Beneficiary": { ... },
  "status": { ... }
}
```

## 用户账号分配

| 项目 | 浏览器 | 用户账号 | 配置字段 |
|------|--------|----------|----------|
| `chromium` | Chrome 窗口1 | SG2BE11SL1 | `login.userIdChrome1` |
| `chromium2` | Chrome 窗口2 | SG2BE11SL3 | `login.userIdChrome2` |
| `firefox` | Firefox 窗口 | SG2BE11SL2 | `login.userIdFirefox` |

## 在测试用例中使用

```typescript
import * as fs from 'fs';
import * as path from 'path';

// 读取测试数据
const testDataPath = path.resolve(__dirname, '../../data/SG_testData.json');
const testDataRaw = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

// 动态生成带时间戳的数据
const testData = {
  ...testDataRaw,
  AccountTransfer: {
    ...testDataRaw.AccountTransfer,
    newPayeeName: testDataRaw.AccountTransfer.newPayeeName + ' ' + Date.now()
  }
};

// 使用测试数据
await loginPage.login(testData.login.corpId, userId, testData.login.pin);
```

## 添加新测试数据

直接在 `data/SG_testData.json` 文件中添加相应的配置即可。

## 注意事项

- 测试用例中不要再硬编码测试数据
- 所有测试数据必须从 `data/SG_testData.json` 读取
- 对于需要唯一性的字段（如收款人名称、交易备注等），会在运行时自动添加时间戳
