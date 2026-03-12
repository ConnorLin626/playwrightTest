import { Page, Locator } from '@playwright/test';

/**
 * TransferCenter Page - Playwright 版本
 * 基于 forAIstudy/src/pages/IDEALX/PayTransfer/TransferCenterPage.ts
 */
export class TransferCentersPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get transferCenterFilter(): Locator {
        return this.page.locator('//input[contains(@placeholder, "Search") or contains(@class, "transfer-center-filter")]');
    }

    get transactionResult(): Locator {
        return this.page.locator('//div[contains(@class, "transaction-result") or contains(text(), "No information")]');
    }

    // Methods
    async loadCondition(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(500).catch(() => {});
    }

    async goToViewPaymentPageViaRef(referenceNumber: string): Promise<void> {
        // 通过参考号进入付款详情页面
        await this.transferCenterFilter.fill(referenceNumber);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000).catch(() => {});
        
        // 点击第一个搜索结果
        const firstResult = this.page.locator('//div[contains(@class, "transaction-item") or contains(@class, "payment-row")][1]').or(
            this.page.locator('//a[contains(text(), "' + referenceNumber + '")]')
        );
        await firstResult.click().catch(() => {});
    }

    async goToViewPaymentPageSearch(paymentType: string, status: string): Promise<void> {
        // 通过搜索条件进入付款详情页面
        const paymentTypeFilter = this.page.locator('//select[contains(@formcontrolname, "paymentType") or contains(@class, "payment-type")]');
        const statusFilter = this.page.locator('//select[contains(@formcontrolname, "status") or contains(@class, "status")]');
        
        await paymentTypeFilter.selectOption(paymentType).catch(() => {});
        await statusFilter.selectOption(status).catch(() => {});
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000).catch(() => {});
        
        // 点击第一个搜索结果
        const firstResult = this.page.locator('//div[contains(@class, "transaction-item") or contains(@class, "payment-row")][1]');
        await firstResult.click().catch(() => {});
    }
}
