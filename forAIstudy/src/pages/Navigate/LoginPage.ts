/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForUXLoading,SIT, OptionSelect,ensure } from '../../lib';


@log export class LoginPage extends Page {

  @component('//*[@id="OID"]') public OrganisationID: TextInput;
  @component('//*[@id="UID"]') public UserID: TextInput;
  @component('//*[@id="password"]') public Password: TextInput;
  @component('//*[@id="sac"]') public SecurityAccessCode: TextInput;
  @component('//*[@id="lang"]') public language: OptionSelect;
  @component('//*[@value="vi_vn"]') public Vietnamese: TextInput;

  @component('//*[@id="corpId"]') public SsmOrganisationID: TextInput;
  @component('//*[@id="username"]') public SsmUserID: TextInput;

  @component('//*[@id="corpId"]') public IdealxOrgID: TextInput;
  @component('//*[@id="username"]') public IdealxUserID: TextInput;
  @component('//*[@name="psw"]') public IdealxPinID: TextInput;
  @component('//*[@id="nav-item-navBBTopPaymentsLinkText"]') public paymentMenu: Button;
  @component('//*[@class="header-company__name"]') public companyMenu: Button;
  @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[2]/div[2]/button') public digiToken: Button;
  @component('//*[@id="mat-dialog-0"]/dbs-mars-auth-dialog/div/div[2]/input') public enterCode: TextInput;
  @component('//div[@class="mat-dialog-actions"]') public authNow: Button;
  //IE SSL 
  @component('//*[@id="moreInfoContainer"]/a') public MoreInfoContainer: Button;
  @component('//*[@id="overridelink"]') public OverrideLink: Button;

  @component('//*[@name="submit_sbuserLogin"]') public CBSubmit: Button;
  @component('//*[@name="submit_csrLogin"]') public SAMSubmit: Button;
  @component('//*[@id="id01"]/div/button') public SSMSubmit: Button;
  @component('//*[@type="submit"]') public IdealxSubmit: Button;

  //CN
  @component('//*[@id="checkbox_0"]') public checkbox0: Button;
  @component('//*[@id="checkbox_1"]') public checkbox1: Button;
  @component('//*[@class="btn btn__primary"]') public acknowledge: Button;

  //UAT
  @component('//login-pin/div/div[4]/div/login-form/div[1]/div[2]/button[1]') public loginWithOrgID: Button;
  @component('//*[@id="OID"]') public uatOrgID: TextInput;
  @component('//*[@id="UID"]') public uatUserID: TextInput;
  @component('//*[@id="PIN"]') public uatPinID: TextInput;
  @component('//*[@id="SAC"]') public uatSAC: TextInput;
  @component('//*[@class="link-primary link-underline-opacity-0"]') public enterCode2: Button;
  @component('//swipe-prompt-modal/div[2]/div/button[1]') public enterCode3: Button;
  @component('//*[@class="btn btn-lg btn-primary modal-button"]') public authenticateNow: Button;
  
  

  constructor() {
    super();
  }

  public async loadCondition() {
    //IE SSL handler
    let that = this;
    await browser.getCapabilities().then(async (_capabilities) => {
      if (undefined !== _capabilities && "internet explorer" === _capabilities.get('browserName')) {
        await that.MoreInfoContainer.clickIfExist();
        await that.OverrideLink.clickIfExist();
      }
    });
    await browser.wait(ExpectedConditions.visibilityOf(this.CBSubmit.element), this.CBSubmit.getTimeOut());
  }

  public async loginCB(orgid: string, userid: string): Promise<void> {
    await browser.get(browser.baseUrl);
    await this.loadCondition();
    await this.OrganisationID.input(orgid);
    await this.UserID.input(userid);
    await this.CBSubmit.click();
  }

  public async loginSAM(userid: string): Promise<void> {
    await browser.get(browser.baseUrl);
    await this.loadIdealxCondition();
    //await this.OrganisationID.input(orgid);
    await this.UserID.input(userid);
    await this.Password.input("123123");
    await this.SecurityAccessCode.input("123123");
    await this.SAMSubmit.click();
  }

  public async loginNewSAM(userid: string): Promise<void> {
    // const protractorConf = require('../../../config/protractor.config.js');
    // await browser.get(protractorConf.config.newSamUrl);
    await browser.get(browser.baseUrl);
    //await browser.get(browser.newSamUrl);
    await this.loadIdealxCondition();
    //await this.OrganisationID.input(orgid);
    await this.UserID.input(userid);
    await this.Password.input("123123");
    await this.SecurityAccessCode.input("123123");
    await this.SAMSubmit.click();
  }

