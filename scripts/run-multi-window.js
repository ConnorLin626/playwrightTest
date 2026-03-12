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

// 清理残留的附件和配置文件
function cleanOldAttachments() {
  console.log('\n🧹 清理残留的测试结果和附件...');

  const projectRoot = path.resolve(__dirname, '..');

  // 清理旧的 test-results 目录
  const items = fs.readdirSync(projectRoot);
  items.forEach(item => {
    const itemPath = path.join(projectRoot, item);
    if (item.startsWith('test-results-') && fs.statSync(itemPath).isDirectory()) {
      try {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`  已删除: ${item}`);
      } catch (err) {
        console.warn(`  删除失败 ${item}:`, err.message);
      }
    }
  });

  // 清理旧的 playwright-report 目录中的附件
  const reportDir = path.join(projectRoot, 'playwright-report');
  if (fs.existsSync(reportDir)) {
    const attachmentsDir = path.join(reportDir, 'attachments');
    if (fs.existsSync(attachmentsDir)) {
      try {
        fs.rmSync(attachmentsDir, { recursive: true, force: true });
        console.log(`  已清理: playwright-report/attachments`);
      } catch (err) {
        console.warn(`  清理附件目录失败:`, err.message);
      }
    }
  }

  // 清理旧的 playwright-report 目录
  items.forEach(item => {
    if (item.startsWith('playwright-report-') && fs.statSync(path.join(projectRoot, item)).isDirectory()) {
      try {
        fs.rmSync(path.join(projectRoot, item), { recursive: true, force: true });
        console.log(`  已删除: ${item}`);
      } catch (err) {
        console.warn(`  删除失败 ${item}:`, err.message);
      }
    }
  });

  // 清理残留的临时配置文件
  items.forEach(item => {
    if (item.startsWith('playwright.config.') && item.endsWith('.ts') && item.includes('-')) {
      try {
        fs.unlinkSync(path.join(projectRoot, item));
        console.log(`  已删除配置文件: ${item}`);
      } catch (err) {
        console.warn(`  删除配置文件失败 ${item}:`, err.message);
      }
    }
  });

  console.log('✅ 清理完成\n');
}

// 执行清理
cleanOldAttachments();

// 清理当前会话的残留文件（Ctrl+C 时调用）
function cleanupOnExit() {
  console.log('\n\n🧹 正在清理本次测试的残留文件...');

  const projectRoot = path.resolve(__dirname, '..');

  // 清理本次运行的 test-results 目录
  const items = fs.existsSync(projectRoot) ? fs.readdirSync(projectRoot) : [];
  items.forEach(item => {
    if (item.startsWith('test-results-') && !item.startsWith('test-results-firefox-SG_ACT_NewPayeeEnhance-1773310071360')) {
      const itemPath = path.join(projectRoot, item);
      if (fs.statSync(itemPath).isDirectory()) {
        try {
          fs.rmSync(itemPath, { recursive: true, force: true });
          console.log(`  已删除: ${item}`);
        } catch (err) {
          console.warn(`  删除失败 ${item}:`, err.message);
        }
      }
    }
  });

  // 清理本次运行的临时配置文件
  items.forEach(item => {
    if (item.startsWith('playwright.config.') && item.endsWith('.ts') && item.includes('-') && !item.includes('1773310071360')) {
      try {
        fs.unlinkSync(path.join(projectRoot, item));
        console.log(`  已删除配置文件: ${item}`);
      } catch (err) {
        console.warn(`  删除配置文件失败 ${item}:`, err.message);
      }
    }
  });

  console.log('✅ 清理完成\n');
}

// 注册信号处理器
process.on('SIGINT', () => {
  console.log('\n\n⚠️  收到中断信号 (Ctrl+C)');
  cleanupOnExit();
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n\n⚠️  收到终止信号');
  cleanupOnExit();
  process.exit(1);
});

process.on('exit', () => {
  // 正常退出时也执行清理
  cleanupOnExit();
});

