/*
 * ©Copyright ACI Worldwide, Inc. 2024
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect,FileSelect, ensure, OptionSelect } from '../../../lib';

@log export class BulkEntitlementGrantPage extends Page {
    constructor() {
      super();
    }

    @component('//input[@name="search"]') public searchHomeButton: Button;
    @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
    @component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
    @component('//a[@title="Setup System Operations and Events"]') public topOperationsLink: Button;
    @component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[20]/a') public bulkEntitlementGrantLink: Button;
    @component('//tbody/tr[2]/td/table/tbody/tr[2]/td[3]/a') public topRecordLink: Button;
    @component('//table[2]/tbody/tr[6]/td[2]/table[1]/tbody/tr[2]/td[1]/small/a') public newRequestLink: Button;
    
    //create request page
    @component('//textarea[@name="description"]') public description: TextInput;
    @component('//select[@id="entitlementType"]') public entitlementType: TextInput;
    @component('//textarea[@name="customerSelection.orgIds"]') public corporations: TextInput;
    @component('//*[@id="customerFileRadio"]') public CSVFile: Button;
    @component('//*[@name="customerFile"]') public corporationUpload: FileSelect;
    @component('//select[@name="flagBody.multipleSelection.options"]') public selectMultiFlag : TextInput;
    @component('//select[@id="flagBody.singleSelections1.value"]') public  selectDigitalDocumentation: TextInput;
    @component('//input[@id="flagBody.singleSelections6.value3"]') public newApprovalButton: Button;
    @component('//select[@name="widgetBody.multipleSelection.options"]') public selectWidget: TextInput;
    @component('//select[@name="cosBody.productSelection.ifHas"]') public ifCustomerHasSelect: TextInput;
    @component('//select[@name="cosBody.productSelection.thenGrant"]') public thenGrantSelect: TextInput;
    @component('//input[@name="cosBody.entitlementLevels[0]"]') public cos_userFunction: Button;
    @component('//input[@name="cosBody.entitlementLevels[1]"]') public company_userAccount: Button;
    @component('//input[@name="cosBody.entitlementLevels[2]"]') public panelAuth: Button;
    @component('//select[@name="cosBody.standardUserFuncs"]') public userFunctionSelect: TextInput;
    @component('//select[@name="cosBody.accountProductCodes"]') public accountProductSelect: TextInput;
    @component('//select[@name="cosBody.accountCcys"]') public accountCcySelect: TextInput;
    @component('//input[@id="reviewSubmit"]') public reviewButton: Button;
    @component('//input[@name="submit_submit"]') public submitButton: Button;

    //edit
    @component('//input[@name="submit_edit?action=edit"]') public editButton: Button;
    @component('//input[@name="submit_update"]') public editSubmitButton: Button;

    //view page
    @component('//*[@id="valueObject"]/table/tbody/tr[10]/td[3]') public descriptionValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[12]/td[3]') public corporationsValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[18]/td[3]/select/option') public selectMultiFlagValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[20]/td[3]/select/option') public digitalDocumentationValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[22]/td[3]') public newApprovalValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[18]/td[3]/select/option') public selectWidgetValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[17]/td[3]') public ifCustomerHasValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[17]/td[4]') public thenGrantValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[26]/td[3]') public userFunctionIfHasValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[26]/td[4]') public userFunctionThenGrantValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[31]/td[3]') public accountProductValue: TextInput;
    @component('//*[@id="valueObject"]/table/tbody/tr[33]/td[3]') public accountCcyValue: TextInput;
    @component('//input[@name="submit_cancel"]') public cancelButton: Button;
    @component('//input[@name="submit_delete"]') public deleteButton: Button;

    //delete
    @component('//table[2]/tbody/tr[3]/td[2]/table/tbody/tr/td[2]/ul/li') public successMessage: TextInput;


    public async loadCondition() {
      await browser.wait(ExpectedConditions.elementToBeClickable(this.selectAffiliate.element), this.selectAffiliate.getTimeOut());
    }
    public async loadConditionOnViewBulkEntitlementGrantPage(){
      await browser.wait(ExpectedConditions.elementToBeClickable(this.editButton.element), this.editButton.getTimeOut());
    }
}
  