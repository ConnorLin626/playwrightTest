/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, RadioButton } from '../../../lib';

@log export class BeneficiaryPage extends Page {

    //Center
    @component('//a[contains(@href,"#/transfers/manage-payee")]') public payeeMenu: Button;
    @component('//*[@id="manage-payee-list"]/div[1]/information-banner/div/div/div/div[2]/p') public MarketingMessage: TextInput;
    @component('//button[@name="payee"]') public createNewPayee: Button;
    @component('//label[@id="payee-view-name"]') public centerPayeeName: TextInput;
    
    @component('//dbs-payee-view/div/div/div/section/div[6]/span[2]') public routingCodeValue: TextInput;
    @component('//*[@id="payee-view-acctNum"]') public accountNumValue: TextInput;
    @component('//*[@id="payee-view-CardNum"]') public centerCardNum: TextInput;
    @component('//*[@id="manage-payee-list"]/div/dbs-payee-transaction-list/div/div[3]/div[2]/dbs-payee-view/div/div/div/div[6]/span[2]') public paymentOptions: TextInput;
    @component('//label[@id="payee-view-payNowNickName"]') public centerPayNowPayeeName: TextInput;
    @component('//*[@id="payee-view-nickName"]') public centerPayeeNickName: TextInput;
    @component('//*[@id="payee-view-email"]') public centerPayeeViewEmail: TextInput;
    @component('//button[@id="payee-edit"]') public editNewPayee: Button;
    @component('//button[@name="payee-delete"]') public deleteNewPayee: Button;
    @component('//button[@name="delete"]') public confirmDelete: Button;
    @component('//div[@class="btn-area"]/button[@name="dismiss"]') public centerDismiss: Button;
    @component('//*[@id="payee-view-add1"]') public centerAddress1: TextInput;
    @component('//*[@id="payee-view-add2"]') public centerAddress2: TextInput;
    @component('//*[@id="payee-view-add3"]') public centerAddress3: TextInput;
    @component('//*[@id="payee-view-email"]') public centerEmailProxy: TextInput;
    @component('//*[@id="payee-view-mobNum"]') public centerMobileProxy: TextInput;
    @component('//*[@id="payee-view-fasterId"]') public centerFasterIDProxy: TextInput;
    @component('//input[@name="approve-filter"]') public payeeFilter: TextInput;
    @component('//div[@class="no-information"]') public beneficiaryResult: TextInput;
    @component('//*[@id="ux-tab-PAYEE_PENDING_APPROVAL"]') public payeePendingTable: Button;
    @component('//*[@id="dbs-tab-count-PAYEE_PENDING_APPROVAL"]') public payeePendingTableCount: TextInput;
    @component("//*[@id='cognitive-continue']") public continueBtn: Button;
    @component("//*[@name='payee-delete']") public deletePayeeBtn: Button;
    @component("//dbs-payee-view/div/div/div/div[4]/span[2]/span") public addressValue: TextInput;
    @component("//*[@data-mat-icon-name='icon__snackbar--warning']") public updatePayeeIcon: TextInput;
    @component("//*[@class='information-banner__flex-vertical']") public updatePayeeInfo: TextInput;
    @component("//*[@id='manage-payee-list']/div[2]/dbs-payee-transaction-list/div/div[3]/div[2]/dbs-payee-view/div/div/div/section/div[1]/div/span") public centerBankNameValue: TextInput;
    @component('//*[@id="payee-view-bank-add1"]') public centerBankAdd1Value: TextInput;
    @component('//*[@id="payee-view-bank-add2"]') public centerBankAdd2Value: TextInput;
    //Detail -- payee
    @component('//*[@id="enterManual"]') public enterManually: Button;
    @component('//*[@id="new-payee-bank-name-input"]') public payeeBankName: TextInput;
    @component('//input[@id="new-payee-bank-add1-input"]') public payeeBankAdd1: TextInput;
    @component('//input[@id="new-payee-bank-add2-input"]') public payeeBankAdd2: TextInput;
    @component('//p-auto-complete[@formcontrolname="selectedCountry"]') public selectedCountry: OptionSelect;
    @component('//*[@name="new-payee-name"]') public newPayeeName: TextInput;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickname: TextInput;
    @component('//*[@class="switch-label"]') public switchFormatButton: Button;
    @component('//p-auto-complete[@formcontrolname="country"]') public payeeLocation: OptionSelect;
    @component('//*[@name="townCity"]') public townCity: TextInput;
    @component('//*[@class="additional"]') public addAddress: TextInput;
    @component('//*[@name="isConfirmPayeeCheck"]') public checkBtn: TextInput;
    