// 清理残留的附件
function cleanOldAttachments() {
  console.log('\n🧹 清理残留的测试结果和附件...');

  const projectRoot = path.resolve(__dirname, '..');

  // 清理旧的 test-results 目录
  const items = fs.readdirSync(projectRoot);
  items.forEach(item => {
    const itemPath = path.join(projectRoot, item);
    if (item.startsWith('test-results-') && fs.statSync(itemPath).isDirectory()) {
      try {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`  已删除: ${item}`);
      } catch (err) {
        console.warn(`  删除失败 ${item}:`, err.message);
      }
    }
  });

  // 清理旧 playwright-report 目录中的附件
  const reportDir = path.join(projectRoot, 'playwright-report');
  if (fs.existsSync(reportDir)) {
    const attachmentsDir = path.join(reportDir, 'attachments');
    if (fs.existsSync(attachmentsDir)) {
      try {
        fs.rmSync(attachmentsDir, { recursive: true, force: true });
        console.log(`  已清理: playwright-report/attachments`);
      } catch (err) {
        console.warn(`  清理附件目录失败:`, err.message);
      }
    }
  }

  // 清理旧的 playwright-report 目录
  items.forEach(item => {
    if (item.startsWith('playwright-report-') && fs.statSync(path.join(projectRoot, item)).isDirectory()) {
      try {
        fs.rmSync(path.join(projectRoot, item), { recursive: true, force: true });
        console.log(`  已删除: ${item}`);
      } catch (err) {
        console.warn(`  删除失败 ${item}:`, err.message);
      }
    }
  });

  console.log('✅ 清理完成\n');
}

