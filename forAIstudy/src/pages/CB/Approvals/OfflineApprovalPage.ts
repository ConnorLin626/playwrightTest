/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, waitForI3Loading } from '../../../lib';
import { HtmlSelect } from '../../../lib/components';

@log export class OfflineApprovalPage extends Page {
  constructor() {
    super();
  }

  //by transaction
  @component('//a[text()="Per Transaction"]') public offlineApprovalI3ByTxn: Button;
  @component('//input[@id="0-FileOfflineApprovalList_pending"]') public offlineApprovalI3Select1stTxn: Button;
  @component('//*[@id="approveButtongrouping_Link"]') public offlineApproveGroupI3Button: Button;
  @component('//*[@id="approveButtonpending_Link"]') public offlineApproveTxnI3Button: Button;
  @component('//*[@id="submitButton_Link"]') public submitI3TxnButton: Button;
  @component('//*[@id="editButton0pending_Link"]') public offlineApproveI3TxnReference: Button;
  @component('//a[@id="submitpending_Link"]') public offlineApproveI3TxnSearch: Button;
  @component('//*[@id="pending"]/div/div/div[2]/div/div[5]/select') public offlineApproveTxnI3StatusSelect: HtmlSelect;
  @component('//input[@id="filterFileName"]') public offlineApproveTxnI3FileName: TextInput;

  // My Approval I3 UI ---- By File
  @component('//a[text()="By File Amount"]') public offlineApprovalI3ByFile: Button;
  @component('//input[@id="0-FileOfflineApprovalList_processed"]') public offlineApprovalI3Select1stFile: Button;
  @component('//*[@id="approveButtonprocessed_Link"]') public offlineApproveFileI3Button: Button;
  @component('//a[@id="submitButton_Link"]/span[text()="Submit"]') public submitI3FileButton: Button;
  @component('//*[@id="editButton0processed_Link"]') public offlineApproveI3FileReference: Button;
  @component('//a[@id="submitprocessed_Link"]') public offlineApproveI3FileSearch: Button;
  @component('//*[@id="pending"]/div/div/div[2]/div/div[4]/select') public offlineApproveFileI3StatusSelect: HtmlSelect;
  @component('//*[@id="filesvcFileListTab"]/tbody/tr[4]/td[4]') public totalItems: TextInput;
  @component('//*[@id="filesvcFileListTab"]/tbody/tr[2]/td[4]') public fileName: TextInput;

  @component('//input[@name="signature"]') public challengeResponseI3: TextInput;
  @component('//*[@id="offapproverId"]') public selectApproverI3: HtmlSelect;

  public async loadCondition() {
    await this.pageSwitchToI3();
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.offlineApprovalI3ByTxn.element), this.offlineApproveTxnI3Button.getTimeOut());
  }

  public async loadConditionForByTxnPage() {
    await this.pageSwitchToI3();
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.offlineApprovalI3Select1stTxn.element), this.offlineApprovalI3Select1stTxn.getTimeOut());
  }

  public async loadConditionForApprovalTxnPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.offlineApproveTxnI3Button.element), this.offlineApproveTxnI3Button.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitI3TxnButton.element), this.submitI3TxnButton.getTimeOut());
  }

  public async loadConditionForByFilePage() {
    await this.pageSwitchToI3();
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.offlineApprovalI3Select1stFile.element), this.offlineApprovalI3Select1stFile.getTimeOut());
  }

  public async loadConditionForApprovalFilePage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.offlineApproveFileI3Button.element), this.offlineApproveFileI3Button.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitI3FileButton.element), this.submitI3FileButton.getTimeOut());
  }
}