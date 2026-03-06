/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, DBSCalendarSelect, waitForUXLoading, WebComponent } from '../../../lib';

@log export class IntraCompanyTransferPage extends Page {

    // create page
    @component('//*[@id="icon__internal_transfer"]') public ictMenu: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="toAccount"]') public toAccount: OptionSelect;
    @component('//span[@class="dbs-validation-error !max-w-none ng-star-inserted"]') public AccountErrorMeaasge: TextInput;
    @component('//*[@name="send-amount"]') public amount: TextInput;
    @component('//dbs-calendar[@formcontrolname="paymentDate"]') public paymentDate: DBSCalendarSelect;
    @component('//input[@id="isTransactionNote"]') public transactionNoteButton: Button;
    @component('//textarea[@name="transactionNote"]') public transactionNoteInput: TextInput;
    @component('//button[@name="ict-next"]') public nextButton: Button;
    @component('//button[@name="proceed"]') public processButton: Button;
    @component('//button[@name="ict-preview-Submit"]') public submitButton: Button;
    @component('//button[@name="finish"]') public finishButton: Button;
    @component("//*[@name='save-as-draft']") public saveAsDraft: TextInput;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component('//button[@name="approve"]') public approveButton: Button;
    @component("//div[2]/div[1]/button[3]/span[1]") public approveBtn: Button;
    @component('//button[@name="get-challenge"]') public getChallenge: Button;
    @component('//input[@name="responseCode"]') public challengeResponse: TextInput;
    @component('//input[@name="saveAsTemplate"]') public saveAsTemplateCheckbox: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component('//input[@id="useFX" and @type="checkbox"]') public useFxCheckBox: Button;
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//multi-level-dropdown[@formcontrolname="subPurposeCode"]') public subPurposeCode: OptionSelect;
    @component('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/div[2]') public tipMessage: TextInput;
    @component('//dbs-foreign-exchange/div/div/div/div[2]/fx-dol-list/div/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[4]/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/input') public fxContract3: Button;
    @component('//dbs-ict-create/div/div[2]/div/form/ict-step-2/div/div/div[2]/div[2]/fx-amount-info/dbs-fx-dol-message/div/dbs-top-panel/div/div[2]/ul/li/span') public  WarningMessage: TextInput;                

    @component('//cutoff-time-tip') public cutoffTimeTip: WebComponent;
    @component('//input[@id="enterCheck"]') public enterCheckFX: Button;
    @component('//input[contains(@id,"fx-contract-0")]') public firstfxContract: Button;
    @component('//input[@id="fx-contract-0"]') public fxContract0: Button;
    @component('//input[@id="fx-contract-1"]') public fxContract1: Button;
    @component('//input[@name="fx-ref-0"]') public fRef0: TextInput;
    @component('//input[@name="fx-ref-1"]') public fRef1: TextInput;
    @component('//div[@class="fx-dol-message"]') public dolMessage: TextInput;
    @component('//div[@id="fxDolViewSection"]') public exchangeRateTable: TextInput;

    @component('//input[@name="fx-amount-0"]') public fxContractAmt1: TextInput;
    @component('//input[@name="fx-amount-1"]') public fxContractAmt2: TextInput;
    @component('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[5]/div[2]') public ViewFXrate: Button;
    @component('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[4]/div/span[1]') public Booknow: Button;
    @component('//*[@id="mat-dialog-2"]/dbs-fx-dol-book-dialog/div/div[2]/div/button[2]') public Confirm: Button;
    @component('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[5]') public FXcontract: TextInput;
    @component('//label[@id="ict-view-approvalDate"]') public cutoffTimeView: TextInput;
    @component('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[5]/div/div') public SellCurrencyAmount: TextInput;
    @component('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[6]/div/div') public BuyCurrencyAmount: TextInput;
    @component('//dbs-fx-contact/div/div/div[2]/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[5]/div/div') public NonSellCurrencyAmount: TextInput;
    @component('//dbs-fx-contact/div/div/div[2]/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[6]/div/div') public NonBuyCurrencyAmount: TextInput;
    @component("//ict-regulatory-advising/div/div/div[1]/span[2]/span") public complianceCodeErrorMsg: TextInput;
    @component("//ict-regulatory-advising/div/div/div[2]/span[2]/span") public underlyingCodeErrorMsg: TextInput;

    //Summary Section
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[4]/div') public deductAmt: TextInput;
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[5]/div/div[3]') public AmtToDeduct: TextInput;
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[7]/div') public TotalAmtDeduct: TextInput;
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[6]/div') public TotalAmtDeductFoNonDol: TextInput;

    //Copy ICT Payment
    @component('//button[@name="copy"]') public copyButton: Button;

    //Edit ICT Payment
    @component('//*[@id="ict-view-edit"]') public editButton: Button;
    @component('//button[@name="ict-modify-Next"]') public modifyNextButton: Button;

    //Reject ICT Payment
    @component('//button[@name="reject"]') public rejectButton: Button;
    @component('//input[@name="reasonForRejection"]') public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;

    //Delete ICT Payment
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // view ICT Payment/Template Page
    @component('//span[@id="ict-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//span[@id="ict-view-payeeNum"]') public toAccountValue: TextInput;
    @component('//label[@id="ict-view-sendAmount"]') public amountValue: TextInput;
    @component('//div[@id="ict-view-status"]') public transactionStatusValue: TextInput;
    @component('//span[@id="ict-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[1]') public contractRefValue: TextInput;
    @component('//*[@id="ict-view-purposeCode"]') public purposeCodeValue: TextInput;
    @component('//*[@id="ict-view-subPurposeCode"]') public subPurposeCodeValue: TextInput;
    @component('//*[@id="ict-view-deductAmount"]') public deductAmountValue: TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[4]/span') public AmtToDeductValue: TextInput;
    @component('//*[@id="ict-view-deductAmount"]') public totalDeductValue: TextInput;
    @component('//*[@id="ict-view-deductAmount1"]') public totalDeductValueNonDol: TextInput;
    @component('//dbs-view-section-ict/div/section[2]/div[2]/span[2]/span/span/span/p/strong') public amtToUseValueNonDol: TextInput;
    @component('//*[@id="ict-view-regulatoryComplianceCode"]')  public complianceCodeValue: TextInput;
    @component('//*[@id="ict-view-underlyingCode"]')  public underlyingCodeValue: TextInput;
    @component('//*[@id="ict-view-outwardRemit"]')  public outwardRemitValue: TextInput;
    @component('//*[@id="ict-view-payeeCode"]')  public beneficiaryCode: TextInput;

    @component('//*[@id="ict-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="ict-view-customerReference"]') public referenceValue: TextInput;
    @component('//*[@id="view-ict-acctBalance"]') public balanceValue: TextInput;
    @component('//*[contains(@class,"page-header")]') public paymentType: TextInput;
    @component('//*[@id="ict-view-transactionNote"]') public messageToApproverValue: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;

    // View ICT Template Payment 
    @component('//div[@id="ict-viewTemp-templateName"]') public viewTemplateName: TextInput;
    @component('//label[@id="ict-view-temp-sendAmount"]') public viewTemplateAmount: TextInput;

    // SAM>ICT schedule cut off time link
    @component('//a[contains(@href,"/csr/common/schedule/bom") and text()="Intra Company Transfer"]') public ictScheduleLink: Button;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }


    public async loadConditionForCopy() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentDate.element), this.paymentDate.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
    }

    public async loadConditionForEdit() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentDate.element), this.paymentDate.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.modifyNextButton.element), this.modifyNextButton.getTimeOut());
    }

    public async loadConditionForPreviewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
    }

    public async loadConditionForViewICTPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.toAccountValue.element), this.toAccountValue.getTimeOut());
    }
    public async loadConditionForViewMoICTPaymentPage() {
        await waitForUXLoading();
        await browser.sleep(5000); //wait for response
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.toAccountValue.element), this.toAccountValue.getTimeOut());
    }

    public async loadConditionForViewICTTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTemplateName.element), this.viewTemplateName.getTimeOut());
    }

    public async loadConditionForCreateICTFromTemplatePage() {
        await waitForUXLoading();
        await browser.sleep(2000); //wait for response
        await browser.wait(ExpectedConditions.visibilityOf(this.amount.element), this.amount.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
    }

    public async loadConditionForMessageInCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
    }

    public async loadConditionForMessageInApprovalPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.approveButton.element), this.approveButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
    }

    public async loadConditionForSummarySection() {
        await waitForUXLoading();
        await browser.sleep(5000)
        await browser.wait(ExpectedConditions.visibilityOf(this.deductAmt.element), this.deductAmt.getTimeOut());
    }
}
