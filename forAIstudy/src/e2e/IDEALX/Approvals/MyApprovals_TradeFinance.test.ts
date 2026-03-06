/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages,ApprovalsPages } from '../../../pages/IDEALX';
import { TradeFinancePages } from '../../../pages/Trade';
import { ensure, SIT, handlerCase,PROJECT_TYPE } from "../../../lib";
import { browser } from 'protractor';

const _TradeFinancePages = new TradeFinancePages();
let _ApprovalsPages = new ApprovalsPages();
let reference="";
const testData = _TradeFinancePages.fetchTestData('TradeFinance_testData.json');

describe('My Approve -Trade Finance', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.bankerGuaranteeAmendment.SIT.loginCompanyId : testData.bankerGuaranteeAmendment.UAT.loginCompanyId,
            SIT ? testData.bankerGuaranteeAmendment.SIT.loginUserId : testData.bankerGuaranteeAmendment.UAT.loginUserId,"123123",)
    });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Approve Trade on My Approve -Trade Finance list', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.TradeFinanceTab.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForMyApproveTradeList();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.custRefLink.getText().then(text => {
            reference = text.trim();
          });
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.custRefCheckBox.jsClick();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.transactionApprove.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForReviewPage();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.reviewApprove.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.confirmBtn.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.responseCode.input("123123");
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.approveBtn.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForApproveSuccessPage();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.doneBtn.click();
        // await _TradeFinancePages.bankerGuaranteeAmendmentPage.search.input(reference);
        // await Promise.all([
        //     await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.searchResult).textContains("No transactions found"),
        // ]);
        
    });

        
    it('Approve Trade on My Approve - Trade Finance view page', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.TradeFinanceTab.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForMyApproveTradeList();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.custRefLink.getText().then(text => {
            reference = text.trim();
          });
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.custRefLink.jsClick();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForViewPage();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.reviewApprove.jsClick();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.confirmBtn.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.responseCode.input("123123");
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.approveBtn.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForApproveSuccessPage();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.doneBtn.click();
        // await _TradeFinancePages.bankerGuaranteeAmendmentPage.search.input(reference);
        // await Promise.all([
        //     await ensure(await _TradeFinancePages.bankerGuaranteeAmendmentPage.searchResult).textContains("No transactions found"),
        // ]);
    });

    it('Reject Trade on My Approve - Trade Finance view page', async function () {
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.TradeFinanceTab.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForMyApproveTradeList();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.custRefLink.getText().then(text => {
            reference = text.trim();
        });
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.custRefLink.jsClick();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForViewPage();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.rejectBtn.jsClick();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.rejectReason.input("Reject Reason");
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.confirmBtn.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.dismissBtn.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.search.input(reference);
        await Promise.all([
            await _TradeFinancePages.bankerGuaranteeAmendmentPage.searchResult.textContains("No transactions found"),
        ]);
    });

    it('Download Attachment on My Approve -Trade Finance list', async function () {
        await new NavigatePages().loginIdealx(SIT ? testData.bankerGuaranteeAmendment.SIT.loginCompanyIdHK: testData.bankerGuaranteeAmendment.UAT.loginCompanyIdHK,
        SIT ? testData.bankerGuaranteeAmendment.SIT.loginUserIdHK : testData.bankerGuaranteeAmendment.UAT.loginUserIdHK,"123123",)
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.TradeFinanceTab.click();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.loadConditionForMyApproveTradeList();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.search.input("ForAutoTest");
        await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.docIcon).isNotDisabled();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.docIcon.click();
        await ensure(_TradeFinancePages.bankerGuaranteeAmendmentPage.downloadAll).isNotDisabled();
        await _TradeFinancePages.bankerGuaranteeAmendmentPage.downloadAll.click();
       
        });
    });