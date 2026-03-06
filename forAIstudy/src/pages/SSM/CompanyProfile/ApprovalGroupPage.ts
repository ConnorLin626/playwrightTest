/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading ,OptionSelect} from '../../../lib';

@log export class ApprovalGroupPage extends Page {
    constructor() {
        super();
    }

    //Company profile page
    @component('//li[@id="menuCompany"]') public companyMenu: Button;
    @component('//a[@id="menuCompanyProfile"]') public companyProfileMenu: Button;
    @component('//*[@name="print"]') public printBtn: Button;
    
    //Approval Group page
    @component('//a[@id="ux-tab-ACCOUNT"]') public bankAcctTab: Button;

    //create Approval Group page
    @component('//*[@id="ux-tab-GROUP"]') public approvalgroupsTab: Button;
    @component('//button[@id="btn-createNewGroup"]') public createNewgroupBtn: Button;
    @component('//input[@id="groupName"]') public groupnameTxt: TextInput;
    @component('//input[@id="groupType_approver"]') public groupApprover: Button;
   //@component('//input[@id="search"]') public searchTxt: TextInput;
    @component('//button[@id="btn-continue"]') public continueBtn: Button;
    @component('//a[@id="menuDashboard-a"]') public menuDashboardTab: Button; 
    @component('//a[@id="ux-tab-MYAPPOVAL"]') public myapprovalTab: Button;
    @component('//input[@id="dashboard-filter"]') public dashboardfilterTxt: TextInput;
    @component('//span[@id="request-item-0"]') public newaddgroupBtn: Button;
    @component('//button[@id="cancel-btn"]') public cancelBtn: Button;
    @component('//span[@id="status"]') public statusTxt: TextInput;
    @component('//*[@id="label-multi-dropdown-groupUsers"]') public selectDropdownBtn: Button;
    @component('//input[@id="dropDown-search"]') public dropDownsearchTxt: TextInput;
    @component('//button[@id="btn-submit"]') public submitBtn: Button;
    @component('//button[@id="btn-finish"]') public finishBtn: Button;  
    @component('//span[@id="groupName"]') public groupNameTxt: TextInput;
    @component('//*[@id="groupType"]') public groupTypeTxt: TextInput;
    @component('//span[@id="groupUsers"]') public groupUsersTxt: TextInput;
    @component('//*[@id="groupUsers-0"]') public groupDropDownLabelBtn: Button; 
    @component('//*[@id="groupUser-0"]') public userValue: TextInput; 

    //approve new group
    @component('//button[@id="approve-btn"]') public approveBtn: Button;
    @component('//button[@id="get-challenge"]') public getchallengeBtn: Button;
    @component('//input[@id="responseCode"]') public responseCodeTxt: TextInput;
    @component('//button[@id="approve-btn-dialog"]') public approvedialogBtn: Button;
    @component('//button[@id="dismiss-btn-dialog"]') public dismissdialogBtn: Button;
    @component('//button[@id="cancel-btn-dialog"]') public canceldialogBtn: Button;       
   //modify  
   @component('//input[@id="company-group-filter"]') public companygroupfilterTxt: TextInput;
   @component('//*[@id="edit-btn-action"]') public editBtn: Button;
   @component('//*[@id="btn-action-0"]') public actionBtn: Button;
 
   //delete
   @component('//*[@id="delete-btn-action"]') public deleteactionBtn: Button;
   @component('//button[@id="delete-btn-dialog"]') public deletedialogBtn: Button;
   @component('//button[@id="delete-btn"]') public deleteBtn: Button;
   @component('//span[@id="groupName-0"]') public filtergroupNameTxt: TextInput;
   @component('//span[@id="groupType-0"]') public filtergroupTypeTxt: TextInput;
   @component('//*[@id="company-group-filter"]') public filter: TextInput;
   @component('//*[@id="No data to display"]') public filterResult: TextInput;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.printBtn.element), this.printBtn.getTimeOut());
    }

    public async loadapprovalgroupsTab() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approvalgroupsTab.element), this.approvalgroupsTab.getTimeOut());   
    }
    public async loadcontinueBtn() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.continueBtn.element), this.continueBtn.getTimeOut());
            
    }
    public async loadsubmitBtn() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
    }
    public async loadfinishBtn() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishBtn.element), this.finishBtn.getTimeOut());
    }
    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusTxt.element), this.statusTxt.getTimeOut());
    }
    public async loadcanceldialogBtn() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.canceldialogBtn.element), this.canceldialogBtn.getTimeOut());
    }
    public async loadcancelBtn() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.cancelBtn.element), this.cancelBtn.getTimeOut());
    }
}