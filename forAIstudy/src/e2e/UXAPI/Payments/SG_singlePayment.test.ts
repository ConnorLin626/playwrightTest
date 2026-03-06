/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { GateWayJsonApi, ensure, SIT, saveScreen, handleRequestQs, getCurrentIsSingleView, getRandomString, handlerCase } from "../../../lib";
import { NavigatePages } from "../../../pages/Navigate";
import { SessionPages } from "../../../pages/UXAPI/SessionPages";
import { browser } from "protractor";

let _SessionPages = new SessionPages();
let testData = _SessionPages.fetchTestData('/UXAPI/UXAPI_testData.json');

describe('SGSinglePayments', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.SIT.loginCompanyId : testData.UAT.loginCompanyId,
      SIT ? testData.SIT.loginUserId : testData.UAT.loginUserId
    );
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('paymentTypeData', async function () {
    let paymentTypeData = testData.paymentTypeData;
    //Get current user qs and subOrgId value
    paymentTypeData.getDataByPmtTypeReq = handleRequestQs(paymentTypeData.getDataByPmtTypeReq);
    paymentTypeData.getDataByPmtTypeReq.isSingleView = getCurrentIsSingleView();
    let getpaymentTypeDataApi = new GateWayJsonApi('/mbg-banking/customer/aciux/getDataByPmtType?format=json');
    //Request validate
    await Promise.all([
      //Determine whether mandatory field
      await ensure(getpaymentTypeDataApi).isMandatory(paymentTypeData.getDataByPmtTypeReq.qs, true)
    ]);
    await getpaymentTypeDataApi.post(paymentTypeData);
    //Response validate
    await Promise.all([
      //Determine whether the interface returnCode successfully
      await ensure(getpaymentTypeDataApi).isSuccess('getDataByPmtTypeRes.returnCode', 'UX0000'),
      //Determine whether the input field has a return value
      await ensure(getpaymentTypeDataApi).isReturnValue('getDataByPmtTypeRes.returnStatus', true),
      //Match file value total count is it correct
      await ensure(getpaymentTypeDataApi).isMatchesCount('getDataByPmtTypeRes.accounts.account', SIT ? paymentTypeData.SIT.totalAccounts : paymentTypeData.UAT.totalAccounts),
      //Match the value under file Is it equal what we expect (Can be used in multi-layer structure)
      await ensure(getpaymentTypeDataApi).isMatchesCollection('getDataByPmtTypeRes.accounts.account',
        {
          'acctNum': SIT ? paymentTypeData.SIT.acctNum : paymentTypeData.UAT.acctNum,
          'acctSwiftbic': SIT ? paymentTypeData.SIT.acctSwiftbic : paymentTypeData.UAT.acctSwiftbic,
          'authorizedTypeCodes.values': ['sgact', 'sgtt', 'sgg3pmt', 'sgmeps', 'sggiro']
        }),
      //Determine file data is intersect with expect data.
      await ensure(getpaymentTypeDataApi).isMatchesIntersection(
        'getDataByPmtTypeRes.accounts.account', 'acctNum',
        SIT ? paymentTypeData.SIT.acctNum : paymentTypeData.UAT.acctNum, 'authorizedTypeCodes.values', ['sgact', 'sgtt', 'sgg3pmt', "sgmeps"]),
      //Match single field value is it consistent
      await ensure(getpaymentTypeDataApi).isMatchesValue('getDataByPmtTypeRes.canCreateDomesticPayee', SIT ? paymentTypeData.SIT.canCreateDomesticPayee : paymentTypeData.UAT.canCreateDomesticPayee),
      await ensure(getpaymentTypeDataApi).isMatchesValue('getDataByPmtTypeRes.canCreateIntlPayee', SIT ? paymentTypeData.SIT.canCreateIntlPayee : paymentTypeData.UAT.canCreateIntlPayee),
      await ensure(getpaymentTypeDataApi).isMatchesValue('getDataByPmtTypeRes.canCreateNewPayNow', SIT ? paymentTypeData.SIT.canCreateNewPayNow : paymentTypeData.UAT.canCreateNewPayNow),
      await ensure(getpaymentTypeDataApi).isMatchesValue('getDataByPmtTypeRes.canCreatePayee', SIT ? paymentTypeData.SIT.canCreatePayee : paymentTypeData.UAT.canCreatePayee)
    ]);
  });

  it('payeeList', async function () {

    let payeeList = testData.payeeList;
    payeeList.payeeListInqReq = handleRequestQs(payeeList.payeeListInqReq);
    let getPayeeListApi = new GateWayJsonApi('/mbg-banking/customer/aciux/payeeListInq?format=json');
    await getPayeeListApi.post(payeeList);
    await Promise.all([
      await ensure(getPayeeListApi).isSuccess('payeeListInqRes.returnCode', 'UX0000')
    ]);
  });

  it('displayLink', async function () {

    let displayLink = testData.displayLink;
    displayLink.getDisplayLinkReq = handleRequestQs(displayLink.getDisplayLinkReq);
    let getPayeeListApi = new GateWayJsonApi('/mbg-banking/customer/aciux/getDisplayLink?format=json');
    await getPayeeListApi.post(displayLink);
    await Promise.all([
      await ensure(getPayeeListApi).isSuccess('getDisplayLinkRes.returnCode', 'UX0000')
    ]);
  });

  it('countryList', async function () {

    let countryList = testData.countryList;
    countryList.countryListInqReq = handleRequestQs(countryList.countryListInqReq);
    let getPayeeListApi = new GateWayJsonApi('/mbg-banking/customer/aciux/countryListInq?format=json');
    await getPayeeListApi.post(countryList);
    await Promise.all([
      await ensure(getPayeeListApi).isSuccess('countryListInqRes.returnCode', 'UX0000')
    ]);
  });

  it('validatePayment', async function () {

    let validatePayment = testData.validatePayment;
    validatePayment.validatePaymentReq = handleRequestQs(validatePayment.validatePaymentReq);
    SIT ? (validatePayment.validatePaymentReq.acctKey = testData.SIT.acctKey) : (validatePayment.validatePaymentReq.acctKey = testData.UAT.acctKey);
    SIT ? (validatePayment.validatePaymentReq.payeeList.payeeRecord[0].payeeKey = testData.SIT.payeeKey) :
      (validatePayment.validatePaymentReq.payeeList.payeeRecord[0].payeeKey = testData.UAT.payeeKey);
    //Generate random reference
    validatePayment.validatePaymentReq.custRef = getRandomString(8);
    let getPayeeListApi = new GateWayJsonApi('/mbg-banking/customer/aciux/validatePayment?format=json');
    //Request validate
    await Promise.all([
      //Validate whether within the max length
      await ensure(getPayeeListApi).isWithinLength(validatePayment.validatePaymentReq.custRef, 16),
      // Validate date format (Whether it is yyyy-mm-dd)
      await ensure(getPayeeListApi).dateValidate(validatePayment.validatePaymentReq.executionDate)
    ]);
    await getPayeeListApi.post(validatePayment);
    await Promise.all([
      await ensure(getPayeeListApi).isSuccess('validatePaymentRes.returnCode', 'UX0000'),
      await ensure(getPayeeListApi).isMatchesCollection('validatePaymentRes',
        { 'isTemplateAllow': true }),
    ]);
  });

  it('createPayment', async function () {

    let createPayment = testData.createPayment;
    createPayment.createPaymentReq = handleRequestQs(createPayment.createPaymentReq);
    SIT ? (createPayment.createPaymentReq.acctKey = testData.SIT.acctKey) : (createPayment.createPaymentReq.acctKey = testData.UAT.acctKey);
    SIT ? (createPayment.createPaymentReq.payeeList.payeeRecord[0].payeeKey = testData.SIT.payeeKey) :
      (createPayment.createPaymentReq.payeeList.payeeRecord[0].payeeKey = testData.UAT.payeeKey);
    let getPayeeListApi = new GateWayJsonApi('/mbg-banking/customer/aciux/createPayment?format=json');
    await getPayeeListApi.post(createPayment);
    await Promise.all([
      await ensure(getPayeeListApi).isSuccess('createPaymentRes.returnCode', 'UX0000')
    ]);
  });

});