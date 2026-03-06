/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { Page, waitForUXLoading, component, log, TextInput, Button, waitForI3Loading } from "../../../lib";
import { browser, ExpectedConditions } from "protractor";

@log export class DashboardPage extends Page {
  constructor() {
    super();
  }

  // Dashboard page
  @component('//div[@id="nav-item-navBBTopDashLinkText"]') public dashboardPageButton:Button;
  @component('//input[@id="universal-search"]') public searchInput: TextInput;
  @component('//label[@id="announcement-content"]') public announcementContent: TextInput;
  @component('//span[@id="accountNumber_0"]') public accountNumber: TextInput;
  @component('//span[@id="availableBalanceAmount_0"]') public availableBalanceAmount: TextInput;
  @component('//span[@id="availableBalanceDate_0"]') public availableBalanceDate: TextInput;
  @component('//a[@id="showAllTxn_0"]') public showAllTxnButton: Button;
  @component('//button[@id="actionButton_0"]') public actionButton: Button;
  @component('//a[@id="labelSingleTransfer"]') public makeAPaymentButton: Button;
  @component('//a[@id="labelDashboardBulkPayment"]') public makeBulkPaymentButton: Button;
  @component('//a[@id="ux-tab-FIXED_DEPOSITS"]') public tabFixedDeposits: Button;
  @component('//a[@id="ux-tab-LOANS"]') public tabLoan: Button;
  @component('//a[@id="labelDashboardViewAllFixedDeposit"]') public showAllFixedDepositsButton: Button;
  @component('//a[@id="labelDashboardViewAllLoan"]') public showAllLoanButton: Button;

  //pending items
  @component('//*[@id="labelDashboardMyApproval"]') public dashboardMyApproval: TextInput;
  @component('//*[@id="labelDashboardTransaction"]') public dashboardTransactionButton: Button;
  @component('//*[@id="labelDashboardFile"]') public dashboardFileButton: Button;
  @component('//*[@id="labelDashboardGroup"]') public dashboardGroupButton: Button;
  @component('//*[@id="labelDashboardPayee"]') public dashboardPayeeButton: Button;
  @component('//*[@id="labelDashboardTemplates"]') public dashboardTemplatesButton: Button;

  // dashboard hero
  @component('//*[@id="labelSecureMessage"]') public newMessageLink: Button;
  @component('//*[@id="labelBusinessCalendar"]') public businessCalendarLink: Button;
  @component('//*[@id="deleteButton"]') public MessagesDeleteAlert: Button;
  @component('//iframe[@id="businessCalendarIframe"]') public businessCalendarIframe: TextInput;
  @component('//*[@id="my-app"]/ng-component/div/ng-component/div[1]/div[1]/dashboard-hero/div[2]/div') public closeButton: TextInput;
  @component('//ngx-datatable[@class="material ngx-datatable virtualized selectable checkbox-selection ng-star-inserted"]') public resourcesCenterDatatable:TextInput;
 
  //Help
  @component('//div[@class="menu-list-text"]') public helptab: Button;
  @component('//a[@id="navCPEdgecontactUsLinkText"]') public contactUs: Button;
  @component('//a[@id="navCPEdgeResourcesLinkText"]') public helpResources: Button;
  @component('//div[@class="footer-info"]/ul/li[2]/a') public ResourceCenter:Button;




  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.ResourceCenter.element), this.ResourceCenter.getTimeOut());
  }


  public async loadPendingItemsCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.dashboardMyApproval.element), this.dashboardMyApproval.getTimeOut());
  }

  public async loadConditionForNewMessage() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.MessagesDeleteAlert.element), this.MessagesDeleteAlert.getTimeOut());
  }

  public async loadConditionForDialogCalendar() {
    await browser.wait(ExpectedConditions.visibilityOf(this.businessCalendarIframe.element), this.businessCalendarIframe.getTimeOut());
  }

  public async loadConditionForDialogResourceCenter() {
    await browser.wait(ExpectedConditions.visibilityOf(this.resourcesCenterDatatable.element), this.resourcesCenterDatatable.getTimeOut());
  }

  /**
   * this method role that getting available balance Date from view transaction history page(new UI).
   * then will return new string after calling.
   * @returns {string}
   */
  public async getAvailableBalanceDate() {
    let _balanceDate = '';
    await this.availableBalanceDate.getText().then(async (text) => {
      let _text = text.trim();
      if (_text !== '') {
        let startPos = _text.indexOf('of') + 2;
        _balanceDate = 'Available Balance (as of ' + _text.substr(startPos).trim() + ')';
      }
    });
    return _balanceDate;
  }

  public async getPendingListCount(text: any) {
    let listCount: number;
    let count = text.trim();
    if (count === "1000+") {
      listCount = 1001;
    } else {
      listCount = parseInt(count);
    }
    return listCount;
  }
}