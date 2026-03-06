/**
 * API测试用例：获取用户信息接口
 * 运行方式：通过protractor.api.conf.js（禁用浏览器）
 * 通过protractor.config.js（启用浏览器）

 */
import { TestApiClient } from "../../lib/testApiClient";
import { DashboardPages } from "../../pages/IDEALX/Dashboard";
import { NavigatePages, PaymentsPages,AlertsPages,AccountPages} from "../../pages/IDEALX";
import { expect } from "chai";
import { promise,browser,ExpectedConditions } from "protractor";
import { ensure, SIT, handlerCase, PROJECT_TYPE} from '../../lib';

// 创建Page实例来使用fetchTestData
const page = new DashboardPages();
//ui验证的页面
let _PaymentsPages = new PaymentsPages();
let _AccountPages = new AccountPages();
let _alertPagesListPage = new AlertsPages();
// 加载JSON格式的测试数据
const testData = page.fetchTestData("API_testData.json");

// 定义接口响应类型
interface UserInfoResponse {
  returnStatus: string;
  returnCode: string;
  errorDesc?: string;
  userName?: string;
};

interface ActivityLogResponse {
  returnCode: string;
  returnStatus: string;
  channelType: string;
  idealRefNumber: string;
  workFlowList: Array<{
    pmtHistoryKy?: string;
    action?: string;
    userName?: string;
    updatedDateTime?: string;
    isList?: boolean;
    displayStatusAndCutOffTime?: boolean;
    workFlowList?: Array<Array<{
      pmtHistoryKy: string;
      action: string;
      userName: string;
      updatedDateTime: string;
      pending: boolean;
      sequential: boolean;
    }>>;
    flowType?: string;
    flowStatus?: string;
    pending?: boolean;
  }>;
};

// 使用默认配置的API客户端
const apiClient = new TestApiClient();

describe("IDEALX-getUserInfoToIVR", function () {
  it("getUserInfoToIVR - Negative: User not found", async function () {
    // // 生成动态数据
    // const dynamicRequestData = {
    //   ...testData.getUserInfoToIVR.requestData,
    //   identityNum: generateRandomIdentityNum(),
    //   accountNum: generateRandomAccountNum(),
    //   rqUID: Date.now().toString()
    // };
    // console.log('生成的动态请求数据:', JSON.stringify(dynamicRequestData, null, 2));
    // 发送API请求
    const response = await apiClient.post<UserInfoResponse>(
      testData.getUserInfoToIVR.url,
      testData.getUserInfoToIVR.requestData
    );
    // 获取预期响应
    const expected = testData.getUserInfoToIVR.expectedResponses.userNotFound;
    // 断言验证
    expect(response.status).to.equal(200);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.errorDesc).to.equal(expected.errorDesc);
  });
});

