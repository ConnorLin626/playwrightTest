/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { Page, component, log, Button, TextInput, waitForI3Loading, HtmlSelect, ensure, waitForUXLoading } from '../../../lib';
import { async } from 'q';

@log export class VerificationAndReleasesPage extends Page {
  constructor() {
    super();
  }
  // oldVerifyLink in the new ui screen
  @component('//top-link/div/div/ul/li/span/label[2]') public oldVerifyLink: Button;

  //Verify- by transaction
  @component('//*[@id="fileVRVerifyReleaseCentre_Tabs_headers"]/li[1]/a') public verifyTab: Button;
  @component('//a[@tabid="pendingVerifyTab"]') public verifyTabByTxn: Button;
  @component('//*[@id="tab-1fileVRVerifyCentreSec_Tabs"]/form/div[1]/div[1]/p/a') public verifyTxnI3Button: Button;
  @component('//div[@id="tab-2fileVRVerifyCentreSec_Tabs"]//a[@id="verifyButtonverification_pending_Link"]') public verifyTxnButton: Button;
  @component('//input[@id="0-File_verification_pending"]') public verifyByTxnI3Select1stTxn: Button;
  @component('//input[@id="1-File_verification_pending"]') public verifyByTxnI3Select2ndTxn: Button;
  @component('//a[@id="editButton0verification_pending_Link"]') public verifyByTxnI3Select1stTxnRef: Button;
  @component('//a[@id="editButton1verification_pending_Link"]') public verifyByTxnI3Select2ndTxnRef: Button;
  @component('//a[@id="verifyButton_Link"]') public confirmVerifyI3Button: Button;
  @component('//div[@id="tab-2fileVRVerifyCentreSec_Tabs"]//div[@id="filterFileName_input_field"]/input') public fileNameFilterForVerifyTxn: TextInput;
  @component('//div[@id="tab-2fileVRVerifyCentreSec_Tabs"]//div[@id="filterReference_input_field"]/input') public referenceFilterForVerifyTxn: TextInput;
  @component('//div[@id="tab-2fileVRVerifyCentreSec_Tabs"]//select[@id="filterType"]') public paymentTypeFileterForVerifyTxn: HtmlSelect;
  @component('//div[@id="tab-2fileVRVerifyCentreSec_Tabs"]//a[@id="submitverification_pending_Link"]') public goButtonForVerifyTxn: Button;

  //Verify - by transaction for TW
  @component('//a[@id="verifyButtonverification_pending_Link"]') public verifyTxnButtonTW: Button;
  // @component('//div[@id="filterReference_input_field"]/input[@id="filterReference"]') public referenceFilterForVerifyTxnTW: TextInput;
  @component('//select[@id="filterType"]') public paymentTypeFileterForVerifyTxnTW: HtmlSelect;
  @component('//a[@id="submitverification_pending_Link"]') public goButtonForVerifyTxnTW: Button;

  //Verify- by File
  @component('//a[@tabid="processedVerifyTab"]') public verifyTabByFile: Button;
  @component('//input[@id="0-File_verification_processed"]') public verifyByFileI3Select1st: Button;
  @component('//a[@id="editButton0verification_processed_Link"]') public verifyByFileI3Select1stfileName: TextInput;
  @component('//table[@id="filesvcFileListTab"]/tbody/tr[4]/td[4]') public verifyByFileI3Select1stItemNum: TextInput;
  @component('//a[@id="submitButton_Link"]') public confirmVerifyFileI3Button: Button;
  @component('//div[@tabid="processedVerifyTab"]//input[@id="filterFileName"]') public verifyByfileFilter: TextInput;
  @component('//*[@id="submitverification_processed_Link"]') public verifyByFileGo: Button;
  @component('//a[@id="verifyButtonverification_processed_Link"]') public verifyByFileBtn: Button;

