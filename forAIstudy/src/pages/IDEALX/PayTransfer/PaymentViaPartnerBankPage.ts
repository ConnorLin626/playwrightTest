/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';

@log export class PaymentViaPartnerBankPage extends Page {

    //Create page
    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public paymentMenu: Button;
    @component('//span[@class="menu-item__icon icon icon__payment_via_partner_bank"]') public paymentViaPartnerBank: Button;
    @component('//p-auto-complete[@formcontrolname="countrySelected"]') public ptnBnkCountry: OptionSelect;//Partner Bank Location
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public ptnBnkAccount: OptionSelect;//Funding Account
    @component('//p-auto-complete[@formcontrolname="ptnbnkPmtSelect"]') public ptnBnkPaymentType: OptionSelect;//Payment Type
    @component('//p-auto-complete[@formcontrolname="currencySelected"]') public ptnBnkCurrency: OptionSelect;//Currency
    
    @component('//input[@id="ptnbnk-search"]') public searchExistingPayee: TextInput;//choose any existingPayee
    @component('//button[@name="addButton"]') public existingPayee: Button;

    @component('//input[@name="bp-payee-amount"]') public payeeAmount: TextInput;
    @component('//dbs-input//input[@name="bp-payee-address1"]') public payeeAddress: TextInput;

    @component('//p-auto-complete[@formcontrolname="servicesType"]') public purposeCode: OptionSelect;
    @component('//div[@class="hide-option hide-option-layout"]') public showPayeeaddress: Button;
    @component('//input[@name="customer-reference"]') public customeReference: TextInput;
    @component('//div[@class="alert alert-error ng-star-inserted"]') public alertError: TextInput;//custome Reference
    
    //submit buttom
    @component("//button[@name='next']") public nextButton: Button;
    @component('//button[@name="Submit"]') public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;

    //check view page 
    @component('//strong[@id="ptnbnk-view-amount_0"]') public viewAmount: TextInput;
    
    // Edit Page
    @component('//*[@id="ptnbnk-view-edit"]') public editButton: Button;
    

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentViaPartnerBank.element), this.paymentViaPartnerBank.getTimeOut());
    }

    public async loadConditionForMenu() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentMenu.element), this.paymentMenu.getTimeOut());
    }


    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }


    public async loadConditionForViewpaymentViaPartnerBankPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewAmount.element), this.viewAmount.getTimeOut());
    }

    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
        await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
        await this.loadConditionForViewpaymentViaPartnerBankPage();
    }
}
