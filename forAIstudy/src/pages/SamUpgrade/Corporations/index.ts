/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { CorporationsPage } from './CorporationsPage';
import { TestPages } from '../../../lib';

export {
  CorporationsPage
};

export class CorporationsPages extends TestPages {
  public corporationsPage: CorporationsPage;

  constructor() {
    super();
    this.corporationsPage = new CorporationsPage();
  }

}
