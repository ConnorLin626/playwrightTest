import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, RadioButton, waitForUXLoading, DBSCalendarSelect } from '../../../lib';


@log export class AccountTransferPage extends Page {
    constructor() {
        super();
    }

    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public paymentMenu: Button;
    //@component('//html/body/dbs-root/ng-component/div/div[2]/dbs-toolbar/div/div[2]/p-horizontal-navigation/div/ul[2]/li[2]') public page: Button;
    @component("//li[@class='page-point ng-star-inserted']") public page: Button;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[3]/button') public digiToken: Button;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[2]/input') public enterCode: TextInput;
    @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[3]/button') public authNow: Button;
    @component('//*[@id="icon__make_payment"]') public makePayment: Button;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="send-amount"]') public amount: TextInput;
    @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
    @component("//a[@id='ux-tab-NEW']") public newPayeeTab: Button;
    @component("//*[@name='new-payee-name']") public newPayeeName: TextInput;
    @component("//*[@name='new-payee-nick-name']") public newPayeeNickname: TextInput;
    @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
    @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
    @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
    @component('//dbs-radio-group[@formcontrolname="bankType"]') public payeeBank: RadioButton;
    @component('//input[@name="bankType-DBS"]') public payeeBankRadio: Button;
    @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
    @component('//p-auto-complete[@formcontrolname="selectedCountry"]') public newPayeeCountry: OptionSelect;
    @component('//*[@id="new-payee-country"]') public newPayeeCountryInput: TextInput;
    @component('//p-auto-complete/div/div[2]/ul/li[2]/div/span') public newPayeeCountrySelect: TextInput;
    @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
    @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
    @component("//input[@name='email-id-0']") public emailIdO: TextInput;
    @component("//input[@name='email-id-1']") public emailId1: TextInput;
    @component("//input[@name='email-id-2']") public emailId2: TextInput;
    @component("//input[@name='email-id-3']") public emailId3: TextInput;
    @component("//input[@name='email-id-4']") public emailId4: TextInput;
    @component("//ng-component/dbs-act-step-4/div/dbs-payee-advising/div/div/div[2]/div[2]/tabs-component/ul/li[2]") public faxTab: Button;
    @component("//input[@name='fax-area-code-0']") public faxAreaCode0: TextInput;
    @component("//p-auto-complete[@formcontrolname='ctryCode']") public faxCountryCode0: OptionSelect;
    @component("//input[@name='fax-no-0']") public faxNo0: TextInput;
    @component("//textarea[@name='adviceContent']") public message: TextInput;
    @component("//input[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
    @component("//textarea[@name='transactionNote']") public transactionNote: TextInput;
    @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
    @component("//button[@name='next']") public nextButton: Button;
    @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
    @component('//input[@name="templateName"]') public templateName: TextInput;
    @component("//button[@name='submit']") public submitButton: Button;
    @component('//button[@name="finish"]') public finishedButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;
    @component('//p-auto-complete[@formcontrolname="payeeCode"]') public payeeCode: OptionSelect;
    @component('//input[@id="useFX" and @type="checkbox"]') public useFxCheckBox: Button;
    @component('//input[@id="fx-contract-0" and @type="checkbox"]') public FXcontract0: Button;
    @component('//input[@name="fx-amount-0"]') public FXcontract0Amt: TextInput;
    @component('//input[@id="fx-contract-1" and @type="checkbox"]') public FXcontract1: Button;
    @component('//dbs-calendar[@formcontrolname="paymentDate"]') public paymentDate: DBSCalendarSelect;
    @component('//p-auto-complete[@formcontrolname="outwardRemit"]') public outwardRemit: OptionSelect;
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//multi-level-dropdown[@formcontrolname="subPurposeCode"]') public subPurposeCode: OptionSelect;
    @component("//p-auto-complete[@formcontrolname='selectedCountry']") public Country: OptionSelect;
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//button[@id='push-btn']") public pushBtnButton: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[5]/div/div') public SellCurrencyAmount: TextInput;
    @component('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/ngx-datatable/div/datatable-header/div/div[2]/datatable-header-cell[6]/div/div') public BuyCurrencyAmount: TextInput;
 
    @component("//input[@name='approveNow']") public approveNowCheckBox: Button;
    @component('//dbs-foreign-exchange/div/div/div/div[2]/fx-dol-list/div/ngx-datatable/div/div/datatable-body/datatable-selection/datatable-scroller/datatable-row-wrapper[4]/datatable-body-row/div[2]/datatable-body-cell[1]/div/div/input') public fxContract4: Button;
    @component('//*[@id="foreignExchangeStep"]/div/div[1]/div[2]/fx-dol-list/div/div[2]') public tipMessage: TextInput;
    @component('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[5]/div[2]') public ViewFXrate: Button;
    @component('//*[@id="foreignExchangeStep"]/div/div[2]/div[2]/dbs-fx-dol-book/div/div[4]/div/span[1]') public Booknow: Button;
    @component('//*[@id="mat-dialog-2"]/dbs-fx-dol-book-dialog/div/div[2]/div/button[2]') public Confirm: Button;
    @component('//p-auto-complete[@id="approverOption"]') public selectOption: OptionSelect;

    @component("//dbs-regulatory-advising-act/div/div/div[2]/div[1]/span[2]/span") public complianceCodeErrorMsg: TextInput;
    @component("//dbs-regulatory-advising-act/div/div/div[2]/div[2]/span[2]/span") public underlyingCodeErrorMsg: TextInput;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;

    @component("//retrieved-account-name-hk/div/div[2]/button") public retireveNameBtn: Button; 
    @component("//dbs-single-existing-payee/div/retrieved-account-name-hk/div/div[2]/p") public createPageRetriveName: TextInput;
    @component("//dbs-single-new-payee/div/div/retrieved-account-name-hk/div/div[2]/p") public createPageRetriveNameNewPayee: TextInput;
    @component("//dbs-single-new-payee/div/div/retrieved-account-name-hk/div/div[2]/div/p") public createPageRetrieveNameFailMsg: TextInput;    
    // Summary Section
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[3]/div') public deductAmt: TextInput;
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[4]/div/div[3]') public AmtToDeduct: TextInput;
    @component('//dbs-summary-section/div/p-sticky-panel/div[2]/div/div/div[8]/div') public TotalAmtDeduct: TextInput;

    @component('//*[@id="transferCenter-filter"]') public tranferCenterFiler: TextInput;
    @component("//*[@id='transaction-list-reference_0']") public refLink: Button;

    // View ACT Payment Page
    @component('//*[@id="act-view-customerReference"]') public headerRef: TextInput;
    @component('//*[@id="act-view-status"]') public actStatusValue: TextInput;
    @component('//*[@id="act-view-hashValue"]') public hashValue: TextInput;
    @component('//*[@id="act-view-deductAmount"]') public deductAmountValue: TextInput;
    @component('//span[@id="act-view-accountNum"]') public fromAccountValue: TextInput;
    @component('//*[@id="view-act-acctBalance"]') public balanceValue: TextInput;
    @component('//*[@id="act-view-existingPayee-acctNum"]') public toExistingPayeeAcctValue: TextInput;
    @component('//strong[@id="act-view-existingPayee-acctName"]') public toExistingPayeeNameValue: TextInput;
    @component('//*[@id="act-view-newPayee-acctNum"]') public toNewPayeeAcctValue: TextInput;
    @component('//strong[@id="act-view-newPayee-acctName"]') public toNewPayeeNameValue: TextInput;
    @component('//*[@id="act-view-payee-add1"]') public payeeAdd1: TextInput;
    @component('//*[@id="act-view-payee-add2"]') public payeeAdd2: TextInput;
    @component('//*[@id="act-view-payee-add3"]') public payeeAdd3: TextInput;
    @component('//span[@id="act-view-paymentDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="act-view-paymentType"]') public paymentType: TextInput;
    @component('//label[@id="act-view-sendAmount"]') public amountValue: TextInput;
    @component('//*[@id="fxDolViewSection"]/table/tbody/tr/td[1]') public contractRefValue: TextInput;
    @component('//dbs-view-section-act/div/section[2]/div[2]/span[2]/dbs-fx-dol-view/div/table/tbody/tr[1]/td[4]/span') public AmtToDeductValue: TextInput;
    @component('//dbs-view-section-act/div/section[2]/div[2]/span[2]/dbs-fx-dol-view/div/table/tbody/tr[2]/td[4]/span') public AmtToDeductValue1: TextInput;
    @component('//*[@id="act-view-payee-bankName"]') public payeeBankName: TextInput;
    @component('//*[@id="act-view-payee-brchName"]') public payeeBrchName: TextInput;
    @component('//*[@id="act-view-payee-bankAdd1"]') public payeeBankAdd1: TextInput;
    @component('//*[@id="act-view-payee-bankAdd2"]') public payeeBankAdd2: TextInput;
    @component('//*[@id="act-view-payee-bankAdd3"]') public payeeBankAdd3: TextInput;
    @component('//*[@id="act-view-payee-bankCity"]') public payeeBankCity: TextInput;
    @component('//*[@id="act-view-payee-bankCountry"]') public payeeBankCountry: TextInput;
    @component('//*[@id="act-view-payee-swiftBic"]') public payeeSwiftBic: TextInput;
    @component('//*[@id="act-view-payee-bankCode"]') public payeeBankCode: TextInput;
    @component('//*[@id="act-view-paymentDetail"]') public paymentDetailValue: TextInput;
    @component('//*[@id="act-view-adviceContent"]') public messageValue: TextInput;
    @component('//*[@id="act-view-emailList"]') public emailList: TextInput;
    @component('//*[@id="act-view-deductTotalAmount"]') public totalDeductValue: TextInput;
    @component('//*[@id="act-view-custRef"]') public referenceValue: TextInput;
    @component('//*[@id="act-view-transactionNote"]')public messageToApproverValue: TextInput;
    @component('//*[@id="act-view-purposeCode"]') public purposeCodeView: TextInput;
    @component('//*[@id="act-view-subPurposeCode"]') public subPurposeCodeValueView: TextInput;
    @component('//*[@id="act-view-regulatoryComplianceCode"]') public complianceCodeValue: TextInput;
    @component('//*[@id="act-view-underlyingCode"]') public underlyingCodeValue: TextInput;
    @component('//dbs-view-section-act/div/section[1]/div[5]/span[2]') public payeeInfo: TextInput;
    @component('//*[@id="act-view-newPayee-acctNum"]') public newPayeeAcctNum: TextInput;
    @component('//*[@id="act-view-payee-add1"]') public newPayeeAdd1Value: TextInput;
    @component('//*[@id="act-view-payee-add2"]') public newPayeeAdd2Value: TextInput;
    @component('//*[@id="act-view-payee-add3"]') public newPayeeAdd3Value: TextInput;
    @component('//*[@id="fxDolViewSection"]') public baseOnExchangeRate: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    @component("//*[@class='alert-tag ng-star-inserted']") public HighRisk: TextInput;
    @component("//div[@class='alert-msg']") public alertMeaasge: TextInput;
    @component('//*[text()="Effective Available Balance"]') public effectAvailabelBalanceLabel:TextInput;
    @component("//dbs-view-section-act/div/section[1]/div[5]/span[2]/strong") public viewPageRetireveName: TextInput;
    @component("//dbs-view-section-act/div/section[1]/div[6]/span[2]/strong") public viewPageRetireveNameUAT: TextInput;
    

    //Reject page
    @component("//button[@name='reject']") public rejectButton: Button;
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;

    // Edit Page
    @component('//*[@id="act-view-edit"]') public editButton: Button;

    // Copy Page
    @component('//*[@name="copy"]') public copyButton: Button;

    // View ACT Template Page
    @component('//*[@id="act-viewTemp-templateName"]') public templateNameValue: TextInput;
    @component('//*[@id="act-viewTemp-edit"]') public editTemplate: Button;
    @component('//*[@id="act-viewTemp-status"]') public actTmpStatusValue: TextInput;
    
    // Delete Page
    @component('//button[@name="delete"]') public deleteButton: Button;
    @component('//*[@id="dialogDelete"]') public deleteDialogButton: Button;

    // SAM>ACT schedule cut off time link
    @component('//a[contains(@href,"/csr/common/schedule/bom") and text()="Taiwan Account Transfer"]') public twACTScheduleLink: Button;

    // AlertOverlay page
    @component('//button[@class="btn btn__tertiary"]') public proceedButton: Button;
    @component('//button[@class="btn btn__primary"]') public cancelButton: Button;

    @component('//*[@class="mat-mdc-dialog-title mdc-dialog__title"]') public pushApprovePopUp: TextInput;

    //Third-party Platforms Page
    @component('//*[@id="nav-item-navBBTopThirdPartyPlatformsLinkText"]') public thirdPartyMenu: Button;
    @component('//*[@id="third-party-filter"]') public thirdPartyFilter: TextInput;
    @component('//third-party-list/div/table/tbody/tr/td[1]/div/p[2]') public thirdPartyLink: Button;
    @component('//third-party-section/div[2]/div/div/div/span[2]') public thirdPartyAmt: TextInput;
    @component('//third-party-section/div[2]/div/div/div/span[1]') public thirdPartyCcy: TextInput;
    @component('//third-party-section/div[3]/div/div[2]/p') public thirdPartyStatus: TextInput;
    @component('//div[@class="rejectReason ng-star-inserted"]/label[2]') public thirdPartyRejectReason: TextInput;
    @component('//third-party-section/div[3]/div/div[1]/span') public thirdPartyRef: TextInput;
    @component('//third-party-section/div[3]/div/div[3]/span') public thirdPartyReqType: TextInput;
    
    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }

    public async loadConditionForTransferCenter() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.tranferCenterFiler.element), this.tranferCenterFiler.getTimeOut());
    }

    public async loadConditionForAlertOverlay() {
        await browser.wait(ExpectedConditions.visibilityOf(this.proceedButton.element), this.proceedButton.getTimeOut());
    }
    public async loadConditionForPrevewPage() {
        // await browser.wait(ExpectedConditions.stalenessOf(this.nextButton.element), this.nextButton.getTimeOut());
        // await browser.wait(ExpectedConditions.visibilityOf(this.submitButton.element), this.submitButton.getTimeOut());
        // await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        // await browser.wait(ExpectedConditions.stalenessOf(this.submitButton.element), this.submitButton.getTimeOut());
        // await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.sleep(3000);
        await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValue.element), this.fromAccountValue.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.actStatusValue.element), this.actStatusValue.getTimeOut());
    }

    public async loadConditionForViewMoPaymentPage() {
        await waitForUXLoading();
        await browser.sleep(8000);//wait for response
        await browser.wait(ExpectedConditions.visibilityOf(this.fromAccountValue.element), this.fromAccountValue.getTimeOut()); //await browser.wait(ExpectedConditions.visibilityOf(this.actStatusValue.element), this.actStatusValue.getTimeOut());
    }

    public async loadConditionForMenu() {
        await waitForUXLoading();
        await browser.sleep(3000);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.paymentMenu.element), this.paymentMenu.getTimeOut());

    }

    public async loadConditionCreatePaymentTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.existingPayee.element), this.existingPayee.getTimeOut());
    }

    public async loadConditionViewPaymentTemplate() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.actTmpStatusValue.element), this.actTmpStatusValue.getTimeOut());
    }

    public async loadConditionForApproveNowPopUp() {
        await browser.wait(ExpectedConditions.visibilityOf(this.pushApprovePopUp.element), this.pushApprovePopUp.getTimeOut());
        //await browser.sleep(28000);//wait push respose
    }

    public async loadConditionForSaveAsDraft() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.dismissButton.element), this.dismissButton.getTimeOut());
    }
}