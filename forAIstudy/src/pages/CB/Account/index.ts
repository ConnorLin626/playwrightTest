/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ActivitiesPage } from './ActivitiesPage';
import { BalancesPage } from './BalancesPage';
import { FixedDepositsPage } from './FixedDepositsPage'
import { LoansPage } from './LoansPage'
import { ChequeStatusPage } from './ChequeStatusPage'
import { TestPages } from '../../../lib';

export {
  BalancesPage, ActivitiesPage, FixedDepositsPage, LoansPage
};

export class AccountPages extends TestPages {
  public activitiesPage: ActivitiesPage;
  public balancesPage: BalancesPage;
  public fixedDepositsPage: FixedDepositsPage;
  public loansPage: LoansPage;
  public chequeStatusPage: ChequeStatusPage;

  constructor() {
    super();
    this.activitiesPage = new ActivitiesPage();
    this.balancesPage = new BalancesPage();
    this.fixedDepositsPage = new FixedDepositsPage();
    this.loansPage = new LoansPage();
    this.chequeStatusPage = new ChequeStatusPage();
  }

}
