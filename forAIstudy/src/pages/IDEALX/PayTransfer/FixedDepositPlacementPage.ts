import { browser, ExpectedConditions } from "protractor";
import {
    Button,
    component, log,
    IXHorizontalMenu,
    OptionSelect,
    Page,
    RadioButton,
    TextInput,
    waitForUXLoading
} from "../../../lib";
import * as utils from "../../../lib/utils";

@log export class FixedDepositPlacementPage extends Page {

    //create page

    @component('//*[@id="icon__place_fixed_deposit"]') public FixedDepositPlacement: Button;

    @component('//dbs-toolbar/div/div[2]/p-horizontal-navigation/div/ul[2]/li[2]') public pagePoint: Button;

    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fundingAccount: OptionSelect;

    @component('//p-auto-complete[@formcontrolname="fixedDepositFromAccount"]') public fixdDepositAccount: OptionSelect;

    @component('//input[@name="send-amount"]') public amount: TextInput;

    @component('//button[@name="get-rates"]') public getRatesButton: Button;
    @component("//input[@id='selected_one_0']") public day7_button: RadioButton;

    @component('//button[@name="next"]') public nextButton: Button;

    @component('//button[@name="submit"]') public submitButton: Button;

    @component('//button[@name="finish"]') public finishButton: Button;

    @component('//input[@id="selected_right_0"]') public tenorRadio: RadioButton;

    //view page
    @component('//*[@class="section-header-item--value"]') public headerRefValue: TextInput;

    @component('//span[@id="fd-placement-view-accountNum"]') public fundingAccountValue: TextInput;

    @component('//span[@id="fd-placement-view-depDate"]') public depositDate: TextInput;

    @component('//strong[@id="fd-placement-view-toaccountName"]') public fixedDepositAccountValue: TextInput;

    @component('//label[@id="act-view-deductAmount"]') public depositAmountValue: TextInput;

    @component('//view-section-fd-placement/div/section[2]/div[1]/span[2]') public depositTypeValue: TextInput;

    @component('//td[@id="fd-tenor"]') public tenor: TextInput;

    @component('//td[@id="fd-interestRate"]') public interestRate: TextInput;

    @component('//td[@id="fd-interestAmount"]') public interestAmount: TextInput;

    @component('//*[@id="fd-placement-view-priSetAcct-accountNum"]') public creditAcctValue: TextInput;

    @component('//*[@id="fd-placement-view-reference"]') public referenceValue: TextInput;

    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;

    @component("//*[@class='payment-history']") public activityLog: TextInput; 

    @component('//button[@name="reject"]') public rejectButton: Button;

    @component('//button[@name="delete"]') public deleteButton: Button;

    @component(('//*[@id="act-view-edit"]')) public editButton: Button;

    @component('//div[@id="fd-view-status"]') public fdTransactionStatusValue: TextInput;

    //reject
    @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
    @component("//dbs-reject-dialog/div/div[2]/div[2]/button[2]") public rejectDialogButton: Button;
    @component('//button[@name="dismiss"]') public dismissButton: Button;

    //delete
    @component("//*[@id='dialogDelete']") public deleteDialogButton: Button;

    //approve
    @component("//button[@name='approve']") public approveButton: Button;
    @component("//ng-component/div/div/div/div[5]/div/button[5]") public acceptAndApproveButton: Button;
    @component('//*[@class="push-option-label"]') public pushOption: Button;
    @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
    @component("//input[@name='responseCode']") public challengeResponse: TextInput;
    @component("//input[@name='approveNow']") public approveNowCheckBox: Button;
    @component('//button[@id="push-btn"]') public acceptAndApproveNowButton: Button;

    //center
    @component('//button[@id="transaction-list-reference_0"]') public referenceLink: Button;

    @component("//input[@name='fd-transferCenter-filter']") public transferCenterfilter: TextInput;

    @component('//a[@id="ux-tab-GROUP"]/span') public fixedDepositTab: Button;

    @component('//p[@id="labelNoInformationDisplay"]') public transactionResult: TextInput;

