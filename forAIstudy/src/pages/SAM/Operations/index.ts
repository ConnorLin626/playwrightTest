/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { SchedulesPage } from './SchedulesPage';
import { TestPages } from '../../../lib';
import { TransactionEnquiryPage } from './TransactionEnquiryPage';

export {
  SchedulesPage, TransactionEnquiryPage
};

export class OperationsPages extends TestPages {
  public schedulesPage: SchedulesPage;
  public transactionEnquiryPage: TransactionEnquiryPage;

  constructor() {
    super();
    this.schedulesPage = new SchedulesPage();
    this.transactionEnquiryPage = new TransactionEnquiryPage();
  }

}
