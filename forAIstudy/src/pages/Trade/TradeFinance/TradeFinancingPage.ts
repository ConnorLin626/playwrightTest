/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect,FileSelect, DBSCalendarSelect, IXHorizontalMenu, RadioButton} from '../../../lib';

@log export class TradeFinancingPage extends Page {

    @component('//*[@id="nav-item-navBBMainTradeFinanceText"]') public tradeFinanceMenu: Button;
    @component('//a[@href="#/trade-finance/transactions"]') public tradeTransactionsButton: Button;
    @component('//*[@id="icon__trade_create_fin"]') public applicationMenu: Button;
    @component('//input[@value="I" and @type="radio"]') public importRadio: RadioButton;
    @component('//input[@value="E" and @type="radio"]') public exportRadio: RadioButton;
    @component('//input[@value="Y" and @type="radio"]') public yesRadio: RadioButton;
    @component('//input[@value="N" and @type="radio"]') public noRadio: RadioButton;
    @component('//input[@value="FE" and @type="radio"]') public financingAgainstExportRadio: RadioButton;
    @component('//input[@placeholder="Enter the Letter of Credit number"]') public exportLetterofCreditNumber: TextInput;
    @component('//input[@value="FP" and @type="radio"]') public financingAgainstPurchaseRadio: RadioButton;
    @component('//input[@placeholder="Enter the full reference number"]') public purchaseOrderReference: TextInput;
    @component('//input[@value="GS" and @type="radio"]') public goodAndServiceRadio: RadioButton;
    @component('//input[@value="FC" and @type="radio"]') public freightChargesRadio: RadioButton;
    @component('//input[@placeholder="Enter the full reference number"]') public billRef: TextInput;
    @component('//input[@value="D" and @type="radio"]') public domesticRadio: RadioButton;
    @component('//div[5]/div[2]/dbs-radio-group/div/dbs-radio[2]/div/label/div') public internationalRadio: RadioButton;
    @component('//*[@type="file"]') public invoiceDocFileUploadButton: FileSelect;
    @component('//input[@id="flag" and @type="checkbox"]') public switchButton: Button;
    @component('//div[@id="Applicant-arrow"]') public applicantFrom: Button;
    @component('//input[@placeholder="Search using applicant name"]') public applicantFilter: TextInput
    @component('//*[@id="Applicant-List"]/div[3]/div[2]') public applicantSelectFirst: Button;
    @component('//*[@id="Applicant-List"]/div[3]/div[3]/div[1]') public applicantSelect: Button;
    @component('//div[@id="Buyer-arrow"]') public buyername: Button;
    @component('//input[@placeholder="Search using buyer name"]') public buyernameFilter: TextInput
    @component('//multi-party-select-item/div/float-ui-content/div/div/div/div[3]/div[1]') public buyernameSelect: Button;
    @component('//div[@id="Supplier-arrow"]') public supplierFrom: Button;
    @component('//input[@placeholder="Search using supplier name"]') public supplierFilter: TextInput
    @component('//div[2]/float-ui-content/div/div[1]/div/div[3]/div/div[1]/div') public supplierSelect: Button;
    @component('//dbs-dropdown[@id="invoiceAmount-currency"]') public invoiceCcy: TextInput;
    @component('//input[@id="search"]') public invoiceCcySearch: TextInput;
    @component('//*[@class="dropdownListLabel ng-star-inserted"]') public invoiceCcySelect: TextInput;
    @component('//input[@id="invoiceAmount-select-currency-input"]') public invoiceAmount: TextInput;
    @component('//input[@id="financedAmount-select-currency-input"]') public financedAmount: TextInput;
    @component('//dbs-dropdown[@formcontrolname="financePeriod"]') public financePeriod: OptionSelect;
    @component('//dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div') public numberOfDaysSelect: TextInput;   
    @component('//dbs-dropdown/div/div/div/div/div/ul/li[2]/div/div') public specialDueDateSelect: TextInput;   
    @component('//input[@placeholder="1-999"]') public numberOfDaysInput: TextInput;
    @component('//dbs-calendar[@formcontrolname="financeMaturityDate"]') public financeMaturityDate: DBSCalendarSelect;
    @component('//fin-details/div/div[3]/div[2]/dbs-radio-group/div/dbs-radio[1]/div/label/div') public uponBankApprovalRadio: RadioButton;   
    @component('//div/ul/li[2]/div/div') public specificDueDateTypeSelect: TextInput;  
    @component('//dbs-calendar[@formcontrolname="financeMaturityDate"]') public specificDueDate: DBSCalendarSelect;  
    @component('//*[@value="S"]') public specificDateRadio: RadioButton;
    @component('//dbs-calendar[@formcontrolname="financeValueDate"]') public financeValueDate: DBSCalendarSelect;
    @component('//*[@formcontrolname="debitUponLoanChargeAccount"]') public debitAccount: Button;
    @component('//*[@name="account-search"]') public debitAccountFilter: TextInput;
    @component('//*[@id="account-List"]/div[2]/div[1]/div') public debitAccountSelect: Button;
    @component('//input[@value="G" and @type="radio"]') public goodsRadio: RadioButton;
    @component('//input[@value="S" and @type="radio"]') public serviceRadio: RadioButton;
    @component('//fin-shipment-details/div/div[2]/div[2]/dbs-radio-group/div/dbs-radio[2]/div/label') public servicesRadio: RadioButton;
    @component('//*[@formcontrolname="descriptionGoods_G"]//textarea') public descriptionOfGoods: TextInput;
    @component('//*[@formcontrolname="descriptionGoods_S"]//textarea') public descriptionOfServices: TextInput;
    @component('//*[@id="Payee-arrow"]') public payeeName: TextInput;  
    @component('//*[@id="Payee-List"]/div[3]/div[1]/div[1]') public firstPayee: Button; 
    @component('//*[@formcontrolname="loanDisburse"]') public loanDisburse: OptionSelect;
    //@component('//fin-loan-disburse/div/div[2]/div/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div[1]') public disbursementSelect: TextInput;
    @component('//*[@title="SFT"]') public disbursementSelect: TextInput;
    @component('//*[@title="CA"]') public disbursementCASelect: TextInput;
    @component('//*[@id="Payee-arrow"]') public payeeArrow: Button;
    @component('//*[@id="Payeeadd-red-btn"]') public addPayee: Button;
    @component('//*[@id="trade-party-name-input"]') public newPayeeName: TextInput;
    @component('//*[@id="trade-party-address-input"]') public payeeAddreess: TextInput;
    @component('//*[@formcontrolname="party_location"]') public payeeLocation: OptionSelect;
    @component('//*[@id="search"]') public searchPayeeLocation: TextInput;
    @component('//dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div') public payeeLocationValue: Button;
    @component('//*[@id="trade-party-townCity-input"]') public townCity: TextInput;
    @component('//*[@id="trade-party-postalCode-input"]') public postalCode: TextInput;
    @component('//*[@id="party_isSaved"]') public saveForFutrue: Button;
    @component('//*[@class="default__footer__btn--primary btn dls btn__primary medium default"]') public confirmButton: Button;
    @component('//account-select[@formcontrolname="creditAccount"]') public creditAccount: Button; 
    @component('//*[@name="account-search"]') public creditAccountFilter: TextInput; 
    @component('//*[@id="account-List"]/div[2]/div[1]/div/div[1]') public creditAccountSelect: Button; 
    @component('//div[@class="selected-icon Payee no-selected ng-star-inserted"]') public payee: Button;
    @component('//*[@id="Payee-List"]/div[3]/div[1]/div[1]/div') public payeeFirstResultSelect: Button;
    @component('//dbs-dropdown/div/div/div/div/div/ul/li[2]') public otherSelect: TextInput;
    @component('//textarea[@placeholder="Specify"]') public disbursementOthers: TextInput;
    @component('//div/float-ui-content/div/div/div/div[3]/div[1]') public payeeSelect: Button;
    @component('//*[@formcontrolname="payeeBankCountry"]') public bankLocation: OptionSelect;
    @component('//input[@id="search"]') public bankLocationFilter: TextInput;   
    @component('//dbs-dropdown/div/div/div/div/div/ul/li/div/div[1]') public bankLocationSelect: TextInput;   
    @component('//div[1]/div[4]/bank-select/div/div[1]/input') public payeeBank: TextInput;
    @component('//*[@class="list-item ng-star-inserted"]') public payeeBankSelect: TextInput;
    @component('//dbs-input[@formcontrolname="payeeBankAccount"]//input') public payeeBankAccount: TextInput;
    @component('//dbs-input[@formcontrolname="payeeRef"]//input') public payeeRef: TextInput;
    @component('//div[2]/div/dbs-trade-create-switch/label') public interBankSwitch: Button;
    @component('//*[@formcontrolname="intermediaryBankCountry"]') public interBankLocation: TextInput;
    @component('//dbs-dropdown/div/div/div/div/div/ul/li[1]') public interBankLocationSelcet: TextInput;
    @component('//div[2]/div[3]/bank-select/div/div/input') public interBankId: TextInput;
    @component('//bank-init/div/div[2]/bank-select-result/div/div') public interBankSelect: TextInput;
    @component('//fin-regulatory-report/div/div[2]/div[2]/account-select') public applicantReportAccount: TextInput;
    @component('//*[@name="account-search"]') public reportAccountFilter: TextInput;
    @component('//*[@id="account-List"]/div[2]/div[1]/div') public reportAccountSelect: TextInput;
    @component('//*[@formcontrolname="paymentNature"]') public paymentNature: OptionSelect;

