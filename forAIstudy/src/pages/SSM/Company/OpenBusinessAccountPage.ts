/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput,waitForUXLoading } from '../../../lib';
import { RadioButton, WebComponent } from '../../../lib/components';



@log export class OpenBusinessAccountPage extends Page {
    constructor() {
        super();
    }
    
    //open business account page
    @component('//*[@id="menuCompany-a"]') public companyMenu: Button;
    @component('//*[@id="menuSubsequentAccount"]') public openBusinessAccountMenu: Button;
    @component('//div[1]/div[3]/subsequent-account-card/div/div[3]/button') public applyNowBtn: Button;
    @component('//*[@id="accountName"]') public accountName: TextInput;
    @component('//*[@id="purposeOfAccountCd"]') public purposeOfAccount: TextInput;
    @component('//span/p-auto-complete/div/div[2]/ul/li[1]/div/span') public purposeOfAccountSelected: TextInput;
    @component('//*[@id="copyAccountSetting"]') public copyAccountSetting: TextInput;
    @component('//subsequent-account-step-2/div/div/span/p-auto-complete/div/div[2]/ul/li[1]/div/span') public copyAccountSettingSelected: TextInput;
    @component('//*[@id="btn-next"]') public nextBtn: Button;
    @component('//*[@id="condition1"]') public agreeCheckbox: Button;   
    @component('//*[@id="btn-confirm"]') public confirmBtn: Button;  
    @component('//a[@id="menuDashboard-a"]') public menuDashboardTab: Button; 
    @component('//*[@id="request-item-0"]') public requestItem01: TextInput; 
    //view page
    @component('//*[@class="page-header margin-bottom-32 ng-star-inserted"]') public requestTypeValue: TextInput;
    @component('//*[@class="status ng-star-inserted"]') public statusTxt: TextInput;
    @component('//subsequentaccount-view-section/div/section/div[2]/div[2]/p[2]') public accountTypeValue: TextInput;
    @component('//subsequentaccount-view-section/div/section/div[2]/div[3]/p[2]') public accountNameValue: TextInput;
    @component('//subsequentaccount-view-section/div/section/div[2]/div[4]/p[2]') public currencyValue: TextInput;
    @component('//subsequentaccount-view-section/div/section/div[2]/div[5]/p[2]') public purposeOfAccountValue: TextInput;

    


    //approve page
    @component('//input[@id="dashboard-filter"]') public dashboardFilterText: TextInput;
    @component('//button[@id="approve-btn"]') public approveBtn:Button;

    @component('//button[@id="get-challenge"]') public getchallengeBtn: Button;
    @component('//input[@id="responseCode"]') public responseCodeTxt: TextInput;
    @component('//button[@id="approve-btn-dialog"]') public approvedialogBtn: Button;
    @component('//button[@id="dismiss-btn-dialog"]') public dismissdialogBtn: Button;
    @component('//button[@id="cancel-btn-dialog"]') public canceldialogBtn: Button; 

    public async loadCondition() {
        await waitForUXLoading();
       
    }

    public async loadConditionforApplyPage() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.applyNowBtn.element), this.applyNowBtn.getTimeOut());
    }

}