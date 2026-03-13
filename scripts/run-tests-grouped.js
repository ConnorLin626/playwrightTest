#!/usr/bin/env node

/**
 * Playwright 分组并行测试脚本
 * 
 * 功能说明：
 * 1. 自动扫描测试文件，识别其读取的测试数据文件
 * 2. 按测试数据文件分组（同一组使用相同测试数据，避免冲突）
 * 3. 分组间并行执行，分组内串行执行
 * 4. 所有测试完成后整合统一报告
 *
 * 使用方法:
 * npm run test:headed                # 运行 main 套件
 * npm run test:headed:paytransfer    # 运行 paytransfer 套件
 */

const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

// 获取命令行参数，默认运行 'main' 套件
const suiteName = process.argv[2] || 'main';

console.log(`\n🚀 准备运行测试套件: ${suiteName} (分组并行模式)\n`);

// 项目根目录
const projectRoot = path.resolve(__dirname, '..');

// 读取测试套件配置
const configPath = path.resolve(projectRoot, 'test.suites.ts');

if (!fs.existsSync(configPath)) {
  console.error(`❌ 配置文件不存在: ${configPath}`);
  process.exit(1);
}

// 读取配置文件内容
const configContent = fs.readFileSync(configPath, 'utf-8');

// 提取测试文件路径 - 只匹配非注释行
function extractTestPaths(suiteName) {
  const suitePattern = new RegExp(
    `\\b${suiteName}\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*(?=,\\s*\\n|\\n\\s*\\/\\/[\\s\\S]*?\\n\\s*\\w+\\s*:|\\n\\s*\\w+\\s*:|$)`,
    'm'
  );

  const match = configContent.match(suitePattern);

  if (!match) {
    return [];
  }

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

// 扫描测试文件，识别其读取的测试数据文件
function detectTestDataFile(testFilePath) {
  const fullPath = path.resolve(projectRoot, testFilePath);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  测试文件不存在: ${testFilePath}`);
    return 'unknown';
  }

  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  
  // 匹配 testDataPath 中的数据文件名
  const patterns = [
    /testDataPath\s*=\s*path\.join\(process\.cwd\(\),\s*['"]data['"],\s*['"]([^'"]+\.json)['"]\)/,
    /['"]data\/([^'"]+\.json)['"]/,
  ];

  for (const pattern of patterns) {
    const match = fileContent.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // 如果是 login.spec.ts 等特殊文件，返回 'common'
  if (testFilePath.includes('login.spec.ts') || testFilePath.includes('login.test.ts')) {
    return 'common';
  }

  return 'default';
}

// 按测试数据文件分组
function groupTestsByDataFile(testPaths) {
  const groups = {};

  testPaths.forEach(testPath => {
    const dataFile = detectTestDataFile(testPath);
    
    if (!groups[dataFile]) {
      groups[dataFile] = [];
    }
    groups[dataFile].push(testPath);
  });

  return groups;
}

// 提取测试文件路径
const testPaths = extractTestPaths(suiteName);

if (testPaths.length === 0) {
  console.warn(`⚠️  测试套件 '${suiteName}' 中没有配置任何测试文件`);
  console.warn(`请在 test.suites.ts 中添加测试文件路径（取消注释要运行的测试）`);
  process.exit(0);
}

// 按测试数据文件分组
const groups = groupTestsByDataFile(testPaths);

// 显示分组信息
console.log(`✅ 找到 ${testPaths.length} 个测试文件，分为 ${Object.keys(groups).length} 个组:\n`);

Object.entries(groups).forEach(([dataFile, tests], groupIndex) => {
  console.log(`📦 组 ${groupIndex + 1} [${dataFile}]:`);
  tests.forEach((test, testIndex) => {
    console.log(`   ${testIndex + 1}. ${test}`);
  });
  console.log('');
});

console.log('='.repeat(80));
console.log('📝 开始执行分组并行测试...\n');

// 创建 blob 报告目录
const blobReportsDir = path.resolve(projectRoot, 'blob-reports');

// 清理并创建目录
function setupBlobReportsDir() {
  if (fs.existsSync(blobReportsDir)) {
    const files = fs.readdirSync(blobReportsDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(blobReportsDir, file));
    });
  } else {
    fs.mkdirSync(blobReportsDir, { recursive: true });
  }
}

setupBlobReportsDir();

// 执行单个测试文件（输出 blob 报告）
function runSingleTest(testFile, groupName, index) {
  return new Promise((resolve, reject) => {
    const testFileName = path.basename(testFile, '.test.ts');
    const timestamp = Date.now();
    const blobReportName = `${groupName.replace(/[^a-zA-Z0-9]/g, '_')}-${testFileName}-${timestamp}.zip`;
    
    console.log(`🔵 [${groupName}] 开始执行: ${testFile}`);

    const args = [
      'playwright', 'test',
      '--headed',
      '--project=chromium',
      '--reporter=blob,list',
      testFile
    ];

    // 设置环境变量指定 blob 报告名称
    const env = {
      ...process.env,
      PLAYWRIGHT_BLOB_OUTPUT_NAME: path.join(blobReportsDir, blobReportName)
    };

    const proc = spawn('npx', args, {
      cwd: projectRoot,
      shell: true,
      stdio: 'pipe',
      env: env
    });

    let output = '';
    let errorOutput = '';

    proc.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      // 打印关键信息
      const lines = text.split('\n').filter(line => line.trim());
      lines.forEach(line => {
        if (line.includes('✓') || line.includes('✗') || line.includes('passed') || line.includes('failed') || line.includes('Error')) {
          console.log(`   [${groupName}] ${line}`);
        }
      });
    });

    proc.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    proc.on('close', (code) => {
      const status = code === 0 ? '✅' : '❌';
      console.log(`${status} [${groupName}] 完成: ${testFile} (退出码: ${code})\n`);
      
      resolve({
        testFile,
        groupName,
        code,
        blobReportName,
        output,
        errorOutput
      });
    });

    proc.on('error', (err) => {
      console.error(`❌ [${groupName}] 执行失败: ${testFile} - ${err.message}`);
      reject(err);
    });
  });
}

// 执行一个分组（组内串行）
async function runGroup(groupName, testFiles) {
  console.log(`\n🚀 [组: ${groupName}] 开始执行 ${testFiles.length} 个测试文件\n`);
  const startTime = Date.now();
  const results = [];
  const blobReports = [];

  for (let i = 0; i < testFiles.length; i++) {
    const testFile = testFiles[i];
    console.log(`[${groupName}] 进度: ${i + 1}/${testFiles.length}`);
    
    try {
      const result = await runSingleTest(testFile, groupName, i);
      results.push(result);
      if (result.blobReportName) {
        blobReports.push(result.blobReportName);
      }
    } catch (error) {
      results.push({
        testFile,
        groupName,
        code: 1,
        error: error.message
      });
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const passed = results.filter(r => r.code === 0).length;
  const failed = results.filter(r => r.code !== 0).length;

  console.log(`\n📊 [组: ${groupName}] 完成 - 通过: ${passed}, 失败: ${failed}, 耗时: ${duration}s\n`);
  console.log('='.repeat(80));

  return {
    groupName,
    results,
    blobReports,
    duration,
    passed,
    failed
  };
}

// 合并 blob 报告
function mergeBlobReports() {
  console.log('\n🔄 正在合并测试报告...');
  
  const blobFiles = fs.readdirSync(blobReportsDir).filter(f => f.endsWith('.zip'));
  
  if (blobFiles.length === 0) {
    console.log('⚠️  没有找到 blob 报告文件');
    return false;
  }

  console.log(`   找到 ${blobFiles.length} 个报告文件需要合并`);

  try {
    // 使用 playwright merge-reports 命令合并报告
    const command = `npx playwright merge-reports --reporter=html "${blobReportsDir}"`;
    console.log(`   执行: ${command}`);
    
    execSync(command, {
      cwd: projectRoot,
      stdio: 'inherit'
    });
    
    console.log('✅ 报告合并完成！');
    return true;
  } catch (error) {
    console.error('❌ 报告合并失败:', error.message);
    return false;
  }
}

// 主函数：并行执行所有分组
async function runAllGroups() {
  const startTime = Date.now();
  const groupEntries = Object.entries(groups);
  
  // 并行执行所有分组
  const groupPromises = groupEntries.map(([dataFile, tests]) => {
    return runGroup(dataFile, tests);
  });

  // 等待所有分组完成
  const allResults = await Promise.all(groupPromises);

  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);

  // 汇总结果
  console.log('\n' + '='.repeat(80));
  console.log('📊 测试结果汇总\n');

  let totalPassed = 0;
  let totalFailed = 0;

  allResults.forEach(groupResult => {
    const status = groupResult.failed === 0 ? '✅' : '❌';
    console.log(`${status} [${groupResult.groupName}] 通过: ${groupResult.passed}, 失败: ${groupResult.failed}, 耗时: ${groupResult.duration}s`);
    totalPassed += groupResult.passed;
    totalFailed += groupResult.failed;
  });

  console.log('\n' + '-'.repeat(80));
  console.log(`📈 总计: 通过 ${totalPassed}, 失败 ${totalFailed}, 总耗时 ${totalDuration}s`);
  console.log('='.repeat(80));

  // 合并 blob 报告
  mergeBlobReports();

  // 清理 blob 报告目录
  try {
    fs.rmSync(blobReportsDir, { recursive: true, force: true });
    console.log('🧹 已清理临时报告文件');
  } catch (e) {
    // 忽略清理错误
  }

  // 显示报告路径
  const reportDir = path.resolve(projectRoot, 'playwright-report');
  if (fs.existsSync(reportDir)) {
    console.log(`\n📄 测试报告: playwright-report/index.html`);
    console.log(`   查看报告: npx playwright show-report\n`);
  }

  // 返回退出码
  const exitCode = totalFailed > 0 ? 1 : 0;
  
  if (totalFailed > 0) {
    console.log(`\n❌ 有 ${totalFailed} 个测试失败`);
  } else {
    console.log('\n✅ 所有测试通过！');
  }

  process.exit(exitCode);
}

// 注册信号处理器
process.on('SIGINT', () => {
  console.log('\n\n⚠️  收到中断信号 (Ctrl+C)');
  // 清理临时文件
  try {
    fs.rmSync(blobReportsDir, { recursive: true, force: true });
  } catch (e) {}
  process.exit(1);
});

// 开始执行
runAllGroups().catch(error => {
  console.error('\n❌ 测试执行失败:', error.message);
  process.exit(1);
});
