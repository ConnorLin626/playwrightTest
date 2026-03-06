/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { RefreshSessionPage } from "./RefreshSession";
import { TestPages } from "../../../lib";

export {
  RefreshSessionPage
};

export class SessionPages extends TestPages {
  public refreshSessionPage: RefreshSessionPage;

  constructor() {
    super();
    this.refreshSessionPage = new RefreshSessionPage();
  }
}