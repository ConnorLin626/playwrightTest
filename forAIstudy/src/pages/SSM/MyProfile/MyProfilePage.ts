import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, TextInput, Button, WebComponent, waitForUXLoading } from '../../../lib';

@log export class MyProfilePage extends Page {
  constructor() {
    super();
  }

  // My Profile
  @component('//*[@id="menuProfile-a"]') public MyProfilemenu: Button;
  @component('//*[@id="fullName"]') public MyProFullName: TextInput;
  @component('//*[@id="ux-tab-tabIDEALSettings"]') public IDEALsettingTab: Button;
  @component('//*[@id="userId"]') public MyProUserId: TextInput;
  @component('//*[@class="btn btn-dbs-text-sm ng-star-inserted"]') public editBtn: TextInput; 

  // Edit page
  @component('//*[@id="btn-continue"]') public continueButton: Button;
  @component('//*[@name="btn-submit"]') public submitBtn: Button;
  @component('//*[@id="btn-finish"]') public finishedButton: Button;
  @component('//*[@id="request-item-0"]') public RequestLink: Button;

  // Dashboard Page
  @component('//*[@id="dashboard-filter"]') public dashboardFilter: TextInput;
  @component('//*[@id="status"]') public ViewStatus: TextInput;
  @component('//*[@id="userId"]') public userID: TextInput;
  @component('//*[@class="page-header"]') public pageTitle: Button;
  @component('/html/body/app-root/section[1]/dbs-header/header/div/div[2]/button') public logoutButton: Button;
  @component('//*[@class="cursor-pointer ng-star-inserted"]') public affecteUser: WebComponent; 



  public async loadCondition() {
  }

  public async loadConditionMyProfileUsePar() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.MyProFullName.element), this.MyProFullName.getTimeOut());
  }

  public async loadConditionMyProfileIdeSet() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.MyProUserId.element), this.MyProUserId.getTimeOut());
  }

  public async loadConditionEditUserCont() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
  }

  public async loadConditionForSubmittedPage() {
     await waitForUXLoading();
     await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
   }

  public async loadConditionRequest() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.RequestLink.element), this.RequestLink.getTimeOut());
  }

  public async loadConditionViewRequest() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.ViewStatus.element), this.ViewStatus.getTimeOut());
  }




}

