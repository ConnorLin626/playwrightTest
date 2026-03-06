/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { NavigatePages, ForeignExchangePages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";
import * as moment from "moment"

let _ForeignExchangePages = new ForeignExchangePages();
let testData = _ForeignExchangePages.fetchTestData("HK_testData.json");
let currentDate = moment(new Date()).format("DD MMM YYYY");
let transactionReference = '';
let txnReferenceforCancel = '';
let txnReferenceforApprove = '';

describe("Limit Order", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.HKLimitOrder.SIT.loginCompanyId : testData.HKLimitOrder.UAT.loginCompanyId, SIT ? testData.HKLimitOrder.SIT.loginUserId : testData.HKLimitOrder.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it("Create HK Limit Order - Self Approve", async function () {
        await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
        await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        await _ForeignExchangePages.limitOrderPage.createNewBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadConditionForCreatePage();
        await _ForeignExchangePages.limitOrderPage.sellAccountCCY.click();
        await _ForeignExchangePages.limitOrderPage.searchButton.input(testData.HKLimitOrder.sellAccountCCY)
        await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
        await _ForeignExchangePages.limitOrderPage.amount.input(testData.HKLimitOrder.amountA1);
        await _ForeignExchangePages.limitOrderPage.buyAccountCCY.click();
        await _ForeignExchangePages.limitOrderPage.searchButton.input(testData.HKLimitOrder.buyAccountCCY);
        await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
        await _ForeignExchangePages.limitOrderPage.subBtn.click();
        await _ForeignExchangePages.limitOrderPage.scrollTo(0,500);
        await _ForeignExchangePages.limitOrderPage.sellAccountBtn.click();
        await _ForeignExchangePages.limitOrderPage.sellAccountValue.jsClick();
        await _ForeignExchangePages.limitOrderPage.buyAccountBtn.click();
        await _ForeignExchangePages.limitOrderPage.buyAccountValue.click();
        await _ForeignExchangePages.limitOrderPage.expireDate.select(currentDate);
        await _ForeignExchangePages.limitOrderPage.remarks.input(testData.HKLimitOrder.remarks)
        await _ForeignExchangePages.limitOrderPage.nextBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadConditionForPreviewPage();
        await _ForeignExchangePages.limitOrderPage.sentToApproveBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForApprovePage();
        await _ForeignExchangePages.limitOrderPage.getChallengeBtn.click();
        await _ForeignExchangePages.limitOrderPage.responseCode.input(testData.HKLimitOrder.responseCode);
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
            await ensure(_ForeignExchangePages.limitOrderPage.fromAccountView).textIs(SIT ? testData.HKLimitOrder.SIT.sellAccountValue : testData.HKLimitOrder.UAT.sellAccountValue),
            await ensure(_ForeignExchangePages.limitOrderPage.toAccountView).textIs(SIT ? testData.HKLimitOrder.SIT.buyAccountValue : testData.HKLimitOrder.UAT.buyAccountValue),
            await ensure(_ForeignExchangePages.limitOrderPage.sellAmountView).textContains(testData.HKLimitOrder.amountA1),
            await ensure(_ForeignExchangePages.limitOrderPage.buyAmountView).textContains(testData.HKLimitOrder.buyAmount),
            await ensure(_ForeignExchangePages.limitOrderPage.expireDateView).textIs(currentDate),
    
        ]);
    });

    it("Cancel HK Limit Order", async function () {
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

    it("Create HK Limit Order - Send to another approver", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.HKLimitOrder.SIT.loginCompanyId : testData.HKLimitOrder.UAT.loginCompanyId, SIT ? testData.HKLimitOrder.SIT.loginUserIdWithoutApproveOwn : testData.HKLimitOrder.UAT.loginUserIdWithoutApproveOwn, "123123"); 
        await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
        await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
        await _ForeignExchangePages.limitOrderPage.loadCondition();
        await _ForeignExchangePages.limitOrderPage.createNewBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadConditionForCreatePage();
        await _ForeignExchangePages.limitOrderPage.sellAccountCCY.click();
        await _ForeignExchangePages.limitOrderPage.searchButton.input(testData.HKLimitOrder.sellAccountCCY)
        await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
        await _ForeignExchangePages.limitOrderPage.amount.input(testData.HKLimitOrder.amountA1);
        await _ForeignExchangePages.limitOrderPage.buyAccountCCY.click();
        await _ForeignExchangePages.limitOrderPage.searchButton.input(testData.HKLimitOrder.buyAccountCCY);
        await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
        await _ForeignExchangePages.limitOrderPage.subBtn.click();
        await _ForeignExchangePages.limitOrderPage.sellAccountBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.sellAccountValue.jsClick();
        await _ForeignExchangePages.limitOrderPage.scrollTo(0,500);
        await _ForeignExchangePages.limitOrderPage.buyAccountBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.buyAccountValue.click();
        await _ForeignExchangePages.limitOrderPage.expireDate.select(currentDate);
        await _ForeignExchangePages.limitOrderPage.remarks.input(testData.HKLimitOrder.remarks)
        await _ForeignExchangePages.limitOrderPage.nextBtn.click();
        await _ForeignExchangePages.limitOrderPage.processBtn.click();
        await _ForeignExchangePages.limitOrderPage.loadConditionForPreviewPage();
        await _ForeignExchangePages.limitOrderPage.sentToApproveBtn.jsClick();
        await _ForeignExchangePages.limitOrderPage.loadConditionForSubmitPage();
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
            await ensure(_ForeignExchangePages.limitOrderPage.fromAccountView).textIs(SIT ? testData.HKLimitOrder.SIT.sellAccountValue : testData.HKLimitOrder.UAT.sellAccountValue),
            await ensure(_ForeignExchangePages.limitOrderPage.toAccountView).textIs(SIT ? testData.HKLimitOrder.SIT.buyAccountValue : testData.HKLimitOrder.UAT.buyAccountValue),
            await ensure(_ForeignExchangePages.limitOrderPage.sellAmountView).textContains(testData.HKLimitOrder.amountA1),
            await ensure(_ForeignExchangePages.limitOrderPage.buyAmountView).textContains(testData.HKLimitOrder.buyAmount),
            await ensure(_ForeignExchangePages.limitOrderPage.expireDateView).textIs(currentDate),
        ]);
    });

    it("Approve HK Limit Order", async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.HKLimitOrder.SIT.loginCompanyId : testData.HKLimitOrder.UAT.loginCompanyId, SIT ? testData.HKLimitOrder.SIT.loginUserId : testData.HKLimitOrder.UAT.loginUserId, "123123");
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
        await _ForeignExchangePages.limitOrderPage.responseCode.input(testData.HKLimitOrder.responseCode);
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

  //    Due to AB-10635, comment out this case
  //   //Create Limit Order - Maker flow: Partial approval
  //   it("Create HKBP Limit Order - Maker flow", async function () {
  //       await new NavigatePages().loginIdealx(SIT ? testData1.HKBLimitOrder.SIT.loginCompanyId : testData1.HKBLimitOrder.UAT.loginCompanyId, SIT ? testData1.HKBLimitOrder.SIT.loginUserId : testData1.HKBLimitOrder.UAT.loginUserId, "123123");
  //       await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
  //       await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
  //       await _ForeignExchangePages.limitOrderPage.loadCondition();
  //       await _ForeignExchangePages.limitOrderPage.createNewBtn.click();
  //       await _ForeignExchangePages.limitOrderPage.loadConditionForCreatePage();
  //       await _ForeignExchangePages.limitOrderPage.sellAccountCCY.click();
  //       await _ForeignExchangePages.limitOrderPage.searchButton.input(testData1.HKBLimitOrder.sellAccountCCY)
  //       await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
  //       await _ForeignExchangePages.limitOrderPage.amount.input(testData1.HKBLimitOrder.amountA1);
  //       await _ForeignExchangePages.limitOrderPage.buyAccountCCY.click();
  //       await _ForeignExchangePages.limitOrderPage.searchButton.input(testData1.HKBLimitOrder.buyAccountCCY);
  //       await _ForeignExchangePages.limitOrderPage.searchResult.jsClickIfExist();
  //       await _ForeignExchangePages.limitOrderPage.subBtn.click();
  //       await _ForeignExchangePages.limitOrderPage.scrollTo(0,500);
  //       await _ForeignExchangePages.limitOrderPage.sellAccountBtn.click();
  //       await _ForeignExchangePages.limitOrderPage.sellAccountValue.jsClick();
  //       await _ForeignExchangePages.limitOrderPage.scrollTo(0,600);
  //       await _ForeignExchangePages.limitOrderPage.buyAccountBtn.click();
  //       await _ForeignExchangePages.limitOrderPage.buyAccountValue.click();
  //       await _ForeignExchangePages.limitOrderPage.expireDate.select(currentDate);
  //       await _ForeignExchangePages.limitOrderPage.remarks.input(testData1.HKBLimitOrder.remarks)
  //       await _ForeignExchangePages.limitOrderPage.nextBtn.click();
  //       await _ForeignExchangePages.limitOrderPage.processBtn.jsClick();
  //       await _ForeignExchangePages.limitOrderPage.loadConditionForPreviewPage();
  //       await _ForeignExchangePages.limitOrderPage.sentToApproveBtn.jsClick();
  //       await _ForeignExchangePages.limitOrderPage.responseCode.input(testData1.HKBLimitOrder.responseCode);
  //       await _ForeignExchangePages.limitOrderPage.submitBtn.click();
  //       await _ForeignExchangePages.limitOrderPage.loadConditionForSubmitPage();
  //       await _ForeignExchangePages.limitOrderPage.transactionReference.getText().then(async value => {
  //         txnReferenceforReject = value;
  //       });
  //       await _ForeignExchangePages.limitOrderPage.goToOrderOverviewBtn.click();
  //       await _ForeignExchangePages.limitOrderPage.loadCondition();
  //       await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforReject);
  //       await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
  //       await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();

  //       await Promise.all([
  //         await ensure(_ForeignExchangePages.limitOrderPage.transactionStatus).textContainsLessOne(testData1.status.PartialApproved),
  //         await ensure(_ForeignExchangePages.limitOrderPage.fromAccountView).textIs(SIT ? testData1.HKBLimitOrder.SIT.sellAccountValue : testData1.HKBLimitOrder.UAT.sellAccountValue),
  //         await ensure(_ForeignExchangePages.limitOrderPage.toAccountView).textIs(SIT ? testData1.HKBLimitOrder.SIT.buyAccountValue : testData.HKBLimitOrder.UAT.buyAccountValue),
  //         await ensure(_ForeignExchangePages.limitOrderPage.sellAmountView).textContains(testData1.HKBLimitOrder.amountA1View),
  //         await ensure(_ForeignExchangePages.limitOrderPage.buyAmountView).textContains(testData1.HKBLimitOrder.buyAmount),
  //         await ensure(_ForeignExchangePages.limitOrderPage.expireDateView).textIs(currentDate),
  //       ]);
  //  });

  //  it("Reject HKBP Limit Order", async function () {
  //       await new NavigatePages().loginIdealx(SIT ? testData1.HKBLimitOrder.SIT.loginCompanyId : testData1.HKBLimitOrder.UAT.loginCompanyId, SIT ? testData1.HKBLimitOrder.SIT.approveUserId : testData1.HKBLimitOrder.UAT.approveUserId, "123123");
  //       await _ForeignExchangePages.limitOrderPage.foreignExchangeMenu.click();
  //       await _ForeignExchangePages.limitOrderPage.limitOrderTab.click();
  //       await _ForeignExchangePages.limitOrderPage.loadCondition();
  //       if (0 !== txnReferenceforReject.trim().length) {
  //          await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforReject)
  //       } else {
  //          await _ForeignExchangePages.limitOrderPage.goToViewLimitOrderViaSearch(testData1.status.PendingApproval)
  //       }      
  //       await _ForeignExchangePages.limitOrderPage.txnRefLink.getText().then(async value => {
  //         txnReferenceforReject = value;
  //       });
  //       await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
  //       await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();
  //       await _ForeignExchangePages.limitOrderPage.rejectBtn.jsClick();
  //       await _ForeignExchangePages.limitOrderPage.rejectReason.input(testData1.HKBLimitOrder.rejectReason);
  //       await _ForeignExchangePages.limitOrderPage.dialogRejectBtn.jsClick();
  //       await _ForeignExchangePages.limitOrderPage.loadConditionForSubmitPage();
  //       await _ForeignExchangePages.limitOrderPage.goToOrderOverviewBtn.click();
  //       await _ForeignExchangePages.limitOrderPage.loadCondition();
  //       await _ForeignExchangePages.limitOrderPage.limitOrderFilter.input(txnReferenceforReject);
  //       await _ForeignExchangePages.limitOrderPage.txnRefLink.jsClick();
  //       await _ForeignExchangePages.limitOrderPage.loadConditionForViewtPage();

  //       await Promise.all([
  //         await ensure(_ForeignExchangePages.limitOrderPage.transactionStatus).textContains(testData1.status.Rejected),
     
  //       ]);
  //    });
});


