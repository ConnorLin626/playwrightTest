/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect } from '../../../lib';

@log export class PartyDetailsPage extends Page {

    @component('//input[@name="submit_saveAdd"]') public saveButton: Button;
    @component('//input[@name="submit_saveEdit"]') public saveEditButton: Button;
    @component('//input[@name="submit_cancel"]') public cancelButton: Button;
    @component('//input[@id="partyId"]') public partyId: TextInput;
    @component('//input[@id="cifId"]') public cifId: TextInput;
    @component('//input[@id="partyName"]') public partyName: TextInput;
    @component('//input[@id="addr1"]') public addr1: TextInput;
    @component('//input[@id="addr2"]') public addr2: TextInput;
    @component('//input[@id="addr3"]') public addr3: TextInput;
    @component('//input[@id="contactName"]') public contactName: TextInput;
    @component('//input[@id="contactTitle"]') public contactTitle: TextInput;
    @component('//*[@id="contactDetail"]') public contactDetail: TextInput;
    @component('//input[@id="isBene" and @type="checkbox"]') public isBene: Button;
    @component('//input[@id="isAcc" and @type="checkbox"]') public isAcc: Button;
    @component('//input[@id="isDrwe1" and @type="checkbox"]') public isDrwe1: Button;
    @component('//input[@id="isAppl1" and @type="checkbox"]') public isAppl1: Button;
    @component('//select[@id="arcCountryCdKy" and @name="arcCountryCdKy"]') public selectCountry: HtmlSelect;

    constructor() {
        super();
    }

    public async loadCondition() {
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.saveButton.element), this.saveButton.getTimeOut());
    }
}
