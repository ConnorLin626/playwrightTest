/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ConfigurationsPage } from './ConfigurationsPage';
import { TestPages } from '../../../lib';

export {
  ConfigurationsPage
};

export class ConfigurationsPages extends TestPages {
  public configurationsPage: ConfigurationsPage;

  constructor() {
    super();
    this.configurationsPage = new ConfigurationsPage();
  }

}