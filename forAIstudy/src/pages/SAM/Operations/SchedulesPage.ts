/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, HtmlSelect, ensure } from '../../../lib';

@log export class SchedulesPage extends Page {
    constructor() {
        super();
    }

    @component('//input[@name="search"]') public searchHomeButton: Button;
    @component('//select[@name="selectAffiliate"]') public selectAffiliate: HtmlSelect;
    @component('//input[@name="submit_affiliate"]') public submitAffiliate: Button;
    @component('//a[@title="Setup System Operations and Events"]') public topOperationsLink: Button;
    @component('//input[@name="submit_prepreview"]') public previewScheduleButton: Button;
    @component('//a[contains(@href,"csr/common/schedule/bom/procSchdAdmin")]') public scheduleLink: Button;
    @component('//a[contains(@href,"csr/common/schedule/bom/updateProcSchd?processKey=253")]') public actScheduleLink: Button;
    @component('//input[@name="submit_submit"]') public submitScheduleButton: Button;
    @component('//input[@name="subProcessValueObjects[0].monday_time"]') public cutOffTimeValue: TextInput;
    @component('/html/body/table[2]/tbody/tr[12]/td[3]') public cutOffTimePreviewValue: TextInput;
    @component('//*[@name="approve"]') public approveSchedule: Button;

    // old sam
    // @component('//input[@name="subProcessForms[0].monday_time"]') public moday_time: TextInput;
    // @component('//input[@name="subProcessForms[0].tuesday_time"]') public tuesday_time: TextInput;
    // @component('//input[@name="subProcessForms[0].wednesday_time"]') public wednesday_time: TextInput;
    // @component('//input[@name="subProcessForms[0].thursday_time"]') public thursday_time: TextInput;
    // @component('//input[@name="subProcessForms[0].friday_time"]') public friday_time: TextInput;
    // @component('//input[@name="subProcessForms[0].saturday_time"]') public saturday_time: TextInput;
    // @component('//input[@name="subProcessForms[0].sunday_time"]') public sunday_time: TextInput;

    //  new Sam
    @component('//input[@name="subProcessValueObjects[0].monday_time"]') public moday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].tuesday_time"]') public tuesday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].wednesday_time"]') public wednesday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].thursday_time"]') public thursday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].friday_time"]') public friday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].saturday_time"]') public saturday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].sunday_time"]') public sunday_time: TextInput;

    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.searchHomeButton.element), this.searchHomeButton.getTimeOut());
    }

    public async editCutOffTime(affiliate: string, paymentType: Button, day: number, cutOffTimeValue: string) {
        let weekList = [this.moday_time, this.tuesday_time, this.wednesday_time, this.thursday_time, this.friday_time, this.saturday_time, this.sunday_time];
        await this.loadCondition();
        await this.topOperationsLink.click();
        await this.scheduleLink.click();
        await this.selectAffiliate.selectByValue(affiliate);
        await this.submitAffiliate.click();
        await paymentType.click();
        if (day === 0) {
            await weekList[weekList.length - 1].clean();
            await weekList[weekList.length - 1].input(cutOffTimeValue);
        } else {

            await weekList[day - 1].clean();
            await weekList[day - 1].input(cutOffTimeValue);
        }
        await this.previewScheduleButton.jsClick();
        await this.submitScheduleButton.jsClick();
        await ensure(this).isSAMSuccess();
    }


    public async approveCutOffTime(affiliate: string, processingStatus: Button) {
        await this.loadCondition();
        await this.topOperationsLink.click();
        await this.scheduleLink.click();
        await this.selectAffiliate.selectByValue(affiliate);
        await this.submitAffiliate.click();
        await processingStatus.click();
        await this.approveSchedule.jsClick();
        await ensure(this).isSAMSuccess();
    }

}
