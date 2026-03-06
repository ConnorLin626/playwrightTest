/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { RadioButton, WebComponent } from '../../../lib/components';

@log export class CorporationsPage extends Page {
  constructor() {
    super();
  }

  //Corporation Link
  @component('//input[@name="search"]') public searchHomeButton: Button;
  @component('//input[@name="submit_affiliate"]') public submitAffiliateButton: Button;
  @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[4]/a') public topCorporationsLink: Button;
  @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
  @component('//select[@name="columnName"]') public selectColumn: HtmlSelect;
  @component('//input[@name="columnValue" and @onkeydown="onKey(event)"]') public inputAffiliate: TextInput;
  @component('//input[@name="submit_search"]') public searchCorpButton: Button;
  @component('//*[@id="msgBlockError-errorText"]/b') public CorpInfoMsg: WebComponent; // SAM- Corporations Information Message
  //@component('//a[@href="/s1gcb/csr/common/corp/corporationEditComprehensiveView?id=1426001"]') public viewCorpLink: Button;
  @component('/html/body/table[3]/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[3]/a') public viewCorpLink: Button;
  @component('//input[@name="submit_edit"]') public editCorpButton: Button;
  @component('//input[@name="customerId"]') public companyIdValue: TextInput;
  @component('//a[contains(@href,"csr/common/corp/accounts/accountSearch/transferContext")]') public accountTabLink: Button;
  @component('//a[contains(@href,"csr/common/corp/accounts/CreateCompanyAccount")]') public enrollAccountLink: Button;
  @component('//*[@id="exp_1"]') public accountTabLink2: Button;
  @component('//*[@title="View Details"]') public details: Button;
  //Corporation
  @component('//a[contains(@href,"csr/common/corp/corporationEnroll")]') public enrollCorporationLink: Button;
  @component('//input[@name="cin"]') public cinText: TextInput;
  @component('//input[@name="submit_fetchCINinfo"]') public fetchCINButton: Button;
  @component('//input[@name="customerId"]') public companyIdText: TextInput;
  @component('//input[@name="submit_preview"]') public previewCorporationButton: Button;
  @component('//input[@name="submit_submitView"]') public submitCorporationButton: Button;
  @component('//*[@id="ebbrErp"]') public ebbrErp: HtmlSelect;

  //User Account
  @component('//input[@name="accountId"]') public enrollAccountNumber: TextInput;
  @component('//input[@name="accountName"]') public enrollAccountName: TextInput;
  @component('//input[@name="addressLine1"]') public addressLine1: TextInput;
  @component('//input[@name="addressLine2"]') public addressLine2: TextInput;
  @component('//input[@name="addressLine3"]') public addressLine3: TextInput;
  @component('//input[@name="organisationId"]') public organisationId: TextInput;
  @component('//input[@name="organisationCode"]') public organisationCode: TextInput;
  @component('//input[@name="organisationName"]') public organisationName: TextInput;
  @component('//select[@name="currency.currencyCode"]') public enrollSelectCurrency: HtmlSelect;
  @component('//input[@name="fiId"]') public enrollSwiftBic: TextInput;
  @component('//input[@name="submit_stdBankSearch"]') public searchBankButton: Button;
  @component('//select[@name="fiIdTypeEnumValue"]') public fiIdTypeEnumValue: HtmlSelect;
  @component('//input[@name="submit_filter"]') public searchBankSubmitButton: Button;
  @component('//a[contains(@href,"csr/csrStdBankList/detail?selectedBank=0&selectedBankIdType=1")]') public bankLink: Button;
  @component('//input[@name="submit_add"]') public searchBankAddButton: Button;
  @component('//select[@name="product"]') public enrollProduct: HtmlSelect;
  @component('//input[@name="submit_continue"]') public enrollPreviewButton: Button;
  @component('//input[@name="submit_done"]') public enrollSubmitButton: Button;
  @component('//input[@name="submit_preview"]') public previewAccountButton: Button;
  @component('//input[@name="submit_detailDone"]') public submitAccountButton: Button;
  @component('//input[@name="submit_approve"]') public apporveAccountButton: Button;
  @component('//input[@name="submit_deletePreview"]') public deletePreviewAccountButton: Button;
  @component('//input[@name="submit_delete"]') public deleteAccountButton: Button;
  @component('//input[@name="columnValue"]') public AccountText: TextInput;
  @component('//input[@name="submit"]') public searchAccButton: Button;
  @component('/html/body/table[2]/tbody/tr[12]/td[2]/a') public AccounNumtLink: Button;
  @component('/html/body/table[2]/tbody/tr[12]/td[7]/a') public AccountStaLink: Button;
  @component('//input[@name="submit_cancelFromEditUserAcct"]') public cancelFromEditUserAcct: Button;