    @component('//input[@name="new-payee-add1"]') public newPayeeAdd1: TextInput;
    @component('//input[@name="new-payee-add2"]') public newPayeeAdd2: TextInput;
    @component('//input[@name="new-payee-add3"]') public newPayeeAdd3: TextInput;
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
    @component('//input[@name="chequeOrDemand" and @id="chequeOrDemand"]') public chequeOrDemand: Button;
    @component('//dbs-radio-group[@formcontrolname="bankCategoryType"]') public bankCategory: RadioButton;
    @component('//dbs-radio-group[@formcontrolname="otherBankCategoryType"]') public OtherBankType: RadioButton;
    @component('//input[@name="new-payee-bank-id"]') public newPayeeBankId: TextInput;
    @component('//input[@name="new-payee-bank-id-button"]') public newPayeeBankIdButton: Button;
    @component('//table[contains(@class,"swift-results")]/tbody/tr[1]/td[1]') public selectBankId: Button;
    @component('//dbs-payee-bank/div/div/div[2]/div[1]/div[1]/p-typeahead-window/div/div') public bankSelect: Button;
    @component('//input[@name="new-payee-acct-number"]') public newPayeeNumber: TextInput;
    @component('//*[@class="retrieve-name-title"]') public retriveName: Button;
    @component('//*[@name="retrieve-name"]') public retriveNameBtn: Button;
    @component("//form/bank-category-details/retrieved-account-name-hk/div/div[2]/button") public retireveNameBtn: Button; 
    @component("//*[@class='dbs-validation-error ng-star-inserted']") public nicknameMsg: TextInput;
    @component("//ng-component/div/ng-component/div/dbs-top-panel/div/div[2]/ul/li/span") public topMsg: TextInput;
    @component('//input[@name="printedName"]') public printedName: TextInput;
    @component('//p-auto-complete[@formcontrolname="selectedCategory"]') public selectedCategory: OptionSelect;
    @component('//input[@name="new-payee-nick-name"]') public newPayeeNickName: TextInput;
    @component('//ng-component/div/ng-component/div/div[3]/div[1]/span[1]') public payeeNum: TextInput;
    @component('//input[@name="payment-cd-type-DEMANDDRAFT"]') public ddPaymentOption: RadioButton;
    @component('//input[@name="payment-cd-type-CHEQUE"]') public chequePaymentOption: RadioButton;
    @component('//input[@name="new-payee-routing-code"]') public payeeRoutingCode: TextInput;
    @component('//dbs-payee-view/div/div/div/section/div[6]/span[2]') public viewPageRoutingCode: TextInput;
    //paynow
    @component('//a[@id="ux-tab-newpaynow"]') public payNowProxy: Button;
    @component('//input[@name="proxyTypeMobNumInput"]') public proxyTypeMobNum: TextInput;
    @component('//button[@name="retrieve-button"]') public retrievePayNowName: Button;
    @component('//*[@id="retrieve-name"]') public retrievePayNowSpan: TextInput;
    @component('//input[@name="newPayNowNickName"]') public newPayNowNickName: TextInput;
    @component('//*[@name="retrieve-button"]') public retrieveNameButton: Button;//need add id, the same as retrievePayNowName
    @component('//input[@name="payNowProxyType-email"]') public proxyEmailRadio: Button;
    @component('//input[@name="proxyTypeEmailInput"]') public proxyEmailText: TextInput;
    @component('//input[@name="payNowProxyType-fpsId"]') public proxyFasterIdRadio: Button;
    @component('//input[@name="proxyTypeFasterIDInput"]') public proxyFasterIdText: TextInput;
    //@component('//*[@id=" payee-view-mobNum"]') public PayeeViewMobNum: Button;

    //VN NAPAS247
    @component('//*[@id="ux-tab-newnapas"]') public newNAPAStab: Button;
    @component('//input[@name="payToType-CARD"]') public PaytoCard: RadioButton;
    @component('//input[@name="new-payee-card-number"]') public CardNumber: TextInput;
    @component('//button[@name="Verify"]') public VerifyButton: Button;
    @component('//*[@class="font-medium text-base"]') public RetrievedPayeeName: TextInput;
    //@component('//input[@name="new-payee-nick-name"]') public PayeeNickName: TextInput;

    //common
    @component('//button[@name="next"]') public next: Button;
    @component('//button[@name="submit"]') public submit: Button;
    @component('//button[@name="dismiss"]') public dismiss: Button;

    //Download payee 
    @component('//button[@name="downloadPayees"]') public downloadPayeeTab: Button;
    @component('//*[@id="approvalStatus-0"]') public approveStatus: Button
    @component('//*[@id="label-multi-dropdown-approvalStatus"]') public approveStatusLabel: Button
    @component('//*[@id="search"]') public search: TextInput
    @component('//*[@id="selectAllInput"]') public approveStatusSelectAll: Button

    


    constructor() {
        super();
    }

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewPayee.element), this.createNewPayee.getTimeOut());
        await browser.sleep(2000)//wait filter result response
    }

    public async loadConditionOnCreatePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewPayee.element), this.createNewPayee.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionForDeletePayee() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.deleteNewPayee.element), this.deleteNewPayee.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteNewPayee.element), this.deleteNewPayee.getTimeOut());
        await browser.sleep(2500);
    }

    public async loadConditionForDeleteButton() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmDelete.element), this.confirmDelete.getTimeOut());
    }

    public async loadConditionForDismissButton() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.confirmDelete.element), this.confirmDelete.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismiss.element), this.dismiss.getTimeOut());
    }

    public async loadConditionPendingTable() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createNewPayee.element), this.createNewPayee.getTimeOut());
        await waitForUXLoading();
    }

    public async loadConditionForCreateBenePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.createNewPayee.element), this.createNewPayee.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.selectedCountry.element), this.selectedCountry.getTimeOut());
    }

    public async loadConditionForEditBenePage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.editNewPayee.element), this.editNewPayee.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.newPayeeName.element), this.newPayeeName.getTimeOut());
    }

    public async payNowCanClick() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submit.element), this.submit.getTimeOut());
    }
    public async loadConditionForConfirmDeleteButton() {
        await waitForUXLoading();
        await browser.sleep(12000);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmDelete.element), this.confirmDelete.getTimeOut());
    }
}