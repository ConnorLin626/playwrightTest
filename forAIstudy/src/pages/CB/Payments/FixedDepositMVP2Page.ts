import { browser, ExpectedConditions } from "protractor";
import { Button, component, log, OptionSelect, Page, RadioButton, TextInput, waitForUXLoading } from "../../../lib";
import * as utils from "../../../lib/utils";

@log export class FixedDepositMVP2Page extends Page {

	//create page
	@component('//p-auto-complete[@formcontrolname="fromAccount"]') public fundingAccount: OptionSelect;

	@component('//p-auto-complete[@formcontrolname="fixedDepositFromAccount"]') public fixdDepositAccount: OptionSelect;

	@component('//input[@name="send-amount"]') public amount: TextInput;

	@component('//button[@name="get-rates"]') public getRatesButton: Button;

	@component('//button[@name="next"]') public nextButton: Button;

	@component('//button[@name="submit"]') public submitButton: Button;

	@component('//button[@name="finish"]') public finishButton: Button;

	@component('//input[@id="selected_right_0"]') public tenorRadio: RadioButton;

	//view page
	@component('//span[@id="fd-placement-view-accountNum"]') public fundingAccountValue: TextInput;

	@component('//span[@id="fd-placement-view-depDate"]') public depositDate: TextInput;

	@component('//strong[@id="fd-placement-view-toaccountName"]') public fixedDepositAccountValue: TextInput;

	@component('//label[@id="act-view-deductAmount"]') public depositAmountValue: TextInput;

	@component('//td[@id="fd-tenor"]') public tenor: TextInput;

	@component('//*[@id="maturityWFA"]') public maturityInstruction: Button;

	@component('//td[@id="fd-interestRate"]') public interestRate: TextInput;

	@component('//button[@name="copy"]') public copyButton: Button;

	@component('//div[@id="fd-view-status"]') public fdTransactionStatusValue: TextInput;

	//approve
	@component("//button[@name='approve']") public approveButton: Button;

	@component('//div[@class="push-option"]') public pushOption: Button;

	@component('//button[@name="get-challenge"]') public getChallengeSMS: Button;

	@component("//input[@name='responseCode']") public challengeResponse: TextInput;

	@component("//input[@name='approveNow']") public approveNowCheckBox: Button;

	//center
	@component('//button[@id="transaction-list-reference_0"]') public referenceLink: Button;

	@component("//input[@name='fd-transferCenter-filter']") public transferCenterfilter: TextInput;

	@component('//p[@id="labelNoInformationDisplay"]') public transactionResult: TextInput;

	@component("//label[@class='is-open']") public showAdditionFilter: Button;

	@component("//p-auto-complete[@formcontrolname='fd-status']") public transactionStatusList: OptionSelect;

	@component("//button[@name='search']") public searchButton: Button;

	//approval
	@component("//input[@name='selectedAllName']") public selectedAllButton: Button;

	@component("//button[@name='fixedDepositApprove']") public fdApproveButton: Button;

	@component('//button[@id="transaction-reference_0"]') public fdReferenceLink: Button;

	constructor() {
		super();
	}

	public async loadCondition() {
		await utils.waitForUXLoading();
		await browser.wait(ExpectedConditions.elementToBeClickable(this.fundingAccount.element), this.fundingAccount.getTimeOut());
	}

	public async loadFixdDepositAccount() {
		await utils.waitForUXLoading();
		await browser.wait(ExpectedConditions.elementToBeClickable(this.fundingAccount.element), this.fundingAccount.getTimeOut());
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


	public async  loadApproveButton() {
		await waitForUXLoading();
		await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
	}

	public async  goToViewPaymentPageViaRef(reference: string) {
		await this.loadFdCenterCondition();
		await this.transferCenterfilter.input(reference);
		await this.referenceLink.click();
	}

	public async goToViewPaymentPageViaSearch(transactionStatus: string) {
		await this.loadFdCenterCondition();
		await this.showAdditionFilter.click();
		if ("" !== transactionStatus) {
			await this.transactionStatusList.select(transactionStatus);
		}
		await this.searchButton.click();
		await this.loadCondition();
		await this.referenceLink.click();
	}
}
