/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect } from '../../../lib';

@log export class TransactionEnquiryPage extends Page {
    constructor() {
        super();
    }

    @component('//input[@name="search"]') public searchHomeButton: Button;
    @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
    @component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
    @component('/html/body/table[1]/tbody/tr[2]/td[1]/table/tbody/tr/td[8]/a') public topOperationsLink: Button;
    @component('//a[contains(@href,"/csr/common/transactionenquiry/bom/loadtransactionenquiry")]') public transactionEnquiryLink: Button;
    @component('//input[@name="submit_search"]') public searchButton: Button;
    @component('/html/body/table[3]/tbody/tr[3]/td[3]/a') public firstReferenceLink: Button;
    @component('//input[@name="startDate"]') public startDate: TextInput;
    @component('//*[@id="item_0"]/table/tbody/tr[5]/td[4]') public fromAccountValue: TextInput;
    @component('//*[@id="item_0"]/table/tbody/tr[10]/td[4]') public amountValue: TextInput;
    @component('//select[@name="typeList"]') public productType: HtmlSelect;

    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.searchHomeButton.element), this.searchHomeButton.getTimeOut());
    }
}
