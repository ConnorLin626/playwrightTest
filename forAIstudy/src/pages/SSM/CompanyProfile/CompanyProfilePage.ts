/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput,waitForUXLoading } from '../../../lib';

@log export class CompanyProfilePage extends Page {
    constructor() {
        super();
    }

    //Company profile page
    @component('//*[@id="menuCompany-a"]') public companyMenu: Button;
    @component('//a[@id="menuCompanyProfile"]') public companyProfileMenu: Button;
    @component('//*[@name="print"]') public printBtn: Button;
    @component('//span[@id="companyName"]') public compnayNameValue: TextInput;
    @component('//*[@id="orgId"]') public compnayIDValue: TextInput;
    @component('//*[@id="viewDetailItem-0"]') public viewDetailBtn: Button;
    @component('//input[@id="company-payee-filter"]') public filterPayee: TextInput;
    @component('//view-payee-list/div/mat-dialog-content/div[3]/table/tbody/tr/td[2]/div/p') public filterPayeeResultValue: TextInput;
    @component('//button[@class="icon-close-1"]') public closeBtn: Button;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.printBtn.element), this.printBtn.getTimeOut());
    }

    public async loadConditionforPayeDetail() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.filterPayee.element), this.filterPayee.getTimeOut());
    }

}