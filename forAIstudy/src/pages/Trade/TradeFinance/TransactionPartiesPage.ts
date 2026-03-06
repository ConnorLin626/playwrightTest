/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { Page, component, log, Button, WebComponent, TextInput, HtmlSelect,waitForUXLoading } from '../../../lib';
import { browser, ExpectedConditions } from 'protractor';
@log export class TransactionPartiesPage extends Page {

    @component('//*[@href="#/trade-finance/redirect?targetUrlKey=navAIThirdtransactionPartiesLinkText"]') public txnPartyTab: Button;
    @component('//input[@id="hdnFilterMoreLessTxt"]') public filterButton: Button;
    @component('//input[@name="submit_filter"]') public submitFilterButton: Button;
    @component('//input[@name="submit_edit"]') public editButton: Button;
    @component('//input[@name="submit_delete"]') public deleteButton: Button;
    @component('//*[@id="jqi_state0_buttonConfirm"]') public deleteConfirm: Button;
    @component('//button[@id="manageDocs"]') public createButton: WebComponent;
    @component('//input[@id="partyName"]') public partyName: TextInput;
    @component('//input[@name="objectId" and @type="radio"]') public record: Button;
    @component('//*[@id="arcCountryCdKy"]') public selectCountry: HtmlSelect;
    @component('/html/body/div[1]/table/tbody/tr[4]/td/div[4]/div[1]/div/div[2]/li') public partyMsgText: TextInput;
    @component('//button[@value="true"]') public confirmButton: Button;
    
    //Edit Party page
    @component('//input[@id="addr1"]') public partyAdd1: TextInput;
    @component('//*[@id="arcCountryCdKy"]') public locationName: TextInput;
    @component('//*[@id="townCity"]') public townCity: TextInput;
    @component('//*[@id="postalCode"]') public postalCode: TextInput;
    @component('//*[@id="isBene"]') public benTransfer: Button;
    @component('//input[@name="submit_cancel"]') public cancelButton: Button;

    constructor() {
        super();
    }

    public async loadCondition() {
        await this.pageSwitchToI3();
    }

    public async loadConditionForParty() {
        await this.pageSwitchToTrade();
    }

    public async loadConditionForEditPartyPage() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.visibilityOf(this.partyName.element), this.partyName.getTimeOut());
    }
}
