import { PaymentLocalOverseasPayeePage } from "../Payments";
import { Button, component, log, TextInput, waitForUXLoading } from "../../../lib";
import { browser, ExpectedConditions } from 'protractor';

@log export class DOLFXContractsPage extends PaymentLocalOverseasPayeePage {
	constructor() {
		super();
	}

	//CREATE
	@component('//div[@class="book-refresh-btn"]') public getFixedRateButton: Button;
	@component('//div[@class="book-button"]') public bookButton: Button;
	@component('//button[@name="confirm"]') public confirmButton: Button;
	@component('//input[starts-with(@name, "fx-amount-")][not(@disabled)]') public bookFxAmount: TextInput;
	@component('//input[@name="enterCheck"]') public fxEnterCheck: Button;
	// @component('//input[@id="fx-contract-0"]') public existingContractButton: Button;
	@component('//input[contains(@id,"fx-contract-0")]') public existingContractButton: Button;
	@component('//input[contains(@id,"fx-contract-1")]') public fxContract2Button: Button;
	@component('//input[@name="fx-ref-0"]') public fxRef1: TextInput;
	@component('//input[@name="fx-ref-1"]') public fxRef2: TextInput;
	@component('//input[@name="fx-amount-0"]') public fxContractAmt1: TextInput;
	@component('//input[@name="fx-amount-1"]') public fxContractAmt2: TextInput;

	//VIEW
	@component('//div[@id="domestic-view-status"]') public statusValue: TextInput;

	//MUlTI APPROVAL
	@component('//div[@class="fx-button fx-book-button"]') public multiApprovalBookButton: Button;


	public async loadConditionForFxiedRateButton() {
		await waitForUXLoading();
		await browser.wait(ExpectedConditions.elementToBeClickable(this.getFixedRateButton.element), this.getFixedRateButton.getTimeOut());
	}

	public async loadConditionForMultiApprovalBook() {
		await waitForUXLoading();
		await browser.wait(ExpectedConditions.elementToBeClickable(this.multiApprovalBookButton.element), this.multiApprovalBookButton.getTimeOut());
	}

}