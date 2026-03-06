/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Button, TextInput, HtmlSelect, waitForI3Loading, pageSwitchWindow } from "../../../lib";
import { TradeFinanceAPFPage } from './TradeFinanceAPFPage'

@log export class PreShipmentFinancingPage extends TradeFinanceAPFPage {

    @component('//input[@id="submit_reject" and @name="submit_reject"]') public rejectButton: Button;
    @component('//textarea[@id="rejectReasonTmp"]') public rejectReason: TextInput;
    @component('//input[@id="submit_offlineApprove"]') public offlineApproveBtn: Button;
    @component('//input[@id="userResponse"]') public approvalReason: TextInput;
    @component('//select[@name="approver"]') public selectApproverDorpDownList: HtmlSelect;
    @component('//input[@name="submit_offlineApproveSubmit"]') public offlineSubmitBtn: Button;
    @component('//input[@id="submit_delete"]') public deleteBtn: Button;
    @component('//input[@id="submit_offlinePrint"]') public offlinePrintBtn: Button;
    @component('//input[@id="submit_print"]') public printBtn: Button;
    @component('//input[@id="submit_saveIncomplete"]') public saveIncompleteBtn: Button;
    @component('//input[@id="submit_approvers"]') public selectApproverBtn: Button;
    @component('//input[@name="objectIds"]') public selectApproverCheckBox: Button;
    @component('//input[@name="isEmail"]') public isEmail1: Button;
    @component('//*[@id="divInstrument"]/table[2]/tbody/tr[89]/td[2]') public selectedApproverValue: TextInput;
    @component('//button[@id="edit"]') public editBtn: Button;
    @component('//input[@id="custRef"]') public customerRef: TextInput;

    constructor() {
        super();
    }

    public async loadConditionForPSFEditPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.applicationStatus.element), this.applicationStatus.getTimeOut());
    }

    public async loadConditionForPSFConfirmPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.yesButton.element), this.yesButton.getTimeOut());
    }

    public async loadConditionForPSFViewPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.currentStatus.element), this.currentStatus.getTimeOut());
    }

    public async loadConditionForOfflinePrintPage() {
        await waitForI3Loading();
        await browser.wait(ExpectedConditions.stalenessOf(this.offlinePrintBtn.element), this.offlinePrintBtn.getTimeOut());
        await browser.wait(ExpectedConditions.elementToBeClickable(this.printBtn.element), this.printBtn.getTimeOut());
    }

    public async loadConditionForViewReport(windowName: string) {
        await pageSwitchWindow(windowName);
        // await browser.wait(ExpectedConditions.visibilityOf(this.reportName.element), this.reportName.getTimeOut());
    }
}