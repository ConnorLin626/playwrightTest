import { Page, component, log, Button, TextInput, OptionSelect, RadioButton, waitForUXLoading, IXHorizontalMenu } from '../../../lib';
import { browser, ExpectedConditions } from "protractor";
import { PaymentsPages } from "./index";

@log export class ChequePaymentPage extends Page {

    constructor() {
        super();
    }

    @component('//*[@id="icon__cheque_payment"]') public chequePayment: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="printAtLocation"]') public PrintAtLocation: OptionSelect;
    @component('//dbs-radio-group[@formcontrolname="transfer_priority_radio"]') public chequeTypeRadio: RadioButton;
    @component('//span[@id="viewReference"]') public referenceView: TextInput;

    //create cheque page
    @component('//input[@name="new-payee-payableTo"]') public newPrintName: TextInput;
    @component('//input[@name="payeeAmount"]') public amount: TextInput;
    @component('//*[@name="invoiceDetails"]') public InvoiceDetails: TextInput;
    @component('//bp-payee/div/div[2]/div/div/bp-payee-cheque/div/div[4]/div[2]/dbs-input/div/div/div[1]/input') public clientReference1: TextInput;
    @component('//bp-payee/div/div[2]/div/div/bp-payee-cheque/div/div[5]/span[2]/dbs-input/div/div/div[1]/input') public clientReference2: TextInput;
    @component('//bp-payee/div/div[2]/div/div/bp-payee-cheque/div/div[6]/span[2]/dbs-input/div/div/div[1]/input') public clientReference3: TextInput;
    @component('//bp-payee/div/div[2]/div/div/bp-payee-cheque/div/div[7]/span[2]/dbs-input/div/div/div[1]/input') public clientReference4: TextInput;
    @component('//*[@name="payeeDetails"]') public paymentdetails: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;

    //View page
    @component('//*[@id="bulk-view-hashValue"]') public hashValueView: TextInput;
    @component('//span[@id="bulk-view-accountNum"]') public fromAccountView: TextInput;
    @component('//*[@id="bulk-view-accountName"]') public fromAccountName: TextInput;
    @component('//*[@id="bulk-view-acctBalance"]') public acctBalanceValue: TextInput;
    @component('//*[@id="bulk-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//*[@id="bulk-view-paymentAmount"]') public deductedAmountValue: TextInput;
    @component('//*[@id="bulk-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="viewReference"]') public referenceValue: TextInput;
    @component('//*[@id="view-bulk-totalItem"]') public totalItem: TextInput;
    @component('//*[@id="view-bulk-totalAmount"]') public totalAmount: TextInput;
    @component('//*[@id="bulk-view-name_0"]') public chequeName: TextInput;
    @component('//*[@id="bulk-view-name_1"]') public chequeName2: TextInput;
    @component('//*[@id="bulk-view-nickName_0"]') public chequeNickName: TextInput;
    @component('//*[@id="bulk-view-nickName_1"]') public chequeNickName2: TextInput;
    @component('//*[@id="bulk-view-chequeNum_0"]') public chequeNum: TextInput;
    @component('//*[@id="bulk-view-chequeNum_1"]') public chequeNum2: TextInput;
    @component('//*[@id="cheque-view-acctNum_0"]') public deliveryMethod: TextInput;
    @component('//*[@id="cheque-view-acctNum_1"]') public deliveryMethod2: TextInput;
    @component('//*[@id="cheque-view-deliveryAdd_0"]') public deliveryAdd: TextInput;
    @component('//*[@id="cheque-view-deliveryAdd_1"]') public deliveryAdd2: TextInput;
    @component('//*[@id="bulk-view-amount_0"]') public payeeAmount: TextInput;
    @component('//*[@id="bulk-view-amount_1"]') public payeeAmount2: TextInput;
    @component('//*[@id="bulk-view-pendingStatus_0"]') public pendingStatus: TextInput;
    @component('//*[@id="bulk-view-pendingStatus_1"]') public pendingStatus2: TextInput;
    @component('//dbs-view-transfer-list[1]//*[@id="reference-for-payee"]') public refForPayee: TextInput;
    @component('//dbs-view-transfer-list[2]//*[@id="reference-for-payee"]') public refForPayee2: TextInput;
    @component('//*[@id="cheque-view-payableLocation_0"]') public payableLocation: TextInput;
    @component('//*[@id="cheque-view-payableLocation_1"]') public payableLocation2: TextInput;
    @component('//*[@id="cheque-view-printAtLocation_0"]') public printAtLocation: TextInput;
    @component('//*[@id="cheque-view-printAtLocation_1"]') public printAtLocation2: TextInput;
    @component('//*[@id="cheque-view-invoiceDetails_0"]') public invoiceDetails: TextInput;
    @component('//*[@id="cheque-view-invoiceDetails_1"]') public invoiceDetails2: TextInput;
    @component('//*[@id="cheque-view-clientReference1_0"]') public clientRef10: TextInput;
    @component('//*[@id="cheque-view-clientReference1_1"]') public clientRef11: TextInput;
    @component('//*[@id="cheque-view-clientReference2_0"]') public clientRef20: TextInput;
    @component('//*[@id="cheque-view-clientReference2_1"]') public clientRef21: TextInput;
    @component('//*[@id="cheque-view-clientReference3_0"]') public clientRef30: TextInput;
    @component('//*[@id="cheque-view-clientReference3_1"]') public clientRef31: TextInput;
    @component('//*[@id="cheque-view-clientReference4_0"]') public clientRef40: TextInput;
    @component('//*[@id="cheque-view-clientReference4_1"]') public clientRef41: TextInput;
    @component('//*[@id="bulk-view-paymentDetails_0"]') public paymentDetails: TextInput;
    @component('//*[@id="bulk-view-paymentDetails_1"]') public paymentDetails2: TextInput;
    @component('//div[@id="bulk-view-status_0"]') public transactionStatusValue: TextInput;
    @component('//span[@id="bulk-view-name_0"]') public printNameValue: TextInput;
    @component('//*[@id="bulk-viewTemp-optDetail_0"]') public showOptionView: Button;
    @component('//*[@id="bulk-viewTemp-optDetail_1"]') public showOptionView2: Button;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    @component('//*[@id="cheque-view-edit"]') public editButton: Button;
    @component('//*[@id="delete_"]') public deleteDetailButton: Button;
    @component('//*[@id="temp-bulk-create-optDetail_0"]') public showOptDetail_0: Button;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;

    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }

    public async addExistingPayee(name: string, amount: string, payeeRef: string) {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.BulkPaymentPage.filterExistingPayee.input(name);
        await _PaymentsPages.BulkPaymentPage.addButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(amount);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(payeeRef);
    }

    public async addNewPayee(payeeName: string,PayeeNickName:string, addrees1: string, amount: string, payeeRef: string, printName?: string ) {
        let _PaymentsPages = new PaymentsPages();
        await _PaymentsPages.BulkPaymentPage.newPayee.jsClick();
        await _PaymentsPages.BulkPaymentPage.newPayeeName.input(payeeName);
        await _PaymentsPages.BulkPaymentPage.newPayeeNickname.input(PayeeNickName);
        await _PaymentsPages.chequePaymentPage.newPrintName.input(printName);//add for AB-9011
        await _PaymentsPages.BulkPaymentPage.payeeAddress1.input(addrees1);
        await _PaymentsPages.BulkPaymentPage.newPayeeButton.click();
        await _PaymentsPages.BulkPaymentPage.amount.input(amount);
        await _PaymentsPages.BulkPaymentPage.payeeRef.input(payeeRef);
    }

    public async loadConditionForPreviewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionForViewPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountView.element), this.fromAccountView.getTimeOut());
    }
}