  //Release- by transaction
  @component('//*[@id="fileVRVerifyReleaseCentre_Tabs_headers"]/li[2]/a') public releaseTab: Button;
  @component('//a[@tabid="pendingReleaseTab"]') public releaseTabByTxn: Button;
  @component('//div[@id="tab-2fileVRReleaseCentreSec_Tabs"]//a[@id="releaseButtonrelease_pending_Link"][1]') public releaseTxnI3Button: Button;
  @component('//input[@id="0-File_release_pending"]') public releaseByTxnI3Select1stTxn: Button;
  @component('//input[@id="1-File_release_pending"]') public releaseByTxnI3Select2ndTxn: Button;
  @component('//a[@id="editButton0release_pending_Link"]') public releaseByTxnI3Select1stTxnRef: Button;
  @component('//a[@id="editButton1release_pending_Link"]') public releaseByTxnI3Select2ndTxnRef: Button;
  @component('//a[@id="releaseButton_Link"]') public confirmReleaseI3Button: Button;
  @component('//div[@id="tab-2fileVRReleaseCentreSec_Tabs"]//div[@id="filterFileName_input_field"]/input') public fileNameFilterForReleaseTxn: TextInput;
  @component('//div[@id="tab-2fileVRReleaseCentreSec_Tabs"]//div[@id="filterReference_input_field"]/input') public referenceFilterForReleaseTxn: TextInput;
  @component('//div[@id="tab-2fileVRReleaseCentreSec_Tabs"]//select[@id="filterType"]') public paymentTypeFileterForReleaseTxn: HtmlSelect;
  @component('//div[@id="tab-2fileVRReleaseCentreSec_Tabs"]//a[@id="submitrelease_pending_Link"]') public goButtonForReleaseTxn: Button;

  //Release- by transaction for TW
  @component('//a[@id="releaseButtonrelease_pending_Link"][1]') public releaseTxnI3ButtonTW: Button;
  // @component('//div[@id="tab-1fileVRReleaseCentreSec_Tabs"]//div[@id="filterReference_input_field"]/input') public referenceFilterForReleaseTxnTW: TextInput;
  @component('//div[@id="filterType_input_field"]//select[@id="filterType"]') public paymentTypeFileterForReleaseTxnTW: HtmlSelect;
  @component('//div[@id="paymentSearchInput_input_field"]//a[@id="submitrelease_pending_Link"]') public goButtonForReleaseTxnTW: Button;

  //Release- by File
  @component('//a[@tabid="processedReleaseTab"]') public releaseTabByFile: Button;
  @component('//a[@id="releaseButtonrelease_processed_Link"]') public releaseFileI3Button: Button;
  @component('//input[@id="0-File_release_processed"]') public releaseByFileI3Select1stTxn: Button;
  @component('//a[@id="editButton0release_processed_Link"]') public releaseByFileI3Select1stFileName: TextInput;
  @component('//a[@id="submitButton_Link"]') public confirmReleaseFileI3Button: Button;
  @component('//div[@tabid="processedReleaseTab"]//input[@id="filterFileName"]') public releaseFilterFileName: TextInput;
  @component('//a[@id="releaseButtonrelease_processed_Link"]') public releaseFileButton: Button;
  @component('//div[@tabid="processedReleaseTab"]//a[@id="submitrelease_processed_Link"]') public releaseFileGoBtn: Button;
  @component('a[@id="submitverification_pending_Link"]') public goButton: Button;

