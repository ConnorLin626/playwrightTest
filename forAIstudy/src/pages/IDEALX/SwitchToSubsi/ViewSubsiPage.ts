/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, waitForUXLoading, waitForI3Loading, ListSelect, TextInput } from '../../../lib';

@log export class ViewSubsiPage extends Page {
    constructor() {
        super();
    }

    @component('//table[@id="importProfileListTable"]') public importProfileList: ListSelect;
    // @component('//a[@id="subsidiarySwitchToLinkId"]') public switchToButton: Button;
    @component('//table/tbody/tr[5]/td[3]/div/ul/li[1]/a') public switchToButton: Button;
    @component('//button[@id="Close"]') public laterButton: Button;
    @component('//*[@class="header-company ng-star-inserted"]') public switchToSub: Button;
    @component('//*[@id="selectedCompany"]/span') public selectCompany: Button;

    @component('//ng-component/div/div[1]/div[4]/p-scrollable-tabs/section/ul/li[2]/a') public twAffiliate: Button;
    @component('//ng-component/div/div[2]/div/div/ul/li/div[2]/ul/li[1]/div[2]/div/div[1]') public notTaipeilabel: TextInput;
    @component('//*[@class="subsidiaries-tab !whitespace-nowrap ng-star-inserted"]') public taipeilabel: TextInput;
    

    public async loadCondition() {
        await waitForUXLoading();
    }

    public async loadConditionForViewSubsi() {
        await waitForI3Loading();
        await this.pageSwitchToI3();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.switchToButton.element), this.switchToButton.getTimeOut());
    }
}
