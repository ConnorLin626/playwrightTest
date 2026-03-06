/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';

@log export class BeneficiaryPage extends Page {

    //Center
    @component('//button[@name="link-button_payee"]') public createNewPayee: Button;
    @component('//label[@id="payee-view-name"]') public centerPayeeName: TextInput;
    @component('//ng-component/div/ng-component/div/div[3]/payee-transaction-list/div/div[4]/payee-view/div/div/div/div[6]/span[2]') public paymentOptions: TextInput;
    @component('//label[@id="payee-view-payNowNickName"]') public centerPayNowPayeeName: TextInput;
    @component('//div[@id="payee-view-nickName"]') public centerPayeeNickName: TextInput;
    @component('//span[@id="payee-view-email"]') public centerPayeeViewEmail: TextInput;
    @component('//span[@id="payee-edit"]') public editNewPayee: Button;
    @component('//button[@name="payee-delete"]') public deleteNewPayee: Button;
    @component('//button[@name="delete"]') public confirmDelete: Button;
    @component('//div[@class="btn-area"]/button[@name="dismiss"]') public centerDismiss: Button;
    @component('//label[@id="payee-view-add1"]') public centerAddress1: TextInput;
    @component('//span[@id="payee-view-email"]') public centerEmailProxy: TextInput;
    @component('//span[@id="payee-view-mobNum"]') public centerMobileProxy: TextInput;
    @component('//span[@id="payee-view-fasterId"]') public centerFasterIDProxy: TextInput;
    @component('//input[@name="approve-filter"]') public payeeFilter: TextInput;
    @component('//div[@class="no-information"]') public beneficiaryResult: TextInput;
    @component('//*[@id="ux-tab-PAYEE_PENDING_APPROVAL"]') public payeePendingTable: Button;
    @component('//*[@id="dbs-tab-count-PAYEE_PENDING_APPROVAL"]') public payeePendingTableCount: TextInput;

    //Detail -- payee
    @component('//p-auto-complete[@formcontrolname="selectedCountry"]') public selectedCountry: OptionSelect;
    @component('//input[@name="new-payee-name"]') public newPayeeName: TextInput;
    @component('//input[@name="new-payee-add1"]') public newPayeeAdd1: TextInput;
    @component('//input[@name="new-payee-add2"]') public newPayeeAdd2: TextInput;
    @component('//input[@name="new-payee-add3"]') public newPayeeAdd3: TextInput;
    @component('//input[@name="chequeOrDemand"]') public chequeOrDemand: Button;
    @component('//dbs-radio-group[@formcontrolname="bankCategoryType"]') public bankCategory: RadioButton;
    @component('//dbs-radio-group[@formcontrolname="otherBankCategoryType"]') public OtherBankType: RadioButton;
    @component('//input[@name="new-payee-bank-id"]') public newPayeeBankId: TextInput;
    @component('//input[@name="new-payee-bank-id-button"]') public newPayeeBankIdButton: Button;
    @component('//table[contains(@class,"swift-results")]/tbody/tr[1]/td[1]') public selectBankId: Button;
    @component('//input[@name="new-payee-acct-number"]') public newPayeeNumber: TextInput;
    @component('//input[@name="printedName"]') public printedName: TextInput;
    @component('//p-auto-complete[@formcontrolname="selectedCategory"]') public selectedCategory: OptionSelect;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickName: TextInput;
    @component('//ng-component/div/ng-component/div/div[3]/div[1]/span[1]') public payeeNum: TextInput;
    @component('//input[@name="payment-cd-type-CHEQUE"]') public chequePaymentOption: RadioButton;
    @component('//input[@name="payment-cd-type-DEMANDDRAFT"]') public ddPaymentOption: RadioButton;

    //paynow
    @component('//a[@id="ux-tab-newpaynow"]') public payNowProxy: Button;
    @component('//input[@name="proxyTypeMobNumInput"]') public proxyTypeMobNum: TextInput;
    @component('//button[@name="retrieve-button"]') public retrievePayNowName: Button;
    @component('//p[@id="retrieve-name"]') public retrievePayNowSpan: TextInput;
    @component('//input[@name="newPayNowNickName"]') public newPayNowNickName: TextInput;
    @component('//button[starts-with(@class, "btn btn-dbs-solid") and text()="Retrieve name"]') public retrieveNameButton: Button;//need add id, the same as retrievePayNowName
    @component('//input[@name="payNowProxyType-email"]') public proxyEmailRadio: Button;
    @component('//input[@name="proxyTypeEmailInput"]') public proxyEmailText: TextInput;
    @component('//input[@name="payNowProxyType-fpsId"]') public proxyFasterIdRadio: Button;
    @component('//input[@name="proxyTypeFasterIDInput"]') public proxyFasterIdText: TextInput;

    //common
    @component('//button[@name="next"]') public next: Button;
    @component('//button[@name="submit"]') public submit: Button;
    @component('//button[@name="dismiss"]') public dismiss: Button;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewPayee.element), this.createNewPayee.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.editNewPayee.element), this.editNewPayee.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionOnCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewPayee.element), this.createNewPayee.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionForDeletePayee() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.deleteNewPayee.element), this.deleteNewPayee.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteNewPayee.element), this.deleteNewPayee.getTimeOut());
        await browser.sleep(2500);
    }

    public async loadConditionForDeleteButton() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmDelete.element), this.confirmDelete.getTimeOut());
    }

    public async loadConditionForDismissButton() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.confirmDelete.element), this.confirmDelete.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismiss.element), this.dismiss.getTimeOut());
    }

    public async loadConditionPendingTable() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewPayee.element), this.createNewPayee.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionForCreateBenePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.createNewPayee.element), this.createNewPayee.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.selectedCountry.element), this.selectedCountry.getTimeOut());
    }

    public async loadConditionForEditBenePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.editNewPayee.element), this.editNewPayee.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.newPayeeName.element), this.newPayeeName.getTimeOut());
    }

    public async payNowCanClick() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submit.element), this.submit.getTimeOut());
    }
}