    @component('//fin-regulatory-report/div/div[3]/div[3]/dbs-dropdown/div/div/div/div/div/ul/li[2]/div/div[1]') public paymentNatureSelect: TextInput;
    @component('//div[4]/div[2]/dbs-radio-group/div/dbs-radio[1]/div/input') public taxFreeYesRadio: TextInput;
    @component('//div[5]/div[2]/dbs-input/div/div/div/input') public fullRef: TextInput;
    @component('//fin-balance-payment-details/div/div[2]/dbs-dropdown') public bopCode: OptionSelect;
    @component('//*[@id="search"]') public bopCodeFilter: TextInput;
    @component('//fin-balance-payment-details/div/div[2]/dbs-dropdown/div/div/div/div/div/ul/li') public bopCodeSelect: TextInput;
    @component('//fin-balance-payment-details/div/div[3]/dbs-input/div/div/div/input') public transactionRemark1: TextInput;
    @component('//fin-regulatory-report/div/div[7]/div[2]/dbs-input/div/div/div/input') public contractNumber: TextInput;
    @component('//div/div[1]/div[3]/dbs-input/div/div/div/input') public proportionOfContractAmt: TextInput;
    @component('//div[2]/div[2]/dbs-input/div/div/div/input') public declarationDays: TextInput;
    @component('//input[@placeholder="Provide any additional remarks for this transaction."]') public additionalRemarks: TextInput;
    @component('//*[@type="file"]') public digiDocFileUploadButton: FileSelect;
    @component('//fin-instruction-details/div/div[2]/div[2]/account-select/div/div/div[2]') public chargeAccount: TextInput;
    @component('//*[@id="account-List"]/div[2]/div[1]') public chargeAccountSelect: TextInput;
    @component('//ng-component/div/div/fin-instruction-details/div/div[5]/div/dbs-trade-create-switch/label') public specialInstructionsSwitch: Button;
    @component('//dbs-textarea[@formcontrolname="specialInstruction"]//textarea')  public specialInstructions: TextInput;
    @component('//button[@class="btn btn__primary medium"]') public reviewBtn: Button;
    @component('//*[@class="default__footer__btn--secondary btn dls btn__secondary medium default ng-star-inserted"]') public skipForNow: Button;
    @component('//*[@placeholder="Please approve this application before HH:MM hrs of the submission date"]') public message: TextInput;
    @component('//button[@class="btn btn__primary medium ng-star-inserted"]') public submitBtn: Button;
    @component('//span[@id="FIN-APF_APP-referenece-number"]') public tradeRef: TextInput;
    @component('//span[@id="FIN-ARF_APP-referenece-number"]') public tradeRefForSIF: TextInput;
    @component('//span[@id="FIN-LPC_APP-referenece-number"]') public psfRef: TextInput;
    @component('//*[@class="btn btn__primary medium"]') public doneBtn: Button;
    @component('//*[@id="transactionDetail-custRef-0"]') public txnCenterRef: TextInput;
    @component('//*[@id="sampling-filter"]') public filterInput: TextInput;
    @component('//dbs-input[@formcontrolname="customerReference"]') public customerRef: TextInput;

