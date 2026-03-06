/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { ActivitiesPage } from '../Account/ActivitiesPage';
import { ConfigurationsPage } from '../../SAM/Configurations/ConfigurationsPage';
import { DashboardPage } from './DashboardPage';
import { FixedDepositsPage } from '../Account/FixedDepositsPage';
import { TestPages } from '../../../lib';
import { ResourcesCenter }from './ResourcesCenter';
import { messageToBusinessCarePage } from './messageToBusinessCarePage';

export {
  ConfigurationsPage,
  DashboardPage,
  ResourcesCenter
}

export class DashboardPages extends TestPages {
  public activities: ActivitiesPage;
  public configurationsPage: ConfigurationsPage;
  public dashboardPage: DashboardPage;
  public ResourcesCenter:ResourcesCenter;
  public fixedDepositsPage: FixedDepositsPage;
  public messageToBusinessCarePage: messageToBusinessCarePage;

  constructor() {
    super();
    this.activities = new ActivitiesPage();
    this.configurationsPage = new ConfigurationsPage();
    this.dashboardPage = new DashboardPage();
    this.fixedDepositsPage = new FixedDepositsPage();
    this.ResourcesCenter = new ResourcesCenter();
    this.messageToBusinessCarePage = new messageToBusinessCarePage();
  }
}