  //Data Servieces
  @component('//a[contains(@href,"csr/common/corp/dataServices/transferContext")]') public dataServicesTabLink: Button;
  @component('//html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[2]/td[1]/a') public specialReportLink: Button;
  @component('//html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[2]/td[1]/a') public specialReportJPLink: Button;
  @component('//input[@name="isUseBackOfficeName"]') public isUseBackOfficeNameBox: Button;
  @component('//input[@name="submit_modifyPreview"]') public dataServicesPreButton: Button;
  @component('//input[@name="submit_reportEditSave"]') public dataServicesSubmitButton: Button;
  @component('//*[@href="/samweb/csr/common/corp/dataServices/defineDataService"]') public dataServicesCreateButton: Button;
  @component('//input[@name="submit_preview"]') public PreButton: Button;
  @component('//*[@id="CBKDSSbDCONF"]') public dataType: Button;
  @component('//input[@name="submit_reportSave"]') public subButton: Button;
  @component('//input[@name="submit_deletePreview"]') public deleteDataService: Button;
  @component('//input[@name="submit_delete"]') public confirmDelete: Button;

  //User
  @component('//input[@name="submit_addUser"]') public addUserButton: Button;loginId
  @component('//input[@name="loginId"]') public newUserIdText: TextInput;
  @component('//select[@name="portfolioCurrency.currencyCode"]') public newUserSelectCurrency: HtmlSelect;
  @component('//input[@name="lastName"]') public newUserNameText: TextInput;
  @component('//input[@name="email"]') public newUserEmailText: TextInput;
  @component('//input[@name="submit_preview"]') public previewNewUserButton: Button;
  @component('//input[@name="submit_submit"]') public submitNewUserButton: Button;
  @component('//a[contains(@href,"csr/common/corp/companyAddUser/addUserLimits")]') public editLimitLink: Button;
  @component('//a[contains(@href,"csr/common/corp/companyEditUser/userLimits")]') public checkLimitLink: Button;
  @component('//input[@name="userPaymentLimitsSubValueObject[0].userGenericLimit.value"]') public editLimitText: TextInput;
  @component('//a[contains(@href,"csr/common/corp/entitlement/entitlementAccountList")]') public editNewUserAccountLink: Button;
  @component('//a[contains(@href,"csr/common/corp/entitlement/startUserAccountServices?accountIndex=0")]') public testAccountLink: Button;
  @component('/html/body/table[2]/tbody/tr[9]/td[3]/span/small/input[1]') public testPaymentElement: Button;
  // DUBAI
  @component('//*[@id="/dataop/transfer:"]') public userAccountAccess: Button;
  
