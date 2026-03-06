/*
 * ©Copyright ACI Worldwide, Inc. 2019
*/
import { PaymentsPages } from '../../../pages/CB';
import { Menu } from '../../../config/menu';
import { browser, ExpectedConditions } from 'protractor';
import { Page, component, log, Button, TextInput, WebComponent, waitForI3Loading } from '../../../lib';
import { HtmlSelect } from '../../../lib/components';

@log export class MT101PaymentPage extends Page {
  // Create Page
  @component('//*[@id="fromParty"]') public fromAccount: HtmlSelect;
  @component('//*[@id="paymentCurrency_currencyCode"]') public paymentCurrency: HtmlSelect;
  @component('//*[@id="amount_value_control"]') public amount: TextInput;
  @component('//*[@id="fxContractReference"]') public fxContractReference: TextInput;
  @component('//input[@id="adhoc_E"]') public existBeneBtn: Button;
  @component('//input[@id="adhoc_A"]') public newBeneBtn: Button;
  @component('//a[@id="addThirPartyButton_Link"]') public createBeneBtn: Button;
  @component('//*[@id="toParty"]') public existingPayee: HtmlSelect;

  // Intermediary Bank Information 
  @component('//input[@id="intermediaryBankForm_bankDetailsType"]') public intermediaryBankInformation: Button;
  @component('//input[@id="intermediaryBankForm_bankIdentifier"]') public intermediaryBankID: TextInput;
  @component('//*[@id="intermediaryBankForm_bankCountry_countryCode"]') public intermediaryBankCountry: HtmlSelect;
  @component('//*[@id="retrieveIntermediaryBankButton_Link"]') public searchButton: Button;
  @component('//*[@id="ckbox0"]') public intermediaryBankInformationSelect: Button;
  @component('//a[@id="submitIntermediaryBankButton_Link"]') public submitIntermediaryBankButton: Button;
  @component('//textarea[@id="details"]') public paymentDetails: TextInput;
  @component('//input[@id="regulatoryReptText1"]') public regulatoryReportingText1: TextInput;
  @component('//input[@id="regulatoryReptText2"]') public regulatoryReportingText2: TextInput;
  @component('//input[@id="regulatoryReptText3"]') public regulatoryReportingText3: TextInput;
  @component('//textarea[@id="transactionNote"]') public transactionNotes: TextInput;
  @component('//input[@id="saveAsTemplate"]') public saveAsTemplate: Button;
  @component('//input[@id="templateName"]') public templateName: TextInput;
  @component('//a[@id="previewButton_Link"]') public previewButton: Button;
  @component('//a[@id="submitButton_Link"]/span[text()="Save as Draft"]') public saveButton: Button;
  @component('//a[@id="submitButton_Link"]/span[text()="Preview Payment"]') public previewSubmitButton: Button;
  @component('//a[@id="submitButton_Link"]/span[text()="Submit Payment"]') public submitButton: Button;
  @component('//a[@id="copyButton_Link"]') public copyButton: Button;
  @component('//a[@id="modifyButton_Link"]') public editButton: Button;
  @component('//a[@id="cancelButton_Link"]') public cancelButton: Button;
  @component('//a[@id="approveButton_Link"]') public approveButton: Button;
  @component('//a[@id="submitButton_Link"]') public approveSubmitButton: Button;
  @component('//a[@id="rejectButton_Link"]') public rejectButton: Button;
  @component('//a[@id="submitButton_Link"]') public rejectSubmitButton: Button;
  @component('//a[@id="deleteButton_Link"]') public deleteButton: Button;
  @component('//a[@id="submitButton_Link"]') public deleteSubmitButton: Button;
  @component('//input[@id="signature"]') public challengeResponse: TextInput;
  @component('//input[@id="authorizeMemo"]') public rejectReason: TextInput;
  @component('//input[@id="approvalChoice_B"]') public approveNow: Button;

