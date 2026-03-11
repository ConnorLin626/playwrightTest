/**
 * SFTP 日志路径查找工具
 * 用于查找服务器上日志文件的正确路径
 */

import { SftpClient } from '../utils';
import * as path from 'path';

async function findLogFiles() {
  const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
  const sftp = new SftpClient();

  console.log('=== SFTP 日志路径查找工具 ===\n');

  try {
    await sftp.connect(config);
    console.log(`✓ 已连接到 ${config.host}\n`);

    // 要检查的常见日志路径
    const pathsToCheck = [
      '/logs',
      '/logs/cash',
      '/logs/cash/corpbanking',
      '/log',
      '/log/cash',
      '/var/log',
      '/opt/logs',
      '/home/batch/logs',
      '/sftp/logs',
      '/',
    ];

    console.log('=== 检查目录结构 ===\n');

    for (const checkPath of pathsToCheck) {
      try {
        const exists = await sftp.exists(checkPath);
        if (exists) {
          console.log(`✓ 目录存在: ${checkPath}`);
          try {
            const files = await sftp.listFiles(checkPath);
            if (files.length > 0) {
              console.log(`  文件/子目录 (${files.length} 个):`);
              // 只显示前20个
              const displayFiles = files.slice(0, 20);
              for (const f of displayFiles) {
                const type = f.type === 'd' ? '[目录]' : '[文件]';
                const size = f.size ? ` ${(f.size / 1024).toFixed(1)}KB` : '';
                console.log(`    ${type} ${f.name}${size}`);
              }
              if (files.length > 20) {
                console.log(`    ... 还有 ${files.length - 20} 个`);
              }
            } else {
              console.log(`  (空目录)`);
            }
          } catch (e: any) {
            console.log(`  无法列出: ${e.message}`);
          }
          console.log('');
        }
      } catch (e) {
        // 路径不存在，跳过
      }
    }

    console.log('=== 尝试查找 eplog 相关文件 ===\n');

    // 递归搜索日志文件（限制深度）
    await searchForLogFiles(sftp, '/', 'eplog', 3, 0);

  } catch (error) {
    console.error('错误:', error);
  } finally {
    await sftp.disconnect();
  }
}

/**
 * 递归搜索日志文件
 */
async function searchForLogFiles(
  sftp: SftpClient,
  dirPath: string,
  keyword: string,
  maxDepth: number,
  currentDepth: number
): Promise<void> {
  if (currentDepth > maxDepth) return;

  try {
    const exists = await sftp.exists(dirPath);
    if (!exists) return;

    const files = await sftp.listFiles(dirPath);

    for (const file of files) {
      const fullPath = path.posix.join(dirPath, file.name);

      // 检查文件名是否包含关键词
      if (file.name.toLowerCase().includes(keyword.toLowerCase())) {
        console.log(`✓ 找到匹配文件: ${fullPath}`);
        console.log(`  大小: ${(file.size / 1024).toFixed(2)} KB`);
        console.log(`  修改时间: ${file.modifyTime}`);
        console.log('');
      }

      // 如果是目录且不是 . 或 ..，递归搜索
      if (file.type === 'd' && !file.name.startsWith('.')) {
        await searchForLogFiles(sftp, fullPath, keyword, maxDepth, currentDepth + 1);
      }
    }
  } catch (e) {
    // 权限问题或其他错误，跳过
  }
}

// 运行查找工具
findLogFiles().catch(console.error);
