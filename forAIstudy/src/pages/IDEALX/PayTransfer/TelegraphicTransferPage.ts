/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, DBSCalendarSelect, FileSelect, WebComponent, ensure, RadioButton } from "../../../lib";

@log export class TelegraphicTransferPage extends Page {
    // Create page
    @component('//*[@id="icon__make_payment"]') public fastPayment: Button;

    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public paymentMenu: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="currency"]') public currency: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="currency"]') public amountCcy: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//input[@name="enterFX"]') public useFXCheckbox: Button;
    @component('//input[@name="fx-contract-0"]') public fxContract0Checkbox: Button;
    @component('//input[@name="fx-ref-0"]') public fxRef0: TextInput;
    @component('//input[@name="fx-amount-0"]') public fxAmount0: TextInput;
    @component('//*[@name="payment-date-type-CUSTOM"]') public chooseDate: Button;
    @component('//dbs-calendar[@formcontrolname="paymentDate"]') public paymentDate: DBSCalendarSelect;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="payeeCode"]') public payeeCode: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="regulatoryComplianceCode"]') public ComplianceCode: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="underlyingCode"]') public underlyingCode: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="outwardRemit"]') public outwardRemit: OptionSelect;
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//multi-level-dropdown-reskin[@formcontrolname="purposeCode"]') public purposeCodeReskin: OptionSelect;
    @component('//multi-level-dropdown-reskin[@formcontrolname="benePurposeCode"]') public RPPC: OptionSelect;
    @component('//input[@name="purposeCode"]') public purposeCodeInput: TextInput;
    @component('//input[@placeholder="Purpose code number or description"]') public filterRppc: TextInput;
    //@component('//input[@name="benePurposeCode"]') public filterRppc2: TextInput;
    @component('//*[@class="truncate-searchResult text-sm text-slate-950 flex-1"]') public selectFirstResult: TextInput;
    @component('//*[@id="select-item-CLPR - Car Loan Principal Repayment"]/span') public purposeCodeSelected: TextInput;
    @component('//*[@id="select-item-(P0502) constr. works outside India"]/span') public purposeCodeSelected2: TextInput;
     @component('//*[@id="select-item-00000 - Food and live animals"]/span') public purposeCodeSelected3: TextInput;
    @component('//multi-level-dropdown[@formcontrolname="subPurposeCode"]') public subPurposeCode: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="counterptycntryCode"]') public LocationOfService: OptionSelect;
    @component('//input[@name="caAcknowledgeNum"]') public CAAcknNumber: TextInput;
    @component('//p-auto-complete[@formcontrolname="docType"]') public DocType: OptionSelect;
    @component('//*[@name="comment"]') public DocComment: TextInput;
    @component("//button[@name='action']") public ProceedButton: Button;
    @component("//*[@id='existingTrashBinIcon']") public DocDeleteButton: Button;
    @component("//*[@class='additional-button--label']") public ShowHistoryButton: Button;
    @component('//span[@id="comment-0"]') public HistoryComment0: TextInput;
    @component('//span[@id="comment-1"]') public HistoryComment1: TextInput;
    @component('//dbs-regulatory-advising-ott/div/h2/span[1]') public purposeCodeLabel: TextInput;
    @component('//purpose-code-ott-receivingparty/div/h2/span[1]') public purposeCodeLabel2: TextInput;

    @component('//*[@id="a2Ack"]') public A2Ack: Button;
    @component('//input[@name="bank-charge-S"]') public bankChargesShared: Button;
    @component('//input[@name="bank-charge-O"]') public bankChargesOur: Button;
    @component('//input[@name="bank-charge-P"]') public bankChargesThey: Button;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='proceed']") public processButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//ng-component/div/ng-component/div/div[2]/div/div[2]/div[1]/button[3]")public approveSubmitBtn: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component("//a[@id='ux-tab-NEW']") public newPayeeTab: Button;
    //@component("/html/body/dbs-root/ng-component/div/div[3]/ng-component/div/ng-component/div/div/div/form/dbs-step-transfer-to/div/div/tabs-component/ul/li[3]") public newPayeeTab: Button;
    @component("//p-auto-complete[@formcontrolname='selectedCountry']") public Country: OptionSelect;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//*[@class="switch-label"]') public switchFormatButton: Button;
    @component('//p-auto-complete[@formcontrolname="country"]') public payeeLocation: OptionSelect;
    @component('//*[@name="townCity"]') public townCity: TextInput;
    @component('//*[@name="street-name"]') public streetName: TextInput;
    @component('//*[@name="building-number"]') public buildingNum: TextInput;
    @component('//*[@name="building-name"]') public buildingName: TextInput;
    @component('//*[@name="floor"]') public floor: TextInput;
    @component('//*[@name="room"]') public room: TextInput;
    @component('//*[@name="department"]') public department: TextInput;
    @component('//*[@name="postal-code"]') public postalCode: TextInput;
    @component('//*[@name="sub-department"]') public subDepartment: TextInput;
    @component('//*[@name="country-sub-division"]') public countrySubDivsion: TextInput;
    @component('//*[@name="town-location-name"]') public townLocationName: TextInput;
    @component('//*[@name="district-ame"]') public districtName: TextInput;
    @component('//dbs-payee-bank//div[@class="payee-bank-search"]') public payeeBankID: OptionSelect;
    @component("//input[@name='new-payee-routing-code']") public newPayeeRoutingCode: TextInput;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component("//input[@formcontrolname='saveToList']") public saveToList: Button;
    @component("//input[@name='new-payee-nick-name']") public newPayeeNickName: TextInput;
    @component("//input[@id='today_day']") public todayDay: Button;
    @component("//input[@id='set_day']") public setDay: Button;
    @component("//input[@name='intermediary-bank-isIntermediary']") public intermediaryBankIsIntermediary: Button;
    @component("//p-auto-complete[@formcontrolname='selectedIntermediaryCountry']") public intermediaryBankCountry: OptionSelect;
    @component('//dbs-intermediary-bank//div[@class="payee-bank-search"]') public intermediaryBankID: OptionSelect;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//textarea[@name='adviceContent']") public message: TextInput;
    @component("//ng-component/div/div/div/form/ng-component/dbs-tt-step-5/div/dbs-payee-advising/div/div/div[2]/div[2]/tabs-component/ul/li[2]") public faxTab: Button;
    @component("//p-auto-complete[@formcontrolname='ctryCode']") public faxCountryCode0: OptionSelect;
    @component("//input[@name='fax-area-code-0']") public faxAreaCode0: TextInput;
    @component("//input[@name='fax-no-0']") public faxNo0: TextInput;
    @component("//input[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//textarea[@name='transactionNote']") public transactionNote: TextInput;
    @component("//input[@formcontrolname='isMessageToOrderingBank']") public isMessageToOrderingBank: Button;
    @component("//textarea[@name='messageToOrderingBank']") public messageToOrderingBank: TextInput;
    @component("//button[@name='save-as-draft']") public saveAsDraft: Button;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component('//div[@id="m-challenge"]') public mchallengeText: TextInput;
    @component('//div[@id="p-challenge"]') public pchallengeText: TextInput;
    @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component('//cutoff-time-tip') public cutoffTimeTip: WebComponent;
    @component('//*[@id="MYRAdvisory"]') public Bycontinuing: Button;
    @component('//button[@name="continue"]') public continueBtn: Button;
    @component("//*[@id='cognitive-continue']") public cognitiveContinueBtn: Button;

    //For TT Page
    @component('//div[starts-with(@class, "manual clearfix")]') public enterDetailButton: Button;
    @component('//*[@name="new-payee-bank-name"]') public newPayeeBankName: TextInput;
    @component('//input[@name="new-payee-bank-add1"]') public newPayeeBankADDR1: TextInput;
    @component('//input[@name="new-payee-bank-add2"]') public newPayeeBankADDR2: TextInput;
    @component("//input[@id='bank-charge-shared']") public sharedRadio: RadioButton;
    @component("//input[@id='bank-charge-us']") public ourRadio: RadioButton;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component("//input[@id='approveNow']") public approveNowCheckBox: Button;
    @component('//input[@id="saveAsTemplate"]') public saveAsTemplateCheckbox: Button;
    @component('//*[@id="ott-view-attachDoc"]') public AddAttachmentBtn: Button;
    @component('//button[@name="confirmUpload"]') public ConfirmUploadBtn: Button;
    @component('//button[starts-with(@class, "btn btn__primary medium ng-star-inserted") and text()="Proceed to submit"]') public proceedSubmitBtn:Button;
    @component('//input[@id="digiDocFileUpload"]') public UploadfileBtn: FileSelect;
    @component('//*[@id="ott-view-caAcknowledgeNum"]') public CAAcknownumber: TextInput;
    @component('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[5]/div[2]') public ViewFXrate: Button;
    @component('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[4]/div/span[1]') public Booknow: Button;
    @component('//*[@id="mat-dialog-2"]/dbs-fx-dol-book-dialog/div/div[2]/div/button[2]') public Confirm: Button;
    @component('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/div[2]') public tipMessage: TextInput;
    @component('//dbs-foreign-exchange/div/div/div/div[2]/fx-dol-list/div/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[3]/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/input') public fxContract3: Button;
    @component('//*[@id="fx-contract-0"]') public fxContract1: Button;

    @component('//dbs-step-transfer-from/div/div/dbs-fx-contact/div/div/div[2]/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[5]/div/div') public SellCurrencyAmount: TextInput;
    @component('//dbs-step-transfer-from/div/div/dbs-fx-contact/div/div/div[2]/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[6]/div/div') public BuyCurrencyAmount: TextInput;
    
    @component('//input[contains(@id,"fx-contract-0") and @type="checkbox"]') public firstfxContract: Button;
    @component("//dbs-regulatory-advising-ott/div/div/div[2]/div[2]/span[2]/span") public complianceCodeErrorMsg: TextInput;
    @component("//dbs-regulatory-advising-ott/div/div/div[2]/div[3]/span[2]/span") public underlyingCodeErrorMsg: TextInput;
    
    @component('//*[@class="mat-mdc-dialog-title mdc-dialog__title relative"]') public updatePayeePopUp: TextInput;
    @component('//*[@type="button"]') public closBtn: Button;
    

    // Summary Section
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[3]/div') public deductAmt: TextInput;
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[4]/div/div[3]') public AmtToDeduct: TextInput;
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[8]/div') public TotalAmtDeduct: TextInput;

    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    // Edit Page
    @component('//*[@id="ott-view-edit"]') public editButton: Button;

    //Copy Page
    @component('//button[@name="copy"]') public copyButton: Button;

    // View TT Payment/Template Page
    @component('//*[@id="ott-view-customerReference"]') public referenceValue: TextInput;
    @component('//div[@id="ott-view-status"]') public transactionStatus: TextInput;
    @component('//*[@id="ott-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="account-be-deducted-value"]') public deductAmountValue: TextInput;
    @component('//span[@id="view-ott-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-ott-acctBalance"]') public balanceValue: TextInput;
    @component('//span[@id="view-ott-newPayee"]') public toAccountNumberValue: TextInput;
    @component('//*[@id="view-ott-newPayee-acctNum"]') public toNewPayeeAcctNumValue: TextInput;
    @component('//strong[@id="view-ott-newPayee-name"]') public toNewPayeeNameValue: TextInput;
    @component('//strong[@id="view-ott-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;
    @component('//*[@id="view-ott-existingPayee-acctNum"]') public toExistingPayeeAcctValue: TextInput;
    @component('//*[@id="ott-view-payee-add1"]') public payeeAdd1Value: TextInput;
    @component('//*[@id="ott-view-payee-add2"]') public payeeAdd2Value: TextInput;
    @component('//*[@id="ott-view-payee-add3"]') public payeeAdd3Value: TextInput;
    @component('//span[@id="view-ott-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="view-ott-approvalDate"]') public paymentCutOffTime: TextInput;
    @component('//*[@id="ott-view-paymentType"]') public paymentType: TextInput;
    @component('//label[@id="view-ott-sendAmount"]') public amountValue: TextInput;
    @component('//div[@id="view-ott-send"]') public exchangeRateValue: TextInput;
    @component('//li[starts-with(@class, "digidoc-uploaded")]') public digiDocUploaded: TextInput;
    @component('//*[starts-with(@class, "doc-type-label") and text()="15CA"]') public digiDocUploadedDocumentType1: TextInput;
    @component('//*[starts-with(@class, "doc-type-label") and text()="Other Supporting documents"]') public digiDocUploadedDocumentType2: TextInput;
    @component('//*[starts-with(@class, "doc-type-label") and text()="Form A2 & Declaration under Fema"]') public digiDocUploadedDocumentType3: TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[1]') public contractRefValue: TextInput;
    @component('//*[@id="label-purpose-code"]') public purposeCodeValue: TextInput;
    @component('//span[@id="label-purpose-code"]') public purposeOfPaymentView: TextInput;
    @component('//span[@id="label-bene-purpose-code"]') public ReceivingPartyPurposeCodeView: TextInput;
    @component('//dbs-view-section-ott/div/section[8]/div/span[1]/label') public RPPCLableView: TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[4]/span') public AmtToDeductValue: TextInput;
    @component('//dbs-view-section-ott/div/section[5]/span/span[2]/span[1]/label[1]') public totalDeductValue: TextInput
    @component('//*[@id="fxDolViewSection"]') public baseOnExchangeRate: TextInput;
    @component('//*[@id="ott-view-payee-bankName"]') public payeeBankName: TextInput;
    @component('//*[@id="ott-view-payee-countryName"]') public payeeBankLocation: TextInput;
    @component('//*[@id="ott-view-payee-conutryName"]') public payeeBankLocationHK: TextInput;
    @component('//*[@id="ott-view-payee-bankAdd1"]') public payeeBankAdress1: TextInput;
    @component('//*[@id="ott-view-payee-bankAdd2"]') public payeeBankAdress2: TextInput;
    @component('//*[@id="ott-view-payee-bankAdd3"]') public payeeBankAdress3: TextInput;
    @component('//*[@id="ott-view-payee-bankCity"]') public payeeBankCity: TextInput;
    @component('//*[@id="ott-view-payee-routingCode"]') public payeeBankRoutingCode: TextInput;
    @component('//*[@id="view-ott-swiftBic"]') public payeeBankSwiftBic: TextInput;
    @component('//*[@id="ott-view-interPayee-swiftBic"]') public IntermediaryBankSWIFTBIC: TextInput;
    @component('//*[@id="ott-view-interPayee-bankName"]') public IntermediaryBankName: TextInput;
    @component('//*[@id="ott-view-interPayee-bankAdd1"]') public IntermediaryBankAdress1: TextInput;
    @component('//*[@id="ott-view-interPayee-bankAdd2"]') public IntermediaryBankAdress2: TextInput;
    @component('//*[@id="ott-view-interPayee-bankAdd3"]') public IntermediaryBankAdress3: TextInput;
    @component('//*[@id="payment-details-to-payee"]') public paymentDetailValue: TextInput;
    @component('//*[@id="ott-view-adviceContent"]') public messageValue: TextInput;
    @component('//*[@id="ott-view-emailList"]') public emailList: TextInput;
    @component('//dbs-view-section-ott/div/section[4]/div[3]/span[2]/span/span/span[1]/span') public email0: TextInput;
    @component('//dbs-view-section-ott/div/section[4]/div[3]/span[2]/span/span/span[2]/span') public email1: TextInput;
    @component('//dbs-view-section-ott/div/section[4]/div[3]/span[2]/span/span/span[3]/span') public email2: TextInput;
    @component('//dbs-view-section-ott/div/section[4]/div[3]/span[2]/span/span/span[4]/span') public email3: TextInput;
    @component('//dbs-view-section-ott/div/section[4]/div[3]/span[2]/span/span/span[5]/span') public email4: TextInput;
    @component('//*[@id="ott-view-bankCharge"]') public bankChargeValue: TextInput;
    @component('//*[@id="ott-view-chargeAcct"]') public chargeAcctValue: TextInput;
    @component('//*[@id="ott-view-custRef"]') public custRefValue: TextInput;
    @component('//*[@id="ott-view-transactionNote"]') public messageToApproverValue: TextInput;
    @component('//*[@id="ott-view-messageToOrderingBank"]') public isMessageToOrderingBankValue: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput; 
    @component('//*[@id="ott-view-regulatoryComplianceCode"]') public complianceCodeValue: TextInput;
    @component('//*[@id="ott-view-underlyingCode"]') public underlyingCodeValue: TextInput;
    @component('//*[@id="ott-view-counterptycntry"]') public localOfServiceValue: TextInput;
    @component('//*[@id="ott-view-caAcknowledgeNum"]') public caAckNumValue: TextInput;
    @component("//*[@id='label-domestic-overseas']") public domesticOutwardRemittance: TextInput;
    @component("//*[@id='label-beneficiary-code']") public beneficiaryCode: TextInput;
    @component("//*[@id='ott-view-specPmtPurpose']") public specPmtPurposeValue: TextInput;
    @component("//*[@id='ott-view-isTaxFreeGoods']") public isTaxFreeGoodsValue: TextInput;
    @component("//*[@id='ott-view-pmtNature']") public pmtNatureValue: TextInput;
    @component("//*[@id='ott-view-approvalRef']") public approvalRefValue: TextInput;
    @component("//*[@id='ott-view-pmtCategory1']") public pmtCategory1Value: TextInput;
    @component("//*[@id='ott-view-seriesCode1']") public seriesCode1Value: TextInput;
    @component("//*[@id='ott-view-pmtCategory2']") public pmtCategory2Value: TextInput;
    @component("//*[@id='ott-view-seriesCode2']") public seriesCode2Value: TextInput;
    @component("//*[@id='ott-view-contractNum']") public contractNumValue: TextInput;
    @component("//*[@id='ott-view-invoiceNum']") public invoiceNumValue: TextInput;
    @component("//*[@id='ott-view-transRemark1']") public transRemark1Value: TextInput;
    @component("//*[@id='ott-view-transRemark2']") public transRemark2Value: TextInput;
    @component('//ng-component/div/div[2]/div/div[2]/information-banner/div/div/div/div[2]/p[2]') public bankRemarksValue: TextInput;
    @component('//ng-component/div/div[2]/div/div[2]/information-banner/div/div/div/div[2]/p[1]') public bankRejectSection: TextInput;
    @component("//*[@class='fx-hip-info ng-star-inserted']") public savingsMessage: TextInput;
    @component('//dbs-notification-snackbar//*[@class="dbs-snackbar__message"]') public snackbarMsg:TextInput;
    @component("//*[@class='existing-payee-details ng-star-inserted']") public PayeeDetail: TextInput;
    
	//For Alert Notifications Page
    @component('//*[@id="notification-center"]') public notificationButton: Button;
    @component('//*[@id="message-info-0"]/div/div[2]/span[1]') public MessageInfo: Button;
    @component("//*[@class='payee-new u-bg-white rounded-b-md ng-untouched ng-dirty ng-valid']") public NewUIPayeeDetail: TextInput;
    @component("//*[@class='view-account-content flex-wrap !gap-y-6']") public ViewPagePayeedetail: TextInput;


    //For ID TT
    @component('//*[@id="ott-view-residStatus"]') public residStatus: TextInput;
    @component('//*[@id="ott-view-category"]') public categoryValue: TextInput;
    @component('//*[@id="ott-view-relationship"]') public relationshipValue: TextInput;
    @component('//*[@id="ott-view-identity"]') public identityValue: TextInput;
    @component('//*[@id="ott-view-regulatoryComplianceCode"]') public regulatoryComplianceCodealue: TextInput;
   
    // View TT Tempate Page
    @component('//div[@id="ott-viewTemp-templateName"]') public templateNameValue: TextInput;

    // create TT Page from template
    @component('//p-auto-complete[@formcontrolname="payee"]/div//span') public existingPayeevalue: TextInput;

    //CNTT page Regulatory Reporting section
    @component('//p-auto-complete[@formcontrolname="counterptycntryCode"]') public counterptycntryCode: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="specPmtPurpose"]') public specPmtPurpose: OptionSelect;
    @component('//input[@id="yes"]') public isTaxFreeGoods: Button;
    @component('//p-auto-complete[@formcontrolname="pmtNature"]') public pmtNNature: OptionSelect;
    @component('//regulatory-advising-ott/div/div/div[2]/span/div/input[@id="no"]') public noTaxFreeGoods: Button;
    @component('//*[@name="ott-regulatory-advising-approve"]') public fxAppRefNum: TextInput;
    @component('//p-auto-complete[@formcontrolname="pmtCategory1"]') public pmtBOPCategory1: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="seriesCode1"]') public BOPseriesCode1: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="pmtCategory2"]') public pmtBOPCategory2: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="seriesCode2"]') public BOPseriesCode2: OptionSelect;
    @component('//input[@name="bop-amount-1"]') public BOP1Amount: TextInput;
    @component('//input[@name="bop-amount-2"]') public BOP2Amount: TextInput;
    @component('//input[@name="ott-regulatory-advising-contractNum"]') public contractNum: TextInput;
    @component('//input[@name="ott-regulatory-advising-invoiceNum"]') public invoiceNum: TextInput;
    @component('//*[@name="ott-regulatory-advising-transRemark1"]') public transRemark1: TextInput;
    @component('//input[@name="ott-regulatory-advising-advPmtAmt"]') public advPmtAmt: TextInput;
    @component('//input[@name="ott-regulatory-advising-propContractAmt"]') public propContractAmt: TextInput;
    @component('//input[@name="bp-payee-expectedDeclDays"]') public expectedDeclDays: TextInput;
    @component('//*[@name="remarks"]') public remarks: TextInput;
    @component('//p-auto-complete[@formcontrolname="transType"]') public transType: OptionSelect;
    @component('//input[@name="bp-payee-certifApprNum"]') public certifApprNum: TextInput;
    @component('//p-auto-complete[@formcontrolname="pmtNature"]') public pmtNature: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="declareCustoms"]') public declareCustoms: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="customsDeclCcy"]') public customsDeclCcy: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="trdType"]') public trdType: OptionSelect;
    @component('//input[@id="digiDocFileUpload"]') public digiDocFileUploadButton: FileSelect;
    @component('//div[@class="utilizedAmount"]/dbs-input/div/div/div/input') public utilizedAmount: TextInput;

    //MO FPS
    @component('//*[@id="domestic-view-accountNum"]') public fromAccountViewValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-acctNum"]') public toAccountNumberViewValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountViewValue: TextInput;
    @component('//div[@id="domestic-view-status"]') public transactionStatusView: TextInput;
    @component('//*[@id="domestic-view-paymentDate"]') public paymentDateViewValue: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public existingPayeeNameViewValue: TextInput;
    @component('//*[@id="domestic-view-newPayee-name"]') public newPayeeNameViewValue: TextInput;
    @component('//*[@id="domestic-view-payee-add1"]') public newPayeeNameAdd1Value: TextInput;
    @component('//*[@id="domestic-view-payee-add2"]') public newPayeeNameAdd2Value: TextInput;
    @component('//*[@id="domestic-view-edit"]') public editBtn: Button;

    
    // MO Template
    @component('//div[@id="domestic-viewTemp-templateName"]') public fpsTemplateNameValue: TextInput;
    @component('//*[@id="domestic-view-sendAmount"]') public amountViewTemplateValue: TextInput;

    //VN TT
    @component('//p-auto-complete[@formcontrolname="counterptycntryCode"]') public payeeCountry: OptionSelect;

    // SAM>TT schedule cut off time link
    // @component('//a[contains(@href,"/s1gcb/csr/common/schedule/bom") and text()="Taiwan Telegraphic Transfer"]') public twTTScheduleLink: Button;
    @component('//a[contains(@href,"/csr/common/schedule/bom") and text()="Taiwan Telegraphic Transfer"]') public twTTScheduleLink: Button;

    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }

    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.nextButton.element), this.nextButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionForViewTTPaymentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.referenceValue.element), this.referenceValue.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.hashValue.element), this.hashValue.getTimeOut());
        await browser.sleep(5000);// Waiting for status to load out
    }

    public async loadConditionForViewMOTTPaymentPage() {
        await waitForUXLoading();
        await browser.sleep(5000);//wait for response
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
    }
    public async loadConditionForEdit() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
    }
    public async loadConditionForViewTTTemplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValue.element), this.templateNameValue.getTimeOut());
    }

    public async loadConditionCreatePaymentTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.existingPayeevalue.element), this.existingPayeevalue.getTimeOut());
    }
    public async loadConditionCreatePaymentTemplate2() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
    }

    public async loadConditionForMessageInCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.uxIxErrorMsg.element), this.uxIxErrorMsg.getTimeOut());
    }
    public async loadConditionForDismissDialog() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }

    public async loadConditionForMessageInApprovalPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.approveButton.element), this.approveButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
    }

    public async loadConditionForAddAttachmentPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.ConfirmUploadBtn.element), this.ConfirmUploadBtn.getTimeOut());
    }

    public async loadConditionForViewMOFPSPaymentPage() {
        await waitForUXLoading();
        await browser.sleep(6000);//wait for response
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccountViewValue.element), this.fromAccountViewValue.getTimeOut());
    }

    public async loadConditionForViewFPSTemplatePage() {
        await waitForUXLoading();
        await browser.sleep(3000);//wait for response
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fpsTemplateNameValue.element), this.fpsTemplateNameValue.getTimeOut());
    }

    public async loadConditionForNotificationPage() {
        await waitForUXLoading();
        await browser.sleep(2000);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.MessageInfo.element), this.MessageInfo.getTimeOut());
    }


    public async createTT(fromAccount: string, inputAmount: string, existingPayee: string, paymentDetail: string, transactionNote: string, messageToOrderingBank: string) {
        let paymentReference = "";
        await this.loadCondition();
        await this.fromAccount.select(fromAccount);
        await this.amount.input(inputAmount);
        await this.existingPayee.select(existingPayee);
        await this.bankChargesShared.jsClick();
        await this.paymentDetail.input(paymentDetail);
        await this.isTransactionNote.jsClick();
        await this.transactionNote.input(transactionNote);
        await this.isMessageToOrderingBank.jsClick();
        await this.messageToOrderingBank.input(messageToOrderingBank);
        await this.nextButton.click();
        await this.loadConditionForPrevewPage();
        await this.submitButton.click();
        await this.loadConditionForSubmittedPage();
        await this.getIdealxInfoReferenceID().then(text => {
            paymentReference = text;
        });
        return paymentReference;
    }
}
