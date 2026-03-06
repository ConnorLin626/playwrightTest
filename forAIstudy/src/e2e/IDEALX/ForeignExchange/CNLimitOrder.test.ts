/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, ForeignExchangePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE, } from "../../../lib";
import { browser } from "protractor";
import * as moment from "moment"

let _ForeignExchangePages = new ForeignExchangePages();
let testData = _ForeignExchangePages.fetchTestData("CN_testData.json");
let currentDate = moment(new Date()).format("DD MMM YYYY");
let transactionReference = ''
let txnReferenceforCancel = ''
let txnReferenceforReject = ''
let txnReferenceforApprove = ''

describe("CN Limit Order", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.CNLimitOrder.SIT.loginCompanyId : testData.CNLimitOrder.UAT.loginCompanyId, SIT ? testData.CNLimitOrder.SIT.loginUserId : testData.CNLimitOrder.UAT.loginUserId, testData.CNLimitOrder.UAT.pinID); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create CN Limit Order - Self Approve", async function () {
        await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
        await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        await _ForeignExchangePages.limitOrderPage.createNewBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadConditionForCreatePage();
        await _ForeignExchangePages.limitOrderPage.sellAccountCCY.click();
        await _ForeignExchangePages.limitOrderPage.searchButton.input(SIT?testData.CNLimitOrder.sellAccountCCY:testData.CNLimitOrder.sellUATAccountCCY)
        await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
        await _ForeignExchangePages.limitOrderPage.amount.input(testData.CNLimitOrder.amountA1);
        await _ForeignExchangePages.limitOrderPage.buyAccountCCY.click();
        await _ForeignExchangePages.limitOrderPage.searchButton.input(testData.CNLimitOrder.buyAccountCCY);
        await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
        await _ForeignExchangePages.limitOrderPage.subBtn.click();
        await _ForeignExchangePages.limitOrderPage.scrollTo(0,500);
        await _ForeignExchangePages.limitOrderPage.sellAccountBtn.click();
        if(SIT)
        {
          await _ForeignExchangePages.limitOrderPage.sellAccountValue.jsClick();
        }else{
          await _ForeignExchangePages.limitOrderPage.sellUATAccountValue.jsClick();
        }
        //await _ForeignExchangePages.limitOrderPage.sellAccountValue.jsClick();
        await _ForeignExchangePages.limitOrderPage.buyAccountBtn.click();
        await _ForeignExchangePages.limitOrderPage.buyAccountValue.click();
        await _ForeignExchangePages.limitOrderPage.pmtCategory1.click();
        await _ForeignExchangePages.limitOrderPage.pmtCategory1Value.jsClickIfExist()
        await _ForeignExchangePages.limitOrderPage.seriesCode1.click();
        await _ForeignExchangePages.limitOrderPage.seriesCode1Value.jsClickIfExist();
        await _ForeignExchangePages.limitOrderPage.expireDate.select(currentDate);
        await _ForeignExchangePages.limitOrderPage.remarks.input(testData.CNLimitOrder.remarks)
        await _ForeignExchangePages.limitOrderPage.nextBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadConditionForPreviewPage();
        await _ForeignExchangePages.limitOrderPage.sentToApproveBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForApprovePage();
        await _ForeignExchangePages.limitOrderPage.getChallengeBtn.click();
        await _ForeignExchangePages.limitOrderPage.responseCode.input(testData.CNLimitOrder.responseCode);
        await _ForeignExchangePages.limitOrderPage.submitBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadConditionForSubmitPage();
        await _ForeignExchangePages.limitOrderPage.transactionReference.getText().then(Text => {
          transactionReference = Text.trim();
        });
        await _ForeignExchangePages.limitOrderPage.goToOrderOverviewBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(transactionReference);
        await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();

        await Promise.all([
            await ensure(_ForeignExchangePages.limitOrderPage.transactionStatus).textContainsLessOne(testData.status.Approved,testData.status.Active),
            await ensure(_ForeignExchangePages.limitOrderPage.fromAccountView).textIs(SIT ? testData.CNLimitOrder.SIT.sellAccountValue : testData.CNLimitOrder.UAT.sellAccountValue),
            await ensure(_ForeignExchangePages.limitOrderPage.toAccountView).textIs(SIT ? testData.CNLimitOrder.SIT.buyAccountValue : testData.CNLimitOrder.UAT.buyAccountValue),
            await ensure(_ForeignExchangePages.limitOrderPage.sellAmountView).textContains(testData.CNLimitOrder.amountA1),
            await ensure(_ForeignExchangePages.limitOrderPage.buyAmountView).textContains(SIT?testData.CNLimitOrder.buyAmount:testData.CNLimitOrder.buyUATamount),
            await ensure(_ForeignExchangePages.limitOrderPage.expireDateViewCN).textIs(currentDate),
    
        ]);
    });

    it("Cancel CN Limit Order", async function () {
        await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
        await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        if (0 !== transactionReference.trim().length) {
          await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(transactionReference)
        } else {
            await _ForeignExchangePages.limitOrderPage.goToViewLimitOrderViaSearch(testData.status.Active)
        }      
        await _ForeignExchangePages.limitOrderPage.txnRefLink.getText().then(Text => {
          txnReferenceforCancel = Text.trim();
        });
        await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();
        await _ForeignExchangePages.limitOrderPage.cancelOrder.jsClick();
        await _ForeignExchangePages.limitOrderPage.processBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforCancel)
        await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();

        await Promise.all([
            await ensure(_ForeignExchangePages.limitOrderPage.transactionStatus).textContainsLessOne(testData.status.Cancelled)
        ])
    });

    it("Create CN Limit Order - Send to another approver", async function () {
        await createLimitOrder();
        await _ForeignExchangePages.limitOrderPage.transactionReference.getText().then(async value => {
          txnReferenceforApprove = value;
        });
        await _ForeignExchangePages.limitOrderPage.goToOrderOverviewBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforApprove);
        await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();

        await Promise.all([
            await ensure(_ForeignExchangePages.limitOrderPage.transactionStatus).textContains(testData.status.PendingApproval),
            await ensure(_ForeignExchangePages.limitOrderPage.fromAccountView).textIs(SIT ? testData.CNLimitOrder.SIT.sellAccountValue : testData.CNLimitOrder.UAT.sellAccountValue),
            await ensure(_ForeignExchangePages.limitOrderPage.toAccountView).textIs(SIT ? testData.CNLimitOrder.SIT.buyAccountValue : testData.CNLimitOrder.UAT.buyAccountValue),
            await ensure(_ForeignExchangePages.limitOrderPage.sellAmountView).textContains(testData.CNLimitOrder.amountA1),
            await ensure(_ForeignExchangePages.limitOrderPage.buyAmountView).textContains(testData.CNLimitOrder.buyAmount),
            await ensure(_ForeignExchangePages.limitOrderPage.expireDateViewCN).textIs(currentDate),
        ]);
    });

    it("Approve CN Limit Order", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.CNLimitOrder.SIT.loginCompanyId : testData.CNLimitOrder.UAT.loginCompanyId, SIT ? testData.CNLimitOrder.SIT.loginUserId : testData.CNLimitOrder.UAT.loginUserId, "123123");
        await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
        await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        if (0 !== txnReferenceforApprove.trim().length) {
          await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforApprove)
        } else {
          await _ForeignExchangePages.limitOrderPage.goToViewLimitOrderViaSearch(testData.status.PendingApproval)
        }      
        await _ForeignExchangePages.limitOrderPage.txnRefLink.getText().then(async value => {
          txnReferenceforApprove = value;
        });
        await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();
        await _ForeignExchangePages.limitOrderPage.approveBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.getChallengeBtn.jsClickIfExist();
        await _ForeignExchangePages.limitOrderPage.responseCode.input(testData.CNLimitOrder.responseCode);
        await _ForeignExchangePages.limitOrderPage.submitBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForSubmitPage();
        await _ForeignExchangePages.limitOrderPage.goToOrderOverviewBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforApprove);
        await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();
    
        await Promise.all([
          await ensure(_ForeignExchangePages.limitOrderPage.transactionStatus).textContains(testData.status.Active),
        ]);
    });

   it("Reject CN Limit Order", async function () {
        //create for reject
        await createLimitOrder();
        await _ForeignExchangePages.limitOrderPage.transactionReference.getText().then(async value => {
          txnReferenceforReject = value;
        });
        await _ForeignExchangePages.limitOrderPage.goToOrderOverviewBtn.click();
        await new NavigatePages().loginIdealx(SIT ? testData.CNLimitOrder.SIT.loginCompanyId : testData.CNLimitOrder.UAT.loginCompanyId, SIT ? testData.CNLimitOrder.SIT.loginUserId : testData.CNLimitOrder.UAT.loginUserId, "123123");
        await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
        await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        if (0 !== txnReferenceforReject.trim().length) {
           await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforReject)
        } else {
           await _ForeignExchangePages.limitOrderPage.goToViewLimitOrderViaSearch(testData.status.PendingApproval)
        }      
        await _ForeignExchangePages.limitOrderPage.txnRefLink.getText().then(async value => {
          txnReferenceforReject = value;
        });
        await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();
        await _ForeignExchangePages.limitOrderPage.rejectBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.rejectReason.input(testData.CNLimitOrder.rejectReason);
        await _ForeignExchangePages.limitOrderPage.dialogRejectBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForSubmitPage();
        await _ForeignExchangePages.limitOrderPage.goToOrderOverviewBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforReject);
        await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();

        await Promise.all([
          await ensure(_ForeignExchangePages.limitOrderPage.transactionStatus).textContains(testData.status.Rejected),
     
        ]);
     });
});


