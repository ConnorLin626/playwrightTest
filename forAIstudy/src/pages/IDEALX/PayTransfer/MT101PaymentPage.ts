import {Button, component, log, HtmlSelect, IXHorizontalMenu, OptionSelect, Page, TextInput, waitForUXLoading} from "../../../lib";
import {browser, ExpectedConditions} from "protractor";

@log export class MT101PaymentPage extends Page {

    @component('//*[@id="icon__MT101_payment"]') public mt101PaymentMenu: IXHorizontalMenu;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="currency"]') public paymentCurrency: OptionSelect;
    @component('//a[@id="ux-tab-EXISTING"]') public existingTab: Button;
    @component('//div[@class="single-view"]/div/div[2]/div[1]/button[4]') public approveBtn: Button;
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingBeneficiary: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//input[@name="fxContact"]') public fxContractReference: TextInput;
    @component('//mt101-step-5/div/mt101-regulatory-reporting/div/div/div[2]/div[1]/div/dbs-input/div/div/div/input') public regulatoryReporting1: TextInput;
    @component('//mt101-step-5/div/mt101-regulatory-reporting/div/div/div[2]/div[2]/div/dbs-input/div/div/div/input') public regulatoryReporting2: TextInput;
    @component('//mt101-step-5/div/mt101-regulatory-reporting/div/div/div[2]/div[3]/div/dbs-input/div/div/div/input') public regulatoryReporting3: TextInput;
    @component('//*[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component('//*[@id="act-view-edit"]') public edit: Button;
    @component('//*[@name="copy"]') public copy: Button;
    
    @component("//*[@id='ux-tab-NEW']/span") public newPayeeTab: Button;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component("//*[@name='new-payee-name']") public newPayeeNameInput: TextInput;
    @component("//*[@class='alert alert-error ng-star-inserted']") public nicknameMsg: TextInput;
    @component('//input[@id="saveToList" and @type="checkbox"]') public savePayee: Button;

    //view template page
    @component('//div[@id="mt101-viewTemp-status"]') public statusTemplateValue: TextInput;

    // view payment page
    @component('//*[@id="mt101-view-customerReference"]') public customerRefValue: TextInput;
    @component('//*[@id="mt101-view-status"]') public statusValue: TextInput;
    @component('//*[@id="domestic-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public deductAmountValue: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-domestic-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public newPayeeAcctNum: TextInput;
    @component('//*[@id="domestic-view-existingPayee-acctNum"]') public existingPayeeeAcctNum: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public existingPayeeName: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public newPayeeName: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//*[@formcontrolname="nickname"]') public nicknameField: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public payeeAdd1: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public payeeAdd2: TextInput;
    @component('//*[@id="domestic-view-payee-add3"]') public payeeAdd3: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="domestic-view-paymentType"]') public pmtTypeValue: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public sendAmountValue: TextInput;
    @component('//dbs-view-section-domestic/div/section[2]/div[2]/span[2]') public fxContract: TextInput;
    @component('//*[@id="domestic-view-intermediary-payee-swiftBic"]') public intermediaryBankSwiftbic: TextInput;
    @component('//*[@id="domestic-view-intermediary-payee-bankName"]') public intermediaryBankName: TextInput;
    @component('//*[@id="domestic-view-intermediary-payee-add1"]') public intermediaryBankAdd1: TextInput;
    @component('//*[@id="domestic-view-intermediary-payee-add2"]') public intermediaryBankAdd2: TextInput;
    @component('//*[@id="domestic-view-intermediary-payee-add3"]') public intermediaryBankAdd3: TextInput;
    @component('//*[@id="domestic-view-intermediary-payee-city"]') public intermediaryBankCity: TextInput;
    @component('//*[@id="domestic-view-intermediary-payee-county"]') public intermediaryBankCountry: TextInput;
    @component('//dbs-view-section-domestic/div/section[4]/span[2]/div/div[1]') public regulatoryReporting: TextInput;
    @component('//dbs-view-section-domestic/div/section[4]/span[2]/div/div[2]') public regulatoryReporting2Value: TextInput;
    @component('//dbs-view-section-domestic/div/section[4]/span[2]/div/div[3]') public regulatoryReporting3Value: TextInput;
    @component('//*[@id="domestic-view-transactionNote"]') public transactionNoteValue: TextInput;



    @component('//*[@id="domestic-view-paymentDetail"]') public paymentDetailsValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public totalDeductValue: TextInput;
    @component('//*[@id="domestic-view-bankCharge"]') public bankChargeValue: TextInput;
    @component('//*[@id="domestic-view-custRef"]') public custRef: TextInput;
    @component('//*[@id="isTransactionNote"]') public isTransactionNote: TextInput;
    @component('//dbs-textarea[@formcontrolname="transactionNote"]') public transactionNote: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name1"]') public payeeBankName	: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd1"]') public bankAdd1: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd2"]') public bankAdd2: TextInput;
    @component('//*[@id="domestic-view-payee-bankAdd3"]') public bankAdd3: TextInput;
    @component('//*[@id="domestic-view-payee-bankCity"]') public bankCity: TextInput;
    @component('//*[@id="domestic-view-payee-bankCountry"]') public bankCounty: TextInput;
    @component('//*[@id="domestic-view-existing-swiftBic"]') public swiftBic: TextInput;


    constructor() {
        super();
    }

    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }
    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.hashValue.element), this.hashValue.getTimeOut());
    }
}
