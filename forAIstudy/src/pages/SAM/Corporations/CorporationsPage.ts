/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { SIT,Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';
import { DashboardPages } from '../../../pages/CB/Dashboard';

const _DashboardPages = new DashboardPages();
let TWtestData = _DashboardPages.fetchTestData("TWOBU_testData.json");
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
  @component('//input[@name="ebbrFlag"]') public ebbrFlag: OptionSelect;
  @component('//select[@name="ebbrErp"]') public ebbrErp: HtmlSelect;
  
  @component('//input[@name="customerId"]') public companyIdValue: TextInput;

  //User Link-Functional
  @component('//span[@id="exp_4"]') public showUsersList: Button;
  @component('//*[@id="item_4"]/table/tbody/tr[4]/td[2]/a') public editUserLink: Button;
  @component('//*[@id="item_4"]/table/tbody/tr[4]/td[5]/a') public approveUserLink: Button;
  @component('//a[contains(@href,"corp/companyEditUser/UserFunctionalAccess")]') public editFunctionalLink: Button;
  @component('//*[@id="x1"]/span/small/input[2]') public modifyBeneficiaryAU: Button;
  @component('//input[@value="Preview Functional Access >>"]') public previewBeneficiaryButton: Button;
  @component('//input[@value="Submit Functional Access >"]') public submitBeneficiaryButton: Button;
  @component('//input[@name="submit_approve"]') public submitApproveUserButton: Button;
  @component('//*[@id="item_4"]/table/tbody/tr[4]/td[8]/a') public oboUserLink: Button;
  @component('//html/body/table[2]/tbody/tr[14]/td[2]/table/tbody/tr[2]/td[8]/a') public userTabOboUserLink: Button;
  @component('//a[@href="/s1gcb/csr/common/corp/corporationEdit/assistUser?id=426525&a=DBSIN"]') public oboUserLinkIN: Button;
  @component('//span[@class="btn-exit"]') public existOBOUserButton: Button;
  @component('//label[@class="is-open"]/label') public byTransactionAdditionFilter: Button;
  @component('//p-auto-complete[@formcontrolname="paymentTypeRec"]') public byTransactionAdditionFilter_PaymentType: OptionSelect;
  @component('//button[@class="search-button"]') public byTransactionAdditionFilter_Search: Button;
  @component('//button[@id="transaction-reference_0"]') public firstReferenceLink: Button;
  @component('//h1[@class="page-header"]') public paymentTitle: TextInput;
  @component('//button[@name="cancel"]') public cancelButton: Button;
  @component('//a[contains(@href,"/csr/common/corp/UserSearch/transferContext")]') public userTab: Button;
  @component('//table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[4]/input[1]') public enterUser: TextInput;
  @component('//input[@value="Search >>"]') public searchUser: Button;
  @component('//table[2]/tbody/tr[14]/td[2]/table/tbody/tr[2]/td[2]') public userIDlink: Button;
  @component('//html/body/table[2]/tbody/tr[10]/td[3]') public userIDValue: TextInput;
  @component('//input[@name="lastName"]') public userNameValue: TextInput;
  @component('//input[@id="myUser"]') public userfilter: TextInput;
  @component('//a[@href="/samweb/csr/common/corp/corporationEdit/assistUser?id='+(SIT ? TWtestData.Resources.SIT.Assist.Id : TWtestData.Resources.UAT.Assist.Id)+'&a='+(SIT ? TWtestData.Resources.SIT.Assist.Affiliate : TWtestData.Resources.UAT.Assist.Affiliate)+'"]') public twOBUAssist: Button;

  //User Link-Account
  @component('//a[contains(@href,"corp/companyEditUser/entitlementAccountList")]') public editAccountLink: Button;
  @component('/html/body/table[2]/tbody/tr[10]/td[4]/a') public modifyAccountFirst: Button;
  @component('//input[@name="paymentOperations[0]"]') public modifyPaymentsFirst: Button;
  @component('//input[@value="Preview Account Services >>"]') public previewAccountServiceButton: Button;
  @component('//input[@value="Submit Account Services >>"]') public submitAccountServiceButton: Button;
  @component('/html/body/table[2]/tbody/tr[14]/td[2]/table/tbody/tr[4]/td[5]') public approveUserValue: TextInput;

  //PA Link-Group
  @component('//input[@name="submit_approve"]') public approveStatusButton: Button;
  @component('//a[contains(@href,"corp/corporationViewDetails/panelAuth")]') public paLink: Button;
  @component('//a[contains(@href,"/panelAuth/viewPanelGroup?groupIndex=1")]') public groupALink: Button;
  @component('//a[contains(@href,"/panelAuth/viewPanelGroup") and text()="Group E"]') public groupELink: Button;
  @component('//input[@value="Edit Group"]') public editGroupButton: Button;
  @component('//input[@name="pnlGrpName"]') public modifyGroupAName: TextInput;
  @component('//input[@name="submit_preview"]') public previewGroupButton: Button;
  @component('//input[@name="submit_submit"]') public submitGroupButton: Button;
  @component('html/body/table[2]/tbody/tr[12]/td[3]') public groupUsersValue: TextInput;
  @component('/html/body/table[2]/tbody/tr[10]/td[3]') public groupName: TextInput;
  @component('/html/body/table[2]/tbody/tr[15]/td[4]/select') public selectedUsers: HtmlSelect;
  @component('//select[@name="nonSelectedUsers"]') public noSelectedUsers: HtmlSelect;
  @component('//a[@onclick="submit_remove();"]') public removeUsersButton: Button;
  @component('//a[@onclick="submit_add();"]') public addUsersButton: Button;
  @component('//a[contains(@href,"common/corp/panelAuth/statusPanelGroup")]') public statusGroupLink: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[2]/table/tbody/tr[6]/td[6]') public groupStatusValue: TextInput;

  //PA link-Profile
  @component('//a[@title="linkEditProfileTitle"]') public profileLink: Button;
  @component('//input[@value="Edit Profile"]') public editProfileButton: Button;
  @component('//input[@name="perPaymentProfileSelection[0].isSelectedForNonRepetitive"]') public modifyPaymentTypeProfile: Button;
  @component('//input[@name="submit_preview"]') public PreviewProfileButton: Button;
  @component('//input[@name="submit_submit"]') public updateProfileButton: Button;
  @component('/html/body/table[2]/tbody/tr[8]/td[3]') public profileNameValue: TextInput;
  @component('//input[@name="tiers[0].minAmount"]') public minAmount: TextInput;
  @component('//select[@name="tiers[0].panels[0].groups[0]"]') public selectGroupFirst: HtmlSelect;
  @component('//td[@class="datagrey" and contains(text(),"Group ")]') public profileAuthorizationLevelsValue: TextInput;
  @component('//a[contains(@href,"common/corp/panelAuth/statusProfile")]') public statusProfileLink: Button;
  @component('/html/body/table[2]/tbody/tr[13]/td[2]/table/tbody/tr[2]/td[8]') public profileStatusValue: TextInput;

  //CB my approval page
  @component('//button[@id="transactionApprove"]') public approveButton: Button;

  public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchHomeButton.element), this.searchHomeButton.getTimeOut());
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