export async function createLimitOrder() {
  await new NavigatePages().loginIdealx(SIT ? testData.CNLimitOrder.SIT.loginCompanyId : testData.CNLimitOrder.UAT.loginCompanyId, SIT ? testData.CNLimitOrder.SIT.loginUserIdWithoutApproveOwn : testData.CNLimitOrder.UAT.loginUserIdWithoutApproveOwn, "123123"); 
  await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
  await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
  await _ForeignExchangePages.limitOrderPage.loadCondition();
  await _ForeignExchangePages.limitOrderPage.createNewBtn.click();
  await _ForeignExchangePages.limitOrderPage.loadConditionForCreatePage();
  await _ForeignExchangePages.limitOrderPage.sellAccountCCY.click();
  await _ForeignExchangePages.limitOrderPage.searchButton.input(SIT?testData.CNLimitOrder.sellAccountCCY:testData.CNLimitOrder.sellUATAccountCCY)
  await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
  await _ForeignExchangePages.limitOrderPage.amount.input(testData.CNLimitOrder.amountA1);
  await _ForeignExchangePages.limitOrderPage.buyAccountCCY.click();
  await _ForeignExchangePages.limitOrderPage.searchButton.input(testData.CNLimitOrder.buyAccountCCY);
  await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
  await _ForeignExchangePages.limitOrderPage.subBtn.click();
  await _ForeignExchangePages.limitOrderPage.sellAccountBtn.jsClick();
  await _ForeignExchangePages.limitOrderPage.sellAccountValue.jsClick();
  await _ForeignExchangePages.limitOrderPage.scrollTo(0,500);
  await _ForeignExchangePages.limitOrderPage.buyAccountBtn.jsClick();
  await _ForeignExchangePages.limitOrderPage.buyAccountValue.click();
  await _ForeignExchangePages.limitOrderPage.pmtCategory1.click();
  await _ForeignExchangePages.limitOrderPage.pmtCategory1Value.jsClickIfExist()
  await _ForeignExchangePages.limitOrderPage.seriesCode1.click();
  await _ForeignExchangePages.limitOrderPage.seriesCode1Value.jsClickIfExist();
  await _ForeignExchangePages.limitOrderPage.expireDate.select(currentDate);
  await _ForeignExchangePages.limitOrderPage.remarks.input(testData.CNLimitOrder.remarks)
  await _ForeignExchangePages.limitOrderPage.nextBtn.click();
  await _ForeignExchangePages.limitOrderPage.processBtn.click();
  await _ForeignExchangePages.limitOrderPage.loadConditionForPreviewPage();
  await _ForeignExchangePages.limitOrderPage.sentToApproveBtn.jsClick();
  await _ForeignExchangePages.limitOrderPage.loadConditionForSubmitPage();
}