  @component('//input[@name="submit"]') public submitButton: Button;
  @component('//input[@name="submit_back"]') public backNewUserButton: Button;
  @component('//a[contains(@href,"csr/common/corp/dataServices/viewListForEmp")]') public dataServicesLink: Button;
  @component('//a[@href="javascript:selectAll(nameSelected);"]') public selectAllDataServicesLink: Button;
  @component('//input[@name="submit_enter"]') public submitDataServicesButton: Button;
  @component('//a[contains(@href,"csr/common/corp/UserFunctionalAccess")]') public functionalAccessLink: Button;
  @component('//*[@id="x1"]/span/small/input[1]') public testFunctionalElement: Button;
  @component('//a[contains(@href,"csr/common/corp/UserIdealServiceAccess")]') public IdealAccessLink: Button;
  @component('//*[@id="x2"]/span/small/li/input[1]') public testIdealElement: Button;
  @component('//input[@name="submit_approve"]') public approveNewUserSubmitButton: Button;
  @component('//a[contains(@href,"csr/common/corp/UserSearch/transferContext")]') public userTab: Button;
  @component('//input[@name="columnValue"]') public userIdText: TextInput;
  @component('/html/body/table[2]/tbody/tr[14]/td[2]/table/tbody/tr[2]/td[2]') public newUserDetailLink: Button;
  @component('/html/body/table[2]/tbody/tr[14]/td[2]/table/tbody/tr[2]/td[6]') public approveNewUserLink: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[2]/a[1]') public selectLink1: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[3]/a[1]') public selectLink2: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[3]/a[3]') public selectLink3: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[4]/a[1]') public selectLink4: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[4]/a[3]') public selectLink5: Button;
  @component('//input[@name="hqAccessProfileName"]') public hqAccessProfileText: TextInput;
  @component('/html/body/table[2]/tbody/tr[10]/td[3]') public userIdCheck: TextInput;
  @component('//input[@name="lastName"]') public userNameCheck: TextInput;
  @component('//input[@name="submit_cancel"]') public cancelButton: Button;
  @component('//input[@name="submit_backFromEditUser"]') public cancelEdit: Button;
  @component('//a[contains(@href,"csr/common/corp/companyEditUser/UserIdealServiceAccess?holdingacctservices=true&id=edit")]') public checkIdealAccessLink: Button;
  @component('//*[@id="x2"]/span/small/li/input[1]') public ssmCheckBox: Button;
  @component('//*[@id="previewButton_Link"]') public oboAcceptServiceButton: Button;
  @component('//table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[4]/input[1]') public enterUser: TextInput;
  @component('//input[@value="Search >>"]') public searchUser: Button;
  @component('//html/body/table[2]/tbody/tr[14]/td[2]/table/tbody/tr[2]/td[9]/a') public userTabOboUserLink: Button;
  @component('/html/body/table[2]/tbody/tr[14]/td[2]/table/tbody/tr[2]/td[2]/a') public UserIdLink: Button;
  @component('//*[@id="x1"]/span/small/li[7]/div/a') public BulPayAccessLink: Button;
  @component('//*[@id="/payment/sgbgiro/approve:PMA01,PWO01,SWO01,SNO01"]') public modifyBuPayAppAcc: Button;
  @component('//input[@id="myUser"]') public filerUsers: TextInput;
  @component('//select[@id="functionalTemplateOptions"]') public fliterTemplate: HtmlSelect;
  @component('//input[contains(@id,"/audit/confirmations/view:")]') confirmations : Button;
  @component('//input[@name="supplier_Root"]') selectSupplierHub : Button;
  @component('//html/body/table[2]/tbody/tr[8]/td[2]/a[1]') IdealServiceSelectAll : Button;
  @component('//input[@name="paymentUserEntitlementsfunctionalEntitlementGroupsArray2"]') selectAlt : Button;
  @component('//input[@name="submit_remove"]') removeUser : Button;
  @component('//input[@name="submit_remove"]') preRemoveUser : Button;
  @component('/html/body/table[2]/tbody/tr[14]/td[2]/table[1]/tbody/tr[2]/td[2]/strong') noUserRecord : TextInput;
  @component('//html/body/table[2]/tbody/tr[10]/td[3]') public userIDValue: TextInput;
  @component('//input[@name="lastName"]') public userNameValue: TextInput;
  @component('//input[@id="webCustodyRoot"]') selectWebCustody : Button;
  @component('//tbody/tr[8]/td[3]/ul[1]/span/small/li/div/a')  showSSM: Button;
  @component('//input[@name="ssmFunctions[0]"]')  ssmView: Button;
  @component('//input[@name="ssmFunctions[5]"]')  ssmAdminMaker: Button;
  @component('//input[@name="ssmFunctions[1]"]')  ssmAdminApprover: Button;
  @component('//*[@id="msgBlockError-errorText"]') public errorMessage: TextInput;
  @component('//a[contains(@href,"/samweb/csr/common/corp/companyEditUser/UserIdealServiceAccess")]') public editPageIdealAccessLink: Button;
  @component('//*[contains(@href,"/samweb/csr/common/corp/corporationEditComprehensiveView/") and contains(text(),"Pending Add Approval")]') public pendingAddLink: Button;
  @component('//*[contains(@href,"/samweb/csr/common/corp/corporationEditComprehensiveView/approveAccount") and contains(text(),"Pending Add Approval")]') public pendingDeleteLink: Button;
  @component('//*[@name="submit_reject"]') public rejectBtn: Button;
  @component('//*[@name="pendingUserId"]') public pendingUserCheckbox: Button;
  @component('//*[@name="submit_approveSeveralUsers"]') public approveSeveralUsersBtn: Button;
  @component('/html/body/table[2]/tbody/tr[70]/td[3]') public userStatus: TextInput;

  @component('//*[@name="submit_copy"]') public copyBtn: Button;
  @component('//*[@id="copyUserEntitlementsType2"]') public copySubCompanyEntitlements: Button;
  @component('//*[@name="userOfCopyTo"]') public copyToBtn: HtmlSelect; 
  @component('//*[@name="submit_copySubmit"]') public copySubmitBtn: Button;
  @component('//*[@name="submit_copyToSubmit"]') public copyToSubmitBtn: Button;
  @component('//*[@class="colapse"]') public subsiCloapse: Button;
  @component('//a[contains(@href,"/samweb/csr/common/corp/companyEditUser/UserFunctionalAccess?holdingacctservices=true&id=edit")]') public editPageFunctionAccessLink: Button;
  @component('//*[@id="item_0"]/table/tbody/tr/td[3]/a[1]') public subAccountServicesLink: Button;
  @component('//*[@id="item_0"]/table/tbody/tr/td[3]/a[2]') public subDataServiceLink: Button;
  @component('//*[@id="item_0"]/table/tbody/tr/td[3]/a[3]') public subFunctionAccessLink: Button;
  @component('//*[@id="item_0"]/table/tbody/tr/td[3]/a[4]') public subIdealAccessLink: Button;
  //account service access
  @component('//table[2]/tbody/tr[10]/td[3]') public accountAccessCheck: TextInput;
  //data service access
  @component('//*[@id="lmsncrepot"]') public liquidityManagementReportCheck: Button;
  @component('//*[@id="servDetails0.accountIdArr1"]') public servDetailsCheck: Button;
  // functions access
  @component('//*[@name="submit_backFromEditUser"]') public backFromEditUserBtn: Button;
  @component('//*[@name="paymentUserEntitlementsfunctionalEntitlementGroupsArray9"]') public corporateCheque: Button;
  @component('//*[@name="paymentUserEntitlementsfunctionalEntitlementGroupsArray10"]') public globeSendTransfer: Button;
  @component('//*[@name="paymentUserEntitlementsfunctionalEntitlementGroupsArray11"]') public GIROPayrollDBSPayment: Button;
  @component('//*[@name="paymentUserEntitlementsfunctionalEntitlementGroupsArray12"]') public GIROBulkPaymentDBS: Button;
  @component('//*[@name="paymentUserEntitlementsfunctionalEntitlementGroupsArray13"]') public GIROBulkCollectionDBS: Button;
  @component('//*[@name="adminFunctions[0]"]') public paymentReports: Button;
  @component('//*[@name="import_Root"]') public uploads: Button;
  @component('//*[@name="checkSvcFunctions[0]"]') public fileExchangeCtoC: Button;
  @component('//*[@name="irFunctions[0]"]') public accountBalanceEnquiry: Button;
  @component('//*[@name="irFunctions[2]"]') public acccountSatementView: Button;
  @component('//*[@name="irFunctions[3]"]') public acccountSatementReportView: Button;
  @component('//*[@name="checkSvcFunctions[7]"]') public merchantPortal: Button;
  //ideal access
 // @component('//*[@name="merchantPortalFunctions[0]"]') public merchantPortal: Button;
  @component('//*[@name="externalLinkFunctions[0]"]') public ctcp: Button;

  //COS
  @component('//table[2]/tbody/tr[34]/td[3]/small/a') public cosEntryLink: Button;
  @component('/html/body/table[2]/tbody/tr[16]/td[2]/input') public auBulkPaymentAllowAccess: Button;
  @component('//input[@name="actionPreview"]') public preCosButton: Button;
  @component('//input[@name="actionSubmit"]') public submitCosButton: Button;
  @component('//input[@name="submit_preview"]') public corpContinueButton: Button;
  @component('//input[@name="submit_submit"]') public corpSubmitButton: Button;

  //Activity
  @component('//a[contains(@href,"csr/common/corp/activity/activitySearch")]') public activityTabLink: Button;
  @component('//select[@name="userFunction"]') public userFunctionSelect: HtmlSelect;
  @component('//ul[@class="chosen-choices"]') public userFunctionSearch: TextInput;
  @component('//input[@class="chosen-search-input default"]') public userFunctionSearchInput: TextInput;
  @component('//li[@class="active-result highlighted"]') public userFunctionSearchSelect: TextInput;
  @component('//input[@name="loginId"]') public beneUserIdText: TextInput;
  @component('//input[@name="submit_search"]') public beneSearchButton: Button;
  @component('//input[@name="startDate"]') public startTimeText: TextInput;
  @component('//input[@name="endDate"]') public endTimeText: TextInput;
  @component('/html/body/table[3]/tbody/tr[4]/td[2]/a') public testActivityButton: Button;
  @component('/html/body/table[2]/tbody/tr[7]/td[3]') public loginIdText: TextInput;
  @component('/html/body/table[2]/tbody/tr[13]/td[3]') public componentTypeText: TextInput;
  @component('/html/body/table[2]/tbody/tr[14]/td[3]') public functionTypeText: TextInput;
  
  //Beneficiary Categories
  @component('//a[contains(@href,"csr/common/corp/beneCategories/transferContext")]') public beneTabLink: Button;
  @component('/html/body/table[2]/tbody/tr[10]/td[3]/a') public beneTestLink: Button;
  @component('//input[@name="newCategoryName"]') public newCategoryNameText: TextInput;
  @component('//input[@name="submit_preview"]') public previewBeneButton: Button;
  @component('//input[@name="submit_submit"]') public submitBeneButton: Button;
  @component('/html/body/table[2]/tbody/tr[10]/td[5]/a') public approveBeneTestLink: Button;
  @component('//input[@name="submit_approve"]') public approveBeneButton: Button;
  @component('/html/body/table[2]/tbody/tr[11]/td[3]') public preRenameText: TextInput;
  @component('/html/body/table[2]/tbody/tr[10]/td[3]/a') public submitRenameText: TextInput;
  @component('/html/body/table[2]/tbody/tr[10]/td[5]') public submitStatusText: TextInput;
  @component('/html/body/table[2]/tbody/tr[10]/td[5]') public approveStatusText: TextInput;
  @component('/html/body/table[2]/tbody/tr[11]/td[3]') public viewNameText: TextInput;
  @component('/html/body/table[2]/tbody/tr[14]/td[3]') public viewStatusText: TextInput;

  //User Link-Functional
  @component('//span[@id="exp_4"]') public showUsersList: Button;
  @component('//*[@id="item_4"]/table/tbody/tr[4]/td[2]/a') public editUserLink: Button;
  @component('//*[@id="myTableUser"]/tr[4]/td[6]/a') public approveUserLink: Button;
  @component('//a[contains(@href,"corp/companyEditUser/UserFunctionalAccess")]') public editFunctionalLink: Button;
  @component('//a[contains(@href,"corp/companyEditUser/UserIdealServiceAccess")]') public editIdealServicelLink: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[3]/ul[2]/span/small/li/div/a') public supplierHubFunctions: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[2]/ul/span/small/li/div/a') public  supplierFinanceFunctions: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[0].functionSelected[13]"]') public SFSupplierView: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[0].functionSelected[14]"]') public SFSupplierCreateModifyDelete: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[0].functionSelected[15]"]') public SFSupplierApprove: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[0].functionSelected[16]"]') public SFSupplierApproveOwn: Button;
  @component('//*[@name="supplierFunctions[0]"]') public SupplierHubAdmin: Button;
  @component('//*[@name="supplierFunctions[1]"]') public SupplierHubView: Button;
  @component('//*[@name="supplierFunctions[2]"]') public SupplierHubApproveOwn: Button;
  @component('//*[@id="x1"]/span/small/input[2]') public modifyBeneficiaryAU: Button;
  @component('//input[@value="Preview Functional Access >>"]') public previewBeneficiaryButton: Button;
  @component('//input[@value="Submit Functional Access >"]') public submitBeneficiaryButton: Button;
  @component('//input[@name="submit_approve"]') public submitApproveUserButton: Button;
  @component('//*[@id="item_4"]/table/tbody/tr[4]/td[8]/a') public oboUserLink: Button;
  @component('//a[contains(@href,"csr/common/corp/corporationEdit/assistUser?id=426525&a=DBSIN")]') public oboUserLinkIN: Button;
  @component('//span[@class="btn-exit"]') public existOBOUserButton: Button;
  @component('//label[@class="is-open"]/label') public byTransactionAdditionFilter: Button;
  @component('//p-auto-complete[@formcontrolname="paymentTypeRec"]') public byTransactionAdditionFilter_PaymentType: OptionSelect;
  @component('//button[@class="search-button"]') public byTransactionAdditionFilter_Search: Button;
  @component('//button[@id="transaction-reference_0"]') public firstReferenceLink: Button;
  @component('//h1[@class="page-header"]') public paymentTitle: TextInput;
  @component('//*[@name="paymentUserEntitlementsfunctionalEntitlementGroupsArray5"]') public actCheckBox: Button;
  @component('//*[@name="paymentUserEntitlementsfunctionalEntitlementGroupsArray3"]') public giroCheckBox: Button;
  @component('//*[contains(@href,"functionalEntitlementGroupsArray[5]")]') public actShowAll: Button;
  @component('//*[contains(@href,"functionalEntitlementGroupsArray[3]")]') public giroShowAll: Button;
  @component('//*[contains(@id,"/payment/sgact/template/create_modify")]') public actCreateAccess: Button;
  @component('//*[contains(@id,"/payment/sggiro/template/create_modify")]') public giroCreateAccess: Button;
  @component('//*[contains(@id,"check/inquiry")]') public checkStatusInquiryAccess: Button;
  @component('//*[contains(@id,"information_reporting/lms_enquiry")]') public lmsDashboardInquiryAccess: Button;
  @component('//*[contains(@href,"liquidityManagementFunctions")]') public liquiManaExpand: Button;
  @component('//input[@id="/liquidity/management/view:"]') public lmView: Button;
  @component('//input[@id="/liquidity/management/approve:"]') public lmApprove: Button;
  @component('//input[@id="/liquidity/management/approve/own:"]') public lmApproveOwn: Button;
  @component('//input[@id="/liquidity/management/create_modify:"]') public lmMaker: Button;
  @component('//input[@id="/liquidity/management/view/NP_IO_Dashboard:"]') public lmViewNPIO: Button;
  @component('//input[@id="/liquidity/management/overview:"]') public lmOverView: Button;

  //User Link-Account
  @component('//a[contains(@href,"corp/companyEditUser/entitlementAccountList")]') public editAccountLink: Button;
  @component('/html/body/table[2]/tbody/tr[10]/td[4]/a') public modifyAccountFirst: Button;
  @component('//input[@name="paymentOperations[0]"]') public modifyPaymentsFirst: Button;
  @component('//input[@value="Preview Account Services >>"]') public previewAccountServiceButton: Button;
  @component('//input[@value="Submit Account Services >>"]') public submitAccountServiceButton: Button;
  @component('/html/body/table[2]/tbody/tr[14]/td[2]/table/tbody/tr[4]/td[5]') public approveUserValue: TextInput;
  @component('//input[contains(@id,"/dataop/payment/sggiro")]') public giroPayment: Button;
  @component('//input[contains(@id,"/dataop/information_reporting/current_day/detail:_CDG13-CAEDG_")]') public accountStatement: Button;
  @component('//input[contains(@id,"/dataop/payment/gctt:_CDG13-CAEDG_")]') public accountTT: Button;
  @component('//input[contains(@id,"/dataop/payment/gcact:_CDG13-CAEDG_")]') public accountACT: Button;
  @component('//input[contains(@id,"/dataop/transfer:_CDG13-CAEDG_")]') public accountICT: Button;

  //User Trade Finance
  @component('//a[contains(@href,"/samweb/csr/common/corp/companyEditUser/UserTradeFinanceAccess")]') public editTradeFinanceAccessLink: Button;
  @component('//*[@id="mainContent"]/table[2]/tbody/tr[47]/td[2]/img') public DLCShowAll: Button;
  @component('//*[@id="idlc"]') public DLCChekcBox: Button;
  @component('//*[@id="TrdPrdSetupdiv1"]/table/tbody/tr[1]/td/img') public ImportLCIssShowAll: Button;
  @component('//input[@id="idlc-iss-inquiry"]') public LCIssInquiryAccess: Button;
  @component('//input[@id="idlc-iss-dlcacmd"]') public LCIssCreateAccess: Button;
  @component('//input[@id="idlc-iss-dlcaad"]') public LCIssApproveAccess: Button;
  @component('//input[@id="idlc-iss-dlcaoffapprove"]') public LCIssOffApproveAccess: Button;
  @component('//input[@id="idlc-iss-dlcatcmd"]') public LCIssTemCreateAccess: Button;
  @component('//input[@id="idlc-iss-dlcamcmd"]') public LCIssAmdCreateAccess: Button;
  @component('//input[@id="idlc-iss-dlcamad"]') public LCIssAmdApproveAccess: Button;
  @component('//input[@id="idlc-iss-dlcamoffapprove"]') public LCIssAmdOffApproveAccess: Button;
  @component('//*[@id="TrdPrdSetupdiv1"]/table/tbody/tr[4]/td/img') public ImportBillsunderLCShowAll: Button;
  @component('//input[@id="idlc-bill-inquiry"]') public LCBillInquirycheckbox: Button;
  @component('//input[@id="idlc-bill-rar"]') public LCBillrarcheckbox: Button;
  @component('//*[contains(@href,"/samweb/logon/csrExit") and contains(@title,"Logout and Exit this system")]') public logOutSAMButton: Button;
  //PA Link-Group
  @component('//input[@name="submit_approve"]') public approveStatusButton: Button;
  @component('//a[contains(@href,"corp/corporationViewDetails/panelAuth")]') public paLink: Button;
  @component('//a[contains(@href,"/panelAuth/viewPanelGroup?groupIndex=1")]') public groupALink: Button;
  @component('//a[contains(@href,"/panelAuth/viewPanelGroup") and text()="Group E"]') public groupELink: Button;
  @component('//html/body/table[2]') public allGroup: TextInput;
  @component('//input[@value="Edit Group"]') public editGroupButton: Button;
  @component('//input[@name="pnlGrpName"]') public modifyGroupAName: TextInput;
  @component('//input[@name="submit_preview"]') public previewGroupButton: Button;
  @component('//input[@name="submit_submit"]') public submitGroupButton: Button;
  @component('//html/body/table[2]/tbody/tr[12]/td[3]') public groupUsersValue: TextInput;
  @component('/html/body/table[2]/tbody/tr[10]/td[3]') public groupName: TextInput;
  @component('/html/body/table[2]/tbody/tr[15]/td[4]/select') public selectedUsers: HtmlSelect;
  @component('//select[@name="nonSelectedUsers"]') public noSelectedUsers: HtmlSelect;
  @component('//a[@onclick="submit_remove();"]') public removeUsersButton: Button;
  @component('//a[@onclick="submit_add();"]') public addUsersButton: Button;
  @component('//a[contains(@href,"common/corp/panelAuth/statusPanelGroup")]') public statusGroupLink: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[2]/table/tbody/tr[6]/td[6]') public groupStatusValue: TextInput;
  @component('//tr[13]/td[2]/table/tbody/tr[2]/td[1]/a') public topPolicylink: TextInput;
  @component('//table[2]/tbody/tr[11]/td[3]') public currency: TextInput;
  @component('//table[2]/tbody/tr[16]/td[2]') public minAmountValue: TextInput;
  @component('//table[2]/tbody/tr[16]/td[3]') public maxAmountValue: TextInput;
  @component('//tr[8]/td[2]/table/tbody/tr[7]/td[1]/a') public verifyGroupLink: Button;
  @component('//tr[8]/td[2]/table/tbody/tr[7]/td[3]') public verifyGroupType: Button;
 
  //PA link-Profile
  @component('/html/body/table[2]/tbody/tr[13]/td[2]/table/tbody/tr[2]/td[1]/a') public profileLink: Button;
  @component('//input[@value="Edit Profile"]') public editProfileButton: Button;
  @component('//input[@name="perPaymentProfileSelection[0].isSelectedForNonRepetitive"]') public modifyPaymentTypeProfile: Button;
  @component('//input[@name="submit_preview"]') public PreviewProfileButton: Button;
  @component('//input[@name="submit_submit"]') public updateProfileButton: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[3]') public profileNameValue: TextInput;
  @component('//input[@name="tiers[0].minAmount"]') public minAmount: TextInput;
  @component('//select[@name="tiers[0].panels[0].groups[0]"]') public selectGroupFirst: HtmlSelect;
  @component('/html/body/table[2]/tbody/tr[133]/td[4]') public uatProfileAuthorizationLevelsValue: TextInput;
  @component('//td[@name="authenLevel0"]') public profileAuthorizationLevelsValue: TextInput;
  @component('//a[contains(@href,"common/corp/panelAuth/statusProfile")]') public statusProfileLink: Button;
  @component('/html/body/table[2]/tbody/tr[13]/td[2]/table/tbody/tr[2]/td[8]') public profileStatusValue: TextInput;

  //Custom Edit Data Services Access 
  @component('//a[contains(@href,"companyEditUser/dataServices")]') public editDataServiceLink: Button;
  @component('//*[@id="pobotxnrpt"]') public poboTxnReport: Button;
  @component('//*[@id="cvr"]') public cvrReport: Button;
  @component('//*[@id="dcicassact"]') public dcicassactReport: Button;
  @component('//*[@id="mcanpsmrp"]') public mcanpsmrpReport: Button;
  @component('//*[@id="sfabsprrpt"]') public sfabsprrptReport: Button;
  @component('//*[@id="arpcpadtl"]') public arpcpadtlReport: Button;
  @component('//*[@id="mcastmt"]') public mcastmtReport: Button;

  //for multi subsci access
  @component('//*[@id="item_0"]/table/tbody/tr[1]/td[3]/a[3]') public subFunctionAccessLink1: Button;
  @component('//*[@id="item_0"]/table/tbody/tr[2]/td[3]/a[3]') public subFunctionAccessLink2: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[0].functionSelected[7]"]') public TTPayeeCreate: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[0].functionSelected[9]"]') public SGBeneficiaryCreate: Button;
  @component('//*[@id="x1"]/span/small/li[4]/div/a') public SG_ACTExpand: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[4].functionSelected[0]"]') public SG_ACT_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[4].functionSelected[4]"]') public SG_ACT_Temp_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[4].functionSelected[5]"]') public SG_ACT_CreateFromTemp: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[4].functionSelected[6]"]') public SG_ACT_Create: Button;
  @component('//*[@id="x1"]/span/small/li[20]/div/a') public SG_ICTExpand: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[20].functionSelected[1]"]') public SG_ICT_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[20].functionSelected[6]"]') public SG_ICT_Temp_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[20].functionSelected[5]"]') public SG_ICT_CreateFromTemp: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[20].functionSelected[4]"]') public SG_ICT_Create: Button;
  @component('//*[@id="x1"]/span/small/li[12]/div/a') public SG_TTExpand: Button;
  @component('//*[@id="x1"]/span/small/li[12]/input') public SG_TT_CheckBox: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[12].functionSelected[0]"]') public SG_TT_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[12].functionSelected[4]"]') public SG_TT_Temp_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[12].functionSelected[5]"]') public SG_TT_CreateFromTemp: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[12].functionSelected[6]"]') public SG_TT_Create: Button;
  @component('//*[@id="x1"]/span/small/li[28]/div/a') public SG_BulkGIROCollectionExpand: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[28].functionSelected[0]"]') public SG_BulkGIROCollection_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[28].functionSelected[4]"]') public SG_BulkGIROCollection_Temp_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[28].functionSelected[5]"]') public SG_BulkGIROCollection_CreateFromTemp: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[28].functionSelected[6]"]') public SG_BulkGIROCollection_Create: Button;
  @component('//*[@id="x1"]/span/small/li[29]/div/a') public SG_PayrollExpand: Button;  
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[29].functionSelected[0]"]') public SG_Payroll_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[29].functionSelected[5]"]') public SG_Payroll_Temp_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[29].functionSelected[6]"]') public SG_Payroll_CreateFromTemp: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[29].functionSelected[7]"]') public SG_Payroll_Create: Button;
  @component('//*[@id="x1"]/span/small/li[41]/div/a') public SG_ChequeExpressExpand: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[41].functionSelected[0]"]') public SG_ChequeExpress_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[41].functionSelected[4]"]') public SG_ChequeExpress_Temp_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[41].functionSelected[5]"]') public SG_ChequeExpress_CreateFromTemp: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[41].functionSelected[6]"]') public SG_ChequeExpress_Create: Button;
  @component('//*[@id="x1"]/span/small/li[2]/div/a') public SG_GIROExpand: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[2].functionSelected[0]"]') public SG_GIRO_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[2].functionSelected[4]"]') public SG_GIRO_Temp_View: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[2].functionSelected[5]"]') public SG_GIRO_CreateFromTemp: Button;
  @component('//*[@name="paymentUserEntitlements.functionalEntitlementGroupsArray[2].functionSelected[6]"]') public SG_GIRO_Create: Button;

  @component('//*[@name="cardsEntitlementsGroup0"]') public CardsAdmin: Button;
  @component('//*[@name="cardsEntitlementsGroup1"]') public CardsHolder: Button;
  @component('//*[@name="casEhcmnt_Root"]') public managePaynow: Button;
  @component('//*[@name="fileEnquiry_Root"]') public fileEnquiry: Button;
  @component('//*[@name="onlineRollAcctInsp_Root"]') public rollingAccountInspection: Button;
  @component('//*[@id="x4"]/span/small/li[1]/div/a') public uploadExpand: Button;
  @component('//*[@name="fsFileUploadFunctions[6]"]') public fileUploadRebatch: Button;
  @component('//*[@id="/fileexchange/trade_send/approve:"]') public fileExchangeTradeApprove: Button;

  //GC ICT
  @component('//a[contains(@href,"paymentUserEntitlements.functionalEntitlementGroupsArray[1].functionSelected")]') public GCICTExpand: Button;
  @component('//*[@id="/payment/trnint/view:_ENQ13_,_PMM13_,_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_ICT_View: Button;
  @component('//*[@id="/payment/trnint/group_ungroup:"]') public GC_ICT_Group: Button;
  @component('//*[@id="/payment/trnint/template/view:_ENQ13_,_PMM13_,_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_ICT_Temp_View: Button;
  @component('//*[@id="/payment/trnint/template/create_modify:_PMM13_,_SNO13_,_SWO13_"]') public GC_ICT_Temp_Maker: Button;
  @component('//*[@id="/payment/trnint/template/approve:_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_ICT_Temp_Approver: Button;
  @component('//*[@id="/payment/trnint/create_from_template:_PMM13_,_SNO13_,_SWO13_"]') public GC_ICT_CreateFromTemp: Button;
  @component('//*[@id="/payment/trnint/create_modify:_PMM13_,_SNO13_,_SWO13_"]') public GC_ICT_Maker: Button;
  @component('//*[@id="/payment/trnint/approve:_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_ICT_Approver: Button;
  @component('//*[@id="/payment/trnint/approve/own:_PWO13_,_SWO13_"]') public GC_ICT_ApproveOwn: Button;
  //FD Instruction
  @component('//a[contains(@href,"paymentUserEntitlements.functionalEntitlementGroupsArray[2].functionSelected")]') public GCFDExpand: Button;
  @component('//*[@id="/payment/fdplmt/view:"]') public GC_FD_View: Button;
  @component('//*[@id="/payment/fdplmt/create_modify:"]') public GC_FD_Maker: Button;
  @component('//*[@id="/payment/fdplmt/approve:"]') public GC_FD_Approver: Button;
  @component('//*[@id="/payment/fdplmt/approve/own:"]') public GC_FD_ApproveOwn: Button;
  // TT
  @component('//a[contains(@href,"paymentUserEntitlements.functionalEntitlementGroupsArray[3].functionSelected")]') public GCTTExpand: Button;
  @component('//*[@id="/payment/gctt/view:_ENQ13_,_PMM13_,_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_TT_View: Button;
  @component('//*[@id="/payment/gctt/group_ungroup:"]') public GC_TT_Group: Button;
  @component('//*[@id="/payment/gctt/template/view:_ENQ13_,_PMM13_,_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_TT_Temp_View: Button;
  @component('//*[@id="/payment/gctt/template/create_modify:_PMM13_,_SNO13_,_SWO13_"]') public GC_TT_Temp_Maker: Button;
  @component('//*[@id="/payment/gctt/template/approve:_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_TT_Temp_Approver: Button;
  @component('//*[@id="/payment/gctt/create_from_template:_PMM13_,_SNO13_,_SWO13_"]') public GC_TT_CreateFromTemp: Button;
  @component('//*[@id="/payment/gctt/create_modify:_PMM13_,_SNO13_,_SWO13_"]') public GC_TT_Maker: Button;
  @component('//*[@id="/payment/gctt/approve:_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_TT_Approver: Button;
  @component('//*[@id="/payment/gctt/approve/own:_PWO13_,_SWO13_"]') public GC_TT_ApproveOwn: Button;
  //ACT
  @component('//a[contains(@href,"paymentUserEntitlements.functionalEntitlementGroupsArray[4].functionSelected")]') public GCACTExpand: Button;
  @component('//*[@id="/payment/gcact/view:_ENQ13_,_PMM13_,_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_ACT_View: Button;
  @component('//*[@id="/payment/gcact/group_ungroup:"]') public GC_ACT_Group: Button;
  @component('//*[@id="/payment/gcact/template/view:_ENQ13_,_PMM13_,_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_ACT_Temp_View: Button;
  @component('//*[@id="/payment/gcact/template/create_modify:_PMM13_,_SNO13_,_SWO13_"]') public GC_ACT_Temp_Maker: Button;
  @component('//*[@id="/payment/gcact/template/approve:_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_ACT_Temp_Approver: Button;
  @component('//*[@id="/payment/gcact/create_from_template:_PMM13_,_SNO13_,_SWO13_"]') public GC_ACT_CreateFromTemp: Button;
  @component('//*[@id="/payment/gcact/create_modify:_PMM13_,_SNO13_,_SWO13_"]') public GC_ACT_Maker: Button;
  @component('//*[@id="/payment/gcact/approve:_PMA13_,_PWO13_,_SNO13_,_SWO13_"]') public GC_ACT_Approver: Button;
  @component('//*[@id="/payment/gcact/approve/own:_PWO13_,_SWO13_"]') public GC_ACT_ApproveOwn: Button;

  //Fixed Deposits Summary - View
  @component('//*[@id="/information_reporting/Fixed_Deposits:"]') public GC_FDSum_View: Button;
  


  //CB my approval page
  @component('//button[@id="transactionApprove"]') public approveButton: Button;

  public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchHomeButton.element), this.searchHomeButton.getTimeOut());
  }

  public async loadCorporationCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchCorpButton.element), this.searchCorpButton.getTimeOut());
  }

  public async loadConditionForViewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.cancelButton.element), this.cancelButton.getTimeOut());
  }

  public async loadConditionForCB() {
    await browser.sleep(1200);
  }

  public async loadConditionOnMyApprovals() {
    await waitForUXLoading();
    await this.pageSwitchToUX();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
  }

}
