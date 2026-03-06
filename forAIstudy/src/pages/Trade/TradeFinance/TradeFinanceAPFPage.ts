/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, waitForI3Loading, RadioButton } from '../../../lib';

@log export class TradeFinanceAPFPage extends Page {

    @component('//select[@id="product"]') public selectProductType: HtmlSelect;
    @component('//select[@id="subProduct"]') public selectSubProductType: HtmlSelect;
    //Create Transaction page Continue button
    @component('//input[@name="submit_continue"]') public continueButton: Button;
    @component('//select[@id="routingKy"]') public selectRouting: HtmlSelect;
    @component('//input[@id="custRef"]') public custRef: TextInput;
    //Create Transaction Orgination page Continue button
    @component('//input[@name="submit_save"]') public continueSaveButton: Button;

    //Accounts Payable Financing(DTR/DBRP) Application detail
    @component('//select[@id="trdTrnAddrImporter.partyId.finance"]') public applicant: HtmlSelect;
    @component('//img[@id="accBrowse"]') public bene3rdPartyIDBtn: Button;
    @component('//select[@id="trdLoanType"]') public tradeLoanType: HtmlSelect;
    @component('//input[@id="relatedlc"]') public relatedlc: HtmlSelect;
    @component('//select[@id="invoicecur"]') public invoiceCcy: HtmlSelect;
    @component('//input[@id="invoiceAmt"]') public invoiceAmt: TextInput;
    @component('//*[@id="financeperiod"]') public financePeriod: TextInput;
    @component('//input[@id="supplierName"]') public supplierName: TextInput;
    @component('//select[@id="natureOfUnderlyingTrade"]') public natureOfUnderlyingTrade: HtmlSelect;
    @component('//select[@id="financingcurrency"]') public financeCcy: HtmlSelect;
    @component('//textarea[@id="descOfGood"]') public descriptionOfGoods: TextInput;
    @component('//select[@name="entryOrAmendObject.debitAccountOnMaturity"]') public debitAcctOnMaturity: HtmlSelect;
    @component('//select[@name="entryOrAmendObject.debitChargesFromAnotherAccount"]') public debitChargesFromAnotherAcct: HtmlSelect;
    @component('//input[@id="cntPerson"]') public contactPerson: TextInput;
    @component('//select[@id="telNumber1"]') public telCtrycode: HtmlSelect;
    @component('//input[@id="telNumber2"]') public telAreacode: TextInput;
    @component('//input[@id="telNumber3"]') public telNumber: TextInput;
    @component('//select[@id="attachoption"]') public attachmentsOptions: HtmlSelect;
    @component('//input[@name="submit_saveEdit"]') public submitButton: Button;
    @component('//button[@id="jqi_state0_buttonYes"]') public yesButton: Button;

    //Accounts Payable Financing(DTR/DBRP) Application View page detail
    @component('//input[@id="txtStatusCd"]') public applicationStatus: TextInput;
    @component('//select[@id="trdTrnAddrImporter.partyId.finance"]') public applicantValue: TextInput;
    @component('//input[@id="invoiceAmt"]') public invoiceAmtView: TextInput;
    @component('//select[@name="entryOrAmendObject.debitChargesFromAnotherAccount"]') public debitChargesFromAnotherAcctValue: TextInput;

    //Accounts Payable Financing(DTR/DBRP) Application Approve detail
    @component('//input[@id="submit_approve"]') public approveButton: Button;
    @component('//button[@id="jqi_state0_buttonConfirm"]') public confirmButton: Button;
    @component('//input[@id="approvePasswordTmp"]') public approvePassword: TextInput;
    //Transaction Review Detail Page
    @component('//*[@id="mainContent"]/table[2]/tbody/tr[5]/td/table[2]/tbody/tr[4]/td[4]') public currentStatus: TextInput;

    //Bene 3rd patry ID page detail
    @component('//table/tbody/tr/td[2]/input[@name="submit_select"]') public selectButton: Button;
    // @component('//div[@id="divGridSelect"]/table/tbody/tr[1]/td/input[@id="idPTY649"]') public partyID1st: RadioButton;
    @component('//div[@id="divGridSelect"]/table/tbody/tr[1]') public partyID1st: RadioButton;

    //Disbursement Instruction
	@component('//input[@id="remitbyradio"]') public remitByButton: Button;
	@component('//select[@id="remitbytypeval"]') public remitByOptions: HtmlSelect;
	@component('//input[@id="transactionValue.trdTrnAddrPayee.name"]') public payeeNameInput: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrPayee.addr1"]') public payeeAddr1Input: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrPayee.addr2"]') public payeeAddr2Input: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrPayee.addr3"]') public payeeAddr3Input: TextInput;
	@component('//select[@id="transactionValue.trdTrnAddrPayee.arcCountryCdKy"]') public payeeCountryInput: HtmlSelect;
	@component('//input[@id="entryOrAmendObject.payeeRef"]') public payeeRefInput: TextInput;
	@component('//input[@id="entryOrAmendObject.payeeAcctNo"]') public payeeACNumInput: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrPayeeBank.name"]') public payeeBankNameInput: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrPayeeBank.addr1"]') public payeeBankAddr1Input: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrPayeeBank.addr2"]') public payeeBankAddr2Input: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrPayeeBank.addr3"]') public payeeBankAddr3Input: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrPayeeBank.swiftCodeBank"]') public payeeBankSWIFTInput: TextInput;
	@component('//input[@id="inBankCheckBox"]') public inBankButton: Button;
	@component('//input[@id="transactionValue.trdTrnAddrIntermediaryBank.name"]') public inBankNameInput: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrIntermediaryBank.addr1"]') public inBankAddr1Input: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrIntermediaryBank.addr2"]') public inBankAddr2Input: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrIntermediaryBank.addr3"]') public inBankAddr3Input: TextInput;
	@component('//input[@id="transactionValue.trdTrnAddrIntermediaryBank.swiftCodeBank"]') public inBankSWIFTInput: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
    }

    public async loadConditionForBene3rdPartyPage() {
        // await browser.switchTo().window("type=acc.idlcapp");
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.selectButton.element), this.selectButton.getTimeOut());
    }

    public async loadConditionForAPFEditPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
    }

    public async loadConditionForAPFConfirmPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.yesButton.element), this.yesButton.getTimeOut());
    }

    public async loadConditionForAPFViewPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
    }
}