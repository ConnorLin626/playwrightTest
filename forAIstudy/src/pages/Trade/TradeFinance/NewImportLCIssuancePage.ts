/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading, OptionSelect,FileSelect, DBSCalendarSelect, IXHorizontalMenu, RadioButton} from '../../../lib';

@log export class NewImportLCIssuancePage extends Page {
    @component('//*[@id="nav-item-navBBMainTradeFinanceText"]') public tradeFinanceMenu: Button;
    @component('//*[@href="#/trade-finance/overview"]') public overViewTab: Button;
    @component('//*[@href="#/trade-finance/transactions"]') public txnTab: Button;
    @component('//*[@id="icon__trade_create_idlc"]') public IDLCApplicationMenu: Button;
    @component('//*[@id="accout-select-arrow"]') public debitFrom: Button;
    @component('//*[@name="account-search"]') public debitFromFilter: TextInput;
    @component('//*[@id="account-List"]/div[2]/div[1]/div') public filterResult: Button;
    @component('//*[@id="Applicant-arrow"]') public tradeParty: Button;
    @component('//*[@name="Applicant-search"]/div/div/div/input') public tradePartyFilter: TextInput;
    @component('//*[@id="Applicant-List"]/div[3]/div[3]/div[1]/div') public tradePartyFilterResult: Button;
    @component('//*[@id="Beneficiary-arrow"]') public tradeBene: Button;
    @component('//*[@name="Beneficiary-search"]/div/div/div/input') public tradeBeneFilter: TextInput;
    @component('//*[@id="Beneficiary-List"]/div[3]/div[1]') public tradeBeneFilterResult: Button;
    @component('//*[@id="letterCreditAmount-select-currency-input"]') public Amount: TextInput;
    @component('//dbs-calendar[@formcontrolname="expiryDate"]') public expireDate: DBSCalendarSelect;
    @component('//dbs-dropdown[@formcontrolname="expiryLocation"]') public expireLocation: OptionSelect;t;
    @component('//*[@id="swift-121003"]') public beneBank: TextInput;
    @component('//*[@class="list-item ng-star-inserted"]') public beneBankResult: Button;
    @component('//dbs-dropdown[@formcontrolname="availableWith"]')  public availableWith: OptionSelect;
    @component('//dbs-dropdown[@formcontrolname="availableBy"]')  public availableBy: OptionSelect;
    @component('//idlc-available-with/div/div[1]/div[2]/div/div[2]/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div[1]')  public availableByValue: Button;
    @component('//*[@value="F"]')  public fixedMaturity : RadioButton;
    @component('//dbs-calendar[@formcontrolname="tenor_tenorDate"]') public tenorDate: DBSCalendarSelect;
    @component('//dbs-dropdown[@formcontrolname="partialShipment"]') public partialShipment: OptionSelect;
    @component('//dbs-dropdown[@formcontrolname="transShipment"]') public transShipment: OptionSelect;
    @component('//dbs-dropdown[@formcontrolname="shipment_terms"]') public shipmentTerms: OptionSelect;
    @component('//idlc-shipping-instruction/div/div[4]/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div[1]') public shipmentTermsReslut: OptionSelect;
    @component('//dbs-calendar[@formcontrolname="shipment_date"]') public shipmentDate: DBSCalendarSelect;
    @component('//dbs-input[@formcontrolname="shipment_presentationDays"]//input') public presentationDays: TextInput;
    @component('//dbs-dropdown[@formcontrolname="shipment_presentationPeriod"]/div') public presentationPeriod: OptionSelect;
    @component('//dbs-textarea[@formcontrolname="shipment_descriptionGoods"]//textarea') public descriptionGoods: TextInput;
    @component('//dbs-dropdown[@formcontrolname="shipment_transportBySeaOrAir"]') public transportBySeaOrAir: OptionSelect;
    @component('//idlc-shipment-detail/div/div[3]/dbs-dropdown/div/div/div/div/div/ul/li[1]/div/div[1]') public transportBySeaOrAirValue: Button;
    @component('//dbs-input[@formcontrolname="shipment_placeOfDispatchOrReceipt"]//input') public placeOfDispatchOrReceipt: TextInput;
    @component('//dbs-input[@formcontrolname="shipment_loadingDestination"]//input') public loadingDestination: TextInput;
    @component('//dbs-input[@formcontrolname="shipment_dischargeDestination"]//input') public dischargeDestination: TextInput;
    @component('//dbs-input[@formcontrolname="shipment_placeOfDestinationOrDelivery"]//input') public placeOfDestinationOrDelivery: TextInput;
    @component('//dbs-textarea[@formcontrolname="otherDocuments"]//textarea') public otherDocuments: TextInput;
    @component('//dbs-textarea[@formcontrolname="additionalInformation"]//textarea') public additionalInformation: TextInput;
    @component('//ng-component/ng-component/div/div/div[3]/div[3]/div[3]/div/dbs-trade-create-switch/label/span') public supportDocBtn: Button;
    @component('//*[@id="docFilesectionContainer"]/div/div/input') public digiDocFileUploadButton: FileSelect;
    @component('//dbs-textarea[@formcontrolname="docBeneficiary"]//textarea') public docBeneficiary: TextInput;
    @component('//dbs-textarea[@formcontrolname="docReceivingBank"]//textarea') public docReceivingBank: TextInput;
    @component('//*[@id="importFinancing"]') public importFinancingBtn: Button;
    @component('//dbs-input[@formcontrolname="contactInformation_contactPerson"]//input') public contactPerson: TextInput;  
    @component('//dbs-input[@formcontrolname="contactInformation_contactInfo_number"]//input') public contactPersonNumber: TextInput;  
    @component('//*[@class="btn btn__primary medium"]') public reviewBtn: Button;
    @component('//dbs-trade-create-instructions/div/div[6]/div/dbs-trade-create-switch/label/span') public specialInstrBtn: Button;
    @component('//dbs-textarea[@formcontrolname="specialInstruction"]//textarea') public specialInstruction: TextInput;
    @component('//*[@class="btn btn__primary medium ng-star-inserted"]') public submitBtn: Button;
    @component('//*[@name="approve"]') public approveNowsubmitBtn: Button;
    @component('//*[@id="action-template"]') public saveAsTemplateBtn: Button;
    @component('//*[@type="text"]') public templateName: TextInput;
    @component('//*[@id="approveNowChecked"]') public approveNowBtn: Button;
    @component('//*[@class="btn btn__primary"]') public confirmBtn: Button;
    @component('//*[@name="responseCode"]') public responseCode: TextInput;
    @component('//*[@class="btn btn__primary"]') public approveDialog: Button;
    @component('//*[@class="btn btn__primary medium"]') public doneBtn: Button;
    @component('//*[@name="finish"]') public finishBtn: Button;
    @component('//*[@class="overview-summary__left"]') public defaultCcy: TextInput;
    @component('//*[@id="transactionDetail-custRef-0"]') public txnCenterRef: TextInput;
    @component('//*[@id="transactionAdditionalFilter"]') public filterBtn: Button;
    @component('//*[@id="sampling-filter"]') public filterInput: TextInput;
    @component('//*[@id="IDLC-ISS"]') public filterTypeIDLC: Button;
    @component('//*[@id="transactionAdditionalFilter"]') public additionalFilter: Button;
    @component('//dbs-dropdown[@formcontrolname="filterSubProduct"]') public filterSubProduct: Button;
    @component('//*[@class="rightSpan"]') public clearAll: Button;
    @component('//dbs-dropdown[@formcontrolname="status"]') public filterStatus: Button;
    @component('//*[@id="C"]') public pendingStatus: Button;
    @component('//*[@type="submit"]') public applyChange: Button;
    @component('//*[@type="button"]') public resetToDefault: Button;

