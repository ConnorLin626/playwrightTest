/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput,waitForUXLoading } from '../../../lib';
import { RadioButton, WebComponent } from '../../../lib/components';



@log export class DBSBusinessMultiplierPage extends Page {
    constructor() {
        super();
    }
    
    //Register_ManageDBSBusinessMultiplier page
    @component('//*[@id="menuCompany-a"]') public companyMenu: Button;
    @component('//*[@id="menuMultiplierAccount"]') public multiplierAccountMenu: Button;
    @component('//*[@class="multi-placeholder ng-star-inserted"]') public multiplierUser: TextInput;
    @component('//*[@id="search"]') public multiplierUserInput: TextInput;
    @component('/html/body/app-root/section[2]/div/multiplier-account/div/ng-component/div/div[2]/div/form/multiplier-account-step-2/div/div/h2/span') public select: TextInput;
    @component('//*[@id="userList-0"]') public multiplierUserSelected: Button;   
    @component('//*[@id="isTermConditionNote"]') public termConditionNote: Button;   
    @component('//*[@id="btn-next"]') public nextBtn: Button; 
    @component('//*[@id="btn-submit"]') public submiBtn: Button; 
    @component('//a[@id="menuDashboard-a"]') public menuDashboardTab: Button; 
    @component('//input[@id="dashboard-filter"]') public dashboardFilterText: TextInput;
    @component('//*[@id="request-item-0"]') public requestItem01: TextInput; 
    //view page
    @component('//*[@id="status"]') public statusTxt: TextInput;

    //approve page
    @component('//*[@id="approve-btn"]') public approveBtn:Button;
    @component('//*[@id="push-btn"]') public pushApproveBtn:Button;
    @component('//button[@id="approve-btn-dialog"]') public approvedialogBtn: Button;
    @component('//button[@id="dismiss-btn-dialog"]') public dismissdialogBtn: Button;
    @component('//button[@id="cancel-btn-dialog"]') public canceldialogBtn: Button; 
    
    public async loadCondition() {
        await waitForUXLoading();
    }
    public async loadConditionViewRequest() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveBtn.element), this.approveBtn.getTimeOut());
      }
      public async loadCondition2() {
        await waitForUXLoading();
        await browser.sleep(10000);
        // await browser.wait(ExpectedConditions.elementToBeClickable(this.multiplierUser.element), this.multiplierUser.getTimeOut());
      }

}