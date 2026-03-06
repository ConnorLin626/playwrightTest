/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, waitForI3Loading } from '../../../lib';

@log export class StandbyLettersOfCreditPage extends Page {
    // create page
    @component('//select[@name="instrumentType" and @id="product"]') public selectProductType: HtmlSelect;
    @component('//input[@name="submit_continue"]') public continueButton: Button;
    @component('//input[@id="custRef"]') public customerRef: TextInput;
    @component('//select[@name="routingKy" and @id="routingKy"]') public selectRoute: HtmlSelect;
    @component('//select[@name="applicationType" and @id="applicationType"]') public selectApplicationType: HtmlSelect;
    @component('//input[@name="submit_save"]') public continueSaveButton: Button;
    @component('//select[@id="applicant" and @name ="transactionValue.trdTrnAddrImporter.partyId"]') public applicant: HtmlSelect;
    @component('//input[@id="bene_partyId" and @name="transactionValue.trdTrnAddrExporter.partyId"]') public benePartyId: TextInput;
    @component('//input[@id="advb_partyId" and @name="transactionValue.trdTrnAddrExporterBank.partyId"]') public advisingBankPartyId: TextInput;
    @component('//input[@id="acc_partyId" and @name="transactionValue.trdTrnAddrAccOf.partyId"]') public trdPartyID: TextInput;
    @component('//select[@name="entryOrAmendObject.sendViaCd" and @id="sendViaCd"]') public sendVia: HtmlSelect;
    @component('//input[@id="expiryDate" and @name ="entryOrAmendObject.expiryDateAsString"]') public expiryDate: TextInput;
    @component('//select[@name="transactionValue.arcIsoCurrencyCdKy" and @id="arcIsoCurrencyCdKy"]') public selectCurrency: HtmlSelect;
    @component('//input[@id="transAmount" and @name ="transactionValue.transAmountAsString"]') public amount: TextInput;
    @component('//select[@name="entryOrAmendObject.transactionDetails" and @id="transactionDetails"]') public selectDetails: HtmlSelect;
    @component('//textarea[@name="entryOrAmendObject.transactionDetailsText" and @id="transactionDetailsText"]') public details: TextInput;
    @component('//select[@name="entryOrAmendObject.debitAccNo" and @id="debitAccNo"]') public selectDebitChargeFrom: HtmlSelect;
    @component('//input[@id="contactPerson" and @name ="entryOrAmendObject.contactPerson"]') public contactPerson: TextInput;
    @component('//select[@name="entryOrAmendObject.telNumber1" and @id="telNumber1"]') public selectTelCountryCode: HtmlSelect;
    @component('//input[@id="telNumber2" and @name ="entryOrAmendObject.telNumber2"]') public telAreacode: TextInput;
    @component('//input[@id="telNumber3" and @name ="entryOrAmendObject.telNumber3"]') public telephoneNum: TextInput;
    @component('//input[@name="submit_saveEdit"]') public submitButton: Button;
    @component('//button[@id="jqi_state0_buttonYes"]') public yesButton: Button;

    //  approval page
    @component('//input[@id="txtStatusCd" and @name ="transactionValue.trdTrnCust.StatusCd"]') public applicationStatus: TextInput;
    @component('//select[@id="applicant" and @name ="transactionValue.trdTrnAddrImporter.partyId"]') public applicantValue: TextInput;
    @component('//input[@id="transAmount" and @name ="transactionValue.transAmountAsString"]') public amountValue: TextInput;
    @component('//select[@name="entryOrAmendObject.debitAccNo" and @id="debitAccNo"]') public debitChargeFromValue: TextInput;
    @component('//input[@id="submit_approve"]') public approveButton: Button;
    @component('//button[@id="jqi_state0_buttonConfirm"]') public confirmButton: Button;
    @component('//input[@id="approvePasswordTmp"]') public approvePassword: TextInput;

    //Transaction Review Detail Page
    @component('//div[@id="mainContent"]/table[2]/tbody/tr[5]/td/table[2]/tbody/tr[3]/td[4]') public currentStatus: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.continueButton.element), this.continueButton.getTimeOut());
    }

    public async loadConditionForConfirmPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.yesButton.element), this.yesButton.getTimeOut());
    }

    public async loadConditionForEditPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
    }
}