describe("IDEALX-EDP", function () {
    this.retries(browser.params.caseRetryTimes);
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
    let idealRefNumber = '';
    // 获取当前日期并格式化为YYYY-MM-DD
    const today = new Date();
    const executionDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    it("Create Payment - Positive: Create and verify payment", async function () {
    // API部分 - 创建支付交易
    console.log('开始API支付创建流程...');
    const paymentResult = await createEDPPayment();
    idealRefNumber = paymentResult.idealRefNumber;
    console.log('API支付创建完成，交易参考号:', idealRefNumber);

    // UI校验部分
    console.log('开始UI校验流程...');
    
    // 创建NavigatePages实例用于UI操作
    const navigatePages = new NavigatePages();
    
    try {
      // 登录到IDEALX系统
      // 注意：需要提供实际的登录凭证参数
      await navigatePages.loginIdealx("AUTOSG03", "AUTOSG03API01", "123456");
      console.log('登录成功');

      await _PaymentsPages.AccountTransferPage.paymentMenu.click();
      await _PaymentsPages.TransferCentersPage.loadCondition();
      await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(idealRefNumber);
      await _PaymentsPages.TransferCentersPage.loadCondition();
      await promise.all([
          await ensure(_PaymentsPages.TransferCentersPage.refLink).textContains(idealRefNumber),
          await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContains("Pending Verification")
      ]);
      console.log('UI校验完成，交易参考号:', idealRefNumber);
    } catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });

  it("Get Payee List for EDP - Positive: Get payee list before payment creation", async function () { 
    const response = await apiClient.post<any>(
      testData.getPayeeListForEDP.url + "?format=json",
      testData.getPayeeListForEDP.requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));
    // 获取预期响应
    const expected = testData.getPayeeListForEDP.expectedResponses.success;
    // 断言验证
    expect(response.status).to.equal(200);
    expect(response.data.getPayeeListRes.rqUID).to.equal(expected.getPayeeListRes.rqUID);
    expect(response.data.getPayeeListRes.returnCode).to.equal(expected.getPayeeListRes.returnCode);
    expect(response.data.getPayeeListRes.returnStatus).to.equal(expected.getPayeeListRes.returnStatus);
    expect(response.data.getPayeeListRes.payeeList.name).to.equal(expected.getPayeeListRes.payeeList.name);
    expect(response.data.getPayeeListRes.payeeList.acctNum).to.equal(expected.getPayeeListRes.payeeList.acctNum);
    expect(response.data.getPayeeListRes.payeeList.payeeRecord.bankInfo.swiftBic).to.equal(expected.getPayeeListRes.payeeList.payeeRecord.bankInfo.swiftBic);
    expect(response.data.getPayeeListRes.payeeList.nameOfRetrieve).to.equal(expected.getPayeeListRes.payeeList.nameOfRetrieve);
    expect(response.data.getPayeeListRes.payeeList.payeeRecord.authorizedTypeCodes.values).to.equal(expected.getPayeeListRes.payeeList.payeeRecord.authorizedTypeCodes.values);
  });

  it("Reject Payment - Positive: Reject EDP payment and verify in WEB", async function () {
    // 校验是否获取到instructionId
    if (!idealRefNumber) {
      throw new Error("no idealRefNumber");
    }
    // ====================== 第一步：API调用拒绝EDP支付 ======================
    // 1. 从JSON读取请求模板，动态替换instructionId
    const requestTemplate = testData.rejectEDPPayment.requestData;
    const requestData = JSON.parse(JSON.stringify(requestTemplate)); // 深拷贝避免修改原模板
    requestData.rejectPayments[0].instructionId = idealRefNumber; // 动态填充
    console.log('拒绝EDP支付请求参数:', JSON.stringify(requestData, null, 2));

    // 2. 发送POST请求执行拒绝操作
    const response = await apiClient.post<any>(
      testData.rejectEDPPayment.url,
      requestData
    );
    console.log('拒绝EDP支付接口响应:', JSON.stringify(response.data, null, 2));

    // 3. API响应断言（动态填充预期响应的instructionId和custReference）
    const expectedResponse = JSON.parse(JSON.stringify(testData.rejectEDPPayment.expectedResponse));
    expectedResponse.rejectPayments[0].instructionId = idealRefNumber;
    expectedResponse.rejectPayments[0].custReference = idealRefNumber;

    expect(response.status).to.equal(200, "HTTP响应状态码应为200");
    // 断言拒绝结果数组非空
    expect(response.data.rejectPayments).to.be.an('array').with.lengthOf(1, "rejectPayments数组长度应为1");
    // 断言核心字段
    const rejectResult = response.data.rejectPayments[0];
    expect(rejectResult.instructionId).to.equal(expectedResponse.rejectPayments[0].instructionId);
    expect(rejectResult.custReference).to.equal(expectedResponse.rejectPayments[0].custReference);
    expect(rejectResult.status).to.equal(expectedResponse.rejectPayments[0].status);
    expect(rejectResult.returnStatus).to.equal(expectedResponse.rejectPayments[0].returnStatus);
    expect(rejectResult.returnCode).to.equal(expectedResponse.rejectPayments[0].returnCode);

    const navigatePages = new NavigatePages();
    const uiVerifyParams = testData.rejectEDPPayment.uiVerifyParams;

    try {
      await navigatePages.loginIdealx("AUTOSG03", "AUTOSG03API01", "123456");

      await _PaymentsPages.AccountTransferPage.paymentMenu.click(); 
      await _PaymentsPages.TransferCentersPage.loadCondition();    
      console.log('进入EDP支付管理页面成功');

      await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(idealRefNumber); 
      await _PaymentsPages.TransferCentersPage.loadCondition(); 
      await promise.all([
          await ensure(_PaymentsPages.TransferCentersPage.refLink).textContains(idealRefNumber),
          await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContains(uiVerifyParams.expectedStatus),
      ]);
    } catch (error) {
      console.error('拒绝EDP支付Web UI验证失败:', error);
      throw error;
    }
  });

  it("Verify Payment - Positive: verify EDP payment and check in WEB", async function () {
    const paymentResult = await createEDPPayment();
    idealRefNumber = paymentResult.idealRefNumber;
    const requestTemplate = testData.verifyEDPPayment.requestData;
    // 深拷贝避免修改原模板
    const requestData = JSON.parse(JSON.stringify(requestTemplate)); 
    requestData.verifyPayments[0].instructionId = idealRefNumber; 
    requestData.verifyPayments[0].executionDate = executionDate; 
    const response = await apiClient.post<any>(
      testData.verifyEDPPayment.url,
      requestData
    );
    const expectedResponse = JSON.parse(JSON.stringify(testData.verifyEDPPayment.expectedResponse));
    expectedResponse.verifyPayments[0].instructionId = idealRefNumber;
    expectedResponse.verifyPayments[0].custReference = idealRefNumber;
    expect(response.status).to.equal(200, "HTTP响应状态码应为200");
    expect(response.data.verifyPayments).to.be.an('array').with.lengthOf(1, "verify Payments数组长度应为1");
    const verifyResult = response.data.verifyPayments[0];
    expect(verifyResult.instructionId).to.equal(expectedResponse.verifyPayments[0].instructionId);
    expect(verifyResult.custReference).to.equal(expectedResponse.verifyPayments[0].custReference);
    expect(verifyResult.status).to.equal(expectedResponse.verifyPayments[0].status);
    expect(verifyResult.returnStatus).to.equal(expectedResponse.verifyPayments[0].returnStatus);
    expect(verifyResult.returnCode).to.equal(expectedResponse.verifyPayments[0].returnCode);


    const navigatePages = new NavigatePages();
    const uiVerifyParams = testData.verifyEDPPayment.uiVerifyParams;
    try {
      await navigatePages.loginIdealx("AUTOSG03", "AUTOSG03API01", "123456");
      await _PaymentsPages.AccountTransferPage.paymentMenu.click(); 
      await _PaymentsPages.TransferCentersPage.loadCondition();    
      await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(idealRefNumber); 
      await _PaymentsPages.TransferCentersPage.loadCondition(); 
      await promise.all([
          await ensure(_PaymentsPages.TransferCentersPage.refLink).textContains(idealRefNumber),
          await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContains(uiVerifyParams.expectedStatus),
      ]);
    } catch (error) {
      console.error('verify EDP payment Web UI验证失败:', error);
      throw error;
    }
  });

  it("Approve Payment - Positive: approve EDP payment and check in WEB", async function () {
    const requestTemplate = testData.approveEDPPayment.requestData;
    // 深拷贝避免修改原模板
    const requestData = JSON.parse(JSON.stringify(requestTemplate)); 
    requestData.approvePayments[0].instructionId = idealRefNumber; 
    requestData.approvePayments[0].executionDate = executionDate; 
    const response = await apiClient.post<any>(
      testData.approveEDPPayment.url,
      requestData
    );
    const expectedResponse = JSON.parse(JSON.stringify(testData.approveEDPPayment.expectedResponse));
    expectedResponse.approvePayments[0].instructionId = idealRefNumber;
    expectedResponse.approvePayments[0].custReference = idealRefNumber;
    expect(response.status).to.equal(200, "HTTP响应状态码应为200");
    expect(response.data.approvePayments).to.be.an('array').with.lengthOf(1, "approve Payments数组长度应为1");
    const approveResult = response.data.approvePayments[0];
    expect(approveResult.instructionId).to.equal(expectedResponse.approvePayments[0].instructionId);
    expect(approveResult.custReference).to.equal(expectedResponse.approvePayments[0].custReference);
    expect(approveResult.status).to.equal(expectedResponse.approvePayments[0].status);
    expect(approveResult.returnStatus).to.equal(expectedResponse.approvePayments[0].returnStatus);
    expect(approveResult.returnCode).to.equal(expectedResponse.approvePayments[0].returnCode);

    const navigatePages = new NavigatePages();
    const uiVerifyParams = testData.approveEDPPayment.uiVerifyParams;
    try {
      await navigatePages.loginIdealx("AUTOSG03", "AUTOSG03API01", "123456");
      await _PaymentsPages.AccountTransferPage.paymentMenu.click(); 
      await _PaymentsPages.TransferCentersPage.loadCondition();    
      await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(idealRefNumber); 
      await _PaymentsPages.TransferCentersPage.loadCondition(); 
      await promise.all([
          await ensure(_PaymentsPages.TransferCentersPage.refLink).textContains(idealRefNumber),
          await ensure(_PaymentsPages.TransferCentersPage.txnStatus).textContains(uiVerifyParams.expectedStatus),
      ]);
    } catch (error) {
      console.error('verify EDP payment Web UI验证失败:', error);
      throw error;
    }
  });


  it("Cancel Payment - Positive: cancel EDP payment and check in WEB", async function () {
    const issueRequestTemplate = testData.issuedEDPPayment.requestData;
    const cancelRequestTemplate = testData.cancelEDPPayment.requestData;
    // 深拷贝避免修改原模板
    const issueRequestData = JSON.parse(JSON.stringify(issueRequestTemplate)); 
    const cancelRequestData = JSON.parse(JSON.stringify(cancelRequestTemplate)); 

    issueRequestData.updateIssuedEDPs[0].instructionId = idealRefNumber; 
    cancelRequestData.cancelPayments[0].instructionId = idealRefNumber; 
    cancelRequestData.cancelPayments[0].custReference = idealRefNumber; 
    cancelRequestData.cancelPayments[0].executionDate = `${executionDate} 00:20:00`; 
    //先变成issued状态才能cancel,edp+不能被cancel
    await apiClient.post<any>(
      testData.issuedEDPPayment.url,
      issueRequestData
    );

    const cancelResponse = await apiClient.post<any>(
      testData.cancelEDPPayment.url,
      cancelRequestData
    );
    const expectedResponse = JSON.parse(JSON.stringify(testData.cancelEDPPayment.expectedResponse));
    expectedResponse.cancelPayments[0].instructionId = idealRefNumber;
    expect(cancelResponse.status).to.equal(200, "HTTP响应状态码应为200");
    expect(cancelResponse.data.cancelPayments).to.be.an('array').with.lengthOf(1, "cancel Payments数组长度应为1");
    const cancelResult = cancelResponse.data.cancelPayments[0];
    expect(cancelResult.instructionId).to.equal(expectedResponse.cancelPayments[0].instructionId);
    expect(cancelResult.status).to.equal(expectedResponse.cancelPayments[0].status);
    expect(cancelResult.returnStatus).to.equal(expectedResponse.cancelPayments[0].returnStatus);
    expect(cancelResult.returnCode).to.equal(expectedResponse.cancelPayments[0].returnCode);

    const navigatePages = new NavigatePages();
    const uiVerifyParams = testData.cancelEDPPayment.uiVerifyParams;
    try {
      await navigatePages.loginIdealx("AUTOSG03", "AUTOSG03API01", "123456");
      await _PaymentsPages.AccountTransferPage.paymentMenu.click(); 
      await _PaymentsPages.TransferCentersPage.loadCondition();    
      await _PaymentsPages.TransferCentersPage.transferCenterFilter.input(idealRefNumber); 
      await _PaymentsPages.TransferCentersPage.loadCondition(); 
      await promise.all([
          await ensure(_PaymentsPages.TransferCentersPage.refLink).textContains(idealRefNumber),
          await ensure(_PaymentsPages.TransferCentersPage.cancleEdpTxnStatus).textContains(uiVerifyParams.expectedStatus),
      ]);
    } catch (error) {
      console.error('cancel EDP payment Web UI验证失败:', error);
      throw error;
    }
  });

});
describe("IDEALX-getPaymentStatus", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this;beforeEach(async function() { process.env.currentTestTitle = this.currentTest.title; });afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  it("getPaymentStatus - Positive: Query payment status successfully", async function () {    
    const requestData = testData.getPaymentStatus.requestData;
    const response = await apiClient.post<any>(
        testData.getPaymentStatus.url,
        requestData
    );
    const expectedResponse = testData.getPaymentStatus.expectedResponse;
    expect(response.status).to.equal(200, "HTTP响应状态码应为200");
    expect(response.data.returnStatus).to.equal(expectedResponse.returnStatus, "returnStatus不匹配");
    expect(response.data.returnCode).to.equal(expectedResponse.returnCode, "returnCode不匹配");
    
    // 核心业务字段校验
    expect(response.data.rqUID).to.equal(expectedResponse.rqUID, "rqUID不匹配");
    expect(response.data.channelId).to.equal(expectedResponse.channelId, "channelId不匹配");
    expect(response.data.idealRefNumber).to.equal(expectedResponse.idealRefNumber, "idealRefNumber不匹配");
    
    // 支付详情字段校验
    expect(response.data.effectiveDateTime).to.equal(expectedResponse.effectiveDateTime, "effectiveDateTime不匹配");
    expect(response.data.paymentType).to.equal(expectedResponse.paymentType, "paymentType不匹配");
    expect(response.data.paymentSubType).to.equal(expectedResponse.paymentSubType, "paymentSubType不匹配");
    expect(response.data.signatureTrail).to.equal(expectedResponse.signatureTrail, "signatureTrail不匹配");
    expect(response.data.nextSignature).to.equal(expectedResponse.nextSignature, "nextSignature不匹配");
    expect(response.data.approveByDateTime).to.equal(expectedResponse.approveByDateTime, "approveByDateTime不匹配");
    expect(response.data.paymentDate).to.equal(expectedResponse.paymentDate, "paymentDate不匹配");
    
    // 金额字段校验
    expect(response.data.transactionAmt).to.equal(expectedResponse.transactionAmt, "transactionAmt不匹配");
    expect(response.data.remittanceAmt).to.equal(expectedResponse.remittanceAmt, "remittanceAmt不匹配");
    
    // 状态字段校验
    expect(response.data.status).to.equal(expectedResponse.status, "支付状态不匹配");
  });
});

