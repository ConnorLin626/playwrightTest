/*
 * ©Copyright ACI Worldwide, Inc. 2019
 */
import { browser, ExpectedConditions } from "protractor";
import {
  Page,
  component, log,
  Button,
  TextInput,
  waitForUXLoading,
  OptionSelect
} from "../../../lib";

@log export class OATReportsListPage extends Page {
  constructor() {
    super();
  }

  // SF tab
  @component('//button[@id="Anchor Buyer - Disbursement Report-create"]')
  public ABDRCreateButton: Button;
  @component('//p[@id="sfabdr-view-account-0"]')
  public SFABDRViewDetailsButton: Button;
  @component('//label[@id="sfabdr-reportName-0"]')
  public sfabdrViewReportName: TextInput;
  @component('//li[@id="sfabdr-account-0"]')
  public sfabdrViewAcct: TextInput;
  @component('//span[@id="sfabdr-emails-0"]')
  public sfabdrSendToValue: TextInput;
  @component('//span[@id="sfabdr-options-0"]')
  public sfabdrActionButton: Button;
  @component('//button[@id="sfabdr-delete-0"]')
  public sfabdrDeleteButton: Button;
  @component('//button[@id="Disbursement Report_Deal-create"]')
  public DRDCreateButton: Button;
  @component('//label[@id="report-expand-type-0"]')
  public arpdrdViewDetailsButton: Button;
  @component('//input[@name="selectAllName"]')
  public arpdrdSelectAllButton: Button;
  @component('//button[@id="Disbursement Report_Deal-detele"]')
  public arpdrdMultiDeleteButton: Button;
  @component('//button[@id="Anchor Seller - Disbursement Report-create"]')
  public ASDRCreateButton: Button;
  @component('//p[@id="bfasdr-view-account-0"]')
  public BFASDRViewDetailsButton: Button;
  @component('//label[@id="bfasdr-reportName-0"]')
  public bfasdrViewReportName: TextInput;
  @component('//li[@id="bfasdr-account-0"]')
  public bfasdrViewAcct: TextInput;
  @component('//span[@id="bfasdr-emails-0"]')
  public bfasdrSendToValue: TextInput;
  @component('//span[@id="bfsddr-options-0"]')
  public bfasdrActionButton: Button;
  @component('//button[@id="bfaslur-edit-0"]')
  public bfaslurEditButton: Button;
  @component('//p[@id="bfaslur-remarks-0"]')
  public bfaslurRemarkName: TextInput;
  @component('//span[@id="bfaslur-options-0"]')
  public bfaslurActionButton: Button;
  @component('//label[@id="bfaslur-reportName-0"]')
  public BFASLURViewDetailsButton: Button;
  @component('//label[@class="show-report-button"]')
  public OATShowDetailButton: Button;
  @component('//input[@id="reports-filter"]') public filterInput: TextInput;
  @component('//*[@name="reportName"]') public reportName: TextInput;
  @component('//*[@id="label-multi-dropdown-supplier"]') public supplier: Button;
  @component('//*[@id="search"]') public searchInput: TextInput;
  @component('//*[@id="supplier-0"]') public supplierItem: Button;
  @component('//*[@name="reportName"]') public fileName: TextInput;
  @component('//p-auto-complete[@formcontrolname="dailyInThe"]')
  public dailyInThe: OptionSelect;
  @component('//*[@id="label-multi-dropdown-sendTo"]')
  public sendTo: OptionSelect;
  @component('//*[@id="sendTo-0"]') public sendToItem: OptionSelect;
  @component('//*[@name="reportPassword"]') public password: TextInput;
  @component('//*[@name="reportConfirmPwd"]') public confirmPassword: TextInput;
  @component('//*[@name="remarks"]') public remarks: TextInput;
  @component('//label[@id="report-expand-type-0"]')
  public showReportDetailsBtn: Button;
  @component('//button[@id="dialogDelete"]') public dialogDeleteBtn: Button;
  @component('//*[@name="dismiss"]') public dismiss: Button;

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.visibilityOf(this.showReportDetailsBtn.element),
      this.showReportDetailsBtn.getTimeOut()
    );
    await browser.wait(
      ExpectedConditions.elementToBeClickable(
        this.showReportDetailsBtn.element
      ),
      this.showReportDetailsBtn.getTimeOut()
    );
  }

  public async loadConditionCommon() {
    await waitForUXLoading();
  }

  public async loadDialog() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.dismiss.element),
      this.dismiss.getTimeOut()
    );
  }

  public async loadDeleteDialog() {
    await waitForUXLoading();
    await browser.wait(
      ExpectedConditions.elementToBeClickable(this.dialogDeleteBtn.element),
      this.dialogDeleteBtn.getTimeOut()
    );
  }
}
