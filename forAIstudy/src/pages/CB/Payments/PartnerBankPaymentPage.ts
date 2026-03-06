/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { browser, ExpectedConditions } from 'protractor';
import { component, log, Page, TextInput, Button, OptionSelect, ensure } from '../../../lib';
import * as utils from '../../../lib/utils';
import { Menu } from '../../../config/menu';
import { PaymentsPages } from '../../../pages/CB';

@log export class PartnerBankPayment extends Page {
  @component('//auto-complete[@formcontrolname="countrySelected"]') public partnerBankCountry: OptionSelect;
  @component('//auto-complete[@formcontrolname="fromAccount"]') public fromAccountOLD: OptionSelect;
  @component('//auto-complete[@formcontrolname="ptnbnkPmtSelect"]') public ptnBnkPaymentType: OptionSelect;

  @component('//input[@name="newPayeeName"]') public newPayeeName: TextInput;
  @component('//input[@name="newPayeePayeeId"]') public newPayeePayeeId: TextInput;
  @component('//input[@name="newPayeeAcctNum"]') public newPayeeAcctNum: TextInput;
  @component('//input[@name="payeeAddress"]') public payeeAddress: TextInput;
  @component('//input[@name="payeeZipCode"]') public payeeZipCode: TextInput;
  @component('//button[@name="addPayee"]') public addPayeeBtn: Button;
  @component('//input[@id="savePayee"]') public savePayeeBtn: Button;
  @component('//*[@name="newPayeeNickName"]') public payeeNickName: TextInput;
  @component('//*[@name="bp-payee-clientRefNum"]') public clientRefNum: TextInput;
  @component('//input[@name="payeeAmount"]') public amount: TextInput;
  @component('//input[@name="bp-payee-amount"]') public PHPamount: TextInput;
  @component('//div[@id="trashBinIcon"]') public deleteIcon: Button;
  @component('//*[@name="transactionRef"]') public txnRef: TextInput;
  @component('//*[@name="customer-reference"]') public customerRef: TextInput;
  @component('//*[@class="icon-expand"]') public showOption: Button;
  @component('//*[@name="bp-payee-remarks2"]') public beneRef: TextInput;
  @component('//*[@name="bp-payee-remarks3"]') public bankInfo: TextInput;
  @component('//*[@name="bp-payee-address1"]') public payeeAddress1: TextInput;
  @component('//button[@name="next"]') public nextButton: Button;
  @component('//button[@name="Submit"]') public submitButton: Button;
  @component('//button[@name="save-as-draft"]') public saveAsDraftButton: Button;
  @component('//button[@name="finish"]') public finishButton: Button;
  @component('//*[@name="selectedPayeeBank"]') public payeeBankID: TextInput;
  @component('//*[@class="search-result-container"]/div[1]') public payeeBankResult: Button;
  // @component('//*[@name="selectedPayeeBank"]') public payeeBankID: OptionSelect;

  //"fromAccount" at Partner Bank View Screen
  @component('//span[@id="ptnbnk-view-fromAccount"]') public fromAccountView: TextInput;
  //"amount" at Partner Bank View Screen
  @component('//span[@id="amount"]') public amountView: TextInput;
  //"paymentDate" at Partner Bank View Screen
  @component('//span[@id="paymentDate"]') public paymentDateView: TextInput;
  //"status" at Partner Bank View Screen
  @component('//span[@id="status"]') public statusLableView: TextInput;
  //"payeeName" at Partner Bank View Screen -> Transaction List
  @component('//strong[@id="ptnbnk-view-name_0"]') public payeeNameView: TextInput;
  @component('//input[@name="ptnbnk-search"]') public filterExistingPayee: TextInput;
  @component('//button[@name="addButton"]') public addExistingPayeeBtn: Button;
  @component('//div[@id="ptnbnk-view-edit"]') public editButton: Button;