// ========== 新增测试套件：getActivityLog ==========
describe("IDEALX-getActivityLog", function () {
  // 复用现有重试机制和钩子函数
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this;
  beforeEach(async function() { process.env.currentTestTitle = this.currentTest.title; });
  afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

  it("getActivityLog - Positive: Query activity log successfully", async function () {
    console.log('开始getActivityLog接口查询流程...');
    
    // 1. 从JSON中读取请求参数（完全复用现有数据加载逻辑）
    const requestData = testData.getActivityLog.requestData;
    console.log('请求参数:', JSON.stringify(requestData, null, 2));

    // 2. 发送API请求（根据接口类型选择GET/POST，这里假设为GET，若实际是POST则替换为post）
    const response = await apiClient.post<ActivityLogResponse>(
      testData.getActivityLog.url,
      requestData
    );
    console.log('接口响应:', JSON.stringify(response.data, null, 2));

    // 3. 从JSON中读取预期响应
    const expected = testData.getActivityLog.expectedResponse;

    // 4. 分层断言（匹配现有断言风格，先基础字段再复杂数组）
    // 基础状态码断言
    expect(response.status).to.equal(200);
    
    // 核心业务字段断言
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    expect(response.data.channelType).to.equal(expected.channelType);
    expect(response.data.idealRefNumber).to.equal(expected.idealRefNumber);

    // 复杂数组workFlowList断言
    expect(response.data.workFlowList).to.be.an('array').with.lengthOf(5);
    
    // 第一个workFlow项断言
    const firstWorkflow = response.data.workFlowList[0];
    expect(firstWorkflow.action).to.equal(expected.workFlowList[0].action);
    expect(firstWorkflow.userName).to.equal(expected.workFlowList[0].userName);
    
    // 第二个workFlow项（嵌套数组）断言
    const secondWorkflow = response.data.workFlowList[1];
    expect(secondWorkflow.isList).to.be.true;
    expect(secondWorkflow.flowType).to.equal(expected.workFlowList[1].flowType);
  });
});


