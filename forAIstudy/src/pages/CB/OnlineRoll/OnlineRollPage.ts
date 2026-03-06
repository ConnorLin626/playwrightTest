import {
    Button,
    component, log,
    DateSelect,
    OptionSelect,
    Page,
    TextInput,
    waitForUXLoading,
    WebComponent
} from "../../../lib";
import {browser, ExpectedConditions} from "protractor";

@log export class OnlineRollPage extends Page {
    constructor() {
        super();
    }

    @component('//a[@id="ux-tab-SHOWALL"]') public showAllTab: TextInput;
    @component('//a[@id="ux-tab-PENDING_APPROVAL"]') public pendingApprovalTab: TextInput;
    @component("//label[@class='is-open']") public showAdditionFilter: Button;
    @component('//date-picker[@formcontrolname="paymentDateStart"]') public statementStartDate: DateSelect;
    @component('//date-picker[@formcontrolname="paymentDateEnd"]') public statementToDate: DateSelect;
    @component('//button[@name="search"]') public searchButton: Button;
    @component('//p-auto-complete[@formcontrolname="account"]') public accountDropdown: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="status"]') public statusDropdown: OptionSelect;
    @component('//input[@id="isSelectAllAdvising"]') public selectAllCheckBox: Button;
    @component('//button[@id="onlineRoll-account_0"]') public firstItemViewAcctBtn: Button;
    @component('//button[@id="Confirm"]') public ConfirmBtn: Button;
    @component('//button[@id="Decline"]') public DeclineBtn: Button;
    @component('//button[@id="Reject"]') public RejectBtn: Button;
    @component('//button[@name="confirm"]') public ConfirmBtnInConfirm: Button;
    @component('//button[@name="decline"]') public DeclineBtnInConfirm: Button;
    @component('//button[@name="reject"]') public RejectBtnInConfirm: Button;
    @component('//button[@id="rejectInDia"]') public RejectBtnInDia: Button;
    @component('//button[@id="declineInDia"]') public DeclineBtnInDia: Button;
    @component('//textarea[@id="ux-textarea-0"]') public reasonDetailTextArea: TextInput;
    @component('//textarea[@name="reasonForRejection"]') public reasonDetail4RejectTextArea: TextInput;
    @component('//top-panel/div/div[@class="alert alert-info"]/label') public onlineRollInfoMsg: TextInput;
    @component('//p[@id="onlineRoll-statusLabel_0"]') public firstItemStatusLabel: TextInput;
    @component('//button[@id="onlineRoll-viewDetail_0"]') public firstItemViewDetailBtn: Button;
    @component('//button[@name="dismiss"]') public okBtn: Button;
    @component('//button[@id="ConfirmInView"]') public ConfirmInViewBtn: Button;
    @component('//button[@id="DeclineInView"]') public DeclineViewBtn: Button;
    @component('//button[@id="RejectInView"]') public RejectViewBtn: Button;

    @component('//span[@id="labelDashboardReviews_AccountReviews"]') public dashboardANewLink: Button;
    @component('//dbs-tabset/div[1]/ul/li[@class="nav-item active"]/a[@id="ux-tab-PENDING_REVIEW"]') public activePendingReviewTab: Button;


    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showAllTab.element), this.showAllTab.getTimeOut());
    }
    public async loadCondition4AccountDropdown() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.accountDropdown.element), this.accountDropdown.getTimeOut());
    }
    public async loadCondition4List() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.firstItemViewAcctBtn.element), this.firstItemViewAcctBtn.getTimeOut());
    }
    public async loadCondition4Confirm() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.ConfirmBtnInConfirm.element), this.ConfirmBtnInConfirm.getTimeOut());
    }
    public async loadCondition4Decline() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.DeclineBtnInConfirm.element), this.DeclineBtnInConfirm.getTimeOut());
    }
    public async loadCondition4Reject() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.RejectBtnInConfirm.element), this.RejectBtnInConfirm.getTimeOut());
    }
    public async loadCondition4PostReject() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.okBtn.element), this.okBtn.getTimeOut());
    }
    public async loadCondition4ViewDetail() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.ConfirmInViewBtn.element), this.ConfirmInViewBtn.getTimeOut());
    }
    public async loadCondition4ViewDeclineDetail() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.RejectViewBtn.element), this.RejectViewBtn.getTimeOut());
    }
    public async loadCondition4DashBoardNewLink() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dashboardANewLink.element), this.dashboardANewLink.getTimeOut());
    }

}

