/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect,FileSelect, DBSCalendarSelect, IXHorizontalMenu} from '../../../lib';

@log export class NewBankerGuaranteeIssuancePage extends Page {
    @component('//*[@id="nav-item-navBBMainTradeFinanceText"]') public tradeFinanceMenu: Button;
    @component('//*[@href="#/trade-finance/overview"]') public overViewTab: Button;
    @component('//*[@href="#/trade-finance/transactions"]') public txnTab: Button;
    @component('//*[@id="icon__trade_create_igua"]') public BGApplicationMenu: Button;
    @component('//*[@id="accout-select-arrow"]') public debitFrom: Button;
    @component('//*[@name="account-search"]') public debitFromFilter: TextInput;
    @component('//*[@id="account-List"]/div[2]/div[1]/div') public filterResult: Button;
    @component('//*[@id="Applicant-arrow"]') public tradeParty: Button;
    @component('//*[@name="Applicant-search"]/div/div/div/input') public tradePartyFilter: TextInput;
    @component('//*[@id="Applicant-List"]/div[3]/div[3]/div[1]/div') public tradePartyFilterResult: Button;
    @component('//*[@id="Beneficiary-arrow"]') public tradeBene: Button;
    @component('//*[@name="Beneficiary-search"]/div/div/div/input') public tradeBeneFilter: TextInput;
    @component('//*[@id="Beneficiary-List"]/div[4]/div[1]') public tradeBeneFilterResult: Button;
    @component('//*[@class="selected-icon Guarantee no-selected ng-star-inserted"]') public addReferenceCode: Button;
    @component('//float-ui-content/div/div[1]/div/div[3]/div/div[1]') public referenceCodeSelect: TextInput;
    @component('//*[@type="file"]') public digiDocFileUploadButton: FileSelect;
    @component('//*[@id="docFilesectionContainer"]/div/div/input') public digiDocFileUpload2Button: FileSelect;
    @component('//*[@id="guaranteeAmount-select-currency-input"]') public Amount: TextInput;
    @component('//dbs-calendar[@formcontrolname="expiryDate"]') public expireDate: DBSCalendarSelect;
    @component('//dbs-dropdown[@formcontrolname="claimPeriod"]') public claimPeriod: OptionSelect;
    @component('//*[@id="claim-period"]/div/div/div/div/div/ul/li[1]/div') public firstResult: Button;
    @component('//*[@id="autoExtension"]') public autoExtension: Button;
    @component('//*[@id="undefined-contractNumber-input"]') public contactNumber: TextInput;
    @component('//dbs-calendar[@formcontrolname="contractDate"]') public contractDate: DBSCalendarSelect;
    @component('//*[@id="contractAmount-select-currency-input"]') public contactAmount: TextInput;
    @component('//*[@id="undefined-purpose-input"]') public purpose: TextInput;
    @component('//*[@id="flag"]') public additionaInformationBtn: Button;
    @component('//*[@id="undefined-additionalInformation-input"]') public additionaInformation: TextInput;
    // @component('//*[@placeholder="Search via Bank name, branch or SWIFT BIC"]') public issueBank: TextInput;
    @component('//dbs-dropdown[@formcontrolname="deliveryMethod"]') public deliveryMethod: OptionSelect;
    @component('//*[@id="delivery-method"]/div/div/div/div/div/ul/li[1]') public deliveryMethodFilterResult: Button;
    @component('//*[@id="accout-select-arrow"]') public chargeAccount: Button;
    @component('//*[@id="account-search"]') public chargeAccountSerrch: TextInput;
    // @component('//*[@class="num"]') public chargeAccountResult: TextInput;  
    @component('//dbs-input[@formcontrolname="contactInformation_contactPerson"]') public contactPerson: TextInput;  
    @component('//dbs-input[@formcontrolname="contactInformation_contactInfo_number"]') public contactPersonNumber: TextInput;  
    @component('//*[@id="review-btn"]') public reviewBtn: Button;
    @component('//*[@id="submit-btn"]') public submitBtn: Button;
    @component('//*[@name="approve"]') public approveNowsubmitBtn: Button;
    @component('//ng-component/div/div/div/div[2]/div/div/dbs-trade-create-switch//*[@id="flag"]') public saveAsTemplateBtn: Button;
    @component('//*[@id="template-name-input"]') public templateInput: TextInput;
    @component('//*[@id="approveNowChecked"]') public approveNowBtn: Button;
    @component('//*[@name="reject"]') public confirmBtn: Button;
    @component('//*[@name="responseCode"]') public responseCode: TextInput;
    @component('//*[@class="btn btn__primary"]') public approveDialog: Button;
    @component('//*[@class="btn btn__primary medium"]') public doneBtn: Button;
    @component('//*[@name="finish"]') public finishBtn: Button;
    @component('//*[@class="overview-summary__left"]') public defaultCcy: TextInput;
    @component('//*[@id="transactionDetail-custRef-0"]') public txnCenterRef: TextInput;
    @component('//*[@id="transactionAdditionalFilter"]') public filterBtn: Button;
    @component('//*[@id="sampling-filter"]') public filterInput: TextInput;
    @component('//trade-advance-search/div/div/div[2]/dbs-form-filter/div/popper-content/div/div[1]/div/form/div/div[2]/div[2]/dbs-dropdown/div/label[2]') public filterType: TextInput;
    @component('//trade-advance-search/div/div/div[2]/dbs-form-filter/div/popper-content/div/div[1]/div/form/div/div[2]/div[2]/dbs-dropdown/div/div/div/span[2]') public clearAllForType: Button;
    @component('//*[@id="IGUA-ISS"]') public filterTypeBG: Button;

