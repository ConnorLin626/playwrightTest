/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { NavigatePages, ApprovalsPages, FilesPages, PaymentsPages } from '../../../pages/IDEALX';
import { saveScreen, ensure, SIT, handlerCase, PROJECT_TYPE } from '../../../lib';
import { browser } from 'protractor';

let reference = '';
let referenceArray = [];
let _ApprovalsPages = new ApprovalsPages();
let _FilesPages = new FilesPages();
let _PaymentsPages = new PaymentsPages();
let testData = _FilesPages.fetchTestData('GC_testData.json');
let fileName = '';
let paymentRefown = "";//create by user which do not approval own access and has approval access, and use to approval by user which have approval and approval own access 
let fileType = 'ALL - Universal File Format';
let ttReference = "";
let ictReference = "";
let actReference = "";

describe('My Approvals By Transaction', async function () {
    this.retries(browser.params.caseRetryTimes);
    before(async function () { await new NavigatePages().loginIdealx(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.loginUserId : testData.MyApproval.UAT.loginUserId, "123123"); });
    const suitObject = this; beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () { handlerCase(suitObject, this, PROJECT_TYPE.IDEALX); });

    it('Multi select ICT ACT TT to approve', async function () {
        this.timeout(420000);
        await createICT();
        await createACT();
        await createTT();
        await new NavigatePages().loginIdealx(SIT ? testData.MyApproval.SIT.loginCompanyId : testData.MyApproval.UAT.loginCompanyId, SIT ? testData.MyApproval.SIT.approveUserId : testData.MyApproval.UAT.approveUserId, "123123");
        await _ApprovalsPages.ApprovalPage.approvalMenu.click();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewByTx();
        await _ApprovalsPages.ApprovalPage.byTxnfilter.input(ttReference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await browser.sleep(1000);
        await _ApprovalsPages.ApprovalPage.byTxnfilter.clean();
        await _ApprovalsPages.ApprovalPage.byTxnfilter.input(ictReference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await browser.sleep(1000);
        await _ApprovalsPages.ApprovalPage.byTxnfilter.clean();
        await _ApprovalsPages.ApprovalPage.byTxnfilter.input(actReference);
        await _ApprovalsPages.ApprovalPage.transactionList.selectIdealxFile(1);
        await browser.sleep(1000);
        await _ApprovalsPages.ApprovalPage.ReviewApproveBtn.jsClick();
        await _ApprovalsPages.ApprovalPage.loadConditionForNewReview();
        await _ApprovalsPages.ApprovalPage.pushApproveBtn.jsClick();
        await browser.sleep(2000);
        await _ApprovalsPages.ApprovalPage.loadConditionForCompletedPage();
        await _ApprovalsPages.AccountTransferPage.paymentMenu.click();
        await _ApprovalsPages.transferCentersPage.loadCondition();
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(ttReference);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(ictReference);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed);
        await _ApprovalsPages.transferCentersPage.transferCenterFilter.input(actReference);
        await ensure(_ApprovalsPages.transferCentersPage.txnStatus).textContainsLessOne(testData.status.Approved, testData.status.Received, testData.status.Completed);
    });

});


export async function createICT(){
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.showAdditionFilter.jsClick();
    await _PaymentsPages.TransferCentersPage.paymentTypeList.select("Intra Company Transfer");
    await _ApprovalsPages.transferCentersPage.searchButton.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.refLink.jsClick();
    await _PaymentsPages.IntraCompanyTransferPage.copyButton.click();
    await _PaymentsPages.IntraCompanyTransferPage.loadCondition();
    await _PaymentsPages.IntraCompanyTransferPage.nextButton.click();
    await _PaymentsPages.IntraCompanyTransferPage.loadConditionForPreviewPage();
    await _PaymentsPages.IntraCompanyTransferPage.submitButton.click();
    await _PaymentsPages.IntraCompanyTransferPage.loadConditionForSubmittedPage();
    await _PaymentsPages.IntraCompanyTransferPage.getIdealxInfoReferenceID().then(text => {
        ictReference = text;
    });
}

export async function createACT(){
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.showAdditionFilter.jsClick();
    await _PaymentsPages.TransferCentersPage.paymentTypeList.select("Account Transfer");
    await _ApprovalsPages.transferCentersPage.searchButton.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.refLink.jsClick();
    await _PaymentsPages.AccountTransferPage.copyButton.click();
    await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.AccountTransferPage.nextButton.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForPrevewPage();
    await _PaymentsPages.AccountTransferPage.submitButton.click();
    await _PaymentsPages.AccountTransferPage.loadConditionForSubmittedPage();
    await _PaymentsPages.AccountTransferPage.getIdealxInfoReferenceID().then(text => {
        actReference = text;
    });
}

export async function createTT(){
    await _PaymentsPages.AccountTransferPage.paymentMenu.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.showAdditionFilter.jsClick();
    await _PaymentsPages.TransferCentersPage.paymentTypeList.select("Telegraphic Transfer");
    await _ApprovalsPages.transferCentersPage.searchButton.click();
    await _PaymentsPages.TransferCentersPage.loadCondition();
    await _PaymentsPages.TransferCentersPage.refLink.jsClick();
    await _PaymentsPages.AccountTransferPage.copyButton.click();
    await _PaymentsPages.AccountTransferPage.loadCondition();
    await _PaymentsPages.TelegraphicTransferPage.nextButton.click();
    await _PaymentsPages.TelegraphicTransferPage.loadConditionForPrevewPage();
    await _PaymentsPages.TelegraphicTransferPage.submitButton.click();
    await _PaymentsPages.TelegraphicTransferPage.loadConditionForSubmittedPage();
    await _PaymentsPages.TelegraphicTransferPage.getIdealxInfoReferenceID().then(text => {
        ttReference = text;
    });
}