/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/

import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, RadioButton, TextInput, OptionSelect, waitForUXLoading, FileSelect, DateSelect1,WebComponent } from '../../../lib';
import moment = require("moment");

@log export class UsersPage extends Page {


  @component('//input[@name="search"]') public searchHomeButton: Button;
  @component('//*[@id="ux-input-0"]') public fullName: TextInput;
  // for Delete User user library page
  @component('//*[@id="menuDashboard"]') public dashboardButton: Button;
  @component('//dbs-user/dbs-user-view/div/div[3]/div/button') public cancelButton: Button;
  @component('//*[@id="delete--btn-action"]') public actionDeleteBtn: Button;
  @component('//input[@name="columnValue"]') public userIdText: TextInput;
  @component('//input[@name="submit"]') public submitSAM: Button;
  @component('//*[@id="msgBlockError-errorText"]') public errorMsg: TextInput;
  @component('//*[@id="user-item-0"]') public userIDLink: Button;
  @component('//*[@name="view-up-to-2"]') public viewUpTo: Button;


  //for Unlock security device
  @component('//*[@name="user-lib-filter"]') public filterUser: TextInput;
  @component('//*[@id="btn-action-0"]') public actionButton: Button;
  @component('//*[@id="unlock-btn-action"]') public unlockButton: Button;
  @component('//*[@name="unlockChallenge"]') public unlockChallenge: TextInput;
  @component('//*[@id="confirm-btn-dialog"]') public confirmButton: Button;
  @component('//*[@id="dashboard-filter"]') public dashboardFilter: TextInput;
  @component('//*[@id="request-item-0"]') public requestLink: Button;
  @component('//*[@id="fullName"]') public userName: TextInput;
  @component('//*[@id="userId"]') public userID: TextInput;
  @component('//*[@id="status"]') public requestStatus: TextInput;
  @component('//*[@id="delete-btn"]') public deleteButton: Button;
  @component('//*[@id="delete-btn-dialog"]') public confirmDeleteButton: Button;
  @component('//*[@id="dismiss-btn-dialog"]') public dismissButton: Button;

  //for Reactive user
  @component('//*[@id="suspend--btn-action"]/span') public reactiveButton: Button;

  //for Suspend user
  @component('//*[@id="suspend--btn-action"]') public suspendButton: Button;

  
  //for Reset login user
  @component('//*[@id="reset-detail-btn-action"]') public resetLoginDetBtn: Button;
  @component('//*[@id="ok-btn-dialog"]') public confirmRestBtn: Button;
  @component('//*[@id="userId"]') public userEmail: TextInput;
  @component('//dbs-reset-detail-request/div/div/div[3]/span[2]') public userPhone: TextInput;

  //for Review user
  @component('//*[@name="reviewUserAccess"]') public reviewUserAccessBtn: Button;
  @component('//*[@class="cursor-pointer ng-star-inserted"]') public affecteUser: WebComponent; 
  @component('//*[@name="btn-next"]') public nextBtn: Button;
  @component('//*[@name="btn-submit"]') public submitBtn: Button;
  @component('//*[@name="btn-finish"]') public finishBtn: Button;
  @component('//*[@class="page-header"]') public pageTitle: Button;

  //for Create new administrator 
  @component('//button[@name="createNewAdministrator"]') public createNewAdministratorBtn: Button;
  @component('//*[@class="admin-mandate"]') public newAdministratorPage: WebComponent; 
  @component('//*[@id="confirm-btn"]') public gotItBtn: Button;
  @component('//button[@id="fill-btn"]') public FillButton: Button;
  @component('//*[@id="view-btn"]') public viewButton: Button;
  @component('//*[@class="action ng-star-inserted"]') public editButton: Button;
  @component('//*[@class="signing-mandate"]') public signingMandatePage: WebComponent; 
  @component('//*[@class="admin-mandate"]') public updateMandatePage: WebComponent;
  @component('//*[@id="ux-tab-ACCOUNT"]') public accountSettings: Button;
  @component('//*[@class="btn btn-dbs-solid"]') public addNewAccountBtn: Button;
  @component('//*[@class="admin-mandate"]') public addNewAccoutPage: WebComponent;
  @component('//*[@class="page-header"]') public pageHeader: TextInput; 
  @component('//*[@class="page-header !m-0"]') public ebbrPageHeader: TextInput; 


