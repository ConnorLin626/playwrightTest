/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class ProductsPage extends Page {
  constructor() {
    super();
  }

//Products Link

@component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[10]/a') public toConfigurationLink: Button;
@component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[4]/a') public productsLink: Button;
@component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
@component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
@component('/html/body/table[2]/tbody/tr[9]/td[2]/a') public savingProductLink: Button;
@component('//a[@href="/samweb/csr/common/product/create?subTypeId=1"]') public createProductLink: Button
@component('//*[contains(@href,"/samweb/csr/common/product/") and contains(text(),"DUBAIProd")]') public productNameLink: Button;
@component('//*[contains(@href,"/samweb/csr/common/product/") and contains(text(),"Pending Modify Approval")]') public pendingModifyApproval: Button;
@component('//*[contains(@href,"/samweb/csr/common/product/") and contains(text(),"Pending Add Approval")]') public pendingAddApproval: Button;
@component('//*[contains(@href,"/samweb/csr/common/product/") and contains(text(),"Pending Delete Approval")]') public PendingDeleteApproval: Button;
@component('/html/body/table[2]/tbody/tr[8]/td[2]/a') public savingLabel: TextInput;
@component('//input[@name="name"]') public productNameLabel: TextInput;
@component('//input[@name="productCode"]') public productCode: TextInput;
@component('//html/body/table[2]/tbody/tr[12]/td[2]/a') public productLink: TextInput;
@component('//input[@name="submit_delete"]') public deleteProduct: TextInput;

@component('//input[@name="submit_preview"]') public previewProductButton: Button;
@component('//input[@name="submit_submit"]') public submitProductButton: Button;
@component('//input[@name="approve"]') public approveProductButton: Button;
@component('//html/body/table[2]/tbody/tr[9]/td[3]') public productStatus: TextInput;

public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.savingLabel.element), this.savingLabel.getTimeOut());
  }
}