  public async loadSSMCondition() {
    //IE SSL handler
    let that = this;
    await browser.getCapabilities().then(async (_capabilities) => {
      if (undefined !== _capabilities && "internet explorer" === _capabilities.get('browserName')) {
        await that.MoreInfoContainer.clickIfExist();
        await that.OverrideLink.clickIfExist();
      }
    });
    await browser.wait(ExpectedConditions.visibilityOf(this.SSMSubmit.element), this.SSMSubmit.getTimeOut());
  }

  public async loginSSM(userid: string, orgid: string): Promise<void> {
    const protractorConf = require('../../../config/protractor.config.244.js');
    await browser.get(protractorConf.config.ssmUrl);
    await this.loadSSMCondition();
    await this.SsmUserID.input(userid);
    await this.SsmOrganisationID.input(orgid);
    await this.SSMSubmit.click();
  }

  public async loginIdealx(orgid: string, userid: string, pinid: string): Promise<void> {
    const protractorConf = require('../../../config/protractor.config.js');
    await browser.get(protractorConf.config.idealxUrl);
    if(SIT){
      await this.loadIdealxCondition();
      await this.IdealxOrgID.input(orgid);
      await this.IdealxUserID.input(userid);
      await this.IdealxPinID.input(pinid);
      await this.IdealxSubmit.click();
      if(orgid.includes('CN')){
        await this.checkbox0.jsClickIfExist();
        await this.checkbox1.jsClickIfExist();
        await this.acknowledge.jsClickIfExist();
      }
      await this.loadConditionForMenu();
    }else{
      await this.loginWithOrgID.jsClick();
      await this.uatOrgID.input(orgid);
      await this.uatUserID.input(userid);
      await this.uatPinID.input(pinid);
      await this.IdealxSubmit.click();
      await browser.sleep(5000);
      const isVisible = await this.enterCode2.isElementPresent();
      console.log("isVisible:"+isVisible);
      if(isVisible){
        console.log("isVisible:"+isVisible);
        await this.enterCode2.jsClick();
        await this.enterCode3.jsClick();
      }
      // await this.enterCode2.jsClickIfExist();
      // await this.enterCode3.jsClickIfExist();
      await this.uatSAC.input("123123");
      await this.authenticateNow.jsClick();
    }
  }

  public async loginIdealXSAM(userid: string): Promise<void> {
    const protractorConf = require('../../../config/protractor.config.js');
    await browser.get(protractorConf.config.newSamUrl);
    await this.loadCondition();
    //await this.OrganisationID.input(orgid);
    await this.UserID.input(userid);
    await this.SAMSubmit.click();
  }

  public async loadIdealxCondition() {
    //IE SSL handler
    let that = this;
    await browser.getCapabilities().then(async (_capabilities) => {
      if (undefined !== _capabilities && "internet explorer" === _capabilities.get('browserName')) {
        await that.MoreInfoContainer.clickIfExist();
        await that.OverrideLink.clickIfExist();
      }
    });
    await browser.wait(ExpectedConditions.visibilityOf(this.IdealxSubmit.element), this.IdealxSubmit.getTimeOut());
  }
  public async loadConditionForMenu() {
    await waitForUXLoading()
    await browser.wait(ExpectedConditions.elementToBeClickable(this.companyMenu.element), this.companyMenu.getTimeOut());
    await browser.sleep(2000)
  }
  public async loadConditionForDigiPopUp() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.digiToken.element), this.digiToken.getTimeOut());
  }

  public async loginIdealxForLang(orgid: string, userid: string, pinid: string, lang: string): Promise<void> {
    const protractorConf = require('../../../config/protractor.config.js');
    await browser.get(protractorConf.config.idealxUrl);
    await this.loadIdealxCondition();
    await this.language.click();
    await this.Vietnamese.click();
    await this.IdealxOrgID.input(orgid);
    await this.IdealxUserID.input(userid);
    await this.IdealxPinID.input(pinid);
    await this.IdealxSubmit.click();
    if(orgid.includes('CN')){
        await this.checkbox0.jsClickIfExist();
        await this.checkbox1.jsClickIfExist();
        await this.acknowledge.jsClickIfExist();
    }
    await this.loadConditionForMenu();
    if(!SIT){
      await this.paymentMenu.click();
      await this.loadConditionForDigiPopUp();
      await this.digiToken.click();
      await this.enterCode.click();
      await this.enterCode.input("123123");
      await this.digiToken.click();}
  }
}
