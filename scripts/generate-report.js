const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const reportDir = path.join(projectRoot, 'playwright-report');
const attachmentsDir = path.join(reportDir, 'attachments');

// 确保附件目录存在
if (!fs.existsSync(attachmentsDir)) {
  fs.mkdirSync(attachmentsDir, { recursive: true });
}

// 读取报告数据
const reportJsonPath = path.join(reportDir, 'report.json');
if (!fs.existsSync(reportJsonPath)) {
  console.error('❌ report.json 不存在:', reportJsonPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(reportJsonPath, 'utf-8'));
if (!fs.existsSync(attachmentsDir)) {
  fs.mkdirSync(attachmentsDir, { recursive: true });
}

// 复制附件函数
function copyAttachments() {
  const attachments = [];

  // 收集所有 test-results 目录中的附件
  const testResultsDirs = fs.readdirSync(projectRoot)
    .filter(dir => dir.startsWith('test-results-') && fs.statSync(path.join(projectRoot, dir)).isDirectory());

  testResultsDirs.forEach(resultsDir => {
    const resultsPath = path.join(projectRoot, resultsDir);
    walkDirectory(resultsPath, resultsDir, attachments);
  });

  // 复制附件到报告目录
  attachments.forEach(att => {
    const srcPath = path.join(projectRoot, att.originalPath);
    const destPath = path.join(attachmentsDir, att.newName);

    if (fs.existsSync(srcPath)) {
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log('已复制附件:', att.newName, '| 原始:', path.basename(att.originalPath));
      } catch (err) {
        console.warn('复制附件失败:', att.newName, err.message);
      }
    }
  });

  return attachments;
}

function walkDirectory(dir, baseDir, attachments) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      walkDirectory(itemPath, baseDir, attachments);
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

// 复制附件
const copiedAttachments = copyAttachments();

// 统计数据
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let skippedTests = 0;
let totalDuration = 0;

// 格式化耗时为时:分:秒
function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } else if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  } else {
    return `${seconds}s`;
  }
}

function processSuite(suite, parentTitle = '') {
  let currentTitle = parentTitle ? parentTitle + ' > ' + suite.title : suite.title;
  let testHtml = '';

  if (suite.specs && suite.specs.length > 0) {
      suite.specs.forEach(spec => {
        if (spec.tests && spec.tests.length > 0) {
          spec.tests.forEach(test => {
            totalTests++;
            const result = test.results[0];
            const status = result?.status || 'unknown';
            const statusClass = status === 'passed' ? 'passed' : (status === 'failed' ? 'failed' : 'skipped');
            const statusIcon = status === 'passed' ? '✅' : (status === 'failed' ? '❌' : '⏭️');
            const duration = result?.duration || 0;
            const testTitle = test.title || spec.title || '未命名测试';

            // 累加总耗时
            totalDuration += duration;

            if (status === 'passed') passedTests++;
            else if (status === 'failed') failedTests++;
            else skippedTests++;

            // 收集附件
            let attachmentsHtml = '';
            if (result && result.attachments && result.attachments.length > 0) {
              result.attachments.forEach((att, idx) => {
                const attName = att.name || '附件 ' + (idx + 1);
                const attPath = att.path || '';

                console.log(`处理附件: ${attName}, 路径: ${attPath}`);

                // 查找复制后的附件 - 使用多种匹配策略
                const attFileName = path.basename(attPath);
                // 尝试精确匹配
                let matchedAttachment = copiedAttachments.find(a => a.newName.includes(attFileName));
                // 如果没有找到，尝试用去掉扩展名的文件名进行匹配
                if (!matchedAttachment) {
                  const attNameWithoutExt = path.basename(attPath, path.extname(attPath));
                  matchedAttachment = copiedAttachments.find(a => {
                    const aNameWithoutExt = path.basename(a.newName, path.extname(a.newName));
                    return aNameWithoutExt.includes(attNameWithoutExt) || attNameWithoutExt.includes('test_failed_1');
                  });
                }
                // 特殊处理：如果文件名是 test-failed-1.png，匹配任何包含 test_failed_1.png 的文件
                if (!matchedAttachment && attFileName === 'test-failed-1.png') {
                  matchedAttachment = copiedAttachments.find(a => a.newName.includes('test_failed_1'));
                }
                // 特殊处理：如果文件名是 error-context.md，匹配任何包含 error_context.md 的文件
                if (!matchedAttachment && attFileName === 'error-context.md') {
                  matchedAttachment = copiedAttachments.find(a => a.newName.includes('error_context'));
                }

                console.log(`  文件名: ${attFileName}, 匹配结果: ${matchedAttachment ? matchedAttachment.newName : '未找到'}`);

                if (att.contentType && att.contentType.includes('image')) {
                  const imgSrc = matchedAttachment ? `attachments/${matchedAttachment.newName}` : '';
                  if (imgSrc) {
                    attachmentsHtml += '<div class="attachment"><strong>' + attName + ':</strong><br><img src="' + imgSrc + '" alt="' + attName + '"></div>';
                  }
                } else if (att.contentType && att.contentType.includes('video')) {
                  const videoSrc = matchedAttachment ? `attachments/${matchedAttachment.newName}` : '';
                  if (videoSrc) {
                    attachmentsHtml += '<div class="attachment"><strong>' + attName + ':</strong><br><video controls><source src="' + videoSrc + '" type="' + att.contentType + '"></video></div>';
                  }
                } else if (att.path) {
                  const fileLink = matchedAttachment ? `attachments/${matchedAttachment.newName}` : '';
                  if (fileLink) {
                    attachmentsHtml += '<div class="attachment"><strong>' + attName + ':</strong> <a href="' + fileLink + '" target="_blank">查看文件</a></div>';
                  }
                }
              });
            }

          // 错误信息
          let errorHtml = '';
          if (result && result.errors && result.errors.length > 0) {
            errorHtml = result.errors.map(err => '<div class="error">' + (err.message || err) + '</div>').join('');
          }

          testHtml += '<tr class="test-row ' + statusClass + '" data-status="' + status + '" data-duration="' + duration + '" data-suite="' + currentTitle + '">';
          testHtml += '<td class="status-cell">' + statusIcon + '</td>';
          testHtml += '<td class="suite-cell">' + currentTitle + '</td>';
          testHtml += '<td class="test-cell">';
          testHtml += '<div class="test-header" onclick="toggleTestDetails(this)">';
          testHtml += '<span class="test-title">' + testTitle + '</span>';
          testHtml += '<span class="toggle-icon">▼</span>';
          testHtml += '</div>';
          testHtml += '<div class="test-details" style="display: none;">';
          if (errorHtml) {
            testHtml += '<div class="error-container">' + errorHtml + '</div>';
          }
          if (attachmentsHtml) {
            testHtml += '<div class="attachments">' + attachmentsHtml + '</div>';
          }
          testHtml += '</div>';
          testHtml += '</td>';
          testHtml += '<td class="result-cell">' + status + '</td>';
          testHtml += '<td class="duration-cell">' + (duration / 1000).toFixed(2) + 's</td>';
          testHtml += '</tr>';
        });
      }
    });
  }

  if (suite.suites && suite.suites.length > 0) {
    suite.suites.forEach(childSuite => {
      testHtml += processSuite(childSuite, currentTitle);
    });
  }

  return testHtml;
}

