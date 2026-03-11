/**
 * SFTP 使用示例
 * 演示如何使用 SftpClient 工具类和配置文件
 */

import { SftpClient, SftpConfig } from '../../pages/utils';

// ============================================
// 方式一: 使用配置文件（推荐）
// ============================================

async function example1_UsingConfigFile() {
  console.log('=== 示例1: 使用配置文件 ===');

  try {
    // 加载配置
    const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
    const sftp = new SftpClient();

    // 连接
    await sftp.connect(config);

    // 上传文件
    await sftp.uploadFile(
      './data/testFile.txt',
      `${config.remoteBasePath || ''}upload/testFile.txt`
    );

    // 下载文件
    await sftp.downloadFile(
      `${config.remoteBasePath || ''}download/result.csv`,
      './data/downloaded/result.csv'
    );

    // 列出目录
    const files = await sftp.listFiles(`${config.remoteBasePath || ''}upload`);
    console.log('文件列表:', files);

  } finally {
    await sftp.disconnect();
  }
}

// ============================================
// 方式二: 直接配置（用于简单场景）
// ============================================

async function example2_DirectConfig() {
  console.log('=== 示例2: 直接配置 ===');

  const config: SftpConfig = {
    host: '192.168.1.100',
    port: 22,
    username: 'admin',
    password: 'password123'
  };

  const sftp = new SftpClient();

  try {
    await sftp.connect(config);
    await sftp.uploadFile('./local/file.txt', '/remote/file.txt');
  } finally {
    await sftp.disconnect();
  }
}

// ============================================
// 方式三: 使用密钥认证（生产环境推荐）
// ============================================

async function example3_KeyAuthentication() {
  console.log('=== 示例3: 密钥认证 ===');

  const config: SftpConfig = {
    host: 'sftp.company.com',
    port: 22,
    username: 'production-user',
    privateKey: './keys/private_key.pem',
    passphrase: 'key-passphrase'
  };

  const sftp = new SftpClient();

  try {
    await sftp.connect(config);
    await sftp.uploadFile('./data/payment.txt', '/sftp/upload/payment.txt');
  } finally {
    await sftp.disconnect();
  }
}

// ============================================
// 示例4: 批量上传文件
// ============================================

async function example4_BatchUpload() {
  console.log('=== 示例4: 批量上传文件 ===');

  const config = SftpClient.loadConfig('data/sftpConfig.json', 'UAT');
  const sftp = new SftpClient();

  const files = [
    './data/payment1.txt',
    './data/payment2.txt',
    './data/payment3.txt'
  ];

  try {
    await sftp.connect(config);

    for (const file of files) {
      const fileName = file.split('/').pop();
      await sftp.uploadFile(file, `${config.remoteBasePath}upload/${fileName}`);
    }

  } finally {
    await sftp.disconnect();
  }
}

// ============================================
// 示例5: 按模式下载文件
// ============================================

async function example5_DownloadByPattern() {
  console.log('=== 示例5: 按模式下载文件 ===');

  const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
  const sftp = new SftpClient();

  try {
    await sftp.connect(config);

    // 列出目录中所有 CSV 文件
    const files = await sftp.listFiles(`${config.remoteBasePath}reports`);

    for (const file of files) {
      if (file.name.endsWith('.csv')) {
        await sftp.downloadFile(
          `${config.remoteBasePath}reports/${file.name}`,
          `./data/reports/${file.name}`
        );
      }
    }

  } finally {
    await sftp.disconnect();
  }
}

// ============================================
// 示例6: 使用 Playwright Test 集成
// ============================================

import { test } from '@playwright/test';

test('SFTP: 上传支付文件', async () => {
  const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
  const sftp = new SftpClient();

  try {
    await sftp.connect(config);

    // 执行文件上传
    await sftp.uploadFile(
      './data/AU_testData.json',
      `${config.remoteBasePath}upload/AU_testData.json`
    );

    // 验证文件上传成功
    const exists = await sftp.exists(
      `${config.remoteBasePath}upload/AU_testData.json`
    );
    test.expect(exists).toBe(true);

  } finally {
    await sftp.disconnect();
  }
});

// ============================================
// 示例7: 获取配置中的目录和文件模式
// ============================================

async function example7_UsingConfigDirectories() {
  console.log('=== 示例7: 使用配置目录 ===');

  const config = SftpClient.loadAllConfigs('data/sftpConfig.json');
  const sftp = new SftpClient();
  const sftpConfig = config.sftp['SIT'];

  try {
    await sftp.connect(sftpConfig);

    // 使用配置中的目录
    const uploadDir = config.directories?.upload || 'upload';
    const downloadDir = config.directories?.download || 'download';

    await sftp.uploadFile(
      './data/file.txt',
      `${sftpConfig.remoteBasePath}${uploadDir}/file.txt`
    );

    // 使用配置中的文件模式
    const reportPattern = config.filePatterns?.report || '*.csv';
    const files = await sftp.listFiles(`${sftpConfig.remoteBasePath}${downloadDir}`);

    console.log(`报告文件 (${reportPattern}):`, files);

  } finally {
    await sftp.disconnect();
  }
}

// ============================================
// 示例8: 处理文件归档
// ============================================

async function example8_FileArchive() {
  console.log('=== 示例8: 文件归档 ===');

  const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
  const sftp = new SftpClient();

  try {
    await sftp.connect(config);

    const uploadDir = SftpClient.getDirectory('data/sftpConfig.json', 'upload');
    const archiveDir = SftpClient.getDirectory('data/sftpConfig.json', 'archive');

    // 上传文件
    await sftp.uploadFile(
      './data/payment.txt',
      `${config.remoteBasePath}${uploadDir}/payment.txt`
    );

    // 将文件移动到归档目录
    await sftp.rename(
      `${config.remoteBasePath}${uploadDir}/payment.txt`,
      `${config.remoteBasePath}${archiveDir}/payment_${Date.now()}.txt`
    );

  } finally {
    await sftp.disconnect();
  }
}

export {
  example1_UsingConfigFile,
  example2_DirectConfig,
  example3_KeyAuthentication,
  example4_BatchUpload,
  example5_DownloadByPattern,
  example7_UsingConfigDirectories,
  example8_FileArchive
};
