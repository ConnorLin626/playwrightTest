# 测试失败时自动获取服务器日志

## 概述

当测试失败时，系统会自动从远程 SFTP 服务器下载日志文件的末尾指定行数，便于问题排查。

## 功能说明

### 自动触发
- 在 `test.afterEach()` 钩子中检查测试状态
- 如果测试失败（`status === 'failed'`），自动触发日志抓取

### 日志保存位置
```
test_failure_logs/
└── <测试名>_logs_tail_50_lines_<时间戳>.txt
```

## 配置

### 1. SFTP 服务器配置

在 `data/sftpConfig.json` 中配置服务器信息：

```json
{
  "sftp": {
    "SIT": {
      "host": "192.168.0.251",
      "port": 22,
      "username": "batch",
      "password": "Welcome$JK_v50",
      "remoteBasePath": "/sftp/sit/"
    }
  }
}
```

### 2. 测试文件配置

在测试文件中添加配置：

```typescript
const LOG_SERVER_CONFIG = {
  enabled: true,                    // 是否启用日志抓取
  configPath: 'data/sftpConfig.json',
  environment: 'SIT',              // 使用哪个环境的配置
  logFilePath: '/logs/cash/corpbanking/eplog.txt',  // 远程日志路径
  lines: 50                         // 获取末尾行数
};
```

## 使用方法

### 方法 1: 在现有测试中启用（推荐）

已在 `SG_ACT_NewPayeeEnhance.test.ts` 中实现，包含以下功能：

```typescript
import { SftpClient } from '../../../pages/utils';

// 配置日志服务器
const LOG_SERVER_CONFIG = {
  enabled: true,
  configPath: 'data/sftpConfig.json',
  environment: 'SIT',
  logFilePath: '/logs/cash/corpbanking/eplog.txt',
  lines: 50
};

// 在 afterEach 中自动触发
test.afterEach(async ({ page }) => {
  await TestHelper.takeScreenshotOnFinish(page, test.info());
  await fetchServerLogsOnTestFailure(test.info());  // 自动获取日志
});
```

### 方法 2: 手动调用

在需要的地方手动调用：

```typescript
import { SftpClient } from '../../../pages/utils';

async function fetchLogs() {
  const logPath = await SftpClient.fetchServerLogsOnFailure(
    'data/sftpConfig.json',
    'SIT',
    '/logs/cash/corpbanking/eplog.txt',
    50,
    'My Test Name'
  );

  if (logPath) {
    console.log(`Logs saved to: ${logPath}`);
  }
}
```

### 方法 3: 使用 SftpClient 直接获取

```typescript
import { SftpClient } from '../../../pages/utils';

const sftp = new SftpClient();
const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');

await sftp.connect(config);
const logContent = await sftp.getTailLinesAsString(
  '/logs/cash/corpbanking/eplog.txt',
  50
);
console.log(logContent);
await sftp.disconnect();
```

## 日志文件格式

获取的日志文件包含以下信息：

```
=== Test Failure Log ===
Test: Create an ACT Payment with new Payee
Server: 192.168.0.251
Remote Path: /logs/cash/corpbanking/eplog.txt
Timestamp: 2026-03-10T12-34-56-789Z
Lines: 50
==================================================

[日志内容 - 最后50行]
```

## 输出示例

### 成功时
```
Test failed, fetching server logs...
Connecting to SFTP server: 192.168.0.251:22
Retrieved last 50 lines from /logs/cash/corpbanking/eplog.txt
Server logs saved to: c:\playwrightTest\test_failure_logs\Create_an_ACT_Payment_with_new_Payee_logs_tail_50_lines_2026-03-10T12-34-56-789Z.txt
✓ Server logs saved to: c:\playwrightTest\test_failure_logs\Create_an_ACT_Payment_with_new_Payee_logs_tail_50_lines_2026-03-10T12-34-56-789Z.txt
```

### 失败时
```
Test failed, fetching server logs...
Connecting to SFTP server: 192.168.0.251:22
✗ Failed to fetch server logs
Error: Log file not found: /logs/cash/corpbanking/eplog.txt
```

## 禁用日志抓取

如果不需要自动获取日志，设置 `enabled: false`：

```typescript
const LOG_SERVER_CONFIG = {
  enabled: false,  // 禁用日志抓取
  // ... 其他配置
};
```

## 故障排查

### 问题 1: 无法连接到服务器

**原因**: 服务器地址、端口、用户名或密码不正确

**解决**:
- 检查 `data/sftpConfig.json` 中的配置
- 确认网络连接正常
- 确认防火墙允许连接

### 问题 2: 日志文件不存在

**原因**: 远程日志路径不正确

**解决**:
- 检查 `logFilePath` 配置是否正确
- 确认服务器上该路径下是否有 `eplog.txt` 文件

### 问题 3: 权限不足

**原因**: 用户没有读取日志文件的权限

**解决**:
- 确认用户有读取 `/logs/cash/corpbanking/eplog.txt` 的权限
- 联系服务器管理员

## 注意事项

1. **性能影响**: 获取日志需要下载文件，会增加测试时间
2. **敏感信息**: 日志可能包含敏感信息，注意保存安全
3. **磁盘空间**: 日志文件会保存在本地，定期清理 `test_failure_logs` 目录
4. **大文件**: 如果日志文件很大，建议减少 `lines` 参数值

## 相关文件

- `src/pages/utils/SftpClient.ts` - SFTP 工具类
- `src/e2e/IDEALX/PayTransfer/SG_ACT_NewPayeeEnhance.test.ts` - 使用示例
- `data/sftpConfig.json` - SFTP 配置文件
- `SFTP_USAGE.md` - SFTP 使用文档
