/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ViewSubsiPage } from './ViewSubsiPage';
import { TestPages } from '../../../lib';
import { AccountTransferPage } from '../PayTransfer/AccountTransferPage';
import { TelegraphicTransferPage } from '../PayTransfer/TelegraphicTransferPage';
import { TransferCentersPage } from '../PayTransfer/TransferCenterPage';
import { PaymentTemplatesPage } from '../PayTransfer/PaymentTemplatesPage';

export {
    ViewSubsiPage, AccountTransferPage, TransferCentersPage,PaymentTemplatesPage,TelegraphicTransferPage
};

export class SwitchToSubsiPages extends TestPages {
    public viewSubsiPage: ViewSubsiPage;
    public accountTransferPage: AccountTransferPage;
    public PaymentTemplatesPage: PaymentTemplatesPage;
    public transferCentersPage: TransferCentersPage;
    public TelegraphicTransferPage: TelegraphicTransferPage;
    constructor() {
        super();
        this.viewSubsiPage = new ViewSubsiPage();
        this.accountTransferPage = new AccountTransferPage();
        this.transferCentersPage = new TransferCentersPage();
        this.PaymentTemplatesPage = new PaymentTemplatesPage();
        this.TelegraphicTransferPage = new TelegraphicTransferPage();
    }
}