// BIFAST RFP请求测试用例
describe("ID-BIFAST Request for Payment", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  it("createBIFASTRequest - Positive: Create BIFAST RFP request", async function () {
    // 获取当前日期并格式化为YYYY-MM-DD
    const today = new Date();
    const executionDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const expiryDate = `${executionDate} 23:00:00`;
    const requestData = {
      ...testData.createBIFASTRequest.requestData,
      txnInfo: {
        ...testData.createBIFASTRequest.requestData.txnInfo,
        txnRefId: generateRandomIdentityNum(),
        executionDate: executionDate,
        expiryDate: expiryDate
      }
    };
    console.log('请求数据:', JSON.stringify(requestData, null, 2));
    const response = await apiClient.post<any>(
      testData.createBIFASTRequest.url,
      requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));

    const expected = testData.createBIFASTRequest.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.header.msgId).to.equal(expected.header.msgId);
    expect(response.data.header.channelId).to.equal(expected.header.channelId);
    expect(response.data.txnInfo.requestType).to.equal(expected.txnInfo.requestType);
    expect(response.data.txnStatus.code).to.equal(expected.txnStatus.code);
    expect(response.data.txnStatus.desc).to.equal(expected.txnStatus.desc);

    try {
      // 登录到IDEALX系统
      // 注意：需要提供实际的登录凭证参数
      await new NavigatePages().loginIdealx("SPID08", "SPID08API01", "123456");
      console.log('登录成功');
      //可根据实际需求增加view页面的校验
      await _PaymentsPages.AccountTransferPage.paymentMenu.click();
      await _PaymentsPages.TransferCentersPage.loadCondition();
      await _PaymentsPages.IDBIFASTRequestPage.bifastRequestMenu.click();
      await _PaymentsPages.IDBIFASTRequestPage.refLink.click();
      await promise.all([
          await ensure(_PaymentsPages.IDBIFASTRequestPage.statusValue).textContains("Pending Approval"),
          await ensure(_PaymentsPages.IDBIFASTRequestPage.debitACCTValue).textContains(testData.createBIFASTRequest.requestData.txnInfo.accountIdentification2.receivingPartyAccountNumber),
          await ensure(_PaymentsPages.IDBIFASTRequestPage.sendPartyName).textContains(testData.createBIFASTRequest.requestData.txnInfo.accountIdentification1.senderPartyAccountName),
          await ensure(_PaymentsPages.IDBIFASTRequestPage.sendPartyAcct).textContains(testData.createBIFASTRequest.requestData.txnInfo.accountIdentification1.senderPartyAccountNumber),
          await ensure(_PaymentsPages.IDBIFASTRequestPage.requestAmount).textContains(testData.createBIFASTRequest.AmountValue),
          await ensure(_PaymentsPages.IDBIFASTRequestPage.paymentType).textContains("BIFAST")
      ]);
    }catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });
});

// INTAX支付测试用例
describe("IDEALX-INTAX", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  it("Create IN customduty payment", async function () {
    const paymentResult = await createINTaxPayment();
    const idealRefNumber = paymentResult.idealRefNumber;
    const executionDate = paymentResult.executionDate;
    console.log('API支付创建完成，交易参考号:', idealRefNumber);
    
    try {
      await new NavigatePages().loginIdealx("SPIN08", "SPIN08API01", "123456");
      console.log('登录成功');
      await _PaymentsPages.AccountTransferPage.paymentMenu.click();
      await _PaymentsPages.TransferCentersPage.loadCondition();
      await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(idealRefNumber);
      await promise.all([
          await ensure(_PaymentsPages.singlePaymentPage.TaxType).textContains("Customs duty"),
          await ensure(_PaymentsPages.singlePaymentPage.taxStatusValue).textContains("Pending Approval"),
          await ensure(_PaymentsPages.singlePaymentPage.taxFromAccountValue).textContains(testData.createINTAXPayment.requestData.fromAcctNo),
          await ensure(_PaymentsPages.singlePaymentPage.taxBeneValue).textContains(testData.createINTAXPayment.requestData.payeeList[0].newPayee.name),
          await ensure(_PaymentsPages.singlePaymentPage.taxBeneNmValue).textContains(testData.createINTAXPayment.requestData.payeeList[0].newPayee.acctNum)

      ]);
      console.log('UI校验完成，交易参考号:', idealRefNumber);
    } catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });
});

// Audit-Confirmation
describe("Audit-Confirmation", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  let auditConfirmRef = '';
  it("Create CN audit confirmation request", async function () {
    const response = await apiClient.post<any>(
      testData.createAuditConfirmation.url,
      testData.createAuditConfirmation.requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));
    const expected = testData.createAuditConfirmation.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.rqUID).to.equal(expected.rqUID);
    expect(response.data.apiName).to.equal(expected.apiName);
    expect(response.data.affiliate).to.equal(expected.affiliate);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);

    auditConfirmRef = response.data.requestReference;
    console.log('生成的交易参考号:', auditConfirmRef);
    
     try {
      await new NavigatePages().loginIdealx("CNP2A01", "CNP2A01API01", "123456");
      console.log('登录成功');
      await _AccountPages.FixedDepositsPage.accountMenu.click();
      await _AccountPages.auditConfirmationsPage.auditConfirmationsTab.click();
      await _AccountPages.auditConfirmationsPage.refLink.click();
      await promise.all([
          await ensure(_AccountPages.auditConfirmationsPage.SummaryTitle).textContains(auditConfirmRef),
          await ensure(_AccountPages.auditConfirmationsPage.Status).textContains("Pending Approval"),
          await ensure(_AccountPages.auditConfirmationsPage.lawFirm).textContains(testData.createAuditConfirmation.requestData.auditor.auditorName),
          await ensure(_AccountPages.auditConfirmationsPage.applicantName).textContains(testData.createAuditConfirmation.requestData.requestorName),
          await ensure(_AccountPages.auditConfirmationsPage.requestorTitle).textContains(testData.createAuditConfirmation.requestData.requestorTitle)

      ]); 
    } catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });

  it("Update audit confirmation status", async function () {
     // 校验前置用例是否获取到referenceId
    if (!auditConfirmRef) {
      throw new Error("no referenceId");
    }
     // 1. 从JSON读取请求模板，动态替换referenceId
    const requestTemplate = testData.accpStatusUpdate.requestData;
    const requestData = JSON.parse(JSON.stringify(requestTemplate)); // 深拷贝避免修改原模板
    requestData.corplist[0].status[0].referenceId = auditConfirmRef; // 动态填充
    console.log('ACCp状态更新请求参数:', JSON.stringify(requestData, null, 2));

    // 2. 发送POST请求更新状态
    const response = await apiClient.post<any>(
      testData.accpStatusUpdate.url,
      requestData
    );
    const expectedApiResponse = testData.accpStatusUpdate.expectedResponse;
    expect(response.status).to.equal(200);
    expect(response.data.returnStatus).to.equal(expectedApiResponse.returnStatus);
    expect(response.data.returnCode).to.equal(expectedApiResponse.returnCode);

    try {
      await new NavigatePages().loginIdealx("CNP2A01", "CNP2A01API01", "123456");
      await _AccountPages.FixedDepositsPage.accountMenu.click();
      await _AccountPages.auditConfirmationsPage.auditConfirmationsTab.click();
      await _AccountPages.auditConfirmationsPage.refLink.click();
      await promise.all([
          await ensure(_AccountPages.auditConfirmationsPage.SummaryTitle).textContains(auditConfirmRef),
          await ensure(_AccountPages.auditConfirmationsPage.Status).textContains("Rejected"),
          await ensure(_AccountPages.auditConfirmationsPage.rejectReason).textContains(testData.accpStatusUpdate.uiVerifyParams.expectedReason),
      ]);
    }catch (error) {
      console.error('ACCp状态更新Web UI验证失败:', error);
      throw error; 
    }
  });

});

