/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class GroupPage extends Page {
    constructor() {
      super();
    }


    @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[6]/a') public topPersonnelLink: Button;
    @component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[4]/a') public groupLink: Button;
    @component('//select[@name="searchBy"]') public selectSearchBy: HtmlSelect;
    @component('//input[@name="searchFor"]') public inputSearchFor: TextInput;
    @component('//input[@name="search"]') public searchGroup: Button;
    @component('/html/body/table[2]/tbody/tr[11]/td[2]/a') public firstGroupLink: Button;

    //create support group
    @component('/html/body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[1]/small[1]/a') public createSupportGroupLink: Button;
    @component('//input[@name="name"]') public inputGroupName: TextInput;
    @component('//input[@name="msgName"]') public inputSecureMsgName: TextInput;
    @component('//input[@name="submit_createPreview"]') public continueButton: Button;
    @component('//input[@name="submit_preview"]') public previewGroupButton: Button;
    @component('//input[@name="submit_createSubmit"]') public submitGroupButton: Button;

    @component('//input[@name="submit_delete"]') public previewDeleteGroupButton: Button;
    @component('//input[@name="delete"]') public submitDeleteGroupButton: Button;

    //list all support groups
    @component('/html/body/table[2]/tbody/tr[7]/td[2]/table/tbody/tr[2]/td[1]/small[2]/a') public listAllSupportGroupsLink: Button;
    @component('/html/body/table[2]/tbody/tr[11]/td[2]/a') public groupNameLabel: TextInput;

    
    //edit support groups
    @component('//input[@id="behalfOfAccess1"]') public OBOFullAccess: Button;
    @component('//input[@id="accountAccess2"]') public AccountCustomizeAccess: Button;
    @component('//input[@id="personnelAccess2"]') public PersonnelCustomizeAccess: Button;
    @component('//input[@id="operationAccess2"]') public OperationCustomizeAccess: Button;
    @component('//input[@id="configurationAccess2"]') public ConfigurationCustomizeAccess: Button;
    @component('//input[@id="accountStatus01"]') public AddAccounts: Button;
    @component('//input[@id="personnelStatus01"]') public SearchSupportPersonActivity: Button;
    @component('//input[@id="operationsStatus01"]') public CreateMarketingMessage: Button;
    @component('//input[@id="configurationStatus01"]') public ModifyAlerts: Button;
    @component('//input[@id="behalfOfStatus01"]') public ViewTradeFinanceData: Button;
    @component('//input[@name="submit_back"]') public backBtn: Button;
    @component('//input[@name="preview"]') public editContinueBtn: Button;
    @component('//input[@name="customizePreview"]') public editPreviewBtn: Button;  
    @component('//input[@name="modify"]') public editSubmitBtn: Button;

    
    public async loadCondition() {
      await browser.wait(ExpectedConditions.elementToBeClickable(this.searchGroup.element), this.searchGroup.getTimeOut());
  }
}