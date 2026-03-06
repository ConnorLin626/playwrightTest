/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';
import { ConfigurationsPages } from '..';

@log export class ClassOfServicePage extends Page {
  constructor() {
    super();
  }

//ClassOfService Link

@component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[10]/a') public toConfigurationLink: Button;
@component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[6]/a') public classOfServiceLink: Button;
@component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
@component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
@component('/html/body/table[2]/tbody/tr[8]/td[2]/table/tbody/tr[2]/td[1]/small/a') public createCOSLink: Button;

@component('//input[@name="name"]')  public inputCOSName: TextInput;
@component('//input[@name="displayTemplateDualAuth"]') public templateDualAuthCheckbox: Button;
@component('//input[@name="featureValueObjects[31].isActivated"]') public fileUploadFTPCheckbox: Button;
@component('//input[@name="featureValueObjects[32].isActivated"]') public fileUploadManualCheckbox: Button;
@component('//input[@name="featureValueObjects[33].isActivated"]') public fileUploadReportCheckbox: Button;

@component('//input[@name="featureValueObjects[101].isActivated"]') public SGAccountTransferCheckbox: Button;
@component('//input[@name="featureValueObjects[102].isActivated"]') public SGBulkGIROCollection: Button;
@component('//input[@name="featureValueObjects[103].isActivated"]') public SGBulkGIROCollectionDBSCheckbox: Button;

@component('//input[@name="cppreview"]') public previewClassButton: Button;
@component('//input[@name="update"]') public submitClassButton: Button;
@component('//input[@name="approve"]') public approveClassButton: Button;

@component('//*[contains(@href,"/samweb/csr/common/company/bom/") and contains(text(),"AButoTestCOS_Name")]') public COSToBeDeleteLink: Button;
@component('//*[contains(@href,"/samweb/csr/common/company/bom/") and contains(text(),"Pending Add Approval")]') public PendingAddApproval: Button;
@component('//*[contains(@href,"/samweb/csr/common/company/bom/") and contains(text(),"Pending Delete Approval")]') public PendingDeleteApproval: Button;
@component('//*[contains(@href,"/samweb/csr/common/company/bom/") and contains(text(),"Pending Modify Approval")]') public PendingModifyApproval: Button;
@component('//input[@name="submit_cpdelete"]') public previewDeleteCOSButton: Button;
@component('//input[@name="cpdelete"]') public deleteCOSButton: Button;

public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.createCOSLink.element), this.createCOSLink.getTimeOut());
  }
}