import { browser, ExpectedConditions } from 'protractor';
import {
    Page,
    component, log,
    Button,
    TextInput,
    OptionSelect,
    FileSelect,
    waitForUXLoading,
    DBSCalendarSelect,
    WebComponent
} from "../../../lib";

@log export class SinglePaymentPage extends Page {
    constructor() {
        super();
    }

    // menu
    @component('//*[@id="nav-item-navBBTopDashLinkText"]') public Dashboard: Button;
    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public PayTransferMenu: Button;
    @component('//*[@id="icon__make_payment"]') public makePayment: Button;

    // create page
    @component('//button[@name="action"]') public exitPayment: TextInput;
    @component('//*[@id="ux-tab-1"]/span') public virtualAccounts: TextInput;
    @component('//dbs-account-new') public fromAccount: TextInput;
    @component('//*[@class="charge-account-popper"]') public chargeAccounts: TextInput;
    @component('//dbs-account-list/div/div[1]/filter-component/div/div/div/input') public chargeAcctInput: TextInput;
    @component('//filter-component/div/div/div/input') public fromAcctInput: TextInput;
    @component('//*[@id="acct-id-0"]') public fromAcctSelected: TextInput;
    @component('//*[@id="acct-id-0-2"]') public fromAcctMulSelected: TextInput;
   // @component('//*[@id="acct-id-0-0"]') public fromAcctCcySelected: TextInput;
    @component('//dbs-single-existing-payee-new') public existingPayee: TextInput;
    @component('//p-auto-complete[@formcontrolname="selectedCountry"]')  public selectedCountry: OptionSelect;
    @component('//div/div[3]/div/payee-bank-reskin/div/div/div[1]/div/input') public payeeBankSearch: Button;
    @component('//input[@id="ux-bank-search-0"]') public newPayeeBankIdInput: TextInput;
    @component('//mat-dialog-container/div/div/ng-component/div/div[2]/div/div/p-typeahead-window/div/div/span/div') public bankIdValueSelect: TextInput;
    @component('//input[@name="new-payee-routing-code"]') public RoutingCode: TextInput;
    @component('//input[@name="new-payee-acct-number"]') public acctNumber: TextInput;
    @component('//*[@name="new-payee-add1"]') public add1: TextInput;
    @component('//*[@name="new-payee-add2"]') public add2: TextInput;
    @component('//input[@name="new-payee-add3"]') public add3: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public payeeNickname : TextInput;
    @component('//button[@name="Review"]') public payeeReviewBtn: Button;
    @component('//p-auto-complete[@formcontrolname="currency"]')  public fromAcctCcySelected: OptionSelect;
    @component('//button[@name="UsePayee"]') public usePayeewBtn: Button;
    @component('//input[@id="existing-payee-filter"]') public existingPayeeInput: TextInput;
    @component('//*[@id="payee-id-0"]') public payeeSelected: TextInput;
    @component('//*[@name="paymentPriorityTypetwgst"]') public globeSendSelected: Button;
    @component('//dbs-radio-group/div/dbs-radio[1]/div/label/div/div/div[2]/span/span[1]') public routingCodePromptMessage: Button;
    @component("//button[@name='payment-date-button']") public paymentDateBtn: Button;
    @component("//dbs-calendar[@formcontrolname='paymentDate']") public paymentDate: DBSCalendarSelect;
    @component('//p-auto-complete[@formcontrolname="currency"]') public paymentCcy: OptionSelect;
    @component("//dbs-radio-group[@formcontrolname='paymentPriorityType']") public paymentTypeSection: TextInput;
    @component("//input[@name='paymentPriorityTypesgtt']") public ttPaymentType: Button;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//input[@name="deduct-amount"]') public deductAmount: TextInput;
    @component('//input[@name="paymentPriorityTypehkchats"]') public HKChats: Button;
    @component('//input[@name="paymentPriorityTypehkautopay"]') public HKFPSviaBatch: Button;
    @component('//input[@id="fx-online"]') public fxOnline: Button;
    @component('//*[@class="icon-expand-arrow"]') public fxOnlineIcon: Button;
    @component('//div/div/dbs-radio-group/div/div[3]/dbs-radio/div') public fxOnlineBtn: Button;
    @component('//label[@for="fx-online"]') public fxOnlineLabel: Button;
    @component('//input[@id="gfx-rate"]') public gFxRate: Button;
    @component('//dbs-radio/div/label/div/gfx-rate-card/div/div[2]') public saveMessage: Button;
    @component('//dbs-radio/div/label/div/gfx-rate-card/div/div[1]/div[1]') public gFxRateSelect: Button;
    @component('//div[2]/div/div/dbs-radio-group/div/div[2]/dbs-radio/div') public gFxRateBtn: Button;
    @component('//*[@id="indicative-rate"]') public indicativeRate: Button;
    @component('//button[@name="view-rate"]') public viewRate: Button;
    @component("//input[@name='book-rate-items-agree']") public bookRateItemAgree: Button;
    @component("//button[@name='BookRate']") public bookRateBtn: Button;
    @component("//button[@name='confirm']") public confirmBtn: Button;
    @component("//button[@name='Confirm']") public confirmDialogBtn: Button;
    @component("//input[@id='fx-contract-0']") public fxContractCheckBox: Button;
    @component("//input[@name='fx-ref-0']") public fxRefInput: TextInput;
    @component("//input[@name='paymentPriorityTypesggiro']") public giroPaymentType: Button;
    @component("//input[@id='bank-charge-us']") public bankChargeUs: Button;
    @component("//input[@id='bank-charge-they']") public bankChargeThey: Button;
    @component('//input[@name="customerReference"]') public customerReference: TextInput;
    @component('//input[@id="isIntermediary"]') public isIntermediary: Button;
    @component('//div[@class="payee-bank-search--input"]') public intermediaryBankIdInput: TextInput;
    @component('//*[@name="intermediary-bank-id"]') public intermediaryBankIdSearch: TextInput;
    @component('//*[@class="bank-details ng-star-inserted"]') public intermediaryBankIdSelect: TextInput;
    @component('//input[@id="detailsToPayee"]') public isDetailsToPayee: Button;
    @component('//input[@id="isBeneAdvising"]') public isBeneAdvising: Button;
    @component('//input[@id="isMessageToOrderingBank"]') public isMessageToOrderingBank: Button;
    @component('//*[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component('//*[@name="paymentDetail"]') public paymentDetailForCNH: TextInput;
    @component('//input[@id="md-input-1-input"]') public IFSC: TextInput;
    @component('//*[@id="updatePayeeDetails"]') public updatePayeeDetails: Button;
    @component("//payment-detail-reskin/div/div/div[2]/div/div/dbs-input/div/div/div[1]/input") public detailsToPayee: TextInput;
    @component('//div[@id="select-item-Transportation fees / Fares"]') public purposeOfPaymentSelect2: TextInput;
    @component('//multi-level-dropdown-reskin[@formcontrolname="purposeCode"]') public purposeOfPayment: OptionSelect;
    @component('//multi-level-dropdown-reskin[@formcontrolname="gstPurposeCode"]') public gstPurposeOfPayment: OptionSelect;
    @component('//input[@placeholder="Purpose code number or description"]') public filterRppc: TextInput;
    @component('//*[@class="truncate-searchResult text-sm text-slate-950 flex-1"]') public selectFirstResult: TextInput;
    //@component('//*[@formcontrolname="gstPurposeCode"]') public purposeOfPayment: OptionSelect;
    @component('//*[@placeholder="Purpose code number or description"]') public purposeCodeSelect: OptionSelect;
    @component('//*[@id="select-item-For payments of travel expenses"]') public travelCode: Button;
    @component('//purpose-of-payment/div/div/div/div/span[1]/label') public RPPClabel: TextInput;
    
    

    @component("//additional-information-new/div/div/div[2]/div[1]/dbs-input/div/div/div[1]/input") public oldinformationline1: TextInput;
    @component("//additional-information-new/div/div/div[2]/div[2]/dbs-input/div/div/div[1]/input") public oldinformationline2: TextInput;
    @component("//additional-information-new/div/div/div[2]/div[3]/dbs-input/div/div/div[1]/input") public oldinformationline3: TextInput;
    @component("//additional-information-new/div/div/div[2]/div[4]/dbs-input/div/div/div[1]/input") public oldinformationline4: TextInput;
    @component('//additional-information-new/div/div/div[2]/div[1]/dbs-dropdown/div/label[1]') public informationline1: Button;
    @component('//additional-information-new/div/div/div[2]/div[1]/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div') public informationline1Value: Button;
    @component('//additional-information-new/div/div/div[2]/div[2]/dbs-dropdown/div/label[1]') public informationline2: Button;
    @component('//additional-information-new/div/div/div[2]/div[2]/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div') public informationline2Value: Button;
    @component('//additional-information-new/div/div/div[2]/div[3]/dbs-dropdown/div/label[1]') public informationline3: Button;
    @component('//additional-information-new/div/div/div[2]/div[3]/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div') public informationline3Value: Button;
    // //@component('//additional-information-new/div/div/div[2]/div[4]/dbs-dropdown/div/label[1]') public informationline4: Button;
    @component('//sg-tt-payment-type') public globesendSection: Button;
    @component('//textarea[@name="adviceContent"]') public adviceContent: TextInput;
    @component('//input[@placeholder="Add emails"]') public val: TextInput;
    @component('//input[@placeholder="Add emails"]') public email:TextInput;
    @component('//input[@name="email-id-0"]') public templateEmail0:TextInput;
    @component('//input[@name="bene-advising-email--input"]') public addemail: TextInput;
    @component('//textarea[@name="messageToOrderingBank"]') public messageToOrderingBank: TextInput;
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//multi-level-dropdown-reskin[@formcontrolname="purposeCode"]') public RPPC: OptionSelect;
    @component('//input[@id="tally-city"]') public purposeCodeInput: TextInput;
    @component('//*[@id="select-item-(P1002) trade comm. export/import"]') public purposeCodeSelected: TextInput;
     
    
    @component('//act-tt-payment-type') public actTTSection: Button;
    @component('//div[@class="idealx-widget payment-type"]') public eachFISCSection: Button;
    @component('//sg-domestic-payment-type') public domesticSection: Button;
    @component('//button[@name="next"]') public reviewBtn: Button;
    @component('//button[@name="action"]') public submitwithoutApprove: Button;
    @component('//button[@name="save-as-draft"]') public saveAsDraftBtn: Button;
    @component('//*[@id="digiDocFileUpload"]') public digiDocFileUploadButton: FileSelect;

    @component('//*[@class="mat-mdc-dialog-title mdc-dialog__title prompt-title"]') public errorMsgTitle: TextInput;
    @component('//*[@class="mat-mdc-dialog-content mdc-dialog__content prompt-content"]') public errorMsgContent: TextInput;
    @component('//*[@class="mat-mdc-dialog-title mdc-dialog__title relative"]') public updatePayeePopUp: TextInput;


    @component('//tw-tt-payment-type/div/div/div[1]/div/div/dbs-radio-group/div/dbs-radio[2]/div') public ttPaymentSelected: Button;
    @component('//*[@name="paymentPriorityTypetwtt"]') public twttPayment: Button;
    @component('//*[@name="paymentPriorityTypesggst"]') public gstPayment: Button;
    @component('//*[@name="paymentPriorityTypehkgst"]') public HKgsPayment: Button;
    @component('//div[@class="label-wrapper enabled"]') public gstSection: TextInput
    @component('//input[@name="act-outwardRemit"]') public remittanceTypeInput: TextInput;
    @component('//p-auto-complete/div/div[2]/ul/li/div/span') public remittanceTypeSelected: TextInput;
    @component('//multi-level-dropdown[@formcontrolname="billerServiceID"]') public billerServiceID: OptionSelect;
    @component('//*[@name="acctNum"]') public acctNum: TextInput;
    @component('//*[@name="action"]') public saveAction: TextInput;
    @component("//dbs-single-existing-payee-new/div/div/retrieved-account-name-hk/div/div/p[2]") public createPageRetriveNameNewUi: TextInput;
    @component("//single-view/div/div/div/div/view-from-to-date/div/div[2]/div[3]/span") public viewPageRetriveNameNewUi: TextInput;
    @component("//payment-account-payee/div[2]/information-banner/div/div/div/div[2]") public createPageRetrieveNameFailMsg: TextInput;
    
    //Add new payee
    @component('//div[@class="addNewPayee ng-star-inserted"]') public addNewPayee: Button;
    @component('//input[@id="new-payee-country"]') public payeeLocationInput: TextInput;
    @component('//*[@id="add-payee-new"]/div[2]/div[2]/div/p-auto-complete/div/div[2]/ul/li') public payeeLocationSelected: TextInput;
    @component('//*[@id="DBS-bank"]') public DBSBank: Button;
    @component('//div[@class="payee-bank-search--input"]') public payeeBankInput: TextInput;
    @component('//input[@name="new-payee-bank-id"]') public payeeBankIdInput: TextInput;
    @component('//div/div/p-typeahead-window/div/div[1]') public payeeBankSelected: TextInput;
    @component('//*[@id="add-payee-new"]/div[3]/div/payee-bank-reskin/div/div/div[2]') public enterManully: Button;
    @component('//*[@id="new-payee-bank-name-input"]') public newPayeeBankName: TextInput;
    @component('//*[@id="new-payee-bank-add1-input"]') public newPayeeBankAdd1: TextInput;
    @component('//*[@id="new-payee-bank-add2-input"]') public newPayeeBankAdd2: TextInput;
    @component('//input[@name="new-payee-routing-code"]') public routingCode: TextInput;
    @component('//input[@name="new-payee-acct-number"]') public accountNumber: TextInput;
    @component('//*[@name="new-payee-name"]') public payeeName: TextInput;
    @component('//*[@name="new-payee-add1"]') public payeeAdd1: TextInput;
    @component('//*[@name="new-payee-add2"]') public payeeAdd2: TextInput;
    @component('//input[@name="new-payee-add3"]') public payeeAdd3: TextInput;

    @component('//*[@class="additional"]') public addAddress: TextInput;
    @component('//*[@class="text-crimson-600 underline underline-offset-4"]') public switchFormatButton: Button;
    @component('//p-auto-complete[@formcontrolname="country"]') public payeeLocation: OptionSelect;
    @component('//*[@name="new-payee-town"]') public townCity: TextInput;
    @component('//*[@name="new-payee-streetName"]') public streetName: TextInput;
    @component('//*[@name="new-payee-buildingNumber"]') public buildingNum: TextInput;
    @component('//*[@name="new-payee-buildingName"]') public buildingName: TextInput;
    @component('//*[@name="new-payee-floor"]') public floor: TextInput;
    @component('//*[@name="new-payee-room"]') public room: TextInput;
    @component('//*[@name="new-payee-department"]') public department: TextInput;
    @component('//*[@name="new-payee-postalCode"]') public postalCode: TextInput;
    @component('//*[@name="new-payee-subDepartment"]') public subDepartment: TextInput;
    @component('//*[@name="new-payee-countrySubDivision"]') public countrySubDivsion: TextInput;
    @component('//*[@name="new-payee-townLocationName"]') public townLocationName: TextInput;
    @component('//*[@name="new-payee-districtName"]') public districtName: TextInput;

    @component('//button[@name="Review"]') public newPayeeReviewBtn: Button;
    @component('//single-add-payee-review/div/div/div[3]/label/div/span') public savePayee: Button;
    @component('//button[@name="UsePayee"]') public usePayee: Button;
    @component('//button[@name="approveLater"]') public approveLaterBtn: Button;
    @component("//*[@class='idealx-dialog__container cognitive-breaks-dialog']") public haveYouCheckDialog: WebComponent;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    @component("//*[@id='saveToList']") public saveTolist: Button;
    @component('//*[@class="btn__secondary medium !w-full ng-star-inserted"]') public retrieveNameButton: Button;
    @component('//payee-bank-routingcode-account/div/retrieved-account-name-hk/div/p[2]') public addPayeeRetrieveNameValue: Button;
    
    // review page
    @component('//button[@name="submit"]') public submitBtn: Button;
    @component('//input[@name="saveAsTemplate"]') public saveAsTemplateBtn: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component('//input[@name="approveAndSubmit"]') public approveAndSubmitBtn: TextInput;
    @component('//*[@class="idealx-dialog__container prompt-dialog"]') public beforeYouProceed: WebComponent;
    @component('//dbs-prompt-dialog/div/div[1]/h2') public beforeYouProceedTitle: TextInput;
    @component('//button[@name="dismiss"]') public cancelBtn: Button;
    @component("//*[@name='continue']") public continueProceedBtn: Button;
    @component("//*[@name='proceed']") public backToPaymentBtn: Button;
    @component('//*[@class="link-btn"]') public enterCodeManul: Button;
    @component('//*[@name="EnterManually"]') public enterManually: Button;
    
    // submit page
    @component('//span[@id="Reference"]') public reference: TextInput;
    @component('//div[@id="copy"]') public copyBtn: Button;
    @component('//div[@id="ott-view-edit"]') public editBtn: Button;

    // view page
    @component('//button[@id="viewApproveBtn"]') public approveBtn: Button;
    @component('//button[@name="reject"]') public rejectBtn: Button;
    @component('//div[@id="print-approval"]') public printApprovalBtn: Button;
    @component('//button[@name="dismiss"]') public okBtn: Button;
    @component('//button[@name="view-verify-release"]') public verifyReleaseBtn: Button;
    @component('//button[@name="verify-release"]') public verifyReleaseDialogBtn: Button;
    @component('//div[@id="delete"]') public deleteBtn: Button;
    @component('//button[@id="dialogDelete"]') public deleteDialogBtn: Button;
    @component('//span[@id="view-single-from-account"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-single-bene-name"]') public beneValue: TextInput;
    @component('//span[@id="view-single-pmt-status"]') public statusValue: TextInput;
    @component('//label[@id="view-send-amt"]') public viewAmountValue: TextInput;
    @component('//*[@id="view-fx-rate-box"]') public secureFxRateValue: TextInput;
    @component('//*[@id="view-send-ccy"]') public sendCcy: TextInput;
    @component('//*[@id="view-deduct-ccy"]') public deductCcy: TextInput;
    @component('//*[@id="view-deduct-amt"]') public deductAmt: TextInput;
    @component('//view-from-to-date/div/div[2]/div[2]/div[1]') public acctNumberView: TextInput;
    @component('//view-from-to-date/div/div[2]/div[2]/span') public payeeAcctNumberView: TextInput;
    @component('//view-from-to-date/div/div[2]/div[2]/div/span[1]') public add1View: TextInput;
    @component('//view-from-to-date/div/div[2]/div[2]/div[2]/span') public payeeAdd1View: TextInput;
    @component('//view-from-to-date/div/div[2]/div[2]/div/span[2]') public add2View: TextInput;
    @component('//view-from-to-date/div/div[2]/div[2]/div/span[3]') public add3View: TextInput;
    @component('//view-from-to-date/div/div[2]/div[3]/span') public PaymentDateView: TextInput;
    @component('//view-from-to-date/div/div[2]/div[5]/span') public HashView: TextInput;
    @component('//*[@id="view-payee-bank-name"]') public bankNameView: TextInput;
    @component('//*[@id="view-payee-bank-SWIFTBIC"]') public bankSWIFTBICView: TextInput;
    @component('//*[@id="view-payee-bank-address1"]') public bankAddress1: TextInput;
    @component('//*[@id="view-payee-bank-address2"]') public bankAddress2: TextInput;
    @component('//*[@id="view-payee-bank-city"]') public bankCity: TextInput;
    @component('//p[@class="name"]') public digiDocName: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div[1]/div[1]/span') public intermediaryBankNameValue: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div[1]/div[2]/span') public intermediaryBankLocationValue: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div[2]/div[1]/span') public intermediaryBankAddrValue: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div[2]/div[2]/span') public intermediaryBankSWIFTBICValue: TextInput;
    @component('//view-other-details/div/div[2]/div[2]/div/div[1]/div/span[1]') public paidByValue: TextInput;
    @component('//view-other-details/div/div[2]/div[2]/div/div[2]/span') public chargAccoutValue: TextInput;
    @component('//view-other-details/div/div[2]/div[3]/span') public detailToPayeeValue: TextInput; 
    @component('//view-other-details/div/div[2]/div[4]/div[1]/p') public adviceContentValue: TextInput; 
    @component('//view-other-details/div/div[2]/div[5]/div/p') public messageToOrderingBankValue: TextInput; 
    @component('//view-other-details/div/div[2]/div[2]/div/div/span') public purposeOfPaymentView: TextInput;
    @component('//view-other-details/div/div[2]/div[2]/div[2]/div/span') public PurposeCodeView: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div/div[1]/div') public paidByView: TextInput;
    @component('//view-other-details/div/div[2]/div[3]/div/div/span') public inforLine1View: TextInput;
    @component('//view-other-details/div/div[2]/div[3]/div/div[3]/span') public inforLine2View: TextInput;
    @component('//view-other-details/div/div[2]/div[4]/div/div[3]/span') public inforLine3View: TextInput;
    @component('//view-other-details/div/div[2]/div[4]/div/div[4]/span') public inforLine4View: TextInput;
    @component('//*[@id="label-additional-information0"]') public ViewBeneType: TextInput;
    @component('//*[@id="label-additional-information1"]') public ViewSourceFund: TextInput;
    @component('//*[@id="label-additional-information2"]') public ViewRelationshipBene: TextInput;
    @component('//*[@id="view-payee-routing-code"]') public routingCodeView: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div/div[2]/span') public chargView: TextInput;
    @component('//view-other-details/div/div[2]/div[2]/div[1]/div[1]/span') public overseasView: TextInput;
    @component('//view-other-details/div/div[2]/div[2]/div[1]/div[2]/span') public beneficiaryCodeView: TextInput;
    @component('//view-other-details/div/div[2]/div[3]/div/div/div/p[1]') public documentsView: TextInput;
    @component('//view-other-details/div/div[2]/div[4]/div/div/span') public purposeOfPaymentView2: TextInput;
    @component('//view-other-details/div/div[2]/div[2]/div/span') public purposeOfPaymentView3: TextInput;
    @component('//view-other-details/div/div[2]/div[2]/div/span') public purposeOfPaymentView4: TextInput;
    @component('//span[@class="label ng-star-inserted"]') public payeeAccountValue: TextInput;
    @component('//div[@class="other-details-title"]') public otherDetail: TextInput;
    @component('//view-message-to-approver') public messageToApprover: TextInput;
    @component('//view-other-details/div/div/label') public otherDetailTitle: TextInput;
    @component('//*[@id="view-payee-location"]') public bankLocationValue: TextInput;
    @component('//*[@id="view-payee-routing-code"]') public routingCodeValue: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div/div[1]/div/span[1]') public chargeValue: TextInput;
    @component('//view-other-details/div/div[2]/div[2]/div[2]/div/span') public purposeCodeValue: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div[2]/div/span') public purposeCodeACTValue: TextInput;
    @component('//view-other-details/div/div[2]/div[3]/div/div/span') public RPPCValue: TextInput;
    @component('//view-other-details/div/div[2]/div[5]/span') public paymentDetailValue: TextInput; 
    @component('//view-other-details/div/div[2]/div[7]/div/p') public messageValue: TextInput;
    @component('//view-other-details/div/div[2]/div[4]/span') public gstDetailTopayee: TextInput;
    @component('//*[@class="email ng-star-inserted"]') public emailValue: TextInput;
    @component('//view-other-details/div/div[2]/div[1]/div/div/span') public bankRemarks : TextInput;
    @component('//payment-workflow/div/div[4]/div/div/div/p') public workflowRejectReason : TextInput;
    
    //For IN Tax
    @component('//span[@class="speed_content"]') public TaxType: TextInput;
    @component('//*[@id="view-intax-from-account"]') public taxFromAccountValue: TextInput;
    @component('//*[@id="view-intax-bene-name"]') public taxBeneValue: TextInput;
    @component('//*[@id="view-intax-pmt-status"]') public taxStatusValue: TextInput;
    @component('//*[@id="view-intax-bene-num"]') public taxBeneNmValue: TextInput;


    // recall page
    @component('//div[@id="recallPayment"]') public recallPaymentBtn: Button;
    @component('//*[@class="acct-num"]') public AcctSelected: TextInput;
    @component('//p-auto-complete[@formcontrolname="stopPaymentReason"]')  public stopPaymentReasonSelect: OptionSelect;
    @component('//button[@class="btn btn__primary medium"]') public nextBtn :Button
    @component('//html/body/dbs-root/ng-component/div/div[3]/ng-component/div/ng-component/div/div[3]/div[3]/div/button[2]') public submitButton :Button
    @component('//button[@name="finish"]') public doneBtn :Button
    @component('//div[@class="ref-info"]') public referenceNum: TextInput;
    @component('//div[@id="stp-view-status"]') public status: TextInput;
    @component('//button[@id="stopRecall-view-customerReference"]') public txnReferenceNo: TextInput;
    @component('//span[@id="stopRecall-view-pmttype"]') public transactionType: TextInput;

    // reject dialog
    @component('//input[@name="reasonForRejection"]') public rejectReason: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;

    // approval dialog
    @component('//button[@name="get-challenge"]') public getChallengeBtn: Button;



    @component('//p-auto-complete[@id="approverOption"]') public approverOption: OptionSelect;
    @component('//input[@name="responseCode"]') public responseCode: TextInput;
    @component('//dbs-manual-auth-dialog/div/div[2]/form/div/div[2]/button') public approvalDialogBtn: Button;

    // view TT template page
    @component('//div[@id="ott-viewTemp-templateName"]') public templateNameValue: TextInput;
    @component('//span[@id="view-ott-accountNum"]') public acctNmValue: TextInput;
    @component('//label[@id="view-ott-sendAmount"]') public amountValue: TextInput;

    //view eACH template page
    @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameValueOfEach: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public acctNmValueOfEach: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public amountValueofEach: TextInput;

    //view chats tempate page
    @component('//div[@id="domestic-viewTemp-templateName"]') public templateNameValueOfChats: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public acctNmValueOfChats: TextInput;
    @component('//label[@id="domestic-view-sendAmount"]') public amountValueofChats: TextInput;
    @component('//*[@id="domestic-view-existingPayee-acctNum"]') public payeeAcctValue: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public payeeNameValue: TextInput;
    
    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
        await browser.sleep(4000);
    }

    public async loadConditionForFX() {
        await waitForUXLoading();
        await browser.sleep(3000);
    }

    public async loadConditionForReviewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.reviewBtn.element), this.reviewBtn.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.submitBtn.element), this.submitBtn.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
    }

    public async loadConditionForReviewPayeePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.usePayee.element), this.usePayee.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.usePayee.element), this.usePayee.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await browser.sleep(8000);
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.submitBtn.element), this.submitBtn.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.reference.element), this.reference.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.reference.element), this.reference.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.reference.element), this.reference.getTimeOut());
        await browser.sleep(5000);// Waiting for status to load out
    }
    
    public async loadConditionForRecallPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.AcctSelected.element), this.AcctSelected.getTimeOut());
        await browser.sleep(4000);
    }

    public async loadConditionForReviewRecallPage() {
        await browser.sleep(3000);
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
    }

    public async loadConditionForSubmitRecallPage() {
        await browser.sleep(3000);
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.doneBtn.element), this.doneBtn.getTimeOut());
    }

    public async loadConditionForViewRecallPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.referenceNum.element), this.referenceNum.getTimeOut());
        await browser.sleep(3000);// Waiting for status to load out
    }

    public async loadConditionForTTACTSectionPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.actTTSection.element), this.actTTSection.getTimeOut());
    }
    public async loadConditionForDomesticSectionPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.domesticSection.element), this.domesticSection.getTimeOut());
    }

    public async loadConditionForglobesendSectionPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.globesendSection.element), this.globesendSection.getTimeOut());
    }

    
    public async loadConditionForViewTTTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValue.element), this.templateNameValue.getTimeOut());
    }

    public async loadConditionForBankSearch(){
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.payeeBankSelected.element), this.payeeBankSelected.getTimeOut());
    }
    public async loadConditionEachFISCSection(){
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.eachFISCSection.element), this.eachFISCSection.getTimeOut());
    }
    public async loadConditionForViewEachTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValueOfEach.element), this.templateNameValueOfEach.getTimeOut());
    }
    public async loadConditionForGstSection(){
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.gstSection.element),this.gstSection.getTimeOut());
    }
}


