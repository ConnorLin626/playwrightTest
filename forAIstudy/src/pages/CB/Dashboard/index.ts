/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ActivitiesPage } from '../Account/ActivitiesPage';
import { BeneficiaryPage } from "../Payments/BeneficiaryPage";
import { BulkPaymentpage } from '../Payments/BulkPaymentpage';
import { ConfigurationsPage } from '../../SAM/Configurations/ConfigurationsPage';
import { DashboardPage } from './DashboardPage';
import { FixedDepositsPage } from '../Account/FixedDepositsPage';
import { LoansPage } from '../Account/LoansPage'
import { PaymentPage } from '../Payments/PaymentPage';
import { PaymentsTransactionsFilesPage, TransferCentersPage } from "../Approvals";
import { PaymentTemplatesPage } from "../Payments";
import { TestPages } from '../../../lib';
import { ResourcesCenter }from './ResourcesCenter';

export {
  BulkPaymentpage,
  ConfigurationsPage,
  DashboardPage,
  ResourcesCenter,
  PaymentPage
}

export class DashboardPages extends TestPages {
  public activities: ActivitiesPage;
  public BeneficiaryPage: BeneficiaryPage;
  public bulkPaymentPage: BulkPaymentpage;
  public configurationsPage: ConfigurationsPage;
  public dashboardPage: DashboardPage;
  public ResourcesCenter:ResourcesCenter;
  public fixedDepositsPage: FixedDepositsPage;
  public loansPage: LoansPage;
  public paymentPage: PaymentPage;
  public paymentsTransactionsFilesPage: PaymentsTransactionsFilesPage;
  public PaymentTemplatesPage: PaymentTemplatesPage;
  public transferCentersPage: TransferCentersPage;

  constructor() {
    super();
    this.activities = new ActivitiesPage();
    this.BeneficiaryPage = new BeneficiaryPage();
    this.bulkPaymentPage = new BulkPaymentpage();
    this.configurationsPage = new ConfigurationsPage();
    this.dashboardPage = new DashboardPage();
    this.fixedDepositsPage = new FixedDepositsPage();
    this.loansPage = new LoansPage();
    this.paymentPage = new PaymentPage();
    this.paymentsTransactionsFilesPage = new PaymentsTransactionsFilesPage();
    this.PaymentTemplatesPage = new PaymentTemplatesPage();
    this.transferCentersPage = new TransferCentersPage();
    this.ResourcesCenter = new ResourcesCenter();
  }
}