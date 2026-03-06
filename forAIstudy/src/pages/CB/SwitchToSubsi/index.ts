/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ViewSubsiPage } from './ViewSubsiPage';
import { TestPages } from '../../../lib';
import { AccountTransferPage } from '../Payments/AccountTransferPage';
import { TransferCentersPage } from '../Payments/TransferCenterPage';
import { BulkPaymentpage } from '../Payments/BulkPaymentpage';
export {
  ViewSubsiPage, AccountTransferPage, TransferCentersPage,BulkPaymentpage
};

export class SwitchToSubsiPages extends TestPages {
  public viewSubsiPage: ViewSubsiPage;
  public accountTransferPage: AccountTransferPage;
  public transferCentersPage: TransferCentersPage;
  public BulkPaymentpage: BulkPaymentpage;
  constructor() {
    super();
    this.viewSubsiPage = new ViewSubsiPage();
    this.accountTransferPage = new AccountTransferPage();
    this.transferCentersPage = new TransferCentersPage();
    this.BulkPaymentpage = new BulkPaymentpage();
  }
}

