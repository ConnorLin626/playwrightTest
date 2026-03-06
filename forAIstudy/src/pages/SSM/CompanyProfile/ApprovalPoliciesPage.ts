/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading } from '../../../lib';

@log export class ApprovalPoliciesPage extends Page {

    //Approval Policies
    @component('//span[@id="btn-print"]') public printBtn: Button;
    @component('//*[@id="ux-tab-POLICY"]/span') public approvalePolicies: Button;
    @component('//*[@id="btn-create-policy"]') public createPolicyBtn: Button;
    @component('//*[@id="create-C"]') public cashManBtn: Button;
    @component('//*[@id="create-T"]') public TradeManBtn: Button;
    @component('//*[@id="policyName"]') public policyName: TextInput;
    @component('//*[@id="policyDescription"]') public policyDescription: TextInput;
    @component('//*[@id="adv-hide-btn-CREDITIMPORT"]') public tradeshowOption: Button
    @component('//*[@id="adv-hide-btn-PAYMENT_GROUP_TYPE_CODE"]') public paymentShowOption: Button
    @component('//*[@id="adv-hide-btn-PAYROLL_GROUP_TYPE_CODE"]') public payrollShowOption: Button
    @component('//*[@id="PAYMENT_GROUP_TYPE_CODE-0"]') public paymentCheckbox1: Button;
    @component('//*[@id="PAYMENT_GROUP_TYPE_CODE-11"]') public paymentCheckbox2: Button;
    @component('//*[@id="PAYROLL_GROUP_TYPE_CODE-0"]') public payrollCheckbox1: Button;
    @component('//*[@id="CREDITIMPORT-0"]') public TradPaymentTypeCheckbox: Button;
    @component('//amount-tier/div/div[2]/div[2]/div/amount-flow/div/div[2]/div[1]/p-auto-complete') public groupSelect: OptionSelect;
    @component('//*[@name="maxAmount"]') public toAmount: TextInput;
    @component('//*[@id="btn-continue"]') public nextButton: Button;
    @component('//*[@id="btn-preview"]') public submitButton: Button;
    @component('//approval-policies-submit/div[2]/div[2]/div/button[2]') public FinishButton: Button;
    @component('//*[@id="request-item-0"]') public RequestLink: Button;


    //View policy request
    @component('//*[@id="status"]') public requestStatus: TextInput;
    @component('//*[@id="policyName"]') public viewPolicyName: TextInput;
    @component('//*[@id="PAYMENT_GROUP_TYPE_CODE-0"]') public viewPaymentType: TextInput;
    @component('//*[@id="CREDITIMPORT-0"]') public viewTradPaymentType: TextInput;
    @component('//*[@id="policyAmount-0"]') public amountValue: TextInput;
    @component('//*[@id="policyCurrency"]') public currency: TextInput;
    @component('//*[@id="policyFor"]') public approvalPolicy: TextInput;
    @component('//*[@id="approve-btn"]') public approveBtn: Button;
    @component('//*[@id="get-challenge"]') public getChallengeBtn: Button;
    @component('//*[@id="responseCode"]') public responseCode: TextInput;
    @component('//*[@id="approve-btn-dialog"]') public confirmApproveBtn: Button;
    @component('//button[@name="logout"]') public logoutBtn: Button;

    //Modofy policy
    @component('//*[@id="modify-search"]') public modifySeardch: Button;
    @component('//*[@id="policy-filter"]') public filterInput: TextInput;
    @component('//*[@id="btn-action-0"]') public actionButton: Button;
    @component('//*[@id="edit--btn-action"]') public modifyPolicyBtn: Button;
    @component('//*[@id="policyDescription"]') public policyDescriptionView: TextInput;
    @component('//*[@id="btn-continue"]') public Continue: Button;
    @component('//*[@id="btn-preview"]') public Submit: Button;
    @component('//*[@id="btn-finish"]') public Finish: Button;



    //Delete policy
    @component('//*[@id="delete--btn-action"]') public deletePolcyBtn: Button;
    @component('//*[@id="delete-btn-dialog"]') public deleteDialogBtn: Button;
    @component('//*[@id="dismiss-btn-dialog"]') public dismissBtn: Button;
    @component('//*[@id="no-Records"]') public Result: Button;


    constructor() {
        super();
    }
    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.policyName.element), this.policyName.getTimeOut());
    }
    public async loadConditiontPolicy() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.actionButton.element), this.actionButton.getTimeOut());
    }
    public async loadConditionEditPolicy() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.Continue.element), this.Continue.getTimeOut());
    }
    public async loadConditionPrevPolicy() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.Submit.element), this.Submit.getTimeOut());
    }
    public async loadConditionSubPolicy() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.Finish.element), this.Finish.getTimeOut());
    }
    public async loadConditionRequest() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.RequestLink.element), this.RequestLink.getTimeOut());
    }
}