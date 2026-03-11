/**
 * SFTP 日志路径查找工具
 * 运行: npx ts-node src/tools/findSftpLog.ts
 */

import { SftpClient } from '../pages/utils';

async function findLogFile() {
  console.log('=== 查找 SFTP 日志文件 ===\n');

  const config = SftpClient.loadConfig('data/sftpConfig.json', 'SIT');
  const sftp = new SftpClient();

  try {
    await sftp.connect(config);
    console.log(`✓ 已连接到 ${config.host}:${config.port}\n`);

    // 常见日志路径
    const paths = [
      '/eplog',
      '/eplog/eplog.txt',
      '/ep_log',
      '/ep_log/eplog.txt',
      '/logs',
      '/logs/cash',
      '/logs/cash/corpbanking',
      '/var/log',
      '/opt',
      '/home/batch',
      '/home/batch/logs',
      '/sftp',
    ];

    console.log('=== 扫描目录 ===\n');

    for (const p of paths) {
      try {
        const exists = await sftp.exists(p);
        if (exists) {
          console.log(`✓ 目录存在: ${p}`);
          try {
            const files = await sftp.list(p);
            for (const f of files.slice(0, 10)) {
              const type = f.type === 'd' ? '[DIR]' : '[FILE]';
              console.log(`    ${type} ${f.name}`);
            }
          } catch {
            console.log(`    (无法列出)`);
          }
        }
      } catch {
        // 不存在
      }
    }

    console.log('\n=== 搜索包含 ep 的文件 ===\n');

    // 递归搜索
    await searchRecursive(sftp, '/', 'ep', 2, 0);

  } catch (error) {
    console.error('错误:', error);
  } finally {
    await sftp.disconnect();
  }
}

async function searchRecursive(
  sftp: SftpClient,
  dir: string,
  keyword: string,
  maxDepth: number,
  depth: number
): Promise<void> {
  if (depth > maxDepth) return;

  try {
    const exists = await sftp.exists(dir);
    if (!exists) return;

    const files = await sftp.list(dir);

    for (const f of files) {
      const fullPath = `${dir}/${f.name}`.replace('//', '/');

      if (f.name.toLowerCase().includes(keyword)) {
        console.log(`✓ 找到: ${fullPath} (${f.size} bytes)`);
      }

      if (f.type === 'd' && !f.name.startsWith('.')) {
        await searchRecursive(sftp, fullPath, keyword, maxDepth, depth + 1);
      }
    }
  } catch {
    // 权限问题
  }
}

findLogFile().catch(console.error);
