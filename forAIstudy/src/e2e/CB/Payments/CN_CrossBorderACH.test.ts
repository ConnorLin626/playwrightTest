/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, PaymentsPages, ApprovalsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { saveScreen, ensure, SIT, handlerCase } from '../../../lib';
import { browser } from 'protractor';

let reference: string = null;
let fileName: string = null;
let fileNameByFile: string = null;
let _PaymentsPages = new PaymentsPages();
let testData = _PaymentsPages.fetchTestData('CN_testData.json');

describe('CN - Cross Border Payments', async function () {
  this.retries(browser.params.caseRetryTimes);
  before(async function () {
    await new NavigatePages().loginCB(
      SIT ? testData.CrossBorder.SIT.loginCompanyId : testData.CrossBorder.UAT.loginCompanyId,
      SIT ? testData.CrossBorder.SIT.loginUserId : testData.CrossBorder.UAT.loginUserId);
  });
  const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this); });

  it('Create a Cross Border ACH Payment with upload file', async function () {

    await _PaymentsPages.openMenu(Menu.Payments.CrossBoarderACH);
    await _PaymentsPages.crossBoarderACHPage.loadCondition();
    await _PaymentsPages.crossBoarderACHPage.fromAccount.select(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount);
    await _PaymentsPages.crossBoarderACHPage.paymentCountry.select(testData.CrossBorder.paymentCountry);
    await _PaymentsPages.crossBoarderACHPage.debitType.select(testData.CrossBorder.debitType);
    await _PaymentsPages.crossBoarderACHPage.addExistingPayee(SIT ? testData.CrossBorder.SIT.existingFilterValue : testData.CrossBorder.UAT.existingFilterValue);
    await _PaymentsPages.crossBoarderACHPage.payeeAmount.input(testData.CrossBorder.amount);
    await _PaymentsPages.crossBoarderACHPage.purposePaymentLine.input(testData.CrossBorder.purposePaymentLine);
    await _PaymentsPages.crossBoarderACHPage.counterPartyCode.select(testData.CrossBorder.counterPartyCode);
    await _PaymentsPages.crossBoarderACHPage.specPmtPurpose.select(testData.CrossBorder.specPmtPurpose);
    await _PaymentsPages.crossBoarderACHPage.pmtCategory1.select(testData.CrossBorder.pmtCategory1);
    await _PaymentsPages.crossBoarderACHPage.seriesCode1.select(testData.CrossBorder.seriesCode1);
    await _PaymentsPages.crossBoarderACHPage.cnttTransRemark1.input(testData.CrossBorder.cnttTransRemark1);
    await _PaymentsPages.crossBoarderACHPage.digiDocFileUploadButton.select(testData.CrossBorder.fileName);
    await _PaymentsPages.crossBoarderACHPage.utilizedAmount.input(testData.CrossBorder.amount);
    await _PaymentsPages.crossBoarderACHPage.showHideDetail.click();
    await _PaymentsPages.crossBoarderACHPage.paymentDetailLine.input(testData.CrossBorder.paymentDetailLine);
    await _PaymentsPages.crossBoarderACHPage.nextButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
    await _PaymentsPages.crossBoarderACHPage.submitButton.click();
    await _PaymentsPages.crossBoarderACHPage.loadCondition4Preview();
    await _PaymentsPages.crossBoarderACHPage.getInfoReferenceID().then(text => {
      reference = text;
      console.log(reference);
    });
    await ensure(_PaymentsPages.crossBoarderACHPage).isUXSuccess();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await _PaymentsPages.crossBoarderACHPage.wait4ViewCrsBrdUXScreenReady();
    await Promise.all([
      await ensure(_PaymentsPages.crossBoarderACHPage.fromAccountView).textContains(SIT ? testData.CrossBorder.SIT.fromAccount : testData.CrossBorder.UAT.fromAccount),
      await ensure(_PaymentsPages.crossBoarderACHPage.amountView).textContains(testData.CrossBorder.amount),
      await ensure(_PaymentsPages.crossBoarderACHPage.crsBrdTransactionStatusValue).textIs(testData.status.PendingApproval),
      await ensure(_PaymentsPages.crossBoarderACHPage.digiDocUploaded).textContains(testData.CrossBorder.fileName),
    ]);
  });
});
