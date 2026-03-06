/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Page, TextInput, Button, OptionSelect, ensure } from '../../../lib';
import * as utils from '../../../lib/utils';
import { PaymentsPages } from '../../../pages/IDEALX';

@log export class PartnerBankPaymentPage extends Page {
    @component('//*[@id="icon__payment_via_partner_bank"]') public partnerBankMenu: Button;
    @component('//p-auto-complete[@formcontrolname="countrySelected"]') public partnerBankCountry: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccountOLD: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="ptnbnkPmtSelect"]') public ptnBnkPaymentType: OptionSelect;
    @component('//*[@name="newPayeeNickName"]') public payeeNickName: TextInput;
    @component('//input[@name="newPayeeName"]') public newPayeeName: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//input[@name="newPayeePayeeId"]') public newPayeePayeeId: TextInput;
    @component('//input[@name="newPayeeAcctNum"]') public newPayeeAcctNum: TextInput;
    @component('//button[@name="addPayee"]') public addPayeeBtn: Button;
    @component('//input[@name="payeeAddress"]') public payeeAddress: TextInput;
    @component('//input[@name="payeeZipCode"]') public payeeZipCode: TextInput;
    @component('//input[@id="savePayee"]') public savePayeeBtn: Button;
    @component('//input[@name="payeeAmount"]') public amount: TextInput;
    @component('//*[@class="hide-option hide-option-layout"]') public showOption: Button;
    @component('//*[@name="bp-payee-remarks2"]') public beneRef: TextInput;
    @component('//*[@name="bp-payee-remarks3"]') public bankInfo: TextInput;
    @component('//*[@name="bp-payee-address1"]') public payeeAddress1: TextInput;
    @component('//*[@id="trashBinIcon"]') public deleteIcon: Button;
    @component('//input[@name="bp-payee-amount"]') public PHPamount: TextInput;
    @component('//*[@name="bp-payee-clientRefNum"]') public clientRefNum: TextInput;
    @component('//*[@name="transactionRef"]') public txnRef: TextInput;
    @component('//p-auto-complete[@formcontrolname="servicesType"]') public PurposeCode: OptionSelect;
    @component('//*[@name="customer-reference"]') public customerRef: TextInput;
    @component('//button[@name="next"]') public nextButton: Button;
    @component('//button[@name="Submit"]') public submitButton: Button;
    @component('//button[@name="save-as-draft"]') public saveAsDraftButton: Button;
    @component('//button[@name="finish"]') public finishButton: Button;
    @component('//*[@name="selectedPayeeBank"]') public payeeBankID: TextInput;
    @component('//*[@class="search-result-container"]/div[1]') public payeeBankResult: Button;
    @component('//input[@name="ptnbnk-search"]') public filterExistingPayee: TextInput;
    @component('//button[@name="addButton"]') public addExistingPayeeBtn: Button;
    @component('//*[@id="ptnbnk-view-edit"]') public editButton: Button;
    @component('//div[@id="m-challenge"]') public mChallengeText: TextInput;
    @component('//div[@id="labelEnterChallenge"]') public withoutMChallengeText: TextInput;
    @component("//button[@name='Approve']") public approveButton: Button;
    @component('//button[@name="Copy"]') public copyButton: Button;
    //button at Create Screen
    @component("//button[@name='Delete']") public deleteButton: Button;
    //button at dialog
    @component("//button[@name='delete']") public deleteDialogButton: Button;
    //button at Create Screen
    @component("//button[@name='Reject']") public rejectButton: Button;
    //button at dialog
    @component("//button[@name='reject']") public rejectDialogButton: Button;
    @component("//input[@name='reasonForRejection']") public reason4RejectionButton: TextInput;

    // view page
    @component('//*[@id="ptnbnk-view-hashValue"]') public hashValueView: TextInput;
    @component('//span[@id="ptnbnk-view-fromAccount"]') public fromAccountView: TextInput;
    @component('//*[@id="ptnbnk-view-acctBalance"]') public balanceView: TextInput;
    @component('//*[@id="ptnbnk-view-payer-organisationId"]') public corporateIdView: TextInput;
    @component('//*[@id="ptnbnk-view-payer-organisationName"]') public corporateNameView: TextInput;
    @component('//*[@id="ptnbnk-view-payer-acctName"]') public acctNameView: TextInput;
    @component('//*[@id="ptnbnk-view-payer-addressLine1"]') public payerAdd1: TextInput;
    @component('//*[@id="ptnbnk-view-payer-addressLine2"]') public payerAdd2: TextInput;
    @component('//*[@id="ptnbnk-view-payer-addressLine3"]') public payerAdd3: TextInput;
    @component('//span[@id="ptnbnk-view-payAmt"]') public amountView: TextInput;
    @component('//span[@id="paymentDate"]') public paymentDateView: TextInput;
    @component('//*[@id="ptnbnk-view-paymentType"]') public paymentTypeView: TextInput;
    @component('//*[@id="ptnbnk-view-bankChargeType"]') public bankChargeTypeView: TextInput;
    @component('//*[@id="ptnbnk-view-chargeAccount"]') public chargeAcct: TextInput;
    @component('//*[@id="ptnbnk-view-custRef"]') public customerRefView: TextInput;
    @component('//*[@id="ptnbnk-view-internalRef"]') public internalRefView: TextInput;
    @component('//span[@id="status"]') public statusLableView: TextInput;
    @component('//*[@id="ptnbnk-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="ptnbnk-view-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="ptnbnk-view-paymentType"]') public paymentType: TextInput;
    @component('//*[@id="bulk-view-paymentAmount"]') public totalAmountValue: TextInput;
    @component('//*[@id="ptnbnk-view-payer-acctName"]') public acctNameValue: TextInput;
    @component('//*[@id="ptnbnk-view-chargeAccount"]') public chargeAccountValue: TextInput;
    @component('//*[@id="ptnbnk-view-custRef"]') public referenceValue: TextInput;
    @component('//span[@id="ptnbnk-view-bankChargeType"]') public bankCharge: TextInput;
    @component('//*[@id="ptnbnk-view-payeeId_0"]') public payeeIDView: TextInput;
    @component('//*[@id="ptnbnk-view-pendingStatus_0"]') public pendingStatusView: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component('//ng-component/div/div[2]/ptnbnk-view-summary-section/div[3]/div[1]/div[3]/span[2]') public paymentSummaryValue: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;

    //payee 1
    @component('//strong[@id="ptnbnk-view-name_0"]') public payeeNameView: TextInput;
    @component('//*[@id="ptnbnk-view-nickname_0"]') public payeeNickNameView: TextInput;
    @component('//*[@id="ptnbnk-view-payee-bankName_0"]') public payeeBankNameView: TextInput;
    @component('//*[@id="ptnbnk-view-payee-bankSwiftBic_0"]') public payeeSwiftBicView: TextInput;
    @component('//*[@id="ptnbnk-view-acctNum_0"]') public payeeAcctNumView: TextInput;
    @component('//*[@id="ptnbnk-view-amount_0"]') public payeeAmtView: TextInput;
    @component('//*[@id="ptnbnk-view-servicesType_0"]') public payeeServiseTypeiew: TextInput;
    @component('//*[@id="ptnbnk-view-transactionRef_0"]') public payeeTransRefView: TextInput;
    @component('//*[@id="ptnbnk-view-printInvoice_0"]') public payeePrintInvoiceView: TextInput;
    @component('//*[@id="ptnbnk-view-printCreditAdvice_0"]') public payeePrintCreditAdviceView: TextInput;
    @component('//*[@id="ptnbnk-view-ptnbnkDeliveryMode_0"]') public payeeDeliveryModeView: TextInput;
    @component('//*[@id="ptnbnk-view-beneNotification_0"]') public payeeBeneNotFicaView: TextInput;
    @component('//*[@id="ptnbnk-view-beneNotificationKey_0"]') public payeeBenNotFicaKeyView: TextInput;
    @component('//*[@id="ptnbnk-view-ptnbnkRemark_0"]') public payeeRemarkView: TextInput;
    @component('//*[@id="ptnbnk-view-mediaClearingCycle_0"]') public payeeMedCleCycleView: TextInput;
    @component('//*[@id="ptnbnk-view-whtAmt_0"]') public payeeWhtAmtView: TextInput;
    @component('//*[@id="ptnbnk-view-invoiceNumber_0"]') public payeeInvoiceNumView: TextInput;
    @component('//*[@id="ptnbnk-view-invoiceAmount_0"]') public payeeInvocieAmtView: TextInput;
    @component('//*[@id="ptnbnk-view-invoiceDate_0"]') public payeeInvoiceDateView: TextInput;
    @component('//*[@id="ptnbnk-view-invoiceDes_0"]') public payeeInvoiceDesView: TextInput;
    @component('//*[@id="ptnbnk-view-poNumber_0"]') public payeePoNumView: TextInput;
    @component('//*[@id="ptnbnk-view-vatAmt_0"]') public payeeVatAmtView: TextInput;
    @component('//*[@id="ptnbnk-view-payeChargeAmt_0"]') public payeeChargeAmtView: TextInput;
    @component('//*[@id="ptnbnk-view-printLanguage_0"]') public payeePriLanguageView: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.partnerBankCountry.element), this.partnerBankCountry.getTimeOut());
    }

    public async loadCondition4Preview() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadCondition4Submitted() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
    }

    public async loadCondition4View() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.statusLableView.element), this.statusLableView.getTimeOut());
    }

    public async addNewPayee(newPayeeName: string, newPayeePayeeId: string, newPayeeAcctNum: string): Promise<void> {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.CrossBoarderACHPage.newPayeePtnbnkTab.click();
        await this.newPayeeName.input(newPayeeName);
        await this.payeeNickName.input('newPayeeNickname');
        await this.newPayeePayeeId.input(newPayeePayeeId);
        await this.newPayeeAcctNum.input(newPayeeAcctNum);
        await this.addPayeeBtn.click();
    }

    public async addExistingPayee(testDate: string): Promise<void> {
        await this.filterExistingPayee.input(testDate);
        await this.addExistingPayeeBtn.click();
    }
}