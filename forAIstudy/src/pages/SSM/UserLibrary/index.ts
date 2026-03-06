/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { UsersPage } from './UsersPage';
import { TestPages } from '../../../lib';

export {
  UsersPage
};

export class UsersPages extends TestPages {
  public UsersPage: UsersPage;

  constructor() {
    super();
    this.UsersPage = new UsersPage();
  }

}
