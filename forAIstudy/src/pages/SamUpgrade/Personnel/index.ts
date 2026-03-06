/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { SupportPage } from './SupportPage';
import { TestPages } from '../../../lib';
import { GroupPage } from './GroupPage';
import { ActivityPage } from './ActivityPage';
import { SearchPage } from './SearchPage';

export {
  SupportPage, GroupPage,ActivityPage,SearchPage
};

export class PersonnelPages extends TestPages {
  public supportPage: SupportPage;
  public groupPage: GroupPage;
  public activityPage: ActivityPage;
  public searchPage: SearchPage;

  constructor() {
    super();
    this.supportPage = new SupportPage();
    this.groupPage = new GroupPage();
    this.activityPage = new ActivityPage();
    this.searchPage = new SearchPage();
  }

}