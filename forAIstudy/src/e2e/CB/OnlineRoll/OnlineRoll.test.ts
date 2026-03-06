import {NavigatePages} from "../../../pages/Navigate";
import {devWatch, ensure, handlerCase, SIT, TextInput} from "../../../lib";
import {OnlineRollPages} from "../../../pages/CB/OnlineRoll";
import {Menu} from "../../../config/menu";

let _OnlineRollPages = new OnlineRollPages();
let testData = _OnlineRollPages.fetchTestData("CN_testData.json");
let statementStartDate = testData.OnlineRoll.SIT.statementStartDate;
let statementToDate = testData.OnlineRoll.SIT.statementToDate;
let STATUS_PENDINGREVIEW=testData.OnlineRoll.Status_PendingReview;
let STATUS_PENDINGCONFIRMATIONAPPROVAL=testData.OnlineRoll.Status_PendingConfirmationApproval;
let STATUS_PENDINGDECLINEAPPROVAL=testData.OnlineRoll.Status_PendingDeclineApproval;

describe("My Approval - Account Balance Review", async function () {
    before(async function () {
        await new NavigatePages().loginCB(
            testData.OnlineRoll.SIT.loginCompanyId,
            testData.OnlineRoll.SIT.loginUserId
        );
    });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this);
    });

    it("Confirm multi Rolling Account", async function () {
        await _OnlineRollPages.openMenu(Menu.Approvals.AccountBalanceReviews);
        await _OnlineRollPages.onlineRollPage.loadCondition();
        await doMultipleConfirm("confirmed successfully", STATUS_PENDINGCONFIRMATIONAPPROVAL);
        await _OnlineRollPages.openMenu(Menu.Approvals.AccountBalanceReviews);
        await _OnlineRollPages.onlineRollPage.loadCondition();
        await doMultipleReject(STATUS_PENDINGCONFIRMATIONAPPROVAL, _OnlineRollPages.onlineRollPage.reasonDetailTextArea);   //this step is for reusing data
    });

    it("Decline multi Rolling Account", async function () {
        await _OnlineRollPages.openMenu(Menu.Approvals.AccountBalanceReviews);
        await _OnlineRollPages.onlineRollPage.loadCondition();
        await doMultipleDecline();
        await _OnlineRollPages.openMenu(Menu.Approvals.AccountBalanceReviews);
        await _OnlineRollPages.onlineRollPage.loadCondition();
        await doMultipleReject(STATUS_PENDINGDECLINEAPPROVAL, _OnlineRollPages.onlineRollPage.reasonDetail4RejectTextArea);   //this step is for reusing data
    });
});

describe("My Account- Account Balance Review", async function () {

    before(async function () {
        await new NavigatePages().loginCB(
            testData.OnlineRoll.SIT.loginCompanyId,
            testData.OnlineRoll.SIT.loginUserId
        );
    });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this);
    });

    it("Reject rolling account", async function () {
        await _OnlineRollPages.openMenu(Menu.Accounts.AccountBalanceReviews);
        await _OnlineRollPages.onlineRollPage.loadCondition();

        await doSingleDecline();

        await _OnlineRollPages.openMenu(Menu.Accounts.AccountBalanceReviews);
        await _OnlineRollPages.onlineRollPage.loadCondition();

        await doSingleReject();
    });
});

describe("Dashboard", async function () {

    before(async function () {
        await new NavigatePages().loginCB(
            testData.OnlineRoll.SIT.loginCompanyId,
            testData.OnlineRoll.SIT.loginUserId
        );
    });
    const suitObject = this;
    beforeEach(async function(){process.env.currentTestTitle=this.currentTest.title;}); afterEach(async function () {
        handlerCase(suitObject, this);
    });

    it("Dashboard add new link", async function () {
        await _OnlineRollPages.openMenu(Menu.Dashboard.Home);
        await _OnlineRollPages.onlineRollPage.loadCondition4DashBoardNewLink();
        await _OnlineRollPages.onlineRollPage.dashboardANewLink.click();
        await _OnlineRollPages.onlineRollPage.loadCondition();
        await Promise.all([
            await ensure(_OnlineRollPages.onlineRollPage.activePendingReviewTab).isElementPresent()
        ]);
    });

});

async function searchData(statusLabel: string){
    await _OnlineRollPages.onlineRollPage.showAdditionFilter.click();
    await _OnlineRollPages.onlineRollPage.loadCondition4AccountDropdown();
    await _OnlineRollPages.onlineRollPage.statementStartDate.select2(statementStartDate);
    await _OnlineRollPages.onlineRollPage.statementToDate.select2(statementToDate);
    await _OnlineRollPages.onlineRollPage.accountDropdown.select(testData.OnlineRoll.SIT.accountName);
    await _OnlineRollPages.onlineRollPage.statusDropdown.select(statusLabel);
    await _OnlineRollPages.onlineRollPage.searchButton.click();
    await _OnlineRollPages.onlineRollPage.loadCondition4List();
}