let testHtml = '';
data.suites.forEach(suite => {
  testHtml += processSuite(suite);
});

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playwright Test Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f7fa;
      padding: 20px;
      font-size: 13px;
    }
    .container {
      max-width: 1600px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e9ecef;
    }
    h1 {
      color: #2c3e50;
      font-size: 24px;
      font-weight: 600;
    }
    .summary {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
    }
    .summary-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
    }
    .summary-item.total { color: #2c3e50; }
    .summary-item.passed { color: #28a745; }
    .summary-item.failed { color: #dc3545; }
    .summary-item.skipped { color: #ffc107; }
    .summary-item.duration { color: #6c757d; }

    .filter-bar {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      flex-wrap: wrap;
      align-items: center;
    }
    .filter-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .filter-group label {
      font-weight: 500;
      color: #495057;
    }
    .filter-btn {
      padding: 8px 16px;
      border: 1px solid #dee2e6;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }
    .filter-btn:hover {
      background: #e9ecef;
    }
    .filter-btn.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    .filter-btn.all.active { background: #6c757d; border-color: #6c757d; }
    .filter-btn.passed.active { background: #28a745; border-color: #28a745; }
    .filter-btn.failed.active { background: #dc3545; border-color: #dc3545; }
    .filter-btn.skipped.active { background: #ffc107; border-color: #ffc107; color: #212529; }
    .search-input {
      padding: 8px 12px;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      font-size: 13px;
      min-width: 200px;
    }
    .search-input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
    }
    .clear-btn {
      padding: 8px 12px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }
    .clear-btn:hover {
      background: #5a6268;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 8px;
      text-align: left;
      font-weight: 600;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    th:first-child { border-radius: 6px 0 0 0; }
    th:last-child { border-radius: 0 6px 0 0; }
    td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
      vertical-align: top;
    }
    .test-row {
      cursor: pointer;
      transition: background 0.2s;
    }
    .test-row:hover {
      background: #f8f9fa;
    }
    .test-row.passed { border-left: 3px solid #28a745; }
    .test-row.failed { border-left: 3px solid #dc3545; }
    .test-row.skipped { border-left: 3px solid #ffc107; }
    .test-row.hidden { display: none; }

    .status-cell { width: 40px; text-align: center; font-size: 18px; }
    .suite-cell { width: 280px; color: #495057; font-size: 12px; }
    .test-cell { width: auto; }
    .result-cell { width: 70px; font-weight: 500; }
    .duration-cell { width: 80px; color: #6c757d; }

    .test-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 10px;
      background: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 4px;
    }
    .test-header:hover {
      background: #e9ecef;
    }
    .test-title {
      font-weight: 500;
      color: #2c3e50;
    }
    .toggle-icon {
      color: #6c757d;
      font-size: 12px;
      transition: transform 0.2s;
    }
    .test-details.expanded + .test-header .toggle-icon {
      transform: rotate(180deg);
    }
    .test-details {
      margin-left: 10px;
      margin-right: 10px;
    }

    .error-container {
      margin-top: 8px;
    }
    .error {
      background: #fff3cd;
      border-left: 3px solid #ffc107;
      padding: 10px 12px;
      border-radius: 4px;
      font-size: 12px;
      color: #856404;
      margin-bottom: 8px;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .attachments {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #dee2e6;
    }
    .attachment {
      margin-bottom: 12px;
    }
    .attachment strong {
      display: block;
      margin-bottom: 6px;
      color: #495057;
      font-size: 12px;
    }
    .attachment img,
    .attachment video {
      max-width: 700px;
      display: block;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }
    .attachment a {
      color: #007bff;
      text-decoration: none;
      padding: 6px 12px;
      background: #e7f1ff;
      border-radius: 4px;
      display: inline-block;
    }
    .attachment a:hover {
      background: #d0e3ff;
      text-decoration: none;
    }

    .no-results {
      text-align: center;
      padding: 40px;
      color: #6c757d;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Playwright 测试报告</h1>
    </div>
    <div class="summary">
      <div class="summary-item total">📊 总计: ${totalTests}</div>
      <div class="summary-item passed">✅ 通过: ${passedTests}</div>
      <div class="summary-item failed">❌ 失败: ${failedTests}</div>
      <div class="summary-item skipped">⏭️ 跳过: ${skippedTests}</div>
      <div class="summary-item duration">⏱️ 总耗时: ${formatDuration(totalDuration)}</div>
    </div>
    <div class="filter-bar">
      <div class="filter-group">
        <label>状态筛选:</label>
        <button class="filter-btn all active" onclick="filterByStatus('all')">全部</button>
        <button class="filter-btn passed" onclick="filterByStatus('passed')">通过</button>
        <button class="filter-btn failed" onclick="filterByStatus('failed')">失败</button>
        <button class="filter-btn skipped" onclick="filterByStatus('skipped')">跳过</button>
      </div>
      <div class="filter-group">
        <label>搜索:</label>
        <input type="text" class="search-input" id="searchInput" placeholder="搜索测试名称或套件..." oninput="handleSearch()">
      </div>
      <button class="clear-btn" onclick="clearFilters()">清除筛选</button>
    </div>
    <table id="testTable">
      <thead>
        <tr>
          <th style="width: 40px;">状态</th>
          <th style="width: 280px;">套件</th>
          <th>测试用例</th>
          <th style="width: 70px;">结果</th>
          <th style="width: 80px;">耗时</th>
        </tr>
      </thead>
      <tbody id="testBody">
        ${testHtml}
      </tbody>
    </table>
    <div id="noResults" class="no-results" style="display: none;">没有找到匹配的测试结果</div>
  </div>

  <script>
    let currentStatusFilter = 'all';
    let currentSearchTerm = '';

    function toggleTestDetails(header) {
      const details = header.nextElementSibling;
      const isExpanded = details.style.display !== 'none';
      details.style.display = isExpanded ? 'none' : 'block';
      header.querySelector('.toggle-icon').style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    }

    function filterByStatus(status) {
      currentStatusFilter = status;
      updateFilterButtons();
      applyFilters();
    }

    function handleSearch() {
      currentSearchTerm = document.getElementById('searchInput').value.toLowerCase();
      applyFilters();
    }

    function updateFilterButtons() {
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      document.querySelector(\`.filter-btn.\${currentStatusFilter}\`).classList.add('active');
    }

    function applyFilters() {
      const rows = document.querySelectorAll('.test-row');
      let visibleCount = 0;

      rows.forEach(row => {
        const status = row.dataset.status;
        const suite = row.dataset.suite.toLowerCase();
        const title = row.querySelector('.test-title').textContent.toLowerCase();
        const searchText = suite + ' ' + title;

        const matchesStatus = currentStatusFilter === 'all' || status === currentStatusFilter;
        const matchesSearch = searchText.includes(currentSearchTerm);

        if (matchesStatus && matchesSearch) {
          row.classList.remove('hidden');
          visibleCount++;
        } else {
          row.classList.add('hidden');
        }
      });

      const noResults = document.getElementById('noResults');
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    function clearFilters() {
      currentStatusFilter = 'all';
      currentSearchTerm = '';
      document.getElementById('searchInput').value = '';
      updateFilterButtons();
      applyFilters();
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(reportDir, 'index.html'), html);
console.log('HTML 报告已生成');
