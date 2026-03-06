/*
 * ©Copyright ACI Worldwide, Inc. 2023
*/
import { PaymentsPages } from '../../../pages/IDEALX';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, TextInput, waitForUXLoading } from '../../../lib';

@log export class IDTAXPaymentPage extends Page {

    // View Payment Page
    @component('//ng-component/div/ng-component/div/div[2]/div/div[1]/div[1]/div[1]/div[2]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public viewStatus: TextInput;
    @component('//*[@id="view-tax-payAmount"]') public viewAmount: TextInput;
    @component('//*[@id="act-view-accountNum"]') public viewfromAccount: TextInput;
    @component('//*[@id="bulk-view-acctBalance"]') public viewAcctBalance: TextInput;
    @component('//view-section-tax/div/section[1]/div[4]/span[2]') public paymentDateValue: TextInput;
    @component('//*[@id="act-view-billing-org"]') public viewBillOrg: TextInput;
    @component('//*[@id="view-tax-payAmount-detail"]') public viewTaxAmt: TextInput;
    @component('//*[@id="tax-view-billing-npwp"]') public viewTaxNpwp: TextInput;
    @component('//*[@id="tax-view-billing-npwp-depositor"]') public viewTaxNpwpDep: TextInput;
    @component('//*[@id="tax-view-billing-idNumber"]') public viewTaxIdNum: TextInput;
    @component('//*[@id="tax-view-billing-payerName"]') public viewTaxPayerName: TextInput;
    @component('//*[@id="tax-view-billing-payerAddress"]') public viewTaxPayerAdd: TextInput;
    @component('//*[@id="tax-view-billing-payerCity"]') public viewTaxPayerCity: TextInput;
    @component('//*[@id="tax-view-billing-taxAccountCode"]') public viewTaxAcctCode: TextInput;
    @component('//*[@id="tax-view-billing-depositTypeCode"]') public viewTaxDepTypeCode: TextInput;
    @component('//*[@id="tax-view-ssp-desc"]') public viewTaxSspDesc: TextInput;
    @component('//*[@id="tax-view-billing-taxPeriodFromMonth"]') public viewPeriodFromM: TextInput;
    @component('//*[@id="tax-view-billing-caseNumber"]') public viewCaseNum: TextInput;
    @component('//*[@id="tax-view-billing-objectNumber"]') public viewObjNum: TextInput;
    @component('//*[@id="tax-view-billing-objectAddress"]') public viewObjAdd: TextInput;
    
    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
    }

    public async loadConditionForViewPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewStatus.element), this.viewStatus.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewAmount.element), this.viewAmount.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewfromAccount.element), this.viewfromAccount.getTimeOut());
    }
}