// 执行清理
cleanOldAttachments();

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
  // 创建统一的报告目录和临时报告目录
  const unifiedReportDir = 'playwright-report';
  const tempReportsDir = 'temp-playwright-reports';
  const jsonReportsDir = 'temp-json-reports';
  if (!fs.existsSync(path.resolve(__dirname, '..', unifiedReportDir))) {
    fs.mkdirSync(path.resolve(__dirname, '..', unifiedReportDir), { recursive: true });
  }
  if (!fs.existsSync(path.resolve(__dirname, '..', tempReportsDir))) {
    fs.mkdirSync(path.resolve(__dirname, '..', tempReportsDir), { recursive: true });
  }
  if (!fs.existsSync(path.resolve(__dirname, '..', jsonReportsDir))) {
    fs.mkdirSync(path.resolve(__dirname, '..', jsonReportsDir), { recursive: true });
  }

  // 清空临时报告目录
  const tempReportPath = path.resolve(__dirname, '..', tempReportsDir);
  const jsonReportsPath = path.resolve(__dirname, '..', jsonReportsDir);
  if (fs.existsSync(tempReportPath)) {
    fs.readdirSync(tempReportPath).forEach(file => {
      const filePath = path.join(tempReportPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      }
    });
  }
  if (fs.existsSync(jsonReportsPath)) {
    fs.readdirSync(jsonReportsPath).forEach(file => {
      const filePath = path.join(jsonReportsPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      }
    });
  }

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

        // 生成唯一的输出目录名称，使用测试文件名+时间戳+索引
        const timestamp = Date.now();
        const testFileName = path.basename(testFile, '.test.ts');
        const outputDir = `test-results-${item.project}-${testFileName}-${timestamp}`;
        // 使用 JSON reporter 收集数据
        const jsonReportFile = `${jsonReportsDir}/${item.project}-${testFileName}-${timestamp}.json`;

        // 创建临时配置文件
        const tempConfigPath = path.resolve(__dirname, '..', `playwright.config.${item.project}-${testFileName}-${timestamp}.ts`);
        const tempConfigContent = `
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: '${jsonReportFile}' }],
    ['html', { open: 'never' }]
  ],
  timeout: 120000,
  expect: {
    timeout: 30000,
  },
  use: {
    baseURL: 'https://192.168.0.251:10444/iws/ssologin',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    headless: false,
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
  projects: [
    {
      name: '${item.project}',
      use: ${item.project === 'firefox' ? `Object.assign({}, devices['Desktop Firefox'], {
        launchOptions: {
          firefoxUserPrefs: {
            'dom.webnotifications.enabled': false,
          },
        }
      })` : `Object.assign({}, devices['Desktop Chrome'], {
        launchOptions: {
          args: ['--disable-web-security'],
        }
      })`},
    },
  ],
  outputDir: '${outputDir}',
});
`;

        fs.writeFileSync(tempConfigPath, tempConfigContent);

        const startTime = Date.now();

        const process = spawn('npx', [
          'playwright', 'test', '--headed',
          `--config=${tempConfigPath}`,
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
              duration,
              outputDir
            });
            if (code !== 0) {
              allPassed = false;
            }
            // 清理临时配置文件
            if (fs.existsSync(tempConfigPath)) {
              fs.unlinkSync(tempConfigPath);
            }
            procResolve();
          });

          process.on('error', (err) => {
            console.error(`      ❌ [${item.name}] ${testFile} 启动失败: ${err.message}\n`);
            allPassed = false;
            // 清理临时配置文件
            if (fs.existsSync(tempConfigPath)) {
              fs.unlinkSync(tempConfigPath);
            }
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
        duration: totalDuration,
        testResults: windowResults
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

  // 合并所有 JSON 报告并生成 HTML 报告
  console.log('\n🔄 正在生成统一 HTML 报告...');

  // 清空统一报告目录（保留 attachments）
  const unifiedReportPath = path.resolve(__dirname, '..', unifiedReportDir);
  const attachmentsDir = path.join(unifiedReportPath, 'attachments');
  if (fs.existsSync(unifiedReportPath)) {
    fs.readdirSync(unifiedReportPath).forEach(file => {
      const filePath = path.join(unifiedReportPath, file);
      // 跳过 attachments 目录
      if (file === 'attachments') return;
      if (fs.statSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    });
  }
  // 确保 attachments 目录存在
  if (!fs.existsSync(attachmentsDir)) {
    fs.mkdirSync(attachmentsDir, { recursive: true });
  }

  // 收集所有 JSON 报告
  let mergedData = { suites: [], config: { projects: [] } };
  // jsonReportsPath 已在函数开始处声明

  if (fs.existsSync(jsonReportsPath)) {
    const jsonFiles = fs.readdirSync(jsonReportsPath).filter(f => f.endsWith('.json'));
    jsonFiles.forEach(jsonFile => {
      const jsonFilePath = path.join(jsonReportsPath, jsonFile);
      try {
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        if (data.suites) {
          mergedData.suites = mergedData.suites.concat(data.suites);
        }
      } catch (err) {
        console.warn(`⚠️  警告：无法读取 JSON 报告 ${jsonFile}`);
      }
    });
  }

  // 写入合并后的 JSON 报告
  const mergedJsonPath = path.join(unifiedReportPath, 'report.json');
  fs.writeFileSync(mergedJsonPath, JSON.stringify(mergedData, null, 2));

  // 收集所有 test-results 目录并添加附件信息
  const testResultsDirs = fs.readdirSync(path.resolve(__dirname, '..'))
    .filter(dir => dir.startsWith('test-results-') && fs.statSync(path.join(path.resolve(__dirname, '..'), dir)).isDirectory());

  testResultsDirs.forEach(resultsDir => {
    const resultsPath = path.join(path.resolve(__dirname, '..'), resultsDir);
    // 查找测试失败时的附件
    const attachments = findAttachments(resultsPath);
    // 将附件信息添加到 mergedData 中
    addAttachmentsToSuite(mergedData.suites, resultsDir, attachments);
  });

  // 复制附件到报告目录
  console.log('\n📁 正在复制附件...');
  const copiedAttachments = copyAttachmentsToReport(unifiedReportPath);

  console.log('✅ 测试报告生成完成');

  // 清理临时报告目录
  if (fs.existsSync(tempReportPath)) {
    fs.rmSync(tempReportPath, { recursive: true, force: true });
  }
  if (fs.existsSync(jsonReportsPath)) {
    fs.rmSync(jsonReportsPath, { recursive: true, force: true });
  }

  // 输出总结
  console.log('\n' + '='.repeat(80));
  console.log('📊 测试结果总结:\n');
  results.forEach(result => {
    const status = result.code === 0 ? '✅ 通过' : '❌ 失败';
    console.log(`   ${status} - ${result.name} (耗时: ${result.duration}s)`);
    // 输出每个测试用例的报告路径
    result.testResults?.forEach(tr => {
      console.log(`      📄 ${tr.testFile}`);
      console.log(`         结果: ${tr.outputDir}/`);
    });
  });

  const failedTests = results.filter(r => r.code !== 0).length;
  if (failedTests > 0) {
    console.log(`\n❌ 有 ${failedTests} 个窗口测试失败`);
  } else {
    console.log('\n✅ 所有窗口测试都通过！');
  }

  // 生成测试报告
  console.log('\n📊 测试结果已保存');

  // 提示用户查看报告
  console.log('\n💡 测试报告已生成:');
  console.log('   统一 HTML 报告: playwright-report/index.html');
  console.log('   各测试结果目录:');
  console.log('   - test-results-{project}-{testName}-{timestamp}/');
  console.log('\n   查看报告，请运行:');
  console.log('   npx playwright show-report\n');

  // 返回测试结果状态
  return { success: failedTests === 0, failedTests };
}

// 查找测试结果目录中的附件
function findAttachments(resultsDir) {
  const attachments = [];
  const dir = path.join(path.resolve(__dirname, '..'), resultsDir);

  if (!fs.existsSync(dir)) return attachments;

  const walk = (currentPath) => {
    const items = fs.readdirSync(currentPath);
    items.forEach(item => {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        walk(itemPath);
      } else {
        // 收集图片、视频等文件
        const ext = path.extname(item).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
          attachments.push({
            name: item,
            path: path.join(resultsDir, path.relative(dir, itemPath)).replace(/\\/g, '/'),
            contentType: `image/${ext.slice(1)}`,
            type: 'image'
          });
        } else if (['.webm', '.mp4', '.avi'].includes(ext)) {
          attachments.push({
            name: item,
            path: path.join(resultsDir, path.relative(dir, itemPath)).replace(/\\/g, '/'),
            contentType: `video/${ext.slice(1)}`,
            type: 'video'
          });
        } else if (['.txt', '.md', '.log'].includes(ext)) {
          attachments.push({
            name: item,
            path: path.join(resultsDir, path.relative(dir, itemPath)).replace(/\\/g, '/'),
            type: 'file'
          });
        }
      }
    });
  };

  walk(dir);
  return attachments;
}

