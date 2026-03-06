/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ActivitiesPage } from '../Account/ActivitiesPage';
import { BeneficiaryPage } from "../Payments/BeneficiaryPage";
import { BulkPaymentpage } from '../Payments/BulkPaymentpage';
import { ConfigurationsPage } from '../../SAM/Configurations/ConfigurationsPage';
import { FixedDepositsPage } from '../Account/FixedDepositsPage';
import { LoansPage } from '../Account/LoansPage'
import { PaymentPage } from '../Payments/PaymentPage';
import { PaymentsTransactionsFilesPage, TransferCentersPage } from "../Approvals";
import { PaymentTemplatesPage } from "../Payments";
import { TestPages } from '../../../lib';
import {OnlineRollPage} from './OnlineRollPage';
import {DashboardPage} from "../Dashboard";

export {
  BulkPaymentpage,
  ConfigurationsPage,
  OnlineRollPage,
  PaymentPage
}

export class OnlineRollPages extends TestPages {
  public activities: ActivitiesPage;
  public BeneficiaryPage: BeneficiaryPage;
  public bulkPaymentPage: BulkPaymentpage;
  public configurationsPage: ConfigurationsPage;
  public paymentPage: PaymentPage;
  public paymentsTransactionsFilesPage: PaymentsTransactionsFilesPage;
  public PaymentTemplatesPage: PaymentTemplatesPage;
  public transferCentersPage: TransferCentersPage;
  public onlineRollPage: OnlineRollPage;
  public dashboardPage: DashboardPage;

  constructor() {
    super();
    this.activities = new ActivitiesPage();
    this.BeneficiaryPage = new BeneficiaryPage();
    this.bulkPaymentPage = new BulkPaymentpage();
    this.configurationsPage = new ConfigurationsPage();
    this.onlineRollPage = new OnlineRollPage();
    this.paymentPage = new PaymentPage();
    this.paymentsTransactionsFilesPage = new PaymentsTransactionsFilesPage();
    this.PaymentTemplatesPage = new PaymentTemplatesPage();
    this.transferCentersPage = new TransferCentersPage();
    this.dashboardPage = new DashboardPage();
  }
}