    @component('//*[@class="overview-summary__left"]') public defaultCcy: TextInput;
    @component('//*[@id="FIN-APF"]') public filterTypeAPF: Button;

    //view page
    @component('//*[@id="amount"]') public tradeAmount: TextInput;
    @component('//*[@id="invoice-amount"]') public invoiceAmountValue: TextInput;
    @component('//*[@id="FIN-APF_APP-status"]') public viewTxnStatus: TextInput;
    @component('//*[@id="FIN-ARF_APP-status"]') public TxnStatusForSIF: TextInput;
    @component('//*[@id="FIN-APF_APP-financing-type" and @class="sub-label ng-star-inserted"]') public financingType: TextInput;
    @component('//div[3]/party-info/div[2]/span') public supplierName: TextInput;
    @component('//div[@id="invoice-ewb-file"]/div[1]/span') public buyerAdress: TextInput;
    @component('//*[@id="FIN-LPC_APP-status"]') public viewPSFTxnStatus: TextInput;
    @component('//div[@id="action-template"]') public saveAsTemplateBtn: Button;
    @component('//div[@id="action-edit"]') public editBtn: Button;
    @component('//div[@id="action-copy"]') public copyBtn: Button;
    @component('//input[@placeholder="Add name here"]') public templateName: TextInput;
    @component('//div[@id="FIN-LPC_APP-relatedLc"]') public purchaseOrderReferenceValue: TextInput;
    @component('//div[1]/div[2]/div[6]/div[1]') public dueDateTitle: TextInput;
    @component('//*[@id="FIN-LPC_APP-finance-date"]') public psfDueDateValue: TextInput;
    @component('//*[@id="tradeAccount.subTitle-account-number"]') public debitAccountValue: TextInput;
    @component('//*[@class="content-label ng-star-inserted"]') public debitAccountBlankValue: TextInput;
    @component('//fin-app-regulatory-reporting[@class="ng-star-inserted"]') public regulatoryReportField: Button;
    @component('//fin-app-shipping-details/div/div/span') public shippingDetailsField: Button;
    @component('//text-area-info/div/ul/li/p') public descriptionOfServicesValue: TextInput;
    @component('//fin-app-disbursement-instruction/div/div') public disbursementInstructionField: Button;
    @component('//div[2]/div/div[2]/party-info/div[2]/span') public payeeNameValue: TextInput;
    @component('//div[@id="FIN-APF_APP-account-number"]') public reportingAccountValue: TextInput;
    @component('//div[@id="FIN-APF_APP-tax-requirements"]') public taxRequirement: TextInput;
    @component('//div[@id="FIN-APF_APP-payment-nature"]') public paymentNatureValue: TextInput;
    @component('//div[@id="FIN-APF_APP-registration-reference"]') public fullRefValue: TextInput;
    @component('//div[@id="FIN-APF_APP-registration-reporting"]') public bopCodeValue: TextInput;
    @component('//div[@id="FIN-APF_APP-registration-remark1"]') public remarksValue: TextInput;
    @component('//div[@id="FIN-APF_APP-reporting-contractNo"]') public contractNumberValue: TextInput;
    @component('//div[@id="FIN-APF_APP-contract-amount"]') public proportionValue: TextInput;
    @component('//div[@id="FIN-APF_APP-declaration-days"]') public declarationValue: TextInput;
    @component('//div[@id="FIN-APF_APP-additional-remarks"]') public additionRemarksValue: TextInput;
    @component('//span[@id="FIN-ARF_APP-finance-date"]') public dueDateValue: TextInput;
    @component('//button[@class="btn btn__primary"]') public confirmBtn: Button;
    @component('//attachment-info/div/div') public attachmentsField: Button;
    @component('//div[@id="undefined-file-name"]') public uploadFileValue: TextInput;
    @component('//instructions-bank/div/div') public instructionsToBankField: Button;
    @component('//div[@id="FIN-ARF_APP-bank-charges"]/div/span') public chargeNameValue: TextInput;
    @component('//fin-app-disbursement-instruction/div/div[2]/div/text-area-info/div[1]/ul/li/p') public disbursementOthersValue: TextInput;
    @component('//div[@id="FIN-ARF_APP-finance-value-date"]/span') public financingValueDate: TextInput;
    @component('//div[@id="FIN-APF_APP-bank-charges"]/div/span') public chargeAccountValue: TextInput;
    @component('//application-fin-page/div[3]/fin-app-disbursement-instruction/div/div/mat-icon') public disbursementSection: Button;
    @component('//fin-app-disbursement-instruction/div/div[2]/div/div[2]/party-info/div[2]') public partyName: TextInput;
    @component('//fin-app-disbursement-instruction/div/div[2]/div/div[2]/party-info/div[3]') public partyAddress: TextInput;
    @component('//*[@id="party-townCity"]') public partyTownCity: TextInput;
    @component('//*[@id="party-postalCode"]') public partyPostalCode: TextInput;
    @component('//fin-app-disbursement-instruction/div/div[2]/div/div[2]/party-info/div[3]') public partyCountry: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
       //await waitForUXLoading();
       await browser.wait(ExpectedConditions.visibilityOf(this.defaultCcy.element), this.defaultCcy.getTimeOut());
    }

    public async loadConditionForPreviewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.submitBtn.element), this.submitBtn.getTimeOut());
    }
   
    public async loadConditionForTxn() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.txnCenterRef.element), this.txnCenterRef.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.txnCenterRef.element), this.txnCenterRef.getTimeOut());
    }
    public async loadConditionForSubmit() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.invoiceAmountValue.element), this.invoiceAmountValue.getTimeOut());
    }

    public async loadConditionForSubmit2() {
        await waitForUXLoading();
        await browser.sleep(5000);
        await browser.wait(ExpectedConditions.visibilityOf(this.doneBtn.element), this.doneBtn.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.invoiceAmountValue.element), this.invoiceAmountValue.getTimeOut());
    }

    public async loadConditionForEditPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.reviewBtn.element), this.reviewBtn.getTimeOut());
    }


    public async goToViewPageViaRef(reference: string) {
        await this.loadConditionForTxn();
        await this.filterInput.input(reference);
        await this.txnCenterRef.jsClick();
        await this.loadConditionForViewPage();
    }

}
