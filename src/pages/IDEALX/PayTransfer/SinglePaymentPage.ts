import { Page, Locator } from '@playwright/test';

/**
 * SinglePayment Page - Playwright 版本
 * 基于 forAIstudy/src/pages/IDEALX/PayTransfer/SinglePaymentPage_reskin.ts
 */
export class SinglePaymentPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Menu
    get PayTransferMenu(): Locator {
        return this.page.locator('//*[@id="nav-item-navBBTopPaymentsLinkText"]');
    }

    get makePayment(): Locator {
        return this.page.locator('//*[@id="icon__make_payment"]');
    }

    // Create page
    get fromAccount(): Locator {
        return this.page.locator('//dbs-account-new');
    }

    get fromAcctInput(): Locator {
        return this.page.locator('//filter-component/div/div/div/input');
    }

    get fromAcctSelected(): Locator {
        return this.page.locator('//*[@id="acct-id-0"]');
    }

    get existingPayee(): Locator {
        return this.page.locator('//dbs-single-existing-payee-new');
    }

    get existingPayeeInput(): Locator {
        return this.page.locator('//*[@id="existing-payee-filter"]');
    }

    get payeeSelected(): Locator {
        return this.page.locator('//*[@id="payee-id-0"]');
    }

    get addNewPayee(): Locator {
        return this.page.locator('//button[contains(text(), "Add New Payee") or contains(@class, "add-new-payee")]');
    }

    get continueBtn(): Locator {
        return this.page.locator('//button[@name="Review"]');
    }

    get payeeLocationInput(): Locator {
        return this.page.locator('//input[contains(@placeholder, "country") or @formcontrolname="selectedCountry"]');
    }

    get payeeLocationSelected(): Locator {
        return this.page.locator('//div[contains(@class, "autocomplete-option") or contains(@class, "mat-option")][1]');
    }

    get enterManully(): Locator {
        return this.page.locator('//button[contains(text(), "Enter Manually") or contains(text(), "enter manually")]');
    }

    get newPayeeBankName(): Locator {
        return this.page.locator('//input[@name="new-payee-bank-name" or contains(@placeholder, "bank name")]');
    }

    get newPayeeBankAdd1(): Locator {
        return this.page.locator('//input[@name="new-payee-bank-add1"]');
    }

    get newPayeeBankAdd2(): Locator {
        return this.page.locator('//input[@name="new-payee-bank-add2"]');
    }

    get routingCode(): Locator {
        return this.page.locator('//input[@name="new-payee-routing-code" or @id="routing-code"]');
    }

    get accountNumber(): Locator {
        return this.page.locator('//input[@name="new-payee-acct-number" or @id="acct-number"]');
    }

    get payeeName(): Locator {
        return this.page.locator('//input[@name="new-payee-name" or @id="payee-name"]');
    }

    get payeeNickname(): Locator {
        return this.page.locator('//input[@name="new-payee-nick-name"]');
    }

    get newPayeeReviewBtn(): Locator {
        return this.page.locator('//button[@name="Review"]');
    }

    get savePayee(): Locator {
        return this.page.locator('//button[contains(text(), "Save to List") or @name="SaveToPayeeList"]');
    }

    get usePayee(): Locator {
        return this.page.locator('//button[@name="UsePayee"]');
    }

    get amount(): Locator {
        return this.page.locator('//input[@name="send-amount" or @id="send-amount"]');
    }

    get twttPayment(): Locator {
        return this.page.locator('//input[@name="paymentPriorityTypetwgst"]');
    }

    get bankChargeUs(): Locator {
        return this.page.locator('//input[@id="bank-charge-us"]');
    }

    get bankChargeThey(): Locator {
        return this.page.locator('//input[@id="bank-charge-they"]');
    }

    get purposeCode(): Locator {
        return this.page.locator('//multi-level-dropdown-reskin[@formcontrolname="purposeCode"] or //select[@formcontrolname="purposeCode"]');
    }

    get isDetailsToPayee(): Locator {
        return this.page.locator('//input[@id="detailsToPayee"]');
    }

    get paymentDetail(): Locator {
        return this.page.locator('//input[@name="paymentDetail"]');
    }

    get reviewBtn(): Locator {
        return this.page.locator('//button[@name="Review"]');
    }

    get submitBtn(): Locator {
        return this.page.locator('//button[@name="Submit"]');
    }

    get reference(): Locator {
        return this.page.locator('//h3[contains(text(), "Reference") or contains(@class, "reference")]//following-sibling::div | //span[contains(@class, "reference-number")]');
    }

    // View page elements
    get statusValue(): Locator {
        return this.page.locator('//div[contains(@class, "status") or @id="status-value"]');
    }

    get viewAmountValue(): Locator {
        return this.page.locator('//div[contains(@class, "amount") or @id="amount-value"]');
    }

    get fromAccountValue(): Locator {
        return this.page.locator('//div[contains(@class, "from-account") or @id="from-account-value"]');
    }

    get beneValue(): Locator {
        return this.page.locator('//div[contains(@class, "beneficiary") or @id="beneficiary-value"]');
    }

    get payeeAccountValue(): Locator {
        return this.page.locator('//div[contains(@class, "payee-account") or @id="payee-account-value"]');
    }

    get payeeLocationValue(): Locator {
        return this.page.locator('//div[contains(@class, "payee-location") or @id="payee-location-value"]');
    }

    get routingCodeValue(): Locator {
        return this.page.locator('//div[contains(@class, "routing-code") or @id="routing-code-value"]');
    }

    get chargeValue(): Locator {
        return this.page.locator('//div[contains(@class, "charge") or @id="charge-value"]');
    }

    get purposeCodeValue(): Locator {
        return this.page.locator('//div[contains(@class, "purpose-code") or @id="purpose-code-value"]');
    }

    get bankNameView(): Locator {
        return this.page.locator('//div[contains(@class, "bank-name") or @id="bank-name-value"]');
    }

    get bankAddress1(): Locator {
        return this.page.locator('//div[contains(@class, "bank-address1") or @id="bank-address1-value"]');
    }

    get bankAddress2(): Locator {
        return this.page.locator('//div[contains(@class, "bank-address2") or @id="bank-address2-value"]');
    }

    get okBtn(): Locator {
        return this.page.locator('//button[contains(text(), "OK") or @name="OK"]');
    }

    get approveBtn(): Locator {
        return this.page.locator('//button[contains(text(), "Approve") or @name="Approve"]');
    }

    get approveAndSubmitBtn(): Locator {
        return this.page.locator('//button[contains(text(), "Approve and Submit") or @name="ApproveAndSubmit"]');
    }

    get copyBtn(): Locator {
        return this.page.locator('//button[contains(text(), "Copy") or @name="Copy"]');
    }

    get editBtn(): Locator {
        return this.page.locator('//button[contains(text(), "Edit") or @name="Edit"]');
    }

    get deleteBtn(): Locator {
        return this.page.locator('//button[contains(text(), "Delete") or @name="Delete"]');
    }

    get verifyReleaseBtn(): Locator {
        return this.page.locator('//button[contains(text(), "Verify/Release") or @name="VerifyRelease"]');
    }

    get isBeneAdvising(): Locator {
        return this.page.locator('//input[@id="isBeneAdvising"]');
    }

    get isMessageToOrderingBank(): Locator {
        return this.page.locator('//input[@id="isMessageToOrderingBank"]');
    }

    get otherDetail(): Locator {
        return this.page.locator('//button[contains(text(), "Other Details") or contains(@class, "other-details")]');
    }

    get val(): Locator {
        return this.page.locator('//input[@id="val" or @name="val"]');
    }

    get adviceContent(): Locator {
        return this.page.locator('//input[@id="advice-content" or @name="adviceContent"]');
    }

    // Methods
    async loadCondition(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500).catch(() => {});
    }

    async loadConditionForReviewPage(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500).catch(() => {});
    }

    async loadConditionForViewPage(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500).catch(() => {});
    }

    async loadConditionForSubmittedPage(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500).catch(() => {});
    }
}
