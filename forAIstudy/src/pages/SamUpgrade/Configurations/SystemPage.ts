/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, OptionSelect, waitForUXLoading, HtmlSelect } from '../../../lib';
import { WebComponent } from '../../../lib/components';

@log export class SystemPage extends Page {
  constructor() {
    super();
  }

//System Link

@component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[10]/a') public toConfigurationLink: Button;
@component('/html/body/table[1]/tbody/tr[4]/td[1]/table/tbody/tr/td[8]/a') public systemLink: Button;

//Contact info
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[1]/small[1]/a') public contactInfoLink: Button;
@component('//input[@name="city"]') public inputCity: TextInput;
@component('//input[@name="submit_preview"]') public previewInfoButton: Button;
@component('//input[@name="submit_submit"]') public submitInfoButton: Button;

//Server Exit URLs
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[1]/small[2]/a') public serverExitUrlLink: Button;
@component('//input[@name="applicationUrl"]') public inputApplicationUrl: TextInput;
@component('//input[@name="corporateUrl"]') public inputCorporateUrl: TextInput;
@component('//input[@name="submit_preview"]') public previewUrlButton: Button;
@component('//input[@name="submit_update"]') public submitUrlButton: Button;

//Server Parameters
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[1]/small[3]/a') public serverParameterLink: Button;
@component('//input[@name="samTimeout"]') public inputSAMTimeOut: TextInput;
@component('//input[@name="cpTimeout"]') public inputCorpTimeOut: TextInput;
@component('//input[@name="submit_preview"]') public previewServerParamButton: Button;
@component('//input[@name="submit_submit"]') public submitServerParamButton: Button;

//Resources
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[1]/small[4]/a') public resourcesLink: Button;
@component('//input[@name="criteria"]') public inputResourceCriteria: TextInput;
@component('//input[@name="submit_search"]') public searchResourceButton: Button;
@component('/html/body/table[2]/tbody/tr[11]/td[2]/table/tbody/tr[2]/td[2]') public descriptionValue:TextInput;

//General Banking Parameters
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[3]/small[1]/a') public generalBankingParametersLink: Button;
@component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
@component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
@component('//input[@name="accountPurge"]') public inputAccountPurge: TextInput;
@component('//input[@name="submit_preview"]') public previewGeneBnkParamButton: Button;
@component('//input[@name="submit_submit"]') public submitGeneBnkParamButton: Button;

//Corporate Banking Parameters
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[3]/small[2]/a') public corporateBankingParametersLink: Button;
@component('//input[@name="swiftId"]') public inputSwiftID: TextInput;
@component('//input[@name="submit_preview"]') public previewCorpBnkParamButton: Button;
@component('//input[@name="submit_submit"]') public submitCorpBnkParamButton: Button;


//Holiday Schedules
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[3]/small[3]/a') public holidayScheduleLink: Button;
@component('/html/body/table[2]/tbody/tr[8]/td[2]/table/tbody/tr[2]/td[1]/small[1]/a') public createHolidayLink: Button;
@component('//input[@name="holidayNameArr[0]"]') public inputHolidayName: TextInput;
@component('//input[@name="holidayTypeArr[0]"]') public holidayTypeRadioButton: Button;
@component('//input[@name="dateRepeat[0]"]') public inputScheduleHolidayDate: TextInput;
@component('//input[@name="submit_preview"]') public previewHolidayScheduleButton: Button;
@component('//input[@name="submit_submit"]') public submitHolidayScheduleButton: Button;
@component('//a[contains(@href,"/samweb/csr/common/parameters/holiday") and contains(text(),"AutoTestHoliday_")]') public holidayToBeDeleteLink: Button;
@component('//input[@name="submit_deletePreview"]') public previewDeleteHolidayButton: Button;
@component('//input[@name="submit_deleteSubmit"]') public deleteHolidayButton: Button;

//Affiliate Personalities
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[3]/small[4]/a') public affiliatePersonalitiesLink: Button;
@component('/html/body/table[2]/tbody/tr[17]/td[2]/a') public editAffiPersonalitiesLink: Button;
@component('//input[@name="name"]') public inputAffiliateName: TextInput;
@component('//textarea[@name="description"]') public inputAffiliateDesc: TextInput;
@component('//input[@name="preview"]') public previewAffiliateButton: Button;
@component('//input[@name="modify"]') public submitAffiliateButton: Button;


//Mobile Banking Parameters
@component('/html/body/table[2]/tbody/tr[6]/td[2]/table/tbody/tr[2]/td[3]/small[5]/a') public mobileBankingParameterLink: Button;
@component('//input[@name="mobileBrandingGroup"]') public inputMobileBrandingGroup: TextInput;
@component('//input[@name="submit_preview"]') public previewMobileBnkParamButton: Button;
@component('//input[@name="submit_submit"]') public submitMobileBnkParamButton: Button;

public async loadCondition() {
    await browser.wait(ExpectedConditions.elementToBeClickable(this.mobileBankingParameterLink.element), this.mobileBankingParameterLink.getTimeOut());
  }
}