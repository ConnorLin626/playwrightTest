/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages, PaymentsPages } from "../../../pages/IDEALX";
import { ensure, SIT, handlerCase, PROJECT_TYPE } from "../../../lib";
import { browser } from "protractor";

let _ApprovalsPages = new ApprovalsPages();
let _PaymentsPages = new PaymentsPages();
let _FilesPages = new FilesPages();
let testData = _ApprovalsPages.fetchTestData('HK_testData.json');
let _selectFileCount = [1];

describe("My Approvals By File For HK user", async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });


    it("Approve High Risk by File", async function () {
        let _selectFileCount = [1];
        let fileName = '';
        let _totalItems = 0;
        await _FilesPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.fsUpload5(_FilesPages, "ALL - Universal File Format", SIT ? testData.MyApproval.SIT.fileNameByFile : testData.MyApproval.UAT.fileNameByFile, testData.MyApproval.approvalOptionByFile, testData.MyApproval.approvalCurrency).then(async data => {
            fileName = data;
        });
        // upload end 
        let paymentRefList = [];
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadCondition();
        await _ApprovalsPages.ApprovalPage.byFileButton.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        if ('' !== fileName) {
            await ensure(_ApprovalsPages.ApprovalPage.filter).isVisible();
            await _ApprovalsPages.ApprovalPage.filter.clean();
            await _ApprovalsPages.ApprovalPage.filter.input(fileName);
        } else {
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter.click();
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_ApprovalOption.select(testData.MyApproval.approvalOptionByFile);
            await _ApprovalsPages.ApprovalPage.byFileAdditionFilter_Search.click();
        }
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileList.selectIdealxFile(..._selectFileCount);
        await _ApprovalsPages.ApprovalPage.loadConditionForByFile();
        await _ApprovalsPages.ApprovalPage.fileApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.ProceedBtn.clickIfExist();
        await _ApprovalsPages.ApprovalPage.getChallengeSMS.jsClickIfExist();
        await _PaymentsPages.TransferCentersPage.loadConditionforApprovalSection();
        await _ApprovalsPages.ApprovalPage.challengeResponse.input(testData.MyApproval.challengeResponse);
        await _ApprovalsPages.ApprovalPage.approveButton.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.ApprovalPage.fileNameText.getText().then(async value => {
            fileName = value;
        });
        await _ApprovalsPages.ApprovalPage.completeTotalItems.getText().then(async items => {
            _totalItems = parseInt(items);
        });
        await _ApprovalsPages.ApprovalPage.getApproveTransactionRef(_totalItems).then(async list => {
            paymentRefList = list;
        });
        await _ApprovalsPages.uploadFilePage.filesMenu.click();
        await _ApprovalsPages.uploadFilePage.loadCondition();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.clean();
        await _ApprovalsPages.uploadFilePage.fileNameFilter.input(fileName);
        await _ApprovalsPages.uploadFilePage.fileNameLink.jsClick();
        await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
        await Promise.all([
        await ensure(_ApprovalsPages.ApprovalPage.alertMsg).textContains('Suspicious recipient detected')
        ]);
        for (let i = 0; i < paymentRefList.length; i++) {
            await ensure(_ApprovalsPages.uploadFilePage.paymentReferenceLink).isVisible();
            await _ApprovalsPages.uploadFilePage.viewFileRef.input(paymentRefList[i]);
            await _ApprovalsPages.uploadFilePage.loadConditionForViewFilePage();
            await Promise.all([
                await ensure(_ApprovalsPages.ApprovalPage.HighRiskFlag).isVisible(),
                await ensure(_ApprovalsPages.uploadFilePage.viewFileStatus).textContainsLessOne(testData.status.Approved, testData.status.PartialApproved, testData.status.PendingRelease, testData.status.Received, testData.status.BankRejected, testData.status.Completed)
            
            ]);
        }
    });


});