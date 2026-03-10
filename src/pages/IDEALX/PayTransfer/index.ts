import { Page } from '@playwright/test';
import { AccountTransferPage } from './AccountTransferPage';
import { BeneficiaryPage } from './BeneficiaryPage';

export {
    AccountTransferPage,
    BeneficiaryPage
};

/**
 * PayTransfer 页面集合类
 * 基于 forAIstudy/src/pages/IDEALX/PayTransfer/index.ts 的 PaymentsPages
 * 统一管理和创建所有 PayTransfer 相关的页面对象
 */
export class PaymentsPages {
    public AccountTransferPage: AccountTransferPage;
    public BeneficiaryPage: BeneficiaryPage;

    /**
     * 构造函数 - 接收 Page 实例并创建所有页面对象
     * @param page - Playwright Page 实例
     */
    constructor(page: Page) {
        this.AccountTransferPage = new AccountTransferPage(page);
        this.BeneficiaryPage = new BeneficiaryPage(page);
    }
}
