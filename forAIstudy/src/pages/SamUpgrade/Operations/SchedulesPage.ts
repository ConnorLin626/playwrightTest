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
    @component('//a[contains(@href,"common/schedule/bom/procSchdAdmin")]') public scheduleLink: Button;
    @component('//a[contains(@href,"common/schedule/bom/updateProcSchd?processKey=253")]') public actScheduleLink: Button;
    @component('//input[@name="submit_prepreview"]') public previewScheduleButton: Button;
    @component('//input[@name="submit_submit"]') public submitScheduleButton: Button;
    @component('//*[@id="subProcessValueObjects0.monday_time"]') public cutOffTimeValue: TextInput;
    @component('/html/body/table[2]/tbody/tr[12]/td[3]') public cutOffTimePreviewValue: TextInput;

    //
    @component('//a[contains(@href,"/samweb/csr/common/schedule/bom/newProcSchd")]') public createProcSchdLink: Button;
    @component('//input[@name="submit_preview"]') public createPreSchdButton: Button;
    @component('//input[@name="submit_delete"]') public deleteScheduleButton: Button;
    @component('//select[@id="selProcessName"]') public INRrfundSchedule: HtmlSelect;
    @component('//a[contains(@href,"/samweb/csr/common/schedule/bom/updateProcSchd?processKey=589")]') public INRrfundScheduleLink: Button;
    @component('//a[contains(@href,"/samweb/csr/common/schedule/bom/procSchdApprove/prepreview?action=approve") and contains(text(),"Pending Add Approval")]') public INRefundAppscheduleLink: Button;
    @component('//a[contains(@href,"/samweb/csr/common/schedule/bom/procSchdApprove/prepreview?action=approve") and contains(text(),"Pending Delete Approval")]') public INRefundDelscheduleLink: Button;
    @component('//html/body/table[2]/tbody/tr[16]/td[3]') public INRrfundScheduleStatus: TextInput;
  
    //
    @component('//a[contains(@href,"common/parameters/holidayParam")]') public toHolidayScheduleLink: Button;
    @component('//a[contains(@href,"common/parameters/holiday/create")]') public createHolidayScheduleLink: Button;
    @component('//a[contains(@href,"common/parameters/holiday?index=18")]') public editHolidayScheduleLink: Button;
    //
    @component('//input[@name="holidayNameArr[0]"]') public holidayName0: TextInput;
    @component('//input[@id="holidayTypeArr01"]') public holidayType01: Button;
    @component('//input[@id="holidayTypeArr02"]') public holidayType02: Button;
    @component('//input[@id="holidayTypeArr03"]') public holidayType03: Button;
    @component('//input[@name="dateRepeat[0]"]') public dateRepeat0: TextInput;
    @component('/html/body/table[2]/tbody/tr[10]/td[3]/span') public dateOneTimeOnly0: Button;
    @component('//*[@id="calendarDiv"]/div[5]/table/tbody/tr[6]/td[4]') public activeDate: Button;
    @component('//select[@id="holidayMonthArr0"]') public holidayMonth0: HtmlSelect;
    @component('//select[@id="holidayWeekArr0"]') public holidayWeek0: HtmlSelect;
    @component('//select[@id="holidayDayOfWeekArr0"]') public holidayDayOfWeek0: HtmlSelect;
    @component('//input[@name="submit_deletePreview"]') public deleteHolidayPreviewButton: Button;
    @component('//input[@name="submit_deleteSubmit"]') public deleteHolidaySubmitButton: Button;
    @component('//input[@name="submit_modifyPreview"]') public modifyHolidayPreviewButton: Button;
    @component('//input[@name="submit_modifySubmit"]') public modifyHolidaySubmitButton: Button;

    // new Sam
    @component('//input[@name="subProcessValueObjects[0].monday_time"]') public moday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].tuesday_time"]') public tuesday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].wednesday_time"]') public wednesday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].thursday_time"]') public thursday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].friday_time"]') public friday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].saturday_time"]') public saturday_time: TextInput;
    @component('//input[@name="subProcessValueObjects[0].sunday_time"]') public sunday_time: TextInput;

    @component('//input[@name="submit_preview"]') public previewScheduleBtn: Button;
    @component('//*[@name="approve"]') public approveSchedule: Button;
    @component('//*[@name="submit_delete"]') public deleteSchedule: Button;
    @component('//*[@name="submit_delete"]') public submitDeleteSchedule: Button;

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

    public async createCutOffTime(affiliate: string, paymentType: string, day: number, cutOffTimeValue: string) {
        let weekList = [this.moday_time, this.tuesday_time, this.wednesday_time, this.thursday_time, this.friday_time, this.saturday_time, this.sunday_time];
        await this.loadCondition();
        await this.topOperationsLink.click();
        await this.scheduleLink.click();
        await this.selectAffiliate.selectByValue(affiliate);
        await this.submitAffiliate.click();
        await this.createProcSchdLink.jsClick();
        await this.INRrfundSchedule.selectByValue(paymentType);
        if (day === 0) {
            await weekList[weekList.length - 1].clean();
            await weekList[weekList.length - 1].input(cutOffTimeValue);
        } else {
            await weekList[day - 1].clean();
            await weekList[day - 1].input(cutOffTimeValue);
        }
        await this.previewScheduleBtn.jsClick();
        await this.submitScheduleButton.jsClick();
        await ensure(this).isSAMSuccess();
    }
}
