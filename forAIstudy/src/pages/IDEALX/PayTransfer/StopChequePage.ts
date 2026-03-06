import { Page, component, log, Button, TextInput, OptionSelect, RadioButton, waitForUXLoading, IXHorizontalMenu } from '../../../lib';
import {browser, ExpectedConditions} from "protractor";
import {PaymentsPages} from "./index";

@log export class StopChequePage extends Page {

    @component('//*[@id="icon__stop_cheque"]') public stopChequeMenu: IXHorizontalMenu;
    @component('//button[@name="stopCheque"]') public createStopChequeBtn: Button;
    @component('//dbs-radio-group[@formcontrolname="chequeType"]') public chequeTypeRadio: RadioButton;
    @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
    @component('//input[@name="stopCheque-chequeNo"]') public chequeNoInput: TextInput;
    @component('//button[@name="submit"]') public submitBtn: Button;
    @component('//input[@id="chequeList-filterPayee"]') public searchFilter: TextInput;
    @component('//button[@id="cheque-reference-0"]') public firstItem: Button;
    @component('//input[@id="isSelectAllAdvising"]') public selectAllCheckBox: Button;
    @component('//div[@id="stopcheque-view-edit"]') public editBtn: Button;
    @component('//button[@id="approve"]') public approveBtn: Button;
    @component('//button[@id="reject"]') public rejectBtn: Button;
    @component('//button[@name="reject"]') public rejectDialogBtn: Button;
    @component('//div[@id="act-view-print"]') public printBtn: Button;
    @component('//*[@class="input value ng-star-inserted"]') public bankChargeValuePriview:TextInput;
    @component('//div[@id="stopcheque-view-chequeType"]') public chequeTypeValue: TextInput;
    @component('//span[@id="stopcheque-view-fromAccount"]') public fromAccountValue: TextInput;
    @component('//div[@id="stopCheque-view-reference"]') public referenceValue: TextInput;
    @component('//div[@id="act-view-status"]') public statusValue: TextInput;
    @component('//ng-component/div/div[2]/div/view-section/div/section[1]/div[1]/span[2]') public hashValue: TextInput;
    @component('//ng-component/div/div[2]/div/view-section/div/section[1]/div[4]/span[2]') public chequeNumberValue: TextInput;
    @component('//ng-component/div/div[2]/div/view-section/div/section[2]/div[1]/span[2]') public bankChargesValue: TextInput;
    @component('//ng-component/div/div[2]/div/view-section/div/section[2]/div[2]/span[2]') public chargesAccountValue: TextInput;
    @component('//ng-component/div/div[2]/div/view-section/div/section[4]/div/span[2]') public viewReferenceValue: TextInput;
    @component("//*[@class='payment-history']") public activityLog: TextInput;
    @component('//ng-component/div/div[2]/div/view-section/div/section[3]/div/span[2]') public stopChequeReasonValue: TextInput;
    @component('//*[@name="stopCheque-reason"]') public stopChequeReason: TextInput;
    @component('//ng-component/div[3]/advance-search-cheque-center/div/div/div') public showAdditionFilter: RadioButton;
    @component('//p-auto-complete[@formcontrolname="statusRec"]') public transactionStatus: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="chequeTypeRec"]') public paymentTypeList: OptionSelect;
    @component('//*[@name="search"]') public searchButton: Button;


    constructor() {
        super();
    }

    public async loadCondition() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.createStopChequeBtn.element), this.createStopChequeBtn.getTimeOut());
    }

    public async loadCondition4Create() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
    }

    public async loadCondition4Preview() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitBtn.element), this.submitBtn.getTimeOut());
    }

    public async loadCondition4View() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.approveBtn.element), this.approveBtn.getTimeOut());
    }
    public async loadCondition4ViewApprove() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.printBtn.element), this.printBtn.getTimeOut());
    }
    public async loadCondition4RejectDialog() {
        await browser.wait(ExpectedConditions.elementToBeClickable(this.rejectDialogBtn.element), this.rejectDialogBtn.getTimeOut());
    }
}

