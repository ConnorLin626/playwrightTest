import { Page } from '@playwright/test';
import { AccountTransferPage } from './AccountTransferPage';
import { BeneficiaryPage } from './BeneficiaryPage';
import { SinglePaymentPage } from './SinglePaymentPage';
import { TransferCentersPage } from './TransferCenterPage';
import { PaymentTemplatesPage } from './PaymentTemplatesPage';

export {
    AccountTransferPage,
    BeneficiaryPage,
    SinglePaymentPage,
    TransferCentersPage,
    PaymentTemplatesPage
};

/**
 * PayTransfer 页面集合类
 * 基于 forAIstudy/src/pages/IDEALX/PayTransfer/index.ts 的 PaymentsPages
 * 统一管理和创建所有 PayTransfer 相关的页面对象
 */
export class PaymentsPages {
    public AccountTransferPage: AccountTransferPage;
    public BeneficiaryPage: BeneficiaryPage;
    public singlePaymentPage: SinglePaymentPage;
    public TransferCentersPage: TransferCentersPage;
    public PaymentTemplatesPage: PaymentTemplatesPage;

    /**
     * 构造函数 - 接收 Page 实例并创建所有页面对象
     * @param page - Playwright Page 实例
     */
    constructor(page: Page) {
        this.AccountTransferPage = new AccountTransferPage(page);
        this.BeneficiaryPage = new BeneficiaryPage(page);
        this.singlePaymentPage = new SinglePaymentPage(page);
        this.TransferCentersPage = new TransferCentersPage(page);
        this.PaymentTemplatesPage = new PaymentTemplatesPage(page);
    }
}
