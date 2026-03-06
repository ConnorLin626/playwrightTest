/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { AlertRemindersPage } from './AlertRemindersPage';
import { TestPages } from '../../../lib';

export {
  AlertRemindersPage
};

export class UserInfoMastHeadPages extends TestPages {
  public alertRemindersPage: AlertRemindersPage;

  constructor() {
    super();
    this.alertRemindersPage = new AlertRemindersPage();
  }

}