  //Add International Payments Beneficiary
  @component('//iframe[@id="overlayContainerFrame"]') beneFream: WebComponent;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="name"]') beneName: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="address1"]') beneAddr1: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="address2"]') beneAddr2: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="address3"]') beneAddr3: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="accountNumber"]') beneAccountNumber: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="bankDetailsType_L"]') beneBankDetailsBtn01: Button;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="bankDetailsType_A"]') beneBankDetailsBtn02: Button;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="bankName"]') beneBankName: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="bankAddress1"]') beneBankAddr1: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="bankAddress2"]') beneBankAddr2: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="extraText1"]') beneRoutingCode: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//input[@id="nickName"]') beneNickName: TextInput;
  @component('//div[@id="createUKPaymentRecipientPage"]//a[@id="submitButton_Link"]') benePreviewBtn: Button;
  @component('//div[@id="previewUKPaymentRecipientPage"]//a[@id="submitButton_Link"]') beneSubmitBtn: Button;

  //view
  @component('//div[@id="tiContentContainer"]//span[@id="customerReference"]') viewCustomerReference: TextInput;
  @component('//div[@id="tiContentContainer"]//span[@id="fromParty"]') viewFromAccount: TextInput;
  @component('//div[@id="tiContentContainer"]//span[@id="fxMT101Info_component_1_amount"]') viewAmount: TextInput;
  @component('//div[@id="tiContentContainer"]//span[@id="status"]') viewStatus: TextInput;
  @component('//div[@id="bdContentContainer"]//span[@id="beneficiaryName"]') viewBeneName: TextInput;
  @component('//div[@id="signatrueContentContainer"]//span[@id="cutofftime"]') cutofftime: TextInput;
  @component('//div[@id="tiContentContainer"]//span[@id="templateName"]') viewTemplateName: TextInput;
  @component('//*[@id="fxMT101Info_component_1_fxContractRef"]') viewFXContractRef: TextInput;
  @component('//*[@id="beneficiaryAccountNumber"]') viewBeneAccountNumber: TextInput;

  //I3 Page create succesfully message
  @component('//*[@id="my_list"]/li') protected I3InfoMsg: WebComponent;

  //create from template
  @component('//template-list/div/div[1]/table/tbody/tr[1]/td[6]/div/a') public makeAPaymentLink: Button;
  @component('//*[@id="toPartyContainer_input_field"]') existingPayeeValue: TextInput;

  //copy edit exiting payee
  @component('//*[@id="toParty"]') existPayeeValue: TextInput;

  constructor() {
    super();
  }

  public async loadCondition() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.visibilityOf(this.fromAccount.element), this.fromAccount.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.previewButton.element), this.previewButton.getTimeOut());
  }

  public async loadConditionFrame() {
    await browser.wait(ExpectedConditions.visibilityOf(this.beneFream.element), this.beneFream.getTimeOut());
  }

  public async loadConditionForCreateBenePage(time: any = this.beneName.getTimeOut()) {
    await browser.wait(ExpectedConditions.visibilityOf(this.beneName.element), time);
  }

  public async loadConditionForPreviewBenePage(time: any = this.beneName.getTimeOut()) {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.benePreviewBtn.element), this.benePreviewBtn.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.beneSubmitBtn.element), time);
  }

  public async loadConditionForPreviewPaymentPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewButton.element), this.previewButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForCreateSuccessPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.submitButton.element), this.submitButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.I3InfoMsg.element), this.I3InfoMsg.getTimeOut());
  }

  public async loadConditionForCreateApprovalNowSuccessPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.approveButton.element), this.approveButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.I3InfoMsg.element), this.I3InfoMsg.getTimeOut());
  }

  public async loadConditionForI3ViewPage() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.visibilityOf(this.viewFromAccount.element), this.viewFromAccount.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.cancelButton.element), this.cancelButton.getTimeOut());
  }

  public async loadConditionForApprovalNowPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewButton.element), this.previewButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.challengeResponse.element), this.challengeResponse.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.approveButton.element), this.approveButton.getTimeOut());
  }

  public async loadConditionForEditPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.editButton.element), this.editButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.amount.element), this.amount.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.previewSubmitButton.element), this.previewSubmitButton.getTimeOut());
  }

  public async loadConditionForPreviewEditPaymentPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.previewSubmitButton.element), this.previewSubmitButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.submitButton.element), this.submitButton.getTimeOut());
  }

  public async loadConditionForApprovalPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.approveButton.element), this.approveButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.challengeResponse.element), this.challengeResponse.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.approveSubmitButton.element), this.approveSubmitButton.getTimeOut());
  }

  public async loadConditionForRejectPage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.rejectButton.element), this.rejectButton.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.rejectReason.element), this.rejectReason.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.rejectSubmitButton.element), this.rejectSubmitButton.getTimeOut());
  }

  public async loadConditionForDeletePage() {
    await waitForI3Loading();
    await browser.wait(ExpectedConditions.stalenessOf(this.deleteButton.element), this.deleteButton.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.deleteSubmitButton.element), this.deleteSubmitButton.getTimeOut());
  }

  public async loadCondtionCratePaymentFromTemplate() {
    await this.pageSwitchToI3();
    await browser.wait(ExpectedConditions.stalenessOf(this.makeAPaymentLink.element), this.makeAPaymentLink.getTimeOut());
    await browser.wait(ExpectedConditions.visibilityOf(this.amount.element), this.amount.getTimeOut());
    await browser.wait(ExpectedConditions.elementToBeClickable(this.previewSubmitButton.element), this.previewSubmitButton.getTimeOut());
  }

  public async goToViewPaymentPageViaRef(_PaymentsPages: PaymentsPages, reference: string) {
    await waitForI3Loading();
    await _PaymentsPages.openMenu(Menu.Payments.TransferCenter);
    await _PaymentsPages.transferCentersPage.goToViewPaymentPageViaRef(reference);
    await this.loadConditionForI3ViewPage();
  }
}