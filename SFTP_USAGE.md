# SFTP 工具使用说明

## 概述

本项目提供了一个完整的 SFTP 客户端工具类，用于连接远程 SFTP 服务器并进行文件操作。

## 目录结构

```
playwrightTest/
├── data/
│   ├── sftpConfig.json              # SFTP 配置文件
│   └── sftpConfig.template.json     # 配置模板
├── src/
│   └── pages/
│       └── utils/
│           └── SftpClient.ts        # SFTP 工具类
└── src/
    └── e2e/
        └── sftp/
            └── sftpUsage.example.ts # 使用示例
```

## 快速开始

### 1. 配置 SFTP 连接

复制模板文件并填入实际配置：

```bash
cp data/sftpConfig.template.json data/sftpConfig.json
```

编辑 `data/sftpConfig.json`，填写您的服务器信息：

```json
{
  "sftp": {
    "SIT": {
      "host": "sftp-sit.your-domain.com",
      "port": 22,
      "username": "your-username",
      "password": "your-password",
      "remoteBasePath": "/sftp/sit/",
      "description": "SIT环境"
    }
  }
}
```

### 2. 基本使用

```typescript
import { SftpClient } from './pages/utils';

// 加载配置并连接
const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
const sftp = new SftpClient();

try {
  await sftp.connect(config);
  await sftp.uploadFile('./local/file.txt', '/remote/file.txt');
} finally {
  await sftp.disconnect();
}
```

## 配置说明

### 环境配置

支持多个环境配置（SIT/UAT/PROD）：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `host` | string | ✅ | 服务器地址 |
| `port` | number | ✅ | 端口号（默认 22） |
| `username` | string | ✅ | 用户名 |
| `password` | string | ❌ | 密码（与 privateKey 二选一） |
| `privateKey` | string | ❌ | 私钥文件路径（生产环境推荐） |
| `passphrase` | string | ❌ | 私钥密码 |
| `remoteBasePath` | string | ❌ | 远程基础路径 |
| `description` | string | ❌ | 环境描述 |

### 认证方式

#### 1. 密码认证

```json
{
  "username": "user",
  "password": "password123"
}
```

#### 2. 密钥认证（推荐）

```json
{
  "username": "user",
  "privateKey": "/path/to/private/key.pem",
  "passphrase": "key-passphrase"
}
```

## API 方法

### 连接管理

| 方法 | 说明 |
|------|------|
| `connect(config)` | 连接到 SFTP 服务器 |
| `disconnect()` | 断开连接 |

### 文件操作

| 方法 | 说明 |
|------|------|
| `uploadFile(local, remote)` | 上传文件 |
| `uploadDirectory(local, remote)` | 上传目录 |
| `downloadFile(remote, local)` | 下载文件 |
| `downloadDirectory(remote, local)` | 下载目录 |

### 目录操作

| 方法 | 说明 |
|------|------|
| `listFiles(remotePath)` | 列出目录内容 |
| `createDirectory(remotePath)` | 创建目录 |
| `deleteDirectory(remotePath)` | 删除目录 |
| `exists(remotePath)` | 检查文件/目录是否存在 |

### 其他操作

| 方法 | 说明 |
|------|------|
| `deleteFile(remotePath)` | 删除文件 |
| `rename(oldPath, newPath)` | 重命名 |
| `getFileInfo(remotePath)` | 获取文件信息 |

### 配置文件工具

| 方法 | 说明 |
|------|------|
| `loadConfig(path, env)` | 加载指定环境配置 |
| `loadAllConfigs(path)` | 加载所有配置 |
| `getDirectory(path, name)` | 获取配置中的目录 |
| `getFilePattern(path, name)` | 获取文件模式 |

## 使用场景

### 场景 1: 单文件上传

```typescript
const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
const sftp = new SftpClient();

await sftp.connect(config);
await sftp.uploadFile('./data/file.txt', '/upload/file.txt');
await sftp.disconnect();
```

### 场景 2: 批量上传

```typescript
const config = SftpClient.loadConfig('data/sftpConfig.json', 'UAT');
const sftp = new SftpClient();

await sftp.connect(config);

const files = ['file1.txt', 'file2.txt', 'file3.txt'];
for (const file of files) {
  await sftp.uploadFile(`./data/${file}`, `/upload/${file}`);
}

await sftp.disconnect();
```

### 场景 3: 下载特定类型文件

```typescript
const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
const sftp = new SftpClient();

await sftp.connect(config);

const files = await sftp.listFiles('/reports');
for (const file of files) {
  if (file.name.endsWith('.csv')) {
    await sftp.downloadFile(`/reports/${file.name}`, `./data/${file.name}`);
  }
}

await sftp.disconnect();
```

### 场景 4: Playwright Test 集成

```typescript
import { test } from '@playwright/test';

test('SFTP: 上传测试文件', async () => {
  const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
  const sftp = new SftpClient();

  try {
    await sftp.connect(config);
    await sftp.uploadFile('./data/test.txt', '/upload/test.txt');

    const exists = await sftp.exists('/upload/test.txt');
    test.expect(exists).toBe(true);
  } finally {
    await sftp.disconnect();
  }
});
```

## 安全建议

1. **生产环境使用密钥认证** - 不要在配置文件中明文存储密码
2. **敏感信息环境变量** - 可考虑使用环境变量存储密码
3. **限制文件权限** - 配置文件权限设置为 600
4. **使用特定端口** - 如非标准端口，请指定正确的端口号

## 常见问题

### Q: 如何连接使用非标准端口的服务器？

A: 在配置文件中指定端口号：

```json
{
  "port": 2222
}
```

### Q: 如何使用 .pem 格式的私钥？

A: 确保私钥文件权限正确，配置文件中填写私钥文件路径：

```json
{
  "privateKey": "/path/to/private-key.pem"
}
```

### Q: 连接超时怎么办？

A: 检查服务器地址、端口、网络连接，确保防火墙允许连接。

### Q: 如何处理中文字符的文件名？

A: 确保服务器编码设置正确，建议使用 UTF-8 编码。

## 更多示例

详细使用示例请参考：`src/e2e/sftp/sftpUsage.example.ts`