    //view page
    @component('//*[@id="IDLC-ISS_APP-referenece-number"]') public tradeRef: TextInput;
    @component('//*[@class="header-amount"]') public tradeAmount: TextInput;
    @component('//*[@id="party-name"]') public partyName: TextInput;
    @component('//application-idlc-page/div[1]/div/div[2]/party-info/div/span') public beneName: TextInput;
    @component('//*[@id="IDLC-ISS_APP-status"]') public viewTxnStatus: TextInput;
    @component('//*[@name="approve"]') public approveBtn: Button;
    @component('//*[@name="dismiss"]') public dismissBtn: Button;
    @component('//*[@id="action-copy"]') public copyBtn: Button;
    @component('//*[@id="action-edit"]') public editBtn: Button;
    @component('//application-idlc-page/div[4]/instructions-bank/div/div') public showInstructionstobank: Button;
    @component('//instructions-contact-info/div/div[1]/div[4]/div[2]/span') public importfinancingrequest: TextInput;
    @component('//application-page/div/application-idlc-page/div[4]') public InstructionstobankValue: TextInput;

    constructor() {
        super();
    }

    public async loadCondition() {
        //await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.defaultCcy.element), this.defaultCcy.getTimeOut());
    }

    public async loadConditionForCreateIDLC() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.debitFrom.element), this.debitFrom.getTimeOut());
    }

    public async loadConditionForPreviewIDLC() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.submitBtn.element), this.submitBtn.getTimeOut());
    }

    public async loadConditionForSubmitIDLC() {
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
}
