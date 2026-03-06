
import { browser, ExpectedConditions } from 'protractor';
import { Button, component, log, OptionSelect, Page, RadioButton, TextInput } from "../../../lib";
import * as utils from "../../../lib/utils";

@log export class TWACHBulkPaymentPage extends Page{
	//paymentPriorityType
	@component('//input[@name="paymentPriorityType"]') public FISCPaymentType: Button;
	@component('//*[@id="my-app"]/ng-component/div/ng-component/div/div/div/form/create-step-1/div/bulk-priority-type/div/span[2]/dbs-radio-group/div/dbs-radio[2]/div/label') public ACHPaymentType: Button;
	@component('//div[@id="domestic-view-status"]') public transactionStatusView: TextInput;
	@component('//span[@id="domestic-view-accountNum"]') public fromAccountView: TextInput;
	@component('//label[@id="domestic-view-deductAmount"]') public amountView: TextInput;
	@component('//strong[@id="domestic-view-newPayee-name"]') public newPayeeNameView: TextInput;
	@component('//label[@id="domestic-view-approvalDate"]') public cutoffTimeView: TextInput;
  @component('//dbs-radio-group[@formcontrolname="transfer_priority_radio"]') public paymentPriorityType: RadioButton;
  @component('//multi-level-dropdown[@name="billerServiceID"]') public billerServiceID: OptionSelect;
  @component('//input[@name="payeeNationalID"]') public payeeNationalID: TextInput;
  @component('//input[@name="payeeMandateDetail"]') public payeeMandateDetail: TextInput;
  @component('//input[@name="payeeStockCode"]') public payeeStockCode: TextInput;
  @component('//input[@name="payeePassbook"]') public payeePassbook: TextInput;
  @component('//input[@name="payeeFreeText4Sender"]') public payeePaymentDetail: TextInput;
	public async loadCondition() {
		throw new Error("Method not implemented.");
	}

	public async loadConditionForViewPaymentPage() {
		await utils.waitForUXLoading();
		await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatusView.element), this.transactionStatusView.getTimeOut());
	}
}