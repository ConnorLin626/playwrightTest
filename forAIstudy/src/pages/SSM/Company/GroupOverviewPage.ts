import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class GroupOverviewPage extends Page {
  constructor() {
    super();
  }

    @component('//li[@id="menuCompany"]') public menuCompanyButton: Button;
    @component('//a[@id="menuGroupOverView"]') public menuGroupOverView: Button;
    @component('//label[@id="companyNameItemSG106"]') public ClickSubCompany: Button;
    @component('//*[@id="viewDetailItem-0"]') public ViewDetailsButton: Button;
    @component('//*[@id="company-payee-filter"]') public filterPayee: TextInput;
    @component('//span[@id="orgId"]') public orgId: TextInput;
    @component('//span[@id="companyName"]') public companyName: TextInput;
    @component('//p[@id="accountNumber-0"]') public accountNumber: TextInput;
    @component('//*[@name="print"]') public printBtn: Button;
    @component('//*[@id="ux-tab-POLICY"]') public ApproverPolicyBtn: Button;
    @component('//*[@id="btn-create-policy"]') public CreatePolicyBtn: Button;
    @component('//*[@id="mat-menu-panel-0"]/div/button[1]') public cashManBtn: Button;
    @component('//*[@id="policyName"]') public policyName: TextInput;
    @component('//*[@id="policyDescription"]') public policyDescription: TextInput;
    @component('//*[@id="ux-radio-12"]') public FilesBtn: Button;
    @component('//*[@id="maxAmount-0"]') public maxAmount: TextInput;
    @component('//amount-tier/div/div[2]/div[2]/div/amount-flow/div/div[2]/div[1]/p-auto-complete') public groupSelect: OptionSelect;
    @component('//*[@id="btn-continue"]') public continueBtn: Button;
    @component('//*[@id="btn-preview"]') public submitButton: Button;


    //View policy request
    @component('//*[@id="status"]') public requestStatus: TextInput;
    @component('//*[@id="policyName"]') public viewPolicyName: TextInput;
    @component('//*[@id="PAYMENT_GROUP_TYPE_CODE-0"]') public viewPaymentType: TextInput;
    @component('//*[@id="CREDITIMPORT-0"]') public viewTradPaymentType: TextInput;
    @component('//*[@id="policyAmount-0"]') public amountValue: TextInput;
    @component('//*[@class="group-name font-bold"]') public groupName: TextInput;
    @component('//*[@id="policyCurrency"]') public currency: TextInput;
    @component('//*[@id="policyFor"]') public approvalPolicy: TextInput;
    @component('//*[@id="approve-btn"]') public approveBtn: Button;
    @component('//*[@id="get-challenge"]') public getChallengeBtn: Button;
    @component('//*[@id="responseCode"]') public responseCode: TextInput;
    @component('//*[@id="approve-btn-dialog"]') public confirmApproveBtn: Button;
    @component('//button[@name="logout"]') public logoutBtn: Button;

    //delete policy
    @component('//*[@id="btn-action-0"]') public topPolicyAction: Button;
    @component('//*[@id="delete--btn-action"]') public deleteAction: Button;
    @component('//*[@id="delete-btn-dialog"]') public deleteDialogBtn: Button;
    @component('//*[@id="dismiss-btn-dialog"]') public dismissButton: Button;

    //modify  group
    @component('//*[@id="ux-tab-GROUP"]') public approvalgroupsTab: Button;
    @component('//input[@id="company-group-filter"]') public companygroupfilterTxt: TextInput;
    @component('//*[@id="btn-action-0"]') public actionBtn: Button;
    @component('//*[@id="edit-btn-action"]') public editBtn: Button;
    @component('//input[@id="groupName"]') public groupnameTxt: TextInput;
    @component('//*[@class="select-dropdown-icon"]') public userDropdownList: Button
    @component('//*[@id="selectAllInput"]') public selectAllUser: Button
    @component('//button[@id="btn-submit"]') public submitBtn: Button;
    @component('//button[@id="btn-finish"]') public finishBtn: Button;  
    @component('//span[@id="groupName"]') public groupNameTxt: TextInput;
    @component('//*[@id="groupType"]') public groupTypeTxt: TextInput;
    @component('//span[@id="groupUsers"]') public groupUsersTxt: TextInput;
    @component('//*[@id="groupUsers-0"]') public groupDropDownLabelBtn01: Button; 
    @component('//*[@id="groupUsers-1"]') public groupDropDownLabelBtn02: Button; 
    @component('//*[@id="groupUser-0"]') public userValue: TextInput; 

    public async loadCondition() {
      await browser.wait(ExpectedConditions.elementToBeClickable(this.printBtn.element), this.printBtn.getTimeOut());
  }

  public async loadConditionforGroupOverviewpage() {
      await browser.wait(ExpectedConditions.elementToBeClickable(this.ClickSubCompany.element), this.ClickSubCompany.getTimeOut());
  }

  public async loadConditionforFilterPayee() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.filterPayee.element), this.filterPayee.getTimeOut());
}
public async loadConditionforNewCashManagementPolicy() {
  await browser.wait(ExpectedConditions.elementToBeClickable(this.continueBtn.element), this.continueBtn.getTimeOut());
}

public async loadapprovalgroupsTab() {
  await browser.wait(ExpectedConditions.elementToBeClickable(this.approvalgroupsTab.element), this.approvalgroupsTab.getTimeOut());   
}

}