  @component('//div[@id="m-challenge"]')
  public mChallengeText: TextInput;
  @component('//div[@id="labelEnterChallenge"]')
  public withoutMChallengeText: TextInput;
  @component("//button[@name='Approve']") public approveButton: Button;
  @component('//button[@name="Copy"]') public copyButton: Button;
  //button at Create Screen
  @component("//button[@name='Delete']") public deleteButton: Button;
  //button at dialog
  @component("//button[@name='delete']") public deleteDialogButton: Button;
  //button at Create Screen
  @component("//button[@name='Reject']") public rejectButton: Button;
  //button at dialog
  @component("//button[@name='reject']") public rejectDialogButton: Button;
  @component("//input[@name='reasonForRejection']") public reason4RejectionButton: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.partnerBankCountry.element), this.partnerBankCountry.getTimeOut());
  }

  public async loadCondition4Preview() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadCondition4Submitted() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishButton.element), this.finishButton.getTimeOut());
  }

  public async loadCondition4View() {
    await utils.waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.statusLableView.element), this.statusLableView.getTimeOut());
  }

  public async addNewPayee(newPayeeName: string, newPayeePayeeId: string, newPayeeAcctNum: string): Promise<void> {
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.crossBoarderACHPage.newPayeeTab.click();
    await this.newPayeeName.input(newPayeeName);
    await this.newPayeePayeeId.input(newPayeePayeeId);
    await this.newPayeeAcctNum.input(newPayeeAcctNum);
    await this.addPayeeBtn.click();
  }

  public async addExistingPayee(testDate: string): Promise<void> {
    await this.filterExistingPayee.input(testDate);
    await this.addExistingPayeeBtn.click();
  }

  public async verifyPayment(reference: string, paymentTypeLabel: string): Promise<string> {
    let reference4VR: string = null;
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
    await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVeirfyTab();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
    await _PaymentsPages.VerificationAndReleasesPage.verifyTab.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyTxnTab();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
    await _PaymentsPages.VerificationAndReleasesPage.verifyTabByTxn.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
    if (reference && (0 !== reference.trim().length)) {
      await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForVerifyTxn.input(reference);
    } else {
      await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForVerifyTxn.select(paymentTypeLabel);
    }
    await _PaymentsPages.VerificationAndReleasesPage.goButtonForVerifyTxn.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
    await _PaymentsPages.VerificationAndReleasesPage.verifyByTxnI3Select1stTxn.click();
    await _PaymentsPages.VerificationAndReleasesPage.verifyTxnButton.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyPaymentPage();
    await _PaymentsPages.VerificationAndReleasesPage.confirmVerifyI3Button.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForVerifyBtn();
    await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
    await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
      reference4VR = text;
      console.log('Reference of Verify Payment:', reference4VR);
    });
    return await reference4VR;
  }

  public async releasePayment(reference: string, paymentTypeLabel: string): Promise<string> {
    let reference4VR: string = null;
    let _PaymentsPages = new PaymentsPages();
    await _PaymentsPages.openMenu(Menu.Approvals.VerificationAndReleases);
    await _PaymentsPages.VerificationAndReleasesPage.loadCondition();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTab();
    await _PaymentsPages.VerificationAndReleasesPage.releaseTab.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseTxnTab();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
    await _PaymentsPages.VerificationAndReleasesPage.releaseTabByTxn.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
    if (reference && 0 !== reference.trim().length) {
      await _PaymentsPages.VerificationAndReleasesPage.referenceFilterForReleaseTxn.input(reference);
    } else {
      await _PaymentsPages.VerificationAndReleasesPage.paymentTypeFileterForReleaseTxn.select(paymentTypeLabel);
    }
    await _PaymentsPages.VerificationAndReleasesPage.goButtonForReleaseTxn.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForList();
    await _PaymentsPages.VerificationAndReleasesPage.releaseByTxnI3Select1stTxn.click();
    await _PaymentsPages.VerificationAndReleasesPage.releaseTxnI3Button.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleasePaymentPage();
    await _PaymentsPages.VerificationAndReleasesPage.confirmReleaseI3Button.click();
    await _PaymentsPages.VerificationAndReleasesPage.loadConditionForReleaseBtn();
    await ensure(_PaymentsPages.VerificationAndReleasesPage).isI3Success();
    await _PaymentsPages.VerificationAndReleasesPage.getI3ReferenceID().then(text => {
      reference4VR = text;
      console.log(reference4VR);
    });
    return await reference4VR;
  }
}