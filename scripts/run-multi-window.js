#!/usr/bin/env node

/**
 * Playwright 多窗口并行测试脚本
 * 窗口A (chromium) 执行 windowA 套件
 * 窗口B (chromium2) 执行 windowB 套件
 * 窗口C (firefox) 执行 windowC 套件
 *
 * 使用方法:
 * npm run test:multi-window
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 准备运行多窗口并行测试\n');
console.log('='.repeat(80));

// 读取测试套件配置
const configPath = path.resolve(__dirname, '../test.suites.ts');

if (!fs.existsSync(configPath)) {
  console.error(`❌ 配置文件不存在: ${configPath}`);
  process.exit(1);
}

// 读取配置文件内容
const configContent = fs.readFileSync(configPath, 'utf-8');

// 提取套件定义的函数
function extractSuite(suiteName) {
  const suitePattern = new RegExp(
    `\\b${suiteName}\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*(?=,\\s*\\n|\\n\\s*\\/\\/[\\s\\S]*?\\n\\s*\\w+\\s*:|\\n\\s*\\w+\\s*:|$)`,
    'm'
  );

  const match = configContent.match(suitePattern);

  if (!match) {
    return [];
  }

  // 提取测试文件路径
  const pathsString = match[1];
  const lines = pathsString.split('\n');
  const testPaths = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) return;

    const pathMatch = trimmed.match(/"([^"]+\.test\.ts)"/);
    if (pathMatch) {
      testPaths.push(pathMatch[1]);
    }
  });

  return testPaths;
}

// 提取三个窗口的测试用例
const windowATests = extractSuite('windowA');
const windowBTests = extractSuite('windowB');
const windowCTests = extractSuite('windowC');

// 显示配置信息
console.log('\n📋 测试配置:');
console.log(`   窗口A (chromium): ${windowATests.length} 个测试用例`);
windowATests.forEach((p, index) => {
  console.log(`      ${index + 1}. ${p}`);
});
console.log(`   窗口B (chromium2): ${windowBTests.length} 个测试用例`);
windowBTests.forEach((p, index) => {
  console.log(`      ${index + 1}. ${p}`);
});
console.log(`   窗口C (firefox): ${windowCTests.length} 个测试用例`);
windowCTests.forEach((p, index) => {
  console.log(`      ${index + 1}. ${p}`);
});

if (windowATests.length === 0 && windowBTests.length === 0 && windowCTests.length === 0) {
  console.warn('\n⚠️  三个窗口都没有配置任何测试文件');
  console.warn('请在 test.suites.ts 的 windowA、windowB 和 windowC 中添加测试文件路径');
  process.exit(0);
}

console.log('\n' + '='.repeat(80));
console.log('📝 开始执行并行测试...\n');

async function runTests() {
  // 构建并行测试命令
  const commands = [];

  // 窗口A - chromium 项目
  if (windowATests.length > 0) {
    const testArgs = windowATests.join(' ');
    commands.push({
      name: '窗口A (chromium)',
      project: 'chromium',
      tests: windowATests
    });
  }

  // 窗口B - chromium2 项目
  if (windowBTests.length > 0) {
    const testArgs = windowBTests.join(' ');
    commands.push({
      name: '窗口B (chromium2)',
      project: 'chromium2',
      tests: windowBTests
    });
  }

  // 窗口C - firefox 项目
  if (windowCTests.length > 0) {
    const testArgs = windowCTests.join(' ');
    commands.push({
      name: '窗口C (firefox)',
      project: 'firefox',
      tests: windowCTests
    });
  }

  // 并行执行所有命令
  const results = [];
  const { spawn } = require('child_process');

  const promises = commands.map((item) => {
    return new Promise(async (resolve, reject) => {
      console.log(`🔵 [${item.name}] 启动测试...`);

      const windowStartTime = Date.now();
      const windowResults = [];
      let allPassed = true;

      // 串行执行该窗口内的所有测试用例
      for (let i = 0; i < item.tests.length; i++) {
        const testFile = item.tests[i];
        console.log(`   [${item.name}] 开始执行测试 ${i + 1}/${item.tests.length}: ${testFile}`);

        const startTime = Date.now();
        const process = spawn('npx', [
          'playwright', 'test', '--headed',
          `--project=${item.project}`,
          testFile
        ], {
          cwd: path.resolve(__dirname, '..'),
          shell: true,
          stdio: 'pipe'
        });

        await new Promise((procResolve, procReject) => {
          process.stdout.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach(line => {
              if (line.trim()) {
                console.log(`[${item.name}] ${line}`);
              }
            });
          });

          process.stderr.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach(line => {
              if (line.trim()) {
                console.log(`[${item.name}] ${line}`);
              }
            });
          });

          process.on('close', (code) => {
            const duration = ((Date.now() - startTime) / 1000).toFixed(2);
            const status = code === 0 ? '✅' : '❌';
            console.log(`      ${status} [${item.name}] ${testFile} (耗时: ${duration}s)\n`);
            windowResults.push({
              testFile,
              code,
              duration
            });
            if (code !== 0) {
              allPassed = false;
            }
            procResolve();
          });

          process.on('error', (err) => {
            console.error(`      ❌ [${item.name}] ${testFile} 启动失败: ${err.message}\n`);
            allPassed = false;
            procResolve();
          });
        });
      }

      const totalDuration = ((Date.now() - windowStartTime) / 1000).toFixed(2);
      const status = allPassed ? '✅' : '❌';
      console.log(`${status} [${item.name}] 所有测试完成 (总耗时: ${totalDuration}s)\n`);
      results.push({
        name: item.name,
        code: allPassed ? 0 : 1,
        duration: totalDuration
      });

      if (allPassed) {
        resolve();
      } else {
        reject(new Error(`${item.name} 测试失败`));
      }
    });
  });

  // 等待所有测试完成
  await Promise.allSettled(promises);

  // 输出总结
  console.log('\n' + '='.repeat(80));
  console.log('📊 测试结果总结:\n');
  results.forEach(result => {
    const status = result.code === 0 ? '✅ 通过' : '❌ 失败';
    console.log(`   ${status} - ${result.name} (耗时: ${result.duration}s)`);
  });

  const failedTests = results.filter(r => r.code !== 0).length;
  if (failedTests > 0) {
    console.log(`\n❌ 有 ${failedTests} 个窗口测试失败`);
    process.exit(1);
  } else {
    console.log('\n✅ 所有窗口测试都通过！');
    process.exit(0);
  }

}

runTests().catch(error => {
  console.error('\n❌ 测试执行失败:', error.message);
  process.exit(1);
});
