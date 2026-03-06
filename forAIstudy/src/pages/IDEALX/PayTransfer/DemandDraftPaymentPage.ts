import {Button, component, log, IXHorizontalMenu, OptionSelect, Page, TextInput, waitForUXLoading} from "../../../lib";
import {browser, ExpectedConditions} from "protractor";

@log export class DemandDraftPaymentPage extends Page {

    constructor() {
        super();
    }

    //Create DD page
    @component('//*[@id="icon__demand-draft"]') public demandDraftPayment: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="currencySelected"]') public paymentCurrency: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="locationPayable"]') public payableCountry: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingBeneficiary: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="pickUpLocation"]') public pickupLocation: OptionSelect;
    @component('//a[@id="ux-tab-NEW"]') public newPayeeTab: Button;
    @component('//*[@name="new-payee-name"]') public payeeName: TextInput;
    @component('//input[@name="new-payee-add1"]') public payeeAddress1: TextInput;
    @component('//input[@name="new-payee-postal-code"]') public payableTo: TextInput;
    @component('//*[@id="isTransactionNote"]') public isTransactionNote: TextInput;
    @component('//dbs-textarea[@formcontrolname="transactionNote"]') public transactionNote: TextInput;
    @component('//*[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component('//*[@id="dd-view-edit"]') public edit: Button;
    //View DD page
    @component('//*[@id="domestic-view-customerReference"]') public customerReferenceValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public statusValue: TextInput;
    @component('//*[@id="dd-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="dd-view-deductAmount"]') public deductAmount: TextInput;
    @component('//*[@id="dd-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-dd-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="dd-view-newPayee-acctNum"]') public newPayeeAcctValue: TextInput;
    @component('//*[@id="dd-view-newPayee-name"]') public newPayeeNameValue: TextInput;
     @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//*[@id="dd-view-existingPayee-name"]') public existingPayeeNameValue: TextInput;
    @component('//*[@id="dd-view-payee-add1"]') public payeeAdd1Value: TextInput;
    @component('//*[@id="dd-view-payee-add2"]') public payeeAdd2Value: TextInput;
    @component('//*[@id="dd-view-payee-add3"]') public payeeAdd3Value: TextInput;
    @component('//*[@id="dd-view-paymentCcy"]') public paymentCcyValue: TextInput;
    @component('//*[@id="dd-view-payableCountry"]') public payableCountryValue: TextInput;
    @component('//*[@id="dd-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="dd-view-debitAccount"]') public chargeAccountValue: TextInput;
    @component('//*[@id="dd-view-paymentType"]') public paymentTypeValue: TextInput;
    @component('//*[@id="dd-view-sendAmount"]') public sendAmountValue: TextInput;
    @component('//*[@id="dd-view-send"]') public exchangeRate: TextInput;
    @component('//*[@id="dd-view-payee-payableTo"]') public payableToValue: TextInput;
    @component('//*[@id="dd-view-payee-chequeName"]') public payableToValue1: TextInput;
    @component('//*[@id="dd-view-payee-postalCode"]') public postalCodeValue: TextInput;
    @component('//*[@id="dd-view-deliveryMode"]') public deliveryModeValue: TextInput;
    @component('//*[@id="dd-view-mailName"]') public mailNameValue: TextInput;
    @component('//*[@id="dd-view-chequeAdd1"]') public mailAdd1Value: TextInput;
    @component('//*[@id="dd-view-chequeAdd2"]') public mailAdd2Value: TextInput;
    @component('//*[@id="dd-view-chequeAdd3"]') public mailAdd3Value: TextInput;
    @component('//*[@id="dd-view-pickupLocation"]') public pickupLocationValue: TextInput;
    @component('//*[@id="dd-view-paymentDetail"]') public paymentDetailsValue: TextInput;
    @component('//*[@id="dd-view-deductTotalAmount"]') public deductTotalAmountValue: TextInput;
    @component('//*[@id="dd-view-custRef"]') public custRefValue: TextInput;
    @component('//*[@id="dd-view-transactionNote"]') public msgToApproverValue: TextInput;
    @component('//span[@id="add1_required_Msg"]') public addr1ErrMsg: TextInput;
    @component('//div[@id="pickUpLocation_Msg"]') public pickUpLocationErrMsg: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    @component('//*[@id="dd-view-payee-chequeName"]') public payableToValueNew: TextInput;

    async loadCondition(): Promise<any> {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.customerReferenceValue.element), this.customerReferenceValue.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.hashValue.element), this.hashValue.getTimeOut());
    }
}
