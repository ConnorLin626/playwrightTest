/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { SchedulesPage } from './SchedulesPage';
import { TestPages } from '../../../lib';
import { TransactionEnquiryPage } from './TransactionEnquiryPage';
import { ReportsPage } from './ReportsPage';
//import { MarketingPage } from './MarketingPage';
import { FileExchangeSendPage } from './FileExchangeSendPage';
import { FileExchangeReceivePage } from './FileExchangeReceivePage';
import { FileUploadEnquiryPage } from './FileUploadEnquiryPage';
import { BulkEntitlementGrantPage } from './BulkEntitlementGrantPage';

export {
  ReportsPage, SchedulesPage, TransactionEnquiryPage,FileExchangeSendPage,FileExchangeReceivePage,FileUploadEnquiryPage,BulkEntitlementGrantPage,
};

export class OperationsPages extends TestPages {
  public reportsPage: ReportsPage;
  //public marketingPage: MarketingPage;
  public schedulesPage: SchedulesPage;
  public transactionEnquiryPage: TransactionEnquiryPage;
  public fileExchangeSendPage: FileExchangeSendPage;
  public fileExchangeReceivePage: FileExchangeReceivePage;
  public fileUploadEnquiryPage: FileUploadEnquiryPage;
  public bulkEntitlementGrantPage: BulkEntitlementGrantPage;
  constructor() {
    super();
    this.reportsPage = new  ReportsPage();
    //this.marketingPage = new MarketingPage();
    this.schedulesPage = new SchedulesPage();
    this.transactionEnquiryPage = new TransactionEnquiryPage();
    this.fileExchangeSendPage = new FileExchangeSendPage();
    this.fileExchangeReceivePage = new FileExchangeReceivePage();
    this.fileUploadEnquiryPage = new FileUploadEnquiryPage();
    this.bulkEntitlementGrantPage = new BulkEntitlementGrantPage();
  }

}