    @component("//*[@id='fdTransactionAdditionalFilter']") public showAdditionFilter: Button;

    @component("//p-auto-complete[@formcontrolname='fd-status']") public transactionStatusList: OptionSelect;

    @component("//button[@name='search']") public searchButton: Button;

    //approval
    @component("//input[@name='selectedAllName']") public selectedAllButton: Button;

    @component("//button[@name='fixedDepositApprove']") public fdApproveButton: Button;

    @component('//button[@id="transaction-reference_0"]') public fdReferenceLink: Button;


    //Call deposit
    @component('//*[@id="fd-tenor"]') public cdTenor: TextInput;
    @component('//*[@id="maturityCDRPI"]') public renewPrincipalPlus: RadioButton;
    @component('//*[@name="save-as-draft"]') public saveAsDraft: Button;
    //@component('//deposit-type/div/span[2]/dbs-radio-group/div/dbs-radio[2]/div/label/div/p/span') public depositType: RadioButton
    //@component('//rate-and-interest/div/span[2]/dbs-radio-group/div/dbs-radio[2]/div/label/div/p/span') public rate: RadioButton
    @component('//*[@for="depositType-cd"]') public depositType: RadioButton
    @component('//*[@for="cd-by-tenor-7day"]') public rate: RadioButton
    @component('//*[@id="fd-placement-view-matInst"]') public Maturity: TextInput;
    @component('//*[@id="maturityCDRPW"]') public creMaturity: RadioButton;
    @component('//button[@name="copy"]') public copyButton: Button;
    @component('//p-auto-complete[@formcontrolname="status"]') public txnStatus: OptionSelect;
    @component("//button[@name='search']") public searchBtn: Button;
    @component("//input[@id='maturityCDWFA']") public MaturityInstruction: RadioButton;


    constructor() {
        super();
    }

    public async loadCondition() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fundingAccount.element), this.fundingAccount.getTimeOut());
        await utils.waitForUXLoading();
    }
    public async loadConditionForCD() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.referenceLink.element), this.referenceLink.getTimeOut());
    }

    public async loadFixdDepositAccount() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fixdDepositAccount.element), this.fixdDepositAccount.getTimeOut());
    }

    public async loadGetRatesButton() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.getRatesButton.element), this.getRatesButton.getTimeOut());
    }

    public async loadConditionForPrevewPage() {
        await utils.waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.nextButton.element), this.nextButton.getTimeOut());
        await browser.wait(ExpectedConditions.visibilityOf(this.submitButton.element), this.submitButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

    public async loadConditionForSubmittedPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.stalenessOf(this.submitButton.element), this.submitButton.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
    }

    public async loadFdCenterCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.referenceLink.element), this.referenceLink.getTimeOut());
    }

    public async loadFdApprovalCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fdReferenceLink.element), this.fdReferenceLink.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fundingAccountValue.element), this.fundingAccountValue.getTimeOut());
    }

    public async loadConditionForDismissDialog() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
    }

    public async  loadApproveButton() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
    }

    public async  goToViewPaymentPageViaRef(reference: string) {
        await this.fixedDepositTab.jsClick();
        await this.loadFdCenterCondition();
        await this.transferCenterfilter.input(reference);
        await this.referenceLink.jsClick();
    }

    public async goToViewPaymentPageViaSearch(transactionStatus: string) {
        await this.loadFdCenterCondition();
        await this.showAdditionFilter.click();
        if ("" !== transactionStatus) {
            await this.transactionStatusList.select(transactionStatus);
        }
        await this.searchButton.jsClick();
        await this.loadCondition();
        await this.referenceLink.jsClick();
    }
    public async goToVieCDPageViaSearch(transactionStatus: string) {
        await this.loadFdCenterCondition();
        await this.showAdditionFilter.jsClick();
        await this.scrollTo(0, 500);
        if ("" !== transactionStatus) {
            await this.txnStatus.select(transactionStatus);
        }
        await this.searchBtn.jsClick();
        await this.loadConditionForCD();
        await this.referenceLink.jsClick();
    }
}