async function doMultipleConfirm(successMsg: string, expectStatus: string){
    await _OnlineRollPages.onlineRollPage.showAllTab.jsClick();
    await searchData(STATUS_PENDINGREVIEW);
    await _OnlineRollPages.onlineRollPage.selectAllCheckBox.jsClick();
    await _OnlineRollPages.onlineRollPage.ConfirmBtn.click();
    //go to confirm screen
    await _OnlineRollPages.onlineRollPage.loadCondition4Confirm();
    await _OnlineRollPages.onlineRollPage.ConfirmBtnInConfirm.click();
    //go to post confirm screen
    await _OnlineRollPages.onlineRollPage.loadCondition4Confirm();

    await Promise.all([
        await ensure(_OnlineRollPages.onlineRollPage.onlineRollInfoMsg).textContains(successMsg),
        await ensure(_OnlineRollPages.onlineRollPage.firstItemStatusLabel).textContains(expectStatus)
    ]);
}
async function doMultipleDecline(){
    await _OnlineRollPages.onlineRollPage.showAllTab.jsClick();
    await searchData(STATUS_PENDINGREVIEW);
    await _OnlineRollPages.onlineRollPage.selectAllCheckBox.jsClick();
    await _OnlineRollPages.onlineRollPage.DeclineBtn.click();
    //go to Decline screen
    await _OnlineRollPages.onlineRollPage.loadCondition4Decline();
    await _OnlineRollPages.onlineRollPage.DeclineBtnInConfirm.click();
    await _OnlineRollPages.onlineRollPage.reasonDetail4RejectTextArea.input(testData.OnlineRoll.SIT.reasonDetail);
    await _OnlineRollPages.onlineRollPage.DeclineBtnInDia.click();
    //go to post Decline screen
    await _OnlineRollPages.onlineRollPage.loadCondition4PostReject();
    await ensure(_OnlineRollPages.onlineRollPage).isUXRejectDialogSuccess();
    await _OnlineRollPages.onlineRollPage.okBtn.click();
}

async function doMultipleReject(expectStatus: string, reasonTextArea: TextInput){
    await _OnlineRollPages.onlineRollPage.pendingApprovalTab.jsClick();
    await searchData(expectStatus);
    await _OnlineRollPages.onlineRollPage.selectAllCheckBox.jsClick();
    await _OnlineRollPages.onlineRollPage.RejectBtn.click();
    //go to confirm reject screen
    await _OnlineRollPages.onlineRollPage.loadCondition4Reject();
    await _OnlineRollPages.onlineRollPage.RejectBtnInConfirm.click();
    await reasonTextArea.input(testData.OnlineRoll.SIT.reasonDetail);
    await _OnlineRollPages.onlineRollPage.RejectBtnInDia.click();
    //go to post confirm screen
    await _OnlineRollPages.onlineRollPage.loadCondition4PostReject();
    await ensure(_OnlineRollPages.onlineRollPage).isUXRejectDialogSuccess();
    await _OnlineRollPages.onlineRollPage.okBtn.click();
}

async function doSingleDecline(){
    await _OnlineRollPages.onlineRollPage.showAllTab.jsClick();
    await searchData(STATUS_PENDINGREVIEW);
    await _OnlineRollPages.onlineRollPage.firstItemViewDetailBtn.click();
    await _OnlineRollPages.onlineRollPage.loadCondition4ViewDetail();
    await _OnlineRollPages.onlineRollPage.DeclineViewBtn.click();
    await _OnlineRollPages.onlineRollPage.reasonDetail4RejectTextArea.input(testData.OnlineRoll.SIT.reasonDetail);
    await _OnlineRollPages.onlineRollPage.DeclineBtnInDia.click();
    //go to post Decline screen
    await _OnlineRollPages.onlineRollPage.loadCondition4PostReject();
    await ensure(_OnlineRollPages.onlineRollPage).isUXRejectDialogMsg(STATUS_PENDINGDECLINEAPPROVAL);
    await _OnlineRollPages.onlineRollPage.okBtn.click();
}

async function doSingleReject(){
    await _OnlineRollPages.onlineRollPage.showAllTab.jsClick();
    await searchData(STATUS_PENDINGDECLINEAPPROVAL);
    await _OnlineRollPages.onlineRollPage.firstItemViewDetailBtn.click();
    await _OnlineRollPages.onlineRollPage.loadCondition4ViewDeclineDetail();
    await _OnlineRollPages.onlineRollPage.RejectViewBtn.click();
    await _OnlineRollPages.onlineRollPage.reasonDetail4RejectTextArea.input(testData.OnlineRoll.SIT.reasonDetail);
    await _OnlineRollPages.onlineRollPage.RejectBtnInDia.click();
    //go to post Decline screen
    await _OnlineRollPages.onlineRollPage.loadCondition4PostReject();
    await ensure(_OnlineRollPages.onlineRollPage).isUXRejectDialogMsg(STATUS_PENDINGREVIEW);
    await _OnlineRollPages.onlineRollPage.okBtn.click();
}