// DDA
describe("DDA-DirectDebit", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  
  it("createDDADirectDebitRequest - Positive: Create DDA direct debit request", async function () {
    // 生成唯一的boTransactionReferenceNo和boDDARefNo
    const timestamp = Date.now();
    const uniqueBOSRef = `BOSINBOSIN${timestamp}`;
    const uniqueDDARefNo = `DDA${timestamp}`;
    
    const requestData = {
      ...testData.createDDADirectDebitRequest.requestData,
      boDetail: {
        ...testData.createDDADirectDebitRequest.requestData.boDetail,
        boTransactionReferenceNo: uniqueBOSRef,
        boDDARefNo: uniqueDDARefNo
      }
    };
    console.log('请求数据:', JSON.stringify(requestData, null, 2));
    
    const response = await apiClient.post<any>(
      testData.createDDADirectDebitRequest.url + "?format=json",
      requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));

    const expected = testData.createDDADirectDebitRequest.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    expect(response.data.returnCode).to.equal(expected.returnCode);

    console.log(uniqueDDARefNo);
    try {
      await new NavigatePages().loginIdealx("SG2BE11", "SG2BE11API01", "123456");
      await _PaymentsPages.AccountTransferPage.paymentMenu.click();
      await _PaymentsPages.TransferCentersPage.loadCondition();
      await _PaymentsPages.TransferCentersPage.DDAMenu.click();
      await _PaymentsPages.TransferCentersPage.ddaFilter.input(uniqueDDARefNo);
      await _PaymentsPages.TransferCentersPage.ddaRefLink.jsClick();
      await promise.all([
          await ensure(_PaymentsPages.TransferCentersPage.ddaBillingOrganisation).textContains(testData.createDDADirectDebitRequest.requestData.boDetail.boName),
          await ensure(_PaymentsPages.TransferCentersPage.ddaStatus).textContains("Pending Approval"),
          await ensure(_PaymentsPages.TransferCentersPage.ddaBillRef).textContains(uniqueDDARefNo),
          await ensure(_PaymentsPages.TransferCentersPage.debitingAccount).textContains(testData.createDDADirectDebitRequest.requestData.applicantBankAccount),
          await ensure(_PaymentsPages.TransferCentersPage.purposeCode).textContains(testData.createDDADirectDebitRequest.requestData.boDetail.purpose),
          await ensure(_PaymentsPages.TransferCentersPage.purposeofDD).textContains(testData.createDDADirectDebitRequest.requestData.purposeofDD),
      ]);      
    } catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });
  
  it("Terminate DDA Direct Debit Request - Positive: Terminate DDA direct debit arrangement", async function () {
    // 生成唯一的boTransactionReferenceNo和boDDARefNo，以及当前时间
    const timestamp = Date.now();
    const uniqueBOSRef = `BOSTERM${timestamp}`;
    const uniqueDDARefNo = `DDATERM${timestamp}`;
    
    // 获取当前日期和时间
    const now = new Date();
    const currentDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const requestDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} 16:00:00`;
    const timeStamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    
    // 准备请求数据
    const requestData = {
      ...testData.terminateDDADirectDebit.requestData,
      rqstDt: requestDateTime,
      boDetail: {
        ...testData.terminateDDADirectDebit.requestData.boDetail,
        boTransactionReferenceNo: uniqueBOSRef,
        boDDARefNo: uniqueDDARefNo,
        timeStamp: timeStamp,
        effectiveTerminationDate: currentDate
      }
    };
    console.log('请求数据:', JSON.stringify(requestData, null, 2));
    
    const response = await apiClient.post<any>(
      testData.terminateDDADirectDebit.url + "?format=json",
      requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));

    const expected = testData.terminateDDADirectDebit.expectedResponses.success;

    expect(response.status).to.equal(200);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.rqUID).to.equal(expected.rqUID);
    console.log(uniqueDDARefNo);
    try {
      await new NavigatePages().loginIdealx("SG2BE11", "SG2BE11API01", "123456");
      await _PaymentsPages.AccountTransferPage.paymentMenu.click();
      await _PaymentsPages.TransferCentersPage.loadCondition();
      await _PaymentsPages.TransferCentersPage.DDAMenu.click();
      await _PaymentsPages.TransferCentersPage.ddaFilter.input(uniqueDDARefNo);
      await _PaymentsPages.TransferCentersPage.ddaRefLink.jsClick();
      await promise.all([
          await ensure(_PaymentsPages.TransferCentersPage.ddaBillingOrganisation).textContains(testData.terminateDDADirectDebit.requestData.boDetail.boName),
          await ensure(_PaymentsPages.TransferCentersPage.ddaStatus).textContains("Pending Approval"),
          await ensure(_PaymentsPages.TransferCentersPage.ddaBillRef).textContains(uniqueDDARefNo),
          await ensure(_PaymentsPages.TransferCentersPage.debitingAccount).textContains(testData.terminateDDADirectDebit.requestData.applicantBankAccount),
      ]);      
    } catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });
});

// Third-party Platforms Request
describe("Third-party Platforms ", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  //For CN 生成唯一的customerRefNo
  const timestamp = Date.now();
  const uniqueCustomerRefNo = `CN${timestamp}`;
  it("Create CN Third-party Platforms Request", async function () {
    // 获取当前时间并格式化为字符串，用于请求数据中的rqstDt字段
    const now = new Date();
    const requestDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const requestData = {
      ...testData.getThirdPartyApproval.requestData,
      rqstDt: requestDateTime,
      approvalItems: testData.getThirdPartyApproval.requestData.approvalItems.map(item => ({
        ...item,
        customerRefNo: uniqueCustomerRefNo
      }))
    };
    console.log('请求数据:', JSON.stringify(requestData, null, 2));

    const response = await apiClient.post<any>(
      testData.getThirdPartyApproval.url,
      requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));

    const expected = testData.getThirdPartyApproval.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.rqUID).to.equal(expected.rqUID);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    console.log(uniqueCustomerRefNo)
    
    try {
      await new NavigatePages().loginIdealx("CNP2A01", "CNP2A01API01", "123456");
      await _PaymentsPages.AccountTransferPage.thirdPartyMenu.click();
      await _PaymentsPages.AccountTransferPage.thirdPartyFilter.input(uniqueCustomerRefNo);
      await _PaymentsPages.AccountTransferPage.thirdPartyLink.jsClick();
      await promise.all([
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyAmt).textContains(testData.getThirdPartyApproval.amountValue),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyStatus).textContains("Pending Approval"),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyCcy).textContains(testData.getThirdPartyApproval.ccyValue),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyRef).textContains(uniqueCustomerRefNo),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyReqType).textContains(testData.getThirdPartyApproval.requestTypeValue),
      ]);
    } catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });

  it('Approve CN Third-party Platforms For update Final status', async function () {
    console.log(uniqueCustomerRefNo)
    await new NavigatePages().loginIdealx("CNP2A01", "CNP2A01API01", "123456");
    await _PaymentsPages.AccountTransferPage.thirdPartyMenu.click();
    await _PaymentsPages.AccountTransferPage.thirdPartyFilter.input(uniqueCustomerRefNo);
    await _PaymentsPages.AccountTransferPage.thirdPartyLink.jsClick();
    await _PaymentsPages.AccountTransferPage.approveButton.click();
    await browser.wait(
          ExpectedConditions.visibilityOf(_PaymentsPages.AccountTransferPage.finishedButton.element),
    )
    await Promise.all([
      await ensure(_PaymentsPages.AccountTransferPage.thirdPartyStatus).textContains("Approved"),
        ]);
  });

  it("Update Third Party Platforms Request Status - Bank Rejected", async function () {
    // 准备请求数据，使用之前测试中生成的uniqueCustomerRefNo
    const requestData = {
      ...testData.updateThirdPartyStatus.requestData,
      approvalItems: testData.updateThirdPartyStatus.requestData.approvalItems.map(item => ({
        ...item,
        customerRefNo: uniqueCustomerRefNo
      }))
    };
    console.log('请求数据:', JSON.stringify(requestData, null, 2));

    const response = await apiClient.post<any>(
      testData.updateThirdPartyStatus.url,
      requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));

    const expected = testData.updateThirdPartyStatus.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.rqUID).to.equal(expected.rqUID);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    
    console.log(uniqueCustomerRefNo)

    try {
      await new NavigatePages().loginIdealx("CNP2A01", "CNP2A01API01", "123456");
      await _PaymentsPages.AccountTransferPage.thirdPartyMenu.click();
      await _PaymentsPages.AccountTransferPage.thirdPartyFilter.input(uniqueCustomerRefNo);
      await _PaymentsPages.AccountTransferPage.thirdPartyLink.jsClick();
      await promise.all([
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyRejectReason).textContains(testData.updateThirdPartyStatus.requestData.approvalItems[0].rejectReason),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyStatus).textContains("Bank Rejected"),
      ]);
    } catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });

  it("Create IN Third Party Payment", async function () {
    // 生成唯一的merchantReference和当天时间（ISO 8601格式）
    const uniqueMerchantRef = `UDB${Date.now()}`;
    const now = new Date();
    const requestDateTime = now.toISOString().replace('Z', '').replace(/\.\d{3}/, '.314');

    const requestData = {
      ...testData.createThirdpartyPayment.requestData,
      rqstDt: requestDateTime,
      customerDetails: {
        ...testData.createThirdpartyPayment.requestData.customerDetails,
        merchantReference: uniqueMerchantRef
      }
    };
    console.log('请求数据:', JSON.stringify(requestData, null, 2));

    const response = await apiClient.post<any>(
      testData.createThirdpartyPayment.url,
      requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));

    const expected = testData.createThirdpartyPayment.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.rqUID).to.equal(expected.rqUID);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    
    console.log(uniqueMerchantRef);
    try {
      await new NavigatePages().loginIdealx("SPIN01", "SPIN01V01", "123456");
      await _PaymentsPages.AccountTransferPage.thirdPartyMenu.click();
      await _PaymentsPages.AccountTransferPage.thirdPartyFilter.input(uniqueMerchantRef);
      await _PaymentsPages.AccountTransferPage.thirdPartyLink.jsClick();
      await promise.all([
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyAmt).textContains(testData.createThirdpartyPayment.amountValue),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyStatus).textContains("Pending Approval"),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyCcy).textContains(testData.createThirdpartyPayment.ccyValue),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyRef).textContains(uniqueMerchantRef),
          await ensure(_PaymentsPages.AccountTransferPage.thirdPartyReqType).textContains(testData.createThirdpartyPayment.rqstTypeValue),
      ]); 
    } catch (error) {
      console.error('UI校验过程中出现错误:', error);
      // 可以选择继续抛出错误或标记测试为失败
      throw error;
    }
  });
});

// File Exchange Request测试用例
describe("File Exchange", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  
  const timestamp = Date.now();
  const uniquePwebRefNo = `STMTOPT${timestamp}`;
  it("Create File Exchange Request - Account Maintenance (e-Form)", async function () {
    const requestData = {
      ...testData.createFileExRequest.requestData,
      pwebRefNo: uniquePwebRefNo,
    };
    const response = await apiClient.post<any>(
      testData.createFileExRequest.url,requestData
    );
    
    console.log('API响应:', JSON.stringify(response.data, null, 2));
 
    const expected = testData.createFileExRequest.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.rqUID).to.equal(expected.rqUID);
    expect(response.data.apiName).to.equal(expected.apiName);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    console.log('File Exchange Request成功完成');
  });

  it("Get File Exchange ActivityLog", async function () {
    console.log(uniquePwebRefNo);
    const requestData = {
      ...testData.getFileExRequest.requestData,
      rqstRef: uniquePwebRefNo,
    };
    const response = await apiClient.post<any>(
      testData.getFileExRequest.url,requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));
 
    const expected = testData.getFileExRequest.expectedResponses.success;

    expect(response.status).to.equal(200);
    expect(response.data.rqUID).to.equal(expected.rqUID);
    expect(response.data.apiName).to.equal(expected.apiName);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.rqstRef).to.equal(uniquePwebRefNo);
    expect(response.data.fileName).to.equal(expected.fileName);
    expect(response.data.activityLog[0].action).to.equal(expected.activityLog[0].action);
    expect(response.data.activityLog[0].userName).to.equal(expected.activityLog[0].userName);
    expect(response.data.activityLog[0].orgID).to.equal(expected.activityLog[0].orgID);
    expect(response.data.activityLog[0].userID).to.equal(expected.activityLog[0].userID);
  });
});

// 检查昵称是否存在测试用例
describe("Check-Nickname", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  
  it("checkNicknameExist - Positive: Check if nickname exists", async function () {
    const response = await apiClient.post<any>(
      testData.checkNicknameExist.url,
      testData.checkNicknameExist.requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));
    const expected = testData.checkNicknameExist.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.rqUID).to.equal(expected.rqUID);
    expect(response.data.apiName).to.equal(expected.apiName);
    expect(response.data.returnStatus).to.equal(expected.returnStatus);
    expect(response.data.returnCode).to.equal(expected.returnCode);
    expect(response.data.isNicknameExist).to.equal(expected.isNicknameExist);
  });
});

describe("Bill Payment", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  let auReference = "";
  let sgReference = "";
  let interfaceRefNum = "";
  it('Create AU Bill Payment with Approve Now For Update Final Status', async function () {
    await new NavigatePages().loginIdealx("AUTOAU01", "AUTOAU01API01", "123456");
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.NewBillPaymentPage.billMenu.click();
    await _PaymentsPages.NewBillPaymentPage.loadCondition();
    await _PaymentsPages.NewBillPaymentPage.billerCode.input(testData.auBillPayment.billCode);
        //await _PaymentsPages.NewBillPaymentPage.scrollTo(0,300)
        await _PaymentsPages.NewBillPaymentPage.SearchBtn.click();
        await _PaymentsPages.NewBillPaymentPage.billReference.input(testData.auBillPayment.CustomerReference);
        await _PaymentsPages.NewBillPaymentPage.amount.input(testData.auBillPayment.amount);
        await _PaymentsPages.NewBillPaymentPage.verifyBill.click();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.VerifySuccessMsg1).textContains(testData.auBillPayment.successmsg1),
            await ensure(_PaymentsPages.NewBillPaymentPage.VerifySuccessMsg2).textContains(testData.auBillPayment.successmsg2)
        ])
        await _PaymentsPages.NewBillPaymentPage.debitAccount.select(testData.auBillPayment.debitAccount);
        await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
        await _PaymentsPages.NewBillPaymentPage.approvalNowCheckBox.jsClick();
        await _PaymentsPages.NewBillPaymentPage.approveButton.jsClick();
        await _PaymentsPages.NewBillPaymentPage.loadConditionForSubmittedPage();
        await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
            auReference = text;
        });
        await _PaymentsPages.NewBillPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(auReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains("Received"),
        ]);
    });
  it("Update AU Bill Payment Status - Bank Rejected", async function () {
    console.log('开始Update AU Bill Payment Status - Bank Rejected流程...');
    console.log(auReference);
    interfaceRefNum = auReference;
    const requestTemplate = testData.aubpAck2.requestData;
    // 深拷贝避免修改原模板
    const requestData = JSON.parse(JSON.stringify(requestTemplate)); 
    requestData.body.trnResponse.interfaceRefNum = interfaceRefNum; 
    const response = await apiClient.post<any>(
      testData.aubpAck2.url,
      requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));
    const expected = testData.aubpAck2.expectedResponses.success;
    expect(response.status).to.equal(200);
    await new NavigatePages().loginIdealx("AUTOAU01", "AUTOAU01API01", "123456");
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(auReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains("Bank Rejected"),
            await ensure(_PaymentsPages.NewBillPaymentPage.viewRejectReason).textContains(testData.aubpAck2.requestData.body.trnResponse.desc),
        ]);
  });

  it('Create SG Bill Payment with Approve Now For Update Final Status', async function () {
    await new NavigatePages().loginIdealx("AUTOSG03", "AUTOSG03API03", "123456");
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.NewBillPaymentPage.billMenu.click();
    await _PaymentsPages.NewBillPaymentPage.loadCondition();
    await _PaymentsPages.NewBillPaymentPage.BillOrganisation.select(testData.sgBillPayment.BillOrganisation);
    await _PaymentsPages.NewBillPaymentPage.billReference.input(testData.sgBillPayment.BillReference);
    await _PaymentsPages.NewBillPaymentPage.amount.input(testData.sgBillPayment.amount);
    await _PaymentsPages.NewBillPaymentPage.debitAccount.select(testData.sgBillPayment.debitAccount);
    await _PaymentsPages.NewBillPaymentPage.NextButton.jsClick();
    await _PaymentsPages.NewBillPaymentPage.loadConditionForPreviewPage();
    await _PaymentsPages.NewBillPaymentPage.approvalNowCheckBox.jsClick();
    await _PaymentsPages.NewBillPaymentPage.approveButton.jsClick();
    await _PaymentsPages.NewBillPaymentPage.loadConditionForSubmittedPage();
    await _PaymentsPages.NewBillPaymentPage.getIdealxInfoReferenceID().then(text => {
            sgReference = text;
        });
        await _PaymentsPages.NewBillPaymentPage.finishedButton.click();
        await _PaymentsPages.AccountTransferPage.paymentMenu.click();
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(sgReference);
        await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains("Received"),
        ]);
    });
  it("Update SG Bill Payment Status - Completed", async function () {
    console.log('开始Update SG Bill Payment Status - Completed流程...');
    console.log(sgReference);
    interfaceRefNum = sgReference;
    const requestTemplate = testData.sgbpAck2.requestData;
    // 深拷贝避免修改原模板
    const requestData = JSON.parse(JSON.stringify(requestTemplate)); 
    requestData.eventPayload.body.trnResponse.interfaceRefNum = interfaceRefNum; 
    const response = await apiClient.post<any>(
      testData.sgbpAck2.url,
      requestData
    );
    console.log('API响应:', JSON.stringify(response.data, null, 2));
    const expected = testData.sgbpAck2.expectedResponses.success;
    expect(response.status).to.equal(200);
    expect(response.data.eventPayload.body.trnResponse.interfaceRefNum).to.equal(interfaceRefNum);
    expect(response.data.eventPayload.body.trnResponse.txnStatus.status).to.equal(expected.eventPayload.body.trnResponse.txnStatus.status);
    await new NavigatePages().loginIdealx("AUTOSG03", "AUTOSG03API03", "123456");
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(sgReference);
    await _PaymentsPages.NewBillPaymentPage.loadConditionOnViewNewUI();
        await Promise.all([
            await ensure(_PaymentsPages.NewBillPaymentPage.transactionStatus).textContains("Completed"),
        ]);
  });
});

describe("IDEALX-queryFixedDeposit", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this;beforeEach(async function() { process.env.currentTestTitle = this.currentTest.title; });afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  it("queryFixedDepositList - Positive: Query list and verify response is not empty", async function () {
    const requestData = testData.queryFixedDepositList.requestData;
    const response = await apiClient.post<any>(
      testData.queryFixedDepositList.url,
      requestData
    );
    expect(response.status).to.equal(200, "HTTP响应状态码应为200");
    expect(response.data.payments[0].instructionId).to.equal(testData.queryFixedDepositList.expectedResponses.payments[0].instructionId);
    expect(response.data.payments[1].instructionId).to.equal(testData.queryFixedDepositList.expectedResponses.payments[1].instructionId);
  });

  it("queryFixedDepositDetail - Positive: Query detail and verify key fields", async function () {
    const requestData = testData.queryFixedDepositDetail.requestData;
    const response = await apiClient.post<any>(
      testData.queryFixedDepositDetail.url,
      requestData
    );
    const expectedFields = testData.queryFixedDepositDetail.expectedResponse;
    expect(response.status).to.equal(200, "HTTP响应状态码应为200");
    expect(response.data.returnStatus).to.equal(expectedFields.returnStatus, "returnStatus不匹配");
    expect(response.data.returnCode).to.equal(expectedFields.returnCode, "returnCode不匹配");
    expect(response.data.requestReference).to.equal(expectedFields.requestReference, "requestReference不匹配");
    expect(response.data.placementAmount).to.equal(expectedFields.placementAmount, "placementAmount不匹配");
    expect(response.data.placementCurrency).to.equal(expectedFields.placementCurrency, "placementCurrency不匹配");
    expect(response.data.fundingAccountNo).to.equal(expectedFields.fundingAccountNo, "fundingAccountNo不匹配");
    expect(response.data.fundingAccountNoDisplay).to.equal(expectedFields.fundingAccountNoDisplay, "fundingAccountNoDisplay不匹配");
    expect(response.data.fundingAccountCcy).to.equal(expectedFields.fundingAccountCcy, "fundingAccountCcy不匹配");
    expect(response.data.fundingAccountName).to.equal(expectedFields.fundingAccountName, "fundingAccountName不匹配");
    expect(response.data.depositAccountNo).to.equal(expectedFields.depositAccountNo, "depositAccountNo不匹配");
    expect(response.data.depositAccountName).to.equal(expectedFields.depositAccountName, "depositAccountName不匹配");
    expect(response.data.requestStatus).to.equal(expectedFields.requestStatus, "requestStatus不匹配");
  });
});

describe("IDEALX-getOrgApproverList", function () {
  this.retries(browser.params.caseRetryTimes);
  const suitObject = this;beforeEach(async function() { process.env.currentTestTitle = this.currentTest.title; });afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });
  it("getOrgApproverListLite - Positive: Query approver list and verify all fields", async function () {
    const requestData = testData.getOrgApproverListLite.requestData;
    const response = await apiClient.post<any>(
      testData.getOrgApproverListLite.url,
      requestData
    );
    const expected = testData.getOrgApproverListLite.expectedResponse;
    const expectedApprover = expected.userDataList[0];
    const actualApprover = response.data.userDataList[0];
    expect(response.status).to.equal(200, "HTTP响应状态码应为200");
    expect(response.data.rqUID).to.equal(expected.rqUID, "rqUID不匹配");
    expect(response.data.apiName).to.equal(expected.apiName, "apiName不匹配");
    expect(response.data.returnStatus).to.equal(expected.returnStatus, "returnStatus不匹配");
    expect(response.data.returnCode).to.equal(expected.returnCode, "returnCode不匹配");
    expect(response.data.affiliateId).to.equal(expected.affiliateId, "affiliateId不匹配");
    expect(actualApprover.userId).to.equal(expectedApprover.userId, "审批人userId不匹配");
    expect(actualApprover.userName).to.equal(expectedApprover.userName, "审批人userName不匹配");
    expect(actualApprover.email).to.equal(expectedApprover.email, "审批人email不匹配");
    expect(actualApprover.mobileNumber).to.equal(expectedApprover.mobileNumber, "审批人mobileNumber不匹配");
    expect(actualApprover.dateOfBirth).to.equal(expectedApprover.dateOfBirth, "审批人dateOfBirth不匹配");
  });

   it("getOrgApproverList - Positive: Query full approver list and verify all fields", async function () {
    const requestData = testData.getOrgApproverList.requestData;
    const response = await apiClient.post<any>(
      testData.getOrgApproverList.url,
      requestData
    );
    const expected = testData.getOrgApproverList.expectedResponse;
    const expectedUserItem = expected.userDataList[0];
    const expectedUserData = expectedUserItem.userData;
    const actualUserItem = response.data.userDataList[0];
    const actualUserData = actualUserItem.userData;

    expect(response.status).to.equal(200, "HTTP响应状态码应为200");
    expect(response.data.rqUID).to.equal(expected.rqUID, "rqUID不匹配");
    expect(response.data.apiName).to.equal(expected.apiName, "apiName不匹配");
    expect(response.data.returnStatus).to.equal(expected.returnStatus, "returnStatus不匹配");
    expect(response.data.returnCode).to.equal(expected.returnCode, "returnCode不匹配");
    expect(actualUserItem).to.have.property('userData').that.is.an('object', "userData应为对象类型");
    expect(actualUserData.userName).to.equal(expectedUserData.userName, "审批人userName不匹配");
    expect(actualUserData.email).to.equal(expectedUserData.email, "审批人email不匹配");
    expect(actualUserData.mobileNumber).to.equal(expectedUserData.mobileNumber, "审批人mobileNumber不匹配");
    expect(actualUserData.dateOfBirth).to.equal(expectedUserData.dateOfBirth, "审批人dateOfBirth不匹配");
  });
});

async function createINTaxPayment(): Promise<{ idealRefNumber: string; executionDate: string }> {
  // 获取当前日期并格式化为YYYY-MM-DD
  const now = new Date();
  const indiaDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const executionDate = `${indiaDate.getFullYear()}-${String(indiaDate.getMonth() + 1).padStart(2, '0')}-${String(indiaDate.getDate()).padStart(2, '0')}`;
  
  // 从测试数据文件加载支付请求数据
  const paymentRequest = {
    ...testData.createINTAXPayment.requestData,
    executionDate: executionDate,
    expiryDateTime: `${executionDate} 23:50:00`
  };

  console.log('支付请求数据:', JSON.stringify(paymentRequest, null, 2));

  // 发送支付创建请求
  const response = await apiClient.post<any>(
    testData.createINTAXPayment.url,
    paymentRequest
  );

  // 验证API响应
  expect(response.status).to.equal(200);
  expect(response.data.returnStatus).to.equal(testData.createINTAXPayment.expectedResponses.success.returnStatus);
  expect(response.data.returnCode).to.equal(testData.createINTAXPayment.expectedResponses.success.returnCode);
  expect(response.data.paymentSubType).to.equal(testData.createINTAXPayment.expectedResponses.success.paymentSubType);
  
  // 提取交易参考号
  const idealRefNumber = response.data.idealRefNumber;
  console.log('生成的交易参考号:', idealRefNumber);

  return { idealRefNumber, executionDate };
}

// 生成随机数据的辅助函数
function generateRandomIdentityNum(): string {
  const prefix = 'S';
  const numbers = Math.floor(1000000 + Math.random() * 9000000); // 7位随机数字
  const checksum = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // 随机字母
  return `${prefix}${numbers}${checksum}`;
}

function generateRandomAccountNum(): string {
  return '000' + Math.floor(18000000000000 + Math.random() * 20000000000000).toString().slice(0, 13);
}

// 创建支付交易的函数
async function createEDPPayment(): Promise<{ idealRefNumber: string; executionDate: string }> {
  // 获取当前日期并格式化为YYYY-MM-DD
  const today = new Date();
  const executionDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 从测试数据文件加载支付请求数据
  const paymentRequest = {
    ...testData.createEDPPayment.requestData,
    executionDate: executionDate,
    expiryDateTime: `${executionDate} 20:20:00`
  };

  console.log('支付请求数据:', JSON.stringify(paymentRequest, null, 2));

  // 发送支付创建请求
  const response = await apiClient.post<any>(
    testData.createEDPPayment.url,
    paymentRequest
  );

  // 验证API响应
  expect(response.status).to.equal(200);
  expect(response.data.returnStatus).to.equal(testData.createEDPPayment.expectedResponses.success.returnStatus);
  expect(response.data.returnCode).to.equal(testData.createEDPPayment.expectedResponses.success.returnCode);
  
  // 提取交易参考号
  const idealRefNumber = response.data.idealRefNumber;
  console.log('生成的交易参考号:', idealRefNumber);

  return { idealRefNumber, executionDate };
}