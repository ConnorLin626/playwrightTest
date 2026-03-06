/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Page, TextInput, Button, OptionSelect, DateSelect, RadioButton, FileSelect, ListSelect } from '../../../lib';
import * as utils from '../../../lib/utils';

@log export class TWFISCPaymentPage extends Page {

    // create page
    @component('//*[@id="domestic-view-edit"]') public editButton: Button;
    // @component('//button[@ExistingPayeeSelectControl]')
    @component('//span[@id="AUTO-Test-BulkPayment-ExistingPayee"]') public EPayeeSControl: TextInput;
    @component('//span[@id="Existing payee"]') public EPayee: TextInput;
    @component('//multi-level-dropdown[@formcontrolname="payeePurposeCode"]') public tCode: OptionSelect;
    @component('//div[@id="select-item-28 - Consolidated Debit""]') public cDebit: OptionSelect;
    @component('//dbs-account-new') public fromAccount: Button;
    @component('//dbs-single-existing-payee-new') public existingPayee: Button;
    @component("//input[@id='bank-charge-us']") public bankChargeUs: Button;
    @component('//*[@class="charge-account-popper"]') public chargeAccounts: Button;

    // view page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefView: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusView: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValueView: TextInput;
    @component('//label[@id="domestic-view-deductAmount"]') public amountView: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public fromAccountView: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public acctBalaView: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public newPayeeAcctView: TextInput;
    @component('//strong[@id="domestic-view-newPayee-name"]') public newPayeeNameView: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1View: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2View: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3View: TextInput;
    @component('//strong[@id="domestic-view-existingPayee-name"]') public existingPayeeNameView: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateView: TextInput;
    @component('//label[@id="domestic-view-approvalDate"]') public cutoffTimeView: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public paymentTypeView: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public sendAmtView: TextInput;
    @component('//*[@id="domestic-view-payee-bankName"]') public payeeBankNameView: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public payeeBankAdd1View: TextInput;
    @component('//*[@id="domestic-view-newPayee-swiftBic"]') public payeeBankSwiftBicView: TextInput;
    @component('//*[@id="domestic-view-payee-bankCode"]') public payeeBankCodeView: TextInput;
    @component('//*[@id="domestic-view-payee-brchCode"]') public payeeBrchCodeView: TextInput;
    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailView: TextInput;
    @component('//*[@id="domestic-view-adviceContent"]') public messageView: TextInput;
    @component('//*[@id="domestic-view-email"]') public emailListView: TextInput;
    @component('//*[@id="domestic-view-bankCharge"]') public bankChargeView: TextInput;
    @component('//*[@id="domestic-view-chargeAcct"]') public chargeAcctView: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public msgToApproverView: TextInput;
    @component('//single-approval/form/div[2]/div[2]/ol/li[1]/div[2]/div[1]') public withoutMChallengeText: TextInput;
    @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameView: TextInput;

    public async loadCondition() {
        throw new Error("Method not implemented.");
    }

    public async loadConditionForViewPaymentPage() {
        await utils.waitForUXLoading();
        await browser.sleep(5000);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusView.element), this.transactionStatusView.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountView.element), this.fromAccountView.getTimeOut());
    }

    public async loadConditionForViewTemplatePaymentPage() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameView.element), this.templateNameView.getTimeOut());
    }

}