    //view page
    // @component('//*[@id="tradeReference"]') public tradeRef: TextInput;
    @component('//*[@id="IGUA-ISS_APP-referenece-number"]') public tradeRef: TextInput;
    @component('//*[@id="amount"]') public tradeAmount: TextInput;
    @component('//*[@id="IGUA-ISS_APP-status"]') public viewTxnStatus: TextInput;
    @component('//ng-component/div/div/div[2]/dbs-trade-list/div/div/table/tbody/tr/td[8]/div/p/span[2]') public txnListStatus: TextInput;
    @component('//*[@name="approve"]') public approveBtn: Button;
    @component('//*[@name="transactionReject"]') public rejectBtn: Button;
    @component('//*[@name="reject"]') public confirmRejectBtn: Button;
    @component('//*[@name="dismiss"]') public dismissBtn: Button;
    @component('//*[@name="reasonForRejection"]') public reasonForReject: TextInput;
    @component('//*[@id="action-copy"]') public copyBtn: Button;
    @component('//*[@id="action-edit"]') public editBtn: Button;
    @component('//dbs-toolbar/div/div[1]/div[1]/dbs-icon-reg/mat-icon/svg') public closeBtn: Button;
    @component('//*[@id="template-code"]') public guaranteeFormatValue: TextInput;
    @component('//igua-app-detail-info/div/div[2]/div/div[4]/div[2]/span') public purposeOfGuaranteeValue: TextInput;
    @component('//application-igua-page/div[2]/igua-app-detail-info/div/div[2]/div/div[5]/div[1]') public caseRefNumTitle: TextInput;
    @component('//*[@id="contract-number"]') public caseRefNumValue: TextInput;
    @component('//*[@class="content-main margin-bottom-0"]') public guaranteeBeneValue: TextInput;
    @component('//*[@id="section-header-title"]') public instructiontoBankSection: TextInput;
    
    // My Approve - Trade
    @component('//*[@id="nav-item-navBBTopMyApprovalsLinkText"]') public approvalMenu: Button;
    @component('//*[@id="transaction-reference_0"]') public transactionList_Reference: Button;
    @component('//*[@href="#/approvals/trade-list"]') public approvalTradeTab: IXHorizontalMenu;
    @component('//*[@class="no-record-found-title"]') public noRecord: TextInput;

    //New format
    @component('//*[@id="Guarantee-arrow"]') public guaranteeFormat: Button;
    @component('//*[@class="item-info"]') public guaranteeFormatResult: Button;
    @component('//*[@id="undefined-uenNum-input"]') public uenNum: TextInput;
    @component('//dbs-input[@formcontrolname="ebgPurpose"]//input') public purposeOfGuarantee: TextInput;
    @component('//*[@formcontrolname="bankChargeAccount"]') public bankCharge: Button;
    @component('//float-ui-content/div/div[1]/div/div[2]/div[1]/div') public bankChargeAccountSelect: TextInput;
    @component('//*[@id="flag"]') public specialiInstructionsBtn: Button;
    @component('//*[@id="specialInstruction-input"]') public specialiInstructions: TextInput;
    @component('//*[@class="info-item completed parallel"]') public viewTxnApprovedStatus: TextInput;
    @component('//application-igua-page/div[1]/div/div[2]/party-info/div[2]/span') public partyName: TextInput;
    constructor() {
        super();
    }

    public async loadCondition() {
        //await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.defaultCcy.element), this.defaultCcy.getTimeOut());
    }

    public async loadConditionForCreateBG() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.debitFrom.element), this.debitFrom.getTimeOut());
    }

    public async loadConditionForPreviewBG() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.submitBtn.element), this.submitBtn.getTimeOut());
    }

    public async loadConditionForSubmitBG() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.submitBtn.element), this.submitBtn.getTimeOut());
    }

    public async loadConditionForTxn() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.txnCenterRef.element), this.txnCenterRef.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.txnCenterRef.element), this.txnCenterRef.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.viewTxnStatus.element), this.viewTxnStatus.getTimeOut());
    }

    public async loadConditionForComplatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.doneBtn.element), this.doneBtn.getTimeOut());
    }

    public async loadConditionForMyApprovePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionList_Reference.element), this.transactionList_Reference.getTimeOut());;
    }

}
