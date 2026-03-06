/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class SupportPage extends Page {
  constructor() {
    super();
  }

  //Support Link
  @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[6]/a') public topPersonnelLink: Button;
  @component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[2]/a') public supportLink: Button;
  @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
  @component('//input[@name="submit_affiliate"]') public submitAffiliate:Button;
  @component('//select[@name="loginIDAA"]') public selectSearchBy: HtmlSelect;
  @component('//input[@name="inputText"]') public inputSearchFor: TextInput;
  @component('//input[@name="submit_submit"]') public searchSupport: Button;
  @component('//*[@title="linkApproveUserTitle"]') public approveSupport: Button;
  @component('//*[@class="enterContainer"]') public searchcontent: TextInput;
  
  @component('/html/body/table[2]/tbody/tr[11]/td[2]/a') public firstSupportPersonLink: Button;
  @component('//*[@id="msgBlockError-errorText"]/b') public CorpInfoMsg: WebComponent; // SAM- Corporations Information Message
  //@component('//a[@href="/s1gcb/csr/common/corp/corporationEditComprehensiveView?id=1426001"]') public viewCorpLink: Button;
  @component('/html/body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[1]/small[1]/a') public enrollSupportPersonnelLink: Button;
  @component('/html/body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[1]/small[2]/a') public listAllSupportPersonnelLink: Button;
  @component('/html/body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[1]/small[3]/a') public userSetupReportLink: Button;
  @component('/html/body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[3]/small[3]/a') public advancedSearchLink: Button;
  @component('/html/body/table[2]/tbody/tr[10]/td[3]') public loginIDValue: TextInput;
  @component('/html/body/table[2]/tbody/tr[11]/td[11]') public supportSearchResultStatus: TextInput;
  @component('/html/body/table[2]/tbody/tr[2]/td[2]') public advancedSearchLable: TextInput;
  @component('/html/body/table[2]/tbody/tr[11]/td[4]') public ViewEmailID: TextInput;
  
  //edit Support Person
   @component('//*[@name="actionUpdatePreview"]') public editReviewBtn: Button;
  //approve Support Person
   @component('//*[@name="submit_approve"]') public submitApproveBtn: Button;
  
  

  //enroll Support Person
  @component('//input[@name="lastName"]') public inputName: TextInput;
  @component('//input[@name="loginID"]') public inputLoginID: TextInput;
  @component('//select[@name="defaultLocale"]') public selectDefaultLanguage: HtmlSelect;
  @component('//input[@name="actionAddContinue"]') public continueSubmit: Button;
  @component('//input[@name="phoneNumber1"]') public inputPhoneNumber1: TextInput;
  @component('//input[@name="emailID"]') public inputEmailID: TextInput;
  @component('//select[@name="affliateAccess"]') public selectAffiliateAccess: HtmlSelect;
  @component('//select[@name="defaultAffliate"]') public selectDefaultAffiliate: HtmlSelect;
  @component('//select[@name="defaultReport"]') public selectDefaultReport: HtmlSelect;
  @component('//input[@name="groupStatus[0]"]') public selectSAMGroup1: Button;
  //@component('//input[@name="groupStatus[1]"]') public selectSAMGroup2: Button;
  //@component('//input[@name="groupStatus[2]"]') public selectSAMGroup3: Button;
  //@component('//input[@name="groupStatus[3]"]') public selectSAMGroup4: Button;
  //@component('//input[@name="groupStatusTrade[0]"]') public selectTAMGroup1: Button;
  //@component('//input[@name="groupStatusTradeSecure[0]"]') public selectTAMSecureMsgGroup1: Button;
  @component('//input[@name="actionAddPreview"]') public previewPersonButton: Button;
  @component('//input[@name="actionPreviewSubmit"]') public submitPersonButton: Button;
  @component('//input[@name="actionAddCancel"]') public cancelSubmit: Button;
  
  //list all
  @component('/html/body/table[2]/tbody/tr[11]/td[2]/a') public logIDLabel: TextInput;
  //User Setup Report
  @component('//select[@name="selectedSupportPerson"]') public reportViewByUser: HtmlSelect;
  @component('//input[@name="submit_view"]') public viewUserSetupReportButton: Button;
  @component('//*[contains(@id,"AUTOGENBOOKMARK_4_")]') public reportTitle: TextInput;

  public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.searchSupport.element), this.searchSupport.getTimeOut());
  }
  public async loadConditionOnReportPage() {
    await browser.wait(ExpectedConditions.visibilityOf(this.reportTitle.element), this.reportTitle.getTimeOut());
  }
}