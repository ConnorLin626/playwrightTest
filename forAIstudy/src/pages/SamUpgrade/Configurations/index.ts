/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ConfigurationsPage } from './ConfigurationsPage';
import { NoticesPage } from './NoticesPage';
import { ProductsPage } from './ProductsPage';
import { ClassOfServicePage } from './ClassOfServicePage';
import { SystemPage } from './SystemPage';
import { TestPages } from '../../../lib';

export {
  ConfigurationsPage
};

export class ConfigurationsPages extends TestPages {
  public configurationsPage: ConfigurationsPage;
  public noticesPage: NoticesPage;
  public productsPage: ProductsPage;
  public classofservicePage: ClassOfServicePage;
  public systemPage: SystemPage;

  constructor() {
    super();
    this.configurationsPage = new ConfigurationsPage();
    this.noticesPage = new NoticesPage();
    this.productsPage = new ProductsPage();
    this.classofservicePage = new ClassOfServicePage();
    this.systemPage = new SystemPage();
    
  }

}