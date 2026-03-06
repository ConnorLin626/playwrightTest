/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ActivitiesPage } from './ActivitiesPage';
import { BalancesPage } from './BalancesPage';
import { FixedDepositsPage } from './FixedDepositsPage'
// import { LoansPage } from './LoansPage'
import { ChequeStatusPage } from './ChequeStatusPage';
import { AuditConfirmationsPage } from './AuditConfirmationsPage';
import { TestPages } from '../../../lib';

export {
    //BalancesPage, ActivitiesPage, FixedDepositsPage, LoansPage
    FixedDepositsPage, BalancesPage, ActivitiesPage, ChequeStatusPage, AuditConfirmationsPage
};

export class AccountPages extends TestPages {
    public activitiesPage: ActivitiesPage;
    public balancesPage: BalancesPage;
    public FixedDepositsPage: FixedDepositsPage;
    // public loansPage: LoansPage;
    public chequeStatusPage: ChequeStatusPage;
    public auditConfirmationsPage: AuditConfirmationsPage;

    constructor() {
        super();
        this.activitiesPage = new ActivitiesPage();
        this.balancesPage = new BalancesPage();
        this.FixedDepositsPage = new FixedDepositsPage();
        // this.loansPage = new LoansPage();
        this.chequeStatusPage = new ChequeStatusPage();
        this.auditConfirmationsPage=new AuditConfirmationsPage();
    }

}
