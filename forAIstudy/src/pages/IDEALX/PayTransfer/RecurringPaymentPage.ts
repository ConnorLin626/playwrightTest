import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, RadioButton, waitForUXLoading, DBSCalendarSelect } from '../../../lib';


@log export class RecurringPaymentPage extends Page {
    constructor() {
        super();
    }
    @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public paymentMenu: Button;

    @component('//*[@name="payment-date-type-RECURRING"]') public recurringRadioBtn: Button;
    @component("//multi-level-dropdown[@formcontrolname='selectedFrequency']") public frequency: OptionSelect;
    @component('//*[@id="select-item-Monday"]/span') public frequencyWeeklyMonday: Button;
    @component("//dbs-calendar[@formcontrolname='startDate']") public startDate: DBSCalendarSelect;
    @component("//dbs-calendar[@formcontrolname='endDate']") public endDate: DBSCalendarSelect;
    @component('//a[contains(@href,"#/transfers/recurring-payments")]') public recurringPaymentTab: Button;
    @component('//recurring-list/div/table/tbody/tr[1]/td[2]/div/p[1]') public recurringPaymentRef: Button;
    @component('//*[@name="recurring-filter"]') public recurringPaymentFilter: TextInput;
    @component("//recurring-payment-date/div/div[4]/dbs-calendar/div/div/button/span")  public noEndDateBtn: Button;
    @component('//input[@name="bank-charge-P"]') public bankChargesThey: Button;
    @component("//button[@name='next']") public nextButton: Button;
    @component("//button[@name='submit']") public submitButton: Button;
    

    // View page
    @component('//*[@class="section-header-content"]') public headerRefValue: TextInput;
    @component('//span[@id="domestic-view-accountNum"]') public fastFromAccountValue: TextInput;
    @component('//*[@id="domestic-view-deductAmount"]') public amountValue: TextInput;
    @component('//span[@id="domestic-view-startDate"]') public paymentStartDateValue: TextInput;
    @component('//span[@id="domestic-view-endDate"]') public paymentEndDateValue: TextInput;
    @component('//span[@id="domestic-view-firstPaymentDate"]') public freqquencyValue: TextInput;
    @component('//*[@id="domestic-view-approvalDate"]') public paymentDateValue: TextInput;
    @component('//*[@id="act-view-edit"]') public editBtn: Button;
    @component('//*[@name="approve"]') public approveBtn: Button;
    @component("//button[@name='reject']") public rejectButton: Button;
    @component('//*[@class="status--reskin"]') public statusValue: TextInput;
    @component('//*[@id="domestic-view-status"]') public statusViewValue: TextInput;
    @component('//*[@id="domestic-view-existingPayee-acctNum"]') public accountNumValue: TextInput;
    @component('//*[@id="domestic-view-existingPayee-name"]') public existingPayeeValue: TextInput;
    @component('//recurring-payment-view-section/div/section[1]/div[5]/div/div') public paymentTypeValue: TextInput;
    @component('//*[@id="domestic-view-send"]') public exchangeRate: TextInput;
    @component('//*[@class="bg-canvas form-group ng-star-inserted"]') public paymentDetailValue: TextInput;
    @component('//recurring-payment-view-section/div/section[4]/span/span[2]/span/label[1]') public totalDeductValue: TextInput;
    @component('//recurring-payment-view-section/div/section[6]/div[1]/span[2]') public referenceValue: TextInput;
    @component('//recurring-payment-view-section/div/section[5]/div[1]/span[2]/span') public bankChargeValue: TextInput;
    @component('//recurring-payment-view-section/div/section[6]/div[2]/span[2]/span') public transactionNoteValue: TextInput;
    @component("//dbs-approval-requirement/div/section/div[1]/span[2]") public nextApprover: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.recurringPaymentRef.element), this.recurringPaymentRef.getTimeOut());
    }

    public async loadConditionForViewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.fastFromAccountValue.element), this.fastFromAccountValue.getTimeOut());
    
    }

    public async goToViewRecurringPaymentPageViaRef(reference: string) {
        await this.paymentMenu.click();
        await this.recurringPaymentTab.click();
        await this.loadCondition();
        await this.recurringPaymentFilter.input(reference);
        await this.loadCondition();
        await this.recurringPaymentRef.jsClick();
    }

    public async loadConditionForPrevewPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }

}
