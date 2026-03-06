/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { FXContractsPage } from './FXContractsPage';
import { DOLFXContractsPage } from './DOLFXContractsPage';
import { TestPages } from '../../../lib';

export {
	  FXContractsPage, DOLFXContractsPage
};

export class ForexPage extends TestPages {
    public FXContractsPage: FXContractsPage;
    public DOLFXContractsPage: DOLFXContractsPage;

    constructor() {
        super();
        this.FXContractsPage = new FXContractsPage();
        this.DOLFXContractsPage = new DOLFXContractsPage();
    }
}