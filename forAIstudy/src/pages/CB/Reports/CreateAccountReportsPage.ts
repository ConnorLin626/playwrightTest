/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import {
  Button,
  component, log,
  DateSelect,
  OptionSelect,
  Page,
  RadioButton,
  TextInput,
  waitForUXLoading
} from "../../../lib";
import { browser, ExpectedConditions } from "protractor";

@log export class CreateAccountReportsPage extends Page {
  @component('//*[@name="reportName"]') public reportName: TextInput;
  @component('//*[@id="label-multi-dropdown-account"]') public account: Button;
  @component('//*[@id="search"]') public searchInput: TextInput;
  @component('//input[@id="selectAllInput"]') public selectAll: Button;
  @component('//*[@id="account-0"]') public accountItem: Button;
  @component('//p-auto-complete[@formcontrolname="reportOrganisation"]')
  public organisation: OptionSelect;
  @component('//*[@id="label-multi-dropdown-status"]') public status: Button;
  @component('//*[@id="label-multi-dropdown-transactionItemStatus"]')
  public itemStatus: Button;
  @component('//*[@id="label-multi-dropdown-transactionStatus"]')
  public txnStatus: Button;
  @component('//*[@id="status-0"]') public statusItem: Button;
  @component('//*[@id="transactionItemStatus-0"]')
  public itemStatusItem: Button;
  @component('//*[@id="transactionStatus-0"]')
  public txnStatusItem: Button;
  @component('//div[@id="label-multi-dropdown-transactionType"]')
  public accountType: Button;
  @component('//input[@id="transactionType-1"]') public accountTypeItem: Button;
  @component('//*[@name="batchReference"]') public batchReference: TextInput;
  @component('//*[@name="customerReference"]')
  public customerReference: TextInput;
  @component('//*[@name="chequeNumber"]')
  public chequeNumber: TextInput;
  @component('//*[@name="groupReference"]')
  public groupReference: TextInput;
  @component('//input[@name="depositSlipNumber"]')
  public depositSlipNumber: TextInput;
  @component('//input[@name="instrumentNumber"]')
  public instrumentNumber: TextInput;
  @component('//input[@name="from-amount"]') public amountRangeFrom: TextInput;
  @component('//input[@name="to-amount"]') public amountRangeTo: TextInput;
  @component('//*[@value="S" and @name="reportCreation"]')
  public scheduled: RadioButton;
  @component('//*[@value="O" and @name="reportCreation"]')
  public oneOff: RadioButton;
  @component('//p-auto-complete[@formcontrolname="startRelativeDate"]')
  public startRelativeDate: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="endRelativeDate"]')
  public endRelativeDate: OptionSelect;
  @component('//date-picker[@formcontrolname="startAbsoluteDate"]')
  public startAbsoluteDate: DateSelect;
  @component('//date-picker[@formcontrolname="endAbsoluteDate"]')
  public endAbsoluteDate: DateSelect;
  @component('//p-auto-complete[@formcontrolname="dailyInThe"]')
  public dailyInThe: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="weeklyOnDay"]')
  public weeklyOnDay: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="weeklyOnTime"]')
  public weeklyOnTime: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="monthlyOnDay"]')
  public monthlyOnDay: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="monthlyOnTime"]')
  public monthlyOnTime: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="relativeDay"]')
  public relativeDay: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="relativeTime"]')
  public relativeTime: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="access"]')
  public usage: OptionSelect;
  @component('//*[@id="label-multi-dropdown-sendTo"]')
  public sendTo: OptionSelect;
  @component('//*[@id="sendTo-0"]') public sendToItem: OptionSelect;
  @component('//*[@name="reportPassword"]') public password: TextInput;
  @component('//*[@name="reportConfirmPwd"]') public confirmPassword: TextInput;
  @component('//*[@name="remarks"]') public remarks: TextInput;
  @component('//button[@id="btn-save-publish"]') public btnSavePublish: Button;
  @component('//*[@name="dismiss"]') public dismiss: Button;
  @component('//*[@name="publish"]') public publish: Button;
  @component('//*[@id="label-multi-dropdown-paymentCurrencies"]')
  public payCurDropDown: Button;
  @component('//input[@id="paymentCurrencies-0"]') public payCurSelect1: Button;
  @component('//input[@id="paymentCurrencies-2"]') public payCurSelect2: Button;
  @component(
    '//*[@id="reportTypes-panel"]/report-types/div/ul/li[2]/div[2]/saved-report-payment/div[1]/ux-datatable/div/datatable-header/div/div[2]/datatable-header-cell[1]/div/div/input'
  )
  public selectAll4TransferSumDetReport: Button;
  @component('//input[@name="selectAllName"]') public selectMultiToDeleteButton: Button;
  @component('//dbs-radio-group[@formcontrolname="deliverySchedule"]')
  public deliverySchedule: RadioButton;

  @component('//button[@name="next"]') public nextToGenerate: Button;
  @component('//input[@name="fileName"]') public fileNameInput: TextInput;
  @component('//div[@id="label-multi-dropdown-fileStatus"]')
  public fileStatus: Button;
  @component('//*[@id="fileStatus-0"]') public fileStatusItem0: Button;
  @component('//input[@name="payeeReference"]')
  public payeeReference: TextInput;
  @component('//input[@name="payeeName"]') public payeeName: TextInput;
  @component('//input[@id="selected_left_2"]') public reportContent: Button
  @component('//dbs-radio-group[@formcontrolname="deliveryFormat"]') public deliveryFormat: RadioButton;

  // add new email
  @component('//button[@id="addNewEmail"]')
  public addNewEmail: Button;
  @component('//input[@id="nickname0"]')
  public newEmailNickname: TextInput;
  @component('//input[@id="address0"]')
  public newEmailAdress: TextInput;
  @component('//button[@id="saveAndCloseEmail"]')
  public saveAndCloseEmailButton: Button;
  @component('//*[@id="label-multi-dropdown-sendTo"]/div/span[1]')
  public sendToSelectedText: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.btnSavePublish.element),
      this.btnSavePublish.getTimeOut()
    );
  }

  public async loadCondition4FileUpload() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.nextToGenerate.element),
      this.nextToGenerate.getTimeOut()
    );
  }

  public async loadDialog() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.dismiss.element),
      this.dismiss.getTimeOut()
    );
  }

  public async loadShowReportDetails() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.dismiss.element),
      this.dismiss.getTimeOut()
    );
  }

  public getFileName(pathFileName: string) {
    let fileName: string;
    if (pathFileName.indexOf("/") >= 0) {
      fileName = pathFileName.substr(pathFileName.indexOf("/") + 1)
    } else {
      fileName = pathFileName;
    }
    return fileName;
  }

}
