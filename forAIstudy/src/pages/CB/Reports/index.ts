/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentReportsPage } from './PaymentReportsPage';
import { OATReportsListPage } from './OATReportsListPage';
import { AccountReportsPage } from './AccountReportsPage';
import { FileUploadReportsPage } from './FileUploadReportsPage';
import { AccountReportsListPage} from './AccountReportsListPage';
import { TestPages } from '../../../lib';
import { CreateAccountReportsPage } from './CreateAccountReportsPage';
import { CreateOATReportsPage } from './CreateOATReportsPage';
import { eStatementReportPage } from './eStatementReportPage';

export {
  PaymentReportsPage, AccountReportsPage,AccountReportsListPage,eStatementReportPage
};

export class ReportsPages extends TestPages {
  public paymentReportsPage: PaymentReportsPage;
  public accountReportsPage: AccountReportsPage;
  public fileUploadReportsPage: FileUploadReportsPage;
  public acctReportListPage: AccountReportsListPage;
  public createAccountReportsPage: CreateAccountReportsPage;
  public oatReportsListPage: OATReportsListPage;
  public createOATSFReportsPage: CreateOATReportsPage;
  public createOATARPReportsPage: CreateOATReportsPage;
  public createOATBFReportsPage: CreateOATReportsPage;
  public eStatementReportPage: eStatementReportPage;


  constructor() {
    super();
    this.paymentReportsPage = new PaymentReportsPage();
    this.accountReportsPage = new AccountReportsPage();
    this.fileUploadReportsPage = new FileUploadReportsPage();
    this.acctReportListPage = new AccountReportsListPage();
    this.createAccountReportsPage = new CreateAccountReportsPage();
    this.createOATSFReportsPage = new CreateOATReportsPage();
    this.createOATARPReportsPage = new CreateOATReportsPage();
    this.createOATBFReportsPage = new CreateOATReportsPage();
    this.oatReportsListPage = new OATReportsListPage();
    this.eStatementReportPage = new eStatementReportPage();

  }

}
