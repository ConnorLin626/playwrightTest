#!/usr/bin/env node

/**
 * Playwright 测试套件运行脚本（仅 Chrome）
 * 根据命令行参数读取 test.suites.ts 配置文件，运行指定的测试套件
 *
 * 使用方法:
 * npm run test:main:chrome           # 运行 main 套件（仅 Chrome）
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 获取命令行参数，默认运行 'main' 套件
const suiteName = process.argv[2] || 'main';

console.log(`\n🚀 准备运行测试套件: ${suiteName} (Chrome)\n`);

// 读取测试套件配置
const configPath = path.resolve(__dirname, '../test.suites.ts');

if (!fs.existsSync(configPath)) {
  console.error(`❌ 配置文件不存在: ${configPath}`);
  process.exit(1);
}

// 读取配置文件内容
const configContent = fs.readFileSync(configPath, 'utf-8');

// 简化的正则表达式 - 查找套件定义
const suitePattern = new RegExp(
  `\\b${suiteName}\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*(?=,\\s*\\n|\\n\\s*\\/\\/[\\s\\S]*?\\n\\s*\\w+\\s*:|\\n\\s*\\w+\\s*:|$)`,
  'm'
);

const match = configContent.match(suitePattern);

if (!match) {
  console.error(`❌ 未找到测试套件: ${suiteName}`);
  console.error(`可用的套件: main, paytransfer, files, login`);
  process.exit(1);
}

// 提取测试文件路径 - 只匹配非注释行
const pathsString = match[1];
const lines = pathsString.split('\n');
const testPaths = [];

lines.forEach(line => {
  // 跳过注释行和空行
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('//')) return;

  // 匹配引号中的路径
  const pathMatch = trimmed.match(/"([^"]+\.test\.ts)"/);
  if (pathMatch) {
    testPaths.push(pathMatch[1]);
  }
});

if (testPaths.length === 0) {
  console.warn(`⚠️  测试套件 '${suiteName}' 中没有配置任何测试文件`);
  console.warn(`请在 test.suites.ts 中添加测试文件路径（取消注释要运行的测试）`);
  process.exit(0);
}

console.log(`✅ 找到 ${testPaths.length} 个测试文件:`);
testPaths.forEach((p, index) => {
  console.log(`   ${index + 1}. ${p}`);
});
console.log('');

// 构建 Playwright 测试命令（仅 Chrome）
const testArgs = testPaths.join(' ');
const command = `npx playwright test --headed --project=chromium ${testArgs}`;

console.log(`📝 执行命令: ${command}\n`);
console.log('='.repeat(80) + '\n');

try {
  execSync(command, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
} catch (error) {
  console.error('\n❌ 测试执行失败');
  process.exit(error.status || 1);
}
