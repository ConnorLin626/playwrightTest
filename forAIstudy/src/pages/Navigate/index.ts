/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { TestPages, SIT } from '../../lib';
import { LoginPage } from './LoginPage';
import { NextPage } from './NextPage';
import { LandingPage } from './LandingPage';
import { browser } from 'protractor';

export {
  LoginPage, NextPage, LandingPage
};

export class NavigatePages extends TestPages {
  public loginPage: LoginPage;
  public nextPage: NextPage;
  public landingPage: LandingPage;

  constructor() {
    super();
    this.loginPage = new LoginPage();
    this.nextPage = new NextPage();
    this.landingPage = new LandingPage();
  }

  public async loginCB(orgid: string, userid: string): Promise<void> {
    await this.loginPage.loginCB(orgid, userid);
    //await browser.sleep(2000);
    await this.nextPage.next();
    if (SIT) {
      //await this.landingPage.handlerPayNow();
    }
    //await this.landingPage.pageSwitchToUX();
    //await browser.angularAppRoot('my-app');
    // await this.landingPage.saveLoginParams();
  }

  public async loginSAM(userid: string): Promise<void> {
    await this.loginPage.loginSAM(userid);
  }
  
  public async loginNewSAM(userid: string): Promise<void> {
    await this.loginPage.loginNewSAM(userid);
  }
  
  public async loginSSM(userid: string, orgid?: string): Promise<void> {
    await this.loginPage.loginSSM(userid, orgid);
  }
  
  public async loginIdealx(orgid: string, userid: string, pinid: string): Promise<void> {
    await this.loginPage.loginIdealx(orgid, userid, pinid);
  }
  
  public async loginIdealXSAM(userid: string): Promise<void> {
    await this.loginPage.loginIdealXSAM(userid);
  }

  public async loginIdealxForLang(orgid: string, userid: string, pinid: string, lang: string): Promise<void> {
    await this.loginPage.loginIdealxForLang(orgid, userid, pinid, lang);
  }
}