  public async loadConditionForNewUI() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.oldVerifyLink.element), this.oldVerifyLink.getTimeOut());
  }

  public async loadCondition() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.verifyTab.element), this.verifyTab.getTimeOut());
  }

  public async loadConditionForList() {
    await waitForI3Loading();
  }

  public async loadConditionForVeirfyTab() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.verifyTab.element), this.verifyTab.getTimeOut());
  }

  public async loadConditionForVerifyTxnTab() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.verifyTabByTxn.element), this.verifyTabByTxn.getTimeOut());
  }

  public async loadConditionForVerifyFileTab() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.verifyTabByFile.element), this.verifyTabByFile.getTimeOut());
  }

  public async loadConditionForVerifyBtn() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.verifyTxnButton.element), this.verifyTxnButton.getTimeOut());
  }

  public async loadConditionForVerifyFileBtn() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.verifyByFileBtn.element), this.verifyByFileBtn.getTimeOut());
  }

  public async loadConditionForVerifyPaymentPage() {
    await this.pageSwitchToI3();
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.verifyTxnButton.element), this.verifyTxnButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmVerifyI3Button.element), this.confirmVerifyI3Button.getTimeOut());
  }

  public async loadConditionForVerifyFilePage() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.stalenessOf(this.verifyByFileBtn.element), this.verifyByFileBtn.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmVerifyFileI3Button.element), this.confirmVerifyFileI3Button.getTimeOut());
  }

  public async loadConditionForReleaseTab() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.releaseTab.element), this.releaseTab.getTimeOut());
  }

  public async loadConditionForReleaseTxnTab() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.releaseTabByTxn.element), this.releaseTabByTxn.getTimeOut());
  }

  public async loadConditionForReleaseFileTab() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.releaseTabByFile.element), this.releaseTabByFile.getTimeOut());
  }

  public async loadConditionForReleaseBtn() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.releaseTxnI3Button.element), this.releaseTxnI3Button.getTimeOut());
  }

  public async loadConditionForReleaseFileBtn() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.releaseFileButton.element), this.releaseFileButton.getTimeOut());
  }

  public async loadConditionForReleaseFilterGo() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.releaseFileGoBtn.element), this.releaseFileGoBtn.getTimeOut());
  }

  public async loadConditionForReleasePaymentPage() {
    await this.pageSwitchToI3();
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.releaseTxnI3Button.element), this.releaseTxnI3Button.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmReleaseI3Button.element), this.confirmReleaseI3Button.getTimeOut());
  }

  public async loadConditionForReleaseFilePage() {
    await waitForI3Loading();
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.stalenessOf(this.releaseFileButton.element), this.releaseFileButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.confirmReleaseFileI3Button.element), this.confirmReleaseFileI3Button.getTimeOut());
  }

  public async verifySingleTxn(_PaymentsPages: PaymentsPages, reference: string, paymentType: string) {
    let verifyReference = "";
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await this.loadConditionForNewUI();
    await this.oldVerifyLink.click();
    await this.loadCondition();
    await this.loadConditionForVeirfyTab();
    await this.loadConditionForList();
    await this.verifyTab.click();
    await this.loadConditionForVerifyTxnTab();
    await this.loadConditionForList();
    await this.verifyTabByTxn.click();
    await this.loadConditionForVerifyBtn();
    if (0 !== reference.trim().length) {
      await this.referenceFilterForVerifyTxn.input(reference);
    } else {
      await this.paymentTypeFileterForVerifyTxn.select(paymentType);
    }
    await this.goButtonForVerifyTxn.click();
    await this.loadConditionForList();
    await this.verifyByTxnI3Select1stTxn.click();
    await this.verifyTxnButton.click();
    await this.loadConditionForVerifyPaymentPage();
    await this.confirmVerifyI3Button.click();
    await this.loadConditionForVerifyBtn();
    await ensure(this).isI3Success();
    await this.getI3ReferenceID().then(text => {
      verifyReference = text;
    });
    return verifyReference;
  }

  public async releaseSingleTxn(_PaymentsPages: PaymentsPages, verifyReference: string, approvalReference: string, paymentType: string) {
    let paymentReference = "";
    await _PaymentsPages.openMenu(Menu.Approvals.Verifications);
    await this.loadConditionForNewUI();
    await this.oldVerifyLink.click();
    await this.loadCondition();
    await this.loadConditionForList();
    await this.loadConditionForReleaseTab();
    await this.releaseTab.click();
    await this.loadConditionForReleaseTxnTab();
    await this.loadConditionForList();
    await this.releaseTabByTxn.click();
    await this.loadConditionForReleaseBtn();
    if (0 !== verifyReference.trim().length && 0 !== approvalReference.trim().length) {
      await this.referenceFilterForReleaseTxn.input(approvalReference);
    } else {
      await this.paymentTypeFileterForReleaseTxn.select(paymentType);
    }
    await this.goButtonForReleaseTxn.click();
    await this.loadConditionForList();
    await this.releaseByTxnI3Select1stTxn.click();
    await this.releaseTxnI3Button.click();
    await this.loadConditionForReleasePaymentPage();
    await this.confirmReleaseI3Button.click();
    await this.loadConditionForReleaseBtn();
    await ensure(this).isI3Success();
    await this.getI3ReferenceID().then(text => {
      paymentReference = text;
    });
    return paymentReference;
  }
}