  //for Create user
  @component('//input[@name="fullName"]') public createPagefullName: TextInput;
  @component('//*[@id="menuUser"]') public userMenuButton: Button;
  @component('//*[@id="menuSupplierUser"]') public supplierUserButton: Button;
  @component('//*[@name="dashboard-filter"]') public filterBy: TextInput;
  @component('//*[@name="createNewUser"]') public newUserButton: Button;
  @component('//*[@id="copy--btn-action"]') public copyUserButton: Button;

  @component('//*[@id="success-0"]') public successMsg: TextInput;
  @component('//supplier-user/dbs-user-submit/div/div/div[1]/div[2]/dbs-top-panel/div/div[2]/ul/li/label') public successfullyMsg: TextInput;
  @component("//input[@name='email']") public contactDetails: TextInput;
  @component('//p-auto-complete[@formcontrolname="mobileCountry"]') public mobileCountry: OptionSelect;
  @component('//*[@id="mobile"]') public mobileNumber: TextInput;
  @component('//p-auto-complete[@formcontrolname="nationality"]') public nationality: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="identityType"]') public identityType: OptionSelect;
  @component('//*[@id="identityNumber"]') public identityNumber: TextInput;
  @component('//date-picker[@formcontrolname="birthDay"]') public dateOfBirth: DateSelect1;
  @component('//*[@id="manually"]') public setUpManually: RadioButton;
  @component('//*[@id="hasTransactionAccess_yes"]') public transactionAccessYes: RadioButton;
  @component('//*[@id="contactPerson_yes"]') public contactPersonYes: RadioButton;
  @component('//*[@id="enquiryAccess_yes"]') public enquiryAccessYes: RadioButton;
  @component('//*[@id="customReportAccess_yes"]') public customReportAccessYes: RadioButton;
  @component('//*[@id="isApproveAll"]') public transactionApprover: RadioButton;
  @component('//p-auto-complete[@formcontrolname="group"]') public approveGroup: OptionSelect;
  @component('//*[@id="select_Transaction_All_0_"]') public paymentSelectAll: Button;
  @component('//transaction-access/div/dbs-transaction-detail/div/div/div[8]/div[1]/div/div/div[1]/div[2]/span') public showPayment: Button;
  @component('//*[@id="251_"]') public giroPayment: Button;
  @component('//*[@id="253_"]') public accoutTransfer: Button;
  @component('//*[@id="disclaimerConfirm"]') public disclaimerSelect: Button;
  @component('//*[@id="btn-continue"]') public continueButton: Button;
  @component('//*[@id="btn-submit"]') public submitButton: Button;
  @component('//*[@id="isApproveOwn"]') public ApproveOwnButton: Button;
  @component('//*[@id="push-btn"]') public ApproveNowButton: Button;
  @component('//*[@id="btn-finish"]') public finishedButton: Button;
  @component('//*[@id="btn-done"]') public doneButton: Button;
  @component('//*[@id="approve-btn"]') public approveButton: Button;
  @component('//*[@id="push-btn"]') public approveNowButton: Button;
  @component('//*[@id="get-challenge"]') public challengeResponse: TextInput;
  @component('//*[@id="responseCode"]') public responseCode: TextInput;
  @component('//*[@id="approve-btn-dialog"]') public approveRequestBtn: Button;
  @component('//*[@id="dismiss-btn-dialog"]') public dismissBtn: Button;
  @component('//*[@id="get-challenge"]') public getChanllengeBtn: Button;
  @component('//*[@id="userGroup"]') public userGroup: TextInput;
  @component('//*[@formcontrolname="transactionMaker"]') public tanxMaker: Button;
  @component('//input[@id="select_Transaction_All_0_"]') public allPaymentType: Button;
  @component('//*[@class="list-disc list-inside"]') public userRole: TextInput;
  @component('//supplier-access-view-section/div/section/div/span[2]/ul/li[2]/span') public singleControlView: TextInput;
  @component('//dbs-transaction-detail/div/div/div[8]/div[1]/div/div[2]/div[2]/div[1]/autocomplete-multi/div/span') public showAccount: Button;
  @component('//*[@id="accounts-0"]') public unselectAccount1: Button;
  @component('//input[@id="select_Transaction_All_1_"]') public allPayrollType: Button;
  @component('//*[@name="subsidiary"]') public selectSubsidiary:TextInput;
  @component('//*[@class="ui-autocomplete-list-item-label ng-star-inserted"]') public subsiValue:Button
  @component('//*[@id="enquiryAccess_yes0"]') public enquiryAccessYes0: RadioButton;
  @component('//*[@id="fileExchange_"]') public fileExchange: RadioButton;
  @component('//*[@id="isFileExchangeUpload_"]') public fileExchangeUpload: RadioButton;
  @component('//*[@id="isFileExchangeApprove_"]') public fileExchangeApprove: RadioButton;
  @component('//*[@id="ProxyAddressing_"]') public proxyAddress: RadioButton;
  @component('//*[@id="isProxyAddressingMaker_"]') public proxyAddressMaker: RadioButton;
  @component('//*[@id="isProxyAddressingApprove_"]') public proxyAddressApprover: RadioButton;

  //LM access
  @component('//*[@id="hasLiquidityManagement_yesundefined"]') public liquidityManageAccessYes: RadioButton;
  @component('//*[@id="lmOverview_"]') public lmOverview: RadioButton;
  @component('//*[@id="lmViewer_"]') public lmSweepsViewer: RadioButton;
  @component('//*[@id="lmMaker_"]') public lmSweepsMaker: RadioButton;
  @component('//*[@id="lmApprove_"]') public lmSweepsApprover: RadioButton;
  @component('//*[@id="lmApproveOwn_"]') public lmSweepsApproveOwn: RadioButton;
  @component('//*[@id="lmNPIO_"]') public lmNPIO: RadioButton;
  


  @component('//*[@id="securityTokenDigital"]') public securityTokenDigital: Button;
  // @component('//*[@id="contactPerson_yes"]') public contactPerson_yes: Button;
  // @component('//*[@id="contactPerson_yes"]') public enquiryAccess_yes: Button;
  @component('//dbs-enquiry-detail/div/div/div/div[3]/div[1]/div/div[2]/span') public enquiryCollapse: Button;
  @component('//*[@id="select_EnquiryAll_2_"]') public LoanEnquiry: Button;
  @component('//*[@id="isCreateAll"]') public createManually: Button;
  @component('//*[@id="isMakerService_"]') public createViaFs: Button;
  // @component('//*[@id="isApproveAll"]') public isApprover: Button;
  @component('//*[@id="isDualControlNo"]') public isApproveOwn: Button;
  @component('//div[3]/div[2]/div/div/div[1]/p-auto-complete/div/div[2]/span') public belongGroup: TextInput;
  @component('//*[@id="isApproverService_"]') public isFileUploadApprover: Button;
  @component('//*[@id="select_Transaction_All_0_"]') public payments: Button;
  @component('//*[@id="Maker_Trans_0_"]') public isTransactionMaker: Button;
  @component('//*[@id="Maker_Template_0_"]') public isTemplateMaker: Button;
  @component('//dbs-transaction-detail/div/div/div[8]/div[1]/div/div/div[1]/div[2]/span') public paymentsCollapse: Button;
 
  @component('//*[@id="Maker_Trans_0_0_"]') public giroPaymentMaker: Button;
  @component('//*[@id="Maker_Template_0_0_"]') public giroTemplateMaker: Button;
 
  @component('//*[@id="Maker_Trans_0_1_"]') public actMaker: Button;
  @component('//*[@id="Maker_Template_0_1_"]') public actTemplateMaker: Button;
  @component('//*[@id="261_"]') public telegraphicTransfer: Button;
  @component('//*[@id="Maker_Trans_0_2_"]') public ttMaker: Button;
  @component('//*[@id="Maker_Template_0_2_"]') public ttTemplateMaker: Button;

  @component('//div/div/div[8]/div[2]/div/div/div[1]/div[3]/span') public payrollCollapse: TextInput;
  @component('//*[@id="501_"]') public payrollDBS: Button;
  @component('//*[@id="Maker_Trans_1_1_"]') public payrollDBSMaker: Button;
  @component('//*[@id="Maker_Template_1_1_"]') public payrollDBSTemplateMaker: Button;
  @component('//*[@id="Approver_Trans_1_1_"]') public payrollDBSApprover: Button;

  @component('//*[@id="canEditTransactions_"]') public canEditTransactions: Button;
  @component('//*[@id="canDeleteTransactions_"]') public canDeleteTransactions: Button;
  @component('//*[@id="MerchantPortal_"]') public merchantPortal: Button;
  @component('//*[@id="localPayee_"]') public localPayee: Button;
  @component('//*[@id="payeeMaker_"]') public payeeMaker: Button;
  @component('//*[@id="payeeApproval_"]') public payeeApproval: Button;
  @component('//*[@id="transactionMaker"]') public tradetTransactionMaker: Button;
  @component('//*[@id="existingUser"]') public copyFromExistingUser: TextInput;
  @component('//dbs-radio-group/div/div/p-auto-complete/div/div[2]/ul/li[1]/div/span') public copyUserSelect1: TextInput;


  //create new administrator
  @component('//*[@id="createNewAdministrator"]') public createNewAdministrator: Button;

  //tradeFinanceAccess
  @component('//*[@id="tradeFinanceAccess_yes"]') public tradeFinanceAccessYes: RadioButton;
  @component('//input[@id="transactionApprover"]') public transactionApproverCheckbox: RadioButton;
  @component('//p-auto-complete[@formcontrolname="tradeGroup"]') public tradeGroup: OptionSelect;
  @component('//*[@id="userTradeGroup"]') public userTradeGroup: TextInput;
  @component('//input[@id="idlcapproveDelete-select"]') public DocumentaryLettersofCreditImportApproveDelete: RadioButton;
  @component('//input[@id="islcapproveDelete-select"]') public StandbyLettersofCreditApproveDelete: RadioButton;
  @component('//input[@id="iguaapproveDelete-select"]') public BankerGuaranteeApproveDelete: RadioButton;
 // @component('//input[@id="iguainquiry-select"]') public iguainquiry: RadioButton;
  @component('//input[@id="idcapproveDelete"]') public ImportBillunderCollectionApproveDelete: RadioButton;
  @component('//input[@id="idcinquiry"]') public idcinquiry: RadioButton;
  @component('//input[@id="edcapproveDelete-select"]') public ExportBillunderCollectionApproveDelete: RadioButton;
  @component('//input[@id="edlcapproveDelete-select"]') public DocumentaryLettersofCreditExportApproveDelete: RadioButton;
  @component('//input[@id="issgapproveDelete"]') public ShippingGuaranteeApproveDelete: RadioButton;
  @component('//input[@id="finapproveDelete-select"]') public TradeFinancingApproveDelete: RadioButton;
  @component('//input[@id="issginquiry"]') public issginquiry: RadioButton;
  @component('//input[@id="itlcinquiry-select"]') public TLCinquiry: RadioButton;
  @component('//input[@id="updatesinquiry-select"]') public RecentActivitiesinquiry: RadioButton;
  @component('//input[@id="bankDocinquiry-select"]') public bankDocinquiry: RadioButton;
  @component('//input[@id="reportsinquiry-select"]') public reportsinquiry: RadioButton;
  @component('//input[@id="reviewinquiry-select"]') public reviewinquiry: RadioButton;
  @component('//input[@id="admininquiry-select"]') public admininquiry: RadioButton;
  // Modify User
  @component('//*[@name="search"]') public searchBtn: Button;
  @component('//*[@id="approverAdmin"]') public makerAndApproverAdmin: Button;
  @component('//*[@id="dualControl_yes"]') public dualControl_yes: Button;
  @component('//input[@class="input-hide ng-star-inserted"]') public selectFileBtn: FileSelect;
  @component('//*[@id="edit--btn-action"]') public editBtn: Button;
  @component('//*[@id="companyName"]') public CompanyName: TextInput;
  @component('//*[@formgroupname="supplierHubAccess"]') public SupplierHubAccess  : TextInput;
  @component('//*[@id="ux-tab-MYAPPOVAL"]') public MyApproveTab: Button;
  @component('//*[@id="ux-tab-SHOWALL"]') public showAllTab: Button;
  @component('//*[@id="accounts-0"]') public giroPaymentAccount: Button;
  @component('//*[@id="accounts-1"]') public giroPaymentAccount2: Button;
  @component('//*[@type="checkbox"]') public requestCheckBox: Button;
  @component('//*[@id="request-item-0"]') public RequestLink: Button;
  @component('//*[@id="adv-show-btn"]') public ShowAddiFiltes: Button;
  @component('//*[@id="paymentDateStart"]') public StarRequestDate: DateSelect1;
  @component('//*[@id="paymentDateEnd"]') public EndRequestDate: DateSelect1;
  @component('//*[@id="search-btn"]') public Search: Button;
  @component('//*[@id="status"]') public ViewStatus: TextInput;
  @component('//*[@id="userId"]') public UserId: TextInput;
  @component('//*[@id="supplier-user-lib-filter"]') public supplierFilterUser: TextInput;
  @component('//dbs-transaction-detail/div/div/div[8]/div[1]/div/div[2]/div[2]/div[1]/dbs-dropdown/div/label[1]/div[2]/div/div/span') public giroSelectAccount: TextInput;
  @component('//div/div[2]/div[1]/step-3-subsaccess/div/div/span') public viewDetails1: Button;
  @component('//div/div[2]/div[2]/step-3-subsaccess/div/div/span') public viewDetails2: Button;
  @component('//div[2]/transaction-access/div/dbs-transaction-detail/div/div/div[8]/div[1]/div/div/div[1]/div[2]') public subPaymentCollapse: Button;
  @component('//*[@id="261_0"]') public subTT_1: Button;
  @component('//*[@id="Maker_Trans_0_4_0"]') public subTTMaker_1: Button;
  @component('//*[@id="269_0"]') public subICT_1: Button;
  @component('//*[@id="Maker_Trans_0_5_0"]') public subICTMaker_1: Button;
  @component('//div[2]/div[6]/div[1]/autocomplete-multi/div') public subICTAccount: Button;
  @component('//div[1]/autocomplete-multi/div/div[2]/div[3]/ul/li/div/div') public subICTAccountSelect: Button;
  
  // Approve Modify User request
  @component('//*[@id="menuDashboard-a"]') public Dasgboardmenu: TextInput;
  @component('//*[@id="get-challenge"]') public Challenge: Button;
  @component('//*[@id="responseCode"]') public ResponseCode: TextInput;
  @component('//*[@id="approve-btn-dialog"]') public Approvedialog: Button;
  @component('//*[@id="dismiss-btn-dialog"]') public Dismiss: Button;
  @component('//*[@id="item_4"]/table/tbody/tr[49]/td[2]/a') public editUserLink: Button;
  @component('//html/body/table[2]/tbody/tr[41]/td[3]/input') public SAMUserName: TextInput;
  @component('//body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[8]/a') public UserTab: TextInput;
  @component('//body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[4]/input[1]') public SearchUserId: TextInput;
  @component('//body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[4]/input[2]') public SearchButn: Button;
  @component('//body/table[2]/tbody/tr[14]/td[2]/table/tbody/tr[2]/td[3]') public UserName: TextInput;

  //Provider approve the request
  @component('//*[@id="submit-btn"]') public providerSubmitBtn: Button;
  @component('//*[@id="verify-dialog-title"]') public providerConfirmMsg: TextInput;
  @component('//*[@id="confirm-dialog-title"]') public submitComleteMsg: TextInput;
  @component('//*[@id="submit-btn-dialog"]') public confirmSubmitBtn: Button;
  @component('//*[@id="dismiss-btn-dialog"]') public confirmDismissBtn: Button;
  @component('/html/body/app-root/section[1]/dbs-header/header/div/div[2]/button') public logoutButton: Button;
  @component('//*[@id="verify-btn-dialog"]') public approveConfirmMsg: TextInput;
  @component('//*[@id="confirm-dialog-title"]') public approveComleteMsg: TextInput;
  @component('//*[@id="verify-btn"]') public providerApproveBtn: Button;
  @component('//*[@id="verify-btn-dialog"]') public popProviderApproveBtn: Button;
  @component('//*[@id="affiliate-drop-list"]') public affiliateSelected: OptionSelect;
  @component('//*[contains(@class,"ui-autocomplete-list-item-label")]') public gcAffiliate: Button;
  @component('//*[contains(@class,"collapse-button ng-star-inserted")]') public additionFilter: Button;

  //Dashboard
  @component('//*[@id="reject-btn-provider"]') public rejectBtn: Button;
  @component('//*[@name="reasonForRejection"]') public rejectReason: TextInput;
  @component('//*[@id="reject-btn-dialog"]') public rejectDialogBtn: Button;
  @component('//dbs-request-view/div/div[2]/div[2]/span[2]/div[6]/div/span') public rejectReasonValue: TextInput;
  @component('//*[@id="reject-btn"]') public viewRejectBtn: Button;
  @component('//*[@id="delete-btn"]') public deleteBtn: Button;
  @component('//*[@id="delete-btn-dialog"]') public deleteDialogBtn: Button;
  @component('//*[@id="No Records Found"]') public noRecordsFound: Button;

  //for copy user view request page
  @component('//div[1]/entitlements-view-section/div/section/div[2]/span[2]/div[2]/div/div[3]/div/table/tbody/tr[1]/td[1]/div') public AccountTransfer_1: TextInput;
  @component('//div/section/div[2]/span[2]/div[2]/div/div[3]/div/table/tbody/tr[2]/td[1]/div') public TelegraphicTransfer_1: TextInput;
  @component('//div/section/div[1]/span[2]/div[2]/div/div[2]/div/table/tbody/tr[3]/td[1]/div') public IntraCompanyTransfer: TextInput;
  @component('//div[1]/entitlements-view-section/div/section/div[2]/span[2]/div[3]/div/div[3]/div/table/tbody/tr/td[1]/div[1]') public Payroll_1: TextInput;
  @component('//div[1]/entitlements-view-section/div/section/div[2]/span[2]/div[4]/div/div[3]/div/table/tbody/tr/td[1]/div') public BulkGIROCollection_1: TextInput;
  @component('//div[1]/entitlements-view-section/div/section/div[2]/span[2]/div[5]/div/div[3]/div/table/tbody/tr/td[1]/div') public ChequeExpress_1: TextInput;
  @component('//div[2]/entitlements-view-section/div/section/div[2]/span[2]/div[2]/div/div[3]/div/table/tbody/tr/td[1]/div') public  GIROPayment : TextInput;
  @component('//div[2]/entitlements-view-section/div/section/div[2]/span[2]/div[3]/div/div[3]/div/table/tbody/tr/td[1]/div[1]') public Payroll_2: TextInput;
  @component('//div[2]/entitlements-view-section/div/section/div[2]/span[2]/div[4]/div/div[3]/div/table/tbody/tr/td[1]/div') public BulkGIROCollection_2: TextInput;
  @component('//div[2]/entitlements-view-section/div/section/div[2]/span[2]/div[5]/div/div[3]/div/table/tbody/tr/td[1]/div') public ChequeExpress_2: TextInput;

  //for edit user view request page
  @component('//div[1]/modify-entitlements-view-section/div/section/div[1]/span[2]/div[2]/div/div[2]/div/table/tbody/tr[1]/td[1]/div') public editViewAccountTransfer_1: TextInput;

  //for edit user view request page
  @component('//dbs-request/dbs-request-view/div/div[3]/user-view-section/div/div/div[2]/span') public fullUserDetails: Button;


  constructor() {
    super();
  }
  public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchHomeButton.element), this.searchHomeButton.getTimeOut());
  }

  public async loadConditionForViewRequest() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.requestLink.element), this.requestLink.getTimeOut());
  }

  public async loadConditionForAction() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.reactiveButton.element), this.reactiveButton.getTimeOut());
  }
  public async loadConditionForSupplierRequest() {
    await waitForUXLoading();
    await browser.sleep(20000);//wait for response
  }

  public async loadConditionUser() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.actionButton.element), this.actionButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.userIDLink.element),this.userIDLink.getTimeOut());
  }


  public async loadConditionForDashboard() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.requestLink.element), this.requestLink.getTimeOut());
    await browser.sleep(3500);// when push approval, before click need to wail the response
  }

  public async loadConditionEditUser() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.CompanyName.element), this.CompanyName.getTimeOut());
  }

  public async loadConditionEditSupplierUser() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.userName.element), this.userName.getTimeOut());
    await browser.sleep(2000);//wait for load complete
  }
  public async loadConditionEditUserCont() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
  }

  public async loadConditionEditUserSubm() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishBtn.element), this.finishBtn.getTimeOut());
  }

  public async loadConditionRequest() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.RequestLink.element), this.RequestLink.getTimeOut());
  }

  public getCurrentDate() {
    return moment(new Date()).format("DD MMM YYYY");
  }

  public async loadConditionViewRequest() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.ViewStatus.element), this.ViewStatus.getTimeOut());
  }

  public async loadConditionForPrevewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.stalenessOf(this.continueButton.element), this.continueButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
  }
  public async loadConditionForSupplierSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.doneButton.element), this.doneButton.getTimeOut());
  }

  public async loadConditionforApprovalSection() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.challengeResponse.element), this.challengeResponse.getTimeOut());
    await browser.sleep(5000);// when push approval, before click need to wail the response
  }

  public async loadConditionForApproveRequestPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
  }

  public async loadConditionForDismissDialog() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
  }

  public async loadConditionforProviderSubmit() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.providerConfirmMsg.element), this.providerConfirmMsg.getTimeOut());
  }

  public async loadConditionforProviderSubmitComplete() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.submitComleteMsg.element), this.submitComleteMsg.getTimeOut());
  }

  public async loadConditionforProviderApproveConfirm() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.approveConfirmMsg.element), this.approveConfirmMsg.getTimeOut());
  }

  public async loadConditionforProviderApproveComplete() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.approveComleteMsg.element), this.approveComleteMsg.getTimeOut());
    await browser.sleep(5000);// when push approval, before click need to wail the response
  }

  public async loadConditionForUser() {
    await waitForUXLoading();
    await browser.sleep(5000);
  }

  public async loadConditionForCreateUserPage() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
  }
  
  public async loadConditionForReviewUserPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.nextBtn.element), this.nextBtn.getTimeOut());
  }
  
  public async loadConditionForReviewUserPreviewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
  }
  
  public async loadConditionForReviewUserCompletePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishBtn.element), this.finishBtn.getTimeOut());
  }

  public async loadConditionForCreateANewAdministratorPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.gotItBtn.element), this.gotItBtn.getTimeOut());
  }

  public async loadConditionForCB() {
    await browser.sleep(1200);
  }

}

