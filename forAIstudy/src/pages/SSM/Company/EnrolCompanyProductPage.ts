/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput,waitForUXLoading } from '../../../lib';
import { RadioButton, WebComponent } from '../../../lib/components';



@log export class EnrolCompanyProductPage extends Page {
    constructor() {
        super();
    }
    

    //Company product page
    @component('//*[@id="menuCompany-a"]') public companyMenu: Button;
    @component('//a[@id="menuEnrolCompanyProduct"]') public companyProductMenu: Button;
    @component('//input[@id="select_Transaction_All_0"]') public selectAllTxnBtn: RadioButton;
    @component('//input[contains(@class,"indeterminate") and @id="select_Transaction_All_0"]') public indeterminateRadio: Button;
    
    @component('//company-product-detail/div/div[1]/div/div/div/autocomplete-multi/div/span') public accountSelectBtn: Button;
    @component('//input[@id="accounts-0"]') public accountSelectRadio: RadioButton;
    @component('//input[@id="dropDown-selectAll"]') public accountSelectAllRadio: Button;
    
    
    @component('//company-product-access/div/company-product-detail/div/div[1]/div/div/div/div[2]/span') public showAdvPayment: Button;
    
    @component('//input[@id="251"]') public giroAccessBtn:RadioButton;
    @component('//input[@id="253"]') public actAccessBtn:RadioButton;
    @component('//input[@id="261"]') public ttAccessBtn:RadioButton;
    
    @component('//button[@id="cancel-btn"]') public cancelBtn: Button;
    @component('//button[@id="btn-continue"]') public continueBtn:Button;
    @component('//button[@id="btn-submit"]') public submitBtn:Button;
    @component('//button[@id="btn-finish"]') public finishBtn:Button;
    //approve page
    @component('//input[@id="dashboard-filter"]') public dashboardFilterText: TextInput;
    @component('//span[@id="request-item-0"]') public newRequestBtn: Button;
    @component('//*[@id="status"]') public statusTxt: TextInput;
    @component('//div[@class="collapse-button my-2"]') public extendApproveBtn: Button; 
    
    @component('//button[@id="approve-btn"]') public approveBtn:Button;
    @component('//button[@id="get-challenge"]') public getchallengeBtn: Button;
    @component('//input[@id="responseCode"]') public responseCodeTxt: TextInput;
    @component('//button[@id="approve-btn-dialog"]') public approvedialogBtn: Button;
    @component('//button[@id="dismiss-btn-dialog"]') public dismissdialogBtn: Button;
    @component('//button[@id="cancel-btn-dialog"]') public canceldialogBtn: Button; 
    //SAM
    @component('//a[contains(@href,"accountOId=727504")]') public acctBtn: Button; 
    @component('//input[@id="/dataop/payment/sggiro:_CACASGD-020_,_CACASASGD-021_"]') public sgGiroBtn: Button;
    @component('//input[@id="/dataop/payment/sgact:_CACASGD-020_,_CACASASGD-021_,_CAMCA-021_,_CAFCCA-022_"]') public sgActBtn: Button;
    @component('//input[@id="/dataop/payment/sgtt:_CACASGD-020_,_CACASASGD-021_,_CAMCA-021_,_CAFCCA-022_"]') public sgTTBtn: Button;
    @component('//input[@id="/dataop/payment/sgg3bpmt:"]') public sgBulkBtn: Button;
    @component('//input[@id="/dataop/payment/sgg3pmt:_CACASGD-020_,_CACASASGD-021_"]') public sgFastBtn: Button;
    @component('//input[@id="/dataop/payment/sgdmdrft:_CACASGD-020_,_CACASASGD-021_,_CAFCCA-022_"]') public sgDemandBtn: Button;
    @component('//input[@id="/dataop/payment/sgbp:_CACASGD-020_,_CACASASGD-021_"]') public sgBpBtn: Button;
    
    
    


    public async loadCondition() {
        await waitForUXLoading();
       
    }

    public async loadConditionforPayeDetail() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dashboardFilterText.element), this.dashboardFilterText.getTimeOut());
    }
    public async loadcanceldialogBtn() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.canceldialogBtn.element), this.canceldialogBtn.getTimeOut());
    }
    public async loadcancelBtn() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.cancelBtn.element), this.cancelBtn.getTimeOut());
    }
    public async loadapproveBtn() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveBtn.element), this.approveBtn.getTimeOut());
    }

}