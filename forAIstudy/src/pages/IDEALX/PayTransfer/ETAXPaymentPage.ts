/*
 * ©Copyright ACI Worldwide, Inc. 2023
*/
import { PaymentsPages } from '../../../pages/IDEALX';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, DBSCalendarSelect, IXHorizontalMenu } from '../../../lib';

@log export class ETAXPaymentPage extends Page {
    //Create page
    @component('//dbs-toolbar/div/div[2]/p-horizontal-navigation/div/ul[2]/li[2]') public MenuRadio: Button;
    @component('//*[@id="icon__intax_payment"]') public newIntaxPayment: IXHorizontalMenu;
    @component('//p-auto-complete[@formcontrolname="taxType"]') public TaxType: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="taxState"]') public TaxState: OptionSelect;
    @component('//*[@name="city"]') public CityName: TextInput;
    @component('//*[@name="taxPinCode"]') public TaxPinCode: TextInput;
    @component('//*[@name="panNo"]') public PanNo: TextInput;
    @component('//*[@name="tinNo"]') public TinNo: TextInput;
    @component('//*[@id="tax-add-payment-button"]') public AddPaymentDetail: Button;
    @component('//p-auto-complete[@formcontrolname="assessmentYear"]') public AssessmentYear: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="taxApplicable"]') public TaxApplicable: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="typeOfPayment"]') public TypeOfPayment: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="dealerType"]') public DealerType: OptionSelect;
    @component('//*[@name="ecRcTinNo"]') public ECNo: TextInput;
    @component('//*[@name="paymentRef"]') public paymentRef: TextInput;
    @component('//*[@name="office"]') public Office: TextInput;
    @component('//*[@name="mobileNo"]') public MobileNo: TextInput;
    @component('//*[@name="financialYear"]') public financialYear: TextInput;
    @component('//*[@name="accountNumber"]') public Account: TextInput;
    @component('//*[@name="importExportCode"]') public importExportCode: TextInput;
    @component('//*[@name="importExportName"]') public importExportName: TextInput;
    @component('//*[@name="billOfEntryNumber"]') public billOfEntryNumber: TextInput;
    @component('//dbs-calendar[@formcontrolname="billOfEntryDate"]') public billOfEntryDate: DBSCalendarSelect;
    @component('//*[@name="challanNumber"]') public challanNumber: TextInput;
    @component('//p-auto-complete[@formcontrolname="portCode"]') public portCode: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="periodFromMonth"]') public periodFromMonth: OptionSelect;
    @component('//*[@name="periodFromYear"]') public periodFromYear: TextInput;
    @component('//p-auto-complete[@formcontrolname="periodToMonth"]') public periodToMonth: OptionSelect;
    @component('//*[@name="periodToYear"]') public periodToYear: TextInput;
    @component('//*[@name="formId"]') public formId: TextInput;
    @component('//p-auto-complete[@formcontrolname="months"]') public PeriodMonths: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="taxPeriod"]') public taxPeriod: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="period"]') public period: OptionSelect;
    @component('//*[@name="amountOfTds"]') public amountOfTds: TextInput;
    @component('//*[@name="fine"]') public fine: TextInput;
    @component('//*[@name="fees"]') public fees: TextInput;
    @component('//*[@name="advancePayment"]') public advancePayment: TextInput;
    @component('//*[@name="amountForfeited"]') public amountForfeited: TextInput;
    @component('//*[@name="deposit"]') public deposit: TextInput;
    @component('//*[@name="amountOfTax"]') public amountOfTax: TextInput;
    @component('//*[@name="compositionMoney"]') public compositionMoney: TextInput;
    @component('//*[@name="amountOfDutyPayable"]') public amountOfDutyPayable: TextInput;
    @component('//p-auto-complete[@formcontrolname="kptPeriod"]') public Period: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="year"]') public Year: OptionSelect;
    @component('//*[@name="orderNumber"]') public OrderNo: TextInput;
    @component('//*[@name="orderDate"]') public OrderDate: TextInput;
    @component('//*[@name="designation"]') public Designation: TextInput;
    @component('//*[@name="optionalField1"]') public OptionalField1: TextInput;
    @component('//*[@name="optionalField2"]') public OptionalField2: TextInput;
    @component('//*[@name="optionalField3"]') public OptionalField3: TextInput;
    @component('//*[@name="optionalField4"]') public OptionalField4: TextInput;
    @component('//*[@name="optionalField5"]') public OptionalField5: TextInput;
    @component('//*[@id="tax-create-optDetail_0"]') public ShowDetail: Button;
    @component('//*[@name="tax"]') public Tax: TextInput;
    @component('//*[@name="taxAmount"]') public taxAmount: TextInput;
    @component('//*[@name="surcharge"]') public Surcharge: TextInput;
    @component('//*[@name="educationCess"]') public EducationCess: TextInput;
    @component('//*[@name="interest"]') public Interest: TextInput;
    @component('//*[@name="penalty"]') public Penalty: TextInput;
    @component('//*[@name="otherAmount"]') public OtherAmount: TextInput;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public FromAccount: OptionSelect;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;

    // Preview Payment Page
    @component('//input[@name="approveNow"]') public approveNowCheckbox: Button;
    @component('//button[@name="approve"]') public approveNowBtn: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;

    // View Payment Page
    @component('//*[@id="domestic-view-customerReference"]') public headerRefValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public ViewStatus: TextInput;
    @component('//*[@id="view-tax-payAmount"]') public ViewAmount: TextInput;
    @component('//*[@id="act-view-accountNum"]') public ViewfromAccount: TextInput;
    @component('//*[@id="view-ott-newPayee"]') public toNewPayeeValue: TextInput;
    @component('//*[@id="view-tax-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="view-tax-paymentType"]') public ViewPaymentType: TextInput;
    @component('//*[@id="act-view-company-name"]') public companyNameValue: TextInput;
    @component('//*[@id="act-view-state"]') public stateValue: TextInput;
    @component('//*[@id="tax-view-city"]') public cityValue: TextInput;
    @component('//*[@id="tax-view-pin-code"]') public pinCodeValue: TextInput;
    @component('//*[@id="tax-view-panNo"]') public panCodeValue: TextInput;
    @component('//*[@id="tax-view-tanNum"]') public tanNumValue: TextInput;
    @component('//*[@id="tax-view-sendAmount"]') public sendAmountValue: TextInput;
    @component('//*[@id="tax-view-allTotalAmount"]') public totalDeductAmt: TextInput;
    @component('//*[@id="tax-view-custRef"]') public custRefValue: TextInput;
    @component('//*[@id="tax-view-transactionNote"]') public msgToApprover: TextInput;
    //@component('//datatable-scroller/datatable-row-wrapper/datatable-body-row/div[2]/datatable-body-cell[5]/div/div/div/p[3]') public FSviewPaymentType: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput; 

    @component("//button[@name='approve']") public approveButton: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component("//button[@name='reject']") public rejectButton: Button;
    @component('//input[@name="reasonForRejection"]') public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component("//*[@id='domestic-view-edit']") public editButton: Button;

    //For ID TAX
    @component('//*[@id="icon__tax"]') public taxPayment: IXHorizontalMenu;
    @component('//*[@name="billExistingCode"]') public billCode: TextInput;
    @component("//input[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//textarea[@name='transactionNote']") public transactionNote: TextInput;
    @component("//input[@name='registerCode']") public billingRegister: Button;
    @component("//input[@name='taxNpwp']") public NPWP: TextInput;
    @component("//input[@name='taxNpwpDepositor']") public NPWPDepositor: TextInput;
    @component("//input[@name='taxIdNumber']") public taxIdNumber: TextInput;
    @component("//input[@name='taxPayerName']") public payerName: TextInput;
    @component("//input[@name='taxPayerAddress']") public payerAddress: TextInput;
    @component("//input[@name='taxPayerCity']") public payerCity: TextInput;
    @component("//input[@name='accountCode']") public accountCode: TextInput;
    @component("//input[@name='depositTypeCode']") public depositTypeCode: TextInput;
    @component("//input[@name='taxSspDescription']") public SSP: TextInput;
    @component("//input[@name='taxCaseNumber']") public taxCaseNumber: TextInput;
    @component("//input[@name='taxObjectNumber']") public taxObjectNumber: TextInput;
    @component("//input[@name='taxObjectAddress']") public taxObjectAddress: TextInput;
    @component("//input[@name='taxKelurahan']") public kelurahan: TextInput;
    @component("//input[@name='taxKecamatan']") public kecamatan: TextInput;
    @component("//input[@name='taxProvinsi']") public provinsi: TextInput;


     //For View ID TAX
     @component('//*[@id="act-view-accountNum"]') public viewAccountValue: TextInput;
     @component('//ng-component/div/div[2]/div/div[1]/div[1]/div[1]/div[2]') public IDheaderRefValue: TextInput;
     @component('//*[@id="bulk-view-acctBalance"]') public balanceValue: TextInput;
     @component('//view-section-tax/div/section[1]/div[3]/span[2]') public IDpaymentDateValue: TextInput;
     @component('//*[@id="act-view-billing-org"]') public billOrgValue: TextInput;
     @component('//*[@id="act-view-billing-code"]') public billCodeValue: TextInput;
     @component('//view-section-tax/div/section[3]/div[1]/span[2]/span') public messageToApproverValue: TextInput;
     @component('//view-section-tax/div/section[3]/div[2]/span[2]') public referenceValue: TextInput;
     @component('//span[@id="tax-view-billing-kelurahan"]') public kelurahanValue: TextInput;
     @component('//span[@id="tax-view-billing-kecamatan"]') public KecamatanValue: TextInput;
     @component('//span[@id="tax-view-billing-provinsi"]') public provinsiValue: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.TaxType.element), this.TaxType.getTimeOut());
    }

    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
        await _PaymentsPages.TransferCentersPage.goToViewPaymentPageViaRef(reference);
        await this.loadConditionForViewETAXPaymentPage();
    }

    public async loadConditionForViewETAXPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.ViewfromAccount.element), this.ViewfromAccount.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.ViewStatus.element), this.ViewStatus.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.ViewPaymentType.element), this.ViewPaymentType.getTimeOut());
        await browser.sleep(1500) //wait for status field load 
    }

    public async loadConditionMyApprovalList() {
        await waitForUXLoading();
        await this.pageSwitchToUX();
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.approveButton.element),
            this.approveButton.getTimeOut()
        );
    }

    public async loadConditionForIDTax() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.FromAccount.element), this.FromAccount.getTimeOut());
    }

    public async loadConditionForViewIDTax() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewAccountValue.element), this.viewAccountValue.getTimeOut());
    }
}
