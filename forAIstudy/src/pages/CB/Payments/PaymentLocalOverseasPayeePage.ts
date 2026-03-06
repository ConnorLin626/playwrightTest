/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
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
  RadioButton
} from "../../../lib";

@log export class PaymentLocalOverseasPayeePage extends Page {
  // Create page
  @component('//p-auto-complete[@formcontrolname="fromAccount"]') public fromAccount: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="currency"]') public currency: OptionSelect;
  @component('//p-auto-complete[@formcontrolname="currency"]') public amountCcy: OptionSelect;
  @component('//input[@name="send-amount"]') public amount: TextInput;
  @component('//input[@name="useFX"]') public useFXCheckbox: Button;
  @component('//input[@name="fx-contract-0"]') public fxContract0Checkbox: Button;
  @component('//input[@name="fx-ref-0"]') public fxRef0: TextInput;
  @component('//input[@name="fx-amount-0"]') public fxAmount0: TextInput;
  @component('//date-picker[@formcontrolname="paymentDate"]') public paymentDate: DateSelect;
  @component('//p-auto-complete[@formcontrolname="payee"]') public existingPayee: OptionSelect;
  @component('//auto-complete[@formcontrolname="payeeCode"]') public payeeCode: OptionSelect;
  @component('//auto-complete[@formcontrolname="regulatoryComplianceCode"]') public ComplianceCode: OptionSelect;
  @component('//auto-complete[@formcontrolname="outwardRemit"]') public outwardRemit: OptionSelect;
  @component('//auto-complete[@formcontrolname="underlyingCode"]') public underlyingCode: OptionSelect;
  @component('//multi-level-dropdown[@formcontrolname="purposeCode"]') public purposeCode: OptionSelect;
  @component('//multi-level-dropdown[@formcontrolname="subPurposeCode"]') public subPurposeCode: OptionSelect;
  @component('//auto-complete[@formcontrolname="counterptycntryCode"]') public LocationOfService: OptionSelect;
  @component('//input[@name="caAcknowledgeNum"]') public CAAcknNumber: TextInput;
  @component('//p-auto-complete[@formcontrolname="docType"]') public DocType: OptionSelect;
  @component('//*[@id="a2Ack"]') public A2Ack: Button;
  @component('//input[@name="bank-charge-S"]') public bankChargesShared: Button;
  @component('//input[@name="bank-charge-O"]') public bankChargesOur: Button;
  @component('//input[@name="bank-charge-P"]') public bankChargesThey: Button;
  @component('//textarea[@name="paymentDetail"]') public paymentDetail: TextInput;
  @component("//button[@name='next']") public nextButton: Button;
  @component("//button[@name='submit']") public submitButton: Button;
  @component("//button[@name='approve']") public approveButton: Button;
  @component('//button[@name="get-challenge"]') public getChallengeSMS: Button;
  @component("//input[@name='responseCode']") public challengeResponse: TextInput;
  @component("//button[@name='reject']") public rejectButton: Button;
  @component("//input[@name='reasonForRejection']") public reasonForRejection: TextInput;
  @component("//reject-dialog/div/button[@name='reject']") public rejectDialogButton: Button;
  @component("//a[@id='ux-tab-NEW']") public newPayeeTab: Button;
  @component("//p-auto-complete[@formcontrolname='selectedCountry']") public Country: OptionSelect;
  @component("//input[@name='new-payee-name']") public newPayeeName: TextInput;
  @component("//input[@name='new-payee-add1']") public newPayeeAdd1: TextInput;
  @component("//input[@name='new-payee-add2']") public newPayeeAdd2: TextInput;
  @component("//input[@name='new-payee-add3']") public newPayeeAdd3: TextInput;
  @component('//payee-bank//div[@id="payee-bank-common"]') public payeeBankID: OptionSelect;
  @component("//input[@name='new-payee-routing-code']") public newPayeeRoutingCode: TextInput;
  @component("//input[@name='new-payee-acct-number']") public newPayeeAcctNumber: TextInput;
  @component("//input[@formcontrolname='saveToList']") public saveToList: Button;
  @component("//input[@name='new-payee-nick-name']") public newPayeeNickName: TextInput;
  @component("//input[@id='today_day']") public todayDay: Button;
  @component("//input[@id='set_day']") public setDay: Button;
  @component("//input[@name='intermediary-bank-isIntermediary']") public intermediaryBankIsIntermediary: Button;
  @component("//p-auto-complete[@formcontrolname='selectedIntermediaryCountry']") public intermediaryBankCountry: OptionSelect;
  @component('//intermediary-bank//div[@id="payee-bank-common"]') public intermediaryBankID: OptionSelect;
  @component("//input[@formcontrolname='isBeneAdvising']") public isBeneAdvising: Button;
  @component("//input[@name='email-id-0']") public emailIdO: TextInput;
  @component("//input[@name='email-id-1']") public emailId1: TextInput;
  @component("//input[@name='email-id-2']") public emailId2: TextInput;
  @component("//input[@name='email-id-3']") public emailId3: TextInput;
  @component("//input[@name='email-id-4']") public emailId4: TextInput;
  @component("//textarea[@name='adviceContent']") public message: TextInput;
  @component("//a[@id='ux-tab-fax']") public faxTab: Button;
  @component("//p-auto-complete[@formcontrolname='ctryCode']") public faxCountryCode0: OptionSelect;
  @component("//input[@name='fax-area-code-0']") public faxAreaCode0: TextInput;
  @component("//input[@name='fax-no-0']") public faxNo0: TextInput;
  @component("//input[@formcontrolname='isTransactionNote']") public isTransactionNote: Button;
  @component("//textarea[@name='transactionNote']") public transactionNote: TextInput;
  @component("//input[@formcontrolname='isMessageToOrderingBank']") public isMessageToOrderingBank: Button;
  @component("//textarea[@name='messageToOrderingBank']") public messageToOrderingBank: TextInput;
  @component("//button[@name='save-as-draft']") public saveAsDraft: TextInput;
  @component('//input[@name="approveNow"]') public approvalNowCheckBox: Button;
  @component('//div[@id="m-challenge"]') public mchallengeText: TextInput;
  @component('//div[@id="p-challenge"]') public pchallengeText: TextInput;
  @component('//input[@name="saveAsTemplate"]') public savaAsTemplateCheckBox: Button;
  @component('//input[@name="templateName"]') public templateName: TextInput;
  @component('//button[@name="finish"]') public finishedButton: Button;
  @component('//cutoff-time-tip') public cutoffTimeTip: WebComponent;
  //For TT Page
  @component('//div[starts-with(@class, "manual clearfix")]') public enterDetailButton: Button;
  @component('//input[@name="new-payee-bank-name"]') public newPayeeBankName: TextInput;
  @component('//input[@name="new-payee-bank-add1"]') public newPayeeBankADDR1: TextInput;
  @component('//input[@name="new-payee-bank-add2"]') public newPayeeBankADDR2: TextInput;
  @component("//input[@id='bank-charge-shared']") public sharedRadio: RadioButton;
  @component('//div[@class="push-option"]') public pushOption: Button;
  @component("//input[@id='approveNow']") public approveNowCheckBox: Button;
  @component('//input[@id="saveAsTemplate"]') public saveAsTemplateCheckbox: Button;
  @component('//*[@id="ott-view-attachDoc"]/label') public AddAttachmentBtn: Button;
  @component('//button[@name="confirmUpload"]') public ConfirmUploadBtn: Button;
  @component('//input[@id="digiDocFileUpload"]') public UploadfileBtn: FileSelect;
  @component('//span[@id="caAcknowledgeNum"]') public CAAcknownumber: TextInput;

  // Delete Page
  @component('//button[@name="delete"]') public deleteButton: Button;
  @component("//delete-dialog/div/button[@name='delete']") public deleteDialogButton: Button;
  @component('//button[@name="dismiss"]') public dismissButton: Button;

  // Edit Page
  @component('//span[@id="ott-view-edit"]') public editButton: Button;

  // Copy Page
  @component('//button[@name="copy"]') public copyButton: Button;

  // View TT Payment/Template Page
  @component('//span[@id="view-ott-accountNum"]') public fromAccountValue: TextInput;
  @component('//label[@id="view-ott-sendAmount"]') public amountValue: TextInput;
  @component('//span[@id="view-ott-newPayee"]') public toAccountNumberValue: TextInput;
  @component('//div[@id="ott-view-status"]') public transactionStatus: TextInput;
  @component('//div[@id="view-ott-send"]') public exchangeRateValue: TextInput;
  @component('//span[@id="view-ott-paymentDate"]') public paymentDateValue: TextInput;
  @component('//strong[@id="view-ott-newPayee-name"]') public toNewPayeeNameValue: TextInput;
  @component('//strong[@id="view-ott-existingPayee-name"]') public toExistingPayeeNameValue: TextInput;
  @component('//li[starts-with(@class, "digidoc-uploaded")]') public digiDocUploaded: TextInput;
  @component('/html/body/div/div/div/my-app/section/ng-component/div/ng-component/div/div[2]/div/div[1]/view-section-ott/div/section[4]/div[1]/span[2]/span') public paymentDetailValue: TextInput;

  // View TT Tempate Page
  @component('//div[@id="ott-viewTemp-templateName"]') public templateNameValue: TextInput;

  // create TT Page from template
  @component('//p-auto-complete[@formcontrolname="payee"]/div//span') public existingPayeevalue: TextInput;

  //CNTT page Regulatory Reporting section
  @component('//auto-complete[@formcontrolname="counterptycntryCode"]') public counterptycntryCode: OptionSelect;
  @component('//auto-complete[@formcontrolname="specPmtPurpose"]') public specPmtPurpose: OptionSelect;
  @component('//input[@id="yes"]') public isTaxFreeGoods: Button;
  @component('//regulatory-advising-ott/div/div/div[2]/span/div/input[@id="no"]') public noTaxFreeGoods: Button;
  @component('//*[@name="ott-regulatory-advising-approve"]') public fxAppRefNum: TextInput;
  @component('//auto-complete[@formcontrolname="pmtCategory1"]') public pmtBOPCategory1: OptionSelect;
  @component('//auto-complete[@formcontrolname="seriesCode1"]') public BOPseriesCode1: OptionSelect;
  @component('//input[@name="ott-regulatory-advising-contractNum"]') public contractNum: TextInput;
  @component('//input[@name="ott-regulatory-advising-invoiceNum"]') public invoiceNum: TextInput;
  @component('//input[@name="ott-regulatory-advising-transRemark1"]') public transRemark1: TextInput;
  @component('//input[@name="ott-regulatory-advising-advPmtAmt"]') public advPmtAmt: TextInput;
  @component('//input[@name="ott-regulatory-advising-propContractAmt"]') public propContractAmt: TextInput;
  @component('//input[@name="bp-payee-expectedDeclDays"]') public expectedDeclDays: TextInput;
  @component('//dbs-textarea/div/textarea[@name="remarks"]') public remarks: TextInput;
  @component('//auto-complete[@formcontrolname="transType"]') public transType: OptionSelect;
  @component('//input[@name="bp-payee-certifApprNum"]') public certifApprNum: TextInput;
  @component('//auto-complete[@formcontrolname="pmtNature"]') public pmtNature: OptionSelect;
  @component('//auto-complete[@formcontrolname="declareCustoms"]') public declareCustoms: OptionSelect;
  @component('//auto-complete[@formcontrolname="customsDeclCcy"]') public customsDeclCcy: OptionSelect;
  @component('//auto-complete[@formcontrolname="trdType"]') public trdType: OptionSelect;
  @component('//input[@id="digiDocFileUpload"]') public digiDocFileUploadButton: FileSelect;
  @component('//div[@class="utilizedAmount"]/dbs-input/span/div/input') public utilizedAmount: TextInput;

  //VN TT
  @component('//auto-complete[@formcontrolname="counterptycntryCode"]') public payeeCountry: OptionSelect;

  // SAM>TT schedule cut off time link
  // @component('//a[contains(@href,"/s1gcb/csr/common/schedule/bom") and text()="Taiwan Telegraphic Transfer"]') public twTTScheduleLink: Button;
  @component('//a[contains(@href,"/csr/common/schedule/bom") and text()="Taiwan Telegraphic Transfer"]') public twTTScheduleLink: Button;

  constructor() {
    super();
  }

  public async loadCondition() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.fromAccount.element), this.fromAccount.getTimeOut());
  }
  public async loadConditionForPayee() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.existingPayee.element), this.existingPayee.getTimeOut());
    await browser.sleep(3000)
  }
  public async loadConditionForPurposeCode() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.purposeCode.element), this.purposeCode.getTimeOut());
    await browser.sleep(3000)
  }
  public async loadConditionForPrevewPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.stalenessOf(this.nextButton.element), this.nextButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForSubmittedPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.finishedButton.element), this.finishedButton.getTimeOut());
  }

  public async loadConditionForViewTTPaymentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.transactionStatus.element), this.transactionStatus.getTimeOut());
  }
  public async loadConditionForEdit() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.nextButton.element), this.nextButton.getTimeOut());
  }
  public async loadConditionForViewTTTemplatePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.templateNameValue.element), this.templateNameValue.getTimeOut());
  }

  public async loadConditionCreatePaymentTemplate() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.existingPayeevalue.element), this.existingPayeevalue.getTimeOut());
  }
  public async loadConditionCreatePaymentTemplate2() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
  }

  public async loadConditionForMessageInCreatePage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.nextButton.element), this.nextButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
  }
  public async loadConditionForDismissDialog() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.elementToBeClickable(this.dismissButton.element), this.dismissButton.getTimeOut());
  }

  public async loadConditionForMessageInApprovalPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.approveButton.element), this.approveButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.uxErrorMsg.element), this.uxErrorMsg.getTimeOut());
  }

  public async loadConditionForAddAttachmentPage() {
    await waitForUXLoading();
    await browser.wait(ExpectedConditions.visibilityOf(this.ConfirmUploadBtn.element), this.ConfirmUploadBtn.getTimeOut());
  }

  public async createTT(fromAccount: string, inputAmount: string, existingPayee: string, paymentDetail: string, transactionNote: string, messageToOrderingBank: string) {
    let paymentReference = "";
    await this.loadCondition();
    await this.fromAccount.select(fromAccount);
    await this.amount.input(inputAmount);
    await this.existingPayee.select(existingPayee);
    await this.bankChargesShared.jsClick();
    await this.paymentDetail.input(paymentDetail);
    await this.isTransactionNote.jsClick();
    await this.transactionNote.input(transactionNote);
    await this.isMessageToOrderingBank.jsClick();
    await this.messageToOrderingBank.input(messageToOrderingBank);
    await this.nextButton.click();
    await this.loadConditionForPrevewPage();
    await this.submitButton.click();
    await this.loadConditionForSubmittedPage();
    await this.getInfoReferenceID().then(text => {
      paymentReference = text;
    });
    await ensure(this).isUXSuccess();
    return paymentReference;
  }
}
