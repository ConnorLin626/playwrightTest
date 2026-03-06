/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ReportsPage } from './ReportsPage';
import { TestPages } from '../../../lib';

export {
    ReportsPage,
};

export class ReportsPages extends TestPages {
    public reportsPage: ReportsPage;

    constructor() {
        super();
        this.reportsPage = new ReportsPage();
    }

}
