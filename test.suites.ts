/**
 * 测试套件配置 - 类似 Protractor 的 suites 配置
 * 只需修改此文件中的路径即可控制运行哪些测试用例
 * 统一使用命令: npm run test:headed
 */

export const testSuites = {
  /**
   * 主测试套件 - 修改此处来选择要运行的测试用例
   */
  main: [
    // 示例：取消注释要运行的测试用例
    //"src/e2e/IDEALX/PayTransfer/SG_ACT_NewPayee.test.ts",
    "src/e2e/IDEALX/PayTransfer/SG_ACT_NewPayeeEnhance.test.ts",
    // 更多测试用例可以在这里添加，例如：
    // "src/e2e/IDEALX/PayTransfer/SG_AccountTransfer.test.ts",
    // "src/e2e/IDEALX/Files/TW_UploadFile_User1.test.ts",
    // "src/e2e/IDEALX/PayTransfer/CN_CrossBorderACH.test.ts",
  ],

  /**
   * IDEALX PayTransfer 模块测试
   */
  paytransfer: [
    "src/e2e/IDEALX/PayTransfer/SG_ACT_NewPayee.test.ts",
    // "src/e2e/IDEALX/PayTransfer/SG_AccountTransfer.test.ts",
    // "src/e2e/IDEALX/PayTransfer/SG_RecurringPayment.test.ts",
  ],

  /**
   * 文件上传测试
   */
  files: [
    // "src/e2e/IDEALX/Files/TW_UploadFile_User1.test.ts",
  ],

  /**
   * 登录测试
   */
  login: [
    "tests/login.spec.ts",
  ],
};

// 默认导出主套件
export default testSuites.main;