// 将附件信息添加到测试套件中
function addAttachmentsToSuite(suites, resultsDir, attachments) {
  suites.forEach(suite => {
    if (suite.specs && suite.specs.length > 0) {
      suite.specs.forEach(spec => {
        if (spec.tests && spec.tests.length > 0) {
          spec.tests.forEach(test => {
            const result = test.results[0];
            if (result && !result.attachments) {
              result.attachments = [];
            }
            // 将附件添加到测试结果中
            if (result) {
              attachments.forEach(att => {
                result.attachments.push({
                  name: att.type === 'image' ? 'Screenshot' : att.type === 'video' ? 'Video' : att.name,
                  path: att.path,
                  contentType: att.contentType
                });
              });
            }
          });
        }
      });
    }
    if (suite.suites && suite.suites.length > 0) {
      addAttachmentsToSuite(suite.suites, resultsDir, attachments);
    }
  });
}

// 生成简单的 HTML 报告
function generateHtmlReport(data, copiedAttachments) {
  let testHtml = '';

  function processSuite(suite, parentTitle = '') {
    const currentTitle = parentTitle ? `${parentTitle} > ${suite.title}` : suite.title;

    // 处理当前套件的 specs
    if (suite.specs && suite.specs.length > 0) {
      suite.specs.forEach(spec => {
        if (spec.tests && spec.tests.length > 0) {
          spec.tests.forEach(test => {
            const result = test.results[0];
            const status = result?.status || 'unknown';
            const statusClass = status === 'passed' ? 'passed' : 'failed';
            const statusIcon = status === 'passed' ? '✅' : '❌';
            const duration = result?.duration || 0;
            const testTitle = test.title || spec.title || '未命名测试';

            // 收集附件
            let attachmentsHtml = '';
            if (result && result.attachments && result.attachments.length > 0) {
              result.attachments.forEach((att, idx) => {
                const attName = att.name || `附件 ${idx + 1}`;
                const attPath = att.path || '';

                // 查找复制后的附件
                const attFileName = path.basename(attPath);
                let matchedAttachment = copiedAttachments.find(a => a.newName.includes(attFileName));
                if (!matchedAttachment) {
                  const attNameWithoutExt = path.basename(attPath, path.extname(attPath));
                  matchedAttachment = copiedAttachments.find(a => {
                    const aNameWithoutExt = path.basename(a.newName, path.extname(a.newName));
                    return aNameWithoutExt.includes(attNameWithoutExt) || attNameWithoutExt.includes('test_failed_1');
                  });
                }
                if (!matchedAttachment && attFileName === 'test-failed-1.png') {
                  matchedAttachment = copiedAttachments.find(a => a.newName.includes('test_failed_1'));
                }
                if (!matchedAttachment && attFileName === 'error-context.md') {
                  matchedAttachment = copiedAttachments.find(a => a.newName.includes('error_context'));
                }

                if (att.contentType && att.contentType.includes('image')) {
                  if (matchedAttachment) {
                    attachmentsHtml += `
                      <div class="attachment">
                        <strong>${attName}:</strong><br>
                        <img src="attachments/${matchedAttachment.newName}" alt="${attName}" style="max-width: 100%; border: 1px solid #ddd; border-radius: 4px;">
                      </div>
                    `;
                  }
                } else if (att.contentType && att.contentType.includes('video')) {
                  if (matchedAttachment) {
                    attachmentsHtml += `
                      <div class="attachment">
                        <strong>${attName}:</strong><br>
                        <video controls style="max-width: 100%; border: 1px solid #ddd; border-radius: 4px;">
                          <source src="attachments/${matchedAttachment.newName}" type="${att.contentType}">
                        </video>
                      </div>
                    `;
                  }
                } else if (att.path) {
                  if (matchedAttachment) {
                    attachmentsHtml += `
                      <div class="attachment">
                        <strong>${attName}:</strong>
                        <a href="attachments/${matchedAttachment.newName}" target="_blank">查看文件</a>
                      </div>
                    `;
                  }
                }
              });
            }

            // 错误信息
            let errorHtml = '';
            if (result && result.errors && result.errors.length > 0) {
              errorHtml = result.errors.map(err => `<div class="error">${err.message || err}</div>`).join('');
            }

            testHtml += `
              <tr class="test-row ${statusClass}">
                <td>${statusIcon}</td>
                <td>${currentTitle}</td>
                <td>
                  <div style="font-weight: 500;">${testTitle}</div>
                  ${errorHtml ? `<div class="error-container">${errorHtml}</div>` : ''}
                  ${attachmentsHtml ? `<div class="attachments">${attachmentsHtml}</div>` : ''}
                </td>
                <td>${status}</td>
                <td>${(duration / 1000).toFixed(2)}s</td>
              </tr>
            `;
          });
        }
      });
    }

    // 递归处理子套件
    if (suite.suites && suite.suites.length > 0) {
      suite.suites.forEach(childSuite => {
        processSuite(childSuite, currentTitle);
      });
    }
  }

  // 处理所有顶层套件
  if (data.suites && data.suites.length > 0) {
    data.suites.forEach(suite => {
      processSuite(suite);
    });
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playwright Test Report</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      vertical-align: top;
    }
    th {
      background: #f8f9fa;
      font-weight: 600;
    }
    .passed { color: #28a745; }
    .failed { color: #dc3545; }
    .unknown { color: #6c757d; }
    .test-row:hover {
      background: #f8f9fa;
    }
    .error-container {
      margin-top: 8px;
    }
    .error {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      color: #856404;
      margin-bottom: 4px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .attachments {
      margin-top: 12px;
    }
    .attachment {
      margin-bottom: 12px;
    }
    .attachment strong {
      display: block;
      margin-bottom: 4px;
      color: #666;
      font-size: 13px;
    }
    .attachment img,
    .attachment video {
      max-width: 600px;
      display: block;
    }
    .attachment a {
      color: #007bff;
      text-decoration: none;
    }
    .attachment a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Playwright 测试报告</h1>
    <table>
      <thead>
        <tr>
          <th style="width: 50px;">状态</th>
          <th style="width: 250px;">套件</th>
          <th>测试用例</th>
          <th style="width: 80px;">结果</th>
          <th style="width: 80px;">耗时</th>
        </tr>
      </thead>
      <tbody>
        ${testHtml}
      </tbody>
    </table>
  </div>
</body>
</html>`;
}

// 复制附件到报告目录
function copyAttachmentsToReport(reportPath) {
  const attachmentsDir = path.join(reportPath, 'attachments');
  const projectRoot = path.resolve(__dirname, '..');
  const attachments = [];

  // 收集所有 test-results 目录中的附件
  const testResultsDirs = fs.readdirSync(projectRoot)
    .filter(dir => dir.startsWith('test-results-') && fs.statSync(path.join(projectRoot, dir)).isDirectory());

  testResultsDirs.forEach(resultsDir => {
    const resultsPath = path.join(projectRoot, resultsDir);
    walkAttachments(resultsPath, resultsDir, attachments, projectRoot);
  });

  // 复制附件到报告目录
  attachments.forEach(att => {
    const srcPath = path.join(projectRoot, att.originalPath);
    const destPath = path.join(attachmentsDir, att.newName);

    if (fs.existsSync(srcPath)) {
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log('已复制附件:', att.newName);
      } catch (err) {
        console.warn('复制附件失败:', att.newName, err.message);
      }
    }
  });

  return attachments;
}

// 遍历目录收集附件
function walkAttachments(dir, baseDir, attachments, projectRoot) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      walkAttachments(itemPath, baseDir, attachments, projectRoot);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.webm', '.mp4', '.avi', '.txt', '.md', '.log'].includes(ext)) {
        const relPath = path.relative(path.join(projectRoot, baseDir), itemPath);
        const newName = `${baseDir.replace(/[^a-zA-Z0-9]/g, '_')}_${relPath.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        attachments.push({
          originalPath: path.join(baseDir, relPath),
          newName: newName
        });
      }
    }
  });
}

runTests().then((result) => {
  console.log('\n🎉 所有测试执行完成！');
  console.log('正在生成新的测试报告...');

  try {
    // 使用绝对路径执行报告生成脚本
    const scriptPath = path.resolve(__dirname, 'generate-report.js');
    execSync(`node "${scriptPath}"`, { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });
    console.log('✅ 新报告生成完成！');

    // 根据测试结果设置退出码
    process.exit(result.success ? 0 : 1);
  } catch (err) {
    console.warn('⚠️ 报告生成失败:', err.message);
    process.exit(result.success ? 1 : 0);
  }
}).catch(error => {
  console.error('\n❌ 测试执行失败:', error.message);
  process.exit(1);
});
