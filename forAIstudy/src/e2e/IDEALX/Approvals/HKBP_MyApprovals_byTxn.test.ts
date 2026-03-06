/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let reference = '';
let referenceArray = [];
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let testData = _FilesPages.fetchTestData('HKB_testData.json');
let fileName = '';
let paymentRefown = "";//create by user which do not approval own access and has approval access, and use to approval by user which have approval and approval own access 
let fileType = 'ALL - Universal File Format';

// add for IDXP-995 New UI
describe("My Approvals By Txn For HKBP user", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });


    it("Approve High Risk by Txn", async function () {
        await _FilesPages.uploadFilePage.filesMenu.click();
        
        await _FilesPages.uploadFilePage.fsUpload5(_FilesPages, fileType, SIT ? testData.MyApproval.SIT.fileNameByTxn : testData.MyApproval.UAT.fileNameByTxn, testData.MyApproval.approvalOptionByTxn).then(async data => {
            fileName = data;
        });
        // upload end 
        let _ApprovalsPages = new ApprovalsPages();
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewByTx();
        await _ApprovalsPages.ApprovalPage.byTxnfilter.clean();
       
        await _ApprovalsPages.ApprovalPage.byTxnfilter.input(fileName);
   
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await _ApprovalsPages.ApprovalPage.transactionList_Reference.getText().then(text => {
            reference = text.trim();
        });
        await _ApprovalsPages.ApprovalPage.ReviewApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.ProceedBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewReview();
        await _ApprovalsPages.ApprovalPage.ReviewPageApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApproval.challengeResponse);
        await ensure(_ApprovalsPages.ApprovalPage.challengeResponse).textIs(testData.MyApproval.challengeResponse);
        await _ApprovalsPages.ApprovalPage.challengeApproveBtn.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForSuccessPage();
        await Promise.all([
            await ensure(_ApprovalsPages.ApprovalPage.alertMsg).textContains('Suspicious recipient detected'),
            await ensure(_ApprovalsPages.ApprovalPage.HighRiskFlag).isVisible()
            ]);
        await _ApprovalsPages.ApprovalPage.DoneBtn.click();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(reference);
        await Promise.all([
            await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed),
            await ensure(_ApprovalsPages.transferCentersPage.HighRiskFlag).isVisible(),
        ]);
    });
});
