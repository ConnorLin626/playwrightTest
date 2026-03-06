import { browser, ExpectedConditions } from 'protractor';
import {
    Page,
    component, log,
    Button,
    TextInput,
    OptionSelect,
    waitForUXLoading,
    DateSelect,
    FileSelect,
    WebComponent,
    ensure,
    DBSCalendarSelect
} from "../../../lib";

@log export class ITTPage extends Page {

    constructor() {
        super();
    }
    @component('//a[contains(@href,"/itt/list/approvalItt")]') public ITTApprove: Button;
    @component('//a[contains(@href,"/csr/common/schedule/bom") and text()="India RTGS"]')
    @component('//*[@id="showAddFilter"]') public showAddFilterLabel: Button;
    @component('//div[@id="transactionAdditionalFilter"]') public showAddFilterLabel2: Button;
    @component("//dbs-calendar[@formcontrolname='paymentDateStart']") public dateFromSelect: DBSCalendarSelect;
    @component("//dbs-calendar[@formcontrolname='paymentDateEnd']") public dateToSelect: DBSCalendarSelect;
    @component('//button[@name="search"]') public searchButton: Button;
    @component('//*[@id="transaction-reference_0"]') public firstDataItem: Button;
    @component('//*[@id="single-edit"]') public editButton: Button;
    @component('//button[@name="next"]') public nextButton: Button;
    @component('//p-auto-complete[@formcontrolname="pmtCategory1"]') public paymentCategory1DropDown: OptionSelect;
    @component('//p-auto-complete[@formcontrolname="seriesCode1"]') public seriesCode1DropDown: OptionSelect;
    @component('//*[@name="itt-regulatory-advising-transRemark1"]') public remark: TextInput;
    @component('//button[@name="next"]') public submitButton: Button;
    @component('//button[@name="finish"]') public finishButton: Button;
    @component('//*[@id="seriesCode1Data"]') public seriesCode1View: TextInput;

    //IN ITT
    @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
    @component('//input[@name="itt-regulatory-advising-fxcontract"]') public fxContract: TextInput;
    @component('//input[@name="disposalAccountInstructionInput"]') public disposalAccountInstruction: TextInput;
    @component('//input[@name="billReference"]') public billRef: TextInput;
    @component('//input[@id="digiDocFileUpload"]') public digiDocFileUploadButton: FileSelect;
    @component('//p-auto-complete[@formcontrolname="docType"]') public digiDocFileType: OptionSelect;
    @component('//itt-view-section/div/div/section/div/div/div[1]/span[2]') public purposeCodeValue: TextInput;

    //TW ITT
    @component('//p-auto-complete[@formcontrolname="ittTWDescription"]') public  oiRemittance : OptionSelect;
    @component('//p-auto-complete[@formcontrolname="originatingCode"]') public  originatingCode : OptionSelect;
    @component('//div[@id="twIttFileNameDiv"]') public fileNameDiv: TextInput;
    @component('//div[@id="existingTrashBinIcon"]') public trashBinIcon: Button;

    public async loadCondition() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showAddFilterLabel.element), this.showAddFilterLabel.getTimeOut());
    }
    public async loadCondition2() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.showAddFilterLabel2.element), this.showAddFilterLabel2.getTimeOut());
    }

    public async loadCondition4Search() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.searchButton.element), this.searchButton.getTimeOut());
    }

    public async loadCondition4ITTView() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.editButton.element), this.editButton.getTimeOut());
    }
    public async loadCondition4ITTEdit() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
    }
    public async loadCondition4ITTSubmit() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
    }
    public async loadCondition4ITTFinish() {
        await waitForUXLoading();
        await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
    }

}
